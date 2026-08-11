"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingCart,
  User,
  Home,
  Store,
  Grid2X2,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";

import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";
import { WishlistContext } from "../context/WishlistContext";
import { useFlyToCart } from "../context/FlyToCartContext";

const categories = [
  { name: "Jewelry", icon: "💎" },
  { name: "Watches", icon: "⌚" },
  { name: "Bags", icon: "👜" },
  { name: "Shoes", icon: "👠" },
  { name: "Fashion", icon: "👗" },
  { name: "Beauty", icon: "✨" },
  { name: "Accessories", icon: "🎀" },
  { name: "Home & Living", icon: "🏠" },
];

export default function Navbar() {
  const cart = useContext(CartContext)!;
  const search = useContext(SearchContext)!;
  const wishlist = useContext(WishlistContext)!;

  const { cartRef } = useFlyToCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const totalItems = cart.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistItems = wishlist.wishlist.length;

  useEffect(() => {
    const savedTheme = localStorage.getItem("smartcart-theme");

    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      setCartBounce(true);

      const timer = setTimeout(() => {
        setCartBounce(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const toggleTheme = () => {
    setDarkMode((previous) => {
      const newTheme = !previous;

      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("smartcart-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("smartcart-theme", "light");
      }

      return newTheme;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setCategoriesOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-white/10 bg-black text-white shadow-lg"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3 sm:h-20">

            {/* Logo */}
            <Link href="/" onClick={closeMenu}>
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer text-2xl font-extrabold text-white sm:text-3xl"
              >
                SmartCart
              </motion.h1>
            </Link>

            {/* Desktop Search */}
            <div className="hidden w-full max-w-md items-center overflow-hidden rounded-xl border border-white/15 bg-white/5 md:flex">
              <input
                type="text"
                placeholder="Search products..."
                value={search.search}
                onChange={(e) => search.setSearch(e.target.value)}
                className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                aria-label="Search"
                className="bg-white px-4 py-3 text-black transition hover:bg-gray-200"
              >
                <Search size={19} />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-5 text-sm font-medium lg:flex">
              <Link
                href="/"
                className="transition hover:text-gray-300"
              >
                Home
              </Link>

              <Link
                href="/shop"
                className="transition hover:text-gray-300"
              >
                Shop
              </Link>

              <button
                type="button"
                onClick={() => {
                  setCategoriesOpen(true);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1 transition hover:text-gray-300"
              >
                Categories
                <ChevronRight size={16} />
              </button>

              <Link
                href="/wishlist"
                className="transition hover:text-gray-300"
              >
                Wishlist
              </Link>

              <Link
                href="/cart"
                className="transition hover:text-gray-300"
              >
                Cart
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3 sm:gap-5">

              {/* Theme Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Change theme"
                className="rounded-lg border border-white/20 p-2 text-white transition hover:bg-white hover:text-black"
              >
                {darkMode ? (
                  <Sun size={19} />
                ) : (
                  <Moon size={19} />
                )}
              </button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  className="relative cursor-pointer"
                >
                  <Heart
                    size={22}
                    className="text-white"
                  />

                  {wishlistItems > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                      {wishlistItems}
                    </span>
                  )}
                </motion.div>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <motion.div
                  ref={cartRef}
                  animate={
                    cartBounce
                      ? {
                          scale: [1, 1.3, 1],
                          rotate: [0, -10, 10, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.12 }}
                  className="relative cursor-pointer"
                >
                  <ShoppingCart
                    size={23}
                    className="text-white"
                  />

                  {totalItems > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </motion.div>
              </Link>

              {/* Profile */}
              <Link href="/login" className="hidden sm:block">
                <motion.div whileHover={{ scale: 1.12 }}>
                  <User
                    size={22}
                    className="text-white"
                  />
                </motion.div>
              </Link>

              {/* Mobile Menu */}
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  setCategoriesOpen(false);
                }}
                className="rounded-lg border border-white/25 p-2 text-white lg:hidden"
              >
                {menuOpen ? (
                  <X size={22} />
                ) : (
                  <Menu size={22} />
                )}
              </button>

            </div>
          </div>

          {/* Mobile Search */}
          <div className="pb-3 md:hidden">
            <div className="flex overflow-hidden rounded-xl border border-white/15 bg-white/5">
              <input
                type="text"
                placeholder="Search products..."
                value={search.search}
                onChange={(e) => search.setSearch(e.target.value)}
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                aria-label="Search"
                className="bg-white px-4 text-black"
              >
                <Search size={19} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/10 bg-black lg:hidden"
            >
              <div className="mx-auto grid max-w-7xl gap-2 px-4 py-4">

                <Link
                  href="/"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-white transition hover:bg-white/10"
                >
                  <Home size={19} />
                  Home
                </Link>

                <Link
                  href="/shop"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-white transition hover:bg-white/10"
                >
                  <Store size={19} />
                  Shop
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setCategoriesOpen(true);
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-white transition hover:bg-white/10"
                >
                  <span className="flex items-center gap-3">
                    <Grid2X2 size={19} />
                    Categories
                  </span>

                  <ChevronRight size={19} />
                </button>

                <Link
                  href="/wishlist"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-white transition hover:bg-white/10"
                >
                  <Heart size={19} />
                  Wishlist
                </Link>

                <Link
                  href="/cart"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-white transition hover:bg-white/10"
                >
                  <ShoppingCart size={19} />
                  Cart
                </Link>

                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-white transition hover:bg-white/10"
                >
                  <User size={19} />
                  My Account
                </Link>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

            {/* Full-Screen Categories Menu */}
      <AnimatePresence>
        {categoriesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 overflow-y-auto bg-[#f7f7f7] text-[#202020]"
          >
            <div className="mx-auto min-h-screen w-full max-w-5xl px-5 py-8 sm:px-10 sm:py-12">

              {/* Top area */}
              <div className="flex items-center justify-between">

                <Link
                  href="/"
                  onClick={() => setCategoriesOpen(false)}
                  className="text-3xl font-light tracking-[0.18em] text-[#202020] sm:text-5xl"
                >
                  SMARTCART
                </Link>

                <button
                  type="button"
                  onClick={() => setCategoriesOpen(false)}
                  aria-label="Close categories"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 text-[#202020] transition hover:bg-black hover:text-white"
                >
                  <X size={28} />
                </button>

              </div>

             {/* Category tabs */}
<div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-b border-black/20 pb-6 text-sm font-semibold tracking-[0.08em] sm:text-lg">

  <Link
    href="/categories/women"
    onClick={() => setCategoriesOpen(false)}
    className="text-[#202020] transition hover:text-red-700"
  >
    WOMEN
  </Link>

  <span className="hidden h-6 w-px bg-black/15 sm:block" />

  <Link
    href="/categories/men"
    onClick={() => setCategoriesOpen(false)}
    className="text-[#202020] transition hover:text-red-700"
  >
    MEN
  </Link>

  <span className="hidden h-6 w-px bg-black/15 sm:block" />

  <Link
    href="/categories/kids"
    onClick={() => setCategoriesOpen(false)}
    className="text-[#202020] transition hover:text-red-700"
  >
    KIDS
  </Link>

  <span className="hidden h-6 w-px bg-black/15 sm:block" />

  <Link
    href="/categories/luxury"
    onClick={() => setCategoriesOpen(false)}
    className="text-[#202020] transition hover:text-red-700"
  >
    LUXURY
  </Link>

  <span className="hidden h-6 w-px bg-black/15 sm:block" />

  <Link
    href="/categories/special-offers"
    onClick={() => setCategoriesOpen(false)}
    className="font-bold text-red-700"
  >
    SPECIAL OFFERS
  </Link>

</div>

{/* Main category list */}
<div className="mt-10">

  <h2 className="mb-7 text-xl font-bold text-red-700 sm:text-2xl">
    SHOP BY CATEGORY
  </h2>

  <div className="grid gap-3 sm:grid-cols-2">

    {categories.map((category) => (
      <Link
        key={category.name}
        href={`/shop?category=${encodeURIComponent(category.name)}`}
        onClick={() => setCategoriesOpen(false)}
        className="flex items-center justify-between border-b border-black/10 px-2 py-5 text-lg text-[#202020] transition hover:bg-black/5 hover:text-red-700"
      >
        <span className="flex items-center gap-4">
          <span className="text-2xl">
            {category.icon}
          </span>

          {category.name}
        </span>

        <ChevronRight size={21} />
      </Link>
    ))}

  </div>

</div>

{/* Special offer box */}
<div className="mt-12 rounded-2xl bg-white p-7 shadow-sm sm:p-10">

  <h3 className="text-3xl font-bold text-red-700 sm:text-4xl">
    UP TO 50% OFF
  </h3>

  <p className="mt-3 text-lg text-[#202020]">
    Discover premium products and exclusive SmartCart offers.
  </p>

  <Link
    href="/categories/special-offers"
    onClick={() => setCategoriesOpen(false)}
    className="mt-6 inline-block border-b-2 border-[#202020] pb-1 text-lg font-semibold text-[#202020] transition hover:text-red-700"
  >
    View Special Offers
  </Link>

</div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}