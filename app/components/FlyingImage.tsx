"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useFlyToCart } from "../context/FlyToCartContext";

export default function FlyingImage() {
  const { fly, setFly, cartRef } = useFlyToCart();

  useEffect(() => {
    if (!fly) return;

    const timer = setTimeout(() => {
      setFly(null);
    }, 900);

    return () => clearTimeout(timer);
  }, [fly, setFly]);

  if (!fly || !cartRef.current) return null;

  const cartRect = cartRef.current.getBoundingClientRect();

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          left: fly.startX,
          top: fly.startY,
          scale: 1,
          opacity: 1,
        }}
        animate={{
          left: cartRect.left + 12,
          top: cartRect.top + 12,
          scale: 0.2,
          opacity: 0,
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="fixed z-[9999] pointer-events-none w-24 h-24"
      >
        <Image
          src={fly.image}
          alt="Flying Product"
          fill
          className="object-contain rounded-xl shadow-2xl"
        />
      </motion.div>
    </AnimatePresence>
  );
}