'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Cpu,
  Wifi,
  Server,
  Globe,
  BookOpen,
  Users,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Home,
  Sparkles,
  Download,
  ExternalLink,
  Search,
  X,
  ZoomIn,
  ShieldCheck,
  CheckCircle2,
  Send,
  FileText,
  GraduationCap,
  Wrench,
  Layers,
  Award,
  Network,
  Shield,
  Clock,
  ArrowRight,
  Camera,
  Building2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import fallbackAkmuData from '@/data/scraped/pages/akmu-introduction.json';

interface AkmuViewProps {
  pageData?: any;
  initialTab?: string;
}

export const AkmuView: React.FC<AkmuViewProps> = ({ pageData, initialTab }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>(initialTab || 'introduction');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);

  // Network Query form state
  const [nqName, setNqName] = useState('');
  const [nqDept, setNqDept] = useState('');
  const [nqMsg, setNqMsg] = useState('');
  const [nqSubmitted, setNqSubmitted] = useState(false);

  const data = pageData?.introduction ? pageData : (fallbackAkmuData as any);
  const heroData = data?.hero || {};
  const stats = heroData?.stats || [];
  const intro = data?.introduction || {};
  const activities = data?.activities || [];
  const trainingsConducted = data?.trainingsConducted || [];
  const nationalBrochures = data?.nationalTrainingBrochures || [];
  const publications = data?.publications || [];
  const contact = data?.contact || {};
  const networkQueryInfo = data?.networkQueryInfo || {};

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  const tabs = [
    { id: 'introduction', labelEn: 'Introduction & NKN', labelMr: 'परिचय व NKN नेटवर्क', icon: Cpu },
    { id: 'activities', labelEn: `Activities (${activities.length})`, labelMr: `आयटी उपक्रम (${activities.length})`, icon: Server },
    { id: 'trainings', labelEn: `Trainings & PDFs (${nationalBrochures.length + trainingsConducted.length})`, labelMr: `प्रशिक्षणे व PDF (${nationalBrochures.length + trainingsConducted.length})`, icon: GraduationCap },
    { id: 'publications', labelEn: `Publications (${publications.length})`, labelMr: `प्रकाशने (${publications.length})`, icon: BookOpen },
    { id: 'contact', labelEn: 'Coordinator & Contact', labelMr: 'समन्वयक व संपर्क', icon: Users },
    { id: 'network_query', labelEn: 'Network Query Desk', labelMr: 'नेटवर्क तक्रार कक्ष', icon: Wrench }
  ];

  const filteredTrainings = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return trainingsConducted;
    return trainingsConducted.filter((t: any) =>
      (t.title || '').toLowerCase().includes(q) ||
      (t.duration || '').toLowerCase().includes(q)
    );
  }, [trainingsConducted, searchQuery]);

  const handleNetworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nqName.trim() || !nqDept.trim() || !nqMsg.trim()) return;
    setNqSubmitted(true);
  };

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
          <Link href="/Akmu/Introduction" className="hover:text-[#0b5c3a] transition-colors">
            {language === 'mr' ? 'विद्यापीठ सुविधा' : 'University Facilities'}
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="text-emerald-900 font-bold">
            {language === 'mr' ? 'कृषी ज्ञान व्यवस्थापन केंद्र (AKMU)' : 'Agricultural Knowledge Management Unit (AKMU)'}
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
              <Wifi className="w-3.5 h-3.5 text-amber-400" />
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

      {/* 3. Main Content & Navigation */}
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

        {/* TAB 1: REDESIGNED INTRODUCTION & NKN CYBER ARCHITECTURE */}
        {activeTab === 'introduction' && (
          <div className="space-y-8">

            {/* 1A. Executive Overview & Quick Contact Strip */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    <Cpu className="w-3.5 h-3.5 text-emerald-800" />
                    <span>{language === 'mr' ? 'ऐतिहासिक पार्श्वभूमी व डिजिटल रचना' : 'Unit Genesis & Mandate'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
                    {language === 'mr'
                      ? 'कृषी संशोधन माहिती प्रणाली (ARIS) ते आधुनिक AKMU सायबर केंद्र'
                      : 'From NARP ARIS Cell (1996-97) to AKMU Digital Hub'}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href={`tel:${contact.officePhone || '+91-02426-243273'}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{contact.officePhone || '+91-02426-243273'}</span>
                  </a>
                  <a
                    href={`mailto:${contact.email || 'arismpkv@gmail.com'}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 text-xs font-bold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{contact.email || 'arismpkv@gmail.com'}</span>
                  </a>
                </div>
              </div>

              {/* Official Narrative Text */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <p className="text-sm sm:text-base text-stone-800 font-medium leading-relaxed">
                    {language === 'mr' ? intro.historyMr : intro.historyEn}
                  </p>
                  <p>
                    {language === 'mr' ? intro.infrastructureMr : intro.infrastructureEn}
                  </p>
                </div>

                {/* Right: 3-Stage Institutional Evolution Timeline */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-[#f4f7f2] border border-emerald-200/70 space-y-4">
                  <h3 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'mr' ? 'प्रमुख टप्पे व विकास प्रवास' : 'Statutory Milestones Timeline'}</span>
                  </h3>

                  <div className="space-y-3 border-l-2 border-emerald-700/40 pl-4 ml-1">
                    <div className="relative space-y-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-800 absolute -left-[21px] top-1 ring-4 ring-[#f4f7f2]" />
                      <div className="text-[11px] font-extrabold text-emerald-900">1996–97 • NARP & NARS</div>
                      <p className="text-xs text-stone-700">
                        {language === 'mr'
                          ? 'राष्ट्रीय कृषी संशोधन प्रकल्पांतर्गत (NARP) ARIS कक्षाची स्थापना.'
                          : 'Established as Agricultural Research Information System (ARIS) Cell under NARP.'}
                      </p>
                    </div>
                    <div className="relative space-y-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute -left-[21px] top-1 ring-4 ring-[#f4f7f2]" />
                      <div className="text-[11px] font-extrabold text-amber-900">27 Jan 2011 • ICAR Directive</div>
                      <p className="text-xs text-stone-700">
                        {language === 'mr'
                          ? 'ICAR परिपत्रक (F.No. 3-1/2010-GAS (DIPA)) अन्वये AKMU नामकरण.'
                          : 'Renamed AKMU per ICAR guideline F.No. 3-1/2010-GAS (DIPA).'}
                      </p>
                    </div>
                    <div className="relative space-y-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 absolute -left-[21px] top-1 ring-4 ring-[#f4f7f2]" />
                      <div className="text-[11px] font-extrabold text-emerald-800">Present • 1 Gbps NKN OFC</div>
                      <p className="text-xs text-stone-700">
                        {language === 'mr'
                          ? 'BSNL मार्फत १ Gbps राष्ट्रीय ज्ञान नेटवर्क व ऑप्टिकल फायबर कॅम्पस जोडणी.'
                          : 'Operating 1 Gbps NKN optical fiber network across all campus divisions.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Key Infrastructure Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {[
                  {
                    icon: Wifi,
                    titleEn: '1 Gbps NKN Backbone',
                    titleMr: '१ Gbps NKN इंटरनेट',
                    descEn: 'High-speed National Knowledge Network (www.nkn.in) uplink via BSNL leased optical fiber.',
                    descMr: 'BSNL मार्फत राष्ट्रीय ज्ञान नेटवर्क (NKN) ची १ Gbps उच्च-वेग इंटरनेट जोडणी.',
                    accent: 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  },
                  {
                    icon: Network,
                    titleEn: 'Campus Optical Fibre Ring',
                    titleMr: 'कॅम्पस ऑप्टिकल फायबर जाळे',
                    descEn: 'Interconnected Optical Fibre Cabling (OFC) linking all colleges, directorates, and divisions.',
                    descMr: 'मध्यवर्ती आवारातील सर्व इमारती, संचालनालये व विभाग ऑप्टिकल फायबरने संलग्न.',
                    accent: 'text-sky-700 bg-sky-50 border-sky-200'
                  },
                  {
                    icon: Globe,
                    titleEn: 'Web & Portal Administration',
                    titleMr: 'संकेतस्थळ व ई-गव्हर्नन्स',
                    descEn: 'Centralized web server hosting, official portal governance (mpkv.ac.in), admissions & scholarships.',
                    descMr: 'विद्यापीठ संकेतस्थळ (mpkv.ac.in), सर्व्हर होस्टिंग आणि ऑनलाइन प्रवेश/शिष्यवृत्ती प्रणाली.',
                    accent: 'text-amber-700 bg-amber-50 border-amber-200'
                  },
                  {
                    icon: Shield,
                    titleEn: 'Cyber Security & Firewall',
                    titleMr: 'सायबर सुरक्षा व फायरवॉल',
                    descEn: 'Enterprise firewall gateway, restricted web access filtering, campus antivirus & video conferencing.',
                    descMr: 'फायरवॉल सुरक्षा प्रणाली, अँटीव्हायरस व्यवस्थापन आणि व्हिडिओ कॉन्फरन्सिंग सुविधा.',
                    accent: 'text-emerald-800 bg-stone-100 border-stone-200'
                  }
                ].map((pillar, idx) => {
                  const PIcon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/90 hover:border-emerald-300 transition-all space-y-2.5"
                    >
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${pillar.accent}`}>
                        <PIcon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-extrabold text-stone-900 font-serif">
                        {language === 'mr' ? pillar.titleMr : pillar.titleEn}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {language === 'mr' ? pillar.descMr : pillar.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 1B. Authentic AKMU Campus Gallery & Quick Navigation Strip */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold uppercase tracking-wider mb-1">
                    <Camera className="w-3.5 h-3.5 text-amber-700" />
                    <span>{language === 'mr' ? 'अधिकृत छायाचित्र दालन' : 'Facility Visual Showcase'}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-stone-900 font-serif">
                    {language === 'mr' ? 'AKMU इमारत, संगणक प्रयोगशाळा व समन्वय केंद्र' : 'AKMU Building, Web Operations Lab & Leadership'}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-stone-500">
                  {language === 'mr' ? 'मोठ्या आकारात पाहण्यासाठी फोटोवर क्लिक करा' : 'Click any photo to view full resolution'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {intro.images?.map((img: any, idx: number) => {
                  const caption = language === 'mr' ? img.captionMr : img.captionEn;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage({ src: img.src, caption })}
                      className="group rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="relative h-56 w-full bg-stone-900 overflow-hidden">
                        <img
                          src={img.src}
                          alt={caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/70 text-amber-300 flex items-center gap-1 text-[10px] font-bold backdrop-blur-xs">
                          <ZoomIn className="w-3 h-3" />
                          <span>{language === 'mr' ? 'मोठा फोटो' : 'Enlarge'}</span>
                        </span>
                      </div>
                      <div className="p-4 bg-white">
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 font-serif leading-snug">
                          {caption}
                        </h4>
                      </div>
                    </div>
                  );
                })}

                {/* Card 3: Unit Coordinator Profile Spotlight */}
                <div className="rounded-2xl overflow-hidden border border-emerald-200 bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#071a10] text-white shadow-sm flex flex-col justify-between p-5 space-y-4">
                  <div className="flex items-start gap-4">
                    {contact.photo && (
                      <div
                        onClick={() => setSelectedImage({ src: contact.photo, caption: language === 'mr' ? contact.nameMr : contact.nameEn })}
                        className="w-20 h-24 rounded-xl overflow-hidden border border-amber-400/40 shrink-0 cursor-pointer relative group"
                      >
                        <img
                          src={contact.photo}
                          alt={contact.nameEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                    )}
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase">
                        {language === 'mr' ? 'AKMU समन्वयक' : 'Coordinator, AKMU'}
                      </span>
                      <h4 className="text-base font-extrabold text-white font-serif leading-tight">
                        {language === 'mr' ? contact.nameMr : contact.nameEn}
                      </h4>
                      <p className="text-[11px] text-emerald-200/90 leading-snug">
                        {language === 'mr' ? contact.designationMr : contact.designationEn}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-emerald-100 border-t border-white/10 pt-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-semibold">{contact.officePhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-semibold">{contact.email}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('activities')}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition"
                    >
                      <span>{language === 'mr' ? '१२ उपक्रम पहा' : '12 Activities'}</span>
                      <ArrowRight className="w-3 h-3 text-amber-300" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('network_query')}
                      className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-[11px] flex items-center justify-center gap-1 transition"
                    >
                      <span>{language === 'mr' ? 'नेटवर्क तक्रार' : 'Network Query'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: 12 CORE IT & NETWORK ACTIVITIES */}
        {activeTab === 'activities' && (
          <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
            <div className="space-y-1 pb-3 border-b border-stone-100">
              <h2 className="text-xl font-extrabold text-stone-900 font-serif flex items-center gap-2">
                <Server className="w-5 h-5 text-emerald-700" />
                <span>{language === 'mr' ? 'AKMU मार्फत राबविण्यात येणारे मुख्य आयटी उपक्रम (१२ सेवा)' : 'Core University IT & Digital Operations (12 Services)'}</span>
              </h2>
              <p className="text-xs text-stone-500">
                {language === 'mr'
                  ? 'मफुकृवि राहुरीच्या सर्व महाविद्यालये, संशोधन केंद्रे व प्रशासकीय विभागांच्या डिजिटल गरजा AKMU मार्फत पूर्ण केल्या जातात.'
                  : 'AKMU serves as the central Information Technology hub fulfilling all digital, server, LAN/Wi-Fi, security, and e-governance needs of MPKV Rahuri.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {activities.map((act: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-400 hover:bg-emerald-50/40 transition flex items-start gap-3"
                >
                  <span className="w-8 h-8 rounded-xl bg-emerald-900 text-amber-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                    {act.srNo}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                      {getBilingual(act.title)}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: NATIONAL TRAINING BROCHURES (PDFs) + 18 HISTORICAL TRAININGS CONDUCTED */}
        {activeTab === 'trainings' && (
          <div className="space-y-6">
            {/* 4 National Training Programs with Downloadable Brochures */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 font-serif flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    <span>{language === 'mr' ? 'अधिकृत राष्ट्रीय प्रशिक्षण माहितीपत्रके (PDF डाउनलोड)' : 'Official CAAST / AKMU National Training Brochures (PDFs)'}</span>
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {language === 'mr'
                      ? 'ड्रोन, मशीन लर्निंग, हायपरस्पेक्ट्रल रिमोट सेन्सिंग व आयसीटी विषयक राष्ट्रीय अभ्यासक्रम वेळापत्रक व माहितीपत्रक.'
                      : 'Complete downloadable syllabus & schedules for national courses conducted under CAAST-CSAWM & AKMU.'}
                  </p>
                </div>
                <Link
                  href="/Akmu/Traning"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition shrink-0"
                >
                  <span>{language === 'mr' ? 'सविस्तर प्रशिक्षण दालन पहा' : 'Full Trainings Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nationalBrochures.map((b: any) => (
                  <div
                    key={b.srNo}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-900 text-amber-300 font-bold">
                          #{b.srNo} • {b.tag}
                        </span>
                        <span className="text-[11px] font-semibold text-stone-500">{b.size}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-stone-900 font-serif leading-snug">
                        {getBilingual(b.title)}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between">
                      <a
                        href={b.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-950 transition shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-300" />
                        <span>{language === 'mr' ? 'माहितीपत्रक PDF डाउनलोड' : 'Download Brochure PDF'}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 18 Historical Trainings Conducted Table */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 font-serif">
                    {language === 'mr' ? 'AKMU आयोजित विद्यापीठ स्तरीय प्रशिक्षणे (१८ कार्यक्रम)' : 'Trainings & Workshops Conducted by AKMU (2008–2014)'}
                  </h2>
                  <p className="text-xs text-stone-500">
                    {language === 'mr' ? 'अधिकारी, प्राध्यापक, शास्त्रज्ञ व KVK कर्मचाऱ्यांसाठी आयोजित प्रशिक्षण नोंदी.' : 'Archive of 18 capacity building & software training programs for faculty, staff, and KVK personnel.'}
                  </p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'mr' ? 'प्रशिक्षण विषय शोधा...' : 'Search training title or year...'}
                    className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
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

              <div className="overflow-x-auto rounded-2xl border border-stone-200">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-stone-100 text-stone-800 border-b border-stone-200">
                      <th className="py-3 px-4 font-bold w-14 text-center">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                      <th className="py-3 px-4 font-bold">{language === 'mr' ? 'प्रशिक्षण विषय' : 'Training Title'}</th>
                      <th className="py-3 px-4 font-bold w-48">{language === 'mr' ? 'कालावधी' : 'Duration'}</th>
                      <th className="py-3 px-4 font-bold w-32 text-center">{language === 'mr' ? 'सहभागी संख्या' : 'Participants'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-700">
                    {filteredTrainings.map((tr: any) => (
                      <tr key={tr.srNo} className="hover:bg-emerald-50/40 transition">
                        <td className="py-3 px-4 font-bold text-center text-stone-500">{tr.srNo}</td>
                        <td className="py-3 px-4 font-semibold text-stone-900">{tr.title}</td>
                        <td className="py-3 px-4 text-xs text-stone-600">{tr.duration}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 font-bold text-xs border border-emerald-200">
                            {tr.participants}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PUBLICATIONS */}
        {activeTab === 'publications' && (
          <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
            <div className="space-y-1 pb-3 border-b border-stone-100">
              <h2 className="text-xl font-extrabold text-stone-900 font-serif flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700" />
                <span>{language === 'mr' ? 'AKMU प्रकाशित पुस्तके व तांत्रिक मॅन्युअल्स' : 'Official AKMU ICT Books & Operating Manuals'}</span>
              </h2>
              <p className="text-xs text-stone-500">
                {language === 'mr'
                  ? 'विस्तार शिक्षण संचालनालय व AKMU मार्फत प्रकाशित तांत्रिक हस्तपुस्तिका.'
                  : 'Extension manuals and ICT reference guides published with Directorate of Extension Education.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {publications.map((pub: any) => (
                <div
                  key={pub.srNo}
                  className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-900 text-amber-300 font-bold">
                      #{pub.srNo}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-white border border-stone-300 text-stone-700 font-mono text-[11px] font-bold">
                      {pub.publicationNumber}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-stone-900 font-serif leading-snug pt-1">
                    {pub.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COORDINATOR & CONTACT */}
        {activeTab === 'contact' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {contact.photo && (
                <div
                  onClick={() => setSelectedImage({ src: contact.photo, caption: language === 'mr' ? contact.nameMr : contact.nameEn })}
                  className="w-40 h-48 rounded-2xl overflow-hidden border-2 border-emerald-800/30 shadow-md shrink-0 cursor-pointer group relative"
                >
                  <img
                    src={contact.photo}
                    alt={contact.nameEn}
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
                    <span>{language === 'mr' ? 'अधिकृत संपर्क अधिकारी' : 'Unit Coordinator'}</span>
                  </span>
                  <h2 className="text-2xl font-extrabold text-stone-900 font-serif">
                    {language === 'mr' ? contact.nameMr : contact.nameEn}
                  </h2>
                  <p className="text-sm font-semibold text-emerald-800">
                    {language === 'mr' ? contact.designationMr : contact.designationEn}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <div className="text-[11px] text-stone-500 font-semibold">{language === 'mr' ? 'कार्यालयीन दूरध्वनी' : 'Office Phone'}</div>
                      <div className="font-bold text-stone-900">{contact.officePhone}</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <div className="text-[11px] text-stone-500 font-semibold">{language === 'mr' ? 'ईमेल पत्ता' : 'Official Email'}</div>
                      <a href={`mailto:${contact.email}`} className="font-bold text-emerald-800 hover:underline">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3 text-xs text-stone-700">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{language === 'mr' ? contact.locationMr : contact.locationEn}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CAMPUS NETWORK QUERY DESK */}
        {activeTab === 'network_query' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
              <div className="space-y-1 pb-3 border-b border-stone-100">
                <h2 className="text-xl font-extrabold text-stone-900 font-serif flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-emerald-700" />
                  <span>{language === 'mr' ? networkQueryInfo.titleMr : networkQueryInfo.titleEn}</span>
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {language === 'mr' ? networkQueryInfo.descMr : networkQueryInfo.descEn}
                </p>
              </div>

              {nqSubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 text-xs text-emerald-950">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    <span>{language === 'mr' ? 'नेटवर्क तक्रार नोंदणी मसुदा तयार आहे' : 'Network Query Prepared for AKMU Helpdesk'}</span>
                  </div>
                  <p>
                    {language === 'mr'
                      ? 'कृपया खालील बटणावरून थेट AKMU ईमेलवर संदेश पाठवा किंवा कार्यालयीन दूरध्वनीवर संपर्क साधा.'
                      : 'Click below to dispatch your ticket directly via email to the AKMU Coordinator or submit on the legacy portal.'}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={`mailto:${networkQueryInfo.supportEmail}?subject=${encodeURIComponent(`Network Query - ${nqDept}`)}&body=${encodeURIComponent(`Name & Designation: ${nqName}\nDepartment: ${nqDept}\n\nQuery:\n${nqMsg}`)}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-900 text-white font-bold hover:bg-emerald-950 transition"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-300" />
                      <span>{language === 'mr' ? 'ईमेलद्वारे पाठवा' : 'Send via Email Client'}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setNqSubmitted(false);
                        setNqName('');
                        setNqDept('');
                        setNqMsg('');
                      }}
                      className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 font-bold hover:bg-stone-100 transition"
                    >
                      {language === 'mr' ? 'नवीन तक्रार' : 'New Query'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNetworkSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">
                      {language === 'mr' ? 'नाव व पदनाम *' : 'Name and Designation *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={nqName}
                      onChange={(e) => setNqName(e.target.value)}
                      placeholder={language === 'mr' ? 'उदा. डॉ. पाटील (सहाय्यक प्राध्यापक)' : 'e.g. Dr. Patil (Assistant Professor)'}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">
                      {language === 'mr' ? 'विभागाचे नाव *' : 'Department Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={nqDept}
                      onChange={(e) => setNqDept(e.target.value)}
                      placeholder={language === 'mr' ? 'उदा. कृषी वनस्पतीशास्त्र विभाग' : 'e.g. Department of Agricultural Botany'}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">
                      {language === 'mr' ? 'तक्रार / तांत्रिक संदेश *' : 'Network Issue / Message *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={nqMsg}
                      onChange={(e) => setNqMsg(e.target.value)}
                      placeholder={language === 'mr' ? 'LAN / Wi-Fi / NKN कनेक्टिव्हिटी समस्येचे सविस्तर वर्णन लिहा...' : 'Describe LAN port, Wi-Fi access point, IP allocation, or NKN connectivity issue...'}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs transition shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5 text-amber-300" />
                      <span>{language === 'mr' ? 'तक्रार तयार करा' : 'Submit Network Query'}</span>
                    </button>
                    <a
                      href={networkQueryInfo.officialFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition"
                    >
                      <span>{language === 'mr' ? 'मूळ पोर्टल फॉर्म उघडा' : 'Open Official Portal Form'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-800 text-white space-y-4">
              <h3 className="text-lg font-extrabold text-amber-300 font-serif">
                {language === 'mr' ? 'थेट नेटवर्क हेल्पडेस्क' : 'Direct IT & NKN Helpdesk'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {language === 'mr'
                  ? 'ऑप्टिकल फायबर केबल दुरुस्ती, नवीन लॅन नोड, वेब सर्व्हर प्रवेश व अँटीव्हायरस अद्ययावतीकरणासाठी AKMU कार्यालयाशी संपर्क साधा.'
                  : 'For urgent Optical Fiber (OFC) outages, department LAN node configuration, video conferencing scheduling, or web server hosting requests:'}
              </p>
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="flex items-center gap-2.5 text-stone-200">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">{networkQueryInfo.supportPhone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-200">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <a href={`mailto:${networkQueryInfo.supportEmail}`} className="font-bold text-emerald-300 hover:underline">
                    {networkQueryInfo.supportEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Image Lightbox Modal */}
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
