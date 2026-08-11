import {
  collection,
  doc,
  increment,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "./firebase";

// Track a website visit
export async function trackWebsiteVisit() {
  try {
    const analyticsRef = doc(
      db,
      "analytics",
      "website"
    );

    await setDoc(
      analyticsRef,
      {
        totalViews: increment(1),
        lastVisit: serverTimestamp(),
      },
      {
        merge: true,
      }
    );
  } catch (error) {
    console.error(
      "Analytics visit error:",
      error
    );
  }
}

// Track a website click
export async function trackWebsiteClick(
  clickName: string
) {
  try {
    const analyticsRef = doc(
      db,
      "analytics",
      "website"
    );

    await setDoc(
      analyticsRef,
      {
        totalClicks: increment(1),
        lastClick: clickName,
        lastClickTime:
          serverTimestamp(),
      },
      {
        merge: true,
      }
    );
  } catch (error) {
    console.error(
      "Analytics click error:",
      error
    );
  }
}

// Track a product page view
export async function trackProductView(
  productId: string
) {
  try {
    const productAnalyticsRef = doc(
      db,
      "analytics",
      "products",
      productId
    );

    await setDoc(
      productAnalyticsRef,
      {
        views: increment(1),
        lastViewed:
          serverTimestamp(),
      },
      {
        merge: true,
      }
    );
  } catch (error) {
    console.error(
      "Product view error:",
      error
    );
  }
}