"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        {/* Hero */}
        <section className="py-24 text-center bg-gradient-to-b from-black to-gray-900">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400">
            Shipping Policy
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
            We are committed to delivering your orders safely and on time.
            Please read our shipping policy below.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 space-y-10">

          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Processing Time
            </h2>

            <p className="text-gray-300 leading-8">
              Orders are usually processed within 1–2 business days after
              payment verification. During sales or holidays, processing
              may take a little longer.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Delivery Time
            </h2>

            <p className="text-gray-300 leading-8">
              Estimated delivery within Pakistan:
            </p>

            <ul className="list-disc list-inside mt-4 text-gray-300 space-y-2">
              <li>Major Cities: 2–4 business days</li>
              <li>Other Areas: 3–7 business days</li>
              <li>Remote Areas: 5–10 business days</li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Shipping Charges
            </h2>

            <p className="text-gray-300 leading-8">
              Shipping charges are calculated during checkout.
              Promotional offers with free shipping may be available from
              time to time.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Order Tracking
            </h2>

            <p className="text-gray-300 leading-8">
              Once your order is confirmed, you can track its progress
              using the Track Order page on our website.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Delivery Issues
            </h2>

            <p className="text-gray-300 leading-8">
              If your order is delayed, damaged, or lost during shipping,
              please contact our support team as soon as possible. We will
              work with the courier service to resolve the issue.
            </p>
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}