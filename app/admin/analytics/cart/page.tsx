"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

type CartEvent = {
  id: string;
  visitorId?: string;
  productId?: string;
  productName?: string;
  productPrice?: number;
  productImage?: string;
  mainCategory?: string;
  subCategory?: string;
  quantity?: number;
  eventType?: string;
  createdAt?: {
    toDate?: () => Date;
  };
};

export default function CartAnalyticsPage() {
  const [cartEvents, setCartEvents] =
    useState<CartEvent[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  async function loadCartAnalytics() {
    try {
      setLoading(true);
      setErrorMessage("");

      const cartEventsQuery = query(
        collection(db, "cartEvents"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(
        cartEventsQuery
      );

      const events: CartEvent[] =
        snapshot.docs.map((document) => ({
          id: document.id,
          ...(document.data() as Omit<
            CartEvent,
            "id"
          >),
        }));

      setCartEvents(events);
    } catch (error) {
      console.error(
        "Error loading cart analytics:",
        error
      );

      setErrorMessage(
        "Could not load cart reports. Check Firebase rules or Firestore."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCartAnalytics();
  }, []);

  const totalAddToCart =
    cartEvents.length;

  const uniqueVisitors =
    new Set(
      cartEvents
        .map(
          (event) =>
            event.visitorId
        )
        .filter(Boolean)
    ).size;

  const uniqueProducts =
    new Set(
      cartEvents
        .map(
          (event) =>
            event.productId
        )
        .filter(Boolean)
    ).size;

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />

          <p className="mt-5 text-lg font-bold">
            Loading Add-to-Cart reports...
          </p>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 sm:py-16">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              SmartCart Admin
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-6xl">
              Add to Cart Reports
            </h1>

            <p className="mt-4 max-w-2xl text-gray-400">
              See which products customers added
              to their carts and track anonymous
              visitors.
            </p>

          </div>

          <button
            type="button"
            onClick={loadCartAnalytics}
            className="rounded-xl bg-yellow-400 px-6 py-3 font-black text-black transition hover:bg-yellow-300"
          >
            Refresh Report
          </button>

        </div>

        {/* ERROR */}

        {errorMessage && (

          <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">

            <p className="font-bold text-red-400">
              {errorMessage}
            </p>

          </div>

        )}

        {/* SUMMARY */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

          {/* TOTAL */}

          <div className="rounded-3xl border border-yellow-400/30 bg-gray-900 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Total Add to Cart
            </p>

            <div className="mt-5 flex items-end justify-between">

              <h2 className="text-5xl font-black text-yellow-400">
                {totalAddToCart}
              </h2>

              <span className="text-4xl">
                🛒
              </span>

            </div>

          </div>

          {/* VISITORS */}

          <div className="rounded-3xl border border-white/10 bg-gray-900 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Unique Visitors
            </p>

            <div className="mt-5 flex items-end justify-between">

              <h2 className="text-5xl font-black">
                {uniqueVisitors}
              </h2>

              <span className="text-4xl">
                👤
              </span>

            </div>

          </div>

          {/* PRODUCTS */}

          <div className="rounded-3xl border border-white/10 bg-gray-900 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Products Added
            </p>

            <div className="mt-5 flex items-end justify-between">

              <h2 className="text-5xl font-black">
                {uniqueProducts}
              </h2>

              <span className="text-4xl">
                📦
              </span>

            </div>

          </div>

        </div>

        {/* TABLE */}

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gray-900">

          <div className="border-b border-white/10 p-6">

            <h2 className="text-2xl font-black">
              Customer Add-to-Cart Activity
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Every event is saved when a customer
              presses the Add to Cart button.
            </p>

          </div>

          {cartEvents.length === 0 ? (

            <div className="p-12 text-center">

              <span className="text-5xl">
                🛒
              </span>

              <h3 className="mt-5 text-2xl font-bold">
                No Add-to-Cart Events Yet
              </h3>

              <p className="mt-3 text-gray-400">
                Open a product page, click Add to
                Cart, then return here and click
                Refresh Report.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-black/50">

                  <tr className="text-left text-sm text-gray-400">

                    <th className="px-5 py-4">
                      Product
                    </th>

                    <th className="px-5 py-4">
                      Price
                    </th>

                    <th className="px-5 py-4">
                      Category
                    </th>

                    <th className="px-5 py-4">
                      Visitor
                    </th>

                    <th className="px-5 py-4">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {cartEvents.map(
                    (event) => {

                      const eventDate =
                        event.createdAt?.toDate
                          ? event.createdAt
                              .toDate()
                              .toLocaleString()
                          : "Saving date...";

                      return (

                        <tr
                          key={event.id}
                          className="border-t border-white/10"
                        >

                          <td className="px-5 py-5">

                            <div className="flex min-w-60 items-center gap-4">

                              {event.productImage ? (

                                <img
                                  src={
                                    event.productImage
                                  }
                                  alt={
                                    event.productName ||
                                    "Product"
                                  }
                                  className="h-16 w-16 rounded-xl bg-white object-contain p-1"
                                />

                              ) : (

                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-black text-2xl">
                                  📦
                                </div>

                              )}

                              <div>

                                <p className="font-bold text-white">

                                  {event.productName ||
                                    "Unknown Product"}

                                </p>

                                <p className="mt-1 text-xs text-gray-500">

                                  ID:{" "}

                                  {event.productId ||
                                    "Not available"}

                                </p>

                              </div>

                            </div>

                          </td>

                          <td className="px-5 py-5 font-bold text-yellow-400">

                            Rs.{" "}

                            {Number(
                              event.productPrice ||
                              0
                            ).toLocaleString()}

                          </td>

                          <td className="px-5 py-5">

                            <p className="font-semibold">

                              {event.mainCategory ||
                                "Not set"}

                            </p>

                            <p className="mt-1 text-sm text-gray-500">

                              {event.subCategory ||
                                "Not set"}

                            </p>

                          </td>

                          <td className="max-w-52 wrap-break-word px-5 py-5 text-sm text-gray-400">

                            {event.visitorId ||
                              "Anonymous"}

                          </td>

                          <td className="px-5 py-5 text-sm text-gray-400">

                            {eventDate}

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}