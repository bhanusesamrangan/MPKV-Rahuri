'use client';

import React, { useMemo, useState } from 'react';
import {
  Newspaper,
  BookMarked,
  Calendar,
  Users,
  ZoomIn,
  X,
  Search,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LibrarySubnav } from './components/LibrarySubnav';

interface NewsItem {
  id: string;
  date: string;
  category: { en: string; mr: string };
  title: { en: string; mr: string };
  venue: { en: string; mr: string };
  chairperson: { en: string; mr: string };
  participants: number | null;
  summary: { en: string; mr: string };
}

interface PublicationItem {
  srNo: number;
  code: string;
  title: string;
  type: string;
}

export const LibraryNewsEventsView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [pubQuery, setPubQuery] = useState('');
  const [zoomPhoto, setZoomPhoto] = useState<{ src: string; caption: string } | null>(null);

  const newsItems: NewsItem[] = pageData?.newsItems || [];
  const publications: PublicationItem[] = pageData?.publications || [];
  const photos: Array<{ src: string; caption: { en: string; mr: string } }> = pageData?.photos || [];

  const filteredPubs = useMemo(() => {
    const q = pubQuery.trim().toLowerCase();
    if (!q) return publications;
    return publications.filter(
      (p) => p.title.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
    );
  }, [publications, pubQuery]);

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#fdf7f8] text-slate-800">
      <LibrarySubnav
        activeSlug="library-news-events"
        currentTitle={{ en: 'News, Events & Publications', mr: 'बातम्या, उपक्रम व प्रकाशने' }}
        accentActiveClass="bg-[#7f1d1d] text-amber-100 border-[#7f1d1d] shadow-xs"
      />

      {/* CLARET BURGUNDY EDITORIAL CHRONICLE HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#450a0a] via-[#7f1d1d] to-[#991b1b] text-white border-b-4 border-amber-300">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-300/15 border border-amber-200/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" />
            <span>{getTxt(pageData?.hero?.badge)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight max-w-4xl">
            {getTxt(pageData?.hero?.title)}
          </h1>
          <p className="text-sm sm:text-base text-rose-100/90 max-w-3xl leading-relaxed">
            {getTxt(pageData?.hero?.subtitle)}
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-12">
        {/* 4 AUTHENTIC EVENT PHOTOS GALLERY */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {language === 'mr' ? 'ग्रंथालय कार्यक्रम व कार्यशाळा छायाचित्र दालन (४)' : 'Event & Workshop Photo Highlights (4)'}
            </h2>
            <span className="text-xs text-slate-500">
              {language === 'mr' ? 'मोठे पाहण्यासाठी छायाचित्रावर क्लिक करा' : 'Click any photograph to enlarge'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {photos.map((ph, idx) => (
              <div
                key={idx}
                onClick={() => setZoomPhoto({ src: ph.src, caption: getTxt(ph.caption) })}
                className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-rose-200/60 shadow-xs cursor-pointer"
              >
                <img
                  src={ph.src}
                  alt={getTxt(ph.caption)}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent p-4 flex items-end justify-between gap-2">
                  <p className="text-xs font-semibold text-white leading-snug">{getTxt(ph.caption)}</p>
                  <span className="p-1.5 rounded-full bg-white/20 text-white shrink-0">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ASYMMETRIC CHRONICLE + BIBLIOGRAPHIC SHELF */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Columns: News & Advisory Committee Dispatches */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-rose-200/80">
              <Newspaper className="w-5 h-5 text-rose-800" />
              <h2 className="text-lg font-bold text-slate-900">
                {language === 'mr' ? 'वृत्तांत व सल्लागार समिती बैठका' : 'News & Advisory Dispatches'}
              </h2>
            </div>

            {newsItems.map((n) => (
              <article
                key={n.id}
                className="bg-white rounded-2xl border border-rose-200/70 p-6 shadow-xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-rose-900 text-amber-200 text-xs font-bold">
                    {getTxt(n.category)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800">
                    <Calendar className="w-3.5 h-3.5" />
                    {n.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{getTxt(n.title)}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{getTxt(n.summary)}</p>

                <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-3 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-700" />
                    {getTxt(n.venue)}
                  </span>
                  {n.participants && (
                    <span className="inline-flex items-center gap-1 font-semibold text-rose-900">
                      <Users className="w-3.5 h-3.5" />
                      {n.participants} Participants
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Right 7 Columns: Searchable 8 Official Library Publications Shelf */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-rose-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-800">
                  <BookMarked className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {language === 'mr'
                      ? 'विद्यापीठ ग्रंथालय अधिकृत प्रकाशने (८)'
                      : 'Official Library Publications & Catalogues (8)'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'mr'
                      ? 'प्रबंध सारांश, संदर्भसूची व अभ्यासक्रम हस्तपुस्तिका'
                      : 'Compendiums, Bibliographies, Catalogues & Course Manuals'}
                  </p>
                </div>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pubQuery}
                  onChange={(e) => setPubQuery(e.target.value)}
                  placeholder={language === 'mr' ? 'प्रकाशन शोधा...' : 'Filter publications...'}
                  className="pl-9 pr-3 py-1.5 rounded-xl border border-rose-200 text-xs w-48 focus:outline-rose-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredPubs.map((pub) => (
                <div
                  key={pub.code}
                  className="p-4 rounded-2xl bg-[#fdf7f8] border border-rose-200/60 hover:border-rose-400 transition-colors flex flex-col justify-between space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-rose-800">{pub.code}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white border border-rose-200 text-[10px] font-bold text-slate-700">
                      {pub.type}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{pub.title}</h3>
                </div>
              ))}
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
