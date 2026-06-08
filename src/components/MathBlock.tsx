import { BlockMath, InlineMath } from "react-katex";

export function MathBlock({ formula }: { formula: string }) {
  return (
    <div className="math-scroll rounded border border-ocean/15 bg-white/75 px-3 py-2 shadow-soft">
      <BlockMath math={formula} />
    </div>
  );
}

export function MathInline({ formula }: { formula: string }) {
  return <InlineMath math={formula} />;
}
