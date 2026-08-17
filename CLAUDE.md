# MarCode

Portafolio personal de Marco Pozo, Full Stack Developer. React + TypeScript + Vite, sin frameworks de CSS — estilos propios en `src/styles/globals.css` y por componente.

## Reglas

- Toda variable de diseño (color, sombra, radio de borde, borde, z-index, transición) debe estar definida como custom property en `src/styles/globals.css`. Ningún archivo de componente puede tener colores hexadecimales, `rgb()`/`rgba()` sueltos, ni valores de sombra/radio/z-index hardcodeados — siempre `var(--token)`. Si hace falta un valor que no existe, primero se revisa si algún token existente ya sirve; si no, se agrega a `globals.css` (no al componente).
- Si un componente necesita romper una regla de este archivo (color hardcodeado, valor sin token, etc.) por una razón técnica válida, se permite — pero debe llevar un comentario junto al valor explicando por qué no puede usar el sistema de tokens. Sin comentario, se considera una violación.
- El responsive es desktop-first: los estilos base son de escritorio y los `@media` usan `max-width` para ir angostando. La escala oficial de breakpoints es `480px` (celulares), `768px` (tablets verticales) y `1024px` (tablets horizontales / laptops chicos) — no se inventan valores nuevos (`600px`, `900px`, etc.) salvo que un componente puntual lo necesite, y en ese caso se comenta el porqué junto al `@media`. 320px es el piso mínimo soportado, pero no es un breakpoint propio: cae dentro de `max-width: 480px`. Los `min-width: 1600px`/`1920px` para monitores grandes son una escala aparte (ver `globals.css`) y no forman parte de esta lista.
