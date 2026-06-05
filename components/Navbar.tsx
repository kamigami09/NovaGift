"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";
import { useOrder } from "@/context/OrderContext";

const WHATSAPP_URL =
  "https://wa.me/212693567650?text=Bonjour%20Nova%20Gift%2C%20je%20souhaite%20obtenir%20un%20devis%20pour%20des%20cadeaux%20promotionnels%20pour%20mon%20entreprise.";

const pageLinks = [
  { href: "/", label: "Accueil", internal: true },
  { href: "/#about", label: "À Propos", internal: true },
  { href: "/#faq", label: "FAQ", internal: true },
  { href: "/#contact", label: "Contact", internal: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useOrder();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // "Accueil" → top of the homepage (scroll up if already there, else normal navigation to "/")
    if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setIsMobileOpen(false);
      return;
    }
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: "smooth" });
    }
    setIsMobileOpen(false);
  };

  const openDevis = () => window.dispatchEvent(new Event("novagift:open-devis"));
  const catActive = (slug: string) => pathname === `/catalogue/${slug}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] bg-navy text-white transition-shadow duration-300 ${
          isScrolled ? "shadow-lg shadow-navy/30" : ""
        }`}
      >
        {/* ── Row 1: logo + actions ───────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Accueil Nova Gift">
            <span className="w-9 h-9 rounded-full bg-gold flex items-center justify-center font-display font-bold text-navy text-lg leading-none">
              N
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-semibold text-lg tracking-[2px] uppercase text-white">
                Nova<span className="text-gold"> Gift</span>
              </span>
              <span className="font-body font-light text-[8px] tracking-[3px] uppercase text-white/50">
                Cadeaux Promotionnels
              </span>
            </span>
          </Link>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="font-body font-medium text-[11px] tracking-[1.5px] uppercase text-white/75 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <span className="w-px h-5 bg-white/15" aria-hidden="true" />

            {/* Contact icons */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Nova Gift"
              className="text-white/75 hover:text-gold transition-colors"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.913zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
            <a
              href="mailto:contact@novagift.me"
              aria-label="Email Nova Gift"
              className="text-white/75 hover:text-gold transition-colors"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>

            {/* Devis panel (cart) */}
            <button
              type="button"
              onClick={openDevis}
              aria-label="Voir mon devis"
              className="relative text-white/75 hover:text-gold transition-colors"
            >
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-navy text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none px-1">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Devis CTA pill */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-navy font-body font-bold text-[11px] tracking-[1.5px] uppercase px-5 py-2.5 rounded-full hover:bg-white transition-colors"
            >
              Devis rapide
            </a>
          </div>

          {/* Mobile actions */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              type="button"
              onClick={openDevis}
              aria-label="Voir mon devis"
              className="relative text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-navy text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none px-1">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="flex flex-col gap-[5px] p-1 cursor-pointer"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Menu"
              aria-expanded={isMobileOpen}
            >
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${isMobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${isMobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${isMobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* ── Row 2: category bar (desktop) ───────────────────────── */}
        <div className="hidden lg:block border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-11 flex items-center justify-between gap-3">
            <Link
              href="/catalogue"
              className="bg-gold text-navy font-body font-bold text-[11px] tracking-[1px] uppercase whitespace-nowrap px-4 py-1.5 rounded-full hover:bg-white transition-colors"
            >
              Tout le catalogue
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogue/${cat.slug}`}
                className={`font-body text-[11px] tracking-[0.5px] uppercase whitespace-nowrap transition-colors ${
                  catActive(cat.slug) ? "text-gold" : "text-white/70 hover:text-gold"
                }`}
              >
                {cat.shortLabel}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ───────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[999] transition-all duration-300 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 overflow-y-auto ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 border-b border-[#E8E8E8] flex items-center justify-between">
            <span className="font-display font-semibold text-lg tracking-[2px] uppercase text-navy">
              Nova<span className="text-gold"> Gift</span>
            </span>
            <button onClick={() => setIsMobileOpen(false)} className="p-1 text-[#7A7A7A] hover:text-navy cursor-pointer">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col p-4">
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="font-body font-medium text-sm uppercase tracking-[1.5px] text-navy hover:text-gold py-4 border-b border-[#F4F4F4] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="py-4 border-b border-[#F4F4F4]">
              <Link
                href="/catalogue"
                onClick={() => setIsMobileOpen(false)}
                className="font-body font-semibold text-sm uppercase tracking-[1.5px] text-navy hover:text-gold block mb-3"
              >
                Tout le catalogue
              </Link>
              <div className="flex flex-col gap-1 pl-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/catalogue/${cat.slug}`}
                    className="flex items-center gap-2 py-2 font-body text-sm text-[#555555] hover:text-gold transition-colors"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 bg-gold text-navy font-body font-bold text-xs uppercase tracking-[2px] py-4 rounded-xl text-center"
              onClick={() => setIsMobileOpen(false)}
            >
              Devis rapide WhatsApp
            </a>
          </nav>
        </div>
      </div>

      {/* Spacer (row1 64px + row2 44px on desktop) */}
      <div className="h-16 lg:h-[108px]" />
    </>
  );
}
