import { Link, useLocation } from "react-router-dom";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { scrollToSection } from "../../lib/lenis";
import ShaderNoise from "../../components/ShaderNoise/ShaderNoise";
import "./Footer.css";

const quickLinks = [
  { label: "Inicio", id: "hero" },
  { label: "Sobre mí", id: "about" },
  { label: "Habilidades", id: "skills" },
  { label: "Proyectos", id: "projects" },
  { label: "Contacto", id: "contact" },
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
      <ShaderNoise extendBehindNavbar={false} accentColor="#3a3a3f" />

      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="MarCode">
            <img src="/logo/logo.svg" alt="MarCode" className="footer__logo-img" />
          </Link>
          <p className="footer__tagline">
            Full Stack Developer construyendo experiencias digitales con
            propósito.
          </p>
        </div>

        <nav className="footer__nav">
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
      </div>
    </footer>
  );
}
