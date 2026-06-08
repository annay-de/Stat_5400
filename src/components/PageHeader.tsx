export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="mb-6">
      {eyebrow ? (
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass">
          {eyebrow}
        </div>
      ) : null}
      <h1 className="font-serif text-3xl font-semibold leading-tight text-ink md:text-5xl">{title}</h1>
      {description ? <p className="mt-3 max-w-3xl text-base leading-7 text-graphite">{description}</p> : null}
    </section>
  );
}
