"use client";

import ShoppingIconsBackground from "./ShoppingIconsBackground";

export default function BackgroundScene() {
  return (
    <>
      {/* Pure Luxury Black Background */}
     <div className="fixed inset-0 bg-black -z-10" />

      {/* Animated Shopping Icons */}
     <div className="relative z-0">
  <ShoppingIconsBackground />
</div>
    </>
  );
}