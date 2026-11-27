'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Download,
  ExternalLink,
  Sprout,
  Eye,
  EyeOff,
  ArrowRight,
  Microscope,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FarmerBreadcrumb } from './components/FarmerBreadcrumb';

export const FarmerServicesView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [showPreview, setShowPreview] = useState(true);

  const charter = pageData?.rightToServicePdf || {
    title: {
      en: 'Maharashtra Right to Public Services Act — MPKV Citizen Charter (PDF)',
      mr: 'महाराष्ट्र लोकसेवा हक्क अधिनियम — मफुकृवि सेवा हमी सनद (PDF)',
    },
    href: '/media/docs/farmer/right_to_service.pdf',
  };

  const tables = pageData?.tables || [];
  const paragraphs = pageData?.paragraphs || [];
  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f2f8f8] text-slate-800">
      <FarmerBreadcrumb currentTitle={{ en: 'Farmer Services & Citizen Charter', mr: 'शेतकरी सेवा व सेवा हमी सनद' }} />

      {/* TEAL-SLATE CITIZEN CHARTER HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07292a] via-[#0f4749] to-[#115e59] text-white border-b-4 border-teal-300">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-300/15 border border-teal-200/40 text-teal-200 text-xs font-bold uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={charter.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm hover:bg-teal-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{language === 'mr' ? 'सेवा हमी PDF उघडा' : 'Open Right to Service PDF'}</span>
            </a>
            <a
              href={charter.href}
              download
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white font-bold text-xs sm:text-sm hover:bg-white/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'mr' ? 'डाउनलोड' : 'Download'}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-10">
        {/* RIGHT TO SERVICE OFFICIAL PDF EMBEDDED WORKSPACE */}
        <div className="bg-white rounded-3xl border border-teal-200/80 shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-stone-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-100">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">{getTxt(charter.title)}</h2>
                <p className="text-xs text-slate-500">
                  {language === 'mr'
                    ? 'अधिकृत महाराष्ट्र लोकसेवा हक्क सेवा हमी दस्तऐवज'
                    : 'Direct official Right to Service Act notification from MPKV Rahuri Farmer Portal'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPreview((p) => !p)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-bold border border-teal-200 transition-colors"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showPreview ? (language === 'mr' ? 'प्रीव्ह्यू लपवा' : 'Hide PDF Preview') : (language === 'mr' ? 'PDF प्रीव्ह्यू पहा' : 'Show PDF Preview')}</span>
            </button>
          </div>

          {showPreview && (
            <div className="w-full h-[540px] bg-stone-100">
              <iframe src={charter.href} title="Right to Service PDF" className="w-full h-full border-0" />
            </div>
          )}
        </div>

        {/* OVERVIEW & TESTING SERVICES TABLE */}
        {paragraphs.length > 0 && (
          <div className="bg-white rounded-3xl border border-teal-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <Microscope className="w-5 h-5 text-teal-800" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === 'mr' ? 'विस्तार व प्रयोगशाळा शेतकरी सेवा' : 'Agricultural Testing & Advisory Services'}
              </h2>
            </div>
            {paragraphs.map((p: any, idx: number) => (
              <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {getTxt(p.text || p)}
              </p>
            ))}
          </div>
        )}

        {tables.map((tbl: any, tIdx: number) => (
          <div key={tIdx} className="bg-white rounded-3xl border border-teal-200/80 shadow-xs overflow-hidden">
            {tbl.title && (
              <div className="p-5 border-b border-stone-100 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-teal-700" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{getTxt(tbl.title)}</h3>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-teal-50/70 text-[11px] uppercase tracking-wider text-slate-600 border-b border-teal-200">
                    {(tbl.headers || []).map((h: any, hIdx: number) => (
                      <th key={hIdx} className="py-3 px-5 font-bold">
                        {getTxt(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {(tbl.rows || []).map((row: any[], rIdx: number) => (
                    <tr key={rIdx} className="hover:bg-teal-50/30 transition-colors">
                      {row.map((cell: any, cIdx: number) => (
                        <td key={cIdx} className="py-3.5 px-5 text-slate-700">
                          {getTxt(cell?.text || cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Quick Links to Seeds, Nurseries & Bio Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/seeds-availability', label: { en: 'Live Seeds Stock', mr: 'बियाणे उपलब्धता' } },
            { href: '/nursery-stock', label: { en: '11 Regional Nurseries', mr: '११ रोपवाटिका साठा' } },
            { href: '/farmer/bio-fertilizers', label: { en: 'Bio-Inputs & Micrograde II', mr: 'जैविक खते व निविष्ठा' } },
          ].map((lnk) => (
            <Link
              key={lnk.href}
              href={lnk.href}
              className="p-5 rounded-2xl bg-[#07292a] hover:bg-teal-900 text-white flex items-center justify-between gap-3 transition-colors"
            >
              <span className="font-bold text-sm">{getTxt(lnk.label)}</span>
              <ArrowRight className="w-4 h-4 text-teal-300" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
