import type { ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";
import "./SectionHeading.css";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
}

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`section-heading reveal ${isVisible ? "is-visible" : ""}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-heading__title">{title}</h2>
      <span className="section-heading__underline" aria-hidden="true" />
    </div>
  );
}
