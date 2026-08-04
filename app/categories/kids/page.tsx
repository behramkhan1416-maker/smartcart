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
  category: string;
};

export default function KidsCategoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadKidsProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const allProducts = snapshot.docs.map((productDoc) => ({
          id: productDoc.id,
          ...(productDoc.data() as Omit<Product, "id">),
        }));

        const kidsProducts = allProducts.filter(
          (product) =>
            product.category?.trim().toLowerCase() === "kids"
        );

        setProducts(kidsProducts);
      } catch (error) {
        console.error("Error loading kids products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadKidsProducts();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold tracking-[0.3em] text-gray-400">
            SMARTCART COLLECTION
          </p>

          <h1 className="text-4xl font-extrabold sm:text-6xl">
            Kids&apos; Collection
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Discover fun, stylish and comfortable products for kids.
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <p className="text-xl font-bold">
              Loading kids&apos; products...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-gray-900 p-12 text-center">
            <h2 className="text-2xl font-bold">
              No products found
            </h2>

            <p className="mt-3 text-gray-400">
              Add a product from Admin and set its category to:
              <span className="ml-2 font-bold text-white">
                Kids
              </span>
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-block rounded-xl bg-white px-7 py-3 font-bold text-black transition hover:bg-gray-200"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-7">

            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-gray-900 transition hover:-translate-y-1 hover:border-white/30"
              >
                <Link href={`/products/${product.id}`}>
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
                  <h2 className="h-12 overflow-hidden text-sm font-bold leading-6 sm:text-lg">
                    {product.name}
                  </h2>

                  <p className="mt-3 text-lg font-extrabold sm:text-xl">
                    Rs. {product.price}
                  </p>

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 block rounded-xl bg-white py-3 text-center text-sm font-bold text-black transition hover:bg-gray-200"
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