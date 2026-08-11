"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BackgroundScene = dynamic(
  () => import("./background/BackgroundScene"),
  { ssr: false }
);

const ShoppingIconsBackground = dynamic(
  () => import("./background/ShoppingIconsBackground"),
  { ssr: false }
);

const LuxurySpotlight = dynamic(
  () => import("./LuxurySpotlight"),
  { ssr: false }
);

const MouseGlow = dynamic(
  () => import("./MouseGlow"),
  { ssr: false }
);

const SmoothScroll = dynamic(
  () => import("./SmoothScroll"),
  { ssr: false }
);

const LoadingScreen = dynamic(
  () => import("./LoadingScreen"),
  { ssr: false }
);

export default function DesktopEffects() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  if (!desktop) return null;

  return (
    <>
      <BackgroundScene />
      <ShoppingIconsBackground />
      <LuxurySpotlight />
      <MouseGlow />
      <SmoothScroll />
      <LoadingScreen />
    </>
  );
}
