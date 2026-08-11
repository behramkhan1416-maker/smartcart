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
        const snapshot = await getDocs(collection(db, "products"));

        if (!mounted) return;

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        setProducts(list);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
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
