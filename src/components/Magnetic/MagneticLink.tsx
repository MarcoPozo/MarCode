import type { MouseEvent, ReactNode } from "react";
import { motion } from "motion/react";
import { useMagnetic } from "../../hooks/useMagnetic";

interface MagneticLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  strength?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function MagneticLink({
  href,
  className,
  children,
  onClick,
  strength,
  stiffness,
  damping,
  mass,
}: MagneticLinkProps) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic<HTMLAnchorElement>({
    strength,
    stiffness,
    damping,
    mass,
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
    >
      {children}
    </motion.a>
  );
}
