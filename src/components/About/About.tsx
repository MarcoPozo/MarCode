import { FiCalendar, FiCheckCircle, FiLayers } from "react-icons/fi";
import { useReveal } from "../../hooks/useReveal";
import { useLanguage } from "../../context/language-context";
import ScrollRevealText from "../ScrollRevealText/ScrollRevealText";
import SectionHeading from "../SectionHeading/SectionHeading";
import "./About.css";

const stats = [
  { value: "3+", key: "experience", icon: FiCalendar },
  { value: "10+", key: "delivered", icon: FiCheckCircle },
  { value: "20+", key: "technologies", icon: FiLayers },
] as const;

export default function About() {
  const { ref: statsRef, isVisible: statsVisible } = useReveal<HTMLDivElement>();
  const { t } = useLanguage();

  return (
    <section id="about" className="section-view about">
      <div className="container about__grid">
        <div className="about__intro">
          <SectionHeading
            eyebrow={t.about.eyebrow}
            title={
              <>
                {t.about.titlePrefix}
                <span className="text-gradient-shimmer">{t.about.titleHighlight}</span>
              </>
            }
          />

          <ScrollRevealText className="about__text" text={t.about.text} />
        </div>

        <div
          ref={statsRef}
          className={`about__stats reveal ${statsVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "150ms" }}
        >
          {stats.map((stat) => (
            <div key={stat.key} className="about__stat">
              <div className="about__stat-top">
                <span className="about__stat-icon-wrap">
                  <stat.icon className="about__stat-icon" />
                  <stat.icon className="about__stat-icon about__stat-icon--shimmer" aria-hidden="true" />
                </span>
                <span className="about__stat-value">{stat.value}</span>
              </div>
              <span className="about__stat-label">{t.about.stats[stat.key]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
