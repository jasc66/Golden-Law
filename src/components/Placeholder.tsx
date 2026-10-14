import { showPlaceholders } from "@/content";
import { t } from "@/i18n";

/** Marca visible de contenido pendiente. Desactivar con NEXT_PUBLIC_SHOW_PLACEHOLDERS=false. */
export function Placeholder({ when = true, children }: { when?: boolean; children?: React.ReactNode }) {
  if (!showPlaceholders || !when) return null;
  return (
    <span className="label-mono inline-flex items-center gap-1.5 border border-dashed border-accent px-1.5 py-1 text-[0.6875rem] text-accent">
      <span aria-hidden="true">◇</span>
      {children ?? t.placeholder}
    </span>
  );
}
