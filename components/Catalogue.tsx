"use client";

import React, { useState, useEffect } from "react";
import { products, Product } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "./ProductCard";

interface CatalogueProps {
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const CATEGORY_FILTERS = [
  { filter: "all", label: "Tout" },
  ...categories.map((c) => ({ filter: c.slug, label: c.shortLabel })),
];

export default function Catalogue({
  activeFilter,
  onSelectFilter,
  searchTerm,
  onSearchChange,
}: CatalogueProps) {
  const [visibleCount, setVisibleCount] = useState(8);

  // Reset pagination when filter or search changes
  useEffect(() => {
    setVisibleCount(8);
  }, [activeFilter, searchTerm]);

  const getFilteredProducts = () => {
    let list = products;

    if (activeFilter !== "all") {
      list = list.filter((p) => p.categorySlug === activeFilter);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter((p) => {
        const haystack = [
          p.name,
          p.category,
          p.subcategory,
          p.shortDescription,
          p.longDescription,
          ...p.features,
          ...p.tags
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    return list;
  };

  const filteredList = getFilteredProducts();
  const paginatedList = filteredList.slice(0, visibleCount);

  return (
    <section
      id="catalogue"
      className="bg-[#FAFAFA] pt-12 pb-20"
      aria-label="Catalogue de cadeaux d'entreprise personnalisés"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center mb-6">
          <h2 className="font-display font-light text-4xl md:text-5xl text-black">
            Catalogue de Cadeaux d&apos;Entreprise Personnalisés
          </h2>
          <p className="font-body font-normal text-xs md:text-sm tracking-[2px] uppercase text-[#6A6A6A] mt-4">
            Explorez nos produits : cliquez pour voir les détails et demander un devis
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center px-4 mb-5">
          <div className="flex items-center gap-3 bg-white border border-[#E8E8E8] focus-within:border-gold focus-within:shadow-lg focus-within:shadow-gold/10 rounded-full px-5 py-3 w-full max-w-[480px] transition-all">
            <svg
              className="stroke-[#7A7A7A] shrink-0"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher un produit..."
              autoComplete="off"
              className="flex-1 border-none outline-none font-body text-xs md:text-sm text-black bg-transparent"
              aria-label="Rechercher un produit dans le catalogue"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange("")}
                className="bg-transparent border-none text-[#7A7A7A] hover:text-gold cursor-pointer text-sm font-semibold pr-1"
                aria-label="Effacer la recherche"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2.5 mb-8 px-4"
          role="tablist"
          aria-label="Filtrer par catégorie"
        >
          {CATEGORY_FILTERS.map((tab) => (
            <button
              key={tab.filter}
              onClick={() => onSelectFilter(tab.filter)}
              role="tab"
              aria-selected={activeFilter === tab.filter}
              className={`border font-body font-medium text-[11px] md:text-xs tracking-[1px] uppercase px-6 py-3 rounded-full transition-all cursor-pointer ${
                activeFilter === tab.filter
                  ? "bg-gold text-white border-gold shadow-md shadow-[#C9A020]/20 -translate-y-[1px]"
                  : "bg-white text-[#5A5A5A] border-[#D5C8C4] hover:border-gold hover:text-gold hover:bg-[#FFF8F6] hover:-translate-y-[1px]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid — homepage mode: Demander navigates to /produit/[slug] */}
        {paginatedList.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            role="list"
            aria-label="Liste des produits"
          >
            {paginatedList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                mode="homepage"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E8E8E8] p-8">
            <p className="font-body text-[#7A7A7A] text-lg">
              Aucun produit ne correspond à votre recherche.
            </p>
            <button
              onClick={() => {
                onSearchChange("");
                onSelectFilter("all");
              }}
              className="mt-4 bg-gold text-white font-body font-semibold text-xs tracking-[2px] uppercase px-6 py-3 rounded hover:bg-gold-dark transition-colors cursor-pointer"
            >
              Voir tout le catalogue
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredList.length > paginatedList.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="inline-block border-2 border-gold text-gold hover:bg-gold hover:text-white font-display font-normal text-sm tracking-[2px] uppercase px-9 py-3.5 rounded transition-all cursor-pointer"
            >
              Charger Plus
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
