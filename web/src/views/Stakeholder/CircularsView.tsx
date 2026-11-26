'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  X,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Home,
  Building2,
  DollarSign,
  Layers,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  Filter,
  Sparkles,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import fallbackCircularsData from '@/data/scraped/pages/circulars.json';

interface CircularsViewProps {
  pageData?: any;
}

export const CircularsView: React.FC<CircularsViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  const heroData = pageData?.hero || (fallbackCircularsData as any)?.hero || {};
  const stats = heroData?.stats || [];
  const sections = pageData?.sections || (fallbackCircularsData as any)?.sections || {};

  const allCirculars = sections.all || [];
  const adminCirculars = sections.administration || [];
  const financeCirculars = sections.finance || [];
  const ofmCirculars = sections.ofm || [];

  const categoryTabs = [
    { id: 'all', labelEn: `All Circulars (${allCirculars.length})`, labelMr: `सर्व परिपत्रके (${allCirculars.length})`, count: allCirculars.length, icon: Layers },
    { id: 'administration', labelEn: `Administration (${adminCirculars.length})`, labelMr: `प्रशासन (${adminCirculars.length})`, count: adminCirculars.length, icon: Building2 },
    { id: 'finance', labelEn: `Finance & Accounts (${financeCirculars.length})`, labelMr: `वित्त व लेखा (${financeCirculars.length})`, count: financeCirculars.length, icon: DollarSign },
    { id: 'ofm', labelEn: `Estate & General (${ofmCirculars.length})`, labelMr: `संपदा व सामान्य (${ofmCirculars.length})`, count: ofmCirculars.length, icon: Scale }
  ];

  const yearFilters = [
    { id: 'all', label: 'All Years' },
    { id: '2025', label: '2025' },
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
    { id: '2022', label: '2022' },
    { id: '2021', label: '2021' },
    { id: 'Archive', label: 'Archive' }
  ];

  // Base list by category
  const baseList = useMemo(() => {
    if (activeCategory === 'administration') return adminCirculars;
    if (activeCategory === 'finance') return financeCirculars;
    if (activeCategory === 'ofm') return ofmCirculars;
    return allCirculars;
  }, [activeCategory, adminCirculars, financeCirculars, ofmCirculars, allCirculars]);

  // Filtered by year & search query
  const filteredCirculars = useMemo(() => {
    return baseList.filter((item: any) => {
      // Year check
      if (selectedYear !== 'all') {
        if (selectedYear === 'Archive') {
          if (item.year === '2025' || item.year === '2024' || item.year === '2023' || item.year === '2022' || item.year === '2021') {
            return false;
          }
        } else if (item.year !== selectedYear) {
          return false;
        }
      }

      // Search query check
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const tEn = item.title?.en?.toLowerCase() || '';
      const tMr = item.title?.mr?.toLowerCase() || '';
      const sr = item.srNo?.toLowerCase() || '';
      return tEn.includes(q) || tMr.includes(q) || sr.includes(q);
    });
  }, [baseList, selectedYear, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredCirculars.length / pageSize) || 1;
  const paginatedCirculars = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCirculars.slice(start, start + pageSize);
  }, [filteredCirculars, currentPage, pageSize]);

  const handleCopyLink = (url: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
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
            {language === 'mr' ? 'विद्यापीठ परिपत्रके व अधिकृत अधिसूचना' : 'University Circulars & Notifications'}
          </span>
          {activeCategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-stone-500 font-medium truncate">
                {language === 'mr'
                  ? categoryTabs.find((t) => t.id === activeCategory)?.labelMr
                  : categoryTabs.find((t) => t.id === activeCategory)?.labelEn}
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
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'mr' ? 'अधिकृत परिपत्रक दालन' : 'Official Notices Repository'}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-serif leading-tight">
                {language === 'mr' ? 'विद्यापीठ अधिकृत परिपत्रके व सूचना संग्रह' : 'University Circulars & Notifications Archive'}
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed max-w-3xl">
                {language === 'mr'
                  ? 'महात्मा फुले कृषी विद्यापीठ, राहुरी यांनी जारी केलेली सर्व अधिकृत प्रशासकीय, वित्तीय, संपदा व सामान्य परिपत्रके यांचा अधिकृत मध्यवर्ती संग्रह.'
                  : 'Centralized statutory repository of official orders, financial directives, administrative instructions, and estate guidelines issued by Mahatma Phule Krishi Vidyapeeth, Rahuri.'}
              </p>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? '२०१ अधिकृत परिपत्रके' : '201 Total Circulars'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? '४२ प्रशासन परिपत्रके' : '42 Administration'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? '९७ वित्त व लेखा परिपत्रके' : '97 Finance & Accounts'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? '६२ संपदा व सामान्य परिपत्रके' : '62 Estate & General (OFM)'}</span>
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Main Navigation & Content Section */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16 space-y-6">

        {/* Category Tabs Strip (Guaranteed flex-wrap with inline styles to prevent clipping) */}
        <div className="w-full p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs overflow-visible">
          <div
            className="flex flex-wrap items-center gap-2 w-full"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
          >
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span className="whitespace-nowrap">{language === 'mr' ? tab.labelMr : tab.labelEn}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-800'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar: Search & Year Filter */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Real-time Search Box */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={language === 'mr' ? 'परिपत्रकाचा विषय, क्रमांक किंवा कीवर्ड शोधा...' : 'Search circular title, subject, or keyword...'}
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

            {/* Year Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-stone-500 font-bold pr-1">{language === 'mr' ? 'वर्ष:' : 'Year:'}</span>
              {yearFilters.map((y) => (
                <button
                  key={y.id}
                  type="button"
                  onClick={() => {
                    setSelectedYear(y.id);
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedYear === y.id
                      ? 'bg-emerald-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {y.label}
                </button>
              ))}
            </div>

            {/* Page Size Selector */}
            <div className="flex items-center gap-2 text-xs font-bold text-stone-600 shrink-0">
              <span>{language === 'mr' ? 'प्रति पृष्ठ:' : 'Show:'}</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 rounded-lg bg-stone-50 border border-stone-200 text-xs font-bold focus:outline-emerald-700"
              >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results Counter Strip */}
        <div className="flex items-center justify-between text-xs font-bold text-stone-600 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>
              {language === 'mr'
                ? `एकूण ${filteredCirculars.length} परिपत्रके आढळली`
                : `Showing ${filteredCirculars.length} circulars`}
            </span>
          </div>
          {totalPages > 1 && (
            <span>
              {language === 'mr'
                ? `पृष्ठ ${currentPage} / ${totalPages}`
                : `Page ${currentPage} of ${totalPages}`}
            </span>
          )}
        </div>

        {/* Interactive Circulars Table */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-100/90 border-b border-stone-200 text-stone-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 w-16 text-center">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                  <th className="py-3.5 px-4 w-32">{language === 'mr' ? 'विभाग' : 'Department'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'परिपत्रकाचा विषय / शीर्षक' : 'Circular Title / Notification Subject'}</th>
                  <th className="py-3.5 px-4 w-20 text-center">{language === 'mr' ? 'वर्ष' : 'Year'}</th>
                  <th className="py-3.5 px-4 w-36 text-center">{language === 'mr' ? 'दस्तऐवज कृती' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {paginatedCirculars.length > 0 ? (
                  paginatedCirculars.map((item: any, idx: number) => {
                    const isCopied = copiedId === item.id;
                    return (
                      <tr key={item.id || idx} className="hover:bg-emerald-50/40 transition-colors">
                        
                        {/* Sr. No */}
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-stone-500">
                          {(currentPage - 1) * pageSize + idx + 1}
                        </td>

                        {/* Category Badge */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border whitespace-nowrap ${item.badgeColor}`}>
                            {getBilingual(item.categoryLabel)}
                          </span>
                        </td>

                        {/* Title */}
                        <td className="py-3.5 px-4 font-medium text-slate-900 leading-relaxed max-w-2xl">
                          <div className="line-clamp-2 hover:line-clamp-none transition-all">
                            {getBilingual(item.title)}
                          </div>
                        </td>

                        {/* Year */}
                        <td className="py-3.5 px-4 text-center font-mono text-stone-600 font-bold text-[11px]">
                          {item.year !== 'Archive' ? item.year : '-'}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {item.fileUrl ? (
                              <>
                                <a
                                  href={item.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-800 text-emerald-800 hover:text-white border border-emerald-300 hover:border-emerald-800 text-[11px] font-bold transition-all shadow-2xs"
                                  title={language === 'mr' ? 'PDF उघडा / डाउनलोड करा' : 'Open / Download PDF'}
                                >
                                  <Download className="w-3 h-3" />
                                  <span>PDF</span>
                                </a>

                                <button
                                  type="button"
                                  onClick={() => handleCopyLink(item.fileUrl, item.id)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                                  title={isCopied ? 'Copied!' : 'Copy PDF Link'}
                                >
                                  {isCopied ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </>
                            ) : (
                              <span className="text-stone-400 text-[10px] italic">-</span>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-stone-500 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                        <Search className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        {language === 'mr' ? 'कोणतेही परिपत्रक आढळले नाही.' : 'No circulars found matching your criteria.'}
                      </div>
                      <p className="text-xs text-stone-500 max-w-sm mx-auto">
                        {language === 'mr' ? 'कृपया वेगळा कीवर्ड किंवा सर्व वर्षे निवडून पुन्हा प्रयत्न करा.' : 'Please try searching with different keywords or reset your filters.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedYear('all');
                          setActiveCategory('all');
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                      >
                        {language === 'mr' ? 'सर्व फिल्टर्स रीसेट करा' : 'Reset All Filters'}
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 bg-stone-50/80 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold text-stone-600">
              <div>
                {language === 'mr'
                  ? `एकूण ${filteredCirculars.length} पैकी पृष्ठ ${currentPage} / ${totalPages}`
                  : `Showing ${(currentPage - 1) * pageSize + 1} to ${Math.min(currentPage * pageSize, filteredCirculars.length)} of ${filteredCirculars.length} circulars`}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                  className="px-2.5 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold"
                  title="First Page"
                >
                  «
                </button>
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-xs font-bold"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'मागे' : 'Prev'}</span>
                </button>
                <span className="px-3 py-1 font-mono font-bold text-slate-900 bg-stone-200/80 rounded-lg">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="px-3 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-xs font-bold"
                >
                  <span>{language === 'mr' ? 'पुढे' : 'Next'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className="px-2.5 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold"
                  title="Last Page"
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Official Statutory Notice Footer Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 to-stone-900 text-white space-y-3">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'mr' ? 'वैधानिक परिपत्रक पडताळणी' : 'Statutory Circular Authenticity'}</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold font-serif">
            {language === 'mr'
              ? 'परिपत्रकांचे अधिकृत स्वरूप व विद्यापीठ आदेश'
              : 'Legal Authenticity of University Directives & Circulars'}
          </h4>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal max-w-3xl">
            {language === 'mr'
              ? 'येथे प्रसिद्ध करण्यात आलेली सर्व परिपत्रके विद्यापीठाचे कुलसचिव, नियंत्रक व संबंधित संचलनालयांमार्फत विहित नियमांनुसार जारी करण्यात आलेली आहेत. कोणत्याही कायदेशीर संदर्भासाठी विद्यापीठाच्या मूळ सही-शिक्क्यासह असलेल्या प्रती अंतिम मानल्या जातील.'
              : 'All circulars published on this portal are authorized notifications issued by the Office of the Registrar, Comptroller, and Central Directorates under Maharashtra Agricultural Universities Statutes. For legal citations, certified hard copies bear statutory authority.'}
          </p>
        </div>

      </div>
    </div>
  );
};
