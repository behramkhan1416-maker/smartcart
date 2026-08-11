"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

export default function LuxuryBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 40,
    damping: 20,
  });

  const y = useSpring(mouseY, {
    stiffness: 40,
    damping: 20,
  });

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const list: Particle[] = Array.from({ length: 40 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 5,
    }));

    setParticles(list);
  }, []);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    mouseX.set(e.clientX / 18);
    mouseY.set(e.clientY / 18);
  }

  return (
    <div
      onMouseMove={move}
      className="fixed inset-0 -z-50 overflow-hidden bg-black"
    >
      {/* Mouse Glow */}
      <motion.div
        style={{ x, y }}
        className="absolute left-1/3 top-1/3 w-[450px] h-[450px] rounded-full bg-yellow-400/10 blur-[180px]"
      />

      {/* Floating Gold */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-10 w-[350px] h-[350px] rounded-full bg-yellow-500/10 blur-[140px]"
      />

      {/* Purple Glow */}
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-10 w-[420px] h-[420px] rounded-full bg-purple-500/10 blur-[170px]"
      />

      {/* Blue Glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[140px]"
      />

      {/* Rotating Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/5"
      />

      {/* Sparkles */}
      {particles.map((p, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
          className="absolute rounded-full bg-yellow-300"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}