"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";
import { useFlyToCart } from "../context/FlyToCartContext";
import { Product } from "../data/products";

import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

type ShopProduct = Product & {
  stock?: number;
};

export default function ShopPage() {
  const cart = useContext(CartContext)!;
  const search = useContext(SearchContext)!;
  const { setFly } = useFlyToCart();

  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ShopProduct, "id">),
        }));

        setProducts(list);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.search.toLowerCase())
  );

  function addToCart(
    product: ShopProduct,
    e?: React.MouseEvent<HTMLButtonElement>
  ) {
    if ((product.stock ?? 0) <= 0) {
      toast.error("This product is out of stock.");
      return;
    }

    if (e) {
      const card = e.currentTarget.closest(".group");
      const image = card?.querySelector("img");

      if (image) {
        const rect = image.getBoundingClientRect();

        setFly({
          image: product.image,
          startX: rect.left,
          startY: rect.top,
        });
      }
    }

    const existing = cart.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existing) {
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

    toast.success(`${product.name} added to cart!`);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-yellow-400 text-center mb-12">
            🛍 Shop
          </h1>

          {loading ? (
            <div className="text-center text-2xl text-gray-400">
              Loading products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-2xl text-gray-400">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-500/20 hover:-translate-y-2 transition-all duration-300 flex flex-col h-[650px]"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative h-64 bg-white flex items-center justify-center overflow-hidden cursor-pointer">

                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-110 transition duration-300"
                      />

                      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                        SALE
                      </span>

                    </div>
                  </Link>

                  <div className="p-5 flex flex-col flex-1">

                    <Link href={`/products/${product.id}`}>
                      <h2 className="text-xl font-bold hover:text-yellow-400 transition h-20 overflow-hidden">
                        {product.name}
                      </h2>
                    </Link>

                    <div className="text-yellow-400 my-2">
                      ⭐⭐⭐⭐⭐
                    </div>

                    <p className="text-2xl text-yellow-400 font-bold">
                      Rs. {product.price}
                    </p>

                    {(product.stock ?? 0) > 0 ? (
                      <p className="text-green-400 font-semibold mt-3">
                        ✅ In Stock ({product.stock})
                      </p>
                    ) : (
                      <p className="text-red-500 font-semibold mt-3">
                        ❌ Out of Stock
                      </p>
                    )}

                    <button
                      onClick={(e) => addToCart(product, e)}
                      disabled={(product.stock ?? 0) <= 0}
                      className={`mt-auto w-full py-3 rounded-xl font-bold transition ${
                        (product.stock ?? 0) > 0
                          ? "bg-yellow-500 text-black hover:bg-yellow-400"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {(product.stock ?? 0) > 0
                        ? "🛒 Add to Cart"
                        : "❌ Out of Stock"}
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