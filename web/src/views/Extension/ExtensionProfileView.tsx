'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Users,
  Building2,
  HelpCircle,
  Radio,
  BookOpen,
  MapPin,
  Compass,
  ArrowRight,
  Maximize2,
  CheckCircle2,
  Sparkles,
  GitBranch,
  ShieldCheck,
  GitFork
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ExtensionBreadcrumb } from './components/ExtensionBreadcrumb';
import { ExtensionHero } from './components/ExtensionHero';
import { ExtensionSubmenuNav } from './components/ExtensionSubmenuNav';
import { ExtensionCoordinationTree } from './components/ExtensionCoordinationTree';

interface ExtensionProfileViewProps {
  pageData?: any;
}

export const ExtensionProfileView: React.FC<ExtensionProfileViewProps> = () => {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<'tree' | 'chart' | 'hierarchy'>('tree');
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const hierarchyTiers = [
    {
      tier: 'Level 1: Executive Apex',
      roleEn: 'Honorable Vice Chancellor',
      roleMr: 'मा. कुलगुरू',
      nameEn: 'Mahatma Phule Krishi Vidyapeeth, Rahuri',
      nameMr: 'महात्मा फुले कृषी विद्यापीठ, राहुरी',
      descEn: 'Supreme executive authority governing the statutory extension policies and agricultural outreach of the University.',
      descMr: 'विद्यापीठाच्या विस्तार धोरणांचे व क्षेत्रीय कृषी प्रसार उपक्रमांचे सर्वोच्च नियामक नेतृत्व.'
    },
    {
      tier: 'Level 2: Directorate Leadership',
      roleEn: 'Director of Extension Education',
      roleMr: 'संचालक, विस्तार शिक्षण',
      nameEn: 'Dr. G. K. Sasane (Additional Charge)',
      nameMr: 'डॉ. गोरक्ष ससाणे (अतिरिक्त पदभार)',
      descEn: 'Statutory officer supervising, planning, and executing all extension education, training, KVK operations, and ATIC single-window services across 10 districts.',
      descMr: '१० जिल्ह्यांमध्ये कृषी विस्तार, प्रशिक्षण, १७ केव्हीके समन्वय आणि अ‍ॅटिक एक खिडकी सेवांचे समग्र वैधानिक नियोजन व पर्यवेक्षण.'
    },
    {
      tier: 'Level 3: Headquarters Coordination & Divisions',
      roleEn: 'Dy. Director of Extension & Specialist Officers',
      roleMr: 'उपसंचालक, विस्तार शिक्षण व विशेष अधिकारी',
      nameEn: 'DEE Headquarters, MPKV Rahuri',
      nameMr: 'विस्तार शिक्षण संचालनालय मुख्यालय, राहुरी',
      descEn: 'Coordinating core operational wings: Training Coordination, Mass Media & Publications, Extension Monitoring, and Line Department Liaison.',
      descMr: 'प्रशिक्षण समन्वय, प्रसिद्धी व विस्तार प्रकाशने, क्षेत्रीय उपक्रम सनियंत्रण आणि शासकीय कृषी विभागाशी समन्वय.'
    },
    {
      tier: 'Level 4: Field Delivery Institutions',
      roleEn: 'Four Wings of Field Outreach',
      roleMr: 'क्षेत्रीय विस्तार सेवेचे चार प्रमुख स्तंभ',
      nameEn: 'KVKs, ATIC, RECs, and DECs',
      nameMr: 'केव्हीके, अ‍ॅटिक, विभागीय व जिल्हा विस्तार केंद्रे',
      descEn: 'Grassroots implementation through 17 Krishi Vigyan Kendras, 1 Central ATIC, 4 Regional Extension Centers, 5 District Extension Centers, and Community Radio CRS 90.8 FM.',
      descMr: '१७ कृषि विज्ञान केंद्रे, १ अ‍ॅटिक, ४ विभागीय केंद्रे, ५ जिल्हा केंद्रे आणि विद्यापीठ वाहिनी ९०.८ एफएम द्वारे शेतकऱ्यांच्या बांधावर प्रत्यक्ष सेवा.'
    }
  ];

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-slate-800">
      <ExtensionBreadcrumb currentPageTitle={{ en: 'Organizational Profile', mr: 'संस्थात्मक संरचना' }} />

      <ExtensionHero
        theme="profile"
        badge={{ en: 'Administrative Structure', mr: 'प्रशासकीय व संघटनात्मक रचना' }}
        title={{
          en: 'Extension Organizational Profile',
          mr: 'विस्तार संस्थात्मक संरचना'
        }}
        subtitle={{
          en: 'Hierarchical coordination mechanism steering multi-tier grassroots technology transfer, training, and farmer outreach across Western Maharashtra.',
          mr: 'पश्चिम महाराष्ट्रातील शेतकरी सक्षमीकरण आणि कृषी तंत्रज्ञान प्रसाराचे बहुस्तरीय संघटनात्मक जाळे.'
        }}
        quickChips={[
          { label: language === 'mr' ? 'झाड रचना (Tree View)' : 'Tree View Chart', icon: GitFork },
          { label: language === 'mr' ? '४ विस्तार विभाग' : '4 Operational Wings', icon: Layers },
          { label: language === 'mr' ? '१० जिल्हे कार्यक्षेत्र' : '10 Districts Coverage', icon: MapPin },
          { label: language === 'mr' ? '१७ केव्हीके नेटवर्क' : '17 KVK Network', icon: Building2 }
        ]}
      />

      <ExtensionSubmenuNav activeKey="profile" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">

        {/* View Mode Switcher Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
              {language === 'mr' ? 'विस्तार शिक्षण समन्वय संरचना' : 'Extension Coordination Hierarchy'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'mr' ? 'झाड रचना (Tree View), अधिकृत तक्ता व स्तरबद्ध सूची' : 'Tree View Flowchart, Official Chart & Tier-based Cadre Breakdown'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-2xl border border-stone-200 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('tree')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'tree'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-emerald-900'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'झाड रचना (Tree View)' : 'Tree View'}</span>
            </button>

            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'chart'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-emerald-900'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'अधिकृत तक्ता (Chart)' : 'Official Chart'}</span>
            </button>

            <button
              onClick={() => setViewMode('hierarchy')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'hierarchy'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-emerald-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'स्तरबद्ध रचना (Tiers)' : 'Tier List'}</span>
            </button>
          </div>
        </div>

        {/* Mode 1: Interactive Tree View Component (DEFAULT) */}
        {viewMode === 'tree' && (
          <div className="space-y-6">
            <ExtensionCoordinationTree />
          </div>
        )}

        {/* Mode 2: Official Graphic Flowchart */}
        {viewMode === 'chart' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                  <GitBranch className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'mr' ? 'संघटनात्मक आलेख' : 'Extension Directorate Flowchart Graphic'}</span>
                </div>
                <button
                  onClick={() => setIsImageZoomed(!isImageZoomed)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{isImageZoomed ? (language === 'mr' ? 'मूळ आकार' : 'Reset View') : (language === 'mr' ? 'मोठा करा' : 'Expand')}</span>
                </button>
              </div>

              {/* Image Frame */}
              <div
                className={`w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 flex items-center justify-center p-4 transition-all duration-300 ${
                  isImageZoomed ? 'max-h-none' : 'max-h-[650px] overflow-y-auto'
                }`}
              >
                <img
                  src="/media/images/extension/Ext_Organizational_Profile.jpg"
                  alt="MPKV Extension Organizational Profile"
                  className="w-full max-w-5xl object-contain rounded-xl shadow-xs"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = '/media/images/mpkv_icon.png';
                  }}
                />
              </div>

              <p className="text-xs text-stone-500 text-center font-medium">
                {language === 'mr'
                  ? 'स्रोत: विस्तार शिक्षण संचालनालय, म.फु.कृ.वि. राहुरी — संघटनात्मक तक्ता'
                  : 'Source: Directorate of Extension Education, MPKV Rahuri — Official Governance Architecture'}
              </p>
            </div>
          </div>
        )}

        {/* Mode 3: Interactive Hierarchy Breakdown */}
        {viewMode === 'hierarchy' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hierarchyTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-4 hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                      {tier.tier}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 pt-1">
                      {language === 'mr' ? tier.roleMr : tier.roleEn}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-amber-900">
                      {language === 'mr' ? tier.nameMr : tier.nameEn}
                    </p>
                    <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal pt-1">
                      {language === 'mr' ? tier.descMr : tier.descEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Statutory University Authority</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Four Core Field Arms of Extension Education */}
        <section className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'विस्तार सेवा विभाग' : 'Outreach Divisions'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            {language === 'mr' ? '४ प्रमुख विस्तार शाखा व कार्यक्षेत्र' : 'Four Core Functional Wings Under the Directorate'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Wing 1 */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 font-serif text-base">
                {language === 'mr' ? 'कृषि विज्ञान केंद्रे (केव्हीके)' : 'KVK Network'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'विद्यापीठाचे ४ व १३ एनजीओ-संलग्न अशी एकूण १७ कृषी विज्ञान केंद्रे शेतकऱ्यांच्या बांधावर तंत्रज्ञान मूल्यमापन व प्रात्यक्षिके करतात.'
                  : '17 KVKs conducting frontline demonstrations, on-farm trials, and vocational capacity-building courses across 10 districts.'}
              </p>
              <Link
                href="/extension/krishi-vigyan-kendras"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 pt-1"
              >
                <span>{language === 'mr' ? 'तपशील पहा' : 'View Network'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Wing 2 */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 font-serif text-base">
                {language === 'mr' ? 'अ‍ॅटिक (एक खिडकी)' : 'ATIC Center'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'बियाणे, कलमे, माती-पाणी पृथक्करण, पीक रोगनिदान व शेतकरी सल्ला एकाच छताखाली पुरवणारे मध्यवर्ती केंद्र.'
                  : 'Single-window delivery system providing certified seeds, planting material, diagnostic clinics, and farm literature.'}
              </p>
              <Link
                href="/atic-rahuri"
                className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-900 pt-1"
              >
                <span>{language === 'mr' ? 'तपशील पहा' : 'View ATIC'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Wing 3 */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 font-serif text-base">
                {language === 'mr' ? 'संप्रेषण केंद्र व ९०.८ एफएम' : 'Communication & Radio'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'विद्यापीठ कम्युनिटी रेडिओ CRS 90.8 FM, दृकश्राव्य माहितीपट, कृषीदूत व मीडिया प्रदर्शनांचे प्रसारण.'
                  : 'Vidyapeeth Vahini Community Radio CRS 90.8 FM, multimedia production, exhibitions, and mobile van dissemination.'}
              </p>
              <Link
                href="/communication-centre"
                className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 pt-1"
              >
                <span>{language === 'mr' ? 'तपशील पहा' : 'View Radio'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Wing 4 */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 font-serif text-base">
                {language === 'mr' ? 'विस्तार प्रकाशने व मासिके' : 'Publications Wing'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'त्रैमासिक "श्री सुगी", वार्षिक "कृषिदर्शनी" डायरी आणि डिजिटल "मफुकृवि ई-वार्ता" मासिकांद्वारे माहिती प्रसार.'
                  : 'Publishing quarterly Shree Sugi, annual Krishidarshani, digital E-Varta monthly newsletters, and research bulletins.'}
              </p>
              <Link
                href="/extension/publications"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 pt-1"
              >
                <span>{language === 'mr' ? 'तपशील पहा' : 'View Library'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
