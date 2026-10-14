"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Gesto Crossfade: al cambiar `k`, la vista saliente se mantiene montada (inert, aria-hidden)
 * mientras se desvanece y la nueva aparece encima en la misma celda de la rejilla. Sin saltos de layout.
 */
export function Crossfade({ k, children }: { k: string; children: React.ReactNode }) {
  const [layers, setLayers] = useState([{ k, node: children }]);
  const [prevK, setPrevK] = useState(k);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  if (k !== prevK) {
    setPrevK(k);
    setLayers((ls) => [ls[ls.length - 1], { k, node: children }]);
  } else if (layers[layers.length - 1].node !== children) {
    setLayers((ls) => [...ls.slice(0, -1), { k, node: children }]);
  }

  useEffect(() => {
    if (layers.length < 2) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLayers((ls) => ls.slice(-1)), 460);
    return () => clearTimeout(timer.current);
  }, [layers.length, prevK]);

  return (
    <div className="xfade">
      {layers.map((l, i) => {
        const out = i < layers.length - 1;
        return (
          <div key={l.k + i} className={layers.length > 1 ? (out ? "xfade-out" : "xfade-in") : undefined} aria-hidden={out || undefined} inert={out || undefined}>
            {l.node}
          </div>
        );
      })}
    </div>
  );
}
