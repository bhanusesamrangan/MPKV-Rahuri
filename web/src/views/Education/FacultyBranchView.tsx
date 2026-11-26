'use client';

import React from 'react';
import Link from 'next/link';
import {
  Wheat,
  Sprout,
  Dna,
  Bug,
  ShieldCheck,
  Apple,
  TrendingUp,
  Users,
  Beef,
  Cpu,
  BarChart3,
  Tractor,
  Droplets,
  Mountain,
  Cog,
  Sun,
  Award,
  ChevronRight,
  ExternalLink,
  Building,
  GraduationCap,
  FileDown,
  FileText,
  Printer
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { printElement } from '@/utils/printElement';
import { EducationBreadcrumb } from './components/EducationBreadcrumb';
import { EducationHero, HeroTheme } from './components/EducationHero';

interface FacultyBranchViewProps {
  pageData: any;
  facultyType?: 'science' | 'engineering';
}

const ICON_MAP: Record<string, React.ElementType> = {
  Wheat,
  Sprout,
  Dna,
  Bug,
  ShieldCheck,
  Apple,
  TrendingUp,
  Users,
  Beef,
  Cpu,
  BarChart3,
  Tractor,
  Droplets,
  Mountain,
  Cog,
  Sun
};

// Official syllabus files from mpkv.ac.in
const SCIENCE_SYLLABUS = [
  { sr: 1, name: 'Agricultural Botany', file: 'https://mpkv.ac.in/Uploads/Education/20261117_154213_1197ded4821328ce9063b9c68c5c0354.pdf' },
  { sr: 2, name: 'Molecular Biology & Biotechnology', file: 'https://mpkv.ac.in/Uploads/Education/20261022_164041_cf4aa674da2200b202acbb7ac5fe9bbb.pdf' },
  { sr: 3, name: 'Agricultural Entomology', file: 'https://mpkv.ac.in/Uploads/Education/Agril.%20ENTO-converted-converted_20200303111528.pdf' },
  { sr: 4, name: 'Agricultural Extension & Communication', file: 'https://mpkv.ac.in/Uploads/Education/Agricultural%20Extension%20&%20Communication_20210602125410.pdf' },
  { sr: 5, name: 'Agricultural Meteorology', file: 'https://mpkv.ac.in/Uploads/Education/20260924_161047_c15898f7f38bc63a1426ffd442e10218.pdf' },
  { sr: 6, name: 'Agronomy', file: 'https://mpkv.ac.in/Uploads/Education/Agronomy_20210602042817.pdf' },
  { sr: 7, name: 'Animal Husbandry & Dairy Science', file: 'https://mpkv.ac.in/Uploads/Education/Animal%20Husbandry%20&%20Dairy%20Science_20210602042828.pdf' },
  { sr: 8, name: 'Biochemistry', file: 'https://mpkv.ac.in/Uploads/Education/20261104_175318_12bd63568f09cbe085d9fe367908dc3e.pdf' },
  { sr: 9, name: 'Horticulture (Fruit & Vegetable Science)', file: 'https://mpkv.ac.in/Uploads/Education/20261116_172948_94b0d1c1ce15a1b25e655768139e62ce.pdf' },
  { sr: 10, name: 'Plant Pathology & Agricultural Microbiology', file: 'https://mpkv.ac.in/Uploads/Education/20261104_123413_91cd884c6f3916af13a1bb428698e7e8.pdf' },
  { sr: 11, name: 'Soil Science & Agricultural Chemistry', file: 'https://mpkv.ac.in/Uploads/Education/20261103_175453_ada704052d3378d20a71c239bfb471bc.pdf' },
  { sr: 12, name: 'Agricultural Statistics & Mathematics', file: 'https://mpkv.ac.in/Uploads/Education/20261119_175029_4b46ae655839a756c0206f99a876a723.pdf' },
  { sr: 13, name: 'Irrigation Water Management', file: 'https://mpkv.ac.in/Uploads/Education/Irrigation%20Water%20Management_20191223030154.pdf' },
  { sr: 14, name: 'Agricultural Economics', file: 'https://mpkv.ac.in/Uploads/Education/Economics_20250715110006.pdf' }
];

const ENGG_SYLLABUS = [
  { sr: 1, name: 'Agricultural Process Engineering (APE)', file: 'https://mpkv.ac.in/Uploads/Education/APE_20210602043724.pdf' },
  { sr: 2, name: 'Farm Machinery & Power Engineering (FMPE)', file: 'https://mpkv.ac.in/Uploads/Education/FMPE_20191223123144.pdf' },
  { sr: 3, name: 'Irrigation & Drainage Engineering (IDE)', file: 'https://mpkv.ac.in/Uploads/Education/IDE_20191223123058%20(1)_20200213010526.pdf' },
  { sr: 4, name: 'Soil & Water Conservation Engineering (SWCE)', file: 'https://mpkv.ac.in/Uploads/Education/SWCE_20191223123023.pdf' }
];

export const FacultyBranchView: React.FC<FacultyBranchViewProps> = ({ pageData, facultyType = 'science' }) => {
  const { language, getBilingual } = useLanguage();

  const isEngg = facultyType === 'engineering' || pageData?.slug?.includes('engineering');

  const breadcrumbItems = pageData?.breadcrumb || [
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Faculty Branches', mr: 'विद्याशाखा' }, href: '/education/faculty-agricultural-science' },
    { title: pageData?.title || (isEngg ? { en: 'Agricultural Engineering', mr: 'कृषि अभियांत्रिकी शाखा' } : { en: 'Agricultural Science', mr: 'कृषि विज्ञान शाखा' }) }
  ];

  const heroTitle = pageData?.hero?.title || pageData?.title;
  const heroSubtitle = pageData?.hero?.subtitle || (isEngg
    ? {
        en: 'Spearheading agricultural mechanization, smart irrigation, renewable energy, and post-harvest engineering through Dr. ASCAET Rahuri and Kashti colleges.',
        mr: 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय राहुरी व काष्टी द्वारे शेती यांत्रिकीकरण, सिंचन व प्रक्रिया अभियांत्रिकीचे नेतृत्व.'
      }
    : {
        en: 'The foundation pillar of MPKV coordinating 11 academic departments, 8 constituent colleges, postgraduate institute research, and extension activities.',
        mr: 'मफुकृवि चा मुख्य आधारस्तंभ — ११ शैक्षणिक विभाग, ८ घटक महाविद्यालये आणि पदव्युत्तर संशोधन संस्थांचा शैक्षणिक समन्वय.'
      });

  const heroBadge = pageData?.hero?.badge || (isEngg
    ? {
        en: 'Dr. ASCAET Rahuri (Est. 1969) | 5 Engineering Departments | National Testing Center',
        mr: 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय (स्था. १९६९) | ५ अभियांत्रिकी विभाग'
      }
    : {
        en: '11 Academic Departments | 14 Constituent Campuses | 100+ Professors',
        mr: '११ शैक्षणिक विभाग | १४ घटक संकुले | १०० हून अधिक प्राध्यापक'
      });

  const heroTheme: HeroTheme = isEngg ? 'engineering' : 'science';

  const quickChips = isEngg
    ? [
        { label: language === 'mr' ? 'डॉ. अण्णासाहेब शिंदे महाविद्यालय (स्था. १९६९)' : 'Dr. ASCAET Rahuri (Est. 1969)' },
        { label: language === 'mr' ? '५ विशेषज्ञ अभियांत्रिकी विभाग' : '5 Engineering Divisions' },
        { label: language === 'mr' ? 'राष्ट्रीय ट्रॅक्टर चाचणी केंद्र' : 'National Tractor Testing Center' }
      ]
    : [
        { label: language === 'mr' ? '११ मूलभूत कृषि विभाग' : '11 Core Agricultural Departments' },
        { label: language === 'mr' ? '१४ अभ्यासक्रम रूपरेषा पुस्तिका' : '14 Official Syllabi Frameworks' },
        { label: language === 'mr' ? '१००+ प्राध्यापक व शास्त्रज्ञ' : '100+ Senior Faculty & Scientists' }
      ];

  const departments: any[] = pageData?.departments || [];
  const syllabusList = isEngg ? ENGG_SYLLABUS : SCIENCE_SYLLABUS;

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
        
        {/* Intro Highlight Banner */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {isEngg ? (language === 'mr' ? 'अभियांत्रिकी उत्कृष्टता' : 'Engineering Excellence') : (language === 'mr' ? 'मूलभूत कृषि संशोधन' : 'Core Agricultural Disciplines')}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                {isEngg
                  ? (language === 'mr' ? 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी व तंत्रज्ञान महाविद्यालय, राहुरी' : 'Dr. Annasaheb Shinde College of Agril. Engineering & Technology')
                  : (language === 'mr' ? 'कृषि विज्ञान विद्याशाखेची ११ प्रमुख शैक्षणिक दालने' : '11 Foundational Academic Departments in Agriculture')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isEngg
                  ? (language === 'mr'
                      ? 'महाराष्ट्रातील पहिल्या कृषि अभियांत्रिकी महाविद्यालयाची स्थापना १९६९ मध्ये राहुरी येथे झाली. येथे बी.टेक., एम.टेक. व पीएच.डी. चे उच्च शिक्षण, राष्ट्रीय ट्रॅक्टर चाचणी केंद्र आणि जीआयएस लॅब कार्यरत आहे.'
                      : 'Established in 1969, Dr. ASCAET Rahuri is the pioneer agricultural engineering institution in Western India, featuring tractor testing accreditation, precision hydraulics, and solar energy research.')
                  : (language === 'mr'
                      ? 'मफुकृवि च्या कृषि विज्ञान शाखेत ११ मूलभूत विभाग कार्यरत असून ते पदवी, पदव्युत्तर व आचार्य पदवी स्तरावर उच्च दर्जाचे अध्यापन आणि प्रायोगिक संशोधन करतात.'
                      : 'The Faculty of Agricultural Science coordinates 11 major teaching and research departments delivering ICAR VI Deans Committee aligned UG, PG, and Doctoral degrees.')}
              </p>
            </div>
            <Link
              href={isEngg ? '/education/bachelors' : '/education/constituent-colleges'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs shrink-0"
            >
              <span>{isEngg ? (language === 'mr' ? 'बी.टेक. अभ्यासक्रम पहा' : 'View B.Tech. Details') : (language === 'mr' ? 'घटक महाविद्यालये पहा' : 'View Colleges')}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Departments Grid */}
        <section aria-labelledby="departments-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
                <Building className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'mr' ? 'विभाग रचना' : 'Academic Structure'}</span>
              </div>
              <h2 id="departments-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {isEngg
                  ? (language === 'mr' ? 'कृषि अभियांत्रिकीचे ५ प्रमुख विभाग' : '5 Core Agricultural Engineering Departments')
                  : (language === 'mr' ? 'कृषि विज्ञानातील ११ शैक्षणिक विभाग' : '11 Academic Departments in Agricultural Sciences')}
              </h2>
            </div>
            <button
              onClick={() => printElement('faculty-departments-printable', isEngg ? (language === 'mr' ? 'कृषि अभियांत्रिकी विभाग' : 'Agricultural Engineering Departments') : (language === 'mr' ? 'कृषि विज्ञान विभाग' : 'Agricultural Science Departments'))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer shrink-0 self-start sm:self-auto no-print"
              title={language === 'mr' ? 'विभागांची यादी प्रिंट करा' : 'Print Departments List'}
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
            </button>
          </div>

          <div id="faculty-departments-printable">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept: any, idx: number) => {
              const Icon = ICON_MAP[dept.icon] || Building;
              return (
                <div
                  key={dept.id || idx}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-black text-stone-300">
                        #{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {getBilingual(dept.name)}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {getBilingual(dept.mandate)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between text-xs font-semibold text-emerald-800">
                    <span>{isEngg ? 'B.Tech. / M.Tech. / Ph.D.' : 'B.Sc. / M.Sc. / Ph.D.'}</span>
                    <span className="text-stone-400 font-normal">Active Department</span>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </section>

        {/* Official Syllabus PDFs Download Grid */}
        <section aria-labelledby="syllabus-downloads-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <h3 id="syllabus-downloads-heading" className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-800" />
                <span>{language === 'mr' ? 'अभ्यासक्रम पुस्तिका व मार्गदर्शक फायली' : 'Departmental Syllabi & Course Outlines (PDF Downloads)'}</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {language === 'mr' ? 'भा.कृ.अनु.प. शिफारशींनुसार अधिकृत अभ्यासक्रम फायली.' : 'Official course outline documents from the University portal.'}
              </p>
            </div>
            <button
              onClick={() => printElement('faculty-syllabi-printable', language === 'mr' ? 'विभागवार अभ्यासक्रम पुस्तिका यादी' : 'Departmental Syllabi & Course Outlines')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer shrink-0 self-start sm:self-auto no-print"
              title={language === 'mr' ? 'अभ्यासक्रम यादी प्रिंट करा' : 'Print Syllabi List'}
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
            </button>
          </div>

          <div id="faculty-syllabi-printable">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {syllabusList.map((item) => (
              <a
                key={item.sr}
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-xs transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <FileDown className="w-4 h-4 text-emerald-700 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-emerald-900 truncate">
                    {item.name}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                  PDF
                </span>
              </a>
            ))}
          </div>
          </div>
        </section>

        {/* Dual Faculty Quick Switcher Banner */}
        <section className="bg-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-stone-900">
              {isEngg
                ? (language === 'mr' ? 'कृषि विज्ञान विद्याशाखेची माहिती पाहू इच्छिता?' : 'Looking for Faculty of Agricultural Science?')
                : (language === 'mr' ? 'कृषि अभियांत्रिकी विद्याशाखेची माहिती पाहू इच्छिता?' : 'Looking for Faculty of Agricultural Engineering?')}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              {isEngg
                ? (language === 'mr' ? '११ मूलभूत कृषि विभाग, पीक पैदास, मृद विज्ञान व कीटकशास्त्र.' : 'Explore 11 foundational agricultural science departments and PG institute.')
                : (language === 'mr' ? 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय व ५ अभियांत्रिकी शाखा.' : 'Explore Dr. ASCAET Rahuri and 5 engineering departments.')}
            </p>
          </div>
          <Link
            href={isEngg ? '/education/faculty-agricultural-science' : '/education/faculty-agricultural-engineering'}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-emerald-900 font-bold text-xs sm:text-sm border border-stone-300 transition-colors shrink-0 shadow-xs"
          >
            <span>{isEngg ? (language === 'mr' ? 'कृषि विज्ञान शाखा →' : 'Agricultural Science →') : (language === 'mr' ? 'कृषि अभियांत्रिकी शाखा →' : 'Agril Engineering →')}</span>
          </Link>
        </section>

      </div>
    </article>
  );
};
