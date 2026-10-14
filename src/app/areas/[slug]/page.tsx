import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ContactForm } from "@/components/ContactForm";
import { CtaBlock } from "@/components/CtaBlock";
import { Faq } from "@/components/Faq";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { Process } from "@/components/Process";
import { Section } from "@/components/Section";
import { TeamCard } from "@/components/TeamCard";
import { getArea, getLawyer, site } from "@/content";
import { abs, faqLd, JsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return site.areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">): Promise<Metadata> {
  const area = getArea((await params).slug);
  if (!area) return {};
  return {
    title: `${area.name} en ${site.offices[0].city}`,
    description: `${area.short} ${area.intro}`.slice(0, 160),
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: { images: [{ url: area.image }] },
  };
}

export default async function AreaPage({ params }: PageProps<"/areas/[slug]">) {
  const area = getArea((await params).slug);
  if (!area) notFound();
  const leads = area.leads.map(getLawyer).filter((l) => l !== undefined);

  return (
    <>
      <JsonLd data={[faqLd(area.faqs), { "@context": "https://schema.org", "@type": "Service", serviceType: area.name, description: area.intro, provider: { "@id": abs("/#organizacion") }, areaServed: site.offices[0].country }]} />
      <PageHeader
        crumbs={[{ name: "Áreas", path: "/areas" }, { name: area.name, path: `/areas/${area.slug}` }]}
        eyebrow="Área de práctica"
        title={<ViewTransition name={`area-title-${area.slug}`} share="morph" default="none"><span className="inline-block">{area.name}</span></ViewTransition>}
        intro={area.intro}
      >
        <div className="mt-8 flex flex-wrap gap-2.5">
          <Link href="#consulta" className="btn btn-primary">Consultar sobre {area.name.toLowerCase()}</Link>
          <Placeholder when={area.placeholder} />
        </div>
      </PageHeader>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ViewTransition name={`area-img-${area.slug}`} share="morph" default="none">
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image src={area.image} alt="" fill priority sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover grayscale" />
          </div>
        </ViewTransition>
      </div>

      <ViewTransition enter="page-enter" default="none">
        <div>
          <Section title="Qué" emphasis="cubrimos.">
            <div className="grid gap-12 lg:grid-cols-2">
              <ul className="border-t border-line">
                {area.covers.map((c) => (
                  <li key={c} className="flex gap-4 border-b border-line py-4"><span aria-hidden="true" className="text-accent">—</span>{c}</li>
                ))}
              </ul>
              <div>
                <h3 className="label-mono mb-4 text-fg-3">Situaciones típicas</h3>
                <ul className="space-y-4">
                  {area.situations.map((s) => (
                    <li key={s} className="border-l border-accent pl-5 font-serif text-2xl leading-snug italic">{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Cómo lo" emphasis="trabajamos."><Process steps={area.process} /></Section>

          <Section title="Honorarios," emphasis="en lenguaje simple.">
            <p className="max-w-[68ch] text-lg leading-relaxed text-fg-2">{area.fees}</p>
          </Section>

          <Section title="Preguntas" emphasis="frecuentes."><Faq items={area.faqs} /></Section>

          {leads.length > 0 && (
            <Section title="Equipo" emphasis="responsable.">
              <ul className="grid grid-lines gap-px sm:grid-cols-2 lg:grid-cols-3">
                {leads.map((l) => <li key={l.slug}><TeamCard lawyer={l} /></li>)}
              </ul>
            </Section>
          )}

          <Section id="consulta" title="Cuéntenos" emphasis="su caso." intro="Responderemos en menos de 24 horas hábiles. La información es confidencial.">
            <div className="max-w-2xl"><ContactForm defaultArea={area.slug} /></div>
          </Section>
        </div>
      </ViewTransition>
      <CtaBlock id="contacto-area" />
    </>
  );
}
