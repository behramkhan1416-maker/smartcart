"use client";

import { ReactNode } from "react";

interface LuxuryProductCardProps {
  children: ReactNode;
}

export default function LuxuryProductCard({
  children,
}: LuxuryProductCardProps) {
  return (
    <div className="h-full w-full">
      {children}
    </div>
  );
}