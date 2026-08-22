"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
  User,
} from "lucide-react";

import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-black/60 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-400/20 bg-red-400/10">
            <ShoppingCart className="h-7 w-7 text-red-400" />
          </div>

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

  const { cartItems, setCartItems } = cartContext;

  function increaseQuantity(index: number) {
    const updatedCart = [...cartItems];

    updatedCart[index] = {
      ...updatedCart[index],
      quantity: updatedCart[index].quantity + 1,
    };

    setCartItems(updatedCart);
  }

  function decreaseQuantity(index: number) {
    const updatedCart = [...cartItems];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: updatedCart[index].quantity - 1,
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
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.product.price) * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 250 : 0;
  const total = subtotal + shipping;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-8 text-white sm:px-6 sm:py-10 lg:py-14">

      {/* =========================================================
          LUXURY BACKGROUND
      ========================================================= */}

      <div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 overflow-hidden"
>
  <img
    src="/cart-bg.png"
    alt=""
    className="
      absolute
      inset-0
      h-full
      w-full
      object-cover
      object-center
      opacity-100
    "
  />

  <div className="absolute inset-0 bg-black/15" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(234,179,8,0.12),transparent_30%)]" />

  <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/45" />
</div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* TOP NAV STYLE STRIP */}

        <div className="mb-8 flex items-center justify-between border-b border-yellow-400/10 pb-5">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/10">
              <ShoppingBag className="h-5 w-5 text-yellow-400" />
            </div>

            <div>
              <div className="text-lg font-black tracking-tight sm:text-xl">
                SMART<span className="text-yellow-400">CART</span>
              </div>

              <div className="text-[9px] uppercase tracking-[0.25em] text-gray-500">
                Premium Experience
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-5 text-sm text-gray-300 sm:flex">
            <Link href="/" className="transition hover:text-yellow-400">
              Home
            </Link>
            <Link href="/shop" className="transition hover:text-yellow-400">
              Shop
            </Link>
            <Link
              href="/categories"
              className="transition hover:text-yellow-400"
            >
              Categories
            </Link>
            <Link href="/wishlist" className="transition hover:text-yellow-400">
              Wishlist
            </Link>

            <div className="flex items-center gap-3 border-l border-white/10 pl-5">
              <Search className="h-4 w-4" />
              <User className="h-4 w-4" />
              <ShoppingCart className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* =======================================================
            HEADER
        ======================================================= */}

        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400">
            Home
            <span className="mx-2 text-gray-600">›</span>
            <span className="text-yellow-400">Cart</span>
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Your{" "}
            <span className="text-yellow-400">
              Shopping Cart
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Review your selected products before completing
            your purchase.
          </p>
        </div>

        {/* =======================================================
            EMPTY CART
        ======================================================= */}

        {cartItems.length === 0 ? (
          <section className="rounded-[30px] border border-white/10 bg-black/30 p-10 text-center shadow-2xl backdrop-blur-xl sm:p-16">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10">
              <ShoppingBag className="h-10 w-10 text-yellow-400" />
            </div>

            <h2 className="mt-7 text-3xl font-black">
              Your Cart is Empty
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-400">
              Explore SmartCart and discover products
              selected for your lifestyle.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 font-black text-black transition hover:bg-yellow-300"
            >
              Continue Shopping
              <ArrowRight className="h-5 w-5" />
            </Link>
          </section>
        ) : (
          <>

            {/* =================================================
                MAIN CART + SUMMARY
            ================================================= */}

            <div className="grid gap-7 lg:grid-cols-3">

              {/* PRODUCTS */}

             <section className="rounded-[30px] border border-white/15 bg-black/10 p-4 shadow-2xl backdrop-blur-[3px] sm:p-6 lg:col-span-2">

                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black">
                      Cart Items
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {totalItems} selected item
                      {totalItems > 1 ? "s" : ""}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Empty Cart
                  </button>
                </div>

                <div className="space-y-3">

                  {cartItems.map((item, index) => (
                    <article
                      key={`${item.product.id}-${index}`}
                      className="
                        group
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-3
                        transition
                        hover:border-yellow-400/20
                        hover:bg-white/[0.055]
                        sm:p-4
                      "
                    >
                      <div className="grid gap-4 sm:grid-cols-[110px_1fr_auto] sm:items-center">

                        {/* IMAGE */}

                        <div className="flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-white sm:h-24 sm:w-[110px]">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={160}
                            height={160}
                            className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* DETAILS */}

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                              {item.product.category}
                            </span>

                            <span className="rounded-full bg-green-400/10 px-2 py-1 text-[10px] font-bold text-green-400">
                              In Stock
                            </span>
                          </div>

                          <h3 className="mt-2 line-clamp-2 text-base font-black sm:text-lg">
                            {item.product.name}
                          </h3>

                          <p className="mt-2 text-sm font-bold text-white">
                            Rs.{" "}
                            {Number(
                              item.product.price
                            ).toLocaleString()}
                          </p>
                        </div>

                        {/* QUANTITY + TOTAL */}

                        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">

                          <div className="flex items-center rounded-xl border border-white/10 bg-black/30 p-1">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(index)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 transition hover:bg-red-500 hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <span className="flex h-8 min-w-8 items-center justify-center text-sm font-black text-yellow-400">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(index)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-black transition hover:bg-yellow-300"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              Total
                            </p>

                            <p className="text-lg font-black text-yellow-400">
                              Rs.{" "}
                              {Number(
                                item.product.price *
                                  item.quantity
                              ).toLocaleString()}
                            </p>

                            <button
                              type="button"
                              onClick={() =>
                                removeItem(index)
                              }
                              className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-red-400 transition hover:text-red-300"
                            >
                              <Trash2 className="h-3 w-3" />
                              Remove
                            </button>
                          </div>
                        </div>

                      </div>
                    </article>
                  ))}

                </div>

                <Link
                  href="/shop"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </section>

              {/* SUMMARY */}

             <aside className="h-fit rounded-[30px] border border-white/15 bg-black/10 p-5 shadow-2xl backdrop-blur-[3px] sm:p-7 lg:sticky lg:top-8">

                <h2 className="text-2xl font-black sm:text-3xl">
                  Cart Summary
                </h2>

                <div className="mt-6 space-y-4">

                  <div className="flex justify-between text-sm text-gray-400">
                    <span>
                      Subtotal ({totalItems} items)
                    </span>

                    <span className="font-bold text-white">
                      Rs.{" "}
                      {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Shipping Charge</span>

                    <span className="font-bold text-white">
                      Rs.{" "}
                      {shipping.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Discount
                    </span>

                    <span className="font-bold text-green-400">
                      - Rs. 0
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-5">

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-lg font-bold">
                        Total Amount
                      </span>

                      <span className="text-2xl font-black text-yellow-400 sm:text-3xl">
                        Rs.{" "}
                        {total.toLocaleString()}
                      </span>
                    </div>

                  </div>

                </div>

                {/* DELIVERY MESSAGE */}

                <div className="mt-6 rounded-2xl border border-yellow-400/15 bg-yellow-400/5 p-4">
                  <div className="flex gap-3">
                    <Truck className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />

                    <div>
                      <p className="text-sm font-bold text-white">
                        Complimentary Delivery
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-400">
                        Full advance payment at checkout
                        can qualify you for delivery savings.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CHECKOUT */}

                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-6 py-4 text-base font-black text-black shadow-[0_12px_40px_rgba(234,179,8,0.15)] transition hover:bg-yellow-300 sm:text-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </Link>

                {/* COUPON */}

                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-6 py-4 font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                >
                  <Tag className="h-4 w-4" />
                  Apply Coupon
                </button>

              </aside>
            </div>

            {/* =================================================
                TRUST STRIP
            ================================================= */}

            <section className="mt-7 grid gap-3 rounded-[28px] border border-white/10 bg-black/25 p-4 shadow-2xl backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <ShieldCheck className="h-6 w-6 text-yellow-400" />

                <p className="mt-3 font-black">
                  Secure Checkout
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  100% protected
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <RotateCcw className="h-6 w-6 text-yellow-400" />

                <p className="mt-3 font-black">
                  Easy Returns
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Simple return experience
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <Truck className="h-6 w-6 text-yellow-400" />

                <p className="mt-3 font-black">
                  Fast Delivery
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Quick order processing
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <BadgeDollarSign className="h-6 w-6 text-yellow-400" />

                <p className="mt-3 font-black">
                  Best Price
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  SmartCart value guarantee
                </p>
              </div>
            </section>

            {/* FOOTNOTE */}

            <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-gray-500">
              <Heart className="h-3.5 w-3.5 text-yellow-400" />
              SmartCart premium shopping experience
            </div>
          </>
        )}
      </div>
    </main>
  );
}