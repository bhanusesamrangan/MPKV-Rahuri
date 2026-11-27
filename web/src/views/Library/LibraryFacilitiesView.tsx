'use client';

import React, { useState } from 'react';
import {
  Clock,
  Users,
  BookCheck,
  ShieldAlert,
  Ticket,
  CheckCircle2,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LibrarySubnav } from './components/LibrarySubnav';

interface Entitlement {
  srNo: number;
  category: { en: string; mr: string };
  books: number;
  duration: { en: string; mr: string };
  ruleText: string;
}

export const LibraryFacilitiesView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [selectedEntitlementIdx, setSelectedEntitlementIdx] = useState(0);

  const facilities: Array<{ title: { en: string; mr: string }; desc: { en: string; mr: string } }> =
    pageData?.facilities || [];
  const timings: Array<{
    facility: { en: string; mr: string };
    hours: string;
    note: { en: string; mr: string };
  }> = pageData?.timings || [];
  const entitlements: Entitlement[] = pageData?.entitlements || [];
  const rules: Array<{ en: string; mr: string }> = pageData?.rules || [];

  const activePass = entitlements[selectedEntitlementIdx] || entitlements[0];
  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f0f7fb] text-slate-800">
      <LibrarySubnav
        activeSlug="library-facilities"
        currentTitle={{ en: 'Facilities & Reading Halls', mr: 'वाचक सुविधा व अभ्यासिका' }}
        accentActiveClass="bg-[#0c4a6e] text-sky-100 border-[#0c4a6e] shadow-xs"
      />

      {/* ROYAL SAPPHIRE CONCIERGE HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#062438] via-[#0c4a6e] to-[#0369a1] text-white border-b-4 border-sky-300">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#bae6fd_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-300/15 border border-sky-200/40 text-sky-200 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <div className="px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs">
              <p className="text-[11px] uppercase tracking-wider text-sky-200 font-bold">
                {language === 'mr' ? 'अभ्यासिका आसनक्षमता' : 'Seating Capacity'}
              </p>
              <p className="text-2xl font-extrabold text-white mt-0.5">495 Students</p>
            </div>
            <div className="px-5 py-3.5 rounded-2xl bg-sky-400 text-slate-950">
              <p className="text-[11px] uppercase tracking-wider font-bold">
                {language === 'mr' ? 'रात्रीची अभ्यासिका' : 'Reading Room'}
              </p>
              <p className="text-2xl font-extrabold mt-0.5">06:00 – 23:00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-10">
        {/* 3 CORE READER FACILITY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-sky-200/70 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-sky-400 transition-colors"
            >
              <div className="space-y-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  0{idx + 1}
                </span>
                <h2 className="text-lg font-bold text-slate-900">{getTxt(fac.title)}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{getTxt(fac.desc)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* INTERACTIVE BORROWER'S TICKET (BT) PASS SIMULATOR + ENTITLEMENT TABLE */}
        {activePass && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 5 Cols: Interactive Patron BT Pass */}
            <div className="lg:col-span-5 bg-[#082f49] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-300">
                    <Ticket className="w-4 h-4" />
                    <span>{language === 'mr' ? 'सदस्यत्व वर्ग निवडा' : 'Borrower Ticket (BT) Pass Preview'}</span>
                  </span>
                  <CreditCard className="w-5 h-5 text-sky-300" />
                </div>

                {/* Member Type Pills */}
                <div
                  className="flex flex-wrap items-center gap-2"
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
                >
                  {entitlements.map((ent, idx) => (
                    <button
                      key={ent.srNo}
                      onClick={() => setSelectedEntitlementIdx(idx)}
                      className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        idx === selectedEntitlementIdx
                          ? 'bg-sky-300 text-slate-950 border-sky-300'
                          : 'bg-white/10 text-sky-100 border-white/15 hover:bg-white/20'
                      }`}
                    >
                      {getTxt(ent.category)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulated BT Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-400/20 to-white/10 border border-sky-300/40 space-y-4">
                <div className="flex items-start justify-between gap-2 border-b border-white/15 pb-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-sky-200 font-bold">
                      MPKV Central Library • Non-Transferable Pass
                    </p>
                    <h3 className="text-xl font-bold text-white mt-0.5">{getTxt(activePass.category)}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-sky-300 text-slate-950 text-xs font-extrabold">
                    #{activePass.srNo}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-sky-200">
                      {language === 'mr' ? 'देय पुस्तके मर्यादा' : 'Book Borrowing Quota'}
                    </p>
                    <p className="text-3xl font-extrabold text-white mt-0.5">
                      {activePass.books} {language === 'mr' ? 'पुस्तके' : activePass.books === 1 ? 'Book' : 'Books'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-sky-200">
                      {language === 'mr' ? 'वापर कालावधी' : 'Loan Period'}
                    </p>
                    <p className="text-2xl font-extrabold text-sky-300 mt-1">{getTxt(activePass.duration)}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-sky-100/90 pt-2">
                <span className="px-3 py-1 rounded-lg bg-white/10">
                  {language === 'mr' ? 'अहस्तांतरणीय पास' : 'Non-Transferable Pass'}
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10">
                  {language === 'mr' ? 'नूतनीकरण सुविधा उपलब्ध' : 'Renewable if Unreserved'}
                </span>
              </div>
            </div>

            {/* Right 7 Cols: Official Entitlement Table + Operating Timings */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-sky-200/80 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-2.5">
                  <BookCheck className="w-5 h-5 text-sky-700" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {language === 'mr'
                      ? 'प्रवर्गनिहाय पुस्तक देवाणघेवाण नियम'
                      : 'Category-Wise Book Issue Entitlements'}
                  </h2>
                </div>
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-sky-50/70 text-[11px] uppercase tracking-wider text-slate-600 border-b border-slate-200">
                      <th className="py-3 px-5">{language === 'mr' ? 'अ.क्र.' : 'Sr.No.'}</th>
                      <th className="py-3 px-5">{language === 'mr' ? 'सदस्य वर्ग' : 'Member Category'}</th>
                      <th className="py-3 px-5">{language === 'mr' ? 'अधिकृत नियम' : 'Borrowing Rule'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {entitlements.map((e, idx) => (
                      <tr
                        key={e.srNo}
                        onClick={() => setSelectedEntitlementIdx(idx)}
                        className={`cursor-pointer transition-colors ${
                          idx === selectedEntitlementIdx ? 'bg-sky-50 font-semibold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3 px-5 text-xs font-mono text-slate-500">{e.srNo}</td>
                        <td className="py-3 px-5 text-slate-900">{getTxt(e.category)}</td>
                        <td className="py-3 px-5 text-sky-800 font-semibold">{e.ruleText}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Dual Timings Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timings.map((t, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-sky-200/80 p-5 flex items-start gap-3.5 shadow-xs">
                    <div className="p-2.5 rounded-xl bg-sky-100 text-sky-800 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{getTxt(t.facility)}</h3>
                      <p className="text-lg font-extrabold text-sky-700 mt-0.5">{t.hours}</p>
                      <p className="text-xs text-slate-500 mt-1">{getTxt(t.note)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7-CLAUSE CODE OF CONDUCT */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100">
            <ShieldAlert className="w-5 h-5 text-sky-800" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {language === 'mr'
                ? 'ग्रंथालय नियम व पुस्तक हाताळणी संहिता'
                : 'Library Circulation Rules & Book Handling Guidelines'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                <CheckCircle2 className="w-4.5 h-4.5 text-sky-700 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{getTxt(r)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
