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
        <div className="mb-2 text-sm font-medium text-ocean">
          {eyebrow}
        </div>
      ) : null}
      <h1 className="font-sans text-3xl font-semibold leading-[1.12] text-ink md:text-4xl xl:text-[3.1rem]">{title}</h1>
      {description ? <p className="mt-3 max-w-3xl text-base leading-7 text-graphite">{description}</p> : null}
    </section>
  );
}
