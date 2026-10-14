import Link from "next/link";
import { breadcrumbLd, JsonLd } from "@/lib/jsonld";

export type Crumb = { name: string; path: string };

/** Cabecera de página interna con migas de pan (visibles + JSON-LD). */
export function PageHeader({ crumbs, eyebrow, title, emphasis, intro, children }: {
  crumbs: Crumb[]; eyebrow?: string; title: React.ReactNode; emphasis?: string; intro?: string; children?: React.ReactNode;
}) {
  const all = [{ name: "Inicio", path: "/" }, ...crumbs];
  return (
    <header className="mx-auto max-w-[1400px] px-4 pt-28 pb-14 sm:px-6 md:pt-36 md:pb-20 lg:px-10">
      <JsonLd data={breadcrumbLd(all)} />
      <nav aria-label="Migas de pan" className="mb-10">
        <ol className="label-mono flex flex-wrap items-center gap-2 text-fg-3">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < all.length - 1 ? (
                <Link href={c.path} className="inline-flex min-h-8 items-center hover:text-fg">{c.name}</Link>
              ) : (
                <span aria-current="page" className="text-fg-2">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {eyebrow && <p data-reveal className="label-mono mb-5 text-accent">{eyebrow}</p>}
      <h1 data-reveal style={{ "--i": 1 } as React.CSSProperties} className="heading max-w-[18ch] text-[clamp(40px,6.5vw,96px)]">
        {title} {emphasis && <em>{emphasis}</em>}
      </h1>
      {intro && <p data-reveal style={{ "--i": 2 } as React.CSSProperties} className="mt-6 max-w-[60ch] text-lg leading-relaxed text-fg-2">{intro}</p>}
      {children}
    </header>
  );
}
