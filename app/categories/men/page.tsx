"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  mainCategory?: string;
  subCategory?: string;
};

const menCategories = [
  { name: "All", icon: "🛍️" },
  { name: "Perfumes", icon: "🧴" },
  { name: "Men's Shoes", icon: "👞" },
  { name: "Men's Watches", icon: "⌚" },
  { name: "Men's Sandals", icon: "🩴" },
  { name: "Men's Shirts", icon: "👔" },
  { name: "Polo Shirts", icon: "👕" },
  { name: "T-Shirts", icon: "👕" },
  { name: "Formal Shoes", icon: "👞" },
  { name: "Casual Shoes", icon: "👟" },
];

export default function MenCategoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenProducts() {
      try {
        const snapshot = await getDocs(
          collection(db, "products")
        );

        const allProducts = snapshot.docs.map(
          (productDoc) => ({
            id: productDoc.id,
            ...(productDoc.data() as Omit<Product, "id">),
          })
        );

        // Only products added under Men
        const menProducts = allProducts.filter(
          (product) =>
            product.mainCategory
              ?.trim()
              .toLowerCase() === "men"
        );

        setProducts(menProducts);
      } catch (error) {
        console.error(
          "Error loading men's products:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadMenProducts();
  }, []);

  // Filter by selected niche
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.subCategory
              ?.trim()
              .toLowerCase() ===
            activeCategory
              .trim()
              .toLowerCase()
        );

  return (
    <main className="min-h-screen bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold tracking-[0.3em] text-yellow-400">
            SMARTCART COLLECTION
          </p>

          <h1 className="text-4xl font-extrabold sm:text-6xl">
            Men&apos;s Collection
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Discover men&apos;s fashion, perfumes,
            watches, shoes, sandals and more.
          </p>
        </div>

        {/* Category cards */}
        <div className="mb-12">
          <h2 className="mb-5 text-center text-2xl font-bold">
            Shop Men&apos;s Categories
          </h2>

          <div className="flex gap-3 overflow-x-auto pb-4">

            {menCategories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() =>
                  setActiveCategory(category.name)
                }
                className={`
                  flex min-w-32 shrink-0
                  flex-col items-center
                  justify-center
                  rounded-2xl border
                  px-4 py-5
                  transition
                  ${
                    activeCategory === category.name
                      ? "border-yellow-400 bg-yellow-400 text-black"
                      : "border-white/15 bg-gray-900 text-white hover:border-yellow-400"
                  }
                `}
              >
                <span className="text-3xl">
                  {category.icon}
                </span>

                <span className="mt-3 whitespace-nowrap text-sm font-bold">
                  {category.name}
                </span>
              </button>
            ))}

          </div>
        </div>

        {/* Selected category */}
        <h2 className="mb-7 text-2xl font-bold">
          {activeCategory === "All"
            ? "All Men's Products"
            : activeCategory}
        </h2>

        {/* Loading */}
        {loading ? (
          <div className="py-24 text-center">
            <p className="text-xl font-bold">
              Loading men&apos;s products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-gray-900 p-12 text-center">

            <h2 className="text-2xl font-bold">
              No Products Found
            </h2>

            <p className="mt-3 text-gray-400">
              No products are available in{" "}
              <span className="font-bold text-white">
                {activeCategory}
              </span>
              .
            </p>

            {activeCategory !== "All" && (
              <button
                type="button"
                onClick={() =>
                  setActiveCategory("All")
                }
                className="mt-7 rounded-xl bg-yellow-400 px-7 py-3 font-bold text-black"
              >
                Show All Men&apos;s Products
              </button>
            )}

          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-7 lg:grid-cols-4">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-gray-900 transition hover:-translate-y-1 hover:border-yellow-400"
              >

                <Link
                  href={`/products/${product.id}`}
                >
                  <div className="relative h-44 bg-white sm:h-64">

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-3"
                    />

                  </div>
                </Link>

                <div className="p-4 sm:p-5">

                  <h3 className="h-12 overflow-hidden text-sm font-bold leading-6 sm:text-lg">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-lg font-extrabold text-yellow-400 sm:text-xl">
                    Rs. {product.price}
                  </p>

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 block rounded-xl bg-white py-3 text-center text-sm font-bold text-black transition hover:bg-yellow-400"
                  >
                    View Product
                  </Link>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}