'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Award, ArrowRight, Quote } from 'lucide-react';

interface AboutMahatmaPhuleSectionProps {
  aboutData: any;
}

export const AboutMahatmaPhuleSection: React.FC<AboutMahatmaPhuleSectionProps> = ({ aboutData }) => {
  const { language, getBilingual } = useLanguage();

  return (
    <section className="w-full py-20 bg-white relative overflow-hidden border-t border-slate-200/80">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Rich Text & Historical Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{language === 'mr' ? 'विद्यापीठाचे नामकरण व प्रेरणा' : 'Inspiration & Heritage'}</span>
            </div>

            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-semibold text-slate-900 tracking-tight leading-tight">
              {getBilingual(aboutData?.title)}
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base md:text-[15px] leading-relaxed text-justify">
              <p>
                {getBilingual(aboutData?.p1)}
              </p>
              <p>
                {getBilingual(aboutData?.p2)}
              </p>
            </div>

            {/* Historical Charter Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-4">
              <div className="p-2 rounded-xl bg-amber-400 text-slate-950 flex-shrink-0 mt-0.5">
                <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                {language === 'mr'
                  ? 'महान समाजसुधारक क्रांतिसूर्य महात्मा ज्योतिबा फुले यांच्या कृषिविषयक विचारांचा सन्मान करण्यासाठी आणि "शेतकऱ्यांचा आसूड" मधील शेती, पाणी व शिक्षणाच्या तत्त्वांवर कार्य करण्यासाठी या विद्यापीठास त्यांचे नाव देण्यात आले आहे.'
                  : 'Named in honor of Mahatma Jyotiba Phule, visionary author of "Shetkaryacha Asud" who championed agrarian irrigation, farmer literacy, and social reform across India.'}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/mpkv-at-a-glance"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md hover:scale-105 inline-flex items-center gap-2"
              >
                <span>{language === 'mr' ? 'दृष्टीक्षेपात म.फु.कृ.वि' : 'MPKV at a Glance'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about-mahatma-phule"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md hover:scale-105"
              >
                {language === 'mr' ? 'महात्मा फुले यांच्या विषयी' : 'About Mahatma Phule'}
              </Link>
            </div>
          </div>

          {/* Right Column: Full-Height Mahatma Phule Statue Frame */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group">
              {/* Outer decorative ambient blur */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-slate-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-700 pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl border-4 border-amber-400 max-w-[340px]">
                <img
                  src="/media/images/putula.png"
                  alt="Mahatma Jyotirao Phule Statue at Rahuri Campus"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="bg-slate-900 text-white text-center py-3.5 px-4">
                  <div className="font-semibold text-sm sm:text-base tracking-wide text-amber-300">
                    {language === 'mr' ? 'क्रांतिसूर्य महात्मा जोतीराव फुले' : 'Mahatma Jyotirao Phule'}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 mt-1">
                    {language === 'mr' ? 'मध्यवर्ती परिसर, राहुरी' : 'Central Campus, Rahuri'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
