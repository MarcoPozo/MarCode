import { useReveal } from "../../hooks/useReveal";
import DashedGrid from "../DashedGrid/DashedGrid";
import "./Skills.css";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML5", slug: "html" },
      { name: "CSS3", slug: "css" },
      { name: "JavaScript", slug: "js" },
      { name: "TypeScript", slug: "ts" },
      { name: "React", slug: "react" },
      { name: "Vite", slug: "vite" },
      { name: "Tailwind CSS", slug: "tailwind" },
      { name: "Bootstrap", slug: "bootstrap" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", slug: "nodejs" },
      { name: "Express", slug: "express" },
      { name: "NestJS", slug: "nestjs" },
      { name: "PHP", slug: "php" },
    ],
  },
  {
    category: "Bases de datos",
    skills: [
      { name: "MySQL", slug: "mysql" },
      { name: "PostgreSQL", slug: "postgres" },
    ],
  },
  {
    category: "Herramientas y diseño",
    skills: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Figma", slug: "figma" },
      { name: "Photoshop", slug: "ps" },
      {
        name: "Claude",
        iconUrl: "https://api.iconify.design/simple-icons/claude.svg?color=%23D97757",
      },
    ],
  },
];

function CategoryBlock({
  group,
  index,
}: {
  group: (typeof skillGroups)[number];
  index: number;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`skills__category-block reveal ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <h3 className="skills__category-title">{group.category}</h3>
      <div className="skills__grid">
        {group.skills.map((skill) => {
          const iconSrc =
            "iconUrl" in skill
              ? skill.iconUrl
              : `https://skillicons.dev/icons?i=${skill.slug}`;
          return (
            <div key={skill.name} className="skills__chip">
              <img
                src={iconSrc}
                alt={skill.name}
                className="skills__chip-icon"
                loading="lazy"
              />
              <span className="skills__chip-name">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref: headerRef, isVisible: headerVisible } = useReveal<HTMLDivElement>();

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

        <div className="skills__categories">
          {skillGroups.map((group, index) => (
            <CategoryBlock key={group.category} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
