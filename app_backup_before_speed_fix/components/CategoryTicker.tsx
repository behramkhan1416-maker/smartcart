"use client";

import {
  Gem,
  Handbag,
  Watch,
  Footprints,
  Shirt,
  Sparkles,
  Headphones,
} from "lucide-react";

const categories = [
  { icon: Gem, name: "Jewelry" },
  { icon: Handbag, name: "Bags" },
  { icon: Watch, name: "Watches" },
  { icon: Footprints, name: "Shoes" },
  { icon: Shirt, name: "Fashion" },
  { icon: Sparkles, name: "Beauty" },
  { icon: Headphones, name: "Electronics" },
];

export default function CategoryTicker() {
  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-12 text-center text-4xl font-black md:text-5xl">
          Shop By{" "}
          <span className="text-yellow-400">
            Category
          </span>
        </h2>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                className="
                  group flex min-h-36 flex-col items-center justify-center
                  rounded-2xl border border-white/10
                  bg-white/5 p-5
                  transition duration-300
                  hover:-translate-y-2
                  hover:border-yellow-400/60
                  hover:bg-yellow-400/10
                "
              >
                <Icon
                  size={38}
                  className="
                    text-yellow-400
                    transition duration-300
                    group-hover:scale-110
                  "
                />

                <span className="mt-4 text-sm font-bold text-white">
                  {category.name}
                </span>
              </button>
            );
          })}

        </div>

      </div>
    </section>
  );
}