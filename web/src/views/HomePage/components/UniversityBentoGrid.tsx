'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sprout,
  Wrench,
  Radio,
  CloudSun,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';

export const UniversityBentoGrid: React.FC = () => {
  const { language } = useLanguage();

  const bentoCards = [
    {
      span: 'lg:col-span-2 md:col-span-2',
      icon: Sprout,
      iconBg: 'bg-emerald-100 text-emerald-800',
      badge: language === 'mr' ? '२७०+ विकसित पीक वाण' : '270+ Crop Varieties',
      badgeStyle: 'bg-emerald-100/80 text-emerald-900 border border-emerald-200/60',
      title: language === 'mr' ? 'पीक पैदास व बियाणे संशोधन' : 'Crop Breeding & Seed Heritage',
      desc: language === 'mr'
        ? 'तृणधान्ये, कडधान्ये, गळीत धान्ये व फळबागांचे २७० हून अधिक सुधारित वाण विकसित. फुले वरदान, फुले समाधान व फुले भगवा संपूर्ण भारतात नामांकित.'
        : 'Over 270 high-yielding notified crop varieties across cereals, pulses, and horticulture developed by central Rahuri scientists.',
      link: '/seeds-availability',
      linkText: language === 'mr' ? 'बियाणे साठा तपासा' : 'Check Seed Stock',
      cardBg: 'bg-[#f0fdf4] hover:bg-[#e6f9ed] border-emerald-100'
    },
    {
      span: 'lg:col-span-1 md:col-span-1',
      icon: Wrench,
      iconBg: 'bg-amber-100 text-amber-800',
      badge: language === 'mr' ? '३९ शेती अवजारे' : '39 Farm Implements',
      badgeStyle: 'bg-amber-100/80 text-amber-900 border border-amber-200/60',
      title: language === 'mr' ? 'शेती यांत्रिकीकरण' : 'Farm Mechanization',
      desc: language === 'mr'
        ? 'शेतकऱ्यांचे श्रम कमी करणारी फुले टोकण यंत्र, कांदा रोप लागवड यंत्र व ३५+ विकसित अवजारे.'
        : 'Innovative tractor and bullock-drawn farm tools designed by Dr. A.S. CAET Rahuri.',
      link: '/farm-implements',
      linkText: language === 'mr' ? 'अवजारे सूची' : 'Explore Tools',
      cardBg: 'bg-[#fffbeb] hover:bg-[#fef3c7] border-amber-100'
    },
    {
      span: 'lg:col-span-1 md:col-span-1',
      icon: Radio,
      iconBg: 'bg-rose-100 text-rose-800',
      badge: language === 'mr' ? '९०.८ FM समुदाय रेडिओ' : '90.8 FM Radio',
      badgeStyle: 'bg-rose-100/80 text-rose-900 border border-rose-200/60',
      title: language === 'mr' ? 'फुले कृषिवाहिनी' : 'Phule FM 90.8',
      desc: language === 'mr'
        ? 'राहुरी परिसरातील मध्यवर्ती स्टुडिओवरून दररोज थेट शेती सल्ला, हवामान अंदाज व तज्ज्ञ मार्गदर्शन.'
        : 'Daily community radio broadcast from Central Studio Rahuri delivering farming advisory.',
      link: '#radio',
      linkText: language === 'mr' ? 'रेडिओ ऐका' : 'Listen Live',
      cardBg: 'bg-[#fff1f2] hover:bg-[#ffe4e6] border-rose-100'
    },
    {
      span: 'lg:col-span-1 md:col-span-1',
      icon: CloudSun,
      iconBg: 'bg-sky-100 text-sky-800',
      badge: language === 'mr' ? 'CAAST-CSAWM केंद्र' : 'World Bank CAAST',
      badgeStyle: 'bg-sky-100/80 text-sky-900 border border-sky-200/60',
      title: language === 'mr' ? 'हवामान शेती व ड्रोन्स' : 'Climate Ag & Drones',
      desc: language === 'mr'
        ? 'शेतीत ड्रोन्स तंत्रज्ञान, सूक्ष्म सिंचन ऑटोमेशन आणि हवामान अंदाज अचूक मॉडेलिंग.'
        : 'High-tech center equipped with agricultural drones, spatial analytics, and IoT irrigation.',
      link: '/research/aicrp',
      linkText: language === 'mr' ? 'प्रकल्प माहिती' : 'View CAAST',
      cardBg: 'bg-[#f0f9ff] hover:bg-[#e0f2fe] border-sky-100'
    },
    {
      span: 'lg:col-span-1 md:col-span-1',
      icon: BookOpen,
      iconBg: 'bg-purple-100 text-purple-800',
      badge: language === 'mr' ? 'मध्यवर्ती ग्रंथालय' : 'Central Library',
      badgeStyle: 'bg-purple-100/80 text-purple-900 border border-purple-200/60',
      title: language === 'mr' ? 'डिजिटल ज्ञानभांडार' : 'Knowledge Repository',
      desc: language === 'mr'
        ? '१.५ लाखांहून अधिक ग्रंथ, CeRA ई-जर्नल्स, कृषिकोश डिजिटल प्रबंध आणि वाचन कक्ष सुविधा.'
        : '150,000+ volumes, ICAR CeRA consortium e-journals, student halls, and digital archives.',
      link: '/central-library-rahuri',
      linkText: language === 'mr' ? 'ग्रंथालय सेवा' : 'Library Portal',
      cardBg: 'bg-[#faf5ff] hover:bg-[#f3e8ff] border-purple-100'
    },
    {
      span: 'lg:col-span-2 md:col-span-2',
      icon: GraduationCap,
      iconBg: 'bg-teal-100 text-teal-800',
      badge: language === 'mr' ? 'PGI व डॉ. अ.शि. CAET' : 'PGI & Dr. AS CAET',
      badgeStyle: 'bg-teal-100/80 text-teal-900 border border-teal-200/60',
      title: language === 'mr' ? 'पदव्युत्तर व अभियांत्रिकी शिक्षण' : 'Post Graduate & Engineering Hub',
      desc: language === 'mr'
        ? 'पदव्युत्तर महाविद्यालय (PGI) मध्यवर्ती परिसर येथे १० विषयांत M.Sc. व Ph.D. अभ्यासक्रम. डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालयात B.Tech, M.Tech व Ph.D. पदव्यांचे अध्यापन.'
        : 'Central Campus Rahuri houses the Post Graduate Institute across 10 specialized departments, alongside Dr. A.S. CAET for agricultural engineering.',
      link: '/post-graduate-institute-rahuri',
      linkText: language === 'mr' ? 'महाविद्यालये पहा' : 'Explore Colleges',
      cardBg: 'bg-[#f0fdfa] hover:bg-[#ccfbf1] border-teal-100'
    }
  ];

  return (
    <section className="w-full py-16 bg-[#f8faf8] relative overflow-hidden border-t border-stone-200/60">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-900 text-xs font-medium tracking-wide mb-2.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'mr' ? 'मफुकृवि राहुरी: एक दृष्टिक्षेप' : 'MPKV Rahuri at a Glance'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              {language === 'mr' ? 'प्रमुख शक्तिस्थळे व कार्यक्षेत्र' : 'Core Research & Academic Pillars'}
            </h2>
          </div>

          <Link
            href="/mpkv-at-a-glance"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-slate-700 font-medium text-xs border border-stone-200 transition-colors shadow-2xs"
          >
            <span>{language === 'mr' ? 'सर्व संस्थात्मक माहिती' : 'Explore All Centers'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>

        {/* Bento Grid - Soft Pastel Leisurely Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {bentoCards.map((card, idx) => {
            const IconComponent = card.icon;

            return (
              <div
                key={idx}
                className={`${card.span} ${card.cardBg} rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:-translate-y-1 shadow-2xs hover:shadow-sm flex flex-col justify-between group`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center font-medium shadow-2xs`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-medium tracking-wide px-2.5 py-0.5 rounded-full ${card.badgeStyle}`}>
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-800 leading-snug group-hover:text-slate-950 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-black/5 flex items-center justify-between">
                  <Link
                    href={card.link}
                    className="text-xs font-medium text-slate-700 hover:text-slate-900 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
