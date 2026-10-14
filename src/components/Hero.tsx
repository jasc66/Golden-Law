import Link from "next/link";
import { site, whatsappUrl } from "@/content";
import { t } from "@/i18n";
import { HeroChrome } from "./HeroChrome";
import { Arrow } from "./Icon";
import { OrbitCards, type OrbitCard } from "./OrbitCards";
import { TrackedLink } from "./TrackedLink";

/** Tarjetas de la órbita: áreas (foto), cifras y notas, intercaladas. Máximo 14. */
function buildCards(): OrbitCard[] {
  const images: OrbitCard[] = site.areas.map((a) => ({ kind: "image", href: `/areas/${a.slug}`, label: a.name, src: a.image }));
  const notes: OrbitCard[] = site.areas.map((a) => ({ kind: "note", href: `/areas/${a.slug}`, title: a.covers[0], label: a.name, icon: a.icon }));
  const stats: OrbitCard[] = site.stats.map((s) => ({ kind: "stat", href: "/#cifras", value: `${s.prefix ?? ""}${s.value}${s.suffix ?? ""}`, label: s.label }));
  const out: OrbitCard[] = [];
  for (let i = 0; out.length < 14 && i < 8; i++) {
    for (const list of [images, stats, notes]) if (list[i] && out.length < 14) out.push(list[i]);
  }
  return out;
}

export function Hero() {
  const { hero, brand } = site;
  return (
    <section aria-labelledby="hero-title" className="hero relative isolate grid min-h-svh place-items-center overflow-hidden px-4 pt-24 pb-32 sm:px-5">
      <OrbitCards cards={buildCards()} inner={site.areas.map((a) => a.image)} />

      <div className="relative z-10 flex max-w-[1100px] flex-col items-center text-center">
        <p data-reveal style={{ "--i": 0 } as React.CSSProperties} className="label-mono mb-5 inline-flex items-center gap-2.5 text-fg-2 max-sm:text-[10px] max-sm:tracking-[0.08em]">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {hero.eyebrow}
        </p>
        <p data-reveal style={{ "--i": 1 } as React.CSSProperties} aria-hidden="true" className="display-wide text-[clamp(44px,12.5vw,160px)] leading-[0.86] max-sm:[font-stretch:112%]">
          {brand.wordmark[0]}
          <br />
          {brand.wordmark[1]}
        </p>
        <h1 id="hero-title" data-reveal style={{ "--i": 2 } as React.CSSProperties} className="heading mt-7 max-w-[18ch] text-[clamp(30px,4.6vw,60px)]">
          <span className="sr-only">{brand.name}: </span>
          {hero.title} <em>{hero.titleEmphasis}</em>
        </h1>
        <p data-reveal style={{ "--i": 3 } as React.CSSProperties} className="mt-5 max-w-[52ch] text-[clamp(16px,1.3vw,18px)] leading-relaxed text-fg-2">
          {hero.subtitle}
        </p>
        <div data-reveal style={{ "--i": 4 } as React.CSSProperties} className="mt-8 flex flex-wrap justify-center gap-2.5">
          <Link href="/contacto#agendar" className="btn btn-primary">
            {t.cta.book} <Arrow />
          </Link>
          <TrackedLink event="click_whatsapp" href={whatsappUrl()} target="_blank" rel="noopener" className="btn btn-ghost">
            {t.cta.whatsapp}<span className="sr-only"> (se abre en una pestaña nueva)</span>
          </TrackedLink>
          <TrackedLink event="click_call" href={`tel:${site.contact.phone}`} className="btn btn-ghost">
            {t.cta.call}
          </TrackedLink>
        </div>
        <p data-reveal style={{ "--i": 5 } as React.CSSProperties} className="label-mono mt-6 text-fg-3">
          {hero.micro.map((m, i) => (
            <span key={m}>
              {i > 0 && <span aria-hidden="true" className="mx-1.5 text-accent">·</span>}
              {m}
            </span>
          ))}
        </p>
      </div>

      <HeroChrome />
      <p aria-hidden="true" className="label-mono absolute bottom-8 left-5 hidden text-fg-3 sm:block">↓ Desplazar</p>
    </section>
  );
}
