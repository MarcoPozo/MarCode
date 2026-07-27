import { Link } from "react-router-dom";
import { FiArrowRight, FiFolder } from "react-icons/fi";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

const PREVIEW_COUNT = 3;

export default function Projects() {
  const preview = projects.slice(0, PREVIEW_COUNT);

  return (
    <section id="projects" className="section-view projects">
      <div className="container">
        <div className="projects__header">
          <span className="projects__badge">
            <FiFolder /> Proyectos
          </span>
          <h2 className="projects__title">
            Algunos trabajos que he{" "}
            <span className="accent-text">construido</span>
          </h2>
        </div>

        <div className="projects__grid">
          {preview.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length > PREVIEW_COUNT && (
          <div className="projects__more">
            <Link to="/projects" className="btn btn--outline">
              Ver todos los proyectos
              <FiArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
