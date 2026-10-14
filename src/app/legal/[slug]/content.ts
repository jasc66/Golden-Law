import { site } from "@/content";

/** Textos legales base. [Revisar con la abogada responsable antes de publicar.] */
export const legalPages: Record<string, { title: string; body: { h?: string; p: string[] }[] }> = {
  privacidad: {
    title: "Política de privacidad",
    body: [
      { p: [`${site.brand.legalName} ("nosotros") trata los datos personales que usted nos envía únicamente para responder su consulta y, si nos contrata, prestar el servicio.`] },
      { h: "Qué datos recogemos", p: ["Nombre, teléfono o correo, área de interés y el mensaje que escribe en el formulario. No pedimos documentos de identidad ni datos sensibles a través del sitio."] },
      { h: "Para qué los usamos", p: ["Para contactarle y evaluar su caso. No vendemos ni cedemos sus datos a terceros con fines comerciales."] },
      { h: "Seguridad", p: ["El sitio usa conexión cifrada (HTTPS). Los datos del formulario se envían por POST y nunca aparecen en la dirección (URL)."] },
      { h: "Sus derechos", p: [`En Costa Rica, la Ley 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales le permite acceder, rectificar y suprimir sus datos. Escríbanos a ${site.contact.email}.`] },
      { h: "Conservación", p: ["Conservamos las consultas que no se convierten en un servicio durante el tiempo necesario para atenderlas. [Plazo exacto por definir.]"] },
    ],
  },
  terminos: {
    title: "Términos de uso",
    body: [
      { p: ["Al usar este sitio acepta estos términos. El contenido es informativo y puede cambiar sin previo aviso."] },
      { h: "Propiedad intelectual", p: ["Los textos, el diseño y la marca pertenecen a sus titulares. No pueden reproducirse sin autorización."] },
      { h: "Enlaces externos", p: ["No somos responsables del contenido de sitios de terceros enlazados desde aquí."] },
    ],
  },
  "aviso-legal": {
    title: "Aviso legal",
    body: [
      { p: ["La información de este sitio es general e informativa. No constituye asesoría legal ni crea una relación abogado-cliente. Esa relación solo existe cuando se acuerda por escrito."] },
      { p: ["Enviar un mensaje por el formulario, WhatsApp o correo no crea una relación profesional. No envíe información confidencial hasta que hayamos confirmado que podemos atenderle."] },
      { p: ["Los resultados anteriores no garantizan resultados futuros. Cada caso depende de sus hechos particulares."] },
    ],
  },
  cookies: {
    title: "Política de cookies",
    body: [
      { p: ["Usamos almacenamiento local esencial para recordar su tema (claro u oscuro) y su elección sobre cookies."] },
      { h: "Analítica", p: ["Solo si usted la acepta, registramos eventos anónimos como clics en «Llamar» o envíos del formulario para mejorar el sitio. Por defecto está desactivada."] },
      { h: "Cambiar su elección", p: ["Puede borrar los datos del sitio desde la configuración de su navegador y el aviso volverá a aparecer."] },
    ],
  },
};
