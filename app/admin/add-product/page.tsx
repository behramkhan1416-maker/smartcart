"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

import { db } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";

const categoryOptions = {
  Women: [
    "Jewelry",
    "Bags",
    "Watches",
    "Shoes",
    "Fashion",
    "Beauty",
    "Accessories",
    "Women's Clothing",
    "Women's Sandals",
    "Women's Perfumes",
  ],

  Men: [
    "Perfumes",
    "Men's Shoes",
    "Men's Watches",
    "Men's Sandals",
    "Men's Shirts",
    "Polo Shirts",
    "T-Shirts",
    "Formal Shoes",
    "Casual Shoes",
  ],

  Kids: [
    "Kids' Clothing",
    "Kids' Shoes",
    "Kids' Watches",
    "Kids' Sandals",
    "Toys",
    "School Accessories",
    "Kids' Accessories",
  ],

  Luxury: [
    "Luxury Watches",
    "Luxury Jewelry",
    "Luxury Bags",
    "Premium Perfumes",
    "Designer Fashion",
    "Luxury Accessories",
    "Premium Shoes",
  ],
} as const;

type MainCategory = keyof typeof categoryOptions;

export default function AddProductPage() {
  const router = useRouter();

  // Basic product information
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Main category and niche/subcategory
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [stock, setStock] = useState("1");

  // Main product image
  const [image, setImage] = useState("");

  // Additional product gallery images
  const [images, setImages] = useState<string[]>([]);

  // Product variations
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);

  // Temporary variation inputs
  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [styleInput, setStyleInput] = useState("");

  // Homepage sections
  const [featured, setFeatured] = useState(false);
  const [newArrival, setNewArrival] = useState(false);
  const [flashSale, setFlashSale] = useState(false);
  const [todaysDeal, setTodaysDeal] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const availableSubCategories =
    mainCategory &&
    mainCategory in categoryOptions
      ? categoryOptions[mainCategory as MainCategory]
      : [];

  // Add a color
  function addColor() {
    const value = colorInput.trim();

    if (!value) return;

    if (
      colors.some(
        (color) => color.toLowerCase() === value.toLowerCase()
      )
    ) {
      toast.error("This color is already added.");
      return;
    }

    setColors([...colors, value]);
    setColorInput("");
  }

  // Add a size
  function addSize() {
    const value = sizeInput.trim();

    if (!value) return;

    if (
      sizes.some(
        (size) => size.toLowerCase() === value.toLowerCase()
      )
    ) {
      toast.error("This size is already added.");
      return;
    }

    setSizes([...sizes, value]);
    setSizeInput("");
  }

  // Add a style
  function addStyle() {
    const value = styleInput.trim();

    if (!value) return;

    if (
      styles.some(
        (style) => style.toLowerCase() === value.toLowerCase()
      )
    ) {
      toast.error("This style is already added.");
      return;
    }

    setStyles([...styles, value]);
    setStyleInput("");
  }

  // Save product
  async function saveProduct() {
    if (
      !name ||
      !price ||
      !mainCategory ||
      !subCategory ||
      !image
    ) {
      toast.error(
        "Please enter the name, price, main category, niche and main image."
      );
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "products"), {
        // Basic information
        name: name.trim(),
        price: Number(price),
        stock: Number(stock),

        // Automatic category system
        mainCategory,
        subCategory,

        // Keeps compatibility with your existing product pages
        category: subCategory,

        // Main image
        image,

        // Product gallery
        images,

        // Product variations
        colors,
        sizes,
        styles,

        // Homepage sections
        featured,
        newArrival,
        flashSale,
        todaysDeal,
        bestSeller,

        createdAt: new Date(),
      });

      toast.success(
        `🎉 Product added to ${mainCategory} → ${subCategory}`
      );

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-gray-900 p-5 sm:p-8">

          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            Add Product
          </h1>

          <p className="mb-8 text-sm text-gray-400">
            Select the main category and product niche so the product
            automatically appears in the correct SmartCart section.
          </p>

          <div className="space-y-5">

            {/* Product name */}
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            {/* Price */}
            <input
              type="number"
              min="0"
              placeholder="Price in PKR"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            {/* Category system */}
            <div className="rounded-2xl border border-yellow-400/30 bg-black p-5">

              <h2 className="text-xl font-bold text-yellow-400">
                Product Category
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                First select the main category, then select the exact
                product niche.
              </p>

              {/* Main category */}
              <div className="mt-5">

                <label className="mb-2 block text-sm font-bold text-white">
                  Main Category
                </label>

                <select
                  value={mainCategory}
                  onChange={(e) => {
                    setMainCategory(e.target.value);
                    setSubCategory("");
                  }}
                  className="w-full rounded-xl border border-gray-700 bg-gray-900 p-4 text-white outline-none focus:border-yellow-400"
                >
                  <option value="">
                    Select Main Category
                  </option>

                  <option value="Women">
                    Women
                  </option>

                  <option value="Men">
                    Men
                  </option>

                  <option value="Kids">
                    Kids
                  </option>

                  <option value="Luxury">
                    Luxury
                  </option>

                </select>

              </div>

              {/* Niche / subcategory */}
              <div className="mt-5">

                <label className="mb-2 block text-sm font-bold text-white">
                  Product Niche / Subcategory
                </label>

                <select
                  value={subCategory}
                  disabled={!mainCategory}
                  onChange={(e) =>
                    setSubCategory(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-700 bg-gray-900 p-4 text-white outline-none focus:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">
                    {mainCategory
                      ? "Select Product Niche"
                      : "Select Main Category First"}
                  </option>

                  {availableSubCategories.map(
                    (subcategory) => (
                      <option
                        key={subcategory}
                        value={subcategory}
                      >
                        {subcategory}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* Selected category preview */}
              {mainCategory && subCategory && (
                <div className="mt-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4">

                  <p className="text-sm text-gray-300">
                    This product will automatically go to:
                  </p>

                  <p className="mt-1 font-bold text-green-400">
                    {mainCategory} → {subCategory}
                  </p>

                </div>
              )}

            </div>

            {/* Stock */}
            <input
              type="number"
              min="0"
              placeholder="Stock Quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            {/* Main image */}
            <div className="rounded-2xl border border-gray-700 bg-black p-5">

              <h2 className="mb-2 text-xl font-bold text-white">
                Main Product Image
              </h2>

              <p className="mb-4 text-sm text-gray-400">
                This image will appear on product cards.
              </p>

              <CldUploadWidget
                uploadPreset="smartcart_uploads"
                onSuccess={(result: any) => {
                  setImage(result.info.secure_url);
                  setUploadingMain(false);
                  toast.success("Main image uploaded.");
                }}
                onOpen={() => setUploadingMain(true)}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full rounded-xl bg-white py-4 font-bold text-black transition hover:bg-gray-200"
                  >
                    {uploadingMain
                      ? "Uploading..."
                      : image
                      ? "Replace Main Image"
                      : "Upload Main Product Image"}
                  </button>
                )}
              </CldUploadWidget>

              {image && (
                <img
                  src={image}
                  alt="Main product preview"
                  className="mt-5 h-52 w-full rounded-xl border border-gray-700 bg-white object-contain"
                />
              )}

            </div>

            {/* Gallery images */}
            <div className="rounded-2xl border border-gray-700 bg-black p-5">

              <div className="mb-4">

                <h2 className="text-xl font-bold text-white">
                  Product Gallery
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Upload up to 6 additional pictures.
                </p>

              </div>

              <CldUploadWidget
                uploadPreset="smartcart_uploads"
                onSuccess={(result: any) => {
                  const uploadedImage =
                    result.info.secure_url;

                  if (images.length >= 6) {
  toast.error("Maximum 6 gallery images allowed.");
  setUploadingGallery(false);
  return;
}

setImages((currentImages) => [
  ...currentImages,
  uploadedImage,
]);

setUploadingGallery(false);
toast.success("Gallery image added.");

                  setUploadingGallery(false);
                  toast.success("Gallery image added.");
                }}
                onOpen={() =>
                  setUploadingGallery(true)
                }
              >
                {({ open }) => (
                  <button
                    type="button"
                    disabled={images.length >= 6}
                    onClick={() => open()}
                    className="w-full rounded-xl border border-white/20 bg-gray-900 py-4 font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {uploadingGallery
                      ? "Uploading..."
                      : `Add Gallery Image (${images.length}/6)`}
                  </button>
                )}
              </CldUploadWidget>

              {images.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

                  {images.map(
                    (galleryImage, index) => (
                      <div
                        key={`${galleryImage}-${index}`}
                        className="relative overflow-hidden rounded-xl border border-gray-700 bg-white"
                      >

                        <img
                          src={galleryImage}
                          alt={`Product gallery ${index + 1}`}
                          className="h-32 w-full object-contain"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setImages(
                              images.filter(
                                (
                                  _,
                                  imageIndex
                                ) =>
                                  imageIndex !==
                                  index
                              )
                            )
                          }
                          className="absolute right-2 top-2 rounded-lg bg-red-600 px-2 py-1 text-xs font-bold text-white"
                        >
                          Remove
                        </button>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>

            {/* Colors */}
            <div className="rounded-2xl border border-gray-700 bg-black p-5">

              <h2 className="mb-4 text-xl font-bold text-white">
                Color Variations
              </h2>

              <div className="flex gap-2">

                <input
                  type="text"
                  placeholder="Example: Black"
                  value={colorInput}
                  onChange={(e) =>
                    setColorInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addColor();
                    }
                  }}
                  className="min-w-0 flex-1 rounded-xl border border-gray-700 bg-gray-900 p-3 text-white outline-none"
                />

                <button
                  type="button"
                  onClick={addColor}
                  className="rounded-xl bg-white px-5 font-bold text-black"
                >
                  Add
                </button>

              </div>

              {colors.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">

                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setColors(
                          colors.filter(
                            (
                              currentColor
                            ) =>
                              currentColor !==
                              color
                          )
                        )
                      }
                      className="rounded-full border border-white/20 bg-gray-900 px-4 py-2 text-sm text-white"
                    >
                      {color} ×
                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* Sizes */}
            <div className="rounded-2xl border border-gray-700 bg-black p-5">

              <h2 className="mb-4 text-xl font-bold text-white">
                Size Variations
              </h2>

              <div className="flex gap-2">

                <input
                  type="text"
                  placeholder="Example: Medium or 39"
                  value={sizeInput}
                  onChange={(e) =>
                    setSizeInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSize();
                    }
                  }}
                  className="min-w-0 flex-1 rounded-xl border border-gray-700 bg-gray-900 p-3 text-white outline-none"
                />

                <button
                  type="button"
                  onClick={addSize}
                  className="rounded-xl bg-white px-5 font-bold text-black"
                >
                  Add
                </button>

              </div>

              {sizes.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">

                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSizes(
                          sizes.filter(
                            (
                              currentSize
                            ) =>
                              currentSize !==
                              size
                          )
                        )
                      }
                      className="rounded-full border border-white/20 bg-gray-900 px-4 py-2 text-sm text-white"
                    >
                      {size} ×
                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* Styles */}
            <div className="rounded-2xl border border-gray-700 bg-black p-5">

              <h2 className="mb-4 text-xl font-bold text-white">
                Style / Design Variations
              </h2>

              <div className="flex gap-2">

                <input
                  type="text"
                  placeholder="Example: Style 1"
                  value={styleInput}
                  onChange={(e) =>
                    setStyleInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addStyle();
                    }
                  }}
                  className="min-w-0 flex-1 rounded-xl border border-gray-700 bg-gray-900 p-3 text-white outline-none"
                />

                <button
                  type="button"
                  onClick={addStyle}
                  className="rounded-xl bg-white px-5 font-bold text-black"
                >
                  Add
                </button>

              </div>

              {styles.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">

                  {styles.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() =>
                        setStyles(
                          styles.filter(
                            (
                              currentStyle
                            ) =>
                              currentStyle !==
                              style
                          )
                        )
                      }
                      className="rounded-full border border-white/20 bg-gray-900 px-4 py-2 text-sm text-white"
                    >
                      {style} ×
                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* Homepage sections */}
            <div className="space-y-4 rounded-2xl border border-gray-700 bg-black p-5">

              <h2 className="text-xl font-bold text-white">
                Homepage Sections
              </h2>

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) =>
                    setFeatured(
                      e.target.checked
                    )
                  }
                />

                Featured Product

              </label>

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={newArrival}
                  onChange={(e) =>
                    setNewArrival(
                      e.target.checked
                    )
                  }
                />

                New Arrival

              </label>

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={flashSale}
                  onChange={(e) =>
                    setFlashSale(
                      e.target.checked
                    )
                  }
                />

                Flash Sale

              </label>

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={todaysDeal}
                  onChange={(e) =>
                    setTodaysDeal(
                      e.target.checked
                    )
                  }
                />

                Today&apos;s Deal

              </label>

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={bestSeller}
                  onChange={(e) =>
                    setBestSeller(
                      e.target.checked
                    )
                  }
                />

                Best Seller

              </label>

            </div>

            {/* Save */}
            <button
              type="button"
              onClick={saveProduct}
              disabled={
                loading ||
                uploadingMain ||
                uploadingGallery
              }
              className="w-full rounded-xl bg-yellow-400 py-4 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
            >
              {loading
                ? "Saving Product..."
                : "Save Product"}
            </button>

          </div>

        </div>
      </main>
    </>
  );
}