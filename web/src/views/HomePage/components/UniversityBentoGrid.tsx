'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  GraduationCap,
  Sprout,
  Users,
  BookOpen,
  ArrowRight,
  Layers,
  Atom,
  Flame
} from 'lucide-react';

export const UniversityBentoGrid: React.FC = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'education' | 'research' | 'extension'>('all');

  const bentoCards = [
    {
      id: 'education',
      category: 'education',
      span: 'lg:col-span-2 md:col-span-2',
      categoryBadge: language === 'mr' ? 'शिक्षण' : 'Education',
      metric: language === 'mr' ? '७,५००+ विद्यार्थी' : '7,500+ Students',
      icon: GraduationCap,
      title: language === 'mr' ? 'पदव्युत्तर महाविद्यालय व अभियांत्रिकी संकुल' : 'PG Institute & Engineering Colleges',
      desc: language === 'mr'
        ? 'PGI राहुरी येथे १० विषयांत M.Sc. व Ph.D. अध्यापन. डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी (CAET) आणि पुणे, धुळे, कोल्हापूर महाविद्यालये.'
        : 'PGI Rahuri across 10 PG departments, alongside Dr. A.S. CAET Engineering and constituent colleges at Pune, Dhule, and Kolhapur.',
      link: '/education/constituent-colleges',
      linkText: language === 'mr' ? 'महाविद्यालये' : 'Explore Colleges',
      styles: {
        cardBg: 'bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/50 hover:to-teal-50/80',
        border: 'border-emerald-200/90 hover:border-emerald-400',
        badgeBg: 'bg-emerald-100 text-emerald-950 border-emerald-300/80',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xs',
        metricBg: 'bg-white/90 border-emerald-200 text-emerald-900',
        linkText: 'text-emerald-800 hover:text-emerald-950'
      }
    },
    {
      id: 'research',
      category: 'research',
      span: 'lg:col-span-2 md:col-span-2',
      categoryBadge: language === 'mr' ? 'संशोधन' : 'Research',
      metric: language === 'mr' ? '२७०+ वाण · १३+ पेटंट्स' : '270+ Varieties · 13+ Patents',
      icon: Sprout,
      title: language === 'mr' ? 'पीक पैदास, बियाणे तंत्रज्ञान व पेटंट्स' : 'Crop Breeding, Seed Heritage & Patents',
      desc: language === 'mr'
        ? '२७०+ सुधारित वाण (फुले वरदान, समाधान, भगवा). PPV&FRA अंतर्गत ३६ वाणांची राष्ट्रीय विक्रमी नोंदणी व २७ संशोधन केंद्रे.'
        : 'Over 270 notified crop varieties, national PPV&FRA record holder (36 registered varieties), and 27 research stations.',
      link: '/research/varieties',
      linkText: language === 'mr' ? 'वाण व तंत्रज्ञान' : 'View Varieties',
      styles: {
        cardBg: 'bg-gradient-to-br from-white via-amber-50/40 to-orange-50/50 hover:to-orange-50/80',
        border: 'border-amber-200/90 hover:border-amber-400',
        badgeBg: 'bg-amber-100 text-amber-950 border-amber-300/80',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 shadow-xs',
        metricBg: 'bg-white/90 border-amber-200 text-amber-950',
        linkText: 'text-amber-800 hover:text-amber-950'
      }
    },
    {
      id: 'precision',
      category: 'research',
      span: 'lg:col-span-1 md:col-span-1',
      categoryBadge: language === 'mr' ? 'जागतिक बँक · NAHEP' : 'World Bank · NAHEP',
      metric: language === 'mr' ? 'DGCA ड्रोन व जलव्यवस्थापन' : 'DGCA Drone & Smart Water',
      icon: Atom,
      title: language === 'mr' ? 'हवामान शेती व कृषी ड्रोन्स (CAAST-CSAWM)' : 'Climate Ag & Drones (CAAST-CSAWM)',
      desc: language === 'mr'
        ? 'CAAST-CSAWM प्रगत कृषी विज्ञान केंद्र: DGCA प्रमाणित ड्रोन पायलट प्रशिक्षण अकॅडमी (RPTO), सेन्सर आधारित अचूक शेती व IoT सूक्ष्म सिंचन ऑटोमेशन.'
        : 'Centre for Advanced Agricultural Science & Technology (CAAST-CSAWM): DGCA drone pilot academy (RPTO), precision aerial spraying, and IoT climate-smart irrigation.',
      link: 'https://www.mpkv-caast.ac.in/',
      linkText: language === 'mr' ? 'mpkv-caast.ac.in पोर्टल' : 'mpkv-caast.ac.in Portal',
      styles: {
        cardBg: 'bg-gradient-to-br from-white via-cyan-50/40 to-sky-50/50 hover:to-sky-50/80',
        border: 'border-cyan-200/90 hover:border-cyan-400',
        badgeBg: 'bg-cyan-100 text-cyan-950 border-cyan-300/80',
        iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xs',
        metricBg: 'bg-white/90 border-cyan-200 text-cyan-900',
        linkText: 'text-cyan-800 hover:text-cyan-950'
      }
    },
    {
      id: 'extension',
      category: 'extension',
      span: 'lg:col-span-1 md:col-span-1',
      categoryBadge: language === 'mr' ? 'विस्तार' : 'Extension',
      metric: language === 'mr' ? '१० जिल्हे' : '10 Districts',
      icon: Users,
      title: language === 'mr' ? 'KVK नेटवर्क व शेतकरी ज्ञान' : 'KVK Outreach',
      desc: language === 'mr'
        ? '१० जिल्ह्यांत थेट शेतकरी प्रात्यक्षिके, ATIC केंद्र, तंत्रज्ञान हस्तांतरण व कृषी मेळावे.'
        : 'Direct farmer extension through KVKs, ATIC single-window center, and training camps.',
      link: '/extension/krishi-vigyan-kendras',
      linkText: language === 'mr' ? 'KVK विस्तार सेवा' : 'View KVK Centers',
      styles: {
        cardBg: 'bg-gradient-to-br from-white via-rose-50/40 to-pink-50/50 hover:to-pink-50/80',
        border: 'border-rose-200/90 hover:border-rose-400',
        badgeBg: 'bg-rose-100 text-rose-950 border-rose-300/80',
        iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs',
        metricBg: 'bg-white/90 border-rose-200 text-rose-900',
        linkText: 'text-rose-800 hover:text-rose-950'
      }
    },
    {
      id: 'livestock',
      category: 'research',
      span: 'lg:col-span-1 md:col-span-1',
      categoryBadge: language === 'mr' ? 'राकृवियो (RKVY) · उत्कृष्टता केंद्र' : 'RKVY · Centre of Excellence',
      metric: language === 'mr' ? 'गीर, साहिवाल व OPU-IVF' : 'Gir, Sahiwal & OPU-IVF',
      icon: Flame,
      title: language === 'mr' ? 'देशी गोवंश संशोधन व प्रशिक्षण (ICRTC)' : 'Indigenous Cattle (ICRTC Pune)',
      desc: language === 'mr'
        ? 'कृषी महाविद्यालय, पुणे येथील देशी गोवंश संशोधन व प्रशिक्षण केंद्र (ICRTC): गीर, साहिवाल, लाल सिंधी, राठी व थारपारकर गोवंश संवर्धन, OPU-IVF भ्रूण प्रत्यारोपण आणि दुग्ध व्यवसाय प्रशिक्षण.'
        : 'Indigenous Cattle Research-cum-Training Centre (ICRTC), College of Agriculture, Pune: Conservation of Gir, Sahiwal, Red Sindhi, Rathi, and Tharparkar breeds, OPU-IVF embryo transfer, and dairy entrepreneurship training.',
      link: 'https://www.icrtcmpkv.com/home',
      linkText: language === 'mr' ? 'icrtcmpkv.com पोर्टल' : 'icrtcmpkv.com Portal',
      styles: {
        cardBg: 'bg-gradient-to-br from-white via-yellow-50/40 to-amber-50/50 hover:to-amber-50/80',
        border: 'border-yellow-200/90 hover:border-amber-400',
        badgeBg: 'bg-amber-100 text-amber-950 border-amber-300/80',
        iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 shadow-xs',
        metricBg: 'bg-white/90 border-amber-200 text-amber-900',
        linkText: 'text-amber-800 hover:text-amber-950'
      }
    },
    {
      id: 'library',
      category: 'education',
      span: 'lg:col-span-1 md:col-span-1',
      categoryBadge: language === 'mr' ? 'ज्ञानभांडार' : 'Library',
      metric: language === 'mr' ? '१.५ लाख+ ग्रंथ' : '1.5L+ Volumes',
      icon: BookOpen,
      title: language === 'mr' ? 'मध्यवर्ती ग्रंथालय व ई-रिसोर्सेस' : 'Central Library',
      desc: language === 'mr'
        ? '१.५ लाख+ ग्रंथ, CeRA राष्ट्रीय ई-जर्नल्स, कृषिकोश डिजिटल प्रबंध व अभ्यास कक्ष.'
        : 'Over 150,000 volumes, CeRA e-journals, KrishiKosh repository, and digital archives.',
      link: '/central-library-rahuri',
      linkText: language === 'mr' ? 'ग्रंथालय पोर्टल' : 'Library Portal',
      styles: {
        cardBg: 'bg-gradient-to-br from-white via-purple-50/40 to-indigo-50/50 hover:to-indigo-50/80',
        border: 'border-purple-200/90 hover:border-purple-400',
        badgeBg: 'bg-purple-100 text-purple-950 border-purple-300/80',
        iconBg: 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-xs',
        metricBg: 'bg-white/90 border-purple-200 text-purple-900',
        linkText: 'text-purple-800 hover:text-purple-950'
      }
    }
  ];

  const filteredCards = bentoCards.filter((card) => {
    if (activeFilter === 'all') return true;
    return card.category === activeFilter;
  });

  return (
    <section className="w-full py-10 sm:py-12 bg-[#edf3ed] relative overflow-hidden border-t border-stone-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] relative z-10 space-y-6">
        
        {/* Compact Section Header with Fast Pillar Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-300">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-[11px] font-bold uppercase tracking-wider mb-1.5 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'mr' ? 'मफुकृवि राहुरी: एक दृष्टिक्षेप' : 'MPKV Rahuri at a Glance'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {language === 'mr' ? 'प्रमुख शक्तिस्थळे व कार्यक्षेत्र' : 'Core Institutional Pillars'}
            </h2>
          </div>

          {/* Compact View Switcher */}
          <div className="flex flex-wrap gap-1 bg-stone-200/90 p-1 rounded-xl border border-stone-300 select-none text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              {language === 'mr' ? 'सर्व (६)' : 'All (6)'}
            </button>
            <button
              onClick={() => setActiveFilter('education')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                activeFilter === 'education'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'शिक्षण' : 'Education'}</span>
            </button>
            <button
              onClick={() => setActiveFilter('research')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                activeFilter === 'research'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'संशोधन' : 'Research'}</span>
            </button>
            <button
              onClick={() => setActiveFilter('extension')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                activeFilter === 'extension'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'विस्तार' : 'Extension'}</span>
            </button>
          </div>
        </div>

        {/* Compact Dynamic Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 auto-rows-fr">
          {filteredCards.map((card) => {
            const IconComponent = card.icon;

            return (
              <Link
                key={card.id}
                href={card.link}
                title={card.title}
                target={card.link.startsWith('http') ? '_blank' : undefined}
                rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`${card.span} ${card.styles.cardBg} rounded-2xl p-4 sm:p-5 border ${card.styles.border} transition-all duration-300 hover:-translate-y-0.5 shadow-2xs hover:shadow-md flex flex-col justify-between group cursor-pointer block no-underline`}
              >
                <div className="space-y-2.5">
                  {/* Top Bar: Icon + Badge + Metric */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-9 h-9 rounded-xl ${card.styles.iconBg} flex items-center justify-center font-medium shadow-xs group-hover:scale-105 transition-transform`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${card.styles.badgeBg}`}
                      >
                        {card.categoryBadge}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${card.styles.metricBg}`}
                    >
                      {card.metric}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-slate-950 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Action Link Indicator */}
                <div className="pt-2.5 mt-3 border-t border-stone-200/70 flex items-center justify-between">
                  <span
                    className={`text-xs font-bold inline-flex items-center gap-1 transition-all ${card.styles.linkText}`}
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <span className="text-[10.5px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                    {language === 'mr' ? 'सविस्तर' : 'Details'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
