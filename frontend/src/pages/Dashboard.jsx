import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import client from "../api/client";
import { Flame, Activity, PieChart as PieChartIcon, ChevronRight } from "lucide-react";

const COLORS = ["#C1633B", "#2F4A3C", "#E8DFCE"];

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [diet, setDiet] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await client.get("/profile");
        setProfile(profileRes.data);

        const dietRes = await client.post("/diet-plan", { max_items_per_slot: 2 });
        setDiet(dietRes.data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Could not load your dashboard. Please complete onboarding first."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-body text-ink/60">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-body text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/onboarding")}
            className="bg-forest text-cream px-6 py-2.5 rounded-lg font-body font-medium"
          >
            Go to onboarding
          </button>
        </div>
      </div>
    );
  }

  if (diet.error) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-body text-red-600 mb-4">{diet.error}</p>
        <button
          onClick={() => navigate("/edit-profile")}
          className="bg-forest text-cream px-6 py-2.5 rounded-lg font-body font-medium"
        >
          Edit my profile
        </button>
      </div>
    </div>
  );
}

const { targets } = diet;

  const macroData = [
    { name: "Protein", value: targets.protein_g },
    { name: "Carbs", value: targets.carbs_g },
    { name: "Fat", value: targets.fat_g },
  ];

  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-semibold text-forest">
            Your Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/edit-profile")}
              className="text-sm font-body text-clay hover:text-clay/80 font-medium"
            >
              Edit my info
            </button>
            <button
              onClick={handleLogout}
              className="text-sm font-body text-ink/50 hover:text-ink"
            >
              Log out
            </button>
          </div>
        </div>

        {/* BMR + TDEE cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-card p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-forest/5 rounded-full" />
            <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center mb-3">
              <Activity className="w-5 h-5 text-forest" />
            </div>
            <p className="text-xs font-body text-ink/50 mb-1 uppercase tracking-wide">
              BMR
            </p>
            <p className="text-3xl font-display font-semibold text-forest">
              {Math.round(profile.bmr)}
              <span className="text-base font-body text-ink/40 ml-1">kcal</span>
            </p>
            <p className="text-xs font-body text-ink/40 mt-1">
              Calories burned at rest
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-clay/5 rounded-full" />
            <div className="w-10 h-10 rounded-xl bg-clay/10 flex items-center justify-center mb-3">
              <Flame className="w-5 h-5 text-clay" />
            </div>
            <p className="text-xs font-body text-ink/50 mb-1 uppercase tracking-wide">
              Daily Target (TDEE)
            </p>
            <p className="text-3xl font-display font-semibold text-clay">
              {Math.round(profile.tdee)}
              <span className="text-base font-body text-ink/40 ml-1">kcal</span>
            </p>
            <p className="text-xs font-body text-ink/40 mt-1">
              Includes your activity level
            </p>
          </div>
        </div>

        {/* Macro breakdown */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="w-4 h-4 text-ink/40" />
            <p className="text-sm font-body font-medium text-ink">
              Macro targets (grams/day)
            </p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => `${entry.name}: ${Math.round(entry.value)}g`}
                >
                  {macroData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <button
          onClick={() => navigate("/diet-plan")}
          className="w-full bg-forest text-cream py-4 rounded-xl font-body font-medium hover:bg-forest/90 transition shadow-card flex items-center justify-center gap-2 group"
        >
          View today's diet plan
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;