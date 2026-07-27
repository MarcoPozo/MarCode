import { useState } from "react";
import type { FormEvent } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";
import { useReveal } from "../../hooks/useReveal";
import "./Contact.css";

const contactInfo = [
  {
    icon: FiMail,
    label: "marco10011111@gmail.com",
    href: "mailto:marco10011111@gmail.com",
  },
  { icon: FiPhone, label: "+593 99 775 0258", href: "tel:+593997750258" },
  { icon: FiMapPin, label: "Quito, Ecuador", href: undefined },
];

const socials = [
  { icon: FiGithub, label: "GitHub", href: "https://github.com/MarcoPozo" },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/marcoopozo",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { ref: introRef, isVisible: introVisible } = useReveal<HTMLDivElement>();
  const { ref: formRef, isVisible: formVisible } = useReveal<HTMLFormElement>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Contacto desde el portfolio - ${form.name}`,
    );
    const body = encodeURIComponent(`${form.message}\n\n${form.email}`);
    window.location.href = `mailto:marco10011111@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-view contact">
      <div className="container contact__grid">
        <div
          ref={introRef}
          className={`contact__intro reveal ${introVisible ? "is-visible" : ""}`}
        >
          <span className="contact__badge">
            <FiMessageCircle /> Contacto
          </span>
          <h2 className="contact__title">
            Hablemos de tu próximo <span className="accent-text">proyecto</span>
          </h2>
          <p className="contact__text">
            ¿Tenés una idea, una oportunidad laboral o simplemente querés
            saludar? Escribime, con gusto te respondo.
          </p>

          <ul className="contact__info">
            {contactInfo.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a href={item.href} className="contact__info-link">
                    <item.icon /> {item.label}
                  </a>
                ) : (
                  <span className="contact__info-link">
                    <item.icon /> {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="contact__socials">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}>
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        <form
          ref={formRef}
          className={`contact__form reveal ${formVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "150ms" }}
          onSubmit={handleSubmit}
        >
          <div className="contact__field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tu nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__field">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Contame en qué puedo ayudarte"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn--primary contact__submit">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
