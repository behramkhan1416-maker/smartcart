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

  // Payment Plan
  const [paymentPlan, setPaymentPlan] = useState<"50%" | "100%">("50%");

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<
    "SadaPay" | "Easypaisa" | "JazzCash"
  >("Easypaisa");

  const [transactionId, setTransactionId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState("");
  const [loading, setLoading] = useState(false);

  /*
   * SmartCart delivery benefit.
   *
   * Product prices already include the
   * Rs. 250 delivery component.
   *
   * 50% Advance:
   * Standard order value remains unchanged.
   *
   * 100% Advance:
   * Customer receives the Rs. 250 delivery
   * benefit automatically.
   */
  const DELIVERY_BENEFIT = 250;

  /*
   * Replace these with your REAL payment
   * account numbers before going live.
   */
  const paymentAccounts = {
    Easypaisa: {
      title: "SmartCart",
      number: "03XXXXXXXXX",
    },

    JazzCash: {
      title: "SmartCart",
      number: "03XXXXXXXXX",
    },

    SadaPay: {
      title: "SmartCart",
      number: "03XXXXXXXXX",
    },
  };

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

  const cart = cartContext;

  /*
   * Standard order value.
   *
   * Product prices already contain
   * the delivery component.
   */
  const standardTotal = cart.cartItems.reduce(
    (total, item) =>
      total +
      Number(item.product.price) * item.quantity,
    0
  );

  /*
   * 50% Advance Payment
   */
  const advanceAmount50 = standardTotal * 0.5;

  const remainingAmount50 =
    standardTotal - advanceAmount50;

  /*
   * 100% Advance Payment
   *
   * Rs. 250 delivery benefit is deducted.
   */
  const prepaidTotal =
    cart.cartItems.length > 0
      ? Math.max(
          standardTotal - DELIVERY_BENEFIT,
          0
        )
      : 0;

  /*
   * Final order value based on
   * selected payment plan.
   */
  const payableTotal =
    paymentPlan === "100%"
      ? prepaidTotal
      : standardTotal;

  /*
   * Amount paid immediately.
   */
  const amountPayableNow =
    paymentPlan === "100%"
      ? prepaidTotal
      : advanceAmount50;

  /*
   * Remaining balance.
   */
  const amountPayableLater =
    paymentPlan === "100%"
      ? 0
      : remainingAmount50;

  /*
   * Delivery display.
   */
  const deliveryText =
    paymentPlan === "100%"
      ? "FREE"
      : "Applicable on delivery";

  /*
   * Currently selected payment account.
   */
  const selectedPaymentAccount =
    paymentAccounts[paymentMethod];

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

    if (cart.cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    /*
     * Both payment plans require
     * an advance payment.
     */
    if (!transactionId.trim()) {
      toast.error(
        "Please enter the Transaction ID."
      );

      return;
    }

    if (!paymentScreenshot) {
      toast.error(
        "Please upload the payment screenshot."
      );

      return;
    }

    try {
      setLoading(true);

      /*
       * Create order in Firebase.
       */
      const orderReference = await addDoc(
        collection(db, "orders"),
        {
          customer: {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
            city: city.trim(),
            postalCode: postalCode.trim(),
          },

          items: cart.cartItems,

          /*
           * Original product/order value.
           */
          subtotal: standardTotal,

          /*
           * Delivery benefit only applies
           * to 100% advance payment.
           */
          deliveryBenefit:
            paymentPlan === "100%"
              ? DELIVERY_BENEFIT
              : 0,

          /*
           * Delivery charge record.
           */
          delivery:
            paymentPlan === "100%"
              ? 0
              : DELIVERY_BENEFIT,

          /*
           * Final customer order value.
           */
          total: payableTotal,

          /*
           * Payment plan.
           */
          paymentPlan,

          /*
           * Selected payment method.
           */
          paymentMethod,

          /*
           * Amount received immediately.
           */
          advanceAmount: amountPayableNow,

          /*
           * Remaining amount.
           */
          remainingAmount: amountPayableLater,

          transactionId:
            transactionId.trim(),

          paymentScreenshot,

          paymentStatus:
            "Waiting Verification",

          status: "Pending",

          createdAt: serverTimestamp(),
        }
      );

      /*
       * Reduce product stock.
       */
      for (const item of cart.cartItems) {
        try {
          await updateDoc(
            doc(
              db,
              "products",
              item.product.id
            ),
            {
              stock: increment(
                -item.quantity
              ),
            }
          );
        } catch (stockError) {
          console.error(
            "Stock update error:",
            stockError
          );
        }
      }

      /*
       * Empty cart.
       */
      cart.setCartItems([]);

      toast.success(
        "Order submitted successfully!"
      );

      /*
       * Open success page.
       */
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

          {/* ================================
              CUSTOMER DETAILS
          ================================= */}

          <section className="rounded-3xl border border-yellow-400/20 bg-gray-900 p-6 sm:p-8">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
              SmartCart
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Secure Checkout
            </h1>

            <p className="mt-3 text-gray-400">
              Enter your delivery details and
              select your preferred payment plan.
            </p>

            <div className="mt-8 space-y-5">

              {/* FULL NAME */}

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

              {/* EMAIL */}

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

              {/* PHONE */}

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

              {/* ADDRESS */}

              <input
                type="text"
                placeholder="Complete Shipping Address"
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
                className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
              />

              {/* CITY + POSTAL CODE */}

              <div className="grid gap-5 sm:grid-cols-2">

                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(event) =>
                    setCity(event.target.value)
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

              {/* ================================
                  PAYMENT PLAN
              ================================= */}

              <div className="pt-5">

                <h2 className="text-2xl font-black text-yellow-400">
                  Choose Your Payment Plan
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  An advance payment is required
                  to confirm your order.
                </p>

                <div className="mt-5 grid gap-4">

                  {/* 50% ADVANCE */}

                  <label
                    className={`cursor-pointer rounded-2xl border p-5 transition ${
                      paymentPlan === "50%"
                        ? "border-yellow-400 bg-yellow-400/10"
                        : "border-gray-700 bg-black hover:border-gray-500"
                    }`}
                  >

                    <div className="flex items-start gap-4">

                      <input
                        type="radio"
                        name="paymentPlan"
                        checked={
                          paymentPlan === "50%"
                        }
                        onChange={() =>
                          setPaymentPlan("50%")
                        }
                        className="mt-1 h-5 w-5 accent-yellow-400"
                      />

                      <div className="flex-1">

                        <div className="flex flex-col justify-between gap-2 sm:flex-row">

                          <h3 className="text-lg font-black">
                            50% Advance
                            <span className="ml-2 text-yellow-400">
                              — Order Reservation
                            </span>
                          </h3>

                          <span className="font-black text-yellow-400">
                            Rs.{" "}
                            {standardTotal.toLocaleString()}
                          </span>

                        </div>

                        <p className="mt-3 text-sm leading-6 text-gray-400">
                          Reserve your order with a
                          50% advance payment. The
                          remaining balance is payable
                          upon delivery under standard
                          delivery terms.
                        </p>

                        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">

                          <div className="rounded-lg bg-gray-900 p-3">
                            <span className="text-gray-500">
                              Pay Now
                            </span>

                            <div className="mt-1 font-black text-white">
                              Rs.{" "}
                              {advanceAmount50.toLocaleString()}
                            </div>
                          </div>

                          <div className="rounded-lg bg-gray-900 p-3">
                            <span className="text-gray-500">
                              Pay on Delivery
                            </span>

                            <div className="mt-1 font-black text-white">
                              Rs.{" "}
                              {remainingAmount50.toLocaleString()}
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>

                  </label>

                  {/* 100% ADVANCE */}

                  <label
                    className={`cursor-pointer rounded-2xl border p-5 transition ${
                      paymentPlan === "100%"
                        ? "border-green-400 bg-green-400/10"
                        : "border-gray-700 bg-black hover:border-gray-500"
                    }`}
                  >

                    <div className="flex items-start gap-4">

                      <input
                        type="radio"
                        name="paymentPlan"
                        checked={
                          paymentPlan === "100%"
                        }
                        onChange={() =>
                          setPaymentPlan("100%")
                        }
                        className="mt-1 h-5 w-5 accent-green-400"
                      />

                      <div className="flex-1">

                        <div className="flex flex-col justify-between gap-2 sm:flex-row">

                          <h3 className="text-lg font-black">
                            100% Advance
                            <span className="ml-2 text-green-400">
                              — Complimentary Delivery
                            </span>
                          </h3>

                          <div className="text-right">

                            <div className="text-sm text-gray-500 line-through">
                              Rs.{" "}
                              {standardTotal.toLocaleString()}
                            </div>

                            <div className="font-black text-green-400">
                              Rs.{" "}
                              {prepaidTotal.toLocaleString()}
                            </div>

                          </div>

                        </div>

                        <p className="mt-3 text-sm leading-6 text-gray-400">
                          Complete your payment in
                          advance and receive complimentary
                          delivery, reflected as a Rs. 250
                          delivery benefit.
                        </p>

                        <div className="mt-4 rounded-lg border border-green-400/20 bg-green-400/5 p-3">

                          <div className="flex justify-between text-sm">

                            <span className="text-gray-400">
                              Prepayment Benefit
                            </span>

                            <span className="font-bold text-green-400">
                              − Rs. 250
                            </span>

                          </div>

                          <div className="mt-2 flex justify-between text-sm">

                            <span className="text-gray-400">
                              Delivery
                            </span>

                            <span className="font-bold text-green-400">
                              FREE
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </label>

                </div>

              </div>

              {/* ================================
                  PAYMENT METHOD
              ================================= */}

              <div className="pt-5">

                <h2 className="text-2xl font-black text-yellow-400">
                  Payment Method
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Select your preferred payment
                  service.
                </p>

                <div className="mt-5 grid gap-3">

                  {[
                    "Easypaisa",
                    "JazzCash",
                    "SadaPay",
                  ].map((method) => (

                    <label
                      key={method}
                      className={`cursor-pointer rounded-xl border p-4 transition ${
                        paymentMethod === method
                          ? "border-yellow-400 bg-yellow-400/10"
                          : "border-gray-700 bg-black hover:border-gray-500"
                      }`}
                    >

                      <div className="flex items-center">

                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={
                            paymentMethod ===
                            method
                          }
                          onChange={() =>
                            setPaymentMethod(
                              method as
                                | "SadaPay"
                                | "Easypaisa"
                                | "JazzCash"
                            )
                          }
                          className="h-5 w-5 accent-yellow-400"
                        />

                        <span className="ml-3 font-bold">
                          {method}
                        </span>

                      </div>

                    </label>

                  ))}

                </div>

              </div>

              {/* ================================
                  PAYMENT ACCOUNT DETAILS
              ================================= */}

              <div className="space-y-5">

                <div className="rounded-2xl border border-yellow-400/30 bg-black p-5">

                  <h3 className="font-black text-yellow-400">
                    {paymentMethod} Payment
                  </h3>

                  <p className="mt-3">
                    Account Title:{" "}
                    <strong>
                      {selectedPaymentAccount.title}
                    </strong>
                  </p>

                  <p className="mt-2">
                    Account Number:{" "}
                    <strong>
                      {selectedPaymentAccount.number}
                    </strong>
                  </p>

                  <p className="mt-3 text-sm text-gray-500">
                    Please transfer the required
                    amount using the selected
                    payment method and enter the
                    transaction details below.
                  </p>

                </div>

                {/* TRANSACTION ID */}

                <input
                  type="text"
                  placeholder="Transaction ID"
                  value={transactionId}
                  onChange={(event) =>
                    setTransactionId(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
                />

                {/* PAYMENT SCREENSHOT */}

                <CldUploadWidget
                  uploadPreset="smartcart_uploads"
                  onSuccess={(result: any) => {

                    const uploadedUrl =
                      result?.info?.secure_url;

                    if (uploadedUrl) {
                      setPaymentScreenshot(
                        uploadedUrl
                      );

                      toast.success(
                        "Payment screenshot uploaded!"
                      );
                    }
                  }}
                >
                  {({ open }) => (

                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full rounded-xl bg-blue-600 py-4 font-black text-white transition hover:bg-blue-500"
                    >
                      📷 Upload Payment Screenshot
                    </button>

                  )}
                </CldUploadWidget>

                {paymentScreenshot && (

                  <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 font-bold text-green-400">
                    ✅ Payment screenshot uploaded successfully
                  </div>

                )}

              </div>

            </div>

          </section>

          {/* ================================
              ORDER SUMMARY
          ================================= */}

          <aside className="h-fit rounded-3xl border border-yellow-400/20 bg-gray-900 p-6 lg:sticky lg:top-8 sm:p-8">

            <h2 className="text-3xl font-black text-yellow-400">
              Order Summary
            </h2>

            {cart.cartItems.length === 0 ? (

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

                {cart.cartItems.map((item) => (

                  <div
                    key={item.product.id}
                    className="flex justify-between gap-5 border-b border-gray-700 pb-4"
                  >

                    <div>

                      <p className="font-bold">
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity:{" "}
                        {item.quantity}
                      </p>

                    </div>

                    <p className="font-bold text-yellow-400">
                      Rs.{" "}
                      {(
                        Number(
                          item.product.price
                        ) * item.quantity
                      ).toLocaleString()}
                    </p>

                  </div>

                ))}

              </div>

            )}

            {/* ================================
                PRICE CALCULATION
            ================================= */}

            <div className="mt-8 space-y-4">

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Standard Order Value
                </span>

                <span>
                  Rs.{" "}
                  {standardTotal.toLocaleString()}
                </span>

              </div>

              {paymentPlan === "100%" && (

                <div className="flex justify-between">

                  <span className="text-green-400">
                    Prepayment Benefit
                  </span>

                  <span className="font-bold text-green-400">
                    − Rs. 250
                  </span>

                </div>

              )}

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Delivery
                </span>

                <span
                  className={
                    paymentPlan === "100%"
                      ? "font-bold text-green-400"
                      : "text-white"
                  }
                >
                  {deliveryText}
                </span>

              </div>

              <div className="border-t border-gray-700 pt-5">

                <div className="flex justify-between text-3xl font-black text-yellow-400">

                  <span>
                    Total
                  </span>

                  <span>
                    Rs.{" "}
                    {payableTotal.toLocaleString()}
                  </span>

                </div>

              </div>

              {/* PAY NOW */}

              <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-4">

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Pay Now
                  </span>

                  <span className="font-black text-yellow-400">
                    Rs.{" "}
                    {amountPayableNow.toLocaleString()}
                  </span>

                </div>

                {amountPayableLater > 0 && (

                  <div className="mt-2 flex justify-between">

                    <span className="text-gray-400">
                      Remaining on Delivery
                    </span>

                    <span className="font-bold">
                      Rs.{" "}
                      {amountPayableLater.toLocaleString()}
                    </span>

                  </div>

                )}

              </div>

            </div>

            {/* ================================
                PLACE ORDER
            ================================= */}

            <button
              type="button"
              onClick={placeOrder}
              disabled={
                loading ||
                cart.cartItems.length === 0
              }
              className="mt-8 w-full rounded-xl bg-yellow-400 py-4 text-lg font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Submitting Order..."
                : paymentPlan === "100%"
                ? "✅ Pay Rs. " +
                  payableTotal.toLocaleString() +
                  " & Place Order"
                : "✅ Pay Rs. " +
                  amountPayableNow.toLocaleString() +
                  " & Reserve Order"}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              By placing this order, you
              confirm that the payment
              information submitted is accurate.
            </p>

          </aside>

        </div>
      </main>
    </>
  );
}