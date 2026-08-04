"use client";

import { motion } from "framer-motion";

const particles = [
  { id: 1, size: 6, left: 5, delay: 0, duration: 12 },
  { id: 2, size: 8, left: 15, delay: 1, duration: 14 },
  { id: 3, size: 5, left: 25, delay: 2, duration: 11 },
  { id: 4, size: 7, left: 35, delay: 3, duration: 15 },
  { id: 5, size: 6, left: 45, delay: 1, duration: 13 },
  { id: 6, size: 8, left: 55, delay: 2, duration: 16 },
  { id: 7, size: 5, left: 65, delay: 4, duration: 12 },
  { id: 8, size: 7, left: 75, delay: 3, duration: 14 },
  { id: 9, size: 6, left: 85, delay: 2, duration: 13 },
  { id: 10, size: 8, left: 95, delay: 5, duration: 15 },
];

export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-yellow-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            opacity: 0.35,
          }}
          initial={{ y: "110vh" }}
          animate={{
            y: "-20vh",
            x: [0, -15, 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}