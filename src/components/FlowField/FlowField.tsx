import { useEffect, useRef } from "react";
import "./FlowField.css";

const DENSITY = 1 / 6000;
const MAX_PARTICLES = 500;

interface Particle {
  x: number;
  y: number;
}

function hexToRgb(hex: string) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!match) return { r: 10, g: 10, b: 11 };
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

function noiseAngle(x: number, y: number, t: number) {
  return (Math.sin(x * 0.008 + t) + Math.cos(y * 0.009 - t * 0.8)) * Math.PI;
}

export default function FlowField() {
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
    const accent = style.getPropertyValue("--accent-text").trim() || "#e74c3c";
    const bg = hexToRgb(style.getPropertyValue("--bg-primary").trim() || "#0a0a0b");

    let width = 0;
    let height = 0;
    let time = 0;
    let particles: Particle[] = [];

    const spawnParticles = () => {
      const count = Math.min(MAX_PARTICLES, Math.round(width * height * DENSITY));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
      }));
    };

    const step = () => {
      ctx.fillStyle = `rgba(${bg.r}, ${bg.g}, ${bg.b}, 0.12)`;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.7;
      for (const p of particles) {
        const angle = noiseAngle(p.x, p.y, time);
        p.x += Math.cos(angle) * 1.1;
        p.y += Math.sin(angle) * 1.1;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.fillRect(p.x, p.y, 1.4, 1.4);
      }
      ctx.globalAlpha = 1;
    };

    const drawStatic = () => {
      ctx.fillStyle = `rgb(${bg.r}, ${bg.g}, ${bg.b})`;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.5;
      for (const p of particles) {
        ctx.fillRect(p.x, p.y, 1.4, 1.4);
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawnParticles();
      if (reducedMotion) drawStatic();
    };
    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    const animate = () => {
      time += 0.0006;
      step();
      rafId = requestAnimationFrame(animate);
    };

    if (!reducedMotion) {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="flow-field" aria-hidden="true" />;
}
