import { FiCode, FiExternalLink } from "react-icons/fi";
import type { Project } from "../../types";
import { useReveal } from "../../hooks/useReveal";
import { useLanguage } from "../../context/language-context";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { title, category, description, technologies, imageUrl, liveUrl } = project;
  const { ref, isVisible } = useReveal<HTMLElement>();
  const { lang, t } = useLanguage();

  return (
    <article
      ref={ref}
      className={`project-card reveal ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
    >
      <div className="project-card__header">
        <span className="project-card__meta">
          {String(index + 1).padStart(2, "0")}
          <span className="project-card__meta-divider" />
          {category[lang].toUpperCase()}
        </span>
        <div className="project-card__title-row">
          <h3 className="project-card__title">{title}</h3>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="project-card__live-link"
              aria-label={t.projects.visitAriaLabel(title)}
            >
              <FiExternalLink />
            </a>
          )}
        </div>
        <p className="project-card__description">{description[lang]}</p>
      </div>

      <div className="project-card__visual">
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <FiCode className="project-card__placeholder-icon" />
        )}
      </div>

      <div className="project-card__tech">
        {technologies.map((tech) => (
          <span key={tech} className="project-card__tag">
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
