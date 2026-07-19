from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    health_profile = relationship("HealthProfile", back_populates="user", uselist=False)
    diet_plans = relationship("DietPlan", back_populates="user")


class HealthProfile(Base):
    __tablename__ = "health_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)         # "male" / "female"
    height_cm = Column(Float, nullable=False)
    weight_kg = Column(Float, nullable=False)
    activity_level = Column(String, nullable=False)  # sedentary / light / moderate / active / very_active
    diet_type = Column(String, nullable=True)         # "veg" / "non-veg"
    region = Column(String, nullable=True)             # "north" / "south" / "east" / "west"
    goal = Column(String, nullable=True)               # "lose" / "maintain" / "gain"
    health_condition = Column(String, nullable=True)    # "none" / "pcos" / "type2_diabetes" / "hypertension" / "high_blood_sugar"
    goal_timeline = Column(String, nullable=True)        # "none" / "wedding_prep" / "muscle_hypertrophy"
    genetic_variants = Column(String, nullable=True)  # comma-separated: e.g. "mthfr,apoe4"

    bmr = Column(Float, nullable=True)
    tdee = Column(Float, nullable=True)

    user = relationship("User", back_populates="health_profile")


class Food(Base):
    __tablename__ = "foods"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    region = Column(String, nullable=False)      # north / south / east / west
    diet_type = Column(String, nullable=False)   # veg / non-veg
    meal_type = Column(String, nullable=False)   # breakfast / lunch / dinner / snack

    calories = Column(Float, nullable=False)
    protein_g = Column(Float, nullable=False)
    carbs_g = Column(Float, nullable=False)
    fat_g = Column(Float, nullable=False)
    glycemic_load = Column(String, nullable=False, default="medium")  # "low" / "medium" / "high"
    saturated_fat_level = Column(String, nullable=False, default="medium")  # "low" / "medium" / "high"
    is_dairy_heavy = Column(Boolean, nullable=False, default=False)
    is_folate_rich = Column(Boolean, nullable=False, default=False)


class DietPlan(Base):
    __tablename__ = "diet_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    target_calories = Column(Float, nullable=False)
    target_protein = Column(Float, nullable=False)
    target_carbs = Column(Float, nullable=False)
    target_fat = Column(Float, nullable=False)

    plan_json = Column(String, nullable=False)   # stores the generated meal plan as JSON text

    user = relationship("User", back_populates="diet_plans")