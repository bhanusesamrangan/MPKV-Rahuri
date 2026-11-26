'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Scale,
  FileText,
  Briefcase,
  Award,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft,
  Home,
  Download,
  ExternalLink,
  Search,
  X,
  Filter,
  Layers,
  DollarSign,
  Wallet,
  PieChart,
  ShieldCheck,
  Landmark,
  GitFork,
  ArrowDown,
  MapPin,
  Calendar,
  Clock,
  BookOpen,
  AlertCircle,
  HelpCircle,
  Network
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FinanceViewProps {
  pageData?: any;
}

export const FinanceAccountsView: React.FC<FinanceViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('about');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedWing, setSelectedWing] = useState<string | null>(null);
  const [showOriginalChart, setShowOriginalChart] = useState<boolean>(false);
  const pageSize = 20;

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  // Safe fallback data
  const comptrollerData = pageData?.comptroller || {};
  const statutoryDuties = comptrollerData?.statutoryDuties || [];
  const generalActivities = comptrollerData?.generalActivities || [];
  const organizationalWings = pageData?.organizationalWings || [];
  const delegationDocs = pageData?.delegation || [];
  const accountDocs = pageData?.accountDocs || [];
  const grList = pageData?.grList || [];
  const budgets = pageData?.budgets || [];
  const circulars = pageData?.circulars || [];
  const contacts = pageData?.contacts || [];
  const flowChartImage = pageData?.flowChartImage || '/media/images/finance_flow_chart.jpg';

  // Navigation tab definitions
  const tabsList = [
    { key: 'about', labelEn: 'About & Statutory Mandate', labelMr: 'माहिती व वैधानिक कार्यकक्षा', count: null, icon: Landmark },
    { key: 'profile', labelEn: 'Organizational Structure', labelMr: 'संस्थात्मक रचना व उतरंड', count: organizationalWings.length || 5, icon: Network },
    { key: 'delegation', labelEn: 'Delegation of Powers', labelMr: 'वित्तीय अधिकार प्रदान', count: delegationDocs.length || 1, icon: Scale },
    { key: 'account_doc', labelEn: 'Account Code 1991', labelMr: 'लेखा संहिता १९९१', count: accountDocs.length || 1, icon: BookOpen },
    { key: 'gr', labelEn: 'Govt. Resolutions (GR)', labelMr: 'शासन निर्णय (GR)', count: grList.length || 1, icon: FileText },
    { key: 'circulars', labelEn: 'Circulars', labelMr: 'वित्त परिपत्रके', count: circulars.length || 97, icon: Layers },
    { key: 'budget', labelEn: 'Budget & Grants (F.M.G.)', labelMr: 'अंदाजपत्रक व अनुदान', count: budgets.length || 6, icon: PieChart },
    { key: 'contact', labelEn: 'Office Directory', labelMr: 'कार्यालय संपर्क निर्देशिका', count: contacts.length || 9, icon: Phone }
  ];

  // Filtered circulars
  const filteredCirculars = useMemo(() => {
    if (!circulars || !Array.isArray(circulars)) return [];
    if (!searchQuery.trim()) return circulars;
    const q = searchQuery.toLowerCase().trim();
    return circulars.filter((item: any) => {
      const tEn = item.title?.en?.toLowerCase() || '';
      const tMr = item.title?.mr?.toLowerCase() || '';
      return tEn.includes(q) || tMr.includes(q);
    });
  }, [circulars, searchQuery]);

  // Paginated circulars
  const totalPages = Math.ceil(filteredCirculars.length / pageSize) || 1;
  const paginatedCirculars = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCirculars.slice(start, start + pageSize);
  }, [filteredCirculars, currentPage]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-[#f8faf8] min-h-screen text-slate-800">
      
      {/* 1. Breadcrumb Strip */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <div className="w-full max-w-[1720px] mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
          <Link href="/" className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <Link href="/administration" className="hover:text-emerald-800 transition-colors">
            {language === 'mr' ? 'प्रशासन' : 'Administration'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md">
            {language === 'mr' ? 'वित्त व लेखा संचालनालय' : 'Finance & Accounts Directorate'}
          </span>
          {activeTab !== 'about' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-stone-500 font-medium truncate">
                {language === 'mr'
                  ? tabsList.find((t) => t.key === activeTab)?.labelMr
                  : tabsList.find((t) => t.key === activeTab)?.labelEn}
              </span>
            </>
          )}
        </div>
      </div>

      {/* 2. Hero Header: Executive Emerald & Regal Gold */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2a1c] via-[#123624] to-[#071a10] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-700/50">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-amber-300 text-xs font-bold tracking-wide uppercase shadow-inner">
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'mr' ? 'वैधानिक वित्तीय प्राधिकरण' : 'Statutory Financial Directorate'}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-serif leading-tight">
                {language === 'mr' ? 'वित्त व लेखा संचालनालय' : 'Finance & Accounts Directorate'}
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed max-w-3xl">
                {language === 'mr'
                  ? 'महाराष्ट्र कृषी विद्यापीठे अधिनियम १९८३, कलम २०(१), (२), (३) नुसार विद्यापीठाचे अंदाजपत्रक, निधी संचलन, अंतर्गत लेखापरीक्षण व वित्तीय सल्ला देणारे वैधानिक नियंत्रक कार्यालय.'
                  : 'Statutory office of the Comptroller managing university budgeting, grant administration, internal audit, investment oversight, and pension disbursement under MAU Act 1983 & Account Code 1991.'}
              </p>
            </div>

            {/* Quick Mandate Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? 'कलम २० म.कृ.वि. अधिनियम १९८३' : 'Section 20 MAU Act 1983'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? 'कृषी विद्यापीठ लेखा संहिता १९९१' : 'MAU Account Code 1991'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? '९७ अधिकृत वित्त परिपत्रके' : '97 Official Circulars'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <PieChart className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? 'वार्षिक अर्थसंकल्प २०२५-२७' : 'Budget 2025-27'}</span>
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Main Navigation & Content Section */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16 space-y-8">

        {/* 8 Unique Finance Tabs Strip (Guaranteed flex-wrap with inline styles to prevent any clipping) */}
        <div className="w-full p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs overflow-visible">
          <div
            className="flex flex-wrap items-center gap-2 w-full"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
          >
            {tabsList.map((tab) => {
              const isActive = activeTab === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTabChange(tab.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span className="whitespace-nowrap">{language === 'mr' ? tab.labelMr : tab.labelEn}</span>
                  {tab.count !== null && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                        isActive ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-800'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* VIEW 1: ABOUT & STATUTORY MANDATE (Section 20 of MAU Act 1983) */}
        {/* ================================================================= */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            
            {/* 1a. Appointment & Mandate Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    <Scale className="w-3.5 h-3.5 text-amber-800" />
                    <span>{language === 'mr' ? 'कलम २०(१) म.कृ.वि. अधिनियम १९८३' : 'Section 20(1) MAU Act 1983'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'नियंत्रक पदाची वैधानिक नियुक्ती व स्वरूप' : 'Statutory Appointment & Cadre of Comptroller'}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:02426-243226"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>02426-243226</span>
                  </a>
                  <a
                    href="mailto:comptroller.mpkv@gov.in"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 text-xs font-bold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-700" />
                    <span>comptroller.mpkv@gov.in</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    {language === 'mr' ? 'अ) नियुक्ती संवर्ग (Appointment Cadre)' : 'A) Statutory Cadre on Deputation'}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {language === 'mr'
                      ? 'नियंत्रक हे भारतीय लेखापरीक्षा व लेखा सेवा (IA&AS) किंवा महाराष्ट्र वित्त व लेखा सेवा (MF&AS) मधील राज्य शासनातर्फे प्रतिनियुक्तीवर नियुक्त वैधानिक वर्ग-१ अधिकारी असतात.'
                      : 'He is an officer belonging to the Indian Audit and Accounts Service (IA&AS) or Maharashtra Finance and Accounts Service (MF&AS) appointed by the State Government on deputation under Section 20(1) of MAU Act 1983.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    {language === 'mr' ? 'ब) मुख्य वित्तीय सल्लागार भूमिका' : 'B) Chief Financial Advisor Role'}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {language === 'mr'
                      ? 'नियंत्रक हे कृषी विद्यापीठाचे मुख्य वित्तीय सल्लागार असून विद्यापीठाची सर्व मालमत्ता, गुंतवणूक, वित्त व अंदाजपत्रकीय बाबींवर त्यांचे नियंत्रण असते.'
                      : 'The Comptroller acts as the Chief Financial Advisor to the Vidyapeeth and shall invariably be consulted on all matters relating to finance, budget, accounts, and investment policy.'}
                  </p>
                </div>
              </div>

            </div>

            {/* 1b. 8 Statutory Duties & Responsibilities (Section 20(2), 20(3) & Account Code Ch. 26) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'mr' ? 'वैधानिक कर्तव्ये व जबाबदाऱ्या' : 'Statutory Duties & Responsibilities'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {language === 'mr'
                    ? 'कलम २०(२), (३) म.कृ.वि. अधिनियम १९८३ व लेखा संहिता प्रकरण २६ अन्वये कर्तव्ये'
                    : 'Duties under Section 20(2), (3) of MAU Act 1983, Chapter 26 of Account Code 1991 & Statute 67'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {statutoryDuties.map((duty: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#fafbfa] border border-stone-200/90 hover:border-emerald-300 hover:shadow-xs transition-all space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 font-serif">
                          {getBilingual(duty.title)}
                        </h4>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed font-medium pl-8">
                        {getBilingual(duty.desc)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 1c. 5 General Activities of Office of Comptroller */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  <PieChart className="w-3.5 h-3.5 text-blue-700" />
                  <span>{language === 'mr' ? 'सर्वसाधारण कार्यकलाप' : 'General Core Activities'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'नियंत्रक कार्यालयाचे ५ प्रमुख प्रशासकीय कार्यकलाप' : '5 Core Operational Functions of Office of Comptroller'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {generalActivities.map((act: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2.5 flex flex-col justify-between hover:shadow-2xs transition-shadow"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                        {language === 'mr' ? `कार्यकलाप क्र. ${act.srNo}` : `Activity #${act.srNo}`}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 font-serif pt-1">
                        {getBilingual(act.title)}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        {getBilingual(act.desc)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 2: ORGANIZATIONAL STRUCTURE (Interactive Tree & Chart View) */}
        {/* ================================================================= */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                    <Network className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'संस्थात्मक रचना तक्ता' : 'Statutory Hierarchy Tree'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'नियंत्रक कार्यालय पदोन्नती व प्रशासकीय उतरंड' : 'Comptroller Office Cadre Hierarchy'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {language === 'mr'
                      ? 'नियंत्रक (Comptroller) -> ५ मुख्य सहाय्यक नियंत्रक व अधिदान व लेखा अधिकारी शाखा -> कार्यालय अधीक्षक ते शेतमजूर संवर्ग.'
                      : 'Comptroller apex -> 5 Assistant Comptroller & PAO wings -> superintendent, clerical, and support staff cadres.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowOriginalChart(!showOriginalChart)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors shrink-0"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{showOriginalChart ? (language === 'mr' ? 'इंटरअ‍ॅक्टिव्ह रचना पहा' : 'View Tree Hierarchy') : (language === 'mr' ? 'मूळ फ्लो चार्ट चित्र पहा' : 'View Original Scanned Flow Chart')}</span>
                </button>
              </div>

              {showOriginalChart ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700">
                      {language === 'mr' ? 'मूळ प्रशासकीय फ्लो चार्ट (FinaceFlowChart.jpg)' : 'Official Flow Chart (FinaceFlowChart.jpg)'}
                    </span>
                    <a
                      href={flowChartImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'संपूर्ण आकारात उघडा' : 'Open Full Image'}</span>
                    </a>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-white p-2">
                    <img
                      src={flowChartImage}
                      alt="MPKV Comptroller Office Flow Chart"
                      className="w-full h-auto object-contain max-h-[800px] rounded-xl mx-auto"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  
                  {/* Apex Node: Comptroller */}
                  <div className="flex flex-col items-center">
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 to-stone-900 text-white border-2 border-amber-400 text-center max-w-lg w-full shadow-lg space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950">
                        {language === 'mr' ? 'सर्वोच्च प्रमुख' : 'Apex Financial Authority'}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold font-serif text-white">
                        {language === 'mr' ? 'नियंत्रक (Comptroller)' : 'Comptroller (Finance & Accounts)'}
                      </h4>
                      <p className="text-xs text-emerald-200 font-medium">
                        {language === 'mr'
                          ? 'भारतीय लेखापरीक्षा व लेखा सेवा / महाराष्ट्र वित्त व लेखा सेवा (वर्ग-१ प्रतिनियुक्ती)'
                          : 'IA&AS / MF&AS Deputation Class-I Statutory Officer'}
                      </p>
                      <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-center gap-4 text-xs font-mono text-emerald-300">
                        <span>📞 02426-243226</span>
                        <span>✉️ comptroller.mpkv@gov.in</span>
                      </div>
                    </div>

                    <div className="w-0.5 h-8 bg-stone-300 my-1" />
                    <div className="text-xs font-bold text-stone-500 uppercase tracking-widest px-3 py-1 rounded-full bg-stone-100 border border-stone-200">
                      {language === 'mr' ? '५ मुख्य कार्यकारी शाखा (५ Wings)' : '5 Executive Financial Wings'}
                    </div>
                    <div className="w-0.5 h-8 bg-stone-300 my-1" />
                  </div>

                  {/* 5 Executive Wings Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {organizationalWings.map((wing: any, idx: number) => {
                      const isSelected = selectedWing === wing.key;
                      return (
                        <div
                          key={wing.key}
                          className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-emerald-50/80 border-emerald-400 shadow-sm'
                              : 'bg-white border-stone-200/90 hover:border-emerald-300 hover:shadow-xs'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                                {language === 'mr' ? `शाखा क्र. ०${idx + 1}` : `Wing #${idx + 1}`}
                              </span>
                              <Building2 className="w-4 h-4 text-emerald-700" />
                            </div>

                            <h4 className="text-base font-bold text-slate-900 font-serif leading-snug">
                              {getBilingual(wing.title)}
                            </h4>

                            <p className="text-xs text-stone-600 leading-relaxed font-medium">
                              {getBilingual(wing.scope)}
                            </p>

                            {/* Cadre Hierarchy Under Wing */}
                            <div className="pt-3 border-t border-stone-100 space-y-1.5">
                              <div className="text-[11px] font-bold text-stone-700 uppercase tracking-wide">
                                {language === 'mr' ? 'कर्मचारी उतरंड (Staff Cadre):' : 'Staff Cadre Under Wing:'}
                              </div>
                              <div className="space-y-1 pl-2 border-l-2 border-emerald-500">
                                {wing.hierarchy.map((cad: any, cidx: number) => (
                                  <div key={cidx} className="text-xs text-stone-700 flex items-center gap-1.5 font-medium">
                                    <span className="text-stone-400 text-[10px]">↳</span>
                                    <span>{getBilingual(cad.cadre)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 mt-4 border-t border-stone-100 space-y-1 text-xs">
                            <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                              <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <a href={`tel:${wing.phone}`} className="hover:underline">{wing.phone}</a>
                            </div>
                            <div className="flex items-center gap-1.5 text-stone-600 font-mono text-[11px]">
                              <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <a href={`mailto:${wing.email}`} className="hover:underline truncate">{wing.email}</a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Regional Pay & Accounts Offices Card */}
                  <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/90 space-y-4">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-amber-800" />
                      <h4 className="text-base font-bold text-slate-900 font-serif">
                        {language === 'mr' ? 'विभागीय अधिदान व लेखा कार्यालये (Regional PAO Units)' : 'Regional Pay & Accounts Offices (Off-Campus Colleges)'}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                      {language === 'mr'
                        ? 'राहुरी मध्यवर्ती अधिदान कार्यालयाव्यतिरिक्त पुणे, कोल्हापूर व धुळे येथील कृषी महाविद्यालयांमध्ये प्रत्येकी स्वतंत्र अधिदान व लेखा अधिकारी (PAO) कार्यालय कार्यरत आहे.'
                        : 'In addition to the Central PAO at Rahuri, 3 regional PAO divisions operate at College of Agriculture Pune, Kolhapur, and Dhule for decentralized bill processing and salary disbursements.'}
                    </p>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 3: DELEGATION OF POWERS (Order dated 31.03.2015) */}
        {/* ================================================================= */}
        {activeTab === 'delegation' && (
          <div className="space-y-8">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Scale className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'mr' ? 'वैधानिक अधिकार प्रदान' : 'Statutory Power Delegation'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'विद्यापीठातील अधिकाऱ्यांना वित्तीय व प्रशासकीय अधिकार प्रदान' : 'Delegation of Financial & Administrative Powers to University Officers'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  {language === 'mr'
                    ? 'अधिनियम व परिनियमांनुसार कुलगुरू, कुलसचिव, नियंत्रक, अधिष्ठाता, संशोधन संचालक व विभाग प्रमुखांच्या वित्तीय मंजुरी मर्यादा.'
                    : 'Statutory threshold limits, sanction authorities, and administrative approval powers under MAU Statutes.'}
                </p>
              </div>

              {delegationDocs.map((doc: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                        {language === 'mr' ? `दिनांक: ${doc.date}` : `Date: ${doc.date}`}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                        {doc.fileSize}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                      {getBilingual(doc.title)}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-medium">
                      {getBilingual(doc.scope)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                    <a
                      href={doc.fileUrl}
                      download
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'दस्तऐवज डाउनलोड करा' : 'Download PDF'}</span>
                    </a>
                    {doc.externalUrl && (
                      <a
                        href={doc.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-bold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{language === 'mr' ? 'थेट पोर्टल लिंक' : 'Official Portal'}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 4: ACCOUNT CODE 1991 (Statutory Accounting Manual) */}
        {/* ================================================================= */}
        {activeTab === 'account_doc' && (
          <div className="space-y-8">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                  <span>{language === 'mr' ? 'मूळ वैधानिक लेखा नियमावली' : 'Statutory Financial Code'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'महाराष्ट्र कृषी विद्यापीठे लेखा संहिता १९९१' : 'Maharashtra Agricultural Universities Account Code 1991'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  {language === 'mr'
                    ? 'कृषी विद्यापीठांच्या सर्व लेखा, अंदाजपत्रक, खर्च संमती, अंतर्गत लेखापरीक्षण व व्यावसायिक शेती हिशोबांचे मूळ अधिकृत पुस्तक.'
                    : 'The master statutory accounting code defining accounts classification, Comptroller authority (Ch. 26), and commercial farm accounting (Ch. 27).'}
                </p>
              </div>

              {accountDocs.map((doc: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 text-blue-900">
                        {language === 'mr' ? `वर्ष: ${doc.year}` : `Year: ${doc.year}`}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                        {doc.fileSize}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                      {getBilingual(doc.title)}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-medium">
                      {getBilingual(doc.scope)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                    <a
                      href={doc.fileUrl}
                      download
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'संपूर्ण संहिता डाउनलोड (15.3 MB)' : 'Download Full Code (15.3 MB)'}</span>
                    </a>
                    {doc.externalUrl && (
                      <a
                        href={doc.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-bold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{language === 'mr' ? 'थेट पोर्टल लिंक' : 'Official Portal'}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {/* Key Chapters Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-1.5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                    {language === 'mr' ? 'प्रकरण २६ (Chapter 26)' : 'Chapter 26'}
                  </span>
                  <h5 className="text-sm font-bold text-slate-900 font-serif pt-1">
                    {language === 'mr' ? 'नियंत्रकांचे अधिकार व वित्तीय कर्तव्ये' : 'Comptroller Powers & Financial Duties'}
                  </h5>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    {language === 'mr'
                      ? 'अंदाजपत्रकाबाहेरील खर्च नामंजूर करण्याचे अधिकार, अंतर्गत तपासणी व कार्यकारी परिषदेला अहवाल सादर करण्याचे अधिकार.'
                      : 'Statutory powers to disallow unauthorized expenditure, call for explanations, and report financial irregularities to Executive Council.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-1.5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                    {language === 'mr' ? 'प्रकरण २७ (Chapter 27)' : 'Chapter 27'}
                  </span>
                  <h5 className="text-sm font-bold text-slate-900 font-serif pt-1">
                    {language === 'mr' ? 'व्यावसायिक शेती हिशोब व नफा-तोटा ताळेबंद' : 'Commercial Farm Accounting & Balance Sheets'}
                  </h5>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    {language === 'mr'
                      ? 'विद्यापीठाच्या शेती प्रक्षेत्रे, रोपवाटिका व बियाणे प्रकल्पांचे व्यावसायिक ताळेबंद व नफा-तोटा हिशोब तयार करण्याचे निकष.'
                      : 'Accounting standards for preparation of profit and loss balance sheets of agricultural research farms, nurseries, and seed production units.'}
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 5: GOVERNMENT RESOLUTIONS (GR Non-Plan 2023) */}
        {/* ================================================================= */}
        {activeTab === 'gr' && (
          <div className="space-y-8">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <FileText className="w-3.5 h-3.5 text-amber-800" />
                  <span>{language === 'mr' ? 'राज्य शासन निर्णय' : 'Government Resolutions'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'कृषी व पदुम विभाग, महाराष्ट्र शासन निर्णय' : 'Agriculture Dept., GoM Resolutions'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  {language === 'mr'
                    ? 'कृषी विद्यापीठांच्या योजनेतर वेतन अनुदान व आस्थापना खर्चाशी संबंधित अधिकृत शासन निर्णय.'
                    : 'Official Government of Maharashtra resolutions governing Non-Plan salary grants and establishment allocations.'}
                </p>
              </div>

              {grList.map((gr: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                        {language === 'mr' ? `दिनांक: ${gr.date}` : `Date: ${gr.date}`}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                        {gr.fileSize}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                      {getBilingual(gr.title)}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-medium">
                      {getBilingual(gr.scope)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                    <a
                      href={gr.fileUrl}
                      download
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'शासन निर्णय डाउनलोड' : 'Download GR PDF'}</span>
                    </a>
                    {gr.externalUrl && (
                      <a
                        href={gr.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-bold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{language === 'mr' ? 'थेट पोर्टल लिंक' : 'Official Portal'}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 6: CIRCULARS (All 97 Circulars with Search & Pagination) */}
        {/* ================================================================= */}
        {activeTab === 'circulars' && (
          <div className="space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'वित्त व लेखा परिपत्रके' : 'Finance & Accounts Circulars'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'नियंत्रक कार्यालयाची अधिकृत परिपत्रके संग्रह' : 'Comptroller Directorate Official Circulars'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {language === 'mr'
                      ? `एकूण ${circulars.length} परिपत्रके — देयके, आर्थिक काटकसर, शिष्यवृत्ती, फिरता निधी व आयकर सवलत.`
                      : `Total ${circulars.length} circulars — bill guidelines, economy measures, scholarship grants, revolving fund & tax exemptions.`}
                  </p>
                </div>

                {/* Real-time Search Box */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder={language === 'mr' ? 'परिपत्रक शोधा...' : 'Search circulars...'}
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-medium focus:bg-white focus:outline-emerald-700 transition-all"
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
              </div>

              {/* Circulars Table */}
              <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-2xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-100 border-b border-stone-200 text-stone-700 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4 w-16 text-center">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'परिपत्रकाचा विषय / शीर्षक' : 'Circular Title / Subject'}</th>
                      <th className="py-3 px-4 w-32 text-center">{language === 'mr' ? 'दस्तऐवज' : 'Document'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {paginatedCirculars.length > 0 ? (
                      paginatedCirculars.map((c: any, idx: number) => (
                        <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-center text-stone-600">
                            {c.srNo}
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-900 leading-relaxed">
                            {getBilingual(c.title)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {c.fileUrl ? (
                              <a
                                href={c.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-800 text-emerald-800 hover:text-white border border-emerald-300 hover:border-emerald-800 text-[11px] font-bold transition-all shadow-2xs"
                              >
                                <Download className="w-3 h-3" />
                                <span>PDF</span>
                              </a>
                            ) : (
                              <span className="text-stone-400 text-[10px] italic">-</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-stone-500 font-medium">
                          {language === 'mr' ? 'कोणतेही परिपत्रक आढळले नाही.' : 'No circulars found matching your search.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-semibold text-stone-600">
                  <div>
                    {language === 'mr'
                      ? `एकूण ${filteredCirculars.length} पैकी पृष्ठ ${currentPage} / ${totalPages}`
                      : `Page ${currentPage} of ${totalPages} (Total ${filteredCirculars.length} circulars)`}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'मागे' : 'Prev'}</span>
                    </button>
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-xs"
                    >
                      <span>{language === 'mr' ? 'पुढे' : 'Next'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 7: BUDGET & FINANCIAL MANAGEMENT GRANTS (F.M.G.) */}
        {/* ================================================================= */}
        {activeTab === 'budget' && (
          <div className="space-y-8">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <PieChart className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'mr' ? 'अंदाजपत्रक व वित्तीय व्यवस्थापन अनुदान' : 'Budget Estimates & Financial Grants'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'वार्षिक अर्थसंकल्प व वित्तीय व्यवस्थापन अनुदान (F.M.G.) संग्रह' : 'University Annual Budget & F.M.G. Archive (2020 - 2027)'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  {language === 'mr'
                    ? 'महाराष्ट्र शासन व एमसीएईआर मान्य विद्यापीठाचे अधिकृत वार्षिक अर्थसंकल्प व वित्तीय व्यवस्थापन अनुदाने.'
                    : 'Official budgetary estimates and Financial Management Grant sanctions approved by GoM and MCAER.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgets.map((b: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 hover:border-emerald-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                          {b.period}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                          {b.type}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                        {getBilingual(b.title)}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-stone-500">
                        {language === 'mr' ? 'अधिकृत अहवाल' : 'Official PDF'}
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href={b.fileUrl}
                          download
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
                        >
                          <Download className="w-3 h-3" />
                          <span>{language === 'mr' ? 'डाउनलोड' : 'Download'}</span>
                        </a>
                        {b.externalUrl && (
                          <a
                            href={b.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-bold transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 8: CONTACT DIRECTORY (All 9 Key Financial Offices) */}
        {/* ================================================================= */}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              <div className="border-b border-stone-100 pb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'mr' ? 'थेट वित्तीय संपर्क कक्ष' : 'Direct Financial Secretariats'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'नियंत्रक, सहाय्यक नियंत्रक व अधिदान अधिकारी निर्देशिका' : 'Comptroller, Assistant Comptrollers & PAO Directory'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  {language === 'mr'
                    ? 'विद्यापीठाचे नियंत्रक कार्यालय, सहाय्यक नियंत्रक १ ते ४ व विभागीय अधिदान कार्यालयांचे थेट संपर्क.'
                    : 'Direct lines, official emails, and office locations across Rahuri, Pune, Kolhapur, and Dhule.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                {contacts.map((c: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                        {getBilingual(c.designation)}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 pt-1 font-serif">
                        {getBilingual(c.office)}
                      </h4>
                      <p className="text-xs text-stone-600 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{getBilingual(c.location)}</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200 space-y-1 text-xs font-semibold">
                      <div className="flex items-center gap-1.5 text-slate-900">
                        <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <a href={`tel:${c.phone.split(' ')[0]}`} className="hover:underline">{c.phone}</a>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-600 font-mono text-[11px]">
                        <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <a href={`mailto:${c.email}`} className="hover:underline truncate">{c.email}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Central Financial Directorate Address Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 to-stone-900 text-white space-y-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>{language === 'mr' ? 'अधिकृत टपाल पत्ता' : 'Postal & Physical Address'}</span>
              </div>
              <h4 className="text-lg font-bold font-serif">
                {language === 'mr'
                  ? 'महात्मा फुले कृषी विद्यापीठ नियंत्रक (वित्त व लेखा) संचालनालय'
                  : 'Mahatma Phule Krishi Vidyapeeth Comptroller (Finance & Accounts) Directorate'}
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
                {language === 'mr'
                  ? 'मध्यवर्ती प्रशासकीय इमारत, राहुरी - ४१३ ७२२, जिल्हा: अहमदनगर, महाराष्ट्र, भारत. दूरध्वनी: ०२४२६-२४३२२६. ईमेल: comptroller.mpkv@gov.in'
                  : 'Central Administrative Building, Rahuri - 413 722, District: Ahmednagar, Maharashtra, India. Phone: 02426-243226. Email: comptroller.mpkv@gov.in'}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
