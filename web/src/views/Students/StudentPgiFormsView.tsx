'use client';

import React, { useMemo, useState } from 'react';
import {
  FileSpreadsheet,
  Search,
  Download,
  ExternalLink,
  Printer,
  FolderCheck,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { StudentBreadcrumb } from './components/StudentBreadcrumb';

interface FormItem {
  srNo: number;
  title: { en: string; mr: string };
  category: string;
  href: string;
}

export const StudentPgiFormsView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [catFilter, setCatFilter] = useState<string>('all');
  const [query, setQuery] = useState('');

  const forms: FormItem[] = pageData?.forms || [];
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(forms.map((f) => f.category)))],
    [forms]
  );

  const visibleForms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return forms.filter((f) => {
      const okCat = catFilter === 'all' || f.category === catFilter;
      const okQ = !q || f.title.en.toLowerCase().includes(q) || f.title.mr.includes(q);
      return okCat && okQ;
    });
  }, [forms, catFilter, query]);

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#faf7f0] text-slate-800">
      <StudentBreadcrumb currentTitle={{ en: 'Students Forms (PGI)', mr: 'विद्यार्थी अर्ज (PGI)' }} />

      {/* AMBER-SLATE ACADEMIC FORMS DESK HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#292014] via-[#453118] to-[#78350f] text-white border-b-4 border-amber-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <FileSpreadsheet className="w-4 h-4" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-amber-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'mr' ? 'अर्ज शोधा (बोनफाईड, टीसी इ.)...' : 'Search Bonafide, Migration, No Dues...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/25 text-white placeholder:text-amber-100/60 text-sm focus:outline-amber-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-8">
        {/* Category Tabs */}
        <div
          className="flex flex-wrap items-center gap-2"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                catFilter === cat
                  ? 'bg-[#453118] text-amber-200 border-[#453118]'
                  : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
              }`}
            >
              {cat === 'all' ? (language === 'mr' ? `सर्व अर्ज (${forms.length})` : `All Forms (${forms.length})`) : cat}
            </button>
          ))}
        </div>

        {/* Printable Self-Service Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleForms.map((fm) => (
            <div
              key={fm.srNo}
              className="bg-white rounded-2xl border border-amber-200/70 p-6 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-mono text-xs font-bold border border-amber-200">
                    <FolderCheck className="w-3.5 h-3.5" />
                    Form #{fm.srNo}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {fm.category}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {getTxt(fm.title)}
                </h2>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <a
                  href={fm.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#453118] hover:bg-amber-900 text-white text-xs font-bold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'PDF पहा' : 'View PDF'}</span>
                </a>
                <a
                  href={fm.href}
                  download
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <Printer className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
