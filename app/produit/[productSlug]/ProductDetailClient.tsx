"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useOrder } from "@/context/OrderContext";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useOrder();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(product.minQuantity);
  const [selectedCustomization, setSelectedCustomization] = useState(product.customization[0]);
  const [imgError, setImgError] = useState(false);
  const [addedToOrder, setAddedToOrder] = useState(false);

  const handleAddToOrder = () => {
    addItem(product, selectedColor, quantity);
    setAddedToOrder(true);
    setTimeout(() => setAddedToOrder(false), 2000);
  };

  const waNumber = "212693567650";
  const waText = encodeURIComponent(
    `Bonjour Nova Gift,\nJe souhaite demander un devis pour :\nProduit : ${product.name}\nCatégorie : ${product.categoryName}\nCouleur : ${selectedColor.name}\nQuantité : ${quantity}\nPersonnalisation : ${selectedCustomization}\n\nNom :\nEntreprise :\nVille :\n\nMerci.`
  );

  const currentImage = selectedColor.image || product.images.default;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Left: Image Gallery */}
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div className="relative aspect-square bg-[#FAFAFA] rounded-2xl overflow-hidden border border-[#E8E8E8]">
          {!imgError ? (
            <Image
              src={currentImage}
              alt={`${product.name} — ${selectedColor.name}`}
              fill
              className="object-contain p-8 transition-all duration-300"
              onError={() => setImgError(true)}
              priority
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${selectedColor.value}22, ${selectedColor.value}55)` }}
            >
              <div className="w-24 h-24 rounded-full mb-4" style={{ background: selectedColor.value }} />
              <span className="font-body text-sm text-[#7A7A7A]">{product.name}</span>
              <span className="font-body text-xs text-[#9CA3AF] mt-1">{selectedColor.name}</span>
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => { setSelectedColor(color); setImgError(false); }}
              className={`relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                selectedColor.name === color.name
                  ? "border-gold shadow-md"
                  : "border-[#E8E8E8] hover:border-gold/50"
              }`}
              title={color.name}
            >
              <img
                src={color.image}
                alt={color.name}
                className="w-full h-full object-contain p-1.5"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) parent.style.background = color.value + "55";
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col">
        {/* Category link */}
        <Link
          href={`/catalogue/${product.categorySlug}`}
          className="font-body text-[10px] tracking-[2px] uppercase text-gold hover:text-gold-dark transition-colors w-fit"
        >
          {product.categoryName} →
        </Link>

        <h1 className="font-display font-light text-3xl md:text-4xl text-black mt-3 leading-tight">
          {product.name}
        </h1>

        {product.priceLabel && (
          <p className="font-display text-2xl text-gold mt-3">{product.priceLabel}</p>
        )}

        <p className="font-body font-light text-sm text-[#7A7A7A] mt-4 leading-relaxed">
          {product.longDescription}
        </p>

        {/* Variant Selector (image thumbnails) */}
        {product.colors.length > 1 && (
          <div className="mt-8">
            <span className="font-body font-semibold text-xs uppercase tracking-[1.5px] text-black block mb-3">Couleur :</span>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => { setSelectedColor(color); setImgError(false); }}
                  title={color.name}
                  aria-label={color.name}
                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden bg-[#F4F6FA] transition-all cursor-pointer hover:scale-105 ${
                    selectedColor.name === color.name
                      ? "border-gold scale-105 shadow-lg"
                      : "border-[#E8E8E8] hover:border-gold/50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={color.image} alt={color.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Customization Method Selector */}
        <div className="mt-6">
          <span className="font-body font-semibold text-xs uppercase tracking-[1.5px] text-black block mb-3">Personnalisation :</span>
          <div className="flex flex-wrap gap-2">
            {product.customization.map((method) => (
              <button
                key={method}
                onClick={() => setSelectedCustomization(method)}
                className={`px-4 py-2 rounded-lg border text-xs font-body cursor-pointer transition-all ${
                  selectedCustomization === method
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-[#7A7A7A] border-[#E8E8E8] hover:border-gold hover:text-gold"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-6">
          <span className="font-body font-semibold text-xs uppercase tracking-[1.5px] text-black block mb-3">
            Quantité (min. {product.minQuantity} pcs) :
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(product.minQuantity, quantity - (quantity <= product.minQuantity ? 0 : Math.ceil(product.minQuantity / 10))))}
              className="w-10 h-10 border border-[#E8E8E8] rounded-lg text-navy font-semibold text-lg flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer"
            >−</button>
            <span className="font-body font-semibold text-base w-16 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + Math.ceil(product.minQuantity / 10))}
              className="w-10 h-10 border border-[#E8E8E8] rounded-lg text-navy font-semibold text-lg flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer"
            >+</button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          {/* Primary: Add to shared order panel */}
          <button
            type="button"
            onClick={handleAddToOrder}
            className={`w-full font-body font-semibold text-sm uppercase tracking-[1.5px] py-4 px-6 rounded-xl text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${
              addedToOrder
                ? "bg-[#25D366] text-white"
                : "bg-navy hover:bg-navy/90 text-white"
            }`}
          >
            {addedToOrder ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Ajouté au devis !
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Ajouter au devis groupé
              </>
            )}
          </button>

          {/* Secondary: Direct single-product WhatsApp */}
          <div className="flex gap-3">
            <a
              href={`https://wa.me/${waNumber}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] text-white font-body font-semibold text-sm uppercase tracking-[1.5px] py-3.5 px-4 rounded-xl text-center hover:bg-[#1ea850] transition-all flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.59 7.449h-.004a9.935 9.935 0 01-5.029-1.367l-.361-.214-3.741.982.998-3.648-.235-.374a9.927 9.927 0 01-1.529-5.34c.001-5.495 4.474-9.963 9.98-9.963 2.668 0 5.175 1.039 7.063 2.927a9.93 9.93 0 012.92 7.063c-.001 5.496-4.474 9.964-9.962 9.964M19.484 4.44A11.806 11.806 0 0011.96 1.21c-6.515.001-11.82 5.305-11.821 11.82 0 2.083.543 4.119 1.575 5.917L.785 23.52l4.726-1.24a11.87 11.87 0 005.666 1.44h.005c6.514 0 11.819-5.304 11.82-11.819a11.766 11.766 0 00-3.517-8.461" /></svg>
              Devis rapide WhatsApp
            </a>
            <a
              href={`mailto:contact@novagift.me?subject=Devis ${product.name}&body=${encodeURIComponent(`Bonjour,\n\nJe souhaite un devis pour : ${product.name}\nCouleur : ${selectedColor.name}\nQuantité : ${quantity}\nPersonnalisation : ${selectedCustomization}\n\nNom :\nEntreprise :\nVille :\n\nMerci.`)}`}
              className="border border-[#E8E8E8] hover:border-gold text-navy font-body font-semibold text-sm uppercase tracking-[1px] py-3.5 px-5 rounded-xl text-center hover:text-gold transition-all whitespace-nowrap"
            >
              Email
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="mt-10 pt-8 border-t border-[#E8E8E8]">
          <h3 className="font-body font-semibold text-xs uppercase tracking-[2px] text-black mb-4">Caractéristiques</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0 mt-1.5" />
                <span className="font-body font-light text-xs text-[#555555]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Delivery info */}
        <div className="mt-6 pt-6 border-t border-[#E8E8E8] flex flex-wrap gap-4">
          {[
            { icon: "⚡", text: "Devis sous 48h" },
            { icon: "🇲🇦", text: "Livraison Maroc" },
            { icon: "✏️", text: "BAT offert" }
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span className="text-base">{item.icon}</span>
              <span className="font-body text-xs text-[#555555]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
