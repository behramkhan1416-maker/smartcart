"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LuxuryVideoBanner() {
  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-yellow-500/30 shadow-2xl shadow-yellow-500/20"
        >

          {/* Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            className="w-full h-[650px] object-cover"
          >
            <source src="/videos/promo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/45"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-yellow-500 text-black font-bold px-5 py-2 rounded-full mb-6"
            >
              ✨ SMARTCART LUXURY COLLECTION
            </motion.span>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-black text-white"
            >
              Luxury Shopping
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-200 mt-6 max-w-3xl text-lg md:text-xl"
            >
              Discover Premium Jewelry, Watches, Fashion Accessories,
              Luxury Bags and Exclusive Collections.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10"
            >
              <Link
                href="/shop"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 py-4 rounded-xl transition duration-300 shadow-xl shadow-yellow-500/30"
              >
                🛒 Shop Collection
              </Link>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}