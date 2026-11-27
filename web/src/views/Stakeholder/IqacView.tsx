'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Users,
  FileText,
  Download,
  ChevronRight,
  Home,
  Sparkles,
  BookOpen,
  ClipboardCheck,
  FileSpreadsheet,
  Briefcase,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import fallbackIqacData from '@/data/scraped/pages/iqac.json';

interface IqacViewProps {
  pageData?: any;
}

export const IqacView: React.FC<IqacViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'committee' | 'documents'>('overview');

  const data = pageData?.committeeComposition ? pageData : (fallbackIqacData as any);
  const heroData = data?.hero || {};
  const stats = heroData?.stats || [];
  const intro = data?.introduction || {};
  const committee = data?.committeeComposition || [];
  const functions = data?.functions || [];
  const documents = data?.documents || [];

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  const totalPosts = committee.reduce((acc: number, row: any) => acc + (Number(row.postsCount) || 0), 0);

  const tabs = [
    { id: 'overview' as const, labelEn: 'Mandate & Functions', labelMr: 'उद्देश व कार्यप्रणाली', icon: ShieldCheck },
    { id: 'committee' as const, labelEn: `Committee Composition (${totalPosts})`, labelMr: `समिती रचना (${totalPosts})`, icon: Users },
    { id: 'documents' as const, labelEn: `IQAC Committee Document (${documents.length})`, labelMr: `अधिकृत दस्तऐवज (${documents.length})`, icon: FileText }
  ];

  const fnIcons = [FileSpreadsheet, Award, Briefcase, BookOpen];

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-800 flex flex-col font-sans">

      {/* 1. Breadcrumb Bar */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px] transition-colors">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600 font-medium">
          <Link href="/" className="flex items-center gap-1 hover:text-[#0b5c3a] transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="text-stone-600">
            {language === 'mr' ? 'शैक्षणिक गुणवत्ता' : 'Academic Quality'}
          </span>
          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="text-emerald-900 font-bold">
            {language === 'mr' ? 'अंतर्गत गुणवत्ता हमी कक्ष (IQAC)' : 'Internal Quality Assurance Cell (IQAC)'}
          </span>
        </div>
      </div>

      {/* 2. Executive Hero */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2a1c] via-[#123624] to-[#071a10] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-700/50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-amber-300 text-xs font-bold tracking-wide uppercase shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{getBilingual(heroData?.badge)}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-serif leading-tight">
                {getBilingual(heroData?.title)}
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed max-w-3xl">
                {getBilingual(heroData?.subtitle)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              {stats.map((st: any, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-extrabold text-white">{st.value}</span>
                  <span className="opacity-90">{getBilingual(st.label)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Content */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16 space-y-6">

        {/* Guaranteed Anti-Clipping Tab Bar */}
        <div className="w-full p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs overflow-visible">
          <div
            className="flex flex-wrap items-center gap-2 w-full"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span className="whitespace-nowrap">{language === 'mr' ? tab.labelMr : tab.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: MANDATE & FUNCTIONS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                    <ClipboardCheck className="w-3.5 h-3.5 text-emerald-800" />
                    <span>{language === 'mr' ? 'स्थापना व कार्यक्षेत्र' : 'Genesis & Statutory Mandate'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
                    {language === 'mr'
                      ? 'अंतर्गत गुणवत्ता हमी व मूल्यांकन कक्ष (मार्च २०१४)'
                      : 'Quality Assurance & Career Advancement Governance'}
                  </h2>
                </div>

                {documents[0] && (
                  <a
                    href={documents[0].fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold transition shadow-2xs shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>{language === 'mr' ? 'IQAC समिती PDF पहा' : 'IQAC Committee PDF'} ({documents[0].fileSize})</span>
                  </a>
                )}
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p className="text-sm sm:text-base font-medium text-stone-800">
                  {language === 'mr' ? intro.formulationMr : intro.formulationEn}
                </p>
                <p>{language === 'mr' ? intro.mandateMr : intro.mandateEn}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {functions.map((fn: any, idx: number) => {
                  const FIcon = fnIcons[idx % fnIcons.length];
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 hover:border-emerald-300 transition space-y-2.5"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
                        <FIcon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-extrabold text-stone-900 font-serif">
                        {language === 'mr' ? fn.titleMr : fn.titleEn}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {language === 'mr' ? fn.descMr : fn.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMMITTEE COMPOSITION (13 POSTS) */}
        {activeTab === 'committee' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-stone-900 font-serif flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-700" />
                  <span>{language === 'mr' ? 'पुनर्रचित IQAC समिती रचना (MCAER निर्देशांनुसार)' : 'Revised IQAC Statutory Committee Composition'}</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {language === 'mr'
                    ? 'अंतर्गत गुणवत्ता मूल्यांकन कक्षाच्या १३ सदस्यीय समितीची पदनिहाय रचना.'
                    : 'Official 13-member governance composition constituted per directives of MCAER, Pune.'}
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs shrink-0">
                {language === 'mr' ? `एकूण पदे: ${totalPosts}` : `Total Posts: ${totalPosts}`}
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-800 border-b border-stone-200">
                    <th className="py-3.5 px-4 font-bold w-16 text-center">{language === 'mr' ? 'अ.क्र.' : 'Sr. No.'}</th>
                    <th className="py-3.5 px-4 font-bold">{language === 'mr' ? 'समितीतील भूमिका' : 'Committee Role'}</th>
                    <th className="py-3.5 px-4 font-bold">{language === 'mr' ? 'पदाचे नाव' : 'Name of Post'}</th>
                    <th className="py-3.5 px-4 font-bold w-36 text-center">{language === 'mr' ? 'पद संख्या' : 'No. of Posts'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  {committee.map((row: any) => (
                    <tr key={row.srNo} className="hover:bg-emerald-50/40 transition">
                      <td className="py-3.5 px-4 font-bold text-center text-stone-500">{row.srNo}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                          row.role.en === 'Chairman'
                            ? 'bg-emerald-900 text-amber-300'
                            : row.role.en === 'Member Secretary'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-stone-100 text-stone-700'
                        }`}>
                          {getBilingual(row.role)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-stone-900">
                        {language === 'mr' ? row.postMr : row.postEn}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-900 font-extrabold border border-emerald-200">
                          {row.postsCount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: IQAC DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
            <div className="space-y-1 pb-3 border-b border-stone-100">
              <h2 className="text-xl font-extrabold text-stone-900 font-serif flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <span>{language === 'mr' ? 'अधिकृत IQAC समिती दस्तऐवज' : 'Official IQAC Statutory Documents'}</span>
              </h2>
              <p className="text-xs text-stone-500">
                {language === 'mr'
                  ? 'अंतर्गत गुणवत्ता हमी कक्ष समिती अधिसूचना व दस्तऐवज डाउनलोड करा.'
                  : 'Download official notification of the MPKV Internal Quality Assurance Cell committee.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc: any) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-900 text-amber-300 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>IQAC Official</span>
                      </span>
                      <span className="text-[11px] text-stone-500 font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{doc.date}</span>
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-stone-900 font-serif">
                      {getBilingual(doc.title)}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-stone-200/70 flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-500">{doc.fileSize}</span>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs transition shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-300" />
                      <span>{language === 'mr' ? 'PDF डाउनलोड' : 'Download PDF'}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
