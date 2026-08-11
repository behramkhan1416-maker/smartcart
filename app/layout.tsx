import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import SearchProvider from "./context/SearchContext";
import ProductProvider from "./context/ProductContext";
import FlyToCartProvider from "./context/FlyToCartContext";

import BackgroundScene from "./components/background/BackgroundScene";
import ShoppingIconsBackground from "./components/background/ShoppingIconsBackground";
import LuxurySpotlight from "./components/LuxurySpotlight";

import MouseGlow from "./components/MouseGlow";
import SmoothScroll from "./components/SmoothScroll";
import LoadingScreen from "./components/LoadingScreen";
import FlyingImage from "./components/FlyingImage";

import VisitorTracker from "./components/VisitorTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartCart",
  description: "Luxury Online Shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="overflow-x-hidden bg-black text-white">

        <VisitorTracker />

        {/* DESKTOP ONLY - ALL ANIMATED BACKGROUNDS */}
        <div className="hidden md:block">
          <BackgroundScene />
          <ShoppingIconsBackground />
          <LuxurySpotlight />
          <MouseGlow />
        </div>

        {/* DESKTOP ONLY - SMOOTH SCROLL */}
        <div className="hidden md:block">
          <SmoothScroll />
        </div>

        {/* Loading screen */}
        <LoadingScreen />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#111827",
              color: "#FFD700",
              border: "1px solid #FFD700",
              borderRadius: "12px",
            },
          }}
        />

        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <ProductProvider>
                <FlyToCartProvider>

                <FlyingImage />

                {children}

              </FlyToCartProvider>
              </ProductProvider>
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>

      </body>
    </html>
  );
}

