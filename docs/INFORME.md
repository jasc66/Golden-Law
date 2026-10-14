# Informe de calidad · 2026-10-13

Build de producción (`next build` + `next start`), perfil `golden-law`.

## Lighthouse 12 (página de inicio)

| Modo | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Escritorio | 100 | 100 | 100 | 100 | 0,7 s | 0 | 0 ms |
| Móvil (throttling devtools) | 97 | 100 | 100 | 100 | 2,4 s | 0,035 | 60 ms |
| Móvil (throttling simulado) | 93 | 100 | 100 | 100 | 3,2 s | 0 | 40 ms |

En la primera visita, el elemento LCP en móvil es el banner de cookies. Ya se renderiza en el servidor y pinta con el primer frame. El modo simulado (Lantern) igual lo estima en 3,2 s porque cuenta las descargas de JS y fuentes que ocurren antes. En visitas posteriores el banner no aparece. Si hace falta bajar de 2,5 s también en el modo simulado, la opción es reducir el banner a una línea.

## axe-core 4 (WCAG 2.0/2.1/2.2 A y AA + buenas prácticas)

**0 infracciones** en 12 rutas × 2 temas (oscuro y claro): inicio, áreas, área, equipo, perfil, resultados, publicaciones, artículo, sobre nosotros, contacto, privacidad y 404.

## Revisión visual

Sin desbordamiento horizontal a 360, 768, 1280 y 1920 px. También se revisó el tema claro y el hero con `prefers-reduced-motion` (las tarjetas quedan estáticas en una cuadrícula).

## Pendiente de verificar a mano

- Lectura con lector de pantalla (VoiceOver/NVDA): axe no reemplaza esta prueba.
- Navegación completa con teclado en un navegador real (menú móvil, filtros, formulario).

## Contenido pendiente (Golden Law)

Todo lo siguiente aparece en el sitio con la marca «◇ contenido pendiente» mientras `NEXT_PUBLIC_SHOW_PLACEHOLDERS` no sea `false`.

- [ ] Nombre legal correcto: el sitio anterior decía «Bufete Legal Profesional» en el pie y «Golden Law» en la marca.
- [ ] Verificar las cifras 10+ años, 200+ casos y 98 % de satisfacción (vienen del sitio anterior).
- [ ] Foto profesional de la Licda. Kristel Godínez Jiménez (hoy se muestra un monograma).
- [ ] Número de carné del Colegio de Abogados y Abogadas de Costa Rica y habilitación notarial.
- [ ] Biografía, formación académica, idiomas y casos relevantes (sin datos confidenciales).
- [ ] Casos reales para /resultados (hoy son 4 ejemplos marcados).
- [ ] Testimonios reales con permiso escrito. La sección se oculta sola mientras no haya ninguno.
- [ ] Monto de la tarifa del plan corporativo.
- [ ] Historia ampliada del bufete.
- [ ] Revisión de los textos legales (privacidad, términos, aviso legal y cookies) por la abogada.
- [ ] Fotos propias para las áreas: hoy son de Unsplash con licencia libre, pero son de stock.
- [ ] Dominio definitivo (`NEXT_PUBLIC_SITE_URL`) y destino del formulario (`CONTACT_WEBHOOK_URL`).
- [ ] Coordenadas exactas de la oficina (`geo`) para el JSON-LD y el mapa.
- [ ] Enlace de agenda en línea (`bookingUrl`), si se usa Calendly o similar.
