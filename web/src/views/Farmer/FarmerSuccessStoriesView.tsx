'use client';

import React from 'react';
import {
  Trophy,
  Download,
  ExternalLink,
  Sprout,
  Award,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FarmerBreadcrumb } from './components/FarmerBreadcrumb';

interface OfficialDoc {
  srNo: number;
  year: string;
  title: { en: string; mr: string };
  href: string;
  sourceLabel: string;
}

export const FarmerSuccessStoriesView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();

  const docs: OfficialDoc[] = pageData?.officialDocuments || [];
  const paragraphs = pageData?.paragraphs || [];
  const tables = pageData?.tables || [];

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#fdf7f3] text-slate-800">
      <FarmerBreadcrumb currentTitle={{ en: 'Success Stories', mr: 'प्रगतीशील शेतकरी यशोगाथा' }} />

      {/* TERRACOTTA & GOLD HALL OF FAME HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3b1206] via-[#6b210b] to-[#9a3412] text-white border-b-4 border-amber-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-300" />
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

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-10">
        {/* OFFICIAL MPKV DOWNLOADABLE SUCCESS STORIES (Maruti Gite + 2021 Sahebrao Chikne) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-orange-800" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {language === 'mr'
                ? 'अधिकृत विद्यापीठ यशोगाथा दस्तऐवज (PDF)'
                : 'Official Published Farmer Success Stories (PDF Dossiers)'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {docs.map((d) => (
              <div
                key={d.srNo}
                className="bg-white rounded-3xl border-2 border-amber-300/60 p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#6b210b] text-amber-200 text-xs font-bold">
                      {d.year}
                    </span>
                    <span className="text-[11px] font-semibold text-orange-900 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                      {d.sourceLabel}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {getTxt(d.title)}
                  </h3>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center gap-3">
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6b210b] hover:bg-orange-900 text-white text-xs font-bold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'यशोगाथा PDF उघडा' : 'Read Story PDF'}</span>
                  </a>
                  <a
                    href={d.href}
                    download
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'डाउनलोड' : 'Save'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED CASE STUDIES TABLE */}
        {paragraphs.length > 0 && (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-7 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-orange-800 font-bold text-xs uppercase tracking-wider">
              <Sprout className="w-4 h-4" />
              <span>Field Impact Across 10 Districts</span>
            </div>
            {paragraphs.map((p: any, i: number) => (
              <p key={i} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {getTxt(p.text || p)}
              </p>
            ))}
          </div>
        )}

        {tables.map((tbl: any, tIdx: number) => (
          <div key={tIdx} className="bg-white rounded-3xl border border-amber-200/80 shadow-xs overflow-hidden">
            {tbl.title && (
              <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-orange-700" />
                <h2 className="text-lg font-bold text-slate-900">{getTxt(tbl.title)}</h2>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-amber-50/80 text-[11px] uppercase tracking-wider text-slate-600 border-b border-amber-200">
                    {(tbl.headers || []).map((h: any, hIdx: number) => (
                      <th key={hIdx} className="py-3.5 px-5 font-bold">
                        {getTxt(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {(tbl.rows || []).map((row: any[], rIdx: number) => (
                    <tr key={rIdx} className="hover:bg-amber-50/40 transition-colors">
                      {row.map((cell: any, cIdx: number) => (
                        <td
                          key={cIdx}
                          className={`py-3.5 px-5 ${cIdx === 1 ? 'font-bold text-slate-900' : 'text-slate-700'}`}
                        >
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
      </section>
    </div>
  );
};
