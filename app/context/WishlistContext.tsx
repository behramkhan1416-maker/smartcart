"use client";

import {
  createContext,
  useState,
  ReactNode,
} from "react";
import { Product } from "../data/products";

type WishlistContextType = {
  wishlist: Product[];
  setWishlist: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const WishlistContext =
  createContext<WishlistContextType | null>(null);

export default function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}