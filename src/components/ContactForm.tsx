"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content";
import { t } from "@/i18n";
import { track } from "@/lib/analytics";
import { contactSchema } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";

type Field = "name" | "contact" | "area" | "message" | "consent";
type Errors = Partial<Record<Field, string>>;

/** Formulario de 5 campos. Valida en el cliente y otra vez en /api/contacto. Nunca pone datos en la URL (POST). */
export function ContactForm({ defaultArea = "" }: { defaultArea?: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const okRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  // Al enviar con éxito, el formulario desaparece: el foco pasa al mensaje de confirmación
  useEffect(() => {
    if (status === "ok") okRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return; // aria-disabled no bloquea el envío por sí solo
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name"),
      contact: fd.get("contact"),
      area: fd.get("area") ?? "",
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
      company: fd.get("company") ?? "",
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const f = issue.path[0] as Field;
        if (f in t.form.errors && !next[f]) next[f] = t.form.errors[f as keyof typeof t.form.errors];
      }
      setErrors(next);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contacto", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      track("submit_contact", { area: parsed.data.area });
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  const fid = (f: Field) => `${id}-${f}`;
  const describedBy = (f: Field, extra?: string) => [errors[f] && `${fid(f)}-err`, extra].filter(Boolean).join(" ") || undefined;
  const input = "mt-2 block w-full min-h-12 border bg-transparent px-4 py-3 text-base text-fg placeholder:text-fg-3 focus:border-accent focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const errCount = Object.keys(errors).length;

  if (status === "ok") {
    return (
      <div ref={okRef} tabIndex={-1} role="status" className="border border-success/60 p-8 focus:outline-none">
        <p className="heading text-3xl">Gracias.</p>
        <p className="mt-3 text-fg-2">{t.form.success}</p>
        <button type="button" className="btn btn-ghost mt-6" onClick={() => setStatus("idle")}>Enviar otra consulta</button>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="flex flex-col gap-6" aria-describedby={`${id}-conf`}>
      {errCount > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="border border-danger p-4 text-sm">
          <p className="font-medium text-danger">{t.form.errors.summary}</p>
          <ul className="mt-2 list-disc pl-5 text-fg-2">
            {(Object.keys(errors) as Field[]).map((f) => (
              <li key={f}><a
                href={`#${fid(f)}`}
                onClick={(ev) => { ev.preventDefault(); document.getElementById(fid(f))?.focus(); }}
                className="underline"
              >{errors[f]}</a></li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor={fid("name")} className="label-mono text-fg-2">{t.form.name} <span aria-hidden="true">*</span></label>
        <input id={fid("name")} name="name" autoComplete="name" required aria-required="true" aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className={cn(input, errors.name ? "border-danger" : "border-line-strong")} />
        {errors.name && <p id={`${fid("name")}-err`} className="mt-2 text-sm text-danger">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor={fid("contact")} className="label-mono text-fg-2">{t.form.contact} <span aria-hidden="true">*</span></label>
        <input id={fid("contact")} name="contact" required aria-required="true" aria-invalid={!!errors.contact} aria-describedby={describedBy("contact", `${fid("contact")}-hint`)} className={cn(input, errors.contact ? "border-danger" : "border-line-strong")} />
        <p id={`${fid("contact")}-hint`} className="mt-2 text-sm text-fg-3">Ej.: {site.contact.phoneDisplay} o nombre@correo.com</p>
        {errors.contact && <p id={`${fid("contact")}-err`} className="mt-1 text-sm text-danger">{errors.contact}</p>}
      </div>

      <div>
        <label htmlFor={fid("area")} className="label-mono text-fg-2">{t.form.area}</label>
        <select id={fid("area")} name="area" defaultValue={defaultArea} className={cn(input, "border-line-strong bg-bg")}>
          <option value="">{t.form.areaNone}</option>
          {site.areas.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor={fid("message")} className="label-mono text-fg-2">{t.form.message} <span aria-hidden="true">*</span></label>
        <textarea id={fid("message")} name="message" rows={5} required aria-required="true" aria-invalid={!!errors.message} aria-describedby={describedBy("message")} className={cn(input, "resize-y", errors.message ? "border-danger" : "border-line-strong")} />
        {errors.message && <p id={`${fid("message")}-err`} className="mt-2 text-sm text-danger">{errors.message}</p>}
      </div>

      {/* Campo trampa para bots: oculto a personas y lectores de pantalla */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("area") + "-c"}>Empresa</label>
        <input id={fid("area") + "-c"} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input id={fid("consent")} name="consent" type="checkbox" required aria-required="true" aria-invalid={!!errors.consent} aria-describedby={describedBy("consent")} className="mt-0.5 size-6 shrink-0 accent-[var(--accent)]" />
          <label htmlFor={fid("consent")} className="text-sm leading-relaxed text-fg-2">
            {t.form.consent} <Link href="/legal/privacidad" className="underline">Ver política</Link>.
          </label>
        </div>
        {errors.consent && <p id={`${fid("consent")}-err`} className="mt-2 text-sm text-danger">{errors.consent}</p>}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" aria-disabled={status === "sending"} className="btn btn-primary aria-disabled:cursor-wait aria-disabled:opacity-60">
          {status === "sending" ? t.form.sending : t.form.submit}
        </button>
        <p id={`${id}-conf`} className="text-sm text-fg-3">{t.form.confidential}</p>
      </div>
      <div role="status" className="sr-only">{status === "sending" && t.form.sending}</div>
      <div aria-live="assertive" className="text-sm text-danger">{status === "error" && t.form.error}</div>
    </form>
  );
}
