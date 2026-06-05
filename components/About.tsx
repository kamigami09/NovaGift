"use client";

import React from "react";

export default function About() {
  return (
    <section id="about" className="bg-white py-24 border-t border-[#E8E8E8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Side: Image + Badge */}
          <div className="relative">
            {/* Image Placeholder representing high-end showcase */}
            <div 
              className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-navy to-gold opacity-90 relative overflow-hidden shadow-xl"
              style={{
                background: "linear-gradient(135deg, #1C2B4A 0%, #C9A020 100%)",
              }}
            >
              {/* Decorative premium geometric representation */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white select-none">
                <svg
                  className="mb-4 stroke-white opacity-40"
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <h3 className="font-display font-light text-2xl uppercase tracking-widest">
                  Nova Gift Showcase
                </h3>
                <p className="font-body font-light text-xs text-white/80 tracking-wider mt-2 max-w-xs">
                  Cadeaux d'affaires & solutions de marquage de prestige basés à Casablanca
                </p>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 md:right-4 bg-gold text-white rounded-xl p-5 md:p-6 text-center shadow-lg shadow-gold/30">
              <div className="font-display font-light text-4xl md:text-5xl leading-none">
                10
              </div>
              <div className="font-body font-semibold text-[10px] md:text-xs tracking-[1.5px] uppercase mt-1 opacity-95">
                Ans d'expérience
              </div>
            </div>
          </div>

          {/* Right Side: Text & Highlights */}
          <div className="flex flex-col">
            <p className="font-display italic text-sm md:text-base text-gold tracking-[3px] uppercase mb-4">
              Notre Histoire
            </p>
            <h2 className="font-display font-light text-4xl md:text-5xl text-black leading-tight">
              Votre Partenaire Cadeaux Promotionnels &amp; Branding au Maroc
            </h2>
            <p className="font-body text-sm md:text-base text-navy mt-6 leading-relaxed font-medium">
              Nova Gift est un fournisseur marocain de cadeaux promotionnels et d'objets publicitaires personnalisés (gravure laser, broderie, sérigraphie, impression UV, dorure à chaud) pour entreprises, basé à Casablanca.
            </p>
            <p className="font-body font-light text-sm md:text-base text-[#7A7A7A] mt-4 leading-relaxed">
              Fondée à Casablanca, Nova Gift accompagne les entreprises marocaines depuis plus de 10 ans dans la valorisation de leurs relations professionnelles. Nous concevons et personnalisons des cadeaux d'entreprise premium qui reflètent l'image de marque de chaque client.
            </p>
            <p className="font-body font-light text-sm md:text-base text-[#7A7A7A] mt-4 leading-relaxed">
              De la PME locale aux grands groupes, en passant par les banques, les télécoms et les cabinets de conseil, nous apportons une expertise en solutions de branding et un service sur mesure pour chaque commande.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                "Personnalisation laser, broderie & sérigraphie",
                "Livraison partout au Maroc",
                "Devis gratuit sous 48h",
                "Basé à Casablanca, Maroc"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 bg-gold rounded-full shrink-0 mt-1.5" />
                  <span className="font-body font-medium text-xs md:text-sm text-black leading-snug">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
