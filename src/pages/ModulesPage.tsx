import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { courseModules } from "../data/courseTopics";

const moduleTones = [
  "border-ocean/20 bg-white/[0.03] text-ocean",
  "border-ocean/20 bg-white/[0.03] text-ocean",
  "border-ocean/20 bg-white/[0.03] text-ocean",
  "border-ocean/20 bg-white/[0.03] text-ocean",
  "border-ocean/20 bg-white/[0.03] text-ocean",
  "border-ocean/20 bg-white/[0.03] text-ocean",
];

export function ModulesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Learning modules"
        title="Visual intuition plus formal derivation"
        description="Every topic follows the same exam-ready structure: problem, intuition, definition, formulae, derivation, method, examples, traps and quiz."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {courseModules.map((module, index) => (
          <Link key={module.id} to={`/modules/${module.id}`} className="paper-card focus-ring human-card p-5 transition hover:-translate-y-0.5 hover:border-ocean/30 hover:shadow-soft">
            <div className="flex items-start gap-4">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-sans text-lg font-semibold ${moduleTones[index % moduleTones.length]}`}>
                {index + 1}
              </span>
              <div>
                <h2 className="font-sans text-2xl font-semibold text-ink">{module.title}</h2>
                <p className="mt-2 text-sm leading-6 text-graphite">{module.question}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {module.relatedProblems.map((id) => (
                    <span key={id} className="quiet-chip rounded-full px-2.5 py-1 text-xs text-graphite">{id}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
