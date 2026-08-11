"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { db } from "../lib/firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function AdminPage() {
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      const ordersSnapshot = await getDocs(
        collection(db, "orders")
      );

      const productsSnapshot = await getDocs(
        collection(db, "products")
      );

      setOrders(ordersSnapshot.size);

      setProducts(productsSnapshot.size);

      let pending = 0;
      let totalRevenue = 0;

      ordersSnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.status === "Pending") {
          pending++;
        }

        totalRevenue += data.total || 0;
      });

      setPendingOrders(pending);

      setRevenue(totalRevenue);
    }

    loadDashboard();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-yellow-400 mb-12">
            SmartCart Admin Dashboard
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-gray-900 rounded-2xl p-8 border border-yellow-500/20">
              <h2 className="text-yellow-400">
                Total Orders
              </h2>

              <p className="text-5xl font-bold mt-5">
                {orders}
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 border border-yellow-500/20">
              <h2 className="text-yellow-400">
                Pending Orders
              </h2>

              <p className="text-5xl font-bold mt-5">
                {pendingOrders}
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 border border-yellow-500/20">
              <h2 className="text-yellow-400">
                Products
              </h2>

              <p className="text-5xl font-bold mt-5">
                {products}
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 border border-yellow-500/20">
              <h2 className="text-yellow-400">
                Revenue
              </h2>

              <p className="text-5xl font-bold mt-5">
                Rs. {revenue}
              </p>
            </div>

          </div>

        </div>

      </main>
    </>
  );
}