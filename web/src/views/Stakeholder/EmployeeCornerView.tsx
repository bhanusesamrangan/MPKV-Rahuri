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
  Home,
  Building2,
  Layers,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  Filter,
  ShieldCheck,
  PiggyBank,
  FileSpreadsheet,
  HeartHandshake,
  Award,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  Clock,
  Sparkles,
  Users,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import fallbackEmployeeData from '@/data/scraped/pages/employee-corner.json';

interface EmployeeCornerViewProps {
  pageData?: any;
}

export const EmployeeCornerView: React.FC<EmployeeCornerViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Safe data resolution with resilient fallback
  const heroData = pageData?.hero || (fallbackEmployeeData as any)?.hero || {};
  const stats = heroData?.stats || [];
  const formsList = pageData?.forms || (fallbackEmployeeData as any)?.forms || [];
  const seniorityList = pageData?.seniorityHighlights || (fallbackEmployeeData as any)?.seniorityHighlights || [];
  const helpdeskContacts = pageData?.helpdeskContacts || (fallbackEmployeeData as any)?.helpdeskContacts || [];
  const faqs = pageData?.faqs || (fallbackEmployeeData as any)?.faqs || [];

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  const categoryTabs = [
    {
      id: 'all',
      labelEn: `All Services (${formsList.length})`,
      labelMr: `सर्व सेवा व अर्ज (${formsList.length})`,
      icon: Layers
    },
    {
      id: 'pension',
      labelEn: 'Pension & Retirement',
      labelMr: 'निवृत्तीवेतन व उपदान',
      icon: ShieldCheck
    },
    {
      id: 'provident_fund',
      labelEn: 'Provident Fund (GPF/NPS)',
      labelMr: 'भविष्य निर्वाह निधी (GPF/NPS)',
      icon: PiggyBank
    },
    {
      id: 'service_appraisal',
      labelEn: 'Service Book & APAR',
      labelMr: 'सेवा तपशील व गोपनीय अहवाल',
      icon: FileSpreadsheet
    },
    {
      id: 'tax_medical',
      labelEn: 'Tax & Medical Welfare',
      labelMr: 'प्राप्तिकर व वैद्यकीय प्रतिपूर्ती',
      icon: HeartHandshake
    },
    {
      id: 'seniority',
      labelEn: `Seniority Lists (${seniorityList.length})`,
      labelMr: `सेवा ज्येष्ठता सूची (${seniorityList.length})`,
      icon: Award
    },
    {
      id: 'rules',
      labelEn: 'Rules & Quarters',
      labelMr: 'सेवा नियम व निवासस्थाने',
      icon: Building2
    }
  ];

  // Filter forms based on category and search query
  const filteredForms = useMemo(() => {
    return formsList.filter((item: any) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const titleEn = (item.title?.en || '').toLowerCase();
        const titleMr = (item.title?.mr || '').toLowerCase();
        const descEn = (item.description?.en || '').toLowerCase();
        const descMr = (item.description?.mr || '').toLowerCase();
        const formNum = (item.formNumber || '').toLowerCase();
        const tag = (item.tag || '').toLowerCase();
        const auth = (item.authority || '').toLowerCase();

        return (
          titleEn.includes(query) ||
          titleMr.includes(query) ||
          descEn.includes(query) ||
          descMr.includes(query) ||
          formNum.includes(query) ||
          tag.includes(query) ||
          auth.includes(query)
        );
      }
      return true;
    });
  }, [formsList, activeCategory, searchQuery]);

  const handleCopyLink = (id: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-800 flex flex-col font-sans">
      
      {/* 1. Breadcrumb Bar: Standard Format */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px] transition-colors">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600 font-medium">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#0b5c3a] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
          <Link
            href="/administration"
            className="hover:text-[#0b5c3a] transition-colors"
          >
            {language === 'mr' ? 'प्रशासन' : 'Administration'}
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="text-emerald-900 font-bold">
            {language === 'mr' ? 'कर्मचारी दालन व सेवानिवृत्ती मंच' : 'Employee Corner'}
          </span>
        </div>
      </div>

      {/* 2. Hero Header: Executive Emerald & Regal Gold */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2a1c] via-[#123624] to-[#071a10] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-700/50">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-amber-300 text-xs font-bold tracking-wide uppercase shadow-inner">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>{getBilingual(heroData?.badge) || (language === 'mr' ? 'अधिकृत विद्यापीठ कर्मचारी दालन' : 'Official University Staff Portal')}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-serif leading-tight">
                {getBilingual(heroData?.title) || (language === 'mr' ? 'विद्यापीठ कर्मचारी दालन व सेवानिवृत्ती मंच' : 'Employee Corner & Staff Services Portal')}
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed max-w-3xl">
                {getBilingual(heroData?.subtitle) || (language === 'mr'
                  ? 'महात्मा फुले कृषी विद्यापीठ, राहुरी मधील सर्व शिक्षक, प्रशासकीय, तांत्रिक व सहायक कर्मचाऱ्यांसाठी मध्यवर्ती डिजिटल दालन.'
                  : 'Single-window digital gateway for academic, administrative, technical, and supporting personnel of MPKV Rahuri.')}
              </p>
            </div>

            {/* Quick Stat Badges */}
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

      {/* 3. Main Navigation & Interactive Content */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16 space-y-6">

        {/* Category Tabs Strip: Guaranteed Anti-Clipping Flex Wrap */}
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
                  onClick={() => {
                    setActiveCategory(tab.id);
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

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Real-time Search Box */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={
                  language === 'mr'
                    ? 'अर्ज, नमुना क्रमांक किंवा विषय शोधा...'
                    : 'Search form, number, subject or rule...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs rounded-xl bg-stone-50 border border-stone-300/80 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Matching Count & Quick Actions */}
            <div className="flex items-center gap-3 text-xs text-stone-600">
              <span className="font-medium">
                {language === 'mr' ? 'एकूण उपलब्ध सेवा/नमुने:' : 'Available Forms:'}{' '}
                <strong className="text-emerald-900 font-bold">{filteredForms.length}</strong>
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="text-emerald-700 hover:underline font-semibold"
                >
                  {language === 'mr' ? 'सर्व फिल्टर्स रीसेट करा' : 'Reset all filters'}
                </button>
              )}
            </div>

          </div>
        </div>

        {/* 4. Display Content: Forms Grid or Seniority Lists */}
        {activeCategory === 'seniority' ? (
          /* Seniority Lists Panel */
          <div className="space-y-4">
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span>{language === 'mr' ? 'अंतिम सेवा ज्येष्ठता सूची (संवर्गनिहाय)' : 'Cadre-wise Final Seniority Lists'}</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {language === 'mr'
                      ? 'कुलसचिव आस्थापना विभागामार्फत प्रसिद्ध करण्यात आलेल्या ४३३ संवर्गातील प्रमुख ज्येष्ठता याद्या.'
                      : 'Published by Registrar Establishment Wing across 433 cadres with cutoff as of 01.01.2026.'}
                  </p>
                </div>
                <Link
                  href="/administration"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition"
                >
                  <span>{language === 'mr' ? 'सर्व ४३३ संवर्ग याद्या पहा' : 'View Full 433 Seniority Lists'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {seniorityList.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-stone-50 hover:bg-emerald-50/50 border border-stone-200/80 transition flex items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-stone-800 group-hover:text-emerald-900 transition leading-snug">
                        {language === 'mr' ? item.cadreMr : item.cadreEn}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        <span>{language === 'mr' ? `दिनांक: ${item.date}` : `As on: ${item.date}`}</span>
                      </div>
                    </div>
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-emerald-800 text-xs font-bold hover:bg-emerald-900 hover:text-white transition flex items-center gap-1.5 shrink-0 shadow-2xs"
                    >
                      <Download className="w-3 h-3" />
                      <span>{language === 'mr' ? 'PDF पहा' : 'View PDF'}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Forms & Applications Cards Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredForms.map((form: any) => {
              const isCopied = copiedId === form.id;
              return (
                <div
                  key={form.id}
                  className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    
                    {/* Header: Form Number & Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/80 font-bold tracking-tight">
                        {form.formNumber}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 font-semibold text-[11px]">
                        {form.tag}
                      </span>
                    </div>

                    {/* Form Title */}
                    <h3 className="text-sm font-extrabold text-stone-900 group-hover:text-emerald-900 transition leading-snug font-serif">
                      {getBilingual(form.title)}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {getBilingual(form.description)}
                    </p>

                    {/* Authority */}
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 pt-1">
                      <Building2 className="w-3 h-3 text-stone-400 shrink-0" />
                      <span>{form.authority}</span>
                    </div>

                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    
                    {/* Copy Link / Details */}
                    <button
                      type="button"
                      onClick={() => handleCopyLink(form.id, `${getBilingual(form.title)} - ${form.formNumber}`)}
                      className="inline-flex items-center gap-1 text-stone-500 hover:text-emerald-800 transition text-[11px] font-medium"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">{language === 'mr' ? 'कॉपी झाले!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{language === 'mr' ? 'तपशील कॉपी करा' : 'Copy info'}</span>
                        </>
                      )}
                    </button>

                    {/* Download / Open Form Buttons */}
                    <div className="flex items-center gap-2">
                      {form.fileUrl && (
                        <a
                          href={form.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900 text-white font-bold hover:bg-emerald-950 transition shadow-2xs"
                        >
                          <Download className="w-3 h-3 text-amber-300" />
                          <span>{language === 'mr' ? 'नमुना डाउनलोड (PDF)' : 'Download Form'}</span>
                        </a>
                      )}
                      {form.officialUrl && !form.fileUrl.startsWith('http') && (
                        <a
                          href={form.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition"
                          title="View on original MPKV Portal"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* 5. Staff Welfare, Pension Cell & Helpdesk Contacts */}
        <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white shadow-xl border border-stone-700 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-bold uppercase tracking-wide">
              <Phone className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'थेट संपर्क व पेन्शन सहाय्यता कक्ष' : 'Staff Welfare & Pension Helpdesks'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-serif">
              {language === 'mr'
                ? 'कर्मचारी संपर्क व निवृत्तीवेतन निवारण कक्ष'
                : 'Employee Assistance & Pension Settlement Helplines'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              {language === 'mr'
                ? 'कर्मचारी सेवा, भविष्य निर्वाह निधी, अंशराशीकरण व वैद्यकीय प्रतिपूर्तीकरिता संबंधित विभागांशी थेट संपर्क साधा.'
                : 'Direct official contacts for pension settlements, GPF reconciliation, medical claims, and establishment queries.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpdeskContacts.map((contact: any, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-300 font-serif">
                    {language === 'mr' ? contact.sectionMr : contact.sectionEn}
                  </h4>
                  <p className="text-xs font-semibold text-stone-200">
                    {language === 'mr' ? contact.officerMr : contact.officerEn}
                  </p>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed">
                  {language === 'mr' ? contact.responsibilitiesMr : contact.responsibilitiesEn}
                </p>

                <div className="pt-2 border-t border-stone-700/60 flex flex-wrap items-center gap-3 text-xs text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{contact.phone}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <a href={`mailto:${contact.email}`} className="hover:underline text-emerald-300">
                      {contact.email}
                    </a>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Frequently Asked Questions (FAQs) */}
        <div className="p-5 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-700" />
              <span>{language === 'mr' ? 'कर्मचाऱ्यांसाठी वारंवार विचारले जाणारे प्रश्न (FAQs)' : 'Frequently Asked Questions (Staff FAQs)'}</span>
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'mr'
                ? 'निवृत्तीवेतन, हयातीचा दाखला, भविष्य निर्वाह निधी व गोपनीय अहवाल याबाबत महत्त्वाची माहिती.'
                : 'Key regulatory guidelines regarding life certificates, commutation, GPF settlement, and APAR deadlines.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq: any, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2"
              >
                <h4 className="text-xs font-bold text-emerald-950 font-serif leading-snug">
                  {language === 'mr' ? faq.qMr : faq.qEn}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {language === 'mr' ? faq.aMr : faq.aEn}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
