'use client';

import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Calendar,
  Download,
  Search,
  Sprout
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';
import fallbackRecommendationsData from '@/data/scraped/pages/research-recommendations.json';

interface ResearchRecommendationsViewProps {
  pageData?: any;
}

export const ResearchRecommendationsView: React.FC<ResearchRecommendationsViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'annual' | 'cropwise'>('all');

  const annualRecommendations: any[] =
    pageData?.annualRecommendations ||
    (fallbackRecommendationsData as any)?.annualRecommendations ||
    [];

  const cropwiseRecommendations: any[] =
    pageData?.cropwiseRecommendations ||
    (fallbackRecommendationsData as any)?.cropwiseRecommendations ||
    [];

  const filteredCrops = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return cropwiseRecommendations;
    return cropwiseRecommendations.filter((c) =>
      c.titleEn.toLowerCase().includes(q) ||
      c.titleMr.toLowerCase().includes(q)
    );
  }, [cropwiseRecommendations, searchQuery]);

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: 'Agro Recommendations', mr: 'कृषी शिफारसी' }} />

      <ResearchHero
        theme="recommendations"
        badge={{ en: '1,577+ Joint AGRESCO Recommendations', mr: '१,५७७+ संयुक्त अग्रेस्को शिफारसी' }}
        title={{
          en: 'Agro Recommendations — Joint AGRESCO Package of Practices',
          mr: 'कृषी शिफारसी — संयुक्त अग्रेस्को अधिकृत तंत्रज्ञान शिफारसी'
        }}
        subtitle={{
          en: 'Official scientific recommendations on crop production, fertilizer doses, water management, plant protection, and farm machinery ratified at Joint AGRESCO meetings.',
          mr: 'संयुक्त अग्रेस्को बैठकीत शास्त्रोक्त चाचण्यांनंतर मंजूर केलेल्या पीक लागवड, खत-पाणी व्यवस्थापन, कीड नियंत्रण व कृषी अवजारांविषयी अधिकृत शिफारसी.'
        }}
        quickChips={[
          { label: language === 'mr' ? '१,५७७+ एकूण शिफारसी' : '1,577+ Recommendations', icon: CheckCircle2 },
          { label: language === 'mr' ? '२०२२ ते २०२६ वार्षिक संग्रह' : '2022–2026 Annual Archives', icon: Calendar },
          { label: language === 'mr' ? '३४ अधिकृत PDF पुस्तिका' : '34 Official PDF Manuals', icon: Sprout }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">

        {/* Tab Switcher: Guaranteed flex-wrap with inline styles to prevent clipping */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4 overflow-visible">
          <div
            className="flex flex-wrap items-center gap-2 text-xs font-bold w-full md:w-auto"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'all'
                  ? 'bg-cyan-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'mr' ? 'सर्व शिफारसी (१९)' : 'All Recommendations (19)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('annual')}
              className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'annual'
                  ? 'bg-cyan-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'mr' ? 'वर्षनिहाय संग्रह (२०२२-२०२६)' : 'Annual Compendiums (2022–2026)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cropwise')}
              className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'cropwise'
                  ? 'bg-cyan-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'mr' ? 'पीकनिहाय तंत्रज्ञान पुस्तिका (१४)' : 'Crop-Wise Manuals (14)'}
            </button>
          </div>

          <span className="text-xs font-bold text-stone-500 shrink-0">
            {language === 'mr' ? 'सर्व ३४ अधिकृत PDF डाउनलोड उपलब्ध' : 'All 34 Official PDFs Ready'}
          </span>
        </div>

        {/* Section 1: Annual Joint AGRESCO Compendiums (2026 to 2022) */}
        {(activeTab === 'all' || activeTab === 'annual') && (
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-100 text-cyan-950 border border-cyan-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-700" />
                <span>{language === 'mr' ? 'वर्षनिहाय अग्रेस्को राजपत्र' : 'Annual AGRESCO Gazettes'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'mr' ? 'वर्षनिहाय संयुक्त अग्रेस्को शिफारसी पुस्तिका (२०२२ ते २०२६)' : 'Annual Joint AGRESCO Recommendation Compendiums'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {annualRecommendations.map((item) => (
                <div
                  key={item.year}
                  className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-cyan-950 font-serif">
                        {item.year}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-cyan-100 text-cyan-900 border border-cyan-200">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug">
                      {language === 'mr' ? item.titleMr : item.titleEn}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-medium">
                      {language === 'mr' ? item.descMr : item.descEn}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                    <a
                      href={item.mrPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-2xs hover:scale-105"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'मराठी PDF' : 'Marathi PDF'}</span>
                      {item.mrSize && <span className="text-[10px] opacity-80">({item.mrSize})</span>}
                    </a>

                    <a
                      href={item.enPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-800 hover:bg-cyan-700 text-white font-bold text-xs transition-all shadow-2xs hover:scale-105"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>English PDF</span>
                      {item.enSize && <span className="text-[10px] text-cyan-200">({item.enSize})</span>}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Crop-Wise Package of Practices Table */}
        {(activeTab === 'all' || activeTab === 'cropwise') && (
          <section className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'mr' ? 'पीकनिहाय शिफारसी' : 'Crop-Wise Package'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {language === 'mr' ? 'प्रमुख पिकांची शास्त्रीय लागवड तंत्रज्ञान पुस्तिका' : 'Crop-Specific Package of Practices Manuals'}
                </h2>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'mr' ? 'पिकाचे नाव शोधा...' : 'Search crop name...'}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-700"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-stone-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-stone-300 bg-stone-100/90 text-stone-900">
                      <th className="py-3.5 px-4 font-bold uppercase w-16 text-center">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                      <th className="py-3.5 px-4 font-bold uppercase">{language === 'mr' ? 'पीक / विषय' : 'Crop / Discipline'}</th>
                      <th className="py-3.5 px-4 font-bold uppercase text-center w-44">{language === 'mr' ? 'मराठी आवृत्ती' : 'Marathi File'}</th>
                      <th className="py-3.5 px-4 font-bold uppercase text-center w-44">{language === 'mr' ? 'इंग्रजी आवृत्ती' : 'English File'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 font-medium text-stone-800">
                    {filteredCrops.map((c) => (
                      <tr key={c.sr} className="hover:bg-cyan-50/30 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-stone-600 text-center whitespace-nowrap">
                          {c.sr}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          {language === 'mr' ? c.titleMr : c.titleEn}
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          {c.mrPdf ? (
                            <a
                              href={c.mrPdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-2xs hover:scale-105"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{language === 'mr' ? 'मराठी PDF' : 'Marathi'}</span>
                              {c.mrSize && <span className="text-[10px] opacity-80">({c.mrSize})</span>}
                            </a>
                          ) : (
                            <span className="text-stone-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          {c.enPdf ? (
                            <a
                              href={c.enPdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-800 hover:bg-cyan-700 text-white font-bold text-xs transition-all shadow-2xs hover:scale-105"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>English</span>
                              {c.enSize && <span className="text-[10px] text-cyan-200">({c.enSize})</span>}
                            </a>
                          ) : (
                            <span className="text-stone-400 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
