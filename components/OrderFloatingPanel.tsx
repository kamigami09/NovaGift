"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useOrder } from "@/context/OrderContext";

export default function OrderFloatingPanel() {
  const { items, removeItem, updateQuantity, clearOrder, generateWhatsAppUrl, totalItems } =
    useOrder();

  const [isExpanded, setIsExpanded] = useState(false);

  // Allow other components (e.g. the navbar devis icon) to open the panel
  useEffect(() => {
    const open = () => setIsExpanded(true);
    window.addEventListener("novagift:open-devis", open);
    return () => window.removeEventListener("novagift:open-devis", open);
  }, []);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // Don't render when cart is empty
  if (totalItems === 0) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Veuillez renseigner votre nom pour envoyer la demande.");
      return;
    }
    const url = generateWhatsAppUrl(name.trim(), company.trim(), city.trim());
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleClear = () => {
    if (confirm("Voulez-vous vraiment vider votre devis ?")) {
      clearOrder();
      setIsExpanded(false);
    }
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[1500] w-[94%] max-w-[660px] bg-white rounded-2xl border-2 border-[#25D366] shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isExpanded ? "max-h-[620px]" : "max-h-[68px]"
      }`}
    >
      {/* ── Header (always visible) ─────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#25D366] to-[#1ea850] cursor-pointer select-none text-white"
      >
        <div className="flex items-center gap-3">
          {/* Cart icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="font-body font-semibold text-sm md:text-base">
            Mon Devis
          </span>
          {/* Badge */}
          <span className="bg-white text-[#1ea850] text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center leading-none">
            {totalItems}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-body text-[11px] text-white/80 hidden sm:block">
            {totalItems} produit{totalItems > 1 ? "s" : ""} sélectionné{totalItems > 1 ? "s" : ""}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </button>

      {/* ── Body (expanded) ─────────────────────────────────────────────── */}
      {isExpanded && (
        <div className="flex flex-col overflow-y-auto max-h-[540px]">
          {/* Items list */}
          <div className="flex flex-col divide-y divide-[#F0F0F0] px-4 py-2 max-h-[260px] overflow-y-auto">
            {items.map((item) => {
              const step = Math.max(1, Math.ceil(item.minQuantity / 10));
              const hasImgError = imgErrors[item.key];

              return (
                <div key={item.key} className="flex items-center gap-3 py-3">
                  {/* Thumbnail */}
                  <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-[#E8E8E8] bg-[#FAFAFA] flex items-center justify-center">
                    {!hasImgError ? (
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-contain p-1"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [item.key]: true }))
                        }
                      />
                    ) : (
                      <div
                        className="w-full h-full rounded-lg"
                        style={{ background: item.selectedColor.value + "55" }}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-body font-semibold text-xs text-black truncate">
                      {item.productName}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div
                        className="w-3 h-3 rounded-full border border-white shadow-sm shrink-0"
                        style={{ background: item.selectedColor.value }}
                        title={item.selectedColor.name}
                      />
                      <span className="font-body text-[10px] text-[#7A7A7A] truncate">
                        {item.categoryName} · {item.selectedColor.name}
                      </span>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, -step)}
                      className="w-6 h-6 rounded border border-[#E8E8E8] hover:border-gold hover:text-gold text-[#7A7A7A] text-sm flex items-center justify-center cursor-pointer transition-colors"
                    >
                      −
                    </button>
                    <span className="font-body font-semibold text-xs text-navy w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, step)}
                      className="w-6 h-6 rounded border border-[#E8E8E8] hover:border-gold hover:text-gold text-[#7A7A7A] text-sm flex items-center justify-center cursor-pointer transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="w-7 h-7 rounded-full border border-[#E8E8E8] hover:border-red-400 hover:text-red-500 hover:bg-red-50 text-[#9CA3AF] flex items-center justify-center cursor-pointer transition-colors shrink-0 text-sm"
                    title="Supprimer"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          {/* Contact form + send */}
          <form
            onSubmit={handleSend}
            className="bg-[#F8FBF8] border-t border-[#E8E8E8] px-4 py-4 flex flex-col gap-3"
          >
            <p className="font-body font-semibold text-[10px] uppercase tracking-[1.5px] text-navy">
              Vos coordonnées
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom *"
                required
                className="bg-white border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-xs font-body text-black outline-none focus:border-[#25D366] transition-colors"
              />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Entreprise"
                className="bg-white border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-xs font-body text-black outline-none focus:border-[#25D366] transition-colors"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ville"
                className="bg-white border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-xs font-body text-black outline-none focus:border-[#25D366] transition-colors"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-[#25D366] hover:bg-[#1ea850] text-white font-body font-semibold text-xs uppercase tracking-[1px] py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {/* WhatsApp icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.59 7.449h-.004a9.935 9.935 0 01-5.029-1.367l-.361-.214-3.741.982.998-3.648-.235-.374a9.927 9.927 0 01-1.529-5.34c.001-5.495 4.474-9.963 9.98-9.963 2.668 0 5.175 1.039 7.063 2.927a9.93 9.93 0 012.92 7.063c-.001 5.496-4.474 9.964-9.962 9.964M19.484 4.44A11.806 11.806 0 0011.96 1.21c-6.515.001-11.82 5.305-11.821 11.82 0 2.083.543 4.119 1.575 5.917L.785 23.52l4.726-1.24a11.87 11.87 0 005.666 1.44h.005c6.514 0 11.819-5.304 11.82-11.819a11.766 11.766 0 00-3.517-8.461" />
                </svg>
                Envoyer par WhatsApp
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="border border-[#E8E8E8] hover:border-red-300 hover:text-red-500 bg-white text-[#9CA3AF] font-body text-xs px-4 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Tout vider
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
