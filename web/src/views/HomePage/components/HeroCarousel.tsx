'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';

interface HeroCarouselProps {
  slides: any[];
}

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

  return (
    <section className="w-full max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 my-4 sm:my-6 select-none">
      {/* VH Formatted, Unattached Floating Canvas with Left & Right Margins */}
      <div
        className="relative w-full h-[62vh] sm:h-[70vh] lg:h-[76vh] min-h-[440px] max-h-[720px] rounded-3xl sm:rounded-[2rem] overflow-hidden bg-slate-900 shadow-[0_12px_45px_rgba(15,23,42,0.08)] border border-slate-200/80 group"
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
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide">
            <span className="text-amber-300 font-semibold">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/70">{String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Small, Tasteful Text Capsule at Left Bottom of Image */}
        <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-20 max-w-[90%] sm:max-w-md pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="p-3.5 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-lg space-y-1"
            >
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium tracking-wider text-amber-300 uppercase">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>
                  {language === 'mr'
                    ? 'राहुरी मध्यवर्ती परिसर'
                    : 'Rahuri Central Campus'}
                </span>
              </div>
              <h2 className="text-xs sm:text-sm md:text-base font-semibold text-white/95 leading-snug drop-shadow-sm">
                {getBilingual(activeSlide?.title)}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle, Leisurely Prev/Next Controls at Bottom Right */}
        <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-20 flex items-center gap-2">
          {/* Pause / Play */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-full bg-black/35 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/15 transition-all text-xs"
            title={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Prev */}
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-black/35 hover:bg-black/60 text-white backdrop-blur-md border border-white/15 hover:border-amber-300/60 transition-all active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-black/35 hover:bg-black/60 text-white backdrop-blur-md border border-white/15 hover:border-amber-300/60 transition-all active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
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
