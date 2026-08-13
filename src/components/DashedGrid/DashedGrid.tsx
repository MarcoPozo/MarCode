import { useEffect, useRef } from "react";
import "./DashedGrid.css";

// Una máscara tileable de 60x60: una línea punteada de 1px en el borde
// superior del tile y otra en el borde izquierdo. Al repetirse, los bordes
// de tiles adyacentes se combinan en una grilla punteada completa — más
// barato que dibujar cada línea a mano. El `fill="#fff"` de acá es opaco
// para la máscara, no un color de pintura — este SVG está embebido como
// data URI, un documento aislado que no puede heredar propiedades
// personalizadas de CSS de la página, así que no puede usar
// var(--white-rgb) como el resto del código.
const GRID_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" shape-rendering="crispEdges">' +
  '<defs>' +
  '<pattern id="h" width="3" height="1" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="#fff"/></pattern>' +
  '<pattern id="v" width="1" height="3" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="#fff"/></pattern>' +
  '</defs>' +
  '<rect width="60" height="1" fill="url(#h)"/>' +
  '<rect width="1" height="60" fill="url(#v)"/>' +
  "</svg>";

const GRID_MASK = `url("data:image/svg+xml,${encodeURIComponent(GRID_SVG)}")`;
const SPOT_SIZE = 260;

interface DashedGridProps {
  /** Si es false, renderiza una grilla estática simple — sin barrido shimmer ni spotlight de cursor. */
  interactive?: boolean;
  /** Glow de barrido automático que se reproduce incluso sin hover. Solo aplica si interactive. */
  shimmer?: boolean;
  /** Desvanece los cuatro bordes (en vez de solo arriba/abajo) para que la
   * grilla se pueda extender más allá de su contenedor sin un corte rectangular duro. */
  vignette?: boolean;
}

export default function DashedGrid({
  interactive = true,
  shimmer = true,
  vignette = false,
}: DashedGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    const parent = container?.parentElement;
    if (!container || !spotlight || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let pending = false;
    let clientX = 0;
    let clientY = 0;

    const apply = () => {
      pending = false;
      const rect = container.getBoundingClientRect();
      spotlight.style.setProperty("--spot-x", `${clientX - rect.left - SPOT_SIZE / 2}px`);
      spotlight.style.setProperty("--spot-y", `${clientY - rect.top - SPOT_SIZE / 2}px`);
    };

    const onMove = (e: MouseEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(apply);
      }
    };
    const onLeave = () => {
      spotlight.style.setProperty("--spot-x", "-9999px");
      spotlight.style.setProperty("--spot-y", "-9999px");
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`dashed-grid ${vignette ? "dashed-grid--vignette" : ""}`}
      style={{ "--dashed-grid-mask": GRID_MASK } as React.CSSProperties}
      aria-hidden="true"
    >
      {interactive ? (
        <>
          {shimmer && (
            <div className="dashed-grid__shimmer-clip">
              <div className="dashed-grid__bright" />
            </div>
          )}
          <div ref={spotlightRef} className="dashed-grid__spotlight-clip">
            <div className="dashed-grid__bright dashed-grid__bright--accent" />
          </div>
        </>
      ) : (
        <div className="dashed-grid__static" />
      )}
    </div>
  );
}
