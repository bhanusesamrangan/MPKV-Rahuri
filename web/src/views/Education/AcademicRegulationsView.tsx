'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  UserCheck,
  Award,
  ShieldAlert,
  ChevronRight,
  Download,
  AlertCircle,
  CheckCircle2,
  FileText,
  Printer
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { printElement } from '@/utils/printElement';
import { EducationBreadcrumb } from './components/EducationBreadcrumb';
import { EducationHero } from './components/EducationHero';

interface AcademicRegulationsViewProps {
  pageData: any;
}

export const AcademicRegulationsView: React.FC<AcademicRegulationsViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const [activeModule, setActiveModule] = useState<string>('credits');

  const breadcrumbItems = pageData?.breadcrumb || [
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Overview & Profile', mr: 'संस्थेची माहिती व रूपरेषा' }, href: '/education/at-a-glance' },
    { title: { en: 'Academic Regulations', mr: 'शैक्षणिक नियमावली' } }
  ];

  const heroTitle = pageData?.hero?.title || {
    en: 'Comprehensive Academic Guidelines & Examination Rules',
    mr: 'सर्वसमावेशक शैक्षणिक नियमावली व परीक्षा नियम'
  };
  const heroSubtitle = pageData?.hero?.subtitle || {
    en: 'Official rules governing admissions, credit systems, grading scales, attendance, examinations, and student discipline.',
    mr: 'प्रवेश, श्रेयांक पद्धती, परीक्षा मूल्यमापन, हजेरी नियम आणि शिस्तविषयक अधिकृत नियमावली.'
  };
  const heroBadge = pageData?.hero?.badge || {
    en: 'Approved by the Academic Council & ICAR Guidelines',
    mr: 'विद्या परिषद व भा.कृ.अनु.प. मान्यताप्राप्त नियमावली'
  };

  const modules = [
    {
      id: 'credits',
      title: { en: 'Credit Hours & Semester System', mr: 'श्रेयांक पद्धती व सत्रावधी' },
      icon: BookOpen,
      badge: 'Academic Framework',
      points: [
        {
          en: 'The Academic Year is divided into two regular semesters, each comprising a minimum of 110 effective working days.',
          mr: 'शैक्षणिक वर्ष दोन सत्रांमध्ये विभागलेले असून प्रत्येक सत्रात किमान ११० कामकाजाचे दिवस अनिवार्य असतात.'
        },
        {
          en: 'One Credit represents one hour of theory lecture or two hours of laboratory/practical fieldwork per week.',
          mr: '१ श्रेयांक म्हणजे दर आठवड्याला १ तास व्याख्यान किंवा २ तास प्रयोगशाळा/शेत प्रात्यक्षिक.'
        },
        {
          en: 'Undergraduate students must complete the prescribed credit load (approx. 160–184 credits) across 8 semesters.',
          mr: 'पदवी विद्यार्थ्यांसाठी ८ सत्रांतर्गत सुमारे १६० ते १८४ श्रेयांक यशस्वीरीत्या पूर्ण करणे बंधनकारक आहे.'
        },
        {
          en: 'Continuous evaluation model: 20% Mid-term examination + 50% Semester-End theory + 30% Practical assessment.',
          mr: 'सातत्यपूर्ण मूल्यमापन: २०% सत्रमध्य परीक्षा + ५०% सत्रांत लेखी परीक्षा + ३०% प्रात्यक्षिक परीक्षा.'
        }
      ]
    },
    {
      id: 'attendance',
      title: { en: 'Attendance & Examination Eligibility', mr: 'हजेरी व परीक्षा पात्रता' },
      icon: UserCheck,
      badge: 'Mandatory Policy',
      points: [
        {
          en: 'Minimum 80% attendance in both theory and practicals separately is mandatory to appear for semester end examinations.',
          mr: 'सत्रांत परीक्षेसाठी प्रत्येक विषयाच्या लेखी व प्रात्यक्षिक वर्गात स्वतंत्रपणे किमान ८०% हजेरी असणे अनिवार्य आहे.'
        },
        {
          en: 'In genuine medical illness or official university sports/NSS deputation, a condolence up to 10% may be granted by Dean.',
          mr: 'वैद्यकीय कारणे किंवा अधिकृत क्रीडा/रासेयो सहभागासाठी अधिष्ठात्यांच्या मान्यतेने कमाल १०% सवलत दिली जाऊ शकते.'
        },
        {
          en: 'Students falling below 70% attendance are strictly treated as deregistered and must re-register the course when offered.',
          mr: '७०% पेक्षा कमी हजेरी असणाऱ्या विद्यार्थ्यांना त्या विषयातून वगळले जाते व त्यांना तो विषय पुढील वर्षी पुन्हा लावावा लागतो.'
        },
        {
          en: 'Biometric and digital RFID attendance records are monitored weekly at college level.',
          mr: 'महाविद्यालयीन स्तरावर बायोमेट्रिक व डिजिटल हजेरी नोंदीचे साप्ताहिक परीक्षण केले जाते.'
        }
      ]
    },
    {
      id: 'grading',
      title: { en: 'Grading Scale & CGPA / OGPA Calculation', mr: 'गुणदान पद्धती व CGPA सूत्र' },
      icon: Award,
      badge: 'Evaluation Standard',
      points: [
        {
          en: '10-Point Scale Grading System: Grade Point = Marks obtained out of 100 divided by 10.',
          mr: '१०-गुणी मूल्यमापन पद्धती: १०० पैकी मिळालेल्या गुणांना १० ने भागून ग्रेड पॉईंट निश्चित केला जातो.'
        },
        {
          en: 'Minimum Grade Point required to pass a course is 5.00 out of 10.00 for UG and 6.50 for PG/Ph.D.',
          mr: 'विषय उत्तीर्ण होण्यासाठी पदवी स्तरावर किमान ५.०० ग्रेड पॉईंट आणि पदव्युत्तर/पीएच.डी. स्तरावर ६.५० गुण आवश्यक आहेत.'
        },
        {
          en: 'OGPA Criteria: 6.00 to 6.99 (Second Class); 7.00 to 7.99 (First Class); 8.00 and above (First Class with Distinction).',
          mr: 'OGPA श्रेणी: ६.०० ते ६.९९ (द्वितीय श्रेणी); ७.०० ते ७.९९ (प्रथम श्रेणी); ८.०० व त्याहून अधिक (विशेष प्रावीण्य).'
        },
        {
          en: 'Provision for Improvement Examination: Available once for passed courses with GP below 6.00.',
          mr: 'गुण सुधारणा परीक्षा: ६.०० पेक्षा कमी ग्रेड पॉईंट असणाऱ्या उत्तीर्ण विषयांसाठी एकदा संधी.'
        }
      ]
    },
    {
      id: 'conduct',
      title: { en: 'Student Code of Conduct & Anti-Ragging', mr: 'विद्यार्थी आचारसंहिता व रॅगिंग प्रतिबंध' },
      icon: ShieldAlert,
      badge: 'Statutory Law',
      points: [
        {
          en: 'Zero tolerance for ragging under Maharashtra Prohibition of Ragging Act, 1999 with immediate police reporting & expulsion.',
          mr: 'महाराष्ट्र रॅगिंग प्रतिबंधक कायदा १९९९ नुसार रॅगिंगला पूर्णतः बंदी असून गुन्हा सिद्ध झाल्यास तात्काळ निष्कासन व पोलीस कारवाई होते.'
        },
        {
          en: 'Mandatory submission of Anti-Ragging online affidavit by both student and parents on national portal during admission.',
          mr: 'प्रवेशाच्या वेळी प्रत्येक विद्यार्थ्याने व पालकांनी राष्ट्रीय पोर्टलवर रॅगिंगविरोधी ऑनलाईन प्रतिज्ञापत्र देणे सक्तीचे आहे.'
        },
        {
          en: '24x7 Anti-Ragging Squad and Student Grievance Redressal Committee active on every campus.',
          mr: 'प्रत्येक संकुलात २४x७ कार्यरत अँटी-रॅगिंग पथक, सीसीटीव्ही नजर आणि विद्यार्थी तक्रार निवारण कक्ष सक्रिय.'
        },
        {
          en: 'Strict dress code during practical fieldwork and laboratory classes for safety and discipline.',
          mr: 'प्रयोगशाळा व प्रक्षेत्र प्रात्यक्षिकांच्या वेळी सुरक्षिततेसाठी अधिकृत गणवेश व सुरक्षा साधनांचा वापर अनिवार्य.'
        }
      ]
    }
  ];

  const currentModule = modules.find(m => m.id === activeModule) || modules[0];

  return (
    <article className="min-h-screen bg-[#faf9f6] text-stone-800">
      <EducationBreadcrumb items={breadcrumbItems} />
      <EducationHero
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={heroBadge}
        theme="regulations"
        quickChips={[
          { label: language === 'mr' ? 'श्रेयांक व सत्रावधी पद्धती' : 'Choice-Based Credit System' },
          { label: language === 'mr' ? 'अनिवार्य ८०% हजेरी नियम' : 'Mandatory 80% Attendance' },
          { label: language === 'mr' ? 'रॅगिंग प्रतिबंधक कायदा १९९९' : 'Anti-Ragging Act 1999 Zero Tolerance' }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-16">
        
        {/* Anti-Ragging High-Priority Notice */}
        <section aria-label="Statutory Warning">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4 shadow-xs">
            <div className="p-3 rounded-xl bg-amber-500 text-stone-900 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  {language === 'mr' ? 'वैधानिक इशारा' : 'Statutory Notice'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-200">
                  {language === 'mr' ? 'रॅगिंग प्रतिबंधक कायदा १९९९' : 'Zero Tolerance Policy'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                {language === 'mr' ? 'विद्यापीठात रॅगिंगला पूर्णतः बंदी आहे' : 'Ragging is a Cognizable & Punishable Offence'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {language === 'mr'
                  ? 'महाराष्ट्र शासनाच्या रॅगिंग प्रतिबंधक कायदा १९९९ नुसार कोणत्याही स्वरूपाची रॅगिंग करणाऱ्यास २ वर्षांचा कारावास व १०,००० रुपये दंडाची शिक्षा होऊ शकते. तक्रारीसाठी २४x७ राष्ट्रीय हेल्पलाईन: १८००-१८०-५५२२.'
                  : 'Ragging in any form is strictly banned. Any student found guilty will be expelled immediately and handed over to the police under the Maharashtra Prohibition of Ragging Act, 1999. 24x7 National Toll-Free Helpline: 1800-180-5522.'}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Tabbed Regulation Modules */}
        <section aria-labelledby="modules-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'mr' ? 'नियम व अटी' : 'Official Guidelines'}</span>
              </div>
              <h2 id="modules-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {language === 'mr' ? 'शैक्षणिक नियमावलीचे प्रमुख घटक' : 'Key Academic Regulation Modules'}
              </h2>
            </div>
            <button
              onClick={() => printElement('academic-regulations-printable', language === 'mr' ? 'मफुकृवि शैक्षणिक नियमावली व मार्गदर्शक तत्त्वे' : 'MPKV Academic Regulations & Guidelines')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer shrink-0 self-start sm:self-auto no-print"
              title={language === 'mr' ? 'नियमावली प्रिंट करा' : 'Print Regulations'}
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
            </button>
          </div>

          <div id="academic-regulations-printable" className="space-y-6">
          {/* Module Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {modules.map((mod) => {
              const Icon = mod.icon;
              const isActive = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3.5 ${
                    isActive
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30'
                      : 'bg-white text-stone-800 hover:bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${isActive ? 'bg-white/15 text-amber-300' : 'bg-emerald-50 text-emerald-800'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider block ${isActive ? 'text-emerald-200' : 'text-stone-400'}`}>
                      {mod.badge}
                    </span>
                    <h3 className={`text-sm font-bold mt-0.5 leading-snug ${isActive ? 'text-white' : 'text-stone-900'}`}>
                      {getBilingual(mod.title)}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Points Container */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100/70 text-emerald-800">
                    <currentModule.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    {getBilingual(currentModule.title)}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                  {currentModule.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {currentModule.points.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                      {getBilingual(pt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>

      </div>
    </article>
  );
};
