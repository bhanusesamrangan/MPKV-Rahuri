'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  CalendarHeart,
  Compass,
  BookOpen,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LibrarySubnav } from './components/LibrarySubnav';

interface ActivityItem {
  id: string;
  tag: { en: string; mr: string };
  cadence: { en: string; mr: string };
  title: { en: string; mr: string };
  desc: { en: string; mr: string };
}

export const LibraryActivitiesView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const activities: ActivityItem[] = pageData?.activities || [];

  const findAct = (id: string) => activities.find((a) => a.id === id);
  const pgs = findAct('pgs-501');
  const ranganathan = findAct('remembrance-day');
  const orientation = findAct('orientation');
  const exhibitions = findAct('exhibitions');

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#fcf9f2] text-slate-800">
      <LibrarySubnav
        activeSlug="library-activities"
        currentTitle={{ en: 'Library Activities', mr: 'ग्रंथालय उपक्रम' }}
        accentActiveClass="bg-[#713f12] text-amber-100 border-[#713f12] shadow-xs"
      />

      {/* WARM HARVEST OCHRE HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3f1d0b] via-[#6b3410] to-[#92400e] text-white border-b-4 border-amber-300">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-300/15 border border-amber-200/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{getTxt(pageData?.hero?.badge)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-4xl">
            {getTxt(pageData?.hero?.title)}
          </h1>
          <p className="text-sm sm:text-base text-amber-100/90 max-w-3xl leading-relaxed">
            {getTxt(pageData?.hero?.subtitle)}
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-8">
        {/* TOP SPLIT SPOTLIGHT: PGS-501 COURSE vs 27 SEP REMEMBRANCE DAY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* PGS 501 NCCC Spotlight */}
          {pgs && (
            <div className="lg:col-span-7 rounded-3xl bg-[#292524] text-white p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-md border-l-8 border-amber-400">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-extrabold uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4" />
                    {getTxt(pgs.tag)}
                  </span>
                  <span className="text-xs font-semibold text-amber-200">{getTxt(pgs.cadence)}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{getTxt(pgs.title)}</h2>
                <p className="text-sm sm:text-base text-stone-200 leading-relaxed">{getTxt(pgs.desc)}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-stone-300">
                  {language === 'mr'
                    ? 'अधिकृत अभ्यासक्रम पुस्तिका: Library & Information Services Manual'
                    : 'Manual Published: Library and Information Services: A Manual for PGS-501 Course'}
                </span>
                <Link
                  href="/library/news-events"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-stone-950 text-xs font-bold hover:bg-amber-300 transition-colors"
                >
                  <span>{language === 'mr' ? 'प्रकाशने पहा' : 'View Course Publications'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* 27 Sept Dr. S. R. Ranganathan Commemoration */}
          {ranganathan && (
            <div className="lg:col-span-5 rounded-3xl bg-white border-2 border-amber-300/70 p-7 sm:p-8 flex flex-col justify-between space-y-5 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl bg-amber-500 text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <span className="text-2xl font-extrabold leading-none">27</span>
                  <span className="text-xs font-bold uppercase tracking-widest mt-1">SEP</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    {getTxt(ranganathan.tag)}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{getTxt(ranganathan.title)}</h2>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{getTxt(ranganathan.desc)}</p>
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2 text-xs font-semibold text-amber-900">
                <CalendarHeart className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{getTxt(ranganathan.cadence)}</span>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM DUAL ACADEMIC ENGAGEMENT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orientation && (
            <div className="bg-white rounded-2xl border border-stone-200/80 p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-stone-100 text-slate-700 text-xs font-bold">
                  {getTxt(orientation.cadence)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{getTxt(orientation.title)}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{getTxt(orientation.desc)}</p>
            </div>
          )}

          {exhibitions && (
            <div className="bg-white rounded-2xl border border-stone-200/80 p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-800">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                  {getTxt(exhibitions.cadence)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{getTxt(exhibitions.title)}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{getTxt(exhibitions.desc)}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
