"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function SpecialOffersPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-yellow-400/20 bg-gray-900 p-8 text-center sm:p-14">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              SmartCart Deals
            </p>

            <h1 className="mt-4 text-4xl font-black sm:text-6xl">
              Special Offers
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-gray-400">
              Discover exciting discounts and special deals on selected
              SmartCart products.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex rounded-xl bg-yellow-400 px-8 py-4 font-black text-black transition hover:bg-yellow-300"
            >
              Shop Special Deals
            </Link>

          </div>

        </div>
      </main>
    </>
  );
}