import { ArrowRight, BookMarked, FlaskConical, ListChecks, Sigma, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { StatCard } from "../components/StatCard";
import { problemBank } from "../data/problemBank";
import { studyPlan } from "../data/studyPlan";

const shortcuts = [
  { label: "Start Today", to: "/modules/probability", icon: BookMarked, tone: "bg-teal/10 text-forest border-teal/20" },
  { label: "Final Exam Mode", to: "/exam-mode", icon: Timer, tone: "bg-blush/10 text-oxblood border-blush/20" },
  { label: "Problem Bank", to: "/problem-bank", icon: ListChecks, tone: "bg-ocean/10 text-ocean border-ocean/20" },
  { label: "Formula and Method Sheet", to: "/formula-sheet", icon: Sigma, tone: "bg-honey/10 text-brass border-honey/25" },
  { label: "Visual Playgrounds", to: "/visual-lab", icon: FlaskConical, tone: "bg-lavender text-slateblue border-slateblue/15" },
];

const dayTones = [
  "border-ocean/20 bg-ocean/10 text-ocean",
  "border-teal/20 bg-teal/10 text-forest",
  "border-honey/25 bg-honey/10 text-brass",
  "border-blush/20 bg-blush/10 text-oxblood",
  "border-slateblue/20 bg-lavender text-slateblue",
  "border-forest/20 bg-sage text-forest",
  "border-ink/10 bg-quiet-band text-ink",
];

export function DashboardPage() {
  const finalProblems = problemBank.filter((problem) => problem.examRelevance === "Final").length;
  const hardProblems = problemBank.filter((problem) => problem.difficulty === "Hard" || problem.difficulty === "Exam").length;

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="hero-glass flex min-h-[420px] flex-col justify-between rounded-md p-6">
          <div>
            <div className="inline-flex rounded-full border border-ocean/15 bg-ocean/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-ocean">
              One-week intensive study system
            </div>
            <h1 className="mt-5 max-w-3xl font-sans text-4xl font-semibold leading-tight text-ink md:text-6xl">
              Statistics Mastery Lab
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-graphite">
              A visual and mathematical cockpit for probability, distributions, inference, asymptotics and exam-style problem solving.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`focus-ring flex items-center justify-between rounded-md border px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-soft ${item.tone}`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={17} />
                    {item.label}
                  </span>
                  <ArrowRight size={15} />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="grid content-start gap-4">
          <StatCard label="Problem bank" value={`${problemBank.length} encoded`} detail="All problem sets, discussions and sample final questions are represented with solutions." />
          <StatCard label="Final emphasis" value={`${finalProblems} final-grade drills`} detail="Inference, MLE, Delta Method, F-tests and power are prioritised for Day 7." />
          <StatCard label="Hard questions" value={`${hardProblems} high-friction items`} detail="Transformation, joint densities, asymptotics and exam inference are surfaced for repeated practice." />
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">One-week emergency plan</div>
            <h2 className="mt-1 font-sans text-3xl font-semibold text-ink">Seven days, no wandering</h2>
          </div>
          <Link to="/survival-sheet" className="focus-ring hidden rounded bg-accent-hero px-4 py-2 text-sm font-medium text-white shadow-colour sm:inline-flex">
            Final survival sheet
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {studyPlan.map((day, index) => (
            <article key={day.day} className="paper-card accent-strip rounded p-4">
              <div className="flex items-center justify-between gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded border font-sans text-lg font-semibold ${dayTones[index % dayTones.length]}`}>
                  {day.day}
                </span>
                <span className={`rounded border px-2 py-1 text-xs ${dayTones[index % dayTones.length]}`}>Day {day.day}</span>
              </div>
              <h3 className="mt-4 min-h-16 font-sans text-lg font-semibold leading-tight text-ink">{day.title}</h3>
              <div className="mt-4 space-y-3 text-sm leading-6 text-graphite">
                <p><strong className="text-ink">Learn:</strong> {day.concepts.join(", ")}</p>
                <p><strong className="text-ink">Solve:</strong> {day.problems.join(", ")}</p>
                <p><strong className="text-ink">Visuals:</strong> {day.visuals.join(", ")}</p>
                <p><strong className="text-ink">Memorise:</strong> {day.formulae.join(", ")}</p>
                <p><strong className="text-ink">Self-test:</strong> {day.selfTest}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
