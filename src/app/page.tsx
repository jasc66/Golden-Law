import Link from "next/link";
import { CaseCard } from "@/components/CaseCard";
import { CtaBlock } from "@/components/CtaBlock";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Arrow } from "@/components/Icon";
import { Placeholder } from "@/components/Placeholder";
import { PracticeGrid } from "@/components/PracticeGrid";
import { Process } from "@/components/Process";
import { Section } from "@/components/Section";
import { StatBar } from "@/components/StatBar";
import { TeamCard } from "@/components/TeamCard";
import { Testimonials } from "@/components/Testimonials";
import { site } from "@/content";
import { t } from "@/i18n";
import { faqLd, JsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(site.faqs)} />
      <Hero />
      <StatBar stats={site.stats} />

      <Section id="servicios" eyebrow="Áreas de práctica" title="Lo que hacemos," emphasis="explicado con claridad."
        intro="Cada área tiene un proceso definido y un costo acordado por escrito antes de empezar."
        action={<Link href="/areas" className="btn btn-ghost self-start">{t.cta.all} <Arrow /></Link>}>
        <PracticeGrid areas={site.areas} />
      </Section>

      <Section eyebrow="Cómo trabajamos" title="Cuatro pasos," emphasis="sin sorpresas.">
        <Process steps={site.process} />
      </Section>

      <Section id="resultados" eyebrow="Resultados" title="Casos que" emphasis="nos representan."
        action={<Link href="/resultados" className="btn btn-ghost self-start">{t.cta.all} <Arrow /></Link>}>
        <ul className="grid grid-lines gap-px md:grid-cols-2 lg:grid-cols-4">
          {site.cases.slice(0, 4).map((c) => <li key={c.id}><CaseCard c={c} /></li>)}
        </ul>
        <p className="mt-6 max-w-[70ch] text-sm text-fg-3">{t.disclaimer.results}</p>
      </Section>

      <Section id="equipo" eyebrow="Equipo" title="Quién lleva" emphasis="su caso."
        action={<Link href="/equipo" className="btn btn-ghost self-start">{t.cta.all} <Arrow /></Link>}>
        <ul className="blur-grid grid grid-lines gap-px sm:grid-cols-2 lg:grid-cols-3">
          {site.team.slice(0, 3).map((l) => <li key={l.slug}><TeamCard lawyer={l} /></li>)}
        </ul>
        <div className="mt-6"><Placeholder when={site.team.some((l) => l.placeholder)}>Fotos, biografía y colegiatura por confirmar</Placeholder></div>
      </Section>

      {site.testimonials.length > 0 && (
        <Section eyebrow="Testimonios" title="Lo que dicen" emphasis="nuestros clientes.">
          <Testimonials items={site.testimonials} />
        </Section>
      )}

      {site.affiliations.length > 0 && (
        <section aria-label="Afiliaciones" className="border-t border-line">
          <ul className="mx-auto grid max-w-[1400px] grid-lines gap-px sm:grid-cols-2">
            {site.affiliations.map((a) => (
              <li key={a.name} className="flex flex-col gap-2 bg-bg px-4 py-8 sm:px-6 lg:px-10">
                <p className="heading text-xl">{a.name}</p>
                <p className="text-sm text-fg-2">{a.detail}</p>
                <div><Placeholder when={a.placeholder} /></div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Section eyebrow="Preguntas frecuentes" title="Antes de" emphasis="escribirnos.">
        <Faq items={site.faqs} />
      </Section>

      <CtaBlock />
    </>
  );
}
