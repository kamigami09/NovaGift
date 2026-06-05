"use client";

import React, { useState } from "react";
import { faqData } from "@/data/faq";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="bg-[#FAFAFA] py-24 border-t border-[#E8E8E8]">
      <div className="max-w-[760px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display font-light text-4xl md:text-5xl text-black">
            Questions Fréquentes
          </h2>
          <p className="font-body font-normal text-xs md:text-sm tracking-[2px] uppercase text-[#6A6A6A] mt-4">
            Tout savoir sur la commande de vos objets publicitaires
          </p>
        </div>

        {/* Accordion Wrapper */}
        <div className="flex flex-col gap-4 mt-12" role="presentation">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden shadow-sm hover:border-gold/30 hover:shadow-md transition-all duration-300"
              >
                {/* Accordion Header Toggle */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-transparent border-none outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                  type="button"
                >
                  <span className="font-body font-medium text-sm md:text-base text-black group-hover:text-gold transition-colors pr-4">
                    {item.question}
                  </span>
                  <span className={`w-8 h-8 rounded-full border border-[#E8E8E8] flex items-center justify-center text-xs shrink-0 transition-all ${
                    isOpen ? "bg-gold border-gold text-white rotate-180" : "bg-[#FAFAFA] text-[#7A7A7A] group-hover:border-gold group-hover:text-gold"
                  }`}>
                    ▼
                  </span>
                </button>

                {/* Accordion Content Panels */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[250px] border-t border-[#E8E8E8]/60" : "max-h-0"
                  }`}
                >
                  <div className="p-6 font-body font-light text-xs md:text-sm text-[#7A7A7A] leading-relaxed bg-[#FAFAFA]/40">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
