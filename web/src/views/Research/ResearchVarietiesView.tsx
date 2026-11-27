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
  Award,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  ExternalLink
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
  const [activeModalPoster, setActiveModalPoster] = useState<number | null>(null);
  const [activePdfPreview, setActivePdfPreview] = useState<{
    titleEn: string;
    titleMr: string;
    mrPdf: string;
    enPdf: string;
    lang: 'mr' | 'en';
  } | null>(null);

  // Flagship University Released Varieties & Production Technology Posters (Direct from Live Portal)
  const featuredPosters = [
    {
      id: 'phule-revati',
      src: '/media/images/varieties/phule-revati.jpg',
      titleEn: 'Phule Revati',
      titleMr: 'फुले रेवती',
      cropEn: 'Rabi Sorghum',
      cropMr: 'रब्बी ज्वारी',
      category: 'sorghum',
      centerEn: 'AICRP on Sorghum, MPKV Rahuri',
      centerMr: 'अखिल भारतीय समन्वित ज्वारी सुधार प्रकल्प, म.फु.कृ.वि., राहुरी',
      specsEn: [
        { label: 'Grain Yield', val: '40 - 50 q/ha' },
        { label: 'Fodder Yield', val: '90 - 100 q/ha' },
        { label: 'Recommendation', val: 'Medium to deep soil, irrigated condition' }
      ],
      specsMr: [
        { label: 'धान्य उत्पादन', val: '४० ते ५० क्विंटल/हेक्टर' },
        { label: 'कडबा उत्पादन', val: '९० ते १०० क्विंटल/हेक्टर' },
        { label: 'शिफारस', val: 'मध्यम ते भारी जमीन, बागायतीसाठी शिफारस' }
      ],
      badgeEn: 'High Yielding Sorghum',
      badgeMr: 'बागायती रब्बी ज्वारी'
    },
    {
      id: 'phule-vasudha',
      src: '/media/images/varieties/phule-vasudha.jpg',
      titleEn: 'Phule Vasudha',
      titleMr: 'फुले वसुधा',
      cropEn: 'Rabi Sorghum',
      cropMr: 'रब्बी ज्वारी',
      category: 'sorghum',
      centerEn: 'AICRP on Sorghum, MPKV Rahuri',
      centerMr: 'अखिल भारतीय समन्वित ज्वारी सुधार प्रकल्प, म.फु.कृ.वि., राहुरी',
      specsEn: [
        { label: 'Rainfed Yield', val: '25 - 28 q/ha' },
        { label: 'Irrigated Yield', val: '30 - 35 q/ha' },
        { label: 'Fodder Yield', val: '55 - 75 q/ha' }
      ],
      specsMr: [
        { label: 'कोरडवाहू उत्पादन', val: '२५ ते २८ क्विंटल/हेक्टर' },
        { label: 'बागायत उत्पादन', val: '३० ते ३५ क्विंटल/हेक्टर' },
        { label: 'कडबा उत्पादन', val: '५५ ते ७५ क्विंटल/हेक्टर' }
      ],
      badgeEn: 'Drought Resilient',
      badgeMr: 'कोरडवाहू व बागायती'
    },
    {
      id: 'phule-suchitra',
      src: '/media/images/varieties/phule-suchitra.jpg',
      titleEn: 'Phule Suchitra (SPV 2048)',
      titleMr: 'फुले सुचित्रा (SPV २०४८)',
      cropEn: 'Rabi Sorghum',
      cropMr: 'रब्बी ज्वारी',
      category: 'sorghum',
      centerEn: 'AICRP on Sorghum, MPKV Rahuri',
      centerMr: 'अखिल भारतीय समन्वित ज्वारी सुधार प्रकल्प, म.फु.कृ.वि., राहुरी',
      specsEn: [
        { label: 'Year of Release', val: '2012' },
        { label: 'Grain Yield', val: '24 - 28 q/ha' },
        { label: 'Fodder Yield', val: '60 - 65 q/ha' }
      ],
      specsMr: [
        { label: 'प्रसारण वर्ष', val: '२०१२' },
        { label: 'धान्य उत्पादन', val: '२४ ते २८ क्विंटल/हेक्टर' },
        { label: 'कडबा उत्पादन', val: '६० ते ६५ क्विंटल/हेक्टर' }
      ],
      badgeEn: 'Scarcity Zone Variety',
      badgeMr: 'पर्जन्यछायेचा प्रदेश'
    },
    {
      id: 'phule-suchitra-detail',
      src: '/media/images/varieties/phule-suchitra-detailed.jpg',
      titleEn: 'Phule Suchitra (Cob & Earhead View)',
      titleMr: 'फुले सुचित्रा (कणीस व पीक वैशिष्ट्ये)',
      cropEn: 'Rabi Sorghum',
      cropMr: 'रब्बी ज्वारी',
      category: 'sorghum',
      centerEn: 'AICRP on Sorghum, MPKV Rahuri',
      centerMr: 'अखिल भारतीय समन्वित ज्वारी सुधार प्रकल्प, म.फु.कृ.वि., राहुरी',
      specsEn: [
        { label: 'Grain Type', val: 'Pearly white, bold grains' },
        { label: 'Earhead', val: 'Semi-compact, oval shaped' },
        { label: 'Soil Type', val: 'Western Maharashtra medium soil' }
      ],
      specsMr: [
        { label: 'दाण्याचे स्वरूप', val: 'मोतीसारखा चमकदार, टपोरा दाणा' },
        { label: 'कणसाचे स्वरूप', val: 'निम-घट्ट, अंडाकृती कणीस' },
        { label: 'जमीन प्रकार', val: 'पश्चिम महाराष्ट्र मध्यम जमीन' }
      ],
      badgeEn: 'Cob Morphology',
      badgeMr: 'कणीस व दाणा वैशिष्ट्ये'
    },
    {
      id: 'phule-kranti-stylo',
      src: '/media/images/varieties/phule-kranti-stylo.jpg',
      titleEn: 'Stylo - Phule Kranti',
      titleMr: 'स्टायलो - फुले क्रांती',
      cropEn: 'Leguminous Fodder',
      cropMr: 'बहुवार्षिक द्विदल चारा पीक',
      category: 'fodder',
      centerEn: 'AICRP on Forage Crops, MPKV Rahuri',
      centerMr: 'अखिल भारतीय चारा पिके संशोधन प्रकल्प, राहुरी',
      specsEn: [
        { label: 'Green Forage', val: '250 - 300 q/ha' },
        { label: 'Crude Protein', val: '13 - 14 %' },
        { label: 'Habit', val: 'Perennial leguminous forage' }
      ],
      specsMr: [
        { label: 'हिरवा चारा उत्पादन', val: '२५० ते ३०० क्विंटल/हेक्टर' },
        { label: 'प्रथिनांचे प्रमाण', val: '१३ ते १४ %' },
        { label: 'पिकाचा प्रकार', val: 'बहुवार्षिक द्विदल पौष्टिक चारा' }
      ],
      badgeEn: 'High Protein Fodder',
      badgeMr: 'उच्च प्रथिनयुक्त चारा'
    },
    {
      id: 'rabi-jowar-tech',
      src: '/media/images/varieties/rabi-jowar-technology.jpg',
      titleEn: 'Rabi Sorghum Package of Practices',
      titleMr: 'रब्बी ज्वारी लागवडीचे तंत्रज्ञान',
      cropEn: 'Production Technology',
      cropMr: 'सुधारित कृषी तंत्रज्ञान',
      category: 'technology',
      centerEn: 'AICRP on Sorghum, MPKV Rahuri',
      centerMr: 'अखिल भारतीय समन्वित ज्वारी सुधार प्रकल्प, म.फु.कृ.वि., राहुरी',
      specsEn: [
        { label: 'Sowing Window', val: '15 Sept - 15 Oct' },
        { label: 'Seed Rate', val: '10 kg/ha' },
        { label: 'Fertilizer (NPK)', val: '50:25:25 kg/ha' }
      ],
      specsMr: [
        { label: 'पेरणीची वेळ', val: '१५ सप्टेंबर ते १५ ऑक्टोबर' },
        { label: 'बियाणे प्रमाण', val: '१० किलो/हेक्टर' },
        { label: 'खत मात्रा (NPK)', val: '५०:२५:२५ किलो/हेक्टर' }
      ],
      badgeEn: 'Cultivation Guide',
      badgeMr: 'लागवड मार्गदर्शक'
    },
    {
      id: 'phule-vimukta-okra',
      src: '/media/images/varieties/phule-vimukta-okra.jpg',
      titleEn: 'Okra - Phule Vimukta',
      titleMr: 'भेंडी - फुले विमुक्ता',
      cropEn: 'Vegetables',
      cropMr: 'भाजीपाला पीक',
      category: 'vegetables',
      centerEn: 'ZARS Ganeshkhind, Pune / MPKV Rahuri',
      centerMr: 'आंचलिक कृषी संशोधन केंद्र, गणेशखिंड, पुणे',
      specsEn: [
        { label: 'Pod Yield', val: '180 - 200 q/ha' },
        { label: 'Resistance', val: 'Highly resistant to YVMV' },
        { label: 'Pod Characters', val: 'Dark green, tender & shiny' }
      ],
      specsMr: [
        { label: 'शेंगा उत्पादन', val: '१८० ते २०० क्विंटल/हेक्टर' },
        { label: 'रोग प्रतिकारकता', val: 'यलो व्हेन मोझॅक (YVMV) प्रतिकारक्षम' },
        { label: 'शेंगेची प्रत', val: 'गडद हिरवी, कोवळी व चकचकीत' }
      ],
      badgeEn: 'YVMV Resistant Okra',
      badgeMr: 'रोगप्रतिकारक भेंडी'
    },
    {
      id: 'phule-gunwant-napier',
      src: '/media/images/varieties/phule-gunwant-napier.jpg',
      titleEn: 'Hybrid Napier - Phule Gunwant',
      titleMr: 'संकरित नेपिअर - फुले गुणवंत',
      cropEn: 'Perennial Grass',
      cropMr: 'बहुवार्षिक चारा गवत',
      category: 'fodder',
      centerEn: 'AICRP on Forage Crops, MPKV Rahuri',
      centerMr: 'अखिल भारतीय चारा पिके संशोधन प्रकल्प, राहुरी',
      specsEn: [
        { label: 'Green Forage', val: '1500 - 1800 q/ha' },
        { label: 'Crude Protein', val: '8.5 - 10 %' },
        { label: 'Quality', val: 'Low oxalic acid, soft succulent stems' }
      ],
      specsMr: [
        { label: 'हिरवा चारा उत्पादन', val: '१५०० ते १८०० क्विंटल/हेक्टर' },
        { label: 'प्रथिनांचे प्रमाण', val: '८.५ ते १० %' },
        { label: 'चाऱ्याची प्रत', val: 'कमी ऑक्झॅलिक ऍसिड, मऊ रसाळ खोड' }
      ],
      badgeEn: 'Heavy Yielding Fodder',
      badgeMr: 'भरघोस चारा देणारे गवत'
    }
  ];

  // All 14 crop variety categories from scraped dataset with verified Marathi & English PDFs
  const varieties = [
    {
      sr: '1',
      titleEn: 'Sorghum',
      titleMr: 'रब्बी व खरीप ज्वारी',
      category: 'cereals',
      popular: 'Phule Vasudha, Phule Revati, Phule Suchitra, Phule Yashodha, Maldandi M-35-1',
      mrPdf: '/media/docs/03_-_Rabi_Jwar_20230824041136.pdf',
      enPdf: '/media/docs/03_-_Rabi_Jwar_20230824040659.pdf'
    },
    {
      sr: '2',
      titleEn: 'Wheat',
      titleMr: 'चपाती व बन्सी गहू',
      category: 'cereals',
      popular: 'Phule Samadhan, Trimbak, Godawari, Netravati, Panchavati',
      mrPdf: '/media/docs/04_-_Wheat._20250822023954.pdf',
      enPdf: '/media/docs/04_-_Wheat_20250822024052.pdf'
    },
    {
      sr: '3',
      titleEn: 'Maize',
      titleMr: 'संकरित मका',
      category: 'cereals',
      popular: 'Karveer, Rajarshi, Phule Maharshi',
      mrPdf: '/media/docs/05_-_Maka-Marathi_20230825111803.pdf',
      enPdf: '/media/docs/05_-_Maka_20230825111803.pdf'
    },
    {
      sr: '4',
      titleEn: 'Nutri Cereals & Minor Millets',
      titleMr: 'पोषक भरडधान्ये',
      category: 'cereals',
      popular: 'Rajgira, Nachani (Phule Chaitanya, Phule Kasba), Varai',
      mrPdf: '/media/docs/06-_Rajgira_Nachani_Varai_20230825112237.pdf',
      enPdf: '/media/docs/06-_Rajgira_Nachani_Varai_20230223054556.pdf'
    },
    {
      sr: '5',
      titleEn: 'Pulses',
      titleMr: 'कडधान्ये (हरभरा, तूर, मूग, उडीद, हुलगा)',
      category: 'pulses_oilseeds',
      popular: 'Gram (Digvijay, Vijay, Vikram, Phule Vikrant), Pigeonpea (Vipula, Rajeshwari), Mung (Vaibhav)',
      mrPdf: '/media/docs/07_-_Pulses._20241016022245.pdf',
      enPdf: '/media/docs/07_-_Pulses_20241016022245.pdf'
    },
    {
      sr: '6',
      titleEn: 'Oilseeds',
      titleMr: 'गळीतधान्ये (भुईमूग, सोयाबीन, तीळ, करडई, सूर्यफूल)',
      category: 'pulses_oilseeds',
      popular: 'Soybean (Phule Sangam, Phule Kimaya), Groundnut (JL-24 Phule Pragati, Phule Unnati), Safflower (Bhima)',
      mrPdf: '/media/docs/08_-_Oilseeds._20250822024330.pdf',
      enPdf: '/media/docs/08-_Oilseeds_20250822024330.pdf'
    },
    {
      sr: '7',
      titleEn: 'Sugarcane',
      titleMr: 'ऊस',
      category: 'cash_crops',
      popular: 'CoM-0265 (Phule 265), Co-86032 (Nira), Phule 10001, CoM-88121',
      mrPdf: '/media/docs/09_-_Sugarcane._20241016022335.pdf',
      enPdf: '/media/docs/09_-_Sugarcane_20241016022335.pdf'
    },
    {
      sr: '8',
      titleEn: 'Cotton',
      titleMr: 'कापूस',
      category: 'cash_crops',
      popular: 'Phule Anmol, Phule Dhanwantari, Phule Yamuna, Phule Shwetambari',
      mrPdf: '/media/docs/10-Cotton-Marathi_20230912061049.pdf',
      enPdf: '/media/docs/10-Cotton_20230912061049.pdf'
    },
    {
      sr: '9',
      titleEn: 'Fodder Crops',
      titleMr: 'चारापिके',
      category: 'fodder',
      popular: 'Phule Jaywant, Phule Gunwant (Hybrid Napier), Lucerne (Anand-2), Marvel Grass',
      mrPdf: '/media/docs/Fodder.pdf',
      enPdf: '/media/docs/11-Fodder_20200108060101.pdf'
    },
    {
      sr: '10',
      titleEn: 'Vegetables',
      titleMr: 'भाजीपाला पिके',
      category: 'horticulture',
      popular: 'Onion (Phule Samarth, Baswant 780, N-53), Tomato (Phule Raja), Okra (Phule Utkarsha), Brinjal (Krishna)',
      mrPdf: '/media/docs/12-Vegetables_20250822023336.pdf',
      enPdf: '/media/docs/12-Vegetable_20250822023336.pdf'
    },
    {
      sr: '11',
      titleEn: 'Spices: Turmeric & Betelvine',
      titleMr: 'हळद व पानवेल',
      category: 'horticulture',
      popular: 'Turmeric (Phule Swaroop - High Curcumin), Betelvine (Kapoori, Meetha Patta)',
      mrPdf: '/media/docs/14-Masalavargiya-_Marathi_20230913125628.pdf',
      enPdf: '/media/docs/14-Masalavargiya_20230913125628.pdf'
    },
    {
      sr: '12',
      titleEn: 'Flower Crops',
      titleMr: 'फुल पिके',
      category: 'fodder',
      popular: 'Aster (Phule Ganesh Pink, Phule Ganesh White), Tuberose (Phule Rajani), Gladiolus (Phule Prerna)',
      mrPdf: '/media/docs/Flower_20210608024815.pdf',
      enPdf: '/media/docs/15-Flower_20210608024815.pdf'
    },
    {
      sr: '13',
      titleEn: 'Fruit Crops',
      titleMr: 'फळ पिके',
      category: 'horticulture',
      popular: 'Pomegranate (Bhagwa, Phule Super Bhagwa), Guava (Sardar L-49), Acid Lime (Sai Sarbati, Phule Sarbati)',
      mrPdf: '/media/docs/13-Fruit_20250822023749.pdf',
      enPdf: '/media/docs/13-Fruit_20250822023634.pdf'
    },
    {
      sr: '14',
      titleEn: 'Pearlmillet & Rice',
      titleMr: 'बाजरी व भात',
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

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-10">

        {/* 1. Official Crop Varieties & Technology Showcase Section */}
        <section className="space-y-5">
          <div className="h-12 bg-[#1e824c] rounded-t-2xl sm:rounded-r-[2rem] border-b-4 border-red-600 flex items-center justify-between px-6 shadow-sm">
            <span className="text-white font-bold text-base sm:text-lg font-serif">
              {language === 'mr' ? 'प्रमुख विकसित पीक वाण व तंत्रज्ञान भित्तीपत्रके (८)' : 'Flagship Released Crop Varieties & Technology Posters (8)'}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100 bg-white/15 px-3 py-0.5 rounded-full">
              AICRP / MPKV Rahuri
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredPosters.map((poster, pIdx) => (
              <div
                key={poster.id}
                onClick={() => setActiveModalPoster(pIdx)}
                className="rounded-2xl bg-white border-2 border-[#1e824c]/40 hover:border-[#1e824c] shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div className="relative bg-stone-50 p-2.5 border-b border-stone-200">
                  <div className="relative aspect-[4/5] w-full bg-white rounded-lg overflow-hidden border border-stone-300">
                    <img
                      src={poster.src}
                      alt={poster.titleEn}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = '/media/images/mpkv_icon.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                      <div className="w-9 h-9 rounded-full bg-[#1e824c] flex items-center justify-center shadow-md">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[11px] font-bold bg-black/75 px-2.5 py-0.5 rounded-full">
                        {language === 'mr' ? 'मोठे करा' : 'Click to Zoom'}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#1e824c] text-white shadow-xs">
                      {language === 'mr' ? poster.badgeMr : poster.badgeEn}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-white flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-[#1e824c] border border-emerald-200">
                      {language === 'mr' ? poster.cropMr : poster.cropEn}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-serif mt-1 leading-snug group-hover:text-[#1e824c] transition-colors">
                      {language === 'mr' ? poster.titleMr : poster.titleEn}
                    </h4>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-2 border border-stone-200 text-xs space-y-1">
                    {(language === 'mr' ? poster.specsMr : poster.specsEn).map((sp, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-500 font-medium">{sp.label}:</span>
                        <span className="text-slate-900 font-bold text-right ml-2">{sp.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#1e824c] font-bold">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{language === 'mr' ? 'भित्तीपत्रक पहा' : 'View Poster'}</span>
                    </span>
                    <span className="text-[10px] text-stone-400 font-semibold">AICRP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Search & Category Filter Controls */}
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
                    {language === 'mr' ? `वर्ग ${v.sr}` : `Category ${v.sr}`}
                  </span>
                  <span className="text-xs font-bold text-amber-700">
                    {language === 'mr' ? 'मफुकृवि राजपत्र' : 'MPKV Gazette'}
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

              {/* Preview & Download Triggers: Clean Standalone Marathi & English PDF Buttons */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2.5">
                <span className="text-[11px] font-semibold text-stone-500">
                  {language === 'mr' ? 'अधिकृत पुस्तिका:' : 'Official Gazette:'}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {v.mrPdf && (
                    <button
                      type="button"
                      onClick={() =>
                        setActivePdfPreview({
                          titleEn: v.titleEn,
                          titleMr: v.titleMr,
                          mrPdf: v.mrPdf,
                          enPdf: v.enPdf,
                          lang: 'mr',
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300/90 text-amber-950 font-semibold text-xs transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{language === 'mr' ? 'मराठी PDF' : 'Marathi PDF'}</span>
                    </button>
                  )}

                  {v.enPdf && (
                    <button
                      type="button"
                      onClick={() =>
                        setActivePdfPreview({
                          titleEn: v.titleEn,
                          titleMr: v.titleMr,
                          mrPdf: v.mrPdf,
                          enPdf: v.enPdf,
                          lang: 'en',
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 border border-emerald-800 text-white font-semibold text-xs transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                      <span>{language === 'mr' ? 'इंग्रजी PDF' : 'English PDF'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Fullscreen Modal for Variety Posters */}
      {activeModalPoster !== null && featuredPosters[activeModalPoster] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          onClick={() => setActiveModalPoster(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[96vh] overflow-hidden flex flex-col shadow-2xl border border-stone-700 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-950 text-white flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-[#1e824c] text-white">
                  {activeModalPoster + 1} / {featuredPosters.length}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-serif text-white">
                    {language === 'mr'
                      ? featuredPosters[activeModalPoster].titleMr
                      : featuredPosters[activeModalPoster].titleEn}
                  </h3>
                  <p className="text-[11px] text-stone-400 font-medium">
                    {language === 'mr'
                      ? featuredPosters[activeModalPoster].centerMr
                      : featuredPosters[activeModalPoster].centerEn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={featuredPosters[activeModalPoster].src}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Download High-Res Poster"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveModalPoster(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Uncropped Crisp High-Res Poster */}
            <div className="relative flex-1 bg-stone-900 flex items-center justify-center p-2 sm:p-4 min-h-[350px] max-h-[66vh] overflow-hidden">
              <img
                src={featuredPosters[activeModalPoster].src}
                alt={featuredPosters[activeModalPoster].titleEn}
                className="max-h-[62vh] w-auto max-w-full object-contain rounded-lg shadow-xl"
              />

              {/* Prev / Next Navigation Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalPoster(
                    (activeModalPoster - 1 + featuredPosters.length) % featuredPosters.length
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#1e824c] text-white transition-colors shadow-lg cursor-pointer"
                title="Previous Poster"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalPoster(
                    (activeModalPoster + 1) % featuredPosters.length
                  );
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#1e824c] text-white transition-colors shadow-lg cursor-pointer"
                title="Next Poster"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer: Specifications & Direct Purchase Info at ATIC */}
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                {(language === 'mr'
                  ? featuredPosters[activeModalPoster].specsMr
                  : featuredPosters[activeModalPoster].specsEn
                ).map((sp, idx) => (
                  <div key={idx} className="px-3 py-1.5 rounded-xl bg-white border border-stone-200">
                    <span className="text-stone-500 font-semibold">{sp.label}: </span>
                    <strong className="text-slate-900 font-bold">{sp.val}</strong>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-emerald-800 font-bold shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#1e824c]" />
                <span>
                  {language === 'mr'
                    ? 'एटिक (ATIC) एक खिडकी विक्री केंद्रावर उपलब्ध'
                    : 'Available at ATIC Single Window Sales Counter'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline PDF Viewer Modal with Marathi / English Toggle */}
      {activePdfPreview && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => setActivePdfPreview(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-stone-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 sm:px-5 py-3 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-stone-700">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-amber-300 shrink-0" />
                <h3 className="text-sm sm:text-base font-bold truncate">
                  {language === 'mr' ? activePdfPreview.titleMr : activePdfPreview.titleEn}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setActivePdfPreview((p) => (p ? { ...p, lang: 'mr' } : p))}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                      activePdfPreview.lang === 'mr'
                        ? 'bg-amber-400 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {language === 'mr' ? 'मराठी PDF' : 'Marathi PDF'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePdfPreview((p) => (p ? { ...p, lang: 'en' } : p))}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                      activePdfPreview.lang === 'en'
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {language === 'mr' ? 'इंग्रजी PDF' : 'English PDF'}
                  </button>
                </div>

                <a
                  href={activePdfPreview.lang === 'mr' ? activePdfPreview.mrPdf : activePdfPreview.enPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'नवीन टॅबमध्ये उघडा' : 'Open Tab'}</span>
                </a>

                <a
                  href={activePdfPreview.lang === 'mr' ? activePdfPreview.mrPdf : activePdfPreview.enPdf}
                  download
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'डाउनलोड' : 'Download'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActivePdfPreview(null)}
                  className="p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                  aria-label="Close PDF viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-stone-100">
              <iframe
                key={activePdfPreview.lang === 'mr' ? activePdfPreview.mrPdf : activePdfPreview.enPdf}
                src={activePdfPreview.lang === 'mr' ? activePdfPreview.mrPdf : activePdfPreview.enPdf}
                title={language === 'mr' ? activePdfPreview.titleMr : activePdfPreview.titleEn}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
