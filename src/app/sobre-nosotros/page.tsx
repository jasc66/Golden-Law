import type { Metadata } from "next";
import { CtaBlock } from "@/components/CtaBlock";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { mapUrl, site } from "@/content";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: `Historia, valores y sedes de ${site.brand.name}.`,
  alternates: { canonical: "/sobre-nosotros" },
};

export default function AboutPage() {
  const words = site.brand.tagline.split(" ");
  return (
    <>
      <PageHeader crumbs={[{ name: "Sobre nosotros", path: "/sobre-nosotros" }]} eyebrow="Sobre nosotros" title={words.slice(0, -2).join(" ")} emphasis={`${words.slice(-2).join(" ")}.`} />
      <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-10">
        <div className="prose-legal text-lg">{site.about.story.map((p) => <p key={p}>{p}</p>)}</div>
      </div>
      <Section title="Nuestros" emphasis="valores.">
        <ul className="grid grid-lines gap-px md:grid-cols-2 lg:grid-cols-4">
          {site.about.values.map((v) => (
            <li key={v.title} className="flex flex-col gap-3 bg-bg p-6 lg:p-8">
              <h3 className="heading text-2xl">{v.title}</h3>
              <p className="leading-relaxed text-fg-2">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Dónde" emphasis="encontrarnos.">
        <ul className="grid gap-8 lg:grid-cols-2">
          {site.offices.map((o) => (
            <li key={o.name} className="flex flex-col gap-4">
              <MapEmbed query={o.mapQuery} title={`Mapa de la sede ${o.name}`} />
              <h3 className="heading text-2xl">{o.name}</h3>
              <address className="not-italic text-fg-2">{o.street}, {o.city}, {o.country}</address>
              <a href={mapUrl(o.mapQuery)} target="_blank" rel="noopener" className="label-mono inline-flex min-h-11 items-center underline">
                Abrir en Google Maps<span className="sr-only"> (pestaña nueva)</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBlock />
    </>
  );
}
