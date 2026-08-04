"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../lib/firebase";
import { CartItem } from "../data/products";

type CartContextType = {
  cartItems: CartItem[];

  setCartItems: React.Dispatch<
    React.SetStateAction<CartItem[]>
  >;

  addToCart: (
    product: CartItem["product"]
  ) => Promise<void>;
};

export const CartContext =
  createContext<CartContextType | null>(null);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart =
      localStorage.getItem(
        "smartcart-cart"
      );

    if (savedCart) {
      try {
        setCartItems(
          JSON.parse(savedCart)
        );
      } catch (error) {
        console.error(
          "Could not load saved cart:",
          error
        );
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(
      "smartcart-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // Create one anonymous visitor ID
  function getVisitorId() {
    let visitorId =
      localStorage.getItem(
        "smartcart-visitor-id"
      );

    if (!visitorId) {
      visitorId =
        `visitor_${crypto.randomUUID()}`;

      localStorage.setItem(
        "smartcart-visitor-id",
        visitorId
      );
    }

    return visitorId;
  }

  // Add product and save tracking data
  async function addToCart(
    product: CartItem["product"]
  ) {
    // Add product to cart
    setCartItems(
      (currentCart) => {
        const existingItem =
          currentCart.find(
            (item) =>
              item.product.id ===
              product.id
          );

        if (existingItem) {
          return currentCart.map(
            (item) =>
              item.product.id ===
              product.id
                ? {
                    ...item,
                    quantity:
                      item.quantity + 1,
                  }
                : item
          );
        }

        return [
          ...currentCart,
          {
            product,
            quantity: 1,
          },
        ];
      }
    );

    // Save Add-to-Cart event
    try {
      const visitorId =
        getVisitorId();

      await addDoc(
        collection(
          db,
          "cartEvents"
        ),
        {
          visitorId,

          productId:
            product.id,

          productName:
            product.name,

          productPrice:
            Number(
              product.price
            ),

          productImage:
            product.image,

          mainCategory:
            product.mainCategory ||
            "",

          subCategory:
            product.subCategory ||
            product.category ||
            "",

          quantity: 1,

          eventType:
            "add_to_cart",

          createdAt:
            serverTimestamp(),
        }
      );
    } catch (error) {
      console.error(
        "Cart tracking error:",
        error
      );
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}