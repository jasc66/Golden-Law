import type { Metadata } from "next";
import Link from "next/link";
import { CtaBlock } from "@/components/CtaBlock";
import { PageHeader } from "@/components/PageHeader";
import { areaName, getLawyer, site } from "@/content";
import { formatDate, readingTime } from "@/lib/post";

export const metadata: Metadata = {
  title: "Publicaciones",
  description: "Respuestas claras a las preguntas legales más comunes de nuestros clientes.",
  alternates: { canonical: "/publicaciones" },
};

export default function PostsPage() {
  const posts = [...site.posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHeader crumbs={[{ name: "Publicaciones", path: "/publicaciones" }]} eyebrow="Publicaciones" title="Preguntas reales," emphasis="respuestas claras." />
      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-10">
        <ul className="blur-grid grid grid-lines gap-px md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="group relative flex flex-col gap-4 bg-bg p-6 lg:p-8">
              <p className="label-mono text-accent">{areaName(p.area)}</p>
              <h2 className="heading text-2xl"><Link href={`/publicaciones/${p.slug}`} className="after:absolute after:inset-0">{p.title}</Link></h2>
              <p className="leading-relaxed text-fg-2">{p.excerpt}</p>
              <p className="label-mono mt-auto text-fg-3">
                {getLawyer(p.author)?.name} · <time dateTime={p.date}>{formatDate(p.date)}</time> · {readingTime(p)} min
              </p>
            </li>
          ))}
        </ul>
      </div>
      <CtaBlock />
    </>
  );
}
