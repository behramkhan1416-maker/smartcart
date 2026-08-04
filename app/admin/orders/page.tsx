"use client";

import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";

import { db } from "../../lib/firebase";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

type OrderItem = {
  product?: {
    id?: string;
    name?: string;
    price?: number;
    image?: string;
  };
  quantity?: number;
};

type Order = {
  id: string;

  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };

  items?: OrderItem[];

  subtotal?: number;
  delivery?: number;
  total?: number;

  paymentMethod?: string;
  paymentStatus?: string;

  transactionId?: string;
  paymentScreenshot?: string;

  status?: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  async function loadOrders() {
    try {
      setLoading(true);

      setErrorMessage("");

      const snapshot =
        await getDocs(
          collection(
            db,
            "orders"
          )
        );

      const list =
        snapshot.docs.map(
          (document) => ({
            id: document.id,

            ...document.data(),
          })
        ) as Order[];

      setOrders(list);
    } catch (error) {
      console.error(
        "Error loading orders:",
        error
      );

      setErrorMessage(
        "Could not load orders. Check Firebase connection and Firestore rules."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateStatus(
    id: string,
    status: string
  ) {
    try {
      await updateDoc(
        doc(
          db,
          "orders",
          id
        ),
        {
          status,
        }
      );

      setOrders(
        (previousOrders) =>
          previousOrders.map(
            (order) =>
              order.id === id
                ? {
                    ...order,
                    status,
                  }
                : order
          )
      );
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      alert(
        "Could not update order status."
      );
    }
  }

  async function updatePaymentStatus(
    id: string,
    paymentStatus: string
  ) {
    try {
      await updateDoc(
        doc(
          db,
          "orders",
          id
        ),
        {
          paymentStatus,
        }
      );

      setOrders(
        (previousOrders) =>
          previousOrders.map(
            (order) =>
              order.id === id
                ? {
                    ...order,
                    paymentStatus,
                  }
                : order
          )
      );
    } catch (error) {
      console.error(
        "Payment update error:",
        error
      );

      alert(
        "Could not update payment status."
      );
    }
  }

  async function deleteOrder(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to permanently delete this order?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(
        doc(
          db,
          "orders",
          id
        )
      );

      setOrders(
        (previousOrders) =>
          previousOrders.filter(
            (order) =>
              order.id !== id
          )
      );
    } catch (error) {
      console.error(
        "Delete order error:",
        error
      );

      alert(
        "Could not delete this order."
      );
    }
  }

  const filteredOrders =
    orders.filter(
      (order) => {
        const customerName =
          order.customer?.name
            ?.toLowerCase() ||
          "";

        const customerPhone =
          order.customer?.phone
            ?.toLowerCase() ||
          "";

        const customerEmail =
          order.customer?.email
            ?.toLowerCase() ||
          "";

        const searchText =
          search.toLowerCase();

        return (
          customerName.includes(
            searchText
          ) ||
          customerPhone.includes(
            searchText
          ) ||
          customerEmail.includes(
            searchText
          )
        );
      }
    );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black py-16 text-white">

        <div className="mx-auto max-w-7xl px-6">

          {/* Header */}

          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                SmartCart Admin
              </p>

              <h1 className="mt-3 text-4xl font-black text-yellow-400 sm:text-6xl">
                Orders Management
              </h1>

              <p className="mt-4 text-gray-400">
                Manage customer orders,
                payments and delivery status.
              </p>

            </div>

            <button
              type="button"
              onClick={
                loadOrders
              }
              className="rounded-xl bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-yellow-300"
            >
              🔄 Refresh Orders
            </button>

          </div>

          {/* Search */}

          <input
            type="text"
            placeholder="Search by customer name, phone or email..."
            value={search}
            onChange={
              (event) =>
                setSearch(
                  event.target.value
                )
            }
            className="mb-8 w-full max-w-xl rounded-xl border border-yellow-500 bg-gray-900 p-4 text-white outline-none focus:border-yellow-300"
          />

          {/* Error */}

          {errorMessage && (

            <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">

              <p className="font-bold text-red-400">
                {errorMessage}
              </p>

            </div>

          )}

          {/* Loading */}

          {loading ? (

            <div className="py-24 text-center">

              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />

              <h2 className="mt-6 text-2xl font-bold">
                Loading Orders...
              </h2>

            </div>

          ) : filteredOrders.length ===
            0 ? (

            <div className="rounded-3xl border border-yellow-500/20 bg-gray-900 p-16 text-center">

              <span className="text-6xl">
                📦
              </span>

              <h2 className="mt-6 text-3xl font-black">
                No Orders Found
              </h2>

              <p className="mt-3 text-gray-400">

                {search
                  ? "No customer matches your search."
                  : "Customer orders will appear here."}

              </p>

            </div>

          ) : (

            <div className="space-y-7">

              {filteredOrders.map(
                (order) => (

                  <article
                    key={
                      order.id
                    }
                    className="rounded-3xl border border-yellow-500/20 bg-gray-900 p-6 sm:p-8"
                  >

                    {/* Customer */}

                    <div className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-start lg:justify-between">

                      <div>

                        <h2 className="text-3xl font-black text-yellow-400">

                          {order.customer
                            ?.name ||
                            "Unknown Customer"}

                        </h2>

                        <p className="mt-3">

                          📧{" "}

                          {order.customer
                            ?.email ||
                            "No email"}

                        </p>

                        <p className="mt-2">

                          📱{" "}

                          {order.customer
                            ?.phone ||
                            "No phone"}

                        </p>

                        <p className="mt-2">

                          📍{" "}

                          {order.customer
                            ?.address ||
                            "No address"}

                        </p>

                        <p className="mt-2">

                          🏙{" "}

                          {order.customer
                            ?.city ||
                            "No city"}

                        </p>

                      </div>

                      <div className="rounded-xl bg-black p-4 text-sm">

                        <p className="text-gray-500">
                          Order ID
                        </p>

                        <p className="mt-2 max-w-xs break-all font-bold text-yellow-400">

                          {order.id}

                        </p>

                      </div>

                    </div>

                    {/* Products */}

                    <div className="mt-7">

                      <h3 className="text-xl font-black">

                        🛍 Products

                      </h3>

                      <div className="mt-4 space-y-3">

                        {order.items?.map(
                          (
                            item,
                            index
                          ) => (

                            <div
                              key={
                                index
                              }
                              className="flex flex-col justify-between gap-3 rounded-xl bg-black p-4 sm:flex-row sm:items-center"
                            >

                              <div>

                                <p className="font-bold">

                                  {item
                                    .product
                                    ?.name ||
                                    "Unknown Product"}

                                </p>

                                <p className="mt-1 text-sm text-gray-500">

                                  Quantity:{" "}

                                  {item.quantity ||
                                    1}

                                </p>

                              </div>

                              <p className="font-black text-yellow-400">

                                Rs.{" "}

                                {(
                                  Number(
                                    item
                                      .product
                                      ?.price ||
                                      0
                                  ) *
                                  Number(
                                    item.quantity ||
                                      1
                                  )
                                ).toLocaleString()}

                              </p>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                    {/* Total */}

                    <div className="mt-7 rounded-2xl border border-yellow-500/20 bg-black p-5">

                      <div className="flex justify-between">

                        <span>
                          Subtotal
                        </span>

                        <span>

                          Rs.{" "}

                          {Number(
                            order.subtotal ||
                              0
                          ).toLocaleString()}

                        </span>

                      </div>

                      <div className="mt-3 flex justify-between">

                        <span>
                          Delivery
                        </span>

                        <span>

                          Rs.{" "}

                          {Number(
                            order.delivery ||
                              0
                          ).toLocaleString()}

                        </span>

                      </div>

                      <div className="mt-5 flex justify-between border-t border-gray-800 pt-5 text-2xl font-black text-yellow-400">

                        <span>
                          Total
                        </span>

                        <span>

                          Rs.{" "}

                          {Number(
                            order.total ||
                              0
                          ).toLocaleString()}

                        </span>

                      </div>

                    </div>

                    {/* Controls */}

                    <div className="mt-7 grid gap-5 md:grid-cols-2">

                      <div>

                        <p className="font-bold">
                          Order Status
                        </p>

                        <select
                          value={
                            order.status ||
                            "Pending"
                          }
                          onChange={
                            (
                              event
                            ) =>
                              updateStatus(
                                order.id,
                                event
                                  .target
                                  .value
                              )
                          }
                          className="mt-3 w-full rounded-xl border border-yellow-500 bg-black p-4"
                        >

                          <option>
                            Pending
                          </option>

                          <option>
                            Confirmed
                          </option>

                          <option>
                            Shipped
                          </option>

                          <option>
                            Delivered
                          </option>

                          <option>
                            Cancelled
                          </option>

                        </select>

                      </div>

                      <div>

                        <p className="font-bold">
                          Payment Status
                        </p>

                        <select
                          value={
                            order.paymentStatus ||
                            "Waiting Verification"
                          }
                          onChange={
                            (
                              event
                            ) =>
                              updatePaymentStatus(
                                order.id,
                                event
                                  .target
                                  .value
                              )
                          }
                          className="mt-3 w-full rounded-xl border border-yellow-500 bg-black p-4"
                        >

                          <option>
                            Waiting Verification
                          </option>

                          <option>
                            Verified
                          </option>

                          <option>
                            Rejected
                          </option>

                          <option>
                            COD
                          </option>

                        </select>

                      </div>

                    </div>

                    {/* Payment */}

                    <div className="mt-7 rounded-2xl bg-black p-5">

                      <h3 className="text-xl font-black text-yellow-400">

                        💳 Payment Details

                      </h3>

                      <p className="mt-4">

                        Method:{" "}

                        <strong>

                          {order.paymentMethod ||
                            "Not available"}

                        </strong>

                      </p>

                      {order.transactionId && (

                        <p className="mt-2">

                          Transaction ID:{" "}

                          <strong>

                            {order.transactionId}

                          </strong>

                        </p>

                      )}

                      {order.paymentScreenshot && (

                        <div className="mt-5">

                          <a
                            href={
                              order.paymentScreenshot
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-blue-400 underline"
                          >

                            View Full Payment Screenshot

                          </a>

                          <img
                            src={
                              order.paymentScreenshot
                            }
                            alt="Payment screenshot"
                            className="mt-4 max-h-96 rounded-xl border border-yellow-500 object-contain"
                          />

                        </div>

                      )}

                    </div>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={
                        () =>
                          deleteOrder(
                            order.id
                          )
                      }
                      className="mt-7 rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-700"
                    >

                      🗑 Delete Order

                    </button>

                  </article>

                )
              )}

            </div>

          )}

        </div>

      </main>
    </>
  );
}