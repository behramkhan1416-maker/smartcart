"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
};

export default function MagneticButton({
  children,
  className = "",
  onClick,
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 250,
    damping: 20,
  });

  const springY = useSpring(y, {
    stiffness: 250,
    damping: 20,
  });

  function handleMove(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    const rect = e.currentTarget.getBoundingClientRect();

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.2);
    y.set(dy * 0.2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={(e) => {
        console.log("BUTTON CLICK");
        onClick?.(e);
      }}
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      type="button"
    >
      {children}
    </motion.button>
  );
}