"use client";

import React from "react";

export default function Process() {
  const steps = [
    {
      num: "1",
      title: "1. Parcourez le Catalogue",
      desc: "Sélectionnez vos produits préférés et indiquez les quantités souhaitées.",
      icon: (
        <svg className="w-7 h-7 stroke-gold group-hover:stroke-white transition-colors" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      )
    },
    {
      num: "2",
      title: "2. Envoyez votre Sélection",
      desc: "Transmettez votre liste par WhatsApp ou email avec vos coordonnées et logo.",
      icon: (
        <svg className="w-7 h-7 stroke-gold group-hover:stroke-white transition-colors" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      )
    },
    {
      num: "3",
      title: "3. Recevez votre Devis",
      desc: "Devis détaillé et BAT sous 48h. Validation puis lancement de la production.",
      icon: (
        <svg className="w-7 h-7 stroke-gold group-hover:stroke-white transition-colors" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    },
    {
      num: "4",
      title: "4. Livraison au Maroc",
      desc: "Livraison de vos cadeaux personnalisés partout au Maroc dans les délais convenus.",
      icon: (
        <svg className="w-7 h-7 stroke-gold group-hover:stroke-white transition-colors" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.75a1.125 1.125 0 01-1.125-1.125V4.625c0-.621.504-1.125 1.125-1.125H9.75v14.25m6 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h3.75a1.125 1.125 0 001.125-1.125V9.75M8.25 18.75h6m-6 0v-4.5m6 4.5v-4.5m-6 0h6m0 0V9.75m0 0h4.5a1.125 1.125 0 011.125 1.125v4.5" />
        </svg>
      )
    }
  ];

  return (
    <section id="process" className="bg-white py-24 border-t border-[#E8E8E8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="font-display font-light text-4xl md:text-5xl text-black">
            Comment ça Marche ?
          </h2>
          <p className="font-body font-normal text-xs md:text-sm tracking-[2px] uppercase text-[#6A6A6A] mt-4">
            Commander vos cadeaux d'entreprise en 4 étapes simples
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 relative">
          {/* Horizontal connection line for desktop */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[1px] bg-[#E8E8E8] z-0" />

          {steps.map((step) => (
            <div key={step.num} className="text-center relative z-10 group">
              {/* Icon / Number frame */}
              <div className="w-20 h-20 rounded-full bg-[#FAFAFA] border border-[#E8E8E8] flex items-center justify-center mx-auto mb-6 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="font-body font-semibold text-sm text-black mb-2">
                {step.title}
              </h3>
              <p className="font-body font-light text-xs md:text-sm text-[#7A7A7A] leading-relaxed max-w-[240px] mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
