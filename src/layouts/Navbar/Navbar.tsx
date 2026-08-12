import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { useActiveSection } from "../../hooks/useActiveSection";
import { scrollToSection } from "../../lib/lenis";
import "./Navbar.css";

type Lang = "es" | "en";

const navLinks = [
  { label: "Inicio", id: "hero" },
  { label: "Sobre mí", id: "about" },
  { label: "Habilidades", id: "skills" },
  { label: "Proyectos", id: "projects" },
  { label: "Contacto", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("es");
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const activeId = useActiveSection(navLinks.map((link) => link.id));

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    if (isHome) {
      e.preventDefault();
      scrollToSection(id);
    }
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand" aria-label="MarCode">
          <img src="/logo/logo.svg" alt="MarCode" className="navbar__brand-logo" />
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}>
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

        <ul className={`navbar__links ${isOpen ? "navbar__links--open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={isHome ? `#${link.id}` : `/#${link.id}`}
                className={`navbar__link ${
                  isHome && activeId === link.id ? "navbar__link--active" : ""
                }`}
                onClick={(e) => handleLinkClick(e, link.id)}>
                {link.label}
              </a>
            </li>
          ))}

          <li className="navbar__divider" aria-hidden="true">
            |
          </li>

          <li>
            <button
              type="button"
              className="navbar__lang-toggle"
              onClick={() => setLang((prev) => (prev === "es" ? "en" : "es"))}
              aria-label="Cambiar idioma"
            >
              {lang.toUpperCase()}
            </button>
          </li>

          <li className="navbar__divider" aria-hidden="true">
            |
          </li>

          <li>
            <a
              href={lang === "es" ? "/cv/cv-es.pdf" : "/cv/cv-en.pdf"}
              download
              className="navbar__cv-link"
            >
              <FiDownload /> CV
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
