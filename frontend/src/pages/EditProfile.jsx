import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

function EditProfile() {
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await client.get("/profile");
        setForm({
          age: res.data.age,
          gender: res.data.gender,
          height_cm: res.data.height_cm,
          weight_kg: res.data.weight_kg,
          activity_level: res.data.activity_level,
          goal: res.data.goal,
          diet_type: res.data.diet_type,
          region: res.data.region,
        });
      } catch (err) {
        setError("Could not load your current info.");
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
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

  if (fetching) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-body text-ink/60">Loading your info...</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <p className="font-body text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-display font-semibold text-forest">
            Edit your info
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-body text-ink/50 hover:text-ink"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-sand p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body font-medium text-ink mb-1">Age</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-ink mb-1">Gender</label>
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
              <label className="block text-sm font-body font-medium text-ink mb-1">Height (cm)</label>
              <input
                type="number"
                value={form.height_cm}
                onChange={(e) => update("height_cm", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-ink mb-1">Weight (kg)</label>
              <input
                type="number"
                value={form.weight_kg}
                onChange={(e) => update("weight_kg", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-ink mb-1">Activity level</label>
            <select
              value={form.activity_level}
              onChange={(e) => update("activity_level", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
              <option value="very_active">Very active</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-ink mb-1">Goal</label>
            <select
              value={form.goal}
              onChange={(e) => update("goal", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
            >
              <option value="lose">Lose weight</option>
              <option value="maintain">Maintain weight</option>
              <option value="gain">Gain weight</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-ink mb-1">Diet type</label>
            <select
              value={form.diet_type}
              onChange={(e) => update("diet_type", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
            >
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-vegetarian</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-ink mb-1">Region</label>
            <select
              value={form.region}
              onChange={(e) => update("region", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-sand focus:outline-none focus:ring-2 focus:ring-clay font-body"
            >
              <option value="north">North Indian</option>
              <option value="south">South Indian</option>
              <option value="east">East Indian</option>
              <option value="west">West Indian</option>
            </select>
          </div>

          {error && <p className="text-red-600 text-sm font-body">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-clay text-cream py-2.5 rounded-lg font-body font-medium hover:bg-clay/90 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;