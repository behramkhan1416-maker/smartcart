"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Bubble = {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
};

export default function LuxuryBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    setBubbles(
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        size: Math.random() * 20 + 10,
        left: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  if (!bubbles.length) return null;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border border-cyan-200 bg-white/20"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            boxShadow: "0 0 15px rgba(255,255,255,0.7)",
          }}
          initial={{
            y: "110vh",
          }}
          animate={{
            y: "-20vh",
            x: [-20, 20, -10, 10],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}