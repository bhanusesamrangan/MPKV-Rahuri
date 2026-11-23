'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const ScrollToTop: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Show button after scrolling down 300px
      if (scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate progress percentage
      if (docHeight > 0) {
        const progress = Math.min(Math.round((scrollY / docHeight) * 100), 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="relative group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-emerald-600 hover:from-emerald-700 hover:to-emerald-500 text-white shadow-lg hover:shadow-2xl shadow-emerald-950/25 border-2 border-white/80 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label={language === 'mr' ? 'पृष्ठाच्या सुरुवातीस जा (Scroll to top)' : 'Scroll to top'}
        title={language === 'mr' ? 'सुरुवातीस जा (Scroll to top)' : 'Scroll to top'}
      >
        {/* Subtle Outer SVG Scroll Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
          <circle
            cx="50%"
            cy="50%"
            r="44%"
            className="text-white/20 stroke-current"
            strokeWidth="2.5"
            fill="transparent"
          />
          <circle
            cx="50%"
            cy="50%"
            r="44%"
            className="text-amber-300 stroke-current transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={100}
            strokeDashoffset={100 - scrollProgress}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Icon */}
        <ArrowUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white group-hover:-translate-y-0.5 transition-transform duration-200 relative z-10" />

        {/* Floating Tooltip on Hover */}
        <span className="absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md border border-white/10 pointer-events-none">
          {language === 'mr' ? 'वर जा' : 'Top'}
        </span>
      </button>
    </div>
  );
};
