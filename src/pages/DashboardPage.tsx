import { ArrowRight, BookMarked, FlaskConical, ListChecks, Sigma, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { StatCard } from "../components/StatCard";
import { problemBank } from "../data/problemBank";
import { studyPlan } from "../data/studyPlan";

const shortcuts = [
  { label: "Start Today", to: "/modules/probability", icon: BookMarked },
  { label: "Final Exam Mode", to: "/exam-mode", icon: Timer },
  { label: "Problem Bank", to: "/problem-bank", icon: ListChecks },
  { label: "Formula and Method Sheet", to: "/formula-sheet", icon: Sigma },
  { label: "Visual Playgrounds", to: "/visual-lab", icon: FlaskConical },
];

export function DashboardPage() {
  const finalProblems = problemBank.filter((problem) => problem.examRelevance === "Final").length;
  const hardProblems = problemBank.filter((problem) => problem.difficulty === "Hard" || problem.difficulty === "Exam").length;

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex min-h-[420px] flex-col justify-between rounded border border-ink/15 bg-ink p-6 text-paper shadow-paper">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-brass">Ashoka University · Monsoon 2025</div>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-6xl">
              ECO 5400 Statistics for Economics
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-paper/80">
              A one-week visual and mathematical cockpit built from the uploaded problem sets, discussion sheets and sample final questions.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="focus-ring flex items-center justify-between rounded border border-paper/15 bg-paper/8 px-4 py-3 text-sm transition hover:bg-paper/15"
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
            <h2 className="mt-1 font-serif text-3xl font-semibold text-ink">Seven days, no wandering</h2>
          </div>
          <Link to="/survival-sheet" className="focus-ring hidden rounded bg-forest px-4 py-2 text-sm font-medium text-white sm:inline-flex">
            Final survival sheet
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {studyPlan.map((day) => (
            <article key={day.day} className="paper-card rounded p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded border border-ink/15 bg-white/80 font-serif text-lg font-semibold">
                  {day.day}
                </span>
                <span className="rounded bg-brass/10 px-2 py-1 text-xs text-brass">Day {day.day}</span>
              </div>
              <h3 className="mt-4 min-h-16 font-serif text-lg font-semibold leading-tight text-ink">{day.title}</h3>
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
