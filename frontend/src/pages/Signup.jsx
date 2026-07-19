import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../api/client";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await client.post("/signup", { email, password });
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/onboarding");
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
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-display font-semibold text-forest mb-1">
          Create your account
        </h1>
        <p className="text-ink/60 font-body mb-8">
          Start building your personalized Indian diet plan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-body font-medium text-ink mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-clay font-body"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-ink mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-clay font-body"
              placeholder="At least 6 characters"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-body">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-clay text-cream py-2.5 rounded-lg font-body font-medium hover:bg-clay/90 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-sm text-ink/60 font-body mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-forest font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;