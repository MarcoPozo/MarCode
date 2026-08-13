import { useRef } from "react";
import { useSpring } from "motion/react";

interface UseMagneticOptions {
  strength?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function useMagnetic<T extends HTMLElement>({
  strength = 0.4,
  stiffness = 450,
  damping = 26,
  mass = 0.3,
}: UseMagneticOptions = {}) {
  const ref = useRef<T>(null);
  const springConfig = { stiffness, damping, mass };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // El listener vive en el propio elemento, así que `onMouseMove` solo se
  // dispara mientras el cursor ya está dentro de sus límites — el área de
  // detección es el propio borde del elemento, sin necesidad de un radio aparte.
  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x, y, handleMouseMove, handleMouseLeave };
}
