import { useEffect, useRef } from "react";
import "./RippleGrid.css";

const SPACING = 34;
const RADIUS_BASE = 1.3;
const RADIUS_MAX = 4;
const RIPPLE_RANGE = 160;

interface RippleGridProps {
  color?: string;
}

export default function RippleGrid({ color }: RippleGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const style = getComputedStyle(document.documentElement);
    const accent =
      color || style.getPropertyValue("--accent-text").trim() || "#e74c3c";

    let width = 0;
    let height = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      if (reducedMotion) draw();
    };
    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      if (reducedMotion) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = accent;

      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          const dist = Math.hypot(x - mouseX, y - mouseY);
          const proximity = Math.max(0, 1 - dist / RIPPLE_RANGE);
          const pulse = reducedMotion
            ? 0
            : Math.sin(time + x * 0.05 + y * 0.05) * 0.05 + 0.05;
          const radius = RADIUS_BASE + proximity * (RADIUS_MAX - RADIUS_BASE);
          const alpha = 0.1 + proximity * 0.7 + pulse;

          ctx.globalAlpha = Math.min(1, Math.max(0.04, alpha));
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const nextWidth = parent.clientWidth;
      const nextHeight = parent.clientHeight;
      if (nextWidth === 0 || nextHeight === 0) return;
      width = nextWidth;
      height = nextHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    let rafId = 0;
    const animate = () => {
      time += 0.03;
      draw();
      rafId = requestAnimationFrame(animate);
    };

    if (!reducedMotion) {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      resizeObserver.disconnect();
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="ripple-grid" aria-hidden="true" />;
}
