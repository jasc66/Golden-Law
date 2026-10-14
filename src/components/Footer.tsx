import Link from "next/link";
import { mapUrl, site, whatsappUrl } from "@/content";
import { t } from "@/i18n";
import { TrackedLink } from "./TrackedLink";

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-line pb-20 md:pb-0">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <p className="display-wide text-4xl leading-[0.9]">
            {site.brand.wordmark[0]}
            <br />
            {site.brand.wordmark[1]}
          </p>
          <p className="mt-4 max-w-[34ch] text-sm text-fg-2">{site.brand.description}</p>
        </div>

        <nav aria-labelledby="f-nav">
          <h2 id="f-nav" className="label-mono mb-4 text-fg-3">Sitio</h2>
          <ul className="space-y-1 text-sm">
            {[
              ["/areas", t.nav.areas],
              ["/equipo", t.nav.team],
              ["/resultados", t.nav.results],
              ["/publicaciones", t.nav.posts],
              ["/sobre-nosotros", t.nav.about],
              ["/contacto", t.nav.contact],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-8 items-center text-fg-2 hover:text-fg">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="label-mono mb-4 text-fg-3">Contacto</h2>
          <address className="space-y-2 text-sm not-italic text-fg-2">
            <p><TrackedLink event="click_call" href={`tel:${site.contact.phone}`} className="hover:text-fg">{site.contact.phoneDisplay}</TrackedLink></p>
            <p><TrackedLink event="click_whatsapp" href={whatsappUrl()} target="_blank" rel="noopener" className="hover:text-fg">WhatsApp<span className="sr-only"> (se abre en una pestaña nueva)</span></TrackedLink></p>
            <p><TrackedLink event="click_email" href={`mailto:${site.contact.email}`} className="break-all hover:text-fg">{site.contact.email}</TrackedLink></p>
            {site.offices.map((o) => (
              <p key={o.name}>
                <a href={mapUrl(o.mapQuery)} target="_blank" rel="noopener" className="hover:text-fg">
                  {o.street}, {o.city}, {o.country}<span className="sr-only"> (abre el mapa en una pestaña nueva)</span>
                </a>
              </p>
            ))}
          </address>
        </div>

        <div>
          <h2 className="label-mono mb-4 text-fg-3">Horario</h2>
          <dl className="space-y-2 text-sm">
            {site.contact.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4 border-b border-line pb-2">
                <dt className="text-fg-2">{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-fg-2">{site.contact.responseTime}.</p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-6 text-xs text-fg-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>© {year} {site.brand.legalName}. {t.disclaimer.site}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li><Link href="/legal/privacidad" className="inline-flex min-h-8 items-center hover:text-fg">Privacidad</Link></li>
            <li><Link href="/legal/terminos" className="inline-flex min-h-8 items-center hover:text-fg">Términos</Link></li>
            <li><Link href="/legal/aviso-legal" className="inline-flex min-h-8 items-center hover:text-fg">Aviso legal</Link></li>
            <li><Link href="/legal/cookies" className="inline-flex min-h-8 items-center hover:text-fg">Cookies</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
