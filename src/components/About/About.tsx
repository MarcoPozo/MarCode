import { FiCalendar, FiCheckCircle, FiUsers } from "react-icons/fi";
import { useReveal } from "../../hooks/useReveal";
import DashedGrid from "../DashedGrid/DashedGrid";
import ScrollRevealText from "../ScrollRevealText/ScrollRevealText";
import "./About.css";

const stats = [
  {
    value: "3+",
    label: "Años de experiencia",
    icon: FiCalendar,
    glow: "rgba(166, 124, 0, 0.4)",
  },
  {
    value: "10+",
    label: "Proyectos entregados",
    icon: FiCheckCircle,
    glow: "rgba(27, 58, 107, 0.45)",
  },
  {
    value: "2",
    label: "Trabajo en equipo / freelance",
    icon: FiUsers,
    glow: "rgba(192, 57, 43, 0.35)",
  },
];

export default function About() {
  const { ref: introRef, isVisible: introVisible } = useReveal<HTMLDivElement>();
  const { ref: statsRef, isVisible: statsVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="section-view about">
      <div className="container about__grid">
        <div
          ref={introRef}
          className={`about__intro reveal ${introVisible ? "is-visible" : ""}`}
        >
          <span className="eyebrow">Sobre mí</span>

          <h2 className="about__title">
            Convierto ideas en productos digitales{" "}
            <span className="accent-text">reales</span>
          </h2>

          <ScrollRevealText
            className="about__text"
            text="Más de 3 años construyendo soluciones web, entre proyectos institucionales y freelance. Me enfoco en frontend sin perder de vista el backend, cuidando cada detalle hasta que el producto se sienta realmente pulido. Disfruto resolver problemas reales con código limpio y aprender algo nuevo en cada proyecto."
          />
        </div>

        <div
          ref={statsRef}
          className={`about__stats reveal ${statsVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="about__stats-halo">
            <DashedGrid interactive={false} vignette />
          </div>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="about__stat"
              style={{ "--stat-glow": stat.glow } as React.CSSProperties}
            >
              <div className="about__stat-top">
                <stat.icon className="about__stat-icon" />
                <span className="about__stat-value">{stat.value}</span>
              </div>
              <span className="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
