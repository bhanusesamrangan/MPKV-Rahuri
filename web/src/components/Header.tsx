'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const Header: React.FC = () => {
  const { language } = useLanguage();

  return (
    <header className="w-full bg-[#fdfcf9] border-b border-stone-200/60 relative z-30 transition-colors">
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 xl:px-8 py-2.5 sm:py-3.5 flex items-center justify-between">
        {/* Brand identity: Emblem + University Typography */}
        <div className="flex items-center gap-3 sm:gap-4 w-full">
          <Link href="/" className="relative flex items-center gap-2.5 sm:gap-3.5 w-full">
            <div className="relative flex-shrink-0">
              <img
                src="/media/logos/Logo.png"
                alt="MPKV Rahuri Emblem"
                className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded-full group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Bilingual Institutional Titles - Responsive, Proportional & Non-Bulgy */}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-800 tracking-tight leading-tight">
                महात्मा फुले कृषि विद्यापीठ, राहुरी
              </span>
              <span className="text-[10.5px] sm:text-xs md:text-base lg:text-lg font-medium text-slate-600 tracking-normal leading-snug mt-0.5 line-clamp-1">
                Mahatma Phule Krishi Vidyapeeth, Rahuri
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
