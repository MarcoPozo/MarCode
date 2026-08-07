import { FiArrowLeft } from "react-icons/fi";
import { projects } from "../../data/projects";
import ProjectCard from "../../components/Projects/ProjectCard";
import DashedGrid from "../../components/DashedGrid/DashedGrid";
import { MagneticRouterLink } from "../../components/Magnetic/MagneticRouterLink";
import "./ProjectsPage.css";

export default function ProjectsPage() {
  const projectsWithImages = projects.filter((project) => project.imageUrl);

  return (
    <section className="section projects-page">
      <DashedGrid shimmer={false} />
      <div className="container">
        <MagneticRouterLink to="/#projects" className="projects-page__back">
          <FiArrowLeft /> Volver al inicio
        </MagneticRouterLink>

        <div className="projects-page__header">
          <span className="eyebrow">Proyectos</span>
          <h1 className="projects-page__title">Todos los proyectos</h1>
          <p className="projects-page__subtitle">
            Un repaso completo por los proyectos institucionales y freelance
            en los que he trabajado.
          </p>
        </div>

        <div className="projects-page__grid">
          {projectsWithImages.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
