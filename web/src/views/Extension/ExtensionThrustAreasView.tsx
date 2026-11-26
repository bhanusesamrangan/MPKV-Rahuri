'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Wheat,
  Monitor,
  CloudSun,
  Share2,
  ShieldCheck,
  TrendingUp,
  Wrench,
  Handshake,
  CheckCircle2,
  ArrowRight,
  Filter,
  Layers,
  Compass,
  Building2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ExtensionBreadcrumb } from './components/ExtensionBreadcrumb';
import { ExtensionHero } from './components/ExtensionHero';

interface ExtensionThrustAreasViewProps {
  pageData?: any;
}

export const ExtensionThrustAreasView: React.FC<ExtensionThrustAreasViewProps> = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const thrustAreas = [
    {
      id: 'crops',
      category: 'crop-management',
      icon: Wheat,
      color: 'amber',
      titleEn: 'Targeted Crop Campaigns for Key Commercial Crops',
      titleMr: 'प्रमुख नगदी पिकांसाठी विशेष विस्तार मोहीम',
      subEn: 'Cotton, Sugarcane, Banana, Pomegranate and Maize Focus',
      subMr: 'कापूस, ऊस, केळी, डाळिंब व मका पिकांच्या समस्यांवर भर',
      descEn: 'Strategic extension drives addressing pink bollworm and whitefly in cotton, white grub & trash mulching in sugarcane, Sigatoka disease in banana, bacterial blight (Telya) in pomegranate, and fall armyworm in maize.',
      descMr: 'कापसावरील बोंडअळी, उसातील हुमणी व पाचट व्यवस्थापन, केळीवरील करपा (सिगाटोका), डाळिंबावरील तेल्या रोग व मक्यावरील लष्करी अळीच्या नियंत्रणासाठी प्रक्षेत्र मोहीम.'
    },
    {
      id: 'digital',
      category: 'digital-extension',
      icon: Monitor,
      color: 'emerald',
      titleEn: 'Digitalization of Agricultural Technologies',
      titleMr: 'कृषी तंत्रज्ञानाचे संपूर्ण डिजिटायझेशन',
      subEn: 'Interactive Media, Mobile Apps & Video Clinics',
      subMr: 'संवादी दृकश्राव्य साधने व डिजिटल शेती मार्गदर्शन',
      descEn: 'Development of interactive learning media, animated crop protection modules, video clinics, and mobile diagnostic repositories for real-time farmer advisory.',
      descMr: 'शेतकऱ्यांना घरबसल्या माहिती मिळण्यासाठी संवादी व्हीडिओ, मोबाईल अ‍ॅप्स, अ‍ॅनिमेशन तंत्रज्ञान आणि डिजिटल रोगनिदान प्रणालीचा विकास.'
    },
    {
      id: 'weather',
      category: 'digital-extension',
      icon: CloudSun,
      color: 'cyan',
      titleEn: 'Market Intelligence & Cyber Agro-Meteorology',
      titleMr: 'बाजार भाव माहिती व सायबर हवामान सल्ला',
      subEn: 'Information Technology & Cyber Extension Systems',
      subMr: 'माहिती तंत्रज्ञान व सायबर विस्ताराद्वारे हवामान मार्गदर्शन',
      descEn: 'Real-time dissemination of block-level agrometeorological advisories, extreme weather forecasts, market arrival price trends, and cyber-extension support to avert distress selling.',
      descMr: 'तालुकास्तरावर हवामान अंदाज, पूर्वसूचना, प्रमुख बाजार समित्यांमधील शेतमाल आवक व दरांची माहिती सायबर विस्ताराद्वारे थेट शेतकऱ्यांच्या मोबाईलवर देणे.'
    },
    {
      id: 'social',
      category: 'digital-extension',
      icon: Share2,
      color: 'rose',
      titleEn: 'Multi-Channel Social Media & Radio Outreach',
      titleMr: 'सोशल मीडिया व कम्युनिटी रेडिओद्वारे तंत्रज्ञान प्रसार',
      subEn: 'YouTube, WhatsApp Communities & CRS 90.8 FM',
      subMr: 'युट्यूब, व्हॉट्सअ‍ॅप शेतकरी गट व विद्यापीठ वाहिनी ९०.८ एफएम',
      descEn: 'Harnessing modern social networking channels, YouTube educational clips, regional WhatsApp farmer forums, and daily broadcast programmes on Vidyapeeth Vahini CRS 90.8 FM.',
      descMr: 'शेतकऱ्यांच्या त्वरित संवादासाठी अधिकृत युट्यूब चॅनेल, व्हॉट्सअ‍ॅप शेतकरी समूह आणि विद्यापीठ वाहिनी ९०.८ एफएम वरून दैनंदिन कृषी कार्यक्रमांचे प्रसारण.'
    },
    {
      id: 'livelihood',
      category: 'farmer-welfare',
      icon: ShieldCheck,
      color: 'purple',
      titleEn: 'Livelihood Security & Farm Diversification',
      titleMr: 'शेतकऱ्यांची उपजीविका सुरक्षा व पूरक व्यवसाय',
      subEn: 'Smallholder Risk Mitigation & Income Stability',
      subMr: 'अल्प व अत्यल्प भूधारकांसाठी एकात्मिक शेती पद्धती',
      descEn: 'Strengthening household livelihood resilience through integrated farming systems (IFS), backyard poultry, dairy animal health interventions, sericulture, and goat rearing.',
      descMr: 'अल्पभूधारक शेतकऱ्यांची आर्थिक जोखीम कमी करण्यासाठी एकात्मिक शेती पद्धती (IFS), कुक्कुटपालन, शेळीपालन, दुग्धव्यवसाय व रेशीम उद्योगाला चालना देणे.'
    },
    {
      id: 'market',
      category: 'farmer-welfare',
      icon: TrendingUp,
      color: 'blue',
      titleEn: 'Market-Led Extension & Value Addition',
      titleMr: 'बाजारपेठ-केंद्रित विस्तार व मूल्यवर्धन',
      subEn: 'Reducing Production Cost & FPO Collectives',
      subMr: 'उत्पादन खर्च कमी करणे, प्रक्रिया व शेतकरी उत्पादक कंपन्या (FPOs)',
      descEn: 'Transitioning from production-centric to market-driven extension: promoting post-harvest sorting/grading, agro-processing clusters, cold chain linkage, and Farmer Producer Organizations (FPOs).',
      descMr: 'केवळ उत्पादनावर भर न देता काढणीपश्चात प्रतवारी, प्रक्रिया उद्योग, साठवणूक आणि शेतकरी उत्पादक कंपन्यांच्या (FPOs) माध्यमातून नफा मिळवून देणे.'
    },
    {
      id: 'mechanization',
      category: 'mechanization',
      icon: Wrench,
      color: 'orange',
      titleEn: 'Farm Mechanization & Custom Hiring Centers',
      titleMr: 'शेती यांत्रिकीकरण व कस्टम हायरिंग केंद्रे',
      subEn: 'Tractor Machinery & Precision Farm Tools',
      subMr: 'शेत अवजारे भाडेतत्वावर उपलब्ध करून देणे',
      descEn: 'Promoting drudgery reduction tools, paddy markers, broad bed furrow (BBF) planters, cotton pickers, and establishing Custom Hiring Centers (CHCs) to make modern implements accessible.',
      descMr: 'श्रम कमी करणारी आधुनिक अवजारे, बीबीएफ प्लॅन्टर, भात लावणी यंत्रे आणि कस्टम हायरिंग केंद्रांच्या माध्यमातून लहान शेतकऱ्यांना यंत्रे उपलब्ध करणे.'
    },
    {
      id: 'ppp',
      category: 'partnerships',
      icon: Handshake,
      color: 'emerald',
      titleEn: 'Public-Private & Public-Public Partnerships (PPP)',
      titleMr: 'सार्वजनिक-खाजगी भागीदारी (PPP) विस्तार मॉडेल',
      subEn: 'Collaborative Synergy with FPOs, Industry & NGOs',
      subMr: 'उद्योग, संस्था व शेतकरी कंपन्यांशी सहकार्य',
      descEn: 'Leveraging multi-stakeholder partnerships with input manufacturers, agricultural universities, sugar mills, NGOs, and state departments for collaborative large-scale technology transfer.',
      descMr: 'साखर कारखाने, कृषी निविष्ठा उत्पादक, अशासकीय संस्था आणि शासकीय विभाग यांच्यासोबत संयुक्त भागीदारी करून व्यापक विस्तार मोहीम राबवणे.'
    }
  ];

  const filteredAreas = selectedCategory === 'all'
    ? thrustAreas
    : thrustAreas.filter((a) => a.category === selectedCategory);

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-slate-800">
      <ExtensionBreadcrumb currentPageTitle={{ en: 'Thrust Areas', mr: 'विस्तार प्राधान्यक्रम' }} />

      <ExtensionHero
        theme="thrust"
        badge={{ en: 'Strategic Extension Priorities', mr: 'विस्तार शिक्षणाचे प्रमुख प्राधान्यक्रम' }}
        title={{
          en: 'Extension Thrust Areas & Priorities',
          mr: 'विस्तार शिक्षणाचे प्रमुख प्राधान्यक्रम'
        }}
        subtitle={{
          en: 'Eight strategic thrust pillars driving digital adoption, climate-resilient farming, crop diagnostic campaigns, and market-led outreach across Western Maharashtra.',
          mr: 'डिजिटल विस्तार, हवामान-अनुकूल शेती, पीक समस्या निवारण व बाजारपेठ-केंद्रित शेतीचे ८ मुख्य प्राधान्यक्रम.'
        }}
        quickChips={[
          { label: language === 'mr' ? '८ धोरणात्मक प्राधान्ये' : '8 Strategic Pillars', icon: Sparkles },
          { label: language === 'mr' ? 'डिजिटल विस्तार' : 'Cyber Extension', icon: Monitor },
          { label: language === 'mr' ? 'बाजारपेठ विस्तार' : 'Market-Led Extension', icon: TrendingUp },
          { label: language === 'mr' ? 'पीपीपी मॉडेल' : 'PPP Synergy Mode', icon: Handshake }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">

        {/* Category Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
              {language === 'mr' ? '८ मुख्य विस्तार प्राधान्यक्रम' : 'Eight Strategic Extension Thrust Areas'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'mr' ? 'शेतकऱ्यांच्या सर्वांगीण प्रगतीसाठी विद्यापीठाचे मुख्य धोरण' : 'Official Priority Mandate of the Directorate of Extension Education'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', labelEn: 'All Priorities', labelMr: 'सर्व प्राधान्ये' },
              { id: 'crop-management', labelEn: 'Crop Campaigns', labelMr: 'पीक मोहीम' },
              { id: 'digital-extension', labelEn: 'Digital & Media', labelMr: 'डिजिटल व माध्यमे' },
              { id: 'farmer-welfare', labelEn: 'Livelihood & Market', labelMr: 'उपजीविका व बाजार' },
              { id: 'mechanization', labelEn: 'Mechanization', labelMr: 'यांत्रिकीकरण' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {language === 'mr' ? cat.labelMr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Strategic Priority Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <div
                key={area.id || idx}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-amber-400"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-amber-700 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black text-stone-400 uppercase font-mono">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 leading-snug">
                      {language === 'mr' ? area.titleMr : area.titleEn}
                    </h3>
                    <p className="text-xs font-bold text-emerald-800">
                      {language === 'mr' ? area.subMr : area.subEn}
                    </p>
                  </div>

                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                    {language === 'mr' ? area.descMr : area.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>MPKV Field Priority</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decadal Extension Roadmap Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-stone-900 to-amber-950 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'दशकपूर्ती विस्तार दृष्टिकोन (२०२५-२०३५)' : 'Decadal Extension Vision (2025–2035)'}</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black font-serif leading-tight">
              {language === 'mr'
                ? 'हवामान-अनुकूल, डिजिटल आणि नफा देणारी समृद्ध शेती'
                : 'Empowering Farmers with Climate Resilience, Cyber Extension & Value Addition'}
            </h3>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              {language === 'mr'
                ? 'पुढील दहा वर्षांत विस्तार शिक्षण संचालनालय पश्चिम महाराष्ट्रातील प्रत्येक गावात मोबाईल अ‍ॅप्स, ड्रोन तंत्रज्ञान, विद्यापीठ वाहिनी ९०.८ एफएम आणि शेतकरी उत्पादक कंपन्यांच्या (FPOs) माध्यमातून अद्ययावत कृषी क्रांती घडवून आणण्यासाठी कटिबद्ध आहे.'
                : 'Over the next decade, the Directorate aims to reach every village across the 10 districts with drone diagnostics, precision farming tools, community radio broadcasting, customized mobile agro-advisories, and sustainable market linkage.'}
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/atic-rahuri"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition-colors"
              >
                <span>{language === 'mr' ? 'अ‍ॅटिक सेवांची माहिती' : 'Explore ATIC Services'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/extension/krishi-vigyan-kendras"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition-colors"
              >
                <span>{language === 'mr' ? '१७ केव्हीके केंद्रे पहा' : 'View KVK Network'}</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
