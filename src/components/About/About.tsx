import { FiUser } from "react-icons/fi";
import { useReveal } from "../../hooks/useReveal";
import "./About.css";

const stats = [
  { value: "3+", label: "Años de experiencia" },
  { value: "10+", label: "Proyectos entregados" },
  { value: "2", label: "Trabajo en equipo / freelance" },
];

const focusAreas = [
  "Frontend Development",
  "Backend Development",
  "UI/UX Design",
  "Automatización",
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
          <span className="about__badge">
            <FiUser /> Sobre mí
          </span>

          <h2 className="about__title">
            Convierto ideas en productos digitales{" "}
            <span className="accent-text">reales</span>
          </h2>

          <p className="about__text">
            Soy Tecnólogo en Desarrollo de Software con más de 3 años de
            experiencia construyendo soluciones web, tanto en instituciones como
            de forma freelance. Actualmente trabajo como Desarrollador FullStack
            en Instituto Ismac, donde he liderado el desarrollo integral del
            sitio institucional y participado en módulos clave de su Sistema de
            Gestión Académica.
          </p>

          <p className="about__text">
            Me enfoco especialmente en frontend, cuidando cada detalle de la
            experiencia de usuario, sin dejar de lado el backend cuando el
            proyecto lo requiere. Complemento mi perfil técnico con formación en
            diseño (Figma, Adobe XD), lo que me permite entender el producto de
            punta a punta.
          </p>

          <div className="about__focus">
            {focusAreas.map((area) => (
              <span key={area} className="about__tag">
                {area}
              </span>
            ))}
          </div>
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
