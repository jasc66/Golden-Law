"use client";

import { cn } from "@/lib/cn";

export type FilterOption = { value: string; label: string };

/** Grupo de filtros tipo "chips" con aria-pressed. */
export function FilterGroup({ label, options, value, onChange }: { label: string; options: FilterOption[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="label-mono mb-2 w-full text-fg-3">{label}</legend>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn("label-mono min-h-11 border px-3.5 transition-colors", value === o.value ? "border-invert bg-invert text-invert-fg" : "border-line-strong text-fg-2 hover:text-fg")}
        >
          {o.label}
        </button>
      ))}
    </fieldset>
  );
}
