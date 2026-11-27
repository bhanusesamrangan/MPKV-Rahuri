'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Building2,
  Phone,
  Mail,
  Truck,
  TestTube2,
  Users,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ExtensionBreadcrumb } from './components/ExtensionBreadcrumb';
import { ExtensionHero } from './components/ExtensionHero';

interface ExtensionRegionalCentersViewProps {
  pageData?: any;
}

export const ExtensionRegionalCentersView: React.FC<ExtensionRegionalCentersViewProps> = () => {
  const { language } = useLanguage();

  const regionalCenters = [
    {
      id: 'rec-dhule',
      designationEn: 'Extension Agronomist, Regional Extension Centre, College of Agriculture, Dhule',
      designationMr: 'विस्तार कृषीविद्यावेत्ता, विभागीय विस्तार केंद्र, कृषी महाविद्यालय, धुळे',
      campusEn: 'College of Agriculture, Dhule',
      campusMr: 'कृषी महाविद्यालय, धुळे',
      jurisdictionEn: 'Dhule and Nandurbar Districts (Khandesh Hill & Tribal Belt)',
      jurisdictionMr: 'धुळे व नंदुरबार जिल्हे (खान्देश डोंगरी व आदिवासी पट्टा)',
      phone: '02562-230050',
      email: 'recdhule@gmail.com',
      image: '/media/images/extension/REC_photo.jpg'
    },
    {
      id: 'rec-pune',
      designationEn: 'Extension Agronomist, Regional Extension Centre, Near Sancheti Hospital, Shivajinagar, Pune',
      designationMr: 'विस्तार कृषीविद्यावेत्ता, विभागीय विस्तार केंद्र, संचेती हॉस्पिटलजवळ, शिवाजीनगर, पुणे',
      campusEn: 'College of Agriculture, Pune',
      campusMr: 'कृषी महाविद्यालय, पुणे',
      jurisdictionEn: 'Pune District Plains, Western Ghats & Peri-Urban Agro Zone',
      jurisdictionMr: 'पुणे जिल्हा मैदानी भाग, सह्याद्री पट्टा व उपनगरीय शेती',
      phone: '9766253316',
      email: 'earrecpune@yahoo.co.in',
      image: '/media/images/extension/REC_photo.jpg'
    },
    {
      id: 'rec-kolhapur',
      designationEn: 'Extension Agronomist, Regional Extension Centre, R.C.S.M. College of Agriculture, Kolhapur',
      designationMr: 'विस्तार कृषीविद्यावेत्ता, विभागीय विस्तार केंद्र, राजर्षी छत्रपती शाहू महाराज कृषी महाविद्यालय, कोल्हापूर',
      campusEn: 'RCSM College of Agriculture, Kolhapur',
      campusMr: 'रा.छ.शा.म. कृषी महाविद्यालय, कोल्हापूर',
      jurisdictionEn: 'Kolhapur and South Sangli Sub-Montane High Productivity Tract',
      jurisdictionMr: 'कोल्हापूर व दक्षिण सांगली उप-पर्वतीय पट्टा (ऊस व गूळ शेती)',
      phone: '0231-2605851',
      email: 'reckolhapur@gmail.com',
      image: '/media/images/extension/REC_photo.jpg'
    },
    {
      id: 'rec-rahuri',
      designationEn: 'Extension Agronomist, Regional Extension Centre, Central Campus, MPKV Rahuri',
      designationMr: 'विस्तार कृषीविद्यावेत्ता, विभागीय विस्तार केंद्र, मध्यवर्ती परिसर, म.फु.कृ.वि. राहुरी',
      campusEn: 'Central Campus MPKV Rahuri',
      campusMr: 'मध्यवर्ती परिसर, म.फु.कृ.वि. राहुरी',
      jurisdictionEn: 'Ahmednagar and North Western Maharashtra Command Area',
      jurisdictionMr: 'अहमदनगर जिल्हा व कालवा लाभक्षेत्र',
      phone: '02426-243230',
      email: 'recrahuri@gmail.com',
      image: '/media/images/extension/REC_photo.jpg'
    }
  ];

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-slate-800">
      <ExtensionBreadcrumb currentPageTitle={{ en: 'Regional Extension Centers (REC)', mr: 'विभागीय विस्तार केंद्रे' }} />

      <ExtensionHero
        theme="regional"
        badge={{ en: 'Zonal Extension Headquarters', mr: 'विभागीय कृषी विस्तार मुख्यालय' }}
        title={{
          en: 'Regional Extension Centers (4 RECs)',
          mr: 'विभागीय विस्तार केंद्रे (४ केंद्रे)'
        }}
        subtitle={{
          en: 'Operating four strategic regional centers at constituent colleges (Pune, Dhule, Kolhapur, and Rahuri) equipped with Mobile Crop Dispensary Vans for instant soil and pest diagnosis.',
          mr: 'पुणे, धुळे, कोल्हापूर व राहुरी येथील कृषी महाविद्यालयांमध्ये फिरत्या पीक औषधालयांसह कार्यरत ४ विभागीय केंद्रे.'
        }}
        quickChips={[
          { label: '४ विभागीय केंद्रे (4 RECs)', icon: Building2 },
          { label: language === 'mr' ? 'फिरते पीक औषधालय' : 'Mobile Crop Dispensary Van', icon: Truck },
          { label: language === 'mr' ? '४ विषय विशेषज्ञ (SMS)' : '4 Subject Specialists', icon: Users },
          { label: language === 'mr' ? 'माती व पाणी तपासणी' : 'Soil & Water Diagnostics', icon: TestTube2 }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">

        {/* 1. Mobile Crop Dispensary Van Feature Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-950 via-stone-900 to-teal-950 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'विशेष फिरते पीक औषधालय' : 'Mobile Diagnostic Clinic'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-serif leading-tight">
              {language === 'mr'
                ? 'फिरते पीक औषधालय व माती-पाणी तपासणी प्रयोगशाळा वाहन'
                : 'Mobile Crop Dispensary Van: On-the-Spot Field Health Diagnosis'}
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              {language === 'mr'
                ? 'प्रत्येक विभागीय विस्तार केंद्राला सुसज्ज "फिरते पीक औषधालय" वाहन पुरवले आहे. या वाहनामध्ये माती व पाण्याचे नमुने तपासणे, पिकांवरील रोग व किडींचे जागेवरच अचूक निदान करणे आणि तात्काळ तांत्रिक सल्ला देण्याची सोय आहे. या वाहनाचा दौऱ्याचा मार्ग आधीच जाहीर केला जातो जेणेकरून शेतकरी वेळेवर लाभ घेऊ शकतात.'
                : 'Each Regional Extension Center operates a state-of-the-art Mobile Crop Dispensary Van equipped with laboratory instruments to conduct instant soil and water salinity tests, diagnose plant pathology and insect samples on-the-spot, and issue scientific prescription remedies along pre-announced village routes.'}
            </p>
          </div>

          {/* Specialist Team Bento */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3 shrink-0 relative z-10 min-w-[260px]">
            <span className="text-xs font-bold uppercase text-amber-300 tracking-wider">
              {language === 'mr' ? '४ विषय विशेषज्ञ चमू' : '4 Subject Matter Specialists'}
            </span>
            <ul className="text-xs text-stone-200 space-y-1.5 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Agronomy (कृषीविद्या)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Horticulture (फलोत्पादन)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Plant Protection (कीटक व रोगशास्त्र)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Animal Husbandry (पशुसंवर्धन)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Four Regional Extension Centers Cards */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? 'विभागीय केंद्रे' : 'Active Operational Centers'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                {language === 'mr' ? 'विद्यापीठाची ४ विभागीय विस्तार केंद्रे (RECs)' : 'Four Regional Extension Centers (RECs) Directory'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionalCenters.map((rec, idx) => (
              <div
                key={rec.id || idx}
                className="p-7 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-emerald-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200">
                      REC #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'mr' ? rec.campusMr : rec.campusEn}</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold font-serif text-slate-900 leading-snug">
                      {language === 'mr' ? rec.designationMr : rec.designationEn}
                    </h4>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-700 space-y-1">
                    <span className="font-bold text-slate-900 block">
                      {language === 'mr' ? 'कार्यक्षेत्र:' : 'Jurisdiction Area:'}
                    </span>
                    <span>{language === 'mr' ? rec.jurisdictionMr : rec.jurisdictionEn}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <a
                    href={`tel:${rec.phone.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                  >
                    <Phone className="w-3 h-3 text-blue-600" />
                    <span>{rec.phone}</span>
                  </a>

                  <a
                    href={`mailto:${rec.email}`}
                    className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:underline bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                  >
                    <Mail className="w-3 h-3 text-emerald-600" />
                    <span>{rec.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
