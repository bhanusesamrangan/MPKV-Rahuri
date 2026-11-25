'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  CheckCircle2,
  Users,
  ShieldAlert,
  Scale,
  Award,
  ArrowRight,
  FileText,
  Clock,
  Sparkles,
  Building2,
  ChevronRight,
  Gavel
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

interface ResearchReviewMechanismViewProps {
  pageData?: any;
}

export const ResearchReviewMechanismView: React.FC<ResearchReviewMechanismViewProps> = ({ pageData }) => {
  const { language } = useLanguage();

  const stages = [
    {
      num: '01',
      month: { en: 'January (वार्षिक जानेवारी)', mr: 'जानेवारी' },
      titleEn: 'Groupwise Research Review Committee (RRC)',
      titleMr: 'गटनिहाय संशोधन पुनरावलोकन समिती (RRC)',
      authorityEn: 'Chairman: Hon. Vice-Chancellor | Co-Chairman: Director of Research | Convener: Respective HOD',
      authorityMr: 'अध्यक्ष: मा. कुलगुरू | सह-अध्यक्ष: संचालक संशोधन | समन्वयक: संबंधित विभाग प्रमुख',
      color: 'border-purple-300 bg-purple-50/50',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-300',
      descEn: 'The Groupwise Research Review Committee meets annually every January. Ongoing and completed research trials across all 27 stations and 45 AICRPs are rigorously examined. Successful experiments with consistent multi-location data are recommended for release.',
      descMr: 'दरवर्षी जानेवारी महिन्यात गटनिहाय संशोधन पुनरावलोकन समितीची बैठक आयोजित केली जाते. चालू व पूर्ण झालेल्या संशोधन प्रयोगांचे सखोल परीक्षण केले जाते आणि समाधानकारक निष्कर्ष आढळल्यास ते तंत्रज्ञान पुढील मंजुरीसाठी शिफारशीत केले जाते.'
    },
    {
      num: '02',
      month: { en: 'February – March (फेब्रुवारी ते मार्च)', mr: 'फेब्रुवारी ते मार्च' },
      titleEn: 'Groupwise Research Programme Planning Meetings',
      titleMr: 'गटनिहाय संशोधन कार्यक्रम नियोजन बैठक',
      authorityEn: 'Chairman: Hon. Vice-Chancellor | Co-Chairman: Director of Research | Convener: Respective HOD',
      authorityMr: 'अध्यक्ष: मा. कुलगुरू | सह-अध्यक्ष: संचालक संशोधन | समन्वयक: संबंधित विभाग प्रमुख',
      color: 'border-blue-300 bg-blue-50/50',
      tagColor: 'bg-blue-100 text-blue-900 border-blue-300',
      descEn: 'Organized in February–March to plan technical programs for the upcoming agricultural year. Integrating ground-level feedback from farmers, state line departments, and emerging pest/weather challenges, each scientist’s research program is finalized.',
      descMr: 'आगामी वर्षाच्या नवीन संशोधन कार्यक्रमांचे नियोजन करण्यासाठी फेब्रुवारी-मार्चमध्ये ही बैठक होते. शेतकरी, कृषी विभाग व शासनाकडून आलेल्या गरजांचा विचार करून प्रत्येक शास्त्रज्ञाचा तांत्रिक कार्यक्रम तपासून निश्चित केला जातो.'
    },
    {
      num: '03',
      month: { en: 'Annual Statutory Meet (वार्षिक वैधानिक बैठक)', mr: 'वार्षिक वैधानिक सभा' },
      titleEn: 'Agricultural Research Council (कृषी संशोधन परिषद)',
      titleMr: 'कृषी संशोधन परिषद (वैधानिक सल्लागार मंडळ)',
      authorityEn: 'Statute 14(I), Section 29, MAU 1990 | Chairman: Vice-Chancellor | Member Secretary: Director of Research',
      authorityMr: 'परिनियम १४(१), कलम २९, म.कृ.वि. १९९० | अध्यक्ष: कुलगुरू | सदस्य सचिव: संचालक संशोधन',
      color: 'border-amber-300 bg-amber-50/50',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300',
      descEn: 'Constituted under Clause (V) of Section 29 of Statute No. 14 (I) of MAU Act 1990. Functions as the apex advisory body on all research matters. Formulates long-term research policies, advises the Executive Council, and recommends research infrastructure provisions.',
      descMr: 'महाराष्ट्र कृषी विद्यापीठे परिनियम १९९० मधील नियम १४(१) च्या कलम २९ नुसार ही वैधानिक परिषद स्थापन करण्यात आली आहे. विद्यापीठाच्या सर्व संशोधन धोरणांचा आढावा घेणे, कार्यकारी परिषदेस सल्ला देणे व संशोधन सुविधांची तरतूद करणे हे परिषदेचे कार्य आहे.'
    },
    {
      num: '04',
      month: { en: 'May (वार्षिक मे महिना - चक्रीय आयोजन)', mr: 'मे महिना (चक्रीय)' },
      titleEn: 'Joint AGRESCO (संयुक्त अग्रेस्को)',
      titleMr: 'संयुक्त अग्रेस्को (Joint AGRESCO) — राज्यस्तरीय सर्वोच्च मंच',
      authorityEn: 'Chairman: Hon. Pro-Chancellor (Minister of Agriculture, MS) | Co-Chairmen: Vice-Chancellors of all 4 SAUs',
      authorityMr: 'अध्यक्ष: मा. प्रति-कुलपती (कृषी मंत्री, महाराष्ट्र शासन) | सह-अध्यक्ष: चारही कृषी विद्यापीठांचे कुलगुरू',
      color: 'border-emerald-300 bg-emerald-50/50',
      tagColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      descEn: 'Jointly organized by the 4 State Agricultural Universities (MPKV, PDKV, VNMKV, BSKKV) and MCAER on a rotational basis every May. New crop varieties, farm implements, and package of practices recommended by the Research Review Committees receive final state-wide release approval.',
      descMr: 'महाराष्ट्रातील चारही कृषी विद्यापीठे आणि महाराष्ट्र कृषी शिक्षण व संशोधन परिषद (MCAER) यांच्या संयुक्त विद्यमाने दरवर्षी मे महिन्यात चक्रीय पद्धतीने संयुक्त अग्रेस्कोचे आयोजन केले जाते. येथे मंजूर झालेले वाण व शिफारसी संपूर्ण महाराष्ट्रातील शेतकऱ्यांसाठी अधिकृतरीत्या प्रसारित केल्या जातात.'
    }
  ];

  const councilComposition = [
    { roleEn: 'Chairman', roleMr: 'अध्यक्ष', titleEn: 'Hon. Vice-Chancellor, MPKV Rahuri', titleMr: 'मा. कुलगुरू, म.फु.कृ.वि. राहुरी' },
    { roleEn: 'Member Secretary', roleMr: 'सदस्य सचिव', titleEn: 'Director of Research, MPKV Rahuri', titleMr: 'संचालक संशोधन, म.फु.कृ.वि. राहुरी' },
    { roleEn: 'Statutory Members', roleMr: 'वैधानिक सदस्य', titleEn: 'Director of Instructions, Director of Extension Education', titleMr: 'संचालक शिक्षण, संचालक विस्तार शिक्षण' },
    { roleEn: 'State Representatives', roleMr: 'शासकीय प्रतिनिधी', titleEn: 'Commissioner of Agriculture, Commissioner of Animal Husbandry, Director of Horticulture & Fisheries (Govt. of Maharashtra)', titleMr: 'कृषी आयुक्त, पशुसंवर्धन आयुक्त, संचालक फलोत्पादन व मत्स्यव्यवसाय (महाराष्ट्र शासन)' },
    { roleEn: 'External Experts', roleMr: 'बाह्य तज्ज्ञ सदस्य', titleEn: 'Director of Research from Sister SAU & One Chief Research Officer', titleMr: 'इतर कृषी विद्यापीठाचे संचालक संशोधन व एक मुख्य संशोधन अधिकारी' },
    { roleEn: 'Invitee Members', roleMr: 'निमंत्रित सदस्य', titleEn: 'Director (Research) MCAER, all Heads of Academic Departments, all Associate Directors of Research (ZARS), and Chief Crop Specialists', titleMr: 'संचालक (संशोधन) मकाऊर, सर्व विभाग प्रमुख, सर्व सहयोगी संशोधन संचालक व प्रमुख पीक विशेषज्ज्ञ' }
  ];

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: 'Research Review Mechanism', mr: 'संशोधन पुनरावलोकन यंत्रणा' }} />

      <ResearchHero
        theme="review"
        badge={{ en: 'Statutory 4-Stage Research Pipeline', mr: '४-टप्प्यांची वैधानिक मूल्यमापन यंत्रणा' }}
        title={{
          en: 'Research Review Mechanism — Statutory Scrutiny & Joint AGRESCO',
          mr: 'संशोधन पुनरावलोकन यंत्रणा — वैधानिक मूल्यमापन व संयुक्त अग्रेस्को'
        }}
        subtitle={{
          en: 'A rigorous four-tier quality assurance protocol governed by the Maharashtra Agricultural Universities Act 1990, verifying every variety, implement, and practice before statewide farmer release.',
          mr: 'महाराष्ट्र कृषी विद्यापीठे कायदा १९९० अंतर्गत चालणारी ४-स्तरीय शास्त्रीय चाचणी प्रक्रिया, ज्यातून प्रत्येक वाण व शिफारस पूर्ण तपासूनच शेतकऱ्यांसाठी अधिकृत प्रसारित केली जाते.'
        }}
        quickChips={[
          { label: language === 'mr' ? 'जानेवारी: RRC पुनरावलोकन' : 'January: RRC Review', icon: Calendar },
          { label: language === 'mr' ? 'फेब्रुवारी-मार्च: कार्यक्रम नियोजन' : 'Feb-Mar: Planning', icon: Clock },
          { label: language === 'mr' ? 'परिनियम १४(१): कृषी संशोधन परिषद' : 'Statute 14(1): Research Council', icon: Scale },
          { label: language === 'mr' ? 'मे: संयुक्त अग्रेस्को' : 'May: Joint AGRESCO', icon: Gavel }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 space-y-12">

        {/* 1. Visual 4-Stage Sequential Stepper */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-purple-950 border border-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Clock className="w-3.5 h-3.5 text-purple-700" />
              <span>{language === 'mr' ? 'वार्षिक मूल्यमापन क्रम' : 'Annual Scrutiny Cycle'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === 'mr' ? 'संशोधन शिफारशींचा ४-टप्प्यांचा प्रवास' : 'Four Sequential Stages of Research Validation'}
            </h2>
          </div>

          <div className="space-y-4">
            {stages.map((s, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border ${s.color} bg-white shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6`}
              >
                {/* Stage Indicator & Title */}
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-purple-950 text-amber-300 font-extrabold text-base flex items-center justify-center font-serif shrink-0 shadow-xs">
                    {s.num}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border ${s.tagColor}`}>
                        {language === 'mr' ? s.month.mr : s.month.en}
                      </span>
                      <span className="text-xs font-semibold text-stone-500">
                        Stage {idx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif leading-tight">
                      {language === 'mr' ? s.titleMr : s.titleEn}
                    </h3>

                    <p className="text-xs font-bold text-purple-800">
                      {language === 'mr' ? s.authorityMr : s.authorityEn}
                    </p>

                    <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-medium pt-1">
                      {language === 'mr' ? s.descMr : s.descEn}
                    </p>
                  </div>
                </div>

                {/* Right Side Status Pill */}
                <div className="shrink-0 self-end lg:self-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 text-purple-950 font-bold text-xs border border-purple-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />
                    <span>{language === 'mr' ? 'वैधानिक मंजुरी' : 'Statutory Cleared'}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Agricultural Research Council Statutory Composition Table */}
        <section className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'mr' ? 'परिनियम १४(१) कलम २९' : 'Statute No. 14 (I), Section 29'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'mr' ? 'कृषी संशोधन परिषदेची वैधानिक रचना' : 'Statutory Composition of the Agricultural Research Council'}
              </h2>
            </div>
            <span className="text-xs font-bold text-stone-500">
              Maharashtra Agricultural Universities, 1990
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300 bg-stone-50/80 text-stone-900">
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">{language === 'mr' ? 'पद / हुद्दा' : 'Council Cadre'}</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">{language === 'mr' ? 'वैधानिक सदस्य / अधिकारी' : 'Statutory Office / Representation'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium text-stone-800">
                {councilComposition.map((row, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-purple-950 whitespace-nowrap">
                      {language === 'mr' ? row.roleMr : row.roleEn}
                    </td>
                    <td className="py-3.5 px-4 leading-relaxed">
                      {language === 'mr' ? row.titleMr : row.titleEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Joint AGRESCO & Recommendations Vault Navigation Link */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-emerald-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'mr' ? 'संयुक्त अग्रेस्को कृषी शिफारसी' : 'Joint AGRESCO Outcomes'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              {language === 'mr' ? 'वर्षनिहाय व पीकनिहाय मंजूर कृषी शिफारसी' : 'Browse All Validated Agro Recommendations (2022–2026)'}
            </h3>
            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-medium">
              {language === 'mr'
                ? 'संयुक्त अग्रेस्कोने मंजूर केलेल्या १,५७७+ अधिकृत कृषी शिफारसींचे वर्षनिहाय मराठी व इंग्रजी राजपत्र उपलब्ध.'
                : 'Access 1,577+ official agro recommendations, package of practices, and crop advisories cleared by Joint AGRESCO.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/research/recommendations"
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105 inline-flex items-center gap-2"
            >
              <span>{language === 'mr' ? 'कृषी शिफारसी पहा' : 'View Recommendations'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/research/varieties"
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/20 inline-flex items-center gap-2"
            >
              <span>{language === 'mr' ? 'पीक वाण यादी' : 'Released Varieties'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
