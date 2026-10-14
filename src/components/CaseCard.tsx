import type { CaseResult } from "@/content/types";
import { areaName } from "@/content";
import { Placeholder } from "./Placeholder";

export function CaseCard({ c, headingLevel = 3 }: { c: CaseResult; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <article className="flex h-full flex-col gap-4 bg-bg p-6 lg:p-8">
      <div className="flex items-center justify-between gap-3">
        <p className="label-mono text-accent">{areaName(c.area)}</p>
        <p className="label-mono text-fg-3"><span className="sr-only">Año: </span>{c.year}</p>
      </div>
      <H className="heading text-2xl">{c.title}</H>
      <p className="text-fg-2 leading-relaxed">{c.outcome}</p>
      <div className="mt-auto"><Placeholder when={c.placeholder}>Caso de ejemplo</Placeholder></div>
    </article>
  );
}
