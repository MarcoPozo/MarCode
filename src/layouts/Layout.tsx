import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { destroyLenis, getLenis, initLenis } from "../lib/lenis";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    // The browser's own scroll restoration fights our reset below — it tries
    // to bring back whatever position this history entry last had.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  // Route changes without a target section (e.g. "Ver todos los proyectos")
  // should land at the top of the new page, not wherever the previous page
  // happened to be scrolled to. Hash links (like "/#projects") already jump
  // to their target section, so leave those alone.
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
