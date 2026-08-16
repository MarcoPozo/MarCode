import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "../../context/language-context";
import "./Loader.css";

const MIN_VISIBLE_MS = 1500;
// Alturas relativas de cada barra en reposo — dibujan una onda simétrica
// (corta, alta, corta) en vez de barras parejas.
const BAR_DELAYS = [0, 1, 2, 3, 4, 3, 2, 1, 0];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Se resuelve cuando las fuentes (Anton/Outfit) y el resto de los recursos
// de la carga inicial ya están listos — no es un timeout adivinado, es la
// señal real del navegador.
function waitForPageReady() {
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const windowReady =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          window.addEventListener("load", () => resolve(), { once: true });
        });

  return Promise.all([fontsReady, windowReady]);
}

interface LoaderProps {
  children: ReactNode;
}

export default function Loader({ children }: LoaderProps) {
  // Sin persistencia: se muestra en toda carga completa de la raíz (F5,
  // pestaña nueva, primera visita) — no queda "recordado" entre recargas.
  const [showOverlay, setShowOverlay] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const { t } = useLanguage();
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const start = performance.now();

    waitForPageReady().then(() => {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        if (!cancelled) setIsReady(true);
      }, remaining);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {showOverlay && (
        <AnimatePresence onExitComplete={() => setShowOverlay(false)}>
          {!isReady && (
            <motion.div
              className="loader"
              role="status"
              aria-live="polite"
              aria-label={t.loader.label}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.svg
                className="loader__logo"
                viewBox="0 0 508 667"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M 6 6 L 107 75 L 250 181 L 496 6 L 496 328 L 318 451 L 318 348 L 410 283 L 410 174 L 293 257 L 293 663 L 207 600 L 208 255 L 93 173 L 91 515 L 5 452 Z"
                />
              </motion.svg>

              <div className="loader__wave" aria-hidden="true">
                {BAR_DELAYS.map((val, i) => (
                  <motion.div
                    key={i}
                    className="loader__bar"
                    animate={reducedMotion ? undefined : { height: [8, 24, 8] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: val * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {children}
    </>
  );
}
