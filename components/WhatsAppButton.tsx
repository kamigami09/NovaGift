"use client";

import React from "react";

interface WhatsAppButtonProps {
  isShifted: boolean;
}

export default function WhatsAppButton({ isShifted }: WhatsAppButtonProps) {
  const whatsappNumber = "212693567650";
  const defaultText = encodeURIComponent("Bonjour Nova Gift, je souhaiterais obtenir des informations sur vos cadeaux d'entreprise personnalisés.");
  const url = `https://wa.me/${whatsappNumber}?text=${defaultText}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed right-6 w-[68px] h-[68px] bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/35 z-[1600] transition-all duration-500 hover:scale-110 ${
        isShifted ? "bottom-[110px]" : "bottom-6"
      }`}
      aria-label="Contacter Nova Gift par WhatsApp"
    >
      <svg className="w-[30px] h-[30px] fill-white" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.59 7.449h-.004a9.935 9.935 0 01-5.029-1.367l-.361-.214-3.741.982.998-3.648-.235-.374a9.927 9.927 0 01-1.529-5.34c.001-5.495 4.474-9.963 9.98-9.963 2.668 0 5.175 1.039 7.063 2.927a9.93 9.93 0 012.92 7.063c-.001 5.496-4.474 9.964-9.962 9.964M19.484 4.44A11.806 11.806 0 0011.96 1.21c-6.515.001-11.82 5.305-11.821 11.82 0 2.083.543 4.119 1.575 5.917L.785 23.52l4.726-1.24a11.87 11.87 0 005.666 1.44h.005c6.514 0 11.819-5.304 11.82-11.819a11.766 11.766 0 00-3.517-8.461" />
      </svg>
    </a>
  );
}
