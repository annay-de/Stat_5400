import { Link } from "react-router-dom";
import type { Problem } from "../data/types";

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Link
      to={`/problem/${problem.id}`}
      className="paper-card focus-ring block rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-ocean/35 hover:shadow-soft"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
            {problem.source} · {problem.number}
          </div>
          <h3 className="mt-2 font-sans text-xl font-semibold text-ink">{problem.title}</h3>
        </div>
        <span className="rounded-md border border-ocean/15 bg-ocean/5 px-2 py-1 text-xs text-ocean">
          {problem.difficulty}
        </span>
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-graphite">{problem.statement}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {problem.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-md border border-forest/15 bg-surface/80 px-2 py-1 text-xs text-forest">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
