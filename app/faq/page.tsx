"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse products, add them to your cart, proceed to checkout, complete the payment, and place your order.",
    },
    {
      question: "Which payment methods do you accept?",
      answer:
        "We accept Easypaisa, JazzCash, SadaPay, and Bank Transfer for advance payments.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Use the Track Order page and enter your Order ID to view the latest order status.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Orders are usually delivered within 2–7 business days depending on your location.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes. Please read our Return & Refund Policy for complete eligibility and conditions.",
    },
    {
      question: "How do I contact SmartCart?",
      answer:
        "You can use our Contact Us page, email us, or reach us through WhatsApp support.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-black text-white min-h-screen">

        <section className="py-24 text-center bg-gradient-to-b from-black to-gray-900">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400">
            Frequently Asked Questions
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
            Find answers to the questions customers ask most often.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-20">

          <div className="space-y-6">

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  {faq.question}
                </h2>

                <p className="text-gray-300 leading-8">
                  {faq.answer}
                </p>
              </div>
            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}