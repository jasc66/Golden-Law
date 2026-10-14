import type { Dictionary } from "./es";

/** Borrador en inglés. Activar con NEXT_PUBLIC_LOCALE=en cuando el contenido del perfil esté traducido. */
export const en: Dictionary = {
  skip: "Skip to content",
  nav: { home: "Home", areas: "Practice areas", team: "Team", results: "Results", posts: "Insights", about: "About", contact: "Contact" },
  cta: { book: "Book a consultation", call: "Call now", whatsapp: "WhatsApp", consult: "Consult", more: "Learn more", all: "View all" },
  theme: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
  menu: { open: "Open menu", close: "Close menu" },
  placeholder: "Content pending confirmation",
  disclaimer: {
    results: "Prior results do not guarantee a similar outcome. Every case depends on its own facts.",
    site: "This website is for information only. It is not legal advice and does not create an attorney-client relationship.",
  },
  sections: { areas: "Services", team: "Team", results: "Results", contact: "Contact" },
  form: {
    name: "Full name",
    contact: "Phone or email",
    area: "Practice area",
    areaNone: "Not sure",
    message: "Briefly describe your case",
    consent: "I agree to the use of this data to answer my inquiry, as described in the privacy policy.",
    submit: "Send inquiry",
    sending: "Sending…",
    success: "We received your inquiry and will reply within 24 business hours.",
    error: "We couldn't send the form. Please try again or message us on WhatsApp.",
    confidential: "Your information is confidential and protected by attorney-client privilege.",
    errors: {
      name: "Enter your name (at least 2 letters).",
      contact: "Enter a valid phone number or email.",
      message: "Describe your case in at least 10 characters.",
      consent: "Please accept so we can reply to you.",
      summary: "Please review the highlighted fields.",
    },
  },
  cookies: {
    text: "We use essential cookies to run this site. With your permission, we also use analytics to improve it.",
    reject: "Essential only",
    accept: "Accept analytics",
    more: "Cookie policy",
  },
};
