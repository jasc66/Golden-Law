import type { Testimonial } from "@/content/types";
import { Placeholder } from "./Placeholder";

/** Solo se muestra si el perfil tiene testimonios (reales y con permiso). */
export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <ul className="grid grid-lines gap-px md:grid-cols-2">
      {items.map((t, i) => (
        <li key={i} className="bg-bg p-6 lg:p-10">
          <figure className="flex h-full flex-col gap-6">
            {t.videoUrl && (
              <video controls preload="none" className="aspect-video w-full bg-surface-2">
                <source src={t.videoUrl} />
                <track kind="captions" srcLang="es" label="Español" />
              </video>
            )}
            <blockquote className="font-serif text-[clamp(24px,2.4vw,34px)] leading-tight italic">“{t.quote}”</blockquote>
            {t.transcript && (
              <details className="text-sm text-fg-2"><summary className="cursor-pointer">Transcripción</summary><p className="mt-2">{t.transcript}</p></details>
            )}
            <figcaption className="mt-auto flex flex-wrap items-center gap-3">
              <span className="label-mono">{t.author}</span>
              <span className="label-mono text-fg-3">{t.context}</span>
              <Placeholder when={t.placeholder}>Testimonio de ejemplo</Placeholder>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
