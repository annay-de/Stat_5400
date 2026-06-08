import { BlockMath, InlineMath } from "react-katex";

export function MathBlock({ formula, note }: { formula: string; note?: string }) {
  return (
    <div className="math-panel math-scroll rounded-r-xl px-4 py-3">
      <div className="flex flex-col gap-2">
        <BlockMath math={formula} />
        {note ? <p className="max-w-3xl border-t border-white/10 pt-2 text-sm leading-6 text-graphite">{note}</p> : null}
      </div>
    </div>
  );
}

export function MathInline({ formula }: { formula: string }) {
  return <InlineMath math={formula} />;
}
