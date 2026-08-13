# MarCode

Portafolio personal de Marco Pozo, Full Stack Developer. React + TypeScript + Vite, sin frameworks de CSS — estilos propios en `src/styles/globals.css` y por componente.

## Reglas

- Toda variable de diseño (color, sombra, radio de borde, borde, z-index, transición) debe estar definida como custom property en `src/styles/globals.css`. Ningún archivo de componente puede tener colores hexadecimales, `rgb()`/`rgba()` sueltos, ni valores de sombra/radio/z-index hardcodeados — siempre `var(--token)`. Si hace falta un valor que no existe, primero se revisa si algún token existente ya sirve; si no, se agrega a `globals.css` (no al componente).
- Si un componente necesita romper una regla de este archivo (color hardcodeado, valor sin token, etc.) por una razón técnica válida, se permite — pero debe llevar un comentario junto al valor explicando por qué no puede usar el sistema de tokens. Sin comentario, se considera una violación.
