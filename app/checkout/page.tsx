"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";

import { CldUploadWidget } from "next-cloudinary";

import { db } from "../lib/firebase";

import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";

export default function CheckoutPage() {
  const cartContext = useContext(CartContext);

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Easypaisa");

  const [transactionId, setTransactionId] =
    useState("");

  const [paymentScreenshot, setPaymentScreenshot] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // Show a safe message if CartProvider is unavailable
  if (!cartContext) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
          <div className="w-full max-w-lg rounded-3xl border border-red-500/30 bg-gray-900 p-10 text-center">

            <h1 className="text-3xl font-black text-red-400">
              Cart Not Available
            </h1>

            <p className="mt-4 text-gray-400">
              Please refresh the website and try again.
            </p>

            <button
              type="button"
              onClick={() => router.push("/cart")}
              className="mt-7 rounded-xl bg-yellow-400 px-6 py-3 font-black text-black transition hover:bg-yellow-300"
            >
              Go to Cart
            </button>

          </div>
        </main>
      </>
    );
  }

  // Cart is guaranteed to exist below this point
  const cart = cartContext;

  const subtotal = cart.cartItems.reduce(
    (total, item) =>
      total +
      item.product.price *
        item.quantity,
    0
  );

  const delivery =
    cart.cartItems.length > 0
      ? 250
      : 0;

  const totalPrice =
    subtotal + delivery;

  async function placeOrder() {
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !postalCode.trim()
    ) {
      toast.error(
        "Please fill all customer details."
      );

      return;
    }

    if (
      cart.cartItems.length === 0
    ) {
      toast.error(
        "Your cart is empty."
      );

      return;
    }

    if (
      paymentMethod !==
      "Cash on Delivery"
    ) {
      if (
        !transactionId.trim()
      ) {
        toast.error(
          "Please enter the Transaction ID."
        );

        return;
      }

      if (
        !paymentScreenshot
      ) {
        toast.error(
          "Please upload the payment screenshot."
        );

        return;
      }
    }

    try {
      setLoading(true);

      // Create the order in Firebase
      const orderReference =
        await addDoc(
          collection(
            db,
            "orders"
          ),
          {
            customer: {
              name:
                name.trim(),

              email:
                email.trim(),

              phone:
                phone.trim(),

              address:
                address.trim(),

              city:
                city.trim(),

              postalCode:
                postalCode.trim(),
            },

            items:
              cart.cartItems,

            subtotal,

            delivery,

            total:
              totalPrice,

            paymentMethod,

            transactionId:
              paymentMethod ===
              "Cash on Delivery"
                ? ""
                : transactionId.trim(),

            paymentScreenshot:
              paymentMethod ===
              "Cash on Delivery"
                ? ""
                : paymentScreenshot,

            paymentStatus:
              paymentMethod ===
              "Cash on Delivery"
                ? "COD"
                : "Waiting Verification",

            status:
              "Pending",

            createdAt:
              serverTimestamp(),
          }
        );

      // Update product stock
      for (
        const item of
        cart.cartItems
      ) {
        try {
          await updateDoc(
            doc(
              db,
              "products",
              item.product.id
            ),
            {
              stock:
                increment(
                  -item.quantity
                ),
            }
          );
        } catch (
          stockError
        ) {
          console.error(
            "Stock update error:",
            stockError
          );
        }
      }

      // Empty cart
      cart.setCartItems([]);

      // Show success message
      toast.success(
        "Order placed successfully!"
      );

      // Open the order success page
      router.push(
        `/order-success?orderId=${orderReference.id}`
      );
    } catch (error) {
      console.error(
        "Order error:",
        error
      );

      toast.error(
        "Failed to place the order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black py-12 text-white sm:py-16">

        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">

          {/* CUSTOMER DETAILS */}

          <section className="rounded-3xl border border-yellow-400/20 bg-gray-900 p-6 sm:p-8">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
              SmartCart
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Secure Checkout
            </h1>

            <p className="mt-3 text-gray-400">
              Enter your delivery details
              and complete your order.
            </p>

            <div className="mt-8 space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

              <input
                type="text"
                placeholder="Complete Shipping Address"
                value={address}
                onChange={(event) =>
                  setAddress(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

              <div className="grid gap-5 sm:grid-cols-2">

                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(event) =>
                    setCity(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
                />

                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(event) =>
                    setPostalCode(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
                />

              </div>

              {/* PAYMENT METHOD */}

              <div className="pt-5">

                <h2 className="text-2xl font-black text-yellow-400">
                  Payment Method
                </h2>

                <div className="mt-5 grid gap-3">

                  {[
                    "Easypaisa",
                    "JazzCash",
                    "Bank Transfer",
                    "Cash on Delivery",
                  ].map(
                    (method) => (
                      <label
                        key={method}
                        className={`cursor-pointer rounded-xl border p-4 transition ${
                          paymentMethod ===
                          method
                            ? "border-yellow-400 bg-yellow-400/10"
                            : "border-gray-700 bg-black"
                        }`}
                      >

                        <input
                          type="radio"
                          name="payment"
                          checked={
                            paymentMethod ===
                            method
                          }
                          onChange={() =>
                            setPaymentMethod(
                              method
                            )
                          }
                        />

                        <span className="ml-3 font-bold">

                          {method ===
                          "Cash on Delivery"
                            ? "🚚 Cash on Delivery (COD)"
                            : method}

                        </span>

                      </label>
                    )
                  )}

                </div>

              </div>

              {/* ONLINE PAYMENT */}

              {paymentMethod !==
                "Cash on Delivery" && (

                <div className="space-y-5">

                  <div className="rounded-2xl border border-yellow-400/30 bg-black p-5">

                    <h3 className="font-black text-yellow-400">
                      Send Payment To
                    </h3>

                    <p className="mt-3">
                      Account Title:{" "}

                      <strong>
                        SmartCart
                      </strong>
                    </p>

                    <p className="mt-2">
                      Account Number:{" "}

                      <strong>
                        03XXXXXXXXX
                      </strong>
                    </p>

                    <p className="mt-3 text-sm text-gray-500">
                      Replace this number with
                      your real payment number.
                    </p>

                  </div>

                  <input
                    type="text"
                    placeholder="Transaction ID"
                    value={
                      transactionId
                    }
                    onChange={(
                      event
                    ) =>
                      setTransactionId(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
                  />

                  <CldUploadWidget
                    uploadPreset="smartcart_uploads"
                    onSuccess={(
                      result: any
                    ) => {
                      const uploadedUrl =
                        result?.info
                          ?.secure_url;

                      if (
                        uploadedUrl
                      ) {
                        setPaymentScreenshot(
                          uploadedUrl
                        );

                        toast.success(
                          "Payment screenshot uploaded!"
                        );
                      }
                    }}
                  >

                    {({
                      open,
                    }) => (

                      <button
                        type="button"
                        onClick={() =>
                          open()
                        }
                        className="w-full rounded-xl bg-blue-600 py-4 font-black text-white transition hover:bg-blue-500"
                      >
                        📷 Upload Payment Screenshot
                      </button>

                    )}

                  </CldUploadWidget>

                  {paymentScreenshot && (

                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 font-bold text-green-400">

                      ✅ Screenshot uploaded successfully

                    </div>

                  )}

                </div>
              )}

            </div>

          </section>

          {/* ORDER SUMMARY */}

          <aside className="h-fit rounded-3xl border border-yellow-400/20 bg-gray-900 p-6 lg:sticky lg:top-8 sm:p-8">

            <h2 className="text-3xl font-black text-yellow-400">
              Order Summary
            </h2>

            {cart.cartItems.length ===
            0 ? (

              <div className="py-12 text-center">

                <span className="text-5xl">
                  🛒
                </span>

                <p className="mt-5 text-lg font-bold">
                  Your cart is empty
                </p>

              </div>

            ) : (

              <div className="mt-6 space-y-4">

                {cart.cartItems.map(
                  (item) => (

                    <div
                      key={
                        item.product.id
                      }
                      className="flex justify-between gap-5 border-b border-gray-700 pb-4"
                    >

                      <div>

                        <p className="font-bold">

                          {
                            item.product
                              .name
                          }

                        </p>

                        <p className="mt-1 text-sm text-gray-500">

                          Quantity:{" "}

                          {
                            item.quantity
                          }

                        </p>

                      </div>

                      <p className="font-bold text-yellow-400">

                        Rs.{" "}

                        {(
                          item.product
                            .price *
                          item.quantity
                        ).toLocaleString()}

                      </p>

                    </div>
                  )
                )}

              </div>

            )}

            <div className="mt-8 space-y-4">

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Subtotal
                </span>

                <span>

                  Rs.{" "}

                  {subtotal.toLocaleString()}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Delivery
                </span>

                <span>

                  Rs.{" "}

                  {delivery.toLocaleString()}

                </span>

              </div>

              <div className="border-t border-gray-700 pt-5">

                <div className="flex justify-between text-3xl font-black text-yellow-400">

                  <span>
                    Total
                  </span>

                  <span>

                    Rs.{" "}

                    {totalPrice.toLocaleString()}

                  </span>

                </div>

              </div>

            </div>

            <button
              type="button"
              onClick={
                placeOrder
              }
              disabled={
                loading ||
                cart.cartItems
                  .length === 0
              }
              className="mt-8 w-full rounded-xl bg-yellow-400 py-4 text-lg font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {loading
                ? "Placing Order..."
                : "✅ Place Order"}

            </button>

          </aside>

        </div>

      </main>
    </>
  );
}