import pulp
from database import SessionLocal
from models import Food


def generate_meal_plan(target_calories, target_protein, target_carbs, target_fat,
                        region, diet_type, max_items_per_slot=2, avoid_high_gi=False,
                        avoid_high_sat_fat=False, avoid_dairy=False,
                        prefer_high_protein=False, prefer_folate=False):
    """
    Selects up to `max_items_per_slot` foods per meal slot (breakfast, lunch,
    dinner, snack) from the foods table, so the day's total nutrition lands
    as close as possible to the target macros.
    """
    db = SessionLocal()

    meal_slots = ["breakfast", "lunch", "dinner", "snack"]

    if diet_type.lower() == "veg":
        allowed_diet_types = ["veg"]
    else:
        allowed_diet_types = ["veg", "non-veg"]

    query = (
        db.query(Food)
        .filter(Food.region == region)
        .filter(Food.diet_type.in_(allowed_diet_types))
    )

    if avoid_high_gi:
        query = query.filter(Food.glycemic_load != "high")

    if avoid_high_sat_fat:
        query = query.filter(Food.saturated_fat_level != "high")

    if avoid_dairy:
        query = query.filter(Food.is_dairy_heavy == False)

    if prefer_high_protein:
        query = query.filter(Food.protein_g >= 10)  # Adjust threshold as needed

    if prefer_folate:
        query = query.filter(Food.is_folate_rich == True)

    all_foods = query.all()
    db.close()

    if not all_foods:
        return {"error": "No foods found for this region/diet_type combination."}

    # --- Single optimization problem across all slots at once ---
    prob = pulp.LpProblem("meal_plan", pulp.LpMinimize)

    # Binary variable: is this food chosen? (per food, since each food belongs to one slot)
    food_vars = {f.id: pulp.LpVariable(f"food_{f.id}", cat="Binary") for f in all_foods}

    # Group foods by slot
    foods_by_slot = {slot: [f for f in all_foods if f.meal_type == slot] for slot in meal_slots}

    # Constraint: pick at least 1 and at most max_items_per_slot foods per slot
    for slot in meal_slots:
        slot_foods = foods_by_slot[slot]
        if slot_foods:
            prob += pulp.lpSum(food_vars[f.id] for f in slot_foods) >= 1
            prob += pulp.lpSum(food_vars[f.id] for f in slot_foods) <= max_items_per_slot

    # Deviation variables (absolute difference from target, for each macro)
    total_cal = pulp.lpSum(food_vars[f.id] * f.calories for f in all_foods)
    total_protein = pulp.lpSum(food_vars[f.id] * f.protein_g for f in all_foods)
    total_carbs = pulp.lpSum(food_vars[f.id] * f.carbs_g for f in all_foods)
    total_fat = pulp.lpSum(food_vars[f.id] * f.fat_g for f in all_foods)

    dev_cal = pulp.LpVariable("dev_cal", lowBound=0)
    dev_protein = pulp.LpVariable("dev_protein", lowBound=0)
    dev_carbs = pulp.LpVariable("dev_carbs", lowBound=0)
    dev_fat = pulp.LpVariable("dev_fat", lowBound=0)

    prob += total_cal - target_calories <= dev_cal
    prob += target_calories - total_cal <= dev_cal

    prob += total_protein - target_protein <= dev_protein
    prob += target_protein - total_protein <= dev_protein

    prob += total_carbs - target_carbs <= dev_carbs
    prob += target_carbs - total_carbs <= dev_carbs

    prob += total_fat - target_fat <= dev_fat
    prob += target_fat - total_fat <= dev_fat

   # Bonus terms: reward selecting high-protein or folate-rich foods when preferred
    bonus_terms = []
    if prefer_high_protein:
        # Reward protein grams directly - a small negative weight in a minimize problem acts as a bonus
        bonus_terms.append(-0.3 * pulp.lpSum(food_vars[f.id] * f.protein_g for f in all_foods))
    if prefer_folate:
        folate_bonus = pulp.lpSum(food_vars[f.id] for f in all_foods if f.is_folate_rich)
        bonus_terms.append(-5 * folate_bonus)

    # Minimize weighted total deviation (calories weighted highest), plus any bonus terms
    prob += 2 * dev_cal + dev_protein + dev_carbs + dev_fat + pulp.lpSum(bonus_terms)

    prob.solve(pulp.PULP_CBC_CMD(msg=0))

    # --- Build the result ---
    plan = {slot: [] for slot in meal_slots}
    for f in all_foods:
        if pulp.value(food_vars[f.id]) == 1:
            plan[f.meal_type].append({
                "name": f.name,
                "calories": f.calories,
                "protein_g": f.protein_g,
                "carbs_g": f.carbs_g,
                "fat_g": f.fat_g,
            })

    total_calories = sum(item["calories"] for slot in plan.values() for item in slot)
    total_protein_val = sum(item["protein_g"] for slot in plan.values() for item in slot)
    total_carbs_val = sum(item["carbs_g"] for slot in plan.values() for item in slot)
    total_fat_val = sum(item["fat_g"] for slot in plan.values() for item in slot)

    return {
        "plan": plan,
        "totals": {
            "calories": round(total_calories, 1),
            "protein_g": round(total_protein_val, 1),
            "carbs_g": round(total_carbs_val, 1),
            "fat_g": round(total_fat_val, 1),
        },
        "targets": {
            "calories": target_calories,
            "protein_g": target_protein,
            "carbs_g": target_carbs,
            "fat_g": target_fat,
        },
    }