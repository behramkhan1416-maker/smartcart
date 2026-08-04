"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  bestSeller?: boolean;
};

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const snapshot = await getDocs(
        collection(db, "products")
      );

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      const bestSellerProducts = list.filter(
        (product) =>
          product.bestSeller === true
      );

      setProducts(bestSellerProducts);
    }

    loadProducts();
  }, []);

  return (
    <section className="bg-gray-950 py-10 text-white sm:py-16 lg:py-20">

      <div className="mx-auto max-w-7xl px-3 sm:px-6">

        {/* Section heading */}
        <div className="mb-6 flex items-end justify-between gap-3 sm:mb-10">

          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 sm:text-xs">
              Customer Favorites
            </span>

            <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              🔥 Best{" "}
              <span className="text-yellow-400">
                Sellers
              </span>
            </h2>

            <p className="mt-1 hidden text-sm text-gray-400 sm:block">
              Our customers&apos; favorite products.
            </p>
          </div>

          <Link
            href="/shop"
            className="
              shrink-0 rounded-lg
              border border-yellow-500/40
              px-3 py-2
              text-xs font-bold
              text-yellow-400
              transition
              hover:bg-yellow-500
              hover:text-black
              sm:px-5
              sm:py-3
              sm:text-sm
            "
          >
            View All →
          </Link>

        </div>

        {products.length === 0 ? (

          <div className="py-16 text-center text-sm text-gray-400 sm:py-20 sm:text-xl">
            No Best Seller products available.
          </div>

        ) : (

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {products.map((product) => (

              <div
                key={product.id}
                className="
                  group flex min-h-[315px] flex-col
                  overflow-hidden rounded-xl
                  border border-yellow-500/15
                  bg-gray-900
                  shadow-lg
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-yellow-500/40
                  hover:shadow-yellow-500/20
                  sm:min-h-[430px]
                  sm:rounded-2xl
                  lg:min-h-[540px]
                "
              >

                {/* Product Image */}
                <Link href={`/products/${product.id}`}>

                  <div className="relative aspect-square overflow-hidden bg-white">

                    <span
                      className="
                        absolute left-1 top-1 z-10
                        rounded-full bg-yellow-500
                        px-1.5 py-0.5
                        text-[7px] font-black text-black
                        sm:left-3 sm:top-3
                        sm:px-3 sm:py-1
                        sm:text-xs
                      "
                    >
                      BEST SELLER
                    </span>

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="
                        (max-width: 640px) 50vw,
                        (max-width: 1024px) 33vw,
                        25vw
                      "
                      className="
                        object-contain p-1
                        transition-transform duration-500
                        group-hover:scale-105
                        sm:p-2
                      "
                    />

                  </div>

                </Link>

                {/* Product Details */}
                <div className="flex flex-1 flex-col p-2 sm:p-4 lg:p-5">

                  <Link href={`/products/${product.id}`}>

                    <h3
                      className="
                        line-clamp-2
                        min-h-[32px]
                        text-[11px] font-bold
                        leading-4 text-white
                        transition
                        hover:text-yellow-400
                        sm:min-h-[46px]
                        sm:text-sm
                        sm:leading-5
                        lg:min-h-[54px]
                        lg:text-lg
                      "
                    >
                      {product.name}
                    </h3>

                  </Link>

                  <div
                    className="
                      mt-1 text-[8px]
                      text-yellow-400
                      sm:text-xs
                    "
                  >
                    ⭐⭐⭐⭐⭐
                  </div>

                  <p
                    className="
                      mt-1 text-sm font-black
                      text-yellow-400
                      sm:text-lg
                      lg:mt-2 lg:text-2xl
                    "
                  >
                    Rs. {product.price}
                  </p>

                  <div className="mt-auto pt-2 sm:pt-4">

                    <Link
                      href={`/products/${product.id}`}
                      className="
                        block w-full
                        rounded-md
                        bg-yellow-500
                        py-1.5
                        text-center
                        text-[9px] font-black
                        text-black
                        transition
                        hover:bg-yellow-400
                        sm:rounded-lg
                        sm:py-2.5
                        sm:text-xs
                        lg:rounded-xl
                        lg:py-3
                        lg:text-sm
                      "
                    >
                      View Product
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}