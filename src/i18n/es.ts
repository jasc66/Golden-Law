/** Textos de interfaz. Para inglés, completar en.ts con las mismas claves. */
export const es = {
  skip: "Saltar al contenido",
  nav: { home: "Inicio", areas: "Servicios", team: "Equipo", results: "Resultados", posts: "Publicaciones", about: "Nosotros", contact: "Contacto" },
  cta: { book: "Agendar consulta", call: "Llamar ahora", whatsapp: "WhatsApp", consult: "Consulta", more: "Ver más", all: "Ver todo" },
  theme: { toLight: "Cambiar a tema claro", toDark: "Cambiar a tema oscuro" },
  menu: { open: "Abrir menú", close: "Cerrar menú" },
  placeholder: "Contenido pendiente de confirmar",
  disclaimer: {
    results: "Los resultados anteriores no garantizan resultados futuros. Cada caso depende de sus hechos particulares.",
    site: "El contenido de este sitio es informativo y no constituye asesoría legal ni crea una relación abogado-cliente.",
  },
  sections: { areas: "Servicios", team: "Equipo", results: "Resultados", contact: "Contacto" },
  form: {
    name: "Nombre completo",
    contact: "Teléfono o correo",
    area: "Área de su consulta",
    areaNone: "No estoy seguro",
    message: "Cuéntenos brevemente su caso",
    consent: "Acepto que usen estos datos para responder mi consulta, según la política de privacidad.",
    submit: "Enviar consulta",
    sending: "Enviando…",
    success: "Recibimos su consulta. Le responderemos en menos de 24 horas hábiles.",
    error: "No pudimos enviar el formulario. Intente de nuevo o escríbanos por WhatsApp.",
    confidential: "Su información es confidencial y está protegida por el secreto profesional.",
    errors: {
      name: "Escriba su nombre (mínimo 2 letras).",
      contact: "Escriba un teléfono o un correo válido.",
      message: "Cuéntenos su caso en al menos 10 caracteres.",
      consent: "Debe aceptar el uso de sus datos para que podamos responderle.",
      summary: "Revise los campos marcados.",
    },
  },
  cookies: {
    text: "Usamos cookies esenciales para que el sitio funcione. Con su permiso, también usamos analítica para mejorar el sitio.",
    reject: "Solo esenciales",
    accept: "Aceptar analítica",
    more: "Política de cookies",
  },
};

export type Dictionary = typeof es;
