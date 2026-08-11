"use client";

import { useEffect } from "react";
import { trackWebsiteVisit } from "../lib/analytics";

export default function VisitorTracker() {
  useEffect(() => {
    // Create one ID for this browser session
    const sessionKey = "smartcart_visit_tracked";

    // Do not count repeated page refreshes
    if (sessionStorage.getItem(sessionKey)) {
      return;
    }

    // Count this visitor
    trackWebsiteVisit();

    // Mark this session as counted
    sessionStorage.setItem(
      sessionKey,
      "true"
    );
  }, []);

  return null;
}