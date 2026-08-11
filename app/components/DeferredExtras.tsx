"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VisitorTracker = dynamic(
  () => import("./VisitorTracker"),
  { ssr: false }
);

const FlyingImage = dynamic(
  () => import("./FlyingImage"),
  { ssr: false }
);

export default function DeferredExtras() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (!cancelled) setReady(true);
    };

    if ("requestIdleCallback" in window) {
      const id = (window as typeof window & {
        requestIdleCallback: (cb: () => void) => number;
      }).requestIdleCallback(run);

      return () => {
        cancelled = true;
        if ("cancelIdleCallback" in window) {
          (window as typeof window & {
            cancelIdleCallback: (id: number) => void;
          }).cancelIdleCallback(id);
        }
      };
    }

    const timer = setTimeout(run, 1500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <VisitorTracker />
      <div className="hidden md:block">
        <FlyingImage />
      </div>
    </>
  );
}

