# MarCode

Portafolio personal de Marco Pozo, Full Stack Developer. React + TypeScript + Vite, sin frameworks de CSS — estilos propios en `src/styles/globals.css` y por componente.

## Reglas

- Toda variable de diseño (color, sombra, radio de borde, borde, z-index, transición) debe estar definida como custom property en `src/styles/globals.css`. Ningún archivo de componente puede tener colores hexadecimales, `rgb()`/`rgba()` sueltos, ni valores de sombra/radio/z-index hardcodeados — siempre `var(--token)`. Si hace falta un valor que no existe, primero se revisa si algún token existente ya sirve; si no, se agrega a `globals.css` (no al componente).
- Si un componente necesita romper una regla de este archivo (color hardcodeado, valor sin token, etc.) por una razón técnica válida, se permite — pero debe llevar un comentario junto al valor explicando por qué no puede usar el sistema de tokens. Sin comentario, se considera una violación.
- El responsive es desktop-first: los estilos base son de escritorio y los `@media` usan `max-width` para ir angostando. La escala oficial tiene 4 niveles, cada uno define un tipo de decisión de layout, no solo un ancho de pantalla:
  - `480px` — **mobile**: último ajuste de tipografía/padding en elementos que ya vienen apilados.
  - `768px` — **tablet**: cortes de layout general (espaciado de secciones, Footer, etc.).
  - `900px` — **content**: el contenido (grids, columnas de texto, tarjetas) pasa a una sola columna o a un layout compacto. Es el breakpoint que más se usa en el proyecto.
  - `1024px` — **nav**: específico para elementos de navegación que necesitan más espacio horizontal (Navbar y lo que dependa de su estado, como el link de CV).

  320px es el piso mínimo soportado, cae dentro de `max-width: 480px`, no es un breakpoint aparte. Los `min-width: 1600px`/`1920px` para monitores grandes son una escala aparte (ver `globals.css`) y no forman parte de esta lista.

  No se inventan valores fuera de esta escala salvo necesidad puntual comprobada — en ese caso se comenta el porqué junto al `@media`. Sin comentario, se considera una violación.
