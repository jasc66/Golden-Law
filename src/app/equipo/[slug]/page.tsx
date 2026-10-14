import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { CtaBlock } from "@/components/CtaBlock";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { Portrait } from "@/components/Portrait";
import { TrackedLink } from "@/components/TrackedLink";
import { getArea, getLawyer, site } from "@/content";
import { abs, JsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return site.team.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/equipo/[slug]">): Promise<Metadata> {
  const l = getLawyer((await params).slug);
  if (!l) return {};
  return { title: l.name, description: `${l.name}, ${l.role} en ${site.brand.name}.`, alternates: { canonical: `/equipo/${l.slug}` } };
}

export default async function LawyerPage({ params }: PageProps<"/equipo/[slug]">) {
  const l = getLawyer((await params).slug);
  if (!l) notFound();
  const rows: [string, React.ReactNode][] = [
    ["Colegiatura", l.license],
    ["Idiomas", l.languages.join(", ")],
    ["Sede", l.office],
    ["Formación", <ul key="e">{l.education.map((e) => <li key={e}>{e}</li>)}</ul>],
  ];

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: l.name, jobTitle: l.role, worksFor: { "@id": abs("/#organizacion") }, knowsLanguage: l.languages.filter((x) => !x.startsWith("[")), url: abs(`/equipo/${l.slug}`) }} />
      <PageHeader crumbs={[{ name: "Equipo", path: "/equipo" }, { name: l.name, path: `/equipo/${l.slug}` }]} eyebrow={l.role} title={l.name}>
        <div className="mt-6"><Placeholder when={l.placeholder}>Perfil pendiente de completar</Placeholder></div>
      </PageHeader>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:px-10">
        <div className="group">
          <ViewTransition name={`lawyer-${l.slug}`} share="morph" default="none">
            <div><Portrait lawyer={l} priority /></div>
          </ViewTransition>
          <div className="mt-6 flex flex-col gap-2.5">
            {l.phone && <TrackedLink event="click_call" href={`tel:${l.phone}`} className="btn btn-primary">Llamar</TrackedLink>}
            {l.email && <TrackedLink event="click_email" href={`mailto:${l.email}`} className="btn btn-ghost">Escribir un correo</TrackedLink>}
          </div>
        </div>

        <div>
          <div className="prose-legal">{l.bio.map((p) => <p key={p}>{p}</p>)}</div>
          <dl className="mt-12 border-t border-line">
            {rows.map(([k, v]) => (
              <div key={k} className="grid gap-2 border-b border-line py-4 sm:grid-cols-[180px_1fr]">
                <dt className="label-mono text-fg-3">{k}</dt>
                <dd className="text-fg-2">{v}</dd>
              </div>
            ))}
          </dl>
          <h2 className="heading mt-12 mb-4 text-2xl">Áreas</h2>
          <ul className="flex flex-wrap gap-2">
            {l.areas.map((s) => { const a = getArea(s); return a && (
              <li key={s}><Link href={`/areas/${s}`} className="label-mono inline-flex min-h-11 items-center border border-line-strong px-3.5 hover:border-accent">{a.name}</Link></li>
            ); })}
          </ul>
          <h2 className="heading mt-12 mb-4 text-2xl">Casos relevantes</h2>
          <ul className="space-y-2 text-fg-2">{l.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
      </div>
      <CtaBlock />
    </>
  );
}
