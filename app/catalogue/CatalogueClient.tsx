"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/data/products";
import { Category } from "@/data/categories";
import ProductCard from "@/components/ProductCard";

interface Props {
  allProducts: Product[];
  categories: Category[];
}

export default function CatalogueClient({ allProducts, categories }: Props) {
  const [activeSlug, setActiveSlug] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = allProducts;
    if (activeSlug !== "all") {
      list = list.filter((p) => p.categorySlug === activeSlug);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allProducts, activeSlug, search]);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-navy py-10 px-6 text-center">
        <p className="font-display italic text-sm text-gold tracking-[3px] uppercase mb-4">
          Catalogue Complet
        </p>
        <h1 className="font-display font-light text-4xl md:text-5xl text-white">
          Nos Cadeaux Promotionnels
        </h1>
        <p className="font-body text-sm text-white/70 mt-4 max-w-xl mx-auto">
          {allProducts.length} produits personnalisables pour votre entreprise au Maroc
        </p>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[#9CA3AF]"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl pl-11 pr-4 py-3 text-sm font-body text-black outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveSlug("all")}
            className={`px-4 py-2 rounded-full text-xs font-body font-semibold uppercase tracking-[1px] border transition-all cursor-pointer ${
              activeSlug === "all"
                ? "bg-navy text-white border-navy"
                : "bg-white text-[#7A7A7A] border-[#E8E8E8] hover:border-gold hover:text-gold"
            }`}
          >
            Tout
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveSlug(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-body font-semibold uppercase tracking-[1px] border transition-all cursor-pointer ${
                activeSlug === cat.slug
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-[#7A7A7A] border-[#E8E8E8] hover:border-gold hover:text-gold"
              }`}
            >
              {cat.shortLabel}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="font-body text-xs text-[#7A7A7A] mb-6">
          {filtered.length} produit{filtered.length !== 1 ? "s" : ""} trouvé
          {filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Product Grid — mode="catalogue" so "+ Devis" adds to shared order panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} mode="catalogue" />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-body text-[#7A7A7A] text-sm">
              Aucun produit trouvé pour votre recherche.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveSlug("all");
              }}
              className="mt-4 text-xs font-body font-semibold text-gold underline cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
