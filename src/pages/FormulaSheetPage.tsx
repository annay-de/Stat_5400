import { useMemo, useState } from "react";
import { MathBlock } from "../components/MathBlock";
import { PageHeader } from "../components/PageHeader";
import { formulaSheet } from "../data/formulaSheet";

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
        description="Every formula includes when to use it, what the symbols mean, a micro-example and the mistake that usually costs marks."
      />
      <div className="mb-5 flex gap-2 overflow-x-auto">
        {["All", ...sections].map((item) => (
          <button
            key={item}
            className={`focus-ring shrink-0 rounded px-3 py-2 text-sm ${section === item ? "bg-accent-hero text-white shadow-colour" : "border border-ocean/15 bg-white/70 text-graphite hover:bg-white"}`}
            onClick={() => setSection(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {visible.map((card) => (
          <article key={`${card.section}-${card.title}`} className="paper-card rounded p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">{card.section}</div>
            <h2 className="mt-2 font-sans text-2xl font-semibold text-ink">{card.title}</h2>
            <div className="mt-4">
              <MathBlock formula={card.formula} />
            </div>
            <dl className="mt-4 grid gap-3 text-sm leading-6 text-graphite">
              <div><dt className="font-semibold text-ink">When to use it</dt><dd>{card.when}</dd></div>
              <div><dt className="font-semibold text-ink">Symbols</dt><dd>{card.symbols}</dd></div>
              <div><dt className="font-semibold text-ink">Micro-example</dt><dd>{card.example}</dd></div>
              <div><dt className="font-semibold text-ink">Common mistake</dt><dd>{card.mistake}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
