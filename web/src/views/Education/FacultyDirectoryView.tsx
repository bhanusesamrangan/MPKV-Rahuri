'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Search,
  Mail,
  Building2,
  GraduationCap,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  Award,
  Sparkles,
  Filter,
  Home,
  ChevronRight,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FacultyMember {
  name: { en: string; mr: string };
  designation: { en: string; mr: string };
  department: { en: string; mr: string };
  deptId: number;
  email: string;
  image: string;
  campus: { en: string; mr: string };
}

interface DepartmentGroup {
  deptId: number;
  name: { en: string; mr: string };
  facultyCount: number;
  faculty: FacultyMember[];
}

interface FacultyDirectoryViewProps {
  pageData?: any;
}

export const FacultyDirectoryView: React.FC<FacultyDirectoryViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  const departments: DepartmentGroup[] = pageData?.departments || [];
  const deansTable = pageData?.tables?.[0];

  // Flatten all faculty members
  const allFaculty: FacultyMember[] = useMemo(() => {
    const list: FacultyMember[] = [];
    departments.forEach((d) => {
      if (Array.isArray(d.faculty)) {
        list.push(...d.faculty);
      }
    });
    return list;
  }, [departments]);

  // Filtered faculty based on department tab and search
  const filteredFaculty = useMemo(() => {
    return allFaculty.filter((f) => {
      const matchesTab =
        activeTab === 'all' ||
        activeTab === 'leadership' ||
        String(f.deptId) === activeTab;

      if (!matchesTab) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const nameEn = f.name?.en?.toLowerCase() || '';
      const nameMr = f.name?.mr?.toLowerCase() || '';
      const desigEn = f.designation?.en?.toLowerCase() || '';
      const desigMr = f.designation?.mr?.toLowerCase() || '';
      const deptEn = f.department?.en?.toLowerCase() || '';
      const deptMr = f.department?.mr?.toLowerCase() || '';
      const email = f.email?.toLowerCase() || '';

      return (
        nameEn.includes(q) ||
        nameMr.includes(q) ||
        desigEn.includes(q) ||
        desigMr.includes(q) ||
        deptEn.includes(q) ||
        deptMr.includes(q) ||
        email.includes(q)
      );
    });
  }, [allFaculty, activeTab, searchQuery]);

  const handleCopyEmail = (email: string) => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="w-full bg-[#f8faf7] min-h-screen text-slate-800">
      
      {/* 1. Breadcrumb Strip */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <div className="w-full max-w-[1720px] mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
          <Link href="/" className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <Link href="/education/at-a-glance" className="hover:text-emerald-800 transition-colors">
            {language === 'mr' ? 'शिक्षण' : 'Education'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-emerald-950 font-bold truncate">
            {language === 'mr' ? 'प्राध्यापक वृंद निर्देशिका' : 'Faculty Directory'}
          </span>
        </div>
      </div>

      {/* 2. Hero Header Banner */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c3823] via-[#14532d] to-[#0a2f1b] text-white p-6 sm:p-8 lg:p-10 shadow-lg border border-emerald-700/50">
          
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-4xl">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'mr' ? 'शैक्षणिक व संशोधन प्राध्यापक वृंद' : 'Academic & Research Faculty Directory'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-amber-300 font-semibold">{language === 'mr' ? 'राहुरी कॅम्पस' : 'Rahuri Campus'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-serif leading-tight">
                {language === 'mr'
                  ? 'प्राध्यापक वृंद व शास्त्रज्ञ निर्देशिका'
                  : 'Faculty & Scientists Directory'}
              </h1>

              <p className="text-xs sm:text-sm lg:text-[14px] text-emerald-100/90 leading-relaxed font-normal max-w-3xl">
                {language === 'mr'
                  ? 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी व तंत्रज्ञान महाविद्यालय, पदव्युत्तर संस्था (PGI) आणि विद्यापीठाच्या विविध संशोधन विभागांमधील निष्णात प्राध्यापक, शास्त्रज्ञ व विषय तज्ज्ञ.'
                  : 'Distinguished professors, agricultural engineers, scientists, and researchers of Dr. Annasaheb Shinde College of Agricultural Engineering & Technology (AICTE Accredited) and MPKV academic leadership.'}
              </p>

              {/* Quick Stat Chips */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-white font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'mr' ? '५ प्रमुख अभियांत्रिकी शाखा' : '5 Core Engineering Departments'}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-white font-semibold">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{allFaculty.length} {language === 'mr' ? 'प्राध्यापक व शास्त्रज्ञ' : 'Faculty Members'}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-white font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>AICTE Accredited Faculty</span>
                </div>
              </div>
            </div>

            {/* IRINS National Portal Card Link */}
            <div className="lg:max-w-sm w-full p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white space-y-3 shrink-0 shadow-sm">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{language === 'mr' ? 'राष्ट्रीय संशोधन डेटाबेस' : 'National IRINS Portal'}</span>
              </div>
              <h3 className="font-bold text-sm sm:text-base leading-snug">
                {language === 'mr'
                  ? 'सर्व ८००+ प्राध्यापक शोध प्रोफाइल'
                  : 'Explore 800+ MPKV Faculty Research Profiles'}
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {language === 'mr'
                  ? 'शोधनिबंध, उद्धरणे (Citations), पेटंट्स आणि h-index माहिती भारत सरकारच्या आयरिन्स प्रणालीवर उपलब्ध.'
                  : 'Access peer-reviewed papers, citations, patents, and h-index on INFLIBNET Vidwan IRINS.'}
              </p>
              <a
                href="https://mpkv.irins.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs transition-all shadow-md"
              >
                <span>mpkv.irins.org</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-12 space-y-8">

        {/* Filter Bar & Search Toolbar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-4">
          
          {/* Top Row: Title/Count on Left + Search Input on Right */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Filter className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {language === 'mr' ? 'अभियांत्रिकी विभाग निवडा' : 'Filter by Department'}
                </span>
                <div className="text-xs text-stone-600 font-medium">
                  {language === 'mr'
                    ? `${allFaculty.length} प्राध्यापक व शास्त्रज्ञ उपलब्ध`
                    : `Showing ${filteredFaculty.length} of ${allFaculty.length} faculty members`}
                </div>
              </div>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'नाव, पदनाम किंवा ईमेल शोधा...' : 'Search by name, title, email...'}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Department Filter Pills (Flex-wrap with clean spacing, never clipped or overlapping) */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
              }`}
            >
              <span>{language === 'mr' ? 'सर्व प्राध्यापक' : 'All Departments'}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === 'all' ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-800'
              }`}>
                {allFaculty.length}
              </span>
            </button>

            {departments.map((dept) => {
              const isActive = activeTab === String(dept.deptId);
              return (
                <button
                  key={dept.deptId}
                  type="button"
                  onClick={() => setActiveTab(String(dept.deptId))}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                  }`}
                >
                  <span>{getBilingual(dept.name)}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-800'
                  }`}>
                    {dept.facultyCount}
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setActiveTab('leadership')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'leadership'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'अधिष्ठाता व नेतृत्व' : 'Deans & Leadership'}</span>
              {deansTable && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'leadership' ? 'bg-amber-600 text-slate-950' : 'bg-amber-200 text-amber-950'
                }`}>
                  {deansTable.rowCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* 4. Faculty Cards Grid */}
        {activeTab !== 'leadership' && (
          <section className="space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-stone-900">
                  {language === 'mr' ? 'उपलब्ध प्राध्यापक वृंद' : 'Faculty Members'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold">
                  {filteredFaculty.length} {language === 'mr' ? 'तज्ज्ञ' : 'Specialists'}
                </span>
              </div>
              {searchQuery && (
                <span className="text-xs text-stone-500">
                  {language === 'mr' ? `"${searchQuery}" साठी निकाल` : `Results for "${searchQuery}"`}
                </span>
              )}
            </div>

            {filteredFaculty.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 space-y-3">
                <SlidersHorizontal className="w-10 h-10 text-stone-400 mx-auto" />
                <div className="text-base font-bold text-slate-800">
                  {language === 'mr' ? 'कोणतेही प्राध्यापक सापडले नाहीत' : 'No faculty members found'}
                </div>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  {language === 'mr'
                    ? 'कृपया शोध शब्द तपासा किंवा सर्व विभाग फिल्टर निवडा.'
                    : 'Try clearing your search query or switching to "All Faculty".'}
                </p>
                <button
                  type="button"
                  onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
                  className="px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
                >
                  {language === 'mr' ? 'सर्व प्राध्यापक पहा' : 'View All Faculty'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredFaculty.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      {/* Top Row: Photo & Status Indicator */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 border-2 border-emerald-700/20 shadow-xs shrink-0 group-hover:border-emerald-600 transition-colors">
                          <img
                            src={member.image || '/media/images/avatar_placeholder.png'}
                            alt={getBilingual(member.name)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e: any) => {
                              e.target.onerror = null;
                              e.target.src = '/media/images/mpkv_icon.png';
                            }}
                          />
                        </div>

                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider text-right">
                          {getBilingual(member.department)}
                        </span>
                      </div>

                      {/* Name & Designation */}
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-900 transition-colors leading-snug">
                          {getBilingual(member.name)}
                        </h3>
                        <p className="text-xs font-semibold text-emerald-800 leading-tight">
                          {getBilingual(member.designation)}
                        </p>
                        <p className="text-[11px] text-stone-500 flex items-center gap-1 pt-0.5">
                          <Building2 className="w-3 h-3 text-stone-400 shrink-0" />
                          <span className="truncate">{getBilingual(member.campus)}</span>
                        </p>
                      </div>
                    </div>

                    {/* Contact & Actions Footer */}
                    <div className="pt-4 mt-4 border-t border-stone-100 space-y-2">
                      {member.email && (
                        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200/60 text-xs text-stone-700">
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-1.5 font-medium truncate hover:text-emerald-800 transition-colors"
                            title={`Email ${member.name.en}`}
                          >
                            <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span className="truncate">{member.email}</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleCopyEmail(member.email)}
                            className="p-1 rounded-md hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors shrink-0"
                            title="Copy email"
                          >
                            {copiedEmail === member.email ? (
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}

                      <a
                        href="https://mpkv.irins.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-xl bg-stone-100 hover:bg-emerald-900 hover:text-white text-stone-700 text-[11px] font-semibold transition-colors"
                      >
                        <span>{language === 'mr' ? 'संशोधन प्रोफाइल (IRINS)' : 'View Research Profile'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </section>
        )}

        {/* 5. Statutory Deans & Academic Leadership Table */}
        {(activeTab === 'leadership' || activeTab === 'all') && deansTable && (
          <section className="space-y-4 pt-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                  {getBilingual(deansTable.caption)}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {language === 'mr'
                    ? 'महात्मा फुले कृषी विद्यापीठाचे वैधानिक अधिष्ठाता, पदव्युत्तर शिक्षण व घटक महाविद्यालयांचे सहयोगी अधिष्ठाता'
                    : 'Statutory Deans, Post-Graduate Institute Leadership, and Associate Deans of Constituent Colleges'}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>{deansTable.rowCount} {language === 'mr' ? 'प्रमुख पदे' : 'Leadership Roles'}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
                    <tr>
                      {deansTable.headers?.map((h: any, idx: number) => (
                        <th key={idx} className="py-3 px-4">
                          {getBilingual(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {deansTable.rows?.map((row: any[], rIdx: number) => (
                      <tr key={rIdx} className="hover:bg-stone-50/80 transition-colors">
                        {row.map((cell: any, cIdx: number) => {
                          const isContactCol = cIdx === 4;
                          const cellText = getBilingual(cell.text);

                          return (
                            <td key={cIdx} className="py-3.5 px-4 font-medium text-stone-800">
                              {isContactCol ? (
                                <div className="flex items-center gap-2">
                                  {cell.fileLink ? (
                                    <a
                                      href={cell.fileLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 hover:bg-emerald-100 transition-colors"
                                    >
                                      <span>{cellText}</span>
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  ) : (
                                    <span className="font-semibold text-emerald-900 bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-100 text-xs">
                                      {cellText}
                                    </span>
                                  )}
                                </div>
                              ) : cIdx === 0 ? (
                                <span className="font-bold text-stone-500">{cellText}</span>
                              ) : cIdx === 1 ? (
                                <span className="font-bold text-slate-900">{cellText}</span>
                              ) : cIdx === 2 ? (
                                <span className="font-semibold text-emerald-800">{cellText}</span>
                              ) : (
                                <span className="text-stone-600">{cellText}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        )}

        {/* 6. Comprehensive Mandate & Accreditation Information */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-950 to-stone-900 text-white space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/80 pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
                {language === 'mr' ? 'अभियांत्रिकी व तंत्रज्ञान विद्याशाखा' : 'FACULTY OF AGRICULTURAL ENGINEERING & TECHNOLOGY'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif">
                {language === 'mr'
                  ? 'अखिल भारतीय तंत्रशिक्षण परिषद (AICTE) मान्यताप्राप्त संकुल'
                  : 'AICTE Accredited Engineering Leadership at Rahuri'}
              </h3>
            </div>
            <Link
              href="/education/constituent-colleges"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-emerald-950 hover:bg-emerald-100 font-bold text-xs transition-colors shrink-0"
            >
              <span>{language === 'mr' ? 'सर्व महाविद्यालये पहा' : 'View Constituent Colleges'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
            {language === 'mr'
              ? 'महात्मा फुले कृषी विद्यापीठाचे डॉ. अण्णासाहेब शिंदे कृषी अभियांत्रिकी महाविद्यालय हे भारतातील कृषी यांत्रिकीकरण, ड्रोन तंत्रज्ञान, सिंचन व्यवस्थापन व कृषी प्रक्रिया क्षेत्रातील अग्रेसर महाविद्यालय आहे. येथील प्राध्यापकांनी विकसित केलेली कृषी अवजारे, जलसंधारण तंत्रज्ञान आणि सौर ऊर्जा यंत्रे महाराष्ट्रासह संपूर्ण भारतात प्रमाणित वापरली जातात.'
              : 'Dr. Annasaheb Shinde College of Agricultural Engineering & Technology (ASCAET, Rahuri) is an AICTE-accredited institution pioneering farm mechanization, agricultural drone piloting, micro-irrigation engineering, and renewable energy technologies in India.'}
          </p>
        </section>

      </div>
    </div>
  );
};
