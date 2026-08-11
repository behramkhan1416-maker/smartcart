"use client";

import Image from "next/image";

const posts = [
  "/social/png.1.avif",
  "/social/png.2.png",
  "/social/png.3.png",
  "/social/png.4.png",
  "/social/png.5.png",
  "/social/png.6.png",
  "/social/png.7.png",
  "/social/png.8.png",
  "/social/png.9.webp",
  "/social/png.10.webp",
  "/social/png.11.jpg",
  "/social/png.12.webp",
];

export default function InstagramGallery() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-yellow-400">
            Follow Us On Instagram
          </h2>

          <p className="text-gray-400 mt-4">
            @smartcart5313
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {posts.map((post, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Image
                src={post}
                alt={`Instagram ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center">

                <div className="text-white text-4xl">
                  ❤️
                </div>

                <p className="mt-2 font-bold text-white">
                  SmartCart
                </p>

              </div>
            </div>
          ))}

        </div>

        <div className="text-center mt-12">

          <a
            href="https://www.instagram.com/smartcart5313/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl"
          >
            Follow @smartcart5313
          </a>

        </div>

      </div>
    </section>
  );
}