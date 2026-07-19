import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

const STEPS = ["Biometrics", "Goal", "Health", "Genetics", "Diet Type", "Region"];

function Onboarding() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    gender: "male",
    height_cm: "",
    weight_kg: "",
    activity_level: "moderate",
    goal: "maintain",
    health_condition: "none",
    goal_timeline: "none",
    genetic_variants: [],
    diet_type: "veg",
    region: "north",
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleFinish = async () => {
    setError("");
    setLoading(true);
    try {
      await client.post("/profile", {
        age: Number(form.age),
        gender: form.gender,
        height_cm: Number(form.height_cm),
        weight_kg: Number(form.weight_kg),
        activity_level: form.activity_level,
        diet_type: form.diet_type,
        region: form.region,
        goal: form.goal,
        health_condition: form.health_condition,
        goal_timeline: form.goal_timeline,
        genetic_variants: form.genetic_variants.join(","),
      });
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1">
              <div
                className={`h-1.5 rounded-full transition ${
                  i <= step ? "bg-clay" : "bg-sand"
                }`}
              />
              <p
                className={`text-xs mt-1.5 font-body ${
                  i === step ? "text-ink font-medium" : "text-ink/40"
                }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-sand p-6">
          {/* Step 0: Biometrics */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-forest">
                Tell us about yourself
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body font-medium text-ink mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => update("age", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
                    placeholder="21"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-ink mb-1">
                    Gender
                  </label>
                  <select
                    value={form.gender}
                    onChange={(e) => update("gender", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-ink mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={form.height_cm}
                    onChange={(e) => update("height_cm", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
                    placeholder="175"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-ink mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={form.weight_kg}
                    onChange={(e) => update("weight_kg", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
                    placeholder="70"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-ink mb-1">
                  Activity level
                </label>
                <select
                  value={form.activity_level}
                  onChange={(e) => update("activity_level", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
                >
                  <option value="sedentary">Sedentary (little to no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very_active">Very active (hard exercise daily)</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 1: Goal */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-forest">
                What's your goal?
              </h2>
              <div className="space-y-3">
                {[
                  { value: "lose", label: "Lose weight" },
                  { value: "maintain", label: "Maintain weight" },
                  { value: "gain", label: "Gain weight" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update("goal", opt.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg border font-body transition ${
                      form.goal === opt.value
                        ? "border-clay bg-clay/10 text-ink font-medium"
                        : "border-sand text-ink/70"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Step 2: Health & Timeline */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-display font-semibold text-forest mb-1">
                  Any health condition to factor in?
                </h2>
                <p className="text-xs font-body text-ink/40 mb-3">
                  Optional — this adjusts your macro ratio using general
                  nutrition guidelines. Not a substitute for medical advice.
                </p>
                <div className="space-y-2">
                  {[
                    { value: "none", label: "None" },
                    { value: "pcos", label: "PCOS" },
                    { value: "type2_diabetes", label: "Type-2 Diabetes" },
                    { value: "hypertension", label: "Hypertension" },
                    { value: "high_blood_sugar", label: "High blood sugar" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update("health_condition", opt.value)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg border font-body text-sm transition ${
                        form.health_condition === opt.value
                          ? "border-clay bg-clay/10 text-ink font-medium"
                          : "border-sand text-ink/70"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-body font-medium text-ink mb-2">
                  Working toward a specific timeline?
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: "none", label: "None" },
                    { value: "wedding_prep", label: "Wedding prep" },
                    { value: "muscle_hypertrophy", label: "Muscle hypertrophy" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update("goal_timeline", opt.value)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg border font-body text-sm transition ${
                        form.goal_timeline === opt.value
                          ? "border-forest bg-forest/10 text-ink font-medium"
                          : "border-sand text-ink/70"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Step 3: Genetics (optional) */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-forest mb-1">
                Have any DNA test results?
              </h2>
              <p className="text-xs font-body text-ink/40 mb-3">
                Optional. If you've had a genetic test done (e.g. 23andMe),
                select any known variants below to further tailor your plan.
                We don't process raw genetic data — only known results you enter.
              </p>
              <div className="space-y-2">
                {[
                  { value: "mthfr", label: "MTHFR (folate metabolism)" },
                  { value: "apoe4", label: "APOE4 (fat metabolism)" },
                  { value: "fto", label: "FTO (appetite/obesity risk)" },
                  { value: "lct", label: "Lactase non-persistence (lactose intolerance)" },
                  { value: "tcf7l2", label: "TCF7L2 (diabetes risk)" },
                ].map((opt) => {
                  const isSelected = form.genetic_variants.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setForm((f) => ({
                          ...f,
                          genetic_variants: isSelected
                            ? f.genetic_variants.filter((v) => v !== opt.value)
                            : [...f.genetic_variants, opt.value],
                        }));
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg border font-body text-sm transition ${
                        isSelected
                          ? "border-clay bg-clay/10 text-ink font-medium"
                          : "border-sand text-ink/70"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs font-body text-ink/40">
                None selected is completely fine — this step is optional.
              </p>
            </div>
          )}

          {/* Step 4: Diet Type */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-forest">
                Veg or non-veg?
              </h2>
              <div className="space-y-3">
                {[
                  { value: "veg", label: "Vegetarian" },
                  { value: "non-veg", label: "Non-vegetarian" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update("diet_type", opt.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg border font-body transition ${
                      form.diet_type === opt.value
                        ? "border-clay bg-clay/10 text-ink font-medium"
                        : "border-sand text-ink/70"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Region */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-forest">
                Which region's food do you prefer?
              </h2>
              <div className="grid grid-cols-2 gap-3">
  {[
    { value: "north", label: "North Indian" },
    { value: "south", label: "South Indian" },
    { value: "east", label: "East Indian" },
    { value: "west", label: "West Indian" },
  ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update("region", opt.value)}
                    className={`text-left px-4 py-3 rounded-lg border font-body transition ${
                      form.region === opt.value
                        ? "border-clay bg-clay/10 text-ink font-medium"
                        : "border-sand text-ink/70"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              
            </div>
          )}

          {error && <p className="text-red-600 text-sm font-body mt-4">{error}</p>}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className="flex-1 py-2.5 rounded-lg border border-sand text-ink font-body font-medium"
              >
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="flex-1 bg-forest text-cream py-2.5 rounded-lg font-body font-medium hover:bg-forest/90 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                disabled={loading}
                className="flex-1 bg-clay text-cream py-2.5 rounded-lg font-body font-medium hover:bg-clay/90 transition disabled:opacity-60"
              >
                {loading ? "Saving..." : "Finish"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;