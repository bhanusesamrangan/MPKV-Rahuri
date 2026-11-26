'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Filter,
  CheckCircle2,
  Search,
  BookOpen,
  LayoutGrid,
  Table as TableIcon,
  Printer,
  Award,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { printElement } from '@/utils/printElement';
import { EducationBreadcrumb } from './components/EducationBreadcrumb';
import { EducationHero } from './components/EducationHero';

interface ConstituentCollegesViewProps {
  pageData: any;
}

export const ConstituentCollegesView: React.FC<ConstituentCollegesViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const breadcrumbItems = pageData?.breadcrumb || [
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Colleges', mr: 'महाविद्यालये' }, href: '/education/constituent-colleges' },
    { title: { en: 'Constituent Colleges', mr: 'घटक महाविद्यालये' } }
  ];

  const heroTitle = pageData?.hero?.title || {
    en: 'Constituent Colleges of MPKV',
    mr: 'महात्मा फुले कृषि विद्यापीठाची घटक महाविद्यालये'
  };
  const heroSubtitle = pageData?.hero?.subtitle || {
    en: '15 premier government agricultural and engineering colleges across 10 districts of Western Maharashtra delivering ICAR-accredited education.',
    mr: 'पश्चिम महाराष्ट्रातील १० जिल्ह्यांमध्ये विस्तारलेली १५ नामांकित शासकीय घटक महाविद्यालये — आयसीएआर अधिस्वीकृती व आधुनिक शैक्षणिक सुविधांसह.'
  };
  const heroBadge = pageData?.hero?.badge || {
    en: '15 Constituent Colleges | 6 Professional Disciplines',
    mr: '१५ घटक महाविद्यालये | ६ व्यावसायिक विद्याशाखा'
  };

  const rawColleges: any[] = pageData?.colleges || [];

  // Unique disciplines & districts for filters
  const disciplines = [
    { id: 'All', label: { en: 'All Disciplines (15)', mr: 'सर्व विद्याशाखा (१५)' } },
    { id: 'Agriculture', label: { en: 'Agriculture (8)', mr: 'कृषि (८)' } },
    { id: 'Horticulture', label: { en: 'Horticulture (2)', mr: 'उद्यानविद्या (२)' } },
    { id: 'Engineering', label: { en: 'Engineering (2)', mr: 'कृषि अभियांत्रिकी (२)' } },
    { id: 'Management', label: { en: 'Agri Business (1)', mr: 'कृषि व्यवसाय (१)' } },
    { id: 'FoodTech', label: { en: 'Food Technology (1)', mr: 'अन्नतंत्रज्ञान (१)' } },
    { id: 'PGInstitute', label: { en: 'Post Graduate Institute (1)', mr: 'पदव्युत्तर संस्था (१)' } }
  ];

  const districts = ['All', 'Pune', 'Kolhapur', 'Dhule', 'Nandurbar', 'Satara', 'Jalgaon', 'Ahilyanagar', 'Nashik'];

  // Filtered colleges list
  const filteredColleges = useMemo(() => {
    return rawColleges.filter((c) => {
      const matchDiscipline = selectedDiscipline === 'All' || c.discipline === selectedDiscipline;
      const matchDistrict = selectedDistrict === 'All' || c.district?.en === selectedDistrict;
      const matchQuery =
        !searchQuery ||
        c.name?.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name?.mr?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.district?.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.district?.mr?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDiscipline && matchDistrict && matchQuery;
    });
  }, [rawColleges, selectedDiscipline, selectedDistrict, searchQuery]);

  return (
    <article className="min-h-screen bg-[#faf9f6] text-stone-800">
      <EducationBreadcrumb items={breadcrumbItems} />
      <EducationHero
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={heroBadge}
        theme="constituent"
        quickChips={[
          { label: language === 'mr' ? '१५ शासकीय घटक महाविद्यालये' : '15 Constituent Campuses' },
          { label: language === 'mr' ? '१० जिल्हे कार्यक्षेत्र' : '10 Districts Coverage' },
          { label: language === 'mr' ? 'एआयसीटीई (AICTE) मान्यताप्राप्त कृषी अभियांत्रिकी' : 'AICTE Accredited Engineering (ASCAET)' }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">
        
        {/* Filters and Search Bar */}
        <section aria-label="Filters" className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'महाविद्यालयाचे नाव किंवा जिल्हा शोधा...' : 'Search college name, district...'}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 bg-stone-50"
              />
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
              {/* District Dropdown Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">
                  {language === 'mr' ? 'जिल्हा:' : 'District:'}
                </span>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="py-1.5 px-3 rounded-xl border border-stone-200 text-xs sm:text-sm font-medium bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d === 'All' ? (language === 'mr' ? 'सर्व जिल्हे' : 'All Districts') : d}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle & Print */}
              <div className="flex items-center gap-2">
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
                  onClick={() => printElement('constituent-colleges-printable-section', language === 'mr' ? 'मफुकृवि घटक महाविद्यालये यादी व तक्ता' : 'MPKV Constituent Colleges Directory')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer no-print"
                  title={language === 'mr' ? 'यादी किंवा तक्ता प्रिंट करा' : 'Print Colleges List / Table'}
                >
                  <Printer className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Discipline Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
            {disciplines.map((disc) => {
              const isActive = selectedDiscipline === disc.id;
              return (
                <button
                  key={disc.id}
                  onClick={() => setSelectedDiscipline(disc.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {getBilingual(disc.label)}
                </button>
              );
            })}
          </div>
        </section>

        {/* Colleges Grid */}
        <section aria-labelledby="colleges-grid-heading" className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 id="colleges-grid-heading" className="text-xl sm:text-2xl font-bold text-stone-900">
              {language === 'mr'
                ? `घटक महाविद्यालये (${filteredColleges.length})`
                : `Constituent Colleges (${filteredColleges.length})`}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
                {language === 'mr' ? '१० जिल्ह्यांत कार्यरत' : 'Spread across Western Maharashtra'}
              </span>
              <button
                onClick={() => printElement('constituent-colleges-printable-section', language === 'mr' ? 'मफुकृवि घटक महाविद्यालये यादी व तक्ता' : 'MPKV Constituent Colleges Directory')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer no-print"
                title={language === 'mr' ? 'प्रिंट करा' : 'Print'}
              >
                <Printer className="w-3.5 h-3.5 text-stone-600" />
                <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
              </button>
            </div>
          </div>

          <div id="constituent-colleges-printable-section">
          {filteredColleges.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500">
              <Building2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-base font-semibold">
                {language === 'mr' ? 'कोणतेही महाविद्यालय सापडले नाही.' : 'No constituent colleges match the selected criteria.'}
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((college) => {
                const isAicte = college.isAicteAccredited || college.id === 'co-engg-rahuri';

                return (
                  <div
                    key={college.id}
                    className={`bg-white rounded-2xl border ${
                      isAicte
                        ? 'border-amber-300 ring-2 ring-amber-400/25 shadow-sm'
                        : 'border-stone-200 shadow-xs'
                    } hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group`}
                  >
                    {/* College Image Banner */}
                    <div className="relative h-48 w-full bg-emerald-950 overflow-hidden">
                      <Image
                        src={college.image || '/media/images/college_building_placeholder.jpg'}
                        alt={getBilingual(college.name)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-800/90 text-white font-bold backdrop-blur-xs">
                            {getBilingual(college.disciplineLabel)}
                          </span>
                          {isAicte && (
                            <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-[11px] shadow-sm flex items-center gap-1 border border-amber-300">
                              <Award className="w-3.5 h-3.5" />
                              <span>AICTE Accredited</span>
                            </span>
                          )}
                        </div>
                        {college.established && (
                          <span className="px-2.5 py-1 rounded-full bg-black/60 text-amber-300 font-semibold backdrop-blur-xs shrink-0">
                            {language === 'mr' ? `स्था. ${college.established}` : `Est. ${college.established}`}
                          </span>
                        )}
                      </div>

                      {/* District Bottom Badge */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{getBilingual(college.district)}</span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                          {getBilingual(college.name)}
                        </h3>

                        {/* Special AICTE Recognition Ribbon if accredited */}
                        {isAicte && (
                          <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 border border-amber-300/80 flex items-center justify-between text-xs font-bold text-amber-950 shadow-2xs">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                              <span className="truncate">
                                {language === 'mr'
                                  ? 'अखिल भारतीय तंत्रशिक्षण परिषद (AICTE) मान्यताप्राप्त'
                                  : 'AICTE Accredited Engineering Campus'}
                              </span>
                            </div>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-extrabold shrink-0 shadow-2xs">
                              AICTE
                            </span>
                          </div>
                        )}

                        <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                          {getBilingual(college.description)}
                        </p>
                      </div>

                    {/* Metadata & Intake */}
                    <div className="space-y-2.5 pt-3 border-t border-stone-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-500 font-medium">
                          {language === 'mr' ? 'पदवी प्रवेश क्षमता:' : 'UG Intake:'}
                        </span>
                        <span className="font-extrabold text-emerald-900 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                          {college.intake} {language === 'mr' ? 'जागा' : 'Seats'}
                        </span>
                      </div>

                      {college.pgIntake && college.pgIntake !== '-' && (
                        <div className="flex items-start justify-between text-xs">
                          <span className="text-stone-500 font-medium">{language === 'mr' ? 'पदव्युत्तर:' : 'PG Seats:'}</span>
                          <span className="font-semibold text-stone-700 text-right">{college.pgIntake}</span>
                        </div>
                      )}

                      {/* Degrees tags */}
                      {college.degrees && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {college.degrees.slice(0, 3).map((d: string, dIdx: number) => (
                            <span
                              key={dIdx}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Links */}
                    <div className="pt-2">
                      {college.website ? (
                        <a
                          href={college.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200 transition-colors"
                        >
                          <span>
                            {college.website.endsWith('.pdf')
                              ? language === 'mr' ? 'माहिती पुस्तिका (PDF)' : 'Official Profile (PDF)'
                              : language === 'mr' ? 'अधिकृत संकेतस्थळ भेट' : 'Visit Official Portal'}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <Link
                          href="/education/at-a-glance"
                          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-600 font-medium text-xs border border-stone-200 transition-colors"
                        >
                          <span>{language === 'mr' ? 'अधिक माहिती' : 'Campus Information'}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          ) : (
            /* Interactive Table View */
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="py-3 px-4">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'महाविद्यालय व संकुल' : 'College & Campus'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'जिल्हा' : 'District'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'विद्याशाखा' : 'Stream'}</th>
                      <th className="py-3 px-4 text-center">{language === 'mr' ? 'स्थापना' : 'Est.'}</th>
                      <th className="py-3 px-4 text-center">{language === 'mr' ? 'पदवी जागा' : 'UG Seats'}</th>
                      <th className="py-3 px-4 text-center">{language === 'mr' ? 'पदव्युत्तर' : 'PG Seats'}</th>
                      <th className="py-3 px-4 text-right">{language === 'mr' ? 'संकेतस्थळ' : 'Portal'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredColleges.map((college, idx) => (
                      <tr key={college.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-stone-500">{idx + 1}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                              <Image
                                src={college.image || '/media/images/college_building_placeholder.jpg'}
                                alt={getBilingual(college.name)}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-stone-900 block leading-tight">{getBilingual(college.name)}</span>
                                {(college.isAicteAccredited || college.id === 'co-engg-rahuri') && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-300 text-[10px] font-extrabold shadow-2xs">
                                    <Award className="w-3 h-3 text-amber-700" />
                                    <span>AICTE Accredited</span>
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-stone-500 block mt-0.5">{college.degrees?.join(', ') || ''}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-stone-700 font-medium">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 text-xs font-semibold">
                            {getBilingual(college.district)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                            {getBilingual(college.disciplineLabel)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-medium text-stone-600">
                          {college.established || '-'}
                        </td>
                        <td className="py-3.5 px-4 text-center font-extrabold text-emerald-900">
                          {college.intake}
                        </td>
                        <td className="py-3.5 px-4 text-center text-xs text-stone-600">
                          {college.pgIntake || '-'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {college.website ? (
                            <a
                              href={college.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 transition-colors"
                            >
                              <span>
                                {college.website.endsWith('.pdf')
                                  ? 'PDF'
                                  : language === 'mr' ? 'भेट' : 'Visit'}
                              </span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-stone-400 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          </div>
        </section>

        {/* Consolidated Capacity Matrix Table */}
        <section aria-labelledby="capacity-table-heading" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
            <div>
              <h3 id="capacity-table-heading" className="text-lg font-bold text-stone-900">
                {language === 'mr'
                  ? 'घटक महाविद्यालये प्रवेश क्षमता तक्ता (२०२४-२५)'
                  : 'Consolidated Intake Capacity Table (Constituent Colleges)'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'mr'
                  ? 'सर्व १४ शासकीय महाविद्यालयांमधील पदवी व पदव्युत्तर अभ्यासक्रम प्रवेश क्षमता.'
                  : 'Official annual seat allotment approved by MCAER & Academic Council.'}
              </p>
            </div>
            <button
              onClick={() => printElement('constituent-colleges-capacity-table', language === 'mr' ? 'घटक महाविद्यालये प्रवेश क्षमता तक्ता' : 'Constituent Colleges Intake Capacity Table')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer no-print"
              title={language === 'mr' ? 'तक्ता प्रिंट करा' : 'Print Table'}
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
            </button>
          </div>

          <div id="constituent-colleges-capacity-table" className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'महाविद्यालयाचे नाव' : 'College Name'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'जिल्हा' : 'District'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'पदवी अभ्यासक्रम' : 'UG Course'}</th>
                  <th className="py-3 px-4 text-right">{language === 'mr' ? 'प्रवेश क्षमता' : 'Intake'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {rawColleges.map((c, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-stone-500">{idx + 1}</td>
                    <td className="py-3 px-4 font-bold text-stone-900">{getBilingual(c.name)}</td>
                    <td className="py-3 px-4 text-stone-600">{getBilingual(c.district)}</td>
                    <td className="py-3 px-4 text-stone-700 font-medium">{c.degrees?.[0] || 'B.Sc. Agriculture'}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-900">{c.intake}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </article>
  );
};
