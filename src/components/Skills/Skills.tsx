import { useState } from "react";
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

// Se actualiza a mano cuando cambio de foco de aprendizaje — no forma parte
// de skillGroups porque no es una habilidad ya dominada, es un badge aparte.
const learning = { name: "Docker", slug: "docker" };

function CategoryBlock({
  group,
  index,
  categoryLabel,
  isActive,
}: {
  group: (typeof skillGroups)[number];
  index: number;
  categoryLabel: string;
  isActive: boolean;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`skills__category-block ${isActive ? "skills__category-block--active" : ""} reveal ${
        // En mobile los bloques inactivos empiezan en display: none, así que
        // el IntersectionObserver de useReveal nunca los intersecta — sin
        // el OR con isActive, el bloque recién seleccionado por un tab
        // aparecería en blanco (atascado en opacity: 0) hasta que scrollees.
        isVisible || isActive ? "is-visible" : ""
      }`}
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

type CategoryKey = (typeof skillGroups)[number]["categoryKey"];

export default function Skills() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("frontend");

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

        <div className="skills__learning">
          <span className="skills__learning-dot" aria-hidden="true" />
          <span className="skills__learning-label">{t.skills.learningLabel}:</span>
          <img
            src={`https://skillicons.dev/icons?i=${learning.slug}`}
            alt=""
            className="skills__learning-icon"
            loading="lazy"
          />
          <span className="skills__learning-name">{learning.name}</span>
        </div>

        <div className="skills__tabs" role="tablist">
          {skillGroups.map((group) => (
            <button
              key={group.categoryKey}
              type="button"
              role="tab"
              aria-selected={activeCategory === group.categoryKey}
              className={`skills__tab ${
                activeCategory === group.categoryKey ? "skills__tab--active" : ""
              }`}
              onClick={() => setActiveCategory(group.categoryKey)}
            >
              {t.skills.categories[group.categoryKey]}
            </button>
          ))}
        </div>

        <div className="skills__categories">
          {skillGroups.map((group, index) => (
            <CategoryBlock
              key={group.categoryKey}
              group={group}
              index={index}
              categoryLabel={t.skills.categories[group.categoryKey]}
              isActive={activeCategory === group.categoryKey}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
