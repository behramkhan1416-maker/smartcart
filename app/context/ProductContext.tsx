"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Product } from "../data/products";

type ProductContextType = {
  products: Product[];
  loading: boolean;
};

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
});

export function useProducts() {
  return useContext(ProductContext);
}

const CACHE_KEY = "smartcart_products_cache_v1";
const CACHE_TIME_KEY = "smartcart_products_cache_time_v1";
const CACHE_TTL = 5 * 60 * 1000;

export default function ProductProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        // First try session/browser cache.
        try {
          const cached = sessionStorage.getItem(CACHE_KEY);
          const cachedTime = Number(
            sessionStorage.getItem(CACHE_TIME_KEY) || 0
          );

          if (
            cached &&
            cachedTime &&
            Date.now() - cachedTime < CACHE_TTL
          ) {
            const parsed = JSON.parse(cached) as Product[];

            if (Array.isArray(parsed) && parsed.length > 0) {
              if (mounted) {
                setProducts(parsed);
                setLoading(false);
              }
              return;
            }
          }
        } catch {
          // Ignore cache errors.
        }

        const snapshot = await getDocs(
          collection(db, "products")
        );

        if (!mounted) return;

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        setProducts(list);
        setLoading(false);

        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify(list)
          );

          sessionStorage.setItem(
            CACHE_TIME_KEY,
            String(Date.now())
          );
        } catch {
          // Ignore storage errors.
        }
      } catch (error) {
        console.error("Failed to load products:", error);

        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
}
