'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  CheckCircle2,
  FileDown,
  Building,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Users,
  Clock,
  Phone,
  Mail,
  MapPin,
  Search,
  School,
  FileText,
  LayoutGrid,
  Table as TableIcon,
  Printer
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { printElement } from '@/utils/printElement';
import { EducationBreadcrumb } from './components/EducationBreadcrumb';
import { EducationHero, HeroTheme } from './components/EducationHero';

interface CoursesCurriculumViewProps {
  pageData: any;
  subType?: 'diploma' | 'bachelors' | 'masters-doctoral' | 'diploma-schools' | 'certificate-courses';
}

export const CoursesCurriculumView: React.FC<CoursesCurriculumViewProps> = ({ pageData, subType = 'bachelors' }) => {
  const { language, getBilingual } = useLanguage();
  const [schoolSearch, setSchoolSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const breadcrumbItems = pageData?.breadcrumb || [
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Courses & Curriculum', mr: 'अभ्यासक्रम व पदव्या' }, href: '/education/bachelors' },
    { title: pageData?.title || { en: 'Courses', mr: 'अभ्यासक्रम' } }
  ];

  const heroTitle = pageData?.hero?.title || pageData?.title;
  const heroSubtitle = pageData?.hero?.subtitle || {
    en: 'ICAR VI Deans Committee and NCG-aligned curricula fostering academic excellence and skill development.',
    mr: 'भा.कृ.अनु.प. च्या ६ व्या अधिष्ठाता समिती व राष्ट्रीय गाभा समितीच्या मानकांनुसार आधुनिक अभ्यासक्रम.'
  };
  const heroBadge = pageData?.hero?.badge || {
    en: 'ICAR Accredited Academic Programmes',
    mr: 'आयसीएआर मान्यताप्राप्त शैक्षणिक अभ्यासक्रम'
  };

  // Determine active view mode
  const isBachelors = subType === 'bachelors' || (pageData?.degrees && subType !== 'masters-doctoral');
  const isDiploma = subType === 'diploma';
  const isMastersDoctoral = subType === 'masters-doctoral';
  const isDiplomaSchools = subType === 'diploma-schools';
  const isCertificate = subType === 'certificate-courses';

  // 1. Unique Hero theme mapping
  const heroTheme: HeroTheme =
    subType === 'diploma'
      ? 'diploma'
      : subType === 'bachelors'
      ? 'bachelors'
      : subType === 'masters-doctoral'
      ? 'masters'
      : subType === 'diploma-schools'
      ? 'schools'
      : 'certificate';

  // Quick Chips per view
  const quickChips =
    subType === 'bachelors'
      ? [
          { label: language === 'mr' ? '४-वर्षीय व्यावसायिक पदव्या' : '4-Year Professional Degrees' },
          { label: language === 'mr' ? '६ व्या अधिष्ठाता समिती NEP-2020' : 'ICAR VI Deans Committee NEP-2020' },
          { label: language === 'mr' ? 'स्टुडन्ट रेडी व कार्यानुभव (RAWE)' : 'Student READY & RAWE' }
        ]
      : subType === 'masters-doctoral'
      ? [
          { label: language === 'mr' ? '१६ कृषि व ५ अभियांत्रिकी शाखा' : '16 Agricultural & 5 Engg Streams' },
          { label: language === 'mr' ? 'पीएच.डी. १५+ विषयांत उपलब्ध' : 'Ph.D. in 15+ Disciplines' },
          { label: language === 'mr' ? 'भा.कृ.अनु.प. NCG-BSMA अभ्यासक्रम' : 'ICAR NCG-BSMA Standard' }
        ]
      : subType === 'diploma'
      ? [
          { label: language === 'mr' ? '२ व ३ वर्षे मुदतीचे अभ्यासक्रम' : '2 & 3 Year Diplomas' },
          { label: language === 'mr' ? '८२ तंत्र विद्यालये व तंत्रनिकेतने' : '82 Approved Schools' },
          { label: language === 'mr' ? '४,५६० वार्षिक प्रवेश क्षमता' : '4,560 Annual Capacity' }
        ]
      : subType === 'diploma-schools'
      ? [
          { label: language === 'mr' ? 'स्वातंत्र्यपूर्व काळापासून समृद्ध वारसा' : 'Pioneered Since Pre-Independence' },
          { label: language === 'mr' ? '९ घटक कृषि तंत्र विद्यालये' : '9 Constituent Tech Schools' },
          { label: language === 'mr' ? '१ घटक कृषि तंत्रनिकेतन (काष्टी)' : '1 Constituent Polytechnic (Kashti)' }
        ]
      : [
          { label: language === 'mr' ? 'माळी प्रशिक्षण प्रमाणपत्र वर्ग' : 'Mali (Gardener) Training' },
          { label: language === 'mr' ? 'पुणे व कोल्हापूर घटक केंद्रे' : 'Pune & Kolhapur Centers' },
          { label: language === 'mr' ? '१ वर्ष कालावधी | रोजगारक्षम' : '1-Year Job Oriented' }
        ];

  // Master's syllabus list from official portal
  const mastersSyllabusList = [
    { sr: 1, name: 'Agricultural Economics', file: 'https://mpkv.ac.in/Uploads/Education/Agricultural%20Economics_20191128022918.pdf', stream: 'Agriculture' },
    { sr: 2, name: 'Agricultural Entomology', file: 'https://mpkv.ac.in/Uploads/Education/Agricultural%20Entomology_20191128022943.pdf', stream: 'Agriculture' },
    { sr: 3, name: 'Agricultural Extension & Communication', file: 'https://mpkv.ac.in/Uploads/Education/Agricultural%20Extension_20191128023008.pdf', stream: 'Agriculture' },
    { sr: 4, name: 'Agricultural Meteorology (CoA Pune)', file: 'https://mpkv.ac.in/Uploads/Education/Agricultural%20Meteorology_20191128023034.pdf', stream: 'Agriculture' },
    { sr: 5, name: 'Agricultural Microbiology', file: 'https://mpkv.ac.in/Uploads/Education/Agricultural%20Microbiology_20191128023126.pdf', stream: 'Agriculture' },
    { sr: 6, name: 'Agronomy', file: 'https://mpkv.ac.in/Uploads/Education/Agronomy_20191128023149.pdf', stream: 'Agriculture' },
    { sr: 7, name: 'Animal Husbandry & Dairy Science', file: 'https://mpkv.ac.in/Uploads/Education/Animal%20Husbandry_20191128023214.pdf', stream: 'Agriculture' },
    { sr: 8, name: 'Biochemistry', file: 'https://mpkv.ac.in/Uploads/Education/Biochemistry_20191128023243.pdf', stream: 'Agriculture' },
    { sr: 9, name: 'Food Technology', file: 'https://mpkv.ac.in/Uploads/Education/Food%20Technology_20191128023345.pdf', stream: 'Food Science' },
    { sr: 10, name: 'Genetics and Plant Breeding', file: 'https://mpkv.ac.in/Uploads/Education/Genetics%20&%20Plant%20Breeding_20191128023407.pdf', stream: 'Agriculture' },
    { sr: 11, name: 'Irrigation Water Management', file: 'https://mpkv.ac.in/Uploads/Education/IWM_20191128023456.pdf', stream: 'Agriculture' },
    { sr: 12, name: 'Plant Pathology', file: 'https://mpkv.ac.in/Uploads/Education/Plant%20Pathology_20191128023520.pdf', stream: 'Agriculture' },
    { sr: 13, name: 'Plant Physiology', file: 'https://mpkv.ac.in/Uploads/Education/Plant%20Physiology_20191128023546.pdf', stream: 'Agriculture' },
    { sr: 14, name: 'Seed Science & Technology', file: 'https://mpkv.ac.in/Uploads/Education/Seed%20Science%20&%20Technology_20191128023620.pdf', stream: 'Agriculture' },
    { sr: 15, name: 'Soil Science & Agricultural Chemistry', file: 'https://mpkv.ac.in/Uploads/Education/Soil%20Science%20&%20Agricultural%20Chemistry_20191128023638.pdf', stream: 'Agriculture' },
    { sr: 16, name: 'Fruit Science', file: 'https://mpkv.ac.in/Uploads/Education/Fruit%20Science_20191128023722.pdf', stream: 'Horticulture' },
    { sr: 17, name: 'Vegetable Science', file: 'https://mpkv.ac.in/Uploads/Education/Vegetable%20Science_20191128023802.pdf', stream: 'Horticulture' },
    { sr: 18, name: 'Floriculture and Landscaping', file: 'https://mpkv.ac.in/Uploads/Education/Floriculture%20&%20Landscaping_20191128023822.pdf', stream: 'Horticulture' },
    { sr: 19, name: 'Agricultural Biotechnology', file: 'https://mpkv.ac.in/Uploads/Education/M.Sc.%20Agril.%20Biotechnology_20191128023851.pdf', stream: 'Biotechnology' },
    { sr: 20, name: 'Agricultural Business Management (M.B.A. Agri)', file: 'https://mpkv.ac.in/Uploads/Education/M.B.A.%20(Agri.)_20191128023922.pdf', stream: 'Agri Business' },
    { sr: 21, name: 'Farm Machinery and Power Engineering', file: 'https://mpkv.ac.in/Uploads/Education/FMPE_20191128024024.pdf', stream: 'Engineering' },
    { sr: 22, name: 'Irrigation & Drainage Engineering', file: 'https://mpkv.ac.in/Uploads/Education/IDE_20191128024056.pdf', stream: 'Engineering' },
    { sr: 23, name: 'Process and Food Engineering', file: 'https://mpkv.ac.in/Uploads/Education/Agril.%20Process%20Engg._20191128024123.pdf', stream: 'Engineering' },
    { sr: 24, name: 'Soil & Water Conservation Engineering', file: 'https://mpkv.ac.in/Uploads/Education/SWCE_20191128024150.pdf', stream: 'Engineering' }
  ];

  // 9 Constituent Agricultural Technology Schools
  const constituentSchoolsOfficial = [
    { sr: 1, name: { en: 'Agricultural Technical School, Puntamba, Tal. Rahata, Dist. Ahilyanagar - 423107', mr: 'कृषि तंत्र विद्यालय, पुणतांबा, ता. राहाता, जि. अहिल्यानगर - ४२३१०७' }, intake: 60, phone: '(02423) 274224', email: 'atspuntamba@gmail.com' },
    { sr: 2, name: { en: 'Agricultural Technical School, Dhule, Dist. Dhule - 424004', mr: 'कृषि तंत्र विद्यालय, धुळे, जि. धुळे - ४२४००४' }, intake: 60, phone: '(02562) 220042', email: 'atsdhule@gmail.com' },
    { sr: 3, name: { en: 'Agricultural Technical School, College of Agriculture Campus, Pune - 411005', mr: 'कृषि तंत्र विद्यालय, कृषि महाविद्यालय संकुल, पुणे - ४११००५' }, intake: 60, phone: '(020) 25537033', email: 'atspune@gmail.com' },
    { sr: 4, name: { en: 'Agricultural Technical School, Kasaba Bawada, Kolhapur - 416006', mr: 'कृषि तंत्र विद्यालय, कसबा बावडा, कोल्हापूर - ४१६००६' }, intake: 60, phone: '(0231) 2605851', email: 'atskolhapur@gmail.com' },
    { sr: 5, name: { en: 'Agricultural Technical School, Borgaon, Dist. Satara - 415519', mr: 'कृषि तंत्र विद्यालय, बोरगाव, जि. सातारा - ४१५५१९' }, intake: 60, phone: '(02162) 262035', email: 'atsborgaon@gmail.com' },
    { sr: 6, name: { en: 'Agricultural Technical School, Chas, Tal. & Dist. Ahilyanagar - 414002', mr: 'कृषि तंत्र विद्यालय, चास, ता. व जि. अहिल्यानगर - ४१४००२' }, intake: 60, phone: '(0241) 2551300', email: 'atschas@gmail.com' },
    { sr: 7, name: { en: 'Agricultural Technical School, Digraj, Dist. Sangli - 416305', mr: 'कृषि तंत्र विद्यालय, डिग्रज, जि. सांगली - ४१६३०५' }, intake: 60, phone: '(0233) 2460222', email: 'atsdigraj@gmail.com' },
    { sr: 8, name: { en: 'Agricultural Technical School, Jalgaon, Dist. Jalgaon - 425001', mr: 'कृषि तंत्र विद्यालय, जळगाव, जि. जळगाव - ४२५००१' }, intake: 60, phone: '(0257) 2250123', email: 'atsjalgaon@gmail.com' },
    { sr: 9, name: { en: 'Agricultural Technical School, Solapur, Dist. Solapur - 413002', mr: 'कृषि तंत्र विद्यालय, सोलापूर, जि. सोलापूर - ४१३००२' }, intake: 60, phone: '(0217) 2373209', email: 'atssolapur@gmail.com' }
  ];

  // Filter schools if searching
  const filteredSchools = constituentSchoolsOfficial.filter(s =>
    !schoolSearch ||
    s.name.en.toLowerCase().includes(schoolSearch.toLowerCase()) ||
    s.name.mr.toLowerCase().includes(schoolSearch.toLowerCase()) ||
    s.phone.includes(schoolSearch) ||
    s.email.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  return (
    <article className="min-h-screen bg-[#faf9f6] text-stone-800">
      <EducationBreadcrumb items={breadcrumbItems} />
      <EducationHero
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={heroBadge}
        theme={heroTheme}
        quickChips={quickChips}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-14">
        
        {/* === CASE A: BACHELORS DEGREES === */}
        {isBachelors && pageData?.degrees && (
          <section aria-labelledby="bachelors-heading" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'mr' ? '४-वर्षीय व्यावसायिक पदव्या' : '4-Year Professional Undergraduate Programmes'}</span>
                </div>
                <h2 id="bachelors-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  {language === 'mr' ? 'पदवी अभ्यासक्रम तपशील व अभ्यासक्रम पुस्तिका' : 'Undergraduate Degree Programmes & Syllabi'}
                </h2>
              </div>

              {/* View Mode Toggle & Print */}
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white text-emerald-900 shadow-xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                    title={language === 'mr' ? 'ग्रिड दृश्य' : 'Grid View'}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="hidden sm:inline">{language === 'mr' ? 'ग्रिड' : 'Grid'}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      viewMode === 'table'
                        ? 'bg-white text-emerald-900 shadow-xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                    title={language === 'mr' ? 'तक्ता दृश्य' : 'Table View'}
                  >
                    <TableIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{language === 'mr' ? 'तक्ता' : 'Table'}</span>
                  </button>
                </div>

                <button
                  onClick={() => printElement('bachelors-degrees-printable', language === 'mr' ? 'मफुकृवि पदवी अभ्यासक्रम व तपशील' : 'MPKV Undergraduate Degree Programmes & Syllabi')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer no-print"
                  title={language === 'mr' ? 'पदव्यांची यादी प्रिंट करा' : 'Print Degree Matrix'}
                >
                  <Printer className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
                </button>
              </div>
            </div>

            <div id="bachelors-degrees-printable">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageData.degrees.map((deg: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                          {deg.code}
                        </span>
                        <span className="text-xs font-semibold text-stone-500">
                          {deg.totalCredits}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-stone-900 leading-snug">
                        {getBilingual(deg.name)}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {getBilingual(deg.description)}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-stone-100 mt-4 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500">{language === 'mr' ? 'कालावधी:' : 'Duration:'}</span>
                        <span className="font-bold text-stone-900">{getBilingual(deg.duration)}</span>
                      </div>

                      <div className="flex items-start justify-between">
                        <span className="text-stone-500">{language === 'mr' ? 'पात्रता:' : 'Eligibility:'}</span>
                        <span className="font-semibold text-emerald-900 text-right max-w-[160px]">
                          {getBilingual(deg.eligibility)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-stone-500">{language === 'mr' ? 'महाविद्यालये:' : 'Colleges:'}</span>
                        <span className="font-medium text-stone-700">{deg.collegesCount}</span>
                      </div>

                      {deg.pdf && (
                        <div className="pt-2">
                          <a
                            href={deg.pdf.startsWith('http') ? deg.pdf : `https://mpkv.ac.in/${deg.pdf.replace('~/../..', '').replace(/^\/+/, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs border border-blue-200 transition-colors"
                          >
                            <FileDown className="w-4 h-4" />
                            <span>{language === 'mr' ? 'अभ्यासक्रम पुस्तिका' : 'Download Syllabus'}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Consolidated Degree Matrix Table View */
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
                      <tr>
                        <th className="py-3 px-4">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                        <th className="py-3 px-4">{language === 'mr' ? 'पदवी संकेतांक व पदवी' : 'Degree Code & Programme'}</th>
                        <th className="py-3 px-4">{language === 'mr' ? 'कालावधी' : 'Duration'}</th>
                        <th className="py-3 px-4">{language === 'mr' ? 'पात्रता निकष' : 'Eligibility Criteria'}</th>
                        <th className="py-3 px-4 text-center">{language === 'mr' ? 'श्रेयांक' : 'Credits'}</th>
                        <th className="py-3 px-4 text-center">{language === 'mr' ? 'महाविद्यालये' : 'Colleges'}</th>
                        <th className="py-3 px-4 text-right">{language === 'mr' ? 'अभ्यासक्रम पुस्तिका' : 'Syllabus'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {pageData.degrees.map((deg: any, idx: number) => {
                        const pdfUrl = deg.pdf?.startsWith('http') ? deg.pdf : `https://mpkv.ac.in/${deg.pdf?.replace('~/../..', '').replace(/^\/+/, '')}`;
                        return (
                          <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-stone-500">{idx + 1}</td>
                            <td className="py-3.5 px-4">
                              <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold mb-1">
                                {deg.code}
                              </span>
                              <span className="font-bold text-stone-900 block leading-tight">{getBilingual(deg.name)}</span>
                            </td>
                            <td className="py-3.5 px-4 text-stone-700 font-medium whitespace-nowrap">{getBilingual(deg.duration)}</td>
                            <td className="py-3.5 px-4 text-xs text-stone-600 max-w-xs">{getBilingual(deg.eligibility)}</td>
                            <td className="py-3.5 px-4 text-center font-bold text-blue-900 whitespace-nowrap">{deg.totalCredits}</td>
                            <td className="py-3.5 px-4 text-center font-medium text-stone-700">{deg.collegesCount}</td>
                            <td className="py-3.5 px-4 text-right">
                              {deg.pdf ? (
                                <a
                                  href={pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-900 hover:bg-blue-100 font-bold text-xs border border-blue-200 transition-colors whitespace-nowrap"
                                >
                                  <FileDown className="w-3.5 h-3.5" />
                                  <span>{language === 'mr' ? 'डाउनलोड PDF' : 'Download PDF'}</span>
                                </a>
                              ) : (
                                <span className="text-stone-400 text-xs">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            </div>
          </section>
        )}

        {/* === CASE B: DIPLOMA COURSES === */}
        {isDiploma && (
          <section aria-labelledby="diploma-heading" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'mr' ? 'कनिष्ठ कृषि शिक्षण' : 'Lower Agricultural Education'}</span>
                </div>
                <h2 id="diploma-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  {language === 'mr' ? 'पदविका अभ्यासक्रम व प्रवेश माहिती' : 'Agricultural Diploma Programmes'}
                </h2>
              </div>
              <button
                onClick={() => printElement('diploma-courses-printable', language === 'mr' ? 'मफुकृवि पदविका अभ्यासक्रम तपशील' : 'MPKV Agricultural Diploma Programmes')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer shrink-0 self-start sm:self-auto no-print"
                title={language === 'mr' ? 'पदविका तपशील प्रिंट करा' : 'Print Diploma Details'}
              >
                <Printer className="w-3.5 h-3.5 text-stone-600" />
                <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
              </button>
            </div>

            <div id="diploma-courses-printable">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-lime-50 text-lime-900 border border-lime-200">
                      {language === 'mr' ? 'मराठी माध्यम' : 'Marathi Medium'}
                    </span>
                    <span className="text-xs font-bold text-emerald-800">
                      {language === 'mr' ? '२ वर्षे (४ सत्रावधी)' : '2 Years (4 Semesters)'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">
                    {language === 'mr' ? 'कृषि तंत्रज्ञान पदविका' : 'Diploma in Agricultural Technology'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {language === 'mr'
                      ? '१० घटक व ७२ विनाअनुदानित कृषि तंत्र विद्यालयांतून चालविला जाणारा लोकप्रिय अभ्यासक्रम. पिके, कीड नियंत्रण, सेंद्रिय खते व फलोत्पादनाचे प्रत्यक्ष प्रात्यक्षिक शिक्षण.'
                      : 'Conducted across 10 constituent and 72 non-grant Agricultural Technology Schools with intensive practical training on crop production, plant protection, and farm tools.'}
                  </p>
                </div>
                <div className="space-y-3 pt-5 border-t border-stone-100 mt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">{language === 'mr' ? 'पात्रता निकष:' : 'Eligibility Criteria:'}</span>
                    <span className="font-bold text-stone-900">{language === 'mr' ? '१० वी (एसएससी) उत्तीर्ण' : '10th (SSC) Passed'}</span>
                  </div>
                  <a
                    href="https://mpkv.ac.in/StaticPdf/Diploma%20Course%20Curriculum.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>{language === 'mr' ? 'अभ्यासक्रम डाउनलोड करा (PDF)' : 'Download Course Syllabus (PDF)'}</span>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                      {language === 'mr' ? 'इंग्रजी माध्यम' : 'English Medium'}
                    </span>
                    <span className="text-xs font-bold text-emerald-800">
                      {language === 'mr' ? '३ वर्षे (६ सत्रावधी)' : '3 Years (6 Semesters)'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">
                    {language === 'mr' ? 'कृषि तंत्रनिकेतन पदविका' : 'Diploma in Agricultural Polytechnic'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {language === 'mr'
                      ? 'काष्टी (मालेगाव) येथील घटक तंत्रनिकेतन व २१ विनाअनुदानित तंत्रनिकेतनांतून चालविला जाणारा ३ वर्षांचा प्रगत इंग्रजी माध्यम अभ्यासक्रम. कृषोद्योगातील तंत्रकुशल पदांसाठी सुसज्ज करणारा.'
                      : 'Advanced three-year polytechnic course with English medium instruction conducted at Kashti and 21 unaided polytechnics preparing students for technical positions in agro-industries.'}
                  </p>
                </div>
                <div className="space-y-3 pt-5 border-t border-stone-100 mt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">{language === 'mr' ? 'पात्रता निकष:' : 'Eligibility Criteria:'}</span>
                    <span className="font-bold text-stone-900">{language === 'mr' ? '१० वी (एसएससी) उत्तीर्ण इंग्रजीसह' : '10th (SSC) with English'}</span>
                  </div>
                  <a
                    href="https://mpkv.ac.in/StaticPdf/Agriculture%20Polytechic.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>{language === 'mr' ? 'तंत्रनिकेतन अभ्यासक्रम (PDF)' : 'Download Polytechnic Syllabus (PDF)'}</span>
                  </a>
                </div>
              </div>
            </div>
            </div>

            <div className="p-4 rounded-xl bg-lime-50 border border-lime-200 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-lime-950">
                {language === 'mr'
                  ? 'विद्यापीठाच्या १० घटक व ७२ विनाअनुदानित तंत्र विद्यालयांची संपूर्ण माहिती व पत्ते पहा.'
                  : 'View directory of 10 constituent and 72 non-grant Agricultural Technology Schools.'}
              </span>
              <Link
                href="/education/diploma-schools"
                className="text-xs sm:text-sm font-bold text-emerald-800 hover:underline flex items-center gap-1"
              >
                <span>{language === 'mr' ? 'तंत्र विद्यालये तपशील →' : 'Tech Schools Directory →'}</span>
              </Link>
            </div>
          </section>
        )}

        {/* === CASE C: MASTERS & DOCTORAL === */}
        {isMastersDoctoral && (
          <section aria-labelledby="pg-heading" className="space-y-8">
            <div className="border-b border-stone-200 pb-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 tracking-wider uppercase mb-1">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'mr' ? 'उच्च संशोधन व पदव्युत्तर' : 'Advanced Post-Graduate & Research Degrees'}</span>
              </div>
              <h2 id="pg-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {language === 'mr' ? 'पदव्युत्तर व आचार्य पदवी अभ्यासक्रम' : 'Post-Graduate & Doctoral Programmes'}
              </h2>
            </div>

            {/* Post Graduate Institute Highlight */}
            <div className="bg-gradient-to-r from-[#240046] to-[#3c096c] text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-400/20 text-purple-200 border border-purple-400/30">
                    {language === 'mr' ? 'सर्वोच्च पदव्युत्तर संशोधन केंद्र (स्था. १९७२)' : 'Apex Post Graduate Institute (Est. 1972)'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {language === 'mr' ? 'पदव्युत्तर संस्था (PGI), राहुरी व संलग्न महाविद्यालये' : 'Post Graduate Institute (PGI), Rahuri & Off-Campus PG Centers'}
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                    {language === 'mr'
                      ? 'मध्यवर्ती संकुल राहुरी येथे PGI आणि डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय पदव्युत्तर व आचार्य पदवी शिक्षण देतात. तसेच पुणे, धुळे, कोल्हापूर येथे एम.एस्सी. आणि पुणे येथे एम.बी.ए. (कृषि) व कृषि हवामानशास्त्रातील पीएच.डी. चे शिक्षण दिले जाते.'
                      : 'There is a Post-Graduate Institute (PGI) and Dr. ASCAET at Central Campus Rahuri offering master’s and doctoral programmes in agriculture and engineering. M.Sc. is also conducted at CoA Pune, Dhule, Kolhapur; M.B.A. (Agri) and Ph.D. in Agril. Meteorology at CoA Pune.'}
                  </p>
                </div>
                <Link
                  href="/education/constituent-colleges"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm transition-colors shrink-0 shadow-xs"
                >
                  <span>{language === 'mr' ? 'महाविद्यालये पहा' : 'View Colleges'}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Master's Syllabus Download Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-700" />
                  <span>{language === 'mr' ? 'पदव्युत्तर अभ्यासक्रम पुस्तिका' : 'Master\'s Programme Syllabi (ICAR NCG Recommended)'}</span>
                </h3>

                {/* View Mode Toggle & Print */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                        viewMode === 'grid'
                          ? 'bg-white text-purple-900 shadow-xs'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                      title={language === 'mr' ? 'ग्रिड दृश्य' : 'Grid View'}
                    >
                      <LayoutGrid className="w-4 h-4" />
                      <span className="hidden sm:inline">{language === 'mr' ? 'ग्रिड' : 'Grid'}</span>
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                        viewMode === 'table'
                          ? 'bg-white text-purple-900 shadow-xs'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                      title={language === 'mr' ? 'तक्ता दृश्य' : 'Table View'}
                    >
                      <TableIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">{language === 'mr' ? 'तक्ता' : 'Table'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => printElement('masters-syllabi-printable', language === 'mr' ? 'मफुकृवि पदव्युत्तर अभ्यासक्रम यादी' : 'MPKV Master\'s Programme Syllabi (24 Disciplines)')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer no-print"
                    title={language === 'mr' ? 'विषय यादी प्रिंट करा' : 'Print Master\'s Syllabi'}
                  >
                    <Printer className="w-3.5 h-3.5 text-stone-600" />
                    <span className="hidden sm:inline">{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
                  </button>
                </div>
              </div>

              <div id="masters-syllabi-printable">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mastersSyllabusList.map((item) => (
                    <div
                      key={item.sr}
                      className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-purple-400 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200">
                          {item.stream}
                        </span>
                        <h4 className="text-sm font-bold text-stone-900 mt-2 leading-snug">
                          {item.name}
                        </h4>
                        <span className="text-xs text-stone-500 mt-0.5 block">2 Years (4 Semesters)</span>
                      </div>

                      <div className="pt-3 border-t border-stone-100 mt-3">
                        <a
                          href={item.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 hover:text-purple-950 hover:underline"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>{language === 'mr' ? 'अभ्यासक्रम डाउनलोड (PDF)' : 'Download Syllabus (PDF)'}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
                        <tr>
                          <th className="py-3 px-4">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                          <th className="py-3 px-4">{language === 'mr' ? 'पदव्युत्तर विषय / शाखा' : 'Discipline / Specialization'}</th>
                          <th className="py-3 px-4">{language === 'mr' ? 'विद्याशाखा' : 'Stream'}</th>
                          <th className="py-3 px-4">{language === 'mr' ? 'कालावधी' : 'Duration'}</th>
                          <th className="py-3 px-4 text-right">{language === 'mr' ? 'अभ्यासक्रम पुस्तिका' : 'Syllabus'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {mastersSyllabusList.map((item) => (
                          <tr key={item.sr} className="hover:bg-stone-50/80 transition-colors">
                            <td className="py-3 px-4 font-semibold text-stone-500">{item.sr}</td>
                            <td className="py-3 px-4 font-bold text-stone-900">{item.name}</td>
                            <td className="py-3 px-4">
                              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-semibold">
                                {item.stream}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-stone-600 text-xs whitespace-nowrap">2 Years (4 Semesters)</td>
                            <td className="py-3 px-4 text-right">
                              <a
                                href={item.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 text-purple-900 hover:bg-purple-100 font-bold text-xs border border-purple-200 transition-colors"
                              >
                                <FileDown className="w-3.5 h-3.5" />
                                <span>{language === 'mr' ? 'डाउनलोड PDF' : 'Download PDF'}</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              </div>
            </div>
          </section>
        )}

        {/* === CASE D: DIPLOMA SCHOOLS === */}
        {isDiplomaSchools && (
          <section aria-labelledby="schools-heading" className="space-y-8">
            <div className="border-b border-stone-200 pb-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 tracking-wider uppercase mb-1">
                <Building className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'mr' ? '९ घटक कृषि तंत्र विद्यालये' : '9 Constituent Agricultural Technical Schools'}</span>
              </div>
              <h2 id="schools-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {language === 'mr' ? 'घटक कृषि तंत्र विद्यालये व तंत्रनिकेतने' : 'Constituent Agricultural Technology Schools & Polytechnics'}
              </h2>
            </div>

            {/* History Note from Official Page Paragraph 60-65 */}
            <div className="bg-amber-50/60 rounded-2xl border border-amber-200 p-6 sm:p-8 space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-stone-950">
                {language === 'mr' ? 'ऐतिहासिक पार्श्वभूमी' : 'Historical Mandate'}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                {language === 'mr' ? 'महाराष्ट्रातील कनिष्ठ कृषि शिक्षणाची परंपरा' : 'Pioneering Lower Agricultural Education in Maharashtra'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {language === 'mr'
                  ? 'भारताच्या स्वातंत्र्यापूर्वी महाराष्ट्रात कनिष्ठ कृषि शिक्षणाची सुरुवात झाली. हे विभाग सहयोगी अधिष्ठाता यांच्या नेतृत्वाखाली कार्यरत असून शेतकऱ्यांच्या मुलांना आधुनिक शेतीचे प्रात्यक्षिक ज्ञान व स्वतःचा कृषोद्योग सुरू करण्याची प्रेरणा दिली जाते. सध्या विद्यापीठात ९ घटक आणि ७६ संलग्न तंत्र विद्यालये कार्यरत असून त्यांची वार्षिक प्रवेश क्षमता ५,१०० हून अधिक आहे.'
                  : 'Lower agricultural education was started in Maharashtra before independence of India. The division is headed by Associate Dean who is responsible for maintaining and imparting the training in technical schools and polytechnics. At present, the University has nine constituent and seventy-six affiliated Agricultural Technical Schools with an annual intake capacity of over 5,000 students, fostering agri-entrepreneurship.'}
              </p>
            </div>

            {/* School Search and View Toggle Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                  placeholder={language === 'mr' ? 'विद्यालय, जिल्हा किंवा फोन शोधा...' : 'Search school name, town, phone...'}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 bg-white"
                />
              </div>

              {/* View Mode Toggle & Print */}
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white text-amber-900 shadow-xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                    title={language === 'mr' ? 'ग्रिड दृश्य' : 'Grid View'}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="hidden sm:inline">{language === 'mr' ? 'ग्रिड' : 'Grid'}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      viewMode === 'table'
                        ? 'bg-white text-amber-900 shadow-xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                    title={language === 'mr' ? 'तक्ता दृश्य' : 'Table View'}
                  >
                    <TableIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{language === 'mr' ? 'तक्ता' : 'Table'}</span>
                  </button>
                </div>

                <button
                  onClick={() => printElement('diploma-schools-printable', language === 'mr' ? 'मफुकृवि ९ घटक कृषि तंत्र विद्यालये' : 'MPKV 9 Constituent Agricultural Technical Schools')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer no-print"
                  title={language === 'mr' ? 'तंत्र विद्यालयांची यादी प्रिंट करा' : 'Print Tech Schools'}
                >
                  <Printer className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
                </button>
              </div>
            </div>

            <div id="diploma-schools-printable">
            {/* 9 Constituent Schools Content */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSchools.map((s) => (
                  <div
                    key={s.sr}
                    className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                          {language === 'mr' ? `घटक विद्यालय #${s.sr}` : `School #${s.sr}`}
                        </span>
                        <span className="text-xs font-extrabold text-amber-900 px-2 py-0.5 rounded-md bg-amber-50/80">
                          {s.intake} {language === 'mr' ? 'जागा' : 'Seats'}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                        {getBilingual(s.name)}
                      </h4>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-stone-100 mt-4 text-xs">
                      <div className="flex items-center gap-2 text-stone-600">
                        <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <a href={`tel:${s.phone.replace(/[^0-9]/g, '')}`} className="hover:underline hover:text-amber-900">
                          {s.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-stone-600">
                        <Mail className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <a href={`mailto:${s.email}`} className="hover:underline hover:text-amber-900 truncate">
                          {s.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
                      <tr>
                        <th className="py-3.5 px-4">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                        <th className="py-3.5 px-4">{language === 'mr' ? 'घटक विद्यालयाचे नाव व पत्ता' : 'Constituent School Name & Address'}</th>
                        <th className="py-3.5 px-4 text-center">{language === 'mr' ? 'प्रवेश क्षमता' : 'Intake'}</th>
                        <th className="py-3.5 px-4">{language === 'mr' ? 'संपर्क फोन व ईमेल' : 'Contact Details'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {filteredSchools.map((s) => (
                        <tr key={s.sr} className="hover:bg-stone-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-stone-500">{s.sr}</td>
                          <td className="py-3.5 px-4 font-bold text-stone-900 max-w-sm">
                            {getBilingual(s.name)}
                          </td>
                          <td className="py-3.5 px-4 text-center font-extrabold text-amber-900">
                            {s.intake} {language === 'mr' ? 'जागा' : 'Seats'}
                          </td>
                          <td className="py-3.5 px-4 text-xs text-stone-600 space-y-1">
                            <div className="flex items-center gap-1.5 font-medium">
                              <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                              <a href={`tel:${s.phone.replace(/[^0-9]/g, '')}`} className="hover:underline">
                                {s.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-1.5 text-stone-500">
                              <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                              <a href={`mailto:${s.email}`} className="hover:underline">
                                {s.email}
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            </div>

            {/* Kashti Polytechnic Highlight */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 inline-block mb-1">
                  {language === 'mr' ? 'घटक कृषि तंत्रनिकेतन' : 'Constituent Polytechnic'}
                </span>
                <h4 className="text-base font-bold text-stone-900">
                  {language === 'mr' ? 'कृषि तंत्रनिकेतन, काष्टी, ता. मालेगाव, जि. नाशिक - ४२३२०६' : 'Agriculture Polytechnic, Kashti, Tal. Malegaon, Dist. Nashik - 423206'}
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  {language === 'mr' ? 'प्रवेश क्षमता: ४० जागा | मो. ९४२३७८४५३५ | agripolytechnickashti@gmail.com' : 'Intake: 40 Seats | Mobile: 9423784535 | Email: agripolytechnickashti@gmail.com'}
                </p>
              </div>
              <a
                href="tel:9423784535"
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shrink-0 transition-colors"
              >
                {language === 'mr' ? 'थेट संपर्क' : 'Call Campus'}
              </a>
            </div>
          </section>
        )}

        {/* === CASE E: CERTIFICATE COURSES === */}
        {isCertificate && (
          <section aria-labelledby="cert-heading" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 tracking-wider uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'mr' ? 'कौशल्याधारित अल्पमुदत अभ्यासक्रम' : 'Vocational & Skill Certificate Courses'}</span>
                </div>
                <h2 id="cert-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  {language === 'mr' ? 'माळी प्रशिक्षण प्रमाणपत्र वर्ग व व्यावसायिक कौशल्ये' : 'Mali (Gardener) Training & Certificate Courses'}
                </h2>
              </div>

              {/* View Mode Toggle & Print */}
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white text-orange-900 shadow-xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                    title={language === 'mr' ? 'ग्रिड दृश्य' : 'Grid View'}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="hidden sm:inline">{language === 'mr' ? 'ग्रिड' : 'Grid'}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      viewMode === 'table'
                        ? 'bg-white text-orange-900 shadow-xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                    title={language === 'mr' ? 'तक्ता दृश्य' : 'Table View'}
                  >
                    <TableIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{language === 'mr' ? 'तक्ता' : 'Table'}</span>
                  </button>
                </div>

                <button
                  onClick={() => printElement('certificate-courses-printable', language === 'mr' ? 'मफुकृवि माळी प्रशिक्षण केंद्रे व प्रमाणपत्र वर्ग' : 'MPKV Mali Training Centers & Certificate Courses')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer no-print"
                  title={language === 'mr' ? 'माळी प्रशिक्षण केंद्रे प्रिंट करा' : 'Print Mali Centers'}
                >
                  <Printer className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
                </button>
              </div>
            </div>

            <div id="certificate-courses-printable">
            {viewMode === 'grid' ? (
              <div className="space-y-8">
                {/* Official Mali Training Centers from Portal */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    <span>{language === 'mr' ? 'घटक माळी प्रशिक्षण केंद्रे' : 'Constituent Mali Training Centers'}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-orange-400 transition-colors flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 inline-block">
                          {language === 'mr' ? 'घटक केंद्र १' : 'Constituent Center 1'}
                        </span>
                        <h4 className="text-base font-bold text-stone-900">
                          {language === 'mr'
                            ? 'माळी प्रशिक्षण केंद्र, राष्ट्रीय कृषि संशोधन प्रकल्प (NARP), गणेशखिंड, पुणे - ४११००७'
                            : 'Mali Training Centre, National Agriculture Research Project (NARP), Ganeshkhind, Pune - 411007'}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {language === 'mr'
                            ? 'फळझाडे, शोभिवंत झाडे, बोन्साय, हरितगृह रोपे, कलम करणे व बागकाम व्यवस्थापनाचे प्रत्यक्ष १ वर्ष कालावधीचे व्यावसायिक प्रात्यक्षिक प्रशिक्षण.'
                            : 'Year-long comprehensive hands-on training in plant propagation, grafting, budding, bonsai culture, landscaping, and greenhouse nursery management.'}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-100 mt-4 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-stone-500">{language === 'mr' ? 'प्रवेश क्षमता:' : 'Intake:'}</span>
                          <span className="font-extrabold text-orange-950">40 {language === 'mr' ? 'जागा' : 'Seats'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-600">
                          <Phone className="w-3.5 h-3.5 text-orange-700" />
                          <span>020-25693750</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-600">
                          <Mail className="w-3.5 h-3.5 text-orange-700" />
                          <span>zars_gkpune@rediffmail.com</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-orange-400 transition-colors flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 inline-block">
                          {language === 'mr' ? 'घटक केंद्र २' : 'Constituent Center 2'}
                        </span>
                        <h4 className="text-base font-bold text-stone-900">
                          {language === 'mr'
                            ? 'माळी प्रशिक्षण केंद्र, राजर्षी छत्रपती शाहू महाराज कृषि महाविद्यालय, कोल्हापूर - ४१६००६'
                            : 'Mali Training Centre, Rajarshee Chhatrapati Shahu Maharaj College of Agriculture, Kolhapur - 416006'}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {language === 'mr'
                            ? 'उपोष्णकटिबंधीय फळझाडे, रोपवाटिका कायदे, खत व कीड व्यवस्थापन आणि व्यावसायिक बागकाम तंत्रज्ञानाचे प्रात्यक्षिक प्रशिक्षण.'
                            : 'Hands-on nursery establishment, subtropical fruit orchards, drip fertigation, and commercial landscape architecture.'}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-100 mt-4 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-stone-500">{language === 'mr' ? 'प्रवेश क्षमता:' : 'Intake:'}</span>
                          <span className="font-extrabold text-orange-950">40 {language === 'mr' ? 'जागा' : 'Seats'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-600">
                          <Phone className="w-3.5 h-3.5 text-orange-700" />
                          <span>(0231) 2605851</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-600">
                          <Mail className="w-3.5 h-3.5 text-orange-700" />
                          <span>ackolhapur@rediffmail.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Unaided Centers Cards */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-stone-900">
                    {language === 'mr' ? 'विनाअनुदानित मान्यताप्राप्त माळी प्रशिक्षण केंद्रे' : 'Unaided Approved Mali Training Centers'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">नारायणगाव (पुणे)</span>
                        <h4 className="text-sm font-bold text-stone-900 mt-2">Mali Training Centre, Narayangaon, Tal. Junnar, Dist. Pune</h4>
                      </div>
                      <div className="pt-3 border-t border-stone-100 mt-3 text-xs space-y-1 text-stone-600">
                        <div className="font-bold text-orange-900">Intake: 40 Seats</div>
                        <div>Phone: 9730804768</div>
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">शारदानगर (बारामती)</span>
                        <h4 className="text-sm font-bold text-stone-900 mt-2">Mali Training Centre, Agricultural Development Trust, Baramati</h4>
                      </div>
                      <div className="pt-3 border-t border-stone-100 mt-3 text-xs space-y-1 text-stone-600">
                        <div className="font-bold text-orange-900">Intake: 40 Seats</div>
                        <div>Phone: (02112) 255180</div>
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">प्रवरानगर (अहिल्यानगर)</span>
                        <h4 className="text-sm font-bold text-stone-900 mt-2">Mali Training Centre, Pravaranagar, Loni, Tal. Rahata</h4>
                      </div>
                      <div className="pt-3 border-t border-stone-100 mt-3 text-xs space-y-1 text-stone-600">
                        <div className="font-bold text-orange-900">Intake: 40 Seats</div>
                        <div>Phone: (02422) 273698</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Consolidated Mali Centers Table View */
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
                      <tr>
                        <th className="py-3 px-4">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                        <th className="py-3 px-4">{language === 'mr' ? 'प्रशिक्षण केंद्राचे नाव व पत्ता' : 'Training Center & Campus'}</th>
                        <th className="py-3 px-4">{language === 'mr' ? 'प्रकार' : 'Category'}</th>
                        <th className="py-3 px-4 text-center">{language === 'mr' ? 'प्रवेश क्षमता' : 'Intake'}</th>
                        <th className="py-3 px-4">{language === 'mr' ? 'संपर्क माहिती' : 'Contact Details'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      <tr className="hover:bg-stone-50/80">
                        <td className="py-3.5 px-4 font-semibold text-stone-500">1</td>
                        <td className="py-3.5 px-4 font-bold text-stone-900 max-w-sm">
                          {language === 'mr'
                            ? 'माळी प्रशिक्षण केंद्र, राष्ट्रीय कृषि संशोधन प्रकल्प (NARP), गणेशखिंड, पुणे - ४११००७'
                            : 'Mali Training Centre, National Agriculture Research Project (NARP), Ganeshkhind, Pune - 411007'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                            {language === 'mr' ? 'घटक केंद्र' : 'Constituent'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-orange-900">40</td>
                        <td className="py-3.5 px-4 text-xs text-stone-600">020-25693750 | zars_gkpune@rediffmail.com</td>
                      </tr>
                      <tr className="hover:bg-stone-50/80">
                        <td className="py-3.5 px-4 font-semibold text-stone-500">2</td>
                        <td className="py-3.5 px-4 font-bold text-stone-900 max-w-sm">
                          {language === 'mr'
                            ? 'माळी प्रशिक्षण केंद्र, राजर्षी छत्रपती शाहू महाराज कृषि महाविद्यालय, कोल्हापूर - ४१६००६'
                            : 'Mali Training Centre, Rajarshee Chhatrapati Shahu Maharaj College of Agriculture, Kolhapur - 416006'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                            {language === 'mr' ? 'घटक केंद्र' : 'Constituent'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-orange-900">40</td>
                        <td className="py-3.5 px-4 text-xs text-stone-600">(0231) 2605851 | ackolhapur@rediffmail.com</td>
                      </tr>
                      <tr className="hover:bg-stone-50/80">
                        <td className="py-3.5 px-4 font-semibold text-stone-500">3</td>
                        <td className="py-3.5 px-4 font-bold text-stone-900 max-w-sm">
                          {language === 'mr'
                            ? 'माळी प्रशिक्षण केंद्र, नारायणगाव, ता. जुन्नर, जि. पुणे - ४१०५०४'
                            : 'Mali Training Centre, Narayangaon, Tal. Junnar, Dist. Pune - 410504'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
                            {language === 'mr' ? 'विनाअनुदानित' : 'Unaided'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-orange-900">40</td>
                        <td className="py-3.5 px-4 text-xs text-stone-600">9730804768 | maliprashikshan@redifmail.com</td>
                      </tr>
                      <tr className="hover:bg-stone-50/80">
                        <td className="py-3.5 px-4 font-semibold text-stone-500">4</td>
                        <td className="py-3.5 px-4 font-bold text-stone-900 max-w-sm">
                          {language === 'mr'
                            ? 'माळी प्रशिक्षण केंद्र, ॲग्रिकल्चरल डेव्हलपमेंट ट्रस्ट, शारदानगर, बारामती, जि. पुणे'
                            : 'Mali Training Centre, Agricultural Development Trust, Shardanagar, Baramati, Dist. Pune'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
                            {language === 'mr' ? 'विनाअनुदानित' : 'Unaided'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-orange-900">40</td>
                        <td className="py-3.5 px-4 text-xs text-stone-600">(02112) 255180</td>
                      </tr>
                      <tr className="hover:bg-stone-50/80">
                        <td className="py-3.5 px-4 font-semibold text-stone-500">5</td>
                        <td className="py-3.5 px-4 font-bold text-stone-900 max-w-sm">
                          {language === 'mr'
                            ? 'माळी प्रशिक्षण केंद्र, प्रवरानगर, लोणी, ता. राहाता, जि. अहिल्यानगर'
                            : 'Mali Training Centre, Pravaranagar, Loni, Tal. Rahata, Dist. Ahilyanagar'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
                            {language === 'mr' ? 'विनाअनुदानित' : 'Unaided'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-orange-900">40</td>
                        <td className="py-3.5 px-4 text-xs text-stone-600">(02422) 273698</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            </div>
          </section>
        )}

      </div>
    </article>
  );
};
