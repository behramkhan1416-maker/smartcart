"use client";

import Image from "next/image";
import { notFound } from "next/navigation";

import {
  use,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CartContext } from "../../context/CartContext";
import { Product } from "../../data/products";

import { db } from "../../lib/firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductPage({
  params,
}: PageProps) {
  const { id } = use(params);

  const cartContext =
    useContext(CartContext);

  if (!cartContext) {
    throw new Error(
      "CartContext is not available. Make sure CartProvider is wrapping the app."
    );
  }

  const cart = cartContext;

  const [
    product,
    setProduct,
  ] = useState<Product | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    addingToCart,
    setAddingToCart,
  ] = useState(false);

  // Selected product image
  const [
    selectedImage,
    setSelectedImage,
  ] = useState("");

  // Selected product variations
  const [
    selectedColor,
    setSelectedColor,
  ] = useState("");

  const [
    selectedSize,
    setSelectedSize,
  ] = useState("");

  const [
    selectedStyle,
    setSelectedStyle,
  ] = useState("");

  // Load product from Firebase
  useEffect(() => {
    async function loadProduct() {
      try {
        const productReference =
          doc(
            db,
            "products",
            id
          );

        const productSnapshot =
          await getDoc(
            productReference
          );

        if (
          !productSnapshot.exists()
        ) {
          setProduct(null);
          return;
        }

        const loadedProduct = {
          id:
            productSnapshot.id,

          ...(
            productSnapshot.data() as Omit<
              Product,
              "id"
            >
          ),
        } as Product;

        setProduct(
          loadedProduct
        );

        setSelectedImage(
          loadedProduct.image ||
            ""
        );
      } catch (error) {
        console.error(
          "Error loading product:",
          error
        );

        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  // Main image + gallery images
  const allImages = useMemo(() => {
    if (!product) {
      return [];
    }

    const mainImage =
      typeof product.image ===
      "string"
        ? product.image.trim()
        : "";

    const galleryImages =
      Array.isArray(
        product.images
      )
        ? product.images
        : [];

    const validGalleryImages =
      galleryImages.filter(
        (
          image
        ): image is string =>
          typeof image ===
            "string" &&
          image
            .trim()
            .length > 0 &&
          image.trim() !==
            mainImage
      );

    return [
      mainImage,
      ...validGalleryImages,
    ].filter(
      (
        image
      ): image is string =>
        image.length > 0
    );
  }, [product]);

  // Loading screen
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />

          <h1 className="mt-5 text-2xl font-black">
            Loading Product...
          </h1>

        </div>

      </main>
    );
  }

  // Product does not exist
  if (!product) {
    notFound();

    return null;
  }

  const currentProduct =
    product;

  /*
    STOCK

    If stock is missing in Firebase,
    this code treats the product
    as available.

    Set stock to 0 in Firebase
    to show Out of Stock.
  */
  const productStock =
    typeof currentProduct.stock ===
    "number"
      ? Math.max(
          0,
          currentProduct.stock
        )
      : null;

  const isOutOfStock =
    productStock !== null &&
    productStock <= 0;

  const isLowStock =
    productStock !== null &&
    productStock > 0 &&
    productStock <= 5;

  // Product variations
  const colors =
    Array.isArray(
      currentProduct.colors
    )
      ? currentProduct.colors
      : [];

  const sizes =
    Array.isArray(
      currentProduct.sizes
    )
      ? currentProduct.sizes
      : [];

  const styles =
    Array.isArray(
      currentProduct.styles
    )
      ? currentProduct.styles
      : [];

  // Add product to cart
  async function addToCart() {
    if (isOutOfStock) {
      alert(
        "Sorry, this product is currently out of stock."
      );

      return;
    }

    // Check color
    if (
      colors.length > 0 &&
      !selectedColor
    ) {
      alert(
        "Please select a color."
      );

      return;
    }

    // Check size
    if (
      sizes.length > 0 &&
      !selectedSize
    ) {
      alert(
        "Please select a size."
      );

      return;
    }

    // Check style
    if (
      styles.length > 0 &&
      !selectedStyle
    ) {
      alert(
        "Please select a style."
      );

      return;
    }

    /*
      Check how many of this
      product are already
      inside the cart.
    */
    const quantityAlreadyInCart =
      cart.cartItems
        .filter(
          (item) =>
            item.product.id ===
            currentProduct.id
        )
        .reduce(
          (
            total,
            item
          ) =>
            total +
            item.quantity,
          0
        );

    if (
      productStock !== null &&
      quantityAlreadyInCart >=
        productStock
    ) {
      alert(
        `Only ${productStock} item${
          productStock === 1
            ? ""
            : "s"
        } available.`
      );

      return;
    }

    // Product with selected variations
    const productWithSelection = {
      ...currentProduct,

      selectedColor,

      selectedSize,

      selectedStyle,
    };

    try {
      setAddingToCart(true);

      /*
        CartContext will:

        1. Add product to cart
        2. Save cart in localStorage
        3. Save Add-to-Cart data
           in Firebase cartEvents
      */
      await cart.addToCart(
        productWithSelection
      );

      alert(
        `${currentProduct.name} added to cart!`
      );
    } catch (error) {
      console.error(
        "Add to cart error:",
        error
      );

      alert(
        "Product was not added. Please try again."
      );
    } finally {
      setAddingToCart(false);
    }
  }

  return (
    <main className="min-h-screen bg-black py-10 text-white sm:py-16">

      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">

        {/* PRODUCT IMAGE */}

        <div>

          {/* MAIN IMAGE */}

          <div className="flex min-h-95 items-center justify-center overflow-hidden rounded-2xl border border-gray-700 bg-white p-5 sm:min-h-130 sm:p-10">

            <Image
              src={
                selectedImage ||
                currentProduct.image
              }

              alt={
                currentProduct.name
              }

              width={650}

              height={650}

              priority

            

              onError={(
                event
              ) => {
                event.currentTarget.src =
                  currentProduct.image;
              }}

              className="max-h-115 w-full object-contain"
            />

          </div>

          {/* IMAGE THUMBNAILS */}

          {allImages.length > 1 && (

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

              {allImages.map(
                (
                  image,
                  index
                ) => (

                  <button
                    key={`${image}-${index}`}

                    type="button"

                    onClick={() =>
                      setSelectedImage(
                        image
                      )
                    }

                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white p-1 transition sm:h-24 sm:w-24 ${
                      selectedImage ===
                      image
                        ? "border-black"
                        : "border-gray-400 hover:border-black"
                    }`}
                  >

                    <Image
                      src={image}

                      alt={`${currentProduct.name} image ${
                        index + 1
                      }`}

                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"

                      

                      onError={(
                        event
                      ) => {
                        event.currentTarget.src =
                          currentProduct.image;
                      }}

                      className="object-contain p-2"
                    />

                  </button>

                )
              )}

            </div>

          )}

        </div>

        {/* PRODUCT DETAILS */}

        <div className="lg:pt-4">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            SmartCart Collection
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-5xl">
            {
              currentProduct.name
            }
          </h1>

          <div className="mt-5 text-xl">
            ⭐⭐⭐⭐⭐
          </div>

          <p className="mt-5 text-3xl font-black text-yellow-400">

            Rs.{" "}

            {
              currentProduct.price
            }

          </p>

          {/* STOCK STATUS */}

          <div className="mt-5">

            {isOutOfStock ? (

              <div className="inline-flex items-center rounded-full border border-red-500/40 bg-red-500/10 px-5 py-3 font-black text-red-400">

                ❌ Out of Stock

              </div>

            ) : productStock ===
              null ? (

              <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-5 py-3 font-bold text-green-400">

                ✅ Available

              </div>

            ) : isLowStock ? (

              <div className="inline-flex items-center rounded-full border border-orange-500/40 bg-orange-500/10 px-5 py-3 font-black text-orange-400">

                🔥 Only {
                  productStock
                } left — Order soon!

              </div>

            ) : (

              <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-5 py-3 font-bold text-green-400">

                ✅ In Stock — {
                  productStock
                } available

              </div>

            )}

          </div>

          <p className="mt-4 text-gray-400">

            Category:{" "}

            <span className="font-semibold text-white">

              {
                currentProduct.category
              }

            </span>

          </p>

          <p className="mt-6 leading-8 text-gray-400">

            Premium quality product
            from SmartCart.
            Carefully selected for
            excellent quality,
            value and customer
            satisfaction.

          </p>

          {/* COLOR */}

          {colors.length > 0 && (

            <div className="mt-8">

              <h2 className="mb-3 text-lg font-bold">
                Choose Color
              </h2>

              <div className="flex flex-wrap gap-3">

                {colors.map(
                  (
                    color
                  ) => (

                    <button
                      key={color}

                      type="button"

                      disabled={
                        isOutOfStock
                      }

                      onClick={() =>
                        setSelectedColor(
                          color
                        )
                      }

                      className={`rounded-xl border px-5 py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                        selectedColor ===
                        color
                          ? "border-yellow-400 bg-yellow-400 text-black"
                          : "border-gray-600 bg-gray-900 text-white hover:border-yellow-400"
                      }`}
                    >

                      {color}

                    </button>

                  )
                )}

              </div>

            </div>

          )}

          {/* SIZE */}

          {sizes.length > 0 && (

            <div className="mt-7">

              <h2 className="mb-3 text-lg font-bold">
                Choose Size
              </h2>

              <div className="flex flex-wrap gap-3">

                {sizes.map(
                  (
                    size
                  ) => (

                    <button
                      key={size}

                      type="button"

                      disabled={
                        isOutOfStock
                      }

                      onClick={() =>
                        setSelectedSize(
                          size
                        )
                      }

                      className={`min-w-16 rounded-xl border px-5 py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                        selectedSize ===
                        size
                          ? "border-yellow-400 bg-yellow-400 text-black"
                          : "border-gray-600 bg-gray-900 text-white hover:border-yellow-400"
                      }`}
                    >

                      {size}

                    </button>

                  )
                )}

              </div>

            </div>

          )}

          {/* STYLE */}

          {styles.length > 0 && (

            <div className="mt-7">

              <h2 className="mb-3 text-lg font-bold">
                Choose Style
              </h2>

              <div className="flex flex-wrap gap-3">

                {styles.map(
                  (
                    style
                  ) => (

                    <button
                      key={style}

                      type="button"

                      disabled={
                        isOutOfStock
                      }

                      onClick={() =>
                        setSelectedStyle(
                          style
                        )
                      }

                      className={`rounded-xl border px-5 py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                        selectedStyle ===
                        style
                          ? "border-yellow-400 bg-yellow-400 text-black"
                          : "border-gray-600 bg-gray-900 text-white hover:border-yellow-400"
                      }`}
                    >

                      {style}

                    </button>

                  )
                )}

              </div>

            </div>

          )}

          {/* ADD TO CART */}

          <button
            type="button"

            onClick={
              addToCart
            }

            disabled={
              isOutOfStock ||
              addingToCart
            }

            className={`mt-10 flex min-h-14 w-full items-center justify-center rounded-xl px-8 py-4 text-base font-black transition sm:w-auto ${
              isOutOfStock
                ? "cursor-not-allowed bg-red-700 text-white opacity-70"
                : addingToCart
                ? "cursor-wait bg-yellow-300 text-black"
                : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >

            {isOutOfStock
              ? "❌ Out of Stock"
              : addingToCart
              ? "Adding to Cart..."
              : "🛒 Add to Cart"}

          </button>

        </div>

      </div>

    </main>
  );
}