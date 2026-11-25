'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Users,
  Layers,
  ArrowRight,
  Sparkles,
  Award,
  Sprout,
  Compass,
  FileCheck2,
  CheckCircle2,
  FolderTree
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

interface ResearchOrganizationalProfileViewProps {
  pageData?: any;
}

export const ResearchOrganizationalProfileView: React.FC<ResearchOrganizationalProfileViewProps> = ({ pageData }) => {
  const { language } = useLanguage();

  const leadership = {
    name: { en: 'Dr. S. B. Kharbade', mr: 'डॉ. एस. बी. खराबाडे' },
    role: { en: 'Director of Research', mr: 'संचालक संशोधन' },
    cadre: { en: 'Chief Research Executive & Member Secretary', mr: 'मुख्य संशोधन प्रमुख व सदस्य सचिव' },
    address: {
      en: 'Directorate of Research, Central Campus, MPKV, Rahuri - 413722, Dist. Ahmednagar (MS)',
      mr: 'संशोधन संचालनालय, मध्यवर्ती परिसर, म.फु.कृ.वि., राहुरी - ४१३७२२, जि. अहमदनगर (महाराष्ट्र)'
    },
    phone: '02426-243223 / 243208',
    email: 'dr.mpkv@gov.in',
    officeHours: { en: 'Mon - Sat: 9:45 AM - 6:15 PM', mr: 'सोम - शनि: सकाळी ९:४५ ते सायं ६:१५' },
    messageEn: 'The Directorate of Research is committed to transforming lab-proven agricultural science into actionable, high-yield field realities. By coordinating 27 research stations across 5 diverse agro-climatic zones, our focus remains firmly on climate-resilient crop varieties, precision water governance, and cutting-edge biotechnology for the agrarian community of Western Maharashtra.',
    messageMr: 'संशोधन संचालनालय प्रयोगशाळेतील आधुनिक कृषी तंत्रज्ञान थेट शेतकऱ्यांच्या बांधापर्यंत पोहोचवण्यासाठी कटिबद्ध आहे. पश्चिम महाराष्ट्रातील ५ विविध हवामान विभागांतील २७ संशोधन केंद्रांच्या समन्वयातून हवामान-अनुकूल वाण, सूक्ष्म सिंचन, जैविक कीड नियंत्रण आणि उच्च उत्पादनक्षम शेती पद्धतींची निर्मिती हे आमचे सर्वोच्च ध्येय आहे.'
  };

  const functionalWings = [
    {
      titleEn: '1. Crop Improvement & Molecular Breeding',
      titleMr: '१. पीक सुधारणा व रेण्वीय पैदास विभाग',
      icon: Sprout,
      color: 'bg-emerald-50 text-emerald-950 border-emerald-300',
      descEn: 'Breeding high-yielding, biotic/abiotic stress-tolerant varieties of cereals, pulses, oilseeds, sugarcane, cotton, and vegetables through conventional and genomics-assisted methods.',
      descMr: 'तृणधान्ये, कडधान्ये, गळीतधान्ये, ऊस, कापूस व भाजीपाल्याचे रोगप्रतिकारक्षम व अधिक उत्पादन देणारे वाण विकसित करणे.'
    },
    {
      titleEn: '2. Natural Resource Management & Water Technology',
      titleMr: '२. नैसर्गिक साधनसंपत्ती व जल तंत्रज्ञान विभाग',
      icon: Compass,
      color: 'bg-blue-50 text-blue-950 border-blue-300',
      descEn: 'Dryland farming technology, watershed management, soil health conservation, micro-irrigation scheduling, and agro-meteorological advisories.',
      descMr: 'कोरडवाहू शेती तंत्रज्ञान, पाणलोट क्षेत्र विकास, मृदा आरोग्य संवर्धन, ठिबक व तुषार सिंचन व्यवस्थापन आणि हवामान सल्ला.'
    },
    {
      titleEn: '3. Crop Protection & Biological Control',
      titleMr: '३. पीक संरक्षण व जैविक कीड नियंत्रण विभाग',
      icon: ShieldCheck,
      color: 'bg-amber-50 text-amber-950 border-amber-300',
      descEn: 'Integrated Pest Management (IPM), Integrated Disease Management (IDM), biocontrol agents production, pesticide residue monitoring, and mushroom cultivation.',
      descMr: 'एकात्मिक कीड व रोग व्यवस्थापन, जैविक कीड नियंत्रक घटकांची निर्मिती, कीटकनाशक अवशेष तपासणी व अळंबी उत्पादन तंत्रज्ञान.'
    },
    {
      titleEn: '4. Farm Machinery, Post-Harvest & Processing',
      titleMr: '४. शेती अवजारे, काढणीपश्चात तंत्रज्ञान व प्रक्रिया',
      icon: Layers,
      color: 'bg-purple-50 text-purple-950 border-purple-300',
      descEn: 'Design and commercialization of tractor/power-operated implements, post-harvest storage, minimal processing of fruits/vegetables, and renewable energy.',
      descMr: 'ट्रॅक्टर व स्वयंचलित शेती अवजारांची निर्मिती, काढणीपश्चात साठवणूक, मूल्यवर्धन, प्रक्रिया तंत्रज्ञान व सौर/बायोमास ऊर्जा.'
    }
  ];

  const hierarchyLevels = [
    {
      level: 'Apex Authority / सर्वोच्च नेतृत्व',
      titleEn: 'Vice-Chancellor, MPKV Rahuri',
      titleMr: 'कुलगुरू, म.फु.कृ.वि. राहुरी',
      descEn: 'Overall statutory and executive leadership of university research policies and Agricultural Research Council.',
      descMr: 'विद्यापीठाच्या संशोधन धोरणांचे व कृषी संशोधन परिषदेचे सर्वोच्च वैधानिक नेतृत्व.'
    },
    {
      level: 'Directorate Executive / संशोधन संचालक',
      titleEn: 'Director of Research',
      titleMr: 'संचालक संशोधन',
      descEn: 'Planning, monitoring, budgeting, and statutory execution of 27 stations, 45 AICRPs, and 82 State schemes.',
      descMr: '२७ संशोधन केंद्रे, ४५ AICRP आणि ८२ राज्य शासन योजनांचे नियोजन, अर्थसंकल्प व प्रत्यक्ष अंमलबजावणी.'
    },
    {
      level: 'Zonal Research Leadership / विभागीय संशोधन संचालक',
      titleEn: 'Associate Directors of Research (ZARS)',
      titleMr: 'सहयोगी संशोधन संचालक (विभागीय कृषी संशोधन केंद्रे)',
      descEn: 'Zonal command across Western Ghat, Sub-Montane, Plain, Scarcity, and Central Plateau agro-climatic zones.',
      descMr: 'कोल्हापूर, सोलापूर, इगतपुरी, गणेशखिंड (पुणे) व राहुरी येथील ५ विभागीय कृषी संशोधन केंद्रांचे नेतृत्व.'
    },
    {
      level: 'Commodity Specialists / पीक विशेषज्ज्ञ व प्रकल्प प्रमुख',
      titleEn: 'Chief Crop Specialists & Scheme In-Charges',
      titleMr: 'प्रमुख पीक विशेषज्ज्ञ व योजना प्रमुख',
      descEn: 'Specialized crop stations: Wheat (Niphad), Sugarcane (Padegaon), Oilseeds (Jalgaon), Cotton (Rahuri), Pulses (Rahuri), Dryland (Solapur).',
      descMr: 'ऊस (पाडेगाव), गहू (निफाड), गळीतधान्ये (जळगाव), कापूस (राहुरी), कडधान्ये (राहुरी), कोरडवाहू शेती (सोलापूर).'
    },
    {
      level: 'Scientific Field Force / संशोधन शास्त्रज्ञ वृंद',
      titleEn: 'Senior Research Scientists, Agronomists & Pathologists',
      titleMr: 'वरिष्ठ शास्त्रज्ञ, कृषिविद्यावेत्ते व कीटकशास्त्रज्ञ',
      descEn: 'Executing field trials, multi-location varietal testing, AICRP technical programs, and farmer demonstrations.',
      descMr: 'क्षेत्रीय प्रयोग, बहुस्थानीय चाचण्या, प्रयोगशाळा विश्लेषण व तंत्रज्ञान शिफारशींचे प्रत्यक्ष काम.'
    }
  ];

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: 'Organizational Profile', mr: 'संस्थात्मक संरचना' }} />

      <ResearchHero
        theme="profile"
        badge={{ en: 'Administrative & Governance Architecture', mr: 'प्रशासकीय व संस्थात्मक रचना' }}
        title={{
          en: 'Directorate of Research — Organizational Profile',
          mr: 'संशोधन संचालनालय — संस्थात्मक संरचना व कार्यप्रणाली'
        }}
        subtitle={{
          en: 'Statutory hierarchy, executive leadership, functional divisions, and collaborative chains governing 27 research stations and multi-disciplinary scientists across Western Maharashtra.',
          mr: 'पश्चिम महाराष्ट्रातील २७ संशोधन केंद्रे व बहुविद्याशाखीय शास्त्रज्ञांचे वैधानिक नेतृत्व, विभागीय रचना आणि संशोधन प्रशासकीय साचा.'
        }}
        quickChips={[
          { label: language === 'mr' ? 'संचालक संशोधन कार्यालय' : 'Director of Research Office', icon: Building },
          { label: language === 'mr' ? '४ मुख्य संशोधन शाखा' : '4 Functional Wings', icon: Layers },
          { label: language === 'mr' ? '५ विभागीय सहयोगी संचालक' : '5 ZARS Associate Directors', icon: Users },
          { label: language === 'mr' ? 'महाराष्ट्र कृषी विद्यापीठे परिनियम' : 'MAU Statutes 1990', icon: ShieldCheck }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 space-y-12">

        {/* 1. Director of Research Executive Profile Card */}
        <section className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Officer Credential Container */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4 border-b lg:border-b-0 lg:border-r border-stone-200/80 pb-6 lg:pb-0 lg:pr-8">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-blue-900 to-indigo-800 p-1 shadow-lg flex items-center justify-center text-white">
                <Building className="w-14 h-14 text-amber-300" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-300">
                  {language === 'mr' ? leadership.role.mr : leadership.role.en}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1.5 font-serif">
                  {language === 'mr' ? leadership.name.mr : leadership.name.en}
                </h2>
                <p className="text-xs text-stone-500 font-semibold mt-0.5">
                  {language === 'mr' ? leadership.cadre.mr : leadership.cadre.en}
                </p>
              </div>

              <div className="space-y-2 text-xs text-stone-700 font-medium w-full pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span>{leadership.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <a href={`mailto:${leadership.email}`} className="text-blue-800 hover:underline">
                    {leadership.email}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                  <span className="text-stone-600">
                    {language === 'mr' ? leadership.address.mr : leadership.address.en}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Executive Vision & Directorate Mandate */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'mr' ? 'संशोधन संचालकांचे मनोगत' : 'Director’s Desk & Strategic Mandate'}</span>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif italic border-l-4 border-blue-700 pl-4 bg-stone-50/60 py-3 rounded-r-2xl">
                “{language === 'mr' ? leadership.messageMr : leadership.messageEn}”
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200">
                  <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-700" />
                    <span>{language === 'mr' ? 'वैधानिक जबाबदारी' : 'Statutory Jurisdiction'}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {language === 'mr'
                      ? 'महाराष्ट्र कृषी विद्यापीठे परिनियम १९९० मधील नियम १४(१) अंतर्गत कृषी संशोधन परिषदेचे सदस्य सचिव म्हणून कार्य.'
                      : 'Functions as Member Secretary of the Agricultural Research Council under Statute 14(1) of MAU Act 1990.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'mr' ? 'योजना समन्वय' : 'Scheme Supervision'}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {language === 'mr'
                      ? '८२ राज्य योजनेतर, ४५ अखिल भारतीय समन्वित प्रकल्प (AICRP) आणि बाह्य अनुदानित प्रकल्पांचे थेट संचलन.'
                      : 'Complete oversight of 82 non-plan state schemes, 45 ICAR-AICRP projects, and ad-hoc funded research.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. Interactive Administrative Governance Tree */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-300 text-xs font-bold uppercase tracking-wider mb-1">
                <FolderTree className="w-3.5 h-3.5 text-blue-700" />
                <span>{language === 'mr' ? 'प्रशासकीय उतरंड' : 'Administrative Flow'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'mr' ? 'संशोधन संचालनालयाची वैधानिक उतरंड' : 'Hierarchical Governance & Decision Chain'}
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {hierarchyLevels.map((lvl, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-blue-900 text-amber-300 font-bold flex items-center justify-center shrink-0 text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                      {lvl.level}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                      {language === 'mr' ? lvl.titleMr : lvl.titleEn}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-stone-600 mt-0.5 leading-relaxed font-medium">
                      {language === 'mr' ? lvl.descMr : lvl.descEn}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-end md:self-center">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 border border-stone-200">
                    Tier {idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Four Core Functional Research Wings */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-purple-950 border border-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5 text-purple-700" />
              <span>{language === 'mr' ? '४ मुख्य संशोधन शाखा' : '4 Functional Wings'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === 'mr' ? 'संशोधन शाखा व कार्यक्षेत्र' : 'Core Disciplines of Agrarian Research'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {functionalWings.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl ${w.color} border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/90 border border-stone-300/80 flex items-center justify-center text-slate-900 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-950 font-serif">
                      {language === 'mr' ? w.titleMr : w.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                      {language === 'mr' ? w.descMr : w.descEn}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>{language === 'mr' ? 'कार्यक्षेत्र' : 'Mandate'}</span>
                    <span className="text-[11px] font-semibold text-stone-600">
                      MPKV Research Directorate
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
