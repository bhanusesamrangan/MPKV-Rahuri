'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';

interface HeroCarouselProps {
  slides: any[];
}

// Helper to ensure English text is consistently formatted in Camel / Title Case
const toCamelCaseTitle = (str: string): string => {
  if (!str) return '';
  const acronyms = new Set(['MPKV', 'ICAR', 'NCC', 'PGI', 'AICRP', 'ATIC', 'MOU', 'M.SC.', 'M.TECH.', 'PH.D.', 'D.SC.', '₹25']);
  return str
    .split(' ')
    .map((word) => {
      const clean = word.replace(/[^a-zA-Z.]/g, '').toUpperCase();
      if (acronyms.has(clean)) return word;
      if (word.length <= 1) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const { language, getBilingual } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideDuration = 5000;

  useEffect(() => {
    if (isPaused || !slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideDuration);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentSlide] || {};
  const rawTitleEn = typeof activeSlide?.title === 'object' ? activeSlide.title?.en : activeSlide?.title || '';
  const rawTitleMr = typeof activeSlide?.title === 'object' ? activeSlide.title?.mr : activeSlide?.title || '';

  const titleEn = toCamelCaseTitle(rawTitleEn);
  const titleMr = rawTitleMr || '';

  // Show both languages simultaneously, prioritizing the active language on top
  const primaryTitle = language === 'en' ? (titleEn || titleMr) : (titleMr || titleEn);
  const secondaryTitle = language === 'en' ? (titleMr !== titleEn ? titleMr : null) : (titleEn !== titleMr ? titleEn : null);

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] my-3 sm:my-4 md:my-5 select-none">
      {/* Proportionally Calibrated Floating Canvas with Viewport Balancing (+50px elevated height) */}
      <div
        className="relative w-full h-[calc(38vh+50px)] sm:h-[calc(46vh+50px)] md:h-[calc(52vh+50px)] lg:h-[calc(58vh+50px)] xl:h-[calc(62vh+50px)] min-h-[290px] sm:min-h-[370px] md:min-h-[430px] lg:min-h-[470px] max-h-[610px] rounded-2xl sm:rounded-3xl lg:rounded-[2rem] overflow-hidden bg-slate-900 shadow-[0_12px_45px_rgba(15,23,42,0.08)] border border-slate-200/80 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Full-Bleed Scenic Photography */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide?.image}
              alt={getBilingual(activeSlide?.title)}
              className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.02]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Subtle soft gradient at bottom so small text reads easily without darkening the photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Top-Right Minimal Slide Counter Badge */}
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-medium tracking-wide">
            <span className="text-amber-300 font-semibold">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/70">{String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Bilingual Text Capsule at Left Bottom of Image */}
        <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-20 max-w-[calc(100%-110px)] sm:max-w-xl pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="p-3 sm:p-4.5 lg:p-5 rounded-xl sm:rounded-2xl bg-black/55 backdrop-blur-md border border-white/20 text-white shadow-xl space-y-1.5"
            >
              {/* Capsule Pill - Bilingual in Camel Case */}
              <div className="flex items-center gap-1.5 text-[10.5px] sm:text-xs font-semibold tracking-wide text-amber-300">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 flex-shrink-0" />
                <span className="line-clamp-1">
                  राहुरी मध्यवर्ती परिसर · Rahuri Central Campus
                </span>
              </div>

              {/* Bilingual Titles - Both Languages Rendered in Camel Case */}
              <div className="space-y-0.5 sm:space-y-1">
                <h2 className="text-xs sm:text-base md:text-lg lg:text-xl font-semibold text-white/95 leading-snug drop-shadow-sm line-clamp-2">
                  {primaryTitle}
                </h2>
                {secondaryTitle && (
                  <p className="text-[11px] sm:text-xs md:text-sm font-medium text-amber-200/90 leading-snug drop-shadow-sm line-clamp-2">
                    {secondaryTitle}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle, Leisurely Prev/Next Controls at Bottom Right */}
        <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1.5 sm:gap-2">
          {/* Pause / Play */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 sm:p-2 rounded-full bg-black/35 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/15 transition-all text-xs"
            title={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </button>

          {/* Prev */}
          <button
            onClick={handlePrev}
            className="p-1.5 sm:p-2 rounded-full bg-black/35 hover:bg-black/60 text-white backdrop-blur-md border border-white/15 hover:border-amber-300/60 transition-all active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="p-1.5 sm:p-2 rounded-full bg-black/35 hover:bg-black/60 text-white backdrop-blur-md border border-white/15 hover:border-amber-300/60 transition-all active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Thin Delicate Progress Line at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/15 z-20">
          <motion.div
            key={currentSlide}
            initial={{ width: '0%' }}
            animate={{ width: isPaused ? '0%' : '100%' }}
            transition={{ duration: slideDuration / 1000, ease: 'linear' }}
            className="h-full bg-amber-400"
          />
        </div>
      </div>
    </section>
  );
};
