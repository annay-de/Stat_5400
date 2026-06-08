import { Link } from "react-router-dom";
import { MathBlock } from "../components/MathBlock";
import { PageHeader } from "../components/PageHeader";
import { archetypes } from "../data/archetypes";
import { problemBank } from "../data/problemBank";

export function ArchetypesPage() {
  return (
    <div>
      <PageHeader eyebrow="Question recognition engine" title="How do I recognise this question?" description="Match wording to method before doing algebra. Each archetype links to one solved problem and one generated practice question." />
      <div className="space-y-5">
        {archetypes.map((archetype, index) => {
          const solved = problemBank.find((problem) => problem.id === archetype.solvedProblemId);
          return (
            <article key={archetype.id} className="paper-card human-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-ocean">Archetype {index + 1}</div>
                  <h2 className="mt-1 font-sans text-2xl font-semibold text-ink">{archetype.title}</h2>
                </div>
                {solved ? <Link to={`/problem/${solved.id}`} className="focus-ring rounded-full border border-white/10 bg-lavender px-3 py-2 text-sm text-white shadow-soft">Solved example</Link> : null}
              </div>
              <div className="mt-5 grid gap-5 lg:grid-cols-3">
                <Panel title="Recognition cues" items={archetype.keywords} />
                <Panel title="Required assumptions" items={archetype.assumptions} />
                <Panel title="Common mistakes" items={archetype.mistakes} />
              </div>
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div>
                  <h3 className="font-sans text-xl font-semibold text-ink">Formulae</h3>
                  <div className="mt-3 space-y-2">
                    {archetype.formulae.map((formula) => <MathBlock key={formula} formula={formula} />)}
                  </div>
                </div>
                <div>
                  <h3 className="font-sans text-xl font-semibold text-ink">Step-by-step algorithm</h3>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-graphite">
                    {archetype.algorithm.map((step) => <li key={step}>{step}</li>)}
                  </ol>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="font-sans text-lg font-semibold text-ink">Generated practice</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite">{archetype.practice}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="font-sans text-lg font-semibold text-ink">Exam answer template</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-graphite">
                    {archetype.template.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-sans text-xl font-semibold text-ink">{title}</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-graphite">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
