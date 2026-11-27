'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  UserCheck,
  Building2,
  BookOpen,
  GraduationCap,
  Sparkles,
  School,
  Library,
  HeartHandshake,
  Layers,
  CheckCircle2,
  Maximize2,
  Minimize2,
  Printer
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { printElement } from '@/utils/printElement';

export const OrganizationalTreeDiagram: React.FC = () => {
  const { language, getBilingual } = useLanguage();
  const [selectedBranch, setSelectedBranch] = useState<'all' | 'agri' | 'engg' | 'lower' | 'officers'>('all');
  const [expandedSection, setExpandedSection] = useState<{ [key: string]: boolean }>({
    agriColleges: true,
    agriDepts: true,
    enggColleges: true,
    enggDepts: true,
    lowerSchools: true
  });

  const toggleSection = (key: string) => {
    setExpandedSection(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Agriculture Colleges (9 Listed in Chart)
  const agriColleges = [
    { en: 'College of Agriculture, Pune', mr: 'कृषि महाविद्यालय, पुणे' },
    { en: 'College of Agriculture, Dhule', mr: 'कृषि महाविद्यालय, धुळे' },
    { en: 'RCSM College of Agriculture, Kolhapur', mr: 'राजर्षी छत्रपती शाहू महाराज कृषि महाविद्यालय, कोल्हापूर' },
    { en: 'College of Agriculture, Nandurbar', mr: 'कृषि महाविद्यालय, नंदुरबार' },
    { en: 'College of Agriculture, Karad', mr: 'यशवंतराव चव्हाण कृषि महाविद्यालय, कराड' },
    { en: 'College of Agriculture, Muktainagar', mr: 'कृषि महाविद्यालय, मुक्ताईनगर' },
    { en: 'PAH College of Agriculture, Halgaon', mr: 'पुण्यश्लोक अहिल्यादेवी होळकर कृषि महाविद्यालय, हळगाव' },
    { en: 'College of Horticulture, Pune', mr: 'उद्यानविद्या महाविद्यालय, पुणे' },
    { en: 'Post Graduate Institute, Rahuri', mr: 'पदव्युत्तर संस्था (PGI), राहुरी' }
  ];

  // Agriculture 14 Departments
  const agriDepartments = [
    { en: 'Agricultural Botany', mr: 'कृषि वनस्पतीशास्त्र विभाग' },
    { en: 'Agricultural Economics', mr: 'कृषि अर्थशास्त्र विभाग' },
    { en: 'Agricultural Entomology', mr: 'कृषि कीटकशास्त्र विभाग' },
    { en: 'Agricultural Extension & Communication', mr: 'कृषि विस्तार व संप्रेषण विभाग' },
    { en: 'Agricultural Meteorology', mr: 'कृषि हवामानशास्त्र विभाग' },
    { en: 'Agronomy', mr: 'कृषिविद्या विभाग' },
    { en: 'Animal Husbandry & Dairy Science', mr: 'पशुसंवर्धन व दुग्धशास्त्र विभाग' },
    { en: 'Biochemistry', mr: 'जीवरसायनशास्त्र विभाग' },
    { en: 'Food Science & Technology', mr: 'अन्न विज्ञान व तंत्रज्ञान विभाग' },
    { en: 'Horticulture', mr: 'उद्यानविद्या विभाग' },
    { en: 'Irrigation Water Management', mr: 'सिंचन जल व्यवस्थापन विभाग' },
    { en: 'Plant Pathology & Agricultural Microbiology', mr: 'वनस्पती रोगशास्त्र व सूक्ष्मजीवशास्त्र विभाग' },
    { en: 'Soil Science & Agricultural Chemistry', mr: 'मृद विज्ञान व कृषि रसायनशास्त्र विभाग' },
    { en: 'Statistics', mr: 'संख्याशास्त्र व गणित विभाग' }
  ];

  // Engineering 5 Departments
  const enggDepartments = [
    { en: 'Agricultural Process Engineering', mr: 'कृषि प्रक्रिया अभियांत्रिकी विभाग' },
    { en: 'Farm Machinery & Power Engineering', mr: 'कृषि यंत्रे व शक्ती अभियांत्रिकी विभाग' },
    { en: 'Farm Structure and Rural Electrification', mr: 'शेती रचना व ग्रामीण विद्युतीकरण विभाग' },
    { en: 'Irrigation & Drainage Engineering', mr: 'सिंचन व निचरा अभियांत्रिकी विभाग' },
    { en: 'Soil & Water Conservation Engineering', mr: 'मृद व जलसंधारण अभियांत्रिकी विभाग' }
  ];

  return (
    <section aria-labelledby="org-tree-heading" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-1">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'mr' ? 'संस्थात्मक झाड रचना' : 'Institutional Hierarchy'}</span>
          </div>
          <h2 id="org-tree-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            {language === 'mr' ? 'शैक्षणिक प्रशासन वृक्ष रचना' : 'Educational Administration Tree Structure'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {language === 'mr'
              ? 'कुलगुरू यांच्या सर्वोच्च नेतृत्वाखालील शिक्षण संचालनालय, विद्याशाखा, महाविद्यालये व विभागांची अधिकृत प्रशासकीय उतरंड.'
              : 'Official organizational hierarchy from Hon\'ble Vice Chancellor to Faculties, Constituent Colleges, and Academic Departments.'}
          </p>
        </div>

        {/* Quick Filter Buttons & Print */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto flex-wrap">
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200">
            {[
              { id: 'all' as const, label: { en: 'Full Tree View', mr: 'संपूर्ण वृक्ष' } },
              { id: 'agri' as const, label: { en: 'Agriculture', mr: 'कृषि' } },
              { id: 'engg' as const, label: { en: 'Engineering', mr: 'अभियांत्रिकी' } },
              { id: 'lower' as const, label: { en: 'Lower Education', mr: 'कनिष्ठ शिक्षण' } },
              { id: 'officers' as const, label: { en: 'University Officers', mr: 'अधिकारी' } }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedBranch(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedBranch === tab.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {getBilingual(tab.label)}
              </button>
            ))}
          </div>

          <button
            onClick={() => printElement('org-tree-printable', language === 'mr' ? 'मफुकृवि शिक्षण संचालनालय संस्थात्मक आकृतीबंध' : 'Directorate of Education Organizational Hierarchy Tree')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer no-print"
            title={language === 'mr' ? 'वृक्ष रचना प्रिंट करा' : 'Print Tree Structure'}
          >
            <Printer className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Main Tree Container */}
      <div id="org-tree-printable" className="bg-gradient-to-b from-stone-50 via-white to-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs overflow-x-auto">
        <div className="min-w-[760px] flex flex-col items-center">
          
          {/* ======================================================== */}
          {/* LEVEL 1: VICE CHANCELLOR (ROOT NODE)                    */}
          {/* ======================================================== */}
          <div className="relative group">
            <div className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-950 text-white shadow-md border-2 border-purple-400/40 text-center flex flex-col items-center">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                {language === 'mr' ? 'सर्वोच्च विद्यापीठ प्रमुख' : 'Supreme University Executive'}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white mt-0.5">
                {language === 'mr' ? 'मा. कुलगुरू' : 'Vice Chancellor'}
              </h3>
            </div>
            
            {/* Stem to Level 2 */}
            <div className="w-0.5 h-8 bg-stone-300 mx-auto" />
            <div className="w-2.5 h-2.5 rounded-full bg-purple-700 mx-auto -mt-1.5 ring-4 ring-white" />
          </div>

          {/* ======================================================== */}
          {/* LEVEL 2: DIRECTOR OF EDUCATION                           */}
          {/* ======================================================== */}
          <div className="relative mt-2">
            <div className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white shadow-md border-2 border-emerald-400/40 text-center flex flex-col items-center">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                {language === 'mr' ? 'शैक्षणिक प्रमुख' : 'Head of Academic Affairs'}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white mt-0.5">
                {language === 'mr' ? 'शिक्षण संचालक' : 'Director of Education'}
              </h3>
              <p className="text-xs text-emerald-100 font-medium mt-0.5">
                {language === 'mr' ? 'डॉ. एस. बी. खर्बडे (प्रभारी)' : 'Dr. S. B. Kharbade (I/c)'}
              </p>
            </div>

            {/* Stem to Horizontal Junction */}
            <div className="w-0.5 h-8 bg-stone-300 mx-auto" />
          </div>

          {/* ======================================================== */}
          {/* LEVEL 3 HORIZONTAL BUS BAR (Faculties | Library | SWO)    */}
          {/* ======================================================== */}
          <div className="w-full relative">
            {/* Horizontal connecting line across 3 major branches */}
            <div className="w-5/6 mx-auto h-0.5 bg-stone-300" />

            <div className="grid grid-cols-12 gap-4 pt-4 items-start">
              
              {/* BRANCH 1: FACULTIES (Takes Col 1 to 8) */}
              {(selectedBranch === 'all' || selectedBranch === 'agri' || selectedBranch === 'engg' || selectedBranch === 'lower') && (
                <div className={`${selectedBranch === 'all' ? 'col-span-8' : 'col-span-12'} flex flex-col items-center`}>
                  {/* Vertical drop line */}
                  <div className="w-0.5 h-4 bg-stone-300 -mt-4 mb-2" />
                  
                  {/* Node Header: Faculties */}
                  <div className="px-6 py-2.5 rounded-xl bg-emerald-900 text-white font-bold text-sm shadow-xs border border-emerald-700/60 flex items-center gap-2 mb-4">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span>{language === 'mr' ? 'विद्याशाखा' : 'Faculties'}</span>
                  </div>

                  {/* Horizontal bar under Faculties for 3 Streams */}
                  <div className="w-full h-0.5 bg-emerald-200 mb-4" />

                  {/* 3 Streams Grid: Agriculture | Engineering | Lower Agri Education */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start">
                    
                    {/* ---------------------------------------------------- */}
                    {/* STREAM 1: AGRICULTURE (DEAN)                        */}
                    {/* ---------------------------------------------------- */}
                    {(selectedBranch === 'all' || selectedBranch === 'agri') && (
                      <div className="bg-white rounded-2xl border-2 border-emerald-300 p-4 shadow-xs space-y-3">
                        <div className="text-center pb-2 border-b border-emerald-100">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-1">
                            Dean (Agriculture)
                          </span>
                          <h4 className="text-sm font-bold text-stone-900">
                            {language === 'mr' ? 'कृषि शाखा' : 'Agriculture'}
                          </h4>
                        </div>

                        {/* Sub-Branch A: Colleges (Dean) */}
                        <div className="space-y-1.5">
                          <button
                            onClick={() => toggleSection('agriColleges')}
                            className="w-full flex items-center justify-between text-left p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/70 text-emerald-950 font-bold text-xs transition-colors"
                          >
                            <span>{language === 'mr' ? 'घटक महाविद्यालये' : 'Colleges (Dean)'} ({agriColleges.length})</span>
                            {expandedSection.agriColleges ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {expandedSection.agriColleges && (
                            <ul className="space-y-1 pl-2 border-l-2 border-emerald-200 text-[11px] text-stone-700">
                              {agriColleges.map((col, idx) => (
                                <li key={idx} className="hover:text-emerald-900 transition-colors flex items-start gap-1.5">
                                  <span className="text-emerald-600 font-bold">•</span>
                                  <span>{getBilingual(col)}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Sub-Branch B: Departments (Head) */}
                        <div className="space-y-1.5 pt-2 border-t border-stone-100">
                          <button
                            onClick={() => toggleSection('agriDepts')}
                            className="w-full flex items-center justify-between text-left p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100/70 text-amber-950 font-bold text-xs transition-colors"
                          >
                            <span>{language === 'mr' ? '१४ विभाग' : 'Departments (Head)'} ({agriDepartments.length})</span>
                            {expandedSection.agriDepts ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {expandedSection.agriDepts && (
                            <ul className="space-y-1 pl-2 border-l-2 border-amber-200 text-[11px] text-stone-700 max-h-56 overflow-y-auto pr-1">
                              {agriDepartments.map((dept, idx) => (
                                <li key={idx} className="hover:text-amber-900 transition-colors flex items-start gap-1.5">
                                  <span className="text-amber-600 font-bold">•</span>
                                  <span>{getBilingual(dept)}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ---------------------------------------------------- */}
                    {/* STREAM 2: AGRICULTURAL ENGINEERING                  */}
                    {/* ---------------------------------------------------- */}
                    {(selectedBranch === 'all' || selectedBranch === 'engg') && (
                      <div className="bg-white rounded-2xl border-2 border-blue-300 p-4 shadow-xs space-y-3">
                        <div className="text-center pb-2 border-b border-blue-100">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 inline-block mb-1">
                            Dean (Agril. Engg)
                          </span>
                          <h4 className="text-sm font-bold text-stone-900">
                            {language === 'mr' ? 'कृषि अभियांत्रिकी' : 'Agricultural Engineering'}
                          </h4>
                        </div>

                        {/* College: Dr. ASCAET Rahuri */}
                        <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1 text-xs">
                          <span className="text-[10px] font-bold text-blue-800 uppercase block">College (Dean)</span>
                          <span className="font-bold text-stone-900 block leading-tight">
                            {language === 'mr'
                              ? 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी व तंत्रज्ञान महाविद्यालय, राहुरी'
                              : 'Dr. AS College of Agricultural Engineering & Technology, Rahuri'}
                          </span>
                        </div>

                        {/* 5 Engineering Departments */}
                        <div className="space-y-1.5 pt-1">
                          <button
                            onClick={() => toggleSection('enggDepts')}
                            className="w-full flex items-center justify-between text-left p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs transition-colors"
                          >
                            <span>{language === 'mr' ? '५ अभियांत्रिकी विभाग' : 'Departments (Head)'} ({enggDepartments.length})</span>
                            {expandedSection.enggDepts ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {expandedSection.enggDepts && (
                            <ul className="space-y-1.5 pl-2 border-l-2 border-blue-300 text-[11px] text-stone-700">
                              {enggDepartments.map((dept, idx) => (
                                <li key={idx} className="hover:text-blue-900 transition-colors flex items-start gap-1.5">
                                  <span className="text-blue-600 font-bold">•</span>
                                  <span>{getBilingual(dept)}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ---------------------------------------------------- */}
                    {/* STREAM 3: LOWER AGRICULTURAL EDUCATION              */}
                    {/* ---------------------------------------------------- */}
                    {(selectedBranch === 'all' || selectedBranch === 'lower') && (
                      <div className="bg-white rounded-2xl border-2 border-amber-300 p-4 shadow-xs space-y-3">
                        <div className="text-center pb-2 border-b border-amber-100">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 inline-block mb-1">
                            Dean (Lower Agri)
                          </span>
                          <h4 className="text-sm font-bold text-stone-900">
                            {language === 'mr' ? 'कनिष्ठ कृषि शिक्षण' : 'Lower Agricultural Education'}
                          </h4>
                        </div>

                        <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5 text-xs">
                          <span className="text-[10px] font-bold text-amber-900 uppercase block">
                            Agricultural Technical Schools (Principal)
                          </span>
                          <span className="font-bold text-stone-900 block leading-tight">
                            {language === 'mr' ? 'कृषि तंत्र विद्यालये (प्राचार्य)' : 'Agricultural Technical Schools (Principal)'}
                          </span>
                          <p className="text-[11px] text-stone-600 leading-relaxed">
                            {language === 'mr'
                              ? '९ घटक तंत्र विद्यालये, ७६ संलग्न विद्यालये व २२ कृषि तंत्रनिकेतनांचे संचलन.'
                              : 'Administers 9 constituent and 76 affiliated schools plus polytechnics.'}
                          </p>
                        </div>

                        <Link
                          href="/education/diploma-schools"
                          className="inline-flex items-center justify-center gap-1 w-full py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
                        >
                          <span>{language === 'mr' ? 'सर्व विद्यालये पहा' : 'View All Schools'}</span>
                        </Link>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* BRANCH 2: UNIVERSITY LIBRARIAN (Col 9-10) */}
              {(selectedBranch === 'all' || selectedBranch === 'officers') && (
                <div className={`${selectedBranch === 'all' ? 'col-span-2' : 'col-span-6'} flex flex-col items-center`}>
                  <div className="w-0.5 h-4 bg-stone-300 -mt-4 mb-2" />
                  <div className="w-full bg-white rounded-2xl border-2 border-indigo-200 p-4 shadow-xs text-center space-y-2 hover:border-indigo-400 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
                      <Library className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-indigo-700 block">
                        Statutory Officer
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5">
                        {language === 'mr' ? 'विद्यापीठ ग्रंथपाल' : 'University Librarian'}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      {language === 'mr' ? 'मध्यवर्ती व संकुल ग्रंथालये' : 'Central & Campus Libraries'}
                    </p>
                  </div>
                </div>
              )}

              {/* BRANCH 3: STUDENT'S WELFARE OFFICER (Col 11-12) */}
              {(selectedBranch === 'all' || selectedBranch === 'officers') && (
                <div className={`${selectedBranch === 'all' ? 'col-span-2' : 'col-span-6'} flex flex-col items-center`}>
                  <div className="w-0.5 h-4 bg-stone-300 -mt-4 mb-2" />
                  <div className="w-full bg-white rounded-2xl border-2 border-rose-200 p-4 shadow-xs text-center space-y-2 hover:border-rose-400 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mx-auto">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-rose-700 block">
                        Student Care
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5">
                        {language === 'mr' ? 'विद्यार्थी कल्याण अधिकारी' : 'Student\'s Welfare Officer'}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      {language === 'mr' ? 'वसतिगृह, क्रीडा, NSS व कल्याण' : 'Hostels, Sports, NSS & Welfare'}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
