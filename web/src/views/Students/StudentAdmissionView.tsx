'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  FileText,
  ExternalLink,
  Download,
  Phone,
  Mail,
  Building2,
  BookOpen,
  Layers,
  Award,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { StudentBreadcrumb } from './components/StudentBreadcrumb';

interface TrackItem {
  id: string;
  level: { en: string; mr: string };
  title: { en: string; mr: string };
  authority: { en: string; mr: string };
  desc: { en: string; mr: string };
  courses: Array<{ label: string; href?: string }>;
}

interface PdfDoc {
  srNo: number;
  title: { en: string; mr: string };
  href: string;
  tag?: string;
}

export const StudentAdmissionView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [selectedTrack, setSelectedTrack] = useState<string>('mcaer');

  const tracks: TrackItem[] = pageData?.tracks || [];
  const eligibilityDocs: PdfDoc[] = pageData?.eligibilityPdfs || [];
  const circulars: PdfDoc[] = pageData?.circulars || [];
  const contact = pageData?.contact || {};

  const activeTrack = tracks.find((t) => t.id === selectedTrack) || tracks[0];
  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f5f6fb] text-slate-800">
      <StudentBreadcrumb currentTitle={{ en: 'Admission Procedure', mr: 'प्रवेश प्रक्रिया' }} />

      {/* ROYAL INDIGO & GOLD ADMISSION ROADMAP HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#141236] via-[#1e1b4b] to-[#312e81] text-white border-b-4 border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          {/* 3-Pathway Summary Cards */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs text-center">
              <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">MCAER Level</p>
              <p className="text-base sm:text-lg font-extrabold text-white mt-1">UG • PG • Ph.D</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs text-center">
              <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">University Degree</p>
              <p className="text-base sm:text-lg font-extrabold text-white mt-1">ABM & AH</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 text-center">
              <p className="text-[10px] uppercase tracking-wider font-extrabold">Non-Degree</p>
              <p className="text-base sm:text-lg font-extrabold mt-1">Diploma & Mali</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-10">
        {/* INTERACTIVE 3-PATHWAY ADMISSION SELECTOR */}
        <div className="space-y-6">
          <div
            className="flex flex-wrap items-center gap-2"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
          >
            {tracks.map((tr) => (
              <button
                key={tr.id}
                onClick={() => setSelectedTrack(tr.id)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  selectedTrack === tr.id
                    ? 'bg-[#1e1b4b] text-amber-300 border-[#1e1b4b] shadow-sm'
                    : 'bg-white text-slate-700 border-indigo-200 hover:bg-indigo-50'
                }`}
              >
                {getTxt(tr.title)}
              </button>
            ))}
          </div>

          {activeTrack && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 bg-white rounded-3xl border border-indigo-200/80 p-7 sm:p-9 shadow-xs space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold">
                    <Layers className="w-3.5 h-3.5" />
                    {getTxt(activeTrack.level)}
                  </span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {getTxt(activeTrack.authority)}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900">{getTxt(activeTrack.title)}</h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{getTxt(activeTrack.desc)}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {activeTrack.courses.map((c, idx) =>
                    c.href ? (
                      <a
                        key={idx}
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-600 text-indigo-950 hover:text-white border border-indigo-200 transition-all flex items-center justify-between gap-2 group"
                      >
                        <span className="text-sm font-bold">{c.label}</span>
                        <ExternalLink className="w-4 h-4 shrink-0 opacity-75 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4 text-indigo-700 shrink-0" />
                        <span>{c.label}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Deputy Registrar Contact Card */}
              <div className="lg:col-span-5 bg-[#1e1b4b] text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-5 shadow-md">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    {language === 'mr' ? 'प्रवेश संपर्क कार्यालय' : 'Official Admission Office'}
                  </span>
                  <h3 className="text-xl font-bold">{getTxt(contact?.designation)}</h3>
                  <p className="text-sm text-indigo-200 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{getTxt(contact?.office)}</span>
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/15">
                  <div className="p-3.5 rounded-xl bg-white/10 flex items-center gap-3">
                    <Phone className="w-4.5 h-4.5 text-amber-300 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-indigo-200 font-bold">Phone</p>
                      <p className="text-sm font-bold">{contact?.phone || '(02426) 243215'}</p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${contact?.email || 'dracdmpkv2013@rediffmail.com'}`}
                    className="p-3.5 rounded-xl bg-white/10 hover:bg-white/15 transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-4.5 h-4.5 text-amber-300 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-indigo-200 font-bold">Email</p>
                      <p className="text-sm font-bold break-all">{contact?.email || 'dracdmpkv2013@rediffmail.com'}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PROGRAM ELIGIBILITY PDF VAULT (4 MENU PDFs) + ADMISSION RELATED CIRCULARS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 4 Official Eligibility PDFs */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-indigo-200/80 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <Award className="w-5 h-5 text-indigo-800" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {language === 'mr' ? 'प्रवेश पात्रता निकष दस्तऐवज' : 'Admission Eligibility Criteria (4 Official PDFs)'}
                </h2>
                <p className="text-xs text-slate-500">Doctoral, Master&apos;s, Bachelor&apos;s & Diploma Eligibility Rules</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {eligibilityDocs.map((doc) => (
                <a
                  key={doc.srNo}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#f5f6fb] hover:bg-indigo-600 border border-indigo-200/70 text-slate-900 hover:text-white transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 group-hover:text-amber-300">
                      {doc.tag || 'Eligibility'}
                    </span>
                    <p className="text-sm font-bold truncate">{getTxt(doc.title)}</p>
                  </div>
                  <Download className="w-4 h-4 shrink-0 text-indigo-700 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Admission Related Circulars Table */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-indigo-200/80 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <FileText className="w-5 h-5 text-indigo-800" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {language === 'mr' ? 'प्रवेश संबंधित परिपत्रके व माहितीपत्रक' : 'Admission Related Circulars'}
                </h2>
                <p className="text-xs text-slate-500">Official University Prospectus & Notifications</p>
              </div>
            </div>

            <div className="space-y-3">
              {circulars.map((c) => (
                <div
                  key={c.srNo}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-indigo-700">Circular #{c.srNo}</span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{getTxt(c.title)}</h3>
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e1b4b] hover:bg-indigo-800 text-white text-xs font-bold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'PDF पहा' : 'View PDF'}</span>
                    </a>
                  ) : (
                    <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                      {language === 'mr' ? 'मूळ पोर्टलवर अनुपलब्ध (404)' : 'Source Archive Unavailable (404)'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
