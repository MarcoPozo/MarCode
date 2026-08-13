import { useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  FiCheck,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiLoader,
  FiMail,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { useReveal } from "../../hooks/useReveal";
import { Button } from "../Button/Button";
import SectionHeading from "../SectionHeading/SectionHeading";
import "./Contact.css";

type SendStatus = "idle" | "sending" | "success" | "error";

const contactInfo = [
  {
    icon: FiMail,
    label: "marco10011111@gmail.com",
    href: "mailto:marco10011111@gmail.com",
  },
  {
    icon: FiMapPin,
    label: "De Quito Papá",
    href: undefined,
    flag: "https://flagcdn.com/ec.svg",
  },
];

const socials = [
  { icon: FiGithub, label: "GitHub", href: "https://github.com/MarcoPozo" },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/marcoopozo",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/593997750258",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<SendStatus>("idle");
  const { ref: introBodyRef, isVisible: introBodyVisible } =
    useReveal<HTMLDivElement>();
  const { ref: formRef, isVisible: formVisible } = useReveal<HTMLFormElement>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-view contact">
      <div className="container contact__grid">
        <div className="contact__intro">
          <SectionHeading
            eyebrow="Contacto"
            title={
              <>
                Hablemos de tu próximo{" "}
                <span className="text-gradient-shimmer">proyecto</span>
              </>
            }
          />

          <div
            ref={introBodyRef}
            className={`contact__intro-body reveal ${
              introBodyVisible ? "is-visible" : ""
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <p className="contact__text">
              ¿Tienes una idea, una oportunidad laboral o simplemente quieres
              saludar? Escríbeme, con gusto te respondo.
            </p>

            <ul className="contact__info">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} className="contact__info-link">
                      <item.icon /> {item.label}
                      {"flag" in item && (
                        <img
                          src={item.flag}
                          alt=""
                          className="contact__info-flag"
                        />
                      )}
                    </a>
                  ) : (
                    <span className="contact__info-link">
                      <item.icon /> {item.label}
                      {"flag" in item && (
                        <img
                          src={item.flag}
                          alt=""
                          className="contact__info-flag"
                        />
                      )}
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
              placeholder="Cuéntame en qué puedo ayudarte"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="contact__submit"
            iconPosition="left"
            disabled={status === "sending"}
            iconKey={status === "sending" ? "sending" : status === "success" ? "success" : "send"}
            icon={
              status === "sending" ? (
                <FiLoader className="contact__submit-spinner" />
              ) : status === "success" ? (
                <FiCheck />
              ) : (
                <FiSend />
              )
            }
          >
            {status === "sending"
              ? "Enviando..."
              : status === "success"
                ? "¡Enviado!"
                : "Enviar mensaje"}
          </Button>

          {status === "success" && (
            <p className="contact__status contact__status--success">
              <FiCheckCircle /> ¡Mensaje enviado! Te responderé pronto.
            </p>
          )}
          {status === "error" && (
            <p className="contact__status contact__status--error">
              Hubo un error al enviar. Intenta de nuevo o escríbeme directo a
              marco10011111@gmail.com.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
