'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Award,
  ShieldCheck,
  Phone,
  Mail,
  ChevronRight,
  Home,
  Printer,
  Volume2,
  VolumeX,
  Sparkles,
  Scale,
  FileText,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility } from '@/context/AccessibilityContext';

interface CentralAdministrationViewProps {
  pageData?: any;
}

export const CentralAdministrationView: React.FC<CentralAdministrationViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const { isSpeaking, speakContent, stopSpeech } = useAccessibility();

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const executiveOfficers = [
    {
      role: { en: 'Hon. Vice-Chancellor', mr: 'मा. कुलगुरू' },
      name: { en: 'Dr. Vilas K. Kharche', mr: 'डॉ. विलास के. खर्चे' },
      cadre: { en: 'Chief Academic & Executive Head', mr: 'विद्यापीठाचे मुख्य कार्यकारी व शैक्षणिक प्रमुख' },
      phone: '02426-243208 / 243216',
      email: 'vc.mpkv@gov.in',
      mandate: {
        en: 'Overall executive governance, academic policy formulation, Chancellor liaison, and presiding officer of Executive Council.',
        mr: 'विद्यापीठाचे सर्वोच्च प्रशासकीय संचलन, कुलपती समन्वय व कार्यकारी परिषदेचे अध्यक्षस्थान.'
      },
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300'
    },
    {
      role: { en: 'Office of the Registrar', mr: 'कुलसचिव कार्यालय' },
      name: { en: 'Shri. G. B. Patil', mr: 'श्री. जी. बी. पाटील' },
      cadre: { en: 'Statutory Administrative Head', mr: 'वैधानिक प्रशासकीय प्रमुख' },
      phone: '02426-243216',
      email: 'registrar.mpkv@gov.in',
      mandate: {
        en: 'General administration, statutory meetings, university legal affairs, RTI First Appellate Authority, and university seal custodian.',
        mr: 'सर्वसाधारण प्रशासन, वैधानिक बैठका, कायदेशीर बाबी, प्रथम अपिलीय अधिकारी व विद्यापीठ मुद्रा अभिरक्षक.'
      },
      tagColor: 'bg-emerald-100 text-emerald-950 border-emerald-300'
    },
    {
      role: { en: 'Office of the Comptroller', mr: 'नियंत्रक (वित्त व लेखा) कार्यालय' },
      name: { en: 'Comptroller (Finance & Accounts)', mr: 'नियंत्रक (वित्त व लेखा विभाग)' },
      cadre: { en: 'Chief Financial Advisor', mr: 'मुख्य वित्तीय सल्लागार' },
      phone: '02426-243214',
      email: 'comptroller.mpkv@gov.in',
      mandate: {
        en: 'Annual budget formulation, State Government grant disbursals, financial auditing, internal accounts, and pension disbursement.',
        mr: 'वार्षिक अंदाजपत्रक निर्मिती, शासकीय अनुदान वितरण, वित्तीय लेखापरीक्षण व वेतन-निवृत्तीवेतन संचलन.'
      },
      tagColor: 'bg-blue-100 text-blue-950 border-blue-300'
    },
    {
      role: { en: 'Directorate of Research', mr: 'संशोधन संचालनालय' },
      name: { en: 'Dr. S. B. Kharbade', mr: 'डॉ. एस. बी. खराबाडे' },
      cadre: { en: 'Director of Research', mr: 'संचालक संशोधन' },
      phone: '02426-243223',
      email: 'dr.mpkv@gov.in',
      mandate: {
        en: 'Strategic direction of 27 research stations, 36 ICAR-AICRP projects, varietal releases, and agricultural patent management.',
        mr: '२७ संशोधन केंद्रे, ३६ अखिल भारतीय समन्वित प्रकल्प, पीक वाण निर्मिती व कृषी पेटंट्सचे व्यवस्थापन.'
      },
      tagColor: 'bg-purple-100 text-purple-950 border-purple-300'
    },
    {
      role: { en: 'Directorate of Extension Education', mr: 'विस्तार शिक्षण संचालनालय' },
      name: { en: 'Dr. C. S. Patil', mr: 'डॉ. सी. एस. पाटील' },
      cadre: { en: 'Director of Extension Education', mr: 'संचालक विस्तार शिक्षण' },
      phone: '02426-243206',
      email: 'deempkv@gmail.com',
      mandate: {
        en: 'Farmer outreach across 10 Western Maharashtra districts, ATIC, 4 KVKs, Krishidarshani publication, and Kisan Call Center.',
        mr: 'पश्चिम महाराष्ट्रातील १० जिल्ह्यांमध्ये कृषी तंत्रज्ञान प्रसार, अॅटिक, ४ केव्हीके व कृषीदर्शनी प्रकाशन.'
      },
      tagColor: 'bg-cyan-100 text-cyan-950 border-cyan-300'
    },
    {
      role: { en: 'Dean & Director of Instructions', mr: 'अधिष्ठाता व शिक्षण संचालनालय' },
      name: { en: 'Dean, Faculty of Agriculture', mr: 'अधिष्ठाता (कृषि विद्याशाखा)' },
      cadre: { en: 'Apex Academic Dean', mr: 'सर्वोच्च शैक्षणिक अधिष्ठाता' },
      phone: '02426-243205',
      email: 'dean.mpkv@gov.in',
      mandate: {
        en: 'Academic curricula standards, accreditation compliance (NAEAB), 10 constituent colleges, and Post Graduate Institute (PGI).',
        mr: 'शैक्षणिक गुणवत्ता नियंत्रण, आयसीएआर अधिस्वीकृती, १० घटक महाविद्यालये व पदव्युत्तर संस्थेचे संचलन.'
      },
      tagColor: 'bg-rose-100 text-rose-950 border-rose-300'
    },
    {
      role: { en: 'University Engineer Office', mr: 'विद्यापीठ अभियंता कार्यालय' },
      name: { en: 'University Engineer / Estate Officer', mr: 'कार्यकारी अभियंता व संपदा अधिकारी' },
      cadre: { en: 'Head of Infrastructure & Works', mr: 'बांधकाम व पायाभूत सुविधा प्रमुख' },
      phone: '02426-243272',
      email: 'ue.mpkv@gmail.com',
      mandate: {
        en: 'Campus master planning across 3,200 hectares, capital civil construction, solar power generation, and campus water distribution.',
        mr: '३,२०० हेक्टर कॅम्पसचे नियोजन, स्थापत्य बांधकाम, सौर ऊर्जा प्रकल्प व अखंडित पाणीपुरवठा व्यवस्था.'
      },
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300'
    }
  ];

  return (
    <div className="w-full bg-[#f8faf8] min-h-screen text-slate-800">
      
      {/* 1. Breadcrumbs */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-emerald-700 flex items-center gap-1 font-medium text-slate-600 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-emerald-950">
            {language === 'mr' ? 'मध्यवर्ती प्रशासन' : 'Central Administration'}
          </span>
        </nav>
      </div>

      {/* 2. Hero Header: Executive Emerald & Regal Gold */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2a1c] via-[#123624] to-[#071a10] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-emerald-700/50">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Building2 className="w-4 h-4 text-amber-300" />
                <span>{language === 'mr' ? 'मध्यवर्ती प्रशासकीय संरचना व वैधानिक नेतृत्व' : 'Central Administrative Governance'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-amber-300 font-semibold">{language === 'mr' ? 'कायदा १९८३ अन्वये' : 'MAU Act 1983'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight">
                {language === 'mr'
                  ? 'विद्यापीठ मध्यवर्ती प्रशासन व वैधानिक नेतृत्व'
                  : 'Apex Governance & Central Administrative Machinery'}
              </h1>

              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
                {language === 'mr'
                  ? 'महाराष्ट्र कृषी विद्यापीठे कायदा १९८३ नुसार विद्यापीठाचे शिक्षण, संशोधन व विस्तार या त्रिसूत्री उद्दिष्टांची प्रभावी अंमलबजावणी करणारी मध्यवर्ती प्रशासकीय यंत्रणा.'
                  : 'The statutory leadership, executive directorates, financial governance, and administrative secretariats steering MPKV’s tri-fold mandate of Education, Research, and Extension.'}
              </p>

              {/* Quick Stat Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {[
                  { label: language === 'mr' ? 'मा. कुलपती: राज्यपाल, महाराष्ट्र' : 'Chancellor: Governor of Maharashtra', icon: Award },
                  { label: language === 'mr' ? 'मा. कुलगुरू: मुख्य कार्यकारी प्रमुख' : 'Vice-Chancellor: Chief Executive Officer', icon: ShieldCheck },
                  { label: language === 'mr' ? 'कार्यकारी परिषद व विद्यापरिषद' : 'Executive & Academic Councils', icon: Scale }
                ].map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-emerald-200 font-medium"
                  >
                    <b.icon className="w-3.5 h-3.5 text-amber-300" />
                    <span>{b.label}</span>
                  </span>
                ))}
              </div>

            </div>

            {/* Audio & Print */}
            <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => (isSpeaking ? stopSpeech() : speakContent())}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                    : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-600" />
                    <span>{language === 'mr' ? 'थांबवा' : 'Stop Audio'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-300" />
                    <span>{language === 'mr' ? 'मजकूर ऐका' : 'Listen'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>{language === 'mr' ? 'प्रिंट करा' : 'Print Page'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Executive Organogram Summary */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-10">
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>{language === 'mr' ? 'वैधानिक प्रशासकीय उतरंड' : 'Statutory Governance Hierarchy'}</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">{language === 'mr' ? 'कुलपती' : 'Chancellor'}</span>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                {language === 'mr' ? 'मा. राज्यपाल, महाराष्ट्र राज्य' : 'Hon. Governor of Maharashtra'}
              </div>
              <p className="text-xs text-slate-600">{language === 'mr' ? 'सर्वोच्च संविधानिक प्रमुख' : 'Supreme Head of University'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">{language === 'mr' ? 'कुलपती-उपाध्यक्ष' : 'Pro-Chancellor'}</span>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                {language === 'mr' ? 'मा. कृषिमंत्री, महाराष्ट्र राज्य' : 'Hon. Minister for Agriculture, GoM'}
              </div>
              <p className="text-xs text-slate-600">{language === 'mr' ? 'कृषी शिक्षण व धोरण प्रमुख' : 'Agricultural Policy & Oversight'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">{language === 'mr' ? 'कुलगुरू' : 'Vice-Chancellor'}</span>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                Dr. Vilas K. Kharche
              </div>
              <p className="text-xs text-slate-600">{language === 'mr' ? 'मुख्य कार्यकारी व शैक्षणिक अधिकारी' : 'Chief Executive & Academic Head'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Statutory Central Officers Directory (7 Executive Cards) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {language === 'mr' ? 'वैधानिक अधिकारी व संचलनालये निर्देशिका' : 'Statutory Officers & Central Directorates'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {language === 'mr' ? '७ प्रमुख प्रशासकीय पदे' : '7 Apex Portfolios'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {executiveOfficers.map((o, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-md border ${o.tagColor}`}>
                    {getBilingual(o.cadre)}
                  </span>
                  <Building2 className="w-4 h-4 text-emerald-700" />
                </div>

                <div>
                  <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                    {getBilingual(o.role)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 group-hover:text-emerald-900 transition-colors">
                    {getBilingual(o.name)}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {getBilingual(o.mandate)}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 space-y-1.5">
                <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <a href={`tel:${o.phone.split(' ')[0]}`} className="hover:underline">{o.phone}</a>
                </div>
                <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{o.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
