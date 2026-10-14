/** Mapa sin clave de API, con carga diferida. */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  return (
    <iframe
      title={title}
      src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="aspect-[16/10] w-full border border-line grayscale"
    />
  );
}
