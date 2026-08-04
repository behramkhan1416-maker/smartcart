"use client";

import Link from "next/link";

const categories = [
  { name: "Jewelry", icon: "💎", slug: "jewelry" },
  { name: "Bags", icon: "👜", slug: "bags" },
  { name: "Watches", icon: "⌚", slug: "watches" },
  { name: "Shoes", icon: "👠", slug: "shoes" },
  { name: "Fashion", icon: "👗", slug: "fashion" },
  { name: "Beauty", icon: "✨", slug: "beauty" },
  { name: "Electronics", icon: "🎧", slug: "electronics" },
];

export default function Categories() {
  return (
    <section className="w-full overflow-hidden bg-black py-10 text-white">
      {/* Heading */}
      <h2 className="mb-7 text-center text-3xl font-black sm:text-5xl">
        Shop By{" "}
        <span className="text-yellow-400">
          Category
        </span>
      </h2>

      {/* ONE HORIZONTAL ROW */}
      <div
        className="
          flex
          w-full
          flex-nowrap
          gap-2
          overflow-x-auto
          px-3
          pb-4
          sm:gap-5
          sm:px-6
        "
      >
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="
              flex
              h-28
              w-[calc((100vw-30px)/4)]
              min-w-[calc((100vw-30px)/4)]
              shrink-0
              flex-col
              items-center
              justify-center
              rounded-xl
              border
              border-white/15
              bg-[#111111]
              px-1
              text-center
              transition
              hover:border-yellow-400
              hover:bg-[#181818]
              sm:h-44
              sm:w-44
              sm:min-w-44
              sm:rounded-2xl
            "
          >
            {/* Icon */}
            <div className="text-2xl sm:text-5xl">
              {category.icon}
            </div>

            {/* Name */}
            <h3 className="mt-2 w-full truncate text-[9px] font-bold text-white sm:text-base">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>

      <p className="mt-1 text-center text-xs text-gray-500 sm:hidden">
        ← Swipe to see more categories →
      </p>
    </section>
  );
}