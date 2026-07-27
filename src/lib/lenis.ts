import Lenis from "lenis";

let lenis: Lenis | null = null;
let rafId: number | null = null;

export function initLenis() {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time: number) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  return lenis;
}

export function destroyLenis() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  lenis?.destroy();
  lenis = null;
}

export function getLenis() {
  return lenis;
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  // `html { scroll-padding-top }` already accounts for the fixed navbar and
  // Lenis reads it automatically — don't also pass a manual offset here, or
  // the navbar height gets subtracted twice and every scroll lands short.
  if (lenis) {
    lenis.scrollTo(target);
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
