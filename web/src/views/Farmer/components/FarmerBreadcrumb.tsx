'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FarmerBreadcrumbProps {
  currentTitle: { en: string; mr: string };
}

export const FarmerBreadcrumb: React.FC<FarmerBreadcrumbProps> = ({ currentTitle }) => {
  const { language } = useLanguage();

  return (
    <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
      <nav className="w-full max-w-[1720px] mx-auto flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-emerald-800 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/farmer/services" className="hover:text-emerald-800 transition-colors font-medium">
          {language === 'mr' ? 'शेतकरी सेवा' : 'Farmer Services'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">
          {language === 'mr' ? currentTitle.mr : currentTitle.en}
        </span>
      </nav>
    </div>
  );
};
