'use client';

import React, { useState } from 'react';
import {
  Library,
  Layers,
  Globe2,
  ZoomIn,
  X,
  CheckCircle2,
  BookMarked,
  Tag,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LibrarySubnav } from './components/LibrarySubnav';

interface WingItem {
  id: string;
  title: { en: string; mr: string };
  metric: string;
  standard: string;
  image: string;
  description: { en: string; mr: string };
}

export const LibrarySectionsView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const wings: WingItem[] = pageData?.wings || [];
  const egranth = pageData?.egranth || {};
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [zoomPhoto, setZoomPhoto] = useState<{ src: string; caption: string } | null>(null);

  const activeWing = wings[selectedIdx] || wings[0];
  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#fdf8f5] text-slate-800">
      <LibrarySubnav
        activeSlug="library-sections"
        currentTitle={{ en: 'Library Sections & e-GRANTH', mr: 'ग्रंथालय विभाग व ई-ग्रंथ प्रकल्प' }}
        accentActiveClass="bg-[#6b1f1a] text-amber-200 border-[#6b1f1a] shadow-xs"
      />

      {/* WARM ROSEWOOD / TERRACOTTA HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3b0f0c] via-[#5c1914] to-[#7c251d] text-white border-b-4 border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fcd34d_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-300/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Library className="w-3.5 h-3.5" />
            <span>{getTxt(pageData?.hero?.badge)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-4xl">
            {getTxt(pageData?.hero?.title)}
          </h1>
          <p className="text-sm sm:text-base text-rose-100/90 max-w-3xl leading-relaxed">
            {getTxt(pageData?.hero?.subtitle)}
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-12">
        {/* INTERACTIVE 5-WING GALLERY STAGE */}
        {activeWing && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Wing Selector Stack */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900 mb-1">
                <Layers className="w-4 h-4" />
                <span>{language === 'mr' ? '५ विशेष विभाग निवडा' : 'Select Physical Library Wing (5)'}</span>
              </div>
              {wings.map((w, idx) => {
                const isSel = idx === selectedIdx;
                return (
                  <button
                    key={w.id}
                    onClick={() => setSelectedIdx(idx)}
                    className={`text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isSel
                        ? 'bg-[#5c1914] text-white border-[#5c1914] shadow-md'
                        : 'bg-white text-slate-800 border-stone-200 hover:border-rose-300 hover:bg-rose-50/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={w.image}
                        alt={getTxt(w.title)}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/20"
                      />
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold truncate">{getTxt(w.title)}</h3>
                        <p className={`text-xs mt-0.5 ${isSel ? 'text-amber-200' : 'text-slate-500'}`}>
                          {w.metric}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${
                        isSel ? 'bg-amber-400 text-slate-950' : 'bg-stone-100 text-slate-600'
                      }`}
                    >
                      {w.standard}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Wing Photo & Technical Specification Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden flex flex-col">
              <div
                onClick={() => setZoomPhoto({ src: activeWing.image, caption: getTxt(activeWing.title) })}
                className="relative h-72 sm:h-96 bg-stone-900 cursor-pointer group overflow-hidden"
              >
                <img
                  src={activeWing.image}
                  alt={getTxt(activeWing.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent flex flex-col justify-end p-6">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold mb-2">
                        <BookMarked className="w-3.5 h-3.5" />
                        {activeWing.metric}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">{getTxt(activeWing.title)}</h2>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
                      <ZoomIn className="w-4 h-4" />
                      {language === 'mr' ? 'मोठे पहा' : 'Enlarge Photo'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-900 uppercase tracking-wider">
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    <span>
                      {language === 'mr' ? 'वर्गीकरण / प्रणाली:' : 'Cataloging & Shelf Standard:'}{' '}
                      {activeWing.standard}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {getTxt(activeWing.description)}
                  </p>
                </div>

                {/* Strip of all 5 Wing Thumbnails */}
                <div className="pt-4 border-t border-stone-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    {language === 'mr' ? 'सर्व ५ विभाग छायाचित्रे (se1 – se5)' : 'All 5 Authentic Section Photographs'}
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {wings.map((thumb, idx) => (
                      <button
                        key={thumb.id}
                        onClick={() => setSelectedIdx(idx)}
                        className={`rounded-xl overflow-hidden border-2 transition-all h-14 sm:h-16 ${
                          idx === selectedIdx
                            ? 'border-amber-500 ring-2 ring-amber-400/30'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={thumb.image} alt={getTxt(thumb.title)} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NARS E-GRANTH NATIONAL INITIATIVE BLUEPRINT */}
        <div className="rounded-3xl bg-[#1e293b] text-white p-6 sm:p-10 shadow-lg space-y-6 border-t-4 border-amber-400">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-bold uppercase tracking-wider">
                <Globe2 className="w-4 h-4" />
                <span>NAIP Component-1 • ICAR NARS & OCLC</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">{getTxt(egranth?.title)}</h2>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-amber-200 shrink-0">
              12 Agricultural Institutes & Universities
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-5xl">
            {getTxt(egranth?.summary)}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {(egranth?.objectives || []).map((obj: { en: string; mr: string }, i: number) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  0{i + 1}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? `उद्दिष्ट ${i + 1}` : `Objective ${i + 1}`}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{getTxt(obj)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {zoomPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomPhoto(null)}
        >
          <div className="relative max-w-4xl w-full text-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomPhoto(null)}
              className="absolute -top-11 right-0 p-2 rounded-full bg-white/15 text-white hover:bg-white/30"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={zoomPhoto.src} alt={zoomPhoto.caption} className="w-full max-h-[82vh] object-contain rounded-xl mx-auto" />
            <p className="text-sm text-amber-200 font-semibold mt-3">{zoomPhoto.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};
