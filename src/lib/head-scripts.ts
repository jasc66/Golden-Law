import { CONSENT_KEY } from "./analytics";

/**
 * Scripts en línea para <head>. Viven en un módulo de servidor: si se exportan desde un archivo
 * "use client", el servidor recibe una referencia de cliente en lugar del texto.
 */

/** Aplica el tema guardado antes del primer pintado (evita parpadeo). */
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}})()`;

/** Oculta el banner de cookies (renderizado en el servidor) si ya hay una elección guardada. */
export const consentScript = `(function(){try{var c=localStorage.getItem("${CONSENT_KEY}");if(c)document.documentElement.dataset.consent=c}catch(e){}})()`;
