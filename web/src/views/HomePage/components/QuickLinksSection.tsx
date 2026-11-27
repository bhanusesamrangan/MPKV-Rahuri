'use client';

import React, { useState } from 'react';
import { ExternalLink, Globe, LayoutGrid, Pause, Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface QuickLinkItem {
  id: string;
  label: { en: string; mr: string };
  href: string;
  logo: string;
}

const QUICK_LINKS: QuickLinkItem[] = [
  {
    id: 'nkn',
    label: { en: 'National Knowledge Network', mr: 'राष्ट्रीय ज्ञान नेटवर्क' },
    href: 'https://nkn.gov.in/en/',
    logo: '/media/logos/quick-links/img_logo_nkn.png',
  },
  {
    id: 'sakshat',
    label: { en: 'Sakshat Portal', mr: 'साक्षात ई-शिक्षण दालन' },
    href: 'http://www.sakshat.ac.in/',
    logo: '/media/logos/quick-links/img_sakshat.png',
  },
  {
    id: 'bcs',
    label: { en: 'Bharatiya Chhatra Sansad', mr: 'भारतीय छात्र संसद' },
    href: 'https://www.bharatiyachhatrasansad.org/',
    logo: '/media/logos/quick-links/img_bharatiya_chhatra_sansad.png',
  },
  {
    id: 'nic-mail',
    label: { en: 'Gov Mail Portal', mr: 'शासकीय ई-मेल प्रणाली' },
    href: 'https://email.gov.in',
    logo: '/media/logos/quick-links/img_mail.png',
  },
  {
    id: 'mcaer',
    label: { en: 'MCAER, Pune', mr: 'महाराष्ट्र कृषी शिक्षण परिषद' },
    href: 'http://www.mcaer.org/',
    logo: '/media/logos/quick-links/img_logo_mcaer.png',
  },
  {
    id: 'icar',
    label: { en: 'ICAR, New Delhi', mr: 'भारतीय कृषी अनुसंधान परिषद' },
    href: 'https://icar.org.in/',
    logo: '/media/logos/quick-links/img_logo_icar.png',
  },
  {
    id: 'cec',
    label: { en: 'CEC India', mr: 'शैक्षणिक संवाद संघ' },
    href: 'http://cec.nic.in/',
    logo: '/media/logos/quick-links/img_logo_cec.png',
  },
  {
    id: 'ntc',
    label: { en: 'National Teachers Congress', mr: 'राष्ट्रीय शिक्षक परिषद' },
    href: 'https://www.nationalteacherscongress.com/',
    logo: '/media/logos/quick-links/img_national_teachers_congress.png',
  },
  {
    id: 'fao',
    label: { en: 'FAO e-Learning Academy', mr: 'अन्न व कृषी संघटना' },
    href: 'https://elearning.fao.org/',
    logo: '/media/logos/quick-links/FAO-logo.jpg',
  },
  {
    id: 'krishikosh',
    label: { en: 'KrishiKosh', mr: 'कृषीकोष ग्रंथालय' },
    href: 'http://krishikosh.egranth.ac.in/',
    logo: '/media/logos/quick-links/logo21.gif',
  },
  {
    id: 'ugc',
    label: { en: 'UGC India', mr: 'विद्यापीठ अनुदान आयोग' },
    href: 'https://www.ugc.ac.in/',
    logo: '/media/logos/quick-links/ugc_logo.png',
  },
  {
    id: 'maharashtra',
    label: { en: 'Govt. of Maharashtra', mr: 'महाराष्ट्र शासन' },
    href: 'https://www.maharashtra.gov.in/1125/Home',
    logo: '/media/logos/quick-links/maharashtra_gov.png',
  },
];

export const QuickLinksSection: React.FC = () => {
  const { language } = useLanguage();
  const isMr = language === 'mr';
  const [isPaused, setIsPaused] = useState(false);
  const [isGridMode, setIsGridMode] = useState(false);

  const renderCard = (item: QuickLinkItem, keyPrefix: string) => {
    const title = isMr ? item.label.mr : item.label.en;
    return (
      <a
        key={`${keyPrefix}_${item.id}`}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        aria-label={title}
        className="group shrink-0 w-44 sm:w-48 bg-white hover:bg-emerald-50/40 rounded-2xl border border-slate-200/90 hover:border-emerald-500 p-3 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col items-center justify-between gap-2"
      >
        <div className="w-full h-16 sm:h-18 flex items-center justify-center rounded-xl bg-white px-2 overflow-hidden">
          <img
            src={item.logo}
            alt={title}
            loading="lazy"
            className="max-h-14 sm:max-h-16 max-w-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="w-full flex items-center justify-center gap-1 pt-1.5 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-700 group-hover:text-emerald-800 truncate">
            {title}
          </span>
          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 shrink-0 transition-colors" />
        </div>
      </a>
    );
  };

  return (
    <section className="w-full py-8 sm:py-10 bg-slate-50 border-t border-slate-200/90">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Compact Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 shadow-xs">
              <Globe className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {isMr ? 'शीघ्र दुवे' : 'Quick Links'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {isMr
                  ? 'राष्ट्रीय व राज्यस्तरीय अधिकृत शैक्षणिक व कृषी पोर्टल्स'
                  : 'Official National, State & Academic Partner Portals'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isGridMode && (
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 text-xs font-bold text-slate-700 transition-colors"
                aria-label={isPaused ? 'Resume scroll' : 'Pause scroll'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-700" /> : <Pause className="w-3.5 h-3.5 text-slate-600" />}
                <span>{isPaused ? (isMr ? 'सुरू करा' : 'Play') : (isMr ? 'थांबवा' : 'Pause')}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsGridMode((g) => !g)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
                isGridMode
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{isGridMode ? (isMr ? 'स्क्रोल पहा' : 'Marquee') : (isMr ? 'सर्व पहा (१२)' : 'View All (12)')}</span>
            </button>
          </div>
        </div>

        {/* Grid Mode OR Smooth Infinite Marquee */}
        {isGridMode ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 justify-items-center">
            {QUICK_LINKS.map((item) => renderCard(item, 'grid'))}
          </div>
        ) : (
          <div
            className="relative overflow-hidden py-1"
            style={{
              maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
            }}
          >
            <div
              className={`mpkv-quicklinks-track flex gap-3.5 w-max ${isPaused ? 'is-paused' : ''}`}
            >
              {QUICK_LINKS.map((item) => renderCard(item, 'set1'))}
              {QUICK_LINKS.map((item) => renderCard(item, 'set2'))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .mpkv-quicklinks-track {
          animation: mpkvQuickLinksScroll 38s linear infinite;
        }
        .mpkv-quicklinks-track:hover,
        .mpkv-quicklinks-track.is-paused {
          animation-play-state: paused;
        }
        @keyframes mpkvQuickLinksScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};
