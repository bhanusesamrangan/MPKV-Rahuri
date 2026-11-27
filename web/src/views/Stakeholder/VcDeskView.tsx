'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  ChevronRight,
  Compass,
  FileText,
  GraduationCap,
  History,
  Home,
  Mail,
  MapPin,
  Microscope,
  Phone,
  Quote,
  Sparkles,
  Sprout,
  Users,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface VcDeskViewProps {
  pageData?: any;
  defaultTab?: 'desk' | 'secretariat' | 'former';
}

export const VcDeskView: React.FC<VcDeskViewProps> = ({ pageData, defaultTab = 'desk' }) => {
  const { language, getBilingual } = useLanguage();
  const isMr = language === 'mr';
  const [activeTab, setActiveTab] = useState<'desk' | 'secretariat' | 'former'>(defaultTab);

  const vc = pageData?.currentVc || {};
  const highlights: any[] = pageData?.highlights || [];
  const paragraphs: any[] = pageData?.messageParagraphs || [];
  const pillars: any[] = pageData?.visionPillars || [];
  const secretariat: any[] = pageData?.secretariat || [];
  const formerVcs: any[] = pageData?.formerVcs || [];

  const pillarIcons = [GraduationCap, Microscope, Sprout, Users];

  return (
    <div className="w-full min-h-screen bg-[#faf9f5] text-slate-800">
      {/* Breadcrumb Bar */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <div className="w-full max-w-[1440px] mx-auto flex items-center flex-wrap gap-1.5 text-xs text-stone-600 font-medium">
          <Link href="/" className="hover:text-emerald-800 flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <Link href="/officers/directory" className="hover:text-emerald-800 transition-colors">
            {isMr ? 'अधिकारी' : 'Officers'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-emerald-950 font-bold">
            {isMr ? 'मा. कुलगुरू कार्यालय' : "Vice Chancellor's Desk"}
          </span>
        </div>
      </div>

      {/* Executive Emerald & Gold Hero with VC Portrait */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2b1d] via-[#13422d] to-[#082116] text-white border-b-4 border-amber-400">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 85% 20%, rgba(251,191,36,0.3), transparent 45%), radial-gradient(circle at 15% 80%, rgba(16,185,129,0.35), transparent 50%)',
          }}
        />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[50px] py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
            {/* VC Portrait Card (Left 4 Cols) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="w-full max-w-xs bg-white/10 backdrop-blur-md border border-amber-300/35 rounded-3xl p-4 shadow-2xl space-y-3 text-center">
                <div className="relative w-full aspect-[4/4.3] rounded-2xl overflow-hidden bg-emerald-950 border border-white/20 shadow-inner">
                  <img
                    src={vc.image || '/media/images/vc/vc_dr_vilas_kharche.jpg'}
                    alt={getBilingual(vc.name)}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (vc.fallbackImage && !img.src.includes('PP_Web')) {
                        img.src = vc.fallbackImage;
                      }
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-0.5 pt-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                    {isMr ? 'मा. कुलगुरू' : 'Hon’ble Vice Chancellor'}
                  </span>
                  <h2 className="text-lg font-extrabold text-white pt-1">
                    {getBilingual(vc.name)}
                  </h2>
                  <p className="text-xs text-emerald-100/90 leading-snug">
                    {isMr ? 'महात्मा फुले कृषि विद्यापीठ, राहुरी' : 'Mahatma Phule Krishi Vidyapeeth, Rahuri'}
                  </p>
                </div>
                {vc.phone && (
                  <div className="pt-2 border-t border-white/15 flex items-center justify-center gap-2 text-xs text-amber-200 font-semibold">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{vc.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* VC Title, Summary & 6 Institutional Metrics (Right 8 Cols) */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>{getBilingual(pageData?.hero?.badge)}</span>
              </div>

              <div className="space-y-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                  {getBilingual(pageData?.hero?.title)}
                </h1>
                <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-3xl">
                  {getBilingual(pageData?.hero?.subtitle)}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs text-center"
                  >
                    <div className="text-lg sm:text-xl font-extrabold text-amber-300">{h.value}</div>
                    <div className="text-[10.5px] font-medium text-emerald-100 mt-0.5 leading-tight">
                      {getBilingual(h.label)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Navigation Tabs (VCDesk, Secretariat, Former VCs) */}
      <section className="bg-white border-b border-stone-200 sticky top-[86px] z-20 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[50px] py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              {
                id: 'desk' as const,
                label: isMr ? 'मा. कुलगुरूंचे मनोगत' : "From Vice Chancellor's Desk",
                icon: Quote,
              },
              {
                id: 'secretariat' as const,
                label: isMr ? 'कुलगुरू सचिवालय (५)' : 'VC Secretariat (5)',
                icon: Building2,
              },
              {
                id: 'former' as const,
                label: isMr ? 'माजी कुलगुरू (१२)' : 'Former Vice Chancellors (12)',
                icon: History,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    active
                      ? 'bg-[#13422d] text-white border-[#13422d] shadow-xs'
                      : 'bg-stone-50 text-slate-700 border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-amber-300' : 'text-emerald-700'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <Link
            href="/administration"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>{isMr ? 'मध्यवर्ती प्रशासन पहा' : 'Central Administration'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Active Tab Body */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[50px] py-8 lg:py-10 space-y-8">
        {/* TAB 1: VICE CHANCELLOR'S MESSAGE + 4 STRATEGIC PILLARS */}
        {activeTab === 'desk' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            {/* Full Official Address (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                    {isMr ? 'अधिकृत संदेश' : 'Official Address'}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {isMr ? 'शैक्षणिक, संशोधन व विस्तार दृष्टीकोन' : "From the Hon’ble Vice Chancellor's Desk"}
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-[15px] text-slate-700 leading-relaxed text-justify">
                {paragraphs.map((para, idx) => (
                  <p key={idx} className={idx === 0 ? 'font-medium text-slate-800' : ''}>
                    {getBilingual(para)}
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{getBilingual(vc.name)}</p>
                  <p className="text-xs text-slate-500 font-medium">{getBilingual(vc.designation)}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{isMr ? 'राहुरी, महाराष्ट्र' : 'Rahuri, Maharashtra'}</span>
                </span>
              </div>
            </div>

            {/* 4 Strategic Pillars + Office Address Card (4 Cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                  <Compass className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                    {isMr ? 'चतुःसूत्री कार्यदिशा' : 'Four-Pillar Strategic Roadmap'}
                  </h3>
                </div>

                <div className="space-y-3">
                  {pillars.map((pl, idx) => {
                    const PIcon = pillarIcons[idx % pillarIcons.length];
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#faf9f5] border border-stone-200/80 space-y-1"
                      >
                        <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
                          <PIcon className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{isMr ? pl.mr : pl.en}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-6">
                          {isMr ? pl.descMr : pl.descEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#0b2b1d] text-white rounded-3xl p-5 sm:p-6 space-y-3 shadow-sm">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isMr ? 'कुलगुरू सचिवालय संपर्क' : 'VC Secretariat Contact'}</span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {getBilingual(vc.address)}
                </p>
                <div className="pt-1 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-amber-200 font-semibold">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{vc.phone || '02426-243208'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-200">
                    <Mail className="w-3.5 h-3.5" />
                    <a href="mailto:registrar.mpkv@nic.in" className="hover:underline">
                      registrar.mpkv@nic.in
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('secretariat')}
                  className="w-full mt-2 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  {isMr ? 'सचिवालय अधिकारी यादी पहा' : 'View Secretariat Directory'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VICE CHANCELLOR'S SECRETARIAT */}
        {activeTab === 'secretariat' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 bg-[#f4f7f2]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-800 text-amber-300">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {isMr ? 'मा. कुलगुरू सचिवालय अधिकारी व कर्मचारी' : "Vice Chancellor's Secretariat Staff"}
                  </h2>
                  <p className="text-xs text-slate-600">
                    {isMr
                      ? 'नवीन प्रशासकीय इमारत, मध्यवर्ती संकुल, म.फु.कृ.वि., राहुरी'
                      : 'New Administrative Building, Central Campus, MPKV Rahuri'}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-900 text-xs font-bold">
                {isMr ? `एकूण ${secretariat.length} अधिकारी` : `${secretariat.length} Officials`}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wider text-slate-600">
                    <th className="py-3.5 px-6">{isMr ? 'अ.क्र.' : 'Sr. No.'}</th>
                    <th className="py-3.5 px-6">{isMr ? 'अधिकारी / कर्मचारी नाव' : 'Name'}</th>
                    <th className="py-3.5 px-6">{isMr ? 'पदनाम' : 'Designation'}</th>
                    <th className="py-3.5 px-6">{isMr ? 'इंटरकॉम / दूरध्वनी' : 'Intercom / Tel. No.'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {secretariat.map((row) => (
                    <tr key={row.sr} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-6 font-mono text-xs text-slate-500">{row.sr}</td>
                      <td className="py-3.5 px-6 font-bold text-slate-900">{getBilingual(row.name)}</td>
                      <td className="py-3.5 px-6 text-slate-700 font-medium">{getBilingual(row.designation)}</td>
                      <td className="py-3.5 px-6">
                        {row.phone ? (
                          <a
                            href={`tel:${row.phone.replace(/[^0-9]/g, '')}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{row.phone}</span>
                          </a>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: FORMER VICE CHANCELLORS (1968 - 2025) */}
        {activeTab === 'former' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {isMr ? 'माजी मा. कुलगुरूंची नाममालिका (१९६८ – २०२५)' : 'Roll of Former Hon’ble Vice Chancellors (1968 – 2025)'}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  {isMr
                    ? 'स्थापनेपासून महात्मा फुले कृषि विद्यापीठाचे नेतृत्व केलेले माजी कुलगुरू'
                    : 'Distinguished leaders who guided Mahatma Phule Krishi Vidyapeeth since its foundation'}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold">
                1968 – 2025
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {formerVcs.map((fvc) => (
                <div
                  key={fvc.sr}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col"
                >
                  <div className="relative aspect-[4/4.2] bg-stone-100 overflow-hidden">
                    <img
                      src={fvc.image}
                      alt={getBilingual(fvc.name)}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-amber-300 text-[11px] font-extrabold">
                      #{fvc.sr}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {getBilingual(fvc.name)}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-lg px-2.5 py-1 self-start">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      <span>
                        {fvc.from} – {fvc.to}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
