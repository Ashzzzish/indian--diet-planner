import { Link } from "react-router-dom";
import {
  Flame, Utensils, Users, TrendingUp, ArrowRight, Dna, HeartPulse,
} from "lucide-react";

const REGIONS = [
  { name: "North", dish: "Butter Chicken & Chole", color: "bg-clay" },
  { name: "South", dish: "Dosa & Sambar", color: "bg-forest" },
  { name: "East", dish: "Machher Jhol & Cholar Dal", color: "bg-clay/70" },
  { name: "West", dish: "Dhokla & Misal Pav", color: "bg-forest/70" },
];

const FEATURES = [
  {
    icon: Flame,
    title: "Your numbers, calculated",
    desc: "Enter your height, weight, and activity level — get your BMR and daily calorie target instantly, using the same formula clinicians use.",
  },
  {
    icon: Utensils,
    title: "Real Indian food, not generic meal plans",
    desc: "Every recommendation is pulled from an actual database of regional dishes — idli, dal makhani, misal pav — matched to your calorie and macro targets.",
  },
  {
    icon: HeartPulse,
    title: "Built around your health, not just your goal",
    desc: "PCOS, diabetes, hypertension, or a wedding to prep for — your macro targets and food choices adjust to match, with high-GI dishes filtered out when it matters.",
  },
  {
    icon: TrendingUp,
    title: "Track as you go",
    desc: "Check off meals through the day and watch your progress bar fill toward your target — no spreadsheets, no guesswork.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="font-display font-semibold text-lg text-forest">
          Indian Diet Planner
        </span>
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm font-body text-ink/70 hover:text-ink"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-sm font-body font-medium bg-forest text-cream px-5 py-2 rounded-lg hover:bg-forest/90 transition flex items-center gap-1.5"
          >
            Get started
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-clay font-body font-medium text-sm tracking-wide uppercase mb-4">
            A diet plan that speaks your language of food
          </p>
          <h1 className="text-5xl md:text-6xl font-display font-semibold text-forest leading-[1.05] mb-6">
            Eat like home.
            <br />
            Hit your target.
          </h1>
          <p className="text-lg font-body text-ink/70 mb-8 max-w-md">
            Stop adapting Western meal plans to Indian food. Get a calorie
            and macro target built for you, filled with real dishes from
            your region.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/signup"
              className="bg-clay text-cream px-7 py-3 rounded-lg font-body font-medium hover:bg-clay/90 transition flex items-center gap-2 shadow-card"
            >
              Build my diet plan
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="text-ink/70 font-body font-medium hover:text-ink"
            >
              I already have an account →
            </Link>
          </div>
        </div>

        {/* Signature visual: a "thali" of the four regions */}
        <div className="relative flex items-center justify-center">
          <div className="w-72 h-72 rounded-full border-8 border-white shadow-lifted bg-sand relative overflow-hidden">
            {REGIONS.map((r, i) => (
              <div
                key={r.name}
                className={`absolute w-1/2 h-1/2 ${r.color} flex flex-col items-center justify-center text-cream p-4 text-center`}
                style={{
                  top: i < 2 ? 0 : "50%",
                  left: i % 2 === 0 ? 0 : "50%",
                }}
              >
                <p className="font-display font-semibold text-sm">{r.name}</p>
                <p className="font-body text-[10px] opacity-80 mt-1 leading-tight">
                  {r.dish}
                </p>
              </div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-cream shadow-inner" />
            </div>
          </div>
          <p className="absolute -bottom-8 text-xs font-body text-ink/40 text-center w-full">
            One thali, four regional cuisines
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-sand py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-display font-semibold text-forest mb-12 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex gap-4 p-5 rounded-2xl hover:bg-cream transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-ink mb-1">
                      {f.title}
                    </h3>
                    <p className="font-body text-sm text-ink/60 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Stats strip */}
      {/* Stats strip */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { value: "120+", label: "Dishes across India" },
          { value: "4", label: "Regional cuisines" },
          { value: "5", label: "Health conditions supported" },
          { value: "100%", label: "Personalized to you" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-display font-semibold text-clay">
              {s.value}
            </p>
            <p className="text-xs font-body text-ink/50 mt-1">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Nutrigenomics callout */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-forest/5 border border-forest/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-forest flex items-center justify-center flex-shrink-0">
            <Dna className="w-7 h-7 text-cream" />
          </div>
          <div>
            <p className="text-clay font-body font-medium text-xs tracking-wide uppercase mb-2">
              Goes further than most diet apps
            </p>
            <h3 className="text-2xl font-display font-semibold text-forest mb-2">
              Nutrigenomics-informed recommendations
            </h3>
            <p className="font-body text-sm text-ink/60 leading-relaxed max-w-2xl">
              Already have DNA test results? Enter known variants like MTHFR,
              APOE4, or TCF7L2, and your plan adjusts using published
              gene-diet research — favoring folate-rich foods, moderating
              saturated fat, or steering clear of high-glycemic dishes,
              stacked on top of any health condition you've already told us
              about.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-forest py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-semibold text-cream mb-4">
            Your plate, planned properly.
          </h2>
          <p className="font-body text-cream/70 mb-8">
            Takes two minutes. No credit card, no calorie-counting app
            you'll abandon in a week.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-clay text-cream px-8 py-3 rounded-lg font-body font-medium hover:bg-clay/90 transition"
          >
            Get my diet plan
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-8 text-center">
        <p className="text-xs font-body text-ink/40">
          Indian Diet Planner — a student project built with FastAPI, React,
          and real regional nutrition data.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;