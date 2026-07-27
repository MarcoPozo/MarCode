import { Icon } from "@iconify/react";
import { FiCpu } from "react-icons/fi";
import { useReveal } from "../../hooks/useReveal";
import "./Skills.css";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML5", icon: "logos:html-5" },
      { name: "CSS3", icon: "logos:css-3" },
      { name: "JavaScript", icon: "logos:javascript" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "React", icon: "logos:react" },
      { name: "Vite", icon: "logos:vitejs" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "Bootstrap", icon: "logos:bootstrap" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "Express", icon: "simple-icons:express" },
      { name: "NestJS", icon: "logos:nestjs" },
      { name: "PHP", icon: "logos:php" },
    ],
  },
  {
    category: "Bases de datos",
    skills: [
      { name: "MySQL", icon: "logos:mysql" },
      { name: "PostgreSQL", icon: "logos:postgresql" },
    ],
  },
  {
    category: "Herramientas y diseño",
    skills: [
      { name: "Git", icon: "logos:git-icon" },
      { name: "GitHub", icon: "mdi:github" },
      { name: "Figma", icon: "logos:figma" },
      { name: "Photoshop", icon: "logos:adobe-photoshop" },
    ],
  },
];

function SkillCard({
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
      className={`skills__card reveal ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <h3 className="skills__category">{group.category}</h3>
      <div className="skills__items">
        {group.skills.map((skill) => (
          <div key={skill.name} className="skills__item">
            <Icon icon={skill.icon} className="skills__icon" />
            <span className="skills__name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref: headerRef, isVisible: headerVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className="section-view skills">
      <div className="container">
        <div
          ref={headerRef}
          className={`skills__header reveal ${headerVisible ? "is-visible" : ""}`}
        >
          <span className="skills__badge">
            <FiCpu /> Skills
          </span>
          <h2 className="skills__title">
            Tecnologías con las que{" "}
            <span className="accent-text">trabajo</span>
          </h2>
        </div>

        <div className="skills__grid">
          {skillGroups.map((group, index) => (
            <SkillCard key={group.category} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
