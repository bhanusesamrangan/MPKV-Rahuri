'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Download,
  Volume2,
  Video,
  ZoomIn,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FarmerBreadcrumb } from './components/FarmerBreadcrumb';

interface EditionItem {
  year: string;
  dates: string;
  title: { en: string; mr: string };
  photo: string;
  summary: { en: string; mr: string };
  audio: string;
  audioLabel: { en: string; mr: string };
  pdfs: Array<{ label: { en: string; mr: string }; href: string }>;
}

export const FarmerKisanAadharView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string>('2019');
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  const editions: EditionItem[] = pageData?.editions || [];
  const activeEdition = editions.find((e) => e.year === selectedYear) || editions[0];
  const heroImg = pageData?.hero?.image || '/media/images/farmer/kas_home.jpg';

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#fdf8f0] text-slate-800">
      <FarmerBreadcrumb currentTitle={{ en: 'Kisan Aadhar Sammelan', mr: 'किसान आधार संमेलन' }} />

      {/* SAFFRON-MARIGOLD GRAND EXHIBITION HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3b1504] via-[#6b2809] to-[#9a3c0c] text-white border-b-4 border-amber-300">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-300/15 border border-amber-200/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-2xl">
              {getTxt(pageData?.hero?.subtitle)}
            </p>

            {pageData?.youtubeChannel && (
              <div className="pt-1">
                <a
                  href={pageData.youtubeChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
                >
                  <Video className="w-4 h-4" />
                  <span>{language === 'mr' ? 'अधिकृत YouTube चॅनेल पहा' : 'MPKV Sammelan Video Channel'}</span>
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div
              onClick={() => setZoomSrc(heroImg)}
              className="group relative cursor-pointer rounded-3xl overflow-hidden border-2 border-amber-300/60 shadow-2xl"
            >
              <img
                src={heroImg}
                alt="Kisan Aadhar Sammelan Exhibition Banner"
                className="w-full h-[260px] sm:h-[310px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent p-4 flex items-end justify-between">
                <span className="text-xs font-semibold text-amber-100">
                  Kisan Aadhar Sammelan Exhibition Arena
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold">
                  <ZoomIn className="w-3.5 h-3.5" /> Zoom
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-10">
        {/* Overall Mandate Card */}
        <div className="bg-white rounded-3xl border border-amber-200/80 p-7 sm:p-8 shadow-xs space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            {language === 'mr' ? 'किसान आधार संमेलन उपक्रम व उद्दिष्टे (२०१७ पासून)' : 'Sammelan Mandate, Crop Demos & Agro-Expos'}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{getTxt(pageData?.overview)}</p>
        </div>

        {/* INTERACTIVE 3-EDITION ARCHIVE (2019 / 2018 / 2017) WITH AUDIO + BROCHURES + PHOTOS */}
        <div className="space-y-6">
          <div
            className="flex flex-wrap items-center gap-2"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
          >
            {editions.map((ed) => (
              <button
                key={ed.year}
                onClick={() => setSelectedYear(ed.year)}
                className={`shrink-0 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                  selectedYear === ed.year
                    ? 'bg-[#6b2809] text-amber-200 border-[#6b2809] shadow-sm'
                    : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
                }`}
              >
                {getTxt(ed.title)} ({ed.dates})
              </button>
            ))}
          </div>

          {activeEdition && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Edition Image */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-amber-200/80 p-4 shadow-xs flex flex-col justify-between space-y-4">
                <div
                  onClick={() => setZoomSrc(activeEdition.photo)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group h-72 sm:h-80 bg-stone-900"
                >
                  <img
                    src={activeEdition.photo}
                    alt={getTxt(activeEdition.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent p-4 flex items-end justify-between">
                    <span className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {activeEdition.dates}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold">
                      <ZoomIn className="w-3.5 h-3.5" /> Zoom
                    </span>
                  </div>
                </div>

                {/* Built-In Audio Player for Official Jingle/Audio Clip */}
                {activeEdition.audio && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <Volume2 className="w-4 h-4 text-amber-700" />
                      <span>{getTxt(activeEdition.audioLabel)}</span>
                    </div>
                    <audio controls src={activeEdition.audio} className="w-full h-9" />
                  </div>
                )}
              </div>

              {/* Edition Narrative & Brochures */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-amber-200/80 p-7 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <h3 className="text-2xl font-bold text-slate-900">{getTxt(activeEdition.title)}</h3>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-bold">
                      {activeEdition.dates}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{getTxt(activeEdition.summary)}</p>
                </div>

                {activeEdition.pdfs.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-stone-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {language === 'mr' ? 'अधिकृत दस्तऐवज (PDFs)' : 'Official Edition Downloads'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeEdition.pdfs.map((pdf, i) => (
                        <a
                          key={i}
                          href={pdf.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 rounded-xl bg-[#6b2809] hover:bg-amber-900 text-amber-100 text-xs font-bold flex items-center justify-between gap-2 transition-colors"
                        >
                          <span className="truncate">{getTxt(pdf.label)}</span>
                          <Download className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {zoomSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomSrc(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomSrc(null)}
              className="absolute -top-11 right-0 p-2 rounded-full bg-white/15 text-white hover:bg-white/30"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={zoomSrc} alt="Kisan Aadhar Sammelan" className="w-full max-h-[85vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};
