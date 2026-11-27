'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  HardHat,
  Wrench,
  Zap,
  Droplets,
  Layers,
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft,
  Home,
  MapPin,
  ExternalLink,
  Search,
  X,
  Landmark,
  ShieldCheck,
  Calendar,
  DollarSign,
  PieChart,
  FileText,
  Clock,
  Sparkles,
  Award,
  Sun,
  Hammer
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface UniversityEngineerViewProps {
  pageData?: any;
}

export const UniversityEngineerView: React.FC<UniversityEngineerViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('at_a_glance');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  const overview = pageData?.overview || {};
  const keyStats = overview?.keyStats || [];
  const engineeringWings = pageData?.engineeringWings || [];
  const majorProjects = pageData?.majorProjects || [];
  const campusGallery = pageData?.campusGallery || [];
  const contacts = pageData?.contacts || [];

  const tabsList = [
    { key: 'at_a_glance', labelEn: 'At a Glance', labelMr: 'एका दृष्टीक्षेपात', count: null, icon: Building2 },
    { key: 'profile', labelEn: 'Organizational Profile', labelMr: 'संस्थात्मक रचना', count: engineeringWings.length || 4, icon: HardHat },
    { key: 'duties', labelEn: 'Statutory Duties & Mandate', labelMr: 'वैधानिक कर्तव्ये व अधिकार', count: null, icon: ShieldCheck },
    { key: 'activities', labelEn: 'Major Capital Projects', labelMr: 'प्रमुख प्रकल्प व बांधकामे', count: majorProjects.length || 6, icon: Wrench },
    { key: 'contact', labelEn: 'Contact Directory', labelMr: 'अभियांत्रिकी संपर्क', count: contacts.length || 14, icon: Phone },
    { key: 'tenders', labelEn: 'E-Tenders & Notices', labelMr: 'ई-निविदा व सूचना', count: null, icon: FileText }
  ];

  // Filtered contacts based on search & division
  const filteredContacts = useMemo(() => {
    if (!contacts || !Array.isArray(contacts)) return [];
    return contacts.filter((c: any) => {
      const matchesDivision = selectedDivision === 'all' || c.division === selectedDivision;
      if (!matchesDivision) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const oEn = c.office?.en?.toLowerCase() || '';
      const oMr = c.office?.mr?.toLowerCase() || '';
      const locEn = c.location?.en?.toLowerCase() || '';
      const locMr = c.location?.mr?.toLowerCase() || '';
      const dEn = c.designation?.en?.toLowerCase() || '';
      return oEn.includes(q) || oMr.includes(q) || locEn.includes(q) || locMr.includes(q) || dEn.includes(q);
    });
  }, [contacts, searchQuery, selectedDivision]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (!majorProjects || !Array.isArray(majorProjects)) return [];
    if (selectedCategory === 'all') return majorProjects;
    return majorProjects.filter((p: any) => p.category === selectedCategory);
  }, [majorProjects, selectedCategory]);

  const projectCategories = [
    { id: 'all', labelEn: 'All Projects', labelMr: 'सर्व प्रकल्प' },
    { id: 'Campus Infrastructure', labelEn: 'Campus Infrastructure', labelMr: 'कॅम्पस पायाभूत सुविधा' },
    { id: 'Academic Colleges', labelEn: 'Academic Colleges', labelMr: 'महाविद्यालयीन संकुले' },
    { id: 'Farm Irrigation & Water Works', labelEn: 'Irrigation & Water Works', labelMr: 'सिंचन व पाणीपुरवठा' },
    { id: 'Research Laboratories', labelEn: 'Research Labs', labelMr: 'संशोधन प्रयोगशाळा' },
    { id: 'Green Energy & Sustainability', labelEn: 'Green & Solar Energy', labelMr: 'हरित व सौर ऊर्जा' }
  ];

  const divisionsList = [
    { id: 'all', labelEn: 'All Sub-Divisions', labelMr: 'सर्व उपविभाग' },
    { id: 'Central Headquarters', labelEn: 'Central HQ (Rahuri)', labelMr: 'मध्यवर्ती मुख्यालय (राहुरी)' },
    { id: 'Rahuri Sub-Division', labelEn: 'Rahuri Sub-Division', labelMr: 'राहुरी उपविभाग' },
    { id: 'Pune Sub-Division', labelEn: 'Pune Sub-Division', labelMr: 'पुणे उपविभाग' },
    { id: 'Dhule Sub-Division', labelEn: 'Dhule Sub-Division', labelMr: 'धुळे उपविभाग' },
    { id: 'Kolhapur Sub-Division', labelEn: 'Kolhapur Sub-Division', labelMr: 'कोल्हापूर उपविभाग' }
  ];

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
            {language === 'mr' ? 'विद्यापीठ अभियंता व बांधकाम विभाग' : 'University Engineer & Works Division'}
          </span>
          {activeTab !== 'at_a_glance' && (
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

      {/* 2. Hero Header: Executive Blueprint Theme */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2333] via-[#0e2f44] to-[#081824] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-sky-700/50">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-500/40 text-amber-300 text-xs font-bold tracking-wide uppercase shadow-inner">
              <HardHat className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'mr' ? 'बांधकाम व पायाभूत सुविधा संचलनालय' : 'Works & Estate Infrastructure Desk'}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-serif leading-tight">
                {language === 'mr' ? 'विद्यापीठ अभियंता व बांधकाम संचालनालय' : 'University Engineer & Works Directorate'}
              </h1>
              <p className="text-sm sm:text-base text-sky-100/90 font-medium leading-relaxed max-w-3xl">
                {language === 'mr'
                  ? 'सुमारे ३,२०० हेक्टर क्षेत्रावर पसरलेल्या मध्यवर्ती राहुरी कॅम्पससह पश्चिम महाराष्ट्रातील १० घटक महाविद्यालये व २७ संशोधन केंद्रांच्या स्थापत्य, विद्युत, जलवितरण व उपसा सिंचन कामांचे वैधानिक संचलन.'
                  : 'Statutory engineering division entrusted with master planning, civil construction, electrical distribution, canal lift irrigation, and architectural maintenance across the 3,200-hectare Rahuri Central Campus and regional campuses.'}
              </p>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-white/10 text-sky-200 border border-white/10 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? '३,२०० हेक्टर परिसर' : '3,200 Hectares Estate'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-sky-200 border border-white/10 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? '₹१५१.०० कोटी विशेष निधी' : '₹151.00 Cr State Grant'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-sky-200 border border-white/10 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? '१,०००+ एकर उपसा सिंचन' : '1,000+ Ac Lift Irrigation'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-sky-200 border border-white/10 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? '१४ अभियांत्रिकी कार्यालये' : '14 Engineering Offices'}</span>
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Main Navigation & Content Section */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16 space-y-8">

        {/* 6 Unique University Engineer Tabs Strip (Guaranteed flex-wrap with inline styles to prevent clipping) */}
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
                  onClick={() => {
                    setActiveTab(tab.key);
                    setSearchQuery('');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                  <span className="whitespace-nowrap">{language === 'mr' ? tab.labelMr : tab.labelEn}</span>
                  {tab.count !== null && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                        isActive ? 'bg-slate-800 text-amber-300' : 'bg-stone-200 text-stone-800'
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
        {/* VIEW 1: AT A GLANCE (Overview, Jurisdiction & Campus Gallery) */}
        {/* ================================================================= */}
        {activeTab === 'at_a_glance' && (
          <div className="space-y-8">
            
            {/* Overview & Mission Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-100 text-sky-950 border border-sky-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-800" />
                    <span>{language === 'mr' ? 'एका दृष्टीक्षेपात' : 'At a Glance Overview'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'विद्यापीठ कार्यक्षेत्र व पायाभूत सुविधा संचलन' : 'University Infrastructure Jurisdiction'}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:02426-243272"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-sky-50 text-stone-700 hover:text-sky-900 border border-stone-200 text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-700" />
                    <span>02426-243272</span>
                  </a>
                  <a
                    href="mailto:uniengineermpkv@gmail.com"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-sky-50 text-stone-700 hover:text-sky-900 border border-stone-200 text-xs font-bold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-700" />
                    <span>uniengineermpkv@gmail.com</span>
                  </a>
                </div>
              </div>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                {getBilingual(overview?.intro)}
              </p>

              {/* 6 Key Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                {keyStats.map((stat: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1 hover:border-sky-300 transition-colors shadow-2xs"
                  >
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-serif">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-sky-900 leading-tight">
                      {getBilingual(stat.label)}
                    </div>
                    <p className="text-[10px] text-stone-500 font-medium pt-0.5">
                      {getBilingual(stat.sub)}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Campus Architectural Gallery */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  <Landmark className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'mr' ? 'कॅम्पस स्थापत्य दालन' : 'Campus Architectural Landmarks'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'अभियांत्रिकी व स्थापत्य कामांची प्रमुख छायाचित्रे' : 'Works Division Infrastructure Gallery'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  {language === 'mr'
                    ? 'पुणे येथील शताब्दी ऐतिहासिक इमारत, राहुरी येथील बहुउद्देशीय सभागृह व विद्यापीठ अभियंता कार्यालय संकुल.'
                    : 'Photographs of iconic heritage conservation and modern capital facilities executed by the Works Division.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {campusGallery.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="group rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative h-48 w-full bg-stone-200 overflow-hidden">
                      <img
                        src={item.image}
                        alt={getBilingual(item.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 space-y-1.5 flex flex-col justify-between flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-serif leading-snug">
                        {getBilingual(item.title)}
                      </h4>
                      <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                        {getBilingual(item.desc)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 2: ORGANIZATIONAL PROFILE (4 Engineering Wings) */}
        {/* ================================================================= */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-100 text-sky-950 border border-sky-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                    <HardHat className="w-3.5 h-3.5 text-sky-700" />
                    <span>{language === 'mr' ? 'संस्थात्मक रचना व विभाग' : 'Engineering Organizational Wings'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'विद्यापीठ अभियंता कार्यालय रचना व शाखा' : 'University Engineering Sub-Divisions'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {language === 'mr'
                      ? 'स्थापत्य, विद्युत, पाणीपुरवठा व ऐतिहासिक वारसा इमारत संवर्धन शाखांचे कार्यक्षेत्र.'
                      : 'Operational wings managing civil structures, electrical transmission, water distribution, and heritage conservation.'}
                  </p>
                </div>
              </div>

              {/* Division Head Card with Building Photo */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-stone-900 to-sky-950 text-white border border-sky-600/40 shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950">
                      {language === 'mr' ? 'विभागीय प्रमुख' : 'Statutory Engineering Authority'}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      {language === 'mr' ? 'विद्यापीठ अभियंता (कार्यकारी अभियंता)' : 'Office of the University Engineer'}
                    </h4>
                    <p className="text-xs sm:text-sm text-sky-200 leading-relaxed font-normal">
                      {language === 'mr'
                        ? 'महाराष्ट्र कृषी विद्यापीठे अधिनियम व परिनियमांनुसार विद्यापीठाचे मुख्य अभियंता म्हणून सर्व निविदा मंजुरी, नियोजन, राज्य शासन समन्वय व पायाभूत सुविधा प्रकल्पांचे नियंत्रण.'
                        : 'Head of Division responsible for capital master planning, architectural vetting, state tender processing in B-1 forms, PWD/CPWD contractor compliance, and execution.'}
                    </p>
                    <div className="pt-2 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-sky-300">
                      <span>📞 02426-243272 / 243235</span>
                      <span>✉️ uniengineermpkv@gmail.com</span>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-white/20 shadow-md bg-stone-800">
                    <img
                      src="/media/images/works/University_Engineer_Office.jpg"
                      alt="University Engineer Office Building"
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-2 text-center text-[11px] text-sky-200 font-medium bg-black/40">
                      {language === 'mr' ? 'विद्यापीठ अभियंता कार्यालय, राहुरी' : 'University Engineer Office, Rahuri'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Functional Wings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {engineeringWings.map((wing: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 hover:border-sky-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 border border-sky-200">
                          {language === 'mr' ? `शाखा क्र. ०${idx + 1}` : `Wing #${idx + 1}`}
                        </span>
                        {idx === 0 ? <Building2 className="w-4 h-4 text-sky-700" /> : idx === 1 ? <Zap className="w-4 h-4 text-amber-600" /> : idx === 2 ? <Droplets className="w-4 h-4 text-blue-600" /> : <Landmark className="w-4 h-4 text-emerald-700" />}
                      </div>

                      <h4 className="text-base font-bold text-slate-900 font-serif">
                        {getBilingual(wing.title)}
                      </h4>

                      <div className="text-xs font-bold text-sky-900">
                        {getBilingual(wing.head)}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        {getBilingual(wing.scope)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200 text-xs text-stone-500 font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{getBilingual(wing.coverage)}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 3: STATUTORY DUTIES & MANDATE */}
        {/* ================================================================= */}
        {activeTab === 'duties' && (
          <div className="space-y-8">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                  <span>{language === 'mr' ? 'वैधानिक कर्तव्ये व कार्यकक्षा' : 'Statutory Mandate & Powers'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'विद्यापीठ अभियंत्यांची वैधानिक कर्तव्ये व जबाबदाऱ्या' : 'Statutory Duties of the University Engineer'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  {language === 'mr'
                    ? 'महाराष्ट्र कृषी विद्यापीठे परिनियम व प्रशासकीय नियमावलीनुसार विद्यापीठ अभियंत्यांची मुख्य कर्तव्ये.'
                    : 'Key statutory duties under Maharashtra Agricultural Universities Statutes governing capital works, estate custody, and technical sanctions.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-900 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    <h4 className="text-sm font-bold text-slate-900 font-serif">
                      {language === 'mr' ? 'तांत्रिक मान्यता व अंदाजपत्रके' : 'Technical Sanctions & Estimates'}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium pl-8">
                    {language === 'mr'
                      ? 'विद्यापीठाच्या सर्व नवीन इमारती, वसतिगृहे, प्रयोगशाळा व सिंचन प्रकल्पांचे सविस्तर अंदाजपत्रक तयार करणे व विहित मर्यादेत तांत्रिक मान्यता देणे.'
                      : 'Preparation of detailed architectural plans, structural designs, and cost estimates for all capital works conforming to state PWD specifications and awarding technical sanctions.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-900 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    <h4 className="text-sm font-bold text-slate-900 font-serif">
                      {language === 'mr' ? 'ई-निविदा व करार व्यवस्थापन' : 'E-Tendering & Contract Administration'}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium pl-8">
                    {language === 'mr'
                      ? 'महाराष्ट्र शासनाच्या महाटेंडर पोर्टलवरून बी-१ फॉर्ममधील ई-निविदा प्रसिद्ध करणे, कंत्राटदारांची तांत्रिक छाननी करणे व पारदर्शक पद्धतीने कार्यादेश देणे.'
                      : 'Publication of transparent online e-tenders in B-1 forms, rigorous technical evaluation of PWD/CPWD/MES contractors, and strict contract supervision.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-900 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                    <h4 className="text-sm font-bold text-slate-900 font-serif">
                      {language === 'mr' ? 'कॅम्पस संपदा व देखभाल' : 'Campus Estate Custody & Maintenance'}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium pl-8">
                    {language === 'mr'
                      ? 'राहुरी येथील ३,२०० हेक्टर परिसरातील सर्व इमारती, अंतर्गत रस्ते, पाणीपुरवठा यंत्रणा, ड्रेनेज व निवासी संकुलांची नियमित देखभाल व दुरुस्ती सुनिश्चित करणे.'
                      : 'Ensuring structural safety, timely civil repairs, routine upkeep, water filtration, and maintenance of all buildings and residential quarters across 3,200 hectares.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-900 flex items-center justify-center text-xs font-bold shrink-0">4</span>
                    <h4 className="text-sm font-bold text-slate-900 font-serif">
                      {language === 'mr' ? '२४x७ अखंड विद्युत व पाणीपुरवठा' : '24x7 Power Backup & Water Works'}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium pl-8">
                    {language === 'mr'
                      ? 'संशोधन प्रयोगशाळा, कृषी उपकरणे व वसतिगृहांसाठी २४ तास अखंड वीजपुरवठा, सौर प्रकल्प संचलन आणि कॅनॉलवरून उपसा सिंचन प्रणालीचे व्यवस्थापन.'
                      : 'Continuous HT/LT electrical distribution, heavy DG backup for cryopreservation labs, solar steam generation, and canal lift irrigation pumping networks.'}
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 4: MAJOR CAPITAL PROJECTS (Sanctions, Grants & Details) */}
        {/* ================================================================= */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                    <Wrench className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'प्रमुख प्रकल्प व बांधकामे' : 'Major Capital Projects'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'महाराष्ट्र शासन, आरकेव्हीवाय व आयसीएआर मंजूर पायाभूत प्रकल्प' : 'State & Centrally Funded Capital Infrastructure'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {language === 'mr'
                      ? '१५१ कोटींचे विशेष अनुदान, सांगली येथील अन्नतंत्रज्ञान महाविद्यालय, उपसा सिंचन व जनुक बँक प्रकल्प.'
                      : 'Comprehensive portfolio of ongoing capital construction and infrastructure development grants.'}
                  </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {projectCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-sky-900 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {language === 'mr' ? cat.labelMr : cat.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredProjects.map((p: any) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 hover:border-sky-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                          {p.grantAmount}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-100 text-sky-900">
                          {p.category}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 font-serif leading-snug">
                        {getBilingual(p.title)}
                      </h4>

                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        {getBilingual(p.scope)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-stone-700 font-medium">
                        <span className="text-stone-500">{language === 'mr' ? 'निधी संस्था:' : 'Funding Agency:'}</span>
                        <span className="font-bold text-slate-900">{getBilingual(p.fundingAgency)}</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-700 font-medium">
                        <span className="text-stone-500">{language === 'mr' ? 'वाटप / व्याप्ती:' : 'Allocation:'}</span>
                        <span className="font-bold text-sky-950">{p.allocation}</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-700 font-medium">
                        <span className="text-stone-500">{language === 'mr' ? 'स्थिती:' : 'Status:'}</span>
                        <span className="font-bold text-emerald-800">{getBilingual(p.status)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 5: CONTACT DIRECTORY (All 14 Engineering Offices) */}
        {/* ================================================================= */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-100 text-sky-950 border border-sky-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                    <Phone className="w-3.5 h-3.5 text-sky-700" />
                    <span>{language === 'mr' ? 'अभियांत्रिकी संपर्क निर्देशिका' : 'Engineering Contacts Directory'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'विद्यापीठ अभियंता, उपअभियंता व शाखा अभियंते' : 'University Engineer, Sub-Divisions & Sectional Engineers'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {language === 'mr'
                      ? `एकूण १४ अभियांत्रिकी कार्यालये — राहुरी मध्यवर्ती परिसर, पुणे, धुळे व कोल्हापूर.`
                      : `Complete directory of all 14 engineering offices across Rahuri, Pune, Dhule, and Kolhapur.`}
                  </p>
                </div>

                {/* Real-time Search Box */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'mr' ? 'कार्यालय किंवा अधिकारी शोधा...' : 'Search office or engineer...'}
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-medium focus:bg-white focus:outline-sky-700 transition-all"
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

              {/* Division Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {divisionsList.map((div) => (
                  <button
                    key={div.id}
                    type="button"
                    onClick={() => setSelectedDivision(div.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      selectedDivision === div.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {language === 'mr' ? div.labelMr : div.labelEn}
                  </button>
                ))}
              </div>

              {/* Contacts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {filteredContacts.map((c: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-sky-300 hover:shadow-2xs transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-100 text-sky-900">
                          {c.division}
                        </span>
                        <span className="text-xs font-mono font-bold text-stone-400">#{c.srNo}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 pt-1 font-serif">
                        {getBilingual(c.office)}
                      </h4>
                      <p className="text-xs text-stone-600 flex items-start gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                        <span>{getBilingual(c.location)}</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200 space-y-1 text-xs font-semibold">
                      <div className="flex items-center gap-1.5 text-slate-900">
                        <Phone className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                        <a href={`tel:${c.phone.split(',')[0].trim()}`} className="hover:underline">{c.phone}</a>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-600 font-mono text-[11px]">
                        <Mail className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                        <a href={`mailto:${c.email}`} className="hover:underline truncate">{c.email}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Central Engineering Secretariat Address Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-stone-900 to-sky-950 text-white space-y-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>{language === 'mr' ? 'अधिकृत टपाल पत्ता' : 'Postal & Physical Address'}</span>
              </div>
              <h4 className="text-lg font-bold font-serif">
                {language === 'mr'
                  ? 'महात्मा फुले कृषी विद्यापीठ विद्यापीठ अभियंता कार्यालय संकुल'
                  : 'Mahatma Phule Krishi Vidyapeeth Office of the University Engineer'}
              </h4>
              <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-normal max-w-2xl">
                {language === 'mr'
                  ? 'मध्यवर्ती परिसर, राहुरी - ४१३ ७२२, जिल्हा: अहमदनगर, महाराष्ट्र, भारत. दूरध्वनी: ०२४२६-२४३२३५ / २४३२७२. ईमेल: uniengineermpkv@gmail.com'
                  : 'Central Campus, Rahuri - 413 722, District: Ahmednagar, Maharashtra, India. Phone: 02426-243235 / 243272. Email: uniengineermpkv@gmail.com'}
              </p>
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 6: E-TENDERS & NOTICES */}
        {/* ================================================================= */}
        {activeTab === 'tenders' && (
          <div className="space-y-8">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <FileText className="w-3.5 h-3.5 text-amber-800" />
                  <span>{language === 'mr' ? 'ई-निविदा व नोटीस बोर्ड' : 'E-Tenders & Notices'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'बांधकाम व स्थापत्य ई-निविदा प्रणाली' : 'Works E-Tendering & B-1 Form Notifications'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  {language === 'mr'
                    ? 'सार्वजनिक बांधकाम विभाग (PWD), CPWD व MES नोंदणीकृत कंत्राटदारांसाठी अधिकृत ई-निविदा.'
                    : 'Official B-1 online tenders invited from PWD/CPWD/MES registered contractors for civil and electrical infrastructure.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'महाराष्ट्र शासन महाटेंडर्स प्रणाली' : 'Government of Maharashtra E-Tendering Portal (MahaTenders)'}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium max-w-3xl">
                    {language === 'mr'
                      ? 'विद्यापीठाच्या सर्व बांधकाम, स्थापत्य व विद्युत कामांच्या निविदा महाराष्ट्र शासनाच्या https://mahatenders.gov.in या पोर्टलवर ऑनलाइन पद्धतीने प्रसिद्ध केल्या जातात. इच्छुक कंत्राटदारांनी डिजिटल स्वाक्षरीसह (DSC) प्रणालीत नोंदणी करून निविदा सादर कराव्यात.'
                      : 'All university engineering civil and electrical tenders are published transparently on the Government of Maharashtra portal (https://mahatenders.gov.in). Contractors must possess valid digital signatures (Class-III DSC) to bid.'}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/tenders"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'mr' ? 'विद्यापीठ सर्व निविदा पहा' : 'View University Tenders Board'}</span>
                  </Link>

                  <a
                    href="https://mahatenders.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-bold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-sky-700" />
                    <span>mahatenders.gov.in</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
