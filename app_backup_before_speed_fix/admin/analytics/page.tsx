"use client";

import { useEffect, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

type AnalyticsData = {
  totalViews?: number;
  totalClicks?: number;
  lastClick?: string;
  lastVisit?: {
    toDate?: () => Date;
  };
};

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

export default function AnalyticsPage() {
  // Website analytics
  const [totalViews, setTotalViews] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [productViews, setProductViews] = useState(0);

  const [lastClick, setLastClick] =
    useState("No clicks yet");

  const [lastVisit, setLastVisit] =
    useState("No visits yet");

  // Cart analytics
  const [cartEvents, setCartEvents] =
    useState<CartEvent[]>([]);

  // Page state
  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  async function loadAnalytics() {
    try {
      setLoading(true);
      setErrorMessage("");

      /*
      ==================================
      WEBSITE ANALYTICS
      ==================================
      */

      const websiteRef = doc(
        db,
        "analytics",
        "website"
      );

      const websiteSnapshot =
        await getDoc(websiteRef);

      if (websiteSnapshot.exists()) {
        const websiteData =
          websiteSnapshot.data() as
            AnalyticsData;

        setTotalViews(
          Number(
            websiteData.totalViews || 0
          )
        );

        setTotalClicks(
          Number(
            websiteData.totalClicks || 0
          )
        );

        setLastClick(
          websiteData.lastClick ||
            "No clicks yet"
        );

        if (
          websiteData.lastVisit?.toDate
        ) {
          setLastVisit(
            websiteData.lastVisit
              .toDate()
              .toLocaleString()
          );
        }
      } else {
        setTotalViews(0);
        setTotalClicks(0);
        setLastClick(
          "No clicks yet"
        );
        setLastVisit(
          "No visits yet"
        );
      }

      /*
      ==================================
      PRODUCT VIEWS
      ==================================
      */

      const productAnalyticsSnapshot =
        await getDocs(
          collection(
            db,
            "productAnalytics"
          )
        );

      let allProductViews = 0;

      productAnalyticsSnapshot.forEach(
        (productDocument) => {
          const productData =
            productDocument.data();

          allProductViews += Number(
            productData.views || 0
          );
        }
      );

      setProductViews(
        allProductViews
      );

      /*
      ==================================
      ADD-TO-CART EVENTS
      ==================================
      */

      const cartEventsQuery = query(
        collection(
          db,
          "cartEvents"
        ),
        orderBy(
          "createdAt",
          "desc"
        )
      );

      const cartSnapshot =
        await getDocs(
          cartEventsQuery
        );

      const events: CartEvent[] =
        cartSnapshot.docs.map(
          (document) => ({
            id: document.id,

            ...(document.data() as
              Omit<
                CartEvent,
                "id"
              >),
          })
        );

      setCartEvents(events);

    } catch (error) {
      console.error(
        "Analytics loading error:",
        error
      );

      setErrorMessage(
        "Some analytics data could not be loaded. Check Firebase rules and Firestore collections."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  /*
  ==================================
  CART CALCULATIONS
  ==================================
  */

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

  /*
  ==================================
  LOADING SCREEN
  ==================================
  */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />

          <p className="mt-5 text-lg font-bold">
            Loading SmartCart analytics...
          </p>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 sm:py-16">

      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADING */}

        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              SmartCart Admin
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-6xl">
              Website Analytics
            </h1>

            <p className="mt-4 max-w-3xl text-gray-400">
              Monitor website visitors,
              clicks, product views and
              customer add-to-cart activity.
            </p>

          </div>

          <button
            type="button"
            onClick={
              loadAnalytics
            }
            className="rounded-xl bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-yellow-300"
          >
            Refresh Report
          </button>

        </div>

        {/* ERROR MESSAGE */}

        {errorMessage && (

          <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">

            <p className="font-bold text-red-400">
              {errorMessage}
            </p>

          </div>

        )}

        {/* WEBSITE ANALYTICS */}

        <h2 className="mb-5 text-2xl font-black">
          Website Performance
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* WEBSITE VIEWS */}

          <div className="rounded-3xl border border-yellow-400/30 bg-gray-900 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Website Views
            </p>

            <div className="mt-5 flex items-end justify-between">

              <h2 className="text-5xl font-black text-yellow-400">
                {totalViews}
              </h2>

              <span className="text-4xl">
                👁️
              </span>

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Total visitor sessions
            </p>

          </div>

          {/* WEBSITE CLICKS */}

          <div className="rounded-3xl border border-white/10 bg-gray-900 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Website Clicks
            </p>

            <div className="mt-5 flex items-end justify-between">

              <h2 className="text-5xl font-black">
                {totalClicks}
              </h2>

              <span className="text-4xl">
                🖱️
              </span>

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Tracked website interactions
            </p>

          </div>

          {/* PRODUCT VIEWS */}

          <div className="rounded-3xl border border-white/10 bg-gray-900 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Product Views
            </p>

            <div className="mt-5 flex items-end justify-between">

              <h2 className="text-5xl font-black">
                {productViews}
              </h2>

              <span className="text-4xl">
                📦
              </span>

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Total product page visits
            </p>

          </div>

        </div>

        {/* CART ANALYTICS */}

        <h2 className="mb-5 mt-12 text-2xl font-black">
          Customer Cart Activity
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

          {/* ADD TO CART */}

          <div className="rounded-3xl border border-green-500/30 bg-gray-900 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Add to Cart
            </p>

            <div className="mt-5 flex items-end justify-between">

              <h2 className="text-5xl font-black text-green-400">
                {totalAddToCart}
              </h2>

              <span className="text-4xl">
                🛒
              </span>

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Total products added
            </p>

          </div>

          {/* UNIQUE VISITORS */}

          <div className="rounded-3xl border border-blue-500/30 bg-gray-900 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Cart Customers
            </p>

            <div className="mt-5 flex items-end justify-between">

              <h2 className="text-5xl font-black text-blue-400">
                {uniqueVisitors}
              </h2>

              <span className="text-4xl">
                👤
              </span>

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Unique anonymous visitors
            </p>

          </div>

          {/* PRODUCTS ADDED */}

          <div className="rounded-3xl border border-purple-500/30 bg-gray-900 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Products Added
            </p>

            <div className="mt-5 flex items-end justify-between">

              <h2 className="text-5xl font-black text-purple-400">
                {uniqueProducts}
              </h2>

              <span className="text-4xl">
                📦
              </span>

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Different products added
            </p>

          </div>

        </div>

        {/* LAST ACTIVITY */}

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* LAST VISIT */}

          <div className="rounded-3xl border border-white/10 bg-gray-900 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Last Website Visit
            </p>

            <p className="mt-4 wrap-break-word text-xl font-bold">
              {lastVisit}
            </p>

          </div>

          {/* LAST CLICK */}

          <div className="rounded-3xl border border-white/10 bg-gray-900 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Last Tracked Click
            </p>

            <p className="mt-4 wrap-break-word text-xl font-bold text-yellow-400">
              {lastClick}
            </p>

          </div>

        </div>

        {/* CART EVENT TABLE */}

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gray-900">

          <div className="border-b border-white/10 p-6">

            <h2 className="text-2xl font-black">
              Customer Add-to-Cart Activity
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Every event is recorded
              when a customer presses
              the Add to Cart button.
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
                Add a product to the cart,
                then press Refresh Report.
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
                        event.createdAt
                          ?.toDate
                          ? event
                              .createdAt
                              .toDate()
                              .toLocaleString()
                          : "Saving date...";

                      return (

                        <tr
                          key={
                            event.id
                          }
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

                                <p className="font-bold">

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