"use client";

import React from "react";

export default function Stats() {
  const metrics = [
    { value: "10+", label: "Ans d'Expérience" },
    { value: "500+", label: "Clients Corporate" },
    { value: "100k+", label: "Objets Personnalisés" },
    { value: "100%", label: "Engagement Qualité" }
  ];

  return (
    <section className="bg-navy py-16 relative overflow-hidden">
      {/* Subtle gold decoration rings */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 rounded-full border border-gold/5 pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 rounded-full border border-gold/5 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {metrics.map((m, idx) => (
            <div
              key={m.label}
              className={`text-center flex flex-col justify-center ${
                idx > 1 ? "pt-8 md:pt-0" : ""
              }`}
            >
              <div className="font-display font-light text-3xl md:text-4xl lg:text-5xl text-gold leading-none">
                {m.value}
              </div>
              <div className="font-body font-normal text-[10px] md:text-xs tracking-[2px] uppercase text-white/70 mt-3">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
