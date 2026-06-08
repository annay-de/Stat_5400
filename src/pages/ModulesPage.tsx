import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { courseModules } from "../data/courseTopics";

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
          <Link key={module.id} to={`/modules/${module.id}`} className="paper-card focus-ring rounded p-5 transition hover:-translate-y-0.5 hover:border-forest/50">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-ink/15 bg-white/80 font-serif text-lg font-semibold">
                {index + 1}
              </span>
              <div>
                <h2 className="font-serif text-2xl font-semibold text-ink">{module.title}</h2>
                <p className="mt-2 text-sm leading-6 text-graphite">{module.question}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {module.relatedProblems.map((id) => (
                    <span key={id} className="rounded bg-forest/10 px-2 py-1 text-xs text-forest">{id}</span>
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
