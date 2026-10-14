"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content";
import { t } from "@/i18n";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";
import { TrackedLink } from "./TrackedLink";

export const navItems = [
  { href: "/", label: t.nav.home },
  { href: "/areas", label: t.nav.areas },
  { href: "/equipo", label: t.nav.team },
  { href: "/resultados", label: t.nav.results },
  { href: "/publicaciones", label: t.nav.posts },
  { href: "/sobre-nosotros", label: t.nav.about },
  { href: "/contacto", label: t.nav.contact },
] as const;

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al navegar
  const [lastPath, setLastPath] = useState(path);
  if (path !== lastPath) {
    setLastPath(path);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();
    document.body.style.overflow = "hidden";
    // El resto de la página queda inerte mientras el menú está abierto (el header y su panel no).
    const behind = Array.from(document.querySelectorAll<HTMLElement>("main#contenido, footer, [data-mobile-bar], [data-cookie-banner]"));
    behind.forEach((el) => (el.inert = true));
    // Si se pasa al diseño de escritorio, el menú móvil ya no existe: cerrar y restaurar el scroll.
    const desktop = matchMedia("(min-width: 80rem)");
    const onDesktop = () => desktop.matches && setOpen(false);
    desktop.addEventListener("change", onDesktop);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const items = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>("a, button")].filter(Boolean) as HTMLElement[];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => (el.inert = false));
      desktop.removeEventListener("change", onDesktop);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-line">
      <div className="mx-auto flex h-14 max-w-[1920px] items-center gap-4 px-4 sm:px-5">
        <Link href="/" className="flex min-h-11 items-center gap-2.5">
          <span aria-hidden="true" className="grid size-[22px] place-items-center border border-accent font-serif text-[15px] italic text-accent">
            {site.brand.monogram}
          </span>
          <span className="font-display text-[15px] font-[650] uppercase tracking-[-0.01em] [font-stretch:112%]">{site.brand.name}</span>
          <span className="sr-only">, inicio</span>
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex">
            {navItems.map((item) => {
              const active = isActive(path, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn("label-mono flex min-h-11 items-center px-2.5", active ? "text-invert-fg" : "text-fg-2 hover:text-fg")}
                  >
                    <span className={cn(active && "-mx-2 bg-invert px-2 py-1.5")}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <TrackedLink event="click_call" href={`tel:${site.contact.phone}`} className="label-mono hidden min-h-11 items-center px-2 text-fg-2 hover:text-fg lg:flex">
            {site.contact.phoneDisplay}
          </TrackedLink>
          <ThemeToggle />
          <Link href="/contacto#agendar" className="btn btn-primary hidden sm:inline-flex">
            {t.cta.consult}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center border border-line xl:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.menu.close : t.menu.open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-14 bottom-0 overflow-y-auto border-t border-line bg-bg px-4 pt-6 pb-28 xl:hidden"
      >
        <nav aria-label="Menú móvil">
          <ul>
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(path, item.href) ? "page" : undefined}
                  className="flex min-h-14 items-center font-display text-3xl font-semibold uppercase tracking-[-0.03em] [font-stretch:118%] text-fg-2 aria-[current=page]:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/contacto#agendar" className="btn btn-primary">{t.cta.book}</Link>
          <TrackedLink event="click_call" href={`tel:${site.contact.phone}`} className="btn btn-ghost">
            {t.cta.call} · {site.contact.phoneDisplay}
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
