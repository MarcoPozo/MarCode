import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const MotionLink = motion.create(Link);

interface BaseButtonProps {
  variant?: "primary" | "outline";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  /**
   * Si se define, `icon` se envuelve en un AnimatePresence con este valor
   * como key, así el cambio de ícono (ej. enviar → spinner → check) hace
   * un spring de entrada/salida en vez de saltar de golpe. Dejar sin
   * definir para un ícono estático simple.
   */
  iconKey?: string;
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
  iconKey,
  className = "",
  children,
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = `btn btn--${variant} ${className}`.trim();

  const renderedIcon = !icon ? null : iconKey ? (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={iconKey}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 25 }}
        className="btn__icon"
      >
        {icon}
      </motion.span>
    </AnimatePresence>
  ) : (
    icon
  );

  const content =
    iconPosition === "left" ? (
      <>
        {renderedIcon}
        {children}
      </>
    ) : (
      <>
        {children}
        {renderedIcon}
      </>
    );

  if (rest.as === "link") {
    return (
      <MotionLink
        to={rest.to}
        className={classes}
        onClick={onClick}
        whileTap={{ scale: 0.96 }}
      >
        {content}
      </MotionLink>
    );
  }

  if (rest.as === "a") {
    return (
      <motion.a
        href={rest.href}
        className={classes}
        whileTap={{ scale: 0.96 }}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={rest.type ?? "button"}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
    >
      {content}
    </motion.button>
  );
}
