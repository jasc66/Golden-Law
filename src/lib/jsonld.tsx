import { site } from "@/content";

/** Inserta JSON-LD escapando "<" para evitar inyección de HTML. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const abs = (path = "/") => new URL(path, site.url).toString();

export function legalServiceLd() {
  const o = site.offices[0];
  return {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    "@id": abs("/#organizacion"),
    name: site.brand.name,
    legalName: site.brand.legalName,
    description: site.brand.description,
    url: abs("/"),
    telephone: site.contact.phone,
    email: site.contact.email,
    areaServed: o.country,
    address: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      addressLocality: o.city,
      addressRegion: o.region,
      addressCountry: o.countryCode,
      ...(o.postalCode && { postalCode: o.postalCode }),
    },
    ...(o.geo && { geo: { "@type": "GeoCoordinates", latitude: o.geo.lat, longitude: o.geo.lng } }),
    knowsAbout: site.areas.map((a) => a.name),
    employee: site.team.map((l) => ({ "@type": "Person", name: l.name, jobTitle: l.role, url: abs(`/equipo/${l.slug}`) })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}
