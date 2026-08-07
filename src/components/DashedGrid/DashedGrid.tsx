import { useEffect, useRef } from "react";
import "./DashedGrid.css";

// A tileable 60x60 mask: a 1px dashed line along the tile's top edge and one
// along its left edge. Repeated, adjacent tiles' edges combine into a full
// dashed grid — cheaper than drawing every line by hand.
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
  /** When false, renders a plain static grid — no shimmer sweep, no cursor spotlight. */
  interactive?: boolean;
  /** Auto-sweeping glow that plays even without hovering. Only relevant when interactive. */
  shimmer?: boolean;
  /** Fades all four edges (instead of just top/bottom) so the grid can bleed
   * past its container without a hard rectangular cutoff. */
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
