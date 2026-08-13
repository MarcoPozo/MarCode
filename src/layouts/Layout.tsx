import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { destroyLenis, getLenis, initLenis } from "../lib/lenis";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    // La restauración de scroll nativa del navegador pelea con el reset de
    // abajo — intenta volver a la posición que tenía esta entrada del historial.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  // Los cambios de ruta sin una sección destino (ej. "Ver todos los proyectos")
  // deben aterrizar arriba de la nueva página, no donde haya quedado la
  // página anterior. Los enlaces con hash (como "/#projects") ya saltan a su
  // sección destino, así que esos se dejan tal cual.
  useEffect(() => {
    if (location.hash) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
