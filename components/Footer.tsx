"use client";

import React from "react";
import { categories } from "@/data/categories";

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 88;
      window.scrollTo({
        top,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-navy text-white pt-20 pb-10 border-t border-white/10" role="contentinfo">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand details */}
          <div className="flex flex-col gap-5">
            <a
              href="#"
              onClick={(e) => handleScrollTo(e, "hero")}
              className="flex flex-col gap-1 self-start"
              aria-label="Nova Gift — Retour en haut"
            >
              <span className="font-display font-medium text-2xl tracking-[4px] uppercase text-white">
                Nova<span className="text-gold"> Gift</span>
              </span>
              <span className="font-body font-light text-[10px] tracking-[3px] uppercase text-white/50">
                Cadeaux Promotionnels &amp; Branding
              </span>
            </a>
            <p className="font-body font-light text-xs text-white/70 leading-relaxed max-w-[260px]">
              Spécialiste marocain des objets publicitaires et cadeaux d'affaires personnalisés. Basé à Casablanca, livraison nationale.
            </p>
          </div>

          {/* Column 2: Catalogue categories */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body font-semibold text-xs tracking-[2px] uppercase text-gold">
              Catalogue
            </h4>
            <div className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/catalogue/${cat.slug}`}
                  className="font-body font-light text-xs text-white/70 hover:text-gold transition-colors w-fit"
                >
                  {cat.shortLabel}
                </a>
              ))}
              <a
                href="/catalogue-cadeaux-publicitaires-nova-gift-maroc.pdf"
                download
                className="font-body font-semibold text-xs text-gold hover:text-white transition-colors w-fit mt-1"
              >
                Télécharger le catalogue (PDF)
              </a>
            </div>
          </div>

          {/* Column 3: Corporate links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body font-semibold text-xs tracking-[2px] uppercase text-gold">
              Notre Entreprise
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { id: "about", label: "À Propos" },
                { id: "testimonials", label: "Engagements B2B" },
                { id: "process", label: "Comment ça marche" },
                { id: "faq", label: "FAQ" }
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleScrollTo(e, link.id)}
                  className="font-body font-light text-xs text-white/70 hover:text-gold transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Contact details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body font-semibold text-xs tracking-[2px] uppercase text-gold">
              Contact
            </h4>
            <div className="flex flex-col gap-3 font-body font-light text-xs text-white/70">
              <p>Casablanca, Maroc</p>
              <a href="tel:+212693567650" className="hover:text-gold transition-colors">
                +212 693 567 650
              </a>
              <a href="mailto:contact@novagift.me" className="hover:text-gold transition-colors">
                contact@novagift.me
              </a>
              <p className="mt-2 text-white/40">
                Lundi - Vendredi : 9h00 - 18h00
              </p>
            </div>
          </div>

        </div>

        {/* Copyright section */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body font-light text-[11px] text-white/50 text-center md:text-left">
            &copy; {new Date().getFullYear()} Nova Gift. Tous droits réservés. Objets publicitaires personnalisés au Maroc.
          </p>
          <div className="flex gap-6 font-body font-light text-[11px] text-white/50">
            <a href="#contact" onClick={(e) => handleScrollTo(e, "contact")} className="hover:text-gold transition-colors">
              Mentions Légales
            </a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, "contact")} className="hover:text-gold transition-colors">
              CGV B2B
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
