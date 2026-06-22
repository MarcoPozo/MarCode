import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useActiveSection } from "../../hooks/useActiveSection";
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
  const activeId = useActiveSection(navLinks.map((link) => link.id));

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <a href="#hero" className="navbar__brand">
          MarCode
        </a>

        <button
          className="navbar__toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

        <ul className={`navbar__links ${isOpen ? "navbar__links--open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`navbar__link ${
                  activeId === link.id ? "navbar__link--active" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
