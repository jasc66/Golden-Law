"use client";

import { useEffect, useRef, useState } from "react";
import { t } from "@/i18n";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { id: "servicios", label: t.sections.areas },
  { id: "equipo", label: t.sections.team },
  { id: "resultados", label: t.sections.results },
  { id: "contacto", label: t.sections.contact },
];

/** Regla vertical con indicador de scroll + índice de secciones con el activo resaltado. */
export function HeroChrome() {
  const thumb = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState("servicios");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight || 1;
      if (thumb.current) thumb.current.style.transform = `translateY(${(scrollY / max) * 100}cqh)`;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="ruler absolute top-24 right-3.5 bottom-32 hidden w-9 flex-col items-end justify-between text-fg-3 lg:flex [container-type:size]">
        <span ref={thumb} className="absolute top-0 right-0 h-0.5 w-[18px] bg-accent" />
        {Array.from({ length: 21 }, (_, i) => i * 5).map((n) => (
          <span key={n} className="flex items-center gap-1.5 font-mono text-[9px] leading-none">
            {n % 10 === 0 ? n : ""}
            <span className={cn("h-px bg-line-strong", n % 10 ? "w-[5px]" : "w-2.5")} />
          </span>
        ))}
      </div>

      <nav aria-label="Secciones de la página" className="absolute right-16 bottom-8 hidden text-right lg:block">
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className="block font-display text-[clamp(18px,2vw,28px)] leading-[1.1] font-semibold uppercase tracking-[-0.03em] text-fg-3 transition-colors [font-stretch:118%] hover:text-fg aria-[current=true]:text-fg"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
