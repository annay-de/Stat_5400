import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { courseModules } from "../data/courseTopics";

const moduleTones = [
  "border-ocean/20 bg-surface/80 text-ocean",
  "border-forest/20 bg-surface/80 text-forest",
  "border-brass/25 bg-surface/80 text-brass",
  "border-oxblood/20 bg-surface/80 text-oxblood",
  "border-slateblue/20 bg-surface/80 text-slateblue",
  "border-forest/20 bg-surface/80 text-forest",
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
          <Link key={module.id} to={`/modules/${module.id}`} className="paper-card focus-ring accent-strip rounded p-5 transition hover:-translate-y-0.5 hover:border-ocean/35 hover:shadow-soft">
            <div className="flex items-start gap-4">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded border font-sans text-lg font-semibold ${moduleTones[index % moduleTones.length]}`}>
                {index + 1}
              </span>
              <div>
                <h2 className="font-sans text-2xl font-semibold text-ink">{module.title}</h2>
                <p className="mt-2 text-sm leading-6 text-graphite">{module.question}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {module.relatedProblems.map((id) => (
                    <span key={id} className="rounded border border-forest/15 bg-surface/80 px-2 py-1 text-xs text-forest">{id}</span>
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
