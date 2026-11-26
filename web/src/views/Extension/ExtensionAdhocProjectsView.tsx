'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sprout,
  Users,
  Target,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Award
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ExtensionBreadcrumb } from './components/ExtensionBreadcrumb';
import { ExtensionHero } from './components/ExtensionHero';

interface ExtensionAdhocProjectsViewProps {
  pageData?: any;
}

export const ExtensionAdhocProjectsView: React.FC<ExtensionAdhocProjectsViewProps> = () => {
  const { language } = useLanguage();

  const farmerFirstModules = [
    {
      num: '01',
      cropEn: 'Sugarcane + Vegetable Intercrops',
      cropMr: 'ऊस + भाजीपाला आंतरपीक पद्धती',
      beneficiaries: '1,500 Farmers',
      beneficiariesMr: '१,५०० शेतकरी',
      descEn: 'Maximizing farm profitability per unit land by introducing high-value vegetable intercropping (cabbage, fenugreek, coriander, onion) during early sugarcane growth stages.',
      descMr: 'सुरुवातीच्या उसाच्या वाढीच्या काळात कोबी, मेथी, कोथिंबीर, कांदा यांसारखी आंतरपिके घेऊन शेतकऱ्यांचे एकरी उत्पन्न वाढवणे.'
    },
    {
      num: '02',
      cropEn: 'Cotton Integrated Production Technology',
      cropMr: 'कापूस एकात्मिक उत्पादन तंत्रज्ञान',
      beneficiaries: '900 Farmers',
      beneficiariesMr: '९०० शेतकरी',
      descEn: 'High density planting system (HDPS), pheromone traps, biological trichoderma seed treatment, and integrated pink bollworm management in rainfed cotton.',
      descMr: 'सघन कापूस लागवड पद्धती (HDPS), कामगंध सापळे, जैविक बियाणे प्रक्रिया आणि गुलाबी बोंडअळीचे प्रभावी एकात्मिक नियंत्रण.'
    },
    {
      num: '03',
      cropEn: 'Groundnut Based Production Technology',
      cropMr: 'भुईमूग उत्पादन व सुधारित बियाणे तंत्रज्ञान',
      beneficiaries: '300 Farmers',
      beneficiariesMr: '३०० शेतकरी',
      descEn: 'Broad bed furrow (BBF) planting of drought-tolerant JL-24 (Phule Pragati) and JL-501 varieties with micronutrient and gypsum application.',
      descMr: 'रुंद वरंबा-सरी (BBF) पद्धतीवर जेएल-२४ (फुले प्रगती) व जेएल-५०१ या अवर्षण सहनशील भुईमूग वाणांची जिप्सम व सूक्ष्मअन्नद्रव्यांसह लागवड.'
    },
    {
      num: '04',
      cropEn: 'Gram / Chickpea Production Package',
      cropMr: 'हरभरा एकात्मिक उत्पादन व मर रोग नियंत्रण',
      beneficiaries: '300 Farmers',
      beneficiariesMr: '३०० शेतकरी',
      descEn: 'Demonstrating wilt-resistant chickpea varieties (Phule Vikram, Digvijay) with Trichoderma seed dressing and IPM for pod borer management.',
      descMr: 'मर रोगास प्रतिकारक्षम फुले विक्रम व दिग्विजय या हरभरा वाणांचे प्रात्यक्षिक, ट्रायकोडर्मा बीजप्रक्रिया आणि घाटे अळीचे नियंत्रण.'
    },
    {
      num: '05',
      cropEn: 'Bacterial Blight (Telya) in Pomegranate',
      cropMr: 'डाळिंबावरील तेल्या (बॅक्टेरियल ब्लाइट) नियंत्रण',
      beneficiaries: '600 Farmers',
      beneficiariesMr: '६०० शेतकरी',
      descEn: 'Community-based comprehensive bacterial blight management protocols, bactericides spraying schedules, orchard sanitation, and canopy pruning.',
      descMr: 'सामुदायिक पातळीवर तेल्या रोग नियंत्रण मोहीम, बागेची स्वच्छता, छाटणी तंत्रज्ञान आणि जिवाणूनाशकांच्या काटेकोर फवारणीचे वेळापत्रक.'
    },
    {
      num: '06',
      cropEn: 'Sigatoka Leaf Spot in Banana',
      cropMr: 'केळीवरील सिगाटोका करपा रोग व्यवस्थापन',
      beneficiaries: '300 Farmers',
      beneficiariesMr: '३०० शेतकरी',
      descEn: 'Foliar mineral oil sprays, clean cultivation, balanced potassium fertilization, and micro-sprinkler disease suppression in Khandesh banana belt.',
      descMr: 'खान्देश केळी पट्ट्यात सिगाटोका करपा नियंत्रणासाठी मिनरल ऑईल फवारणी, पोटॅश खतांचे संतुलित व्यवस्थापन व स्वच्छता मोहीम.'
    },
    {
      num: '07',
      cropEn: 'Onion Set Planting (Chingali Kanda)',
      cropMr: 'चिंगळी कांदा (कांदा सेट्स) तंत्रज्ञान',
      beneficiaries: '900 Farmers',
      beneficiariesMr: '९०० शेतकरी',
      descEn: 'Pioneering off-season onion bulb production via onion sets (chingali) ensuring early harvest and premium festive market realization.',
      descMr: 'अवेळी पडणाऱ्या पावसात चिंगळी कांदा (Onion Sets) लागवड तंत्रज्ञानाद्वारे लवकर उत्पादन घेऊन सणासुदीच्या काळात जास्त बाजारभाव मिळवून देणे.'
    },
    {
      num: '08',
      cropEn: 'Mole Plough for Ill-Drained Saline Soil',
      cropMr: 'पाणथळ व क्षारपड जमिनीसाठी मोल नांगर तंत्रज्ञान',
      beneficiaries: '450 Farmers',
      beneficiariesMr: '४५० शेतकरी',
      descEn: 'Subsurface drainage through tractor-mounted mole plows creating underground channels to reclaim waterlogged and salt-affected lands without costly pipes.',
      descMr: 'जमिनीतील अतिरिक्त पाण्याचा निचरा करण्यासाठी ट्रॅक्टरचलित मोल नांगराद्वारे जमिनीखाली नैसर्गिक नाले तयार करून क्षारपड जमीन पुनर्प्राप्त करणे.'
    },
    {
      num: '09',
      cropEn: 'Livestock & Backyard Poultry Component',
      cropMr: 'पशुसंवर्धन, कुक्कुटपालन व चारा विकास घटक',
      beneficiaries: '300 Farmers',
      beneficiariesMr: '३०० शेतकरी',
      descEn: 'Feed support, health checkup camps, mineral mixture supplements, artificial insemination in cows for genetic upgrading, hybrid Napier fodder grass root slips, and backyard poultry chicks.',
      descMr: 'पशुखाद्य, आरोग्य शिबिरे, खनिज मिश्रण वाटप, गायींमध्ये कृत्रिम रेतन, फुले जयवंत हायब्रिड नेपिअर चारा ठोंबे आणि परसातील कुक्कुटपालनासाठी पिल्लांचे वाटप.'
    }
  ];

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-slate-800">
      <ExtensionBreadcrumb currentPageTitle={{ en: 'Ad-hoc Extension Projects', mr: 'विस्तार विशेष प्रकल्प' }} />

      <ExtensionHero
        theme="projects"
        badge={{ en: 'RKVY & Government Sponsored Projects', mr: 'राष्ट्रीय कृषी विकास योजना व विशेष प्रकल्प' }}
        title={{
          en: 'Ad-hoc Extension & Farmer FIRST Projects',
          mr: 'विस्तार विशेष व "फार्मर फर्स्ट" प्रकल्प'
        }}
        subtitle={{
          en: 'Special externally-funded technology delivery initiatives reaching 5,550+ small and marginal farmers across nine comprehensive agricultural modules.',
          mr: '९ विशेष कृषी घटकांद्वारे ५,५५० हून अधिक शेतकऱ्यांच्या बांधावर प्रत्यक्ष पोहोचणारा राष्ट्रीय कृषी विकास योजनेचा विशेष प्रकल्प.'
        }}
        quickChips={[
          { label: 'Farmer FIRST (RKVY)', icon: Sprout },
          { label: '5,550+ Farmers Reached', icon: Users },
          { label: '9 Technology Modules', icon: Layers },
          { label: 'SCSP & TSP Programs', icon: ShieldCheck }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">

        {/* 1. Project Impact Overview Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-emerald-950 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'आरकेव्हीवाय पुरस्कृत प्रकल्प' : 'RKVY Funded National Initiative'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-serif leading-tight">
              {language === 'mr'
                ? '"फार्मर फर्स्ट" प्रकल्प — शेतकऱ्यांच्या गरजांनुसार तंत्रज्ञान प्रसार'
                : 'Farmer FIRST Project: Enhancing Farm Productivity & Farmer-Scientist Direct Contact'}
            </h2>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
              {language === 'mr'
                ? 'राष्ट्रीय कृषी विकास योजना (RKVY) अंतर्गत राबवण्यात येत असलेल्या "फार्मर फर्स्ट" प्रकल्पाचा मुख्य उद्देश शेतकऱ्यांच्या विविध, गुंतागुंतीच्या आणि जोखीमप्रवण परिस्थितीचा विचार करून शास्त्रज्ञ आणि शेतकऱ्यांमधील थेट संवाद वाढवणे हा आहे. विद्यापीठाने या प्रकल्पांतर्गत ५,५५० पेक्षा जास्त शेतकऱ्यांपर्यंत थेट पोहोचून त्यांची आर्थिक उत्पादकता वाढवली आहे.'
                : 'The Farmer FIRST project under Rashtriya Krishi Vikas Yojana (RKVY) aims to enrich farm productivity and address the complex realities of farmers by enhancing direct multi-stakeholder farmer-scientist participation. Through this project, the University has reached 5,550+ small and marginal farmers, resulting in vast horizontal adoption.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-300 font-serif">5,550+</div>
                <div className="text-xs text-stone-300 font-medium mt-0.5">
                  {language === 'mr' ? 'थेट शेतकरी लाभार्थी' : 'Direct Farmer Participants'}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-serif">09</div>
                <div className="text-xs text-stone-300 font-medium mt-0.5">
                  {language === 'mr' ? 'तंत्रज्ञान घटक' : 'Technology Components'}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-serif">1,500</div>
                <div className="text-xs text-stone-300 font-medium mt-0.5">
                  {language === 'mr' ? 'ऊस आंतरपीक शेतकरी' : 'Sugarcane Intercrop Ac.'}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-rose-300 font-serif">100%</div>
                <div className="text-xs text-stone-300 font-medium mt-0.5">
                  {language === 'mr' ? 'प्रक्षेत्र प्रमाणीकरण' : 'Field Validation'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Nine Specialized Technology Modules */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? '९ तंत्रज्ञान घटक' : 'Nine Technology Components'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                {language === 'mr' ? 'प्रकल्पांतर्गत राबवण्यात आलेले ९ प्रमुख तांत्रिक घटक' : 'Detailed Breakdown of Nine Technology Packages'}
              </h3>
            </div>
            <span className="text-xs font-bold text-stone-500">
              {language === 'mr' ? '५,५५० शेतकऱ्यांचे क्षेत्रीय जाळे' : 'Total 5,550 Participant Network'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmerFirstModules.map((mod, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-emerald-300"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black font-serif text-xs group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      {mod.num}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                      {language === 'mr' ? mod.beneficiariesMr : mod.beneficiaries}
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-serif text-slate-900 leading-snug">
                    {language === 'mr' ? mod.cropMr : mod.cropEn}
                  </h4>

                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                    {language === 'mr' ? mod.descMr : mod.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>RKVY Extension Package</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Tribal Sub-Plan (TSP) & Scheduled Caste Sub-Plan (SCSP) Outreach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-block">
              TSP Program
            </span>
            <h4 className="text-lg font-bold font-serif text-slate-900">
              {language === 'mr' ? 'आदिवासी उपयोजना (TSP) विशेष विस्तार उपक्रम' : 'Tribal Sub-Plan (TSP) Extension Drives'}
            </h4>
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              {language === 'mr'
                ? 'नंदुरबार, धुळे आणि नाशिक या आदिवासीबहुल जिल्ह्यातील दुर्गम पाड्यांवर मोफत सुधारित बियाणे, कुक्कुटपालन पिल्ले, शेळीपालन आणि परसबाग किट्सचे वाटप करून आदिवासी बांधवांची उपजीविका सुधारणे.'
                : 'Targeted distribution of certified seeds, poultry units, goat units, and nutrition kitchen garden kits across tribal hamlets of Nandurbar, Dhule, and Nashik districts.'}
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 inline-block">
              SCSP Program
            </span>
            <h4 className="text-lg font-bold font-serif text-slate-900">
              {language === 'mr' ? 'अनुसूचित जाती उपयोजना (SCSP) शेतकरी सक्षमीकरण' : 'Scheduled Caste Sub-Plan (SCSP) Capacity Building'}
            </h4>
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              {language === 'mr'
                ? 'अनुसूचित जातीतील अल्पभूधारक शेतकऱ्यांसाठी कौशल्य विकास प्रशिक्षण, आधुनिक शेत अवजारे, फवारणी यंत्रे आणि शेतीपूरक व्यवसायांसाठी थेट तांत्रिक सहाय्य.'
                : 'Vocational skill development, battery-operated knapsack sprayers distribution, farm tool kits, and smallholder agricultural mechanization support for Scheduled Caste farming families.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
