import requests

BASE_URL = "http://127.0.0.1:8000"

# 1. Signup
signup_resp = requests.post(f"{BASE_URL}/signup", json={
    "email": "test2@example.com",
    "password": "test1234"
})
print("SIGNUP:", signup_resp.status_code, signup_resp.json())

token = signup_resp.json().get("access_token")

headers = {"Authorization": f"Bearer {token}"}

# 2. Submit profile
profile_resp = requests.post(f"{BASE_URL}/profile", json={
    "age": 21,
    "gender": "male",
    "height_cm": 175,
    "weight_kg": 70,
    "activity_level": "moderate",
    "diet_type": "veg",
    "region": "north",
    "goal": "maintain"
}, headers=headers)
print("PROFILE:", profile_resp.status_code, profile_resp.json())

# 3. Generate diet plan
plan_resp = requests.post(f"{BASE_URL}/diet-plan", json={
    "max_items_per_slot": 2
}, headers=headers)
print("DIET PLAN:", plan_resp.status_code, plan_resp.json())