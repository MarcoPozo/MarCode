import { FiArrowRight } from "react-icons/fi";
import { projects } from "../../data/projects";
import { useLanguage } from "../../context/language-context";
import ProjectCard from "./ProjectCard";
import { MagneticRouterLink } from "../Magnetic/MagneticRouterLink";
import SectionHeading from "../SectionHeading/SectionHeading";
import "./Projects.css";

const PREVIEW_COUNT = 3;

export default function Projects() {
  const preview = projects.slice(0, PREVIEW_COUNT);
  const { t } = useLanguage();

  return (
    <section id="projects" className="section-view projects">
      <div className="container">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={
            <>
              {t.projects.titlePrefix}
              <span className="text-gradient-shimmer">{t.projects.titleHighlight}</span>
            </>
          }
        />

        <div className="projects__grid">
          {preview.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length > PREVIEW_COUNT && (
          <div className="projects__more">
            <MagneticRouterLink to="/projects" className="projects__more-link">
              {t.projects.viewMore} <FiArrowRight />
            </MagneticRouterLink>
          </div>
        )}
      </div>
    </section>
  );
}
