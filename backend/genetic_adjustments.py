"""
Nutrigenomics-informed adjustments based on previously-obtained genetic test
results (e.g. from a third-party DNA test). This module does NOT sequence or
analyze raw genetic data — it applies published gene-diet interaction
research to further personalize macro targets and food choices, given
variants the user already knows they carry.

This is a general, published-research-informed layer, not personalized
medical/genetic counseling.
"""

VARIANT_INFO = {
    "mthfr": {
        "label": "MTHFR variant (folate metabolism)",
        "description": "Reduced ability to process folic acid into its active form. Associated with benefit from folate-rich whole foods over synthetic folic acid.",
        "adjustment": "prioritize_folate",
    },
    "apoe4": {
        "label": "APOE4 variant (fat metabolism)",
        "description": "Associated with altered response to saturated fat and cardiovascular risk. Often paired with recommendations to moderate saturated fat.",
        "adjustment": "lower_saturated_fat",
    },
    "fto": {
        "label": "FTO variant (obesity/appetite risk)",
        "description": "Associated with increased hunger signaling and higher obesity risk. Often paired with recommendations for higher protein/fiber satiety.",
        "adjustment": "higher_protein_satiety",
    },
    "lct": {
        "label": "Lactase non-persistence (lactose intolerance)",
        "description": "Reduced ability to digest lactose in adulthood. Dairy-heavy dishes may cause discomfort.",
        "adjustment": "avoid_dairy_heavy",
    },
    "tcf7l2": {
        "label": "TCF7L2 variant (Type-2 diabetes risk)",
        "description": "Associated with increased genetic risk for Type-2 diabetes, independent of diagnosis. Often paired with the same lower-glycemic approach used for diagnosed diabetes.",
        "adjustment": "avoid_high_gi",
    },
}


def get_genetic_adjustments(genetic_variants_str):
    """
    genetic_variants_str: comma-separated string like "mthfr,apoe4" or None/empty.
    Returns a dict of adjustment flags and a list of human-readable notes.
    """
    adjustments = {
        "avoid_high_gi": False,
        "lower_saturated_fat": False,
        "higher_protein_satiety": False,
        "avoid_dairy_heavy": False,
        "prioritize_folate": False,
    }
    notes = []

    if not genetic_variants_str:
        return adjustments, notes

    variants = [v.strip().lower() for v in genetic_variants_str.split(",") if v.strip()]

    for v in variants:
        info = VARIANT_INFO.get(v)
        if not info:
            continue
        adjustments[info["adjustment"]] = True
        notes.append(f"{info['label']}: {info['description']}")

    return adjustments, notes