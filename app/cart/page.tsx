"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-black/40 p-8 text-center backdrop-blur-xl">
          <div className="text-4xl">Cart</div>

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
    <main className="relative min-h-screen overflow-hidden bg-black px-4 py-10 text-white sm:px-6 sm:py-16">

      {/* =========================================================
          LUXURY CART BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Gold ambient glow */}
        <div className="absolute left-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[140px]" />

        <div className="absolute right-[-10%] top-[8%] h-[600px] w-[600px] rounded-full bg-yellow-600/10 blur-[160px]" />

        {/* Premium decorative shopping-bag silhouette */}
        <div
          className="
            absolute
            right-[-120px]
            top-[120px]
            hidden
            h-[720px]
            w-[560px]
            rounded-[45px]
            border
            border-yellow-400/15
            bg-gradient-to-br
            from-yellow-100/10
            via-black/20
            to-yellow-500/5
            shadow-[0_0_120px_rgba(234,179,8,0.08)]
            lg:block
          "
        >
          <div className="absolute left-1/2 top-[-60px] h-[180px] w-[250px] -translate-x-1/2 rounded-t-full border-x-[18px] border-t-[18px] border-yellow-400/10" />

          <div className="absolute inset-x-10 top-16 h-px bg-yellow-400/10" />

          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-center">
            <p className="text-4xl font-black tracking-[0.18em] text-yellow-400/20">
              SMARTCART
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.45em] text-white/10">
              Premium Experience
            </p>
          </div>
        </div>

        {/* Decorative card */}
        <div
          className="
            absolute
            bottom-[-80px]
            right-[10%]
            hidden
            h-[240px]
            w-[410px]
            rotate-[-16deg]
            rounded-3xl
            border
            border-yellow-300/15
            bg-gradient-to-br
            from-white/10
            via-black/40
            to-yellow-500/10
            shadow-2xl
            lg:block
          "
        >
          <div className="absolute left-8 top-8 h-10 w-14 rounded-md border border-yellow-300/15 bg-yellow-300/10" />

          <p className="absolute bottom-16 left-8 text-[11px] tracking-[0.25em] text-yellow-300/20">
            SMARTCART
          </p>

          <p className="absolute bottom-8 left-8 text-xs tracking-[0.3em] text-white/10">
            PREMIUM
          </p>
        </div>

        {/* Dark readability layer */}
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/75" />
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =======================================================
            HEADER
        ======================================================= */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              SmartCart
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
              Your{" "}
              <span className="text-yellow-400">
                Shopping Cart
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-gray-300">
              {totalItems === 0
                ? "Your cart is waiting for your favorite products."
                : `${totalItems} item${
                    totalItems > 1 ? "s" : ""
                  } ready for checkout.`}
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="
                w-fit
                rounded-xl
                border
                border-red-500/30
                bg-red-500/10
                px-6
                py-3
                font-black
                text-red-400
                backdrop-blur-xl
                transition
                hover:bg-red-500
                hover:text-white
              "
            >
              Empty Cart
            </button>
          )}
        </div>

        {/* =======================================================
            EMPTY CART
        ======================================================= */}

        {cartItems.length === 0 ? (
          <section
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-10
              text-center
              shadow-2xl
              backdrop-blur-xl
              sm:p-16
            "
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10 text-2xl font-black text-yellow-400">
              CART
            </div>

            <h2 className="mt-7 text-3xl font-black">
              Your Cart is Empty
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-400">
              Explore SmartCart and add products you love
              to your shopping cart.
            </p>

            <Link
              href="/shop"
              className="
                mt-8
                inline-flex
                rounded-xl
                bg-yellow-400
                px-8
                py-4
                font-black
                text-black
                transition
                hover:bg-yellow-300
              "
            >
              Continue Shopping
            </Link>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">

            {/* ===================================================
                PRODUCTS PANEL
            =================================================== */}

            <section
              className="
                space-y-5
                rounded-3xl
                border
                border-white/10
                bg-black/15
                p-4
                shadow-2xl
                backdrop-blur-md
                sm:p-6
                lg:col-span-2
              "
            >

              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black">
                    Cart Items
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Review your products before checkout.
                  </p>
                </div>

                <div className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-400">
                  {totalItems} Items
                </div>
              </div>

              {cartItems.map((item, index) => (
                <article
                  key={`${item.product.id}-${index}`}
                  className="
                    group
                    flex
                    flex-col
                    gap-5
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                    backdrop-blur-xl
                    transition
                    hover:border-yellow-400/30
                    hover:bg-white/10
                    sm:flex-row
                    sm:items-center
                    sm:p-5
                  "
                >

                  {/* IMAGE */}

                  <div
                    className="
                      flex
                      h-44
                      w-full
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-white
                      sm:h-32
                      sm:w-32
                    "
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={220}
                      height={220}
                      className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* PRODUCT INFO */}

                  <div className="min-w-0 flex-1">

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
                      {item.product.category}
                    </p>

                    <h2 className="mt-2 line-clamp-2 text-xl font-black sm:text-2xl">
                      {item.product.name}
                    </h2>

                    <p className="mt-3 text-lg font-black text-yellow-400">
                      Rs.{" "}
                      {Number(
                        item.product.price
                      ).toLocaleString()}
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      Item Total:
                      <span className="ml-2 font-bold text-green-400">
                        Rs.{" "}
                        {Number(
                          item.product.price *
                            item.quantity
                        ).toLocaleString()}
                      </span>
                    </p>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex w-full flex-row items-center justify-between gap-4 sm:w-auto sm:flex-col">

                    <div
                      className="
                        flex
                        items-center
                        rounded-xl
                        border
                        border-white/10
                        bg-black/30
                        p-1
                        backdrop-blur-xl
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(index)
                        }
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-lg
                          text-xl
                          font-black
                          text-white
                          transition
                          hover:bg-red-600
                        "
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>

                      <span className="flex h-10 min-w-12 items-center justify-center font-black text-yellow-400">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(index)
                        }
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-lg
                          bg-yellow-400
                          text-xl
                          font-black
                          text-black
                          transition
                          hover:bg-yellow-300
                        "
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
                      className="
                        rounded-lg
                        px-4
                        py-2
                        text-sm
                        font-bold
                        text-red-400
                        transition
                        hover:bg-red-500/10
                      "
                    >
                      Remove
                    </button>

                  </div>
                </article>
              ))}

              {/* CONTINUE SHOPPING */}

              <Link
                href="/shop"
                className="
                  inline-flex
                  rounded-xl
                  border
                  border-yellow-400/30
                  bg-yellow-400/5
                  px-6
                  py-3
                  font-black
                  text-yellow-400
                  backdrop-blur-xl
                  transition
                  hover:bg-yellow-400
                  hover:text-black
                "
              >
                Continue Shopping
              </Link>
            </section>

            {/* ===================================================
                SUMMARY
            =================================================== */}

            <aside
              className="
                h-fit
                rounded-3xl
                border
                border-yellow-400/20
                bg-black/20
                p-6
                shadow-2xl
                backdrop-blur-xl
                sm:p-8
                lg:sticky
                lg:top-8
              "
            >

              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black">
                  Cart Summary
                </h2>

                <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-black text-yellow-400">
                  {totalItems}
                </span>
              </div>

              <div className="mt-7 space-y-5">

                <div className="flex justify-between gap-4 text-gray-300">
                  <span>Subtotal</span>

                  <span className="font-bold text-white">
                    Rs.{" "}
                    {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-gray-300">
                  <span>Shipping</span>

                  <span className="font-bold text-white">
                    Rs.{" "}
                    {shipping.toLocaleString()}
                  </span>
                </div>

                <div className="rounded-2xl border border-green-400/15 bg-green-400/5 p-4">
                  <p className="font-bold text-green-400">
                    Free-delivery progress
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Complimentary delivery is available
                    through qualifying prepaid orders.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-5">

                  <div className="flex justify-between gap-4 text-2xl font-black">
                    <span>Total Amount</span>

                    <span className="text-yellow-400">
                      Rs.{" "}
                      {total.toLocaleString()}
                    </span>
                  </div>

                </div>
              </div>

              {/* CHECKOUT BUTTON */}

              <Link
                href="/checkout"
                className="
                  mt-7
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-2xl
                  bg-yellow-400
                  px-6
                  py-4
                  text-lg
                  font-black
                  text-black
                  shadow-[0_12px_40px_rgba(234,179,8,0.15)]
                  transition
                  hover:bg-yellow-300
                  hover:shadow-[0_15px_50px_rgba(234,179,8,0.25)]
                "
              >
                Proceed to Checkout
              </Link>

              {/* COUPON */}

              <button
                type="button"
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-yellow-400/30
                  bg-yellow-400/5
                  px-6
                  py-4
                  font-black
                  text-yellow-400
                  transition
                  hover:bg-yellow-400
                  hover:text-black
                "
              >
                Apply Coupon
              </button>

              {/* TRUST PANEL */}

              <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-black text-yellow-400">
                  Secure Checkout
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Your cart and order information are
                  protected throughout checkout.
                </p>
              </div>

            </aside>
          </div>
        )}

        {/* =======================================================
            TRUST BADGES
        ======================================================= */}

        {cartItems.length > 0 && (
          <section
            className="
              mt-8
              grid
              gap-3
              rounded-3xl
              border
              border-white/10
              bg-black/15
              p-4
              backdrop-blur-xl
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-black text-yellow-400">
                Secure Checkout
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Protected payment process
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-black text-yellow-400">
                Easy Returns
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Simple return experience
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-black text-yellow-400">
                Fast Delivery
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Quick order processing
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-black text-yellow-400">
                Best Price
              </p>
              <p className="mt-1 text-xs text-gray-400">
                SmartCart value guarantee
              </p>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}