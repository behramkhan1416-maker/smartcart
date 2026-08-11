"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";

import { db } from "../../../lib/firebase";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);
const [newArrival, setNewArrival] = useState(false);
const [flashSale, setFlashSale] = useState(false);
const [todaysDeal, setTodaysDeal] = useState(false);
const [bestSeller, setBestSeller] = useState(false);
const [stock, setStock] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);
        console.log("Document ID:", id);
console.log("Exists:", productSnap.exists());

        if (!productSnap.exists()) {
          toast.error("Product not found.");
          router.push("/admin/products");
          return;
        }

        const data = productSnap.data();

        setName(data.name || "");
        setPrice(String(data.price || ""));
        setCategory(data.category || "");
        setImage(data.image || "");
        setFeatured(data.featured || false);
setNewArrival(data.newArrival || false);
setFlashSale(data.flashSale || false);
setTodaysDeal(data.todaysDeal || false);
setBestSeller(data.bestSeller || false);
setStock(String(data.stock || 0));
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id, router]);

  async function updateProduct() {
    if (!name || !price || !category || !image) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setSaving(true);

      await updateDoc(doc(db, "products", id), {
  name,
  price: Number(price),
  category,
  image,

  featured,
  newArrival,
  flashSale,
  todaysDeal,
  bestSeller,
  stock: Number(stock),
});

      toast.success("🎉 Product updated successfully!");

      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);

    } catch (error) {
      console.error(error);
      toast.error("Failed to update product.");
    } finally {
      setSaving(false);
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        Loading Product...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white py-16">

        <div className="max-w-xl mx-auto bg-gray-900 rounded-2xl p-8">

          <h1 className="text-4xl font-bold text-yellow-400 mb-8">
            ✏ Edit Product
          </h1>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-gray-700"
            />
            <input
  type="number"
  placeholder="Stock Quantity"
  value={stock}
  onChange={(e) => setStock(e.target.value)}
  className="w-full p-4 rounded-lg bg-black border border-gray-700"
/>
<h2 className="text-xl font-bold text-yellow-400">
  Homepage Sections
</h2>
<label className="flex items-center gap-3 cursor-pointer mt-4">
  <input
    type="checkbox"
    checked={featured}
    onChange={(e) => setFeatured(e.target.checked)}
  />
  Featured Product
</label>
<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={newArrival}
    onChange={(e) => setNewArrival(e.target.checked)}
  />
  New Arrival
</label>

<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={flashSale}
    onChange={(e) => setFlashSale(e.target.checked)}
  />
  Flash Sale
</label>

<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={todaysDeal}
    onChange={(e) => setTodaysDeal(e.target.checked)}
  />
  Today's Deal
</label>

<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={bestSeller}
    onChange={(e) => setBestSeller(e.target.checked)}
  />
  Best Seller
</label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-gray-700"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-gray-700"
            />

            <CldUploadWidget
              uploadPreset="smartcart_uploads"
              onSuccess={(result: any) => {
                setImage(result.info.secure_url);
                setUploading(false);
              }}
              onOpen={() => setUploading(true)}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl"
                >
                  {uploading
                    ? "⏳ Uploading Image..."
                    : image
                    ? "✅ Image Uploaded"
                    : "📤 Upload New Image"}
                </button>
              )}
            </CldUploadWidget>

            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-xl border border-gray-700 mx-auto"
              />
            )}

            <button
              onClick={updateProduct}
              disabled={saving}
              className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-black font-bold py-4 rounded-xl transition"
            >
              {saving ? "Saving Changes..." : "💾 Save Changes"}
            </button>

          </div>

        </div>

      </main>
    </>
  );
}