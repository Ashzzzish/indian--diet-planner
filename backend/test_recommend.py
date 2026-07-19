from recommend import generate_meal_plan

result = generate_meal_plan(
    target_calories=2000,
    target_protein=100,
    target_carbs=250,
    target_fat=60,
    region="north",
    diet_type="veg",
)

import json
print(json.dumps(result, indent=2))