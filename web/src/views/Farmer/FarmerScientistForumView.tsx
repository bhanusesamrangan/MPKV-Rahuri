'use client';

import React, { useState } from 'react';
import {
  Users,
  Target,
  CheckCircle2,
  Download,
  Phone,
  Mail,
  MapPin,
  ZoomIn,
  X,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FarmerBreadcrumb } from './components/FarmerBreadcrumb';

export const FarmerScientistForumView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'objectives' | 'functions'>('objectives');
  const [zoomPhoto, setZoomPhoto] = useState<{ src: string; caption: string } | null>(null);

  const objectives: Array<{ en: string; mr: string }> = pageData?.objectives || [];
  const functionsList: Array<{ en: string; mr: string }> = pageData?.functions || [];
  const photos: Array<{ src: string; caption: { en: string; mr: string } }> = pageData?.photos || [];
  const doc = pageData?.document || {};
  const contact = pageData?.contact || {};

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f4f8f3] text-slate-800">
      <FarmerBreadcrumb currentTitle={{ en: 'Farmer Scientist Forum', mr: 'शेतकरी – शास्त्रज्ञ मंच' }} />

      {/* OLIVE-EMERALD FIELD FORUM HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0e2915] via-[#174022] to-[#235c32] text-white border-b-4 border-amber-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {getTxt(pageData?.intro)}
            </p>
          </div>

          {/* Live Forum Metrics */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
              <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">
                {language === 'mr' ? 'प्रारंभ' : 'Launched'}
              </p>
              <p className="text-base sm:text-lg font-extrabold mt-1">11 Oct 2005</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
              <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">
                {language === 'mr' ? 'एकूण मंच' : 'Active Forums'}
              </p>
              <p className="text-2xl font-extrabold mt-0.5">54</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 text-center">
              <p className="text-[10px] uppercase tracking-wider font-extrabold">
                {language === 'mr' ? 'सभासद शेतकरी' : 'Members'}
              </p>
              <p className="text-2xl font-extrabold mt-0.5">1,668</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-10">
        {/* 4 AUTHENTIC FIELD PHOTOGRAPHS STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((ph, idx) => (
            <div
              key={idx}
              onClick={() => setZoomPhoto({ src: ph.src, caption: getTxt(ph.caption) })}
              className="group relative rounded-2xl overflow-hidden border border-emerald-200/80 shadow-xs cursor-pointer bg-stone-900"
            >
              <img
                src={ph.src}
                alt={getTxt(ph.caption)}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 flex items-end justify-between gap-2">
                <span className="text-xs font-semibold text-white">{getTxt(ph.caption)}</span>
                <span className="p-1.5 rounded-full bg-white/20 text-white shrink-0">
                  <ZoomIn className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* OBJECTIVES / FUNCTIONS SWITCHER + ATIC CONTACT SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-emerald-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div
              className="flex flex-wrap items-center gap-2 pb-4 border-b border-stone-100"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
            >
              <button
                onClick={() => setActiveTab('objectives')}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  activeTab === 'objectives'
                    ? 'bg-[#174022] text-amber-200 border-[#174022]'
                    : 'bg-emerald-50 text-slate-700 border-emerald-200'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>
                  {language === 'mr' ? `उद्दिष्टे (${objectives.length})` : `Forum Objectives (${objectives.length})`}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('functions')}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  activeTab === 'functions'
                    ? 'bg-[#174022] text-amber-200 border-[#174022]'
                    : 'bg-emerald-50 text-slate-700 border-emerald-200'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>
                  {language === 'mr' ? `मंचाचे कार्य (${functionsList.length})` : `Core Functions (${functionsList.length})`}
                </span>
              </button>
            </div>

            <div className="space-y-3">
              {(activeTab === 'objectives' ? objectives : functionsList).map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#f4f8f3] border border-emerald-200/70 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{getTxt(item)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5">
            {/* Downloadable FSF Booklet PDF */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">{getTxt(doc?.title)}</h3>
              <a
                href={doc?.href || '/media/docs/farmer/fsf_booklet.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#174022] hover:bg-emerald-900 text-amber-200 font-bold text-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'mr' ? 'FSF पुस्तिका डाउनलोड (PDF)' : 'Open Official FSF Booklet PDF'}</span>
              </a>
            </div>

            {/* ATIC Manager Contact */}
            <div className="bg-[#0e2915] text-white rounded-3xl p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {language === 'mr' ? 'अधिकृत संपर्क कार्यालय' : 'Official Contact Office'}
              </span>
              <h3 className="text-lg font-bold">{getTxt(contact?.role)}</h3>
              <p className="text-xs text-emerald-100/90 flex items-start gap-2 leading-relaxed">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{getTxt(contact?.address)}</span>
              </p>
              <div className="pt-3 border-t border-white/15 space-y-2 text-xs">
                <p className="flex items-center gap-2 font-mono">
                  <Phone className="w-4 h-4 text-amber-300" />
                  {contact?.phone}
                </p>
                <a href={`mailto:${contact?.email}`} className="flex items-center gap-2 text-amber-200 hover:underline">
                  <Mail className="w-4 h-4" />
                  {contact?.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {zoomPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomPhoto(null)}
        >
          <div className="relative max-w-4xl w-full text-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomPhoto(null)}
              className="absolute -top-11 right-0 p-2 rounded-full bg-white/15 text-white hover:bg-white/30"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={zoomPhoto.src} alt={zoomPhoto.caption} className="w-full max-h-[82vh] object-contain rounded-xl mx-auto" />
            <p className="text-sm text-amber-200 font-semibold mt-3">{zoomPhoto.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};
