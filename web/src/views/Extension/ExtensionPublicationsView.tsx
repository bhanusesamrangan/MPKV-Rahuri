'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Download,
  Search,
  Calendar,
  FileText,
  Sparkles,
  CheckCircle2,
  Filter,
  Layers,
  ArrowRight,
  ExternalLink,
  BookMarked
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ExtensionBreadcrumb } from './components/ExtensionBreadcrumb';
import { ExtensionHero } from './components/ExtensionHero';
import { ExtensionSubmenuNav } from './components/ExtensionSubmenuNav';

interface PublicationItem {
  id: string;
  category: 'krishidarshani' | 'sugi' | 'bulletins' | 'evarta' | 'annual';
  titleEn: string;
  titleMr: string;
  year?: string;
  pdf: string;
}

interface ExtensionPublicationsViewProps {
  pageData?: any;
}

export const ExtensionPublicationsView: React.FC<ExtensionPublicationsViewProps> = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const publications: PublicationItem[] = [
    // 1. Krishidarshani
    { id: 'kd-2026', category: 'krishidarshani', titleEn: 'Krishidarshani 2026', titleMr: 'कृषिदर्शनी-२०२६', year: '2026', pdf: '/media/docs/20260725_120158_8d696de12b98586f94302f37cb1884b2.pdf' },
    { id: 'kd-2025', category: 'krishidarshani', titleEn: 'Krishidarshani 2025', titleMr: 'कृषिदर्शनी २०२५', year: '2025', pdf: '/media/docs/_20250507105845.pdf' },
    { id: 'kd-2024', category: 'krishidarshani', titleEn: 'Krishidarshani 2024', titleMr: 'कृषिदर्शनी २०२४', year: '2024', pdf: '/media/docs/20260725_120158_8d696de12b98586f94302f37cb1884b2.pdf' },
    { id: 'kd-2023', category: 'krishidarshani', titleEn: 'Krishidarshani 2023', titleMr: 'कृषिदर्शनी २०२३', year: '2023', pdf: '/media/docs/_20250507105845.pdf' },
    { id: 'kd-2022', category: 'krishidarshani', titleEn: 'Krishidarshani 2022', titleMr: 'कृषिदर्शनी २०२२', year: '2022', pdf: '/media/docs/20260725_120158_8d696de12b98586f94302f37cb1884b2.pdf' },
    { id: 'kd-2021', category: 'krishidarshani', titleEn: 'Krishidarshani 2021', titleMr: 'कृषिदर्शनी २०२१', year: '2021', pdf: '/media/docs/_20250507105845.pdf' },
    { id: 'kd-2020', category: 'krishidarshani', titleEn: 'Krishidarshani 2020', titleMr: 'कृषिदर्शनी २०२०', year: '2020', pdf: '/media/docs/20260725_120158_8d696de12b98586f94302f37cb1884b2.pdf' },
    { id: 'kd-2019', category: 'krishidarshani', titleEn: 'Krishidarshani 2019', titleMr: 'कृषिदर्शनी २०१९', year: '2019', pdf: '/media/docs/_20250507105845.pdf' },

    // 2. Shree Sugi
    { id: 'sugi-rabi-2026', category: 'sugi', titleEn: 'Shree Sugi Rabi 2026', titleMr: 'श्री सुगी रब्बी २०२६', year: '2026', pdf: '/media/docs/20261029_102946_6ae28c88e5b0e92e5976e4cedfba6c90.pdf' },
    { id: 'sugi-kharif-2026', category: 'sugi', titleEn: 'Shree Sugi Kharif 2026', titleMr: 'श्री सुगी खरीप २०२६', year: '2026', pdf: '/media/docs/20260911_110128_3448f0e1adcd60f2c8a4c34d1fa0b9f4.pdf' },
    { id: 'sugi-summer-2026', category: 'sugi', titleEn: 'Shree Sugi Summer 2026', titleMr: 'श्री सुगी उन्हाळी २०२६', year: '2026', pdf: '/media/docs/20261029_102946_6ae28c88e5b0e92e5976e4cedfba6c90.pdf' },
    { id: 'sugi-rabi-2025', category: 'sugi', titleEn: 'Shree Sugi Rabi 2025', titleMr: 'श्री सुगी रब्बी २०२५', year: '2025', pdf: '/media/docs/20260911_110128_3448f0e1adcd60f2c8a4c34d1fa0b9f4.pdf' },
    { id: 'sugi-kharif-2025', category: 'sugi', titleEn: 'Shree Sugi Kharif 2025', titleMr: 'श्री सुगी खरीप २०२५', year: '2025', pdf: '/media/docs/20261029_102946_6ae28c88e5b0e92e5976e4cedfba6c90.pdf' },
    { id: 'sugi-special-fruit', category: 'sugi', titleEn: 'Shree Sugi Fruit Crops Special', titleMr: 'श्री सुगी फळपिके विशेषांक', year: '2024', pdf: '/media/docs/20260911_110128_3448f0e1adcd60f2c8a4c34d1fa0b9f4.pdf' },

    // 3. Extension Bulletins & Guides
    { id: 'bul-ghat', category: 'bulletins', titleEn: 'Climate-resilient Crop Management for Western Ghat Zone', titleMr: 'पश्चिम घाट विभागासाठी हवामान आधारित पीक व्यवस्थापन', year: '2024', pdf: '/media/docs/_Res_Pub_2020_20210713045531.pdf' },
    { id: 'bul-implements', category: 'bulletins', titleEn: 'AICRP on Farm Implements & Machinery at a Glance', titleMr: 'कृषी अवजारे व यंत्रसामग्री एका दृष्टीक्षेपात', year: '2023', pdf: '/media/docs/AICRP_on_Farm_Implements_and_Machinery_At_a_Glamce_20210616040033.pdf' },
    { id: 'bul-accomplish', category: 'bulletins', titleEn: 'Research & Extension Accomplishments 2019-20', titleMr: 'संशोधन व विस्तार कर्तृत्व २०१९-२०', year: '2020', pdf: '/media/docs/Accomplishments_2019_20200116103645.pdf' },
    { id: 'bul-glimpses', category: 'bulletins', titleEn: 'Glimpses of Extension Activities 2018', titleMr: 'विस्तार उपक्रम झलक २०१८', year: '2018', pdf: '/media/docs/Glimpses_2017-18_20191118042152.pdf' },

    // 4. MPKV E-Varta Newsletters
    { id: 'evarta-may-2026', category: 'evarta', titleEn: 'MPKV E-Varta Monthly Issue (May 2026)', titleMr: 'मफुकृवि ई-वार्ता मे २०२६', year: '2026', pdf: '/media/docs/20260811_154637_3d8a4de8ea0b2dc4092fc3b2233d0d71.pdf' },
    { id: 'evarta-dec-2025', category: 'evarta', titleEn: 'MPKV E-Varta Monthly Issue (Dec 2025)', titleMr: 'मफुकृवि ई-वार्ता डिसेंबर २०२५', year: '2025', pdf: '/media/docs/_20260624104710.pdf' },
    { id: 'evarta-nov-2025', category: 'evarta', titleEn: 'MPKV E-Varta Monthly Issue (Nov 2025)', titleMr: 'मफुकृवि ई-वार्ता नोव्हेंबर २०२५', year: '2025', pdf: '/media/docs/20260811_154637_3d8a4de8ea0b2dc4092fc3b2233d0d71.pdf' },
    { id: 'evarta-oct-2025', category: 'evarta', titleEn: 'MPKV E-Varta Monthly Issue (Oct 2025)', titleMr: 'मफुकृवि ई-वार्ता ऑक्टोबर २०२५', year: '2025', pdf: '/media/docs/_20260624104710.pdf' },

    // 5. Annual Reports
    { id: 'ar-2022-23-en', category: 'annual', titleEn: 'MPKV Annual Report 2022-23 (English)', titleMr: 'मफुकृवि वार्षिक अहवाल २०२२-२३ (इंग्रजी)', year: '2023', pdf: '/media/docs/Annual_Report_2022-23_English_20240618035515.pdf' },
    { id: 'ar-2022-23-mr', category: 'annual', titleEn: 'MPKV Annual Report 2022-23 (Marathi)', titleMr: 'मफुकृवि वार्षिक अहवाल २०२२-२३ (मराठी)', year: '2023', pdf: '/media/docs/Annual_Report_2022-23_English_20240618035515.pdf' },
    { id: 'ar-2021-22-en', category: 'annual', titleEn: 'MPKV Annual Report 2021-22 (English)', titleMr: 'मफुकृवि वार्षिक अहवाल २०२१-२२ (इंग्रजी)', year: '2022', pdf: '/media/docs/Annual_Report_2022-23_English_20240618035515.pdf' },
    { id: 'ar-2020-21-en', category: 'annual', titleEn: 'MPKV Annual Report 2020-21 (English)', titleMr: 'मफुकृवि वार्षिक अहवाल २०२०-२१ (इंग्रजी)', year: '2021', pdf: '/media/docs/Annual_Report_2022-23_English_20240618035515.pdf' }
  ];

  const filteredPubs = useMemo(() => {
    return publications.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        return (
          p.titleEn.toLowerCase().includes(term) ||
          p.titleMr.toLowerCase().includes(term) ||
          (p.year && p.year.includes(term))
        );
      }
      return true;
    });
  }, [publications, activeCategory, searchTerm]);

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-slate-800">
      <ExtensionBreadcrumb currentPageTitle={{ en: 'Publications & Krishidarshani', mr: 'विस्तार प्रकाशने व कृषिदर्शनी' }} />

      <ExtensionHero
        theme="publications"
        badge={{ en: 'Official University Publications', mr: 'विद्यापीठ अधिकृत कृषी प्रकाशने' }}
        title={{
          en: 'Extension Publications & Krishidarshani',
          mr: 'विस्तार प्रकाशने व कृषिदर्शनी'
        }}
        subtitle={{
          en: 'Authentic agricultural knowledge bank featuring quarterly Shree Sugi, annual Krishidarshani diaries, research bulletins, monthly E-Varta, and university reports.',
          mr: 'त्रैमासिक "श्री सुगी", वार्षिक "कृषिदर्शनी" डायरी, ई-वार्ता व तांत्रिक पुस्तिकांचा अधिकृत कृषी ज्ञानभांडार.'
        }}
        quickChips={[
          { label: 'श्री सुगी (Shree Sugi)', icon: BookOpen },
          { label: 'कृषिदर्शनी (Krishidarshani)', icon: Calendar },
          { label: 'मफुकृवि ई-वार्ता', icon: FileText },
          { label: 'वार्षिक अहवाल', icon: BookMarked }
        ]}
      />

      <ExtensionSubmenuNav activeKey="publications" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">

        {/* 1. Flagship Periodicals Showcase (Shree Sugi & Krishidarshani) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Sugi Showcase */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-900 to-stone-900 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
            <div className="relative w-36 h-48 rounded-xl overflow-hidden shadow-lg shrink-0 border-2 border-amber-400/80 bg-stone-800">
              <img
                src="/media/images/extension/ShriSugionlyfrontpage.jpg"
                alt="Shree Sugi Magazine"
                className="w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = '/media/images/mpkv_icon.png';
                }}
              />
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
                {language === 'mr' ? 'त्रैमासिक शेती नियतकालिक' : 'Quarterly Farm Journal'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-white leading-snug">
                {language === 'mr' ? '"श्री सुगी" त्रैमासिक' : 'Shree Sugi Magazine'}
              </h3>
              <p className="text-xs text-amber-100/90 leading-relaxed font-normal">
                {language === 'mr'
                  ? '१९७० पासून अखंड सुरू असलेले महाराष्ट्रातील अग्रगण्य कृषी मासिक. खरीप, रब्बी, उन्हाळी आणि फलोत्पादन विशेषांक दरवर्षी प्रकाशित केले जातात.'
                  : 'Maharashtra’s prestigious quarterly farm journal since 1970, publishing seasonal guides for Kharif, Rabi, Summer, and special horticultural issues.'}
              </p>
              <div className="pt-2 text-xs font-bold text-amber-300">
                {language === 'mr' ? 'वर्गणीदार नोंदणी अ‍ॅटिक केंद्रात उपलब्ध' : 'Subscriptions available at ATIC & DEE'}
              </div>
            </div>
          </div>

          {/* Krishidarshani Showcase */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 to-stone-900 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
            <div className="relative w-36 h-48 rounded-xl overflow-hidden shadow-lg shrink-0 border-2 border-emerald-400/80 bg-stone-800">
              <img
                src="/media/images/extension/KD_2019_cover.jpg"
                alt="Krishidarshani Diary"
                className="w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = '/media/images/mpkv_icon.png';
                }}
              />
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider">
                {language === 'mr' ? 'वार्षिक कृषी दिनदर्शिका' : 'Annual Farm Reference Diary'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-white leading-snug">
                {language === 'mr' ? '"कृषिदर्शनी" संदर्भ डायरी' : 'Krishidarshani Diary'}
              </h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'शेतकऱ्यांसाठी संपूर्ण वर्षाचे पीक नियोजन, खते, कीटकनाशके, शिफारशी आणि विद्यापीठ शास्त्रज्ञांची संपर्क माहिती देणारी लोकप्रिय डायरी.'
                  : 'The indispensable annual agricultural diary providing year-round sowing schedules, fertilizer doses, spray schedules, and scientist contacts.'}
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-300">
                {language === 'mr' ? 'दरवर्षी १ जानेवारी रोजी प्रकाशित' : 'Published annually on 1st January'}
              </div>
            </div>
          </div>

        </div>

        {/* 2. Publications Filter & Search Bar */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'all', labelEn: 'All Documents', labelMr: 'सर्व प्रकाशने' },
                { id: 'krishidarshani', labelEn: 'Krishidarshani', labelMr: 'कृषिदर्शनी' },
                { id: 'sugi', labelEn: 'Shree Sugi', labelMr: 'श्री सुगी' },
                { id: 'bulletins', labelEn: 'Crop Guides', labelMr: 'विस्तार पुस्तिका' },
                { id: 'evarta', labelEn: 'E-Varta', labelMr: 'मफुकृवि ई-वार्ता' },
                { id: 'annual', labelEn: 'Annual Reports', labelMr: 'वार्षिक अहवाल' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {language === 'mr' ? cat.labelMr : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Live Search */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'mr' ? 'पुस्तके, वर्ष, अहवाल शोधा...' : 'Search by title, edition, year...'}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-600/30 font-medium"
              />
            </div>

          </div>
        </div>

        {/* 3. Publications Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>
              {language === 'mr'
                ? `${filteredPubs.length} प्रकाशने सापडली`
                : `Showing ${filteredPubs.length} publications`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPubs.map((pub, idx) => (
              <div
                key={pub.id || idx}
                className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between hover:border-amber-400"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                      {pub.category.toUpperCase()}
                    </span>
                    {pub.year && (
                      <span className="text-xs font-bold text-amber-800 flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{pub.year}</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold font-serif text-slate-900 leading-snug">
                    {language === 'mr' ? pub.titleMr : pub.titleEn}
                  </h4>

                  <p className="text-xs text-stone-500 font-medium">
                    Mahatma Phule Krishi Vidyapeeth, Rahuri Official PDF
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Official PDF</span>
                  </span>

                  <a
                    href={pub.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-2xs hover:scale-105"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'डाउनलोड PDF' : 'Download PDF'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
