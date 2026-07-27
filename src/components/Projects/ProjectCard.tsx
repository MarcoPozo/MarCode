import { FiCode, FiExternalLink, FiGithub } from "react-icons/fi";
import type { Project } from "../../types";
import { useReveal } from "../../hooks/useReveal";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { title, description, technologies, imageUrl, repoUrl, liveUrl } =
    project;
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`project-card reveal ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <div className="project-card__visual">
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <FiCode className="project-card__placeholder-icon" />
        )}
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>

        <div className="project-card__tech">
          {technologies.map((tech) => (
            <span key={tech} className="project-card__tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-card__links">
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="project-card__link"
              aria-label={`Repositorio de ${title}`}
            >
              <FiGithub /> Código
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="project-card__link"
              aria-label={`Demo de ${title}`}
            >
              <FiExternalLink /> Demo
            </a>
          )}
          {!repoUrl && !liveUrl && (
            <span className="project-card__soon">Detalles próximamente</span>
          )}
        </div>
      </div>
    </article>
  );
}
