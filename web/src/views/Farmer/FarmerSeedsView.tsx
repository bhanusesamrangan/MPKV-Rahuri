'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Sprout,
  Phone,
  Clock,
  Search,
  Package,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FarmerBreadcrumb } from './components/FarmerBreadcrumb';

interface SeedRow {
  srNo: string;
  crop: string;
  variety: string;
  seedType: string;
  ratePerBag: string;
  availableBags: string;
  quintal: string;
}

export const FarmerSeedsView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [cropFilter, setCropFilter] = useState<string>('all');

  const seeds: SeedRow[] = pageData?.cerealSeeds || [];
  const crops = useMemo(
    () => ['all', ...Array.from(new Set(seeds.map((s) => s.crop)))],
    [seeds]
  );

  const visibleSeeds = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seeds.filter((s) => {
      const okCrop = cropFilter === 'all' || s.crop === cropFilter;
      const okQ = !q || s.crop.toLowerCase().includes(q) || s.variety.toLowerCase().includes(q);
      return okCrop && okQ;
    });
  }, [seeds, cropFilter, query]);

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f6f9f0] text-slate-800">
      <FarmerBreadcrumb currentTitle={{ en: 'Certified Seed Availability', mr: 'बियाणे उपलब्धता' }} />

      {/* GOLDEN-OLIVE SEED STOCK HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#142603] via-[#274607] to-[#3f6212] text-white border-b-4 border-amber-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Sprout className="w-4 h-4 text-amber-300" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-lime-100/90 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
              <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Live Update Timestamp
              </p>
              <p className="text-sm font-extrabold text-white mt-1 font-mono">
                {pageData?.lastUpdated || '11/25/2026 4:40:09 PM'}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-400 text-slate-950">
              <p className="text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                Seed Cell Rahuri
              </p>
              <p className="text-sm font-extrabold mt-1 font-mono">{pageData?.contact}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-8">
        {/* Crop Filter Bar + Search */}
        <div className="bg-white rounded-3xl border border-lime-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div
              className="flex flex-wrap items-center gap-2"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
            >
              {crops.map((cr) => (
                <button
                  key={cr}
                  onClick={() => setCropFilter(cr)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    cropFilter === cr
                      ? 'bg-[#274607] text-amber-200 border-[#274607]'
                      : 'bg-lime-50 text-slate-700 border-lime-200 hover:bg-lime-100'
                  }`}
                >
                  {cr === 'all' ? (language === 'mr' ? `सर्व पिके (${seeds.length})` : `All Seed Lots (${seeds.length})`) : cr}
                </button>
              ))}
            </div>

            <div className="relative shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'mr' ? 'पीक किंवा वाण शोधा...' : 'Filter crop or variety...'}
                className="pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 text-xs w-52 focus:outline-lime-700"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-lime-50/70 text-[11px] uppercase tracking-wider text-slate-600 border-b border-lime-200">
                  <th className="py-3.5 px-5">Sr. No.</th>
                  <th className="py-3.5 px-5">{language === 'mr' ? 'पीक' : 'Crop'}</th>
                  <th className="py-3.5 px-5">{language === 'mr' ? 'वाण' : 'Variety'}</th>
                  <th className="py-3.5 px-5">{language === 'mr' ? 'बियाणाचे प्रकार' : 'Seed Class'}</th>
                  <th className="py-3.5 px-5">{language === 'mr' ? 'दर प्रति बॅग' : 'Rate per Bag'}</th>
                  <th className="py-3.5 px-5">{language === 'mr' ? 'विक्रीसाठी उपलब्ध बॅगा' : 'Available Bags'}</th>
                  <th className="py-3.5 px-5 text-right">{language === 'mr' ? 'क्विंटल' : 'Quintals'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {visibleSeeds.map((s) => (
                  <tr key={s.srNo} className="hover:bg-lime-50/40 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-xs text-slate-500">{s.srNo}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900">{s.crop}</td>
                    <td className="py-3.5 px-5 font-semibold text-lime-900">{s.variety}</td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 text-xs font-bold">
                        {s.seedType}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-700">{s.ratePerBag}</td>
                    <td className="py-3.5 px-5 font-bold text-emerald-800">{s.availableBags}</td>
                    <td className="py-3.5 px-5 text-right font-bold text-slate-900">{s.quintal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vegetable Seed Status + Link to Nursery & Bio Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 flex items-start gap-3 shadow-xs">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'mr' ? 'भाजीपाला बियाणे उपलब्धता स्थिती' : 'Vegetable Seeds Inventory Note'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">{getTxt(pageData?.vegetableSeedsNote)}</p>
            </div>
          </div>

          <div className="bg-[#274607] text-white rounded-2xl p-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-amber-300 shrink-0" />
              <div>
                <h3 className="text-sm font-bold">{language === 'mr' ? 'रोपवाटिका व जैविक निविष्ठा' : 'Explore Nurseries & Bio-Inputs'}</h3>
                <p className="text-xs text-lime-100/80">{language === 'mr' ? '११ रोपवाटिका व खते पहा' : '11 Live Nurseries & MPKV Bio-Products'}</p>
              </div>
            </div>
            <Link
              href="/nursery-stock"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300"
            >
              <span>{language === 'mr' ? 'रोपवाटिका' : 'Nurseries'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
