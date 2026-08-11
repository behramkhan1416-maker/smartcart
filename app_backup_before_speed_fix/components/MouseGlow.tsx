"use client";

import { useEffect } from "react";

export default function MouseGlow() {
  useEffect(() => {
    // Disable MouseGlow on touch/mobile devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const glow = document.createElement("div");

    glow.style.position = "fixed";
    glow.style.width = "300px";
    glow.style.height = "300px";
    glow.style.borderRadius = "50%";
    glow.style.pointerEvents = "none";
    glow.style.zIndex = "9998";
    glow.style.background =
      "radial-gradient(circle, rgba(255,215,0,0.12) 0%, rgba(255,215,0,0) 70%)";
    glow.style.transform = "translate(-50%, -50%)";
    glow.style.left = "0";
    glow.style.top = "0";

    document.body.appendChild(glow);

    let animationFrame = 0;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
      glow.remove();
    };
  }, []);

  return null;
}