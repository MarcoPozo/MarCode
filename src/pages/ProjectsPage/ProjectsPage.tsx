import { FiArrowLeft } from "react-icons/fi";
import { projects } from "../../data/projects";
import { useLanguage } from "../../context/language-context";
import ProjectCard from "../../components/Projects/ProjectCard";
import DashedGrid from "../../components/DashedGrid/DashedGrid";
import { MagneticRouterLink } from "../../components/Magnetic/MagneticRouterLink";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import "./ProjectsPage.css";

export default function ProjectsPage() {
  const projectsWithImages = projects.filter((project) => project.imageUrl);
  const { t } = useLanguage();

  return (
    <section className="section projects-page">
      <DashedGrid shimmer={false} />
      <div className="container">
        <MagneticRouterLink to="/#projects" className="projects-page__back">
          <FiArrowLeft /> {t.projectsPage.back}
        </MagneticRouterLink>

        <SectionHeading
          as="h1"
          eyebrow={t.projectsPage.eyebrow}
          title={
            <>
              {t.projectsPage.titlePrefix}
              <span className="text-gradient-shimmer">{t.projectsPage.titleHighlight}</span>
            </>
          }
          description={t.projectsPage.description}
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
