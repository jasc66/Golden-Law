"use client";

import Link from "next/link";
import { t } from "@/i18n";
import { CONSENT_KEY } from "@/lib/analytics";

/**
 * Banner de cookies: nada no esencial se activa sin consentimiento. Ambas opciones con el mismo peso visual.
 * Se renderiza en el HTML del servidor (pinta con el primer frame) y lo oculta `consentScript`
 * en <head> si ya hay una elección guardada.
 */
export function CookieBanner() {
  const save = (v: "essential" | "analytics") => {
    try { localStorage.setItem(CONSENT_KEY, v); } catch {}
    document.documentElement.dataset.consent = v;
  };

  return (
    <section data-cookie-banner aria-label="Preferencias de cookies" className="glass fixed inset-x-3 bottom-[72px] z-50 border border-line-strong p-4 md:inset-x-auto md:right-5 md:bottom-5 md:max-w-md">
      <p className="text-sm leading-relaxed text-fg-2">
        {t.cookies.text} <Link href="/legal/cookies" className="underline">{t.cookies.more}</Link>.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="btn btn-ghost" onClick={() => save("essential")}>{t.cookies.reject}</button>
        <button type="button" className="btn btn-ghost" onClick={() => save("analytics")}>{t.cookies.accept}</button>
      </div>
    </section>
  );
}

