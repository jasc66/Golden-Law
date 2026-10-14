import Link from "next/link";
import { mapUrl, site, whatsappUrl } from "@/content";
import type { IconName } from "@/content/types";
import { t } from "@/i18n";
import { ContactDock, type DockItem } from "./ContactDock";
import { Arrow, Icon } from "./Icon";
import { TrackedLink } from "./TrackedLink";

/** CTA final de cada página: titular, botones, disponibilidad y dock de contacto (Magnification). */
export function CtaBlock({ id = "contacto", title = "¿Necesita asesoría legal?" }: { id?: string; title?: string }) {
  const items: DockItem[] = [
    { label: "Llamar", href: `tel:${site.contact.phone}`, icon: "phone", event: "click_call" },
    { label: "WhatsApp", href: whatsappUrl(), icon: "whatsapp", event: "click_whatsapp", external: true },
    { label: "Correo", href: `mailto:${site.contact.email}`, icon: "mail", event: "click_email" },
    { label: "Agendar", href: "/contacto#agendar", icon: "calendar", event: "click_book" },
    ...(site.contact.videoCall ? [{ label: "Videollamada", href: "/contacto#agendar", icon: "video" as IconName, event: "click_book" as const }] : []),
    { label: "Cómo llegar", href: mapUrl(site.offices[0].mapQuery), icon: "map", external: true },
  ];
  const icons = Object.fromEntries(items.map((i) => [i.icon, <Icon key={i.icon} name={i.icon} size={20} />])) as Record<IconName, React.ReactNode>;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.3fr_1fr] lg:px-10">
        <div>
          <p className="label-mono mb-4 inline-flex items-center gap-2 text-success">
            <span aria-hidden="true" className="size-2 rounded-full bg-success" />
            {site.contact.responseTime}
          </p>
          <h2 id={`${id}-title`} className="heading max-w-[16ch] text-[clamp(36px,5.5vw,80px)]">
            {title} <em>Hablemos hoy.</em>
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-fg-2">
            La primera consulta es sin costo y confidencial. Le explicamos sus opciones y el costo antes de empezar.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link href="/contacto#agendar" className="btn btn-primary">{t.cta.book} <Arrow /></Link>
            <TrackedLink event="click_call" href={`tel:${site.contact.phone}`} className="btn btn-ghost">{t.cta.call}</TrackedLink>
          </div>
        </div>
        <div className="flex flex-col justify-end gap-4">
          <p className="label-mono text-fg-3">Elija cómo contactarnos</p>
          <ContactDock items={items} icons={icons} />
        </div>
      </div>
    </section>
  );
}
