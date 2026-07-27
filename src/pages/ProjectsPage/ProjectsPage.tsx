import { Link } from "react-router-dom";
import { FiArrowLeft, FiFolder } from "react-icons/fi";
import { projects } from "../../data/projects";
import ProjectCard from "../../components/Projects/ProjectCard";
import "./ProjectsPage.css";

export default function ProjectsPage() {
  return (
    <section className="section projects-page">
      <div className="container">
        <Link to="/#projects" className="projects-page__back">
          <FiArrowLeft /> Volver al inicio
        </Link>

        <div className="projects-page__header">
          <span className="projects-page__badge">
            <FiFolder /> Proyectos
          </span>
          <h1 className="projects-page__title">Todos los proyectos</h1>
          <p className="projects-page__subtitle">
            Un repaso completo por los proyectos institucionales y freelance
            en los que he trabajado.
          </p>
        </div>

        <div className="projects-page__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
