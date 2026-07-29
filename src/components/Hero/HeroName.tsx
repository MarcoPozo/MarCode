import { useEffect, useRef } from "react";

const RADIUS_RATIO = 1.2; // radius scales with the current font-size

export default function HeroName() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    let radius = 220;
    const measure = () => {
      const fontSize = parseFloat(getComputedStyle(container).fontSize);
      radius = fontSize * RADIUS_RATIO;
    };
    measure();
    window.addEventListener("resize", measure);

    let rafId = 0;
    let lastX = 0;
    let lastY = 0;

    const applyMask = () => {
      rafId = 0;
      const mask = `radial-gradient(${radius}px at ${lastX}px ${lastY}px, #000 0%, #000 30%, transparent 72%)`;
      glow.style.maskImage = mask;
      glow.style.webkitMaskImage = mask;
    };

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      glow.style.opacity = "1";
      if (!rafId) rafId = requestAnimationFrame(applyMask);
    };

    const handleLeave = () => {
      glow.style.opacity = "0";
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("resize", measure);
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <h1 className="hero__name" ref={containerRef}>
      <span className="hero__name-base">
        Marco <span className="accent-text">Pozo</span>
      </span>
      <span className="hero__name-glow" ref={glowRef} aria-hidden="true">
        <span className="accent-text">Marco</span> Pozo
      </span>
    </h1>
  );
}
