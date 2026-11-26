'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Radio,
  Video,
  Tv,
  Newspaper,
  Volume2,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Share2,
  PlayCircle,
  Building2,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ExtensionBreadcrumb } from './components/ExtensionBreadcrumb';
import { ExtensionHero } from './components/ExtensionHero';

interface ExtensionCommunicationCenterViewProps {
  pageData?: any;
}

export const ExtensionCommunicationCenterView: React.FC<ExtensionCommunicationCenterViewProps> = () => {
  const { language } = useLanguage();
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const radioSchedule = [
    {
      time: '07:00 AM – 08:00 AM',
      titleEn: 'Prabhat Krishi & Suprabhat Shetkari',
      titleMr: 'प्रभात कृषी व सुप्रभात शेतकरी',
      descEn: 'Morning devotional hymns, daily weather bulletin, today in agriculture history, and morning crop advisory.',
      descMr: 'सकाळची प्रार्थना, आजचे हवामान अंदाज व तापमान, कृषी दिनविशेष आणि सकाळचा शेती सल्ला.'
    },
    {
      time: '12:00 PM – 01:00 PM',
      titleEn: 'Kisan Vani & Crop Problem Hour',
      titleMr: 'किसान वाणी व पीक समस्या निवारण',
      descEn: 'Live interviews with MPKV scientists, pest & disease outbreak warnings, and market rates from APMC mandis.',
      descMr: 'शास्त्रज्ञांशी थेट संवाद, कीड-रोग प्रादुर्भाव पूर्वसूचना आणि प्रमुख कृषी उत्पन्न बाजार समित्यांचे आजचे बाजारभाव.'
    },
    {
      time: '06:00 PM – 07:30 PM',
      titleEn: 'Sandhya Krishi & Yashogatha',
      titleMr: 'संध्या कृषी व प्रयोगशील शेतकरी यशोगाथा',
      descEn: 'Success stories of progressive farmers, dairy and poultry guidance, farm women empowerment, and listeners phone-in questions.',
      descMr: 'प्रगतिशील शेतकऱ्यांच्या मुलाखती, दुग्ध व्यवसाय, महिला बचत गट मार्गदर्शन आणि श्रोत्यांच्या पत्रांना उत्तरे.'
    }
  ];

  const communicationWings = [
    {
      id: 'radio',
      icon: Radio,
      titleEn: 'Community Radio Station (CRS 90.8 FM) — Vidyapeeth Vahini',
      titleMr: 'सामुदायिक रेडिओ केंद्र (CRS ९०.८ एफएम) — विद्यापीठ वाहिनी',
      descEn: 'Dedicated rural broadcast station reaching 25+ km radius around Rahuri campus, transmitting agro-weather advisories, live scientist interviews, and farmer cultural folk programs.',
      descMr: 'राहुरी परिसरातील २५ किमी कार्यक्षेत्रात प्रसारित होणारी वाहिनी; हवामान सल्ला, शेती तंत्रज्ञान आणि शेतकऱ्यांच्या लोककलांचे दैनंदिन प्रसारण.'
    },
    {
      id: 'av',
      icon: Video,
      titleEn: 'Audio-Visual Film Production & Multimedia Unit',
      titleMr: 'दृकश्राव्य माहितीपट निर्मिती व मल्टीमीडिया विभाग',
      descEn: 'High-definition digital production of documentary training films on released varieties, farm implements, organic farming, and watershed management for state-wide telecast.',
      descMr: 'नवीन वाण, सुधारित अवजारे व शेती पद्धतींवर माहितीपट, लघुपट आणि डिजिटल शेती व्हीडिओंची निर्मिती.'
    },
    {
      id: 'press',
      icon: Newspaper,
      titleEn: 'Press, Media Relations & Krishidoot Cell',
      titleMr: 'वृत्तपत्र, प्रसिद्धी व "कृषीदूत" प्रसार कक्ष',
      descEn: 'Daily release of university press notes, weekly specialized columns in mainstream Marathi dailies (Agrowon, Sakal, Lokmat, Pudhari), and TV broadcast coordination on Doordarshan Sahyadri.',
      descMr: 'दैनिक वृत्तपत्रांमध्ये कृषी सल्ले, अग्रगण्य वर्तमानपत्रांतून प्रसिद्धी, अ‍ॅग्रोवनमध्ये विशेष लेख आणि दूरदर्शन सह्याद्री वाहिनीशी समन्वय.'
    },
    {
      id: 'museum',
      icon: Building2,
      titleEn: 'Agricultural Museum & Mobile Exhibition Van',
      titleMr: 'मध्यवर्ती कृषी संग्रहालय व फिरते प्रदर्शन वाहन',
      descEn: 'State-of-the-art agricultural museum displaying animated crop models, soil monoliths, history of green revolution, and a mobile exhibition van touring remote talukas.',
      descMr: 'विद्यापीठाचे मध्यवर्ती कृषी संग्रहालय, विविध वाणांचे नमुने, हरितक्रांती इतिहास दालन आणि खेडोपाडी फिरणारे मोबाईल प्रदर्शन वाहन.'
    }
  ];

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-slate-800">
      <ExtensionBreadcrumb currentPageTitle={{ en: 'Communication Centre & Radio 90.8 FM', mr: 'संप्रेषण केंद्र व ९०.८ एफएम वाहिनी' }} />

      <ExtensionHero
        theme="radio"
        badge={{ en: 'Mass Media & Broadcast Wing', mr: 'जनसंपर्क, माध्यम व प्रसारण शाखा' }}
        title={{
          en: 'Communication Centre & Radio 90.8 FM',
          mr: 'संप्रेषण केंद्र व ९०.८ एफएम वाहिनी'
        }}
        subtitle={{
          en: 'Broadcasting agricultural science to millions through Vidyapeeth Vahini Community Radio CRS 90.8 FM, documentary films, exhibitions, and print media.',
          mr: 'विद्यापीठ वाहिनी ९०.८ एफएम, माहितीपट, कृषी संग्रहालय व वृत्तपत्रीय प्रसिद्धीद्वारे लाखो शेतकऱ्यांशी थेट संवाद.'
        }}
        quickChips={[
          { label: 'CRS 90.8 MHz FM', icon: Radio },
          { label: language === 'mr' ? 'दृकश्राव्य माहितीपट' : 'Audio-Visual Films', icon: Video },
          { label: language === 'mr' ? 'कृषी संग्रहालय' : 'Central Museum', icon: Building2 },
          { label: language === 'mr' ? 'मोबाईल प्रदर्शन व्हॅन' : 'Mobile Exhibition Van', icon: Tv }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">

        {/* 1. Community Radio 90.8 FM Broadcast Studio Spotlight Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-rose-950 via-stone-900 to-amber-950 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>{language === 'mr' ? 'थेट प्रसारण: ९०.८ मेगाहर्ट्झ' : 'On-Air: 90.8 MHz FM'}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold">
                {language === 'mr' ? 'विद्यापीठ वाहिनी — शेतकरी मित्र' : 'Vidyapeeth Vahini — Community Radio'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-serif leading-tight">
              {language === 'mr'
                ? 'शेतकऱ्यांचा स्वतःचा आवाज — विद्यापीठ वाहिनी ९०.८ एफएम'
                : 'Vidyapeeth Vahini CRS 90.8 FM: The Voice of Farming Community'}
            </h2>

            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-normal">
              {language === 'mr'
                ? 'माहिती व प्रसारण मंत्रालय, भारत सरकार यांच्या मान्यतेने स्थापित विद्यापीठ वाहिनी ९०.८ एफएम दररोज सकाळी व संध्याकाळी अद्ययावत हवामान, बाजारभाव, शेती सल्ला, कीड रोग नियंत्रणाची तातडीची माहिती आणि शेतकऱ्यांच्या लोककलांचे प्रसारण करते.'
                : 'Licensed by the Ministry of Information & Broadcasting, Government of India, MPKV CRS 90.8 FM broadcasts daily farmer-centric content within a 25 km radius of Rahuri, covering real-time pest advisories, weather updates, APMC market rates, and rural development dialogues.'}
            </p>
          </div>

          {/* Interactive Radio Player Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 space-y-4 shrink-0 relative z-10 text-center lg:text-left min-w-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-rose-300 tracking-wider">
                FM BROADCAST
              </span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-bold text-emerald-300 uppercase">Live Studio</span>
              </div>
            </div>

            <div className="text-3xl font-black font-serif text-white tracking-tight">
              90.8 MHz
            </div>

            <p className="text-xs text-rose-200">
              {language === 'mr' ? 'कार्यक्षेत्र: राहुरी, नेवासा, कोपरगाव, श्रीरामपूर परिसर' : 'Coverage: Rahuri, Shrirampur, Nevasa, Kopargaon talukas'}
            </p>

            <button
              onClick={() => setIsPlayingPreview(!isPlayingPreview)}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-stone-950 font-black text-xs transition-transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingPreview ? (language === 'mr' ? 'वाहिनी सुरू आहे...' : 'Listening...') : (language === 'mr' ? 'वाहिनी ट्यून करा' : 'Tune In Live Info')}</span>
            </button>
          </div>
        </div>

        {/* 2. Daily Broadcast Schedule Cards */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-100 text-rose-950 border border-rose-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5 text-rose-700" />
                <span>{language === 'mr' ? 'दैनंदिन प्रसारण वेळापत्रक' : 'Daily Broadcast Schedule'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                {language === 'mr' ? 'विद्यापीठ वाहिनी ९०.८ एफएम — दैनिक सत्रे' : 'Vidyapeeth Vahini 90.8 FM Daily Broadcast Slots'}
              </h3>
            </div>
            <span className="text-xs font-bold text-stone-500">
              {language === 'mr' ? 'दररोज सकाळी व संध्याकाळी' : 'Daily Morning & Evening Slots'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {radioSchedule.map((slot, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-900 border border-rose-200">
                    {slot.time}
                  </span>

                  <h4 className="text-base font-bold font-serif text-slate-900">
                    {language === 'mr' ? slot.titleMr : slot.titleEn}
                  </h4>

                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                    {language === 'mr' ? slot.descMr : slot.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-rose-800">
                  <Radio className="w-3.5 h-3.5 text-rose-600" />
                  <span>{language === 'mr' ? 'थेट शेती मार्गदर्शन' : 'Live Farm Telecast'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Four Core Wings of Communication Centre */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'संप्रेषण केंद्र शाखा' : 'Communication Center Wings'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            {language === 'mr' ? 'संप्रेषण केंद्राचे ४ प्रमुख कार्यात्मक विभाग' : 'Four Core Functional Wings of the Communication Centre'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communicationWings.map((wing, idx) => {
              const Icon = wing.icon;
              return (
                <div
                  key={wing.id || idx}
                  className="p-7 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-rose-300"
                >
                  <div className="space-y-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200 flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-rose-700 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h4 className="text-base sm:text-lg font-bold font-serif text-slate-900 leading-snug">
                      {language === 'mr' ? wing.titleMr : wing.titleEn}
                    </h4>

                    <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                      {language === 'mr' ? wing.descMr : wing.descEn}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-500">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Operational Facility</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
