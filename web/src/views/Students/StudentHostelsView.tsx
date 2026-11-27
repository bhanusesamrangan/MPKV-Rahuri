'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Globe2,
  ArrowUpDown,
  Search,
  ArrowRight,
  BedDouble,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { StudentBreadcrumb } from './components/StudentBreadcrumb';

interface HostelRow {
  srNo: number;
  college: { en: string; mr: string };
  boys: number;
  girls: number;
  total: number;
}

interface IntlHostelRow {
  srNo: number;
  campus: { en: string; mr: string };
  capacity: number;
}

export const StudentHostelsView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'total' | 'boys' | 'girls'>('default');

  const constituentRows: HostelRow[] = pageData?.constituentHostels || [];
  const intlRows: IntlHostelRow[] = pageData?.internationalHostels || [];

  const totalBoys = useMemo(() => constituentRows.reduce((s, r) => s + r.boys, 0), [constituentRows]);
  const totalGirls = useMemo(() => constituentRows.reduce((s, r) => s + r.girls, 0), [constituentRows]);
  const grandTotal = totalBoys + totalGirls;
  const intlTotal = useMemo(() => intlRows.reduce((s, r) => s + r.capacity, 0), [intlRows]);

  const visibleRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = constituentRows.filter(
      (r) => !q || r.college.en.toLowerCase().includes(q) || r.college.mr.includes(q)
    );
    if (sortBy === 'total') return [...filtered].sort((a, b) => b.total - a.total);
    if (sortBy === 'boys') return [...filtered].sort((a, b) => b.boys - a.boys);
    if (sortBy === 'girls') return [...filtered].sort((a, b) => b.girls - a.girls);
    return filtered;
  }, [constituentRows, query, sortBy]);

  const maxTotal = Math.max(...constituentRows.map((r) => r.total), 1);
  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f0f7fa] text-slate-800">
      <StudentBreadcrumb currentTitle={{ en: 'Hostels', mr: 'वसतिगृहे' }} />

      {/* SLATE SAPPHIRE RESIDENCE HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#082f49] via-[#0c4a6e] to-[#0369a1] text-white border-b-4 border-cyan-300">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-300/15 border border-cyan-200/40 text-cyan-200 text-xs font-bold uppercase tracking-wider">
              <BedDouble className="w-4 h-4" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
              <p className="text-[10px] uppercase tracking-wider text-cyan-200 font-bold">
                {language === 'mr' ? 'मुलांचे वसतिगृह' : "Boys' Capacity"}
              </p>
              <p className="text-2xl font-extrabold text-white mt-1 tabular-nums">
                {totalBoys.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
              <p className="text-[10px] uppercase tracking-wider text-cyan-200 font-bold">
                {language === 'mr' ? 'मुलींचे वसतिगृह' : "Girls' Capacity"}
              </p>
              <p className="text-2xl font-extrabold text-white mt-1 tabular-nums">
                {totalGirls.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-300 text-slate-950">
              <p className="text-[10px] uppercase tracking-wider font-extrabold">
                {language === 'mr' ? 'एकूण क्षमता' : 'Total Seats'}
              </p>
              <p className="text-2xl font-extrabold mt-1 tabular-nums">
                {grandTotal.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-teal-400/20 border border-teal-300/40">
              <p className="text-[10px] uppercase tracking-wider text-teal-200 font-bold">
                {language === 'mr' ? 'आंतरराष्ट्रीय' : "Intl' Hostel"}
              </p>
              <p className="text-2xl font-extrabold text-white mt-1 tabular-nums">{intlTotal}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-10">
        {/* CONSTITUENT COLLEGES HOSTEL CAPACITY VISUAL LEDGER */}
        <div className="bg-white rounded-3xl border border-sky-200/80 shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-sky-800" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === 'mr'
                  ? 'घटक महाविद्यालये वसतिगृह प्रवेश क्षमता (७ महाविद्यालये)'
                  : 'Hostel Intake Capacity of Constituent Colleges'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={language === 'mr' ? 'महाविद्यालय शोधा...' : 'Filter college...'}
                  className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-48 focus:outline-sky-600"
                />
              </div>
              <button
                onClick={() =>
                  setSortBy((s) =>
                    s === 'default' ? 'total' : s === 'total' ? 'boys' : s === 'boys' ? 'girls' : 'default'
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-900"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>
                  Sort: {sortBy === 'default' ? 'Sr.No' : sortBy.toUpperCase()}
                </span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-sky-50/70 text-[11px] uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <th className="py-3.5 px-5">Sr. No.</th>
                  <th className="py-3.5 px-5">{language === 'mr' ? 'महाविद्यालयाचे नाव' : 'Name of College'}</th>
                  <th className="py-3.5 px-5 text-right">{language === 'mr' ? 'मुलांचे वसतिगृह' : "Boys' Hostel"}</th>
                  <th className="py-3.5 px-5 text-right">{language === 'mr' ? 'मुलींचे वसतिगृह' : "Girls' Hostel"}</th>
                  <th className="py-3.5 px-5 w-64">{language === 'mr' ? 'एकूण तुलनात्मक प्रमाण' : 'Boys vs Girls Split'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleRows.map((row) => {
                  const boysPct = (row.boys / maxTotal) * 100;
                  const girlsPct = (row.girls / maxTotal) * 100;
                  return (
                    <tr key={row.srNo} className="hover:bg-sky-50/40 transition-colors">
                      <td className="py-3.5 px-5 font-mono text-xs text-slate-500">{row.srNo}</td>
                      <td className="py-3.5 px-5 font-semibold text-slate-900">{getTxt(row.college)}</td>
                      <td className="py-3.5 px-5 text-right font-bold tabular-nums text-sky-800">{row.boys}</td>
                      <td className="py-3.5 px-5 text-right font-bold tabular-nums text-teal-700">{row.girls}</td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                            <div style={{ width: `${boysPct}%` }} className="bg-sky-600 h-full" title={`Boys: ${row.boys}`} />
                            <div style={{ width: `${girlsPct}%` }} className="bg-teal-500 h-full" title={`Girls: ${row.girls}`} />
                          </div>
                          <span className="text-xs font-extrabold tabular-nums text-slate-700 w-10 text-right">
                            {row.total}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-[#082f49] text-white font-bold">
                  <td className="py-4 px-5" />
                  <td className="py-4 px-5">{language === 'mr' ? 'एकूण प्रवेश क्षमता' : 'Total Constituent Intake Capacity'}</td>
                  <td className="py-4 px-5 text-right tabular-nums text-cyan-300">{totalBoys.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-5 text-right tabular-nums text-teal-300">{totalGirls.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-5 text-right tabular-nums text-white">{grandTotal.toLocaleString('en-IN')} Seats</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* INTERNATIONAL STUDENTS HOSTEL CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-sky-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Globe2 className="w-5 h-5 text-teal-700" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === 'mr' ? 'आंतरराष्ट्रीय विद्यार्थी वसतिगृह' : "International Students' Hostel Intake Capacity"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {intlRows.map((ih) => (
                <div
                  key={ih.srNo}
                  className="p-5 rounded-2xl bg-[#f0f7fa] border border-sky-200/70 flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[11px] font-mono font-bold text-sky-700">Campus #{ih.srNo}</span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{getTxt(ih.campus)}</h3>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-[#082f49] text-cyan-300 font-extrabold text-lg tabular-nums shrink-0">
                    {ih.capacity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-br from-[#0f766e] to-[#115e59] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-md">
            <div className="space-y-2">
              <Users className="w-7 h-7 text-teal-200" />
              <h3 className="text-xl font-bold">
                {language === 'mr' ? 'आंतरराष्ट्रीय वसतिगृह सुविधा' : 'International Hostel Amenities'}
              </h3>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
                {language === 'mr'
                  ? 'एसी खोल्या, २४×७ वाय-फाय, स्वयंपाक साहित्य, फ्रीज, सुरक्षा व सायकल/वाहन सुविधांविषयी सर्व २१ मुद्दे पहा.'
                  : 'Inspect all 21 official amenities including self-contained AC rooms, 24×7 Wi-Fi, kitchenware, FRO travel vehicle & 24×7 security.'}
              </p>
            </div>
            <Link
              href="/Student/InternationalFacilities"
              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white text-teal-950 font-bold text-xs hover:bg-teal-50 transition-colors"
            >
              <span>{language === 'mr' ? '२१ सुविधा पहा' : 'Explore International Hostel Facilities'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
