"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function LuxurySpotlight() {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const x = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const y = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x,
        y,
      }}
      className="fixed pointer-events-none z-0 h-[500px] w-[500px] rounded-full"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,215,0,0.18) 0%, rgba(255,215,0,0.08) 35%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />
    </motion.div>
  );
}