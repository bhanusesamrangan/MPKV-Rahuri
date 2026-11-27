'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  Award,
  Globe2,
  ExternalLink,
  ChevronRight,
  Home,
  CheckCircle2,
  HeartHandshake,
  BookOpen,
  DollarSign,
  Building,
  Sparkles,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AlumniPortalViewProps {
  pageData?: any;
}

export const AlumniPortalView: React.FC<AlumniPortalViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();

  const alumniAssociations = [
    {
      id: 'pune',
      college: { en: 'College of Agriculture, Pune Alumni Association', mr: 'कृषि महाविद्यालय, पुणे माजी विद्यार्थी संघ' },
      campus: { en: 'Shivajinagar, Pune', mr: 'शिवाजीनगर, पुणे' },
      established: '1907',
      legacy: {
        en: 'Over 117 years of historic leadership. The mother institution of agricultural education in Western India with an illustrious global fraternity.',
        mr: '११७ वर्षांहून अधिक समृद्ध ऐतिहासिक परंपरा. पश्चिम भारतातील कृषी शिक्षणाची मातृसंस्था व जगभर विस्तारलेला प्रतिष्ठित माजी विद्यार्थी वर्ग.'
      },
      website: 'https://acpune.co.in/index.php/student/alumni-association/',
      portalLabel: 'acpune.co.in',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300'
    },
    {
      id: 'dhule',
      college: { en: 'College of Agriculture, Dhule Alumni Association', mr: 'कृषि महाविद्यालय, धुळे माजी विद्यार्थी संघ' },
      campus: { en: 'Dhule Campus (Khandesh Region)', mr: 'धुळे कॅम्पस (खान्देश विभाग)' },
      established: '1960',
      legacy: {
        en: 'Premier hub for dryland farming leadership, bajra breeding pioneers, and agribusiness entrepreneurs across North Maharashtra.',
        mr: 'उत्तर महाराष्ट्रातील कोरडवाहू शेतीचे नेतृत्व, बाजरी पैदास तंत्रज्ञान व कृषी उद्योजक घडवणारी अग्रणी संस्था.'
      },
      website: 'https://www.acdhule.edu.in/index.php?navFile=bcwCanvasShow&TYP=Alumni',
      portalLabel: 'acdhule.edu.in',
      tagColor: 'bg-emerald-100 text-emerald-950 border-emerald-300'
    },
    {
      id: 'kolhapur',
      college: { en: 'R. C. S. M. College of Agriculture, Kolhapur Alumni', mr: 'रा.छ.शा.म. कृषि महाविद्यालय, कोल्हापूर माजी विद्यार्थी संघ' },
      campus: { en: 'Kasaba Bawada, Kolhapur', mr: 'कसबा बावडा, कोल्हापूर' },
      established: '1963',
      legacy: {
        en: 'Named after the legendary Rajarshi Chhatrapati Shahu Maharaj, pioneering sugarcane agronomists and cooperative leaders.',
        mr: 'राजर्षी छत्रपती शाहू महाराजांच्या प्रेरणेतून स्थापन, ऊस शेती तंत्रज्ञान व सहकार क्षेत्रातील दीपस्तंभ माजी विद्यार्थी.'
      },
      website: 'https://www.ackolhapur.edu.in/alumni/',
      portalLabel: 'ackolhapur.edu.in',
      tagColor: 'bg-rose-100 text-rose-950 border-rose-300'
    },
    {
      id: 'caet',
      college: { en: 'Dr. A.S. College of Agril. Engg. & Tech. Alumni (Agroneers)', mr: 'डॉ. अ.शि. कृषि अभियांत्रिकी व तंत्रज्ञान महाविद्यालय माजी विद्यार्थी संघ' },
      campus: { en: 'Rahuri Central Campus', mr: 'राहुरी मध्यवर्ती कॅम्पस' },
      established: '1969',
      legacy: {
        en: 'The legendary "Agroneers" network leading farm mechanization, micro-irrigation automation, and corporate agricultural engineering globally.',
        mr: 'जागतिक स्तरावर कृषी यांत्रिकीकरण, ठिबक सिंचन ऑटोमेशन आणि औद्योगिक अभियांत्रिकीचे नेतृत्व करणारा अग्रगण्य "Agroneers" संघ.'
      },
      website: 'http://www.agroneersrahuri.org',
      portalLabel: 'agroneersrahuri.org',
      tagColor: 'bg-cyan-100 text-cyan-950 border-cyan-300'
    },
    {
      id: 'pgi',
      college: { en: 'Post Graduate Institute (PGI), Rahuri Alumni Association', mr: 'पदव्युत्तर महाविद्यालय (PGI), राहुरी माजी विद्यार्थी संघ' },
      campus: { en: 'PGI Campus, Rahuri', mr: 'पीजीआय परिसर, राहुरी' },
      established: '1972',
      legacy: {
        en: 'Apex postgraduate and doctoral scholars heading ICAR national research institutes, CGIAR international centers, and state vice-chancellorships.',
        mr: 'सर्वोच्च पदव्युत्तर व आचार्य पदवीधर — राष्ट्रीय व आंतरराष्ट्रीय कृषी संशोधन संस्थांचे संचालक व कुलगुरू पदे भूषवणारे शास्त्रज्ञ.'
      },
      website: 'https://forms.gle/o683q2NqRjbhfa4E7',
      portalLabel: 'Google Registration Desk',
      tagColor: 'bg-purple-100 text-purple-950 border-purple-300'
    }
  ];

  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen text-slate-800">
      
      {/* 1. Breadcrumb Strip */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <div className="w-full max-w-[1720px] mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
          <Link href="/" className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md">
            {language === 'mr' ? 'माजी विद्यार्थी दालन' : 'Alumni Portal'}
          </span>
        </div>
      </div>

      {/* 2. Hero Header: Collegiate Burgundy & Imperial Gold Heritage */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-5.5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#380e18] via-[#4a1220] to-[#24080f] text-white p-5 sm:p-6 lg:p-7 shadow-xl border border-rose-900/40">
          
          {/* Subtle Ambient Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-4xl">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {language === 'mr'
                  ? '५०,०००+ कृषी पदवीधर, शास्त्रज्ञ व उद्योजकांचा जागतिक मंच'
                  : 'A Century of Agricultural Leadership Across the Globe'}
              </h1>

              <p className="text-rose-100/90 text-xs sm:text-sm leading-relaxed font-normal max-w-2xl">
                {language === 'mr'
                  ? 'महात्मा फुले कृषि विद्यापीठाच्या माजी विद्यार्थ्यांनी भारतीय कृषी संशोधन परिषद (ICAR), जागतिक अन्न व कृषी संघटना (FAO), नागरी सेवा (IAS/IFS), कृषी उद्योग आणि शेतकरी चळवळीत देदीप्यमान योगदान दिले आहे.'
                  : 'Connecting over 50,000 distinguished alumni serving in apex scientific institutions, administrative civil services, multinational agribusiness, and pioneering farming movements worldwide.'}
              </p>

              {/* Heritage Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {[
                  { value: '50,000+', label: { en: 'Alumni Worldwide', mr: 'जागतिक माजी विद्यार्थी' } },
                  { value: '117+ Yrs', label: { en: 'Historic Legacy', mr: 'ऐतिहासिक वारसा' } },
                  { value: '30+ Nations', label: { en: 'Global Presence', mr: 'देशांत कार्यरत' } },
                  { value: '5 Active Wings', label: { en: 'Registered Chapters', mr: 'नोंदणीकृत संघटना' } }
                ].map((stat, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                    <div className="text-base sm:text-lg font-black text-amber-300">{stat.value}</div>
                    <div className="text-[10px] text-rose-200 mt-0.5">{getBilingual(stat.label)}</div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 3. Call to Action: Join / Register in the Directory */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-slate-950 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-amber-400">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-950">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'mr' ? 'माजी विद्यार्थी नोंदणी आवाहन' : 'Official Alumni Registration Drive'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              {language === 'mr' ? 'आपल्या महाविद्यालयाच्या माजी विद्यार्थी संघात आजच सामील व्हा!' : 'Reconnect with Your Alma Mater & Mentor Future Agricultural Pioneers'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-900/90 leading-relaxed font-medium">
              {language === 'mr'
                ? 'आपल्या बॅचमधील वर्गमित्रांशी संपर्क प्रस्थापित करा, विद्यार्थ्यांना मार्गदर्शन करा आणि विद्यापीठाच्या विकास उपक्रमांत सहभागी व्हा.'
                : 'Join the global directory, access alumni networking directories, offer scholarships, and help guide the next generation of farmers and researchers.'}
            </p>
          </div>

          <a
            href="https://forms.gle/o683q2NqRjbhfa4E7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-bold text-xs sm:text-sm transition-all shadow-lg shrink-0 cursor-pointer"
          >
            <span>{language === 'mr' ? 'माजी विद्यार्थी नोंदणी फॉर्म भरा' : 'Register in Alumni Directory'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 4. Constituent College Alumni Associations (5 Individual Chapters) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-12">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {language === 'mr' ? 'घटक महाविद्यालयांच्या अधिकृत माजी विद्यार्थी संघटना' : 'Constituent College Alumni Associations'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {language === 'mr' ? '५ नोंदणीकृत दालने' : '5 Registered Chapters'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {alumniAssociations.map((assoc) => (
            <div
              key={assoc.id}
              className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${assoc.tagColor}`}>
                    Est. {assoc.established}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span>{getBilingual(assoc.campus)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-900 transition-colors leading-snug">
                    {getBilingual(assoc.college)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {getBilingual(assoc.legacy)}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <a
                  href={assoc.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-100 text-xs font-bold transition-colors shadow-2xs group/btn"
                >
                  <span>{language === 'mr' ? 'अधिकृत पोर्टल उघडा' : 'Visit Association Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
                <span className="text-[11px] font-mono text-slate-400">
                  {assoc.portalLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Four Core Pillars of Alumni Impact */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16">
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {language === 'mr' ? 'माजी विद्यार्थ्यांचे विद्यापीठ विकास योगदान' : 'Pillars of Alumni Engagement & Impact'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              {language === 'mr'
                ? 'माजी विद्यार्थी संघटनांद्वारे राबवले जाणारे मार्गदर्शक उपक्रम, शिष्यवृत्ती व प्रगत शैक्षणिक सहकार्य.'
                : 'How MPKV alumni actively give back to enrich the learning experience of current scholars.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: { en: 'Student Mentorship', mr: 'विद्यार्थी मार्गदर्शन' },
                desc: { en: 'Personal guidance for UPSC, MPSC, ICAR-JRF, and foreign university fellowships.', mr: 'युपीएससी, एमपीएससी, आयसीएआर व परदेशी शिक्षणासाठी तज्ज्ञ मार्गदर्शन.' },
                icon: Users,
                color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
              },
              {
                title: { en: 'Endowed Scholarships', mr: 'गुणवत्ता शिष्यवृत्ती' },
                desc: { en: 'Trust funds created by alumni batches supporting meritorious rural scholars.', mr: 'माजी विद्यार्थी बॅचेसद्वारे गरजू व हुशार विद्यार्थ्यांना आर्थिक शिष्यवृत्ती.' },
                icon: DollarSign,
                color: 'bg-amber-50 text-amber-900 border-amber-200'
              },
              {
                title: { en: 'Campus Tech Upgradation', mr: 'डिजिटल कॅम्पस विकास' },
                desc: { en: 'Donation of smart classrooms, seminar sound systems, and gym equipment.', mr: 'स्मार्ट वर्गखोल्या, डिजिटल ऑडिओ सिस्टीम व व्यायामशाळा उपकरणांचे दान.' },
                icon: Building,
                color: 'bg-sky-50 text-sky-900 border-sky-200'
              },
              {
                title: { en: 'Agri-Startup Seed Fund', mr: 'स्टार्टअप व उद्योग निधी' },
                desc: { en: 'Seed mentorship and market linkages for young agricultural entrepreneurs.', mr: 'कृषी स्टार्टअप्स व पदवीधर उद्योजकांसाठी भांडवल व बाजारपेठ सहाय्य.' },
                icon: Sparkles,
                color: 'bg-rose-50 text-rose-900 border-rose-200'
              }
            ].map((p, idx) => (
              <div key={idx} className={`p-4.5 rounded-2xl border ${p.color} space-y-2`}>
                <div className="flex items-center gap-2">
                  <p.icon className="w-4 h-4 shrink-0" />
                  <h4 className="font-bold text-sm sm:text-[15px]">{getBilingual(p.title)}</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">{getBilingual(p.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
