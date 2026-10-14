import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { PracticeArea } from "@/content/types";
import { Arrow, Icon } from "./Icon";

/**
 * Rejilla de áreas.
 * - Gesto Blur: al pasar el cursor o enfocar una tarjeta, las demás se desenfocan (.blur-grid).
 * - Gesto Shared Element: título e imagen viajan a la página del área (<ViewTransition name>).
 */
export function PracticeGrid({ areas, headingLevel = 3 }: { areas: PracticeArea[]; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <ul className={`blur-grid grid grid-lines gap-px sm:grid-cols-2 ${areas.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {areas.map((a, i) => (
        <li key={a.slug} className="group relative bg-bg">
          <ViewTransition name={`area-img-${a.slug}`} share="morph" default="none">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={a.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0" />
            </div>
          </ViewTransition>
          <div className="flex flex-col gap-4 p-6 lg:p-8">
            <div className="flex items-center justify-between text-fg-3">
              <Icon name={a.icon} className="text-accent" />
              <span className="label-mono">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <H className="heading text-2xl">
              <Link href={`/areas/${a.slug}`} transitionTypes={["nav-forward"]} className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:outline-accent after:focus-visible:-outline-offset-2">
                <ViewTransition name={`area-title-${a.slug}`} share="morph" default="none">
                  <span className="inline-block">{a.name}</span>
                </ViewTransition>
              </Link>
            </H>
            <p className="text-fg-2 leading-relaxed">{a.short}</p>
            <span aria-hidden="true" className="label-mono mt-auto inline-flex items-center gap-2 text-fg transition-transform group-hover:translate-x-1">
              Ver área <Arrow />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
