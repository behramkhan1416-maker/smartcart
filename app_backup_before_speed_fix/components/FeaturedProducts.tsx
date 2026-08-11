"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import MagneticButton from "./MagneticButton";
import LuxuryProductCard from "./LuxuryProductCard";
import TiltCard from "./TiltCard";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useFlyToCart } from "../context/FlyToCartContext";

import { Product } from "../data/products";

import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FeaturedProducts() {
  const cart = useContext(CartContext)!;
  const wishlist = useContext(WishlistContext)!;
  const { setFly } = useFlyToCart();

  const [products, setProducts] = useState<Product[]>([]);

  const imageRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  useEffect(() => {
    async function loadProducts() {
      const snapshot = await getDocs(
        collection(db, "products")
      );

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));

      setProducts(list);
    }

    loadProducts();
  }, []);

  function addToCart(
    product: Product,
    e?: React.MouseEvent<HTMLButtonElement>
  ) {
    const imageBox = imageRefs.current[product.id];

    if (imageBox) {
      const rect = imageBox.getBoundingClientRect();

      setFly({
        image: product.image,
        startX: rect.left,
        startY: rect.top,
      });
    }

    const existingItem = cart.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      cart.setCartItems(
        cart.cartItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      cart.setCartItems([
        ...cart.cartItems,
        {
          product,
          quantity: 1,
        },
      ]);
    }

    toast.success(
      `${product.name} added to cart!`
    );
  }

  function toggleWishlist(product: Product) {
    const exists = wishlist.wishlist.some(
      (item) => item.id === product.id
    );

    if (exists) {
      wishlist.setWishlist(
        wishlist.wishlist.filter(
          (item) => item.id !== product.id
        )
      );
    } else {
      wishlist.setWishlist([
        ...wishlist.wishlist,
        product,
      ]);
    }
  }

  return (
    <section className="bg-black py-10 text-white sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center text-2xl font-black text-yellow-400 sm:mb-10 sm:text-3xl lg:mb-12 lg:text-4xl"
        >
          ⭐ Featured Products
        </motion.h2>

        {products.length === 0 ? (
          <p className="text-center text-base text-gray-400 sm:text-xl">
            No products available.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {products.map((product, index) => {
              const liked = wishlist.wishlist.some(
                (item) => item.id === product.id
              );

              return (
                <LuxuryProductCard key={product.id}>
                  <TiltCard>
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(index * 0.04, 0.3),
                      }}
                      whileHover={{
                        y: -6,
                      }}
                      className="
                        group flex h-full min-h-88.75
                        flex-col overflow-hidden
                        rounded-xl border border-white/10
                        bg-zinc-900
                        shadow-lg
                        transition-all
                        hover:border-yellow-500/40
                        hover:shadow-yellow-500/20
                        sm:min-h-117.5
                        sm:rounded-2xl
                        lg:min-h-152.5
                      "
                    >
                      <Link href={`/products/${product.id}`}>
                        <div
                          ref={(el) => {
                            imageRefs.current[product.id] = el;
                          }}
                          className="
                            relative aspect-square
                            overflow-hidden bg-white
                          "
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            priority={index < 4}
                            sizes="
                              (max-width: 640px) 50vw,
                              (max-width: 1024px) 33vw,
                              25vw
                            "
                            className="
                              object-contain
                              p-1
                              transition-transform
                              duration-500
                              group-hover:scale-105
                              sm:p-2
                            "
                          />

                          <span
                            className="
                              absolute left-1 top-1
                              rounded-full bg-red-600
                              px-1.5 py-0.5
                              text-[7px] font-bold
                              text-white
                              sm:left-3 sm:top-3
                              sm:px-3 sm:py-1
                              sm:text-xs
                            "
                          >
                            SALE
                          </span>

                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleWishlist(product);
                            }}
                            className={`
                              absolute right-1 top-1
                              flex h-7 w-7
                              items-center justify-center
                              rounded-full
                              text-xs
                              sm:right-3 sm:top-3
                              sm:h-10 sm:w-10
                              sm:text-base
                              ${
                                liked
                                  ? "bg-red-500 text-white"
                                  : "bg-white text-black"
                              }
                            `}
                          >
                            ❤️
                          </motion.button>
                        </div>
                      </Link>

                      <div className="flex flex-1 flex-col p-2 sm:p-4 lg:p-5">

                        <Link href={`/products/${product.id}`}>
                          <h3
                            className="
                              line-clamp-2
                              min-h-8
                              text-[11px] font-bold
                              leading-4 text-white
                              transition
                              hover:text-yellow-400
                              sm:min-h-12
                              sm:text-sm
                              sm:leading-5
                              lg:min-h-14
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
                            lg:text-2xl
                          "
                        >
                          Rs. {product.price}
                        </p>

                        <div
                          className="
                            mt-auto space-y-1.5
                            pt-2
                            sm:space-y-2
                            sm:pt-4
                            lg:space-y-3
                            lg:pt-5
                          "
                        >
                          <Link
                            href={`/products/${product.id}`}
                          >
                            <button
                              type="button"
                              className="
                                w-full rounded-md
                                border border-yellow-500/70
                                py-1.5
                                text-[9px] font-bold
                                text-yellow-400
                                transition
                                hover:bg-yellow-500
                                hover:text-black
                                sm:rounded-lg
                                sm:py-2.5
                                sm:text-xs
                                lg:rounded-xl
                                lg:py-3
                                lg:text-sm
                              "
                            >
                              View
                            </button>
                          </Link>

                          <MagneticButton
                            onClick={(e) =>
                              addToCart(product, e)
                            }
                            className="
                              w-full rounded-md
                              bg-yellow-500
                              py-1.5
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
                            Add to Cart
                          </MagneticButton>

                          <button
                            type="button"
                            onClick={(e) =>
                              addToCart(product, e)
                            }
                            className="
                              hidden w-full
                              rounded-xl bg-white
                              py-3 text-sm
                              font-bold text-black
                              transition
                              hover:bg-gray-200
                              sm:block
                            "
                          >
                            ⚡ Buy Now
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  </TiltCard>
                </LuxuryProductCard>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}