'use client';

import React, { useMemo, useState } from 'react';
import {
  Camera,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { StudentBreadcrumb } from './components/StudentBreadcrumb';

interface PhotoItem {
  id: number;
  src: string;
  album: string;
  caption: { en: string; mr: string };
}

export const StudentGalleryView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [albumFilter, setAlbumFilter] = useState<string>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const photos: PhotoItem[] = pageData?.photos || [];
  const albums = useMemo(
    () => ['all', ...Array.from(new Set(photos.map((p) => p.album)))],
    [photos]
  );

  const visiblePhotos = useMemo(
    () => (albumFilter === 'all' ? photos : photos.filter((p) => p.album === albumFilter)),
    [photos, albumFilter]
  );

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  const currentPhoto = lightboxIdx !== null ? visiblePhotos[lightboxIdx] : null;

  return (
    <div className="w-full min-h-screen bg-[#121215] text-zinc-100">
      <StudentBreadcrumb currentTitle={{ en: 'Student Photo Gallery', mr: 'विद्यार्थी छायाचित्र दालन' }} />

      {/* DARK STUDIO CHARCOAL & GOLD HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#27272a] border-b border-amber-400/40">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-4 h-4" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          <div className="px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 shrink-0">
            <Images className="w-6 h-6 text-amber-300" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Archive Size</p>
              <p className="text-xl font-extrabold text-white">{photos.length} Photographs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 space-y-8">
        {/* Album Filter Bar */}
        <div
          className="flex flex-wrap items-center gap-2"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
        >
          {albums.map((alb) => (
            <button
              key={alb}
              onClick={() => {
                setAlbumFilter(alb);
                setLightboxIdx(null);
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                albumFilter === alb
                  ? 'bg-amber-400 text-zinc-950 border-amber-400'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              {alb === 'all' ? (language === 'mr' ? `सर्व (${photos.length})` : `All Photos (${photos.length})`) : alb}
            </button>
          ))}
        </div>

        {/* Masonry Photo Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {visiblePhotos.map((ph, idx) => (
            <div
              key={ph.id}
              onClick={() => setLightboxIdx(idx)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-amber-400/70 transition-all cursor-pointer"
            >
              <img
                src={ph.src}
                alt={getTxt(ph.caption)}
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    {ph.album}
                  </span>
                  <p className="text-xs font-semibold text-white mt-0.5">{getTxt(ph.caption)}</p>
                </div>
                <span className="p-2 rounded-full bg-white/20 text-white shrink-0">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Carousel Lightbox Modal */}
      {currentPhoto && lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div className="relative max-w-5xl w-full flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxIdx((lightboxIdx - 1 + visiblePhotos.length) % visiblePhotos.length)}
              className="p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white shrink-0"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative flex-1 text-center">
              <button
                onClick={() => setLightboxIdx(null)}
                className="absolute -top-11 right-0 p-2 rounded-full bg-white/15 text-white hover:bg-white/30"
                aria-label="Close gallery viewer"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={currentPhoto.src}
                alt={getTxt(currentPhoto.caption)}
                className="w-full max-h-[80vh] object-contain rounded-xl mx-auto"
              />
              <p className="text-sm text-amber-200 font-semibold mt-3">
                {lightboxIdx + 1} / {visiblePhotos.length} — {getTxt(currentPhoto.caption)}
              </p>
            </div>

            <button
              onClick={() => setLightboxIdx((lightboxIdx + 1) % visiblePhotos.length)}
              className="p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white shrink-0"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
