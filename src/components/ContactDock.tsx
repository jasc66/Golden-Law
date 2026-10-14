"use client";

import { useEffect, useRef, useState } from "react";
import type { IconName } from "@/content/types";
import { track, type ConversionEvent } from "@/lib/analytics";

const BASE = 48, MAX = 86, RANGE = 150;

export type DockItem = { label: string; href: string; icon: IconName; event?: ConversionEvent; external?: boolean };

/**
 * Gesto Magnification: los íconos de contacto crecen cuando el cursor se acerca.
 * Desactivado con prefers-reduced-motion. La etiqueta visible aparece al crecer; el nombre accesible siempre existe.
 */
export function ContactDock({ items, icons }: { items: DockItem[]; icons: Record<IconName, React.ReactNode> }) {
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [sizes, setSizes] = useState<number[]>(() => items.map(() => BASE));
  const raf = useRef(0);
  const reduce = useRef(false);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    reduce.current = mq.matches;
    const on = () => (reduce.current = mq.matches);
    mq.addEventListener("change", on);
    return () => { mq.removeEventListener("change", on); cancelAnimationFrame(raf.current); };
  }, []);

  const update = (x: number | null) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setSizes(refs.current.map((el) => {
        if (x === null || !el || reduce.current) return BASE;
        const r = el.getBoundingClientRect();
        const d = Math.abs(x - (r.left + r.width / 2));
        return d > RANGE ? BASE : BASE + (MAX - BASE) * Math.cos((d / RANGE) * (Math.PI / 2));
      }));
    });
  };

  return (
    <nav aria-label="Canales de contacto">
      <ul
        className="flex h-[118px] items-end justify-center gap-3 sm:justify-start"
        onPointerMove={(e) => e.pointerType === "mouse" && update(e.clientX)}
        onPointerLeave={() => update(null)}
        onPointerCancel={() => update(null)}
      >
        {items.map((it, i) => {
          const s = sizes[i];
          const showLabel = s > BASE + 22;
          return (
            <li key={it.label} className="group relative flex flex-col items-center">
              <span aria-hidden="true" className={`label-mono pointer-events-none absolute -top-7 whitespace-nowrap bg-invert px-2 py-1 text-[0.6875rem] text-invert-fg transition-opacity group-focus-within:opacity-100 ${showLabel ? "opacity-100" : "opacity-0"}`}>
                {it.label}
              </span>
              <a
                ref={(el) => { refs.current[i] = el; }}
                href={it.href}
                aria-label={it.label + (it.external ? " (se abre en una pestaña nueva)" : "")}
                target={it.external ? "_blank" : undefined}
                rel={it.external ? "noopener" : undefined}
                onClick={() => it.event && track(it.event)}
                style={{ width: s, height: s }}
                className="grid place-items-center border border-line-strong bg-surface text-fg transition-[width,height,border-color] duration-[120ms] ease-linear hover:border-accent focus-visible:border-accent"
              >
                {icons[it.icon]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
