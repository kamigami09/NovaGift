"use client";

import React, { useState, useEffect } from "react";
import { Product, ProductColor } from "@/data/products";

/**
 * QuickQuoteModal (formerly ProductModal)
 * Serves as a quick overlay sheet for B2B users to configure product options (color, quantity)
 * and add it directly to their quote basket without navigating away from the current page.
 */
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToOrder: (product: Product, quantity: number, colorName?: string) => void;
  orderItems: Map<string, any>;
}

export default function ProductModal({
  isOpen,
  onClose,
  product,
  onAddToOrder,
  orderItems
}: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  // Sync color & quantity when modal opens or product changes
  useEffect(() => {
    if (product) {
      const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : null;
      setSelectedColor(defaultColor);
      
      const existing = orderItems.get(product.id);
      if (existing) {
        setQuantity(existing.quantity);
        if (existing.colorName) {
          const matchedColor = product.colors.find(c => c.name === existing.colorName);
          if (matchedColor) setSelectedColor(matchedColor);
        }
      } else {
        setQuantity(1);
      }
      setImageError(false);
    }
  }, [product, isOpen, orderItems]);

  // Handle ESC key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleQtyChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(9999, prev + delta)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      setQuantity(Math.min(9999, val));
    } else {
      setQuantity(1);
    }
  };

  const handleAdd = () => {
    onAddToOrder(product, quantity, selectedColor?.name);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 md:p-6 transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-[#E8E8E8] rounded-2xl max-w-[900px] w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 relative shadow-2xl animate-[fadeUp_0.4s_ease_forwards]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 font-display text-2xl text-[#7A7A7A] hover:text-gold hover:border-gold border border-[#E8E8E8] rounded-full w-10 h-10 flex items-center justify-center bg-white z-20 transition-all cursor-pointer"
          aria-label="Fermer la boîte de dialogue"
          type="button"
        >
          &times;
        </button>

        {/* Left Side: Product Image */}
        <div className="border-r border-[#E8E8E8] bg-[#F4F6FA] flex items-center justify-center relative min-h-[300px] md:min-h-full">
          {!imageError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={selectedColor?.image || product.images.default}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Elegant SVG Graphic representing product */
            <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center absolute inset-0 select-none">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  background: `linear-gradient(135deg, ${selectedColor?.value || "#1C2B4A"} 0%, #C9A020 100%)`
                }}
              />
              <svg
                className="mb-4 stroke-navy"
                width="72"
                height="72"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <span className="font-display font-medium text-navy text-sm uppercase tracking-widest px-8 z-10">
                {product.name}
              </span>
              <span className="font-body text-xs text-gold uppercase tracking-wider mt-1.5 font-bold z-10">
                {selectedColor?.name || "Standard"}
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Details Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <span className="font-body font-light text-xs tracking-[2px] uppercase text-gold">
            {product.category}
          </span>
          <h3 id="modal-title" className="font-display font-light text-2xl md:text-3xl text-black mt-2 leading-snug">
            {product.name}
          </h3>
          <p className="font-body font-light text-sm text-[#7A7A7A] mt-4 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Features list */}
          {product.features && product.features.length > 0 && (
            <div className="mt-6 flex flex-col gap-2.5">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                  <span className="font-body font-light text-xs md:text-sm text-black leading-tight">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Color Selection Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <span className="font-body font-medium text-xs text-black block mb-2.5">
                Couleur : <span className="font-light text-[#7A7A7A]">{selectedColor?.name}</span>
              </span>
              <div className="flex gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-[22px] h-[22px] rounded-full border transition-all relative ${
                      selectedColor?.name === color.name
                        ? "border-gold scale-110 shadow-sm"
                        : "border-black/10 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    type="button"
                    aria-label={`Couleur ${color.name}`}
                  >
                    {selectedColor?.name === color.name && (
                      <span className="absolute inset-0 rounded-full border-2 border-white pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector and Add Button */}
          <div className="mt-8 pt-6 border-t border-[#E8E8E8] flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-body font-medium text-xs text-black shrink-0">Quantité :</span>
              <div className="flex items-center border border-[#E8E8E8] rounded-lg overflow-hidden bg-[#F1F1F1]">
                <button
                  className="w-9 h-9 flex items-center justify-center text-lg font-semibold text-black bg-transparent border-none cursor-pointer hover:bg-gold hover:text-white transition-colors"
                  onClick={() => handleQtyChange(-1)}
                  type="button"
                  aria-label="Réduire la quantité"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                  className="w-12 h-9 text-center border-none bg-white font-body text-xs font-semibold text-black outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="1"
                  max="9999"
                />
                <button
                  className="w-9 h-9 flex items-center justify-center text-lg font-semibold text-black bg-transparent border-none cursor-pointer hover:bg-gold hover:text-white transition-colors"
                  onClick={() => handleQtyChange(1)}
                  type="button"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="bg-gold text-white font-body font-semibold text-xs tracking-[2px] uppercase py-3.5 px-8 rounded-lg hover:bg-gold-dark transform hover:-translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2 self-start"
              type="button"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Ajouter à la Commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
