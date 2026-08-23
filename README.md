# MarCode — Portafolio de Marco Pozo

Portafolio personal de Marco Pozo, Full Stack Developer. Landing page en React + TypeScript, sin frameworks de CSS — todo el sistema de diseño (colores, tipografía, espaciados, breakpoints) vive en `src/styles/globals.css` como custom properties.

🔗 **Live**: [marcopozo.dev](https://marcopozo.dev)

## Stack

- **React 19** + **TypeScript** + **Vite**
- **React Router** — landing de una sola página + ruta `/projects` con el listado completo
- **Motion** (Framer Motion) — animaciones de scroll-reveal, botones magnéticos, transiciones de ícono
- **Lenis** — scroll suave, tanto el general de la página como el de los anclajes del navbar
- **EmailJS** — envío real del formulario de contacto, sin backend propio
- **CSS puro** — sin Tailwind ni ningún framework; sistema de tokens propio con soporte de tema claro/oscuro

## Características

- **Bilingüe** (ES/EN) con persistencia en `localStorage`
- **Tema claro/oscuro** con detección del guardado antes del primer paint (sin flash del tema por defecto)
- **Responsive real** desde 320px hasta monitores anchos (1920px+), con una escala de breakpoints documentada (ver [CLAUDE.md](./CLAUDE.md))
- **Pantalla de carga** que espera señales reales del navegador (fuentes + recursos listos), no un timeout inventado
- **Shader animado** en WebGL puro (ruido Simplex) de fondo en Hero y Footer
- **Formulario de contacto funcional** vía EmailJS
- **SEO**: meta tags, Open Graph, Twitter Card, `sitemap.xml`, `robots.txt`
- **Accesibilidad**: toda animación respeta `prefers-reduced-motion`

## Estructura del proyecto

```
src/
├── components/     # Componentes de UI (uno por carpeta, con su .css)
├── layouts/        # Navbar, Footer, Layout raíz
├── pages/          # Home, ProjectsPage, NotFound
├── context/        # Theme y Language (React Context)
├── hooks/          # useReveal, useMagnetic, useActiveSection
├── data/           # Proyectos y secciones de navegación
├── i18n/           # Traducciones ES/EN
├── lib/            # Setup de Lenis
├── styles/         # globals.css — sistema de diseño completo
└── types/          # Tipos compartidos
```

## Empezar en local

```bash
npm install
```

Creá un archivo `.env` en la raíz con las credenciales de [EmailJS](https://www.emailjs.com/) (necesarias para que el formulario de contacto envíe mails):

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

```bash
npm run dev
```

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Type-check (`tsc -b`) + build de producción con Vite |
| `npm run lint` | ESLint sobre todo el proyecto |
| `npm run preview` | Sirve el build de producción localmente |

## Deploy

Desplegado en **Vercel**, conectado directo al repo de GitHub — cada push a `main` dispara un deploy automático. `vercel.json` define el rewrite necesario para que las rutas de React Router (`/projects`) funcionen en producción; `public/_redirects` deja el mismo rewrite listo por si en algún momento se despliega en Netlify.

Las variables de entorno de EmailJS deben cargarse también en el dashboard de Vercel (Settings → Environment Variables) — Vite las incrusta en build time, así que un `.env` local no alcanza para producción.

## Licencia y contacto

Proyecto personal, no licenciado para reutilización. Contacto: [marco10011111@gmail.com](mailto:marco10011111@gmail.com) · [LinkedIn](https://linkedin.com/in/marcoopozo) · [GitHub](https://github.com/MarcoPozo)
