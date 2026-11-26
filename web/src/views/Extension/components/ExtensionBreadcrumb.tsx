'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ExtensionBreadcrumbProps {
  currentPageTitle: { en: string; mr: string } | string;
  parentPage?: {
    title: { en: string; mr: string } | string;
    href: string;
  };
}

export const ExtensionBreadcrumb: React.FC<ExtensionBreadcrumbProps> = ({
  currentPageTitle,
  parentPage
}) => {
  const { language, getBilingual } = useLanguage();

  const getTitle = (titleObj: { en: string; mr: string } | string): string => {
    if (typeof titleObj === 'string') return titleObj;
    return language === 'mr' ? titleObj.mr : titleObj.en;
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]"
    >
      <div className="w-full max-w-[1720px] mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
        {/* Home Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-stone-600 hover:text-emerald-800 transition-colors font-medium"
        >
          <Home className="w-3.5 h-3.5 text-emerald-700" />
          <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
        </Link>

        <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />

        {/* Extension Root Link */}
        <Link
          href="/extension/at-a-glance"
          className="inline-flex items-center gap-1.5 text-stone-600 hover:text-emerald-800 transition-colors font-medium"
        >
          <span>{language === 'mr' ? 'विस्तार शिक्षण' : 'Extension Education'}</span>
        </Link>

        {parentPage && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <Link
              href={parentPage.href}
              className="text-stone-600 hover:text-emerald-800 transition-colors font-medium"
            >
              {getTitle(parentPage.title)}
            </Link>
          </>
        )}

        <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />

        {/* Current Active Page */}
        <span
          aria-current="page"
          className="font-bold text-emerald-950 truncate max-w-[280px] sm:max-w-md"
        >
          {getTitle(currentPageTitle)}
        </span>
      </div>
    </nav>
  );
};
