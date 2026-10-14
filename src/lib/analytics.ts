/** Seguimiento de eventos de conversión. Solo envía datos si el visitante aceptó la analítica. */
export type ConversionEvent = "click_call" | "click_whatsapp" | "click_email" | "submit_contact" | "click_book";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const CONSENT_KEY = "cookie-consent";

export function hasAnalyticsConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "analytics";
  } catch {
    return false;
  }
}

export function track(event: ConversionEvent, props: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, props);
  if (!hasAnalyticsConsent()) return;
  (window.dataLayer ??= []).push({ event, ...props });
}
