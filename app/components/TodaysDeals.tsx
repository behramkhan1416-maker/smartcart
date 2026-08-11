"use client";

import { useEffect, useMemo, useState } from "react";
import { useProducts } from "../context/ProductContext";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  todaysDeal?: boolean;
};

export default function TodaysDeals() {
  const { products: allProducts } = useProducts();

  const products = useMemo(
    () =>
      [...allProducts]
        .filter(
          (product) =>
            (product as any).todaysDeal === true ||
            (product as any).todayDeal === true ||
            (product as any).deal === true
        )
        .slice(0, 8),
    [allProducts]
  );
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let {
          hours,
          minutes,
          seconds,
        } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            } else {
              hours = 12;
              minutes = 0;
              seconds = 0;
            }
          }
        }

        return {
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-r from-red-950 via-black to-red-950 py-10 text-white sm:py-16 lg:py-20">

      <div className="mx-auto max-w-7xl px-3 sm:px-6">

        {/* Heading and countdown */}
        <div className="mb-7 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400 sm:text-xs">
              Limited Time Offers
            </span>

            <h2 className="mt-1 text-2xl font-black sm:text-3xl lg:text-4xl">
              ðŸ”¥ Today&apos;s{" "}
              <span className="text-red-500">
                Deals
              </span>
            </h2>

            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              Shop before these special offers disappear.
            </p>

          </div>

          {/* Countdown */}
          <div className="flex gap-2 sm:gap-4">

            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-red-600 shadow-lg sm:h-24 sm:w-24 sm:rounded-2xl">

              <p className="text-xl font-black sm:text-3xl">
                {String(
                  timeLeft.hours
                ).padStart(2, "0")}
              </p>

              <span className="text-[8px] sm:text-sm">
                Hours
              </span>

            </div>

            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-red-600 shadow-lg sm:h-24 sm:w-24 sm:rounded-2xl">

              <p className="text-xl font-black sm:text-3xl">
                {String(
                  timeLeft.minutes
                ).padStart(2, "0")}
              </p>

              <span className="text-[8px] sm:text-sm">
                Minutes
              </span>

            </div>

            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-red-600 shadow-lg sm:h-24 sm:w-24 sm:rounded-2xl">

              <p className="text-xl font-black sm:text-3xl">
                {String(
                  timeLeft.seconds
                ).padStart(2, "0")}
              </p>

              <span className="text-[8px] sm:text-sm">
                Seconds
              </span>

            </div>

          </div>

        </div>

        {products.length === 0 ? (

          <div className="py-16 text-center text-sm text-gray-400 sm:py-20 sm:text-xl">
            No Today&apos;s Deal products available.
          </div>

        ) : (

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">

            {products.map(
              (product, index) => (

                <motion.div
                  key={product.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  className="group flex min-h-[325px] flex-col overflow-hidden rounded-xl border border-red-500/20 bg-gray-900 shadow-xl sm:min-h-[430px] sm:rounded-2xl lg:min-h-[555px]"
                >

                  {/* Product image */}
                  <Link
                    href={`/products/${product.id}`}
                  >

                    <div className="relative aspect-square overflow-hidden bg-white">

                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="
                          (max-width: 640px) 50vw,
                          (max-width: 1024px) 33vw,
                          25vw
                        "
                        className="object-contain p-1 transition duration-500 group-hover:scale-105 sm:p-2"
                      />

                      <span className="absolute left-1 top-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[7px] font-black text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
                        DEAL
                      </span>

                    </div>

                  </Link>

                  {/* Product details */}
                  <div className="flex flex-1 flex-col p-2 sm:p-4 lg:p-5">

                    <Link
                      href={`/products/${product.id}`}
                    >

                      <h3 className="line-clamp-2 min-h-[32px] text-[11px] font-bold leading-4 text-white transition hover:text-red-400 sm:min-h-[46px] sm:text-sm sm:leading-5 lg:min-h-[54px] lg:text-lg">
                        {product.name}
                      </h3>

                    </Link>

                    <div className="mt-1 text-[8px] text-yellow-400 sm:text-xs">
                      â­â­â­â­â­
                    </div>

                    <div className="mt-1 flex flex-col gap-0.5 sm:mt-2">

                      <span className="text-[9px] text-gray-500 line-through sm:text-xs">
                        Rs. {product.price * 2}
                      </span>

                      <span className="text-sm font-black text-red-500 sm:text-lg lg:text-2xl">
                        Rs. {product.price}
                      </span>

                    </div>

                    <div className="mt-auto pt-2 sm:pt-4">

                      <Link
                        href={`/products/${product.id}`}
                      >

                        <button className="w-full rounded-md bg-red-600 py-1.5 text-[9px] font-black text-white transition hover:bg-red-500 sm:rounded-lg sm:py-2.5 sm:text-xs lg:rounded-xl lg:py-3 lg:text-sm">
                          View Product
                        </button>

                      </Link>

                    </div>

                  </div>

                </motion.div>

              )
            )}

          </div>

        )}

      </div>

    </section>
  );
}


