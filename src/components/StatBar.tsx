"use client";

import { useEffect, useRef } from "react";
import type { Stat } from "@/content/types";
import { showPlaceholders } from "@/content";

/** Cifras grandes con contador al entrar en vista. El número final está en el HTML desde el servidor. */
export function StatBar({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        const eased = 1 - Math.pow(1 - p, 3);
        nums.forEach((n) => (n.textContent = String(Math.round(Number(n.dataset.count) * eased))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const anyPlaceholder = showPlaceholders && stats.some((s) => s.placeholder);
  return (
    <section id="cifras" aria-label="Cifras del bufete" className="border-t border-line">
      <dl ref={ref} className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-3 border-line px-4 py-10 odd:border-r sm:px-6 lg:border-r lg:px-10 lg:py-14 lg:last:border-r-0">
            <dt className="label-mono text-fg-2">
              {s.label}
              {showPlaceholders && s.placeholder && <span aria-label=" (cifra por verificar)" className="text-accent"> *</span>}
            </dt>
            <dd className="font-display text-[clamp(44px,6vw,88px)] leading-none font-semibold tracking-[-0.04em] [font-stretch:118%]">
              {s.prefix}
              <span data-count={s.value}>{s.value}</span>
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
      {anyPlaceholder && (
        <p className="label-mono mx-auto max-w-[1400px] px-4 pb-6 text-[10px] text-accent sm:px-6 lg:px-10">* Cifra tomada del sitio anterior, pendiente de verificar con el bufete.</p>
      )}
    </section>
  );
}
