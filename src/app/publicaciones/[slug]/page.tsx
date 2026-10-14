import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { areaName, getLawyer, getPost, site } from "@/content";
import { t } from "@/i18n";
import { abs, JsonLd } from "@/lib/jsonld";
import { formatDate, readingTime } from "@/lib/post";

export function generateStaticParams() {
  return site.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/publicaciones/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt, alternates: { canonical: `/publicaciones/${p.slug}` }, openGraph: { type: "article", publishedTime: p.date } };
}

export default async function PostPage({ params }: PageProps<"/publicaciones/[slug]">) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const author = getLawyer(p.author);

  // Agrupa los <li> consecutivos en listas
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) blocks.push(<ul key={`ul${blocks.length}`}>{list.map((x) => <li key={x}>{x}</li>)}</ul>);
    list = [];
  };
  p.body.forEach((b, i) => {
    if (b.type === "li") return void list.push(b.text);
    flush();
    blocks.push(b.type === "h2" ? <h2 key={i}>{b.text}</h2> : <p key={i}>{b.text}</p>);
  });
  flush();

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.excerpt, datePublished: p.date, ...(author && { author: { "@type": "Person", name: author.name, url: abs(`/equipo/${author.slug}`) } }), publisher: { "@id": abs("/#organizacion") }, mainEntityOfPage: abs(`/publicaciones/${p.slug}`) }} />
      <PageHeader crumbs={[{ name: "Publicaciones", path: "/publicaciones" }, { name: p.title, path: `/publicaciones/${p.slug}` }]} eyebrow={areaName(p.area)} title={p.title}>
        <p className="label-mono mt-8 text-fg-3">
          {author && <Link href={`/equipo/${author.slug}`} className="underline underline-offset-4 hover:text-fg">{author.name}</Link>} · <time dateTime={p.date}>{formatDate(p.date)}</time> · {readingTime(p)} min de lectura
        </p>
      </PageHeader>
      <article className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-10">
        <div className="prose-legal text-lg">{blocks}</div>
      </article>
      <aside aria-label="Consulta relacionada" className="mx-auto mb-24 max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 border border-line-strong p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="heading text-2xl">¿Su caso es parecido?</p>
            <p className="mt-2 text-fg-2">Consulte sin costo sobre {areaName(p.area).toLowerCase()}.</p>
          </div>
          <Link href={`/areas/${p.area}#consulta`} className="btn btn-primary self-start">{t.cta.book} <Arrow /></Link>
        </div>
        <p className="mt-6 text-sm text-fg-3">{t.disclaimer.site}</p>
      </aside>
    </>
  );
}
