'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface BreadcrumbItem {
  title: { en: string; mr: string } | string;
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
      className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]"
    >
      <div className="w-full max-w-[1720px] mx-auto flex items-center justify-between gap-3 text-xs sm:text-[13px] font-medium">
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-stone-600">
          <li className="flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-emerald-800 transition-colors font-medium"
              title={language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}
            >
              <Home className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const title = typeof item.title === 'string' ? item.title : getBilingual(item.title);

            return (
              <li key={index} className="flex items-center gap-1.5 sm:gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-stone-600 hover:text-emerald-800 transition-colors font-medium"
                  >
                    {title}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? 'text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md'
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
