'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sprout,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  FileText,
  Layers,
  Award
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

interface ResearchVarietiesViewProps {
  pageData?: any;
}

export const ResearchVarietiesView: React.FC<ResearchVarietiesViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // All 14 crop variety categories from scraped dataset with verified Marathi & English PDFs
  const varieties = [
    {
      sr: '1',
      titleEn: 'Sorghum (रब्बी व खरीप ज्वारी)',
      titleMr: 'ज्वारी / Sorghum',
      category: 'cereals',
      popular: 'Phule Vasudha, Phule Revati, Phule Suchitra, Phule Yashodha, Maldandi M-35-1',
      mrPdf: '/media/docs/03_-_Rabi_Jwar_20230824041136.pdf',
      enPdf: '/media/docs/03_-_Rabi_Jwar_20230824040659.pdf'
    },
    {
      sr: '2',
      titleEn: 'Wheat (चपाती व बन्सी गहू)',
      titleMr: 'गहू / Wheat',
      category: 'cereals',
      popular: 'Phule Samadhan, Trimbak, Godawari, Netravati, Panchavati',
      mrPdf: '/media/docs/04_-_Wheat._20250822023954.pdf',
      enPdf: '/media/docs/04_-_Wheat_20250822024052.pdf'
    },
    {
      sr: '3',
      titleEn: 'Maize (संकरित मका)',
      titleMr: 'मका / Maize',
      category: 'cereals',
      popular: 'Karveer, Rajarshi, Phule Maharshi',
      mrPdf: '/media/docs/05_-_Maka-Marathi_20230825111803.pdf',
      enPdf: '/media/docs/05_-_Maka_20230825111803.pdf'
    },
    {
      sr: '4',
      titleEn: 'Nutri Cereals & Minor Millets (पोषक भरडधान्ये)',
      titleMr: 'ईतर पोषक भरड धान्य / Nutri Cereals',
      category: 'cereals',
      popular: 'Rajgira, Nachani (Phule Chaitanya, Phule Kasba), Varai',
      mrPdf: '/media/docs/06-_Rajgira_Nachani_Varai_20230825112237.pdf',
      enPdf: '/media/docs/06-_Rajgira_Nachani_Varai_20230223054556.pdf'
    },
    {
      sr: '5',
      titleEn: 'Pulses (हरभरा, तूर, मूग, उडीद, हुलगा)',
      titleMr: 'कडधान्ये / Pulses',
      category: 'pulses_oilseeds',
      popular: 'Gram (Digvijay, Vijay, Vikram, Phule Vikrant), Pigeonpea (Vipula, Rajeshwari), Mung (Vaibhav)',
      mrPdf: '/media/docs/07_-_Pulses._20241016022245.pdf',
      enPdf: '/media/docs/07_-_Pulses_20241016022245.pdf'
    },
    {
      sr: '6',
      titleEn: 'Oilseeds (भुईमूग, सोयाबीन, तीळ, करडई, सूर्यफूल)',
      titleMr: 'गळीतधान्ये / Oilseeds',
      category: 'pulses_oilseeds',
      popular: 'Soybean (Phule Sangam, Phule Kimaya), Groundnut (JL-24 Phule Pragati, Phule Unnati), Safflower (Bhima)',
      mrPdf: '/media/docs/08_-_Oilseeds._20250822024330.pdf',
      enPdf: '/media/docs/08-_Oilseeds_20250822024330.pdf'
    },
    {
      sr: '7',
      titleEn: 'Sugarcane (ऊस)',
      titleMr: 'ऊस / Sugarcane',
      category: 'cash_crops',
      popular: 'CoM-0265 (Phule 265), Co-86032 (Nira), Phule 10001, CoM-88121',
      mrPdf: '/media/docs/09_-_Sugarcane._20241016022335.pdf',
      enPdf: '/media/docs/09_-_Sugarcane_20241016022335.pdf'
    },
    {
      sr: '8',
      titleEn: 'Cotton (कापूस)',
      titleMr: 'कापूस / Cotton',
      category: 'cash_crops',
      popular: 'Phule Anmol, Phule Dhanwantari, Phule Yamuna, Phule Shwetambari',
      mrPdf: '/media/docs/10-Cotton-Marathi_20230912061049.pdf',
      enPdf: '/media/docs/10-Cotton_20230912061049.pdf'
    },
    {
      sr: '9',
      titleEn: 'Fodder Crops (चारापिके)',
      titleMr: 'चारापिके / Fodder',
      category: 'fodder',
      popular: 'Phule Jaywant, Phule Gunwant (Hybrid Napier), Lucerne (Anand-2), Marvel Grass',
      mrPdf: '/media/docs/Fodder.pdf',
      enPdf: '/media/docs/11-Fodder_20200108060101.pdf'
    },
    {
      sr: '10',
      titleEn: 'Vegetables (भाजीपाला पिके)',
      titleMr: 'भाजीपाला पिके / Vegetable',
      category: 'horticulture',
      popular: 'Onion (Phule Samarth, Baswant 780, N-53), Tomato (Phule Raja), Okra (Phule Utkarsha), Brinjal (Krishna)',
      mrPdf: '/media/docs/12-Vegetables_20250822023336.pdf',
      enPdf: '/media/docs/12-Vegetable_20250822023336.pdf'
    },
    {
      sr: '11',
      titleEn: 'Spices: Turmeric & Betelvine (हळद व पानवेल)',
      titleMr: 'हळद व पानवेल / Turmeric & Beetlevine',
      category: 'horticulture',
      popular: 'Turmeric (Phule Swaroop - High Curcumin), Betelvine (Kapoori, Meetha Patta)',
      mrPdf: '/media/docs/14-Masalavargiya-_Marathi_20230913125628.pdf',
      enPdf: '/media/docs/14-Masalavargiya_20230913125628.pdf'
    },
    {
      sr: '12',
      titleEn: 'Flower Crops (फुल पिके)',
      titleMr: 'फुल पिके / Flower',
      category: 'fodder',
      popular: 'Aster (Phule Ganesh Pink, Phule Ganesh White), Tuberose (Phule Rajani), Gladiolus (Phule Prerna)',
      mrPdf: '/media/docs/Flower_20210608024815.pdf',
      enPdf: '/media/docs/15-Flower_20210608024815.pdf'
    },
    {
      sr: '13',
      titleEn: 'Fruit Crops (फळ पिके)',
      titleMr: 'फळ पिके / Fruit',
      category: 'horticulture',
      popular: 'Pomegranate (Bhagwa, Phule Super Bhagwa), Guava (Sardar L-49), Acid Lime (Sai Sarbati, Phule Sarbati)',
      mrPdf: '/media/docs/13-Fruit_20250822023749.pdf',
      enPdf: '/media/docs/13-Fruit_20250822023634.pdf'
    },
    {
      sr: '14',
      titleEn: 'Pearlmillet & Rice (बाजरी व भात)',
      titleMr: 'बाजरी, भात / Pearlmillet, Rice',
      category: 'cereals',
      popular: 'Bajra (Shraddha, Saburi, Phule Aadishakti), Rice (Indrayani, Phule Samruddhi, Bhogavati)',
      mrPdf: '/media/docs/02_-_Bajara_Rice._20250822024636.pdf',
      enPdf: '/media/docs/02_-_Bajara_Rice_20250822024636.pdf'
    }
  ];

  const filteredVarieties = useMemo(() => {
    return varieties.filter((v) => {
      const matchSearch =
        v.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.titleMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.popular.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === 'all') return matchSearch;
      return matchSearch && v.category === selectedCategory;
    });
  }, [varieties, searchQuery, selectedCategory]);

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: 'Crop Varieties Released', mr: 'विकसित पीक वाण' }} />

      <ResearchHero
        theme="varieties"
        badge={{ en: '270+ Released Varieties Catalog', mr: '२७०+ अधिकृत विकसित पीक वाण' }}
        title={{
          en: 'Crop Varieties Released — Official Gazettes & Bulletins',
          mr: 'विकसित पीक वाण — अधिकृत राजपत्र व शिफारसीत वाण'
        }}
        subtitle={{
          en: 'Comprehensive repository of over 270 high-yielding, pest-tolerant crop varieties and hybrids released by MPKV Rahuri with verified Marathi and English gazettes.',
          mr: 'म.फु.कृ.वि. राहुरीने विकसित केलेल्या २७० हून अधिक सुधारित व संकरित पीक वाणांचे अधिकृत मराठी व इंग्रजी माहितीपत्रक.'
        }}
        quickChips={[
          { label: language === 'mr' ? '१४ मुख्य पीक वर्ग' : '14 Crop Categories', icon: Sprout },
          { label: language === 'mr' ? '२७०+ सुधारित वाण' : '270+ Released Varieties', icon: Award },
          { label: language === 'mr' ? 'मराठी व इंग्रजी राजपत्र' : 'Marathi & English Gazettes', icon: Download }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 space-y-8">

        {/* Search & Category Filter Controls */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'पिकाचे नाव किंवा वाण शोधा (उदा. फुले संगम, भगवा)...' : 'Search by crop or variety (e.g., CoM-265, Bhagwa)...'}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-1 text-[11px] font-bold w-full sm:w-auto">
              {[
                { id: 'all', label: language === 'mr' ? 'सर्व पिके' : 'All' },
                { id: 'cereals', label: language === 'mr' ? 'तृणधान्ये' : 'Cereals' },
                { id: 'pulses_oilseeds', label: language === 'mr' ? 'कडधान्य/गळीत' : 'Pulses & Oilseeds' },
                { id: 'cash_crops', label: language === 'mr' ? 'ऊस व कापूस' : 'Cash Crops' },
                { id: 'horticulture', label: language === 'mr' ? 'फळे व भाजीपाला' : 'Horticulture' },
                { id: 'fodder', label: language === 'mr' ? 'चारा व फुले' : 'Fodder & Flowers' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-900 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Variety Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredVarieties.map((v) => (
            <div
              key={v.sr}
              className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                    Category {v.sr}
                  </span>
                  <span className="text-xs font-bold text-amber-700">
                    MPKV Gazette
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif leading-snug">
                  {language === 'mr' ? v.titleMr : v.titleEn}
                </h3>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                  <span className="text-[11px] font-bold text-stone-500 uppercase block">
                    {language === 'mr' ? 'प्रमुख लोकप्रिय वाण:' : 'Popular Released Varieties:'}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 mt-0.5 block">
                    {v.popular}
                  </span>
                </div>
              </div>

              {/* Download Triggers: Side by Side Marathi & English */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-stone-500">
                  {language === 'mr' ? 'अधिकृत पुस्तिका:' : 'Official Gazette:'}
                </span>

                <div className="flex items-center gap-2">
                  {v.mrPdf && (
                    <a
                      href={v.mrPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-2xs hover:scale-105"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'मराठी PDF' : 'Marathi PDF'}</span>
                    </a>
                  )}

                  {v.enPdf && (
                    <a
                      href={v.enPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-2xs hover:scale-105"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>English PDF</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
