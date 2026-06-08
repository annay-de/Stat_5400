import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { courseModules, moduleDependencies } from "../data/courseTopics";

const mapTones = [
  "border-ocean/20 bg-surface/80 text-ocean",
  "border-forest/20 bg-surface/80 text-forest",
  "border-brass/25 bg-surface/80 text-brass",
  "border-oxblood/20 bg-surface/80 text-oxblood",
  "border-slateblue/20 bg-surface/80 text-slateblue",
  "border-forest/20 bg-surface/80 text-forest",
];

export function CourseMapPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Dependency map"
        title="How the ideas compound"
        description="Probability is the grammar. Inference is the final essay. Each node below links the next idea to the one it depends on."
      />
      <div className="paper-card overflow-x-auto rounded p-5">
        <div className="flex min-w-[980px] items-center gap-3">
          {moduleDependencies.map((node, index) => {
            const module = courseModules.find((topic) => node.toLowerCase().startsWith(topic.shortTitle.toLowerCase().split(" ")[0]));
            const fallback = courseModules[Math.min(index, courseModules.length - 1)];
            const target = module ?? fallback;
            return (
              <div key={node} className="flex items-center gap-3">
                <Link
                  to={`/modules/${target.id}`}
                  className={`focus-ring flex h-32 w-36 flex-col items-center justify-center rounded border px-3 text-center transition hover:-translate-y-0.5 hover:bg-surface hover:shadow-soft ${mapTones[index % mapTones.length]}`}
                >
                  <span className="font-sans text-base font-semibold">{node}</span>
                  <span className="mt-2 text-xs leading-5 text-graphite">Open module</span>
                </Link>
                {index < moduleDependencies.length - 1 ? (
                  <div className="h-px w-8 bg-ocean/25 after:ml-7 after:block after:h-2 after:w-2 after:-translate-y-[3.5px] after:rotate-45 after:border-r after:border-t after:border-ocean/35" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {courseModules.map((module, index) => (
          <Link key={module.id} to={`/modules/${module.id}`} className="paper-card focus-ring accent-strip rounded p-5 transition hover:-translate-y-0.5 hover:border-ocean/35 hover:shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">{module.shortTitle}</div>
            <h2 className="mt-2 font-sans text-2xl font-semibold text-ink">{module.title}</h2>
            <p className="mt-3 text-sm leading-6 text-graphite">{module.question}</p>
            <div className={`mt-4 inline-flex rounded border px-2 py-1 text-xs ${mapTones[index % mapTones.length]}`}>
              Open learning route
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
