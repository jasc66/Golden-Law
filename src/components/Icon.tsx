import type { IconName } from "@/content/types";

const paths: Record<IconName, string> = {
  scale: "M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z",
  pen: "M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z",
  building: "M4 21V5l8-3v19M12 9h8v12M8 8h.01M8 12h.01M8 16h.01M16 13h.01M16 17h.01M2 21h20",
  home: "M3 11l9-7 9 7v10H3zM9 21v-6h6v6",
  doc: "M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6",
  users: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  globe: "M12 22a10 10 0 100-20 10 10 0 000 20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20",
  phone: "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z",
  whatsapp: "M3 21l1.6-4.7A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.3-1.2zM9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.5-2-1-1 1a4 4 0 01-3-3l1-1-1-2z",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  map: "M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12zM12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  calendar: "M3 5h18v16H3zM3 10h18M8 3v4M16 3v4",
  video: "M3 6h12v12H3zM15 10l6-3v10l-6-3",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2",
};

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
