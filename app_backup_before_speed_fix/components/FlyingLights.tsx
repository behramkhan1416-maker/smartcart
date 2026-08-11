"use client";

import { motion } from "framer-motion";

const lights = [
  { top: "5%", delay: 0, duration: 16, width: 220, color: "from-yellow-300/0 via-yellow-300 to-yellow-300/0" },
  { top: "18%", delay: 2, duration: 18, width: 180, color: "from-cyan-300/0 via-cyan-300 to-cyan-300/0" },
  { top: "32%", delay: 5, duration: 22, width: 260, color: "from-purple-400/0 via-purple-400 to-purple-400/0" },
  { top: "48%", delay: 1, duration: 15, width: 200, color: "from-yellow-400/0 via-yellow-400 to-yellow-400/0" },
  { top: "60%", delay: 7, duration: 24, width: 300, color: "from-orange-300/0 via-orange-300 to-orange-300/0" },
  { top: "76%", delay: 4, duration: 19, width: 240, color: "from-cyan-400/0 via-cyan-400 to-cyan-400/0" },
  { top: "90%", delay: 9, duration: 20, width: 220, color: "from-yellow-300/0 via-yellow-300 to-yellow-300/0" },
];

export default function FlyingLights() {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">

      {lights.map((light, index) => (
        <motion.div
          key={index}
          initial={{
            x: "-30vw",
            opacity: 0,
          }}
          animate={{
            x: "140vw",
            opacity: [0, 0.25, 0.9, 0.25, 0],
          }}
          transition={{
            duration: light.duration,
            delay: light.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
          style={{
            top: light.top,
          }}
        >
          <div
            className={`h-[2px] rounded-full bg-gradient-to-r ${light.color} blur-[1px]`}
            style={{
              width: light.width,
            }}
          />

          <div
            className="absolute -top-5 left-1/3 h-12 w-12 rounded-full bg-yellow-300/20 blur-3xl"
          />
        </motion.div>
      ))}

    </div>
  );
}