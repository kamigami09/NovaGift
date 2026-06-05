"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Product, ProductColor } from "@/data/products";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface OrderItem {
  key: string; // `${productId}__${colorName}` — unique per product+color combo
  productId: string;
  productName: string;
  productSlug: string;
  categoryName: string;
  selectedColor: ProductColor;
  quantity: number;
  minQuantity: number;
  image: string;
}

interface OrderContextValue {
  items: OrderItem[];
  addItem: (product: Product, selectedColor: ProductColor, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, delta: number) => void;
  clearOrder: () => void;
  generateWhatsAppUrl: (name: string, company: string, city: string) => string;
  totalItems: number;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const OrderContext = createContext<OrderContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);

  /** Add a product to the order. If same product + same color exists, increase quantity. */
  const addItem = useCallback(
    (product: Product, selectedColor: ProductColor, quantity?: number) => {
      const key = `${product.id}__${selectedColor.name}`;
      const qty = quantity ?? product.minQuantity;

      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.key === key);
        if (existingIndex !== -1) {
          // Merge: increase quantity on existing line
          const next = [...prev];
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: next[existingIndex].quantity + qty,
          };
          return next;
        }
        // New line
        const newItem: OrderItem = {
          key,
          productId: product.id,
          productName: product.name,
          productSlug: product.slug,
          categoryName: product.categoryName,
          selectedColor,
          quantity: qty,
          minQuantity: product.minQuantity,
          image: selectedColor.image || product.images.default,
        };
        return [...prev, newItem];
      });
    },
    []
  );

  /** Remove a single line by key. */
  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  /** Increase or decrease quantity for a line. Cannot go below minQuantity. */
  const updateQuantity = useCallback((key: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, quantity: Math.max(item.minQuantity, item.quantity + delta) }
          : item
      )
    );
  }, []);

  /** Clear all lines. */
  const clearOrder = useCallback(() => setItems([]), []);

  /** Generate the final WhatsApp URL with all products in one message. */
  const generateWhatsAppUrl = useCallback(
    (name: string, company: string, city: string) => {
      const phone = "212693567650";
      let text = "Bonjour Nova Gift,\nJe souhaite demander un devis pour :\n";

      items.forEach((item, index) => {
        text += `\n${index + 1}. ${item.productName}\n`;
        text += `   Catégorie : ${item.categoryName}\n`;
        text += `   Couleur : ${item.selectedColor.name}\n`;
        text += `   Quantité : ${item.quantity}\n`;
      });

      text += `\nCoordonnées :\n`;
      text += `Nom : ${name}\n`;
      text += `Entreprise : ${company || "—"}\n`;
      text += `Ville : ${city || "—"}\n`;
      text += "\nMerci.";

      return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    },
    [items]
  );

  const totalItems = items.length;

  return (
    <OrderContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearOrder, generateWhatsAppUrl, totalItems }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrder must be used inside <OrderProvider>");
  }
  return ctx;
}
