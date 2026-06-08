export function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="paper-card rounded p-4">
      <div className="text-xs uppercase tracking-[0.16em] text-brass">{label}</div>
      <div className="mt-2 font-serif text-2xl font-semibold text-ink">{value}</div>
      <p className="mt-1 text-sm leading-6 text-graphite">{detail}</p>
    </div>
  );
}
