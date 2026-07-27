import { Link, useLocation } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
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
          <span className="footer__heading">Navegación</span>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={isHome ? `#${link.id}` : `/#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__connect">
          <span className="footer__heading">Conectemos</span>
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

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Marco Pozo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
