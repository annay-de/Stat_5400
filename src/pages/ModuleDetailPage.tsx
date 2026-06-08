import { Link, useParams } from "react-router-dom";
import { MathBlock } from "../components/MathBlock";
import { PageHeader } from "../components/PageHeader";
import { courseModules } from "../data/courseTopics";
import { problemBank } from "../data/problemBank";

const sectionLabels = [
  "What problem is this topic trying to solve?",
  "Visual intuition",
  "Formal definition",
  "Core formulae",
  "Derivation",
  "Step-by-step method",
  "Fully solved worked example",
  "Similar generated example",
  "Common exam traps",
  "Quick quiz",
];

export function ModuleDetailPage() {
  const { topic } = useParams();
  const module = courseModules.find((item) => item.id === topic) ?? courseModules[0];
  const related = problemBank.filter((problem) => module.relatedProblems.includes(problem.id));

  return (
    <div>
      <PageHeader eyebrow="Learning module" title={module.title} description={module.question} />
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          {sectionLabels.map((label) => (
            <section key={label} className="paper-card rounded p-5">
              <h2 className="font-serif text-2xl font-semibold text-ink">{label}</h2>
              {label === sectionLabels[0] ? <p className="mt-3 leading-7 text-graphite">{module.question}</p> : null}
              {label === sectionLabels[1] ? <p className="mt-3 leading-7 text-graphite">{module.visualIntuition}</p> : null}
              {label === sectionLabels[2] ? <p className="mt-3 leading-7 text-graphite">{module.formalDefinition}</p> : null}
              {label === sectionLabels[3] ? (
                <div className="mt-4 grid gap-3">
                  {module.formulae.map((formula) => <MathBlock key={formula} formula={formula} />)}
                </div>
              ) : null}
              {label === sectionLabels[4] ? <List items={module.derivation} /> : null}
              {label === sectionLabels[5] ? <List items={module.method} ordered /> : null}
              {label === sectionLabels[6] ? <p className="mt-3 leading-7 text-graphite">{module.courseExample}</p> : null}
              {label === sectionLabels[7] ? <p className="mt-3 leading-7 text-graphite">{module.generatedExample}</p> : null}
              {label === sectionLabels[8] ? <List items={module.traps} /> : null}
              {label === sectionLabels[9] ? <List items={module.quiz} ordered /> : null}
            </section>
          ))}
        </div>
        <aside className="space-y-4">
          <div className="paper-card rounded p-5">
            <h2 className="font-serif text-xl font-semibold text-ink">Worked examples</h2>
            <div className="mt-4 space-y-3">
              {related.map((problem) => (
                <Link key={problem.id} to={`/problem/${problem.id}`} className="block rounded border border-ink/10 bg-white/70 p-3 text-sm hover:border-forest/40">
                  <div className="font-medium text-ink">{problem.title}</div>
                  <div className="mt-1 text-xs text-graphite">{problem.source} · {problem.number}</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`mt-3 space-y-2 text-sm leading-6 text-graphite ${ordered ? "list-decimal pl-5" : "list-disc pl-5"}`}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </Tag>
  );
}
