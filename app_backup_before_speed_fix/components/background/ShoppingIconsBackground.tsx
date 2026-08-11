"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ShoppingBag,
  Gem,
  Watch,
  Shirt,
  Gift,
  Sparkles,
} from "lucide-react";

type Particle = {
  id: number;
  Icon: LucideIcon;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

const icons: LucideIcon[] = [
  ShoppingBag,
  Gem,
  Watch,
  Shirt,
  Gift,
  Sparkles,
];

export default function ShoppingIconsBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 75 }, (_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 14 + Math.random() * 12, // 14–26px
      duration: 18 + Math.random() * 12,
      delay: Math.random() * 8,
    }));

    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {particles.map((item) => {
        const Icon = item.Icon;

        return (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
            }}
            animate={{
              x: [-80, 70, -60, 50, -80],
              y: [-60, 50, -40, 60, -60],
              rotate: [-20, 15, -10, 10, -20],
              opacity: [0.08, 0.28, 0.15, 0.30, 0.08],
              scale: [0.9, 1.05, 0.95, 1.05, 0.9],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon
              size={item.size}
              strokeWidth={1.3}
              className="text-yellow-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.45)]"
            />
          </motion.div>
        );
      })}
    </div>
  );
}