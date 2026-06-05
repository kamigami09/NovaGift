"use client";

import React from "react";
import { testimonialsData } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#FAFAFA] py-24 border-t border-[#E8E8E8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="font-display font-light text-4xl md:text-5xl text-black">
            Références &amp; Engagements B2B
          </h2>
          <p className="font-body font-normal text-xs md:text-sm tracking-[2px] uppercase text-[#6A6A6A] mt-4">
            Une approche pensée pour les entreprises marocaines
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E8E8E8] rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="font-display text-gold font-light text-lg mb-4">
                  {item.id}
                </div>
                <p className="font-display italic font-light text-base md:text-lg text-black leading-relaxed">
                  "{item.quote}"
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#E8E8E8]">
                <h4 className="font-body font-semibold text-xs md:text-sm text-black">
                  {item.author}
                </h4>
                <p className="font-body font-light text-[10px] md:text-xs tracking-[1px] uppercase text-[#7A7A7A] mt-1 line-clamp-1">
                  {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos Strip */}
        <div className="text-center mt-16 pt-12 border-t border-[#E8E8E8]/60">
          <p className="font-body text-[10px] md:text-xs tracking-[3px] uppercase text-[#7A7A7A] mb-8">
            Secteurs accompagnés — références disponibles sur demande
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {["Finance", "Télécom", "Industrie", "Conseil", "Immobilier"].map((sector) => (
              <span
                key={sector}
                className="font-display font-medium text-[15px] md:text-[17px] tracking-[3px] uppercase text-[#C0C0C0] border border-[#E8E8E8] px-6 py-2 rounded-lg hover:text-gold hover:border-gold hover:shadow-md transition-all duration-300 select-none cursor-default"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
