'use client';

import React, { useMemo, useState } from 'react';
import {
  Wrench,
  Wifi,
  Printer,
  Share2,
  Disc3,
  BookOpenCheck,
  BellRing,
  Unlock,
  ZoomIn,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LibrarySubnav } from './components/LibrarySubnav';

interface ServiceItem {
  code: string;
  category: string;
  title: { en: string; mr: string };
  desc: { en: string; mr: string };
}

const SERVICE_ICONS: Record<string, React.ElementType> = {
  'SRV-01': Unlock,
  'SRV-02': Printer,
  'SRV-03': Share2,
  'SRV-04': Wifi,
  'SRV-05': Disc3,
  'SRV-06': BookOpenCheck,
  'SRV-07': BellRing,
};

export const LibraryServicesView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  const services: ServiceItem[] = pageData?.serviceItems || [];
  const heroImg = pageData?.hero?.image || '/media/images/library/S1.jpg';
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(services.map((s) => s.category)))],
    [services]
  );

  const visibleServices = useMemo(
    () =>
      selectedCategory === 'all'
        ? services
        : services.filter((s) => s.category === selectedCategory),
    [services, selectedCategory]
  );

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f3faf8] text-slate-800">
      <LibrarySubnav
        activeSlug="library-services"
        currentTitle={{ en: 'Library Services', mr: 'ग्रंथालय सेवा' }}
        accentActiveClass="bg-[#065f46] text-emerald-50 border-[#065f46] shadow-xs"
      />

      {/* TEAL-EMERALD SERVICE BENTO HERO WITH SERVICE FLOOR PHOTO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#022c22] via-[#064e3b] to-[#0f766e] text-white border-b-4 border-teal-300">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-300/15 border border-teal-200/40 text-teal-200 text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-teal-100/90 max-w-2xl leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>

            {/* Quick Service Telemetry Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15">
                <span className="block text-[10px] uppercase tracking-wider text-teal-200 font-bold">
                  {language === 'mr' ? 'इंटरनेट लॅन नोड्स' : 'LAN Workstations'}
                </span>
                <span className="text-lg font-extrabold text-white">60 Nodes</span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15">
                <span className="block text-[10px] uppercase tracking-wider text-teal-200 font-bold">
                  {language === 'mr' ? 'झेरॉक्स यंत्रे' : 'Photocopiers'}
                </span>
                <span className="text-lg font-extrabold text-white">3 Automatic Units</span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15">
                <span className="block text-[10px] uppercase tracking-wider text-teal-200 font-bold">
                  {language === 'mr' ? 'सीडी-रॉम डेटाबेस' : 'CD-ROM Server'}
                </span>
                <span className="text-lg font-extrabold text-white">Virtual Mirror</span>
              </div>
            </div>
          </div>

          {/* Authentic S1.jpg Services Card */}
          <div className="lg:col-span-5">
            <div
              onClick={() => setZoomImg(heroImg)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-teal-300/50 shadow-2xl"
            >
              <img
                src={heroImg}
                alt="MPKV Central Library Patron Services"
                className="w-full h-[250px] sm:h-[290px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end justify-between p-4">
                <span className="text-xs font-semibold text-teal-100">
                  {language === 'mr'
                    ? 'ग्रंथालय संगणक कक्ष व वाचक सेवा'
                    : 'Central Library IT Nodes & Reference Wing'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-semibold">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Zoom
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-8">
        {/* Category Filter Tabs (Anti-Clipping) */}
        <div
          className="flex flex-wrap items-center gap-2"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                selectedCategory === cat
                  ? 'bg-[#064e3b] text-white border-[#064e3b]'
                  : 'bg-white text-slate-700 border-teal-200 hover:bg-teal-50'
              }`}
            >
              {cat === 'all' ? (language === 'mr' ? `सर्व सेवा (${services.length})` : `All Services (${services.length})`) : cat}
            </button>
          ))}
        </div>

        {/* Modular Bento Desk Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((srv, idx) => {
            const Icon = SERVICE_ICONS[srv.code] || Wrench;
            const isWide = idx === 0 && visibleServices.length >= 7;
            return (
              <div
                key={srv.code}
                className={`rounded-2xl bg-white border border-teal-200/70 p-6 shadow-xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between space-y-4 ${
                  isWide ? 'lg:col-span-2 bg-gradient-to-br from-white to-teal-50/60' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-3 rounded-xl bg-teal-50 text-teal-800 border border-teal-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px] font-bold">
                        {srv.code}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold">
                        {srv.category}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{getTxt(srv.title)}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{getTxt(srv.desc)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {zoomImg && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomImg(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomImg(null)}
              className="absolute -top-11 right-0 p-2 rounded-full bg-white/15 text-white hover:bg-white/30"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={zoomImg} alt="Library Service Infrastructure" className="w-full max-h-[85vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};
