"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

export default function TiltCard({
  children,
}: {
  children: ReactNode;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const shadow = useTransform(
    rotateY,
    [-15, 15],
    [
      "0px 10px 30px rgba(0,0,0,.4)",
      "0px 30px 60px rgba(255,215,0,.35)",
    ]
  );

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateYValue = ((x / rect.width) - 0.5) * 20;
    const rotateXValue = -((y / rect.height) - 0.5) * 20;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        boxShadow: shadow,
        transformStyle: "preserve-3d",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className="rounded-2xl"
    >
      {children}
    </motion.div>
  );
}