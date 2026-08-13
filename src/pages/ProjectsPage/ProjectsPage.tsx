import { FiArrowLeft } from "react-icons/fi";
import { projects } from "../../data/projects";
import ProjectCard from "../../components/Projects/ProjectCard";
import DashedGrid from "../../components/DashedGrid/DashedGrid";
import { MagneticRouterLink } from "../../components/Magnetic/MagneticRouterLink";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
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

        <SectionHeading
          as="h1"
          eyebrow="Proyectos"
          title={
            <>
              Todos los{" "}
              <span className="text-gradient-shimmer">proyectos</span>
            </>
          }
          description="Un repaso completo por los proyectos institucionales y freelance en los que he trabajado."
        />

        <div className="projects-page__grid">
          {projectsWithImages.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
