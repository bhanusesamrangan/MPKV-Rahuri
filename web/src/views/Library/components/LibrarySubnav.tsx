'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export type LibrarySlug =
  | 'library-about'
  | 'central-library-rahuri'
  | 'library-collections'
  | 'library-sections'
  | 'library-facilities'
  | 'library-services'
  | 'library-links'
  | 'library-activities'
  | 'library-off-campus'
  | 'library-news-events'
  | 'library-contact';

interface LibrarySubnavProps {
  activeSlug?: LibrarySlug;
  currentTitle: { en: string; mr: string };
  accentActiveClass?: string;
}

export const LibrarySubnav: React.FC<LibrarySubnavProps> = ({
  currentTitle,
}) => {
  const { language } = useLanguage();

  return (
    <div className="w-full">
      {/* Standard Breadcrumb Strip */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <nav className="w-full max-w-[1720px] mx-auto flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-emerald-800 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/library/about" className="hover:text-emerald-800 transition-colors font-medium">
            {language === 'mr' ? 'ग्रंथालय' : 'Library'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">
            {language === 'mr' ? currentTitle.mr : currentTitle.en}
          </span>
        </nav>
      </div>
    </div>
  );
};
