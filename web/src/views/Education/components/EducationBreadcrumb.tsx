'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Printer, Volume2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { printElement } from '@/utils/printElement';

export interface BreadcrumbItem {
  title: { en: string; mr: string };
  href?: string;
}

interface EducationBreadcrumbProps {
  items: BreadcrumbItem[];
  onSpeak?: () => void;
}

export const EducationBreadcrumb: React.FC<EducationBreadcrumbProps> = ({ items, onSpeak }) => {
  const { language, getBilingual } = useLanguage();

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      const candidates = [
        'constituent-colleges-printable-section',
        'constituent-colleges-capacity-table',
        'affiliated-colleges-printable-section',
        'bachelors-degrees-printable',
        'diploma-courses-printable',
        'masters-syllabi-printable',
        'diploma-schools-printable',
        'certificate-courses-printable',
        'faculty-departments-printable',
        'faculty-syllabi-printable',
        'academic-regulations-printable',
        'thrust-areas-printable',
        'org-tree-printable',
        'governance-framework-printable',
        'education-degrees-matrix-printable'
      ];
      for (const id of candidates) {
        if (document.getElementById(id)) {
          printElement(id, document.title || 'Mahatma Phule Krishi Vidyapeeth, Rahuri');
          return;
        }
      }
      window.print();
    }
  };

  const handleSpeak = () => {
    if (onSpeak) {
      onSpeak();
      return;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Find main text content on the page to read
      const mainEl = document.querySelector('article') || document.querySelector('main');
      if (mainEl) {
        window.speechSynthesis.cancel();
        const text = mainEl.innerText.slice(0, 1500); // speak first 1500 chars
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'mr' ? 'mr-IN' : 'en-IN';
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white/80 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-20 py-2.5 px-4 sm:px-6 lg:px-8 shadow-xs"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-medium">
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

        {/* Quick Tools: Print & Listen */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSpeak}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            title={language === 'mr' ? 'आवाज ऐका' : 'Listen to this page'}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'mr' ? 'वाचा/ऐका' : 'Listen'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors"
            title={language === 'mr' ? 'पृष्ठ मुद्रित करा' : 'Print this page'}
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
