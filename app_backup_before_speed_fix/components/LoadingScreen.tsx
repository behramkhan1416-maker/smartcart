"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);

    if (mobile) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="text-center">

            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-black tracking-widest bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent"
            >
              SmartCart
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 260 }}
              transition={{ duration: 2 }}
              className="mx-auto mt-8 h-1 rounded-full bg-yellow-400"
            />

            <motion.p
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="mt-6 text-gray-400 tracking-[6px]"
            >
              LUXURY SHOPPING EXPERIENCE
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}