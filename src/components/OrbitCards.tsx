"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { IconName } from "@/content/types";
import { Icon } from "./Icon";

export type OrbitCard =
  | { kind: "image"; href: string; label: string; src: string }
  | { kind: "stat"; href: string; value: string; label: string }
  | { kind: "note"; href: string; title: string; label: string; icon: IconName };

const RINGS = [
  { rx: 0.36, ry: 0.4, speed: 0.018, color: "var(--color-arc-blue)", tilt: -8 },
  { rx: 0.43, ry: 0.44, speed: -0.012, color: "var(--color-arc-violet)", tilt: 6 },
  { rx: 0.5, ry: 0.47, speed: 0.008, color: "var(--color-arc-red)", tilt: -3 },
  { rx: 0.57, ry: 0.5, speed: -0.006, color: "var(--color-arc-green)", tilt: 10 },
];

/** Anillo interior: solo fotos, más cerca del titular y detrás del texto (decorativo). */
const INNER = { rx: 0.25, ry: 0.36, speed: 0.01, count: 8 };

/**
 * Órbita de tarjetas del hero. Solo anima transform/opacity/filter.
 * - Móvil: 8 tarjetas y 2 anillos.
 * - prefers-reduced-motion: sin animación, cuadrícula estática (ver CSS de .orbit).
 * - Se pausa cuando el hero sale de pantalla o la pestaña está oculta.
 */
export function OrbitCards({ cards, inner = [] }: { cards: OrbitCard[]; inner?: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current, svg = svgRef.current;
    if (!root || !svg) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
    const list = root.querySelector<HTMLElement>(".orbit-list")!;
    const innerEls = Array.from(innerRef.current?.querySelectorAll<HTMLElement>("[data-inner]") ?? []);
    let innerW = 0;
    let W = 0, H = 0, mobile = false, active = 0, raf = 0, visible = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const sizes: number[] = [];

    const layout = () => {
      W = root.clientWidth; H = root.clientHeight; mobile = W < 768;
      // En móvil la órbita es decorativa: tarjetas pequeñas en movimiento no son objetivos táctiles fiables.
      // Las mismas áreas están enlazadas en la rejilla de servicios, justo debajo.
      list.inert = mobile;
      list.setAttribute("aria-hidden", String(mobile));
      active = mobile ? Math.min(8, els.length) : els.length;
      const w = mobile ? 72 : W < 1280 ? 96 : 116;
      els.forEach((el, i) => {
        el.style.display = i < active ? "" : "none";
        el.style.width = `${w}px`;
        sizes[i] = w;
      });
      innerW = mobile ? 52 : W < 1280 ? 72 : 84;
      innerEls.forEach((el) => (el.style.width = `${innerW}px`));
      const rings = RINGS.slice(0, mobile ? 2 : 4);
      const sx = mobile ? 1.25 : 1;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.innerHTML = rings
        .map((r, i) => `<ellipse cx="${W / 2}" cy="${H / 2}" rx="${r.rx * W * sx}" ry="${r.ry * H}" stroke="${r.color}" stroke-dasharray="${i % 2 ? "2 6" : `${W * 0.5} ${W * 1.6}`}" transform="rotate(${r.tilt} ${W / 2} ${H / 2})"/>`)
        .join("");
    };

    const frame = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const ringCount = mobile ? 2 : 4;
      const perRing = Math.ceil(active / ringCount);
      const sx = mobile ? 1.25 : 1;
      for (let i = 0; i < active; i++) {
        const r = RINGS[i % ringCount];
        const k = Math.floor(i / ringCount);
        const ang = (k / perRing) * Math.PI * 2 + t * 0.006 * r.speed + i;
        const tilt = (r.tilt * Math.PI) / 180;
        const ex = Math.cos(ang) * r.rx * W * sx, ey = Math.sin(ang) * r.ry * H;
        const x = ex * Math.cos(tilt) - ey * Math.sin(tilt);
        const y = ex * Math.sin(tilt) + ey * Math.cos(tilt);
        const depth = (Math.sin(ang) + 1) / 2; // 0 = fondo, 1 = frente
        const par = 10 + depth * 30;
        const w = sizes[i], h = w * 1.25;
        const el = els[i];
        if (el.matches(":hover, :focus-visible")) continue; // la tarjeta enfocada se queda quieta
        el.style.transform = `translate3d(${W / 2 + x - w / 2 + mouse.x * par}px, ${H / 2 + y - h / 2 + mouse.y * par}px, 0) scale(${0.72 + depth * 0.38}) rotate(${(x / W) * 8}deg)`;
        el.style.opacity = (0.35 + depth * 0.6).toFixed(2);
        el.style.filter = `blur(${((1 - depth) * 2.2).toFixed(1)}px)`;
        el.style.zIndex = String(Math.round(depth * 10));
      }
      const n = innerEls.length;
      for (let i = 0; i < n; i++) {
        const ang = (i / n) * Math.PI * 2 - t * 0.006 * INNER.speed;
        const x = Math.cos(ang) * INNER.rx * W * sx, y = Math.sin(ang) * INNER.ry * H;
        const depth = (Math.sin(ang) + 1) / 2;
        const par = 6 + depth * 14, h = innerW * 1.25;
        const el = innerEls[i];
        el.style.transform = `translate3d(${W / 2 + x - innerW / 2 + mouse.x * par}px, ${H / 2 + y - h / 2 + mouse.y * par}px, 0) scale(${0.7 + depth * 0.35})`;
        el.style.opacity = (0.12 + depth * 0.26).toFixed(2);
        el.style.filter = `blur(${((1 - depth) * 1.6).toFixed(1)}px)`;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const onMove = (e: PointerEvent) => { mouse.tx = e.clientX / innerWidth - 0.5; mouse.ty = e.clientY / innerHeight - 0.5; };
    const onVis = () => (document.hidden ? stop() : start());
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });

    root.dataset.animated = "true";
    if (innerRef.current) innerRef.current.dataset.animated = "true";
    layout();
    start();
    io.observe(root);
    const ro = new ResizeObserver(layout);
    ro.observe(root);
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop(); io.disconnect(); ro.disconnect();
      removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      {inner.length > 0 && (
        <div ref={innerRef} aria-hidden="true" className="orbit-inner">
          {Array.from({ length: INNER.count }, (_, i) => (
            <div key={i} data-inner className="orbit-inner-card">
              <Image src={inner[i % inner.length]} alt="" width={120} height={150} sizes="90px" />
            </div>
          ))}
        </div>
      )}
      <div ref={rootRef} className="orbit">
        <svg ref={svgRef} aria-hidden="true" className="orbit-arcs" />
        <ul className="orbit-list" aria-label="Áreas de práctica destacadas">
          {cards.map((c, i) => (
            <li key={i} className="contents">
              <Link
                href={c.href}
                data-card
                className={`orbit-card orbit-${c.kind}`}
              >
                {c.kind === "image" && (
                  <>
                    <Image src={c.src} alt="" width={160} height={200} sizes="120px" />
                    <span className="orbit-label">{c.label}</span>
                </>
                )}
                {c.kind === "stat" && (
                  <>
                    <small>{c.label}</small>
                    <b>{c.value}</b>
                </>
                )}
                {c.kind === "note" && (
                  <>
                    <Icon name={c.icon} size={18} className="shrink-0 text-accent" />
                    <span>
                      <span className="orbit-note-title">{c.title}</span>
                      <small>{c.label}</small>
                    </span>
                </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
