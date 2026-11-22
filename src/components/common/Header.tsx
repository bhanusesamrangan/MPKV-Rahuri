'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Award, PhoneCall, CheckCircle2, Building } from 'lucide-react';

export const Header: React.FC = () => {
  const { language } = useLanguage();

  return (
    <header className="w-full bg-[#fdfcf9] border-b border-stone-200/60 relative z-30 transition-colors">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 xl:px-12 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Brand identity: Emblem + University Typography */}
        <div className="flex items-center gap-4 group">
          <Link to="/" className="relative flex-shrink-0 flex items-center gap-3.5">
            <div className="relative">
              <img
                src="/media/logos/Logo.png"
                alt="MPKV Rahuri Emblem"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Bilingual Institutional Titles */}
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-snug">
                महात्मा फुले कृषि विद्यापीठ, राहुरी
              </span>
              <span className="text-xs sm:text-sm md:text-base font-medium text-slate-600 tracking-normal leading-snug">
                Mahatma Phule Krishi Vidyapeeth, Rahuri
              </span>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-normal text-slate-500">
                <span className="flex items-center gap-1 text-slate-600">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {language === 'mr'
                      ? 'मध्यवर्ती विद्यापीठ मुख्यालय · अहिल्यानगर (महाराष्ट्र)'
                      : 'Central University Headquarters · Ahilyanagar (M.S.)'}
                  </span>
                </span>
                <span className="inline-block w-1 h-1 bg-amber-400 rounded-full" />
                <span className="text-amber-800 font-medium bg-amber-50/80 border border-amber-200/60 px-2.5 py-0.5 rounded-full text-[11px]">
                  {language === 'mr' ? 'स्थापना १९६८' : 'Est. 1968'}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Badges: ICAR 'A' Grade + NIRF + Seed Desk Hotline */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 justify-end w-full lg:w-auto">
          {/* ICAR 'A' Grade Badge (Soft Pastel Sheen) */}
          <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-200/60 rounded-xl px-3 py-1.5 shadow-2xs">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-semibold text-xs flex-shrink-0 border border-emerald-300">
              A
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-800 flex items-center gap-1 leading-none">
                <span>ICAR Accredited</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
              </div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                {language === 'mr' ? "'अ' श्रेणी राष्ट्रीय मानांकन" : "'A' Grade University"}
              </div>
            </div>
          </div>

          {/* Rahuri NIRF Badge (Soft Pastel) */}
          <div className="hidden sm:flex items-center gap-2 bg-amber-50/60 border border-amber-200/60 rounded-xl px-3 py-1.5 shadow-2xs">
            <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div className="text-left">
              <div className="text-xs font-semibold text-amber-950 leading-none">
                NIRF 15<sup>th</sup> Rank
              </div>
              <div className="text-[11px] text-amber-800/80 font-normal mt-0.5">
                {language === 'mr' ? 'अखिल भारतीय मानांकन' : 'All-India Agril Rank'}
              </div>
            </div>
          </div>

          {/* Quick Helpline */}
          <a
            href="tel:02426243345"
            className="flex items-center gap-2.5 bg-white hover:bg-slate-50 border border-stone-200/80 rounded-xl px-3 py-1.5 shadow-2xs transition-colors group/phone"
            title={language === 'mr' ? 'राहुरी बियाणे विक्री कक्षास कॉल करा' : 'Call Rahuri Central Seed Desk'}
          >
            <div className="w-7 h-7 rounded-full bg-slate-100 group-hover/phone:bg-amber-100 text-slate-600 group-hover/phone:text-amber-800 flex items-center justify-center flex-shrink-0 transition-colors">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <div className="text-left text-xs">
              <div className="font-medium text-slate-600">
                {language === 'mr' ? 'बियाणे कक्ष' : 'Seed Desk'}
              </div>
              <div className="text-slate-800 font-semibold text-xs tracking-tight">
                02426-243345
              </div>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
