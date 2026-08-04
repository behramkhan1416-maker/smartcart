"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        <section className="py-24 text-center bg-gradient-to-b from-black to-gray-900">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400">
            Terms & Conditions
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
            By using SmartCart, you agree to the following terms and
            conditions. Please read them carefully before placing an order.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 space-y-8">

          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Orders
            </h2>

            <p className="text-gray-300 leading-8">
              All orders are subject to availability and confirmation.
              SmartCart reserves the right to cancel or refuse any order
              if necessary.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Pricing
            </h2>

            <p className="text-gray-300 leading-8">
              Product prices may change without prior notice.
              We try our best to keep all prices accurate.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Payments
            </h2>

            <p className="text-gray-300 leading-8">
              Orders are processed after payment verification.
              Customers must provide accurate payment details and proof
              where required.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Returns & Refunds
            </h2>

            <p className="text-gray-300 leading-8">
              Please refer to our Return & Refund Policy for complete
              information regarding returns and eligible refunds.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Privacy
            </h2>

            <p className="text-gray-300 leading-8">
              Customer information is handled securely and used only for
              order processing and customer support.
            </p>
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}