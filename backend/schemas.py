from pydantic import BaseModel
from typing import Optional


class SignupRequest(BaseModel):
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class ProfileRequest(BaseModel):
    age: int
    gender: str
    height_cm: float
    weight_kg: float
    activity_level: str
    diet_type: str      # "veg" / "non-veg"
    region: str          # "north" / "south" / "east" / "west"
    goal: Optional[str] = "maintain"   # "lose" / "maintain" / "gain"
    health_condition: Optional[str] = "none"
    goal_timeline: Optional[str] = "none"
    genetic_variants: Optional[str] = None  # comma-separated variant codes


class DietPlanRequest(BaseModel):
    max_items_per_slot: Optional[int] = 2