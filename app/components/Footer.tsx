"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 text-white">

      {/* Footer sections */}
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-2 px-3 py-8 sm:gap-6 sm:px-6 sm:py-12 lg:gap-10 lg:py-16">

        {/* Brand */}
        <div>
          <h2 className="text-sm font-black text-yellow-400 sm:text-2xl lg:text-3xl">
            SmartCart
          </h2>

          <p className="mt-2 hidden text-sm leading-6 text-gray-400 sm:block lg:leading-7">
            Your trusted online shopping destination for premium fashion,
            jewelry, accessories and lifestyle products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[9px] font-black text-yellow-400 sm:text-lg lg:text-xl">
            Quick Links
          </h3>

          <ul className="mt-2 space-y-1 text-[7px] text-gray-400 sm:mt-4 sm:space-y-2 sm:text-sm lg:space-y-3">

            <li>
              <Link
                href="/"
                className="transition hover:text-yellow-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/shop"
                className="transition hover:text-yellow-400"
              >
                Shop
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="transition hover:text-yellow-400"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition hover:text-yellow-400"
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                href="/track-order"
                className="transition hover:text-yellow-400"
              >
                Track
              </Link>
            </li>

          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-[9px] font-black text-yellow-400 sm:text-lg lg:text-xl">
            Policies
          </h3>

          <ul className="mt-2 space-y-1 text-[7px] text-gray-400 sm:mt-4 sm:space-y-2 sm:text-sm lg:space-y-3">

            <li>
              <Link
                href="/privacy"
                className="transition hover:text-yellow-400"
              >
                Privacy
              </Link>
            </li>

            <li>
              <Link
                href="/returns"
                className="transition hover:text-yellow-400"
              >
                Returns
              </Link>
            </li>

            <li>
              <Link
                href="/shipping-policy"
                className="transition hover:text-yellow-400"
              >
                Shipping
              </Link>
            </li>

            <li>
              <Link
                href="/terms"
                className="transition hover:text-yellow-400"
              >
                Terms
              </Link>
            </li>

            <li>
              <Link
                href="/faq"
                className="transition hover:text-yellow-400"
              >
                FAQ
              </Link>
            </li>

          </ul>
        </div>

        {/* Payments */}
        <div>
          <h3 className="text-[9px] font-black text-yellow-400 sm:text-lg lg:text-xl">
            Payments
          </h3>

          <ul className="mt-2 space-y-1 text-[7px] text-gray-400 sm:mt-4 sm:space-y-2 sm:text-sm lg:space-y-3">
            <li>Easypaisa</li>
            <li>JazzCash</li>
            <li>SadaPay</li>
            <li>Bank</li>
          </ul>

          <div className="mt-3 sm:mt-6 lg:mt-8">
            <Link
              href="/payment-methods"
              className="inline-flex rounded-md bg-yellow-500 px-1.5 py-1 text-[7px] font-black text-black transition hover:bg-yellow-400 sm:rounded-lg sm:px-4 sm:py-2 sm:text-xs lg:rounded-xl lg:px-6 lg:py-3 lg:text-sm"
            >
              Payment Guide
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-4 sm:px-6 sm:py-6">

          <p className="text-[8px] text-gray-500 sm:text-sm">
            © 2026 SmartCart. All Rights Reserved.
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="rounded-md bg-yellow-500 px-2 py-1 text-[8px] font-black text-black transition hover:bg-yellow-400 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm"
          >
            ↑ Top
          </button>

        </div>

      </div>

    </footer>
  );
}