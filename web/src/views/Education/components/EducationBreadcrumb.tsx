'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface BreadcrumbItem {
  title: { en: string; mr: string };
  href?: string;
}

interface EducationBreadcrumbProps {
  items: BreadcrumbItem[];
  onSpeak?: () => void;
}

export const EducationBreadcrumb: React.FC<EducationBreadcrumbProps> = ({ items }) => {
  const { language, getBilingual } = useLanguage();

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white/80 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-20 py-2.5 px-4 sm:px-6 lg:px-8 shadow-xs"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
        {/* Breadcrumb Path */}
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-stone-600">
          <li className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-stone-500 hover:text-emerald-800 transition-colors"
              title={language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}
            >
              <Home className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const title = getBilingual(item.title);

            return (
              <li key={index} className="flex items-center gap-1.5 sm:gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-stone-600 hover:text-emerald-800 transition-colors"
                  >
                    {title}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? 'text-emerald-900 font-semibold truncate max-w-[220px] sm:max-w-md'
                        : 'text-stone-600'
                    }
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {title}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
