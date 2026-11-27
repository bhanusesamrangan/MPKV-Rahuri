'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Landmark,
  Clock,
  Ruler,
  BookOpen,
  ZoomIn,
  X,
  ArrowRight,
  Building2,
  Award,
  Users,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LibrarySubnav } from './components/LibrarySubnav';

interface SectionItem {
  id: string;
  heading: { en: string; mr: string };
  body: { en: string; mr: string };
}

interface FactItem {
  key: string;
  year: string;
  value: string;
  label: { en: string; mr: string };
  detail: { en: string; mr: string };
}

export const LibraryAboutView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [zoomOpen, setZoomOpen] = useState(false);

  const hero = pageData?.hero || {};
  const sections: SectionItem[] = pageData?.sections || [];
  const facts: FactItem[] = pageData?.facts || [];
  const imgData = pageData?.image || {
    src: '/media/images/library/05_A.jpg',
    caption: { en: 'University Library Building, MPKV, Rahuri', mr: 'विद्यापीठ ग्रंथालय इमारत, मफुकृवि, राहुरी' },
  };

  const aboutSec = sections.find((s) => s.id === 'about') || sections[0];
  const buildingSec = sections.find((s) => s.id === 'library-building') || sections[1];

  const getTxt = (val: any) =>
    typeof val === 'string' ? val : language === 'mr' ? val?.mr || val?.en || '' : val?.en || '';

  return (
    <div className="w-full min-h-screen bg-[#f9f8f4] text-slate-800">
      <LibrarySubnav
        activeSlug={pageData?.slug === 'central-library-rahuri' ? 'central-library-rahuri' : 'library-about'}
        currentTitle={{ en: 'About', mr: 'ग्रंथालयाविषयी' }}
        accentActiveClass="bg-[#113120] text-amber-200 border-[#113120] shadow-xs"
      />

      {/* CLEAN EDITORIAL ARCHITECTURAL HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0c2116] via-[#133322] to-[#1a432d] text-white border-b-4 border-amber-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
                <Landmark className="w-3.5 h-3.5 text-amber-300" />
                <span>{getTxt(hero?.badge)}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight">
                {getTxt(hero?.title)}
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
                {getTxt(hero?.subtitle)}
              </p>

              {/* Original Key Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                  <span className="text-[10px] uppercase tracking-wider text-amber-200 font-bold block">
                    {language === 'mr' ? 'स्थापना (१९६८)' : 'Started (1968)'}
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-white mt-0.5 block">
                    2,070 Books
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                  <span className="text-[10px] uppercase tracking-wider text-amber-200 font-bold block">
                    {language === 'mr' ? 'इमारत (१९८०)' : 'Building (1980)'}
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-white mt-0.5 block">
                    3,740 sq.mt.
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                  <span className="text-[10px] uppercase tracking-wider text-amber-200 font-bold block">
                    {language === 'mr' ? 'आकारमान' : 'Dimensions'}
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-white mt-0.5 block">
                    117 × 130 ft
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-950">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold block">
                    {language === 'mr' ? 'वाढीव क्षमता (२०१२)' : '2012 ICAR Wing'}
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold mt-0.5 block">+150 Readers</span>
                </div>
              </div>
            </div>

            {/* Right Cleanly Framed Original Building Photo (05 A.jpg) */}
            <div className="lg:col-span-6">
              <div
                onClick={() => setZoomOpen(true)}
                className="group relative cursor-pointer rounded-3xl overflow-hidden border-2 border-amber-300/60 shadow-2xl bg-black/25"
              >
                <img
                  src={imgData.src}
                  alt={getTxt(imgData.caption)}
                  className="w-full h-[270px] sm:h-[340px] lg:h-[370px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent flex items-end justify-between p-5 gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      {language === 'mr' ? 'अधिकृत छायाचित्र' : 'Central Campus Building'}
                    </p>
                    <p className="text-sm font-semibold text-white mt-0.5">{getTxt(imgData.caption)}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs shrink-0">
                    <ZoomIn className="w-4 h-4" />
                    {language === 'mr' ? 'मोठे पहा' : 'Enlarge'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN REDESIGNED DUAL-CARD STAGE USING 100% ORIGINAL DATA */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-10">
        {/* Two Official Sections Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: About */}
          {aboutSec && (
            <div className="lg:col-span-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                        {language === 'mr' ? 'विभाग ०१' : 'Section 01'}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {getTxt(aboutSec.heading)}
                      </h2>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold">
                    Est. 1968
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {getTxt(aboutSec.body)}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f7f2] border border-emerald-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700">
                <span className="inline-flex items-center gap-2 font-semibold text-emerald-950">
                  <Users className="w-4 h-4 text-emerald-700" />
                  {language === 'mr'
                    ? 'कुलगुरू व ग्रंथालय सल्लागार समिती मार्गदर्शन'
                    : 'Guided by Vice-Chancellor & Library Advisory Committee'}
                </span>
                <span className="font-bold text-emerald-800">50+ Years of Service</span>
              </div>
            </div>
          )}

          {/* Card 2: Library Building */}
          {buildingSec && (
            <div className="lg:col-span-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-100">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                        {language === 'mr' ? 'विभाग ०२' : 'Section 02'}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {getTxt(buildingSec.heading)}
                      </h2>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                    Dec 1980 • 2012
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {getTxt(buildingSec.body)}
                </p>
              </div>

              {/* Extracted Verbatim Shifted Sections + Hours Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#0c2116] text-white flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-300 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">
                      {language === 'mr' ? 'विद्यापीठ ग्रंथालय' : 'University Library'}
                    </p>
                    <p className="text-sm font-bold">9.00 to 21.00 hrs</p>
                    <p className="text-[11px] text-emerald-100/80">
                      {language === 'mr' ? 'रविवार व सुट्ट्या वगळता' : 'Except Sundays & Holidays'}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-slate-900 flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-amber-700 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-amber-800 font-bold">
                      {language === 'mr' ? 'अभ्यासिका सुविधा' : 'Reading Room Facility'}
                    </p>
                    <p className="text-sm font-extrabold text-slate-900">9.00 to 23.00 hrs</p>
                    <p className="text-[11px] text-slate-600">
                      {language === 'mr' ? 'संदर्भ व प्रबंध कक्ष विस्तार' : 'Reference & Theses Wing'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* VERIFIED KEY MILESTONES & SPECIFICATIONS STRIP */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-800" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {language === 'mr' ? 'अधिकृत नोंदीतील प्रमुख टप्पे व वेळापत्रक' : 'Key Records & Architectural Facts'}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/library/collections"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                <span>{language === 'mr' ? 'ग्रंथसंग्रह पहा' : 'View Collections'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/library/sections"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-950 text-xs font-bold hover:bg-amber-200 transition-colors"
              >
                <Award className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'विभाग पहा' : 'Explore Sections'}</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {facts.map((f) => (
              <div
                key={f.key}
                className="p-4 rounded-2xl bg-[#f9f8f4] border border-stone-200/80 flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#133322] text-amber-200 text-[11px] font-bold">
                    {f.year}
                  </span>
                  <span className="text-sm font-extrabold text-amber-700">{f.value}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{getTxt(f.label)}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{getTxt(f.detail)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Original Image 05_A.jpg */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
        >
          <div className="relative max-w-5xl w-full text-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomOpen(false)}
              className="absolute -top-11 right-0 p-2 rounded-full bg-white/15 text-white hover:bg-white/30"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={imgData.src} alt={getTxt(imgData.caption)} className="w-full max-h-[84vh] object-contain rounded-xl mx-auto" />
            <p className="text-sm text-amber-200 font-semibold mt-3">{getTxt(imgData.caption)}</p>
          </div>
        </div>
      )}
    </div>
  );
};
