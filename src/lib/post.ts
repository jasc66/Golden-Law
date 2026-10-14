import type { Post } from "@/content/types";

export const readingTime = (p: Post) => Math.max(1, Math.round(p.body.reduce((n, b) => n + b.text.split(/\s+/).length, 0) / 200));

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("es-CR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
