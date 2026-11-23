'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sprout,
  Package,
  Wrench,
  Calendar,
  Radio,
  CloudRain,
  Download,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface FarmerServicesRibbonProps {
  calendarMonths: any[];
}

export const FarmerServicesRibbon: React.FC<FarmerServicesRibbonProps> = ({ calendarMonths }) => {
  const { language, getBilingual } = useLanguage();

  const quickTiles = [
    {
      title: language === 'mr' ? 'बियाणे उपलब्धता साठा' : 'Certified Seed Stock',
      subtitle: language === 'mr' ? 'तृणधान्ये, कडधान्ये व गळीत धान्ये' : 'Cereals, Pulses & Oilseeds',
      icon: Package,
      link: '/seeds-availability',
      iconBg: 'bg-emerald-50 text-emerald-700',
      badge: language === 'mr' ? 'प्रमाणित साठा' : 'Certified Stock',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      title: language === 'mr' ? 'मध्यवर्ती रोपवाटिका साठा' : 'Central Nursery Stock',
      subtitle: language === 'mr' ? 'फळझाडे कलमे व रोपे' : 'Fruit Grafts & Saplings',
      icon: Sprout,
      link: '/nursery-stock',
      iconBg: 'bg-amber-50 text-amber-700',
      badge: language === 'mr' ? 'राहुरी परिसर' : 'Rahuri Farm',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      title: language === 'mr' ? 'विकसित शेती अवजारे' : 'Rahuri Farm Machinery',
      subtitle: language === 'mr' ? 'ट्रॅक्टर व बैलचलित यंत्रे' : 'Tractor & Bullock Implements',
      icon: Wrench,
      link: '/farm-implements',
      iconBg: 'bg-blue-50 text-blue-700',
      badge: language === 'mr' ? '३५+ अवजारे' : '35+ Patents',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      title: language === 'mr' ? 'फुले कृषिवाहिनी ९०.८ FM' : 'Phule FM 90.8 Radio',
      subtitle: language === 'mr' ? 'थेट स्टुडिओ प्रक्षेपण' : 'Live Rural Broadcast',
      icon: Radio,
      link: 'https://digitalradio.co.in:8020/stream',
      isExternal: true,
      iconBg: 'bg-rose-50 text-rose-700',
      badge: language === 'mr' ? 'लाईव्ह' : 'Live',
      badgeColor: 'bg-rose-100 text-rose-800'
    }
  ];

  return (
    <section className="w-full py-16 bg-[#f8fafc] text-slate-800 relative overflow-hidden border-y border-slate-200/80">
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 xl:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{language === 'mr' ? 'शेतकरी प्रथम डेस्क' : 'Farmer First Quick Desk'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 tracking-tight">
            {language === 'mr' ? 'कृषि निविष्ठा, बियाणे, कलमे व वेळापत्रक' : 'Direct Seeds, Plant Stock & Advisory Gateway'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-2 max-w-2xl mx-auto">
            {language === 'mr'
              ? 'मफुकृवि राहुरी मध्यवर्ती प्रक्षेत्रातील दर्जेदार प्रमाणित बियाणे, कलमे, अवजारे आणि महिनानिहाय कृषि वेळापत्रक.'
              : 'Direct farmer access to central seed counters, fruit nurseries, farm machinery and the 12-month agricultural calendar.'}
          </p>
        </div>

        {/* 4 Quick Action Tiles (Clean White Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickTiles.map((tile, idx) => {
            const Icon = tile.icon;
            const TileContent = (
              <div className="h-full p-6 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl ${tile.iconBg} flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${tile.badgeColor}`}>
                      {tile.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                      {tile.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {tile.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-slate-700 group-hover:text-amber-600">
                  <span>{language === 'mr' ? 'तपासा' : 'Open Desk'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-amber-600" />
                </div>
              </div>
            );

            return tile.isExternal ? (
              <a
                key={idx}
                href={tile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {TileContent}
              </a>
            ) : (
              <Link key={idx} href={tile.link} className="block">
                {TileContent}
              </Link>
            );
          })}
        </div>

        {/* 12-Month Agricultural Calendar Showcase (Clean White Modern Container) */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-semibold text-base sm:text-lg text-slate-900">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span>{language === 'mr' ? 'कृषि वेळापत्रक (महिनानिहाय मार्गदर्शिका)' : '12-Month Agriculture Calendar'}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {language === 'mr'
                  ? 'हंगामनिहाय पिकांचे व्यवस्थापन, पेरणी, आंतरमशागत व कीड-रोग नियंत्रणाचे संपूर्ण वेळापत्रक.'
                  : 'Month-by-month agricultural operations, sowing schedules, nutrient management, and crop protection.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm text-slate-700 font-semibold px-3.5 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                12 Monthly PDF Guides
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {calendarMonths.slice(0, 12).map((m: any) => (
              <a
                key={m.month_number}
                href={m.file_path}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl border border-slate-200/80 text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 group text-slate-800"
              >
                <div className="text-sm font-semibold tracking-wide">
                  {getBilingual(m.name)}
                </div>
                <div className="text-xs text-slate-500 group-hover:text-amber-400 flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
