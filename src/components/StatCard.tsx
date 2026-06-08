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
    <div className="paper-card human-card p-5">
      <div className="text-sm font-semibold text-ocean">{label}</div>
      <div className="mt-2 font-sans text-2xl font-semibold leading-tight text-ink">{value}</div>
      <p className="mt-1 text-sm leading-6 text-graphite">{detail}</p>
    </div>
  );
}
