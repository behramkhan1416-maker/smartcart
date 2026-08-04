"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PaymentMethodsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        {/* Hero */}
        <section className="py-24 text-center bg-gradient-to-b from-black to-gray-900">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400">
            Payment Methods
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            SmartCart currently accepts secure advance payments through
            trusted Pakistani payment services.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20">

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                💳 Easypaisa
              </h2>

              <p className="text-gray-300 leading-8">
                Send your payment using Easypaisa and upload the payment
                screenshot during checkout for verification.
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                💵 JazzCash
              </h2>

              <p className="text-gray-300 leading-8">
                Transfer your payment through JazzCash and provide the
                Transaction ID at checkout.
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                💙 SadaPay
              </h2>

              <p className="text-gray-300 leading-8">
                Securely transfer payment using your SadaPay account.
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                🏦 Bank Transfer
              </h2>

              <p className="text-gray-300 leading-8">
                Bank transfers are also accepted. After transferring,
                upload the payment screenshot and transaction reference.
              </p>
            </div>

          </div>

          <div className="bg-gray-900 rounded-2xl p-10 mt-12">

            <h2 className="text-3xl font-bold text-yellow-400 mb-6">
              Payment Instructions
            </h2>

            <ol className="list-decimal list-inside space-y-4 text-gray-300 leading-8">
              <li>Select your preferred payment method.</li>
              <li>Transfer the payment.</li>
              <li>Save your transaction receipt.</li>
              <li>Upload the payment screenshot during checkout.</li>
              <li>Enter your Transaction ID.</li>
              <li>Your payment will be verified by our team.</li>
              <li>Once verified, your order will be processed.</li>
            </ol>

          </div>

          <div className="bg-yellow-500 text-black rounded-2xl p-8 mt-12">

            <h2 className="text-3xl font-bold mb-4">
              Secure Payments
            </h2>

            <p className="text-lg">
              SmartCart verifies every payment before processing orders,
              ensuring a safe and secure shopping experience for all
              customers.
            </p>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}