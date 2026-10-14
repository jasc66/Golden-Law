"use client";

import { useSyncExternalStore } from "react";
import { t } from "@/i18n";

type Theme = "dark" | "light";

const readTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

/** Cambia el tema con un crossfade de página completa (View Transitions) cuando el navegador lo permite. */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => null);

  function apply(next: Theme) {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && document.startViewTransition) document.startViewTransition(() => apply(next));
    else apply(next);
  }

  const isLight = theme === "light";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? t.theme.toDark : t.theme.toLight}
      className="grid size-11 place-items-center border border-line text-fg transition-colors hover:bg-line"
    >
      {isLight ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}

