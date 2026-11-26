'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Scale,
  FileText,
  Clock,
  CheckCircle2,
  Users,
  Building,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Home,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TransparencyRtiViewProps {
  pageData?: any;
}

export const TransparencyRtiView: React.FC<TransparencyRtiViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const [activeTab, setActiveTab] = useState<'rti' | 'rts' | 'procedure'>('rti');

  const rtiOfficers = [
    {
      level: { en: 'First Appellate Authority (FAA)', mr: 'प्रथम अपिलीय अधिकारी' },
      officer: { en: 'Registrar, MPKV Rahuri', mr: 'कुलसचिव, मफुकृवि राहुरी' },
      scope: { en: 'Entire University Administrative Jurisdiction & Final Appeals', mr: 'संपूर्ण विद्यापीठ प्रशासकीय कार्यक्षेत्र व अंतिम अपिले' },
      address: { en: 'Registrar Office, Central Administrative Building, Rahuri', mr: 'कुलसचिव कार्यालय, मध्यवर्ती प्रशासकीय इमारत, राहुरी' },
      phone: '02426-243216 / 243208',
      email: 'registrar.mpkv@gov.in',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300'
    },
    {
      level: { en: 'Central Public Information Officer (CPIO)', mr: 'केंद्रीय जनमाहिती अधिकारी (प्रशासन)' },
      officer: { en: 'Assistant Registrar (Administration)', mr: 'सहायक कुलसचिव (प्रशासन)' },
      scope: { en: 'General Administration, Executive Council & Central University Records', mr: 'सर्वसाधारण प्रशासन, कार्यकारी परिषद व मध्यवर्ती अभिलेख' },
      address: { en: 'Administration Branch, MPKV Rahuri', mr: 'प्रशासन शाखा, मफुकृवि राहुरी' },
      phone: '02426-243216',
      email: 'admin.mpkv@gov.in',
      badgeColor: 'bg-blue-100 text-blue-950 border-blue-300'
    },
    {
      level: { en: 'Public Information Officer (Academic & Degrees)', mr: 'जनमाहिती अधिकारी (शैक्षणिक व पदव्या)' },
      officer: { en: 'Assistant Registrar (Education / Exam)', mr: 'सहायक कुलसचिव (शिक्षण व परीक्षा)' },
      scope: { en: 'Admissions, Degree Verification, Transcripts & Academic Affairs', mr: 'विद्यार्थी प्रवेश, पदवी पडताळणी, गुणपत्रिका व शैक्षणिक बाबी' },
      address: { en: 'Academic Branch, Central Campus, Rahuri', mr: 'शैक्षणिक शाखा, मध्यवर्ती परिसर, राहुरी' },
      phone: '02426-243205',
      email: 'academic.mpkv@gov.in',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300'
    },
    {
      level: { en: 'Public Information Officer (Research & AICRP)', mr: 'जनमाहिती अधिकारी (संशोधन व प्रकल्प)' },
      officer: { en: 'Assistant Registrar (Research)', mr: 'सहायक कुलसचिव (संशोधन)' },
      scope: { en: 'Research Stations, Varieties, AICRP Projects & Agricultural Patents', mr: 'संशोधन केंद्रे, पीक वाण, अखिल भारतीय प्रकल्प व पेटंट्स' },
      address: { en: 'Directorate of Research, Rahuri', mr: 'संशोधन संचालनालय, राहुरी' },
      phone: '02426-243223',
      email: 'dr.mpkv@gov.in',
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300'
    },
    {
      level: { en: 'Public Information Officer (Pune Campus)', mr: 'जनमाहिती अधिकारी (पुणे कॅम्पस)' },
      officer: { en: 'Assistant Registrar, College of Agriculture, Pune', mr: 'सहायक कुलसचिव, कृषि महाविद्यालय, पुणे' },
      scope: { en: 'Pune Campus, Student Affairs & Regional Research Centers', mr: 'पुणे महाविद्यालय परिसर व संलग्न विभागीय संशोधन' },
      address: { en: 'Shivajinagar, Pune (MS)', mr: 'शिवाजीनगर, पुणे (महाराष्ट्र)' },
      phone: '020-25537033',
      email: 'adacpune@mpkv.ac.in',
      badgeColor: 'bg-rose-100 text-rose-950 border-rose-300'
    },
    {
      level: { en: 'Public Information Officer (Kolhapur Campus)', mr: 'जनमाहिती अधिकारी (कोल्हापूर कॅम्पस)' },
      officer: { en: 'Assistant Registrar, RCSM College of Agriculture', mr: 'सहायक कुलसचिव, रा.छ.शा.म. कृषि महाविद्यालय' },
      scope: { en: 'Kolhapur Campus, Southern Maharashtra Stations & KVK', mr: 'कोल्हापूर परिसर व दक्षिण महाराष्ट्र संशोधन केंद्रे' },
      address: { en: 'Kasaba Bawada, Kolhapur', mr: 'कसबा बावडा, कोल्हापूर' },
      phone: '0231-2605851',
      email: 'adackolhapur@mpkv.ac.in',
      badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300'
    }
  ];

  const rtsServices = [
    {
      service: { en: 'Issue of Official Degree Transcript / Grade Cards', mr: 'अधिकृत पदवी ट्रान्सक्रिप्ट / गुणपत्रिका देणे' },
      designated: { en: 'Assistant Registrar (Academic)', mr: 'सहायक कुलसचिव (शिक्षण)' },
      timeframe: '15 Working Days',
      appeal: { en: 'Registrar, MPKV', mr: 'कुलसचिव' }
    },
    {
      service: { en: 'Verification of Educational Certificates & Degrees', mr: 'शैक्षणिक पदवी प्रमाणपत्रांचे अधिकृत पडताळणी' },
      designated: { en: 'Controller of Examinations', mr: 'परीक्षा नियंत्रक' },
      timeframe: '15 Working Days',
      appeal: { en: 'Registrar, MPKV', mr: 'कुलसचिव' }
    },
    {
      service: { en: 'Issue of Student Migration Certificate', mr: 'स्थलांतर प्रमाणपत्र (मायग्रेशन) देणे' },
      designated: { en: 'Assistant Registrar (Academic)', mr: 'सहायक कुलसचिव (शिक्षण)' },
      timeframe: '7 Working Days',
      appeal: { en: 'Registrar, MPKV', mr: 'कुलसचिव' }
    },
    {
      service: { en: 'Soil & Irrigation Water Health Card Testing Report', mr: 'माती व सिंचन पाणी तपासणी अहवाल देणे' },
      designated: { en: 'In-Charge, Soil Testing Laboratory', mr: 'प्रभारी, मृद परीक्षण प्रयोगशाळा' },
      timeframe: '15 Working Days',
      appeal: { en: 'Associate Dean (College)', mr: 'सहयोगी अधिष्ठाता' }
    },
    {
      service: { en: 'Booking of Certified Breeder & Foundation Seed Stock', mr: 'प्रमाणित व पैदासकार बियाणे आरक्षण सेवा' },
      designated: { en: 'In-Charge Seed Cell / ATIC', mr: 'प्रभारी बियाणे कक्ष / ॲटिक' },
      timeframe: '3 Working Days',
      appeal: { en: 'Director of Extension Education', mr: 'संचालक विस्तार शिक्षण' }
    }
  ];

  return (
    <div className="w-full bg-[#f8faf9] min-h-screen text-slate-800">
      
      {/* 1. Breadcrumb Strip */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <div className="w-full max-w-[1720px] mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
          <Link href="/" className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md">
            {language === 'mr' ? 'पारदर्शकता व माहिती अधिकार' : 'Transparency & RTI'}
          </span>
        </div>
      </div>

      {/* 2. Hero Header: Institutional Navy & Bronze Accountability */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-5.5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1f38] via-[#102b4e] to-[#071324] text-white p-5 sm:p-6 lg:p-7 shadow-xl border border-blue-800/40">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-4xl">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {language === 'mr'
                  ? 'पारदर्शकता कक्ष, माहिती अधिकार व लोकसेवा हमी'
                  : 'Right to Information & Time-Bound Public Service Delivery'}
              </h1>

              <p className="text-blue-100/90 text-xs sm:text-sm leading-relaxed font-normal max-w-2xl">
                {language === 'mr'
                  ? 'माहितीचा अधिकार अधिनियम २००५ व महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत नागरिकांना विद्यापीठाची माहिती, प्रमाणपत्रे व सेवा विहित वेळेत उपलब्ध करून देण्याची वैधानिक हमी.'
                  : 'Fulfilling our statutory commitment to administrative openness, public scrutiny, designated information officers, and stipulated timeframes for all academic and farm services.'}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {[
                  { label: language === 'mr' ? 'प्रथम अपिलीय प्राधिकरण (कुलसचिव)' : 'First Appellate Authority (Registrar)', icon: ShieldAlert },
                  { label: language === 'mr' ? 'विहित मुदतीत सेवा हमी' : 'Guaranteed Delivery Timelines', icon: Clock },
                  { label: language === 'mr' ? 'ऑनलाइन आरटीआय अर्ज' : 'Online RTI Portal Integration', icon: ExternalLink }
                ].map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-[11px] text-blue-200 font-medium"
                  >
                    <b.icon className="w-3 h-3 text-amber-300" />
                    <span>{b.label}</span>
                  </span>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 3. Section Tabs: RTI Officers vs RTS Services vs Application Procedure */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          
          <div className="flex items-center border-b border-stone-200 bg-stone-50/80 px-4 sm:px-8 pt-3 gap-2 sm:gap-4 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('rti')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'rti'
                  ? 'border-blue-900 text-blue-950 font-extrabold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scale className="w-4 h-4 text-blue-900" />
              <span>{language === 'mr' ? 'माहिती अधिकार (RTI) नियुक्त अधिकारी' : 'RTI Act 2005 Officers Directory'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rts')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'rts'
                  ? 'border-blue-900 text-blue-950 font-extrabold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-4 h-4 text-blue-900" />
              <span>{language === 'mr' ? 'लोकसेवा हक्क (RTS) विहित सेवा' : 'Right to Public Services (RTS) Timeline'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('procedure')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'procedure'
                  ? 'border-blue-900 text-blue-950 font-extrabold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-900" />
              <span>{language === 'mr' ? 'अर्ज कसा करावा व शुल्क' : 'How to Apply & Fee Guidelines'}</span>
            </button>
          </div>

          {/* TAB 1: RTI Statutory Officers */}
          {activeTab === 'rti' && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rtiOfficers.map((o, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3 hover:border-blue-300 transition-colors"
                  >
                    <div className="space-y-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${o.badgeColor}`}>
                        {getBilingual(o.level)}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {getBilingual(o.officer)}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        <strong>{language === 'mr' ? 'कार्यक्षेत्र: ' : 'Scope: '}</strong>
                        {getBilingual(o.scope)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {getBilingual(o.address)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200/80 space-y-1">
                      <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-blue-800" />
                        <span>{o.phone}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        {o.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: RTS Notified Services */}
          {activeTab === 'rts' && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="overflow-x-auto rounded-2xl border border-stone-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-stone-100 text-slate-800 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                      <th className="px-4 py-3">Sr.</th>
                      <th className="px-4 py-3">{language === 'mr' ? 'अधिसूचित लोकसेवा' : 'Notified Public Service'}</th>
                      <th className="px-4 py-3">{language === 'mr' ? 'पदनिर्देशित अधिकारी' : 'Designated Officer'}</th>
                      <th className="px-4 py-3">{language === 'mr' ? 'विहित मुदत' : 'Stipulated Timeframe'}</th>
                      <th className="px-4 py-3">{language === 'mr' ? 'अपिलीय अधिकारी' : 'Appellate Authority'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {rtsServices.map((r, i) => (
                      <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                        <td className="px-4 py-3 font-bold text-slate-500">{i + 1}</td>
                        <td className="px-4 py-3 font-semibold text-slate-900">{getBilingual(r.service)}</td>
                        <td className="px-4 py-3 text-slate-700">{getBilingual(r.designated)}</td>
                        <td className="px-4 py-3">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs border border-emerald-200">
                            {r.timeframe}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{getBilingual(r.appeal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: How to Apply & Fee Guidelines */}
          {activeTab === 'procedure' && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-base text-blue-950">
                    <ExternalLink className="w-4 h-4 text-blue-800" />
                    <span>{language === 'mr' ? 'ऑनलाइन आरटीआय अर्ज कसा करावा?' : 'How to File RTI Online'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-normal">
                    {language === 'mr'
                      ? 'महाराष्ट्र शासनाच्या अधिकृत rtionline.maharashtra.gov.in पोर्टलवर जाऊन "Agriculture Department / MPKV Rahuri" निवडा आणि विहित १० रुपये कोर्ट फी सह ऑनलाइन अर्ज दाखल करा.'
                      : 'Visit the Government of Maharashtra RTI Online Portal (rtionline.maharashtra.gov.in), select "Agriculture Department / MPKV Rahuri", submit details with the nominal ₹10 digital fee, and receive an instant tracking ID.'}
                  </p>
                  <a
                    href="https://rtionline.maharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-colors mt-2"
                  >
                    <span>rtionline.maharashtra.gov.in</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-base text-slate-900">
                    <DollarSign className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'mr' ? 'प्रत्यक्ष (ऑफलाइन) अर्ज व शुल्क नियम' : 'Physical Offline Applications & Fees'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {language === 'mr'
                      ? 'अर्जासोबत १० रुपयांचा कोर्ट फी स्टॅम्प किंवा "The Comptroller, MPKV Rahuri" यांच्या नावे धनाकर्ष (Demand Draft) जोडावा. छायांकित प्रतींसाठी २ रुपये प्रति पृष्ठ दर विहित आहे.'
                      : 'Attach a ₹10 Court Fee Stamp or Demand Draft drawn in favor of "The Comptroller, MPKV Rahuri". Photocopy charges are ₹2 per page as prescribed under RTI Rules 2005.'}
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
