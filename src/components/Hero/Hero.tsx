import { FiFolder, FiGithub, FiLinkedin, FiMail, FiMessageCircle } from "react-icons/fi";
import { scrollToSection } from "../../lib/lenis";
import { useReveal } from "../../hooks/useReveal";
import { useLanguage } from "../../context/language-context";
import { Button } from "../Button/Button";
import ShaderNoise from "../ShaderNoise/ShaderNoise";
import HeroName from "./HeroName";
import "./Hero.css";

export default function Hero() {
  const { ref: contentRef, isVisible: contentVisible } = useReveal<HTMLDivElement>();
  const { t } = useLanguage();

  return (
    <section id="hero" className="section-view hero">
      <ShaderNoise />
      <div className="container hero__grid">
        <div
          ref={contentRef}
          className={`hero__content reveal ${contentVisible ? "is-visible" : ""}`}
        >
          <span className="eyebrow">{t.hero.eyebrow}</span>

          <HeroName />

          <p className="hero__description">{t.hero.description}</p>

          <div className="hero__actions">
            <Button
              as="a"
              href="#projects"
              variant="primary"
              icon={<FiFolder />}
              iconPosition="left"
              onClick={() => scrollToSection("projects")}
            >
              {t.hero.ctaProjects}
            </Button>
            <Button
              as="a"
              href="#contact"
              variant="outline"
              icon={<FiMessageCircle />}
              iconPosition="left"
              onClick={() => scrollToSection("contact")}
            >
              {t.hero.ctaContact}
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
