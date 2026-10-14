"use client";

import { useState } from "react";
import type { CaseResult } from "@/content/types";
import { CaseCard } from "./CaseCard";
import { Crossfade } from "./Crossfade";
import { FilterGroup, type FilterOption } from "./Filters";

export function CasesExplorer({ cases, areas }: { cases: CaseResult[]; areas: FilterOption[] }) {
  const [area, setArea] = useState("all");
  const [year, setYear] = useState("all");
  const years = [...new Set(cases.map((c) => String(c.year)))].sort().reverse();
  const list = cases.filter((c) => (area === "all" || c.area === area) && (year === "all" || String(c.year) === year));

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:gap-12">
        <FilterGroup label="Área" value={area} onChange={setArea} options={[{ value: "all", label: "Todas" }, ...areas]} />
        <FilterGroup label="Año" value={year} onChange={setYear} options={[{ value: "all", label: "Todos" }, ...years.map((y) => ({ value: y, label: y }))]} />
      </div>
      <p className="sr-only" aria-live="polite">{list.length} {list.length === 1 ? "caso" : "casos"}</p>
      <Crossfade k={`${area}-${year}`}>
        {list.length ? (
          <ul className="grid grid-lines gap-px md:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => <li key={c.id}><CaseCard c={c} headingLevel={2} /></li>)}
          </ul>
        ) : (
          <p className="border border-line p-8 text-fg-2">No hay casos con esos filtros.</p>
        )}
      </Crossfade>
    </div>
  );
}
