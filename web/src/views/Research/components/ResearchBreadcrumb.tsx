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
      className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]"
    >
      <div className="w-full max-w-[1720px] mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-stone-600 hover:text-emerald-800 transition-colors font-medium"
          title={language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}
        >
          <Home className="w-3.5 h-3.5 text-emerald-700" />
          <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
        </Link>

        {breadcrumbs.map((item, index) => {
          const itemTitle = typeof item.title === 'string' ? item.title : getBilingual(item.title);
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-stone-600 hover:text-emerald-800 transition-colors font-medium truncate max-w-[180px] sm:max-w-none"
                >
                  {itemTitle}
                </Link>
              ) : (
                <span className="text-stone-600 font-medium truncate max-w-[180px] sm:max-w-none">
                  {itemTitle}
                </span>
              )}
            </React.Fragment>
          );
        })}

        {currentPageTitle && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md" aria-current="page">
              {typeof currentPageTitle === 'string' ? currentPageTitle : getBilingual(currentPageTitle)}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};
