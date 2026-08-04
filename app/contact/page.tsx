"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        {/* Hero */}
        <section className="py-24 text-center bg-gradient-to-b from-black to-gray-900">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400">
            Contact Us
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have a question,
            need support, or want to know more about SmartCart,
            our team is here to help.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}

            <div className="bg-gray-900 rounded-2xl p-8">

              <h2 className="text-3xl font-bold text-yellow-400 mb-8">
                Send us a Message
              </h2>

              <div className="space-y-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 rounded-lg bg-black border border-gray-700"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 rounded-lg bg-black border border-gray-700"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-4 rounded-lg bg-black border border-gray-700"
                />

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full p-4 rounded-lg bg-black border border-gray-700"
                />

                <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition">
                  Send Message
                </button>

              </div>

            </div>

            {/* Contact Information */}

            <div className="space-y-8">

              <div className="bg-gray-900 rounded-2xl p-8">

                <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-5 text-gray-300">

                  <p>
                    📧 Email:
                    <br />
                    <strong>support@smartcart.pk</strong>
                  </p>

                  <p>
                    📞 Phone:
                    <br />
                    <strong>+92 300 1234567</strong>
                  </p>

                  <p>
                    📍 Address:
                    <br />
                    <strong>Pakistan</strong>
                  </p>

                  <p>
                    🕒 Business Hours:
                    <br />
                    Monday - Saturday
                    <br />
                    9:00 AM - 8:00 PM
                  </p>

                </div>

              </div>

              <div className="bg-gray-900 rounded-2xl p-8">

                <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                  WhatsApp Support
                </h2>

                <p className="text-gray-300 mb-6">
                  Chat with us directly for quick assistance.
                </p>

                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-500 px-8 py-4 rounded-xl font-bold"
                >
                  💬 Chat on WhatsApp
                </a>

              </div>

              <div className="bg-gray-900 rounded-2xl p-8">

                <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                  Our Location
                </h2>

                <div className="h-64 rounded-xl bg-black border border-gray-700 flex items-center justify-center text-gray-400">
                  Google Maps will be added here.
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}