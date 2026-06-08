export function SolutionSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li key={`${index}-${step}`} className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-forest/20 bg-surface/80 text-sm font-semibold text-forest">
            {index + 1}
          </span>
          <p className="pt-1 text-sm leading-6 text-graphite">{step}</p>
        </li>
      ))}
    </ol>
  );
}
