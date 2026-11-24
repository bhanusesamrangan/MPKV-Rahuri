'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, ArrowRight } from 'lucide-react';

interface StatsCounterGridProps {
  stats: any[];
}

export const StatsCounterGrid: React.FC<StatsCounterGridProps> = ({ stats }) => {
  const { language, getBilingual } = useLanguage();

  const getStatTheme = (id: string) => {
    switch (id) {
      case 'stat_legacy':
        return {
          image: '/media/images/3d_metric_legacy.jpg',
          borderColor: 'border-amber-200/90 hover:border-amber-400',
          numberColor: 'text-amber-800',
          glow: 'hover:shadow-amber-500/20',
          accentBar: 'bg-gradient-to-r from-amber-400 to-amber-600',
          tag: language === 'mr' ? 'गौरवशाली वारसा' : 'Golden Heritage'
        };
      case 'stat_students':
        return {
          image: '/media/images/3d_metric_students.jpg',
          borderColor: 'border-emerald-200/90 hover:border-emerald-400',
          numberColor: 'text-emerald-800',
          glow: 'hover:shadow-emerald-500/20',
          accentBar: 'bg-gradient-to-r from-emerald-400 to-green-600',
          tag: language === 'mr' ? 'उच्च कृषी शिक्षण' : 'Higher Education'
        };
      case 'stat_faculty':
        return {
          image: '/media/images/3d_metric_faculty.jpg',
          borderColor: 'border-blue-200/90 hover:border-blue-400',
          numberColor: 'text-blue-800',
          glow: 'hover:shadow-blue-500/20',
          accentBar: 'bg-gradient-to-r from-blue-400 to-indigo-600',
          tag: language === 'mr' ? 'शास्त्रज्ञ व प्राध्यापक' : 'Scientific Faculty'
        };
      case 'stat_projects':
        return {
          image: '/media/images/3d_metric_projects.jpg',
          borderColor: 'border-purple-200/90 hover:border-purple-400',
          numberColor: 'text-purple-800',
          glow: 'hover:shadow-purple-500/20',
          accentBar: 'bg-gradient-to-r from-purple-400 to-violet-600',
          tag: language === 'mr' ? 'प्रगत संशोधन' : 'Research Schemes'
        };
      case 'stat_stations':
        return {
          image: '/media/images/3d_metric_stations.jpg',
          borderColor: 'border-teal-200/90 hover:border-teal-400',
          numberColor: 'text-teal-800',
          glow: 'hover:shadow-teal-500/20',
          accentBar: 'bg-gradient-to-r from-teal-400 to-teal-600',
          tag: language === 'mr' ? 'संशोधन केंद्रे' : 'Field Stations'
        };
      case 'stat_patents':
        return {
          image: '/media/images/3d_metric_patents.jpg',
          borderColor: 'border-rose-200/90 hover:border-rose-400',
          numberColor: 'text-rose-800',
          glow: 'hover:shadow-rose-500/20',
          accentBar: 'bg-gradient-to-r from-rose-400 to-pink-600',
          tag: language === 'mr' ? 'पेटंट्स व शोध' : 'Patents & IP'
        };
      case 'stat_nirf':
        return {
          image: '/media/images/nirf_award_2025.jpg',
          borderColor: 'border-amber-200/90 hover:border-amber-400',
          numberColor: 'text-amber-800',
          glow: 'hover:shadow-amber-500/20',
          accentBar: 'bg-gradient-to-r from-amber-500 to-yellow-600',
          tag: language === 'mr' ? 'राष्ट्रीय मानांकन' : 'NIRF Rank 15'
        };
      default:
        return {
          image: '/media/images/3d_metric_legacy.jpg',
          borderColor: 'border-stone-200/90 hover:border-emerald-400',
          numberColor: 'text-emerald-800',
          glow: 'hover:shadow-emerald-500/20',
          accentBar: 'bg-gradient-to-r from-emerald-400 to-teal-600',
          tag: language === 'mr' ? 'संस्थात्मक उपलब्धी' : 'Achievement'
        };
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 lg:py-14 bg-[#edf3ed] relative overflow-hidden border-t border-stone-300">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] relative z-10 space-y-5 sm:space-y-7">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-stone-300">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              {language === 'mr' ? 'संख्यात्मक उपलब्धी व संस्थात्मक क्षमता' : 'Institutional Scale & Research Metrics'}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-emerald-950 bg-gradient-to-r from-emerald-100 via-amber-100 to-teal-100 px-3 py-1 rounded-full border border-emerald-300/90 shadow-2xs self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? '५७ वर्षांचे कृषी योगदान' : '57 Years of Agrarian Impact'}</span>
          </span>
        </div>

        {/* 7 Illustrated 3D Showcase Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-2.5 sm:gap-3.5 lg:gap-4.5">
          {stats.map((stat) => {
            const theme = getStatTheme(stat.id);

            return (
              <div
                key={stat.id}
                className={`rounded-2xl sm:rounded-3xl bg-white border ${theme.borderColor} transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl ${theme.glow} hover:-translate-y-1.5 group cursor-pointer overflow-hidden relative p-2.5 sm:p-3 lg:p-3.5`}
              >
                {/* Top Distinctive Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 sm:h-1.5 ${theme.accentBar}`} />

                <div className="space-y-2 sm:space-y-2.5 pt-0.5 sm:pt-1">
                  
                  {/* 3D Illustrated Visual Showcase - Guaranteed Square Proportions */}
                  <div
                    className="w-full aspect-square relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900/5 border border-stone-100 shadow-inner flex-shrink-0"
                    style={{ aspectRatio: '1 / 1' }}
                  >
                    <img
                      src={theme.image}
                      alt={getBilingual(stat.label)}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Micro Category Tag */}
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 flex items-center justify-center">
                      <span className="px-2 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold border border-white/20 shadow-xs tracking-wide truncate max-w-full">
                        {theme.tag}
                      </span>
                    </div>
                  </div>

                  {/* Bold Metric Number */}
                  <div className="text-center pt-0.5">
                    <div className={`text-2xl sm:text-2xl lg:text-[28px] font-black tracking-tight leading-none ${theme.numberColor}`}>
                      {stat.number}
                    </div>
                  </div>

                  {/* Bilingual Descriptive Title */}
                  <div className="text-xs sm:text-[13px] lg:text-[14px] font-bold text-slate-800 text-center leading-snug line-clamp-2 min-h-[28px] sm:min-h-[34px] flex items-center justify-center px-0.5">
                    {getBilingual(stat.label)}
                  </div>

                </div>

                {/* Subtle Hover Action Footer */}
                <div className="pt-2 mt-2.5 border-t border-stone-100 flex items-center justify-center text-[11px] sm:text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                  <span className="inline-flex items-center gap-1">
                    <span>{language === 'mr' ? 'सविस्तर' : 'Explore'}</span>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
