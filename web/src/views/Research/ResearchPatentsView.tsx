'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Lock,
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  Sprout,
  Milk,
  Apple
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

interface ResearchPatentsViewProps {
  pageData?: any;
}

export const ResearchPatentsView: React.FC<ResearchPatentsViewProps> = ({ pageData }) => {
  const { language } = useLanguage();

  // All 6 granted patents verified from research-at-a-glance.json
  const grantedPatents = [
    {
      sr: '01',
      titleEn: 'Device and Method for Producing Custard Apple Pulp Flakes',
      titleMr: 'सीताफळ गर चकत्या निर्मितीचे यंत्र व प्रक्रिया पद्धती',
      category: 'Food Engineering & Post-Harvest',
      categoryMr: 'काढणीपश्चात तंत्रज्ञान व अन्न प्रक्रिया',
      year: '2025–26',
      status: 'Patent Granted (नोंदणीकृत पेटंट)',
      icon: Apple,
      color: 'border-amber-300 bg-amber-50/50',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
      abstractEn: 'Mechanized separation of custard apple pulp from seeds and rind without crushing bitter seed coats. Introduces thin-film vacuum flaking technology ensuring extended room-temperature shelf life and anti-browning stability.',
      abstractMr: 'सीताफळाच्या बिया न फुटता स्वच्छ गर वेगळा करणारे स्वयंचलित यंत्र आणि गराच्या चकत्या (Flakes) तयार करण्याचे पेटंट तंत्रज्ञान. यामुळे सीताफळाचा गर वर्षभर साठवून आइस्क्रीम व बेकरीसाठी वापरणे शक्य झाले आहे.',
      commercialEn: 'Licensed for commercial scale dairy and fruit processing industries.'
    },
    {
      sr: '02',
      titleEn: 'Method for Preparing and Storing Amla (Indian Gooseberry) Pulp',
      titleMr: 'आवळा गर तयार करणे व साठवणूक करण्याची शास्त्रीय पद्धती',
      category: 'Horticultural Processing',
      categoryMr: 'फलोत्पादन मूल्यवर्धन',
      year: '2025–26',
      status: 'Patent Granted (नोंदणीकृत पेटंट)',
      icon: Sprout,
      color: 'border-emerald-300 bg-emerald-50/50',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      abstractEn: 'Thermal-safe extraction and biochemical stabilization of ascorbic acid (Vitamin C) and polyphenol antioxidants in gooseberry pulp without synthetic chemical preservatives.',
      abstractMr: 'आवळा फळातील क-जीवनसत्त्व (Vitamin C) आणि अँटिऑक्सिडंट्स नष्ट न होता गर काढण्याची व नैसर्गिक पद्धतीने साठवणूक करण्याची अधिकृत पेटंट पद्धती.',
      commercialEn: 'Enables round-the-year ayurvedic and nutraceutical processing.'
    },
    {
      sr: '03',
      titleEn: "Process for Making 'Phule' Ragi (Finger Millet) Biscuits",
      titleMr: "'फुले' नाचणी बिस्किटे निर्मितीची प्रमाणित प्रक्रिया",
      category: 'Nutri-Cereal Value Addition',
      categoryMr: 'पोषक भरडधान्य बेकरी तंत्रज्ञान',
      year: '2025–26',
      status: 'Patent Granted (नोंदणीकृत पेटंट)',
      icon: Award,
      color: 'border-amber-300 bg-amber-50/50',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
      abstractEn: 'Gluten-free optimized dough processing combining finger millet flour with natural binding agents. Standardizes calcium bioavailability and dietary fiber in palatable commercial bakery cookies.',
      abstractMr: 'नाचणीमधील नैसर्गिक कॅल्शियम व तंतूमय घटकांची उपलब्धता टिकवून ठेवणाऱ्या पौष्टिक बिस्किटांची उत्पादन प्रक्रिया. मधुमेह व बालकांच्या पोषणासाठी अत्यंत गुणकारी.',
      commercialEn: 'Commercialized across university retail outlets and SHG networks.'
    },
    {
      sr: '04',
      titleEn: 'Plant Identification Module for Orchard Crops',
      titleMr: 'फळबागांसाठी स्वयंचलित झाड ओळख व सेन्सर प्रणाली',
      category: 'AI Sensor Robotics & Precision Farming',
      categoryMr: 'कृत्रिम बुद्धिमत्ता व सेन्सर रोबोटिक्स',
      year: '2025–26',
      status: 'Patent Granted (नोंदणीकृत पेटंट)',
      icon: Cpu,
      color: 'border-purple-300 bg-purple-50/50',
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300',
      abstractEn: 'Machine-vision ultrasonic and optical canopy scanner mounted on farm sprayers. Accurately detects tree trunk, foliar volume, and canopy voids for localized, targeted micro-spraying.',
      abstractMr: 'फळबागेतील झाडांचा विस्तार आणि आकार कॅमेऱ्याद्वारे ओळखून फक्त झाडावरच अचूक फवारणी करणारी सेन्सर प्रणाली. यामुळे ४०% कीटकनाशक व पाण्याची बचत होते.',
      commercialEn: 'Integrated into CAAST-CSAWM tractor and drone prototypes.'
    },
    {
      sr: '05',
      titleEn: 'Method for Preparing Tamarind-Based Beverages',
      titleMr: 'चिंचयुक्त आरोग्यदायी पेय निर्मिती पद्धती',
      category: 'Agro-Beverage Formulation',
      categoryMr: 'कृषी प्रक्रिया पेय तंत्रज्ञान',
      year: '2025–26',
      status: 'Patent Granted (नोंदणीकृत पेटंट)',
      icon: Layers,
      color: 'border-orange-300 bg-orange-50/50',
      badgeColor: 'bg-orange-100 text-orange-950 border-orange-300',
      abstractEn: 'De-acidified enzymatic clarification of tamarind pulp formulating a shelf-stable refreshing electrolyte drink rich in tartaric acid, potassium, and natural sugars.',
      abstractMr: 'चिंचेचा आंबटपणा संतुलित करून त्यातील पोटॅशियम व नैसर्गिक घटकांचा समतोल साधणारे चवदार व पाचक पेय बनवण्याचे तंत्रज्ञान.',
      commercialEn: 'Ready for licensing to commercial beverage bottlers.'
    },
    {
      sr: '06',
      titleEn: 'Shrikhand Based Confectionary and Process for Preparation Thereof',
      titleMr: 'श्रीखंड आधारित मिठाई व निर्मितीचे शास्त्रोक्त तंत्रज्ञान',
      category: 'Dairy Processing & Confectionery',
      categoryMr: 'दुग्ध प्रक्रिया व मिष्टान्न तंत्रज्ञान',
      year: '2025–26',
      status: 'Patent Granted (नोंदणीकृत पेटंट)',
      icon: Milk,
      color: 'border-cyan-300 bg-cyan-50/50',
      badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300',
      abstractEn: 'Dehydrated chakka formulation with standardized probiotic cultures creating high-shelf-life confectionery bites without requiring continuous refrigeration.',
      abstractMr: 'पारंपरिक श्रीखंडाच्या चवीसह दीर्घकाळ टिकणारी दुग्धजन्य मिठाई तयार करण्याचे प्रक्रिया तंत्रज्ञान. सामान्य तापमानावर साठवणुकीस अत्यंत अनुकूल.',
      commercialEn: 'Demonstrated at MPKV Phule Dairy & Technology Center.'
    }
  ];

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: 'Registered Patents', mr: 'नोंदणीकृत पेटंट्स' }} />

      <ResearchHero
        theme="patents"
        badge={{ en: 'Intellectual Property Rights (IPR)', mr: 'बौद्धिक संपदा अधिकार व पेटंट्स' }}
        title={{
          en: 'Registered Patents — Intellectual Property Rights & Inventions',
          mr: 'नोंदणीकृत पेटंट्स — बौद्धिक संपदा अधिकार व विद्यापीठ संशोधन'
        }}
        subtitle={{
          en: 'Official patent inventions granted to MPKV Rahuri by the Controller General of Patents, Designs and Trade Marks (CGPDTM), Govt. of India in 2025–26.',
          mr: 'भारत सरकारच्या पेटंट महानियंत्रक कार्यालयाने (CGPDTM) म.फु.कृ.वि. राहुरीच्या शास्त्रज्ञांनी विकसित केलेल्या शेती व अन्न प्रक्रिया तंत्रज्ञानास बहाल केलेले अधिकृत पेटंट्स.'
        }}
        quickChips={[
          { label: language === 'mr' ? '६ नोंदणीकृत पेटंट्स (२०२५-२६)' : '6 Granted Patents (2025–26)', icon: Award },
          { label: language === 'mr' ? 'भारत सरकार पेटंट कार्यालय' : 'CGPDTM Govt. of India', icon: ShieldCheck },
          { label: language === 'mr' ? 'अन्न प्रक्रिया व एआय सेन्सर्स' : 'Food Tech & AI Sensors', icon: Cpu }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 space-y-12">

        {/* 1. IPR Overview & Technology Transfer Desk */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'mr' ? 'पेटंट सुविधा केंद्र' : 'Patent Facilitation Cell (PFC)'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'mr' ? 'विद्यापीठ पेटंट व तंत्रज्ञान हस्तांतरण धोरण' : 'Intellectual Property Commercialization & Licensing'}
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              6 Patents Granted in 2025–26
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
            {language === 'mr'
              ? 'म.फु.कृ.वि. राहुरीच्या संशोधन संचालनालयांतर्गत कार्यरत "पेटंट सुविधा कक्ष" (Patent Facilitation Cell) कृषी शास्त्रज्ञांच्या संशोधनाचे बौद्धिक संपदा अधिकारात रूपांतर करतो. वर्ष २०२५-२६ मध्ये विद्यापीठाला ६ राष्ट्रीय पेटंट्स बहाल करण्यात आले असून ते कृषी-उद्योजक, शेतकरी उत्पादक कंपन्या (FPCs) व अन्न प्रक्रिया उद्योगांना व्यावसायिक उत्पादनासाठी परवान्याने (License) उपलब्ध करून दिले जातात.'
              : 'The Patent Facilitation Cell under the Directorate of Research safeguards inventions developed by university scientists. In 2025–26, six patents were granted to MPKV spanning food preservation, functional millets, dairy confectionery, and AI sensors. These inventions are open for technology licensing to agri-entrepreneurs and farmer producer companies.'}
          </p>
        </section>

        {/* 2. Six Granted Patents Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grantedPatents.map((pat) => {
            const Icon = pat.icon;
            return (
              <div
                key={pat.sr}
                className={`p-6 rounded-3xl border ${pat.color} bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-300 font-extrabold text-sm flex items-center justify-center font-serif shadow-xs">
                      {pat.sr}
                    </div>

                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border ${pat.badgeColor}`}>
                      {pat.year}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase block">
                      {language === 'mr' ? pat.categoryMr : pat.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-serif leading-snug mt-1">
                      {language === 'mr' ? pat.titleMr : pat.titleEn}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-medium">
                    {language === 'mr' ? pat.abstractMr : pat.abstractEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{pat.status}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Link to Research Implements & Varieties */}
        <section className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              {language === 'mr' ? 'विद्यापीठ शेती अवजारे व विकसित वाण' : 'Explore University Farm Implements & Released Varieties'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              {language === 'mr'
                ? '३५ पेटंट तंत्रज्ञानयुक्त शेती अवजारे व २७०+ अधिकृत विकसित पीक वाणांची संपूर्ण यादी.'
                : 'Browse our catalog of 35 engineered agricultural implements and 270+ released crop varieties with official brochures.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/farm-implements"
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>{language === 'mr' ? 'शेती अवजारे' : 'Farm Implements'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/research/varieties"
              className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/20 inline-flex items-center gap-2"
            >
              <span>{language === 'mr' ? 'पीक वाण' : 'Crop Varieties'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
