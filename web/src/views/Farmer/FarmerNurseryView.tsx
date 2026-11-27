'use client';

import React, { useMemo, useState } from 'react';
import {
  Trees,
  MapPin,
  Phone,
  Search,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FarmerBreadcrumb } from './components/FarmerBreadcrumb';

interface PlantLot {
  srNo: string;
  plantName: string;
  rate: string;
  availableQty: string;
  updatedOn: string;
}

interface NurseryCenter {
  id: string;
  srNo: number;
  centerName: string;
  phone: string;
  items: PlantLot[];
}

export const FarmerNurseryView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [selectedCenter, setSelectedCenter] = useState<string>('all');
  const [query, setQuery] = useState('');

  const nurseries: NurseryCenter[] = pageData?.nurseries || [];

  const filteredNurseries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return nurseries
      .filter((n) => selectedCenter === 'all' || n.id === selectedCenter)
      .map((n) => ({
        ...n,
        items: n.items.filter(
          (it) => !q || it.plantName.toLowerCase().includes(q) || n.centerName.toLowerCase().includes(q)
        ),
      }))
      .filter((n) => n.items.length > 0);
  }, [nurseries, selectedCenter, query]);

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f2f9f5] text-slate-800">
      <FarmerBreadcrumb currentTitle={{ en: 'Planting Materials & Nursery Stock', mr: 'रोपवाटिका व कलमे उपलब्धता' }} />

      {/* BOTANICAL EMERALD 11-NURSERY HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#042f1e] via-[#064e3b] to-[#047857] text-white border-b-4 border-emerald-300">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-300/15 border border-emerald-200/40 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Trees className="w-4 h-4" />
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
                placeholder={language === 'mr' ? 'रोप, कलम किंवा केंद्र शोधा (डाळिंब, आंबा)...' : 'Search Pomegranate, Mango, Pune, Rahuri...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/25 text-white placeholder:text-emerald-100/70 text-sm focus:outline-emerald-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-8">
        {/* 11-Center Pills Bar (Anti-Clipping) */}
        <div
          className="flex flex-wrap items-center gap-2"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
        >
          <button
            onClick={() => setSelectedCenter('all')}
            className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-bold border transition-all ${
              selectedCenter === 'all'
                ? 'bg-[#064e3b] text-white border-[#064e3b]'
                : 'bg-white text-slate-700 border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            {language === 'mr' ? `सर्व ११ केंद्रे` : `All 11 Nurseries`}
          </button>
          {nurseries.map((n) => (
            <button
              key={n.id}
              onClick={() => setSelectedCenter(n.id)}
              className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
                selectedCenter === n.id
                  ? 'bg-[#064e3b] text-emerald-100 border-[#064e3b]'
                  : 'bg-white text-slate-700 border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              #{n.srNo} • {n.centerName.split(',')[0].slice(0, 28)}
            </button>
          ))}
        </div>

        {/* Nursery Inventory Cards */}
        <div className="space-y-6">
          {filteredNurseries.map((nursery) => (
            <div
              key={nursery.id}
              className="bg-white rounded-3xl border border-emerald-200/80 shadow-xs overflow-hidden"
            >
              <div className="p-5 sm:p-6 bg-emerald-50/70 border-b border-emerald-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#064e3b] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {nursery.srNo}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{nursery.centerName}</span>
                  </h2>
                </div>
                {nursery.phone && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-emerald-200 text-xs font-mono font-bold text-emerald-900 shrink-0">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    {nursery.phone}
                  </span>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-stone-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-stone-200">
                      <th className="py-3 px-5">Sr.</th>
                      <th className="py-3 px-5">{language === 'mr' ? 'रोपांचे / कलमांचे नाव' : 'Plant / Graft Name'}</th>
                      <th className="py-3 px-5 text-right">{language === 'mr' ? 'दर (₹)' : 'Rate (₹)'}</th>
                      <th className="py-3 px-5 text-right">{language === 'mr' ? 'उपलब्ध संख्या' : 'Available Qty'}</th>
                      <th className="py-3 px-5 text-right">{language === 'mr' ? 'दिनांक' : 'Updated On'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {nursery.items.map((item) => (
                      <tr key={item.srNo + item.plantName} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="py-3 px-5 font-mono text-xs text-slate-500">{item.srNo}</td>
                        <td className="py-3 px-5 font-semibold text-slate-900">{item.plantName}</td>
                        <td className="py-3 px-5 text-right font-mono text-slate-700">
                          {item.rate === '--' ? '—' : `₹${item.rate}`}
                        </td>
                        <td className="py-3 px-5 text-right font-extrabold text-emerald-800 tabular-nums">
                          {item.availableQty}
                        </td>
                        <td className="py-3 px-5 text-right text-xs text-slate-500 font-mono">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.updatedOn}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
