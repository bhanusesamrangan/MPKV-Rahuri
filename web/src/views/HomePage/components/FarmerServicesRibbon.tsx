'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sprout,
  Package,
  Wrench,
  Calendar,
  Radio,
  CloudRain,
  Download,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  Sparkles,
  FlaskConical,
  Bug,
  Droplets,
  HelpCircle,
  Video,
  Smartphone,
  CheckCircle2,
  Volume2
} from 'lucide-react';

interface FarmerServicesRibbonProps {
  calendarMonths: any[];
}

export const FarmerServicesRibbon: React.FC<FarmerServicesRibbonProps> = ({ calendarMonths }) => {
  const { language, getBilingual } = useLanguage();

  // All 9 direct input & advisory services with dedicated multicolor palettes & aesthetics
  const agriInputTiles = [
    {
      id: 'implements',
      title: language === 'mr' ? 'शेतीची औजारे व यंत्रे' : 'Farm Implements & Machinery',
      subtitle: language === 'mr' ? 'ट्रॅक्टर व बैलचलित अवजारे साठा' : 'Tractor, bullock & power implements',
      badge: language === 'mr' ? 'थेट उपलब्ध' : 'Available',
      icon: Wrench,
      link: '/farm-implements',
      isExternal: false,
      styles: {
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-amber-50/40 hover:to-orange-50/60',
        border: 'border-amber-200/90 hover:border-amber-400',
        badge: 'bg-amber-100 text-amber-900 border-amber-300/80',
        action: 'text-amber-800 hover:text-amber-950 group-hover:translate-x-1',
        glow: 'group-hover:shadow-amber-500/10'
      }
    },
    {
      id: 'seeds',
      title: language === 'mr' ? 'प्रमाणित बियाणे साठा' : 'Certified Seed Stock',
      subtitle: language === 'mr' ? 'तृणधान्ये, कडधान्ये व गळीत धान्ये' : 'Cereal, pulse & oilseed varieties',
      badge: language === 'mr' ? 'थेट विक्री कक्ष' : 'Counters Live',
      icon: Package,
      link: '/seeds-availability',
      isExternal: false,
      styles: {
        iconBg: 'bg-gradient-to-br from-emerald-500 to-green-700 text-white shadow-md shadow-emerald-500/25',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-emerald-50/40 hover:to-green-50/60',
        border: 'border-emerald-200/90 hover:border-emerald-400',
        badge: 'bg-emerald-100 text-emerald-950 border-emerald-300/80',
        action: 'text-emerald-800 hover:text-emerald-950 group-hover:translate-x-1',
        glow: 'group-hover:shadow-emerald-500/10'
      }
    },
    {
      id: 'nursery',
      title: language === 'mr' ? 'रोपे व कलमे उपलब्धता' : 'Fruit Grafts & Nursery Stock',
      subtitle: language === 'mr' ? 'मध्यवर्ती रोपवाटिका कलमे' : 'Certified saplings & fruit crops',
      badge: language === 'mr' ? 'रोपवाटिका' : 'Nursery Stock',
      icon: Sprout,
      link: '/nursery-stock',
      isExternal: false,
      styles: {
        iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-700 text-white shadow-md shadow-teal-500/25',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-teal-50/40 hover:to-emerald-50/60',
        border: 'border-teal-200/90 hover:border-teal-400',
        badge: 'bg-teal-100 text-teal-950 border-teal-300/80',
        action: 'text-teal-800 hover:text-teal-950 group-hover:translate-x-1',
        glow: 'group-hover:shadow-teal-500/10'
      }
    },
    {
      id: 'biofertilizers',
      title: language === 'mr' ? 'जैविक खते उत्पादने' : 'Bio-Fertilizers & Inoculants',
      subtitle: language === 'mr' ? 'रायझोबियम, अझोटोबॅक्टर व पीएसबी' : 'Rhizobium, Azotobacter & PSB cultures',
      badge: language === 'mr' ? 'मफुकृवि ब्रँड' : 'Bio-Products',
      icon: FlaskConical,
      link: '/seeds-availability',
      isExternal: false,
      styles: {
        iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-700 text-white shadow-md shadow-indigo-500/25',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-blue-50/40 hover:to-indigo-50/60',
        border: 'border-indigo-200/90 hover:border-indigo-400',
        badge: 'bg-indigo-100 text-indigo-950 border-indigo-300/80',
        action: 'text-indigo-800 hover:text-indigo-950 group-hover:translate-x-1',
        glow: 'group-hover:shadow-indigo-500/10'
      }
    },
    {
      id: 'biopesticides',
      title: language === 'mr' ? 'जैविक कीटकनाशके' : 'Bio-Pesticides & Organic Controls',
      subtitle: language === 'mr' ? 'ट्रायकोडर्मा व व्हर्टिसिलियम' : 'Trichoderma, Verticillium cultures',
      badge: language === 'mr' ? 'सेंद्रिय शेती' : 'Organic Pest Control',
      icon: Bug,
      link: '/seeds-availability',
      isExternal: false,
      styles: {
        iconBg: 'bg-gradient-to-br from-rose-500 to-pink-700 text-white shadow-md shadow-rose-500/25',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-rose-50/40 hover:to-pink-50/60',
        border: 'border-rose-200/90 hover:border-rose-400',
        badge: 'bg-rose-100 text-rose-950 border-rose-300/80',
        action: 'text-rose-800 hover:text-rose-950 group-hover:translate-x-1',
        glow: 'group-hover:shadow-rose-500/10'
      }
    },
    {
      id: 'micrograde',
      title: language === 'mr' ? 'फुले लिक्विड मायक्रोग्रेड' : 'Phule Liquid Micrograde',
      subtitle: language === 'mr' ? 'सूक्ष्म अन्नद्रव्ये व पोषण द्रव्ये' : 'Liquid micronutrients Grade-II',
      badge: language === 'mr' ? 'पेटंट तंत्रज्ञान' : 'Patented Tech',
      icon: Droplets,
      link: '/seeds-availability',
      isExternal: false,
      styles: {
        iconBg: 'bg-gradient-to-br from-cyan-500 to-sky-700 text-white shadow-md shadow-cyan-500/25',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-cyan-50/40 hover:to-sky-50/60',
        border: 'border-cyan-200/90 hover:border-cyan-400',
        badge: 'bg-cyan-100 text-cyan-950 border-cyan-300/80',
        action: 'text-cyan-800 hover:text-cyan-950 group-hover:translate-x-1',
        glow: 'group-hover:shadow-cyan-500/10'
      }
    },
    {
      id: 'advisory',
      title: language === 'mr' ? 'कृषि सल्ला व मार्गदर्शन' : 'Agro-Advisory & Field Tips',
      subtitle: language === 'mr' ? 'तज्ज्ञ शास्त्रज्ञांचा थेट सल्ला' : 'Direct scientist helpline & tips',
      badge: language === 'mr' ? 'दैनिक सल्ला' : 'Daily Advisory',
      icon: HelpCircle,
      link: '#agro-advisory',
      isExternal: false,
      styles: {
        iconBg: 'bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-slate-950 shadow-md shadow-amber-500/25',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-yellow-50/40 hover:to-amber-50/60',
        border: 'border-amber-200/90 hover:border-amber-400',
        badge: 'bg-amber-100 text-amber-950 border-amber-300/80',
        action: 'text-amber-800 hover:text-amber-950 group-hover:translate-x-1',
        glow: 'group-hover:shadow-amber-500/10'
      }
    },
    {
      id: 'radio',
      title: language === 'mr' ? 'फुले कृषी वाहिनी ९०.८ FM' : 'Phule Krishi Vahini 90.8 FM',
      subtitle: language === 'mr' ? 'मध्यवर्ती स्टुडिओ थेट प्रक्षेपण' : 'Live Community Radio broadcast',
      badge: language === 'mr' ? 'थेट ऐका' : 'Live Broadcast',
      icon: Radio,
      link: 'https://digitalradio.co.in:8020/stream',
      isExternal: true,
      hasLivePulse: true,
      styles: {
        iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-700 text-white shadow-md shadow-purple-500/25',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-purple-50/40 hover:to-indigo-50/60',
        border: 'border-purple-200/90 hover:border-purple-400',
        badge: 'bg-purple-100 text-purple-950 border-purple-300/80',
        action: 'text-purple-800 hover:text-purple-950 group-hover:translate-x-1',
        glow: 'group-hover:shadow-purple-500/10'
      }
    },
    {
      id: 'youtube',
      title: language === 'mr' ? 'कृषि तंत्रज्ञान व्हिडिओं' : 'Official YouTube Channel',
      subtitle: language === 'mr' ? 'पीक प्रात्यक्षिके व शेतकरी यशोगाथा' : 'Video demonstrations & farmer talks',
      badge: language === 'mr' ? 'व्हिडिओ दालन' : 'Video Archive',
      icon: Video,
      link: 'https://www.youtube.com/@mpkvrahuri1161',
      isExternal: true,
      styles: {
        iconBg: 'bg-gradient-to-br from-red-500 to-rose-700 text-white shadow-md shadow-red-500/25',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-red-50/40 hover:to-rose-50/60',
        border: 'border-red-200/90 hover:border-red-400',
        badge: 'bg-red-100 text-red-950 border-red-300/80',
        action: 'text-red-800 hover:text-red-950 group-hover:translate-x-1',
        glow: 'group-hover:shadow-red-500/10'
      }
    }
  ];

  // Helper to determine seasonal theme & fully reliable hover styling for the 12-month calendar
  const getSeasonStyle = (monthNum: number) => {
    // Kharif (Monsoon): June (6), July (7), August (8), September (9)
    if (monthNum >= 6 && monthNum <= 9) {
      return {
        seasonName: language === 'mr' ? 'खरीप हंगाम' : 'Kharif',
        tagClass: 'bg-emerald-100 text-emerald-950 border-emerald-300/90 group-hover:bg-white group-hover:text-emerald-900 group-hover:border-transparent',
        cardClass: 'bg-white border-stone-200/90 hover:border-emerald-700 hover:bg-emerald-700 shadow-2xs hover:shadow-md',
        titleClass: 'text-slate-900 group-hover:text-white',
        iconClass: 'text-emerald-700 group-hover:text-emerald-100'
      };
    }
    // Rabi (Winter): October (10), November (11), December (12), January (1)
    if (monthNum >= 10 || monthNum === 1) {
      return {
        seasonName: language === 'mr' ? 'रब्बी हंगाम' : 'Rabi',
        tagClass: 'bg-amber-100 text-amber-950 border-amber-300/90 group-hover:bg-white group-hover:text-amber-950 group-hover:border-transparent',
        cardClass: 'bg-white border-stone-200/90 hover:border-amber-600 hover:bg-amber-600 shadow-2xs hover:shadow-md',
        titleClass: 'text-slate-900 group-hover:text-white',
        iconClass: 'text-amber-700 group-hover:text-amber-100'
      };
    }
    // Summer (Zaid): February (2), March (3), April (4), May (5)
    return {
      seasonName: language === 'mr' ? 'उन्हाळी हंगाम' : 'Summer',
      tagClass: 'bg-orange-100 text-orange-950 border-orange-300/90 group-hover:bg-white group-hover:text-orange-950 group-hover:border-transparent',
      cardClass: 'bg-white border-stone-200/90 hover:border-orange-600 hover:bg-orange-600 shadow-2xs hover:shadow-md',
      titleClass: 'text-slate-900 group-hover:text-white',
      iconClass: 'text-orange-700 group-hover:text-orange-100'
    };
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-[#edf3ed] via-[#f3f7f2] to-[#eaf0e9] text-slate-800 relative overflow-hidden border-t border-stone-300">
      
      {/* Subtle organic background mesh circles for rich aesthetic depth */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] relative z-10 space-y-10">
        
        {/* Section Header with Multi-Color Pill & Seed Helpline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-5 border-b border-stone-300">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 via-amber-100 to-teal-100 border border-emerald-300/90 text-emerald-950 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'mr' ? 'शेतकरी प्रथम दालन' : 'Farmer First Hub'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-amber-800 font-bold">{language === 'mr' ? 'डिजिटल शेतकरी पोर्टल' : 'Digital Farmer Portal'}</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[30px] font-bold text-slate-900 tracking-tight">
              {language === 'mr' ? 'कृषि निविष्ठा, बियाणे, कलमे व थेट सुविधा' : 'Agricultural Inputs, Seeds & Direct Farm Facilities'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] mt-1.5 max-w-4xl">
              {language === 'mr'
                ? 'राहुरी मध्यवर्ती प्रक्षेत्रातील प्रमाणित बियाणे, कलमे, जैविक उत्पादने आणि हवामान मार्गदर्शिका आता थेट शेतकऱ्यांच्या मोबाइलवर उपलब्ध.'
                : 'Direct access to MPKV certified seeds, nurseries, bio-inputs, farm machinery, weather forecast and seasonal advisory.'}
            </p>
          </div>

          {/* Seed Sales Desk Helpline Card with Pulse */}
          <a
            href="tel:02426243345"
            className="flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-emerald-200/90 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all group"
          >
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-xs flex items-center justify-center">
              <PhoneCall className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-left text-xs">
              <div className="text-slate-500 font-medium flex items-center gap-1.5">
                <span>{language === 'mr' ? 'बियाणे विक्री कक्ष (थेट संपर्क)' : 'Seed Sales Desk (Helpline)'}</span>
              </div>
              <div className="text-emerald-950 font-bold text-sm tracking-wide">
                02426-243345
              </div>
              <div className="text-[10.5px] text-emerald-800 font-medium mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block shrink-0" />
                <span>{language === 'mr' ? 'कामकाजाचे दिवस: सोम - शुक्र' : 'Operational: Mon - Fri'}</span>
              </div>
            </div>
          </a>
        </div>

        {/* REARRANGED MAIN HUB: Spotlight Farmer Visual Card (Left) + 9 Multicolor Action Tiles (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT: Featured Digital Farmer Spotlight Card (Clean Image, No Badges On Image) */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col rounded-3xl bg-white border border-emerald-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden group">
            
            {/* Farmer Image Container - Completely Clean, No Badges On Top */}
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[350px] xl:h-[370px] overflow-hidden bg-stone-100">
              <img
                src="/media/images/indian_farmer_digital_mobile.jpg"
                alt="Indian farmer standing in his lush farm using MPKV mobile digital facilities"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Quick Information & Actions Hub Below Farmer Image */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-gradient-to-b from-emerald-50/30 to-white">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs border border-emerald-300/80 shadow-2xs">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'mr' ? 'स्मार्ट शेती व डिजिटल सेवा' : 'Smart Farming & Digital Facilities'}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {language === 'mr'
                    ? 'विद्यापीठाच्या सर्व सेवा आता थेट शेतकऱ्यांच्या हातात!'
                    : 'All University Farmer Services Now in the Palm of Your Hand!'}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                  {language === 'mr'
                    ? 'बियाणे साठा, दर्जेदार कलमे, जैविक खते, हवामान सल्ला व तज्ज्ञ मार्गदर्शन—शेतात उभे राहून थेट मोबाइलवरून मिळवा.'
                    : 'Check certified seed availability, fruit grafts, bio-fertilizers, weather advisories & scientist tips directly from your field.'}
                </p>

                {/* 2 Quick Highlights */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2 rounded-xl bg-white border border-stone-200/90 flex items-center gap-2 text-slate-800 shadow-2xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{language === 'mr' ? 'थेट विक्री कक्ष' : 'Direct Counters'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-stone-200/90 flex items-center gap-2 text-slate-800 shadow-2xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>{language === 'mr' ? '१२ महिने वेळापत्रक' : '12-Month Plan'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Helpline & Radio */}
              <div className="pt-2 border-t border-stone-200/80 flex items-center gap-2">
                <a
                  href="https://digitalradio.co.in:8020/stream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'mr' ? '९०.८ FM थेट ऐका' : 'Listen 90.8 FM'}</span>
                  <ExternalLink className="w-3 h-3 text-purple-200" />
                </a>

                <a
                  href="/media/docs/Weather_Advisory_MPKV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow-2xs"
                >
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'हवामान सल्ला' : 'Weather PDF'}</span>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT: 9 Multicolor Agri-Input Action Tiles in 3x3 Grid */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 h-full">
              {agriInputTiles.map((tile) => {
                const Icon = tile.icon;
                const CardMarkup = (
                  <div
                    className={`h-full p-4 rounded-2xl ${tile.styles.cardBg} border ${tile.styles.border} transition-all duration-300 shadow-2xs hover:shadow-md ${tile.styles.glow} flex flex-col justify-between group cursor-pointer`}
                  >
                    <div>
                      {/* Top Row: Icon + Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${tile.styles.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1 ${tile.styles.badge}`}
                        >
                          {tile.hasLivePulse && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping flex-shrink-0" />
                          )}
                          <span>{tile.badge}</span>
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-950 transition-colors leading-snug">
                        {tile.title}
                      </h3>
                      <p className="text-[11.5px] text-slate-600 mt-1 line-clamp-2 font-medium leading-relaxed">
                        {tile.subtitle}
                      </p>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-end">
                      <span
                        className={`text-xs font-bold inline-flex items-center gap-1 transition-all ${tile.styles.action}`}
                      >
                        <span>{language === 'mr' ? 'तपासा' : 'Open'}</span>
                        {tile.isExternal ? (
                          <ExternalLink className="w-3 h-3" />
                        ) : (
                          <ArrowRight className="w-3 h-3" />
                        )}
                      </span>
                    </div>
                  </div>
                );

                return tile.isExternal ? (
                  <a
                    key={tile.id}
                    href={tile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {CardMarkup}
                  </a>
                ) : (
                  <Link key={tile.id} href={tile.link} className="block h-full">
                    {CardMarkup}
                  </Link>
                );
              })}
            </div>
          </div>

        </div>

        {/* 12-Month Agricultural Calendar & Weather Alert Container with Seasonal Palette */}
        <div className="rounded-3xl bg-white border border-stone-300 p-5 md:p-7 space-y-6 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2.5 font-bold text-base sm:text-lg text-slate-900">
                <div className="p-1.5 rounded-lg bg-amber-500 text-white shadow-xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>
                  {language === 'mr'
                    ? 'कृषि वेळापत्रक (महिनानिहाय मार्गदर्शिका)'
                    : '12-Month Agriculture Calendar'}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                {language === 'mr'
                  ? 'हंगामनिहाय पिकांचे व्यवस्थापन, पेरणी, आंतरमशागत व कीड-रोग नियंत्रणाचे संपूर्ण वेळापत्रक.'
                  : 'Month-by-month agricultural operations, sowing schedules, nutrient management, and crop protection.'}
              </p>
            </div>

            {/* Live Weather Advisory Button */}
            <div className="flex items-center gap-2">
              <a
                href="/media/docs/Weather_Advisory_MPKV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs transition-all shadow-xs hover:shadow-md"
              >
                <CloudRain className="w-4 h-4" />
                <span>{language === 'mr' ? 'हवामान अंदाज (PDF)' : 'Weather Advisory'}</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Season Legend Indicators */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold mr-1">
              {language === 'mr' ? 'हंगाम वर्गीकरण:' : 'Seasonal Grouping:'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 font-bold border border-emerald-300/80">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>{language === 'mr' ? 'खरीप हंगाम (जून-सप्टे)' : 'Kharif (Jun-Sep)'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 font-bold border border-amber-300/80">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>{language === 'mr' ? 'रब्बी हंगाम (ऑक्टो-जाने)' : 'Rabi (Oct-Jan)'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-950 font-bold border border-orange-300/80">
              <span className="w-2 h-2 rounded-full bg-orange-600" />
              <span>{language === 'mr' ? 'उन्हाळी हंगाम (फेब्रु-मे)' : 'Summer (Feb-May)'}</span>
            </span>
          </div>

          {/* 12 Months Multi-Color Seasonal Grid with Fixed Interactive Hover Effects */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {calendarMonths.slice(0, 12).map((m: any) => {
              const season = getSeasonStyle(m.month_number);
              return (
                <a
                  key={m.month_number}
                  href={m.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3.5 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-1.5 group cursor-pointer ${season.cardClass}`}
                >
                  <span
                    className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-md border transition-all duration-300 ${season.tagClass}`}
                  >
                    {season.seasonName}
                  </span>

                  <div className={`text-xs sm:text-[13.5px] font-bold tracking-wide leading-tight transition-colors duration-300 ${season.titleClass}`}>
                    {getBilingual(m.name)}
                  </div>

                  <div
                    className={`text-[10.5px] font-semibold flex items-center gap-1 transition-colors duration-300 ${season.iconClass}`}
                  >
                    <Download className="w-3 h-3" />
                    <span>PDF {language === 'mr' ? 'मार्गदर्शिका' : 'Guide'}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
