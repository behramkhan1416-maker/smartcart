"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

import { db } from "../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function searchOrder() {
    if (!orderId) {
      alert("Please enter your Order ID.");
      return;
    }

    try {
      setLoading(true);

      const q = query(
        collection(db, "orders"),
        where("__name__", "==", orderId)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("Order not found.");
        setOrder(null);
      } else {
        setOrder({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to search order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white py-16">

        <div className="max-w-3xl mx-auto px-6">

          <h1 className="text-5xl text-center font-bold text-yellow-400 mb-10">
            Track Your Order
          </h1>

          <div className="bg-gray-900 rounded-2xl p-8">

            <input
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-gray-700"
            />

            <button
              onClick={searchOrder}
              disabled={loading}
              className="mt-5 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl"
            >
              {loading ? "Searching..." : "Track Order"}
            </button>

          </div>

          {order && (

            <div className="bg-gray-900 rounded-2xl p-8 mt-10">

              <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                Order Details
              </h2>

              <p>
                <strong>Order ID:</strong> {order.id}
              </p>

              <p className="mt-2">
                <strong>Customer:</strong> {order.customer.name}
              </p>

              <p className="mt-2">
                <strong>Email:</strong> {order.customer.email}
              </p>

              <p className="mt-2">
                <strong>Phone:</strong> {order.customer.phone}
              </p>

              <p className="mt-2">
                <strong>Total:</strong> Rs. {order.total}
              </p>

              <p className="mt-2">
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>

              <p className="mt-2">
                <strong>Payment Status:</strong>{" "}
                <span className="text-yellow-400">
                  {order.paymentStatus}
                </span>
              </p>

              <p className="mt-2">
                <strong>Order Status:</strong>{" "}
                <span className="text-green-400">
                  {order.status}
                </span>
              </p>

            </div>

          )}

        </div>

      </main>
    </>
  );
}