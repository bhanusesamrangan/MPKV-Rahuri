'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Award } from 'lucide-react';

interface StatsCounterGridProps {
  stats: any[];
}

export const StatsCounterGrid: React.FC<StatsCounterGridProps> = ({ stats }) => {
  const { language, getBilingual } = useLanguage();

  return (
    <section className="w-full py-16 bg-[#f5f8f6] relative overflow-hidden border-t border-stone-200/60">
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 xl:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50/80 border border-amber-200/60 text-amber-900 text-xs sm:text-sm font-semibold tracking-wide mb-2.5">
            <Award className="w-4 h-4 text-amber-600" />
            <span>{language === 'mr' ? '५७ वर्षांचा गौरवशाली वारसा' : '57 Years of Heritage'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 tracking-tight">
            {language === 'mr' ? 'संख्यात्मक उपलब्धी व क्षमता' : 'Institutional Scale & Research Metrics'}
          </h2>
        </div>

        {/* 7 Counter Columns - Soft Pastel Leisurely Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3.5 sm:gap-4.5">
          {stats.map((stat, idx) => (
            <div
              key={stat.id || idx}
              className="p-5 rounded-2xl bg-white border border-stone-200/70 hover:border-amber-300 transition-all duration-300 text-center flex flex-col justify-center items-center shadow-2xs hover:shadow-xs group"
            >
              <div className="text-3xl sm:text-4xl font-semibold text-amber-600 group-hover:scale-105 transition-transform duration-300">
                {stat.number}
              </div>
              {stat.suffix && (
                <span className="text-xs font-semibold uppercase text-emerald-700 tracking-wider mt-0.5">
                  {stat.suffix}
                </span>
              )}
              <div className="text-sm font-medium text-slate-700 mt-2 leading-snug">
                {getBilingual(stat.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
