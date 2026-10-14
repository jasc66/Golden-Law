"use client";

import type { ComponentProps } from "react";
import { track, type ConversionEvent } from "@/lib/analytics";

/** Enlace externo o de contacto (tel:, mailto:, wa.me) que registra el evento de conversión. */
export function TrackedLink({ event, onClick, ...props }: ComponentProps<"a"> & { event: ConversionEvent }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, { href: String(props.href ?? "") });
        onClick?.(e);
      }}
    />
  );
}
