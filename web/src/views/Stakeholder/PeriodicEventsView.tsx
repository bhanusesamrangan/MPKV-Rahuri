'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Microscope,
  CalendarDays,
  Trees,
  TrendingUp,
  Search,
  X,
  Download,
  ExternalLink,
  ChevronRight,
  Home,
  Building2,
  Calendar,
  Award,
  Sparkles,
  FileText,
  UserCheck,
  BookOpen,
  Filter,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Layers,
  Leaf,
  Users,
  ZoomIn,
  Eye,
  Camera,
  Tractor,
  MapPin
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import fallbackEventsData from '@/data/scraped/pages/events-convocation.json';

interface PeriodicEventsViewProps {
  pageData?: any;
  initialTab?: string;
}

export const PeriodicEventsView: React.FC<PeriodicEventsViewProps> = ({ pageData, initialTab }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>(initialTab || 'convocation');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);

  // Safe data resolution with resilient fallback
  const heroData = pageData?.hero || (fallbackEventsData as any)?.hero || {};
  const stats = heroData?.stats || [];
  const convocations = pageData?.convocations || (fallbackEventsData as any)?.convocations || [];
  const agrescList = pageData?.agrescoProceedings || (fallbackEventsData as any)?.agrescoProceedings || [];
  const agrescoGallery = pageData?.agrescoGallery || (fallbackEventsData as any)?.agrescoGallery || [];
  const foundationData = pageData?.foundationDay || (fallbackEventsData as any)?.foundationDay || {};
  const vanmohotsavData = pageData?.vanmohotsav || (fallbackEventsData as any)?.vanmohotsav || {};
  const retrospectionData = pageData?.retrospection || (fallbackEventsData as any)?.retrospection || {};
  const kisanAadharData = pageData?.kisanAadhar || (fallbackEventsData as any)?.kisanAadhar || {};

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  // 6 Tabs matching EXACT official order from Periodical Events menu
  const categoryTabs = [
    {
      id: 'convocation',
      labelEn: `Convocation (${convocations.length})`,
      labelMr: `दीक्षांत समारंभ (${convocations.length})`,
      icon: GraduationCap
    },
    {
      id: 'agresco',
      labelEn: `Joint Agresco (${agrescList.length})`,
      labelMr: `संयुक्त अग्रेस्को (${agrescList.length})`,
      icon: Microscope
    },
    {
      id: 'retrospection',
      labelEn: 'Retrospection (MAGOVA)',
      labelMr: 'मगोवा वार्षिक आढावा',
      icon: TrendingUp
    },
    {
      id: 'vanmohotsav',
      labelEn: 'Vanmohotsav',
      labelMr: 'वनमहोत्सव व हरित परिसर',
      icon: Trees
    },
    {
      id: 'kisan_aadhar',
      labelEn: 'Kisan Aadhar Sammelan',
      labelMr: 'किसान आधार संमेलन',
      icon: Tractor
    },
    {
      id: 'foundation_day',
      labelEn: 'University Foundation Day',
      labelMr: 'विद्यापीठ वर्धापन दिन',
      icon: CalendarDays
    }
  ];

  // Filter convocations
  const filteredConvocations = useMemo(() => {
    if (!searchQuery.trim()) return convocations;
    const q = searchQuery.toLowerCase().trim();
    return convocations.filter((c: any) => {
      const edEn = (c.edition || '').toLowerCase();
      const edMr = (c.editionMr || '').toLowerCase();
      const cgEn = (c.chiefGuestEn || '').toLowerCase();
      const cgMr = (c.chiefGuestMr || '').toLowerCase();
      const yr = (c.academicYear || '').toLowerCase();
      const dt = (c.date || '').toLowerCase();
      return edEn.includes(q) || edMr.includes(q) || cgEn.includes(q) || cgMr.includes(q) || yr.includes(q) || dt.includes(q);
    });
  }, [convocations, searchQuery]);

  // Filter AGRESCO
  const filteredAgresco = useMemo(() => {
    if (!searchQuery.trim()) return agrescList;
    const q = searchQuery.toLowerCase().trim();
    return agrescList.filter((a: any) => {
      const edEn = (a.edition || '').toLowerCase();
      const edMr = (a.editionMr || '').toLowerCase();
      const yr = (a.year || '').toLowerCase();
      const descEn = (a.descriptionEn || '').toLowerCase();
      return edEn.includes(q) || edMr.includes(q) || yr.includes(q) || descEn.includes(q);
    });
  }, [agrescList, searchQuery]);

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
            href="/PeriodicalEvent/Convocation"
            className="hover:text-[#0b5c3a] transition-colors"
          >
            {language === 'mr' ? 'नियतकालिक समारंभ' : 'Periodical Events'}
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="text-emerald-900 font-bold">
            {activeTab === 'convocation' && (language === 'mr' ? 'दीक्षांत समारंभ' : 'Convocation')}
            {activeTab === 'agresco' && (language === 'mr' ? 'संयुक्त अग्रेस्को' : 'Joint Agresco')}
            {activeTab === 'retrospection' && (language === 'mr' ? 'मगोवा' : 'Retrospection')}
            {activeTab === 'vanmohotsav' && (language === 'mr' ? 'वनमहोत्सव' : 'Vanmohotsav')}
            {activeTab === 'kisan_aadhar' && (language === 'mr' ? 'किसान आधार संमेलन' : 'Kisan Aadhar Sammelan')}
            {activeTab === 'foundation_day' && (language === 'mr' ? 'विद्यापीठ वर्धापन दिन' : 'University Foundation Day')}
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
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>{getBilingual(heroData?.badge) || (language === 'mr' ? 'अधिकृत विद्यापीठ सोहळे व दीक्षांत मंच' : 'Official University Ceremonies')}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-serif leading-tight">
                {getBilingual(heroData?.title) || (language === 'mr' ? 'विद्यापीठ नियतकालिक समारंभ व पदवीदान मंच' : 'University Periodical Events & Convocation Portal')}
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed max-w-3xl">
                {getBilingual(heroData?.subtitle) || (language === 'mr'
                  ? 'महात्मा फुले कृषी विद्यापीठ, राहुरी यांचे वार्षिक दीक्षांत पदवीदान समारंभ, संयुक्त अग्रेस्को राज्यस्तरीय संशोधन परिषद, विद्यापीठ वर्धापन दिन, किसान आधार संमेलन आणि वनमहोत्सव यांचा अधिकृत ऐतिहासिक संग्रह.'
                  : 'Central statutory archive of MPKV Rahuri periodic milestones: Annual Convocation, Joint AGRESCO, Foundation Day, Kisan Aadhar Sammelan, and Van Mahotsav.')}
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

      {/* 3. Main Navigation & Content Section */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16 space-y-6">

        {/* 6 Category Tabs Strip: Guaranteed Anti-Clipping Flex Wrap */}
        <div className="w-full p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs overflow-visible">
          <div
            className="flex flex-wrap items-center gap-2 w-full"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
          >
            {categoryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
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

        {/* Search Bar for Convocation & AGRESCO */}
        {(activeTab === 'convocation' || activeTab === 'agresco') && (
          <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={
                    activeTab === 'convocation'
                      ? (language === 'mr' ? 'दीक्षांत समारंभ, अतिथी किंवा वर्ष शोधा...' : 'Search convocation, guest, year...')
                      : (language === 'mr' ? 'अग्रेस्को परिषद, वर्ष किंवा विषय शोधा...' : 'Search AGRESCO session, year, topic...')
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

              <div className="flex items-center gap-3 text-xs text-stone-600">
                <span className="font-medium">
                  {language === 'mr' ? 'नोंदी सापडल्या:' : 'Results:'}{' '}
                  <strong className="text-emerald-900 font-bold">
                    {activeTab === 'convocation' ? filteredConvocations.length : filteredAgresco.length}
                  </strong>
                </span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-emerald-700 hover:underline font-semibold"
                  >
                    {language === 'mr' ? 'रीसेट करा' : 'Reset search'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4A. TAB 1: CONVOCATION CEREMONIES WITH ALL 28 OFFICIAL PDFS & PHOTOS */}
        {activeTab === 'convocation' && (
          <div className="space-y-6">
            
            {/* Degree In Absentia & In Person Notice Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-amber-950">
              <div className="space-y-1">
                <h4 className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>{language === 'mr' ? 'दीक्षांत पदवी प्रमाणपत्र वाटप सूचना' : 'Convocation Degree Distribution Guidelines'}</span>
                </h4>
                <p className="text-amber-900/90 leading-relaxed">
                  {language === 'mr'
                    ? 'प्रत्यक्ष (In-Person) अथवा अनुपस्थितीत (In-Absentia) पदवी प्रमाणपत्र प्राप्त करण्याकरिता कुलसचिव परीक्षा विभागामार्फत विहित मुदतीत अर्ज करणे आवश्यक आहे.'
                    : 'Graduates may receive degree certificates in person or in absentia by submitting the prescribed application along with statutory fee to the Examination Branch.'}
                </p>
              </div>
              <Link
                href="/education/regulations"
                className="px-3.5 py-2 rounded-xl bg-amber-800 text-white font-bold hover:bg-amber-900 transition flex items-center gap-1.5 shrink-0 shadow-2xs"
              >
                <span>{language === 'mr' ? 'पदवी नियम व कार्यपद्धती' : 'Regulations & Forms'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Convocations Grid with Authentic Ceremony Photos */}
            <div className="space-y-6">
              {filteredConvocations.map((conv: any, idx: number) => {
                const hasImage = Boolean(conv.image);
                const captionText = `${language === 'mr' ? conv.editionMr : conv.edition} - ${conv.academicYear}`;

                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition space-y-4 group overflow-hidden"
                  >
                    {/* Top Bar: Edition & Date */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-sm shadow-xs shrink-0 font-serif">
                          {conv.date.includes('20') ? conv.date.slice(-2) : '36'}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-extrabold text-stone-900 group-hover:text-emerald-900 transition font-serif leading-snug">
                            {language === 'mr' ? conv.editionMr : conv.edition}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-stone-500">
                            <span className="font-semibold">{conv.academicYear}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              <span>{conv.date}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Body: Responsive 2-Column with Authentic Photo & Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                      
                      {/* Left: Authentic Ceremony Stage Photograph */}
                      {hasImage && (
                        <div className="lg:col-span-4 relative rounded-xl overflow-hidden bg-stone-900 min-h-[220px] max-h-[260px] group/photo">
                          <img
                            src={conv.image}
                            alt={captionText}
                            className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white">
                            <span className="font-bold drop-shadow-md truncate">{language === 'mr' ? 'अधिकृत पदवीदान छायाचित्र' : 'Official Ceremony Archive'}</span>
                            <button
                              type="button"
                              onClick={() => setSelectedImage({ src: conv.image, caption: captionText })}
                              className="px-2 py-1 rounded-lg bg-black/60 hover:bg-black/90 text-amber-300 flex items-center gap-1 shrink-0 backdrop-blur-xs transition"
                            >
                              <ZoomIn className="w-3 h-3" />
                              <span>{language === 'mr' ? 'मोठा फोटो' : 'Enlarge'}</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Right / Full: Chief Guest & Ceremony Summary */}
                      <div className={`${hasImage ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col justify-between space-y-3`}>
                        <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1.5">
                          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                            <span>{language === 'mr' ? 'प्रमुख पाहुणे' : 'Chief Guest'}</span>
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-stone-800 leading-snug">
                            {language === 'mr' ? conv.chiefGuestMr : conv.chiefGuestEn}
                          </p>
                          <p className="text-xs text-stone-600 leading-relaxed pt-1">
                            {language === 'mr' ? conv.summaryMr : conv.summaryEn}
                          </p>
                        </div>

                        {/* 4 Official Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
                          
                          {/* 1. Chief Guest Address */}
                          {conv.chiefGuestAddress && (
                            <a
                              href={conv.chiefGuestAddress.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl bg-emerald-950 text-white font-bold text-xs flex items-center justify-between hover:bg-emerald-900 transition shadow-2xs group/btn"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <BookOpen className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                                <span className="truncate">{language === 'mr' ? 'दीक्षांत भाषण' : 'Guest Address'}</span>
                              </div>
                              <span className="text-[10px] text-emerald-300 font-semibold shrink-0 ml-1">{conv.chiefGuestAddress.size || 'PDF'}</span>
                            </a>
                          )}

                          {/* 2. VC Report */}
                          {conv.vcReport && (
                            <a
                              href={conv.vcReport.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 font-bold text-xs flex items-center justify-between hover:bg-stone-200 transition group/btn"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <FileText className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                                <span className="truncate">{language === 'mr' ? 'कुलगुरू अहवाल' : 'VC Report'}</span>
                              </div>
                              <span className="text-[10px] text-stone-500 font-semibold shrink-0 ml-1">{conv.vcReport.size || 'PDF'}</span>
                            </a>
                          )}

                          {/* 3. Medal Winners List */}
                          {conv.medalsList && (
                            <a
                              href={conv.medalsList.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs flex items-center justify-between hover:bg-amber-100 transition group/btn"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span className="truncate">{language === 'mr' ? 'सुवर्णपदक विजेते' : 'Medal Winners'}</span>
                              </div>
                              <span className="text-[10px] text-amber-700 font-semibold shrink-0 ml-1">{conv.medalsList.size || 'PDF'}</span>
                            </a>
                          )}

                          {/* 4. Pass Out Students */}
                          {conv.passOutStudents && (
                            <a
                              href={conv.passOutStudents.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 font-semibold text-xs flex items-center justify-between hover:bg-stone-100 transition group/btn"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                                <span className="truncate">{language === 'mr' ? 'पदवीधर यादी' : 'Graduates List'}</span>
                              </div>
                              <Download className="w-3.5 h-3.5 text-stone-400 shrink-0 ml-1" />
                            </a>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* 4B. TAB 2: JOINT AGRESCO WITH DEDICATED PHOTO GALLERY & FULL PROCEEDINGS */}
        {activeTab === 'agresco' && (
          <div className="space-y-6">
            
            {/* Joint AGRESCO Info Banner */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <Microscope className="w-4 h-4 text-emerald-700" />
                <span>{language === 'mr' ? 'संयुक्त कृषी संशोधन आणि विस्तार परिषद (Joint AGRESCO)' : 'Joint Agricultural Research & Extension Council (Joint AGRESCO)'}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'mr'
                  ? 'महाराष्ट्र राज्य कृषी शिक्षण व संशोधन परिषद (MCAER), पुणे आणि राज्यातील चारही कृषी विद्यापीठांच्या संयुक्त विद्यमाने दरवर्षी मे महिन्यात संयुक्त अग्रेस्कोचे आयोजन केले जाते. यामध्ये शेतकरी व कृषी उद्योगांसाठी उपयुक्त नवनवीन वाण, कृषी तंत्रज्ञान शिफारशी आणि अवजारांना अंतिम वैधानिक मान्यता दिली जाते.'
                  : 'State Agricultural Universities in Maharashtra and MCAER Pune jointly convene the Joint AGRESCO every year in May. It finalizes and accords statutory state sanction to new crop varieties, farm technologies, and implements for field release.'}
              </p>
            </div>

            {/* Dedicated AGRESCO Photo Gallery */}
            {agrescoGallery && agrescoGallery.length > 0 && (
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-700" />
                    <h4 className="text-sm font-bold text-stone-900 font-serif">
                      {language === 'mr' ? 'संयुक्त अग्रेस्को राज्य परिषद छायाचित्रे' : 'Joint AGRESCO State Conclave Gallery'}
                    </h4>
                  </div>
                  <span className="text-[11px] text-stone-500 font-semibold">{agrescoGallery.length} {language === 'mr' ? 'अधिकृत छायाचित्रे' : 'Archival Photos'}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {agrescoGallery.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="group/item relative rounded-xl overflow-hidden bg-stone-900 aspect-4/3 cursor-pointer border border-stone-200 shadow-2xs"
                      onClick={() => setSelectedImage({ src: item.image, caption: `${item.title} (${item.year})` })}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover/item:opacity-100 transition-opacity" />
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <span className="px-1.5 py-0.5 rounded-sm bg-emerald-800 text-[10px] font-bold text-amber-300">
                          {item.year}
                        </span>
                        <p className="text-[11px] font-bold text-white truncate mt-1">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Proceedings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAgresco.map((agr: any, idx: number) => {
                const hasImg = Boolean(agr.image);
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold">
                          {agr.year}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold text-[11px]">
                          {agr.status}
                        </span>
                      </div>

                      {hasImg && (
                        <div
                          className="relative rounded-xl overflow-hidden aspect-16/9 bg-stone-900 cursor-pointer group/th"
                          onClick={() => setSelectedImage({ src: agr.image, caption: `${language === 'mr' ? agr.editionMr : agr.edition} (${agr.year})` })}
                        >
                          <img
                            src={agr.image}
                            alt={agr.edition}
                            className="w-full h-full object-cover group-hover/th:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-black/70 text-amber-300 text-[10px] font-bold flex items-center gap-1">
                            <ZoomIn className="w-2.5 h-2.5" />
                            <span>{language === 'mr' ? 'मोठा फोटो' : 'Enlarge'}</span>
                          </div>
                        </div>
                      )}

                      <h4 className="text-sm font-bold text-stone-900 font-serif leading-snug">
                        {language === 'mr' ? agr.editionMr : agr.edition}
                      </h4>

                      <p className="text-xs text-stone-600 leading-relaxed font-normal">
                        {language === 'mr' ? agr.descriptionMr : agr.descriptionEn}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                      <a
                        href={agr.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-950 transition shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-300" />
                        <span>{language === 'mr' ? 'कार्यवृत्तांत PDF डाउनलोड' : 'Download Proceedings (PDF)'}</span>
                        {agr.size && <span className="text-[10px] text-amber-300 ml-1">({agr.size})</span>}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* 4C. TAB 3: RETROSPECTION (MAGOVA) */}
        {activeTab === 'retrospection' && (
          <div className="space-y-6">
            
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-5">
              <div className="space-y-1 pb-4 border-b border-stone-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                  <span>{language === 'mr' ? 'वार्षिक विचारमंथन व प्रगती मगोवा' : 'Annual Performance Assessment Conclave'}</span>
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 font-serif">
                  {language === 'mr' ? retrospectionData.titleMr : retrospectionData.titleEn}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'mr' ? retrospectionData.descriptionMr : retrospectionData.descriptionEn}
              </p>

              {/* Retrospection Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {retrospectionData.editions?.map((ed: any, idx: number) => {
                  const hasPic = Boolean(ed.image);
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3"
                    >
                      {hasPic && (
                        <div
                          className="relative rounded-xl overflow-hidden aspect-16/9 bg-stone-900 cursor-pointer group/mg"
                          onClick={() => setSelectedImage({
                            src: ed.image,
                            caption: `${language === 'mr' ? ed.titleMr : ed.titleEn} (${ed.year})`
                          })}
                        >
                          <img
                            src={ed.image}
                            alt={ed.titleEn}
                            className="w-full h-full object-cover group-hover/mg:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-black/70 text-amber-300 text-[10px] font-bold flex items-center gap-1">
                            <ZoomIn className="w-2.5 h-2.5" />
                            <span>{language === 'mr' ? 'मोठा फोटो' : 'Enlarge'}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-stone-800 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                          {ed.year}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-stone-900">
                            {language === 'mr' ? ed.titleMr : ed.titleEn}
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* 4D. TAB 4: VAN MOHOTSAV */}
        {activeTab === 'vanmohotsav' && (
          <div className="space-y-6">
            
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-5">
              <div className="space-y-1 pb-4 border-b border-stone-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <Trees className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'mr' ? 'हरित आवार अभियान (७,८५५ हेक्टर)' : 'Green Campus Mission (7,855 Ha)'}</span>
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 font-serif">
                  {language === 'mr' ? vanmohotsavData.titleMr : vanmohotsavData.titleEn}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'mr' ? vanmohotsavData.descriptionMr : vanmohotsavData.descriptionEn}
              </p>

              {/* Authentic Van Mahotsav Photo Gallery */}
              {vanmohotsavData.gallery && vanmohotsavData.gallery.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-emerald-700" />
                      <span>{language === 'mr' ? 'वनमहोत्सव वृक्षारोपण छायाचित्र दालन' : 'Van Mahotsav Afforestation Archive Gallery'}</span>
                    </h4>
                    <span className="text-[11px] text-stone-500 font-semibold">{vanmohotsavData.gallery.length} {language === 'mr' ? 'छायाचित्रे' : 'Photos'}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {vanmohotsavData.gallery.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="group/tree relative rounded-xl overflow-hidden aspect-4/3 bg-stone-900 cursor-pointer border border-stone-200 shadow-2xs"
                        onClick={() => setSelectedImage({
                          src: item.image,
                          caption: `${language === 'mr' ? item.titleMr : item.titleEn} (${item.year})`
                        })}
                      >
                        <img
                          src={item.image}
                          alt={item.titleEn}
                          className="w-full h-full object-cover group-hover/tree:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover/tree:opacity-100 transition-opacity" />
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <span className="px-1.5 py-0.5 rounded-sm bg-emerald-800 text-[10px] font-bold text-amber-300">
                            {item.year}
                          </span>
                          <p className="text-[11px] font-bold text-white truncate mt-1">
                            {language === 'mr' ? item.titleMr : item.titleEn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vanmohotsavData.milestones?.map((m: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/60 flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                      {m.year}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-emerald-950">
                        {language === 'mr' ? m.eventMr : m.eventEn}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 4E. TAB 5: KISAN AADHAR SAMMELAN (THE PREVIOUSLY MISSING CORE PERIODIC EVENT) */}
        {activeTab === 'kisan_aadhar' && (
          <div className="space-y-6">
            
            {/* Header & Banner Card */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
                    <Tractor className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'राज्यस्तरीय शेतकरी महासंमेलन (सन २०१७ पासून)' : 'State Farmers Convention (Since 2017)'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
                    {language === 'mr' ? kisanAadharData.titleMr : kisanAadharData.titleEn}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs">
                    {language === 'mr' ? 'कृषी विभाग व आत्मा सहकार्य' : 'In collaboration with Agri Dept & ATMA'}
                  </span>
                </div>
              </div>

              {/* Main Banner Photo */}
              {kisanAadharData.bannerImage && (
                <div
                  className="relative rounded-2xl overflow-hidden aspect-21/9 bg-stone-900 cursor-pointer shadow-md group/kasb"
                  onClick={() => setSelectedImage({
                    src: kisanAadharData.bannerImage,
                    caption: language === 'mr' ? 'किसान आधार संमेलन - राहुरी मध्यवर्ती आवार' : 'Kisan Aadhar Sammelan Central Campus'
                  })}
                >
                  <img
                    src={kisanAadharData.bannerImage}
                    alt="Kisan Aadhar Sammelan"
                    className="w-full h-full object-cover group-hover/kasb:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-bold drop-shadow-md">
                      {language === 'mr' ? 'किसान आधार संमेलन भव्य कृषी प्रदर्शन व शेतकरी मार्गदर्शन' : 'Mega Farmers Convention & Agri Technology Expo'}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 text-amber-300 flex items-center gap-1 font-bold text-[11px] backdrop-blur-xs">
                      <ZoomIn className="w-3 h-3" />
                      <span>{language === 'mr' ? 'मोठा फोटो' : 'Enlarge'}</span>
                    </span>
                  </div>
                </div>
              )}

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'mr' ? kisanAadharData.descriptionMr : kisanAadharData.descriptionEn}
              </p>

              {/* Kisan Aadhar Gallery */}
              {kisanAadharData.gallery && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'mr' ? 'किसान आधार संमेलन छायाचित्रे' : 'Kisan Aadhar Sammelan Photo Gallery'}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {kisanAadharData.gallery.map((g: any, idx: number) => (
                      <div
                        key={idx}
                        className="group/kg relative rounded-xl overflow-hidden aspect-4/3 bg-stone-900 cursor-pointer border border-stone-200 shadow-2xs"
                        onClick={() => setSelectedImage({
                          src: g.image,
                          caption: `${language === 'mr' ? g.titleMr : g.titleEn} (${g.year})`
                        })}
                      >
                        <img
                          src={g.image}
                          alt={g.titleEn}
                          className="w-full h-full object-cover group-hover/kg:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover/kg:opacity-100 transition-opacity" />
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <span className="px-1.5 py-0.5 rounded-sm bg-emerald-800 text-[10px] font-bold text-amber-300">
                            {g.year}
                          </span>
                          <p className="text-[11px] font-bold text-white truncate mt-1">
                            {language === 'mr' ? g.titleMr : g.titleEn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Editions with Full Downloadable PDFs (Brochures, Posters, Technical Programmes) */}
              <div className="space-y-4 pt-3 border-t border-stone-100">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>{language === 'mr' ? 'संमेलन माहितीपत्रक, भीत्तीपत्रक व तांत्रिक चर्चासत्रे दस्तऐवज' : 'Sammelan Brochures, Posters & Technical Schedules'}</span>
                </h4>

                <div className="space-y-4">
                  {kisanAadharData.editions?.map((ed: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <h5 className="text-sm font-bold text-emerald-950 font-serif">
                            {language === 'mr' ? ed.titleMr : ed.titleEn}
                          </h5>
                          <div className="flex items-center gap-2 text-xs text-stone-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              <span>{ed.date}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-stone-400" />
                              <span>{ed.venue}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        {language === 'mr' ? ed.descriptionMr : ed.descriptionEn}
                      </p>

                      {/* Downloadable Documents */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        {ed.documents?.map((doc: any, dIdx: number) => (
                          <a
                            key={dIdx}
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-white border border-stone-200/90 shadow-2xs hover:border-emerald-600 hover:shadow-xs transition flex flex-col justify-between space-y-2 group/d"
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                                {doc.type}
                              </span>
                              <span className="text-[10px] text-stone-400 font-semibold">
                                {doc.size}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-stone-800 group-hover/d:text-emerald-900 transition leading-snug">
                              {language === 'mr' ? doc.titleMr : doc.titleEn}
                            </p>
                            <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[11px] text-emerald-800 font-bold">
                              <span>{language === 'mr' ? 'डाउनलोड PDF' : 'Download PDF'}</span>
                              <Download className="w-3.5 h-3.5 text-amber-600 group-hover/d:translate-y-0.5 transition" />
                            </div>
                          </a>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 4F. TAB 6: FOUNDATION DAY (29 MARCH) WITH 50 YEARS BOOK (44 MB) & GOLDEN JUBILEE BANNER */}
        {activeTab === 'foundation_day' && (
          <div className="space-y-6">
            
            {/* Foundation Day Overview */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                    <CalendarDays className="w-3.5 h-3.5 text-amber-600" />
                    <span>{language === 'mr' ? 'स्थापना दिनांक: २९ मार्च १९६८' : 'Established: 29th March 1968'}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-stone-900 font-serif">
                    {language === 'mr' ? foundationData.titleMr : foundationData.titleEn}
                  </h3>
                </div>
                {foundationData.specialDocument && (
                  <a
                    href={foundationData.specialDocument.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-950 transition shadow-2xs shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                    <span>{language === 'mr' ? '५० वर्षांची सुवर्ण वाटचाल ग्रंथ' : '50 Years Glorious Journey (PDF)'}</span>
                    <span className="text-[10px] text-amber-300">({foundationData.specialDocument.size || '44 MB'})</span>
                  </a>
                )}
              </div>

              {/* Authentic Golden Jubilee Celebration Photo */}
              {foundationData.image && (
                <div
                  className="relative rounded-2xl overflow-hidden aspect-21/9 bg-stone-900 cursor-pointer shadow-md group/gj"
                  onClick={() => setSelectedImage({
                    src: foundationData.image,
                    caption: language === 'mr' ? foundationData.captionMr : foundationData.captionEn
                  })}
                >
                  <img
                    src={foundationData.image}
                    alt="Golden Jubilee Celebration"
                    className="w-full h-full object-cover group-hover/gj:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-bold drop-shadow-md">
                      {language === 'mr' ? foundationData.captionMr : foundationData.captionEn}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 text-amber-300 flex items-center gap-1 font-bold text-[11px] backdrop-blur-xs">
                      <ZoomIn className="w-3 h-3" />
                      <span>{language === 'mr' ? 'मोठा फोटो' : 'Enlarge'}</span>
                    </span>
                  </div>
                </div>
              )}

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'mr' ? foundationData.descriptionMr : foundationData.descriptionEn}
              </p>

              {/* Annual Foundation Awards */}
              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>{language === 'mr' ? 'वर्धापन दिनी प्रदान केले जाणारे राज्यस्तरीय गौरव पुरस्कार' : 'Annual State & University Foundation Awards'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {foundationData.annualAwards?.map((award: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1"
                    >
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-tight">
                        {award.cadre}
                      </span>
                      <h5 className="text-xs font-bold text-stone-900">
                        {language === 'mr' ? award.awardMr : award.awardEn}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* 5. IMAGE LIGHTBOX / MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between text-white text-xs px-2">
              <span className="font-bold text-stone-200">{selectedImage.caption}</span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative w-full max-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src={selectedImage.src}
                alt={selectedImage.caption}
                className="max-h-[80vh] max-w-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
