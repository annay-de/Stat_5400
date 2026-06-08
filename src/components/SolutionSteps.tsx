export function SolutionSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li key={`${index}-${step}`} className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-semibold text-ocean">
            {index + 1}
          </span>
          <p className="pt-1 text-sm leading-6 text-graphite">{step}</p>
        </li>
      ))}
    </ol>
  );
}
