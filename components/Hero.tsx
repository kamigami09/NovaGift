"use client";

import React from "react";
import Image from "next/image";

export default function Hero() {
  const handleScrollToCatalog = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("catalogue");
    if (el) {
      const top = el.offsetTop - 88;
      window.scrollTo({
        top,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-start justify-center text-left overflow-hidden bg-gradient-to-br from-[#FBF7EC] via-white to-[#F4F7FC] pt-6 pb-8 md:pt-8 md:pb-10"
      role="banner"
      aria-label="Section principale — Cadeaux promotionnels personnalisés au Maroc"
    >
      {/* Premium decorative background — brand-colour glows + subtle dot texture */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-28 -right-24 w-[540px] h-[540px] rounded-full bg-gold/20 blur-[130px]" />
        <div className="absolute -bottom-32 -left-28 w-[480px] h-[480px] rounded-full bg-navy/10 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: "radial-gradient(#1C2B4A 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-6 max-w-[600px]">
          <p className="font-body font-bold text-[11px] md:text-xs tracking-[3px] uppercase text-gold mb-5 opacity-0 translate-y-5 animate-[fadeUp_0.8s_ease_forwards_0.4s]">
            Cadeaux Promotionnels &amp; Solutions de Branding
          </p>
          <h1 className="font-display font-bold text-[2rem] md:text-[2.6rem] lg:text-[3rem] tracking-[-0.02em] leading-[1.1] text-navy mb-5 opacity-0 translate-y-7 animate-[fadeUp_1s_ease_forwards_0.6s]">
            Cadeaux promotionnels{" "}
            <span className="text-gold">personnalisés</span> pour entreprises au Maroc
          </h1>
          <p className="font-body font-normal text-base md:text-lg text-navy-light leading-relaxed mb-8 opacity-0 translate-y-5 animate-[fadeUp_0.8s_ease_forwards_0.9s]">
            Spécialiste des goodies et objets publicitaires premium à l&apos;image de votre marque. Nous maîtrisons le marquage corporate de qualité (gravure laser, broderie, sérigraphie) et livrons partout au Maroc&nbsp;: Casablanca, Rabat, Marrakech et Tanger.
          </p>
          <div className="flex flex-wrap items-center gap-3 opacity-0 scale-95 animate-[fadeScale_0.6s_ease_forwards_1.1s]">
            <button
              onClick={handleScrollToCatalog}
              className="inline-flex items-center justify-center bg-navy text-white font-body font-semibold text-xs tracking-[2px] uppercase px-7 py-3.5 rounded-lg hover:bg-gold shadow-lg shadow-navy/20 transition-all cursor-pointer"
            >
              Explorer le catalogue
            </button>
            <a
              href="/catalogue-cadeaux-publicitaires-nova-gift-maroc.pdf"
              download
              className="inline-flex items-center gap-2 text-navy font-body font-semibold text-xs tracking-[2px] uppercase px-7 py-3.5 rounded-lg border border-navy/20 hover:border-navy hover:bg-navy/[0.03] transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
              </svg>
              Catalogue PDF
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 opacity-0 animate-[fadeUp_0.8s_ease_forwards_1.3s]">
            {[
              "Marquage de qualité",
              "Livraison partout au Maroc",
              "Devis gratuit sous 48h",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 font-body text-xs md:text-[13px] text-navy-light">
                <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Premium Showcase Image */}
        <div className="lg:col-span-6 w-full flex justify-center lg:justify-end opacity-0 scale-95 animate-[fadeScale_0.8s_ease_forwards_1.1s]">
          <div className="relative w-full max-w-[540px]">
            {/* warm glow behind the frame so the image pops */}
            <div
              className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-gold/30 via-gold/10 to-navy/20 blur-3xl opacity-70"
              aria-hidden="true"
            />
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[1.05] rounded-2xl md:rounded-3xl overflow-hidden ring-1 ring-white/50 shadow-2xl shadow-navy/30 bg-navy">
              <Image
                src="/images/hero-novagift-showcase-clean.png"
                alt="Cadeaux promotionnels personnalisés Nova Gift au Maroc"
                fill
                priority={true}
                className="object-cover brightness-[1.1] contrast-[1.06] saturate-[1.12] hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 540px"
              />
              {/* soft highlight to lift the dark photo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/15 via-transparent to-white/15 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Background fades to white at the bottom, blending into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white pointer-events-none z-[1]"
        aria-hidden="true"
      />
    </section>
  );
}
