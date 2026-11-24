'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Smartphone,
  ExternalLink,
  Droplets,
  Milk,
  Bug,
  Timer,
  Compass,
  Sprout,
  Sparkles,
  ArrowRight
} from 'lucide-react';

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
      icon: Bug,
      link: 'https://smartpdm.mpkv.ac.in',
      styles: {
        iconBg: 'bg-gradient-to-br from-emerald-500 to-green-700 text-white shadow-xs shadow-emerald-500/20',
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
      icon: Milk,
      link: 'https://phuledairy.mpkv.ac.in',
      styles: {
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 shadow-xs shadow-amber-500/20',
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
      icon: Droplets,
      link: 'https://phulejal.mpkv.ac.in',
      styles: {
        iconBg: 'bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-xs shadow-cyan-500/20',
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
      icon: Timer,
      link: 'https://irrigationscheduler.mpkv.ac.in',
      styles: {
        iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xs shadow-blue-500/20',
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
      icon: Compass,
      link: 'https://spatialiwr.mpkv.ac.in',
      styles: {
        iconBg: 'bg-gradient-to-br from-purple-500 to-violet-700 text-white shadow-xs shadow-purple-500/20',
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
      icon: Sprout,
      link: 'https://sugarcane.mpkv.ac.in',
      styles: {
        iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs shadow-rose-500/20',
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
                ? 'मफुकृवि राहुरी शास्त्रज्ञ विकसित शेतकरी व संशोधकांसाठी अत्याधुनिक निर्णय साहाय्य प्रणाली (Decision Support Systems).'
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
          {apps.map((app) => {
            const Icon = app.icon;

            return (
              <a
                key={app.id}
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-5 rounded-2xl ${app.styles.cardBg} border ${app.styles.border} shadow-2xs hover:shadow-lg ${app.styles.glow} hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
              >
                <div className="space-y-3.5">
                  
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className={`w-11 h-11 rounded-2xl ${app.styles.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-lg border ${app.styles.badgeBg} shadow-2xs`}>
                      {app.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                      {language === 'mr' ? app.marathiName : app.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-700 mt-1.5 leading-relaxed font-medium">
                      {app.desc}
                    </p>
                  </div>

                </div>

                {/* Footer Action Link */}
                <div className="pt-3.5 mt-4 border-t border-stone-200/70 flex items-center justify-between text-xs font-bold">
                  <span className={`inline-flex items-center gap-1.5 transition-colors ${app.styles.actionColor}`}>
                    <span>{language === 'mr' ? 'अ‍ॅप उघडा' : 'Launch Application'}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>

                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                    mpkv.ac.in
                  </span>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
