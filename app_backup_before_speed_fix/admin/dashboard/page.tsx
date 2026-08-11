"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      const productSnap = await getDocs(
        collection(db, "products")
      );

      setTotalProducts(productSnap.size);

      const orderSnap = await getDocs(
        collection(db, "orders")
      );

      setTotalOrders(orderSnap.size);

      let revenue = 0;
      let pending = 0;
      let completed = 0;

      orderSnap.forEach((doc) => {
        const data = doc.data();

        revenue += data.total || 0;

        if (data.status === "Pending") {
          pending++;
        }

        if (data.status === "Completed") {
          completed++;
        }
      });

      setPendingOrders(pending);
      setCompletedOrders(completed);
      setTotalRevenue(revenue);
    }

    loadDashboard();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-yellow-400 mb-12">
        📊 SmartCart Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-14">

        <div className="bg-gray-900 rounded-2xl p-8 border border-yellow-500/20">
          <h2 className="text-4xl">🛍</h2>

          <p className="text-gray-400 mt-4">
            Products
          </p>

          <h3 className="text-4xl font-bold text-yellow-400 mt-2">
            {totalProducts}
          </h3>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-blue-500/20">
          <h2 className="text-4xl">📦</h2>

          <p className="text-gray-400 mt-4">
            Orders
          </p>

          <h3 className="text-4xl font-bold text-blue-400 mt-2">
            {totalOrders}
          </h3>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-red-500/20">
          <h2 className="text-4xl">⏳</h2>

          <p className="text-gray-400 mt-4">
            Pending
          </p>

          <h3 className="text-4xl font-bold text-red-400 mt-2">
            {pendingOrders}
          </h3>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-green-500/20">
          <h2 className="text-4xl">✅</h2>

          <p className="text-gray-400 mt-4">
            Completed
          </p>

          <h3 className="text-4xl font-bold text-green-400 mt-2">
            {completedOrders}
          </h3>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-yellow-500/20">
          <h2 className="text-4xl">💰</h2>

          <p className="text-gray-400 mt-4">
            Revenue
          </p>

          <h3 className="text-3xl font-bold text-yellow-400 mt-2">
            Rs. {totalRevenue}
          </h3>
        </div>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
<Link href="/admin/orders">
  <div className="bg-gray-900 p-8 rounded-2xl hover:bg-gray-800 transition cursor-pointer">
    <h2 className="text-4xl">📦</h2>

    <h3 className="text-xl font-bold mt-4">
      Orders
    </h3>

    <p className="text-gray-400 mt-2">
      Manage customer orders
    </p>
  </div>
</Link>

<Link href="/admin/products">
  <div className="bg-gray-900 p-8 rounded-2xl hover:bg-gray-800 transition cursor-pointer">
    <h2 className="text-4xl">🛍</h2>

    <h3 className="text-xl font-bold mt-4">
      Products
    </h3>

    <p className="text-gray-400 mt-2">
      Manage all products
    </p>
  </div>
</Link>

<Link href="/admin/add-product">
  <div className="bg-gray-900 p-8 rounded-2xl hover:bg-gray-800 transition cursor-pointer">
    <h2 className="text-4xl">➕</h2>

    <h3 className="text-xl font-bold mt-4">
      Add Product
    </h3>

    <p className="text-gray-400 mt-2">
      Upload a new product
    </p>
  </div>
</Link>

<Link href="/">
  <div className="bg-gray-900 p-8 rounded-2xl hover:bg-gray-800 transition cursor-pointer">
    <h2 className="text-4xl">🏠</h2>

    <h3 className="text-xl font-bold mt-4">
      Visit Store
    </h3>

    <p className="text-gray-400 mt-2">
      Open SmartCart Website
    </p>
  </div>
</Link>

      </div>

    </main>
  );
}