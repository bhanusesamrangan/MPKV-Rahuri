'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  Building2,
  Award,
  Users,
  Sprout,
  Atom,
  Dna,
  Warehouse,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Phone,
  Printer,
  Mail,
  MapPin,
  Trophy,
  Quote
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { printElement } from '@/utils/printElement';
import { EducationBreadcrumb } from './components/EducationBreadcrumb';
import { EducationHero } from './components/EducationHero';

interface EducationAtAGlanceViewProps {
  pageData: any;
}

export const EducationAtAGlanceView: React.FC<EducationAtAGlanceViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<'Diploma' | 'Bachelors' | 'Masters' | 'Doctoral'>('Bachelors');

  // Breadcrumbs
  const breadcrumbItems = pageData?.breadcrumb || [
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Overview & Profile', mr: 'संस्थेची माहिती व रूपरेषा' }, href: '/education/at-a-glance' },
    { title: { en: 'Education at a Glance', mr: 'दृष्टीक्षेपात शिक्षण' } }
  ];

  const heroTitle = pageData?.hero?.title || {
    en: 'Education at a Glance',
    mr: 'दृष्टीक्षेपात शिक्षण'
  };
  const heroSubtitle = pageData?.hero?.subtitle || {
    en: 'First State Agriculture University in Maharashtra established in 1968, pioneering ICAR-accredited quality education across 10 districts of Western Maharashtra.',
    mr: 'महाराष्ट्रातील पहिले राज्य कृषि विद्यापीठ — पश्चिम महाराष्ट्रातील १० जिल्ह्यांमध्ये उच्च दर्जाचे ICAR मान्यताप्राप्त कृषि शिक्षण.'
  };
  const heroBadge = pageData?.hero?.badge || {
    en: 'NAEAB / ICAR Accredited ‘A’ Grade (Score 3.12 / 4.0)',
    mr: 'NAEAB / भा.कृ.अनु.प. मान्यताप्राप्त ‘अ’ श्रेणी (गुण ३.१२ / ४.०)'
  };

  // Official Leadership details matching mpkv.ac.in/Education/AtaGlance
  const directorInfo = pageData?.directorProfile || {
    name: { en: 'Dr. S. B. Kharbade', mr: 'डॉ. एस. बी. खर्बडे' },
    designation: { en: 'I/c Director of Education', mr: 'प्रभारी शिक्षण संचालक' },
    directorate: {
      en: 'Directorate of Education, Mahatma Phule Krishi Vidyapeeth, Rahuri-413722 Dist. Ahilyanagar (MS)',
      mr: 'शिक्षण संचालनालय, महात्मा फुले कृषि विद्यापीठ, राहुरी-४१३७२२ जि. अहिल्यानगर (महाराष्ट्र)'
    },
    phone: '(02426) 243206',
    fax: '(02426) 243 227',
    email: 'deanmpkv@gmail.com',
    image: '/media/images/dr_sb_kharbade.jpg'
  };

  // Stats Counters
  const statsCounters = [
    {
      value: '1,00,000+',
      label: { en: 'Graduates Produced', mr: 'पदवीधर कृषि मनुष्यबळ' },
      sub: { en: 'Leading agriculture globally since 1968', mr: 'स्थापनेपासून विविध क्षेत्रांत कार्यरत' },
      icon: GraduationCap,
      color: 'from-emerald-700 to-emerald-900',
      badge: language === 'mr' ? 'अमृतमहोत्सवी वारसा' : 'Global Alumni'
    },
    {
      value: '14',
      label: { en: 'Constituent Colleges', mr: 'घटक महाविद्यालये' },
      sub: { en: 'Across 10 districts of Western Maharashtra', mr: 'पश्चिम महाराष्ट्रातील १० जिल्ह्यांत' },
      icon: Building2,
      color: 'from-amber-600 to-amber-800',
      badge: language === 'mr' ? '६ विद्याशाखा' : '6 Disciplines'
    },
    {
      value: 'Grade \'A\'',
      label: { en: 'NAEAB / ICAR Rating', mr: 'भा.कृ.अनु.प. मानांकन' },
      sub: { en: 'Score 3.12 / 4.0 (2023–2028 Valid)', mr: '५ वर्षांसाठी ‘अ’ श्रेणी अधिस्वीकृती' },
      icon: Award,
      color: 'from-emerald-800 to-teal-900',
      badge: language === 'mr' ? 'सर्वोच्च गुणवत्ता' : 'Accredited'
    },
    {
      value: '4,560',
      label: { en: 'Annual Diploma Intake', mr: 'वार्षिक पदविका प्रवेश क्षमता' },
      sub: { en: '82 Tech Schools & Polytechnics', mr: '८२ तंत्र विद्यालये व तंत्रनिकेतने' },
      icon: Users,
      color: 'from-stone-700 to-stone-900',
      badge: language === 'mr' ? 'व्यावहारिक शिक्षण' : 'Vocational'
    }
  ];

  // Degree tabs data
  const degreeTabs = [
    {
      id: 'Diploma' as const,
      name: { en: 'Diploma Programmes', mr: 'पदविका अभ्यासक्रम' },
      duration: { en: '2 to 3 Years', mr: '२ ते ३ वर्षे' },
      eligibility: { en: '10th (SSC) Pass', mr: '१० वी उत्तीर्ण' },
      intake: '4,560 Seats',
      link: '/education/diploma',
      highlights: [
        { en: '10 Constituent Agricultural Technology Schools (2-year Marathi medium)', mr: '१० घटक कृषि तंत्र विद्यालये (२ वर्षे, मराठी माध्यम)' },
        { en: '72 Unaided Approved Technology Schools across rural Maharashtra', mr: '७२ विनाअनुदानित मान्यताप्राप्त तंत्र विद्यालये' },
        { en: '3-Year Polytechnic Diploma in Agricultural Technology (English medium)', mr: '३ वर्षे मुदतीचा कृषि तंत्रनिकेतन पदविका अभ्यासक्रम (इंग्रजी माध्यम)' },
        { en: 'Gardener training provided through 2 constituent and 3 unaided centers (200 seats)', mr: 'माळी प्रशिक्षण २ घटक व ३ विनाअनुदानित केंद्रांमार्फत (२०० जागा)' }
      ]
    },
    {
      id: 'Bachelors' as const,
      name: { en: 'Undergraduate Degrees (UG)', mr: 'पदवी अभ्यासक्रम (UG)' },
      duration: { en: '4 Years (8 Semesters)', mr: '४ वर्षे (८ सत्रावधी)' },
      eligibility: { en: '12th Science with MHT-CET / NEET / JEE', mr: '१२ वी विज्ञान (CET / NEET / JEE)' },
      intake: '14 Constituent Colleges | 6 Degrees',
      link: '/education/bachelors',
      highlights: [
        { en: '8 Agriculture Colleges: Pune, Kolhapur, Dhule, Nandurbar, Karad, Muktainagar, Halgaon, Kashti', mr: '८ कृषि महाविद्यालये: पुणे, कोल्हापूर, धुळे, नंदुरबार, कराड, मुक्ताईनगर, हळगाव व काष्टी' },
        { en: '2 Agril. Engineering Colleges: Dr. ASCAET Rahuri & Kashti (Malegaon)', mr: '२ कृषि अभियांत्रिकी महाविद्यालये: डॉ. अण्णासाहेब शिंदे महाविद्यालय राहुरी व काष्टी' },
        { en: '2 Horticulture Colleges at Pune & Kashti (Malegaon)', mr: '२ उद्यानविद्या महाविद्यालये: पुणे व काष्टी (मालेगाव)' },
        { en: '1 Food Technology & 1 Agri Business Management College at Kashti', mr: 'काष्टी (मालेगाव) येथे अन्नतंत्रज्ञान व कृषि व्यवसाय व्यवस्थापन महाविद्यालय' }
      ]
    },
    {
      id: 'Masters' as const,
      name: { en: 'Post-Graduate Degrees (PG)', mr: 'पदव्युत्तर अभ्यासक्रम (PG)' },
      duration: { en: '2 Years (4 Semesters)', mr: '२ वर्षे (४ सत्रावधी)' },
      eligibility: { en: 'Relevant Bachelor’s Degree with MCAER-CET', mr: 'संबंधित पदवी व MCAER-CET प्रवेश परीक्षा' },
      intake: 'PGI Rahuri, Dr. ASCAET, CoA Pune, Dhule, Kolhapur',
      link: '/education/masters-doctoral',
      highlights: [
        { en: 'Post-Graduate Institute (PGI) Rahuri offering M.Sc. (Agri) across 11 disciplines', mr: 'पदव्युत्तर संस्था (PGI) राहुरी येथे ११ शाखांमध्ये एम.एस्सी.' },
        { en: 'Dr. ASCAET Rahuri offering M.Tech. (Agril. Engg) in 5 specialized streams', mr: 'डॉ. अण्णासाहेब शिंदे महाविद्यालयात ५ अभियांत्रिकी शाखांत एम.टेक.' },
        { en: 'M.Sc. (Agri) also offered at College of Agriculture Pune, Dhule, and Kolhapur', mr: 'पुणे, धुळे व कोल्हापूर कृषि महाविद्यालयात एम.एस्सी. अभ्यासक्रम' },
        { en: 'Specialized M.B.A. (Agri Business Management) at College of Agriculture Pune', mr: 'कृषि महाविद्यालय पुणे येथे एम.बी.ए. (कृषि व्यवसाय व्यवस्थापन)' }
      ]
    },
    {
      id: 'Doctoral' as const,
      name: { en: 'Doctoral Research (Ph.D.)', mr: 'आचार्य पदवी संशोधन (Ph.D.)' },
      duration: { en: '3 Years (6 Semesters)', mr: '३ वर्षे (६ सत्रावधी)' },
      eligibility: { en: 'Relevant Master’s Degree with ICAR-JRF/SRF / MCAER', mr: 'संबंधित पदव्युत्तर पदवी' },
      intake: 'Ph.D. in 15+ Disciplines',
      link: '/education/masters-doctoral',
      highlights: [
        { en: 'Advanced Ph.D. research at Post Graduate Institute (PGI) Rahuri in Agriculture', mr: 'पदव्युत्तर संस्था (PGI) राहुरी येथे कृषीच्या सर्व विषयांत पीएच.डी. संशोधन' },
        { en: 'Ph.D. in Agricultural Engineering at Dr. ASCAET Rahuri', mr: 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय राहुरी येथे पीएच.डी.' },
        { en: 'Ph.D. in Agricultural Meteorology at College of Agriculture Pune', mr: 'कृषि हवामानशास्त्रातील विशेष पीएच.डी. (कृषि महाविद्यालय पुणे)' },
        { en: 'Full access to AICRP research plots, Radioisotope lab, and CAAST climate center', mr: 'अखिल भारतीय संशोधन प्रकल्प, रेडिओआयसोटोप लॅब व हवामान संशोधन केंद्राची सुविधा' }
      ]
    }
  ];

  const currentTab = degreeTabs.find(t => t.id === selectedTab) || degreeTabs[1];

  // NEP-2020 Features
  const nepFeatures = [
    {
      title: { en: 'Choice-Based Credit System (CBCS)', mr: 'निवड आधारित श्रेयांक पद्धती (CBCS)' },
      desc: {
        en: 'Flexible interdisciplinary credits allowing students to combine agronomy with AI in agriculture, farm robotics, or financial management.',
        mr: 'विद्यार्थ्यांना त्यांच्या आवडीनुसार ऐच्छिक कौशल्ये, कृत्रिम बुद्धिमत्ता (AI) व वित्तीय व्यवस्थापनाचे आंतरविद्याशाखीय विषय निवडण्याची मुभा.'
      },
      tag: 'Academic Flexibility'
    },
    {
      title: { en: 'Multiple Entry & Exit Options', mr: 'एकाधिक प्रवेश व निर्गमन पर्याय' },
      desc: {
        en: 'Structured through the Academic Bank of Credits (ABC), enabling students to earn recognized undergraduate certificates, diplomas, or degrees.',
        mr: 'अकॅडेमिक बँक ऑफ क्रेडिट्सच्या (ABC) माध्यमातून पदविका, प्रगत पदविका किंवा पदवी प्राप्त करण्याचे लवचिक पर्याय.'
      },
      tag: 'Credit Mobility'
    },
    {
      title: { en: 'Student READY & RAWE Programme', mr: 'स्टुडन्ट रेडी व ग्रामीण कृषि कार्यानुभव (RAWE)' },
      desc: {
        en: 'Hands-on experiential learning: 1 full semester living in villages with farming families and 1 semester industrial internship.',
        mr: 'सहा महिन्यांचा प्रत्यक्ष ग्रामीण शेती कार्यानुभव (RAWE) आणि कृषोद्योगांमध्ये प्रत्यक्ष व्यावसायिक इंटर्नशिप.'
      },
      tag: 'Hands-on Immersion'
    },
    {
      title: { en: 'Commercial Experiential Learning (ELU)', mr: 'व्यावसायिक प्रायोगिक अध्ययन युनिट्स' },
      desc: {
        en: 'Commercial production modules in bio-pesticides, automated greenhouse nursery, seed processing, and bakery product manufacturing.',
        mr: 'जैविक कीटकनाशके, स्वयंचलित रोपवाटिका, बीजोत्पादन आणि प्रक्रिया उद्योगांमधील प्रत्यक्ष व्यावसायिक नफा-तोटा अनुभव.'
      },
      tag: 'Agri-Preneurship'
    }
  ];

  // Infrastructure Bento
  const infraItems = [
    {
      title: { en: 'Hi-Tech Floriculture & Greenhouse Project', mr: 'हाय-टेक पुष्पशेती व संरक्षित शेती प्रकल्प' },
      location: { en: 'College of Agriculture, Pune', mr: 'कृषि महाविद्यालय, पुणे' },
      desc: {
        en: 'Fully automated climate-controlled polyhouses cultivating export-quality Dutch roses, gerberas, and exotic orchids with fertigation training.',
        mr: 'निर्यातक्षम डच गुलाब, जरबेरा व विदेशी फुलांसाठी स्वयंचलित हवामान नियंत्रित हरितगृहे आणि विद्राव्य खत प्रात्यक्षिक केंद्र.'
      },
      icon: Sprout,
      accent: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/40'
    },
    {
      title: { en: 'Radioisotope & Nuclear Agricultural Laboratory', mr: 'रेडिओआयसोटोप व अणुऊर्जा कृषि प्रयोगशाळा' },
      location: { en: 'Central Campus, Rahuri', mr: 'मध्यवर्ती संकुल, राहुरी' },
      desc: {
        en: 'Advanced research using gamma irradiation for crop mutation breeding, tracer kinetics of micronutrients, and soil organic carbon dynamics.',
        mr: 'भाभा अणु संशोधन केंद्राच्या सहकार्याने किरणोत्सारी समस्थानिक, पोषकद्रव्य गतिशीलता आणि उत्परिवर्तन प्रजनन संशोधन.'
      },
      icon: Atom,
      accent: 'border-amber-200 hover:border-amber-400 bg-amber-50/40'
    },
    {
      title: { en: 'Molecular Biology & Tissue Culture Center', mr: 'आण्विक जैवतंत्रज्ञान व उती संवर्धन केंद्र' },
      location: { en: 'Rahuri & Kashti Campuses', mr: 'राहुरी व काष्टी संकुल' },
      desc: {
        en: 'Commercial micropropagation unit producing virus-indexed Grand Naine banana, pomegranate rootstocks, and elite sugarcane varieties.',
        mr: 'जी-९ केळी, डाळिंब व ऊसाच्या रोगमुक्त व उच्च प्रतीच्या रोपांची व्यावसायिक उती संवर्धन निर्मिती प्रयोगशाळा.'
      },
      icon: Dna,
      accent: 'border-teal-200 hover:border-teal-400 bg-teal-50/40'
    },
    {
      title: { en: 'Post-Harvest Technology & Cold-Chain Pilot Plants', mr: 'काढणीपश्चात तंत्रज्ञान व शीतगृह केंद्र' },
      location: { en: 'Central Campus, Rahuri', mr: 'मध्यवर्ती संकुल, राहुरी' },
      desc: {
        en: 'Modern pilot processing plants for fruit pulping, juice extraction, solar dehydrators, modified atmosphere packaging, and cold storage.',
        mr: 'फळे व भाजीपाला प्रक्रिया, ज्यूस निर्मिती, सौर ड्रायर, नियंत्रित वातावरण पॅकेजिंग आणि शीतगृह साठवणूक प्रात्यक्षिक केंद्र.'
      },
      icon: Warehouse,
      accent: 'border-stone-200 hover:border-stone-400 bg-stone-50/60'
    }
  ];

  return (
    <article className="min-h-screen bg-[#faf9f6] text-stone-800">
      {/* 1. Breadcrumb Navigation */}
      <EducationBreadcrumb items={breadcrumbItems} />

      {/* 2. Institutional Hero Section */}
      <EducationHero
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={heroBadge}
        theme="glance"
        quickChips={[
          { label: language === 'mr' ? 'स्थापना १९६८ | पहिले राज्य कृषि विद्यापीठ' : 'Est. 1968 | 1st State Agril. University' },
          { label: language === 'mr' ? 'NAEAB / ICAR "अ" श्रेणी (गुण ३.१२/४.०)' : 'NAEAB / ICAR "A" Grade (3.12 / 4.0)' },
          { label: language === 'mr' ? '१,००,०००+ पदवीधर माजी विद्यार्थी' : '1,00,000+ Skilled Graduates' }
        ]}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-14">
        
        {/* 3. Official Director Profile Card (Matching mpkv.ac.in/Education/AtaGlance) */}
        <section aria-labelledby="director-heading" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Director Photo Frame */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center">
              <div className="relative w-44 h-48 sm:w-48 sm:h-52 rounded-2xl overflow-hidden border-3 border-emerald-700 shadow-md bg-stone-100">
                <Image
                  src={directorInfo.image}
                  alt={getBilingual(directorInfo.name)}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <span className="mt-3 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {getBilingual(directorInfo.designation)}
              </span>
            </div>

            {/* Director Details & Official Contacts */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4">
              <div>
                <h2 id="director-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  {getBilingual(directorInfo.name)}
                </h2>
                <p className="text-sm sm:text-base font-bold text-emerald-800 mt-0.5">
                  {getBilingual(directorInfo.designation)}
                </p>
                <div className="flex items-start gap-2 mt-1.5 text-xs sm:text-sm text-stone-600">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{getBilingual(directorInfo.directorate)}</span>
                </div>
              </div>

              {/* Direct Phone, Fax & Email Badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`tel:${directorInfo.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold border border-stone-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>{directorInfo.phone}</span>
                </a>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-100 text-stone-800 text-xs sm:text-sm font-semibold border border-stone-200">
                  <Printer className="w-4 h-4 text-amber-700" />
                  <span>{language === 'mr' ? 'फॅक्स: ' : 'Fax: '}{directorInfo.fax}</span>
                </div>
                <a
                  href={`mailto:${directorInfo.email}`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold border border-emerald-200 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-700" />
                  <span>{directorInfo.email}</span>
                </a>
              </div>

              {/* Official Introductory Text from mpkv.ac.in */}
              <div className="pt-3 border-t border-stone-100 text-xs sm:text-sm text-stone-700 leading-relaxed space-y-2">
                <p>
                  {language === 'mr'
                    ? 'महात्मा फुले कृषि विद्यापीठ, राहुरी हे महाराष्ट्रातील पहिले राज्य कृषि विद्यापीठ असून त्याची स्थापना १९६८ मध्ये झाली. विद्यापीठाचे कार्यक्षेत्र पश्चिम महाराष्ट्रातील १० जिल्ह्यांमध्ये पसरलेले आहे. विद्यापीठाच्या शैक्षणिक उपक्रमांचे नेतृत्व करण्याची जबाबदारी शिक्षण संचालकांकडे आहे.'
                    : 'Mahatma Phule Krishi Vidyapeeth, Rahuri is the first State Agriculture University in Maharashtra established in 1969 having its jurisdiction in 10 districts of Western Maharashtra. Director of Instruction shoulders the responsibility of leading the education of the University.'}
                </p>
                <p>
                  {language === 'mr'
                    ? 'सर्व घटक व संलग्न महाविद्यालये आणि तंत्र विद्यालयांमधील अभ्यासक्रम रचना, शैक्षणिक गुणवत्ता, मार्गदर्शन आणि विद्याशाखांचे अधिष्ठाता व विभागप्रमुखांशी समन्वय साधून शैक्षणिक नियोजन करण्याची जबाबदारी शिक्षण संचालनालय पार पाडते.'
                    : 'Director of Instruction is responsible for preparing the academic programme as regards to courses offered, curricula and co-ordinate and guide education, in all the constituent and affiliated colleges, technical schools of the University in close co-operation with the Deans of Faculties, Head of Departments and other officers.'}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Stats Counter Grid */}
        <section aria-labelledby="education-stats-heading">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {statsCounters.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="relative group bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.color}`} />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                      {stat.value}
                    </span>
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-stone-900">
                    {getBilingual(stat.label)}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-stone-500 leading-relaxed">
                    {getBilingual(stat.sub)}
                  </p>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                    <span>{stat.badge}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Official Mandate Card */}
        <section aria-labelledby="mandate-heading">
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-[#04361e] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold tracking-wide">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'mr' ? 'विद्यापीठाचा मुख्य शैक्षणिक उद्देश' : 'University Educational Mandate'}</span>
                </div>
                <h2 id="mandate-heading" className="text-xl sm:text-2xl font-bold text-white">
                  {language === 'mr'
                    ? 'दर्जेदार कृषि शिक्षण व सक्षम तंत्रकुशल मनुष्यबळ निर्मिती'
                    : 'Pioneering Quality Education & Skilled Agricultural Human Resource'}
                </h2>
                <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
                  {language === 'mr'
                    ? 'कृषि व संलग्न विद्याशाखांमध्ये पदविका, पदवी, पदव्युत्तर व आचार्य पदवी स्तरावर उच्च दर्जाचे शिक्षण देणे, कौशल्य विकास साधणे आणि देशासाठी सक्षम कृषि मनुष्यबळ निर्माण करणे हा विद्यापीठाचा मुख्य उद्देश आहे.'
                    : 'The mandate is to provide Diploma, Graduate, Post-graduate and Doctorate level quality education in agriculture and allied fields for skill development and producing the competent human resource.'}
                </p>
              </div>
              <div className="shrink-0 flex flex-col gap-2.5 w-full md:w-auto">
                <Link
                  href="/education/constituent-colleges"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-sm transition-all shadow-sm"
                >
                  <span>{language === 'mr' ? 'घटक महाविद्यालये पहा' : 'View Constituent Colleges'}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/education/regulations"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/20"
                >
                  <BookOpen className="w-4 h-4 text-emerald-300" />
                  <span>{language === 'mr' ? 'शैक्षणिक नियमावली' : 'Academic Regulations'}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Degree Programs Interactive Matrix */}
        <section aria-labelledby="degrees-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'mr' ? 'अभ्यासक्रम व पदव्या' : 'Comprehensive Academic Pathways'}</span>
              </div>
              <h2 id="degrees-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {language === 'mr' ? 'पदविका ते आचार्य पदवीपर्यंतचे शैक्षणिक टप्पे' : 'Degree Programs Matrix (Diploma to Ph.D.)'}
              </h2>
            </div>
            <button
              onClick={() => printElement('education-degrees-matrix-printable', language === 'mr' ? 'मफुकृवि पदवी अभ्यासक्रम व क्षमता तक्ता' : 'MPKV Degree Programs Matrix (Diploma to Ph.D.)')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer shrink-0 self-start sm:self-auto no-print"
              title={language === 'mr' ? 'अभ्यासक्रम तक्ता प्रिंट करा' : 'Print Degree Matrix'}
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
            {degreeTabs.map((tab) => {
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <span>{getBilingual(tab.name)}</span>
                </button>
              );
            })}
          </div>

          <div id="education-degrees-matrix-printable">
          {/* Tab Content Box */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
              
              {/* Left Column: Quick Metadata Badges */}
              <div className="space-y-4 lg:border-r lg:border-stone-200 lg:pr-6">
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    {language === 'mr' ? 'अभ्यासक्रमाचा स्तर' : 'Degree Level'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                    {getBilingual(currentTab.name)}
                  </h3>
                </div>

                <div className="bg-emerald-50/70 rounded-xl p-3.5 border border-emerald-200 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-600">{language === 'mr' ? 'कालावधी:' : 'Duration:'}</span>
                    <span className="font-bold text-emerald-900">{getBilingual(currentTab.duration)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-600">{language === 'mr' ? 'प्रवेश क्षमता / संकुले:' : 'Capacity / Campuses:'}</span>
                    <span className="font-bold text-emerald-900">{currentTab.intake}</span>
                  </div>
                  <div className="flex justify-between items-start text-xs pt-1 border-t border-emerald-200">
                    <span className="text-stone-600">{language === 'mr' ? 'पात्रता:' : 'Eligibility:'}</span>
                    <span className="font-bold text-stone-800 text-right max-w-[170px]">{getBilingual(currentTab.eligibility)}</span>
                  </div>
                </div>

                <Link
                  href={currentTab.link}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs"
                >
                  <span>{language === 'mr' ? 'सविस्तर अभ्यासक्रम पहा' : 'Explore Detailed Syllabus'}</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              {/* Right Column: Highlights & Program Offerings */}
              <div className="lg:col-span-2 space-y-4">
                <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{language === 'mr' ? 'अभ्यासक्रमाची प्रमुख वैशिष्ट्ये व संकुले' : 'Key Highlights & Campus Allocations'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentTab.highlights.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                        {getBilingual(point)}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-stone-500 pt-2 italic">
                  {language === 'mr'
                    ? '* अधिकृत प्रवेश प्रक्रिया महाराष्ट्र राज्य कृषि शिक्षण व संशोधन परिषद (MCAER), पुणे द्वारे ऑनलाईन गुणवत्ता फेरीतून राबविली जाते.'
                    : '* Centralized admissions are conducted by the Maharashtra Council of Agricultural Education and Research (MCAER), Pune via online merit counselling.'}
                </p>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* 7. NEP-2020 Implementation Showcase */}
        <section aria-labelledby="nep-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'mr' ? 'राष्ट्रीय शैक्षणिक धोरण' : 'Transformative Academic Reform'}</span>
              </div>
              <h2 id="nep-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {language === 'mr'
                  ? 'राष्ट्रीय शैक्षणिक धोरण (NEP-2020) ची प्रभावी अंमलबजावणी'
                  : 'NEP-2020 Implementation & VI Deans Committee Reforms'}
              </h2>
            </div>
            <span className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg bg-emerald-100/70 text-emerald-900 border border-emerald-200 shrink-0">
              {language === 'mr' ? 'पदवी: २०२४-२५ | पदव्युत्तर: २०२२-२३' : 'UG: 2024-25 | PG: 2022-23'}
            </span>
          </div>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-4xl">
            {language === 'mr'
              ? 'भारतीय कृषि अनुसंधान परिषद (ICAR) च्या ६ व्या अधिष्ठाता समितीच्या शिफारशींनुसार मफुकृवि राहुरीने पदवी अभ्यासक्रमात बहुविद्याशाखीय लवचिकता, चॉईस-बेस्ड क्रेडिट सिस्टिम आणि ग्रामीण शेती कार्यानुभव यांचा परिपूर्ण मेळ साधला आहे. तसेच NCG शिफारशींनुसार २०२२-२३ पासून पदव्युत्तर अभ्यासक्रमात सुधारणा केली आहे.'
              : 'Undergraduate curriculum is revised in line with NEP-2020 as per the VI Deans recommendation, implemented from 2024-25 (flexibility, choice based credit system, multiple entry exit system, skill enhancement courses, internship and Student READY program). Post-graduate programme is revised as per NCG recommendations, implemented from 2022-23.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {nepFeatures.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {getBilingual(item.title)}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {getBilingual(item.desc)}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'mr' ? 'सक्रिय प्रणाली' : 'Active System'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Educational Infrastructure Bento Grid */}
        <section aria-labelledby="infra-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
                <Building2 className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'mr' ? 'अत्याधुनिक प्रक्षेत्रे व प्रयोगशाळा' : 'World-Class Training Infrastructure'}</span>
              </div>
              <h2 id="infra-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {language === 'mr' ? 'उच्च तंत्रज्ञानावर आधारित शैक्षणिक सुविधा' : 'High-Tech Educational Infrastructure'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {infraItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border p-6 transition-all duration-300 hover:shadow-md flex flex-col justify-between ${item.accent}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-3 rounded-xl bg-white border border-stone-200 text-emerald-800 shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-stone-600 border border-stone-200">
                        {getBilingual(item.location)}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                      {getBilingual(item.title)}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {getBilingual(item.desc)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. Student Achievements & Extracurricular Excellence (Paragraph 63 from official page) */}
        <section aria-labelledby="student-excellence-heading">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-amber-500/15 border border-amber-400 text-amber-800 flex items-center justify-center shrink-0">
                <Trophy className="w-10 h-10 text-amber-600" />
              </div>
              <div className="space-y-2 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                  <span>{language === 'mr' ? 'विद्यार्थी यश व सर्वंकष विकास' : 'Student Excellence & Extracurricular Achievements'}</span>
                </div>
                <h3 id="student-excellence-heading" className="text-lg sm:text-xl font-bold text-stone-900">
                  {language === 'mr' ? 'स्पर्धा परीक्षा, शिष्यवृत्ती व क्रीडा क्षेत्रात अग्रगण्य' : 'Excelling in National Competitive Exams, JRF/SRF, GATE & Sports'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {language === 'mr'
                    ? 'विद्यापीठातील विद्यार्थ्यांना शैक्षणिक, सामाजिक आणि सांस्कृतिक उपक्रमांमध्ये सहभागासाठी प्रोत्साहन दिले जाते. परिणामी विद्यार्थ्यांनी लोकसेवा स्पर्धा परीक्षा (UPSC/MPSC), SRF, JRF फेलोशिप, GATE, कृषी वैज्ञानिक भरती मंडळ (ARS) आणि क्रीडा, NCC, NSS अशा विविध क्षेत्रांत उल्लेखनीय यश मिळवले आहे.'
                    : 'The students are encouraged for participation in various educational, social and cultural activities. As a result, the students of this University have excelled in various public service competitive examinations, SRF, JRF fellowships, GATE, ARS and extracurricular activities like sports, NCC, NSS etc. Leading to innovative research and Lab to Land extension for the second Green Revolution.'}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-emerald-800">
                  <Link href="/education/profile" className="hover:underline flex items-center gap-1">
                    <span>{language === 'mr' ? 'संस्थात्मक संरचना व प्रशासन →' : 'View Organizational Profile →'}</span>
                  </Link>
                  <Link href="/education/thrust-areas" className="hover:underline flex items-center gap-1">
                    <span>{language === 'mr' ? 'शैक्षणिक प्राधान्यक्रम →' : 'View Thrust Areas →'}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
};
