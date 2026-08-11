import { Link, useLocation } from "react-router-dom";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { scrollToSection } from "../../lib/lenis";
import "./Footer.css";

const quickLinks = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const socials = [
  { icon: FiGithub, label: "GitHub", href: "https://github.com/MarcoPozo" },
  { icon: FiLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/marcoopozo" },
  { icon: FiMail, label: "Email", href: "mailto:marco10011111@gmail.com" },
];

export default function Footer() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    if (isHome) {
      e.preventDefault();
      scrollToSection(id);
    }
  };

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            MarCode
          </Link>
          <p className="footer__tagline">
            Full Stack Developer construyendo experiencias digitales con
            propósito.
          </p>
        </div>

        <nav className="footer__nav">
          <span className="footer__heading">(Navegación)</span>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={isHome ? `#${link.id}` : `/#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="footer__nav-link"
                >
                  <span>{link.label}</span>
                  <FiArrowUpRight className="footer__nav-arrow" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__connect">
          <span className="footer__heading">(Contacto)</span>
          <a href="mailto:marco10011111@gmail.com" className="footer__connect-email">
            marco10011111@gmail.com
          </a>
          <p className="footer__connect-location">Quito, Ecuador</p>
          <div className="footer__socials">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Marco Pozo. Todos los derechos
          reservados.
        </p>

        <div className="footer__status">
          <span className="footer__status-dot" />
          Disponible para nuevos proyectos
        </div>

        <a
          href={isHome ? "#hero" : "/#hero"}
          onClick={(e) => handleLinkClick(e, "hero")}
          className="footer__top"
        >
          Volver arriba <FiArrowUp />
        </a>
      </div>
    </footer>
  );
}
