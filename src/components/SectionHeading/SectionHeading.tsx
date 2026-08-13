import type { ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";
import "./SectionHeading.css";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  as?: "h1" | "h2";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`section-heading reveal ${isVisible ? "is-visible" : ""}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <Heading className="section-heading__title">{title}</Heading>
      <span className="section-heading__underline" aria-hidden="true" />
      {description && (
        <p className="section-heading__description">{description}</p>
      )}
    </div>
  );
}
