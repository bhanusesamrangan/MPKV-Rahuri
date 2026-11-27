'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FolderOpen,
  Grid3X3,
  Home,
  Images,
  Layers,
  Maximize2,
  Play,
  Search,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
  Calendar,
  ArrowLeft,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface GalleryPhotoRecord {
  id: string;
  albumId: string;
  albumTitle: { en: string; mr: string };
  category: 'convocation' | 'expo' | 'research' | 'visits' | 'campus';
  year: string;
  src: string;
  originalUrl?: string;
}

export interface GalleryAlbumRecord {
  id: string;
  title: { en: string; mr: string };
  category: 'convocation' | 'expo' | 'research' | 'visits' | 'campus';
  year: string;
  dateLabel?: string;
  cover: string;
  previews: string[];
  count: number;
}

interface PhotoGalleryViewProps {
  pageData?: any;
}

type CategoryKey = 'all' | 'convocation' | 'expo' | 'research' | 'visits' | 'campus';

const CATEGORY_META: {
  key: CategoryKey;
  label: { en: string; mr: string };
}[] = [
  { key: 'all', label: { en: 'All Events', mr: 'सर्व कार्यक्रम' } },
  { key: 'convocation', label: { en: 'Convocation & Academic', mr: 'दीक्षांत व शैक्षणिक' } },
  { key: 'expo', label: { en: 'Krishi Expo & Farmers', mr: 'कृषी महोत्सव व शेतकरी' } },
  { key: 'research', label: { en: 'Research & Seminars', mr: 'संशोधन व कार्यशाळा' } },
  { key: 'visits', label: { en: 'Dignitary Visits & MoUs', mr: 'मान्यवर भेटी व करार' } },
  { key: 'campus', label: { en: 'National Days & Campus', mr: 'राष्ट्रीय दिन व परिसर' } },
];

const PAGE_BATCH_SIZE = 48;

