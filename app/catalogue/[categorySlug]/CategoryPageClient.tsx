"use client";

import React from "react";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function CategoryPageClient({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} mode="catalogue" />
      ))}
    </div>
  );
}
