import { useEffect, useRef } from "react";
import "./ScrollRevealText.css";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export default function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const chars = Array.from(el.querySelectorAll<HTMLElement>(".reveal-char"));
    const total = chars.length;
    if (total === 0) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      // El progreso llega a 0 mientras el borde superior del bloque sigue
      // bajo en el viewport (85%) y a 1 recién cuando sube hasta el borde
      // superior (0%) — antes terminaba en 35%, pero como el progreso se
      // calcula solo con el borde superior (no por línea), un párrafo alto
      // quedaba pintado del todo mientras su mitad de abajo seguía visible
      // sin "leerse" aún. Un rango más largo lo desacelera.
      const start = window.innerHeight * 0.85;
      const end = 0;
      const raw = (start - rect.top) / (start - end);
      const progress = Math.min(1, Math.max(0, raw));
      const litCount = Math.floor(progress * total);

      for (let i = 0; i < total; i++) {
        chars[i].classList.toggle("is-lit", i < litCount);
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [text]);

  const words = text.split(" ");

  return (
    <p ref={ref} className={`scroll-reveal-text ${className}`}>
      {words.map((word, wi) => (
        <span className="reveal-word" key={wi}>
          {word.split("").map((char, ci) => (
            <span className="reveal-char" key={ci}>
              {char}
            </span>
          ))}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
