import { ArrowRight, BookMarked, FlaskConical, ListChecks, Sigma, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { StatCard } from "../components/StatCard";
import { problemBank } from "../data/problemBank";
import { studyPlan } from "../data/studyPlan";

const shortcuts = [
  { label: "Start practice", to: "/modules/probability", icon: BookMarked },
  { label: "Mock exam", to: "/exam-mode", icon: Timer },
  { label: "Problem bank", to: "/problem-bank", icon: ListChecks },
  { label: "Formula sheet", to: "/formula-sheet", icon: Sigma },
  { label: "Visual lab", to: "/visual-lab", icon: FlaskConical },
];

const dayTones = [
  "border-ocean/20 bg-white/[0.03] text-ocean",
  "border-ocean/20 bg-white/[0.03] text-ocean",
  "border-ocean/20 bg-white/[0.03] text-ocean",
  "border-ocean/20 bg-white/[0.03] text-ocean",
  "border-ocean/20 bg-white/[0.03] text-ocean",
  "border-ocean/20 bg-white/[0.03] text-ocean",
  "border-white/15 bg-white/[0.03] text-ink",
];

export function DashboardPage() {
  const finalProblems = problemBank.filter((problem) => problem.examRelevance === "Final").length;
  const hardProblems = problemBank.filter((problem) => problem.difficulty === "Hard" || problem.difficulty === "Exam").length;

  return (
    <div className="space-y-10">
      <section className="grid gap-7 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="hero-glass flex min-h-[440px] flex-col justify-between rounded-2xl p-7 md:p-9">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm font-medium text-ocean">
              Visual probability and statistics
            </div>
            <h1 className="mt-6 max-w-3xl font-sans text-4xl font-semibold leading-tight text-ink md:text-[4.25rem]">
              Statistics, without the panic.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-graphite">
              A dark study desk for seeing the picture, reading the mathematics, and turning exam questions into calm, written solutions.
            </p>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="focus-ring flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-ink transition hover:-translate-y-0.5 hover:border-ocean/30 hover:bg-lavender/70 hover:shadow-soft"
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
        <div className="grid content-start gap-5">
          <StatCard label="Problem bank" value={`${problemBank.length} encoded`} detail="All problem sets, discussions and sample final questions are represented with solutions." />
          <StatCard label="Final emphasis" value={`${finalProblems} final-grade drills`} detail="Inference, MLE, Delta Method, F-tests and power are prioritised for Day 7." />
          <StatCard label="Hard questions" value={`${hardProblems} high-friction items`} detail="Transformation, joint densities, asymptotics and exam inference are surfaced for repeated practice." />
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-ocean">7-day study plan</div>
            <h2 className="mt-1 font-sans text-3xl font-semibold text-ink">A focused route through the material</h2>
          </div>
          <Link to="/survival-sheet" className="focus-ring hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-ink shadow-soft hover:border-ocean/30 sm:inline-flex">
            Final review
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
          {studyPlan.map((day, index) => (
            <article key={day.day} className="paper-card human-card p-5">
              <div className="flex items-center justify-between gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full border font-sans text-lg font-semibold ${dayTones[index % dayTones.length]}`}>
                  {day.day}
                </span>
                <span className={`rounded-full border px-2.5 py-1 text-xs ${dayTones[index % dayTones.length]}`}>Day {day.day}</span>
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
