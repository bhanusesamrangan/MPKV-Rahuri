'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Target,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building2,
  HelpCircle,
  Radio,
  BookOpen,
  Sprout,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Compass,
  Layers,
  Award,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ExtensionBreadcrumb } from './components/ExtensionBreadcrumb';
import { ExtensionHero } from './components/ExtensionHero';
import { ExtensionSubmenuNav } from './components/ExtensionSubmenuNav';

interface ExtensionAtAGlanceViewProps {
  pageData?: any;
}

export const ExtensionAtAGlanceView: React.FC<ExtensionAtAGlanceViewProps> = () => {
  const { language } = useLanguage();

  const statutoryObjectives = [
    {
      num: '01',
      titleEn: 'Initiate, Plan & Implement Extension Programmes',
      titleMr: 'विस्तार शिक्षण कार्यक्रमांची आखणी व अंमलबजावणी',
      descEn: 'To initiate, plan, organize and implement all extension education programmes and field activities under University jurisdiction across 10 districts.',
      descMr: 'विद्यापीठाच्या कार्यक्षेत्रातील १० जिल्ह्यांमध्ये सर्व विस्तार शिक्षण कार्यक्रम व उपक्रमांची आखणी, नियोजन व प्रभावी अंमलबजावणी करणे.'
    },
    {
      num: '02',
      titleEn: 'Farm Information & Technology Transfer Services',
      titleMr: 'कृषी माहिती व तंत्रज्ञान प्रसार सेवा',
      descEn: 'To provide farm information services through electronic media, community radio (CRS 90.8 FM), print bulletins, field demonstrations, and exhibitions.',
      descMr: 'इलेक्ट्रॉनिक माध्यमे, विद्यापीठ वाहिनी ९०.८ एफएम, विस्तार प्रकाशने, शेतकरी मेळावे व प्रदर्शनांद्वारे अद्ययावत कृषी माहिती पुरवणे.'
    },
    {
      num: '03',
      titleEn: 'Diagnostic Problem-Solving & Research Feedback',
      titleMr: 'क्षेत्रीय समस्या निवारण व संशोधन समन्वय',
      descEn: 'To solve local farming problems on-site in the light of research findings and channel field feedback to university scientists for strengthening research.',
      descMr: 'शेतकऱ्यांच्या स्थानिक क्षेत्रीय समस्यांचे संशोधनाच्या आधारे जागेवरच निवारण करणे आणि संशोधनाला गती देण्यासाठी शेतकऱ्यांचे अभिप्राय शास्त्रज्ञांपर्यंत पोहोचवणे.'
    },
    {
      num: '04',
      titleEn: 'Short & Long Duration Capacity Building Trainings',
      titleMr: 'अल्प व दीर्घ मुदतीचे शेतकरी प्रशिक्षण वर्ग',
      descEn: 'To conduct short and long duration residential and off-campus trainings for farmers, farm women, rural youth, and extension functionaries across agro-eco-situations.',
      descMr: 'विविध कृषी-हवामान परिस्थितीनुसार शेतकरी, शेतमजूर महिला, ग्रामीण युवक व विस्तार अधिकारी यांच्यासाठी अल्प व दीर्घ मुदतीचे गुणवत्तापूर्ण प्रशिक्षण आयोजित करणे.'
    },
    {
      num: '05',
      titleEn: 'Frontline Demonstrations & Technology Assessment',
      titleMr: 'प्रथम फळी प्रात्यक्षिके (FLDs) व तंत्रज्ञान प्रमाणीकरण',
      descEn: 'To assess and refine the latest agricultural technologies through Front Line Demonstrations (FLDs) and On-Farm Trials (OFTs) for wider adoption by line agencies.',
      descMr: 'नवीन कृषी तंत्रज्ञानाचे प्रथम फळी प्रात्यक्षिके (FLDs) व प्रक्षेत्र चाचण्यांद्वारे मूल्यमापन करून शासकीय यंत्रणांमार्फत व्यापक प्रसार करणे.'
    }
  ];

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-slate-800">
      <ExtensionBreadcrumb currentPageTitle={{ en: 'Extension at a Glance', mr: 'दृष्टीक्षेपात विस्तार शिक्षण' }} />

      <ExtensionHero
        theme="glance"
        badge={{ en: 'Directorate of Extension Education', mr: 'विस्तार शिक्षण संचालनालय' }}
        title={{
          en: 'Extension Education at a Glance',
          mr: 'दृष्टीक्षेपात विस्तार शिक्षण'
        }}
        subtitle={{
          en: 'Pioneering rural agrarian transformation, grassroots technology transfer, and farmer empowerment since 1981 across Western Maharashtra.',
          mr: '१९८१ पासून पश्चिम महाराष्ट्रातील शेतकरी सक्षमीकरण, तंत्रज्ञान प्रसार आणि ग्रामीण परिवर्तनाचे अग्रगण्य केंद्र.'
        }}
        quickChips={[
          { label: language === 'mr' ? 'स्थापना: १९८१' : 'Established: 1981', icon: Calendar },
          { label: language === 'mr' ? '१७ कृषी विज्ञान केंद्रे' : '17 KVK Network', icon: Building2 },
          { label: language === 'mr' ? '१ अ‍ॅटिक एक खिडकी' : '1 ATIC Single Window', icon: HelpCircle },
          { label: language === 'mr' ? '९०.८ एफएम वाहिनी' : 'CRS 90.8 FM Radio', icon: Radio }
        ]}
      />

      <ExtensionSubmenuNav activeKey="at-a-glance" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">

        {/* 1. Director's Executive Card & Mandate Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Official Leadership Portrait Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 via-stone-850 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-900/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'विस्तार शिक्षण नेतृत्व' : 'Extension Directorate Leadership'}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-md shrink-0 bg-stone-800">
                  <img
                    src="/media/images/extension/Dr_GK_Sasane.jpg"
                    alt="Dr. G. K. Sasane"
                    className="w-full h-full object-cover"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = '/media/images/mpkv_icon.png';
                    }}
                  />
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-black font-serif text-white">
                    {language === 'mr' ? 'डॉ. गोरक्ष ससाणे' : 'Dr. G. K. Sasane'}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-300 font-bold">
                    {language === 'mr'
                      ? 'संचालक, विस्‍तार शिक्षण (अतिरिक्त पदभार)'
                      : 'Director of Extension Education (Additional Charge)'}
                  </p>
                  <p className="text-xs text-stone-300 font-medium">
                    MPKV, Rahuri Dist. Ahmednagar - 413 722
                  </p>
                </div>
              </div>

              {/* Direct Hotlines */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-medium">
                <div className="flex items-center gap-2.5 text-stone-300">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>02426 243230</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-300">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href="mailto:deempkv@rediffmail.com" className="hover:text-emerald-300 transition-colors">
                    deempkv@rediffmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-stone-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Directorate of Extension Education, Rahuri, Maharashtra</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-6 mt-6 border-t border-white/10 relative z-10 flex items-center justify-between">
              <span className="text-[11px] text-stone-400 uppercase tracking-wider font-bold">
                {language === 'mr' ? 'सक्रिय विस्तार जाळे' : 'Outreach Network'}
              </span>
              <Link
                href="/extension/profile"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition-transform hover:scale-105"
              >
                <span>{language === 'mr' ? 'संस्थात्मक संरचना' : 'Org Structure'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Historical Genesis & Narrative */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? 'स्थापना व पार्श्वभूमी' : 'Genesis & Mandate Since 1981'}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 leading-snug">
                {language === 'mr'
                  ? 'शेतकरी, शास्त्रज्ञ आणि ग्रामीण विकासाचा भक्कम सेतू'
                  : 'Bridging Agricultural Science, Grassroots Farmers & Rural Transformation'}
              </h3>

              <div className="space-y-3 text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                <p>
                  {language === 'mr'
                    ? 'महात्मा फुले कृषी विद्यापीठाने स्थापनेपासूनच ग्रामीण विकास आणि शेतकऱ्यांपर्यंत नवीन कृषी तंत्रज्ञानाचा प्रसार करण्यात महत्त्वपूर्ण योगदान दिले आहे. विस्तार शिक्षण हा विद्यापीठाचा सर्वोच्च वैधानिक जनादेश आहे. संशोधनाचे निष्कर्ष प्रत्यक्षात शेतकऱ्यांच्या शेतावर पोहोचवण्यासाठी १९८१ मध्ये स्वतंत्र विस्तार शिक्षण संचालनालयाची स्थापना करण्यात आली.'
                    : 'MPKV has pioneered rural development and extension of modern agricultural technologies to the farming community since its inception. Extension education is one of the pivotal statutory mandates of the University. The Directorate of Extension Education was formally instituted in 1981 for the systematic planning and execution of extension programmes based on verified research findings.'}
                </p>
                <p>
                  {language === 'mr'
                    ? 'संचालनालय महाराष्ट्र शासनाचा कृषी विभाग, जिल्हा परिषद, नाबार्ड, आत्मा (ATMA), आणि विविध अशासकीय संस्थांच्या (NGOs) समन्वयाने काम करते. विद्यापीठाने विकसित केलेल्या नवीन वाण, सुधारित पीक उत्पादन पद्धती, सेंद्रिय शेती, कीड-रोग नियंत्रण आणि जलव्यवस्थापनाचे निष्कर्ष क्षेत्रीय स्तरावर पोहोचवण्याचे कार्य सातत्याने केले जाते.'
                    : 'The Directorate supervises, coordinates, and executes all extension education activities in close consultation with the State Department of Agriculture, Zilla Parishads, ATMA, and ICAR. It channels verified research breakthroughs directly to farm holdings through front line demonstrations, field days, agro-exhibitions, and diagnostic mobile clinics.'}
                </p>
              </div>
            </div>

            {/* Core Units Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-100">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-800 font-serif">17</div>
                <div className="text-[11px] font-bold text-stone-600 mt-0.5">
                  {language === 'mr' ? 'कृषि विज्ञान केंद्रे' : 'KVK Centers'}
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
                <div className="text-xl sm:text-2xl font-black text-cyan-800 font-serif">01</div>
                <div className="text-[11px] font-bold text-stone-600 mt-0.5">
                  {language === 'mr' ? 'अ‍ॅटिक (एक खिडकी)' : 'ATIC Center'}
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
                <div className="text-xl sm:text-2xl font-black text-amber-800 font-serif">04</div>
                <div className="text-[11px] font-bold text-stone-600 mt-0.5">
                  {language === 'mr' ? 'विभागीय केंद्रे' : 'Regional Centers'}
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-center">
                <div className="text-xl sm:text-2xl font-black text-purple-800 font-serif">05</div>
                <div className="text-[11px] font-bold text-stone-600 mt-0.5">
                  {language === 'mr' ? 'जिल्हा केंद्रे' : 'District Centers'}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Statutory Objectives (1981 Mandate) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Target className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? 'वैधानिक उद्दिष्टे' : 'Mandated Statutory Objectives'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                {language === 'mr' ? 'विस्तार शिक्षण संचालनालयाची ५ मुख्य उद्दिष्टे' : '5 Core Statutory Objectives of the Directorate'}
              </h3>
            </div>
            <span className="text-xs font-bold text-stone-500">
              {language === 'mr' ? '१९८१ अधिनियमातील वैधानिक कर्तव्ये' : 'Statutory Mandate established 1981'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {statutoryObjectives.map((obj, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black font-serif text-sm group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      {obj.num}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>

                  <h4 className="text-base font-bold text-slate-900 font-serif leading-snug">
                    {language === 'mr' ? obj.titleMr : obj.titleEn}
                  </h4>

                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                    {language === 'mr' ? obj.descMr : obj.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>MPKV Extension Mandate</span>
                </div>
              </div>
            ))}

            {/* 6th Card: Kisan Helpline Hotline Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-stone-950 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center font-bold">
                  <Phone className="w-5 h-5 text-stone-950" />
                </div>
                <h4 className="text-base sm:text-lg font-black font-serif leading-snug">
                  {language === 'mr' ? 'थेट शेतकरी संपर्क हेल्पलाईन' : 'Direct Kisan Agro-Advisory Helpline'}
                </h4>
                <p className="text-xs text-stone-900 leading-relaxed font-medium">
                  {language === 'mr'
                    ? 'पीक समस्या, हवामान सल्ला, बियाणे उपलब्धता व रोग नियंत्रणासाठी टोल-फ्री क्रमांकावर थेट संपर्क साधा.'
                    : 'Call toll-free for immediate agricultural guidance on crop pest management, seeds, weather, and technology.'}
                </p>
                <div className="text-xl sm:text-2xl font-black font-serif tracking-tight pt-1">
                  1800 233 3235 / 02426-243861
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between text-xs font-bold">
                <span>{language === 'mr' ? 'सकाळी ९ ते सायं. ५' : 'Mon - Sat (9 AM - 5 PM)'}</span>
                <Link
                  href="/atic-rahuri"
                  className="px-3 py-1 bg-stone-950 text-white rounded-lg text-[11px] hover:bg-stone-800 transition-colors"
                >
                  {language === 'mr' ? 'अ‍ॅटिक सेवा' : 'ATIC Info'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Operational Delivery Network Cards */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? 'विस्तार कार्यप्रणाली' : 'Extension Delivery Infrastructure'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                {language === 'mr' ? '४ स्तंभांवर आधारित विस्तार सेवा जाळे' : 'Four Core Pillars of Field Technology Delivery'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 hover:border-emerald-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 font-serif text-base">
                {language === 'mr' ? '१७ कृषी विज्ञान केंद्रे' : '17 Krishi Vigyan Kendras'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'धुळे, मोहोळ, जळगाव, नंदुरबारसह १० जिल्ह्यांतील १७ केव्हीके नेटवर्कद्वारे प्रत्यक्ष प्रक्षेत्र चाचण्या व प्रात्यक्षिके.'
                  : 'Grassroots technology assessment, on-farm trials (OFTs), and frontline demonstrations across 10 western districts.'}
              </p>
              <Link
                href="/extension/krishi-vigyan-kendras"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 pt-2"
              >
                <span>{language === 'mr' ? 'सर्व १७ केंद्रे पहा' : 'View All 17 KVKs'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 hover:border-cyan-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-800 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 font-serif text-base">
                {language === 'mr' ? 'अ‍ॅटिक (एक खिडकी)' : 'ATIC (Single Window)'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'शेतकऱ्यांसाठी एकाच छताखाली बियाणे, कलमे, रोपे, माती परीक्षण, पीक औषधालय व तांत्रिक सल्ला सेवा.'
                  : 'Single-window delivery of authentic certified seeds, saplings, plant pathology diagnostics, and agro-inputs.'}
              </p>
              <Link
                href="/atic-rahuri"
                className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-900 pt-2"
              >
                <span>{language === 'mr' ? 'अ‍ॅटिक सुविधा' : 'Explore ATIC'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 hover:border-rose-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 font-serif text-base">
                {language === 'mr' ? '९०.८ एफएम वाहिनी व संप्रेषण' : 'Radio 90.8 FM & Media'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'विद्यापीठ वाहिनी ९०.८ एफएम, कृषीदूत, दृकश्राव्य दालन आणि मोबाईल प्रदर्शनी वाहनांद्वारे माहितीचा जलद प्रसार.'
                  : 'Vidyapeeth Vahini Community Radio CRS 90.8 FM, audio-visual documentaries, exhibitions, and digital outreach.'}
              </p>
              <Link
                href="/communication-centre"
                className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 pt-2"
              >
                <span>{language === 'mr' ? 'वाहिनी माहिती' : 'Radio Details'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 hover:border-amber-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 font-serif text-base">
                {language === 'mr' ? 'श्री सुगी व मासिक ई-वार्ता' : 'Shree Sugi & E-Varta'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'त्रैमासिक "श्री सुगी", वार्षिक "कृषिदर्शनी" डायरी आणि डिजिटल "मफुकृवि ई-वार्ता" मासिकांद्वारे मार्गदर्शन.'
                  : 'Quarterly Shree Sugi farm magazine, annual Krishidarshani agricultural diary, and monthly digital E-Varta issues.'}
              </p>
              <Link
                href="/extension/publications"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 pt-2"
              >
                <span>{language === 'mr' ? 'प्रकाशने लायब्ररी' : 'Browse Publications'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
