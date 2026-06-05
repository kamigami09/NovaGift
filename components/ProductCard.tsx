"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, ProductColor } from "@/data/products";
import { useOrder } from "@/context/OrderContext";

interface ProductCardProps {
  product: Product;
  /**
   * "homepage" (default) — "Demander" navigates to /produit/[slug].
   * "catalogue" — "Demander" adds the product to the shared order panel.
   */
  mode?: "homepage" | "catalogue";
}

export default function ProductCard({ product, mode = "homepage" }: ProductCardProps) {
  const { addItem } = useOrder();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors && product.colors.length > 0
      ? product.colors[0]
      : { name: "", value: "", image: "", alt: "" }
  );
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedColor, product.minQuantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      {/* Product Image Link */}
      <Link
        href={`/produit/${product.slug}`}
        className="block aspect-square w-full overflow-hidden bg-[#F4F6FA] relative cursor-pointer"
      >
        {!imageError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={selectedColor?.image || product.images.default}
            alt={`${product.name} - ${product.categoryName} personnalisé Maroc`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative select-none">
            <div
              className="absolute inset-0 opacity-10 transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${selectedColor?.value || "#1C2B4A"} 0%, #C9A020 100%)`
              }}
            />
            <svg
              className="mb-4 stroke-navy"
              width="48"
              height="48"
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
            <span className="font-display font-medium text-navy text-xs uppercase tracking-wider line-clamp-2 px-4 z-10">
              {product.name}
            </span>
            <span className="font-body text-[10px] text-gold uppercase tracking-widest mt-1 font-semibold z-10">
              {selectedColor?.name || "Standard"}
            </span>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <span className="font-body font-light text-[10px] tracking-[1px] uppercase text-[#7A7A7A]">
          {product.categoryName}
        </span>
        <Link href={`/produit/${product.slug}`} className="block mt-1">
          <h3 className="font-body font-medium text-sm text-black line-clamp-1 group-hover:text-gold cursor-pointer transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.priceLabel && (
          <span className="font-body font-semibold text-sm text-gold mt-1">{product.priceLabel}</span>
        )}

        {/* Variant thumbnails */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex gap-2 mt-3 items-center flex-wrap">
            {product.colors.slice(0, 5).map((color) => (
              <button
                key={color.image}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(color);
                  setImageError(false);
                }}
                className={`w-7 h-7 rounded-md overflow-hidden border transition-all cursor-pointer ${
                  selectedColor.image === color.image
                    ? "border-gold ring-1 ring-gold"
                    : "border-black/10 hover:border-gold/50"
                }`}
                title={color.name}
                type="button"
                aria-label={color.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={color.image} alt={color.alt} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-[#7A7A7A] font-body">+{product.colors.length - 5}</span>
            )}
          </div>
        )}

        {/* Actions Section */}
        <div className="mt-auto pt-4 border-t border-[#E8E8E8] flex flex-col gap-3">
          <div className="flex items-center justify-between text-[11px] font-body text-[#7A7A7A] uppercase tracking-[0.5px]">
            <span>Min. {product.minQuantity} pcs</span>
            <span className="font-semibold text-gold">{product.customization[0]}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Details Link */}
            <Link
              href={`/produit/${product.slug}`}
              className="flex-1 text-center font-body font-semibold text-[10px] tracking-[1px] uppercase text-navy border border-navy/20 hover:border-navy py-2.5 rounded-md transition-all whitespace-nowrap"
            >
              Détails
            </Link>

            {/* ── Demander button — behaviour depends on mode ── */}
            {mode === "homepage" ? (
              // Homepage: navigate to product page
              <Link
                href={`/produit/${product.slug}`}
                className="flex-1 font-body font-semibold text-[10px] tracking-[1px] uppercase py-2.5 px-3 rounded-md bg-gold hover:bg-gold-dark text-white transition-all whitespace-nowrap text-center"
              >
                Demander
              </Link>
            ) : (
              // Catalogue / category pages: add to shared order panel
              <button
                type="button"
                onClick={handleAddToOrder}
                className={`flex-1 font-body font-semibold text-[10px] tracking-[1px] uppercase py-2.5 px-3 rounded-md transition-all cursor-pointer whitespace-nowrap text-center ${
                  added
                    ? "bg-[#25D366] text-white"
                    : "bg-gold hover:bg-gold-dark text-white"
                }`}
              >
                {added ? "✓ Ajouté" : "+ Devis"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
