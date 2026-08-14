import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiDownload, FiMoon, FiSun } from "react-icons/fi";
import { useActiveSection } from "../../hooks/useActiveSection";
import { scrollToSection } from "../../lib/lenis";
import { useLanguage } from "../../context/language-context";
import { useTheme } from "../../context/theme-context";
import { navSections } from "../../data/navigation";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const activeId = useActiveSection(navSections.map((link) => link.id));

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
          {navSections.map((link) => (
            <li key={link.id}>
              <a
                href={isHome ? `#${link.id}` : `/#${link.id}`}
                className={`navbar__link ${
                  isHome && activeId === link.id ? "navbar__link--active" : ""
                }`}
                onClick={(e) => handleLinkClick(e, link.id)}>
                {t.nav[link.key]}
              </a>
            </li>
          ))}

          <li className="navbar__divider" aria-hidden="true">
            |
          </li>

          <li className="navbar__utility-group">
            <button
              type="button"
              className="navbar__lang-toggle"
              onClick={toggleLang}
              aria-label={t.langToggle.ariaLabel}
            >
              <img
                src="https://flagcdn.com/us.svg"
                alt=""
                className={`navbar__lang-flag ${
                  lang === "en" ? "navbar__lang-flag--active" : ""
                }`}
              />
              <span className="navbar__switch">
                <span
                  className={`navbar__switch-knob ${
                    lang === "es" ? "navbar__switch-knob--right" : ""
                  }`}
                />
              </span>
              <img
                src="https://flagcdn.com/ec.svg"
                alt=""
                className={`navbar__lang-flag ${
                  lang === "es" ? "navbar__lang-flag--active" : ""
                }`}
              />
            </button>

            <button
              type="button"
              className="navbar__theme-toggle"
              onClick={toggleTheme}
              aria-label={t.themeToggle.ariaLabel}
            >
              <FiSun
                className={`navbar__theme-icon ${
                  theme === "light" ? "navbar__theme-icon--active" : ""
                }`}
              />
              <span className="navbar__switch">
                <span
                  className={`navbar__switch-knob ${
                    theme === "dark" ? "navbar__switch-knob--right" : ""
                  }`}
                />
              </span>
              <FiMoon
                className={`navbar__theme-icon ${
                  theme === "dark" ? "navbar__theme-icon--active" : ""
                }`}
              />
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
