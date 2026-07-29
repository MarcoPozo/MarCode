import { FiCode, FiFolder, FiGithub, FiLinkedin, FiMail, FiMessageCircle } from "react-icons/fi";
import { scrollToSection } from "../../lib/lenis";
import { useReveal } from "../../hooks/useReveal";
import { Button } from "../Button/Button";
import ShaderNoise from "../ShaderNoise/ShaderNoise";
import "./Hero.css";

export default function Hero() {
  const { ref: contentRef, isVisible: contentVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="hero" className="section-view hero">
      <ShaderNoise />
      <div className="container hero__grid">
        <div
          ref={contentRef}
          className={`hero__content reveal ${contentVisible ? "is-visible" : ""}`}
        >
          <span className="hero__badge">
            <FiCode /> Full Stack Developer
          </span>

          <h1 className="hero__name">
            Marco <span className="accent-text">Pozo</span>
          </h1>

          <p className="hero__tagline">
            &ldquo;Haz cosas que los demás sueñen con hacer.&rdquo;
          </p>

          <p className="hero__description">
            Desarrollador con más de 3 años de experiencia construyendo
            productos digitales, con un enfoque especial en frontend y
            experiencias de usuario modernas.
          </p>

          <div className="hero__actions">
            <Button
              as="a"
              href="#projects"
              variant="primary"
              icon={<FiFolder />}
              iconPosition="left"
              onClick={() => scrollToSection("projects")}
            >
              Ver proyectos
            </Button>
            <Button
              as="a"
              href="#contact"
              variant="outline"
              icon={<FiMessageCircle />}
              iconPosition="left"
              onClick={() => scrollToSection("contact")}
            >
              Contactarme
            </Button>
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
      </div>
    </section>
  );
}
