"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        {/* Hero */}
        <section className="py-24 text-center bg-gradient-to-b from-black to-gray-900">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400">
            About SmartCart
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-300">
            SmartCart is your trusted online shopping destination,
            bringing premium quality products at affordable prices.
            We believe shopping should be simple, secure, and enjoyable.
          </p>
        </section>

        {/* Our Story */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <h2 className="text-4xl font-bold text-yellow-400 mb-6">
                Our Story
              </h2>

              <p className="text-gray-300 leading-8">
                SmartCart was created with one goal: to provide customers
                with high-quality fashion, jewelry, accessories, electronics,
                and lifestyle products through a professional and trustworthy
                online shopping experience.
              </p>

              <p className="text-gray-300 leading-8 mt-6">
                Every product is carefully selected to ensure excellent
                quality, modern design, and great value for money.
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-10">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">
                Why Customers Choose Us
              </h3>

              <ul className="space-y-4 text-gray-300">
                <li>✅ Premium Quality Products</li>
                <li>✅ Secure Payments</li>
                <li>✅ Fast Customer Support</li>
                <li>✅ Easy Order Tracking</li>
                <li>✅ Trusted Shopping Experience</li>
                <li>✅ Affordable Prices</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Mission */}
        <section className="bg-gray-900 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">

            <h2 className="text-4xl font-bold text-yellow-400 mb-8">
              Our Mission
            </h2>

            <p className="text-gray-300 text-lg leading-8 max-w-4xl mx-auto">
              Our mission is to become one of Pakistan's most trusted
              online shopping destinations by delivering premium products,
              excellent customer service, secure online payments, and
              a seamless shopping experience.
            </p>

          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-6 py-20">

          <h2 className="text-4xl text-center font-bold text-yellow-400 mb-14">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Quality
              </h3>

              <p className="text-gray-300">
                We only offer products that meet our quality standards.
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Trust
              </h3>

              <p className="text-gray-300">
                Transparency and customer satisfaction are our highest priorities.
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Innovation
              </h3>

              <p className="text-gray-300">
                We continuously improve our website and services to provide
                the best shopping experience.
              </p>
            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}