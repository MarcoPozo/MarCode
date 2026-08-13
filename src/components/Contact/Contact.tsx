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
import type { IconType } from "react-icons";
import { useReveal } from "../../hooks/useReveal";
import { useLanguage } from "../../context/language-context";
import { Button } from "../Button/Button";
import SectionHeading from "../SectionHeading/SectionHeading";
import "./Contact.css";

type SendStatus = "idle" | "sending" | "success" | "error";

const EMAIL = "marco10011111@gmail.com";

interface ContactInfoItem {
  id: "email" | "location";
  icon: IconType;
  href?: string;
  flag?: string;
}

const contactInfo: ContactInfoItem[] = [
  { id: "email", icon: FiMail, href: `mailto:${EMAIL}` },
  { id: "location", icon: FiMapPin, flag: "https://flagcdn.com/ec.svg" },
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
  const { t } = useLanguage();

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
            eyebrow={t.contact.eyebrow}
            title={
              <>
                {t.contact.titlePrefix}
                <span className="text-gradient-shimmer">{t.contact.titleHighlight}</span>
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
            <p className="contact__text">{t.contact.text}</p>

            <ul className="contact__info">
              {contactInfo.map((item) => {
                const label = item.id === "email" ? EMAIL : t.contact.location;
                return (
                  <li key={item.id}>
                    {item.href ? (
                      <a href={item.href} className="contact__info-link">
                        <item.icon /> {label}
                        {item.flag && (
                          <img
                            src={item.flag}
                            alt=""
                            className="contact__info-flag"
                          />
                        )}
                      </a>
                    ) : (
                      <span className="contact__info-link">
                        <item.icon /> {label}
                        {item.flag && (
                          <img
                            src={item.flag}
                            alt=""
                            className="contact__info-flag"
                          />
                        )}
                      </span>
                    )}
                  </li>
                );
              })}
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
            <label htmlFor="name">{t.contact.form.nameLabel}</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder={t.contact.form.namePlaceholder}
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__field">
            <label htmlFor="email">{t.contact.form.emailLabel}</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={t.contact.form.emailPlaceholder}
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__field">
            <label htmlFor="message">{t.contact.form.messageLabel}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t.contact.form.messagePlaceholder}
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
              ? t.contact.form.sending
              : status === "success"
                ? t.contact.form.sent
                : t.contact.form.submit}
          </Button>

          {status === "success" && (
            <p className="contact__status contact__status--success">
              <FiCheckCircle /> {t.contact.status.success}
            </p>
          )}
          {status === "error" && (
            <p className="contact__status contact__status--error">
              {t.contact.status.error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
