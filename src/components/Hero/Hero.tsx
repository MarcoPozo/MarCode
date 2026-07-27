import { FiArrowRight, FiCode, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import heroVisual from "../../assets/images/hero-visual.webp";
import { scrollToSection } from "../../lib/lenis";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="hero" className="section-view hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <span className="hero__badge">
            <FiCode /> Full Stack Developer
          </span>

          <h1 className="hero__name">Marco Pozo</h1>

          <p className="hero__tagline">
            &ldquo;Haz cosas que los demás sueñen con hacer.&rdquo;
          </p>

          <p className="hero__description">
            Desarrollador con más de 3 años de experiencia construyendo
            productos digitales, con un enfoque especial en frontend y
            experiencias de usuario modernas.
          </p>

          <div className="hero__actions">
            <a
              href="#projects"
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
            >
              Ver proyectos
              <FiArrowRight />
            </a>
            <a
              href="#contact"
              className="btn btn--outline"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Contactarme
            </a>
          </div>

          <div className="hero__socials">
            <a
              href="https://github.com/MarcoPozo"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub">
              <FiGithub />
            </a>
            <a
              href="https://linkedin.com/in/marcoopozo"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="mailto:marco10011111@gmail.com" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <img
            src={heroVisual}
            alt="Ilustración de un espacio de trabajo de desarrollo flotante"
          />
        </div>
      </div>
    </section>
  );
}
