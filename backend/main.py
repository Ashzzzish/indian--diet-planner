import json
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
import models
from schemas import SignupRequest, LoginRequest, ProfileRequest, DietPlanRequest
from auth import hash_password, verify_password, create_access_token, decode_access_token
from recommend import generate_meal_plan
from medical_adjustments import get_macro_ratio
from genetic_adjustments import get_genetic_adjustments

# Ensure tables exist (safe to call even if they already do)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Indian Diet Planner API")

app = FastAPI(title="Indian Diet Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://indian-diet-planner-eight.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ACTIVITY_MULTIPLIERS = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "very_active": 1.9,
}


def calculate_bmr(age, gender, height_cm, weight_kg):
    if gender.lower() == "male":
        bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5
    else:
        bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161
    return round(bmr, 2)


def calculate_tdee(bmr, activity_level):
    multiplier = ACTIVITY_MULTIPLIERS.get(activity_level.lower(), 1.2)
    return round(bmr * multiplier, 2)


security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security),
                      db: Session = Depends(get_db)):
    token = credentials.credentials
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = db.query(models.User).filter(models.User.id == payload.get("user_id")).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


@app.get("/")
def root():
    return {"message": "Indian Diet Planner API is running"}


# ---------- SIGNUP ----------
@app.post("/signup")
def signup(req: SignupRequest, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = models.User(email=req.email, hashed_password=hash_password(req.password))
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"user_id": user.id})
    return {"access_token": token, "token_type": "bearer"}


# ---------- LOGIN ----------
@app.post("/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    token = create_access_token({"user_id": user.id})
    return {"access_token": token, "token_type": "bearer"}


# ---------- SUBMIT PROFILE (calculates BMR/TDEE and saves it) ----------
@app.post("/profile")
def submit_profile(req: ProfileRequest, db: Session = Depends(get_db),
                    current_user: models.User = Depends(get_current_user)):
    bmr = calculate_bmr(req.age, req.gender, req.height_cm, req.weight_kg)
    tdee = calculate_tdee(bmr, req.activity_level)

    existing_profile = db.query(models.HealthProfile).filter(
        models.HealthProfile.user_id == current_user.id
    ).first()

    if existing_profile:
        existing_profile.age = req.age
        existing_profile.gender = req.gender
        existing_profile.height_cm = req.height_cm
        existing_profile.weight_kg = req.weight_kg
        existing_profile.activity_level = req.activity_level
        existing_profile.diet_type = req.diet_type
        existing_profile.region = req.region
        existing_profile.goal = req.goal
        existing_profile.health_condition = req.health_condition
        existing_profile.goal_timeline = req.goal_timeline
        existing_profile.bmr = bmr
        existing_profile.tdee = tdee
        existing_profile.genetic_variants = req.genetic_variants
    else:
        existing_profile = models.HealthProfile(
            user_id=current_user.id,
            age=req.age,
            gender=req.gender,
            height_cm=req.height_cm,
            weight_kg=req.weight_kg,
            activity_level=req.activity_level,
            diet_type=req.diet_type,
            region=req.region,
            goal=req.goal,
            health_condition=req.health_condition,
            goal_timeline=req.goal_timeline,
            bmr=bmr,
            tdee=tdee,
            genetic_variants=req.genetic_variants,
        )
        db.add(existing_profile)

    db.commit()
    db.refresh(existing_profile)

    return {
        "bmr": bmr,
        "tdee": tdee,
        "message": "Profile saved successfully",
    }
    # ---------- GET PROFILE (for dashboard + editing) ----------
@app.get("/profile")
def get_profile(db: Session = Depends(get_db),
                 current_user: models.User = Depends(get_current_user)):
    profile = db.query(models.HealthProfile).filter(
        models.HealthProfile.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(status_code=404, detail="No profile found. Please complete onboarding.")

    return {
        "age": profile.age,
        "gender": profile.gender,
        "height_cm": profile.height_cm,
        "weight_kg": profile.weight_kg,
        "activity_level": profile.activity_level,
        "diet_type": profile.diet_type,
        "region": profile.region,
        "goal": profile.goal,
        "health_condition": profile.health_condition,
        "goal_timeline": profile.goal_timeline,
        "bmr": profile.bmr,
        "tdee": profile.tdee,
        "genetic_variants": profile.genetic_variants,
    }


# ---------- GENERATE DIET PLAN ----------
@app.post("/diet-plan")
def create_diet_plan(req: DietPlanRequest, db: Session = Depends(get_db),
                      current_user: models.User = Depends(get_current_user)):
    profile = db.query(models.HealthProfile).filter(
        models.HealthProfile.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(status_code=400, detail="Submit your profile first via /profile")

    target_calories = profile.tdee

    ratio, notes = get_macro_ratio(profile.health_condition, profile.goal_timeline)

    high_gi_conditions = {"pcos", "type2_diabetes", "high_blood_sugar"}
    avoid_high_gi = profile.health_condition in high_gi_conditions

    genetic_adj, genetic_notes = get_genetic_adjustments(profile.genetic_variants)

    if genetic_adj["avoid_high_gi"]:
        avoid_high_gi = True

    notes.extend(genetic_notes)

    target_protein = round((target_calories * ratio["protein"]) / 4, 1)
    target_carbs = round((target_calories * ratio["carbs"]) / 4, 1)
    target_fat = round((target_calories * ratio["fat"]) / 9, 1)

    result = generate_meal_plan(
        target_calories=target_calories,
        target_protein=target_protein,
        target_carbs=target_carbs,
        target_fat=target_fat,
        region=profile.region,
        diet_type=profile.diet_type,
        max_items_per_slot=req.max_items_per_slot,
        avoid_high_gi=avoid_high_gi,
        avoid_high_sat_fat=genetic_adj["lower_saturated_fat"],
        avoid_dairy=genetic_adj["avoid_dairy_heavy"],
        prefer_high_protein=genetic_adj["higher_protein_satiety"],
        prefer_folate=genetic_adj["prioritize_folate"],
    )

    if avoid_high_gi:
        notes.append("High-glycemic dishes (e.g. white rice, refined-flour items) were excluded from your plan given your selected health condition.")

    diet_plan = models.DietPlan(
        user_id=current_user.id,
        target_calories=target_calories,
        target_protein=target_protein,
        target_carbs=target_carbs,
        target_fat=target_fat,
        plan_json=json.dumps(result),
    )
    db.add(diet_plan)
    db.commit()

    result["notes"] = notes
    return result
    