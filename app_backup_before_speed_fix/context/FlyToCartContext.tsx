"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type FlyItem = {
  image: string;
  startX: number;
  startY: number;
};

type FlyContextType = {
  fly: FlyItem | null;
  setFly: React.Dispatch<React.SetStateAction<FlyItem | null>>;
  cartRef: React.RefObject<HTMLDivElement | null>;
};

const FlyContext = createContext<FlyContextType | null>(null);

export function useFlyToCart() {
  return useContext(FlyContext)!;
}

export default function FlyToCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fly, setFly] = useState<FlyItem | null>(null);

  const cartRef = useRef<HTMLDivElement>(null);

  return (
    <FlyContext.Provider
      value={{
        fly,
        setFly,
        cartRef,
      }}
    >
      {children}
    </FlyContext.Provider>
  );
}