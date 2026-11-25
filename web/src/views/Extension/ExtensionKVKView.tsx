'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2,
  Search,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Users,
  Target,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ExtensionBreadcrumb } from './components/ExtensionBreadcrumb';
import { ExtensionHero } from './components/ExtensionHero';
import { ExtensionSubmenuNav } from './components/ExtensionSubmenuNav';

interface KVKRecord {
  id: string;
  type: 'university' | 'ngo';
  nameEn: string;
  nameMr: string;
  districtEn: string;
  districtMr: string;
  coordinatorEn: string;
  coordinatorMr: string;
  phone: string;
  email: string;
  website?: string;
  focusCropsEn: string;
  focusCropsMr: string;
}

interface ExtensionKVKViewProps {
  pageData?: any;
}

export const ExtensionKVKView: React.FC<ExtensionKVKViewProps> = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'university' | 'ngo'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const allKVKs: KVKRecord[] = [
    // 4 University Administered KVKs
    {
      id: 'kvk-dhule',
      type: 'university',
      nameEn: 'Krishi Vigyan Kendra, Dhule',
      nameMr: 'कृषि विज्ञान केंद्र, धुळे',
      districtEn: 'Dhule',
      districtMr: 'धुळे',
      coordinatorEn: 'Dr. Dinesh Nandre, Programme Coordinator',
      coordinatorMr: 'डॉ. दिनेश नांद्रे, कार्यक्रम समन्वयक',
      phone: '02562-230362',
      email: 'pckvkdhule@gmail.com',
      website: 'http://kvkdhule.org/',
      focusCropsEn: 'Cotton, Pearlmillet, Pulses, Pasture grasses',
      focusCropsMr: 'कापूस, बाजरी, कडधान्ये, चारा पिके'
    },
    {
      id: 'kvk-mohol',
      type: 'university',
      nameEn: 'Krishi Vigyan Kendra, Mohol Dist. Solapur (Solapur - II)',
      nameMr: 'कृषि विज्ञान केंद्र, मोहोळ जि. सोलापूर (सोलापूर - २)',
      districtEn: 'Solapur',
      districtMr: 'सोलापूर',
      coordinatorEn: 'Dr. Tanaji Walkunde, Programme Coordinator',
      coordinatorMr: 'डॉ. तानाजी वाळकुंडे, कार्यक्रम समन्वयक',
      phone: '02189-233001',
      email: 'kvkmohol@yahoo.com, kvkmohol@rediffmail.com',
      focusCropsEn: 'Rabi Sorghum, Chickpea, Pomegranate, Safflower',
      focusCropsMr: 'रब्बी ज्वारी, हरभरा, डाळिंब, करडई'
    },
    {
      id: 'kvk-mamurabad',
      type: 'university',
      nameEn: 'Krishi Vigyan Kendra, Mamurabad Farm, Jalgaon (Jalgaon - II)',
      nameMr: 'कृषि विज्ञान केंद्र, मामुराबाद फार्म, जळगाव (जळगाव - २)',
      districtEn: 'Jalgaon',
      districtMr: 'जळगाव',
      coordinatorEn: 'Dr. Hemant Baheti, Programme Coordinator',
      coordinatorMr: 'डॉ. हेमंत बाहेती, कार्यक्रम समन्वयक',
      phone: '0257-2020510',
      email: 'kvkjalgaon@rediffmail.com, pckvkjalgaon@gmail.com',
      focusCropsEn: 'Banana, Groundnut, Cotton, Pulses',
      focusCropsMr: 'केळी, भुईमूग, कापूस, कडधान्ये'
    },
    {
      id: 'kvk-borgaon',
      type: 'university',
      nameEn: 'Krishi Vigyan Kendra, Borgaon, Dist. Satara (Satara - II)',
      nameMr: 'कृषि विज्ञान केंद्र, बोरगाव, जि. सातारा (सातारा - २)',
      districtEn: 'Satara',
      districtMr: 'सातारा',
      coordinatorEn: 'Dr. Mahesh Babar, Programme Coordinator',
      coordinatorMr: 'डॉ. महेश बाबर, कार्यक्रम समन्वयक',
      phone: '02162-295625',
      email: 'kvkborgaon_satara@yahoo.com',
      focusCropsEn: 'Soybean, Strawberry, Sugarcane, Vegetables',
      focusCropsMr: 'सोयाबीन, स्ट्रॉबेरी, ऊस, भाजीपाला'
    },

    // 13 NGO / Partner KVKs
    {
      id: 'kvk-babhaleshwar',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Babhaleshwar Dist. Ahmednagar (Ahmednagar - I)',
      nameMr: 'कृषि विज्ञान केंद्र, बाभळेश्वर जि. अहमदनगर (अहमदनगर - १)',
      districtEn: 'Ahmednagar',
      districtMr: 'अहमदनगर',
      coordinatorEn: 'Dr. Shailesh Deshmukh, Programme Coordinator',
      coordinatorMr: 'डॉ. शैलेश देशमुख, कार्यक्रम समन्वयक',
      phone: '02422-252612',
      email: 'kvkahmednagar@yahoo.com',
      website: 'http://www.kvkpravara.com/',
      focusCropsEn: 'Sugarcane, Pomegranate, Onion, Dairy Management',
      focusCropsMr: 'ऊस, डाळिंब, कांदा, दुग्धव्यवसाय'
    },
    {
      id: 'kvk-nashik-ycmou',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Nashik (YCMOU) (Nashik - I)',
      nameMr: 'कृषि विज्ञान केंद्र, नाशिक (वायसीएमओयू) (नाशिक - १)',
      districtEn: 'Nashik',
      districtMr: 'नाशिक',
      coordinatorEn: 'Dr. Niteen Thoke, Programme Coordinator',
      coordinatorMr: 'डॉ. नितीन ठोके, कार्यक्रम समन्वयक',
      phone: '0253-2230698',
      email: 'kvknashik@rediffmail.com',
      focusCropsEn: 'Grapes, Onion, Tomato, Protected Floriculture',
      focusCropsMr: 'द्राक्ष, कांदा, टोमॅटो, हरितगृह फुलशेती'
    },
    {
      id: 'kvk-baramati',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Baramati, Dist. Pune (Pune - I)',
      nameMr: 'कृषि विज्ञान केंद्र, बारामती, जि. पुणे (पुणे - १)',
      districtEn: 'Pune',
      districtMr: 'पुणे',
      coordinatorEn: 'Dr. Dheeraj Shinde, Programme Coordinator',
      coordinatorMr: 'डॉ. धीरज शिंदे, कार्यक्रम समन्वयक',
      phone: '02112-255327',
      email: 'kvkbmt@yahoo.com',
      website: 'http://www.kvkbaramati.com/',
      focusCropsEn: 'Sugarcane, Hi-Tech Horticulture, Custom Hiring, AI in Agriculture',
      focusCropsMr: 'ऊस, आधुनिक फलोत्पादन, कस्टम हायरिंग, कृषी कृत्रिम बुद्धिमत्ता'
    },
    {
      id: 'kvk-kolde',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Kolde Dist. Nandurbar',
      nameMr: 'कृषि विज्ञान केंद्र, कोळदे जि. नंदुरबार',
      districtEn: 'Nandurbar',
      districtMr: 'नंदुरबार',
      coordinatorEn: 'Shri. Rajendra Dahatonde, Programme Coordinator',
      coordinatorMr: 'श्री. राजेंद्र दहातोंडे, कार्यक्रम समन्वयक',
      phone: '02564-240544',
      email: 'kvk_ndb@yahoo.com',
      focusCropsEn: 'Tribal Area Maize, Soybean, Minor Millets, Poultry',
      focusCropsMr: 'आदिवासी पट्टा मका, सोयाबीन, नाचणी, कुक्कुटपालन'
    },
    {
      id: 'kvk-pal',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Pal Dist. Jalgaon (Jalgaon - I)',
      nameMr: 'कृषि विज्ञान केंद्र, पाल जि. जळगाव (जळगाव - १)',
      districtEn: 'Jalgaon',
      districtMr: 'जळगाव',
      coordinatorEn: 'Mr. S. J. Mahajan, Programme Coordinator',
      coordinatorMr: 'श्री. एस. जे. महाजन, कार्यक्रम समन्वयक',
      phone: '02584-288525, 288439',
      email: 'kvk_pal@yahoo.co.in, kvk_pal@gmail.com',
      focusCropsEn: 'Satpuda Hill Agriculture, Banana, Cotton, Custard Apple',
      focusCropsMr: 'सातपुडा डोंगरी शेती, केळी, कापूस, सीताफळ'
    },
    {
      id: 'kvk-kegaon',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Kegaon, Dist. Solapur (Solapur - I)',
      nameMr: 'कृषि विज्ञान केंद्र, केगाव, जि. सोलापूर (सोलापूर - १)',
      districtEn: 'Solapur',
      districtMr: 'सोलापूर',
      coordinatorEn: 'Dr. Lalasaheb Tambade, Programme Coordinator',
      coordinatorMr: 'डॉ. लालासाहेब तांबडे, कार्यक्रम समन्वयक',
      phone: '0217-2990563',
      email: 'kvksolapur@gmail.com, lrtambade@gmail.com',
      focusCropsEn: 'Dryland Farming, Pomegranate, Ber, Rabi Sorghum',
      focusCropsMr: 'कोरडवाहू शेती, डाळिंब, बोर, रब्बी ज्वारी'
    },
    {
      id: 'kvk-kalwade',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Kalwade Dist. Satara (Satara - I)',
      nameMr: 'कृषि विज्ञान केंद्र, काळवडे जि. सातारा (सातारा - १)',
      districtEn: 'Satara',
      districtMr: 'सातारा',
      coordinatorEn: 'Dr. B. S. Khandekar, Programme Coordinator',
      coordinatorMr: 'डॉ. बी. एस. खांडेकर, कार्यक्रम समन्वयक',
      phone: '02164-288070',
      email: 'pckvkkarad@gmail.com, pckvkkarad@rediffmail.com',
      focusCropsEn: 'Sugarcane, Ginger, Turmeric, Soybean',
      focusCropsMr: 'ऊस, आले, हळद, सोयाबीन'
    },
    {
      id: 'kvk-sangli',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Prakash Nagar Dist. Sangli',
      nameMr: 'कृषि विज्ञान केंद्र, प्रकाश नगर जि. सांगली',
      districtEn: 'Sangli',
      districtMr: 'सांगली',
      coordinatorEn: 'Shri. Aslam Shaikh, Programme Coordinator',
      coordinatorMr: 'श्री. अस्लम शेख, कार्यक्रम समन्वयक',
      phone: '0233-2256725, 2256925',
      email: 'kvksangli@rediffmail.com',
      focusCropsEn: 'Turmeric, Grapes, Sugarcane, Salt Affected Soils',
      focusCropsMr: 'हळद, द्राक्ष, ऊस, क्षारपड जमीन सुधारणा'
    },
    {
      id: 'kvk-talsande',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Talsande, Dist. Kolhapur (Kolhapur - I)',
      nameMr: 'कृषि विज्ञान केंद्र, तळसंदे, जि. कोल्हापूर (कोल्हापूर - १)',
      districtEn: 'Kolhapur',
      districtMr: 'कोल्हापूर',
      coordinatorEn: 'Dr. Jaywant Jagtap, Programme Coordinator',
      coordinatorMr: 'डॉ. जयवंत जगताप, कार्यक्रम समन्वयक',
      phone: '0230-2479099',
      email: 'kvkkolhapur@gmail.com',
      focusCropsEn: 'Sugarcane, Jaggery, Dairy Farming, Paddy',
      focusCropsMr: 'ऊस, सेंद्रिय गूळ, दुग्ध व्यवसाय, भात'
    },
    {
      id: 'kvk-narayangaon',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Narayangaon Dist. Pune (Pune - II)',
      nameMr: 'कृषि विज्ञान केंद्र, नारायणगाव जि. पुणे (पुणे - २)',
      districtEn: 'Pune',
      districtMr: 'पुणे',
      coordinatorEn: 'Dr. Prashant Shete, Programme Coordinator',
      coordinatorMr: 'डॉ. प्रशांत शेटे, कार्यक्रम समन्वयक',
      phone: '02132-297018, 9766456683',
      email: 'gmnkvk@rediffmail.com',
      website: 'http://www.kvknarayangaon.com/',
      focusCropsEn: 'Exotic Vegetables, Tomato, Pomegranate, Onion Seed',
      focusCropsMr: 'विदेशी भाजीपाला, टोमॅटो, डाळिंब, कांदा बीजोत्पादन'
    },
    {
      id: 'kvk-malegaon',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Malegaon Dist. Nashik (Nashik - II)',
      nameMr: 'कृषि विज्ञान केंद्र, मालेगाव जि. नाशिक (नाशिक - २)',
      districtEn: 'Nashik',
      districtMr: 'नाशिक',
      coordinatorEn: 'Dr. Amit Patil, Programme Coordinator',
      coordinatorMr: 'डॉ. अमित पाटील, कार्यक्रम समन्वयक',
      phone: '0253-2577666, 8788133702',
      email: 'kvkmalegaon@gmail.com',
      focusCropsEn: 'Onion, Bajra, Pomegranate, Dryland Pulses',
      focusCropsMr: 'कांदा, बाजरी, डाळिंब, कोरडवाहू कडधान्ये'
    },
    {
      id: 'kvk-kanerimath',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Kanerimath, Dist. Kolhapur (Kolhapur - II)',
      nameMr: 'कृषि विज्ञान केंद्र, कणेरीमठ, जि. कोल्हापूर (कोल्हापूर - २)',
      districtEn: 'Kolhapur',
      districtMr: 'कोल्हापूर',
      coordinatorEn: 'Dr. Ravindra Singh, Programme Coordinator',
      coordinatorMr: 'डॉ. रवींद्र सिंह, कार्यक्रम समन्वयक',
      phone: '0231-2980001',
      email: 'kvkkolhapur2@gmail.com',
      focusCropsEn: 'Natural Farming, Indigenous Cow Breeding, Organic Jaggery',
      focusCropsMr: 'नैसर्गिक शेती, देशी गोवंश संवर्धन, सेंद्रिय गूळ'
    },
    {
      id: 'kvk-dahigaon',
      type: 'ngo',
      nameEn: 'Krishi Vigyan Kendra, Dahigaon ne Dist. Ahmednagar (Ahmednagar - II)',
      nameMr: 'कृषि विज्ञान केंद्र, दहिगाव ने जि. अहमदनगर (अहमदनगर - २)',
      districtEn: 'Ahmednagar',
      districtMr: 'अहमदनगर',
      coordinatorEn: 'Dr. Shamsundar Kaushik, Programme Coordinator',
      coordinatorMr: 'डॉ. श्यामसुंदर कौशिक, कार्यक्रम समन्वयक',
      phone: '02429-272030',
      email: 'kvkdahigaon@gmail.com',
      focusCropsEn: 'Pearl Millet, Chickpea, Custard Apple, Goat Farming',
      focusCropsMr: 'बाजरी, हरभरा, सीताफळ, शेळीपालन'
    }
  ];

  // Unique list of districts for filter
  const districts = ['all', 'Ahmednagar', 'Dhule', 'Jalgaon', 'Kolhapur', 'Nandurbar', 'Nashik', 'Pune', 'Sangli', 'Satara', 'Solapur'];

  const filteredKVKs = useMemo(() => {
    return allKVKs.filter((kvk) => {
      // Type filter
      if (selectedType !== 'all' && kvk.type !== selectedType) return false;
      // District filter
      if (selectedDistrict !== 'all' && kvk.districtEn.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchName = kvk.nameEn.toLowerCase().includes(term) || kvk.nameMr.toLowerCase().includes(term);
        const matchCoord = kvk.coordinatorEn.toLowerCase().includes(term) || kvk.coordinatorMr.toLowerCase().includes(term);
        const matchDistrict = kvk.districtEn.toLowerCase().includes(term) || kvk.districtMr.toLowerCase().includes(term);
        const matchCrops = kvk.focusCropsEn.toLowerCase().includes(term) || kvk.focusCropsMr.toLowerCase().includes(term);
        return matchName || matchCoord || matchDistrict || matchCrops;
      }
      return true;
    });
  }, [allKVKs, selectedType, selectedDistrict, searchTerm]);

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-slate-800">
      <ExtensionBreadcrumb currentPageTitle={{ en: 'Krishi Vigyan Kendras (KVK)', mr: 'कृषि विज्ञान केंद्रे (KVK)' }} />

      <ExtensionHero
        theme="kvk"
        badge={{ en: 'ICAR Grassroots Network', mr: 'आयसीएआर प्रक्षेत्र विस्तार जाळे' }}
        title={{
          en: 'Krishi Vigyan Kendras (KVK Network)',
          mr: 'कृषि विज्ञान केंद्रे (१७ केंद्रे)'
        }}
        subtitle={{
          en: 'Operating 17 Krishi Vigyan Kendras across Western Maharashtra for frontline technology assessment, demonstrations, and farmer capacity development.',
          mr: 'पश्चिम महाराष्ट्रातील १० जिल्ह्यांमध्ये प्रक्षेत्र चाचण्या, प्रथम फळी प्रात्यक्षिके व कौशल्य प्रशिक्षणासाठी कार्यरत १७ कृषी विज्ञान केंद्रे.'
        }}
        quickChips={[
          { label: language === 'mr' ? '४ विद्यापीठ केंद्रे' : '4 University KVKs', icon: Building2 },
          { label: language === 'mr' ? '१३ सहयोगी संस्था केंद्रे' : '13 Partner KVKs', icon: Users },
          { label: language === 'mr' ? '१० जिल्हे' : '10 Districts Covered', icon: MapPin },
          { label: language === 'mr' ? 'प्रक्षेत्र चाचण्या व FLDs' : 'OFTs & FLDs Mandate', icon: Target }
        ]}
      />

      <ExtensionSubmenuNav activeKey="krishi-vigyan-kendras" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">

        {/* 1. ICAR Vision, Mission & Core Mandate Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{language === 'mr' ? 'दृष्टिकोन (Vision)' : 'KVK Vision'}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
              {language === 'mr'
                ? 'कृषी क्षेत्रातील उत्पादकता, नफा आणि शाश्वतता वाढवण्यासाठी विज्ञान आणि तंत्रज्ञान-आधारित सर्वसमावेशक विकास साधणे.'
                : 'Science and technology-led growth leading to enhanced productivity, profitability, and sustainability of agriculture.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Target className="w-4 h-4 text-amber-600" />
              <span>{language === 'mr' ? 'ध्येय (Mission)' : 'KVK Mission'}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
              {language === 'mr'
                ? 'विशिष्ट कृषी-हवामान परिस्थितीनुसार योग्य तंत्रज्ञानाचा वापर करून शेतकरी-केंद्रित शेती आणि पूरक व्यवसायांची प्रगती करणे.'
                : 'Farmer-centric growth in agriculture and allied sectors through application of appropriate technologies in specific agro-ecosystem perspectives.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-cyan-600" />
              <span>{language === 'mr' ? 'मुख्य वैधानिक कार्ये' : 'Mandated Activities'}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
              {language === 'mr'
                ? 'प्रक्षेत्र चाचण्या (OFTs), प्रथम फळी प्रात्यक्षिके (FLDs) आणि शेतकरी व विस्तार अधिकाऱ्यांचे ज्ञान अद्ययावत करण्यासाठी क्षमता विकास.'
                : 'Technology Assessment, Frontline Demonstrations (FLDs), On-Farm Trials (OFTs), and capacity development of farmers and field officers.'}
            </p>
          </div>
        </div>

        {/* 2. Interactive Search & Multi-Filters Bar */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

            {/* Type Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === 'all'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {language === 'mr' ? 'सर्व १७ केंद्रे (All 17)' : 'All 17 KVKs'}
              </button>
              <button
                onClick={() => setSelectedType('university')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === 'university'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {language === 'mr' ? 'विद्यापीठ संचलित (४)' : 'University Run (4)'}
              </button>
              <button
                onClick={() => setSelectedType('ngo')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === 'ngo'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {language === 'mr' ? 'सहयोगी संस्था / NGO (१३)' : 'Partner / NGO (13)'}
              </button>
            </div>

            {/* Search Box & View Mode Toggle */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'mr' ? 'केंद्र, जिल्हा, समन्वयक शोधा...' : 'Search KVK, district, scientist...'}
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 font-medium"
                />
              </div>

              <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shrink-0">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'cards' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'table' ? 'bg-white text-emerald-950 shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>

          </div>

          {/* District Filter Pills */}
          <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-stone-500 uppercase shrink-0 mr-1">
              {language === 'mr' ? 'जिल्हा निवडा:' : 'Filter District:'}
            </span>
            {districts.map((dist) => (
              <button
                key={dist}
                onClick={() => setSelectedDistrict(dist)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
                  selectedDistrict === dist
                    ? 'bg-amber-100 text-amber-950 border border-amber-300'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200/60'
                }`}
              >
                {dist === 'all' ? (language === 'mr' ? 'सर्व जिल्हे' : 'All') : dist}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Filtered Results Header */}
        <div className="flex items-center justify-between text-xs font-bold text-stone-500">
          <span>
            {language === 'mr'
              ? `${filteredKVKs.length} कृषि विज्ञान केंद्रे उपलब्ध`
              : `Showing ${filteredKVKs.length} Krishi Vigyan Kendras`}
          </span>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDistrict('all');
                setSelectedType('all');
              }}
              className="text-emerald-700 hover:underline"
            >
              {language === 'mr' ? 'सर्व फिल्टर साफ करा' : 'Clear all filters'}
            </button>
          )}
        </div>

        {/* Mode A: Interactive Cards */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredKVKs.map((kvk, idx) => (
              <div
                key={kvk.id || idx}
                className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between hover:border-emerald-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border ${
                        kvk.type === 'university'
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          : 'bg-stone-100 text-stone-800 border-stone-200'
                      }`}
                    >
                      {kvk.type === 'university'
                        ? (language === 'mr' ? 'विद्यापीठ संचलित' : 'University KVK')
                        : (language === 'mr' ? 'सहयोगी संस्था (NGO)' : 'Partner / NGO KVK')}
                    </span>

                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'mr' ? kvk.districtMr : kvk.districtEn}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 leading-snug">
                      {language === 'mr' ? kvk.nameMr : kvk.nameEn}
                    </h3>
                    <p className="text-xs font-bold text-emerald-950 mt-1">
                      {language === 'mr' ? kvk.coordinatorMr : kvk.coordinatorEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-600 font-medium">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-slate-900 shrink-0">
                        {language === 'mr' ? 'प्रमुख पिके:' : 'Focus:'}
                      </span>
                      <span className="text-stone-700">
                        {language === 'mr' ? kvk.focusCropsMr : kvk.focusCropsEn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact & Direct Dial Links */}
                <div className="pt-4 mt-4 border-t border-stone-100 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {kvk.phone && (
                      <a
                        href={`tel:${kvk.phone.split(',')[0].replace(/[^0-9]/g, '')}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded-md border border-blue-200 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-blue-600" />
                        <span>{kvk.phone}</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {kvk.email ? (
                      <a
                        href={`mailto:${kvk.email.split(',')[0].trim()}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline truncate max-w-[200px]"
                        title={kvk.email}
                      >
                        <Mail className="w-3 h-3 shrink-0 text-emerald-600" />
                        <span className="truncate">{kvk.email.split(',')[0].trim()}</span>
                      </a>
                    ) : (
                      <span />
                    )}

                    {kvk.website && (
                      <a
                        href={kvk.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold rounded-lg transition-colors shadow-2xs"
                      >
                        <span>Web</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mode B: Official Directory Table */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-50 border-b border-stone-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">#</th>
                    <th className="py-3.5 px-4">{language === 'mr' ? 'कृषि विज्ञान केंद्राचे नाव' : 'Name of KVK Programme'}</th>
                    <th className="py-3.5 px-4">{language === 'mr' ? 'जिल्हा' : 'District'}</th>
                    <th className="py-3.5 px-4">{language === 'mr' ? 'कार्यक्रम समन्वयक' : 'Programme Coordinator'}</th>
                    <th className="py-3.5 px-4">{language === 'mr' ? 'संपर्क' : 'Contact'}</th>
                    <th className="py-3.5 px-4">{language === 'mr' ? 'ईमेल / संकेतस्थळ' : 'E-mail / Web'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                  {filteredKVKs.map((kvk, idx) => (
                    <tr key={kvk.id || idx} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-stone-400">{idx + 1}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 font-serif">
                          {language === 'mr' ? kvk.nameMr : kvk.nameEn}
                        </div>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-sm inline-block mt-1 ${
                            kvk.type === 'university' ? 'bg-emerald-100 text-emerald-950' : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          {kvk.type === 'university' ? 'MPKV KVK' : 'Partner KVK'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-900">
                        {language === 'mr' ? kvk.districtMr : kvk.districtEn}
                      </td>
                      <td className="py-3.5 px-4">
                        {language === 'mr' ? kvk.coordinatorMr : kvk.coordinatorEn}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold">
                        <a href={`tel:${kvk.phone.replace(/[^0-9]/g, '')}`} className="text-blue-700 hover:underline">
                          {kvk.phone}
                        </a>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <a href={`mailto:${kvk.email.split(',')[0]}`} className="text-emerald-700 hover:underline font-mono text-xs block">
                            {kvk.email.split(',')[0]}
                          </a>
                          {kvk.website && (
                            <a
                              href={kvk.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-stone-500 hover:text-stone-800 font-semibold inline-flex items-center gap-1"
                            >
                              <span>Website</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
