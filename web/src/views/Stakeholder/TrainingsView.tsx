'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Calendar,
  Clock,
  Users,
  Award,
  BookOpen,
  Sprout,
  Cpu,
  MapPin,
  Phone,
  ChevronRight,
  Home,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Target
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TrainingsViewProps {
  pageData?: any;
}

export const TrainingsView: React.FC<TrainingsViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'faculty' | 'officers' | 'farmers' | 'it'>('all');

  const programs = [
    {
      id: 'mtc',
      track: 'officers',
      title: { en: 'ICAR Model Training Courses (MTC)', mr: 'आयसीएआर मॉडेल प्रशिक्षण अभ्यासक्रम (MTC)' },
      duration: '8 Days (Residential)',
      target: { en: 'State Agriculture Officers, SMS & Extension Specialists', mr: 'राज्य कृषी अधिकारी, विषय विशेषज्ञ व विस्तार कार्यकर्ते' },
      organizer: { en: 'Directorate of Extension Education, Rahuri', mr: 'विस्तार शिक्षण संचालनालय, राहुरी' },
      topics: [
        { en: 'Climate-Smart Agronomy & Drought Mitigation', mr: 'हवामान अनुकूल शेती व दुष्काळ निवारण तंत्रज्ञान' },
        { en: 'Precision Farming & Drone Demonstration', mr: 'अचूक शेती व कृषी ड्रोन प्रात्यक्षिके' },
        { en: 'Farmer Producer Companies (FPC) Strengthening', mr: 'शेतकरी उत्पादक कंपन्यांचे (FPC) बळकटीकरण' }
      ],
      tagColor: 'bg-emerald-100 text-emerald-950 border-emerald-300'
    },
    {
      id: 'caft',
      track: 'faculty',
      title: { en: 'ICAR Summer & Winter Schools / CAFT', mr: 'आयसीएआर उन्हाळी व हिवाळी विद्यालये (CAFT)' },
      duration: '21 Days (National Level)',
      target: { en: 'Assistant Professors, University Scientists & Researchers', mr: 'कृषी विद्यापीठ प्राध्यापक, शास्त्रज्ञ व संशोधक' },
      organizer: { en: 'Centre of Advanced Faculty Training (PGI Rahuri)', mr: 'प्रगत प्राध्यापक प्रशिक्षण केंद्र (PGI राहुरी)' },
      topics: [
        { en: 'Advanced Genomics & Molecular Plant Breeding', mr: 'प्रगत जीनोमिक्स व आण्विक वनस्पती पैदास' },
        { en: 'Bio-Analytical Tools & Residue Analysis', mr: 'बायो-ॲनालिटिकल तंत्रज्ञान व कीटकनाशक अंश विश्लेषण' },
        { en: 'Automated Drip Fertigation & Sensor Systems', mr: 'स्वयंचलित ठिबक खत व्यवस्थापन व सेन्सर तंत्रज्ञान' }
      ],
      tagColor: 'bg-purple-100 text-purple-950 border-purple-300'
    },
    {
      id: 'akmu',
      track: 'it',
      title: { en: 'AKMU Information Technology & MIS Masterclasses', mr: 'एकेएमयू माहिती तंत्रज्ञान व संगणक प्रशिक्षण' },
      duration: '3 to 5 Days (Hands-on Lab)',
      target: { en: 'Faculty, Research Scholars & University Technical Staff', mr: 'प्राध्यापक, संशोधक विद्यार्थी व तांत्रिक कर्मचारी' },
      organizer: { en: 'Agricultural Knowledge Management Unit (AKMU)', mr: 'कृषी ज्ञान व्यवस्थापन कक्ष (AKMU), राहुरी' },
      topics: [
        { en: 'Statistical Data Analysis Using R & SAS', mr: 'आर (R) व सॅस (SAS) द्वारे कृषी सांख्यिकी विश्लेषण' },
        { en: 'University MIS, ERP & Digital Document Workflows', mr: 'विद्यापीठ ई-प्रशासन, एमआयएस व संगणकीय प्रणाली' },
        { en: 'Bioinformatics & Research Information Databases', mr: 'बायोइन्फॉरमॅटिक्स व संशोधन डेटाबेस वापर' }
      ],
      tagColor: 'bg-blue-100 text-blue-950 border-blue-300'
    },
    {
      id: 'irrigation',
      track: 'farmers',
      title: { en: 'Micro-Irrigation & Fertigation Water Management', mr: 'सूक्ष्म सिंचन व खत व्यवस्थापन प्रशिक्षण' },
      duration: '5 Days (Field Demonstration)',
      target: { en: 'Agronomists, Irrigation Officers & Progressive Farmers', mr: 'कृषिविज्ञ, जलसंपदा अधिकारी व प्रगतशील शेतकरी' },
      organizer: { en: 'Centre of Excellence in Irrigation, Rahuri', mr: 'जलव्यवस्थापन उत्कृष्टता केंद्र, मफुकृवि राहुरी' },
      topics: [
        { en: 'Subsurface Drip Irrigation & Pressure Regulation', mr: 'भूमिगत ठिबक सिंचन व दाब नियंत्रण यंत्रणा' },
        { en: 'Liquid Micro-Nutrient Application (Phule Grade II)', mr: 'फुले मायक्रोग्रेड-२ विद्राव्य खत वापर तंत्रज्ञान' },
        { en: 'Canal Automation & Solar Powered Pumping', mr: 'कॅनॉल ऑटोमेशन व सौर कृषी पंप जोडणी' }
      ],
      tagColor: 'bg-cyan-100 text-cyan-950 border-cyan-300'
    },
    {
      id: 'vocational',
      track: 'farmers',
      title: { en: 'Vocational Farm Skills & Value Addition for Youth', mr: 'युवक व महिलांसाठी व्यावसायिक कृषी कौशल्य प्रशिक्षण' },
      duration: '1 to 7 Days (Hands-on Vocational)',
      target: { en: 'Rural Youth, Women Self-Help Groups (SHGs) & Startups', mr: 'ग्रामीण युवक, महिला बचत गट व कृषी उद्योजक' },
      organizer: { en: '4 Krishi Vigyan Kendras (KVKs) & ATIC', mr: '४ कृषी विज्ञान केंद्रे (KVK) व ॲटिक' },
      topics: [
        { en: 'Commercial Seed Production & Nursery Grafting', mr: 'व्यावसायिक बियाणे उत्पादन व रोपवाटिका कलमे बांधणी' },
        { en: 'Jaggery Processing, Dal Mill & Spice Processing', mr: 'गुळ प्रक्रिया, डाळ मिल व मसाला प्रक्रिया उद्योग' },
        { en: 'Dairy Farm Management & Silage Making', mr: 'दुग्ध व्यवसाय व्यवस्थापन व मुरघास निर्मिती' }
      ],
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300'
    }
  ];

  const filteredPrograms = selectedTrack === 'all'
    ? programs
    : programs.filter(p => p.track === selectedTrack);

  return (
    <div className="w-full bg-[#faf9fc] min-h-screen text-slate-800">
      
      {/* 1. Breadcrumb Strip */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <div className="w-full max-w-[1720px] mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
          <Link href="/" className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md">
            {language === 'mr' ? 'प्रशिक्षण व कार्यशाळा' : 'Trainings & Workshops'}
          </span>
        </div>
      </div>

      {/* 2. Hero Header: High-Tech Violet & Indigo Innovation */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-5.5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a103c] via-[#24174f] to-[#120a2e] text-white p-5 sm:p-6 lg:p-7 shadow-xl border border-violet-800/40">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-4xl">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {language === 'mr'
                  ? 'अद्ययावत कृषी तंत्रज्ञान प्रशिक्षण व व्यावसायिक कार्यशाळा'
                  : 'Empowering Scientists, Officers & Farmers with Modern Skills'}
              </h1>

              <p className="text-violet-100/90 text-xs sm:text-sm leading-relaxed font-normal max-w-2xl">
                {language === 'mr'
                  ? 'भारतीय कृषी संशोधन परिषद (ICAR) आणि राज्य शासनाच्या सहकार्याने शास्त्रज्ञ, कृषी अधिकारी, विस्तार कार्यकर्ते व ग्रामीण युवकांसाठी आयोजित राष्ट्रीय स्तरावरील प्रगत प्रशिक्षण उपक्रम.'
                  : 'Bridging laboratory breakthroughs and farm reality through ICAR Model Training Courses, Faculty Summer/Winter Schools, AKMU IT masterclasses, and KVK vocational skills modules.'}
              </p>

              {/* Quick Focus Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {[
                  { label: language === 'mr' ? '२१ दिवसीय राष्ट्रीय उन्हाळी शाळा' : '21-Day National CAFT', icon: Award },
                  { label: language === 'mr' ? '८ दिवसीय मॉडेल प्रशिक्षण (MTC)' : '8-Day ICAR MTC Courses', icon: Target },
                  { label: language === 'mr' ? 'एकेएमयू डिजिटल व सांख्यिकी लॅब' : 'AKMU IT Data Labs', icon: Cpu },
                  { label: language === 'mr' ? 'केव्हीके व्यावसायिक कौशल्ये' : 'KVK Vocational Youth Skills', icon: Sprout }
                ].map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-[11px] text-violet-200 font-medium"
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

      {/* 3. Track Switcher & Program Cards */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-stone-200">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {language === 'mr' ? 'प्रशिक्षण अभ्यासक्रम व व्यावसायिक मॉड्यूल्स' : 'Training Calendar & Specialized Modules'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'mr' ? 'आपल्या कार्यक्षेत्रानुसार प्रशिक्षण निवडा व अभ्यासक्रम तपशील पहा' : 'Select by target track to explore eligibility and key focus areas'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap bg-white p-1 rounded-2xl border border-stone-200 shadow-2xs text-xs font-bold">
            {[
              { id: 'all' as const, label: { en: 'All Modules (5)', mr: 'सर्व अभ्यासक्रम (५)' } },
              { id: 'officers' as const, label: { en: 'Govt. Officers (MTC)', mr: 'शासकीय अधिकारी (MTC)' } },
              { id: 'faculty' as const, label: { en: 'Faculty & Scientists (CAFT)', mr: 'प्राध्यापक (CAFT)' } },
              { id: 'farmers' as const, label: { en: 'Farmers & Youth', mr: 'शेतकरी व युवक' } },
              { id: 'it' as const, label: { en: 'AKMU IT Skills', mr: 'संगणक व आयटी' } }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedTrack(tab.id)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  selectedTrack === tab.id
                    ? 'bg-violet-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {getBilingual(tab.label)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPrograms.map(p => (
            <div
              key={p.id}
              className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-violet-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${p.tagColor}`}>
                    {p.duration}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-violet-800">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Annual Schedule</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-violet-900 transition-colors leading-snug">
                    {getBilingual(p.title)}
                  </h3>
                  <div className="mt-2 text-xs text-slate-600 flex items-center gap-1.5">
                    <strong className="text-slate-800">{language === 'mr' ? 'पात्र लाभार्थी: ' : 'Target Audience: '}</strong>
                    <span>{getBilingual(p.target)}</span>
                  </div>
                </div>

                {/* Key Syllabus Points */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                    {language === 'mr' ? 'अभ्यासक्रमातील प्रमुख विषय' : 'Core Training Curriculum'}
                  </span>
                  <div className="space-y-1.5">
                    {p.topics.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-700 shrink-0 mt-0.5" />
                        <span>{getBilingual(t)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-700">
                  {getBilingual(p.organizer)}
                </span>
                <span className="text-violet-700 font-bold group-hover:underline">
                  {language === 'mr' ? 'तपशील पहा' : 'View Details'} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Major Training Infrastructure Centers */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16">
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-violet-800 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>{language === 'mr' ? 'मध्यवर्ती प्रशिक्षण केंद्रे व संपर्क' : 'Regional Training Hubs & Centers'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                {language === 'mr' ? 'प्रशिक्षण आयोजन केंद्रे व संपर्क अधिकारी' : 'Training Centers Directory & Coordinators'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: { en: 'Directorate of Extension Education', mr: 'विस्तार शिक्षण संचालनालय' },
                location: { en: 'Central Campus, Rahuri', mr: 'मध्यवर्ती परिसर, राहुरी' },
                contact: '02426-243206',
                email: 'deempkv@gmail.com'
              },
              {
                name: { en: 'ATIC Farmers Training Centre', mr: 'अॅटिक शेतकरी प्रशिक्षण केंद्र' },
                location: { en: 'ATIC Complex, Rahuri', mr: 'अॅटिक संकुल, राहुरी' },
                contact: '02426-243861',
                email: 'atic.rahuri@mpkv.ac.in'
              },
              {
                name: { en: 'AKMU Information Tech Lab', mr: 'एकेएमयू संगणक प्रशिक्षण लॅब' },
                location: { en: 'AKMU Building, Rahuri', mr: 'एकेएमयू इमारत, राहुरी' },
                contact: '02426-243232',
                email: 'akmu@mpkv.ac.in'
              },
              {
                name: { en: '4 Krishi Vigyan Kendras (KVK)', mr: '४ कृषी विज्ञान केंद्रे (केव्हीके)' },
                location: { en: 'Dhule, Kolhapur, Nandurbar', mr: 'धुळे, कोल्हापूर, नंदुरबार' },
                contact: '02562-220727',
                email: 'kvk.mpkv@gov.in'
              }
            ].map((c, idx) => (
              <div key={idx} className="p-4.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900">{getBilingual(c.name)}</h4>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-violet-700" />
                  <span>{getBilingual(c.location)}</span>
                </div>
                <div className="text-xs font-semibold text-slate-800 flex items-center gap-1 pt-1">
                  <Phone className="w-3.5 h-3.5 text-violet-700" />
                  <a href={`tel:${c.contact}`} className="hover:underline">{c.contact}</a>
                </div>
                <div className="text-[11px] font-mono text-slate-400 truncate">
                  {c.email}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
