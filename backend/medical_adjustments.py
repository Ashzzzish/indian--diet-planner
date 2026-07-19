"""
Macro ratio adjustments based on health conditions and goal timelines.

These are general evidence-informed guidelines (not personalized medical
advice). Ratios are expressed as % of total calories: (protein, carbs, fat).
Sources: general diabetic/PCOS nutrition guidelines and ICMR-NIN dietary
patterns commonly cited in Indian clinical nutrition literature.
"""

# Base ratio used when no condition/timeline is selected
DEFAULT_RATIO = {"protein": 0.20, "carbs": 0.50, "fat": 0.30}

CONDITION_RATIOS = {
    "none": DEFAULT_RATIO,
    "pcos": {"protein": 0.25, "carbs": 0.40, "fat": 0.35},
    # Higher protein/fat, lower carb — commonly recommended for insulin resistance in PCOS
    "type2_diabetes": {"protein": 0.25, "carbs": 0.40, "fat": 0.35},
    # Lower carb, moderate protein — reduces blood sugar spikes
    "hypertension": {"protein": 0.20, "carbs": 0.50, "fat": 0.30},
    # Macro ratio similar to default; the real hypertension lever is sodium,
    # which we flag separately as a note, since we don't track sodium per dish yet
    "high_blood_sugar": {"protein": 0.25, "carbs": 0.40, "fat": 0.35},
}

TIMELINE_RATIOS = {
    "none": None,
    "wedding_prep": {"protein": 0.30, "carbs": 0.35, "fat": 0.35},
    # Higher protein to preserve lean mass during a calorie deficit
    "muscle_hypertrophy": {"protein": 0.30, "carbs": 0.45, "fat": 0.25},
    # Higher protein + carbs to support muscle repair and training energy
}

CONDITION_NOTES = {
    "pcos": "Lower-carb, higher-protein ratio to help manage insulin resistance. Not a substitute for medical guidance.",
    "type2_diabetes": "Lower-carb ratio to reduce blood sugar spikes. Please coordinate with your doctor on any medication timing around meals.",
    "hypertension": "Macro ratio unchanged, but consider choosing lower-sodium preparations (less added salt/pickle/papad) since sodium is not yet tracked per dish.",
    "high_blood_sugar": "Lower-carb ratio to help moderate blood sugar response. Please consult a doctor for personalized targets.",
}

TIMELINE_NOTES = {
    "wedding_prep": "Higher protein ratio to help preserve muscle while in a calorie deficit.",
    "muscle_hypertrophy": "Higher protein and carb ratio to support muscle repair and training performance.",
}


def get_macro_ratio(health_condition: str, goal_timeline: str):
    """
    Returns (ratio_dict, notes_list).
    Timeline takes priority over condition if both are set and non-none,
    since timeline usually reflects the more specific, active goal.
    """
    notes = []

    if goal_timeline and goal_timeline != "none" and goal_timeline in TIMELINE_RATIOS:
        ratio = TIMELINE_RATIOS[goal_timeline]
        notes.append(TIMELINE_NOTES.get(goal_timeline, ""))
        return ratio, notes

    if health_condition and health_condition != "none" and health_condition in CONDITION_RATIOS:
        ratio = CONDITION_RATIOS[health_condition]
        notes.append(CONDITION_NOTES.get(health_condition, ""))
        return ratio, notes

    return DEFAULT_RATIO, notes