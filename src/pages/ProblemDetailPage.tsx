import { Link, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { SolutionSteps } from "../components/SolutionSteps";
import { archetypes } from "../data/archetypes";
import { problemBank } from "../data/problemBank";

export function ProblemDetailPage() {
  const { id } = useParams();
  const problem = problemBank.find((item) => item.id === id) ?? problemBank[0];
  const archetype = archetypes.find((item) => item.id === problem.archetype);

  return (
    <div>
      <PageHeader eyebrow={`${problem.source} - ${problem.number}`} title={problem.title} description={problem.statement} />
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <section className="paper-card human-card p-5">
            <h2 className="font-sans text-2xl font-semibold text-ink">Final answer</h2>
            <p className="mt-3 text-base leading-7 text-graphite">{problem.finalAnswer}</p>
          </section>
          <section className="paper-card human-card p-5">
            <h2 className="font-sans text-2xl font-semibold text-ink">Exam-style solution</h2>
            <div className="mt-4">
              <SolutionSteps steps={problem.solution} />
            </div>
          </section>
          {problem.visualExplanation ? (
            <section className="paper-card human-card p-5">
              <h2 className="font-sans text-2xl font-semibold text-ink">Visual explanation</h2>
              <p className="mt-3 leading-7 text-graphite">{problem.visualExplanation}</p>
            </section>
          ) : null}
        </div>
        <aside className="space-y-4">
          <div className="paper-card human-card p-5">
            <h2 className="font-sans text-xl font-semibold text-ink">Tags</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {problem.tags.map((tag) => <span key={tag} className="quiet-chip rounded-full px-2.5 py-1 text-xs text-graphite">{tag}</span>)}
            </div>
          </div>
          <div className="paper-card human-card p-5">
            <h2 className="font-sans text-xl font-semibold text-ink">Common traps</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-graphite">
              {problem.commonTraps.map((trap) => <li key={trap}>{trap}</li>)}
            </ul>
          </div>
          <div className="paper-card human-card p-5">
            <h2 className="font-sans text-xl font-semibold text-ink">Similar generated question</h2>
            <p className="mt-3 text-sm leading-6 text-graphite">{problem.similarQuestion}</p>
          </div>
          {archetype ? (
            <Link to="/archetypes" className="paper-card focus-ring human-card block p-5 hover:border-ocean/30">
              <div className="text-sm font-semibold text-ocean">Related archetype</div>
              <div className="mt-2 font-sans text-xl font-semibold text-ink">{archetype.title}</div>
            </Link>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
