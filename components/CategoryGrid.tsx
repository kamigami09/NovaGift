"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export default function CategoryGrid() {
  // Maps the index to the corresponding grid classes for a premium asymmetric layout of 8 items
  const getGridClasses = (index: number) => {
    if (index === 0 || index === 1) {
      return "col-span-12 md:col-span-6 h-[380px]";
    }
    return "col-span-12 md:col-span-6 lg:col-span-4 h-[280px]";
  };

  return (
    <section id="categories" className="bg-white pt-10 pb-20 md:pt-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center mb-10">
          <h2 className="font-display font-light text-4xl md:text-5xl text-black">
Nos univers de cadeaux publicitaires au Maroc
          </h2>
          <p className="font-body font-normal text-xs md:text-sm tracking-[2px] uppercase text-[#6A6A6A] mt-4">
            8 collections d'exception, une infinité de personnalisations
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {categories.map((cat, index) => {
            const count = getProductsByCategory(cat.slug).length;
            const gridClass = getGridClasses(index);

            return (
              <Link
                key={cat.slug}
                href={`/catalogue/${cat.slug}`}
                className={`${gridClass} relative rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-navy/10 transition-all duration-500`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Full-background Category Image */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
                />

                {/* Dark Premium Overlay */}
                <div className="absolute inset-0 z-10 bg-navy/60 group-hover:bg-navy/75 transition-colors duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                  <h3 className="font-display font-normal text-xl md:text-2xl text-white group-hover:text-gold transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="font-body font-light text-[10px] tracking-[1.5px] uppercase text-white/80 mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    {count} produit{count !== 1 ? "s" : ""}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
