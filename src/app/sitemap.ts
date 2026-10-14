import type { MetadataRoute } from "next";
import { site } from "@/content";
import { legalPages } from "./legal/[slug]/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, site.url).toString();
  const fixed = ["/", "/areas", "/equipo", "/resultados", "/publicaciones", "/sobre-nosotros", "/contacto"];
  return [
    ...fixed.map((p) => ({ url: u(p), priority: p === "/" ? 1 : 0.8 })),
    ...site.areas.map((a) => ({ url: u(`/areas/${a.slug}`), priority: 0.9 })),
    ...site.team.map((l) => ({ url: u(`/equipo/${l.slug}`), priority: 0.6 })),
    ...site.posts.map((p) => ({ url: u(`/publicaciones/${p.slug}`), lastModified: p.date, priority: 0.6 })),
    ...Object.keys(legalPages).map((s) => ({ url: u(`/legal/${s}`), priority: 0.2 })),
  ];
}
