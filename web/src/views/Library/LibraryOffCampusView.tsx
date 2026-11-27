'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Building2,
  ExternalLink,
  ArrowRight,
  Network,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LibrarySubnav } from './components/LibrarySubnav';

interface OffCampusItem {
  srNo: number;
  name: { en: string; mr: string };
  region: { en: string; mr: string };
  externalUrl: string;
  internalRoute: string;
  statusNote: { en: string; mr: string };
}

export const LibraryOffCampusView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const campuses: OffCampusItem[] = pageData?.campuses || [];

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f4f7f5] text-slate-800">
      <LibrarySubnav
        activeSlug="library-off-campus"
        currentTitle={{ en: 'Off Campus Libraries', mr: 'विभागीय महाविद्यालय ग्रंथालये' }}
        accentActiveClass="bg-[#1d3e32] text-emerald-100 border-[#1d3e32] shadow-xs"
      />

      {/* PINE-SAGE REGIONAL NETWORK HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f241d] via-[#1d3e32] to-[#275544] text-white border-b-4 border-emerald-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-300/15 border border-emerald-200/40 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Network className="w-3.5 h-3.5" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          <div className="px-6 py-4 rounded-2xl bg-white/10 border border-white/15 shrink-0 flex items-center gap-4">
            <Building2 className="w-9 h-9 text-emerald-300" />
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-200 font-bold">
                {language === 'mr' ? 'विभागीय केंद्रे' : 'Zonal Coverage'}
              </p>
              <p className="text-xl font-extrabold text-white">Pune • Dhule • Kolhapur • Nandurbar</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-8">
        {/* 2x2 CONSTITUENT CAMPUS LIBRARY NETWORK GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campuses.map((campus) => (
            <div
              key={campus.srNo}
              className="bg-white rounded-3xl border border-emerald-200/70 p-7 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1d3e32] text-emerald-100 text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                    {getTxt(campus.region)}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Campus #0{campus.srNo}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {getTxt(campus.name)}
                </h2>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  {campus.externalUrl ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <span>{getTxt(campus.statusNote)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
                {campus.externalUrl ? (
                  <a
                    href={campus.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1d3e32] hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                  >
                    <span>{language === 'mr' ? 'महाविद्यालय ग्रंथालय पोर्टल' : 'Open Campus Library Portal'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 text-slate-500 text-xs font-semibold">
                    {language === 'mr' ? 'स्वतंत्र पोर्टल दुवा उपलब्ध नाही' : 'External URL Not Listed on MPKV'}
                  </span>
                )}

                <Link
                  href={campus.internalRoute || '/education/constituent-colleges'}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors"
                >
                  <span>{language === 'mr' ? 'घटक महाविद्यालये पहा' : 'Constituent Colleges Info'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
