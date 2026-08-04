import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl rounded-3xl border border-yellow-400/20 bg-gray-900 p-6 sm:p-10">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
            SmartCart
          </p>

          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 text-gray-400">
            Last updated: August 2026
          </p>

          <div className="mt-10 space-y-8 leading-8 text-gray-300">

            <section>
              <h2 className="text-2xl font-bold text-yellow-400">
                Information We Collect
              </h2>

              <p className="mt-3">
                When you place an order, SmartCart may collect your name,
                email address, phone number, delivery address, city and
                payment information required to process your order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400">
                How We Use Your Information
              </h2>

              <p className="mt-3">
                Your information is used to process orders, arrange delivery,
                communicate about your purchase and improve our customer
                service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400">
                Information Security
              </h2>

              <p className="mt-3">
                We take reasonable steps to protect customer information.
                Your personal information is not sold to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400">
                Payment Information
              </h2>

              <p className="mt-3">
                Payment details and payment screenshots are used only for
                order verification and payment confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400">
                Contact Us
              </h2>

              <p className="mt-3">
                If you have questions about this Privacy Policy, please
                contact SmartCart through our Contact page.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}