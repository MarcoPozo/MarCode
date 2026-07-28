import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useMagnetic } from "../../hooks/useMagnetic";

const MotionLink = motion.create(Link);

interface MagneticRouterLinkProps {
  to: string;
  className?: string;
  children: ReactNode;
  strength?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function MagneticRouterLink({
  to,
  className,
  children,
  strength,
  stiffness,
  damping,
  mass,
}: MagneticRouterLinkProps) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic<HTMLAnchorElement>({
    strength,
    stiffness,
    damping,
    mass,
  });

  return (
    <MotionLink
      ref={ref}
      to={to}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
    >
      {children}
    </MotionLink>
  );
}
