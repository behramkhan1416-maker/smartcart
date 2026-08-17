"use client";

import { motion } from "framer-motion";

export default function Fog() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Left Fog */}

      <motion.div
        animate={{
          x: [-250, 250, -250],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 70,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        left-[-500px]
        top-[10%]
        w-[1500px]
        h-[900px]
        rounded-full
        bg-white/5
        blur-[80px]"
      />

      {/* Right Fog */}

      <motion.div
        animate={{
          x: [250, -250, 250],
          scale: [1, 1.18, 1],
        }}
        transition={{
          duration: 85,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        right-[-600px]
        bottom-[0]
        w-[1700px]
        h-[950px]
        rounded-full
        bg-white/5
        blur-[90px]"
      />

    </div>
  );
}