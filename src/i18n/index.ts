import { en } from "./en";
import { es } from "./es";

const dictionaries = { es, en };
export const locale = (process.env.NEXT_PUBLIC_LOCALE === "en" ? "en" : "es") as keyof typeof dictionaries;
export const t = dictionaries[locale];
