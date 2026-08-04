"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { db } from "../../lib/firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const snapshot = await getDocs(collection(db, "products"));

    setProducts(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  }

  async function removeProduct(id: string) {
    if (!confirm("Delete this product?")) return;

    await deleteDoc(doc(db, "products", id));

    loadProducts();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-yellow-400 mb-10">
            Products
          </h1>

          <div className="space-y-5">

            {products.map((product) => (

              <div
                key={product.id}
                className="bg-gray-900 rounded-xl p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold">
                    {product.name}
                  </h2>

                  <p className="text-yellow-400">
                    Rs. {product.price}
                  </p>

                  <p className="text-gray-400">
                    {product.category}
                  </p>
                </div>

                <button
                  onClick={() => removeProduct(product.id)}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>

      </main>
    </>
  );
}