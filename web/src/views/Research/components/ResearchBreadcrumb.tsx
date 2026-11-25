'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface BreadcrumbItem {
  title: { en: string; mr: string } | string;
  href?: string;
}

interface ResearchBreadcrumbProps {
  items?: BreadcrumbItem[];
  currentPageTitle?: { en: string; mr: string } | string;
}

export const ResearchBreadcrumb: React.FC<ResearchBreadcrumbProps> = ({
  items,
  currentPageTitle
}) => {
  const { language, getBilingual } = useLanguage();

  const defaultItems: BreadcrumbItem[] = [
    {
      title: { en: 'Research', mr: 'संशोधन' },
      href: '/research/at-a-glance'
    }
  ];

  const breadcrumbs = items && items.length > 0 ? items : defaultItems;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 sm:gap-2 text-xs text-stone-500 flex-wrap py-2.5 px-4 sm:px-6 bg-stone-100/80 border-b border-stone-200"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-stone-600 hover:text-emerald-700 transition-colors font-medium"
      >
        <Home className="w-3.5 h-3.5 text-emerald-700" />
        <span className="sr-only sm:not-sr-only">{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
      </Link>

      {breadcrumbs.map((item, index) => {
        const itemTitle = getBilingual(item.title);
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-stone-600 hover:text-emerald-700 transition-colors font-medium truncate max-w-[150px] sm:max-w-none"
              >
                {itemTitle}
              </Link>
            ) : (
              <span className="text-stone-600 font-medium truncate max-w-[150px] sm:max-w-none">
                {itemTitle}
              </span>
            )}
          </React.Fragment>
        );
      })}

      {currentPageTitle && (
        <>
          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="text-emerald-900 font-bold truncate max-w-[200px] sm:max-w-none" aria-current="page">
            {getBilingual(currentPageTitle)}
          </span>
        </>
      )}
    </nav>
  );
};
