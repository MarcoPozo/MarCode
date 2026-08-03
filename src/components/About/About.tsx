import { useReveal } from "../../hooks/useReveal";
import ScrollRevealText from "../ScrollRevealText/ScrollRevealText";
import "./About.css";

const stats = [
  { value: "3+", label: "Años de experiencia" },
  { value: "10+", label: "Proyectos entregados" },
  { value: "2", label: "Trabajo en equipo / freelance" },
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
            text="Más de 3 años construyendo soluciones web, entre proyectos institucionales y freelance. Me enfoco en frontend sin perder de vista el backend, cuidando cada detalle hasta que el producto se sienta realmente pulido."
          />
        </div>

        <div
          ref={statsRef}
          className={`about__stats reveal ${statsVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "150ms" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="about__stat">
              <span className="about__stat-value">{stat.value}</span>
              <span className="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
