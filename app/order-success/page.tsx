"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-4 py-16 text-white sm:px-6">

        <div className="mx-auto max-w-3xl">

          <div className="rounded-3xl border border-yellow-400/30 bg-gray-900 p-8 text-center shadow-2xl sm:p-14">

            {/* Success icon */}

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-green-400 bg-green-400/10 text-5xl">

              ✓

            </div>

            {/* Heading */}

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">

              SmartCart Order Confirmation

            </p>

            <h1 className="mt-4 text-4xl font-black sm:text-6xl">

              Order Placed
              <span className="block text-yellow-400">
                Successfully!
              </span>

            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">

              Thank you for shopping with SmartCart.
              We have received your order and will
              review it before processing.

            </p>

            {/* Order information */}

            <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-black p-5">

                <span className="text-3xl">
                  📦
                </span>

                <h2 className="mt-3 font-black">
                  Order Received
                </h2>

                <p className="mt-2 text-sm text-gray-500">

                  Your order has been saved
                  successfully.

                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-5">

                <span className="text-3xl">
                  🔍
                </span>

                <h2 className="mt-3 font-black">
                  Verification
                </h2>

                <p className="mt-2 text-sm text-gray-500">

                  We will verify payment
                  and order details.

                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-5">

                <span className="text-3xl">
                  🚚
                </span>

                <h2 className="mt-3 font-black">
                  Delivery
                </h2>

                <p className="mt-2 text-sm text-gray-500">

                  Your order will be prepared
                  and shipped.

                </p>

              </div>

            </div>

            {/* Important message */}

            <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">

              <p className="font-bold text-yellow-400">

                📱 Keep your phone available

              </p>

              <p className="mt-2 text-sm leading-6 text-gray-400">

                Our team may contact you to confirm
                your order and delivery details.

              </p>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

              <Link
                href="/shop"
                className="rounded-xl bg-yellow-400 px-8 py-4 text-center font-black text-black transition hover:bg-yellow-300"
              >

                🛍 Continue Shopping

              </Link>

              <Link
                href="/"
                className="rounded-xl border border-yellow-400 px-8 py-4 text-center font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
              >

                🏠 Back to Home

              </Link>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}