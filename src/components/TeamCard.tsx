import Link from "next/link";
import { ViewTransition } from "react";
import type { Lawyer } from "@/content/types";
import { areaName } from "@/content";
import { Portrait } from "./Portrait";

export function TeamCard({ lawyer, headingLevel = 3 }: { lawyer: Lawyer; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <article className="group relative flex h-full flex-col bg-bg">
      <ViewTransition name={`lawyer-${lawyer.slug}`} share="morph" default="none">
        <div><Portrait lawyer={lawyer} decorative /></div>
      </ViewTransition>
      <div className="flex flex-col gap-2 p-6">
        <H className="heading text-2xl">
          <Link href={`/equipo/${lawyer.slug}`} className="after:absolute after:inset-0">{lawyer.name}</Link>
        </H>
        <p className="label-mono text-accent">{lawyer.role}</p>
        <p className="text-sm text-fg-2">{lawyer.areas.map(areaName).join(" · ")}</p>
        <p className="text-sm text-fg-3">{lawyer.license}</p>
      </div>
    </article>
  );
}
