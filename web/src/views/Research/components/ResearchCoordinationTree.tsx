'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GitFork,
  ChevronDown,
  Building,
  Microscope,
  MapPin,
  Sprout,
  Layers,
  ArrowDown,
  Info,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const ResearchCoordinationTree: React.FC = () => {
  const { language } = useLanguage();
  const [activeZone, setActiveZone] = useState<string | null>(null);

  // ADR Zonal Stations Data
  const adrZones = [
    {
      id: 'hq',
      titleEn: '1. ADR (Head Quarter)',
      titleMr: '१. सहयोगी संशोधन संचालक (मुख्यालय, राहुरी)',
      color: 'bg-[#ebf7fa] border-[#64b5d6] text-slate-800',
      badgeColor: 'bg-[#d8eff6] text-[#0a4863] border-[#64b5d6]',
      officerEn: 'Dy. Director of Res. - 03',
      officerMr: 'उपसंचालक संशोधन - ०३',
      detailsEn: 'Economics, Animal Science, Agricultural Engineering, Research Editor',
      detailsMr: 'कृषी अर्थशास्त्र, पशुविज्ञान, कृषी अभियांत्रिकी, संशोधन संपादक'
    },
    {
      id: 'ghat',
      titleEn: '2. ADR, Ghat Zone (ZARS, Igatpuri)',
      titleMr: '२. सहयोगी संशोधन संचालक, घाट विभाग (वि.कृ.सं. केंद्र, इगतपुरी)',
      color: 'bg-[#edf5e8] border-[#7fb069] text-slate-800',
      badgeColor: 'bg-[#ddedd5] text-[#245815] border-[#7fb069]',
      officerEn: 'Regional Command Center',
      officerMr: 'विभागीय मुख्य केंद्र',
      detailsEn: 'ARS Lonavala, Mahabaleshwar, Radhanagari',
      detailsMr: 'कृषी संशोधन केंद्रे: लोणावळा, महाबळेश्वर, राधानगरी'
    },
    {
      id: 'sub-montane',
      titleEn: '3. ADR, Sub-Montane Zone (ZARS, Kolhapur)',
      titleMr: '३. सहयोगी संशोधन संचालक, उप-पर्वतीय विभाग (वि.कृ.सं. केंद्र, कोल्हापूर)',
      color: 'bg-[#fbf1e8] border-[#d48b50] text-slate-800',
      badgeColor: 'bg-[#f6dfcc] text-[#78390f] border-[#d48b50]',
      officerEn: 'Regional Command Center',
      officerMr: 'विभागीय मुख्य केंद्र',
      detailsEn: 'RSIRS Kolhapur, Gadhinglaj, Karad, Vadgaon Maval',
      detailsMr: 'वि.ऊस संशोधन केंद्र कोल्हापूर, आजरा/गडहिंग्लज, कराड, वडगाव मावळ'
    },
    {
      id: 'plain',
      titleEn: '4. ADR, Plain Zone (ZARS, Pune)',
      titleMr: '४. सहयोगी संशोधन संचालक, मैदानी विभाग (वि.कृ.सं. केंद्र, पुणे)',
      color: 'bg-[#f5eefb] border-[#9d6ec7] text-slate-800',
      badgeColor: 'bg-[#e8dcf5] text-[#4c1d95] border-[#9d6ec7]',
      officerEn: 'Regional Command Center',
      officerMr: 'विभागीय मुख्य केंद्र',
      detailsEn: 'ARS Kasbe Digraj, Niphad, Pimpalgaon Baswant',
      detailsMr: 'कृषी संशोधन केंद्रे: कसबे डिग्रज, निफाड, पिंपळगाव बसवंत'
    },
    {
      id: 'scarcity',
      titleEn: '5. ADR, Scarcity Zone (ZARS, Solapur)',
      titleMr: '५. सहयोगी संशोधन संचालक, अवर्षण विभाग (वि.कृ.सं. केंद्र, सोलापूर)',
      color: 'bg-[#eaf3fb] border-[#5d9cec] text-slate-800',
      badgeColor: 'bg-[#d2e6f9] text-[#1e3a8a] border-[#5d9cec]',
      officerEn: 'Regional Command Center',
      officerMr: 'विभागीय मुख्य केंद्र',
      detailsEn: 'ARS Mohol, Jeur, Pandharpur, Chas, Padegaon, Savalvihir, Shrirampur, Dhule, Lakhmapur, Jadhavwadi',
      detailsMr: 'कृषी संशोधन केंद्रे: मोहोळ, जेऊर, पंढरपूर, चास, पाडेगाव, सावळीविहीर, श्रीरामपूर, धुळे, लखमापूर, जाधववाडी'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white via-[#fcfbf7] to-white rounded-3xl border-2 border-stone-200/90 shadow-md p-6 sm:p-8 lg:p-10 space-y-8 overflow-hidden relative">

      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Banner */}
      <div className="text-center space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-950 border border-blue-300 text-xs font-bold uppercase tracking-wider">
          <GitFork className="w-3.5 h-3.5 text-blue-700" />
          <span>{language === 'mr' ? 'संशोधन समन्वय कार्यप्रणाली' : 'Research Coordination Mechanism'}</span>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0c3866] font-serif tracking-tight">
          {language === 'mr' ? 'संशोधन प्रशासकीय उतरंड व समन्वय संरचना' : 'Research Coordination Mechanism Flowchart'}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto font-medium">
          {language === 'mr'
            ? 'कुलगुरू आणि संचालक संशोधन यांच्या नेतृत्वाखाली सहयोगी संचालक (ADR) व विशेषज्ज्ञांच्या समन्वयातून योजनांची प्रत्यक्ष अंमलबजावणी.'
            : 'Statutory chain of research governance linking the Vice Chancellor, Director of Research, Associate Directors across 5 zones, and Commodity Specialists.'}
        </p>
      </div>

      {/* 2. Visual Flowchart Tree */}
      <div className="w-full max-w-[1100px] mx-auto relative z-10 flex flex-col items-center">

        {/* Tier 1: Vice Chancellor */}
        <div className="w-full max-w-[340px] flex flex-col items-center">
          <div className="w-full bg-[#0c3866] text-white px-6 py-3.5 rounded-2xl shadow-lg border-2 border-blue-400 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-blue-200">
              {language === 'mr' ? 'सर्वोच्च वैधानिक नेतृत्व' : 'Apex Statutory Authority'}
            </div>
            <div className="text-base sm:text-lg font-black tracking-wide font-serif mt-0.5">
              {language === 'mr' ? 'कुलगुरू' : 'Vice Chancellor'}
            </div>
            <div className="text-[11px] text-blue-100/90 font-medium mt-0.5">
              MPKV Rahuri
            </div>
          </div>

          {/* Stem Line Down to Tier 2 */}
          <div className="w-0.5 h-8 bg-blue-700 relative">
            <div className="absolute -bottom-1 -left-[3px] w-2 h-2 rounded-full bg-blue-800" />
          </div>
        </div>

        {/* Tier 2: Director of Research */}
        <div className="w-full max-w-[380px] flex flex-col items-center">
          <div className="w-full bg-[#0a6659] text-white px-6 py-3.5 rounded-2xl shadow-lg border-2 border-teal-300 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-teal-200">
              {language === 'mr' ? 'संशोधन प्रमुख व समन्वयक' : 'Executive Research Head'}
            </div>
            <div className="text-base sm:text-lg font-black tracking-wide font-serif mt-0.5">
              {language === 'mr' ? 'संचालक संशोधन' : 'Director of Research'}
            </div>
            <div className="text-[11px] text-teal-100/90 font-medium mt-0.5">
              Dr. Prashant S. Bodake
            </div>
          </div>

          {/* Stem Line Down to Fork */}
          <div className="w-0.5 h-8 bg-[#0a6659]" />
        </div>

        {/* Tier 3: Two-Way Branching Fork (Horizontal Bar) */}
        <div className="w-full max-w-[960px] hidden md:block relative">
          {/* Horizontal Split Line */}
          <div className="w-full h-0.5 bg-slate-600 rounded-full" />
          {/* Left Vertical Drop to ADR */}
          <div className="absolute left-[24%] top-0 w-0.5 h-6 bg-slate-600" />
          {/* Right Vertical Drop to Specialists */}
          <div className="absolute right-[24%] top-0 w-0.5 h-6 bg-slate-600" />
        </div>

        {/* Tier 4: The Two Main Columns (ADRs on Left, Specialists on Right) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 pt-4 md:pt-6">

          {/* ============================================================= */}
          {/* LEFT BRANCH: Associate Directors of Research (ADR) (5 Zones)  */}
          {/* ============================================================= */}
          <div className="md:col-span-6 space-y-4 flex flex-col">

            {/* Left Branch Header Box */}
            <div className="w-full bg-[#dff1fa] text-[#0a4863] border-2 border-[#54a4c7] p-3.5 rounded-2xl text-center shadow-xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-800 block">
                Zonal Regional Leadership
              </span>
              <h4 className="text-sm sm:text-base font-bold font-serif">
                {language === 'mr' ? 'सहयोगी संशोधन संचालक (ADR)' : 'Associate Directors of Research (ADR)'}
              </h4>
            </div>

            {/* Stack of 5 ADR Regional Nodes */}
            <div className="space-y-3 flex-1 flex flex-col justify-between">
              {adrZones.map((zone, idx) => (
                <div
                  key={zone.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 ${zone.color} shadow-xs hover:shadow-md transition-all duration-200 relative group`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                      {language === 'mr' ? zone.titleMr : zone.titleEn}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border shrink-0 ${zone.badgeColor}`}>
                      {language === 'mr' ? zone.officerMr : zone.officerEn}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-stone-700 mt-1.5 font-medium leading-relaxed">
                    {language === 'mr' ? zone.detailsMr : zone.detailsEn}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* ============================================================= */}
          {/* RIGHT BRANCH: Specialists, Faculty Heads & Research Schemes  */}
          {/* ============================================================= */}
          <div className="md:col-span-6 space-y-4 flex flex-col justify-between">

            {/* Right Branch Header Box */}
            <div className="w-full bg-[#fef4de] text-[#7d5012] border-2 border-[#d9a443] p-3.5 rounded-2xl text-center shadow-xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">
                Commodity & Disciplinary Experts
              </span>
              <h4 className="text-sm sm:text-base font-bold font-serif">
                {language === 'mr' ? 'प्रमुख पीक विशेषज्ज्ञ' : 'Specialists & Commodity Leads'}
              </h4>
            </div>

            {/* Specialists Grid Card (Wheat, Oilseeds, Sugarcane, Soil) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#fffcf3] border-2 border-[#e0b768] shadow-xs space-y-3">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-amber-200 pb-2">
                <Sprout className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'mr' ? 'प्रमुख पीक संशोधन केंद्रे व विशेषज्ज्ञ' : 'Specialized Crop Research Centers'}</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-800 font-semibold">
                <div className="p-2.5 rounded-xl bg-white border border-amber-200 shadow-2xs">
                  <div className="text-[10px] text-amber-700 uppercase font-bold">{language === 'mr' ? 'गहू विशेषज्ज्ञ' : 'Wheat Specialist'}</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{language === 'mr' ? 'निफाड' : 'Niphad'}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200 shadow-2xs">
                  <div className="text-[10px] text-amber-700 uppercase font-bold">{language === 'mr' ? 'गळीतधान्य विशेषज्ज्ञ' : 'Oilseeds Specialist'}</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{language === 'mr' ? 'जळगाव' : 'Jalgaon'}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200 shadow-2xs">
                  <div className="text-[10px] text-amber-700 uppercase font-bold">{language === 'mr' ? 'ऊस विशेषज्ज्ञ' : 'Sugarcane Specialist'}</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{language === 'mr' ? 'पाडेगाव' : 'Padegaon'}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200 shadow-2xs">
                  <div className="text-[10px] text-amber-700 uppercase font-bold">{language === 'mr' ? 'मृदा विशेषज्ज्ञ' : 'Soil Specialist'}</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{language === 'mr' ? 'सोलापूर' : 'Solapur'}</div>
                </div>
              </div>
            </div>

            {/* Connecting Stem Line */}
            <div className="w-full flex justify-center py-0.5">
              <div className="w-0.5 h-5 bg-blue-400" />
            </div>

            {/* Heads of Departments & Principal Investigators (PIs) Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#f4f9ff] border-2 border-[#89bde6] shadow-xs space-y-3">
              <div className="bg-[#e2edfa] text-[#1b4b7a] font-bold px-3 py-1.5 rounded-xl border border-[#6ba4d8] text-center text-xs sm:text-sm">
                {language === 'mr' ? 'विभाग प्रमुख व प्रकल्प समन्वयक' : 'Heads of Depts and PIs'}
              </div>

              <div className="space-y-2 text-xs text-slate-800 font-semibold">
                <div className="p-2.5 rounded-xl bg-white border border-blue-200 flex items-center justify-between">
                  <span>{language === 'mr' ? '१. कृषी विद्याशाखा' : '1. Faculty of Agriculture'}</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-900">
                    {language === 'mr' ? 'शैक्षणिक प्रमुख' : 'Academic Lead'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-blue-200 flex items-center justify-between">
                  <span>{language === 'mr' ? '२. कृषी अभियांत्रिकी विद्याशाखा' : '2. Faculty of Agril. Engineering'}</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-900">
                    {language === 'mr' ? 'तांत्रिक प्रमुख' : 'Technology Lead'}
                  </span>
                </div>
              </div>
            </div>

            {/* Connecting Stem Line */}
            <div className="w-full flex justify-center py-0.5">
              <div className="w-0.5 h-5 bg-rose-400" />
            </div>

            {/* Research Schemes / Projects Destination Node (Verbatim from Chart) */}
            <div className="w-full bg-[#faeaf0] text-[#78183c] border-2 border-[#d4658c] p-4 rounded-2xl text-center shadow-sm space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-800 block">
                Execution Matrix
              </span>
              <h4 className="text-base sm:text-lg font-black font-serif text-[#78183c]">
                {language === 'mr' ? 'संशोधन योजना व प्रकल्प' : 'Research Schemes / Projects'}
              </h4>
              <p className="text-[11px] text-rose-950/80 font-medium">
                {language === 'mr'
                  ? '८२ राज्य शासन योजनेतर योजना, ४५ ICAR-AICRP प्रकल्प व केंद्र पुरस्कृत योजना'
                  : '82 State Non-Plan Schemes, 45 ICAR-AICRP Projects & External Grants'}
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Horizontal Convergence Line (from Left ADR and Right Schemes) */}
        <div className="w-full mt-6 p-4 rounded-2xl bg-stone-100 border border-stone-200 text-center">
          <p className="text-xs text-stone-600 font-medium leading-relaxed">
            {language === 'mr'
              ? 'टीप: विभागीय सहयोगी संचालक (ADRs), पीक विशेषज्ज्ञ आणि विभाग प्रमुख यांच्या संयुक्त सहभागातून सर्व संशोधन योजना व क्षेत्रीय प्रयोगांची अंमलबजावणी केली जाते.'
              : 'Note: Research schemes and multi-location field trials are cooperatively executed through the joint oversight of Associate Directors (ADRs), Commodity Specialists, and Department Heads.'}
          </p>
        </div>

      </div>

    </div>
  );
};
