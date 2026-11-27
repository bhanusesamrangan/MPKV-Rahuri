'use client';

import React, { useEffect, useState } from 'react';
import {
  Globe2,
  Building,
  UserCheck,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ShieldCheck,
  ZoomIn,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { StudentBreadcrumb } from './components/StudentBreadcrumb';

export type IntlTab = 'home' | 'facilities' | 'desk' | 'reach';

interface Props {
  pageData: any;
  defaultTab?: IntlTab;
}

export const StudentInternationalView: React.FC<Props> = ({ pageData, defaultTab = 'home' }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<IntlTab>(defaultTab);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const homeData = pageData?.home || {};
  const facilitiesList: Array<{ en: string; mr: string }> = pageData?.facilities || [];
  const advisor = pageData?.advisorDesk || {};
  const mapUrl = pageData?.howToReach?.embedUrl || '';

  const bannerImg = homeData?.image || '/media/images/students/international.jpeg';
  const advisorImg = advisor?.image || '/media/images/students/advisor_dr_aher.jpeg';

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f2f9f8] text-slate-800">
      <StudentBreadcrumb currentTitle={{ en: 'International Students Cell', mr: 'आंतरराष्ट्रीय विद्यार्थी कक्ष' }} />

      {/* GLOBAL ENVOY TEAL & GOLD HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2e2c] via-[#115e59] to-[#0f766e] text-white border-b-4 border-amber-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Globe2 className="w-4 h-4 text-amber-300" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed max-w-2xl">
              {getTxt(pageData?.hero?.subtitle)}
            </p>

            {/* Quick Facts Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">MEA & MHRD Quota</p>
                <p className="text-lg font-extrabold">15% Seats</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">Countries</p>
                <p className="text-lg font-extrabold">6+ Nations</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">Hostel Amenities</p>
                <p className="text-lg font-extrabold">21 Facilities</p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-400 text-slate-950">
                <p className="text-[10px] uppercase tracking-wider font-extrabold">Nodal Window</p>
                <p className="text-sm font-extrabold mt-0.5">ICAR • ICCR</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              onClick={() => setZoomSrc(bannerImg)}
              className="group relative cursor-pointer rounded-3xl overflow-hidden border-2 border-amber-300/60 shadow-2xl"
            >
              <img
                src={bannerImg}
                alt="International Students Center MPKV Rahuri"
                className="w-full h-[260px] sm:h-[310px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end justify-between">
                <span className="text-xs font-semibold text-amber-100">
                  International Students Community • MPKV Rahuri
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold">
                  <ZoomIn className="w-3.5 h-3.5" /> Zoom
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 SUB-PAGE TABS BAR (All Internal Routes Unified) */}
      <div className="w-full bg-white border-b border-teal-200/70 py-3 px-4 sm:px-8 lg:px-[50px]">
        <div
          className="w-full max-w-[1720px] mx-auto flex flex-wrap items-center gap-2"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
        >
          {(
            [
              { id: 'home', icon: Globe2, label: { en: 'International Home & Quota', mr: 'परिचय व १५% कोटा' } },
              { id: 'facilities', icon: Building, label: { en: `Hostel Facilities (${facilitiesList.length})`, mr: `वसतिगृह सुविधा (${facilitiesList.length})` } },
              { id: 'desk', icon: UserCheck, label: { en: "Students Advisor's Desk", mr: 'विदेशी विद्यार्थी सल्लागार' } },
              { id: 'reach', icon: MapPin, label: { en: 'How to Reach (Campus Map)', mr: 'विद्यापीठ नकाशा व पत्ता' } },
            ] as const
          ).map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  activeTab === t.id
                    ? 'bg-[#115e59] text-amber-200 border-[#115e59] shadow-xs'
                    : 'bg-teal-50/60 text-slate-700 border-teal-200 hover:bg-teal-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{getTxt(t.label)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12">
        {/* TAB 1: INTERNATIONAL HOME */}
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl border border-teal-200/80 p-7 sm:p-9 shadow-xs space-y-5">
              <h2 className="text-2xl font-bold text-slate-900 pb-3 border-b border-stone-100">
                {language === 'mr' ? 'आंतरराष्ट्रीय विद्यार्थी केंद्र व प्रवेश प्रणाली' : 'International Students Center & 15% Single-Window Admission'}
              </h2>
              {(homeData?.paragraphs || []).map((p: { en: string; mr: string }, i: number) => (
                <p key={i} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {getTxt(p)}
                </p>
              ))}
            </div>

            <div className="lg:col-span-4 space-y-5">
              <div className="bg-[#0a2e2c] text-white rounded-3xl p-7 space-y-4">
                <ShieldCheck className="w-7 h-7 text-amber-300" />
                <h3 className="text-lg font-bold">
                  {language === 'mr' ? 'एक खिडकी नोंदणी विभाग' : 'Registrar Nodal Liaison'}
                </h3>
                <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
                  Office of the Registrar coordinates admissions through ICAR, ICCR, MEA & MHRD, Embassies, FRO registration and medical insurance.
                </p>
                <a
                  href="mailto:registrar.mpkv@nic.in"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300"
                >
                  <Mail className="w-4 h-4" />
                  registrar.mpkv@nic.in
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 21 INTERNATIONAL HOSTEL FACILITIES */}
        {activeTab === 'facilities' && (
          <div className="bg-white rounded-3xl border border-teal-200/80 p-7 sm:p-9 shadow-xs space-y-6">
            <div className="pb-4 border-b border-stone-100">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'mr'
                  ? 'आंतरराष्ट्रीय विद्यार्थी वसतिगृहातील सर्व २१ सुविधा'
                  : 'Facilities at International Students Hostel, MPKV Rahuri'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                AC self-contained single rooms, kitchen utensils, 24×7 Wi-Fi, campus bicycles, FRO transport & security
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {facilitiesList.map((fac, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#f2f9f8] border border-teal-200/70 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4.5 h-4.5 text-teal-700 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-800 font-medium leading-snug">{getTxt(fac)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FOREIGN STUDENTS ADVISOR DESK (Dr. A. R. Aher) */}
        {activeTab === 'desk' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-white rounded-3xl border border-teal-200/80 p-6 shadow-xs space-y-5">
              <div
                onClick={() => setZoomSrc(advisorImg)}
                className="cursor-pointer rounded-2xl overflow-hidden border border-teal-200 bg-stone-100"
              >
                <img
                  src={advisorImg}
                  alt={advisor?.name || 'Dr. A. R. Aher'}
                  className="w-full h-72 object-cover object-top"
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  {getTxt(advisor?.designation)}
                </span>
                <h2 className="text-2xl font-bold text-slate-900">{advisor?.name}</h2>
              </div>
              <div className="space-y-2 pt-3 border-t border-stone-100 text-xs sm:text-sm text-slate-700">
                <p className="flex items-center gap-2 font-mono">
                  <Phone className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>{advisor?.phone}</span>
                </p>
                <a
                  href={`mailto:${advisor?.email}`}
                  className="flex items-center gap-2 text-teal-800 font-semibold hover:underline"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{advisor?.email}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 bg-white rounded-3xl border border-teal-200/80 p-7 sm:p-9 shadow-xs space-y-5">
              <h3 className="text-xl font-bold text-slate-900 pb-3 border-b border-stone-100">
                {language === 'mr' ? "विदेशी विद्यार्थी सल्लागार कक्ष संदेश" : "Students Advisor's Desk Overview"}
              </h3>
              {(advisor?.paragraphs || []).map((p: { en: string; mr: string }, i: number) => (
                <p key={i} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {getTxt(p)}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: HOW TO REACH (GOOGLE MAPS EMBED) */}
        {activeTab === 'reach' && (
          <div className="bg-white rounded-3xl border border-teal-200/80 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-teal-700" />
                <h2 className="text-xl font-bold text-slate-900">
                  {language === 'mr' ? 'महात्मा फुले कृषि विद्यापीठ, राहुरी — स्थान नकाशा' : 'How to Reach MPKV Central Campus, Rahuri'}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500">19.3477° N, 74.6454° E</span>
            </div>

            {mapUrl && (
              <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-teal-200">
                <iframe
                  src={mapUrl}
                  title="MPKV Rahuri Campus Location Map"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}
      </section>

      {zoomSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomSrc(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomSrc(null)}
              className="absolute -top-11 right-0 p-2 rounded-full bg-white/15 text-white hover:bg-white/30"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={zoomSrc} alt="International Students Center" className="w-full max-h-[85vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};
