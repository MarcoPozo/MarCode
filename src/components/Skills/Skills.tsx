import { useReveal } from "../../hooks/useReveal";
import { useLanguage } from "../../context/language-context";
import DashedGrid from "../DashedGrid/DashedGrid";
import SectionHeading from "../SectionHeading/SectionHeading";
import "./Skills.css";

const skillGroups = [
  {
    categoryKey: "frontend",
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
    categoryKey: "backend",
    skills: [
      { name: "Node.js", slug: "nodejs" },
      { name: "Express", slug: "express" },
      { name: "NestJS", slug: "nestjs" },
      { name: "PHP", slug: "php" },
    ],
  },
  {
    categoryKey: "databases",
    skills: [
      { name: "MySQL", slug: "mysql" },
      { name: "PostgreSQL", slug: "postgres" },
    ],
  },
  {
    categoryKey: "tools",
    skills: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Figma", slug: "figma" },
      { name: "Photoshop", slug: "ps" },
      {
        name: "Claude",
        iconUrl: "https://api.iconify.design/simple-icons/claude.svg?color=%23D97757",
      },
      {
        name: "Cloudinary",
        iconUrl: "https://api.iconify.design/simple-icons/cloudinary.svg?color=%233448C5",
      },
    ],
  },
] as const;

function CategoryBlock({
  group,
  index,
  categoryLabel,
}: {
  group: (typeof skillGroups)[number];
  index: number;
  categoryLabel: string;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`skills__category-block reveal ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <h3 className="skills__category-title">{categoryLabel}</h3>
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
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-view skills">
      <DashedGrid />
      <div className="container">
        <SectionHeading
          eyebrow={t.skills.eyebrow}
          title={
            <>
              {t.skills.titlePrefix}
              <span className="text-gradient-shimmer">{t.skills.titleHighlight}</span>
            </>
          }
        />

        <div className="skills__categories">
          {skillGroups.map((group, index) => (
            <CategoryBlock
              key={group.categoryKey}
              group={group}
              index={index}
              categoryLabel={t.skills.categories[group.categoryKey]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
