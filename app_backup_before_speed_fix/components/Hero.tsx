"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">

      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">

        <div className="max-w-3xl">

          {/* Collection label */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold tracking-[0.12em] text-white sm:text-sm"
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            NEW LUXURY COLLECTION 2026
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mt-7 text-5xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Luxury

            <span className="mt-2 block">
              Shopping
            </span>

            <span className="mt-2 block text-gray-300">
              Starts Here
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg"
          >
            Discover premium jewelry, handbags, watches, fashion and
            lifestyle products—selected for quality, style and a better
            shopping experience.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
           <Link
  href="/shop"
  className="flex min-h-14 items-center justify-center rounded-xl border border-white/30 bg-black px-8 text-base font-black text-white transition hover:bg-white hover:text-black"
>
  Explore Collection
</Link>

            <Link
              href="/about"
              className="flex min-h-14 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 text-base font-bold text-white transition hover:bg-white/10"
            >
              Discover SmartCart
            </Link>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 grid max-w-2xl grid-cols-3 border-t border-white/10 pt-7"
          >
            <div>
              <p className="text-2xl font-black text-white sm:text-3xl">
                500+
              </p>

              <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                Products
              </p>
            </div>

            <div className="border-x border-white/10 px-4 sm:px-8">
              <p className="text-2xl font-black text-white sm:text-3xl">
                10K+
              </p>

              <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                Customers
              </p>
            </div>

            <div className="pl-4 sm:pl-8">
              <p className="text-2xl font-black text-white sm:text-3xl">
                24/7
              </p>

              <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                Support
              </p>
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}