'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Sprout,
  ShieldAlert,
  TestTube2,
  BookOpen,
  ShoppingBag,
  ArrowRight,
  Camera,
  Layers,
  Building2,
  Users,
  Target,
  Award,
  Calendar,
  ExternalLink,
  Apple,
  Milk,
  Bug,
  Wheat,
  Share2,
  ZoomIn,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ExtensionBreadcrumb } from './components/ExtensionBreadcrumb';
import { ExtensionHero } from './components/ExtensionHero';

interface ExtensionAticViewProps {
  pageData?: any;
}

export const ExtensionAticView: React.FC<ExtensionAticViewProps> = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'wings' | 'posters' | 'contact'>('overview');
  const [activeModalPoster, setActiveModalPoster] = useState<number | null>(null);
  const [posterFilter, setPosterFilter] = useState<'all' | 'sorghum' | 'fodder' | 'vegetables' | 'technology'>('all');

  // The 7 Statutory Objectives (Verbatim from Live Portal https://mpkv.ac.in/Extension/ExtensionATIC)
  const officialObjectives = [
    {
      num: 1,
      en: 'To empower farmers through direct access to information and knowledge.',
      mr: 'शेतकऱ्यांना अद्ययावत माहिती व ज्ञानाचा थेट लाभ देऊन त्यांचे सक्षमीकरण करणे.',
      icon: Users,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-300'
    },
    {
      num: 2,
      en: 'To create strong linkage between different research divisions, units and user of technology.',
      mr: 'विद्यापीठाचे विविध संशोधन विभाग, केंद्रे आणि तंत्रज्ञान वापरकर्ते (शेतकरी) यांच्यात भक्कम समन्वय प्रस्थापित करणे.',
      icon: Share2,
      color: 'bg-blue-50 text-blue-900 border-blue-300'
    },
    {
      num: 3,
      en: 'To help farmers in problem solving and decision making.',
      mr: 'शेतकऱ्यांच्या शेतीविषयक दैनंदिन समस्यांचे वेळेवर निवारण करून निर्णय प्रक्रियेत मदत करणे.',
      icon: HelpCircle,
      color: 'bg-amber-50 text-amber-900 border-amber-300'
    },
    {
      num: 4,
      en: 'To facilitate a dynamic feed forward and feed back mechanism.',
      mr: 'तंत्रज्ञान प्रसार आणि शेतकऱ्यांच्या अडीअडचणी शास्त्रज्ञांपर्यंत पोहोचविणारी गतिमान दुहेरी फीडबॅक यंत्रणा राबविणे.',
      icon: Target,
      color: 'bg-purple-50 text-purple-900 border-purple-300'
    },
    {
      num: 5,
      en: 'To bridge the gap between attainable and attained in the crop, livestock development and production.',
      mr: 'पीक उत्पादन व पशुसंवर्धनात संभाव्य आणि प्रत्यक्ष मिळालेले उत्पादन यांमधील दरी भरून काढणे.',
      icon: Award,
      color: 'bg-teal-50 text-teal-900 border-teal-300'
    },
    {
      num: 6,
      en: 'To generate financial resources through sales and services.',
      mr: 'दर्जेदार बियाणे, कलमे, जैविक खते, उत्पादने व तांत्रिक सेवांच्या विक्रीतून विद्यापीठास आर्थिक उत्पन्न मिळवून देणे.',
      icon: ShoppingBag,
      color: 'bg-orange-50 text-orange-900 border-orange-300'
    },
    {
      num: 7,
      en: 'To disseminate the new technologies developed by the University through organizing Farmers Rallies, Field Visits and Agril. Exhibitions.',
      mr: 'शेतकरी मेळावे, प्रक्षेत्र भेटी आणि राज्यस्तरीय कृषी प्रदर्शनांच्या आयोजनातून विद्यापीठाने विकसित केलेल्या नवीन तंत्रज्ञानाचा व्यापक प्रसार करणे.',
      icon: Calendar,
      color: 'bg-rose-50 text-rose-900 border-rose-300'
    }
  ];

  // The 4 Subject Matter Specialists (SMS) disciplines specified on Live Site
  const subjectSpecialists = [
    {
      disciplineEn: 'Agronomy',
      disciplineMr: 'कृषिविद्या (शस्यशास्त्र)',
      icon: Wheat,
      color: 'text-amber-800 bg-amber-50 border-amber-200',
      descEn: 'Advisory on crop rotation, sowing techniques, weed management, dryland farming, precision water scheduling, and integrated nutrient management (INM).',
      descMr: 'पीक फेरपालट, सुधारित पेरणी तंत्र, तण नियंत्रण, कोरडवाहू शेती, ठिबक सिंचन पाणी व्यवस्थापन आणि एकात्मिक अन्नद्रव्य व्यवस्थापन सल्ला.'
    },
    {
      disciplineEn: 'Horticulture',
      disciplineMr: 'उद्यानविद्या (फलोत्पादन व भाजीपाला)',
      icon: Apple,
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      descEn: 'Supply of certified fruit grafts (Mango, Guava, Pomegranate, Custard Apple), high-value vegetable seedlings, canopy pruning, and protected polyhouse advisories.',
      descMr: 'खात्रीशीर फळझाडांची कलमे (आंबा, पेरू, डाळिंब, सीताफळ), दर्जेदार भाजीपाला रोपे, छाटणी तंत्रज्ञान आणि हरितगृह/शेडनेट शेती मार्गदर्शन.'
    },
    {
      disciplineEn: 'Plant Protection',
      disciplineMr: 'पीक संरक्षण (कीटकशास्त्र व रोगशास्त्र)',
      icon: Bug,
      color: 'text-rose-800 bg-rose-50 border-rose-200',
      descEn: 'Plant health clinic disease diagnosis, insect pest identification, biological control agents (Trichoderma, NPV), and safe pesticide recommendation schedules.',
      descMr: 'पीक आरोग्य चिकित्सालय, रोग-कीड अचूक निदान, जैविक नियंत्रक घटकांची उपलब्धता आणि योग्य औषध फवारणीचे वेळापत्रक मार्गदर्शन.'
    },
    {
      disciplineEn: 'Animal Husbandry & Dairy',
      disciplineMr: 'पशुसंवर्धन व दुग्धशास्त्र',
      icon: Milk,
      color: 'text-cyan-800 bg-cyan-50 border-cyan-200',
      descEn: 'Dairy management of Phule Triveni crossbred cows, nutritious green fodder cultivation (Phule Jaywant, Phule Gunwant), silage making, and scientific cattle feed.',
      descMr: 'फुले त्रिवेणी संकरित गाईंचे व्यवस्थापन, पौष्टिक बहुवार्षिक चारा पिके (फुले जयवंत, फुले गुणवंत), मुरघास निर्मिती व वैज्ञानिक पशुखाद्य सल्ला.'
    }
  ];

  // The 8 Official Released Crop Varieties & Technology Posters from Live Portal
  const varietyPosters = [
    {
      id: 'phule-revati',
      src: '/media/images/extension/atic1.jpg',
      titleEn: 'Phule Revati (फुले रेवती)',
      titleMr: 'फुले रेवती (Phule Revati)',
      cropEn: 'Rabi Sorghum (ज्वारी)',
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
      src: '/media/images/extension/atic2.jpg',
      titleEn: 'Phule Vasudha (फुले वसुधा)',
      titleMr: 'फुले वसुधा (Phule Vasudha)',
      cropEn: 'Rabi Sorghum (ज्वारी)',
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
      src: '/media/images/extension/atic3.jpg',
      titleEn: 'Phule Suchitra [SPV 2048] (फुले सुचित्रा)',
      titleMr: 'फुले सुचित्रा [SPV 2048]',
      cropEn: 'Rabi Sorghum (ज्वारी)',
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
      src: '/media/images/extension/atic13.jpg',
      titleEn: 'Phule Suchitra (Cob & Field View)',
      titleMr: 'फुले सुचित्रा (कणीस व पीक वैशिष्ट्ये)',
      cropEn: 'Rabi Sorghum (ज्वारी)',
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
      src: '/media/images/extension/aitic14.jpg',
      titleEn: 'Stylo - Phule Kranti (स्टायलो - फुले क्रांती)',
      titleMr: 'स्टायलो - फुले क्रांती (Stylo)',
      cropEn: 'Leguminous Fodder (द्विदल चारा पीक)',
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
      src: '/media/images/extension/atic16.jpg',
      titleEn: 'Rabi Sorghum Package of Practices',
      titleMr: 'रब्बी ज्वारी लागवडीचे तंत्रज्ञान',
      cropEn: 'Production Technology (लागवड तंत्रज्ञान)',
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
      src: '/media/images/extension/atic17.jpg',
      titleEn: 'Okra - Phule Vimukta (भेंडी - फुले विमुक्ता)',
      titleMr: 'भेंडी - फुले विमुक्ता (Okra)',
      cropEn: 'Vegetables (भाजीपाला)',
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
      src: '/media/images/extension/atic18.jpg',
      titleEn: 'Hybrid Napier - Phule Gunwant (संकरित नेपिअर - फुले गुणवंत)',
      titleMr: 'संकरित नेपिअर - फुले गुणवंत',
      cropEn: 'Perennial Grass (बहुवार्षिक चारा गवत)',
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

  const filteredPosters = varietyPosters.filter((p) => {
    if (posterFilter === 'all') return true;
    return p.category === posterFilter;
  });

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-slate-800">
      <ExtensionBreadcrumb currentPageTitle={{ en: 'Agricultural Technology Information Centre (ATIC)', mr: 'कृषि तंत्रज्ञान माहिती केंद्र (ATIC)' }} />

      <ExtensionHero
        theme="atic"
        badge={{ en: 'Single Window Delivery System · Est. 13th August 2001', mr: 'एक खिडकी योजना · स्थापना १३ ऑगस्ट २००१' }}
        title={{
          en: 'Agricultural Technology Information Centre (ATIC)',
          mr: 'कृषि तंत्रज्ञान माहिती केंद्र (ATIC)'
        }}
        subtitle={{
          en: 'A unified single-window dissemination and diagnostic delivery hub bridging innovative agricultural research, farm inputs, and advisory directly to the farming community.',
          mr: 'विद्यापीठाने विकसित केलेले सुधारित तंत्रज्ञान, दर्जेदार निविष्ठा, पीक रोगनिदान व शेती सल्ला एकाच छताखाली पुरविणारी मध्यवर्ती एक खिडकी यंत्रणा.'
        }}
        helplinePhone="1800 233 3235"
        quickChips={[
          { label: language === 'mr' ? 'स्थापना १३ ऑगस्ट २००१' : 'Est. 13th August 2001', icon: Calendar },
          { label: language === 'mr' ? '४ विषय विशेषज्ञ (SMS)' : '4 Subject Matter Specialists', icon: Users },
          { label: language === 'mr' ? '८ अधिकृत वाण भित्तीपत्रके' : '8 Flagship Variety Posters', icon: Sprout },
          { label: language === 'mr' ? 'एक खिडकी विक्री व सल्ला' : 'Single Window Delivery', icon: ShoppingBag }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-10">

        {/* 1. Official Core Mandate & Main Complex Banner (Verbatim from live portal) */}
        <section className="rounded-3xl bg-white border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Left Column: Official Main Building Photograph */}
            <div className="lg:col-span-5 relative bg-stone-900 min-h-[300px] lg:min-h-full overflow-hidden flex items-center justify-center">
              <img
                src="/media/images/extension/AticMainPhoto.jpg"
                alt="ATIC MPKV Rahuri Main Building"
                className="w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = '/media/images/mpkv_icon.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5 sm:p-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-700 text-white shadow-xs">
                    {language === 'mr' ? 'मध्यवर्ती संकुल' : 'Central Campus Complex'}
                  </span>
                  <h3 className="text-white font-bold text-base sm:text-lg font-serif mt-1.5 drop-shadow-sm">
                    {language === 'mr' ? 'कृषि तंत्रज्ञान माहिती केंद्र, म.फु.कृ.वि. राहुरी' : 'Agricultural Technology Information Centre, Rahuri'}
                  </h3>
                  <p className="text-stone-300 text-xs mt-0.5">
                    {language === 'mr' ? 'स्थापना: १३ ऑगस्ट २००१' : 'Functioning w.e.f. 13th August, 2001'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Verbatim Mandate & Supervisory Overview */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-950 border border-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
                  <span>{language === 'mr' ? 'एक खिडकी सेवा उद्दिष्ट' : 'Single Window Dissemination System'}</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0c3866] font-serif leading-tight">
                  {language === 'mr'
                    ? 'संशोधन आणि उत्कृष्टतेचा लाभ थेट शेतकऱ्यांपर्यंत'
                    : 'Single Window Technology Delivery & Support System'}
                </h2>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify font-medium">
                  {language === 'mr'
                    ? 'कृषि तंत्रज्ञान माहिती केंद्र (ATIC) हे विद्यापीठ आणि संलग्न संशोधन संस्थांमध्ये विकसित झालेल्या विविध नाविन्यपूर्ण व शेती-उपयुक्त तंत्रज्ञानाचा प्रसार व सेवा पुरविणारी मध्यवर्ती "एक खिडकी योजना" आहे. या केंद्राचे प्रत्यक्ष कामकाज १३ ऑगस्ट २००१ पासून अविरतपणे सुरू आहे.'
                    : 'The Agricultural Technology Information Center (ATIC) is single window delivery dissemination and supporting system for various innovative and farm worthy techniques evolved at the university and affiliated organization in the pursuit of research and excellence. This Center started its actual functioning w.e.f. 13th August, 2001.'}
                </p>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify font-medium">
                  {language === 'mr'
                    ? 'अ‍ॅटिकचे संचलन व्यवस्थापक (Manager), जनसंपर्क अधिकारी (PRO) आणि कृषिविद्या, उद्यानविद्या, पीक संरक्षण व पशुसंवर्धन-दुग्धशास्त्र या चार प्रमुख शाखांतील विषय विशेषज्ज्ञांच्या (SMS) समन्वयातून केले जाते. क्षेत्रीय भेटी, शेतकऱ्यांच्या शंकांचे निरसन, प्रयोगशाळा रोगनिदान, तसेच प्रमाणित बियाणे, कलमे, प्रक्रिया उत्पादने व कृषी साहित्याची थेट विक्री या केंद्राद्वारे केली जाते.'
                    : 'The ATIC is supervised by the Manager with four subject matter specialists (SMS) from the disciplines viz., Agronomy, Horticulture, Plant protection and Animal husbandry and Dairy and Public Relation Officer (PRO). The extension activities like field visits, replying the queries of the farmers and other stakeholders and the center performs diagnostic services in coordination with the other departments of University. Besides, the seed and seedlings, processed products and publications are also sold through ATIC to the end users.'}
                </p>
              </div>

              {/* Verified Credential Badges Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-stone-200">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <div className="text-[10px] text-stone-500 uppercase font-bold">Inception Date</div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">13 Aug 2001</div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <div className="text-[10px] text-stone-500 uppercase font-bold">Delivery Model</div>
                  <div className="text-xs sm:text-sm font-extrabold text-emerald-800 mt-0.5">Single Window</div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <div className="text-[10px] text-stone-500 uppercase font-bold">SMS Disciplines</div>
                  <div className="text-xs sm:text-sm font-extrabold text-blue-800 mt-0.5">4 Specializations</div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <div className="text-[10px] text-stone-500 uppercase font-bold">Kisan Helpline</div>
                  <div className="text-xs sm:text-sm font-extrabold text-amber-800 mt-0.5">1800 233 3235</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. Interactive Navigation Section Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
          {[
            { id: 'overview', labelEn: '1. The 7 Statutory Objectives', labelMr: '१. सात वैधानिक उद्दिष्टे', icon: Target },
            { id: 'wings', labelEn: '2. 4 Subject Specialists & Wings', labelMr: '२. चार विषय विशेषज्ञ व सेवा शाखा', icon: Users },
            { id: 'posters', labelEn: '3. Released Varieties & Posters (8)', labelMr: '३. अधिकृत वाण व तंत्रज्ञान भित्तीपत्रके (८)', icon: Sprout },
            { id: 'contact', labelEn: '4. Official Contacts & Timings', labelMr: '४. अधिकृत संपर्क व कार्यालयीन वेळ', icon: Phone }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#0a4863] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{language === 'mr' ? tab.labelMr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* TAB 1: THE 7 STATUTORY OBJECTIVES (VERBATIM FROM LIVE PORTAL)     */}
        {/* ================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'mr' ? 'अधिकृत वैधानिक उद्दिष्टे' : 'Statutory Mandate'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 pt-1">
                  {language === 'mr'
                    ? 'कृषि तंत्रज्ञान माहिती केंद्राची (ATIC) प्रमुख ७ उद्दिष्टे'
                    : 'Seven Core Objectives of ATIC, MPKV Rahuri'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  {language === 'mr'
                    ? '१३ ऑगस्ट २००१ पासून कार्यान्वित झालेल्या या केंद्राची थेट संकेतस्थळावरील अधिकृत उद्दिष्टे खालीलप्रमाणे आहेत:'
                    : 'As formally notified upon commencement on 13th August 2001, ATIC functions with the following 7 statutory objectives:'}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {officialObjectives.map((obj) => {
                  const Icon = obj.icon;
                  return (
                    <div
                      key={obj.num}
                      className={`flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border ${obj.color} shadow-2xs hover:shadow-xs transition-all`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-white/90 border border-stone-300/80 shrink-0 flex items-center justify-center font-black text-xs shadow-2xs">
                        {obj.num}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-[14px] md:text-[15px] font-bold leading-snug">
                          {language === 'mr' ? obj.mr : obj.en}
                        </div>
                        {language === 'mr' && (
                          <div className="text-[11px] text-stone-600 font-medium mt-1">
                            {obj.en}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: 4 SUBJECT MATTER SPECIALISTS (SMS) & OPERATIONAL WINGS     */}
        {/* ================================================================= */}
        {activeTab === 'wings' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-800">
                Supervisory & Multi-Disciplinary Framework
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                {language === 'mr'
                  ? 'चार प्रमुख विषय विशेषज्ञ (SMS) व सेवा शाखा'
                  : 'Four Subject Matter Specialists (SMS) & Extension Services'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-3xl">
                {language === 'mr'
                  ? 'केंद्राचे व्यवस्थापक यांच्या देखरेखीखाली चार मुख्य विद्याशाखांतील विषय विशेषज्ञ थेट शेतकऱ्यांना मार्गदर्शन करतात.'
                  : 'Under the supervision of the Manager, four dedicated subject matter specialists provide comprehensive scientific solutions directly to visiting farmers.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {subjectSpecialists.map((sms, idx) => {
                const Icon = sms.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl ${sms.color} flex items-center justify-center font-bold border shadow-xs`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                          Discipline #{idx + 1}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base sm:text-lg font-bold font-serif text-slate-900">
                          {language === 'mr' ? sms.disciplineMr : sms.disciplineEn}
                        </h4>
                        <div className="text-xs font-semibold text-stone-500">
                          Subject Matter Specialist (SMS)
                        </div>
                      </div>

                      <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-medium">
                        {language === 'mr' ? sms.descMr : sms.descEn}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                      <span>ATIC Specialist Unit</span>
                      <span className="text-[11px] text-stone-500 font-semibold">Central Campus, Rahuri</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sales & Service Delivery Matrix Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c3866] to-[#082340] text-white space-y-4 shadow-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Direct Sales & Diagnostic Services</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold font-serif">
                {language === 'mr'
                  ? 'अ‍ॅटिक केंद्रातून उपलब्ध होणाऱ्या अधिकृत निविष्ठा व उत्पादने'
                  : 'Official Farm Inputs, Seedlings & Diagnostic Solutions Available at ATIC'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-blue-100">
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                  <div className="text-amber-300 font-bold mb-1">1. Certified Seeds & Grafts</div>
                  <span>University crop varieties, certified foundation seed packets, fruit grafts & vegetable seedlings.</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                  <div className="text-amber-300 font-bold mb-1">2. Processed Farm Products</div>
                  <span>Aonla RTS, Tamarind pulp, dairy sweets (Shrikhand based), bakery cookies, and nutri-cereal products.</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                  <div className="text-amber-300 font-bold mb-1">3. Literature & Media</div>
                  <span>Quarterly Shree Sugi magazine, annual Krishidarshani diary, crop booklets, and multimedia CDs.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: OFFICIAL RELEASED VARIETIES & TECHNOLOGY POSTERS (8 VIEWS)  */}
        {/* ================================================================= */}
        {activeTab === 'posters' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {language === 'mr' ? 'अधिकृत विद्यापीठ वाण व तंत्रज्ञान भित्तीपत्रके' : 'Official University Variety & Technology Posters'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
                  {language === 'mr'
                    ? 'अ‍ॅटिक केंद्रातील प्रसारित पिकांची अधिकृत भित्तीपत्रके (८ वाण)'
                    : 'MPKV Flagship Crop Varieties & Package of Practices (8 Posters)'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                  {language === 'mr'
                    ? 'अखिल भारतीय समन्वित संशोधन प्रकल्पांतर्गत विकसित उच्च उत्पादनक्षम वाण. मोठे करून पाहण्यासाठी कोणत्याही भित्तीपत्रकावर क्लिक करा.'
                    : 'Flagship high-yielding varieties developed under AICRP. Click on any poster to view full-screen high-resolution details.'}
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
                {[
                  { id: 'all', labelEn: 'All (8)', labelMr: 'सर्व (८)' },
                  { id: 'sorghum', labelEn: 'Sorghum (4)', labelMr: 'ज्वारी (४)' },
                  { id: 'fodder', labelEn: 'Fodder (2)', labelMr: 'चारा पिके (२)' },
                  { id: 'vegetables', labelEn: 'Vegetables (1)', labelMr: 'भाजीपाला (१)' },
                  { id: 'technology', labelEn: 'Practices (1)', labelMr: 'तंत्रज्ञान (१)' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setPosterFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      posterFilter === f.id
                        ? 'bg-[#1e824c] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    {language === 'mr' ? f.labelMr : f.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* 4-Column Poster Grid (Matching exact 2x4 Layout from Live Website & User Screenshot) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPosters.map((poster) => {
                const globalIndex = varietyPosters.findIndex(p => p.id === poster.id);
                return (
                  <div
                    key={poster.id}
                    className="rounded-2xl bg-white border-2 border-[#1e824c]/40 shadow-xs hover:shadow-xl hover:border-[#1e824c] transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
                    onClick={() => setActiveModalPoster(globalIndex)}
                  >
                    {/* Poster Image Container */}
                    <div className="relative bg-stone-50 p-2.5 flex items-center justify-center overflow-hidden border-b border-stone-200">
                      <div className="relative w-full aspect-[4/5] bg-white rounded-lg shadow-inner overflow-hidden border border-stone-300">
                        <img
                          src={poster.src}
                          alt={poster.titleEn}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = '/media/images/mpkv_icon.png';
                          }}
                        />
                        {/* Hover Overlay with Zoom Icon */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 p-3 text-center">
                          <div className="w-10 h-10 rounded-full bg-[#1e824c] flex items-center justify-center shadow-lg">
                            <Maximize2 className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-xs font-bold bg-black/75 px-3 py-1 rounded-full">
                            {language === 'mr' ? 'मोठे करून पहा' : 'Click to Fullscreen'}
                          </span>
                        </div>
                      </div>

                      {/* Badge Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#1e824c] text-white shadow-xs">
                          {language === 'mr' ? poster.badgeMr : poster.badgeEn}
                        </span>
                      </div>
                    </div>

                    {/* Card Content & Quick Specifications */}
                    <div className="p-4 flex-1 flex flex-col justify-between bg-white space-y-3">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wide text-emerald-800">
                          {language === 'mr' ? poster.cropMr : poster.cropEn}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold font-serif text-slate-900 group-hover:text-[#1e824c] transition-colors leading-snug mt-0.5">
                          {language === 'mr' ? poster.titleMr : poster.titleEn}
                        </h4>
                        <div className="text-[11px] text-stone-500 font-medium mt-1 line-clamp-1">
                          {language === 'mr' ? poster.centerMr : poster.centerEn}
                        </div>
                      </div>

                      {/* Tabular Specs Box */}
                      <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-200 text-xs space-y-1.5">
                        {(language === 'mr' ? poster.specsMr : poster.specsEn).map((sp, sIdx) => (
                          <div key={sIdx} className="flex items-center justify-between text-[11px]">
                            <span className="text-stone-500 font-semibold">{sp.label}:</span>
                            <span className="text-slate-900 font-bold text-right ml-2">{sp.val}</span>
                          </div>
                        ))}
                      </div>

                      {/* Card Footer Action */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold text-[#1e824c] flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{language === 'mr' ? 'तपशील पहा' : 'View Poster'}</span>
                        </span>
                        <span className="text-[10px] text-stone-400 font-semibold">
                          AICRP / MPKV
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: OFFICIAL CONTACT DIRECTORY (VERBATIM FROM LIVE PORTAL)      */}
        {/* ================================================================= */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Official Contact Directory (Verbatim)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                {language === 'mr'
                  ? 'अ‍ॅटिक व्यवस्थापक व जनसंपर्क अधिकारी थेट संपर्क'
                  : 'ATIC Manager & Public Relation Officer Official Contacts'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Contact Card 1: The Manager (Verbatim) */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-emerald-300/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase">
                    <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Executive In-Charge</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800">ATIC MPKV</span>
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-black font-serif text-slate-900">
                    {language === 'mr' ? 'व्यवस्थापक (The Manager)' : 'The Manager'}
                  </h4>
                  <p className="text-xs text-stone-600 font-semibold mt-0.5">
                    Agricultural Technology Information Center (ATIC)
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-stone-700 font-medium border-t border-stone-200 pt-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Central Campus, MPKV, Rahuri Dist. Ahmednagar - 413 722</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Ph.: <strong className="text-slate-900">02426/243861</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>e-mail: <a href="mailto:aticmpkv@rediffmail.com" className="text-emerald-800 font-bold hover:underline">aticmpkv@rediffmail.com</a></span>
                  </div>
                </div>
              </div>

              {/* Contact Card 2: The Public Relation Officer (Verbatim) */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-blue-300/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-300 text-xs font-bold uppercase">
                    <Users className="w-3.5 h-3.5 text-blue-700" />
                    <span>Liaison & Public Relations</span>
                  </div>
                  <span className="text-xs font-bold text-blue-800">PRO Cell</span>
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-black font-serif text-slate-900">
                    {language === 'mr' ? 'जनसंपर्क अधिकारी (Public Relation Officer)' : 'The Public Relation Officer'}
                  </h4>
                  <p className="text-xs text-stone-600 font-semibold mt-0.5">
                    Agricultural Technology Information Center (ATIC)
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-stone-700 font-medium border-t border-stone-200 pt-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>Central Campus, MPKV, Rahuri Dist. Ahmednagar - 413 722</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Ph.: <strong className="text-slate-900">02426/243373</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>e-mail: <a href="mailto:pro.mpkv@gmail.com" className="text-blue-800 font-bold hover:underline">pro.mpkv@gmail.com</a></span>
                  </div>
                </div>
              </div>

            </div>



          </div>
        )}

        {/* ================================================================= */}
        {/* ALWAYS VISIBLE BOTTOM SHOWCASE: 8 OFFICIAL POSTERS (2 ROWS OF 4)  */}
        {/* Matches live website https://mpkv.ac.in/Extension/ExtensionATIC   */}
        {/* ================================================================= */}
        {activeTab !== 'posters' && (
          <section className="mt-12 pt-8 border-t border-stone-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-1.5">
                  <Sprout className="w-3.5 h-3.5 text-[#1e824c]" />
                  <span>{language === 'mr' ? 'अधिकृत वाण भित्तीपत्रके दालन' : 'Flagship Released Varieties'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                  {language === 'mr'
                    ? 'विद्यापीठाने विकसित केलेले सुधारित वाण व तंत्रज्ञान'
                    : 'Official Crop Varieties & Production Technology Posters'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
                  {language === 'mr'
                    ? 'थेट संकेतस्थळावरील अधिकृत दालन (२ ओळी व ४ स्तंभ). संपूर्ण माहितीसाठी कोणत्याही भित्तीपत्रकावर क्लिक करा.'
                    : 'Verbatim live portal gallery (2 rows of 4 columns). Click any poster to view full-screen high-res details.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('posters')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e824c] text-white text-xs font-bold hover:bg-[#16663b] transition-colors self-start sm:self-auto shadow-xs"
              >
                <span>{language === 'mr' ? 'सर्व ८ भित्तीपत्रके पहा' : 'Explore All 8 Posters'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Exactly 2 rows of 4 columns matching the user's reference screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {varietyPosters.map((poster, pIdx) => (
                <div
                  key={poster.id}
                  onClick={() => setActiveModalPoster(pIdx)}
                  className="rounded-2xl bg-white border-2 border-[#1e824c]/40 hover:border-[#1e824c] shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
                >
                  <div className="relative bg-stone-100 p-2 border-b border-stone-200">
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
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <div className="w-10 h-10 rounded-full bg-[#1e824c] flex items-center justify-center shadow-md">
                          <Maximize2 className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white text-center">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-[#1e824c] border border-emerald-200">
                      {language === 'mr' ? poster.cropMr : poster.cropEn}
                    </span>
                    <h5 className="text-xs sm:text-[13px] font-bold text-slate-900 font-serif mt-1 leading-snug group-hover:text-[#1e824c] transition-colors">
                      {language === 'mr' ? poster.titleMr : poster.titleEn}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ================================================================= */}
      {/* LIGHTBOX FULLSCREEN MODAL FOR POSTERS                              */}
      {/* ================================================================= */}
      {activeModalPoster !== null && varietyPosters[activeModalPoster] && (
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
                  {activeModalPoster + 1} / {varietyPosters.length}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-serif text-white">
                    {language === 'mr'
                      ? varietyPosters[activeModalPoster].titleMr
                      : varietyPosters[activeModalPoster].titleEn}
                  </h3>
                  <p className="text-[11px] text-stone-400 font-medium">
                    {language === 'mr'
                      ? varietyPosters[activeModalPoster].centerMr
                      : varietyPosters[activeModalPoster].centerEn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={varietyPosters[activeModalPoster].src}
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
                src={varietyPosters[activeModalPoster].src}
                alt={varietyPosters[activeModalPoster].titleEn}
                className="max-h-[62vh] w-auto max-w-full object-contain rounded-lg shadow-xl"
              />

              {/* Prev / Next Navigation Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalPoster(
                    (activeModalPoster - 1 + varietyPosters.length) % varietyPosters.length
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
                    (activeModalPoster + 1) % varietyPosters.length
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
                  ? varietyPosters[activeModalPoster].specsMr
                  : varietyPosters[activeModalPoster].specsEn
                ).map((sp, idx) => (
                  <div key={idx} className="px-3 py-1.5 rounded-xl bg-white border border-stone-200">
                    <span className="text-stone-500 font-semibold">{sp.label}: </span>
                    <strong className="text-slate-900 font-bold">{sp.val}</strong>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-emerald-800 font-bold shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#1e824c]" />
                <span>Available at ATIC Single Window Sales Counter</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
