import type { Faq as FaqItem } from "@/content/types";

/** Preguntas frecuentes con <details> nativo: accesible por teclado sin JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="relative size-4 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-px before:w-4 before:bg-fg after:absolute after:top-0 after:left-1/2 after:h-4 after:w-px after:bg-fg after:transition-transform group-open:after:scale-y-0" />
          </summary>
          <p className="max-w-[68ch] pb-6 leading-relaxed text-fg-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
