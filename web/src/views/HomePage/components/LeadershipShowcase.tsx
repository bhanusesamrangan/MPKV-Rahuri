'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { User, Award, ArrowUpRight } from 'lucide-react';

interface LeadershipShowcaseProps {
  authorities: any[];
}

export const LeadershipShowcase: React.FC<LeadershipShowcaseProps> = ({ authorities }) => {
  const { language, getBilingual } = useLanguage();

  return (
    <section className="w-full py-16 bg-[#faf9f5] relative overflow-hidden border-t border-stone-200/50">
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 xl:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50/80 border border-amber-200/60 text-amber-900 text-xs sm:text-sm font-medium tracking-wide mb-2.5">
            <Award className="w-4 h-4 text-amber-600" />
            <span>{language === 'mr' ? 'विद्यापीठ नेतृत्व मंडळ' : 'University Governance'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 tracking-tight">
            {language === 'mr' ? 'प्रमुख सन्माननीय पदाधिकारी' : 'Hon’ble Leadership'}
          </h2>
          <div className="h-0.5 w-12 bg-amber-400/80 mx-auto mt-2.5 rounded-full" />
        </div>

        {/* Dignitaries Row - Soft Pastel Leisurely Layout */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {authorities.map((auth, idx) => (
            <div
              key={auth.id || idx}
              className="w-full sm:w-64 lg:w-72 group relative flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-1 z-10"
            >
              {/* Profile Image with Soft Pastel Gradient Ring */}
              <div className="relative mb-4">
                <div className="relative p-1 rounded-full bg-gradient-to-tr from-amber-200 via-stone-200 to-emerald-200 shadow-2xs group-hover:shadow-md transition-all duration-300">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white bg-white relative z-10">
                    {auth.image ? (
                      <img
                        src={auth.image}
                        alt={getBilingual(auth.name)}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                        <User className="w-12 h-12 text-stone-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Dignitary Name */}
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1 leading-snug group-hover:text-amber-700 transition-colors">
                {getBilingual(auth.name)}
              </h3>

              {/* Designation Text */}
              <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-[240px]">
                {getBilingual(auth.designation)}
              </p>

              {/* Action Link if VC */}
              {auth.profile_url && (
                <Link
                  href={auth.profile_url.startsWith('http') ? auth.profile_url : '/vc-desk'}
                  className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-stone-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors shadow-2xs"
                >
                  <span>{language === 'mr' ? 'सविस्तर मनोगत' : 'VC Message'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
