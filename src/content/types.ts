/**
 * Modelo de contenido de la plantilla.
 * Todo lo que cambia entre bufetes vive en un perfil (src/content/profiles/*).
 * Los campos con `placeholder: true` se muestran con una marca visible
 * mientras NEXT_PUBLIC_SHOW_PLACEHOLDERS no sea "false".
 */

export type IconName =
  | "scale" | "pen" | "building" | "home" | "doc" | "users" | "shield" | "globe"
  | "phone" | "whatsapp" | "mail" | "map" | "calendar" | "video" | "clock";

export type Faq = { q: string; a: string };

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Cifra pendiente de verificar con el bufete. */
  placeholder?: boolean;
};

export type PracticeArea = {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  /** Imagen para la órbita del hero y la cabecera de la página del área. */
  image: string;
  intro: string;
  covers: string[];
  situations: string[];
  process: { title: string; text: string }[];
  fees: string;
  faqs: Faq[];
  /** slugs de abogados responsables */
  leads: string[];
  placeholder?: boolean;
};

export type Lawyer = {
  slug: string;
  name: string;
  role: string;
  /** null = sin foto todavía: se muestra un retrato con monograma. */
  photo: string | null;
  areas: string[];
  languages: string[];
  office: string;
  license: string;
  bio: string[];
  education: string[];
  highlights: string[];
  email?: string;
  phone?: string;
  placeholder?: boolean;
};

export type CaseResult = {
  id: string;
  area: string;
  title: string;
  outcome: string;
  year: number;
  placeholder?: boolean;
};

export type Testimonial = {
  quote: string;
  author: string;
  context: string;
  videoUrl?: string;
  /** Subtítulos (WebVTT). Sin esto no se muestra el vídeo (SC 1.2.2). */
  captionsUrl?: string;
  transcript?: string;
  placeholder?: boolean;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO
  area: string;
  body: { type: "p" | "h2" | "li"; text: string }[];
};

export type Office = {
  name: string;
  street: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  postalCode?: string;
  mapQuery: string;
  geo?: { lat: number; lng: number };
};

export type SiteProfile = {
  brand: {
    name: string;
    /** Línea grande del hero, en dos renglones. */
    wordmark: [string, string];
    monogram: string;
    legalName: string;
    tagline: string;
    description: string;
    founded?: number;
  };
  url: string;
  locale: "es" | "en";
  hero: {
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    micro: string[];
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    email: string;
    hours: { days: string; time: string }[];
    responseTime: string;
    videoCall: boolean;
    bookingUrl?: string;
  };
  offices: Office[];
  social: { label: string; url: string }[];
  stats: Stat[];
  areas: PracticeArea[];
  team: Lawyer[];
  cases: CaseResult[];
  testimonials: Testimonial[];
  affiliations: { name: string; detail: string; placeholder?: boolean }[];
  process: { title: string; text: string }[];
  faqs: Faq[];
  posts: Post[];
  about: {
    story: string[];
    values: { title: string; text: string }[];
  };
};
