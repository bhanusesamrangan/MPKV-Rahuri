'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText,
  Download,
  Search,
  X,
  ChevronRight,
  Home,
  Sparkles,
  BookOpen,
  Bell,
  UserCheck,
  Phone,
  Smartphone,
  Mail,
  MapPin,
  ShieldCheck,
  Target,
  Building2,
  ClipboardCheck,
  TrendingUp,
  ZoomIn
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import fallbackPmeData from '@/data/scraped/pages/pme-cell.json';

interface PmeCellViewProps {
  pageData?: any;
  initialTab?: string;
}

export const PmeCellView: React.FC<PmeCellViewProps> = ({ pageData, initialTab }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>(initialTab || 'guidelines');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [zoomPhoto, setZoomPhoto] = useState<boolean>(false);

  const data = pageData?.pillars ? pageData : (fallbackPmeData as any);
  const heroData = data?.hero || {};
  const stats = heroData?.stats || [];
  const intro = data?.introduction || {};
  const pillars = data?.pillars || [];
  const documents = data?.documents || [];
  const officer = data?.officer || {};

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  const tabs = [
    { id: 'guidelines', labelEn: 'Guidelines & Mandate', labelMr: 'उद्देश व मार्गदर्शक तत्त्वे', icon: BookOpen },
    { id: 'circulars', labelEn: `Circulars & Proformas (${documents.length})`, labelMr: `परिपत्रके व नमुने (${documents.length})`, icon: Bell },
    { id: 'officer', labelEn: 'Contact & In-Charge', labelMr: 'संपर्क व प्रभारी अधिकारी', icon: UserCheck }
  ];

  const categories = ['all', 'Proforma Formats', 'Circulars & Guidelines'];

  const filteredDocs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return documents.filter((d: any) => {
      if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
      if (!q) return true;
      const en = (d.title?.en || '').toLowerCase();
      const mr = (d.title?.mr || '').toLowerCase();
      const cat = (d.category || '').toLowerCase();
      return en.includes(q) || mr.includes(q) || cat.includes(q);
    });
  }, [documents, selectedCategory, searchQuery]);

  const pillarIcons = [Building2, Target, ClipboardCheck, TrendingUp];

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
          <Link href="/PmeAndNodel/PmeIntroduction" className="hover:text-[#0b5c3a] transition-colors">
            {language === 'mr' ? 'PME कक्ष' : 'PME Cell'}
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="text-emerald-900 font-bold">
            {activeTab === 'guidelines' && (language === 'mr' ? 'मार्गदर्शक तत्त्वे व परिचय' : 'Guidelines & Introduction')}
            {activeTab === 'circulars' && (language === 'mr' ? 'परिपत्रके व विहित नमुने' : 'Circulars & Proformas')}
            {activeTab === 'officer' && (language === 'mr' ? 'संपर्क अधिकारी' : 'Contact Officer')}
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
              <Target className="w-3.5 h-3.5 text-amber-400" />
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
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                  }}
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

        {/* TAB 1: OVERVIEW, MANDATE & 4 CORE PILLARS */}
        {activeTab === 'guidelines' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                    <span>{language === 'mr' ? 'कक्ष परिचय व कार्यपद्धती' : 'Cell Overview & Mandate'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
                    {language === 'mr' ? 'नियोजन, संनियंत्रण व मूल्यमापन कक्ष (स्थापना मे २०१८)' : 'Planning, Monitoring & Evaluation (PME) Cell'}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('circulars')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-900 text-white hover:bg-emerald-950 text-xs font-bold transition shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-300" />
                    <span>{language === 'mr' ? 'सर्व १० नमुने व परिपत्रके पहा' : 'View All 10 Proformas & Circulars'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p className="text-sm sm:text-base font-medium text-stone-800">
                  {language === 'mr' ? intro.historyMr : intro.historyEn}
                </p>
                <p>{language === 'mr' ? intro.mandateMr : intro.mandateEn}</p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {pillars.map((pl: any, idx: number) => {
                  const Icon = pillarIcons[idx % pillarIcons.length];
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 hover:border-emerald-300 transition space-y-2.5"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-extrabold text-stone-900 font-serif">
                        {language === 'mr' ? pl.titleMr : pl.titleEn}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {language === 'mr' ? pl.descMr : pl.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CIRCULARS & PROFORMAS (ALL 10 OFFICIAL PDFs) */}
        {activeTab === 'circulars' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'mr' ? 'परिपत्रक किंवा नमुना शोधा...' : 'Search circular or proforma...'}
                    className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-stone-50 border border-stone-300/80 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div
                  className="flex flex-wrap items-center gap-1.5"
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition shrink-0 ${
                        selectedCategory === cat
                          ? 'bg-emerald-900 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {cat === 'all' ? (language === 'mr' ? 'सर्व (१०)' : 'All (10)') : cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs.map((doc: any) => (
                <div
                  key={doc.srNo}
                  className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-900 text-amber-300 font-bold">
                        #{doc.srNo}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-semibold text-[11px]">
                        {doc.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-stone-900 font-serif leading-snug">
                      {getBilingual(doc.title)}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-stone-500 font-semibold">
                      {language === 'mr' ? 'आकार:' : 'Size:'} {doc.fileSize}
                    </span>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs transition shadow-2xs"
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

        {/* TAB 3: CONTACT & PME CELL IN-CHARGE */}
        {activeTab === 'officer' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {officer.photo && (
                <div
                  onClick={() => setZoomPhoto(true)}
                  className="w-40 h-48 rounded-2xl overflow-hidden border-2 border-emerald-800/30 shadow-md shrink-0 cursor-pointer group relative"
                >
                  <img
                    src={officer.photo}
                    alt={officer.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-black/70 text-amber-300">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'अधिकृत संपर्क अधिकारी' : 'PME Cell Officer In-Charge'}</span>
                  </span>
                  <h2 className="text-2xl font-extrabold text-stone-900 font-serif">
                    {language === 'mr' ? officer.nameMr : officer.nameEn}
                  </h2>
                  <p className="text-sm font-semibold text-emerald-800">
                    {language === 'mr' ? officer.designationMr : officer.designationEn}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <div className="text-[11px] text-stone-500 font-semibold">{language === 'mr' ? 'कार्यालयीन दूरध्वनी' : 'Office Phone'}</div>
                      <div className="font-bold text-stone-900">{officer.phone}</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <div className="text-[11px] text-stone-500 font-semibold">{language === 'mr' ? 'मोबाईल क्रमांक' : 'Mobile'}</div>
                      <div className="font-bold text-stone-900">{officer.mobile}</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[11px] text-stone-500 font-semibold">{language === 'mr' ? 'ईमेल पत्ते' : 'Official Emails'}</div>
                      <div className="flex flex-col">
                        {officer.emails?.map((em: string) => (
                          <a key={em} href={`mailto:${em}`} className="font-bold text-emerald-800 hover:underline text-xs truncate">
                            {em}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3 text-xs text-stone-700">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{language === 'mr' ? officer.locationMr : officer.locationEn}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Photo Lightbox */}
      {zoomPhoto && officer.photo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomPhoto(false)}
        >
          <div className="relative max-w-lg w-full space-y-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center text-white text-xs">
              <span className="font-bold">{language === 'mr' ? officer.nameMr : officer.nameEn}</span>
              <button
                type="button"
                onClick={() => setZoomPhoto(false)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={officer.photo} alt={officer.nameEn} className="w-full rounded-2xl shadow-2xl" />
          </div>
        </div>
      )}

    </div>
  );
};
