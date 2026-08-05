import { useReveal } from "../../hooks/useReveal";
import DashedGrid from "../DashedGrid/DashedGrid";
import "./Skills.css";

const skills = [
  { name: "HTML5", slug: "html" },
  { name: "CSS3", slug: "css" },
  { name: "JavaScript", slug: "js" },
  { name: "TypeScript", slug: "ts" },
  { name: "React", slug: "react" },
  { name: "Vite", slug: "vite" },
  { name: "Tailwind CSS", slug: "tailwind" },
  { name: "Bootstrap", slug: "bootstrap" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Express", slug: "express" },
  { name: "NestJS", slug: "nestjs" },
  { name: "PHP", slug: "php" },
  { name: "MySQL", slug: "mysql" },
  { name: "PostgreSQL", slug: "postgres" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Figma", slug: "figma" },
  { name: "Photoshop", slug: "ps" },
];

export default function Skills() {
  const { ref: headerRef, isVisible: headerVisible } = useReveal<HTMLDivElement>();
  const { ref: gridRef, isVisible: gridVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className="section-view skills">
      <DashedGrid />
      <div className="container">
        <div
          ref={headerRef}
          className={`skills__header reveal ${headerVisible ? "is-visible" : ""}`}
        >
          <span className="eyebrow">Skills</span>
          <h2 className="skills__title">
            Tecnologías con las que{" "}
            <span className="accent-text">trabajo</span>
          </h2>
        </div>

        <div ref={gridRef} className="skills__grid">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`skills__chip reveal ${gridVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <img
                src={`https://skillicons.dev/icons?i=${skill.slug}`}
                alt={skill.name}
                className="skills__chip-icon"
                loading="lazy"
              />
              <span className="skills__chip-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
