'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Bell,
  Briefcase,
  FileText,
  Download,
  Calendar,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Clock
} from 'lucide-react';

interface AnnouncementsTabsProps {
  news: any[];
  recruitment: any[];
  tenders: any[];
}

export const AnnouncementsTabs: React.FC<AnnouncementsTabsProps> = ({
  news,
  recruitment,
  tenders
}) => {
  const { language, getBilingual } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'recruitment' | 'tenders'>('all');

  const circulars = [
    {
      id: 'circ_1',
      date: '23 Oct 2026',
      title: {
        en: 'Public Notice - 40th Annual Convocation Ceremony of MPKV Rahuri',
        mr: 'जाहीर निवेदन - ४० वा वार्षिक पदवी प्रदान समारंभ, मफुकृवि राहुरी'
      },
      file_path: '/media/docs/20261023_130053_1fbfc1813c46b15f8b89ce15a8d04ca0.pdf'
    },
    {
      id: 'circ_2',
      date: '29 Oct 2026',
      title: {
        en: 'Life Certificate - Specimen form for Pensioners of MPKV Rahuri as of 1 November 2026',
        mr: 'हयातीचे प्रमाणपत्र - मफुकृवि निवृत्ती वेतनधारकांकडून १ नोव्हेंबर २०२६ रोजी हयात असलेले प्रमाणपत्राचा नमुना'
      },
      file_path: '/media/docs/20261029_170823_076f9e632d377675d7eac8cfb5f5e60e.pdf'
    },
    {
      id: 'circ_3',
      date: '17 Nov 2026',
      title: {
        en: 'Admission Notification for Ph.D. Degree Programmes Academic Year 2026-27 at Central Campus',
        mr: 'सन २०२६-२७ आचार्य पदवी (Ph.D.) अभ्यासक्रमाची प्रवेश सूचना - मध्यवर्ती परिसर, राहुरी'
      },
      file_path: '/media/docs/20261117_160948_9ce404dba955b1b1cd65dbc6e3cecd3a.pdf'
    }
  ];

  const upcomingEvents = [
    {
      en: 'Phule Krishi Mahotsav 2026 & State Level Farmer Field Demonstrations at Rahuri Central Campus',
      mr: 'फुले कृषि महोत्सव २०२६ व राज्यस्तरीय शेतकरी पीक प्रात्यक्षिके - मध्यवर्ती परिसर, राहुरी'
    },
    {
      en: '40th Annual Convocation Ceremony of Mahatma Phule Krishi Vidyapeeth, Rahuri',
      mr: 'महात्मा फुले कृषि विद्यापीठ राहुरीचा ४० वा वार्षिक दीक्षांत समारंभ'
    },
    {
      en: 'Special Workshop on Precision Drone Spraying & Climate Smart Agriculture (CAAST-CSAWM)',
      mr: 'कृषि शिक्षणात ड्रोन तंत्रज्ञान व हवामान अनुकूल शेती विशेष कार्यशाळा (CAAST-CSAWM)'
    },
    {
      en: 'State Level Rabi Crop Demonstration & Certified Breeder Seed Distribution Camp, Rahuri',
      mr: 'रब्बी हंगाम राज्यस्तरीय पीक प्रात्यक्षिक व प्रमाणित मूलभूत बियाणे वाटप मोहीम'
    },
    {
      en: 'Entrance Examination for Ph.D. Agricultural Programmes Academic Year 2026-27',
      mr: 'सन २०२६-२७ आचार्य पदवी (Ph.D.) अभ्यासक्रम राष्ट्रीय प्रवेश परीक्षा'
    }
  ];

  // Helper to split date into Month & Day for live calendar badge pins
  const parseDatePin = (dateStr?: string) => {
    const monthMapMr: Record<string, string> = {
      JAN: 'जाने', FEB: 'फेब्रु', MAR: 'मार्च', APR: 'एप्रिल',
      MAY: 'मे', JUN: 'जून', JUL: 'जुलै', AUG: 'ऑग',
      SEP: 'सप्टे', OCT: 'ऑक्टो', NOV: 'नोव्हे', DEC: 'डिसे'
    };

    if (!dateStr) return { day: '14', month: language === 'mr' ? 'ऑक्टो' : 'OCT' };
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      const isNumFirst = /^\d+$/.test(parts[0]);
      const day = isNumFirst ? parts[0] : parts[1];
      const rawMonth = isNumFirst ? parts[1].substring(0, 3).toUpperCase() : parts[0].substring(0, 3).toUpperCase();
      const month = language === 'mr' ? (monthMapMr[rawMonth] || rawMonth) : rawMonth;
      return { day, month };
    }
    return { day: '14', month: language === 'mr' ? 'ऑक्टो' : 'OCT' };
  };

  const combinedTendersAndCirculars = [
    ...tenders.map((t) => ({ ...t, kind: 'tender' })),
    ...circulars.map((c) => ({ ...c, kind: 'circular' }))
  ];

  return (
    <section className="w-full py-12 sm:py-14 bg-[#f4f7f4] border-y border-stone-200/90">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] space-y-5 sm:space-y-6">
        
        {/* Top Ticker: Live Upcoming Events & Alerts Ribbon (Continuous Auto-Scroll) */}
        <div className="w-full rounded-2xl bg-gradient-to-r from-amber-500/12 via-emerald-600/10 to-amber-500/12 border border-amber-300/60 p-2 sm:p-2.5 flex items-center gap-3 overflow-hidden shadow-2xs group/ticker">
          <div className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-xs z-10">
            <Clock className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'पुढील कार्यक्रम' : 'Upcoming Events'}</span>
          </div>
          <div className="flex-1 min-w-0 overflow-hidden relative">
            <div className="animate-marquee-continuous flex items-center gap-8 text-xs text-slate-800 font-semibold whitespace-nowrap cursor-pointer">
              {/* Double array ensures seamless, gapless continuous loop */}
              {[...upcomingEvents, ...upcomingEvents].map((evt, idx) => (
                <span key={idx} className="inline-flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                  <span className="hover:text-amber-900 transition-colors">{getBilingual(evt)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200/90">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] sm:text-xs font-bold tracking-wide mb-2 shadow-2xs">
              <Bell className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'mr' ? 'अधिकृत घोषणा व प्रसिद्धीपत्रके' : 'Official Notices & Gazettes'}</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold text-slate-900 tracking-tight">
              {language === 'mr' ? 'सूचना, भरती व निविदा केंद्र' : 'Notices, Recruitment & Tender Desk'}
            </h2>
          </div>

          {/* View Filter Switcher: Desktop All 3 Columns vs Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-white/80 p-1.5 rounded-2xl border border-stone-200/90 shadow-2xs select-none text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-medium'
              }`}
            >
              {language === 'mr' ? 'सर्व विभाग (३ स्तंभ)' : 'All Columns'}
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'news'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-medium'
              }`}
            >
              <Bell className="w-3 h-3 text-amber-400" />
              <span>{language === 'mr' ? 'बातम्या' : 'News'}</span>
              <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'news' ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {news.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('recruitment')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'recruitment'
                  ? 'bg-sky-700 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-medium'
              }`}
            >
              <Briefcase className="w-3 h-3 text-sky-300" />
              <span>{language === 'mr' ? 'भरती' : 'Recruitment'}</span>
              <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'recruitment' ? 'bg-sky-600 text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {recruitment.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('tenders')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'tenders'
                  ? 'bg-teal-700 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-medium'
              }`}
            >
              <FileText className="w-3 h-3 text-teal-300" />
              <span>{language === 'mr' ? 'निविदा व परिपत्रके' : 'Tenders & Circulars'}</span>
              <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'tenders' ? 'bg-teal-600 text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {combinedTendersAndCirculars.length}
              </span>
            </button>
          </div>
        </div>

        {/* 3-Column Simultaneous Real-Time Desk Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* COLUMN 1: NEWS & HAPPENINGS */}
          {(activeTab === 'all' || activeTab === 'news') && (
            <div className="flex flex-col h-[540px] bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden">
              <div className="flex-shrink-0 px-5 py-3.5 bg-emerald-50/80 border-b border-emerald-200/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-emerald-950 leading-tight">
                      {language === 'mr' ? 'बातम्या व शेतकरी सल्ला' : 'News & Recent Happenings'}
                    </h3>
                    <p className="text-[11px] text-emerald-800/80 font-medium">
                      {language === 'mr' ? 'अधिकृत दैनिक घडामोडी' : 'Daily Updates & Advisories'}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-2xs">
                  {news.length}
                </span>
              </div>

              {/* Scrollable list with subtle spacing between rows */}
              <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
                {news.map((item, idx) => {
                  const datePin = parseDatePin(item.date);
                  return (
                    <div
                      key={item.id || idx}
                      className="p-3 sm:p-3.5 bg-white hover:bg-emerald-50/40 border border-stone-200/80 hover:border-emerald-200 rounded-xl transition-all shadow-2xs group flex items-start gap-3.5"
                    >
                      {/* Calendar Date Badge */}
                      <div className="flex-shrink-0 w-11 text-center rounded-xl bg-white border border-amber-200 overflow-hidden shadow-2xs">
                        <div className="bg-amber-500/90 text-white text-[9.5px] font-bold py-0.5 tracking-wider uppercase">
                          {datePin.month}
                        </div>
                        <div className="text-sm font-extrabold text-slate-800 py-1 bg-amber-50/40">
                          {datePin.day}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-[13px] font-semibold text-slate-900 group-hover:text-emerald-950 leading-snug line-clamp-3">
                          {getBilingual(item.title)}
                        </h4>
                        <div className="mt-2 flex items-center justify-between text-[11px]">
                          <span className="text-stone-500 font-medium">
                            {language === 'mr' ? 'सल्ला / बातमी' : 'Advisory / Press'}
                          </span>
                          <a
                            href={item.link || item.original_link || '#'}
                            className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                          >
                            <span>{language === 'mr' ? 'सविस्तर वाचा' : 'Read'}</span>
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column Footer Pinned to Bottom */}
              <div className="flex-shrink-0 mt-auto p-3 bg-emerald-50/50 border-t border-emerald-150 text-center">
                <a
                  href="#news-archive"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  <span>{language === 'mr' ? 'सर्व बातम्या पहा' : 'View All News & Advisories'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* COLUMN 2: RECRUITMENT DESK */}
          {(activeTab === 'all' || activeTab === 'recruitment') && (
            <div className="flex flex-col h-[540px] bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden">
              <div className="flex-shrink-0 px-5 py-3.5 bg-sky-50/80 border-b border-sky-200/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-600 text-white shadow-xs">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-sky-950 leading-tight">
                      {language === 'mr' ? 'भरती प्रक्रिया व जाहिराती' : 'Recruitment & Job Openings'}
                    </h3>
                    <p className="text-[11px] text-sky-800/80 font-medium">
                      {language === 'mr' ? 'संशोधन, प्राध्यापक व प्रकल्प पदे' : 'Faculty, Project & Research Posts'}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-sky-600 text-white font-bold text-xs shadow-2xs">
                  {recruitment.length}
                </span>
              </div>

              {/* Scrollable list with subtle spacing between rows */}
              <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
                {recruitment.map((item, idx) => {
                  const datePin = parseDatePin(item.date);
                  return (
                    <div
                      key={item.id || idx}
                      className="p-3.5 sm:p-3.5 bg-white hover:bg-sky-50/40 border border-stone-200/80 hover:border-sky-200 rounded-xl transition-all shadow-2xs group flex items-start gap-3.5"
                    >
                      {/* Calendar Date Badge */}
                      <div className="flex-shrink-0 w-11 text-center rounded-xl bg-white border border-sky-200 overflow-hidden shadow-2xs">
                        <div className="bg-sky-600/90 text-white text-[9.5px] font-bold py-0.5 tracking-wider uppercase">
                          {datePin.month}
                        </div>
                        <div className="text-sm font-extrabold text-slate-800 py-1 bg-sky-50/40">
                          {datePin.day}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-[13px] font-semibold text-slate-900 group-hover:text-sky-950 leading-snug line-clamp-3">
                          {getBilingual(item.title)}
                        </h4>
                        <div className="mt-2 flex items-center justify-between text-[11px]">
                          <span className="text-sky-800 font-semibold px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200">
                            {language === 'mr' ? 'PDF जाहिरात' : 'PDF Notice'}
                          </span>
                          <a
                            href={item.file_path || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-sky-800 hover:text-sky-950 transition-colors"
                          >
                            <span>{language === 'mr' ? 'डाउनलोड करा' : 'Download PDF'}</span>
                            <Download className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column Footer Pinned to Bottom */}
              <div className="flex-shrink-0 mt-auto p-3 bg-sky-50/50 border-t border-sky-150 text-center">
                <a
                  href="#recruitment-archive"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 hover:text-sky-950 transition-colors"
                >
                  <span>{language === 'mr' ? 'सर्व भरती जाहिराती पहा' : 'View All Recruitment Notices'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* COLUMN 3: E-TENDERS & CIRCULARS */}
          {(activeTab === 'all' || activeTab === 'tenders') && (
            <div className="flex flex-col h-[540px] bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden">
              <div className="flex-shrink-0 px-5 py-3.5 bg-teal-50/80 border-b border-teal-200/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-teal-600 text-white shadow-xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-teal-950 leading-tight">
                      {language === 'mr' ? 'ई-निविदा व परिपत्रके' : 'Tenders, Quotes & Circulars'}
                    </h3>
                    <p className="text-[11px] text-teal-800/80 font-medium">
                      {language === 'mr' ? 'खरेदी प्रक्रिया व प्रशासकीय आदेश' : 'Procurement & University Circulars'}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-600 text-white font-bold text-xs shadow-2xs">
                  {combinedTendersAndCirculars.length}
                </span>
              </div>

              {/* Scrollable list with subtle spacing between rows */}
              <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
                {combinedTendersAndCirculars.map((item, idx) => {
                  const datePin = parseDatePin(item.date);
                  return (
                    <div
                      key={item.id || idx}
                      className="p-3 sm:p-3.5 bg-white hover:bg-teal-50/40 border border-stone-200/80 hover:border-teal-200 rounded-xl transition-all shadow-2xs group flex items-start gap-3.5"
                    >
                      {/* Calendar Date Badge */}
                      <div className="flex-shrink-0 w-11 text-center rounded-xl bg-white border border-teal-200 overflow-hidden shadow-2xs">
                        <div className="bg-teal-600/90 text-white text-[9.5px] font-bold py-0.5 tracking-wider uppercase">
                          {datePin.month}
                        </div>
                        <div className="text-sm font-extrabold text-slate-800 py-1 bg-teal-50/40">
                          {datePin.day}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-[13px] font-semibold text-slate-900 group-hover:text-teal-950 leading-snug line-clamp-3">
                          {getBilingual(item.title)}
                        </h4>
                        <div className="mt-2 flex items-center justify-between text-[11px]">
                          <span className="text-teal-800 font-semibold px-2 py-0.5 rounded-md bg-teal-50 border border-teal-200">
                            {item.kind === 'tender'
                              ? language === 'mr'
                                ? 'ई-निविदा'
                                : 'E-Tender'
                              : language === 'mr'
                              ? 'परिपत्रक'
                              : 'Circular'}
                          </span>
                          <a
                            href={item.file_path || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-teal-800 hover:text-teal-950 transition-colors"
                          >
                            <span>{language === 'mr' ? 'दस्तऐवज' : 'Download'}</span>
                            <Download className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column Footer Pinned to Bottom */}
              <div className="flex-shrink-0 mt-auto p-3 bg-teal-50/50 border-t border-teal-150 text-center">
                <a
                  href="#tenders-archive"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 transition-colors"
                >
                  <span>{language === 'mr' ? 'सर्व निविदा व परिपत्रके पहा' : 'View All Tenders & Circulars'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
