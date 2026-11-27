'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  FileText,
  Download,
  Search,
  ExternalLink,
  ArrowRight,
  ScrollText,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { StudentBreadcrumb } from './components/StudentBreadcrumb';

interface CircularRow {
  srNo: number;
  title: { en: string; mr: string };
  href: string;
  year: string;
  tag: { en: string; mr: string };
}

export const StudentCircularsView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');

  const items: CircularRow[] = pageData?.circulars || [];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.title.en.toLowerCase().includes(q) || i.title.mr.includes(q) || i.year.includes(q)
    );
  }, [items, query]);

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f4f8f5] text-slate-800">
      <StudentBreadcrumb currentTitle={{ en: 'Student Circulars', mr: 'विद्यार्थी परिपत्रके' }} />

      {/* FOREST EMERALD NOTICEBOARD HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#052e16] via-[#064e3b] to-[#047857] text-white border-b-4 border-amber-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Bell className="w-3.5 h-3.5" />
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
                placeholder={language === 'mr' ? 'परिपत्रक शोधा...' : 'Filter circulars...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/25 text-white placeholder:text-emerald-200/70 text-sm focus:outline-amber-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-8">
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((doc) => (
            <div
              key={doc.srNo}
              className="bg-white rounded-2xl border border-emerald-200/80 p-6 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 font-mono font-bold text-sm">
                  #{doc.srNo}
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#064e3b] text-amber-200 text-[11px] font-bold">
                      {getTxt(doc.tag)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-slate-600 text-[11px] font-semibold">
                      {doc.year}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {getTxt(doc.title)}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>{language === 'mr' ? 'PDF पहा' : 'Open PDF'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={doc.href}
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'डाउनलोड' : 'Download'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Helpful Cross Links to PGI Forms & University Circulars */}
        <div className="rounded-2xl bg-[#052e16] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ScrollText className="w-6 h-6 text-amber-300 shrink-0" />
            <div>
              <h3 className="text-base font-bold">
                {language === 'mr' ? 'अधिक विद्यार्थी अर्ज व विद्यापीठ परिपत्रके' : 'Looking for PGI Forms or General University Circulars?'}
              </h3>
              <p className="text-xs text-emerald-100/80">
                {language === 'mr'
                  ? 'बोनाफाईड, स्थलांतरण, पदवी प्रमाणपत्र अर्ज किंवा सर्व विद्यापीठ परिपत्रके पहा.'
                  : 'Download Bonafide, Migration & Degree Forms or inspect all 201 University Circulars.'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/students/pgi-form"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300"
            >
              <span>{language === 'mr' ? 'PGI अर्ज (११)' : 'PGI Forms (11)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/circulars"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
            >
              <span>{language === 'mr' ? 'सर्व परिपत्रके' : 'All Circulars'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
