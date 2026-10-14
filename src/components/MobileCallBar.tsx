import { site, whatsappUrl } from "@/content";
import { t } from "@/i18n";
import { Icon } from "./Icon";
import { TrackedLink } from "./TrackedLink";

/** Barra fija inferior en móvil: llamar y WhatsApp siempre a mano. */
export function MobileCallBar() {
  return (
    <div data-mobile-bar className="glass fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line pb-[env(safe-area-inset-bottom)] md:hidden">
      <TrackedLink event="click_call" href={`tel:${site.contact.phone}`} className="label-mono flex min-h-14 items-center justify-center gap-2 border-r border-line text-fg">
        <Icon name="phone" size={16} /> {t.cta.call}
      </TrackedLink>
      <TrackedLink event="click_whatsapp" href={whatsappUrl()} target="_blank" rel="noopener" className="label-mono flex min-h-14 items-center justify-center gap-2 bg-invert text-invert-fg">
        <Icon name="whatsapp" size={16} /> {t.cta.whatsapp}
        <span className="sr-only">(se abre en una pestaña nueva)</span>
      </TrackedLink>
    </div>
  );
}
