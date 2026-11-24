'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Award,
  Trophy,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Star,
  ShieldCheck,
  Medal,
  Sprout,
  Droplets,
  Sparkles,
  Building2,
  GraduationCap
} from 'lucide-react';

export const AchievementsNirfSection: React.FC = () => {
  const { language, getBilingual } = useLanguage();

  const achievements = [
    {
      year: '2016',
      title: {
        en: 'National Record for Maximum Extant Notified Varieties (36 Crop Varieties Registered with PPV & FRA)',
        mr: 'पीपीव्ही व एफआरए नवी दिल्ली अंतर्गत सर्वाधिक ३६ अधिसूचित पीक वाणांची राष्ट्रीय विक्रमी नोंदणी'
      },
      authority: {
        en: 'PPV & FRA, Govt. of India',
        mr: 'पीपीव्ही व एफआरए, भारत सरकार'
      },
      tag: language === 'mr' ? 'राष्ट्रीय विक्रम' : 'National Record',
      icon: Medal,
      styles: {
        yearBg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950',
        tagBg: 'bg-amber-100 text-amber-950 border-amber-300/90',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xs shadow-amber-500/20',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-amber-50/40 hover:to-orange-50/50',
        border: 'border-amber-200/90 hover:border-amber-400',
        titleHover: 'group-hover:text-amber-950',
        arrow: 'text-amber-700 group-hover:text-amber-950',
        glow: 'hover:shadow-amber-500/10'
      }
    },
    {
      year: '2015',
      title: {
        en: 'Centre of Excellence in Seed Research in India by ICAR, New Delhi',
        mr: 'भारतीय कृषि अनुसंधान परिषद (ICAR) द्वारे बियाणे संशोधनासाठी "सेंटर ऑफ एक्सलन्स" सन्मान'
      },
      authority: {
        en: 'ICAR, New Delhi',
        mr: 'आयसीएआर, नवी दिल्ली'
      },
      tag: language === 'mr' ? 'उत्कृष्टता केंद्र' : 'Centre of Excellence',
      icon: Sprout,
      styles: {
        yearBg: 'bg-gradient-to-r from-emerald-600 to-green-700 text-white',
        tagBg: 'bg-emerald-100 text-emerald-950 border-emerald-300/90',
        iconBg: 'bg-gradient-to-br from-emerald-500 to-green-700 text-white shadow-xs shadow-emerald-500/20',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-emerald-50/40 hover:to-green-50/50',
        border: 'border-emerald-200/90 hover:border-emerald-400',
        titleHover: 'group-hover:text-emerald-950',
        arrow: 'text-emerald-700 group-hover:text-emerald-950',
        glow: 'hover:shadow-emerald-500/10'
      }
    },
    {
      year: '2014',
      title: {
        en: 'Centre of Excellence in Irrigation Water Management in India',
        mr: 'सिंचन व जलव्यवस्थापनात उत्कृष्ट कामगिरीसाठी राष्ट्रीय "सेंटर ऑफ एक्सलन्स" बहुमान'
      },
      authority: {
        en: 'ICAR & Ministry of Agriculture',
        mr: 'आयसीएआर व कृषि मंत्रालय'
      },
      tag: language === 'mr' ? 'जलव्यवस्थापन बहुमान' : 'National Water Honour',
      icon: Droplets,
      styles: {
        yearBg: 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white',
        tagBg: 'bg-cyan-100 text-cyan-950 border-cyan-300/90',
        iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xs shadow-cyan-500/20',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-cyan-50/40 hover:to-blue-50/50',
        border: 'border-cyan-200/90 hover:border-cyan-400',
        titleHover: 'group-hover:text-cyan-950',
        arrow: 'text-cyan-700 group-hover:text-cyan-950',
        glow: 'hover:shadow-cyan-500/10'
      }
    },
    {
      year: '2013',
      title: {
        en: 'Late Amit Singh Memorial Award for Best AICRP Centre of Vegetable in India',
        mr: 'अखिल भारतीय भाजीपाला समन्वित संशोधन प्रकल्पास देशातील "सर्वोत्कृष्ट केंद्र" पुरस्कार'
      },
      authority: {
        en: 'ICAR National Award',
        mr: 'आयसीएआर राष्ट्रीय पुरस्कार'
      },
      tag: language === 'mr' ? 'देशात प्रथम' : 'Rank 1 in India',
      icon: Trophy,
      styles: {
        yearBg: 'bg-gradient-to-r from-rose-600 to-pink-700 text-white',
        tagBg: 'bg-rose-100 text-rose-950 border-rose-300/90',
        iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs shadow-rose-500/20',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-rose-50/40 hover:to-pink-50/50',
        border: 'border-rose-200/90 hover:border-rose-400',
        titleHover: 'group-hover:text-rose-950',
        arrow: 'text-rose-700 group-hover:text-rose-950',
        glow: 'hover:shadow-rose-500/10'
      }
    },
    {
      year: '2013',
      title: {
        en: 'Award for Excellence in Safflower Research by ICAR, New Delhi',
        mr: 'करडई पीक संशोधन व उत्पादकतेत उल्लेखनीय योगदानासाठी आयसीएआर विशेष गौरव'
      },
      authority: {
        en: 'ICAR, New Delhi',
        mr: 'आयसीएआर, नवी दिल्ली'
      },
      tag: language === 'mr' ? 'विशेष गौरव' : 'Excellence Award',
      icon: Sparkles,
      styles: {
        yearBg: 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white',
        tagBg: 'bg-purple-100 text-purple-950 border-purple-300/90',
        iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xs shadow-purple-500/20',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-purple-50/40 hover:to-indigo-50/50',
        border: 'border-purple-200/90 hover:border-purple-400',
        titleHover: 'group-hover:text-purple-950',
        arrow: 'text-purple-700 group-hover:text-purple-950',
        glow: 'hover:shadow-purple-500/10'
      }
    }
  ];

  return (
    <section className="w-full py-16 bg-[#f3f7f3] border-t border-stone-300 relative overflow-hidden">
      
      {/* Subtle decorative glow backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-emerald-100 to-amber-100 border border-amber-300/90 text-amber-950 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'mr' ? 'राष्ट्रीय गौरव व उपलब्धी' : 'National Honours & Standing'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-emerald-900 font-bold">NIRF 2025</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight">
            {language === 'mr'
              ? 'सर्वोच्च राष्ट्रीय सन्मान, आयसीएआर मानांकन व एनआयआरएफ गौरव'
              : 'Apex National Standing, ICAR Accreditations & NIRF Ranking'}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] max-w-2xl mx-auto leading-relaxed">
            {language === 'mr'
              ? 'भारतीय कृषि अनुसंधान परिषद (ICAR) कडून "अ" श्रेणी मान्यताप्राप्त आणि भारत सरकारच्या शिक्षण मंत्रालयाकडून देशातील कृषी विद्यापीठांमध्ये १५ वे मानांकन.'
              : 'Accredited with Grade "A" by ICAR and officially ranked 15th across India among Agricultural Universities by the Ministry of Education, Govt. of India.'}
          </p>
        </div>

        {/* HERO SHOWCASE: NIRF 2025 AWARD PRESENTATION */}
        <div className="w-full rounded-3xl bg-gradient-to-br from-[#0c2417] via-[#123623] to-[#0a1e13] border border-emerald-700/60 shadow-xl overflow-hidden relative">
          
          {/* Subtle Ambient Refractive Highlights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10 relative z-10">
            
            {/* LEFT / CENTERPIECE: 3D ILLUSTRATION OF THE NIRF 2025 AWARD */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group max-w-[360px] sm:max-w-[400px] lg:max-w-full">
                {/* Golden ambient backlight behind trophy */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-emerald-500/20 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-80" />
                
                {/* The 3D Illustrated Trophy */}
                <img
                  src="/media/images/nirf_award_2025.jpg"
                  alt="NIRF 2025 Agriculture Excellence Award Rank 15 Illustration"
                  className="relative z-10 w-full rounded-2xl shadow-2xl border-2 border-amber-400/40 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Subtitle Under Image */}
                <div className="mt-3 text-center">
                  <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest flex items-center justify-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{language === 'mr' ? 'राष्ट्रीय संस्थागत मानांकन २०२५' : 'National Institutional Ranking Framework 2025'}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: AWARD CREDENTIALS, SCORE PILLARS & ACTIONS */}
            <div className="lg:col-span-7 space-y-6 text-white">
              
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm">
                  <Medal className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'एनआयआरएफ २०२५ · अखिल भारतीय मानांकन १५' : 'NIRF 2025 · ALL INDIA RANK 15'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'mr' ? 'कृषि विद्यापीठे प्रवर्ग' : 'Agriculture Category'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'mr' ? 'आयसीएआर "अ" श्रेणी' : 'ICAR "A" Grade Accredited'}</span>
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {language === 'mr'
                    ? 'शिक्षण मंत्रालय, भारत सरकार द्वारे देशातील कृषी विद्यापीठांमध्ये १५ वे मानांकन'
                    : 'Ranked 15th Among All Agricultural Universities in India by Ministry of Education'}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 mt-2.5 leading-relaxed font-medium">
                  {language === 'mr'
                    ? 'महात्मा फुले कृषि विद्यापीठाने उच्चांकी कृषी संशोधन, प्रगत तंत्रज्ञान विकास, दर्जेदार शेती शिक्षण आणि शेतकरी विस्तार कार्यात सातत्य राखत राष्ट्रीय स्तरावर अग्रगण्य स्थान मिळवले आहे.'
                    : 'Mahatma Phule Krishi Vidyapeeth has distinguished itself through ground-breaking agronomic research, high-yield crop notifications, state-of-the-art education, and transformative farmer extension outreach.'}
                </p>
              </div>

              {/* 4 Pillars of Evaluation (NIRF Evaluation Metrics) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                
                {/* Metric 1 */}
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3 hover:bg-white/15 transition-colors">
                  <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-200 font-semibold">
                      {language === 'mr' ? 'अध्यापन, अध्ययन व संसाधने' : 'Teaching, Learning & Resources'}
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-white mt-0.5">
                      {language === 'mr' ? 'उत्कृष्ट शैक्षणिक पायाभूत सुविधा' : 'Grade A+ Infrastructure'}
                    </div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3 hover:bg-white/15 transition-colors">
                  <div className="p-2 rounded-xl bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-200 font-semibold">
                      {language === 'mr' ? 'संशोधन व व्यावसायिक कार्य' : 'Research & Professional Practice'}
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-white mt-0.5">
                      {language === 'mr' ? 'अग्रगण्य कृषी शोधनिबंध व वाण' : 'Top Tier Research Output'}
                    </div>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3 hover:bg-white/15 transition-colors">
                  <div className="p-2 rounded-xl bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-200 font-semibold">
                      {language === 'mr' ? 'विद्यार्थी निकाल व यश' : 'Graduation Outcomes'}
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-white mt-0.5">
                      {language === 'mr' ? 'उच्च रोजगार व उद्योजकता' : 'Exemplary Placement Rate'}
                    </div>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3 hover:bg-white/15 transition-colors">
                  <div className="p-2 rounded-xl bg-rose-400/20 text-rose-300 border border-rose-400/30">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-200 font-semibold">
                      {language === 'mr' ? 'शेतकरी पोहोच व सर्वसमावेशकता' : 'Outreach & Extension'}
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-white mt-0.5">
                      {language === 'mr' ? '१० जिल्ह्यांत थेट शेतकरी सेवा' : '10 Districts Direct Reach'}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-emerald-200/80 font-medium">
                  {language === 'mr'
                    ? 'अधिकृत अहवाल · शिक्षण मंत्रालय (GoI)'
                    : 'Official Report · Ministry of Education, Govt. of India'}
                </div>

                <a
                  href="https://www.nirfindia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  <span>{language === 'mr' ? 'अधिकृत NIRF पोर्टल पहा' : 'Visit Official NIRF Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* MULTICOLOR NATIONAL MILESTONES & HONOURS CARDS */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-300">
            <div className="flex items-center gap-2.5 font-bold text-base sm:text-lg text-slate-900">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500 via-emerald-600 to-cyan-600 text-white shadow-xs">
                <Award className="w-4 h-4" />
              </div>
              <span>{language === 'mr' ? 'प्रमुख राष्ट्रीय उपलब्धी व ऐतिहासिक सन्मान' : 'Key National Honours & Historical Accolades'}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-950 bg-gradient-to-r from-emerald-100 via-amber-100 to-teal-100 px-3.5 py-1 rounded-full border border-emerald-300 shadow-2xs">
              <Sparkles className="w-3 h-3 text-emerald-700" />
              <span>{language === 'mr' ? '५७ वर्षांचा गौरवशाली इतिहास' : '57 Years of Heritage'}</span>
            </span>
          </div>

          {/* 5 Distinct Multicolor Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {achievements.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl ${item.styles.cardBg} border ${item.styles.border} shadow-2xs hover:shadow-md ${item.styles.glow} transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
                >
                  <div className="space-y-3">
                    {/* Top Year & Tag */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-black shadow-2xs ${item.styles.yearBg}`}>
                        {item.year}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.styles.tagBg}`}>
                        {item.tag}
                      </span>
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-start gap-2.5">
                      <div className={`p-2 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${item.styles.iconBg}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className={`text-xs sm:text-[13px] font-bold text-slate-900 transition-colors leading-snug line-clamp-3 ${item.styles.titleHover}`}>
                        {getBilingual(item.title)}
                      </h4>
                    </div>
                  </div>

                  {/* Authority Footer */}
                  <div className="mt-3.5 pt-2.5 border-t border-stone-200/70 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="font-semibold line-clamp-1">{getBilingual(item.authority)}</span>
                    <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform flex-shrink-0 ${item.styles.arrow}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
