"use client";

import React from "react";

interface ToastProps {
  message: string;
  isOpen: boolean;
}

export default function Toast({ message, isOpen }: ToastProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#1C2B4A]/95 text-white border border-gold/40 px-6 py-3.5 rounded-xl shadow-xl z-[3000] flex items-center gap-3 animate-[fadeIn_0.3s_ease] backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C9A020"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      <span className="font-body text-xs font-semibold uppercase tracking-[0.5px]">
        {message}
      </span>
    </div>
  );
}
