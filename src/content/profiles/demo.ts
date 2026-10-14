import type { SiteProfile } from "../types";
import { goldenLaw } from "./golden-law";

/**
 * Perfil de demostración para vender la plantilla.
 * Marca, personas y datos son ficticios y están marcados como ejemplo.
 * Para un cliente nuevo: duplica este archivo, cámbialo y regístralo en src/content/index.ts.
 */

const U = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=70&auto=format&fit=crop`;

export const demo: SiteProfile = {
  ...goldenLaw,
  brand: {
    name: "Arce Molina",
    wordmark: ["Arce", "Molina"],
    monogram: "A",
    legalName: "Arce Molina Abogados (ficticio)",
    tagline: "Abogados con criterio",
    description: "Plantilla de ejemplo para bufetes de abogados. Todos los datos son ficticios.",
    founded: 2012,
  },
  hero: {
    eyebrow: "Bufete de abogados · [Ciudad, País]",
    title: "Defensa legal",
    titleEmphasis: "con criterio y rigor.",
    subtitle:
      "Representamos a personas y empresas en materia laboral, de familia, civil y comercial. Un plan claro y un costo acordado por escrito desde la primera reunión.",
    micro: ["Primera consulta sin costo", "Respuesta en 24 h", "Confidencial"],
  },
  contact: {
    ...goldenLaw.contact,
    phone: "+10000000000",
    phoneDisplay: "+00 0000-0000",
    whatsapp: "10000000000",
    email: "contacto@ejemplo.com",
  },
  offices: [
    { name: "Sede central", street: "[Dirección]", city: "[Ciudad]", region: "[Provincia]", country: "[País]", countryCode: "CR", mapQuery: "San José, Costa Rica" },
  ],
  stats: [
    { value: 14, suffix: "+", label: "Años de práctica", placeholder: true },
    { value: 850, suffix: "+", label: "Casos atendidos", placeholder: true },
    { value: 6, label: "Áreas de práctica", placeholder: true },
    { value: 24, suffix: " h", label: "Tiempo máximo de respuesta" },
  ],
  areas: [
    ...goldenLaw.areas.map((a) => ({ ...a, leads: ["ana-arce"], placeholder: true })),
    {
      ...goldenLaw.areas[1],
      slug: "derecho-laboral",
      name: "Derecho laboral",
      short: "Despidos, liquidaciones y conflictos laborales.",
      icon: "users",
      image: U("photo-1521791055366-0d553872125f"),
      intro: "Asesoramos a personas trabajadoras y a empresas en relaciones laborales, despidos y reclamos.",
      covers: ["Cálculo de liquidaciones", "Despidos con y sin responsabilidad patronal", "Reglamentos internos", "Conciliaciones"],
      situations: ["Le despidieron y no sabe si su liquidación es correcta.", "Su empresa necesita un reglamento interno de trabajo."],
      leads: ["diego-molina"],
      placeholder: true,
    },
    {
      ...goldenLaw.areas[1],
      slug: "derecho-de-familia",
      name: "Derecho de familia",
      short: "Divorcios, pensiones alimentarias y custodia.",
      icon: "shield",
      image: U("photo-1582407947304-fd86f028f716"),
      intro: "Acompañamos procesos familiares con sensibilidad y buscando acuerdos que protejan a los hijos.",
      covers: ["Divorcio por mutuo acuerdo", "Pensiones alimentarias", "Guarda, crianza y visitas", "Capitulaciones matrimoniales"],
      situations: ["Quiere divorciarse de mutuo acuerdo.", "Necesita fijar o revisar una pensión alimentaria."],
      leads: ["lucia-vega"],
      placeholder: true,
    },
  ],
  team: [
    { ...goldenLaw.team[0], slug: "ana-arce", name: "Ana Arce", role: "Socia fundadora", areas: ["servicios-notariales", "derecho-inmobiliario", "derecho-corporativo", "asesoria-legal"], languages: ["Español", "Inglés"], license: "Colegiatura [ejemplo]", bio: ["Perfil ficticio de ejemplo."], email: "ana@ejemplo.com" },
    { ...goldenLaw.team[0], slug: "diego-molina", name: "Diego Molina", role: "Socio", areas: ["derecho-laboral"], languages: ["Español"], office: "Sede central", license: "Colegiatura [ejemplo]", bio: ["Perfil ficticio de ejemplo."], email: "diego@ejemplo.com" },
    { ...goldenLaw.team[0], slug: "lucia-vega", name: "Lucía Vega", role: "Asociada", areas: ["derecho-de-familia"], languages: ["Español", "Portugués"], license: "Colegiatura [ejemplo]", bio: ["Perfil ficticio de ejemplo."], email: "lucia@ejemplo.com" },
  ],
  testimonials: [
    { quote: "Me explicaron cada paso y cumplieron los tiempos que prometieron.", author: "Cliente de ejemplo", context: "Derecho inmobiliario", placeholder: true },
    { quote: "Resolvimos el divorcio de mutuo acuerdo sin conflictos innecesarios.", author: "Cliente de ejemplo", context: "Derecho de familia", placeholder: true },
  ],
  posts: goldenLaw.posts.map((p) => ({ ...p, author: "ana-arce" })),
  about: {
    ...goldenLaw.about,
    story: ["Historia ficticia de ejemplo para la plantilla. Reemplazar por la historia real del bufete."],
  },
};
