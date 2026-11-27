'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Scale,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  Home,
  ShieldCheck,
  Building2,
  BookOpen,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  Info,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ActStatuteDoc {
  srNo: string;
  title: { en: string; mr: string };
  gazetteRef: string;
  fileUrl: string;
  externalUrl: string;
  fileSize: string;
  year: string;
  scope: { en: string; mr: string };
}

interface ActStatuteViewProps {
  pageData?: any;
}

export const ActStatuteView: React.FC<ActStatuteViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'act' | 'statute' | 'governance'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  // 4 Principal Acts & Amendments
  const actDocuments: ActStatuteDoc[] = pageData?.actDocuments || [
    {
      srNo: '1',
      title: {
        en: 'MAU Act 1983 (Incorporating Amendments upto 2012)',
        mr: 'महाराष्ट्र कृषी विद्यापीठे कायदा १९८३ (२०१२ पर्यंतच्या सुधारणांसह)'
      },
      gazetteRef: 'Maharashtra Act No. XLI of 1983',
      fileUrl: '/media/docs/act-statute/MAU_Act_1983_upto_2012.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/MAU%20Act%201983%20upto%202012.pdf',
      fileSize: '487 KB',
      year: '1983 - 2012',
      scope: {
        en: 'Principal statutory enactment establishing SAUs, jurisdiction across 10 Western Maharashtra districts, university officers, powers of Chancellor and Vice-Chancellor.',
        mr: 'कृषी विद्यापीठांची स्थापना, १० जिल्ह्यांचे अधिकार क्षेत्र, कुलगुरू व कुलपती अधिकार आणि विद्यापीठ प्राधिकरणांची वैधानिक रचना.'
      }
    },
    {
      srNo: '2',
      title: {
        en: 'MAU Act 1983 — Amendment 2010-2011',
        mr: 'महाराष्ट्र कृषी विद्यापीठे कायदा १९८३ — सुधारणा २०१०-२०११'
      },
      gazetteRef: 'Maharashtra Act No. IX of 2012',
      fileUrl: '/media/docs/act-statute/MAU_Act_1983_Amendment_2010_2011.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/act2.pdf',
      fileSize: '20.9 MB',
      year: '2010 - 2011',
      scope: {
        en: 'Reconstitution of Executive Council, Academic Council, reservation norms, and institutional governance restructuring.',
        mr: 'कार्यकारी परिषद व विद्या परिषद फेररचना, आरक्षण तरतुदी व प्रशासकीय सुधारणा.'
      }
    },
    {
      srNo: '3',
      title: {
        en: 'MAU Act 1983 — Amendment 2013',
        mr: 'महाराष्ट्र कृषी विद्यापीठे कायदा १९८३ — सुधारणा २०१३'
      },
      gazetteRef: 'Maharashtra Act No. XIX of 2013',
      fileUrl: '/media/docs/act-statute/MAU_Act_1983_Amendment_2013.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/act3.PDF',
      fileSize: '147 KB',
      year: '2013',
      scope: {
        en: 'Amendments concerning selection committee compositions and representation of agricultural stakeholders and farmers.',
        mr: 'निवड समिती रचना आणि कृषी भागधारक व शेतकऱ्यांच्या प्रतिनिधित्वासंदर्भातील सुधारणा.'
      }
    },
    {
      srNo: '4',
      title: {
        en: 'MAU Act 1983 — Amendment 2015',
        mr: 'महाराष्ट्र कृषी विद्यापीठे कायदा १९८३ — सुधारणा २०१५'
      },
      gazetteRef: 'Maharashtra Act No. XLV of 2015',
      fileUrl: '/media/docs/act-statute/MAU_Act_1983_Amendment_2015.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/act4.pdf',
      fileSize: '259 KB',
      year: '2015',
      scope: {
        en: 'Statutory updates regarding Vice-Chancellor appointment criteria, ICAR norms harmonization, and statutory officer term tenures.',
        mr: 'कुलगुरू निवड निकष, भारतीय कृषी संशोधन परिषद (ICAR) मार्गदर्शक तत्त्वे व वैधानिक अधिकारी पदधारण कार्यकाळ.'
      }
    }
  ];

  // 5 University Statutes & Amendments
  const statuteDocuments: ActStatuteDoc[] = pageData?.statuteDocuments || [
    {
      srNo: '1',
      title: {
        en: 'Maharashtra Agricultural Universities Statutes, 1990 (Principal Statutes)',
        mr: 'महाराष्ट्र कृषी विद्यापीठे परिनियम १९९० (मूळ परिनियम)'
      },
      gazetteRef: 'Framed under Section 75, MAU Act 1983',
      fileUrl: '/media/docs/act-statute/MAU_Statute_1990.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/stat1.pdf',
      fileSize: '452 KB',
      year: '1990',
      scope: {
        en: 'Comprehensive subordinate legislation governing university administration, teacher recruitment, duties, leave, and discipline.',
        mr: 'विद्यापीठ प्रशासन, प्राध्यापक व कर्मचारी भरती, कर्तव्ये, रजा व शिस्तपालन विषयक मूळ नियमावली.'
      }
    },
    {
      srNo: '2',
      title: {
        en: 'MAU Statute — First Amendment 2014',
        mr: 'महाराष्ट्र कृषी विद्यापीठे परिनियम — पहिली सुधारणा २०१४'
      },
      gazetteRef: 'Govt. Gazette Notification 2014',
      fileUrl: '/media/docs/act-statute/MAU_Statute_First_Amendment_2014.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/stat2.pdf',
      fileSize: '1.9 MB',
      year: '2014',
      scope: {
        en: 'Revisions to teaching cadre qualifications, Career Advancement Scheme (CAS) criteria, and academic workload.',
        mr: 'शैक्षणिक संवर्ग शैक्षणिक अर्हता, करिअर ॲडव्हान्समेंट योजना (CAS) व कार्यभार सुधारणा.'
      }
    },
    {
      srNo: '3',
      title: {
        en: 'MAU Statute — Second Amendment 2014',
        mr: 'महाराष्ट्र कृषी विद्यापीठे परिनियम — दुसरी सुधारणा २०१४'
      },
      gazetteRef: 'Govt. Gazette Notification 2014',
      fileUrl: '/media/docs/act-statute/MAU_Statute_Second_Amendment_2014.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/stat3.pdf',
      fileSize: '117 KB',
      year: '2014',
      scope: {
        en: 'Administrative staff service condition amendments, promotional channels, and clerical cadre structures.',
        mr: 'शिक्षकेतर कर्मचारी सेवा शर्ती, पदोन्नती साखळी व प्रशासकीय संवर्ग पुनर्रचना.'
      }
    },
    {
      srNo: '4',
      title: {
        en: 'MAU Statute — Third Amendment 2023',
        mr: 'महाराष्ट्र कृषी विद्यापीठे परिनियम — तिसरी सुधारणा २०२३'
      },
      gazetteRef: 'Govt. Gazette Notification 2023',
      fileUrl: '/media/docs/act-statute/MAU_Statute_Third_Amendment_2023.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/stat4.pdf',
      fileSize: '9.5 MB',
      year: '2023',
      scope: {
        en: '7th Pay Commission service condition integration, modern academic designations, and research scientist promotion guidelines.',
        mr: 'सातवा वेतन आयोग सेवाशर्ती समावेशन, पदनामे व कृषी शास्त्रज्ञ पदोन्नती मार्गदर्शक तत्त्वे.'
      }
    },
    {
      srNo: '5',
      title: {
        en: 'MAU Statute — 73rd Amendment 2024',
        mr: 'महाराष्ट्र कृषी विद्यापीठे परिनियम — ७३ वी सुधारणा २०२४'
      },
      gazetteRef: 'Maharashtra Govt. Gazette 2024',
      fileUrl: '/media/docs/act-statute/MAU_Statute_73_Amendment_2024.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/stat5.pdf',
      fileSize: '869 KB',
      year: '2024',
      scope: {
        en: 'Latest statutory regulations governing elections to university bodies, teacher designations, and administrative governance.',
        mr: 'विद्यापीठ प्राधिकरणांच्या निवडणुका, प्राध्यापक पदोन्नती व नवीनतम वैधानिक नियमावली.'
      }
    }
  ];

  // Combined documents list
  const allDocs = useMemo(() => {
    return [
      ...actDocuments.map((d) => ({ ...d, category: 'act' as const })),
      ...statuteDocuments.map((d) => ({ ...d, category: 'statute' as const }))
    ];
  }, [actDocuments, statuteDocuments]);

  // Filtered documents
  const filteredDocs = useMemo(() => {
    let list = allDocs;
    if (activeTab === 'act') {
      list = allDocs.filter((d) => d.category === 'act');
    } else if (activeTab === 'statute') {
      list = allDocs.filter((d) => d.category === 'statute');
    }

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter((d) => {
      const tEn = d.title.en.toLowerCase();
      const tMr = d.title.mr.toLowerCase();
      const g = d.gazetteRef.toLowerCase();
      const sEn = d.scope.en.toLowerCase();
      const sMr = d.scope.mr.toLowerCase();
      const y = d.year.toLowerCase();
      return (
        tEn.includes(q) ||
        tMr.includes(q) ||
        g.includes(q) ||
        sEn.includes(q) ||
        sMr.includes(q) ||
        y.includes(q)
      );
    });
  }, [allDocs, activeTab, searchQuery]);

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
            {language === 'mr' ? 'प्रशासन व वैधानिक रचना' : 'Governance'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md">
            {language === 'mr' ? 'कायदा व परिनियम' : 'Act & Statute'}
          </span>
        </div>
      </div>

      {/* 2. Hero Header: Executive Forest Emerald & Regal Amber */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2417] via-[#103322] to-[#07170f] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-800/40">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-5xl">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'mr' ? 'महाराष्ट्र शासन वैधानिक अधिनियम' : 'Maharashtra State Statutory Legislation'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight font-serif">
              {language === 'mr'
                ? 'महाराष्ट्र कृषी विद्यापीठे कायदा १९८३ व परिनियम १९९०'
                : 'Maharashtra Agricultural Universities Act, 1983 & Statutes, 1990'}
            </h1>

            <p className="text-emerald-100/90 text-xs sm:text-sm lg:text-base leading-relaxed font-normal max-w-3xl">
              {language === 'mr'
                ? 'महाराष्ट्र विधानमंडळाने पारित केलेला मूळ वैधानिक कायदा व परिनियम ज्याद्वारे महात्मा फुले कृषी विद्यापीठ, राहुरी व राज्यातील कृषी विद्यापीठांचे कुलगुरू, कुलपती, कार्यकारी परिषद, विद्या परिषद व प्रशासकीय संचलन केले जाते.'
                : 'The foundational statutory charter enacted by the Maharashtra State Legislature establishing and governing Mahatma Phule Krishi Vidyapeeth, Rahuri and State Agricultural Universities of Maharashtra.'}
            </p>

            {/* Quick Highlights Ribbon */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {[
                { label: 'Maharashtra Act No. XLI of 1983', icon: BookOpen },
                { label: language === 'mr' ? 'कलम ७५ अंतर्गत परिनियम १९९०' : 'Section 75 Subordinate Statutes 1990', icon: Scale },
                { label: language === 'mr' ? 'नवीनतम ७३ वी सुधारणा (२०२४)' : 'Latest 73rd Amendment (2024)', icon: Award },
                { label: language === 'mr' ? '१० जिल्ह्यांचे अधिकार क्षेत्र' : '10 Districts Jurisdiction', icon: Building2 }
              ].map((pill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-[11px] text-emerald-100 font-medium"
                >
                  <pill.icon className="w-3 h-3 text-amber-300" />
                  <span>{pill.label}</span>
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* 3. Main Navigation & Content Section */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16 space-y-8">
        
        {/* Navigation Tabs Bar & Live Search */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-4">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Filter Tabs (Wrap layout so all tabs remain 100% visible) */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { key: 'all', labelEn: 'All Statutory Documents', labelMr: 'सर्व वैधानिक दस्तऐवज', count: allDocs.length, icon: Layers },
                { key: 'act', labelEn: 'The Principal Act & Amendments', labelMr: 'कायदा व दुरुस्त्या', count: actDocuments.length, icon: Scale },
                { key: 'statute', labelEn: 'Statutes & Amendments', labelMr: 'परिनियम व सुधारणा', count: statuteDocuments.length, icon: BookOpen },
                { key: 'governance', labelEn: 'Statutory Governance Framework', labelMr: 'वैधानिक अधिकार रचना', count: null, icon: Building2 }
              ].map((tab) => {
                const isActive = activeTab === tab.key;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
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

            {/* Live Search */}
            {activeTab !== 'governance' && (
              <div className="relative w-full sm:w-80 shrink-0">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'mr' ? 'कायदा, वर्ष किंवा कलम शोधा...' : 'Search acts, amendments, year...'}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                />
              </div>
            )}

          </div>

        </div>

        {/* ================================================================= */}
        {/* VIEW 1: ACT & STATUTE DOCUMENTS CARDS GRID                        */}
        {/* ================================================================= */}
        {activeTab !== 'governance' && (
          <div className="space-y-6">
            
            {/* Section Summary Counter */}
            <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
              <span>
                {language === 'mr'
                  ? `एकूण ${filteredDocs.length} अधिकृत वैधानिक दस्तऐवज उपलब्ध`
                  : `Showing ${filteredDocs.length} official statutory documents & gazettes`}
              </span>
              <span className="text-[11px] font-bold text-emerald-800">
                {language === 'mr' ? 'सर्व दस्तऐवज पीडीएफ स्वरूपात उपलब्ध' : 'All official PDFs verified & accessible'}
              </span>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDocs.map((doc, idx) => {
                const isAct = doc.category === 'act';
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-3">
                      
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            isAct
                              ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                              : 'bg-blue-100 text-blue-950 border-blue-300'
                          }`}
                        >
                          {isAct
                            ? (language === 'mr' ? 'मूळ कायदा' : 'Principal Act')
                            : (language === 'mr' ? 'परिनियम' : 'Statute')}
                        </span>

                        <span className="text-xs font-mono font-bold text-stone-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{doc.year}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug group-hover:text-emerald-900 transition-colors">
                          {getBilingual(doc.title)}
                        </h4>
                        <div className="text-[11px] font-mono text-emerald-800 font-semibold mt-1">
                          {doc.gazetteRef}
                        </div>
                      </div>

                      {/* Scope Description */}
                      <p className="text-xs text-stone-600 leading-relaxed font-normal">
                        {getBilingual(doc.scope)}
                      </p>

                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-stone-500 font-medium">
                        {doc.fileSize}
                      </span>

                      <div className="flex items-center gap-2">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5 text-amber-300" />
                          <span>{language === 'mr' ? 'दस्तऐवज पहा' : 'View PDF'}</span>
                        </a>

                        <a
                          href={doc.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                          title="Original Portal PDF Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 2: STATUTORY GOVERNANCE FRAMEWORK TAB                        */}
        {/* ================================================================= */}
        {activeTab === 'governance' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? 'वैधानिक संचलन चौकट' : 'Statutory Charter & Architecture'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                {language === 'mr'
                  ? 'महाराष्ट्र कृषी विद्यापीठे कायदा १९८३ मधील प्रमुख कलमे व तरतुदी'
                  : 'Key Governance Chapters of Maharashtra Agricultural Universities Act, 1983'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-4xl leading-relaxed">
                {language === 'mr'
                  ? 'महाराष्ट्र कायदा क्र. ४१ (१९८३) अंतर्गत राज्यातील कृषी विद्यापीठांचे कार्य, अधिकारी, अधिकार, वित्त आणि नियम ठरवण्यात आले आहेत.'
                  : 'Maharashtra Act No. XLI of 1983 provides the statutory foundation defining university jurisdiction, authorities, powers of Chancellor and Vice-Chancellor, and execution of academic, research, and farm extension education.'}
              </p>
            </div>

            {/* Key Governance Chapters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  chapter: 'Chapter I & II',
                  title: { en: 'University & Jurisdiction', mr: 'विद्यापीठ व अधिकार क्षेत्र' },
                  desc: {
                    en: 'Defines university territorial jurisdiction across 10 districts of Western Maharashtra and powers for agricultural advancement.',
                    mr: 'पश्चिम महाराष्ट्रातील १० जिल्ह्यांचे भौगोलिक कार्यक्षेत्र आणि कृषी शिक्षणाच्या प्रसाराचे अधिकार.'
                  },
                  tag: 'Section 3-10'
                },
                {
                  chapter: 'Chapter III',
                  title: { en: 'Officers of the University', mr: 'विद्यापीठाचे वैधानिक अधिकारी' },
                  desc: {
                    en: 'Chancellor (Hon. Governor), Pro-Chancellor (Minister of Agriculture), Vice-Chancellor (Executive Head), Registrar, Comptroller & Deans.',
                    mr: 'कुलपती (मा. राज्यपाल), कुलपती-उपाध्यक्ष (कृषी मंत्री), कुलगुरू (मुख्य कार्यकारी अधिकारी), कुलसचिव व नियंत्रक.'
                  },
                  tag: 'Section 11-23'
                },
                {
                  chapter: 'Chapter IV',
                  title: { en: 'Authorities of the University', mr: 'विद्यापीठाची वैधानिक प्राधिकरणे' },
                  desc: {
                    en: 'Executive Council (supreme governing body), Academic Council (academic policy), Faculties, and Boards of Studies.',
                    mr: 'कार्यकारी परिषद (सर्वोच्च नियामक मंडळ), विद्या परिषद (शैक्षणिक धोरण), विद्याशाखा व अभ्यास मंडळे.'
                  },
                  tag: 'Section 24-34'
                },
                {
                  chapter: 'Chapter V',
                  title: { en: 'Statutes, Ordinances & Regulations', mr: 'परिनियम, अध्यादेश व विनीयम' },
                  desc: {
                    en: 'Section 75 powers to frame subordinate statutes for service conditions, teacher recruitment, student admissions, and examinations.',
                    mr: 'कलम ७५ अन्वये परिनियम तयार करण्याचे अधिकार, प्राध्यापक भरती, सेवा शर्ती, विद्यार्थी प्रवेश व परीक्षा नियम.'
                  },
                  tag: 'Section 35-42'
                },
                {
                  chapter: 'Chapter VI',
                  title: { en: 'Affiliation & Colleges', mr: 'संलग्नता व महाविद्यालये' },
                  desc: {
                    en: 'Statutory provisions for constituent colleges, grant-in-aid affiliated agriculture colleges, and inspection norms.',
                    mr: 'घटक महाविद्यालये, अनुदानित संलग्न कृषी महाविद्यालये आणि नियतकालिक तपासणी निकष.'
                  },
                  tag: 'Section 43-49'
                },
                {
                  chapter: 'Chapter VII & VIII',
                  title: { en: 'University Funds & Audits', mr: 'विद्यापीठ निधी, हिशेब व लेखापरीक्षण' },
                  desc: {
                    en: 'Annual budget formulation, State Government grants, financial audits by Local Fund Audit and Accountant General (AG).',
                    mr: 'वार्षिक अंदाजपत्रक, राज्य शासन अनुदान आणि स्थानिक निधी व महालेखापाल (AG) लेखापरीक्षण तरतुदी.'
                  },
                  tag: 'Section 50-60'
                }
              ].map((c, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-800 px-2 py-0.5 rounded-md bg-emerald-100">
                        {c.chapter}
                      </span>
                      <span className="text-[10px] font-bold text-stone-400">
                        {c.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 font-serif">
                      {language === 'mr' ? c.title.mr : c.title.en}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {language === 'mr' ? c.desc.mr : c.desc.en}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'mr' ? 'वैधानिक तरतूद सक्रिय' : 'Statutory Enactment Enforced'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Subordinate Legislation Note */}
            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200/90 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Info className="w-4 h-4 text-emerald-700" />
                <span>{language === 'mr' ? 'परिनियम १९९० ची वैधानिक स्थिती' : 'Legal Status of MAU Statutes 1990'}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'महाराष्ट्र कृषी विद्यापीठे परिनियम १९९० हे महाराष्ट्र कृषी विद्यापीठे कायदा १९८३ च्या कलम ७५ अन्वये राज्य शासनाने मंजूर केले आहेत. हे परिनियम विद्यापीठाच्या सर्व ४ कृषी विद्यापीठांना समान रीतीने लागू असून वेळोवेळी महाराष्ट्र शासन राजपत्रात प्रसिद्ध झालेल्या सुधारणांनुसार यात दुरुस्त्या करण्यात आल्या आहेत.'
                  : 'The Maharashtra Agricultural Universities Statutes, 1990 were framed under Section 75 of the MAU Act, 1983 and approved by the Government of Maharashtra. These uniform statutes apply across all 4 State Agricultural Universities and are periodically updated through official Government Gazette notifications.'}
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
