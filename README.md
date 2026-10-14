# Golden Law · Plantilla web para bufetes

Sitio de bufete de abogados en Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS v4.
Hero oscuro con órbita de tarjetas, modo claro/oscuro, 29 páginas estáticas, SEO con JSON-LD y accesibilidad WCAG 2.2 AA.

## Arranque

```bash
npm install
cp .env.example .env.local   # ajustar valores
npm run dev                  # http://localhost:3000
npm run build && npm start   # producción
```

## Cambiar de cliente (vender la plantilla)

Todo el contenido vive en `src/content/profiles/`. No hay textos del bufete dentro de los componentes.

1. Duplicar `src/content/profiles/demo.ts` (marca ficticia) con el nombre del cliente.
2. Registrarlo en `src/content/index.ts`.
3. Elegirlo con `NEXT_PUBLIC_SITE_PROFILE=<clave>`.
4. Cuando todo el contenido esté confirmado: `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false` para ocultar las marcas «contenido pendiente».

Perfiles incluidos: `golden-law` (por defecto, datos del sitio anterior) y `demo` (Arce Molina, ficticio).

## Variables de entorno

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_PROFILE` | `golden-law` o `demo` |
| `NEXT_PUBLIC_SITE_URL` | URL pública para canonical, sitemap, Open Graph y JSON-LD |
| `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | `false` oculta las marcas de contenido pendiente |
| `NEXT_PUBLIC_LOCALE` | `es` (por defecto) o `en` (textos de interfaz en `src/i18n/en.ts`) |
| `CONTACT_WEBHOOK_URL` | **Obligatoria en producción.** Destino del formulario (Zapier, Make, n8n, Formspree…). Sin ella, `/api/contacto` responde 503 y el formulario muestra error para no perder consultas en silencio. |

## Estructura

```
src/
  app/                 rutas: /, /areas/[slug], /equipo/[slug], /resultados, /publicaciones/[slug],
                       /sobre-nosotros, /contacto, /legal/[slug], /api/contacto, sitemap, robots
  components/          Hero, OrbitCards, StatBar, PracticeGrid, TeamCard, CaseCard, Faq, ContactForm,
                       Header, Footer, ThemeToggle, CtaBlock, ContactDock, MobileCallBar, CookieBanner…
  content/             tipos + perfiles de contenido
  i18n/                textos de interfaz es/en
  lib/                 JSON-LD, analítica con consentimiento, esquema zod del formulario
docs/                  prototipo aprobado del hero e informe de calidad
```

## Efectos de movimiento (motion-gestures-integrator)

| Gesto | Dónde | Cómo se desactiva |
|---|---|---|
| Shared Element | Tarjeta de área → página del área (título e imagen) y retrato del equipo → perfil, con `<ViewTransition>` de React | `prefers-reduced-motion` anula las animaciones de View Transitions; sin soporte del navegador, navegación normal |
| Crossfade | Filtros de resultados y equipo (`Crossfade.tsx`); cambio de tema claro/oscuro | Movimiento reducido: corte instantáneo |
| Magnification | Dock de canales de contacto en el bloque final (`ContactDock.tsx`) | Movimiento reducido o táctil: tamaño fijo |
| Blur | Rejillas de áreas, equipo y publicaciones (hover/foco); header y barras con vidrio | Movimiento reducido: sin desenfoque |

## Calidad

Ver [docs/INFORME.md](docs/INFORME.md): Lighthouse, axe y lista de contenido pendiente.
