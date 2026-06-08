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
    <div className="paper-card rounded-md p-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">{label}</div>
      <div className="mt-2 font-serif text-2xl font-semibold leading-tight text-ink">{value}</div>
      <p className="mt-1 text-sm leading-6 text-graphite">{detail}</p>
    </div>
  );
}
