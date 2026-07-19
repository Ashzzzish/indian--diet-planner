import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { Coffee, Sun, Moon, Cookie, ArrowLeft } from "lucide-react";

const SLOT_LABELS = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

const SLOT_ICONS = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
  snack: Cookie,
};

function todayKey() {
  const d = new Date();
  return `eaten_${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function DietPlan() {
  const [plan, setPlan] = useState(null);
  const [eaten, setEaten] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await client.post("/diet-plan", { max_items_per_slot: 2 });
        setPlan(res.data);

        const saved = localStorage.getItem(todayKey());
        if (saved) setEaten(JSON.parse(saved));
      } catch (err) {
        setError(
          err.response?.data?.detail || "Could not generate your diet plan."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []);

  const toggleEaten = (slot, index) => {
    const key = `${slot}-${index}`;
    setEaten((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem(todayKey(), JSON.stringify(updated));
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-body text-ink/60">Generating your meal plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <p className="font-body text-red-600">{error}</p>
      </div>
    );
  }

  const { plan: meals, totals, targets } = plan;

  // Calculate what's actually been eaten so far today
  let eatenCalories = 0, eatenProtein = 0, eatenCarbs = 0, eatenFat = 0;
  Object.entries(meals).forEach(([slot, items]) => {
    (items || []).forEach((item, i) => {
      if (eaten[`${slot}-${i}`]) {
        eatenCalories += item.calories;
        eatenProtein += item.protein_g;
        eatenCarbs += item.carbs_g;
        eatenFat += item.fat_g;
      }
    });
  });

  const progressPct = Math.min(100, Math.round((eatenCalories / targets.calories) * 100));

  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-display font-semibold text-forest">
            Today's Diet Plan
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-body text-ink/50 hover:text-ink flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </button>
        </div>

        {/* Progress tracker */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-body font-medium text-ink">
              Today's progress
            </p>
            <p className="text-sm font-body text-ink/50">
              {Math.round(eatenCalories)} / {Math.round(targets.calories)} kcal
            </p>
          </div>
          <div className="w-full h-3 bg-sand rounded-full overflow-hidden">
            <div
              className="h-full bg-clay transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs font-body text-ink/40 mt-2">
            Check off items below as you eat them — your progress bar updates automatically.
          </p>
        </div>

        {/* Meal slots */}
        <div className="space-y-4 mb-6">
          {Object.entries(meals).map(([slot, items]) => {
            const Icon = SLOT_ICONS[slot];
            return (
            <div key={slot} className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-clay/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-clay" />
                </div>
                <h2 className="text-lg font-display font-semibold text-forest">
                  {SLOT_LABELS[slot] || slot}
                </h2>
              </div>
              {items && items.length > 0 ? (
                <ul className="space-y-2">
                  {items.map((item, i) => {
                    const key = `${slot}-${i}`;
                    const isEaten = !!eaten[key];
                    return (
                      <li
                        key={i}
                        className="flex items-center gap-3 font-body text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={isEaten}
                          onChange={() => toggleEaten(slot, i)}
                          className="w-4 h-4 accent-clay cursor-pointer"
                        />
                        <span
                          className={`flex-1 ${
                            isEaten ? "text-ink/40 line-through" : "text-ink"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="text-ink/50 text-xs">
                          {item.calories} kcal · P {item.protein_g}g · C{" "}
                          {item.carbs_g}g · F {item.fat_g}g
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm font-body text-ink/40">
                  No item available for this slot yet.
                </p>
              )}
            </div>
            );
          })}
        </div>

        {/* Totals vs targets */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="text-lg font-display font-semibold text-forest mb-4">
            Full day plan vs. targets
          </h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { label: "Calories", total: totals.calories, target: targets.calories, unit: "" },
              { label: "Protein", total: totals.protein_g, target: targets.protein_g, unit: "g" },
              { label: "Carbs", total: totals.carbs_g, target: targets.carbs_g, unit: "g" },
              { label: "Fat", total: totals.fat_g, target: targets.fat_g, unit: "g" },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-xs font-body text-ink/50 mb-1">{m.label}</p>
                <p className="font-display font-semibold text-ink">
                  {Math.round(m.total)}
                  {m.unit}
                </p>
                <p className="text-xs font-body text-ink/40">
                  of {Math.round(m.target)}
                  {m.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DietPlan;