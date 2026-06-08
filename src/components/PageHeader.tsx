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
    <section className="mb-7 max-w-5xl">
      {eyebrow ? (
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brass">
          {eyebrow}
        </div>
      ) : null}
      <h1 className="font-serif text-3xl font-semibold leading-[1.08] text-ink md:text-4xl xl:text-5xl">{title}</h1>
      {description ? <p className="mt-3 max-w-3xl text-[15px] leading-7 text-graphite">{description}</p> : null}
    </section>
  );
}
