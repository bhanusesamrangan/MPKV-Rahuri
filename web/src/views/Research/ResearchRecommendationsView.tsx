'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Calendar,
  Download,
  Search,
  Filter,
  FileText,
  Award,
  Sparkles,
  ArrowRight,
  Sprout
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

interface ResearchRecommendationsViewProps {
  pageData?: any;
}

export const ResearchRecommendationsView: React.FC<ResearchRecommendationsViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'annual' | 'cropwise'>('all');

  // Annual Joint AGRESCO Compendiums (Rows 1 to 5)
  const annualRecommendations = [
    {
      year: '2026',
      titleEn: 'Joint AGRESCO Recommendations — 2026',
      titleMr: 'संयुक्त अग्रेस्को कृषी शिफारसी — २०२६',
      badge: 'Latest Cleared Gazette',
      descEn: 'Full compendium of crop production, water management, plant protection, and farm machinery recommendations ratified at Joint AGRESCO 2026.',
      descMr: 'संयुक्त अग्रेस्को २०२६ मध्ये मंजूर पीक उत्पादन तंत्रज्ञान, जलव्यवस्थापन, पीक संरक्षण व शेती अवजारांच्या सर्व शिफारसींचा अधिकृत संग्रह.',
      mrPdf: '/media/docs/20261027_115327_18a1e7ab94c9b553f6c5e5604178c005.pdf',
      enPdf: '/media/docs/20261027_115327_5b42efd8f990e9156cab3c7d463b64f9.pdf'
    },
    {
      year: '2025',
      titleEn: 'Joint AGRESCO Recommendations — 2025',
      titleMr: 'संयुक्त अग्रेस्को कृषी शिफारसी — २०२५',
      badge: 'Approved Compendium',
      descEn: 'Complete package of scientific practices, nutrient dosages, micro-irrigation protocols, and pest management released in 2025.',
      descMr: '२०२५ मधील खत-पाणी मात्रा, सूक्ष्म सिंचन व एकात्मिक कीड व्यवस्थापनाच्या अधिकृत शिफारसी.',
      mrPdf: '/media/docs/2025-Marathi_20250808051343.pdf',
      enPdf: '/media/docs/2025-English_20250808061909.pdf'
    },
    {
      year: '2024',
      titleEn: 'Joint AGRESCO Recommendations — 2024',
      titleMr: 'संयुक्त अग्रेस्को कृषी शिफारसी — २०२४',
      badge: 'Official Gazette',
      descEn: 'Annual statutory recommendations for Kharif, Rabi, and Summer crops approved by all 4 Maharashtra State Agricultural Universities.',
      descMr: 'खरीप, रब्बी व उन्हाळी पिकांसाठी चारही कृषी विद्यापीठांनी संयुक्तपणे मंजूर केलेल्या अधिकृत शिफारसी.',
      mrPdf: '/media/docs/2024-Marathi_20241017111319.pdf',
      enPdf: '/media/docs/2024-English_20241017111319.pdf'
    },
    {
      year: '2023',
      titleEn: 'Joint AGRESCO Recommendations — 2023',
      titleMr: 'संयुक्त अग्रेस्को कृषी शिफारसी — २०२३',
      badge: 'Official Gazette',
      descEn: 'Approved scientific package for natural farming, organic inputs, soil reclamation, and crop varieties cultivation guidelines.',
      descMr: 'सेंद्रिय शेती, क्षारपड जमीन सुधारणा व पीक लागवड तंत्रज्ञानाविषयी २०२३ च्या शिफारसी.',
      mrPdf: '/media/docs/2023-Marathi_20230913025314.pdf',
      enPdf: '/media/docs/2023-English_20230913025314.pdf'
    },
    {
      year: '2022',
      titleEn: 'Joint AGRESCO Recommendations — 2022',
      titleMr: 'संयुक्त अग्रेस्को कृषी शिफारसी — २०२२',
      badge: 'Official Gazette',
      descEn: 'Golden Jubilee series agro-recommendations covering fruit orchards, dryland pulses, and sugarcane management.',
      descMr: 'फळबागा, कोरडवाहू कडधान्ये व ऊस व्यवस्थापनाच्या २०२२ मधील सर्वंकष शिफारसी.',
      mrPdf: '/media/docs/2022-Marathi_20230913025026.pdf',
      enPdf: '/media/docs/2022-English_20230913025026.pdf'
    }
  ];

  // Crop-Wise Packages of Practices (Rows 6 to 19)
  const cropwiseRecommendations = [
    { sr: '6', titleEn: 'Paddy / Rice (भात)', titleMr: 'भात / Paddy', mrPdf: '/media/docs/Paddy.pdf', enPdf: '/media/docs/1._Paddy_20200110043402.pdf' },
    { sr: '7', titleEn: 'Pearlmillet / Bajra (बाजरी)', titleMr: 'बाजरी / Pearlmillet', mrPdf: '/media/docs/Bajara.pdf', enPdf: '/media/docs/2._Pearlmillet_20200110053501.pdf' },
    { sr: '8', titleEn: 'Sorghum / Jowar (ज्वारी)', titleMr: 'ज्वारी / Sorghum', mrPdf: '/media/docs/Rabbi_Jawar.pdf', enPdf: '/media/docs/3._Sorghum_20200110053526.pdf' },
    { sr: '9', titleEn: 'Wheat (गहू)', titleMr: 'गहू / Wheat', mrPdf: '/media/docs/Wheat.pdf', enPdf: '/media/docs/4._Wheat_20200110053545.pdf' },
    { sr: '10', titleEn: 'Maize (मका)', titleMr: 'मका / Maize', mrPdf: '/media/docs/Maiz.pdf', enPdf: '/media/docs/5._Maize_20200110053602.pdf' },
    { sr: '11', titleEn: 'Minor Millets & Nutri Cereals (इतर पोषक भरड धान्य)', titleMr: 'ईतर पोषक भरड धान्य', mrPdf: '/media/docs/Minor_Milletes.pdf', enPdf: null },
    { sr: '12', titleEn: 'Chickpea & Pulses (कडधान्ये)', titleMr: 'कडधान्ये / Chickpea', mrPdf: '/media/docs/Pulses.pdf', enPdf: '/media/docs/7._Chickpea_20200110053711.pdf' },
    { sr: '13', titleEn: 'Oilseeds (गळीतधान्ये)', titleMr: 'गळीतधान्ये / Oilseeds', mrPdf: '/media/docs/Oil_seed.pdf', enPdf: null },
    { sr: '14', titleEn: 'Sugarcane (ऊस)', titleMr: 'ऊस / Sugarcane', mrPdf: '/media/docs/Sugarcane.pdf', enPdf: '/media/docs/9._Sugarcane_20200110053812.pdf' },
    { sr: '15', titleEn: 'Cotton (कापूस)', titleMr: 'कापूस / Cotton', mrPdf: '/media/docs/Cotton.pdf', enPdf: '/media/docs/10._Cotton_20200110053832.pdf' },
    { sr: '16', titleEn: 'Fodder Crops (चारापिके)', titleMr: 'चारापिके / Fodder', mrPdf: '/media/docs/Fodder_crop.pdf', enPdf: null },
    { sr: '17', titleEn: 'Vegetable Crops (भाजीपाला पिके)', titleMr: 'भाजीपाला पिके / Vegetable', mrPdf: '/media/docs/Vegetable.pdf', enPdf: '/media/docs/12._Vegetable_20200110053854.pdf' },
    { sr: '18', titleEn: 'Fruit Crops (फळ पिके)', titleMr: 'फळ पिके / Fruit crops', mrPdf: '/media/docs/Fruit_crops.pdf', enPdf: '/media/docs/13._Fruit_crops_20200110060006.pdf' },
    { sr: '19', titleEn: 'Flower Crops (फुल पिके)', titleMr: 'फुल पिके / Flower Crops', mrPdf: '/media/docs/Flower_Crops.pdf', enPdf: null }
  ];

  const filteredCrops = useMemo(() => {
    return cropwiseRecommendations.filter((c) =>
      c.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleMr.toLowerCase().includes(searchQuery.toLowerCase())
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
          { label: language === 'mr' ? '१४ प्रमुख पीक मार्गदर्शिका' : '14 Crop Practice Manuals', icon: Sprout }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 space-y-12">

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'all'
                  ? 'bg-cyan-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'mr' ? 'सर्व शिफारसी (१९)' : 'All Recommendations (19)'}
            </button>
            <button
              onClick={() => setActiveTab('annual')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'annual'
                  ? 'bg-cyan-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'mr' ? 'वर्षनिहाय संग्रह (२०२२-२०२६)' : 'Annual Compendiums (2022–2026)'}
            </button>
            <button
              onClick={() => setActiveTab('cropwise')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'cropwise'
                  ? 'bg-cyan-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'mr' ? 'पीकनिहाय तंत्रज्ञान पुस्तिका' : 'Crop-Wise Manuals (14)'}
            </button>
          </div>

          <span className="text-xs font-bold text-stone-500">
            {language === 'mr' ? 'अधिकृत राजपत्र डाउनलोड उपलब्ध' : 'Verified State Gazettes'}
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

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                    <a
                      href={item.mrPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-2xs hover:scale-105"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'मराठी PDF' : 'Marathi PDF'}</span>
                    </a>

                    <a
                      href={item.enPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-800 hover:bg-cyan-700 text-white font-bold text-xs transition-all shadow-2xs hover:scale-105"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>English PDF</span>
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
                      <th className="py-3.5 px-4 font-bold uppercase text-center w-36">{language === 'mr' ? 'मराठी आवृत्ती' : 'Marathi File'}</th>
                      <th className="py-3.5 px-4 font-bold uppercase text-center w-36">{language === 'mr' ? 'इंग्रजी आवृत्ती' : 'English File'}</th>
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
