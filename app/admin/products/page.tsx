"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const snapshot = await getDocs(collection(db, "products"));

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeProduct(id: string) {
    if (!confirm("Delete this product?")) return;

    try {
      await deleteDoc(doc(db, "products", id));
      await loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  const filteredProducts = products.filter((product) =>
    (product.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

          <div>
            <h1 className="text-5xl font-bold text-yellow-400">
              Manage Products
            </h1>

            <p className="text-gray-400 mt-2">
              {filteredProducts.length} Products
            </p>
          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-xl px-5 py-3 w-full md:w-80 outline-none focus:border-yellow-400"
          />
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center text-yellow-400 text-xl py-20">
            Loading Products...
          </div>
        ) : (
          /* TABLE */
          <div className="overflow-x-auto rounded-2xl border border-gray-800">

            <table className="min-w-full">

              <thead className="bg-yellow-500 text-black">
                <tr>

                  <th className="p-4 text-left">
                    Image
                  </th>

                  <th className="p-4 text-left">
                    Product
                  </th>

                  <th className="p-4 text-left">
                    Description
                  </th>

                  <th className="p-4 text-left">
                    Price
                  </th>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Stock
                  </th>

                  <th className="p-4 text-left">
                    Featured
                  </th>

                  <th className="p-4 text-left">
                    Flash Sale
                  </th>

                  <th className="p-4 text-left">
                    Today's Deal
                  </th>

                  <th className="p-4 text-left">
                    Best Seller
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-b border-gray-800 hover:bg-gray-900 transition"
                  >

                    {/* IMAGE */}
                    <td className="p-4">

                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name || "Product"}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}

                    </td>

                    {/* PRODUCT NAME */}
                    <td className="p-4 font-bold">
                      {product.name || "Unnamed Product"}
                    </td>

                    {/* DESCRIPTION */}
                    <td className="p-4 max-w-sm">

                      <div className="line-clamp-3 text-gray-300">
                        {product.description || "No Description"}
                      </div>

                    </td>

                    {/* PRICE */}
                    <td className="p-4 text-yellow-400 font-bold">
                      Rs. {product.price ?? 0}
                    </td>

                    {/* CATEGORY */}
                    <td className="p-4">
                      {product.category || "Uncategorized"}
                    </td>

                    {/* STOCK */}
                    <td className="p-4">
                      {product.stock ?? 0}
                    </td>

                    {/* FEATURED */}
                    <td className="p-4">

                      {product.featured ? (
                        <span className="text-green-400 font-semibold">
                          ✅ Yes
                        </span>
                      ) : (
                        <span className="text-red-400">
                          ❌ No
                        </span>
                      )}

                    </td>

                    {/* FLASH SALE */}
                    <td className="p-4">

                      {product.flashSale ? (
                        <span className="text-green-400 font-semibold">
                          ✅ Yes
                        </span>
                      ) : (
                        <span className="text-red-400">
                          ❌ No
                        </span>
                      )}

                    </td>

                    {/* TODAY'S DEAL */}
                    <td className="p-4">

                      {product.todaysDeal ? (
                        <span className="text-green-400 font-semibold">
                          ✅ Yes
                        </span>
                      ) : (
                        <span className="text-red-400">
                          ❌ No
                        </span>
                      )}

                    </td>

                    {/* BEST SELLER */}
                    <td className="p-4">

                      {product.bestSeller ? (
                        <span className="text-green-400 font-semibold">
                          ✅ Yes
                        </span>
                      ) : (
                        <span className="text-red-400">
                          ❌ No
                        </span>
                      )}

                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">

                      <div className="flex flex-col lg:flex-row gap-3">

                        <button
                          onClick={() =>
                            router.push(
                              `/admin/edit-product/${product.id}`
                            )
                          }
                          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition"
                        >
                          ✏ Edit
                        </button>

                        <button
                          onClick={() =>
                            removeProduct(product.id)
                          }
                          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold transition"
                        >
                          🗑 Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {/* NO PRODUCTS */}
            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-16 text-gray-400">
                No products found.
              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}