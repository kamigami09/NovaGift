"use client";

import React, { useState } from "react";
import { generateEmailMailto } from "@/lib/whatsapp";

interface ContactProps {
  onShowToast: (message: string) => void;
}

export default function Contact({ onShowToast }: ContactProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Veuillez renseigner votre nom et votre numéro de téléphone.");
      return;
    }

    // Generate mailto link using mock empty map since this is a general contact form (no items selected)
    const mailto = generateEmailMailto(new Map(), name, company, phone, budget, message + `\nVille: ${city}`);
    window.location.href = mailto;

    onShowToast("Ouverture de votre messagerie...");
    
    // Clear form
    setName("");
    setCompany("");
    setPhone("");
    setCity("");
    setBudget("");
    setMessage("");
  };

  return (
    <section id="contact" className="bg-white py-24 border-t border-[#E8E8E8]" aria-label="Contact et devis">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Contact info */}
          <div className="flex flex-col">
            <p className="font-display italic text-sm md:text-base text-gold tracking-[3px] uppercase mb-4">
              Devis Gratuit sous 48h
            </p>
            <h2 className="font-display font-light text-4xl md:text-5xl text-black leading-tight">
              Discutons de Votre Projet de Branding
            </h2>
            <p className="font-body font-light text-sm md:text-base text-[#7A7A7A] mt-6 leading-relaxed">
              Une question, un projet ou besoin d'un devis sur-mesure ? Remplissez le formulaire de contact ou joignez-nous directement par WhatsApp ou email. Notre équipe commerciale prendra contact avec vous rapidement.
            </p>

            <div className="flex flex-col gap-6 mt-10">
              {/* Phone item */}
              <a
                href="tel:+212693567650"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full border border-[#E8E8E8] group-hover:border-gold flex items-center justify-center shrink-0 transition-colors">
                  <svg className="w-5 h-5 stroke-gold" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.302a12.017 12.017 0 01-4.507-4.507c-.24-.441-.074-.927.302-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-[10px] md:text-xs text-[#7A7A7A] tracking-[1px] uppercase">
                    Téléphone &amp; WhatsApp
                  </span>
                  <span className="font-body font-medium text-sm md:text-base text-black group-hover:text-gold transition-colors mt-0.5">
                    +212 693 567 650
                  </span>
                </div>
              </a>

              {/* Email item */}
              <a
                href="mailto:contact@novagift.me"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full border border-[#E8E8E8] group-hover:border-gold flex items-center justify-center shrink-0 transition-colors">
                  <svg className="w-5 h-5 stroke-gold" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-[10px] md:text-xs text-[#7A7A7A] tracking-[1px] uppercase">
                    Email Commercial
                  </span>
                  <span className="font-body font-medium text-sm md:text-base text-black group-hover:text-gold transition-colors mt-0.5">
                    contact@novagift.me
                  </span>
                </div>
              </a>

              {/* Location item */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#E8E8E8] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 stroke-gold" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-[10px] md:text-xs text-[#7A7A7A] tracking-[1px] uppercase">
                    Localisation
                  </span>
                  <span className="font-body font-medium text-sm md:text-base text-black mt-0.5">
                    Casablanca, Maroc — Livraison Nationale
                  </span>
                </div>
              </div>

              {/* Hours item */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#E8E8E8] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 stroke-gold" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-[10px] md:text-xs text-[#7A7A7A] tracking-[1px] uppercase">
                    Heures d'ouverture
                  </span>
                  <span className="font-body font-medium text-sm md:text-base text-black mt-0.5">
                    Lundi - Vendredi : 09:00 - 18:00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#FAFAFA] border border-[#E8E8E8] p-8 md:p-10 rounded-2xl flex flex-col gap-5 shadow-sm"
            aria-label="Formulaire de contact"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name-input" className="font-body font-semibold text-xs text-black">
                  Nom / Prénom *
                </label>
                <input
                  id="name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Yassine Alami"
                  required
                  className="bg-white border border-[#E8E8E8] rounded-lg px-4 py-3 text-xs md:text-sm font-body text-black outline-none focus:border-gold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="company-input" className="font-body font-semibold text-xs text-black">
                  Entreprise
                </label>
                <input
                  id="company-input"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Ex: Tech Solutions"
                  className="bg-white border border-[#E8E8E8] rounded-lg px-4 py-3 text-xs md:text-sm font-body text-black outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone-input" className="font-body font-semibold text-xs text-black">
                  Téléphone *
                </label>
                <input
                  id="phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: +212 600 000 000"
                  required
                  className="bg-white border border-[#E8E8E8] rounded-lg px-4 py-3 text-xs md:text-sm font-body text-black outline-none focus:border-gold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="city-input" className="font-body font-semibold text-xs text-black">
                  Ville
                </label>
                <input
                  id="city-input"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: Casablanca"
                  className="bg-white border border-[#E8E8E8] rounded-lg px-4 py-3 text-xs md:text-sm font-body text-black outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="budget-select" className="font-body font-semibold text-xs text-black">
                Budget approximatif (MAD)
              </label>
              <select
                id="budget-select"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-white border border-[#E8E8E8] rounded-lg px-4 py-3 text-xs md:text-sm font-body text-black outline-none focus:border-gold"
              >
                <option value="">Sélectionnez votre budget...</option>
                <option value="Moins de 5000">Moins de 5 000 MAD</option>
                <option value="5000 - 15000">5 000 - 15 000 MAD</option>
                <option value="15000 - 50000">15 000 - 50 000 MAD</option>
                <option value="Plus de 50000">Plus de 50 000 MAD</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message-input" className="font-body font-semibold text-xs text-black">
                Détaillez votre besoin (Produit, Quantité, Marquage...)
              </label>
              <textarea
                id="message-input"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ex: Bonjour, je souhaite obtenir un devis pour 100 gourdes en bambou noir avec notre logo gravé laser..."
                className="bg-white border border-[#E8E8E8] rounded-lg px-4 py-3 text-xs md:text-sm font-body text-black outline-none focus:border-gold resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-gold text-white font-body font-semibold text-xs tracking-[2px] uppercase py-4 rounded-lg hover:bg-gold-dark transform hover:-translate-y-[1px] transition-all cursor-pointer w-full text-center"
            >
              Envoyer la Demande
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
