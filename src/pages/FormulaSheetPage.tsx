import { useMemo, useState } from "react";
import { MathBlock } from "../components/MathBlock";
import { PageHeader } from "../components/PageHeader";
import { formulaSheet } from "../data/formulaSheet";
import { formulaWhy, referencePrinciples } from "../data/referenceGuides";

export function FormulaSheetPage() {
  const sections = Array.from(new Set(formulaSheet.map((card) => card.section)));
  const [section, setSection] = useState("All");
  const visible = useMemo(
    () => formulaSheet.filter((card) => section === "All" || card.section === section),
    [section]
  );

  return (
    <div>
      <PageHeader
        eyebrow="Formula and method sheet"
        title="The one-page brain, expanded"
        description="Formulae are grouped by the question they answer: what random mechanism is being modelled, what statistic is being used, and what conclusion the calculation permits."
      />
      <section className="mb-7 grid gap-4 lg:grid-cols-5">
        {referencePrinciples.map((principle) => (
          <a
            key={principle.title}
            href={principle.url}
            target="_blank"
            rel="noreferrer"
            className="paper-card focus-ring block rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-teal/35"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brass">{principle.source}</div>
            <h2 className="mt-2 text-sm font-semibold leading-5 text-ink">{principle.title}</h2>
            <p className="mt-2 text-xs leading-5 text-graphite">{principle.note}</p>
          </a>
        ))}
      </section>

      <div className="mb-6 flex gap-2 overflow-x-auto">
        {["All", ...sections].map((item) => (
          <button
            key={item}
            className={`focus-ring shrink-0 rounded-full px-4 py-2 text-sm transition ${
              section === item
                ? "bg-accent-hero text-white shadow-soft"
                : "border border-white/10 bg-surface/70 text-graphite hover:border-teal/30 hover:bg-mist"
            }`}
            onClick={() => setSection(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {visible.map((card) => (
          <article key={`${card.section}-${card.title}`} className="paper-card rounded-2xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">{card.section}</div>
                <h2 className="mt-2 font-sans text-2xl font-semibold text-ink">{card.title}</h2>
              </div>
              <span className="rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-[11px] text-teal">
                use with care
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-graphite">{formulaWhy[card.title] ?? "Use this formula only after identifying the random variable, assumptions and target parameter."}</p>
            <div className="mt-4">
              <MathBlock formula={card.formula} note={card.when} />
            </div>
            <dl className="mt-4 grid gap-3 text-sm leading-6 text-graphite">
              <div className="rounded-xl border border-white/10 bg-paper/35 p-3"><dt className="font-semibold text-ink">Symbols</dt><dd>{card.symbols}</dd></div>
              <div className="rounded-xl border border-white/10 bg-paper/35 p-3"><dt className="font-semibold text-ink">Micro-example</dt><dd>{card.example}</dd></div>
              <div className="rounded-xl border border-oxblood/20 bg-oxblood/10 p-3"><dt className="font-semibold text-ink">Common mistake</dt><dd>{card.mistake}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
