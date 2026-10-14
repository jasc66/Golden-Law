export function Process({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="grid grid-lines gap-px md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-col gap-4 bg-bg p-6 lg:p-8">
          <span aria-hidden="true" className="font-display text-6xl font-semibold tracking-[-0.04em] text-fg-3 [font-stretch:118%]">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="heading text-2xl"><span className="sr-only">Paso {i + 1}: </span>{s.title}</h3>
          <p className="text-fg-2 leading-relaxed">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
