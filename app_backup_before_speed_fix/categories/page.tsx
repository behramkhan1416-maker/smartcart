import Link from "next/link";

const categories = [
  {
    name: "Women",
    icon: "👗",
    description: "Fashion, jewelry, handbags, shoes and accessories.",
    href: "/categories/women",
  },
  {
    name: "Men",
    icon: "👔",
    description: "Stylish fashion, watches and premium essentials.",
    href: "/categories/men",
  },
  {
    name: "Kids",
    icon: "🧸",
    description: "Fun, comfortable and stylish products for kids.",
    href: "/categories/kids",
  },
  {
    name: "Luxury",
    icon: "💎",
    description: "Exclusive premium fashion and luxury products.",
    href: "/categories/luxury",
  },
  {
    name: "Special Offers",
    icon: "🔥",
    description: "Limited-time deals and exclusive SmartCart offers.",
    href: "/categories/special-offers",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold tracking-[0.3em] text-gray-400">
            SMARTCART
          </p>

          <h1 className="text-4xl font-extrabold sm:text-6xl">
            Shop by Category
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Explore SmartCart collections and discover products made for every
            style and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group rounded-2xl border border-white/10 bg-gray-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-gray-800"
            >
              <div className="text-5xl">
                {category.icon}
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {category.name}
              </h2>

              <p className="mt-3 leading-7 text-gray-400">
                {category.description}
              </p>

              <div className="mt-6 font-bold text-white">
                Explore Collection →
              </div>
            </Link>
          ))}

        </div>

      </div>
    </main>
  );
}