export const PhotoGalleryView: React.FC<PhotoGalleryViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const isMr = language === 'mr';

  const albums: GalleryAlbumRecord[] = useMemo(() => pageData?.albums || [], [pageData]);
  const allPhotos: GalleryPhotoRecord[] = useMemo(() => pageData?.photos || [], [pageData]);

  const [viewMode, setViewMode] = useState<'photos' | 'albums'>('photos');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleLimit, setVisibleLimit] = useState<number>(PAGE_BATCH_SIZE);

  // Lightbox state
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const years = useMemo(() => {
    const yrs = new Set<string>();
    albums.forEach((a) => {
      if (a.year && /^\d{4}$/.test(a.year)) yrs.add(a.year);
    });
    return ['all', ...Array.from(yrs).sort((a, b) => Number(b) - Number(a))];
  }, [albums]);

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryKey, number> = {
      all: albums.length,
      convocation: 0,
      expo: 0,
      research: 0,
      visits: 0,
      campus: 0,
    };
    albums.forEach((a) => {
      if (a.category in counts) {
        counts[a.category] += 1;
      }
    });
    return counts;
  }, [albums]);

  const filteredAlbums = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return albums.filter((alb) => {
      if (selectedCategory !== 'all' && alb.category !== selectedCategory) return false;
      if (selectedYear !== 'all' && alb.year !== selectedYear) return false;
      if (q) {
        const hay = `${alb.title.en} ${alb.title.mr} ${alb.year}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [albums, selectedCategory, selectedYear, searchQuery]);

  const filteredPhotos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allPhotos.filter((ph) => {
      if (selectedAlbumId !== 'all' && ph.albumId !== selectedAlbumId) return false;
      if (selectedCategory !== 'all' && ph.category !== selectedCategory) return false;
      if (selectedYear !== 'all' && ph.year !== selectedYear) return false;
      if (q) {
        const hay = `${ph.albumTitle.en} ${ph.albumTitle.mr} ${ph.year}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allPhotos, selectedAlbumId, selectedCategory, selectedYear, searchQuery]);

  const activeAlbumObj = useMemo(
    () => (selectedAlbumId !== 'all' ? albums.find((a) => a.id === selectedAlbumId) || null : null),
    [albums, selectedAlbumId]
  );

  const visiblePhotos = useMemo(
    () => filteredPhotos.slice(0, visibleLimit),
    [filteredPhotos, visibleLimit]
  );

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleLimit(PAGE_BATCH_SIZE);
    setLightboxIdx(null);
  }, [selectedCategory, selectedYear, selectedAlbumId, searchQuery]);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIdx(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setLightboxIdx((prev) => (prev === null ? null : (prev + 1) % filteredPhotos.length));
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIdx((prev) =>
          prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIdx, filteredPhotos.length]);

  const openAlbumPhotos = (albumId: string) => {
    setSelectedAlbumId(albumId);
    setViewMode('photos');
    setVisibleLimit(200);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 320, behavior: 'smooth' });
    }
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedYear('all');
    setSelectedAlbumId('all');
    setSearchQuery('');
  };

  const currentPhoto = lightboxIdx !== null ? filteredPhotos[lightboxIdx] || null : null;

  return (
    <div className="w-full min-h-screen bg-[#f8faf8] text-slate-900">
      {/* Compact Breadcrumb Strip */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 text-xs">
          <nav className="flex items-center gap-1.5 text-slate-500">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-emerald-700 transition-colors font-medium">
              <Home className="w-3.5 h-3.5" />
              <span>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-emerald-800">
              {isMr ? 'छायाचित्र दालन' : 'University Photo Gallery'}
            </span>
          </nav>

          <a
            href="https://www.youtube.com/@mpkvrahuri1161"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] transition-colors shrink-0"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>{isMr ? 'अधिकृत यूट्यूब वाहिनी' : 'Official YouTube'}</span>
            <ExternalLink className="w-3 h-3 text-rose-200" />
          </a>
        </div>
      </div>

      {/* Editorial Emerald & Gold Studio Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#06291b] via-[#0c3b28] to-[#134e35] text-white border-b-4 border-amber-400">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(251,191,36,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.4), transparent 50%)',
          }}
        />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold tracking-wide">
              <Camera className="w-3.5 h-3.5" />
              <span>{isMr ? 'अधिकृत छायाचित्र संग्रहालय' : 'Official Visual Chronicle'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              {isMr
                ? 'विद्यापीठ कार्यक्रम व परिसर छायाचित्र दालन'
                : 'MPKV Rahuri Event & Campus Photo Gallery'}
            </h1>
            <p className="text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
              {isMr
                ? 'महात्मा फुले कृषि विद्यापीठातील दीक्षांत समारंभ, फुले कृषी महोत्सव, राष्ट्रीय दिन, संशोधन कार्यशाळा आणि मान्यवरांच्या भेटींचे संपूर्ण छायाचित्र दालन.'
                : 'Complete visual archive capturing convocations, Phule Krishi Mahotsav exhibitions, scientific conclaves, national celebrations, and dignitary visits across Mahatma Phule Krishi Vidyapeeth.'}
            </p>
          </div>

          {/* Summary Stat Counters */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-amber-300">{albums.length}</p>
              <p className="text-[11px] font-semibold text-emerald-100 mt-0.5">
                {isMr ? 'कार्यक्रम अल्बम' : 'Event Albums'}
              </p>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-white">{allPhotos.length}</p>
              <p className="text-[11px] font-semibold text-emerald-100 mt-0.5">
                {isMr ? 'एकूण छायाचित्रे' : 'Total Photos'}
              </p>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-200">2020–26</p>
              <p className="text-[11px] font-semibold text-emerald-100 mt-0.5">
                {isMr ? 'दस्तावेज कालावधी' : 'Archive Span'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Controls & Filters */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2.5">
          {/* Row 1: Search, Year, Album Selector, View Toggle */}
          <div className="flex flex-wrap items-center gap-2.5 justify-between">
            <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px]">
              {/* Search Box */}
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isMr ? 'कार्यक्रम किंवा विषय शोधा...' : 'Search events, convocations, visits...'}
                  className="w-full pl-9 pr-8 py-1.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:outline-none text-xs font-medium text-slate-800"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Year Filter */}
              <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setSelectedAlbumId('all');
                  }}
                  aria-label="Filter by year"
                  className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  {years.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr === 'all' ? (isMr ? 'सर्व वर्षे' : 'All Years') : yr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Album Jump Dropdown */}
              <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 max-w-[260px]">
                <FolderOpen className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <select
                  value={selectedAlbumId}
                  onChange={(e) => {
                    setSelectedAlbumId(e.target.value);
                    if (e.target.value !== 'all') setViewMode('photos');
                  }}
                  aria-label="Select event album"
                  className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer truncate max-w-[215px]"
                >
                  <option value="all">
                    {isMr ? `सर्व अल्बम (${filteredAlbums.length})` : `All Albums (${filteredAlbums.length})`}
                  </option>
                  {filteredAlbums.map((alb) => (
                    <option key={alb.id} value={alb.id}>
                      {isMr ? alb.title.mr : alb.title.en} ({alb.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('photos')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'photos'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>{isMr ? `सर्व फोटो (${filteredPhotos.length})` : `Photos (${filteredPhotos.length})`}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('albums')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'albums'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isMr ? `अल्बम (${filteredAlbums.length})` : `Albums (${filteredAlbums.length})`}</span>
              </button>
            </div>
          </div>

          {/* Row 2: Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORY_META.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.key);
                    setSelectedAlbumId('all');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                    active
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/60'
                  }`}
                >
                  <span>{isMr ? cat.label.mr : cat.label.en}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {categoryCounts[cat.key]}
                  </span>
                </button>
              );
            })}

            {(selectedCategory !== 'all' || selectedYear !== 'all' || selectedAlbumId !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
              >
                <X className="w-3 h-3" />
                <span>{isMr ? 'फिल्टर काढा' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Workspace */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
        {/* Selected Album Highlight Banner */}
        {activeAlbumObj && viewMode === 'photos' && (
          <div className="rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-800 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md border border-emerald-700">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeAlbumObj.year}</span>
                <span>•</span>
                <span>
                  {activeAlbumObj.count} {isMr ? 'छायाचित्रे' : 'Photographs'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {isMr ? activeAlbumObj.title.mr : activeAlbumObj.title.en}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setSelectedAlbumId('all')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-emerald-950 hover:bg-amber-50 font-bold text-xs transition-colors shrink-0 self-start sm:self-center"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isMr ? 'सर्व अल्बम पहा' : 'Show All Photos'}</span>
            </button>
          </div>
        )}

        {/* VIEW MODE: ALBUMS SHOWCASE */}
        {viewMode === 'albums' && (
          <>
            {filteredAlbums.length === 0 ? (
              <EmptyState isMr={isMr} onReset={resetAllFilters} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredAlbums.map((alb) => (
                  <button
                    key={alb.id}
                    type="button"
                    onClick={() => openAlbumPhotos(alb.id)}
                    className="group text-left bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-500 transition-all duration-300 flex flex-col"
                  >
                    {/* Main Cover + Mini Strip */}
                    <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                      <img
                        src={alb.cover}
                        alt={isMr ? alb.title.mr : alb.title.en}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-xs text-white text-[11px] font-bold">
                        {alb.year}
                      </div>
                      <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold">
                        <Images className="w-3 h-3" />
                        <span>{alb.count}</span>
                      </div>
                      {/* Thumbnail preview dots at bottom */}
                      {alb.previews.length > 1 && (
                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center gap-1.5">
                          {alb.previews.slice(0, 4).map((pv, i) => (
                            <div
                              key={i}
                              className="h-8 w-11 rounded-md overflow-hidden border border-white/70 bg-slate-800 shadow-xs"
                            >
                              <img src={pv} alt="" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Album Caption */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 line-clamp-2 leading-snug">
                        {isMr ? alb.title.mr : alb.title.en}
                      </h3>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
                        <span>{isMr ? 'अल्बम उघडा' : 'Open Album'}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* VIEW MODE: ALL PHOTOS GRID */}
        {viewMode === 'photos' && (
          <>
            {filteredPhotos.length === 0 ? (
              <EmptyState isMr={isMr} onReset={resetAllFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {visiblePhotos.map((ph, idx) => (
                    <div
                      key={ph.id}
                      onClick={() => {
                        setLightboxIdx(idx);
                        setIsZoomed(false);
                      }}
                      className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-500 transition-all duration-300 cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                        <img
                          src={ph.src}
                          alt={isMr ? ph.albumTitle.mr : ph.albumTitle.en}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-bold">
                            {ph.year}
                          </span>
                          <span className="p-2 rounded-full bg-amber-400 text-slate-950 shadow-sm">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                      <div className="px-3 py-2.5 bg-white">
                        <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-emerald-800">
                          {isMr ? ph.albumTitle.mr : ph.albumTitle.en}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Bar */}
                {visiblePhotos.length < filteredPhotos.length && (
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <p className="w-full text-center text-xs font-semibold text-slate-500">
                      {isMr
                        ? `${filteredPhotos.length} पैकी ${visiblePhotos.length} छायाचित्रे दाखवली आहेत`
                        : `Showing ${visiblePhotos.length} of ${filteredPhotos.length} photographs`}
                    </p>
                    <button
                      type="button"
                      onClick={() => setVisibleLimit((v) => v + PAGE_BATCH_SIZE)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-sm transition-colors"
                    >
                      <Images className="w-4 h-4 text-amber-300" />
                      <span>
                        {isMr
                          ? `पुढील ${Math.min(PAGE_BATCH_SIZE, filteredPhotos.length - visiblePhotos.length)} फोटो पहा`
                          : `Load ${Math.min(PAGE_BATCH_SIZE, filteredPhotos.length - visiblePhotos.length)} More Photos`}
                      </span>
                    </button>
                    {filteredPhotos.length - visiblePhotos.length > PAGE_BATCH_SIZE && (
                      <button
                        type="button"
                        onClick={() => setVisibleLimit(filteredPhotos.length)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs transition-colors"
                      >
                        <span>
                          {isMr ? `सर्व ${filteredPhotos.length} पहा` : `Show All (${filteredPhotos.length})`}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Lightbox Modal */}
      {currentPhoto && lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-5"
          onClick={() => {
            setLightboxIdx(null);
            setIsZoomed(false);
          }}
        >
          {/* Top Bar */}
          <div
            className="max-w-6xl w-full mx-auto flex items-center justify-between gap-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <span>
                  {lightboxIdx + 1} / {filteredPhotos.length}
                </span>
                <span>•</span>
                <span>{currentPhoto.year}</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white truncate">
                {isMr ? currentPhoto.albumTitle.mr : currentPhoto.albumTitle.en}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsZoomed((z) => !z)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Toggle zoom"
                title={isZoomed ? (isMr ? 'लहान करा' : 'Zoom Out') : (isMr ? 'मोठे करा' : 'Zoom In')}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>
              <a
                href={currentPhoto.src}
                download
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Download photo"
                title={isMr ? 'डाउनलोड करा' : 'Download Photo'}
              >
                <Download className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => {
                  setLightboxIdx(null);
                  setIsZoomed(false);
                }}
                className="p-2 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stage Image + Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center gap-2 sm:gap-4 my-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setLightboxIdx((lightboxIdx - 1 + filteredPhotos.length) % filteredPhotos.length);
                setIsZoomed(false);
              }}
              className="p-2.5 sm:p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors shrink-0 z-10"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-1 h-full flex items-center justify-center overflow-auto">
              <img
                src={currentPhoto.src}
                alt={isMr ? currentPhoto.albumTitle.mr : currentPhoto.albumTitle.en}
                onClick={() => setIsZoomed((z) => !z)}
                className={`rounded-xl shadow-2xl transition-transform duration-300 cursor-zoom-in ${
                  isZoomed
                    ? 'max-h-none max-w-none w-auto scale-125 cursor-zoom-out'
                    : 'max-h-[70vh] max-w-full object-contain'
                }`}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setLightboxIdx((lightboxIdx + 1) % filteredPhotos.length);
                setIsZoomed(false);
              }}
              className="p-2.5 sm:p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors shrink-0 z-10"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Filmstrip Preview */}
          <div
            className="max-w-4xl w-full mx-auto flex items-center justify-center gap-1.5 overflow-x-auto py-1"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredPhotos
              .slice(Math.max(0, lightboxIdx - 5), Math.min(filteredPhotos.length, lightboxIdx + 6))
              .map((thumb, offset) => {
                const realIdx = Math.max(0, lightboxIdx - 5) + offset;
                const active = realIdx === lightboxIdx;
                return (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => {
                      setLightboxIdx(realIdx);
                      setIsZoomed(false);
                    }}
                    className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      active ? 'border-amber-400 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={thumb.src} alt="" className="w-full h-full object-cover" />
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyState: React.FC<{ isMr: boolean; onReset: () => void }> = ({ isMr, onReset }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
    <Camera className="w-10 h-10 text-slate-400 mx-auto" />
    <h3 className="text-base font-bold text-slate-800">
      {isMr ? 'निवडलेल्या निकषांनुसार छायाचित्रे आढळली नाहीत' : 'No photographs match the active filters'}
    </h3>
    <button
      type="button"
      onClick={onReset}
      className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors"
    >
      {isMr ? 'सर्व छायाचित्रे पहा' : 'Show All Photographs'}
    </button>
  </div>
);
