'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Smartphone,
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const PlayStoreIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.59 1.59 0 0 1-.61-.926V2.74c0-.36.143-.702.61-.926zm11.31 11.312l2.25 2.25-10.45 6.036 8.2-8.286zm0-2.252l-8.2-8.286 10.45 6.036-2.25 2.25zm1.592 1.126l2.844-1.642a1.442 1.442 0 0 0 0-2.496l-2.844-1.642-1.782 1.782 1.782 1.782z" />
  </svg>
);

export const AgriAppsShowcase: React.FC = () => {
  const { language } = useLanguage();

  const apps = [
    {
      id: 'smart-pdm',
      name: 'Smart PDM',
      marathiName: 'स्मार्ट पीडीएम',
      category: language === 'mr' ? 'कीड व रोग नियंत्रण' : 'Pest & Disease Advisory',
      desc: language === 'mr'
        ? 'पिकांवरील कीड-रोगांचे एआय द्वारे त्वरित अचूक निदान व एकात्मिक उपाययोजना.'
        : 'AI-assisted diagnosis and integrated management of crop pests and diseases.',
      image: '/media/images/pdm.jpg',
      link: 'https://play.google.com/store/apps/details?id=com.mpkv.ppdm&hl=en_IN',
      styles: {
        badgeBg: 'bg-emerald-100 text-emerald-950 border-emerald-300/90',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-emerald-50/30 hover:to-emerald-50/60',
        border: 'border-emerald-200/90 hover:border-emerald-400',
        actionColor: 'text-emerald-800 hover:text-emerald-950',
        glow: 'hover:shadow-emerald-500/15'
      }
    },
    {
      id: 'phule-dairy',
      name: 'Phule Dairy',
      marathiName: 'फुले डेअरी',
      category: language === 'mr' ? 'दुग्ध व्यवसाय व गोपालन' : 'Dairy Herd Management',
      desc: language === 'mr'
        ? 'दुग्ध व्यवसाय, जनावरांचे शास्त्रीय पोषण, पैदास नोंदी व दूध उत्पादन व्यवस्थापन.'
        : 'Smart tracking for dairy animal nutrition, elite breeding, and milk yields.',
      image: '/media/images/PhuleDairy.jpg',
      link: 'https://play.google.com/store/apps/details?id=com.dairy.phule_farmer&hl=en_IN',
      styles: {
        badgeBg: 'bg-amber-100 text-amber-950 border-amber-300/90',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-amber-50/30 hover:to-amber-50/60',
        border: 'border-amber-200/90 hover:border-amber-400',
        actionColor: 'text-amber-800 hover:text-amber-950',
        glow: 'hover:shadow-amber-500/15'
      }
    },
    {
      id: 'phule-jal',
      name: 'Phule Jal',
      marathiName: 'फुले जल',
      category: language === 'mr' ? 'जलसंधारण व पाणी बजेट' : 'Water Budgeting & Audit',
      desc: language === 'mr'
        ? 'शेततळी, विहिरी व कालवा पाण्याचे अचूक शास्त्रीय हिशोब आणि पीकनिहाय नियोजन.'
        : 'Scientific water budgeting, farm ponds capacity, and crop demand calculations.',
      image: '/media/images/pjapp.png',
      link: 'https://play.google.com/store/apps/details?id=net.parthinfotech.phulejal',
      styles: {
        badgeBg: 'bg-cyan-100 text-cyan-950 border-cyan-300/90',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-cyan-50/30 hover:to-cyan-50/60',
        border: 'border-cyan-200/90 hover:border-cyan-400',
        actionColor: 'text-cyan-800 hover:text-cyan-950',
        glow: 'hover:shadow-cyan-500/15'
      }
    },
    {
      id: 'irrigation-scheduler',
      name: 'Irrigation Scheduler',
      marathiName: 'जलसिंचन वेळापत्रक',
      category: language === 'mr' ? 'स्वयंचलित सूक्ष्म सिंचन' : 'Automated Irrigation',
      desc: language === 'mr'
        ? 'मृदा ओलावा, तापमान व बाष्पीभवनावर आधारित ठिबक व तुषार सिंचन वेळापत्रक.'
        : 'Automated drip irrigation scheduling based on real-time soil moisture & weather.',
      image: '/media/images/pisapp.png',
      link: 'https://play.google.com/store/apps/details?id=net.parthinfotech.modified_pis&hl=en',
      styles: {
        badgeBg: 'bg-blue-100 text-blue-950 border-blue-300/90',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-blue-50/30 hover:to-blue-50/60',
        border: 'border-blue-200/90 hover:border-blue-400',
        actionColor: 'text-blue-800 hover:text-blue-950',
        glow: 'hover:shadow-blue-500/15'
      }
    },
    {
      id: 'spatial-iwr',
      name: 'Spatial IWR',
      marathiName: 'स्पेशिअल आयडब्ल्यूआर',
      category: language === 'mr' ? 'उपग्रह व भू-स्थानिक जल' : 'Satellite Water GIS',
      desc: language === 'mr'
        ? 'उपग्रह प्रणाली व जीआयएस मॅपिंगद्वारे प्रादेशिक जलस्रोत मॉडेलिंग व विश्लेषण.'
        : 'Satellite remote sensing & GIS mapping for watershed management & water resources.',
      image: '/media/images/iwr.webp',
      link: 'https://play.google.com/store/apps/details?id=com.caast.spatialiwr&hl=en_IN',
      styles: {
        badgeBg: 'bg-purple-100 text-purple-950 border-purple-300/90',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-purple-50/30 hover:to-purple-50/60',
        border: 'border-purple-200/90 hover:border-purple-400',
        actionColor: 'text-purple-800 hover:text-purple-950',
        glow: 'hover:shadow-purple-500/15'
      }
    },
    {
      id: 'phule-sugarcane',
      name: 'Phule Sugarcane',
      marathiName: 'फुले ऊस सल्ला',
      category: language === 'mr' ? 'ऊस पीक व्यवस्थापन' : 'Sugarcane Advisory',
      desc: language === 'mr'
        ? 'जास्तीत जास्त एकरी ऊस उत्पादकतेसाठी खत, पाणी, बेणे प्रक्रिया व तण नियंत्रण.'
        : 'End-to-end guidance for high-tonnage sugarcane cultivation, nutrition, and ratoon care.',
      image: '/media/images/sugarcan.webp',
      link: 'https://play.google.com/store/apps/details?id=com.mpkvcaast.phulesugarcane1&hl=en_IN',
      styles: {
        badgeBg: 'bg-rose-100 text-rose-950 border-rose-300/90',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:via-rose-50/30 hover:to-rose-50/60',
        border: 'border-rose-200/90 hover:border-rose-400',
        actionColor: 'text-rose-800 hover:text-rose-950',
        glow: 'hover:shadow-rose-500/15'
      }
    }
  ];

  return (
    <section className="w-full py-12 sm:py-14 bg-[#edf3ed] border-t border-stone-300 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[300px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] space-y-7 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-300">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 via-amber-100 to-cyan-100 border border-emerald-300/90 text-emerald-950 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'mr' ? 'प्रगत डिजिटल शेती' : 'Advance Digital Agriculture'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span className="text-emerald-900 font-bold">{language === 'mr' ? 'वेब व मोबाइल अ‍ॅप्स' : 'Web & Mobile Apps'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight">
              {language === 'mr' ? 'विद्यापीठ वेब व मोबाइल अ‍ॅप्लिकेशन्स' : 'University Web & Mobile Applications'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-[14.5px] mt-1 max-w-3xl">
              {language === 'mr'
                ? 'मफुकृवि राहुरी शास्त्रज्ञ विकसित शेतकरी व संशोधकांसाठी अत्याधुनिक निर्णय साहाय्य प्रणाली.'
                : 'Proprietary smart agriculture decision support systems developed by MPKV scientists for farmers & researchers.'}
            </p>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-stone-300 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-900">
              {language === 'mr' ? '६ अधिकृत अ‍ॅप्लिकेशन्स थेट सुरू' : '6 Official Portals Active'}
            </span>
          </div>
        </div>

        {/* 6 Apps Interactive Multicolor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app) => (
            <a
              key={app.id}
              href={app.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-5 rounded-2xl ${app.styles.cardBg} border ${app.styles.border} shadow-2xs hover:shadow-lg ${app.styles.glow} hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
            >
              <div className="space-y-3.5">
                
                {/* Top Bar: Original Scraped App Icon + Category Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-xs flex-shrink-0 group-hover:scale-105 group-hover:shadow-md transition-all duration-300 p-1 flex items-center justify-center">
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-full object-contain rounded-xl"
                      onError={(e) => {
                        // Fallback in case of image load delay
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-lg border ${app.styles.badgeBg} shadow-2xs text-right`}>
                    {app.category}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-slate-950 transition-colors flex items-center gap-2">
                    <span>{language === 'mr' ? app.marathiName : app.name}</span>
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-700 mt-1.5 leading-relaxed font-medium">
                    {app.desc}
                  </p>
                </div>

              </div>

              {/* Footer Action Link: Direct to Google Play */}
              <div className="pt-3.5 mt-4 border-t border-stone-200/70 flex items-center justify-between text-xs font-bold">
                <span className={`inline-flex items-center gap-1.5 transition-colors ${app.styles.actionColor}`}>
                  <PlayStoreIcon className="w-3.5 h-3.5 fill-current" />
                  <span>{language === 'mr' ? 'गुगल प्ले वर डाउनलोड करा' : 'Get on Google Play'}</span>
                </span>

                <span className="text-[11px] font-semibold text-slate-400 group-hover:text-emerald-700 transition-colors flex items-center gap-1">
                  <span>Play Store</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* View More on Google Play Banner from Live Site */}
        <div className="pt-2 flex justify-center">
          <a
            href="https://play.google.com/store/apps/developer?id=CAAST+-CSAWM&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:scale-105"
          >
            <PlayStoreIcon className="w-4 h-4 fill-white" />
            <span>{language === 'mr' ? 'सर्व अ‍ॅप्लिकेशन्स गुगल प्ले स्टोअरवर पहा' : 'View All Apps on Google Play Store (CAAST-CSAWM)'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
