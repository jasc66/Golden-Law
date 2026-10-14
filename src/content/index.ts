import { demo } from "./profiles/demo";
import { goldenLaw } from "./profiles/golden-law";
import type { SiteProfile } from "./types";

/** Perfiles disponibles. Se elige con NEXT_PUBLIC_SITE_PROFILE (por defecto: golden-law). */
const profiles = { "golden-law": goldenLaw, demo } satisfies Record<string, SiteProfile>;

type ProfileKey = keyof typeof profiles;
const key = (process.env.NEXT_PUBLIC_SITE_PROFILE ?? "golden-law") as ProfileKey;

export const site: SiteProfile = profiles[key] ?? goldenLaw;

/** Muestra las marcas de "contenido pendiente" mientras no se desactiven explícitamente. */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false";

export const getArea = (slug: string) => site.areas.find((a) => a.slug === slug);
export const getLawyer = (slug: string) => site.team.find((l) => l.slug === slug);
export const getPost = (slug: string) => site.posts.find((p) => p.slug === slug);
export const areaName = (slug: string) => getArea(slug)?.name ?? slug;

export const whatsappUrl = (text = "Hola, quisiera agendar una consulta.") =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;

export const mapUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export type { SiteProfile } from "./types";
