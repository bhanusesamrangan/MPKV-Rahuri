'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const Header: React.FC = () => {
  const { language } = useLanguage();

  const isMr = language === 'mr';
  const primaryTitle = isMr
    ? 'महात्मा फुले कृषि विद्यापीठ, राहुरी'
    : 'Mahatma Phule Krishi Vidyapeeth (Agriculture University), Rahuri';
  const locationSubtitle = isMr
    ? 'राहुरी, जि. अहिल्यानगर, महाराष्ट्र • राज्य कृषि विद्यापीठ'
    : 'Rahuri, Dist. Ahilyanagar, Maharashtra • State Agricultural University';

  return (
    <header className="w-full bg-[#fdfcf9] border-b border-stone-200/60 relative z-30 transition-colors">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-2.5 sm:py-3.5 flex items-center justify-between gap-4">
        {/* Left Brand Identity: Emblem + Single-Language Institutional Typography */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <Link href="/" className="group relative flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src="/media/logos/Logo.png"
                alt={primaryTitle}
                className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded-full group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Institutional Title & Location Subtitle (Strictly Selected Language) */}
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-[26px] font-semibold text-slate-800 tracking-tight leading-tight transition-all duration-300">
                {primaryTitle}
              </span>
              <span className="text-[10.5px] sm:text-xs md:text-sm font-medium text-slate-500 tracking-normal leading-snug mt-0.5 line-clamp-1 transition-all duration-300">
                {locationSubtitle}
              </span>
              <span className="md:hidden text-[9.5px] font-medium text-[#7f2d2d]/85 mt-0.5 truncate">
                {isMr ? "आयसीएआर, नवी दिल्ली द्वारा 'अ' श्रेणी मानांकित" : "Accredited by ICAR, New Delhi - A' Grade"}
              </span>
            </div>
          </Link>
        </div>

        {/* Right Side: Subtle Engraved Heritage Seal Plaque (Restrained Contrast Below Left Title) */}
        <div
          className="hidden md:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#f7f5ee]/85 border border-stone-200/80 shrink-0 select-none"
          aria-label="Accredited by ICAR, New Delhi - A' Grade"
        >
          {/* Minimal Inline Engraved Seal Crest */}
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 40 40" className="w-9 h-9 text-[#7f2d2d]/75" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.25" />
            </svg>
            <span className="absolute text-[11px] font-serif font-bold text-[#7f2d2d] leading-none">
              A&apos;
            </span>
          </div>

          <div className="h-7 w-px bg-stone-200/90" />

          <div className="flex flex-col text-left leading-tight">
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-stone-500">
              {isMr ? 'राष्ट्रीय कृषी मानांकन' : 'Institutional Accreditation'}
            </span>
            <span className="text-xs xl:text-[13px] font-medium text-[#7f2d2d]/90 tracking-tight mt-0.5 whitespace-nowrap">
              {isMr
                ? "आयसीएआर, नवी दिल्ली - 'अ' श्रेणी"
                : "Accredited by ICAR, New Delhi - A' Grade"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
