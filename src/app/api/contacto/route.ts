import { contactSchema } from "@/lib/contact-schema";

/**
 * Recibe el formulario de contacto.
 * Si existe CONTACT_WEBHOOK_URL (Zapier, Make, n8n, Resend, Formspree…), reenvía el JSON allí.
 * Sin webhook, en desarrollo solo lo registra en consola.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "validation", fields: parsed.error.issues.map((i) => i.path[0]) }, { status: 422 });
  }
  const { company, ...data } = parsed.data;
  if (company) return Response.json({ ok: true }); // bot: se ignora sin avisar

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) return Response.json({ ok: false, error: "delivery" }, { status: 502 });
  } else if (process.env.NODE_ENV !== "production") {
    console.info("[contacto] nueva consulta", { ...data, message: `${data.message.slice(0, 60)}…` });
  } else {
    console.error("[contacto] falta CONTACT_WEBHOOK_URL: la consulta no se entregó");
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  return Response.json({ ok: true });
}
