import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHeader } from "@/components/PageHeader";
import { TrackedLink } from "@/components/TrackedLink";
import { mapUrl, site, whatsappUrl } from "@/content";

export const metadata: Metadata = {
  title: "Contacto y consulta",
  description: `Agende una consulta con ${site.brand.name}. ${site.contact.responseTime}.`,
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  const o = site.offices[0];
  return (
    <>
      <PageHeader crumbs={[{ name: "Contacto", path: "/contacto" }]} eyebrow="Contacto" title="Agende su" emphasis="consulta."
        intro={`La primera consulta es sin costo y confidencial. ${site.contact.responseTime}.`} />

      <div className="mx-auto grid max-w-[1400px] gap-16 px-4 pb-24 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-10">
        <section id="agendar" aria-labelledby="form-title" className="scroll-mt-24">
          <h2 id="form-title" className="heading mb-8 text-3xl">Escríbanos</h2>
          <ContactForm />
        </section>

        <aside aria-label="Otros canales" className="flex flex-col gap-10">
          <ul className="border-t border-line">
            {[
              { icon: "phone" as const, label: "Teléfono", value: site.contact.phoneDisplay, href: `tel:${site.contact.phone}`, event: "click_call" as const },
              { icon: "whatsapp" as const, label: "WhatsApp", value: "Escribir por WhatsApp", href: whatsappUrl(), event: "click_whatsapp" as const, external: true },
              { icon: "mail" as const, label: "Correo", value: site.contact.email, href: `mailto:${site.contact.email}`, event: "click_email" as const },
            ].map((c) => (
              <li key={c.label} className="border-b border-line">
                <TrackedLink event={c.event} href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noopener" : undefined} className="flex min-h-16 items-center gap-4 py-4 hover:text-accent">
                  <Icon name={c.icon} className="text-accent" />
                  <span className="flex flex-col">
                    <span className="label-mono text-fg-3">{c.label}</span>
                    <span className="break-all">{c.value}</span>
                  </span>
                  {c.external && <span className="sr-only">(se abre en una pestaña nueva)</span>}
                </TrackedLink>
              </li>
            ))}
          </ul>

          {site.contact.videoCall && (
            <div className="border border-line-strong p-6">
              <p className="flex items-center gap-3 heading text-xl"><Icon name="video" className="text-accent" /> Consulta por videollamada</p>
              <p className="mt-2 text-fg-2">Indique en el mensaje que prefiere videollamada y le enviaremos el enlace con la hora acordada.</p>
              {site.contact.bookingUrl && (
                <a href={site.contact.bookingUrl} target="_blank" rel="noopener" className="btn btn-ghost mt-4">Elegir horario<span className="sr-only"> (pestaña nueva)</span></a>
              )}
            </div>
          )}

          <div>
            <h2 className="label-mono mb-4 text-fg-3">Horario</h2>
            <dl>
              {site.contact.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="text-fg-2">{h.days}</dt><dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-3">
            <MapEmbed query={o.mapQuery} title={`Mapa: ${o.street}, ${o.city}`} />
            <address className="not-italic text-fg-2">{o.street}, {o.city}, {o.country}</address>
            <a href={mapUrl(o.mapQuery)} target="_blank" rel="noopener" className="label-mono inline-flex min-h-11 items-center underline">
              Cómo llegar<span className="sr-only"> (abre Google Maps en una pestaña nueva)</span>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
