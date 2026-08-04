"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">

      {/* GOLD AURORA */}

      <motion.div
        animate={{
          x: [-300, 300, -300],
          y: [-120, 120, -120],
          rotate: [0, 25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute
        -left-[450px]
        -top-[450px]
        h-[1400px]
        w-[1400px]
        rounded-full
        bg-yellow-400/12
        blur-[260px]"
      />

      {/* ORANGE LIGHT */}

      <motion.div
        animate={{
          x: [250, -250, 250],
          y: [120, -120, 120],
          rotate: [0, -35, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 52,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute
        bottom-[-550px]
        right-[-550px]
        h-[1500px]
        w-[1500px]
        rounded-full
        bg-orange-400/8
        blur-[300px]"
      />

      {/* WHITE GLOW */}

      <motion.div
        animate={{
          opacity: [0.08, 0.18, 0.08],
          scale: [1, 1.35, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        h-[1000px]
        w-[1000px]
        rounded-full
        bg-white/6
        blur-[260px]"
      />

      {/* TOP LIGHT */}

      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
          x: [-150, 150, -150],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute
        left-0
        top-0
        h-[500px]
        w-full
        bg-gradient-to-b
        from-yellow-300/10
        to-transparent
        blur-[120px]"
      />

    </div>
  );
}