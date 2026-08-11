"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Navbar from "../components/Navbar";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Product } from "../data/products";

export default function WishlistPage() {
  const wishlist = useContext(WishlistContext)!;
  const cart = useContext(CartContext)!;

  function removeFromWishlist(id: string) {
  wishlist.setWishlist(
    wishlist.wishlist.filter(
      (item) => item.id !== id
    )
  );
}

  function addToCart(product: Product) {
    const existingItem = cart.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      cart.setCartItems(
        cart.cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
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

    alert(`${product.name} added to cart!`);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-yellow-400 text-center mb-12">
            ❤️ My Wishlist
          </h1>

          {wishlist.wishlist.length === 0 ? (
            <div className="text-center text-2xl text-gray-400">
              Your wishlist is empty.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {wishlist.wishlist.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative h-64 bg-white flex items-center justify-center cursor-pointer">

                      <Image
                        src={product.image}
                        alt={product.name}
                        width={220}
                        height={220}
                        className="object-contain"
                      />

                    </div>
                  </Link>

                  <div className="p-5">

                    <h2 className="text-xl font-bold">
                      {product.name}
                    </h2>

                    <p className="text-yellow-400 text-2xl font-bold mt-3">
                      Rs. {product.price}
                    </p>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full mt-5 bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400"
                    >
                      🛒 Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-full mt-3 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-500"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </main>
    </>
  );
}