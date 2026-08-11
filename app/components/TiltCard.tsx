"use client";

import { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
}

export default function TiltCard({ children }: TiltCardProps) {
  return <div className="h-full w-full">{children}</div>;
}
