'use client';

import React, { useMemo, useState } from 'react';
import {
  Award,
  ExternalLink,
  Search,
  Landmark,
  GraduationCap,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { StudentBreadcrumb } from './components/StudentBreadcrumb';

interface ScholarshipItem {
  srNo: number;
  name: string;
  agency: { en: string; mr: string };
  category: string;
  url: string;
  displayUrl: string;
}

export const StudentScholarshipsView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [scopeFilter, setScopeFilter] = useState<'all' | 'State Portal' | 'National Portal'>('all');

  const portals: ScholarshipItem[] = pageData?.scholarships || [];

  const visiblePortals = useMemo(() => {
    const q = query.trim().toLowerCase();
    return portals.filter((p) => {
      const okScope = scopeFilter === 'all' || p.category === scopeFilter;
      const okQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.displayUrl.toLowerCase().includes(q) ||
        p.agency.en.toLowerCase().includes(q) ||
        p.agency.mr.includes(q);
      return okScope && okQ;
    });
  }, [portals, scopeFilter, query]);

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f2f9f2] text-slate-800">
      <StudentBreadcrumb currentTitle={{ en: 'Scholarship Links', mr: 'शिष्यवृत्ती पोर्टल दुवे' }} />

      {/* EMERALD-LIME SCHOLARSHIP PORTAL HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#052e16] via-[#14532d] to-[#15803d] text-white border-b-4 border-lime-300">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-300/15 border border-lime-200/40 text-lime-200 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-emerald-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'mr' ? 'MahaDBT, NSP, BARTI...' : 'Search MahaDBT, NSP, TRTI...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/25 text-white placeholder:text-emerald-100/60 text-sm focus:outline-lime-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-8">
        <div
          className="flex flex-wrap items-center gap-2"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
        >
          {(['all', 'State Portal', 'National Portal'] as const).map((sc) => (
            <button
              key={sc}
              onClick={() => setScopeFilter(sc)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                scopeFilter === sc
                  ? 'bg-[#14532d] text-lime-200 border-[#14532d]'
                  : 'bg-white text-slate-700 border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              {sc === 'all' ? (language === 'mr' ? `सर्व पोर्टल (${portals.length})` : `All Portals (${portals.length})`) : sc}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePortals.map((sc) => (
            <div
              key={sc.srNo}
              className="bg-white rounded-3xl border border-emerald-200/80 p-6 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200">
                    {sc.category === 'National Portal' ? (
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <Landmark className="w-3.5 h-3.5 text-emerald-700" />
                    )}
                    {sc.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">#{sc.srNo}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900">{sc.name}</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{getTxt(sc.agency)}</p>
                <p className="text-xs font-mono text-emerald-800 bg-emerald-50/70 px-3 py-1.5 rounded-lg border border-emerald-100 truncate">
                  {sc.displayUrl}
                </p>
              </div>

              <a
                href={sc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#14532d] hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
              >
                <span>{language === 'mr' ? 'अधिकृत पोर्टल उघडा' : 'Visit Official Portal'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
