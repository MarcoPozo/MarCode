import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { initLenis } from "../lib/lenis";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function Layout() {
  useEffect(() => {
    initLenis();
  }, []);

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
