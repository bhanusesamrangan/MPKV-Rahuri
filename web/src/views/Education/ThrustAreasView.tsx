'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Globe,
  Laptop,
  Briefcase,
  Sprout,
  HeartHandshake,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Printer
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { printElement } from '@/utils/printElement';
import { EducationBreadcrumb } from './components/EducationBreadcrumb';
import { EducationHero } from './components/EducationHero';

interface ThrustAreasViewProps {
  pageData: any;
}

export const ThrustAreasView: React.FC<ThrustAreasViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();

  const breadcrumbItems = pageData?.breadcrumb || [
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Overview & Profile', mr: 'संस्थेची माहिती व रूपरेषा' }, href: '/education/at-a-glance' },
    { title: { en: 'Thrust Areas', mr: 'शैक्षणिक प्राधान्यक्रम' } }
  ];

  const heroTitle = pageData?.hero?.title || {
    en: 'Strategic Educational Thrust Areas & Priorities',
    mr: 'उच्च कृषि शिक्षणातील धोरणात्मक प्राधान्यक्रम'
  };
  const heroSubtitle = pageData?.hero?.subtitle || {
    en: 'Core strategic pillars driving quality, global competence, digital education, and entrepreneurship across all MPKV colleges.',
    mr: 'गुणवत्ता, जागतिक स्पर्धाक्षमता, डिजिटल शिक्षण आणि कृषोद्योजकतेला गती देणारे विद्यापीठाचे मुख्य प्राधान्यक्रम.'
  };
  const heroBadge = pageData?.hero?.badge || {
    en: '16 Key Strategic Pillars for Quality Agriculture Education',
    mr: 'गुणवत्तापूर्ण कृषि शिक्षणासाठी १६ मुख्य प्राधान्य क्षेत्रे'
  };

  const pillars = [
    {
      id: '01',
      title: { en: 'Quality Assurance & Curricula Modernization', mr: 'गुणवत्ता हमी व अभ्यासक्रम आधुनिकीकरण' },
      desc: {
        en: 'Periodic curriculum revision as per ICAR Deans Committee recommendations, maintaining rigorous NAEAB accreditation standards across all constituent and affiliated colleges.',
        mr: 'भा.कृ.अनु.प. च्या शिफारशींनुसार अभ्यासक्रमांची वेळोवेळी पुनर्रचना करणे आणि नॅक/आयसीएआर मानांकन अव्वल राखणे.'
      },
      icon: ShieldCheck,
      color: 'border-emerald-200 hover:border-emerald-500'
    },
    {
      id: '02',
      title: { en: 'National & Global Academic Linkages', mr: 'राष्ट्रीय व आंतरराष्ट्रीय शैक्षणिक सहकार्य' },
      desc: {
        en: 'Active MoUs and collaborations with premier global and national universities for dual-degree programmes, student exchange, faculty sabbaticals, and joint research.',
        mr: 'विद्यार्थी व प्राध्यापक देवाणघेवाण, दुहेरी पदवी आणि संयुक्त संशोधनासाठी नामांकित राष्ट्रीय व आंतरराष्ट्रीय संस्थांशी सामंजस्य करार.'
      },
      icon: Globe,
      color: 'border-amber-200 hover:border-amber-500'
    },
    {
      id: '03',
      title: { en: 'Digital Agriculture & ICT in Education', mr: 'डिजिटल शेती व माहिती तंत्रज्ञानाचा वापर' },
      desc: {
        en: 'Smart digital classrooms, virtual laboratories, AI-driven crop diagnostics, and modern computer-based examination systems.',
        mr: 'स्मार्ट वर्गखोल्या, आभासी प्रयोगशाळा, कृत्रिम बुद्धिमत्ता (AI) आधारित शिक्षण आणि संगणकीय परीक्षा पद्धती.'
      },
      icon: Laptop,
      color: 'border-teal-200 hover:border-teal-500'
    },
    {
      id: '04',
      title: { en: 'Student READY & Industrial Interface', mr: 'स्टुडन्ट रेडी व कृषोद्योग सहकार्य' },
      desc: {
        en: 'Experiential learning modules and rural agricultural work experience bridging academia with agro-industrial corporate demands.',
        mr: 'ग्रामीण कृषि कार्यानुभव आणि प्रत्यक्ष कृषोद्योग इंटर्नशिपच्या माध्यमातून विद्यार्थ्यांमध्ये उद्योजकता व कॉर्पोरेट कौशल्ये रुजविणे.'
      },
      icon: Briefcase,
      color: 'border-blue-200 hover:border-blue-500'
    },
    {
      id: '05',
      title: { en: 'Modernization of Instructional Farms', mr: 'विद्यापीठ शैक्षणिक प्रक्षेत्रांचे आधुनिकीकरण' },
      desc: {
        en: 'Automated drip fertigation, precision agriculture machinery, sensor-based polyhouses, and state-of-the-art live instructional plots.',
        mr: 'स्वयंचलित ठिबक सिंचन, आधुनिक कृषियंत्रे आणि सेन्सर-आधारित हरितगृहांद्वारे प्रक्षेत्रांचे आधुनिकीकरण.'
      },
      icon: Sprout,
      color: 'border-green-200 hover:border-green-500'
    },
    {
      id: '06',
      title: { en: 'Gender Mainstreaming & Student Welfare', mr: 'स्त्री-समानता व विद्यार्थी कल्याण' },
      desc: {
        en: 'Modern girls’ hostels, multi-facility gymnasiums, sports complexes, Wi-Fi campuses, and comprehensive student healthcare amenities.',
        mr: 'सर्व संकुलांमध्ये सुसज्ज मुलींची वसतिगृहे, क्रीडा संकुले, व्यायामशाळा, वाय-फाय व आरोग्य सुविधांची निर्मिती.'
      },
      icon: HeartHandshake,
      color: 'border-rose-200 hover:border-rose-500'
    },
    {
      id: '07',
      title: { en: 'Faculty Competence & Pedagogical Excellence', mr: 'प्राध्यापक सक्षमीकरण व अध्यापन उत्कृष्टता' },
      desc: {
        en: 'Centres of Advanced Studies (CAS), summer/winter schools, national refresher courses, and Best Teacher awards promoting pedagogical excellence.',
        mr: 'प्रगत अभ्यास केंद्र (CAS), उन्हाळी/हिवाळी शाळा, पुनश्चर्या वर्ग आणि उत्कृष्ट शिक्षक पुरस्कार प्रोत्साहन.'
      },
      icon: Award,
      color: 'border-amber-200 hover:border-amber-500'
    },
    {
      id: '08',
      title: { en: 'Digital Library Strengthening & CeRA Access', mr: 'डिजिटल ग्रंथालय सक्षमीकरण व CeRA उपलब्धता' },
      desc: {
        en: '24x7 digital e-resources, RFID library automation, remote access, and institutional access to Consortium for e-Resources in Agriculture.',
        mr: '२४x७ डिजिटल ई-पुस्तके, आरएफआयडी ग्रंथालय व्यवस्थापन आणि आंतरराष्ट्रीय कृषिशोधपत्रिकांची निरंतर उपलब्धता.'
      },
      icon: BookOpen,
      color: 'border-indigo-200 hover:border-indigo-500'
    }
  ];

  return (
    <article className="min-h-screen bg-[#faf9f6] text-stone-800">
      <EducationBreadcrumb items={breadcrumbItems} />
      <EducationHero
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={heroBadge}
        theme="thrust"
        quickChips={[
          { label: language === 'mr' ? '८ धोरणात्मक प्राधान्यक्रम' : '8 Strategic Thrust Pillars' },
          { label: language === 'mr' ? 'डिजिटल शेती व AI शिक्षण' : 'Digital Agriculture & AI' },
          { label: language === 'mr' ? 'प्रायोगिक अध्ययन (ELU) युनिट्स' : 'Experiential Learning (ELU)' }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-16">
        
        {/* Intro Section */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {language === 'mr' ? 'धोरणात्मक दिशा' : 'Strategic Roadmap'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                {language === 'mr'
                  ? '२१ व्या शतकातील शाश्वत शेतीसाठी आधुनिक कृषि शिक्षण'
                  : 'Fostering 21st Century Agricultural Competence & Global Standards'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'mr'
                  ? 'विद्यापीठाने आपल्या शैक्षणिक प्राधान्यक्रमांची निश्चिती केली असून यात अभ्यासक्रमांचे जागतिकीकरण, डिजिटल शेती तंत्रज्ञान आणि विद्यार्थ्यांमध्ये व्यावसायिक उद्योजकता निर्माण करण्यावर विशेष भर दिला आहे.'
                  : 'The University has charted strategic thrust areas focusing on curricular modernization, digital farming technologies, experiential skill building, and nurturing young agri-entrepreneurs.'}
              </p>
            </div>
            <Link
              href="/education/regulations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs shrink-0"
            >
              <span>{language === 'mr' ? 'शैक्षणिक नियमावली पहा' : 'Academic Regulations'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 8 Strategic Pillars Grid */}
        <section aria-labelledby="pillars-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'mr' ? 'मुख्य स्तंभ' : 'Key Pillars'}</span>
              </div>
              <h2 id="pillars-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {language === 'mr' ? '८ प्रमुख शैक्षणिक प्राधान्य क्षेत्रे' : '8 Strategic Educational Thrust Areas'}
              </h2>
            </div>
            <button
              onClick={() => printElement('thrust-areas-printable', language === 'mr' ? 'मफुकृवि प्रमुख शैक्षणिक व संशोधन प्राधान्य क्षेत्रे' : 'MPKV Academic & Research Thrust Areas')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer shrink-0 self-start sm:self-auto no-print"
              title={language === 'mr' ? 'प्राधान्य क्षेत्रे प्रिंट करा' : 'Print Thrust Areas'}
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
            </button>
          </div>

          <div id="thrust-areas-printable">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className={`bg-white rounded-2xl border p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${pillar.color}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-amber-600/80">
                        {pillar.id}
                      </span>
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-stone-900 leading-snug">
                      {getBilingual(pillar.title)}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {getBilingual(pillar.desc)}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{language === 'mr' ? 'सक्रिय प्राधान्य' : 'Active Priority'}</span>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </section>

        {/* Experiential Learning Units Banner */}
        <section aria-labelledby="elu-heading">
          <div className="bg-gradient-to-r from-emerald-900 to-[#04361e] text-white rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300">
                  {language === 'mr' ? 'उद्योजकता विकास' : 'Agri-Preneurship Incubation'}
                </span>
                <h3 id="elu-heading" className="text-lg sm:text-xl font-bold text-white">
                  {language === 'mr'
                    ? 'कमवा आणि शिका — प्रायोगिक अध्ययन युनिट्स (ELU)'
                    : 'Experiential Learning Units (ELU): "Earn While You Learn"'}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  {language === 'mr'
                    ? 'पदवीच्या अंतिम वर्षात विद्यार्थी प्रत्यक्ष व्यावसायिक उत्पादन प्रकल्प (उदा. जैविक खत निर्मिती, उती संवर्धन, प्रक्रिया उद्योग) चालवितात. यातून व्यावसायिक कौशल्ये आणि नफ्याचा प्रत्यक्ष वाटा विद्यार्थ्यांना मिळतो.'
                    : 'Final-year undergraduate students operate end-to-end commercial production modules in bio-pesticides, tissue culture, bakery, and seed processing, instilling business acumen and financial management skills.'}
                </p>
              </div>
              <Link
                href="/education/bachelors"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs sm:text-sm transition-colors shrink-0 shadow-xs"
              >
                <span>{language === 'mr' ? 'पदवी अभ्यासक्रम पहा' : 'View UG Programmes'}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
};
