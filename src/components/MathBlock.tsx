import { BlockMath, InlineMath } from "react-katex";

export function MathBlock({ formula }: { formula: string }) {
  return (
    <div className="math-scroll rounded border border-ink/10 bg-white/70 px-3 py-2">
      <BlockMath math={formula} />
    </div>
  );
}

export function MathInline({ formula }: { formula: string }) {
  return <InlineMath math={formula} />;
}
