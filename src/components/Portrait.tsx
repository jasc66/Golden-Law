import Image from "next/image";
import type { Lawyer } from "@/content/types";
import { cn } from "@/lib/cn";

/** Retrato en blanco y negro (color en hover). Sin foto: monograma con las iniciales. */
export function Portrait({ lawyer, className, priority }: { lawyer: Lawyer; className?: string; priority?: boolean }) {
  const initials = lawyer.name.replace(/^(Lic|Licda|Dr|Dra|MSc)\.?\s+/i, "").split(" ").slice(0, 2).map((w) => w[0]).join("");
  return (
    <div className={cn("portrait relative aspect-[4/5] overflow-hidden bg-surface-2", className)}>
      {lawyer.photo ? (
        <Image src={lawyer.photo} alt={`Retrato de ${lawyer.name}`} fill sizes="(min-width: 1024px) 30vw, 90vw" priority={priority} className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0" />
      ) : (
        <div role="img" aria-label={`${lawyer.name} (foto pendiente)`} className="absolute inset-0 grid place-items-center">
          <span aria-hidden="true" className="font-serif text-[clamp(64px,10vw,140px)] italic text-fg-3">{initials}</span>
          <span aria-hidden="true" className="absolute inset-4 border border-line" />
        </div>
      )}
    </div>
  );
}
