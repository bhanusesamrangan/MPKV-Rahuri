'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Building,
  Award,
  BookOpen,
  Mail,
  Phone,
  Printer,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { printElement } from '@/utils/printElement';
import { EducationBreadcrumb } from './components/EducationBreadcrumb';
import { EducationHero } from './components/EducationHero';
import { OrganizationalTreeDiagram } from './components/OrganizationalTreeDiagram';

interface OrganizationalProfileViewProps {
  pageData: any;
}

export const OrganizationalProfileView: React.FC<OrganizationalProfileViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();

  const breadcrumbItems = pageData?.breadcrumb || [
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Overview & Profile', mr: 'संस्थेची माहिती व रूपरेषा' }, href: '/education/at-a-glance' },
    { title: { en: 'Organizational Profile', mr: 'संस्थात्मक संरचना' } }
  ];

  const heroTitle = pageData?.hero?.title || {
    en: 'Academic Leadership & Governance Framework',
    mr: 'शैक्षणिक प्रशासन व संस्थात्मक संरचना'
  };
  const heroSubtitle = pageData?.hero?.subtitle || {
    en: 'Structured academic governance under the Directorate of Instruction, Board of Studies, Academic Council, and Faculty Deans.',
    mr: 'शिक्षण संचालनालय, विद्या परिषद, अभ्यास मंडळे आणि अधिष्ठाता यांच्या समन्वयातून चालणारी विद्यापीठाची शैक्षणिक प्रशासन व्यवस्था.'
  };
  const heroBadge = pageData?.hero?.badge || {
    en: 'Directorate of Instruction & Faculty Deans',
    mr: 'शिक्षण संचालनालय व विद्याशाखा प्रशासन'
  };

  const roles = [
    {
      en: 'Formulating academic policies, regulations, and curricula for all 14 constituent and 64 affiliated colleges.',
      mr: 'सर्व १४ घटक आणि ६४ संलग्न महाविद्यालयांसाठी शैक्षणिक धोरणे, नियमावली व अभ्यासक्रम तयार करणे.'
    },
    {
      en: 'Coordinating undergraduate, post-graduate, doctoral, and diploma programmes in line with ICAR standards.',
      mr: 'भा.कृ.अनु.प. च्या मानकांनुसार पदवी, पदव्युत्तर, आचार्य पदवी व पदविका अभ्यासक्रमांचे संचलन व सनियंत्रण.'
    },
    {
      en: 'Convening the Academic Council, Board of Studies, and overseeing centralized semester examination systems.',
      mr: 'विद्या परिषद व अभ्यास मंडळांच्या बैठकांचे आयोजन आणि सत्रांत परीक्षा मूल्यमापन प्रणालीवर देखरेख.'
    },
    {
      en: 'Monitoring quality assurance, NAEAB accreditation, and faculty pedagogical development training programmes.',
      mr: 'शैक्षणिक गुणवत्ता हमी, नॅक/आयसीएआर अधिस्वीकृती आणि प्राध्यापक प्रशिक्षण उपक्रमांचे संचालन.'
    }
  ];

  const governanceBodies = [
    {
      title: { en: 'Academic Council', mr: 'विद्या परिषद' },
      level: { en: 'Apex Academic Authority', mr: 'सर्वोच्च शैक्षणिक प्राधिकरण' },
      desc: {
        en: 'The supreme statutory academic authority responsible for prescribing syllabi, academic regulations, examination conduct, degree approvals, and academic policy.',
        mr: 'अभ्यासक्रम, शैक्षणिक नियम, परीक्षा पद्धती, पदवी मान्यता आणि धोरणात्मक निर्णय घेणारी विद्यापीठाची सर्वोच्च वैधानिक शैक्षणिक संस्था.'
      },
      members: {
        en: 'Hon\'ble Vice-Chancellor (Chairman), Director of Instruction, Deans of Faculties, Associate Deans, Academic Directors, and ICAR Nominees.',
        mr: 'मा. कुलगुरू (अध्यक्ष), शिक्षण संचालक, सर्व विद्याशाखांचे अधिष्ठाता, सहयोगी अधिष्ठाता, प्राध्यापक प्रतिनिधी व भा.कृ.अनु.प. नामनिर्देशित सदस्य.'
      },
      badge: 'Supreme Statutory Body'
    },
    {
      title: { en: 'Board of Studies', mr: 'अभ्यास मंडळे' },
      level: { en: 'Subject & Curricula Formulation', mr: 'विषयनिहाय अभ्यासक्रम रचना' },
      desc: {
        en: 'Subject-specific statutory bodies drafting detailed curricula, course credit allocations, laboratory practical manuals, and panel of examiners.',
        mr: 'प्रत्येक विषयानुसार तपशीलवार अभ्यासक्रम, श्रेयांक वाटप, प्रात्यक्षिक पुस्तिका व परीक्षकांची यादी तयार करणारी तज्ज्ञ समिती.'
      },
      members: {
        en: 'Heads of Departments, Senior Subject Professors, and Renowned External Academic Specialists.',
        mr: 'संबंधित विभागप्रमुख, ज्येष्ठ प्राध्यापक व राष्ट्रीय स्तरावरील बाह्य शिक्षणतज्ज्ञ.'
      },
      badge: 'Subject Experts'
    },
    {
      title: { en: 'Faculty of Agriculture', mr: 'कृषि विद्याशाखा' },
      level: { en: 'Faculty Governance', mr: 'विद्याशाखा प्रशासन' },
      desc: {
        en: 'Administers 11 fundamental agricultural departments, 8 constituent agricultural colleges, and post-graduate institute programmes.',
        mr: '११ मूलभूत कृषि विभाग, ८ घटक कृषि महाविद्यालये आणि पदव्युत्तर संशोधन संस्थांचे शैक्षणिक संचलन.'
      },
      members: {
        en: 'Dean (Faculty of Agriculture), Heads of Departments, and Academic Staff.',
        mr: 'अधिष्ठाता (कृषि), सर्व विभागप्रमुख व प्राध्यापकवृंद.'
      },
      badge: '11 Departments'
    },
    {
      title: { en: 'Faculty of Agricultural Engineering', mr: 'कृषि अभियांत्रिकी विद्याशाखा' },
      level: { en: 'Engineering Governance', mr: 'अभियांत्रिकी प्रशासन' },
      desc: {
        en: 'Directs agricultural engineering education across Dr. ASCAET Rahuri and Kashti colleges in 5 specialized disciplines.',
        mr: 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय राहुरी व काष्टी येथील ५ अभियांत्रिकी शाखांचे शैक्षणिक नेतृत्व.'
      },
      members: {
        en: 'Associate Dean (Dr. ASCAET), Division Heads, and Workshop Superintendents.',
        mr: 'सहयोगी अधिष्ठाता, सर्व अभियांत्रिकी विभागप्रमुख व कार्यशाळा अधीक्षक.'
      },
      badge: '5 Engineering Streams'
    }
  ];

  return (
    <article className="min-h-screen bg-[#faf9f6] text-stone-800">
      <EducationBreadcrumb items={breadcrumbItems} />
      <EducationHero
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={heroBadge}
        theme="profile"
        quickChips={[
          { label: language === 'mr' ? 'शिक्षण संचालनालय' : 'Directorate of Education' },
          { label: language === 'mr' ? 'सर्वोच्च विद्या परिषद' : 'Supreme Academic Council' },
          { label: language === 'mr' ? 'विषयनिहाय अभ्यास मंडळे' : 'Subject Boards of Studies' }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-16">
        
        {/* 1. Directorate Leadership Card */}
        <section aria-labelledby="leadership-profile-heading">
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="h-2 bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-900" />
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Profile Card Left */}
                <div className="lg:border-r lg:border-stone-200 lg:pr-8 space-y-4">
                  <div className="relative w-36 h-40 rounded-2xl overflow-hidden border-2 border-emerald-700 shadow-md bg-stone-100 mx-auto lg:mx-0">
                    <Image
                      src="/media/images/dr_sb_kharbade.jpg"
                      alt={language === 'mr' ? 'डॉ. एस. बी. खर्बडे' : 'Dr. S. B. Kharbade'}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {language === 'mr' ? 'प्रभारी शिक्षण संचालक' : 'I/c Director of Education'}
                    </span>
                    <h2 id="leadership-profile-heading" className="text-xl sm:text-2xl font-bold text-stone-900 mt-2">
                      {language === 'mr' ? 'डॉ. एस. बी. खर्बडे' : 'Dr. S. B. Kharbade'}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                      {language === 'mr' ? 'शिक्षण संचालनालय, मफुकृवि राहुरी' : 'Directorate of Education, MPKV Rahuri'}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs sm:text-sm text-stone-600">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{language === 'mr' ? 'मफुकृवि मध्यवर्ती संकुल, राहुरी, जि. अहिल्यानगर - ४१३७२२' : 'Rahuri-413722 Dist. Ahilyanagar (MS)'}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                      <a href="tel:02426243206" className="text-stone-800 hover:text-emerald-800 font-semibold">
                        (02426) 243206
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Printer className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{language === 'mr' ? 'फॅक्स: ' : 'Fax: '}(02426) 243 227</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                      <a href="mailto:deanmpkv@gmail.com" className="text-emerald-800 font-semibold hover:underline">
                        deanmpkv@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Statutory Roles & Responsibilities Right */}
                <div className="lg:col-span-2 space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-600" />
                      <span>{language === 'mr' ? 'शिक्षण संचालनालयाची प्रमुख वैधानिक कर्तव्ये' : 'Key Statutory Duties & Responsibilities'}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                      {language === 'mr'
                        ? 'महाराष्ट्र कृषि विद्यापीठे कायदा १९८३ अन्वये शिक्षण संचालक विद्यापीठातील सर्व शैक्षणिक उपक्रमांचे मुख्य समन्वयक म्हणून कार्य करतात.'
                        : 'Under the Maharashtra Agricultural Universities Act 1983, the Director of Instruction acts as the chief academic coordinator guiding curricular standards.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {roles.map((role, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                            {getBilingual(role)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href="/education/at-a-glance"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm transition-colors shadow-xs"
                    >
                      <span>{language === 'mr' ? 'दृष्टीक्षेपात शिक्षण' : 'Education at a Glance'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/education/regulations"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs sm:text-sm border border-stone-300 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-stone-600" />
                      <span>{language === 'mr' ? 'शैक्षणिक नियमावली' : 'Academic Regulations'}</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Organizational Tree Diagram */}
        <OrganizationalTreeDiagram />

        {/* 3. Statutory Academic Governance Framework */}
        <section aria-labelledby="governance-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'mr' ? 'वैधानिक संरचना' : 'Statutory Governance Structure'}</span>
              </div>
              <h2 id="governance-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {language === 'mr' ? 'शैक्षणिक निर्णय व नियमन प्राधिकरणे' : 'Academic Decision-Making & Regulatory Councils'}
              </h2>
            </div>
            <button
              onClick={() => printElement('governance-framework-printable', language === 'mr' ? 'मफुकृवि शिक्षण संचालनालय प्रशासकीय रचना' : 'Directorate of Education Governance Framework')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer shrink-0 self-start sm:self-auto no-print"
              title={language === 'mr' ? 'संरचना प्रिंट करा' : 'Print Governance Structure'}
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
            </button>
          </div>

          <div id="governance-framework-printable">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {governanceBodies.map((body, bIdx) => (
              <div
                key={bIdx}
                className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {body.badge}
                    </span>
                    <span className="text-xs font-medium text-stone-500">
                      {getBilingual(body.level)}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    {getBilingual(body.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {getBilingual(body.desc)}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 space-y-1">
                  <span className="text-xs font-bold text-stone-700">
                    {language === 'mr' ? 'रचना व सदस्य:' : 'Composition & Members:'}
                  </span>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {getBilingual(body.members)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

      </div>
    </article>
  );
};
