import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useActiveSection } from "../../hooks/useActiveSection";
import { scrollToSection } from "../../lib/lenis";
import "./Navbar.css";

const navLinks = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
        <Link to="/" className="navbar__brand">
          MarCode
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
        </ul>
      </div>
    </nav>
  );
}
