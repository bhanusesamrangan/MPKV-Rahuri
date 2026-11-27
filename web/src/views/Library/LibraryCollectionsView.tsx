'use client';

import React, { useMemo, useState } from 'react';
import {
  Database,
  Layers,
  Cpu,
  Search,
  ArrowUpDown,
  ExternalLink,
  BookCopy,
  HardDrive,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LibrarySubnav } from './components/LibrarySubnav';

interface CollectionItem {
  srNo: number;
  item: { en: string; mr: string };
  count: number;
  format: 'Print' | 'Digital';
  sharePct: number;
}

export const LibraryCollectionsView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [formatFilter, setFormatFilter] = useState<'all' | 'Print' | 'Digital'>('all');
  const [sortMode, setSortMode] = useState<'default' | 'desc' | 'asc'>('default');
  const [query, setQuery] = useState('');

  const items: CollectionItem[] = pageData?.collectionItems || [];
  const totalCount: number = pageData?.totalCollections || 125793;
  const automation = pageData?.automation || {};
  const modules: string[] = automation?.modules || ['Acquisition', 'Cataloguing', 'Circulation', 'Serials', 'Web OPAC'];

  const printTotal = useMemo(
    () => items.filter((i) => i.format === 'Print').reduce((acc, i) => acc + i.count, 0),
    [items]
  );
  const digitalTotal = useMemo(
    () => items.filter((i) => i.format === 'Digital').reduce((acc, i) => acc + i.count, 0),
    [items]
  );

  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = items.filter((i) => {
      const okFmt = formatFilter === 'all' || i.format === formatFilter;
      const okQ = !q || i.item.en.toLowerCase().includes(q) || i.item.mr.includes(q);
      return okFmt && okQ;
    });
    if (sortMode === 'desc') return [...filtered].sort((a, b) => b.count - a.count);
    if (sortMode === 'asc') return [...filtered].sort((a, b) => a.count - b.count);
    return filtered;
  }, [items, formatFilter, sortMode, query]);

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en : v?.en || '');

  const barColors = [
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-sky-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-violet-500',
    'bg-rose-500',
    'bg-teal-500',
    'bg-blue-600',
  ];

  return (
    <div className="w-full min-h-screen bg-[#f1f5f9] text-slate-800">
      <LibrarySubnav
        activeSlug="library-collections"
        currentTitle={{ en: 'Book Collections & Automation', mr: 'ग्रंथसंग्रह व संगणकीकरण' }}
        accentActiveClass="bg-[#0f172a] text-cyan-300 border-[#0f172a] shadow-xs"
      />

      {/* MIDNIGHT ANALYTICS HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#070d19] via-[#0f172a] to-[#1e293b] text-white border-b-4 border-cyan-500">
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#38bdf822_1px,transparent_1px),linear-gradient(to_bottom,#38bdf822_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          {/* Live Holdings Telemetry Trio */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 shrink-0">
            <div className="p-4 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 min-w-[165px]">
              <p className="text-[11px] uppercase tracking-wider text-cyan-300 font-bold">
                {language === 'mr' ? 'एकूण संग्रह' : 'Total Holdings'}
              </p>
              <p className="text-3xl font-extrabold text-white mt-1 tabular-nums">
                {totalCount.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/15 min-w-[165px]">
              <p className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">
                {language === 'mr' ? 'मुद्रित साधने' : 'Print Volumes'}
              </p>
              <p className="text-2xl font-bold text-white mt-1 tabular-nums">
                {printTotal.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-500/15 border border-indigo-400/30 min-w-[165px]">
              <p className="text-[11px] uppercase tracking-wider text-indigo-200 font-bold">
                {language === 'mr' ? 'डिजिटल / ई-साधने' : 'Digital Resources'}
              </p>
              <p className="text-2xl font-bold text-indigo-100 mt-1 tabular-nums">
                {digitalTotal.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 space-y-8">
        {/* Stacked Inventory Visualization Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-700" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {language === 'mr' ? 'संग्रह प्रमाण विभाजन (१,२५,७९३)' : 'Proportional Inventory Breakdown Across 9 Categories'}
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {language === 'mr' ? 'स्रोत: अधिकृत MPKV ग्रंथालय आकडेवारी' : 'Official Catalog Ledger'}
            </span>
          </div>

          <div className="w-full h-5 rounded-full overflow-hidden flex bg-slate-100 border border-slate-200">
            {items.map((it, idx) => (
              <div
                key={it.srNo}
                style={{ width: `${Math.max(it.sharePct, 0.8)}%` }}
                title={`${it.item.en}: ${it.count.toLocaleString('en-IN')} (${it.sharePct}%)`}
                className={`${barColors[idx % barColors.length]} h-full transition-opacity hover:opacity-80`}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-xs">
            {items.slice(0, 6).map((it, idx) => (
              <div key={it.srNo} className="inline-flex items-center gap-1.5 text-slate-700">
                <span className={`w-2.5 h-2.5 rounded-full ${barColors[idx % barColors.length]}`} />
                <span className="font-medium">{getTxt(it.item)}:</span>
                <span className="font-bold tabular-nums">{it.count.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filterable Inventory Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div
              className="flex flex-wrap items-center gap-2"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
            >
              {(['all', 'Print', 'Digital'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormatFilter(fmt)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    formatFilter === fmt
                      ? 'bg-[#0f172a] text-cyan-300 border-[#0f172a]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {fmt === 'all'
                    ? language === 'mr'
                      ? `सर्व प्रकार (${items.length})`
                      : `All Formats (${items.length})`
                    : fmt === 'Print'
                    ? language === 'mr'
                      ? 'मुद्रित'
                      : 'Print Holdings'
                    : language === 'mr'
                    ? 'डिजिटल'
                    : 'Digital & E-Resources'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={language === 'mr' ? 'शोध घ्या...' : 'Filter inventory...'}
                  className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-48 focus:outline-cyan-600"
                />
              </div>
              <button
                onClick={() => setSortMode((s) => (s === 'default' ? 'desc' : s === 'desc' ? 'asc' : 'default'))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-700" />
                <span>
                  {sortMode === 'default' ? 'Sr.No' : sortMode === 'desc' ? 'Highest First' : 'Lowest First'}
                </span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="py-3.5 px-5 font-bold">{language === 'mr' ? 'अ.क्र.' : 'Sr. No.'}</th>
                  <th className="py-3.5 px-5 font-bold">{language === 'mr' ? 'संग्रह प्रकार' : 'Collection Category'}</th>
                  <th className="py-3.5 px-5 font-bold">{language === 'mr' ? 'स्वरूप' : 'Format'}</th>
                  <th className="py-3.5 px-5 font-bold text-right">{language === 'mr' ? 'संख्या' : 'Count'}</th>
                  <th className="py-3.5 px-5 font-bold w-48">{language === 'mr' ? 'हिस्सा' : 'Share'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {visibleItems.map((row) => (
                  <tr key={row.srNo} className="hover:bg-cyan-50/40 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-xs text-slate-500">#{row.srNo}</td>
                    <td className="py-3.5 px-5 font-semibold text-slate-900">{getTxt(row.item)}</td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          row.format === 'Digital'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-cyan-100 text-cyan-900'
                        }`}
                      >
                        {row.format === 'Digital' ? (
                          <HardDrive className="w-3 h-3" />
                        ) : (
                          <BookCopy className="w-3 h-3" />
                        )}
                        {row.format}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right font-bold tabular-nums text-slate-900">
                      {row.count.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              row.format === 'Digital' ? 'bg-indigo-500' : 'bg-cyan-600'
                            }`}
                            style={{ width: `${Math.min(Math.max(row.sharePct, 2), 100)}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 w-11 text-right">
                          {row.sharePct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#0f172a] text-white font-bold">
                  <td className="py-4 px-5" />
                  <td className="py-4 px-5 text-sm">
                    {language === 'mr' ? 'एकूण ग्रंथसंग्रह' : 'Total Collections'}
                  </td>
                  <td className="py-4 px-5 text-xs text-cyan-300">All 9 Categories</td>
                  <td className="py-4 px-5 text-right text-lg tabular-nums text-cyan-300">
                    {totalCount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-5 text-xs text-cyan-200 font-mono">100.00%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SLIM21 TO KOHA MIGRATION PIPELINE CARD */}
        <div className="bg-gradient-to-r from-[#0f172a] to-[#1e3a5f] text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-200 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>{language === 'mr' ? 'ICAR नवी दिल्ली मार्गदर्शित स्वयंचलन' : 'ICAR Guided Software Migration'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">{getTxt(automation?.title)}</h3>
              <p className="text-sm text-slate-200 leading-relaxed">{getTxt(automation?.description)}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {modules.map((mod) => (
                  <span
                    key={mod}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs font-semibold text-cyan-100"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                    {mod}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={automation?.opacUrl || 'http://mpkvlibrary.ourlib.in/'}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm hover:bg-cyan-300 transition-colors"
            >
              <span>{language === 'mr' ? 'Web OPAC पोर्टल उघडा' : 'Launch MPKV Web OPAC'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
