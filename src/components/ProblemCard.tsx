import { Link } from "react-router-dom";
import type { Problem } from "../data/types";

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Link
      to={`/problem/${problem.id}`}
      className="paper-card focus-ring human-card block p-5 transition hover:-translate-y-0.5 hover:border-ocean/30 hover:shadow-soft"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-ocean">
            {problem.source} · {problem.number}
          </div>
          <h3 className="mt-2 font-sans text-xl font-semibold text-ink">{problem.title}</h3>
        </div>
        <span className="quiet-chip rounded-full px-2.5 py-1 text-xs text-ocean">
          {problem.difficulty}
        </span>
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-graphite">{problem.statement}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {problem.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="quiet-chip rounded-full px-2.5 py-1 text-xs text-graphite">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
