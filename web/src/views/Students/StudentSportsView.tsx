'use client';

import React, { useState } from 'react';
import {
  Trophy,
  Dumbbell,
  Waves,
  FileText,
  Download,
  Phone,
  Users,
  ZoomIn,
  X,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { StudentBreadcrumb } from './components/StudentBreadcrumb';

interface SportDoc {
  id: string;
  title: { en: string; mr: string };
  href: string;
  tag: string;
}

export const StudentSportsView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [arenaTab, setArenaTab] = useState<'boys' | 'girls' | 'pool'>('boys');
  const [zoomOpen, setZoomOpen] = useState(false);

  const aboutSport = pageData?.aboutSport || {};
  const facilities = pageData?.facilities || {};
  const docs: SportDoc[] = pageData?.documents || [];
  const officers: Array<{ name: string; designation: { en: string; mr: string }; phone: string }> =
    pageData?.officers || [];
  const heroImg = pageData?.image || '/media/images/students/SportNew.jpg';

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  const boysItems: string[] = facilities?.boys || [];
  const girlsItems: string[] = facilities?.girls || [];

  return (
    <div className="w-full min-h-screen bg-[#faf6f3] text-slate-800">
      <StudentBreadcrumb currentTitle={{ en: 'Sports & Gymnasium', mr: 'क्रीडा व व्यायामशाळा' }} />

      {/* ATHLETIC CORAL-CRIMSON & TURF CHAMPIONSHIP HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3b0d0c] via-[#6b1a14] to-[#9a281d] text-white border-b-4 border-amber-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-amber-50/90 leading-relaxed max-w-2xl">
              {getTxt(aboutSport?.paragraph1)}
            </p>
            <p className="text-xs sm:text-sm text-amber-200/90 font-semibold">
              {getTxt(aboutSport?.paragraph2)}
            </p>

            {/* Varsity Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">Est.</p>
                <p className="text-lg font-extrabold">1969</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">Constituent</p>
                <p className="text-lg font-extrabold">09 Colleges</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">Affiliated</p>
                <p className="text-lg font-extrabold">63 Colleges</p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-400 text-slate-950">
                <p className="text-[10px] uppercase tracking-wider font-extrabold">Student Strength</p>
                <p className="text-lg font-extrabold">5,574 (2018-19)</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              onClick={() => setZoomOpen(true)}
              className="group relative cursor-pointer rounded-3xl overflow-hidden border-2 border-amber-300/60 shadow-2xl"
            >
              <img
                src={heroImg}
                alt="MPKV Sports Arena & Complex"
                className="w-full h-[270px] sm:h-[320px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end justify-between">
                <span className="text-xs font-semibold text-amber-100">
                  MPKV Central Sports Complex & Grounds
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold">
                  <ZoomIn className="w-3.5 h-3.5" /> Zoom
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-10">
        {/* INTERACTIVE SPORTS ARENA FACILITY SELECTOR */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">
              {language === 'mr' ? 'क्रीडा संकुल व मैदानी सुविधा' : 'Sports Complex & Gymnasium Facilities'}
            </h2>
            <div
              className="flex flex-wrap items-center gap-2"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: 'auto' }}
            >
              <button
                onClick={() => setArenaTab('boys')}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  arenaTab === 'boys'
                    ? 'bg-[#6b1a14] text-amber-200 border-[#6b1a14]'
                    : 'bg-stone-50 text-slate-700 border-stone-200'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5" />
                  {language === 'mr' ? `मुले (${boysItems.length})` : `Boys' Wing (${boysItems.length})`}
                </span>
              </button>
              <button
                onClick={() => setArenaTab('girls')}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  arenaTab === 'girls'
                    ? 'bg-[#6b1a14] text-amber-200 border-[#6b1a14]'
                    : 'bg-stone-50 text-slate-700 border-stone-200'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  {language === 'mr' ? `मुली (${girlsItems.length})` : `Girls' Wing (${girlsItems.length})`}
                </span>
              </button>
              <button
                onClick={() => setArenaTab('pool')}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  arenaTab === 'pool'
                    ? 'bg-[#6b1a14] text-amber-200 border-[#6b1a14]'
                    : 'bg-stone-50 text-slate-700 border-stone-200'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5" />
                  {language === 'mr' ? 'जलतरण तलाव' : 'Swimming Pool'}
                </span>
              </button>
            </div>
          </div>

          {arenaTab === 'boys' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {boysItems.map((it, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#faf6f3] border border-stone-200/80 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-900">{it}</span>
                  </div>
                ))}
              </div>
              <a
                href="/media/docs/students/sports_boys_gymnasium.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'mr' ? 'मुलांची व्यायामशाळा छायाचित्रे (PDF)' : 'View Photos: Boys Gymnasium & Grounds (PDF)'}</span>
              </a>
            </div>
          )}

          {arenaTab === 'girls' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {girlsItems.map((it, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#faf6f3] border border-stone-200/80 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-900">{it}</span>
                  </div>
                ))}
              </div>
              <a
                href="/media/docs/students/sports_girls_gymnasium.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'mr' ? 'मुलींची व्यायामशाळा छायाचित्रे (PDF)' : 'View Photos: Gymnasium for Girls Students (PDF)'}</span>
              </a>
            </div>
          )}

          {arenaTab === 'pool' && (
            <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">
                  {language === 'mr' ? 'विद्यापीठ जलतरण तलाव संकुल' : 'University Swimming Pool Facility'}
                </h3>
                <p className="text-sm text-slate-600">
                  {language === 'mr'
                    ? 'अधिकृत छायाचित्रे आणि तलाव तपशील पाहण्यासाठी PDF उघडा.'
                    : 'View verified MPKV Swimming Pool photo documentation.'}
                </p>
              </div>
              <a
                href="/media/docs/students/sports_swimming_pool.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-800 text-white font-bold text-xs hover:bg-sky-900"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'mr' ? 'जलतरण तलाव छायाचित्रे (PDF)' : 'View Swimming Pool Photos (PDF)'}</span>
              </a>
            </div>
          )}
        </div>

        {/* BOTTOM SPLIT: ACHIEVEMENTS, NSS & SPORTS CIRCULARS (7) + CONTACTS (2 OFFICERS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <FileText className="w-5 h-5 text-rose-800" />
              <h2 className="text-lg font-bold text-slate-900">
                {language === 'mr' ? 'यशोगथा, NSS व क्रीडा परिपत्रके (सर्व PDFs)' : 'Achievements, NSS, Time Tables & Annual Reports'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {docs.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#faf6f3] hover:bg-[#6b1a14] border border-stone-200/80 text-slate-900 hover:text-white transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 group-hover:text-amber-300">
                      {doc.tag}
                    </span>
                    <p className="text-sm font-bold leading-snug">{getTxt(doc.title)}</p>
                  </div>
                  <Download className="w-4 h-4 shrink-0 text-rose-700 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#3b0d0c] text-white rounded-3xl p-6 sm:p-7 space-y-5 shadow-md">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>{language === 'mr' ? 'क्रीडा व विद्यार्थी कल्याण अधिकारी' : 'Students Welfare & Sports Office'}</span>
            </div>

            <div className="space-y-3.5">
              {officers.map((off, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                  <h3 className="text-base font-bold text-white">{off.name}</h3>
                  <p className="text-xs font-semibold text-amber-200">{getTxt(off.designation)}</p>
                  <p className="text-xs text-stone-200 flex items-center gap-1.5 pt-1 font-mono">
                    <Phone className="w-3.5 h-3.5 text-amber-300" />
                    {off.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomOpen(false)}
              className="absolute -top-11 right-0 p-2 rounded-full bg-white/15 text-white hover:bg-white/30"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={heroImg} alt="Sports Facility" className="w-full max-h-[85vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};
