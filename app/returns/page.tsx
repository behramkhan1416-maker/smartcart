import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ReturnsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl rounded-3xl border border-yellow-400/20 bg-gray-900 p-6 sm:p-10">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
            SmartCart
          </p>

          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            Returns & Refund Policy
          </h1>

          <p className="mt-5 text-gray-400">
            Please read this policy before placing an order.
          </p>

          <div className="mt-10 space-y-8 leading-8 text-gray-300">

            <section>
              <h2 className="text-2xl font-bold text-yellow-400">
                Return Eligibility
              </h2>

              <p className="mt-3">
                Products may be eligible for return if they are damaged,
                incorrect or materially different from the product ordered.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400">
                Return Request Time
              </h2>

              <p className="mt-3">
                Please contact SmartCart within 24 hours of receiving your
                order and provide clear photos or videos of the issue.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400">
                Non-Returnable Items
              </h2>

              <p className="mt-3">
                Products that have been used, damaged after delivery or
                returned without their original packaging may not be eligible
                for a return.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400">
                Refunds
              </h2>

              <p className="mt-3">
                If a return is approved, SmartCart will review the order and
                arrange an appropriate refund, replacement or store solution.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400">
                Delivery Charges
              </h2>

              <p className="mt-3">
                Delivery charges may not be refundable unless the wrong or
                damaged product was sent by SmartCart.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400">
                Contact Us
              </h2>

              <p className="mt-3">
                Contact SmartCart with your order number, customer name and
                photos or videos of the issue.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}