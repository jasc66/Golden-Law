import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-center px-4 pt-24 sm:px-6 lg:px-10">
      <p className="label-mono text-accent">Error 404</p>
      <h1 className="heading mt-4 text-[clamp(40px,6vw,88px)]">Página <em>no encontrada.</em></h1>
      <p className="mt-6 max-w-[50ch] text-lg text-fg-2">La dirección no existe o cambió. Puede volver al inicio o escribirnos directamente.</p>
      <div className="mt-8 flex flex-wrap gap-2.5">
        <Link href="/" className="btn btn-primary">Ir al inicio</Link>
        <Link href="/contacto" className="btn btn-ghost">Contacto</Link>
      </div>
    </div>
  );
}
