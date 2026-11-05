export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="mb-7 max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2.5 text-slate-600 dark:text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
