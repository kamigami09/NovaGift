"use client";

import React from "react";

interface EmailButtonProps {
  isShifted: boolean;
}

export default function EmailButton({ isShifted }: EmailButtonProps) {
  const email = "contact@novagift.me";

  return (
    <a
      href={`mailto:${email}`}
      className={`fixed right-6 w-[68px] h-[68px] bg-navy rounded-full flex items-center justify-center shadow-lg shadow-navy/35 z-[1600] transition-all duration-500 hover:scale-110 hover:bg-gold ${
        isShifted ? "bottom-[190px]" : "bottom-[104px]"
      }`}
      aria-label="Contacter Nova Gift par email"
    >
      <svg className="w-[30px] h-[30px] fill-white" viewBox="0 0 24 24">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    </a>
  );
}
