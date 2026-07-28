import { FiFolder, FiGrid } from "react-icons/fi";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import { useReveal } from "../../hooks/useReveal";
import { MagneticRouterLink } from "../Magnetic/MagneticRouterLink";
import "./Projects.css";

const PREVIEW_COUNT = 3;

export default function Projects() {
  const preview = projects.slice(0, PREVIEW_COUNT);
  const { ref: headerRef, isVisible: headerVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="projects" className="section-view projects">
      <div className="container">
        <div
          ref={headerRef}
          className={`projects__header reveal ${headerVisible ? "is-visible" : ""}`}
        >
          <span className="projects__badge">
            <FiFolder /> Proyectos
          </span>
          <h2 className="projects__title">
            Algunos trabajos que he{" "}
            <span className="accent-text">construido</span>
          </h2>
        </div>

        <div className="projects__grid">
          {preview.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length > PREVIEW_COUNT && (
          <div className="projects__more">
            <MagneticRouterLink to="/projects" className="btn btn--outline">
              Ver todos los proyectos
              <FiGrid />
            </MagneticRouterLink>
          </div>
        )}
      </div>
    </section>
  );
}
