'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Building2,
  Trophy,
  ShieldAlert,
  Globe2,
  FileText,
  Bell,
  Award,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Home,
  CheckCircle2,
  Sparkles,
  BookOpen,
  DollarSign,
  HeartHandshake,
  ArrowRight,
  Printer,
  Volume2,
  VolumeX,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility } from '@/context/AccessibilityContext';

interface StudentsHubViewProps {
  pageData?: any;
}

export const StudentsHubView: React.FC<StudentsHubViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const { isSpeaking, speakContent, stopSpeech } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'services' | 'scholarships' | 'helpline'>('services');

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const studentActionCards = [
    {
      id: 'admission',
      title: { en: 'Centralized Admissions', mr: 'केंद्रीभूत प्रवेश प्रक्रिया' },
      subtitle: { en: 'UG, PG & Ph.D. State CAP rounds & eligibility', mr: 'पदवी, पदव्युत्तर व आचार्य प्रवेश पात्रता व फेऱ्या' },
      icon: BookOpen,
      href: '/students/admission',
      color: 'from-emerald-600 to-teal-700',
      badge: { en: 'Maha CAP Portal', mr: 'राज्य सीईटी कॅप' }
    },
    {
      id: 'hostels',
      title: { en: 'Hostel Accommodation', mr: 'विद्यापीठ वसतिगृहे' },
      subtitle: { en: 'Boys & girls modern residential living and dining', mr: 'मुला-मुलींसाठी अद्ययावत निवास व भोजन व्यवस्था' },
      icon: Building2,
      href: '/students/hostels',
      color: 'from-teal-600 to-cyan-700',
      badge: { en: '10 Campuses', mr: '१० कॅम्पस' }
    },
    {
      id: 'sports',
      title: { en: 'Sports & Gymkhana', mr: 'क्रीडा व व्यायामशाळा' },
      subtitle: { en: 'Athletic tracks, indoor pavilion & Agrisports meets', mr: 'धावपट्टी, क्रीडा संकुल व आंतर-महाविद्यालयीन स्पर्धा' },
      icon: Trophy,
      href: '/students/sports',
      color: 'from-amber-600 to-orange-700',
      badge: { en: 'Krida Mahotsav', mr: 'क्रीडा महोत्सव' }
    },
    {
      id: 'circulars',
      title: { en: 'Academic Circulars & Notices', mr: 'शैक्षणिक परिपत्रके' },
      subtitle: { en: 'Exam timetables, academic calendars & official orders', mr: 'परीक्षा वेळापत्रक, दिनदर्शिका व अधिकृत सूचना' },
      icon: Bell,
      href: '/students/circulars',
      color: 'from-blue-600 to-indigo-700',
      badge: { en: 'Updated Weekly', mr: 'साप्ताहिक अद्ययावत' }
    },
    {
      id: 'scholarships',
      title: { en: 'Scholarships & Freeships', mr: 'शिष्यवृत्ती व सवलती' },
      subtitle: { en: 'ICAR NTS, MahaDBT & Earn While You Learn scheme', mr: 'आयसीएआर, महाडीबीटी व कमवा-शिका योजना' },
      icon: DollarSign,
      href: '#scholarships-section',
      onClick: () => setActiveTab('scholarships'),
      color: 'from-violet-600 to-purple-700',
      badge: { en: 'Financial Aid', mr: 'आर्थिक सहाय्य' }
    },
    {
      id: 'anti_ragging',
      title: { en: 'Anti-Ragging & Grievances', mr: 'रॅगिंग प्रतिबंध व तक्रार निवारण' },
      subtitle: { en: 'Zero-tolerance student welfare and legal cell', mr: 'शून्य सहनशीलता रॅगिंग विरोधी व तक्रार निवारण कक्ष' },
      icon: ShieldAlert,
      href: '/students/complaints',
      color: 'from-rose-600 to-red-700',
      badge: { en: '24x7 Help', mr: '२४ तास सहाय्य' }
    },
    {
      id: 'international',
      title: { en: 'International Students Cell', mr: 'आंतरराष्ट्रीय विद्यार्थी कक्ष' },
      subtitle: { en: 'Dedicated assistance for foreign nationals & NRI scholars', mr: 'विदेशी व अनिवासी भारतीय विद्यार्थ्यांसाठी मार्गदर्शन' },
      icon: Globe2,
      href: '/students/international',
      color: 'from-sky-600 to-blue-700',
      badge: { en: 'Global Scholars', mr: 'आंतरराष्ट्रीय कक्ष' }
    },
    {
      id: 'pgi_forms',
      title: { en: 'PGI Student Forms Desk', mr: 'पदव्युत्तर विद्यार्थी अर्ज (PGI)' },
      subtitle: { en: 'Registration, synopsis, and thesis clearance downloads', mr: 'नोंदणी, प्रबंध रूपरेषा व पदव्युत्तर मंजुरी अर्ज' },
      icon: FileText,
      href: '/students/pgi-form',
      color: 'from-emerald-700 to-green-800',
      badge: { en: 'PGI Rahuri', mr: 'पीजीआय राहुरी' }
    }
  ];

  const scholarships = [
    {
      name: { en: 'ICAR National Talent Scholarship (NTS)', mr: 'आयसीएआर राष्ट्रीय प्रतिभा शिष्यवृत्ती' },
      eligibility: {
        en: 'Undergraduate and Master’s scholars admitted through the ICAR All-India Competitive Entrance Examination.',
        mr: 'आयसीएआर अखिल भारतीय प्रवेश परीक्षेद्वारे पदवी व पदव्युत्तर वर्गात प्रवेश घेतलेले गुणवत्ताधारक विद्यार्थी.'
      },
      benefits: { en: '₹3,000 / month (UG) and ₹5,000 / month (PG) for the duration of the degree.', mr: 'पदवीसाठी रु. ३,००० व पदव्युत्तरसाठी रु. ५,००० प्रतिमहा शिष्यवृत्ती.' },
      portal: 'https://icar.org.in',
      tag: { en: 'ICAR New Delhi', mr: 'भा.कृ.अनु.प.' }
    },
    {
      name: { en: 'Government of Maharashtra MahaDBT Post-Matric Scholarships', mr: 'महाराष्ट्र शासन महाडीबीटी मॅट्रिकोत्तर शिष्यवृत्ती' },
      eligibility: {
        en: 'Eligible students belonging to SC, ST, VJNT, OBC, SBC, SEBC, and EWS categories as per state norms.',
        mr: 'अनुसूचित जाती/जमाती, विमुक्त जाती, भटक्या जमाती, इतर मागास प्रवर्ग व आर्थिक दुर्बल घटकांतील विद्यार्थी.'
      },
      benefits: { en: '100% or 50% tuition & examination fee reimbursement, hostel maintenance allowance.', mr: '१००% अथवा ५०% शिक्षण व परीक्षा शुल्क प्रतिपूर्ती, निर्वाह भत्ता व वसतिगृह सहाय्य.' },
      portal: 'https://mahadbt.maharashtra.gov.in',
      tag: { en: 'State Govt.', mr: 'राज्य शासन' }
    },
    {
      name: { en: 'Earn While You Learn Scheme', mr: 'कमवा व शिका योजना' },
      eligibility: {
        en: 'Economically disadvantaged agricultural students undertaking research farm & lab tasks outside lecture hours.',
        mr: 'अभ्यास वेळेव्यतिरिक्त प्रक्षेत्रावर व प्रयोगशाळेत काम करून स्वावलंबी होऊ इच्छिणारे गरजू विद्यार्थी.'
      },
      benefits: { en: 'Monthly stipend calculated on hourly farm / practical work basis directly into bank accounts.', mr: 'प्रत्यक्ष कामाच्या तासांनुसार थेट बँक खात्यात मासिक मानधन.' },
      portal: '/students',
      tag: { en: 'MPKV Welfare', mr: 'विद्यापीठ योजना' }
    },
    {
      name: { en: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti', mr: 'राजर्षी छत्रपती शाहू महाराज शिक्षण शुल्क शिष्यवृत्ती' },
      eligibility: {
        en: 'Economically Backward Class (EBC) students whose annual family income is under state thresholds.',
        mr: 'वार्षिक कौटुंबिक उत्पन्न विहित मर्यादेत असणारे आर्थिकदृष्ट्या दुर्बल (EBC) प्रवर्गातील विद्यार्थी.'
      },
      benefits: { en: '50% tuition fee and 50% examination fee waiver throughout academic tenure.', mr: '५०% शिक्षण शुल्क व ५०% परीक्षा शुल्क सवलत.' },
      portal: 'https://mahadbt.maharashtra.gov.in',
      tag: { en: 'DTE Maharashtra', mr: 'उच्च व तंत्रशिक्षण' }
    }
  ];

  return (
    <div className="w-full bg-[#f8faf8] min-h-screen text-slate-800">
      
      {/* 1. Breadcrumb Navigation */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-emerald-700 flex items-center gap-1 font-medium text-slate-600 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-emerald-800">
            {language === 'mr' ? 'विद्यार्थी दालन' : 'Students Hub'}
          </span>
        </nav>
      </div>

      {/* 2. Hero Section: Vibrant Emerald & Cyan Campus Life */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2e1e] via-[#103a27] to-[#072015] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-emerald-700/50">
          
          {/* Subtle Ambient Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <GraduationCap className="w-4 h-4 text-emerald-300" />
                <span>{language === 'mr' ? 'विद्यार्थी कल्याण व शैक्षणिक सुविधा दालन' : 'Students Welfare & Academic Services Hub'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-amber-300 font-semibold">{language === 'mr' ? '१० घटक महाविद्यालये' : '10 Colleges & PGI'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight">
                {language === 'mr'
                  ? 'विद्यार्थी कक्ष: शिक्षण, वसतिगृह, शिष्यवृत्ती व क्रीडा सुविधा'
                  : 'Empowering Student Success, Campus Life & Welfare'}
              </h1>

              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
                {language === 'mr'
                  ? 'महात्मा फुले कृषि विद्यापीठ राहुरी अंतर्गत १० घटक महाविद्यालये व पदव्युत्तर संस्थेमधील विद्यार्थ्यांसाठी केंद्रीभूत प्रवेश, अद्ययावत वसतिगृहे, क्रीडा संकुल, शिष्यवृत्ती आणि २४ तास विद्यार्थी सहाय्य.'
                  : 'Centralized access to admissions, modern residential hostels, gymnasium facilities, merit scholarships, anti-ragging support, and academic guidance for all enrolled scholars.'}
              </p>

              {/* Quick Summary Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {[
                  { label: language === 'mr' ? 'मुला-मुलींची वसतिगृहे' : 'Boys & Girls Hostels', icon: Building2 },
                  { label: language === 'mr' ? 'आंतर-महाविद्यालयीन क्रीडा' : 'Agrisports Gymkhana', icon: Trophy },
                  { label: language === 'mr' ? 'महाडीबीटी व आयसीएआर शिष्यवृत्ती' : 'ICAR & State Scholarships', icon: DollarSign },
                  { label: language === 'mr' ? 'रॅगिंग विरोधी संरक्षण' : 'Zero-Tolerance Anti-Ragging', icon: ShieldAlert }
                ].map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-emerald-200 font-medium"
                  >
                    <chip.icon className="w-3.5 h-3.5 text-amber-300" />
                    <span>{chip.label}</span>
                  </span>
                ))}
              </div>

            </div>

            {/* Listen & Print Action Buttons */}
            <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => (isSpeaking ? stopSpeech() : speakContent())}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                    : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-600" />
                    <span>{language === 'mr' ? 'थांबवा' : 'Stop Audio'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-300" />
                    <span>{language === 'mr' ? 'मजकूर ऐका' : 'Listen'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>{language === 'mr' ? 'प्रिंट करा' : 'Print Page'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Fast-Track Action Cards Grid (8 Core Student Verticals) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {language === 'mr' ? 'विद्यार्थी मुख्य सेवा व थेट दालने' : 'Core Student Portals & Gateways'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {language === 'mr' ? '८ अधिकृत सेवा' : '8 Official Gateways'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {studentActionCards.map((card) => {
            const Icon = card.icon;
            const CardContent = (
              <div className="h-full p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-xs group-hover:scale-108 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 border border-stone-200">
                      {getBilingual(card.badge)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {getBilingual(card.title)}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {getBilingual(card.subtitle)}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-900">
                  <span>{language === 'mr' ? 'दालन उघडा' : 'Access Portal'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );

            if (card.onClick) {
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={card.onClick}
                  className="block text-left w-full cursor-pointer"
                >
                  {CardContent}
                </button>
              );
            }

            return (
              <Link key={card.id} href={card.href} className="block">
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Tabbed Deep-Dive Section: Facilities, Scholarships & Emergency Helpline */}
      <div id="scholarships-section" className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          
          {/* Tab Headers */}
          <div className="flex items-center border-b border-stone-200 bg-stone-50/80 px-4 sm:px-8 pt-3 gap-2 sm:gap-4 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'services'
                  ? 'border-emerald-700 text-emerald-900 font-extrabold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>{language === 'mr' ? 'कॅम्पस सुविधा व वसतिगृहे' : 'Campus Facilities & Life'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('scholarships')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'scholarships'
                  ? 'border-emerald-700 text-emerald-900 font-extrabold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-700" />
              <span>{language === 'mr' ? 'शिष्यवृत्ती व आर्थिक सहाय्य' : 'Scholarships & Financial Aid'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('helpline')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'helpline'
                  ? 'border-emerald-700 text-emerald-900 font-extrabold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>{language === 'mr' ? 'अँटी-रॅगिंग हेल्पलाइन व सुरक्षा' : 'Anti-Ragging & Emergency Desk'}</span>
            </button>
          </div>

          {/* Tab Content 1: Campus Facilities */}
          {activeTab === 'services' && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white w-fit shadow-xs">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    {language === 'mr' ? 'मुला-मुलींसाठी अद्ययावत वसतिगृहे' : 'Hostel & Residential Amenities'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {language === 'mr'
                      ? 'राहुरी मुख्य परिसर आणि सर्व घटक महाविद्यालयांमध्ये स्वतंत्र सुसज्ज मुला-मुलींची वसतिगृहे, २४ तास शुद्ध आरओ पाणी, सौर जलतापक, मेस भोजनालय आणि सुरक्षा व्यवस्था.'
                      : 'Separate boy’s and girl’s hostels with study tables, high-speed Wi-Fi connectivity, cooperative dining messes, solar water heating, and 24/7 security presence.'}
                  </p>
                  <Link
                    href="/students/hostels"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 mt-2"
                  >
                    <span>{language === 'mr' ? 'वसतिगृह नियमावली पहा' : 'View Hostel Guidelines'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-3">
                  <div className="p-2.5 rounded-xl bg-amber-600 text-white w-fit shadow-xs">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    {language === 'mr' ? 'क्रीडा संकुल व जिमखाना' : 'Sports Complex & Physical Fitness'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {language === 'mr'
                      ? '४०० मीटर ॲथलेटिक ट्रॅक, आंतरराष्ट्रीय दर्जाचे बॅडमिंटन व व्हॉलीबॉल कोर्ट, सुसज्ज आधुनिक जिम, आणि राष्ट्रीय कृषी क्रीडा महोत्सवात विद्यापीठाचे सातत्यपूर्ण यश.'
                      : '400m running track, indoor gymnasium, basketball, kabaddi, and cricket pavilions with seasoned coaches preparing squads for all-India Agrisports tournaments.'}
                  </p>
                  <Link
                    href="/students/sports"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 mt-2"
                  >
                    <span>{language === 'mr' ? 'क्रीडा दालन पहा' : 'View Sports Facilities'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
                  <div className="p-2.5 rounded-xl bg-sky-600 text-white w-fit shadow-xs">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    {language === 'mr' ? 'डिजिटल लायब्ररी व अभ्यासिका' : 'Digital Library & Reading Halls'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {language === 'mr'
                      ? '१,००,००० हून अधिक ग्रंथ, CeRA द्वारे आंतरराष्ट्रीय जर्नल्सचा थेट ई-प्रवेश, स्पर्धा परीक्षा अभ्यासिका आणि रात्र अभ्यास दालन सुविधा.'
                      : 'Access to 100,000+ volumes, CeRA consortium journals, electronic theses repository, air-conditioned reading halls, and UPSC/MPSC competitive exam cells.'}
                  </p>
                  <Link
                    href="/central-library-rahuri"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 hover:text-sky-950 mt-2"
                  >
                    <span>{language === 'mr' ? 'सेंट्रल लायब्ररी पहा' : 'Explore Central Library'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          )}

          {/* Tab Content 2: Scholarships */}
          {activeTab === 'scholarships' && (
            <div className="p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scholarships.map((sch, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3 hover:border-emerald-300 transition-colors">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200">
                          {getBilingual(sch.tag)}
                        </span>
                        <Award className="w-4 h-4 text-amber-500" />
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {getBilingual(sch.name)}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">{language === 'mr' ? 'पात्रता: ' : 'Eligibility: '}</strong>
                        {getBilingual(sch.eligibility)}
                      </p>
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-100">
                        <strong>{language === 'mr' ? 'लाभ: ' : 'Benefit: '}</strong>
                        {getBilingual(sch.benefits)}
                      </div>
                    </div>

                    <div className="pt-2">
                      {sch.portal.startsWith('http') ? (
                        <a
                          href={sch.portal}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                        >
                          <span>{language === 'mr' ? 'अधिकृत पोर्टलवर अर्ज करा' : 'Apply on Portal'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link
                          href={sch.portal}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                        >
                          <span>{language === 'mr' ? 'अधिक माहिती पहा' : 'View Details'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 3: Anti-Ragging & Emergency Helpline */}
          {activeTab === 'helpline' && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                <div className="flex items-center gap-2.5 text-rose-800 font-extrabold text-base sm:text-lg">
                  <ShieldAlert className="w-5 h-5 text-rose-700" />
                  <span>{language === 'mr' ? 'रॅगिंग प्रतिबंध वैधानिक नियम व शून्य सहनशीलता' : 'Statutory Zero-Tolerance Anti-Ragging Mandate'}</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-950 leading-relaxed font-normal">
                  {language === 'mr'
                    ? 'महात्मा फुले कृषि विद्यापीठ परिसरामध्ये अथवा वसतिगृहात कोणत्याही स्वरूपाचे रॅगिंग करणे हा कायद्याने अजामीनपात्र गुन्हा आहे. रॅगिंग करणाऱ्यावर तत्काळ निलंबन, एफआयआर नोंदवणे व शैक्षणिक कारवाई केली जाते.'
                    : 'Ragging in any form across campus hostels, sports complexes, or classrooms is strictly prohibited under the Maharashtra Prohibition of Ragging Act and UGC / ICAR Regulations. Violators face immediate suspension, hostel expulsion, and legal FIR.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {language === 'mr' ? 'राष्ट्रीय २४ तास टोल-फ्री हेल्पलाइन' : 'National 24x7 Anti-Ragging Helpline'}
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-rose-700">
                    1800-180-5522
                  </div>
                  <p className="text-xs text-slate-600">
                    {language === 'mr' ? 'टोल-फ्री नंबर (विनामूल्य व २४ तास उपलब्ध)' : 'Toll-free, round-the-clock emergency assistance'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {language === 'mr' ? 'विद्यापीठ विद्यार्थी कल्याण अधिकारी (DSW)' : 'Dean Students Welfare (DSW) Office'}
                  </span>
                  <div className="text-lg font-bold text-slate-900">
                    02426-243205 / 243206
                  </div>
                  <p className="text-xs text-slate-600">
                    Email: <span className="font-semibold text-emerald-800">dsw.mpkv@gov.in</span> · Central Campus, Rahuri
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href="/students/complaints"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-300" />
                  <span>{language === 'mr' ? 'ऑनलाइन तक्रार नोंदवा' : 'File Confidential Student Grievance'}</span>
                </Link>
                <span className="text-xs text-slate-500">
                  {language === 'mr' ? 'तक्रारदाराचे नाव पूर्णपणे गोपनीय ठेवले जाते.' : 'All complaints are handled with strict statutory confidentiality.'}
                </span>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
