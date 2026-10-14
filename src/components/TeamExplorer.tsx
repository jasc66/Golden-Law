"use client";

import { useState } from "react";
import type { Lawyer } from "@/content/types";
import { Crossfade } from "./Crossfade";
import { FilterGroup, type FilterOption } from "./Filters";

/** Filtro por área, idioma y sede. Las tarjetas llegan ya renderizadas desde el servidor. */
export function TeamExplorer({ team, areas, cards }: { team: Lawyer[]; areas: FilterOption[]; cards: Record<string, React.ReactNode> }) {
  const [area, setArea] = useState("all");
  const [lang, setLang] = useState("all");
  const [office, setOffice] = useState("all");
  const langs = [...new Set(team.flatMap((l) => l.languages))].filter((l) => !l.startsWith("["));
  const offices = [...new Set(team.map((l) => l.office))];
  const list = team.filter((l) => (area === "all" || l.areas.includes(area)) && (lang === "all" || l.languages.includes(lang)) && (office === "all" || l.office === office));

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:gap-12">
        <FilterGroup label="Área" value={area} onChange={setArea} options={[{ value: "all", label: "Todas" }, ...areas]} />
        {langs.length > 1 && <FilterGroup label="Idioma" value={lang} onChange={setLang} options={[{ value: "all", label: "Todos" }, ...langs.map((l) => ({ value: l, label: l }))]} />}
        {offices.length > 1 && <FilterGroup label="Sede" value={office} onChange={setOffice} options={[{ value: "all", label: "Todas" }, ...offices.map((o) => ({ value: o, label: o }))]} />}
      </div>
      <p className="sr-only" aria-live="polite">{list.length} profesionales</p>
      <Crossfade k={`${area}-${lang}-${office}`}>
        {list.length ? (
          <ul className="blur-grid grid grid-lines gap-px sm:grid-cols-2 lg:grid-cols-3">
            {list.map((l) => <li key={l.slug}>{cards[l.slug]}</li>)}
          </ul>
        ) : (
          <p className="border border-line p-8 text-fg-2">No hay profesionales con esos filtros.</p>
        )}
      </Crossfade>
    </div>
  );
}
