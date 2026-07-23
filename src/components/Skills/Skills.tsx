import { Icon } from "@iconify/react";
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

export default function Skills() {
  return (
    <section id="skills" className="section-view skills">
      <div className="container">
        <div className="skills__header">
          <span className="skills__badge">Skills</span>
          <h2 className="skills__title">
            Tecnologías con las que{" "}
            <span className="accent-text">trabajo</span>
          </h2>
        </div>

        <div className="skills__grid">
          {skillGroups.map((group) => (
            <div key={group.category} className="skills__card">
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
          ))}
        </div>
      </div>
    </section>
  );
}
