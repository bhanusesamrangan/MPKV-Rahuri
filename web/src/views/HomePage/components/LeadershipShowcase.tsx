'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { User, Award, ArrowUpRight, ExternalLink } from 'lucide-react';

interface LeadershipShowcaseProps {
  authorities: any[];
}

export const LeadershipShowcase: React.FC<LeadershipShowcaseProps> = ({ authorities }) => {
  const { language, getBilingual } = useLanguage();

  const getRoleBadge = (id: string) => {
    if (id === 'auth_1') return { en: 'Hon’ble Chancellor', mr: 'मा. कुलपती' };
    if (id === 'auth_2') return { en: 'Hon’ble Pro-Chancellor', mr: 'मा. प्रति-कुलपती' };
    return { en: 'Hon’ble Vice Chancellor', mr: 'मा. कुलगुरू' };
  };

  return (
    <section className="w-full py-6 sm:py-8 bg-[#faf9f5] relative border-b border-stone-200/70 shadow-2xs">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-stone-200/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Award className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                {language === 'mr' ? 'विद्यापीठ नेतृत्व मंडळ' : 'University Governance'}
              </span>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                {language === 'mr' ? 'प्रमुख सन्माननीय पदाधिकारी' : 'Hon’ble Leadership'}
              </h2>
            </div>
          </div>
          <span className="text-xs sm:text-sm text-stone-500 font-medium hidden sm:inline">
            {language === 'mr'
              ? 'राज्यपाल तथा कुलपती • कृषि मंत्री तथा प्रति-कुलपती • कुलगुरू'
              : 'Hon’ble Chancellor • Pro-Chancellor • Vice Chancellor'}
          </span>
        </div>

        {/* Dignitaries Grid - Expanded Prominent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {authorities.map((auth, idx) => {
            const roleBadge = getRoleBadge(auth.id);
            const rawUrl: string = auth.profile_url || '';
            const normalizedUrl =
              rawUrl && rawUrl.startsWith('rajbhavan-maharashtra.gov.in')
                ? `https://${rawUrl}`
                : rawUrl;
            const isExternal = normalizedUrl.startsWith('http');
            const targetHref =
              normalizedUrl === '/VC/VCDesk' ? '/vc-desk' : normalizedUrl;

            const cardContent = (
              <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 lg:p-6 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-300 flex items-center gap-4 sm:gap-5 lg:gap-6 group relative h-full">
                {/* Larger Profile Image with Gradient Ring */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-amber-200/90 bg-stone-50 shadow-xs relative p-0.5 bg-gradient-to-tr from-amber-200 via-stone-100 to-emerald-200 group-hover:from-amber-300 group-hover:to-emerald-300 transition-all">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      {auth.image ? (
                        <img
                          src={auth.image}
                          alt={getBilingual(auth.name)}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                          <User className="w-10 h-10 text-stone-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Text Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase mb-1.5 bg-amber-50 text-amber-900 border border-amber-200/70">
                      {getBilingual(roleBadge)}
                    </span>
                    {targetHref && (
                      <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 transition-colors shrink-0" />
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-snug group-hover:text-amber-800 transition-colors">
                    {getBilingual(auth.name)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-1">
                    {getBilingual(auth.designation)}
                  </p>
                  {targetHref && (
                    <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50/90 group-hover:bg-amber-100 border border-amber-200/80 text-amber-900 text-[11px] font-bold transition-colors">
                      <span>
                        {isExternal
                          ? (language === 'mr' ? 'राजभवन प्रोफाइल पहा' : 'View Chancellor Profile')
                          : (language === 'mr' ? 'कुलगुरू कार्यालय पहा' : "View Vice Chancellor's Desk")}
                      </span>
                      {isExternal ? (
                        <ExternalLink className="w-3 h-3 text-amber-700" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-amber-700" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );

            if (targetHref && isExternal) {
              return (
                <a
                  key={auth.id || idx}
                  href={targetHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {cardContent}
                </a>
              );
            }
            if (targetHref) {
              return (
                <Link key={auth.id || idx} href={targetHref} className="block h-full">
                  {cardContent}
                </Link>
              );
            }
            return (
              <div key={auth.id || idx} className="h-full">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
