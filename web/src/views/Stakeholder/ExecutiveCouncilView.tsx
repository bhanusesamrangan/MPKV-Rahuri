'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Landmark,
  Users,
  Search,
  X,
  ChevronRight,
  Home,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Sprout,
  Building2,
  Scale,
  UserCheck,
  ZoomIn,
  Layers
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import fallbackEcData from '@/data/scraped/pages/executive-council.json';

interface ExecutiveCouncilViewProps {
  pageData?: any;
}

export const ExecutiveCouncilView: React.FC<ExecutiveCouncilViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);

  const data = pageData?.members ? pageData : (fallbackEcData as any);
  const heroData = data?.hero || {};
  const stats = heroData?.stats || [];
  const members: any[] = data?.members || [];

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  const countByCat = (key: string) => members.filter((m) => m.categoryKey === key).length;

  const categoryTabs = [
    { id: 'all', labelEn: `All Members (${members.length})`, labelMr: `सर्व सदस्य (${members.length})`, icon: Layers },
    { id: 'leadership', labelEn: `Chairman & Secretariat (${countByCat('leadership')})`, labelMr: `अध्यक्ष व सचिवालय (${countByCat('leadership')})`, icon: Landmark },
    { id: 'legislature', labelEn: `Legislature MLA/MLC (${countByCat('legislature')})`, labelMr: `विधिमंडळ प्रतिनिधी (${countByCat('legislature')})`, icon: Scale },
    { id: 'scientists_icar', labelEn: `ICAR & Scientists (${countByCat('scientists_icar')})`, labelMr: `ICAR व शास्त्रज्ञ (${countByCat('scientists_icar')})`, icon: Award },
    { id: 'farmers_agripreneurs', labelEn: `Farmers & ZP (${countByCat('farmers_agripreneurs')})`, labelMr: `शेतकरी व जि.प. (${countByCat('farmers_agripreneurs')})`, icon: Sprout },
    { id: 'ex_officio', labelEn: `Ex-Officio Directors (${countByCat('ex_officio')})`, labelMr: `पदसिद्ध संचालक (${countByCat('ex_officio')})`, icon: Building2 }
  ];

  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return members.filter((m) => {
      if (activeCategory !== 'all' && m.categoryKey !== activeCategory) return false;
      if (!q) return true;
      const fields = [
        m.nameAndAddress?.en,
        m.nameAndAddress?.mr,
        m.category?.en,
        m.category?.mr,
        m.provision?.en,
        m.provision?.mr,
        m.phone,
        m.email
      ];
      return fields.some((f) => (f || '').toLowerCase().includes(q));
    });
  }, [members, activeCategory, searchQuery]);

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
          <Link href="/administration" className="hover:text-[#0b5c3a] transition-colors">
            {language === 'mr' ? 'अधिकारी व प्रशासन' : 'Administration & Officers'}
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="text-emerald-900 font-bold">
            {language === 'mr' ? 'कार्यकारी परिषद' : 'Executive Council'}
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
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
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

      {/* 3. Main Content */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16 space-y-6">

        {/* Guaranteed Anti-Clipping Tab Bar */}
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
                  onClick={() => setActiveCategory(tab.id)}
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

        {/* Search & Count Strip */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'mr' ? 'सदस्याचे नाव, प्रवर्ग किंवा कलम शोधा...' : 'Search council member, constituency, Act section...'}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-stone-50 border border-stone-300/80 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
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

          <div className="text-xs text-stone-600 font-medium">
            {language === 'mr' ? 'दाखवत असलेली पदे:' : 'Showing Seats:'}{' '}
            <strong className="text-emerald-900 font-bold">{filteredMembers.length}</strong> / {members.length}
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredMembers.map((member) => {
            const nameText = getBilingual(member.nameAndAddress);
            const isLeadership = member.categoryKey === 'leadership';
            return (
              <div
                key={member.srNo}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  isLeadership
                    ? 'bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/40 border-emerald-300 shadow-xs'
                    : member.isVacant
                      ? 'bg-stone-50/70 border-stone-200/80'
                      : 'bg-white border-stone-200/90 shadow-2xs hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Pill Row */}
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-900 text-amber-300 font-extrabold">
                      #{member.srNo} • {getBilingual(member.provision)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold truncate max-w-[180px]">
                      {getBilingual(member.category)}
                    </span>
                  </div>

                  {/* Portrait + Name & Constituency */}
                  <div className="flex items-start gap-4">
                    {member.photo ? (
                      <div
                        onClick={() => setSelectedImage({ src: member.photo, caption: nameText })}
                        className="w-20 h-24 rounded-xl overflow-hidden border border-stone-300 bg-stone-100 shrink-0 cursor-pointer relative group"
                      >
                        <img
                          src={member.photo}
                          alt={nameText}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition"
                          loading="lazy"
                        />
                        <div className="absolute bottom-1 right-1 p-0.5 rounded bg-black/60 text-amber-300">
                          <ZoomIn className="w-3 h-3" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-20 h-24 rounded-xl border border-dashed border-stone-300 bg-stone-100 flex flex-col items-center justify-center text-stone-400 shrink-0">
                        <UserCheck className="w-6 h-6 opacity-60" />
                        <span className="text-[9px] font-bold mt-1 uppercase">
                          {member.isVacant ? (language === 'mr' ? 'रिक्त' : 'Vacant') : (language === 'mr' ? 'पदसिद्ध' : 'Ex-Officio')}
                        </span>
                      </div>
                    )}

                    <div className="space-y-1.5 min-w-0 flex-1">
                      <h3 className={`text-xs sm:text-sm font-extrabold font-serif leading-snug ${
                        member.isVacant ? 'text-stone-500 italic' : 'text-stone-900'
                      }`}>
                        {nameText}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Contact Bar */}
                {(member.phone || member.email) ? (
                  <div className="pt-3 border-t border-stone-200/70 space-y-1.5 text-xs">
                    {member.phone && (
                      <div className="flex items-center gap-2 text-stone-700">
                        <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="font-semibold">{member.phone}</span>
                      </div>
                    )}
                    {member.email && (
                      <div className="flex items-center gap-2 text-emerald-800 truncate">
                        <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <a href={`mailto:${member.email}`} className="font-bold hover:underline truncate">
                          {member.email}
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="pt-3 border-t border-stone-200/50 text-[11px] text-stone-400 font-medium">
                    {language === 'mr' ? 'शासन नामनिर्देशनाधीन पद' : 'Pending State Nomination / Institutional Seat'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Portrait Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-md w-full space-y-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center text-white text-xs gap-3">
              <span className="font-bold line-clamp-2">{selectedImage.caption}</span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={selectedImage.src} alt={selectedImage.caption} className="w-full rounded-2xl shadow-2xl" />
          </div>
        </div>
      )}

    </div>
  );
};
