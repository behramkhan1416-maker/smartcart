"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const cartContext = useContext(CartContext);

  // Stop safely if CartProvider is unavailable
  if (!cartContext) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-gray-900 p-8 text-center">
          <div className="text-5xl">🛒</div>

          <h1 className="mt-5 text-2xl font-black text-red-400">
            Cart is unavailable
          </h1>

          <p className="mt-3 text-gray-400">
            Please refresh the page and try again.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex rounded-xl bg-yellow-400 px-6 py-3 font-black text-black transition hover:bg-yellow-300"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // After the null check, TypeScript knows this is safe
  const {
    cartItems,
    setCartItems,
  } = cartContext;

  function increaseQuantity(index: number) {
    const updatedCart = [...cartItems];

    updatedCart[index] = {
      ...updatedCart[index],
      quantity:
        updatedCart[index].quantity + 1,
    };

    setCartItems(updatedCart);
  }

  function decreaseQuantity(index: number) {
    const updatedCart = [...cartItems];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index] = {
        ...updatedCart[index],
        quantity:
          updatedCart[index].quantity - 1,
      };
    } else {
      updatedCart.splice(index, 1);
    }

    setCartItems(updatedCart);
  }

  function removeItem(index: number) {
    const updatedCart = [...cartItems];

    updatedCart.splice(index, 1);

    setCartItems(updatedCart);
  }

  function clearCart() {
    const confirmed = window.confirm(
      "Are you sure you want to remove all products from your cart?"
    );

    if (confirmed) {
      setCartItems([]);
    }
  }

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      item.product.price *
        item.quantity,
    0
  );

  const shipping =
    cartItems.length > 0
      ? 250
      : 0;

  const total =
    subtotal + shipping;

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 sm:py-16">

      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              SmartCart
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-6xl">
              Shopping Cart
            </h1>

            <p className="mt-4 text-gray-400">

              {totalItems === 0
                ? "Your cart is waiting for your favorite products."
                : `${totalItems} item${
                    totalItems > 1
                      ? "s"
                      : ""
                  } ready for checkout.`}

            </p>

          </div>

          {cartItems.length > 0 && (

            <button
              type="button"
              onClick={clearCart}
              className="rounded-xl border border-red-500/40 bg-red-500/10 px-6 py-3 font-black text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              🗑 Empty Cart
            </button>

          )}

        </div>

        {/* EMPTY CART */}

        {cartItems.length === 0 ? (

          <section className="rounded-3xl border border-yellow-400/20 bg-gray-900 p-10 text-center sm:p-16">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400/10 text-5xl">
              🛒
            </div>

            <h2 className="mt-7 text-3xl font-black">
              Your Cart is Empty
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-400">
              Explore SmartCart and add products
              you love to your shopping cart.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex rounded-xl bg-yellow-400 px-8 py-4 font-black text-black transition hover:bg-yellow-300"
            >
              Continue Shopping
            </Link>

          </section>

        ) : (

          <div className="grid gap-8 lg:grid-cols-3">

            {/* PRODUCTS */}

            <section className="space-y-5 lg:col-span-2">

              {cartItems.map(
                (item, index) => (

                  <article
                    key={`${item.product.id}-${index}`}
                    className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-gray-900 p-5 sm:flex-row sm:items-center sm:p-6"
                  >

                    {/* PRODUCT IMAGE */}

                    <div className="flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white sm:w-32">

                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={160}
                        height={160}
                        className="h-full w-full object-contain p-2"
                      />

                    </div>

                    {/* PRODUCT INFORMATION */}

                    <div className="min-w-0 flex-1">

                      <p className="text-xs font-bold uppercase tracking-wider text-yellow-400">

                        {item.product.category}

                      </p>

                      <h2 className="mt-2 text-xl font-black sm:text-2xl">

                        {item.product.name}

                      </h2>

                      <p className="mt-3 text-lg font-black text-yellow-400">

                        Rs.{" "}

                        {Number(
                          item.product.price
                        ).toLocaleString()}

                      </p>

                      <p className="mt-2 text-sm text-gray-500">

                        Item total:{" "}

                        <span className="font-bold text-green-400">

                          Rs.{" "}

                          {Number(
                            item.product.price *
                              item.quantity
                          ).toLocaleString()}

                        </span>

                      </p>

                    </div>

                    {/* QUANTITY CONTROLS */}

                    <div className="flex flex-row items-center justify-between gap-4 sm:flex-col">

                      <div className="flex items-center rounded-xl border border-white/10 bg-black p-1">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              index
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-xl font-black transition hover:bg-red-600"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span className="flex h-10 min-w-12 items-center justify-center font-black">

                          {item.quantity}

                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(
                              index
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400 text-xl font-black text-black transition hover:bg-yellow-300"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(index)
                        }
                        className="rounded-lg px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
                      >
                        🗑 Remove
                      </button>

                    </div>

                  </article>

                )
              )}

            </section>

            {/* ORDER SUMMARY */}

            <aside className="h-fit rounded-3xl border border-yellow-400/20 bg-gray-900 p-6 sm:p-8 lg:sticky lg:top-8">

              <h2 className="text-3xl font-black text-yellow-400">
                Order Summary
              </h2>

              <div className="mt-7 space-y-5">

                <div className="flex justify-between gap-4 text-gray-300">

                  <span>
                    Subtotal
                  </span>

                  <span className="font-bold text-white">

                    Rs.{" "}

                    {subtotal.toLocaleString()}

                  </span>

                </div>

                <div className="flex justify-between gap-4 text-gray-300">

                  <span>
                    Delivery
                  </span>

                  <span className="font-bold text-white">

                    Rs.{" "}

                    {shipping.toLocaleString()}

                  </span>

                </div>

                <div className="border-t border-white/10" />

                <div className="flex justify-between gap-4 text-2xl font-black">

                  <span>
                    Total
                  </span>

                  <span className="text-yellow-400">

                    Rs.{" "}

                    {total.toLocaleString()}

                  </span>

                </div>

              </div>

              <div className="mt-7 rounded-2xl border border-green-500/20 bg-green-500/5 p-4">

                <p className="font-bold text-green-400">
                  ✓ Secure order process
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Your order details will be reviewed
                  before confirmation.
                </p>

              </div>

              <Link
                href="/checkout"
                className="mt-7 flex w-full items-center justify-center rounded-xl bg-yellow-400 px-6 py-4 text-lg font-black text-black transition hover:bg-yellow-300"
              >
                Proceed to Checkout →
              </Link>

              <Link
                href="/shop"
                className="mt-4 flex w-full items-center justify-center rounded-xl border border-yellow-400 px-6 py-4 font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
              >
                Continue Shopping
              </Link>

            </aside>

          </div>

        )}

      </div>

    </main>
  );
}