import csv
from database import SessionLocal
from models import Food

CSV_PATH = "../data/indian_foods.csv"

def load_foods():
    db = SessionLocal()

    # Avoid duplicate inserts if you run this script more than once
    existing_count = db.query(Food).count()
    if existing_count > 0:
        print(f"Foods table already has {existing_count} rows. Skipping insert to avoid duplicates.")
        db.close()
        return

    with open(CSV_PATH, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        count = 0
        for row in reader:
            food = Food(
                name=row["name"],
                region=row["region"],
                diet_type=row["diet_type"],
                meal_type=row["meal_type"],
                calories=float(row["calories"]),
                protein_g=float(row["protein_g"]),
                carbs_g=float(row["carbs_g"]),
                fat_g=float(row["fat_g"]),
                glycemic_load=row["glycemic_load"],
                saturated_fat_level=row["saturated_fat_level"],
                is_dairy_heavy=(row["is_dairy_heavy"].strip().lower() == "true"),
                is_folate_rich=(row["is_folate_rich"].strip().lower() == "true"),
            )
            db.add(food)
            count += 1

        db.commit()
        print(f"Inserted {count} foods into the database.")

    db.close()


if __name__ == "__main__":
    load_foods()