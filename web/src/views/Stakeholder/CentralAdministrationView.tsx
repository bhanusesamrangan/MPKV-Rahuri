'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Users,
  Award,
  ShieldCheck,
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft,
  Home,
  FileText,
  Scale,
  Sparkles,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Search,
  X,
  Filter,
  Layers,
  Briefcase,
  Clock,
  ArrowRight,
  GitFork,
  ArrowDown,
  ChevronDown,
  Check,
  UserCheck,
  Network
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AdminDocItem {
  srNo: string;
  title: { en: string; mr: string };
  fileUrl: string;
}

interface AdminSection {
  key: string;
  title: { en: string; mr: string };
  desc: { en: string; mr: string };
  itemCount: number;
  items: AdminDocItem[];
}

interface CentralAdministrationViewProps {
  pageData?: any;
}

export const CentralAdministrationView: React.FC<CentralAdministrationViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [chartViewMode, setChartViewMode] = useState<'tree' | 'desks'>('tree');
  const [activeDeskHighlight, setActiveDeskHighlight] = useState<string | null>(null);
  const pageSize = 25;

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  const adminSections: Record<string, AdminSection> = pageData?.adminSections || {};
  const orgChartImage = pageData?.orgChartImage || '/media/images/registrar_office_org_chart.jpg';

  const executiveOfficers = [
    {
      role: { en: 'Hon. Vice-Chancellor', mr: 'मा. कुलगुरू' },
      name: { en: 'Dr. Vilas K. Kharche', mr: 'डॉ. विलास के. खर्चे' },
      cadre: { en: 'Chief Academic & Executive Head', mr: 'विद्यापीठाचे मुख्य कार्यकारी व शैक्षणिक प्रमुख' },
      phone: '02426-243208 / 243216',
      email: 'vc.mpkv@gov.in',
      mandate: {
        en: 'Overall executive governance, academic policy formulation, Chancellor liaison, and presiding officer of Executive Council.',
        mr: 'विद्यापीठाचे सर्वोच्च प्रशासकीय संचलन, कुलपती समन्वय व कार्यकारी परिषदेचे अध्यक्षस्थान.'
      },
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300'
    },
    {
      role: { en: 'Office of the Registrar', mr: 'कुलसचिव कार्यालय' },
      name: { en: 'Shri. G. B. Patil', mr: 'श्री. जी. बी. पाटील' },
      cadre: { en: 'Statutory Administrative Head', mr: 'वैधानिक प्रशासकीय प्रमुख' },
      phone: '02426-243216',
      email: 'registrar.mpkv@nic.in',
      mandate: {
        en: 'General administration, statutory meetings, university legal affairs, RTI First Appellate Authority, and university seal custodian.',
        mr: 'सर्वसाधारण प्रशासन, वैधानिक बैठका, कायदेशीर बाबी, प्रथम अपिलीय अधिकारी व विद्यापीठ मुद्रा अभिरक्षक.'
      },
      tagColor: 'bg-emerald-100 text-emerald-950 border-emerald-300'
    },
    {
      role: { en: 'Office of the Comptroller', mr: 'नियंत्रक (वित्त व लेखा) कार्यालय' },
      name: { en: 'Comptroller (Finance & Accounts)', mr: 'नियंत्रक (वित्त व लेखा विभाग)' },
      cadre: { en: 'Chief Financial Advisor', mr: 'मुख्य वित्तीय सल्लागार' },
      phone: '02426-243214',
      email: 'comptroller.mpkv@gov.in',
      mandate: {
        en: 'Annual budget formulation, State Government grant disbursals, financial auditing, internal accounts, and pension disbursement.',
        mr: 'वार्षिक अंदाजपत्रक निर्मिती, शासकीय अनुदान वितरण, वित्तीय लेखापरीक्षण व वेतन-निवृत्तीवेतन संचलन.'
      },
      tagColor: 'bg-blue-100 text-blue-950 border-blue-300'
    },
    {
      role: { en: 'Directorate of Research', mr: 'संशोधन संचालनालय' },
      name: { en: 'Dr. S. B. Kharbade', mr: 'डॉ. एस. बी. खराबाडे' },
      cadre: { en: 'Director of Research', mr: 'संचालक संशोधन' },
      phone: '02426-243223',
      email: 'dor.mpkv@mpkv.ac.in',
      mandate: {
        en: 'Strategic direction of 27 research stations, 36 ICAR-AICRP projects, varietal releases, and agricultural patent management.',
        mr: '२७ संशोधन केंद्रे, ३६ अखिल भारतीय समन्वित प्रकल्प, पीक वाण निर्मिती व कृषी पेटंट्सचे व्यवस्थापन.'
      },
      tagColor: 'bg-purple-100 text-purple-950 border-purple-300'
    },
    {
      role: { en: 'Directorate of Extension Education', mr: 'विस्तार शिक्षण संचालनालय' },
      name: { en: 'Dr. C. S. Patil', mr: 'डॉ. सी. एस. पाटील' },
      cadre: { en: 'Director of Extension Education', mr: 'संचालक विस्तार शिक्षण' },
      phone: '02426-243206',
      email: 'deempkv@gmail.com',
      mandate: {
        en: 'Farmer outreach across 10 Western Maharashtra districts, ATIC, 4 KVKs, Krishidarshani publication, and Kisan Call Center.',
        mr: 'पश्चिम महाराष्ट्रातील १० जिल्ह्यांमध्ये कृषी तंत्रज्ञान प्रसार, अॅटिक, ४ केव्हीके व कृषीदर्शनी प्रकाशन.'
      },
      tagColor: 'bg-cyan-100 text-cyan-950 border-cyan-300'
    },
    {
      role: { en: 'Dean & Director of Instructions', mr: 'अधिष्ठाता व शिक्षण संचालनालय' },
      name: { en: 'Dean, Faculty of Agriculture', mr: 'अधिष्ठाता (कृषि विद्याशाखा)' },
      cadre: { en: 'Apex Academic Dean', mr: 'सर्वोच्च शैक्षणिक अधिष्ठाता' },
      phone: '02426-243205',
      email: 'dean.mpkv@gov.in',
      mandate: {
        en: 'Academic curricula standards, accreditation compliance (NAEAB), 10 constituent colleges, and Post Graduate Institute (PGI).',
        mr: 'शैक्षणिक गुणवत्ता नियंत्रण, आयसीएआर अधिस्वीकृती, १० घटक महाविद्यालये व पदव्युत्तर संस्थेचे संचलन.'
      },
      tagColor: 'bg-rose-100 text-rose-950 border-rose-300'
    },
    {
      role: { en: 'University Engineer Office', mr: 'विद्यापीठ अभियंता कार्यालय' },
      name: { en: 'University Engineer / Estate Officer', mr: 'कार्यकारी अभियंता व संपदा अधिकारी' },
      cadre: { en: 'Head of Infrastructure & Works', mr: 'बांधकाम व पायाभूत सुविधा प्रमुख' },
      phone: '02426-243272',
      email: 'ue.mpkv@gmail.com',
      mandate: {
        en: 'Campus master planning across 3,200 hectares, capital civil construction, solar power generation, and campus water distribution.',
        mr: '३,२०० हेक्टर कॅम्पसचे नियोजन, स्थापत्य बांधकाम, सौर ऊर्जा प्रकल्प व अखंडित पाणीपुरवठा व्यवस्था.'
      },
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300'
    }
  ];

  const adminContacts = pageData?.adminContacts || [
    {
      name: { en: 'Smt. Swati Deepak Nikam', mr: 'श्रीमती स्वाती दिपक निकम' },
      designation: { en: 'Deputy Registrar (Administration)', mr: 'उपकुलसचिव (प्रशासन)' },
      phone: '02426-243366',
      email: 'dradmnmpkv@rediffmail.com',
      office: { en: 'Administrative Building, MPKV, Rahuri', mr: 'प्रशासकीय इमारत, म.फु.कृ.वि., राहुरी' }
    },
    {
      name: { en: 'Shri. G. B. Patil', mr: 'श्री. जी. बी. पाटील' },
      designation: { en: 'Registrar', mr: 'कुलसचिव' },
      phone: '02426-243216',
      email: 'registrar.mpkv@nic.in',
      office: { en: 'Registrar Secretariat, Central Campus, Rahuri', mr: 'कुलसचिव सचिवालय, मध्यवर्ती संकुल, राहुरी' }
    },
    {
      name: { en: 'Comptroller Office', mr: 'नियंत्रक कार्यालय' },
      designation: { en: 'Comptroller (Finance & Accounts)', mr: 'नियंत्रक (वित्त व लेखा)' },
      phone: '02426-243214',
      email: 'comptroller.mpkv@gov.in',
      office: { en: 'Finance & Accounts Directorate, Rahuri', mr: 'वित्त व लेखा संचलनालय, राहुरी' }
    }
  ];

  // Statutory Organogram Functional Desks Structure (derived from Official Registrar Office Chart)
  const organogramDesks = [
    {
      id: 'section_a',
      wing: 'admin',
      code: { en: 'Section A', mr: 'अ शाखा' },
      title: { en: 'Section A (Establishment)', mr: 'अ शाखा (आस्थापना विभाग)' },
      scope: {
        en: 'Service books, confidential reports (ACR/PAR), promotions, seniority rosters & verification.',
        mr: 'सेवा पुस्तके, गोपनीय अहवाल (CR), पदोन्नती, सेवा ज्येष्ठता याद्या व रोस्टर पडताळणी.'
      },
      roles: [
        { en: 'Office Superintendent', mr: 'कार्यालय अधीक्षक' },
        { en: 'Assistant Superintendent', mr: 'सहाय्यक अधीक्षक' },
        { en: 'Senior Clerk / Clerk-Typist', mr: 'वरिष्ठ लिपीक / टंकलेखक' }
      ],
      supportStaff: { en: 'Peon / Laborer / Driver', mr: 'शिपाई / मजूर / वाहन चालक' }
    },
    {
      id: 'section_b',
      wing: 'admin',
      code: { en: 'Section B', mr: 'ब शाखा' },
      title: { en: 'Section B (General Administration)', mr: 'ब शाखा (सर्वसाधारण प्रशासन)' },
      scope: {
        en: 'General administration, central stores, procurement, e-tenders, university estate upkeep & vehicle pool.',
        mr: 'सर्वसाधारण प्रशासन, मध्यवर्ती भांडार, खरेदी व ई-निविदा, संकुल देखभाल व वाहन व्यवस्थापन.'
      },
      roles: [
        { en: 'Office Superintendent', mr: 'कार्यालय अधीक्षक' },
        { en: 'Assistant Superintendent', mr: 'सहाय्यक अधीक्षक' },
        { en: 'Senior Clerk / Clerk-Typist', mr: 'वरिष्ठ लिपीक / टंकलेखक' }
      ],
      supportStaff: { en: 'Peon / Laborer / Driver', mr: 'शिपाई / मजूर / वाहन चालक' }
    },
    {
      id: 'section_d',
      wing: 'admin',
      code: { en: 'Section D', mr: 'ड शाखा' },
      title: { en: 'Section D (Finance & Audit)', mr: 'ड शाखा (वित्त, अंदाजपत्रक व लेखापरीक्षण)' },
      scope: {
        en: 'Annual budget allocation, pay fixation, AG audit compliances, State grants & internal auditing.',
        mr: 'अंदाजपत्रक वाटप, वेतन पडताळणी, महालेखापाल (AG) व स्थानिक निधी लेखापरीक्षण अनुपालन.'
      },
      roles: [
        { en: 'Office Superintendent', mr: 'कार्यालय अधीक्षक' },
        { en: 'Assistant Superintendent', mr: 'सहाय्यक अधीक्षक' },
        { en: 'Senior Clerk / Clerk-Typist', mr: 'वरिष्ठ लिपीक / टंकलेखक' }
      ],
      supportStaff: { en: 'Peon / Laborer / Driver', mr: 'शिपाई / मजूर / वाहन चालक' }
    },
    {
      id: 'pension_cell',
      wing: 'admin',
      code: { en: 'Pension Cell', mr: 'निवृत्ती वेतन कक्ष' },
      title: { en: 'Pension & Retirement Benefits Cell', mr: 'निवृत्ती वेतन कक्ष' },
      scope: {
        en: 'Retirement gratuity, pension sanction proposals, family pension, GPF & DCPS settlement.',
        mr: 'सेवानिवृत्ती उपदान, निवृत्तीवेतन मंजुरी, कुटुंब निवृत्तीवेतन, भविष्य निर्वाह निधी (GPF) व DCPS निकाली काढणे.'
      },
      roles: [
        { en: 'Office Superintendent', mr: 'कार्यालय अधीक्षक' },
        { en: 'Assistant Superintendent', mr: 'सहाय्यक अधीक्षक' },
        { en: 'Senior Clerk / Clerk-Typist', mr: 'वरिष्ठ लिपीक / टंकलेखक' }
      ],
      supportStaff: { en: 'Peon / Laborer / Driver', mr: 'शिपाई / मजूर / वाहन चालक' }
    },
    {
      id: 'legal_cell',
      wing: 'admin',
      code: { en: 'Legal Cell', mr: 'विधी शाखा' },
      title: { en: 'Legal & Judicial Affairs Cell', mr: 'विधी शाखा (न्यायालयीन कक्ष)' },
      scope: {
        en: 'High Court & Supreme Court litigations, government pleader coordination, legal opinion & arbitration.',
        mr: 'उच्च न्यायालय व सर्वोच्च न्यायालय याचिका, विधी सल्ला, शासकीय वकील समन्वय व लवाद प्रकरणे.'
      },
      roles: [
        { en: 'Office Superintendent', mr: 'कार्यालय अधीक्षक' },
        { en: 'Assistant Superintendent', mr: 'सहाय्यक अधीक्षक' },
        { en: 'Senior Clerk / Clerk-Typist', mr: 'वरिष्ठ लिपीक / टंकलेखक' }
      ],
      supportStaff: { en: 'Peon / Laborer / Driver', mr: 'शिपाई / मजूर / वाहन चालक' }
    },
    {
      id: 'academic_wing',
      wing: 'academic',
      code: { en: 'Academic Wing', mr: 'विद्या शाखा' },
      title: { en: 'Academic & Statutory Authorities Wing', mr: 'विद्या शाखा व प्राधिकरण कक्ष' },
      scope: {
        en: 'Academic Council, Executive Council, student admissions, university regulations, convocation & Deans coordination.',
        mr: 'विद्या परिषद, कार्यकारी परिषद, पदवी प्रवेश, अधिष्ठाता समन्वय, दीक्षांत समारंभ व शैक्षणिक अध्यादेश.'
      },
      roles: [
        { en: 'Office Superintendent (Academic)', mr: 'कार्यालय अधीक्षक (विद्या)' },
        { en: 'Assistant Superintendent (Academic)', mr: 'सहाय्यक अधीक्षक (विद्या)' },
        { en: 'Senior Clerk / Clerk-Typist', mr: 'वरिष्ठ लिपीक / टंकलेखक' }
      ],
      supportStaff: { en: 'Peon / Attendant / Laborer / Guest House Attendant', mr: 'शिपाई / खलाशी / मजूर / अतिथीगृह परीचर' }
    }
  ];

  // Navigation tab definitions
  const tabsList = [
    { key: 'profile', labelEn: 'Organizational Profile', labelMr: 'संस्थात्मक रचना', count: null, icon: Building2 },
    { key: 'seniority_list', labelEn: 'Seniority Lists', labelMr: 'सेवा ज्येष्ठता सूची', count: adminSections.seniority_list?.itemCount || 433, icon: FileText },
    { key: 'human_resource', labelEn: 'Human Resource', labelMr: 'मानव संसाधन', count: adminSections.human_resource?.itemCount || 5, icon: Users },
    { key: 'vacant_position', labelEn: 'Vacant Positions', labelMr: 'रिक्त पदे', count: adminSections.vacant_position?.itemCount || 13, icon: Briefcase },
    { key: 'admin_orders', labelEn: 'Administrative Orders', labelMr: 'प्रशासकीय आदेश', count: adminSections.admin_orders?.itemCount || 65, icon: Award },
    { key: 'recruitment', labelEn: 'Recruitment', labelMr: 'भरती व जाहिराती', count: adminSections.recruitment?.itemCount || 378, icon: Sparkles },
    { key: 'university_resolutions', labelEn: 'Resolutions (UR)', labelMr: 'विद्यापीठ ठराव (UR)', count: adminSections.university_resolutions?.itemCount || 139, icon: Scale },
    { key: 'circulars', labelEn: 'Circulars', labelMr: 'परिपत्रके', count: adminSections.circulars?.itemCount || 42, icon: Layers },
    { key: 'pensioners', labelEn: 'Pensioners', labelMr: 'निवृत्तीवेतन', count: adminSections.pensioners?.itemCount || 3, icon: CheckCircle2 },
    { key: 'contact', labelEn: 'Contact Directory', labelMr: 'प्रशासकीय संपर्क', count: null, icon: Phone }
  ];

  // Current active section items
  const currentSection = adminSections[activeTab];

  // Filtered items based on search query
  const filteredItems = useMemo(() => {
    if (!currentSection || !Array.isArray(currentSection.items)) return [];
    if (!searchQuery.trim()) return currentSection.items;

    const q = searchQuery.toLowerCase().trim();
    return currentSection.items.filter((item) => {
      const tEn = item.title?.en?.toLowerCase() || '';
      const tMr = item.title?.mr?.toLowerCase() || '';
      return tEn.includes(q) || tMr.includes(q);
    });
  }, [currentSection, searchQuery]);

  // Paginated items
  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage]);

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
          <span className="text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md">
            {language === 'mr' ? 'मध्यवर्ती प्रशासन' : 'Central Administration'}
          </span>
          {activeTab !== 'profile' && (
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

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-4xl">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'mr' ? 'सर्वोच्च प्रशासकीय संचलन व कुलसचिव सचिवालय' : 'Apex Governance & Central Administration'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-amber-300 font-semibold">{language === 'mr' ? 'राहुरी मध्यवर्ती संकुल' : 'Rahuri Central Campus'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-serif leading-tight">
                {language === 'mr'
                  ? 'विद्यापीठ मध्यवर्ती प्रशासन व प्रशासकीय रचना'
                  : 'Central Administration & Governance Profile'}
              </h1>

              <p className="text-emerald-100/90 text-xs sm:text-sm lg:text-[14px] leading-relaxed font-normal max-w-3xl">
                {language === 'mr'
                  ? 'महाराष्ट्र कृषी विद्यापीठे कायदा १९८३ नुसार विद्यापीठाचे शिक्षण, संशोधन व विस्तार या त्रिसूत्री उद्दिष्टांची प्रभावी अंमलबजावणी करणारी मध्यवर्ती प्रशासकीय यंत्रणा, कुलसचिव कार्यालय, ज्येष्ठता सूची व भरती दालन.'
                  : 'The statutory leadership, Registrar Secretariat, executive directorates, financial governance, and administrative secretariats steering MPKV’s mandate across 10 Western Maharashtra districts.'}
              </p>

              {/* Quick Stat Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-emerald-200 font-semibold">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'mr' ? 'कुलपती: राज्यपाल, महाराष्ट्र' : 'Chancellor: Governor of Maharashtra'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-emerald-200 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'mr' ? 'कुलगुरू: मुख्य कार्यकारी प्रमुख' : 'Vice-Chancellor: Chief Executive'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-emerald-200 font-semibold">
                  <FileText className="w-3.5 h-3.5 text-emerald-300" />
                  <span>1,070+ {language === 'mr' ? 'अधिकृत दस्तऐवज व आदेश' : 'Official Records & Orders'}</span>
                </span>
              </div>

            </div>

            {/* Quick Link to RTI / Governance Transparency */}
            <div className="lg:max-w-xs w-full p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white space-y-2.5 shrink-0 shadow-sm">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>{language === 'mr' ? 'पारदर्शकता व लोकसेवा' : 'Statutory Transparency'}</span>
              </div>
              <h3 className="font-bold text-sm leading-snug">
                {language === 'mr' ? 'माहिती अधिकार व लोकसेवा हमी कक्ष' : 'RTI Act 2005 & Public Services Hub'}
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {language === 'mr'
                  ? 'विद्यापीठाच्या पारदर्शकता धोरण व जनमाहिती अधिकाऱ्यांची सूची पहा.'
                  : 'View university transparency officer directory and statutory disclosures.'}
              </p>
              <Link
                href="/transparency-rti"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-colors"
              >
                <span>{language === 'mr' ? 'माहिती अधिकार कक्ष' : 'View Transparency (RTI)'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Main Navigation & Content Section */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16 space-y-8">

        {/* 10 Unique Administration Tabs Strip (Guaranteed flex-wrap with inline styles to prevent any browser/CSS clipping) */}
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
        {/* VIEW 1: ORGANIZATIONAL PROFILE (Apex Hierarchy + Org Chart Image) */}
        {/* ================================================================= */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            
            {/* 1a. Apex Statutory Hierarchy Cards (Chancellor, Pro-Chancellor, VC) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Scale className="w-4 h-4 text-emerald-700" />
                <span>{language === 'mr' ? 'वैधानिक प्रशासकीय उतरंड' : 'Statutory Governance Hierarchy'}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-1.5 shadow-2xs">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 px-2 py-0.5 rounded-full bg-amber-100/80">
                    {language === 'mr' ? 'कुलपती' : 'Chancellor'}
                  </span>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 font-serif">
                    {language === 'mr' ? 'मा. राज्यपाल, महाराष्ट्र राज्य' : 'Hon. Governor of Maharashtra'}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {language === 'mr' ? 'विद्यापीठाचे सर्वोच्च संविधानिक प्रमुख व कुलपती' : 'Supreme Constitutional Head of University'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-1.5 shadow-2xs">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-100/80">
                    {language === 'mr' ? 'कुलपती-उपाध्यक्ष' : 'Pro-Chancellor'}
                  </span>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 font-serif">
                    {language === 'mr' ? 'मा. कृषिमंत्री, महाराष्ट्र राज्य' : 'Hon. Minister for Agriculture, GoM'}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {language === 'mr' ? 'कृषी शिक्षण व विद्यापीठ धोरण प्रमुख' : 'Agricultural Policy & Legislative Oversight'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-center space-y-1.5 shadow-2xs">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 px-2 py-0.5 rounded-full bg-blue-100/80">
                    {language === 'mr' ? 'कुलगुरू' : 'Vice-Chancellor'}
                  </span>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 font-serif">
                    Dr. Vilas K. Kharche
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {language === 'mr' ? 'मुख्य कार्यकारी व शैक्षणिक अधिकारी' : 'Chief Executive & Academic Head of University'}
                  </p>
                </div>
              </div>
            </div>

            {/* 1b. Official Registrar Office Statutory Organizational Chart Tree View */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              {/* Header & View Switcher */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                    <Network className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'संस्थात्मक रचना • पदसोपान वृक्ष' : 'Statutory Organogram • Tree View'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    {language === 'mr'
                      ? 'कुलसचिव कार्यालय — अधिकृत संस्थात्मक रचना'
                      : 'Registrar Office — Official Statutory Organizational Tree'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-3xl">
                    {language === 'mr'
                      ? 'महाराष्ट्र कृषी विद्यापीठ कायदा १९८३ अन्वये कुलगुरू व कुलसचिव यांच्या मार्गदर्शनाखालील प्रशासन व विद्या विभागांची अधिकृत प्रशासकीय रचना.'
                      : 'Official governance hierarchy under the Maharashtra Agricultural Universities Act, 1983 — Vice-Chancellor, Registrar, Deputy Registrars, and operational desks.'}
                  </p>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 self-start lg:self-center shrink-0 p-1 rounded-2xl bg-stone-100 border border-stone-200/80">
                  <button
                    type="button"
                    onClick={() => setChartViewMode('tree')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      chartViewMode === 'tree'
                        ? 'bg-emerald-900 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'वृक्ष रचना (Tree View)' : 'Tree View'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChartViewMode('desks')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      chartViewMode === 'desks'
                        ? 'bg-emerald-900 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'शाखा व कक्ष तपशील (Desks)' : 'Desks Breakdown'}</span>
                  </button>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* MODE 1: VISUAL FLOW CHART TREE VIEW                           */}
              {/* ------------------------------------------------------------- */}
              {chartViewMode === 'tree' && (
                <div className="p-4 sm:p-8 rounded-3xl bg-stone-50/80 border border-stone-200/90 space-y-6">
                  
                  {/* LEVEL 1: HON. VICE-CHANCELLOR (कुलगुरू) */}
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-md rounded-2xl bg-gradient-to-r from-emerald-950 via-[#0e3b23] to-emerald-950 text-white p-4 sm:p-5 border-2 border-amber-400 shadow-md text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{language === 'mr' ? 'सर्वोच्च संविधानिक प्रमुख' : 'Supreme Head of University'}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold font-serif text-white">
                        {language === 'mr' ? 'कुलगुरू' : 'Hon. Vice-Chancellor'}
                      </h4>
                      <div className="text-sm font-semibold text-amber-200 mt-0.5">
                        {language === 'mr' ? 'डॉ. विलास के. खर्चे' : 'Dr. Vilas K. Kharche'}
                      </div>
                      <p className="text-[11px] text-emerald-200/80 mt-1 font-medium">
                        {language === 'mr' ? 'मुख्य शैक्षणिक व प्रशासकीय अधिकारी' : 'Chief Academic & Executive Head'}
                      </p>
                    </div>

                    {/* Downward Vertical Connector */}
                    <div className="w-0.5 h-6 bg-emerald-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-emerald-200" />
                    <div className="w-0.5 h-6 bg-emerald-600" />
                  </div>

                  {/* LEVEL 2: REGISTRAR (कुलसचिव) */}
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-lg rounded-2xl bg-white border-2 border-emerald-600 p-4 sm:p-5 shadow-md text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{language === 'mr' ? 'वैधानिक प्रशासकीय प्रमुख' : 'Statutory Administrative Head'}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold font-serif text-slate-900">
                        {language === 'mr' ? 'कुलसचिव' : 'Registrar'}
                      </h4>
                      <div className="text-sm font-bold text-emerald-800 mt-0.5">
                        {language === 'mr' ? 'श्री. जी. बी. पाटील' : 'Shri. G. B. Patil'}
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-stone-600 mt-2 pt-2 border-t border-stone-100">
                        <span className="flex items-center gap-1 font-medium">
                          <Phone className="w-3 h-3 text-emerald-700" />
                          02426-243216
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <Mail className="w-3 h-3 text-emerald-700" />
                          registrar.mpkv@nic.in
                        </span>
                      </div>
                    </div>

                    {/* Downward Connector to Horizontal Branch */}
                    <div className="w-0.5 h-6 bg-emerald-600" />
                  </div>

                  {/* BRANCHING SPLIT LINE (Connects Pillar 1 and Pillar 2) */}
                  <div className="relative w-full max-w-4xl mx-auto hidden lg:block">
                    <div className="h-0.5 bg-emerald-500 w-3/4 mx-auto" />
                    <div className="flex justify-between w-3/4 mx-auto">
                      <div className="w-0.5 h-6 bg-emerald-500" />
                      <div className="w-0.5 h-6 bg-blue-500" />
                    </div>
                  </div>

                  {/* LEVEL 3, 4 & 5: TWO MAIN PILLARS */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* ============================================================== */}
                    {/* PILLAR 1: ADMINISTRATION WING (प्रशासन शाखा) — lg:col-span-8 */}
                    {/* ============================================================== */}
                    <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white border border-emerald-200/90 shadow-xs space-y-5">
                      
                      {/* Wing Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <Building2 className="w-4 h-4 text-emerald-700" />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                              {language === 'mr' ? 'प्रशासन शाखा (Administration Wing)' : 'Administration Wing'}
                            </h4>
                            <p className="text-[11px] text-stone-500">
                              {language === 'mr' ? '५ कार्यकक्ष: आस्थापना, सर्वसाधारण, वित्त, पेन्शन व विधी' : '5 Functional Desks: Establishment, General, Finance, Pension & Legal'}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                          {language === 'mr' ? '५ शाखा व कक्ष' : '5 Functional Desks'}
                        </span>
                      </div>

                      {/* 1. उप-कुलसचिव (प्रशासन) */}
                      <div className="flex flex-col items-center">
                        <div className="w-full max-w-md rounded-2xl bg-emerald-50/80 border border-emerald-300 p-3.5 text-center shadow-2xs">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                            {language === 'mr' ? 'उप-कुलसचिव' : 'Deputy Registrar'}
                          </span>
                          <h5 className="text-sm font-bold text-slate-900 mt-1">
                            {language === 'mr' ? 'उप-कुलसचिव (प्रशासन)' : 'Deputy Registrar (Administration)'}
                          </h5>
                          <div className="text-xs font-bold text-emerald-900 mt-0.5">
                            {language === 'mr' ? 'श्रीमती स्वाती दिपक निकम' : 'Smt. Swati Deepak Nikam'}
                          </div>
                          <p className="text-[10.5px] text-stone-600 mt-0.5">
                            {language === 'mr' ? 'प्रशासकीय संचलन, आस्थापना, सामान्य प्रशासन व वित्त समन्वय' : 'Establishment, General Administration, Legal & Pension Oversight'}
                          </p>
                        </div>

                        {/* Connector down to Assistant Registrar */}
                        <div className="w-0.5 h-5 bg-emerald-400" />
                      </div>

                      {/* 2. सहा. कुलसचिव (प्रशासन) */}
                      <div className="flex flex-col items-center">
                        <div className="w-full max-w-sm rounded-2xl bg-stone-50 border border-stone-200 p-3 text-center shadow-2xs">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-700 bg-stone-200/80 px-2 py-0.5 rounded-full">
                            {language === 'mr' ? 'सहा. कुलसचिव' : 'Assistant Registrar'}
                          </span>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                            {language === 'mr' ? 'सहा. कुलसचिव (प्रशासन)' : 'Assistant Registrar (Administration)'}
                          </h5>
                          <p className="text-[10.5px] text-stone-600 mt-0.5">
                            {language === 'mr' ? '५ प्रशासकीय शाखांचे पर्यवेक्षण व दैनंदिन कामकाज' : 'Supervision & Coordination across 5 Desks'}
                          </p>
                        </div>

                        {/* Connector down to 5 Desks */}
                        <div className="w-0.5 h-5 bg-emerald-400" />
                      </div>

                      {/* 3. The 5 Operational Desks (शाखा व कक्ष) */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 text-center flex items-center justify-center gap-1.5">
                          <Network className="w-3.5 h-3.5" />
                          <span>{language === 'mr' ? '५ कार्यात्मक शाखा व पदसोपान' : '5 Operational Desks & Hierarchy'}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5">
                          {organogramDesks.filter((d) => d.wing === 'admin').map((desk) => {
                            const isHighlighted = activeDeskHighlight === desk.id;
                            return (
                              <div
                                key={desk.id}
                                onClick={() => setActiveDeskHighlight(isHighlighted ? null : desk.id)}
                                className={`p-3 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                                  isHighlighted
                                    ? 'bg-emerald-950 text-white border-emerald-700 ring-2 ring-emerald-500 shadow-md scale-[1.02]'
                                    : 'bg-stone-50 hover:bg-emerald-50/50 border-stone-200/90 hover:border-emerald-300 shadow-2xs'
                                }`}
                              >
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between gap-1">
                                    <span
                                      className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-md ${
                                        isHighlighted ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-900'
                                      }`}
                                    >
                                      {language === 'mr' ? desk.code.mr : desk.code.en}
                                    </span>
                                    <span className={`text-[9px] font-bold ${isHighlighted ? 'text-emerald-200' : 'text-stone-400'}`}>
                                      Desk
                                    </span>
                                  </div>

                                  <h6 className={`text-xs font-bold leading-tight ${isHighlighted ? 'text-white' : 'text-slate-900'}`}>
                                    {language === 'mr' ? desk.title.mr : desk.title.en}
                                  </h6>

                                  <p
                                    className={`text-[10px] leading-relaxed line-clamp-2 ${
                                      isHighlighted ? 'text-emerald-100/90' : 'text-stone-500'
                                    }`}
                                  >
                                    {language === 'mr' ? desk.scope.mr : desk.scope.en}
                                  </p>
                                </div>

                                {/* Step Cadre Hierarchy */}
                                <div className={`mt-2 pt-2 border-t space-y-1 ${isHighlighted ? 'border-emerald-800' : 'border-stone-200'}`}>
                                  <div
                                    className={`text-[9px] font-extrabold uppercase tracking-wider ${
                                      isHighlighted ? 'text-amber-300' : 'text-stone-400'
                                    }`}
                                  >
                                    {language === 'mr' ? 'कर्मचारी उतरंड' : 'Cadre Hierarchy'}
                                  </div>
                                  {desk.roles.map((r, rIdx) => (
                                    <div
                                      key={rIdx}
                                      className={`text-[9.5px] font-medium flex items-center gap-1 ${
                                        isHighlighted ? 'text-emerald-100' : 'text-slate-700'
                                      }`}
                                    >
                                      <ChevronRight className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                                      <span className="truncate">{language === 'mr' ? r.mr : r.en}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 4. Bottom Support Staff Converging Tier */}
                      <div className="pt-2">
                        <div className="w-0.5 h-4 bg-emerald-400 mx-auto" />
                        <div className="p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-0.5 shadow-2xs">
                          <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                            <Users className="w-3 h-3 text-emerald-700" />
                            <span>{language === 'mr' ? 'सहाय्यक सेवा वर्ग' : 'Administrative Subordinate Staff'}</span>
                          </div>
                          <div className="text-xs font-bold text-slate-900">
                            {language === 'mr' ? 'शिपाई / मजूर / वाहन चालक' : 'Peons / Multi-Tasking Laborers / Official Drivers'}
                          </div>
                          <p className="text-[10.5px] text-stone-600">
                            {language === 'mr'
                              ? 'सर्व ५ प्रशासकीय शाखांसाठी क्षेत्र व कार्यालयीन सहाय्यक सेवा'
                              : 'Dedicated logistics, field and office support for Sections A, B, D, Pension & Legal'}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* ============================================================== */}
                    {/* PILLAR 2: ACADEMIC & AUTHORITIES WING — lg:col-span-4          */}
                    {/* ============================================================== */}
                    <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-white border border-blue-200/90 shadow-xs space-y-5">
                      
                      {/* Wing Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                            <Scale className="w-4 h-4 text-blue-700" />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                              {language === 'mr' ? 'विद्या व प्राधिकरण शाखा' : 'Academic & Authorities Wing'}
                            </h4>
                            <p className="text-[11px] text-stone-500">
                              {language === 'mr' ? 'विद्या परिषद, प्रवेश व वैधानिक प्राधिकरणे' : 'Academic Council & Statutory Bodies'}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
                          {language === 'mr' ? 'विद्या विभाग' : 'Academic'}
                        </span>
                      </div>

                      {/* 1. उप-कुलसचिव (विद्या) */}
                      <div className="flex flex-col items-center">
                        <div className="w-full rounded-2xl bg-blue-50/80 border border-blue-300 p-3.5 text-center shadow-2xs">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100/90 px-2 py-0.5 rounded-full">
                            {language === 'mr' ? 'उप-कुलसचिव' : 'Deputy Registrar'}
                          </span>
                          <h5 className="text-sm font-bold text-slate-900 mt-1">
                            {language === 'mr' ? 'उप-कुलसचिव (विद्या)' : 'Deputy Registrar (Academic)'}
                          </h5>
                          <p className="text-[10.5px] text-stone-600 mt-0.5">
                            {language === 'mr' ? 'विद्या परिषद, शैक्षणिक धोरणे व प्रवेश विनियमन प्रमुख' : 'Head of Academic Policy, Council Coordination & Admissions'}
                          </p>
                        </div>

                        {/* Connector down to Assistant Registrar */}
                        <div className="w-0.5 h-5 bg-blue-400" />
                      </div>

                      {/* 2. सहा. कुलसचिव (काव्य/प्राधिकरण) */}
                      <div className="flex flex-col items-center">
                        <div className="w-full rounded-2xl bg-stone-50 border border-stone-200 p-3 text-center shadow-2xs">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-700 bg-stone-200/80 px-2 py-0.5 rounded-full">
                            {language === 'mr' ? 'सहा. कुलसचिव' : 'Assistant Registrar'}
                          </span>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                            {language === 'mr' ? 'सहा. कुलसचिव (काव्य/प्राधिकरण)' : 'Assistant Registrar (Authorities)'}
                          </h5>
                          <p className="text-[10.5px] text-stone-600 mt-0.5">
                            {language === 'mr' ? 'प्राधिकरण बैठका, अध्यादेश, पदवीदान व शैक्षणिक कामकाज' : 'Statutory Council Meetings, Ordinances & Convocation'}
                          </p>
                        </div>

                        {/* Connector down to Academic Desk */}
                        <div className="w-0.5 h-5 bg-blue-400" />
                      </div>

                      {/* 3. The Academic & Statutory Authorities Wing Card */}
                      {organogramDesks.filter((d) => d.wing === 'academic').map((desk) => {
                        const isHighlighted = activeDeskHighlight === desk.id;
                        return (
                          <div
                            key={desk.id}
                            onClick={() => setActiveDeskHighlight(isHighlighted ? null : desk.id)}
                            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                              isHighlighted
                                ? 'bg-blue-950 text-white border-blue-700 ring-2 ring-blue-500 shadow-md scale-[1.01]'
                                : 'bg-stone-50 hover:bg-blue-50/50 border-stone-200/90 hover:border-blue-300 shadow-2xs'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-1">
                                <span
                                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                                    isHighlighted ? 'bg-amber-400 text-slate-950' : 'bg-blue-100 text-blue-900'
                                  }`}
                                >
                                  {language === 'mr' ? desk.code.mr : desk.code.en}
                                </span>
                                <span className={`text-[9px] font-bold ${isHighlighted ? 'text-blue-200' : 'text-stone-400'}`}>
                                  Statutory Council
                                </span>
                              </div>

                              <h6 className={`text-xs sm:text-sm font-bold ${isHighlighted ? 'text-white' : 'text-slate-900'}`}>
                                {language === 'mr' ? desk.title.mr : desk.title.en}
                              </h6>

                              <p className={`text-[11px] leading-relaxed ${isHighlighted ? 'text-blue-100/90' : 'text-stone-600'}`}>
                                {language === 'mr' ? desk.scope.mr : desk.scope.en}
                              </p>
                            </div>

                            {/* Step Cadre Hierarchy */}
                            <div className={`mt-3 pt-3 border-t space-y-1.5 ${isHighlighted ? 'border-blue-800' : 'border-stone-200'}`}>
                              <div
                                className={`text-[9.5px] font-extrabold uppercase tracking-wider ${
                                  isHighlighted ? 'text-amber-300' : 'text-stone-400'
                                }`}
                              >
                                {language === 'mr' ? 'कर्मचारी उतरंड' : 'Cadre Hierarchy'}
                              </div>
                              {desk.roles.map((r, rIdx) => (
                                <div
                                  key={rIdx}
                                  className={`text-[10.5px] font-medium flex items-center gap-1.5 ${
                                    isHighlighted ? 'text-blue-100' : 'text-slate-700'
                                  }`}
                                >
                                  <ChevronRight className="w-3 h-3 text-blue-500 shrink-0" />
                                  <span>{language === 'mr' ? r.mr : r.en}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}

                      {/* 4. Bottom Support Staff Converging Tier */}
                      <div className="pt-2">
                        <div className="w-0.5 h-4 bg-blue-400 mx-auto" />
                        <div className="p-3 rounded-2xl bg-blue-50/90 border border-blue-200 text-center space-y-0.5 shadow-2xs">
                          <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-800">
                            <Users className="w-3 h-3 text-blue-700" />
                            <span>{language === 'mr' ? 'विद्या व परिषद सहाय्यक वर्ग' : 'Academic Subordinate Staff'}</span>
                          </div>
                          <div className="text-xs font-bold text-slate-900">
                            {language === 'mr' ? 'शिपाई / खलाशी / मजूर / अतिथीगृह परीचर' : 'Peons / Attendants / Guest House Staff'}
                          </div>
                          <p className="text-[10.5px] text-stone-600">
                            {language === 'mr'
                              ? 'विद्या परिषद दालने, अतिथीगृह व शैक्षणिक कामकाज सहाय्यक'
                              : 'Support services for Academic Council, committee halls & university guest house'}
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* MODE 2: DETAILED DESKS BREAKDOWN GRID                         */}
              {/* ------------------------------------------------------------- */}
              {chartViewMode === 'desks' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {organogramDesks.map((desk) => {
                    const isAcademic = desk.wing === 'academic';
                    return (
                      <div
                        key={desk.id}
                        className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                          isAcademic
                            ? 'bg-blue-50/40 border-blue-200/90 hover:border-blue-400 hover:shadow-md'
                            : 'bg-emerald-50/40 border-emerald-200/90 hover:border-emerald-400 hover:shadow-md'
                        }`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                                isAcademic
                                  ? 'bg-blue-100 text-blue-900 border-blue-300'
                                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              }`}
                            >
                              {language === 'mr' ? desk.code.mr : desk.code.en}
                            </span>
                            <span className="text-[11px] font-bold text-stone-500">
                              {isAcademic
                                ? (language === 'mr' ? 'विद्या संचलन' : 'Academic Wing')
                                : (language === 'mr' ? 'प्रशासकीय संचलन' : 'Administration Wing')}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                              {language === 'mr' ? desk.title.mr : desk.title.en}
                            </h4>
                            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                              {language === 'mr' ? desk.scope.mr : desk.scope.en}
                            </p>
                          </div>

                          {/* Hierarchy Breakdown */}
                          <div className="pt-3 border-t border-stone-200/70 space-y-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500">
                              {language === 'mr' ? 'अधिकारी व कर्मचारी पदसोपान' : 'Reporting Cadre'}
                            </span>
                            <div className="space-y-1.5">
                              {desk.roles.map((r, rIdx) => (
                                <div
                                  key={rIdx}
                                  className="p-2 rounded-xl bg-white border border-stone-200/80 text-xs font-semibold text-slate-800 flex items-center justify-between shadow-2xs"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center text-[10px] font-bold">
                                      {rIdx + 1}
                                    </span>
                                    <span>{language === 'mr' ? r.mr : r.en}</span>
                                  </div>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Subordinate Staff Card */}
                        <div className="mt-4 pt-3 border-t border-stone-200/70">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 mb-1">
                            {language === 'mr' ? 'सहाय्यक सेवा वर्ग' : 'Subordinate Staff'}
                          </div>
                          <div className="text-xs font-bold text-slate-800">
                            {language === 'mr' ? desk.supportStaff.mr : desk.supportStaff.en}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Chart Footer Note & Scan Reference */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 pt-3 border-t border-stone-100">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    {language === 'mr'
                      ? 'अधिकृत संदर्भ: कुलसचिव कार्यालय, महात्मा फुले कृषी विद्यापीठ, राहुरी (महाराष्ट्र कृषी विद्यापीठ कायदा १९८३)'
                      : 'Statutory Reference: Office of the Registrar, MPKV Rahuri (Maharashtra Agricultural Universities Act, 1983)'}
                  </span>
                </span>
                <a
                  href={orgChartImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-800 font-bold hover:underline"
                >
                  <span>{language === 'mr' ? 'मूळ सरकारी दस्तऐवज स्कॅन पहा' : 'View Archived Document Scan'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

            {/* 1c. Statutory Central Administrative Officers & Portfolios (7 Cards) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'वैधानिक अधिकारी व संचलनालये निर्देशिका' : 'Statutory Officers & Central Directorates'}
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {language === 'mr' ? '७ प्रमुख प्रशासकीय पदे' : '7 Apex Portfolios'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {executiveOfficers.map((o, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-md border ${o.tagColor}`}>
                          {getBilingual(o.cadre)}
                        </span>
                        <Building2 className="w-4 h-4 text-emerald-700" />
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                          {getBilingual(o.role)}
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 group-hover:text-emerald-900 transition-colors">
                          {getBilingual(o.name)}
                        </h4>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {getBilingual(o.mandate)}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 space-y-1.5">
                      <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-700" />
                        <a href={`tel:${o.phone.split(' ')[0]}`} className="hover:underline">{o.phone}</a>
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{o.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 2: DOCUMENT SECTIONS (Seniority, HR, Vacancies, Orders, etc) */}
        {/* ================================================================= */}
        {activeTab !== 'profile' && activeTab !== 'contact' && currentSection && (
          <div className="space-y-6">
            
            {/* Header & Live Search Bar */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'अधिकृत दस्तऐवज दालन' : 'Official Portal Records'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    {getBilingual(currentSection.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
                    {getBilingual(currentSection.desc)}
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-80 shrink-0">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder={language === 'mr' ? 'शीर्षक किंवा क्रमांक शोधा...' : 'Search records by keyword...'}
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setCurrentPage(1);
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Status summary */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>
                  {language === 'mr'
                    ? `एकूण ${filteredItems.length} दस्तऐवज उपलब्ध (पृष्ठ ${currentPage} / ${totalPages})`
                    : `Showing ${paginatedItems.length} of ${filteredItems.length} records (Page ${currentPage} of ${totalPages})`}
                </span>
                <span className="font-semibold text-emerald-800">
                  {language === 'mr' ? 'थेट पीडीएफ डाउनलोड लिंक' : 'Direct PDF Link Verified'}
                </span>
              </div>
            </div>

            {/* Document Table */}
            {filteredItems.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 space-y-3">
                <FileText className="w-10 h-10 text-stone-400 mx-auto" />
                <div className="text-base font-bold text-slate-800">
                  {language === 'mr' ? 'कोणताही दस्तऐवज सापडला नाही' : 'No matching records found'}
                </div>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  {language === 'mr' ? 'कृपया शोध शब्द तपासा किंवा शोध साफ करा.' : 'Try clearing your search query or adjusting your keywords.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
                >
                  {language === 'mr' ? 'शोध साफ करा' : 'Clear Search'}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
                      <tr>
                        <th className="py-3.5 px-4 sm:px-6 w-16 text-center">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                        <th className="py-3.5 px-4 sm:px-6">{language === 'mr' ? 'दस्तऐवज / अधिसूचना शीर्षक' : 'Document / Notification Subject'}</th>
                        <th className="py-3.5 px-4 sm:px-6 text-right w-36">{language === 'mr' ? 'फाइल डाउनलोड' : 'Official File'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {paginatedItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-emerald-50/40 transition-colors group">
                          <td className="py-3.5 px-4 sm:px-6 text-center font-bold text-stone-500">
                            {item.srNo || (currentPage - 1) * pageSize + idx + 1}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900 leading-snug">
                            <div className="flex items-start gap-2.5">
                              <FileText className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                              <span className="group-hover:text-emerald-900 transition-colors">{getBilingual(item.title)}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-right">
                            {item.fileUrl ? (
                              <a
                                href={item.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors shadow-2xs"
                              >
                                <span>PDF</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            ) : (
                              <span className="text-stone-400 text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <span className="text-stone-500 font-medium">
                      {language === 'mr'
                        ? `पृष्ठ ${currentPage} पैकी ${totalPages} (एकूण ${filteredItems.length} दस्तऐवज)`
                        : `Page ${currentPage} of ${totalPages} (${filteredItems.length} total items)`}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white font-bold text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>{language === 'mr' ? 'मागील' : 'Previous'}</span>
                      </button>

                      <div className="px-3 py-1.5 font-bold text-stone-800">
                        {currentPage} / {totalPages}
                      </div>

                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white font-bold text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1"
                      >
                        <span>{language === 'mr' ? 'पुढील' : 'Next'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 3: ADMINISTRATIVE CONTACT DIRECTORY                          */}
        {/* ================================================================= */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'mr' ? 'थेट प्रशासकीय संपर्क कक्ष' : 'Direct Administrative Secretariats'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'कुलसचिव सचिवालय व प्रशासकीय अधिकारी निर्देशिका' : 'Registrar Secretariat & Administrative Contacts'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  {language === 'mr'
                    ? 'विद्यापीठाचे कुलसचिव, उपकुलसचिव (प्रशासन) व मध्यवर्ती प्रशासकीय संकुलाचा अधिकृत संपर्क.'
                    : 'Direct lines, official emails, and offices of key administrative authorities at MPKV Rahuri.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                {adminContacts.map((c: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                        {getBilingual(c.designation)}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 pt-1 font-serif">
                        {getBilingual(c.name)}
                      </h4>
                      <p className="text-xs text-stone-600 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{getBilingual(c.office)}</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200 space-y-1 text-xs font-semibold">
                      <div className="flex items-center gap-1.5 text-slate-900">
                        <Phone className="w-3.5 h-3.5 text-emerald-700" />
                        <a href={`tel:${c.phone}`} className="hover:underline">{c.phone}</a>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-600 font-mono text-[11px]">
                        <Mail className="w-3.5 h-3.5 text-emerald-700" />
                        <a href={`mailto:${c.email}`} className="hover:underline truncate">{c.email}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* University Central Secretariat Address Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 to-stone-900 text-white space-y-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>{language === 'mr' ? 'अधिकृत टपाल पत्ता' : 'Postal & Physical Address'}</span>
              </div>
              <h4 className="text-lg font-bold font-serif">
                {language === 'mr'
                  ? 'महात्मा फुले कृषी विद्यापीठ मध्यवर्ती प्रशासकीय संकुल'
                  : 'Mahatma Phule Krishi Vidyapeeth Central Administrative Secretariat'}
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
                {language === 'mr'
                  ? 'राहुरी - ४१३ ७२२, जिल्हा: अहमदनगर, महाराष्ट्र, भारत. दूरध्वनी: ०२४२६-२४३२१६ / २४३३६६. ईमेल: registrar.mpkv@nic.in / dradmnmpkv@rediffmail.com'
                  : 'Rahuri - 413 722, District: Ahmednagar, Maharashtra, India. Phone: 02426-243216 / 243366. Email: registrar.mpkv@nic.in / dradmnmpkv@rediffmail.com'}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
