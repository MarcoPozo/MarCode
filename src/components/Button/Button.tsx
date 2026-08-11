import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface BaseButtonProps {
  variant?: "primary" | "outline";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface ButtonAsButton extends BaseButtonProps {
  as?: "button";
  type?: "button" | "submit";
  href?: undefined;
  to?: undefined;
}

interface ButtonAsAnchor extends BaseButtonProps {
  as: "a";
  href: string;
  type?: undefined;
  to?: undefined;
}

interface ButtonAsLink extends BaseButtonProps {
  as: "link";
  to: string;
  type?: undefined;
  href?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

export function Button({
  variant = "primary",
  icon,
  iconPosition = "right",
  className = "",
  children,
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = `btn btn--${variant} ${className}`.trim();
  const content =
    iconPosition === "left" ? (
      <>
        {icon}
        {children}
      </>
    ) : (
      <>
        {children}
        {icon}
      </>
    );

  if (rest.as === "link") {
    return (
      <Link to={rest.to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (rest.as === "a") {
    return (
      <a
        href={rest.href}
        className={classes}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={rest.type ?? "button"}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
