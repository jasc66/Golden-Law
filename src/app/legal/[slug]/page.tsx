import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { legalPages } from "./content";

export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const page = legalPages[(await params).slug];
  return page ? { title: page.title, alternates: { canonical: `/legal/${(await params).slug}` } } : {};
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = legalPages[slug];
  if (!page) notFound();
  return (
    <>
      <PageHeader crumbs={[{ name: page.title, path: `/legal/${slug}` }]} eyebrow="Legal" title={page.title}>
        <div className="mt-6"><Placeholder>Texto base: revisar antes de publicar</Placeholder></div>
      </PageHeader>
      <div className="prose-legal mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-10">
        {page.body.map((b, i) => (
          <div key={i}>
            {b.h && <h2>{b.h}</h2>}
            {b.p.map((p) => <p key={p}>{p}</p>)}
          </div>
        ))}
      </div>
    </>
  );
}
