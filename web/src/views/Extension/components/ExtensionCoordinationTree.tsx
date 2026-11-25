'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GitFork,
  ChevronDown,
  Building2,
  Users,
  MapPin,
  Sprout,
  Layers,
  ArrowDown,
  Info,
  Sparkles,
  ExternalLink,
  Radio,
  BookOpen,
  HelpCircle,
  Truck,
  CheckCircle2,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const ExtensionCoordinationTree: React.FC = () => {
  const { language } = useLanguage();
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  const extensionBranches = [
    {
      id: 'headquarters',
      titleEn: '1. Headquarters & Media Wing',
      titleMr: '१. मुख्यालय व जनसंपर्क विभाग',
      color: 'bg-[#f0f9ff] border-[#38bdf8] text-slate-800',
      badgeColor: 'bg-[#e0f2fe] text-[#0369a1] border-[#38bdf8]',
      officerEn: 'Dy. Director of Extension Education',
      officerMr: 'उपसंचालक, विस्तार शिक्षण',
      unitsEn: 'Communication Centre, CRS 90.8 FM, Shree Sugi, E-Varta, Training Division',
      unitsMr: 'संप्रेषण केंद्र, ९०.८ एफएम वाहिनी, श्री सुगी, ई-वार्ता, प्रशिक्षण विभाग',
      link: '/communication-centre',
      linkTextEn: 'Explore Media Wing',
      linkTextMr: 'माध्यम विभाग पहा',
      icon: Radio
    },
    {
      id: 'kvks',
      titleEn: '2. Krishi Vigyan Kendras (17 KVKs)',
      titleMr: '२. कृषी विज्ञान केंद्रे (१७ केंद्रे)',
      color: 'bg-[#f0fdf4] border-[#4ade80] text-slate-800',
      badgeColor: 'bg-[#dcfce7] text-[#15803d] border-[#4ade80]',
      officerEn: 'Programme Coordinators & SMS Teams',
      officerMr: 'कार्यक्रम समन्वयक व विषय विशेषज्ञ',
      unitsEn: '4 University KVKs (Dhule, Mohol, Jalgaon, Satara) + 13 Partner NGO KVKs',
      unitsMr: '४ विद्यापीठ केंद्रे (धुळे, मोहोळ, जळगाव, सातारा) + १३ सहयोगी संस्था केंद्रे',
      link: '/extension/krishi-vigyan-kendras',
      linkTextEn: 'Explore 17 KVKs',
      linkTextMr: '१७ केव्हीके पहा',
      icon: Building2
    },
    {
      id: 'atic',
      titleEn: '3. ATIC (Single Window Delivery)',
      titleMr: '३. अ‍ॅटिक (एक खिडकी योजना)',
      color: 'bg-[#ecfeff] border-[#22d3ee] text-slate-800',
      badgeColor: 'bg-[#cffafe] text-[#0e7490] border-[#22d3ee]',
      officerEn: 'Manager & Subject Specialists',
      officerMr: 'व्यवस्थापक व विषय विशेषज्ञ',
      unitsEn: 'Single Window Seed/Plant Counter, Plant Health Clinic, Toll-Free 1800 233 3235',
      unitsMr: 'बियाणे व कलमे विक्री, पीक आरोग्य चिकित्सालय, टोल-फ्री १८०० २३३ ३२३५',
      link: '/atic-rahuri',
      linkTextEn: 'Explore ATIC',
      linkTextMr: 'अ‍ॅटिक सेवा पहा',
      icon: HelpCircle
    },
    {
      id: 'recs',
      titleEn: '4. Regional Extension Centers (4 RECs)',
      titleMr: '४. विभागीय विस्तार केंद्रे (४ केंद्रे)',
      color: 'bg-[#fefce8] border-[#facc15] text-slate-800',
      badgeColor: 'bg-[#fef9c3] text-[#a16207] border-[#facc15]',
      officerEn: 'Extension Agronomists & SMS (4 Centers)',
      officerMr: 'विस्तार कृषीविद्यावेत्ता व ४ विषय विशेषज्ञ',
      unitsEn: 'Pune, Dhule, Kolhapur & Rahuri with Mobile Crop Dispensary Diagnostic Vans',
      unitsMr: 'पुणे, धुळे, कोल्हापूर व राहुरी — फिरत्या पीक औषधालय वाहनांसह',
      link: '/extension/regional-centers',
      linkTextEn: 'Explore 4 RECs',
      linkTextMr: '४ विभागीय केंद्रे',
      icon: Truck
    },
    {
      id: 'decs',
      titleEn: '5. District Extension Centers (5 DECs)',
      titleMr: '५. जिल्हा विस्तार केंद्रे (५ केंद्रे)',
      color: 'bg-[#faf5ff] border-[#c084fc] text-slate-800',
      badgeColor: 'bg-[#f3e8ff] text-[#7e22ce] border-[#c084fc]',
      officerEn: 'Officers in Charge at Research Stations',
      officerMr: 'प्रभारी अधिकारी (संशोधन केंद्रे)',
      unitsEn: 'Solapur (ZARS), Kasbe Digraj (Sangli), Padegaon (Satara), Niphad (Nashik), Jalgaon',
      unitsMr: 'सोलापूर (ZARS), कसबे डिग्रज (सांगली), पाडेगाव (सातारा), निफाड (नाशिक), जळगाव',
      link: '/extension/district-centers',
      linkTextEn: 'Explore 5 DECs',
      linkTextMr: '५ जिल्हा केंद्रे',
      icon: Compass
    },
    {
      id: 'adhoc',
      titleEn: '6. Ad-hoc Projects (Farmer FIRST)',
      titleMr: '६. विशेष प्रकल्प ("फार्मर फर्स्ट")',
      color: 'bg-[#fff1f2] border-[#fb7185] text-slate-800',
      badgeColor: 'bg-[#ffe4e6] text-[#be123c] border-[#fb7185]',
      officerEn: 'Principal Investigators & Project Teams',
      officerMr: 'प्रमुख अन्वेषक व प्रकल्प पथक',
      unitsEn: 'RKVY Farmer FIRST (5,550+ Farmers, 9 Modules), SCSP & TSP Tribal Drives',
      unitsMr: 'आरकेव्हीवाय फार्मर फर्स्ट (५,५५०+ शेतकरी, ९ घटक), आदिवासी व विशेष घटक योजना',
      link: '/extension/adhoc-projects',
      linkTextEn: 'Explore Projects',
      linkTextMr: 'विशेष प्रकल्प पहा',
      icon: Sprout
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white via-[#fafaf8] to-white rounded-3xl border-2 border-stone-200/90 shadow-md p-6 sm:p-8 lg:p-10 space-y-8 overflow-hidden relative">

      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Banner */}
      <div className="text-center space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
          <GitFork className="w-3.5 h-3.5 text-emerald-700" />
          <span>{language === 'mr' ? 'विस्तार शिक्षण समन्वय संरचना' : 'Extension Coordination Tree'}</span>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0e3b26] font-serif tracking-tight">
          {language === 'mr' ? 'विस्तार शिक्षण प्रशासकीय उतरंड व समन्वय आलेख' : 'Extension Coordination Mechanism Tree'}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto font-medium">
          {language === 'mr'
            ? 'मा. कुलगुरू ते विस्तार संचालनालय, १७ केव्हीके, अ‍ॅटिक, विभागीय व जिल्हा केंद्रांचे परस्पर समन्वय जाळे'
            : 'Interactive structural hierarchy from Honorable Vice Chancellor down to 17 KVKs, ATIC, RECs, DECs, and Field Wings'}
        </p>
      </div>

      {/* 2. Interactive Tree View Container */}
      <div className="relative z-10 space-y-6 max-w-5xl mx-auto">

        {/* APEX LEVEL: Vice Chancellor */}
        <div className="flex flex-col items-center">
          <div className="w-full sm:w-[360px] p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0d3b66] to-[#001e3d] text-white text-center shadow-lg border-2 border-[#1f4e78] relative group hover:scale-[1.02] transition-transform">
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block mb-1">
              Apex Executive Authority
            </span>
            <h4 className="text-base sm:text-lg font-black font-serif tracking-wide">
              {language === 'mr' ? 'मा. कुलगुरू (Vice Chancellor)' : 'Hon’ble Vice Chancellor'}
            </h4>
            <p className="text-[11px] text-sky-200 mt-0.5 font-medium">
              Mahatma Phule Krishi Vidyapeeth, Rahuri
            </p>
          </div>

          {/* Vertical Trunk Connector */}
          <div className="w-0.5 h-8 sm:h-10 bg-gradient-to-b from-[#0d3b66] to-[#15803d]" />
          <ArrowDown className="w-4 h-4 text-[#15803d] -mt-2.5 z-10" />
        </div>

        {/* DIRECTORATE LEVEL: Director of Extension Education */}
        <div className="flex flex-col items-center -mt-1">
          <div className="w-full sm:w-[420px] p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#14532d] to-[#0e3b26] text-white text-center shadow-xl border-2 border-emerald-400 relative group hover:scale-[1.02] transition-transform">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block mb-1">
              Directorate Leadership
            </span>
            <h4 className="text-base sm:text-xl font-black font-serif tracking-wide text-white">
              {language === 'mr' ? 'संचालक, विस्तार शिक्षण' : 'Director of Extension Education'}
            </h4>
            <p className="text-xs text-emerald-200 mt-0.5 font-bold">
              {language === 'mr' ? 'डॉ. गोरक्ष ससाणे (अतिरिक्त पदभार)' : 'Dr. G. K. Sasane (Additional Charge)'}
            </p>
            <div className="text-[11px] text-stone-200 mt-1 font-mono">
              Phone: 02426 243230 | Email: deempkv@rediffmail.com
            </div>
          </div>

          {/* Trunk to 6 Operational Branches */}
          <div className="w-0.5 h-8 sm:h-10 bg-[#15803d]" />
          <div className="hidden lg:block w-[90%] h-0.5 bg-[#15803d] -mt-0.5" />
        </div>

        {/* 6 OPERATIONAL BRANCHES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {extensionBranches.map((branch, idx) => {
            const Icon = branch.icon;
            const isExpanded = activeBranch === branch.id;
            return (
              <div
                key={branch.id}
                className={`rounded-2xl p-5 border-2 ${branch.color} shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group`}
              >
                <div className="space-y-3">
                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border ${branch.badgeColor}`}
                    >
                      Branch #{idx + 1}
                    </span>
                    <Icon className="w-4 h-4 text-emerald-800" />
                  </div>

                  {/* Branch Title */}
                  <h5 className="text-sm sm:text-base font-black font-serif leading-snug text-slate-900">
                    {language === 'mr' ? branch.titleMr : branch.titleEn}
                  </h5>

                  {/* Officer in Charge */}
                  <div className="text-xs font-bold text-amber-950 bg-white/70 p-2 rounded-xl border border-stone-200/60">
                    <span className="text-[10px] text-stone-500 uppercase block font-semibold">
                      {language === 'mr' ? 'प्रशासकीय प्रमुख:' : 'Leadership:'}
                    </span>
                    {language === 'mr' ? branch.officerMr : branch.officerEn}
                  </div>

                  {/* Units / Jurisdiction */}
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    {language === 'mr' ? branch.unitsMr : branch.unitsEn}
                  </p>
                </div>

                {/* Direct Link to Subpage */}
                <div className="pt-3 mt-3 border-t border-stone-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Active Wing</span>
                  </span>

                  <Link
                    href={branch.link}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-stone-100 text-stone-900 text-xs font-bold rounded-lg border border-stone-300 shadow-2xs transition-transform hover:scale-105"
                  >
                    <span>{language === 'mr' ? branch.linkTextMr : branch.linkTextEn}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 3. Footer Note */}
      <div className="text-center pt-2 border-t border-stone-200/80">
        <p className="text-xs text-stone-500 font-medium">
          {language === 'mr'
            ? 'अधिकृत रचना: विस्तार शिक्षण संचालनालय, महात्मा फुले कृषी विद्यापीठ, राहुरी (महाराष्ट्र)'
            : 'Official Structure: Directorate of Extension Education, Mahatma Phule Krishi Vidyapeeth, Rahuri'}
        </p>
      </div>

    </div>
  );
};
