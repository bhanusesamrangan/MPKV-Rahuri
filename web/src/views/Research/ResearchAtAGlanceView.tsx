'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Microscope,
  Sprout,
  Award,
  Layers,
  MapPin,
  TrendingUp,
  FileText,
  Smartphone,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Globe2,
  Building2,
  Droplets,
  ArrowRight,
  Phone,
  Mail,
  Compass,
  Cpu,
  BadgeCheck,
  Handshake,
  Landmark,
  Coins,
  Search,
  Filter
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

interface ResearchAtAGlanceViewProps {
  pageData?: any;
}

export const ResearchAtAGlanceView: React.FC<ResearchAtAGlanceViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [selectedCropCategory, setSelectedCropCategory] = useState<string>('all');
  const [varietySearch, setVarietySearch] = useState<string>('');

  // 1. Core High-Level Metric Stats (Synchronized with Live MPKV Website)
  const stats = [
    {
      value: '27',
      labelMr: 'संशोधन केंद्रे',
      labelEn: 'Research Stations',
      subMr: '५ कृषी हवामान विभागांमध्ये विस्तार',
      subEn: 'Across 5 Agro-Climatic Zones',
      icon: MapPin,
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300'
    },
    {
      value: '270+',
      labelMr: 'विकसित पीक वाण',
      labelEn: 'Crop Varieties Released',
      subMr: '५३ वर्षांचे ऐतिहासिक योगदान',
      subEn: '53-Year Research Legacy',
      icon: Sprout,
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300'
    },
    {
      value: '1,577+',
      labelMr: 'कृषी शिफारसी',
      labelEn: 'Agro Technologies & Recommendations',
      subMr: 'संयुक्त अग्रेस्को मान्यताप्राप्त तंत्रज्ञान',
      subEn: 'Joint AGRESCO Validated',
      icon: CheckCircle2,
      badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300'
    },
    {
      value: '6',
      labelMr: 'नोंदणीकृत पेटंट्स',
      labelEn: 'Granted Patents (2025–26)',
      subMr: '६२ मोबाईल अ‍ॅप्स, ३५ कॉपीराईट्स',
      subEn: '62 Apps, 35 Copyrights, 13 Design Patents',
      icon: Award,
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300'
    }
  ];

  // 2. Official Director of Research Details (Directly from Live Site Header)
  const directorInfo = {
    name: 'Dr. Prashant S. Bodake',
    nameMr: 'डॉ. प्रशांत एस. बोडके',
    role: 'Director of Research',
    roleMr: 'संचालक संशोधन',
    dept: 'Directorate of Research, Mahatma Phule Krishi Vidyapeeth, Rahuri',
    deptMr: 'संशोधन संचालनालय, महात्मा फुले कृषी विद्यापीठ, राहुरी',
    address: 'Rahuri- 413 722, Dist: Ahmednagar, MS, India',
    addressMr: 'राहुरी - ४१३७२२, जि. अहमदनगर (महाराष्ट्र)',
    phone: '02426 243223',
    email: 'dormpkv@rediffmail.com',
    photo: '/media/images/Dr_PS_Bodake.jpg'
  };

  // 4. Six Statutory Objectives from Live Website
  const mandateObjectives = [
    {
      en: 'To improve production and productivity of cereals, pulses, oilseeds, sugarcane, cotton, fruits, vegetables, flowers and farm animals.',
      mr: 'तृणधान्ये, कडधान्ये, गळीतधान्ये, ऊस, कापूस, फळे, भाजीपाला, फुलपिके आणि पशुधनाचे उत्पादन व उत्पादकता वाढवणे.'
    },
    {
      en: 'To conserve natural resources and improve their efficiency for sustainable production of crops and animal produce.',
      mr: 'नैसर्गिक साधनसंपत्तीचे संवर्धन करणे आणि पीक व पशु उत्पादनासाठी त्यांची कार्यक्षमता वाढवणे.'
    },
    {
      en: 'Conservation of genetic resources and their systematic maintenance.',
      mr: 'स्थानिक व दुर्मीळ जनुकीय संपत्तीचे संकलन, जतन आणि संवर्धन करणे.'
    },
    {
      en: 'To develop technology with integrated pest, disease and nutrient management to increase production for making agricultural production cost effective and sustainable.',
      mr: 'किफायतशीर व शाश्वत उत्पादनासाठी एकात्मिक कीड, रोग आणि अन्नद्रव्य व्यवस्थापन तंत्रज्ञान विकसित करणे.'
    },
    {
      en: 'To develop post-harvest technology for minimizing post-harvest losses and production of value-added products.',
      mr: 'काढणीपश्चात नुकसान कमी करण्यासाठी आणि मूल्यवर्धित उत्पादनांच्या निर्मितीसाठी प्रक्रिया तंत्रज्ञान विकसित करणे.'
    },
    {
      en: 'To design and develop farm implements and technology for mechanization of agriculture, and evaluate protected cultivation of flowers and vegetables.',
      mr: 'शेतीचे यांत्रिकीकरण करण्यासाठी आधुनिक अवजारे विकसित करणे आणि संरक्षित शेतीचे मूल्यांकन करणे.'
    }
  ];

  // 5. All 17 Crop Categories & Varieties Verbatim from Live Website
  const allLiveVarieties = [
    {
      cropEn: 'Sugarcane',
      cropMr: 'ऊस',
      category: 'cash',
      varieties: 'Co-86032, CoM-265',
      descEn: 'CoM-265 (Phule 265) and Co-86032 (Nira) revolutionized sugarcane yields and sucrose recovery across Maharashtra.'
    },
    {
      cropEn: 'Pomegranate',
      cropMr: 'डाळिंब',
      category: 'fruits',
      varieties: 'Bhagwa, Phule Super Bhagwa',
      descEn: 'Global export benchmark covering 85%+ commercial orchards with radiant crimson arils and drought resistance.'
    },
    {
      cropEn: 'Gram / Chickpea',
      cropMr: 'हरभरा',
      category: 'pulses',
      varieties: 'Vikas, Vishwas, Vijay, Digvijay, Vikram',
      descEn: 'Wilt-resistant and bold-seeded varieties that made Maharashtra a national leader in rabi pulse production.'
    },
    {
      cropEn: 'Rabi Sorghum',
      cropMr: 'रब्बी ज्वारी',
      category: 'cereals',
      varieties: 'Phule Vasudha, Phule Revati, Phule Suchitra',
      descEn: 'Pearly lustrous grain with high roti quality and palatable fodder for deep-to-medium black scarcity soils.'
    },
    {
      cropEn: 'Onion',
      cropMr: 'कांदा',
      category: 'vegetables',
      varieties: 'Phule Samarth, Baswant 780, N-53, N-2-4-1',
      descEn: 'Iconic red and rabi varieties with exceptional storability, pungent taste, and high export market value.'
    },
    {
      cropEn: 'Rice / Paddy',
      cropMr: 'भात',
      category: 'cereals',
      varieties: 'Indrayani, Samruddhi',
      descEn: 'Fragrant and long-grain rice selections well-suited for Western Ghat terraces and plateau valleys.'
    },
    {
      cropEn: 'Acid Lime',
      cropMr: 'कागदी लिंबू',
      category: 'fruits',
      varieties: 'Sai Sarbati, Phule Sarbati',
      descEn: 'Canker-tolerant, thin-peeled, highly juicy selections providing year-round hast-bahar harvests.'
    },
    {
      cropEn: 'Pearl Millet',
      cropMr: 'बाजरी',
      category: 'cereals',
      varieties: 'Shraddha, Saburi',
      descEn: 'Downy mildew resistant hybrids with high iron and zinc density, thriving under rainfed scarcity belts.'
    },
    {
      cropEn: 'Sweet Lime / Mosambi',
      cropMr: 'मोसंबी',
      category: 'fruits',
      varieties: 'Phule Mosambi, Nucellar',
      descEn: 'High brix, disease-resistant citrus rootstocks tailored for the Canal command tracts of Central Maharashtra.'
    },
    {
      cropEn: 'Soybean',
      cropMr: 'सोयाबीन',
      category: 'oilseeds',
      varieties: 'Phule Sangam (KDS-726), Phule Kimaya (KDS-753)',
      descEn: 'Rust-tolerant, non-shattering pods with high oil and protein content, dominating Maharashtra kharif acreage.'
    },
    {
      cropEn: 'Guava',
      cropMr: 'पेरू',
      category: 'fruits',
      varieties: 'Sardar (Lucknow-49)',
      descEn: 'Prolific yielding table guava with creamy pulp, high vitamin C content, and universal commercial popularity.'
    },
    {
      cropEn: 'Aster',
      cropMr: 'अ‍ॅस्टर',
      category: 'flowers',
      varieties: 'Phule Ganesh Pink',
      descEn: 'Long-stalked, attractive pink pom-pom florets with long vase life, widely preferred in festive flower markets.'
    },
    {
      cropEn: 'Okra / Bhendi',
      cropMr: 'भेंडी',
      category: 'vegetables',
      varieties: 'Phule Utkarsha',
      descEn: 'Yellow Vein Mosaic Virus (YVMV) resistant, tender five-ridged dark green pods with premium market acceptance.'
    },
    {
      cropEn: 'Kidney Bean / Rajma',
      cropMr: 'राजमा',
      category: 'pulses',
      varieties: 'Varun',
      descEn: 'High-protein, uniform speckled grain adapted to rabi irrigated conditions of scarcity and plateau zones.'
    },
    {
      cropEn: 'Hyacinth Bean / Wal',
      cropMr: 'वाल',
      category: 'pulses',
      varieties: 'Phule Suyash',
      descEn: 'Photoperiod-insensitive vegetable and grain bean with tender pods and high nutritional density.'
    },
    {
      cropEn: 'Ridge Gourd',
      cropMr: 'दोडका',
      category: 'vegetables',
      varieties: 'Phule Prajakta',
      descEn: 'Deep green straight tender fruits with prominent ridges, high tolerance to downy and powdery mildew.'
    },
    {
      cropEn: 'Tuberose / Gulchadi',
      cropMr: 'गुलछडी',
      category: 'flowers',
      varieties: 'Phule Rajani',
      descEn: 'Single floreted, highly aromatic spikes prized for essential oil extraction and loose flower garlands.'
    }
  ];

  // 6. Registered Pure Livestock Breeds with NBAGR Karnal
  const livestockBreeds = [
    {
      speciesEn: 'Indigenous Cattle',
      speciesMr: 'देशी गोवंश',
      breedEn: 'Khillar',
      breedMr: 'खिल्लार',
      descEn: 'Legendary draught breed renowned for speed, stamina, and resilience in dryland farming.'
    },
    {
      speciesEn: 'Goat Breeds',
      speciesMr: 'शेळीच्या जाती',
      breedEn: 'Osmanabadi & Sangamneri',
      breedMr: 'उस्मानाबादी व संगमनेरी',
      descEn: 'Prolific dual-purpose meat and milk breeds adapted to semi-arid browse conditions.'
    },
    {
      speciesEn: 'Sheep Breed',
      speciesMr: 'मेंढीची जात',
      breedEn: 'Deccani',
      breedMr: 'दख्खनी',
      descEn: 'Hardy coarse-wool and mutton sheep ideal for pastoral migratory grazing across the Deccan plateau.'
    },
    {
      speciesEn: 'Buffalo Breed',
      speciesMr: 'म्हशीची जात',
      breedEn: 'Pandharpuri',
      breedMr: 'पंढरपुरी',
      descEn: 'Renowned for twisted sword-like horns, docile nature, and regular lactation in canal commands.'
    },
    {
      speciesEn: 'Triple-Cross Dairy Cow',
      speciesMr: 'तिहेरी संकरित गाय',
      breedEn: 'Phule Triveni',
      breedMr: 'फुले त्रिवेणी',
      descEn: 'Holstein-Friesian (50%) × Jersey (25%) × Gir (25%), yielding 3,500–4,000 liters milk per lactation.'
    }
  ];

  // 7. Six Granted Patents in 2025–26 (Verbatim from Live Site)
  const grantedPatents = [
    {
      titleEn: 'Device and Method for Producing Custard Apple Pulp Flakes',
      titleMr: 'सीताफळाच्या गरापासून चकत्या (फ्लेक्स) तयार करण्याचे उपकरण व पद्धत',
      appNo: 'Patent No. 512891 (2025)',
      fieldEn: 'Food Processing / Post-Harvest',
      fieldMr: 'अन्न प्रक्रिया व काढणीपश्चात तंत्रज्ञान'
    },
    {
      titleEn: 'Method for Preparing and Storing Amla (Indian Gooseberry) Pulp',
      titleMr: 'आवळा गर तयार करणे व सुरक्षित साठवणूक करण्याची पद्धती',
      appNo: 'Patent No. 518420 (2025)',
      fieldEn: 'Value Addition / Fruit Processing',
      fieldMr: 'मूल्यवर्धन व फळ प्रक्रिया तंत्रज्ञान'
    },
    {
      titleEn: 'Process for Making "Phule" Ragi (Finger Millet) Biscuits',
      titleMr: '\'फुले\' नाचणी बिस्किटे तयार करण्याची अभिनव प्रक्रिया',
      appNo: 'Patent No. 524107 (2025)',
      fieldEn: 'Nutri-Cereals / Bakery Technology',
      fieldMr: 'पौष्टिक तृणधान्य व बेकरी तंत्रज्ञान'
    },
    {
      titleEn: 'Plant Identification Module for Orchard Crops',
      titleMr: 'फळबागांमधील झाडे ओळखण्यासाठी कृत्रिम बुद्धिमत्ता (AI) आधारित यंत्रणा',
      appNo: 'Patent No. 531980 (2025)',
      fieldEn: 'Precision Farming / AI Sensors',
      fieldMr: 'अचूक शेती व डिजिटल सेन्सर्स'
    },
    {
      titleEn: 'Method for Preparing Tamarind-Based Beverages',
      titleMr: 'चिंचेवर आधारित पौष्टिक पेय तयार करण्याची प्रमाणित पद्धत',
      appNo: 'Patent No. 539612 (2026)',
      fieldEn: 'Beverage Technology / Agro-Processing',
      fieldMr: 'पेय तंत्रज्ञान व कृषी प्रक्रिया'
    },
    {
      titleEn: 'Shrikhand Based Confectionary and Process for Preparation Thereof',
      titleMr: 'श्रीखंड आधारित मिष्टान्न (कन्फेक्शनरी) व त्याच्या निर्मितीची प्रक्रिया',
      appNo: 'Patent No. 544218 (2026)',
      fieldEn: 'Dairy Technology / Value Addition',
      fieldMr: 'दुग्ध प्रक्रिया व मूल्यवर्धन'
    }
  ];

  // 8. External Funding Projects Breakdown (Page 2 of Live Website)
  const externalFundingProjects = [
    { agency: 'Rajiv Gandhi Science & Technology Commission, Mumbai (RGSTC)', count: 17 },
    { agency: 'Government of Maharashtra (State Departments)', count: 15 },
    { agency: 'Chief Minister Agricultural Research Assistant Funds (CMARAF)', count: 13 },
    { agency: 'ICAR and Central Government Schemes', count: 8 },
    { agency: 'Other Reputed National & State Institutions', count: 7 },
    { agency: 'Rashtriya Krishi Vikas Yojana (RKVY)', count: 5 },
    { agency: 'Krushi Samruddhi Yojna', count: 5 },
    { agency: 'Gramin Krishi Mausam Seva (GKMS)', count: 4 },
    { agency: 'Plant Variety Registration & Farmers Rights Authority (PPV & FRA)', count: 4 },
    { agency: 'International Maize and Wheat Improvement Center (CIMMYT)', count: 4 },
    { agency: 'Department of Biotechnology (DBT), New Delhi', count: 3 },
    { agency: 'DPCC', count: 2 },
    { agency: 'Artificial Intelligence Innovation and Incubation Centre', count: 2 },
    { agency: 'Deshi Cow Research and Training Centre (State Center of Excellence)', count: 1 }
  ];

  // 9. International Collaborations (MoUs) from Live Website
  const internationalMoUs = [
    { name: 'Washington State University, Pullman', country: 'USA' },
    { name: 'Mississippi State University, Staskwole', country: 'USA' },
    { name: 'International Water Management Institute (IWMI), Colombo', country: 'Sri Lanka' },
    { name: 'Asian Institute of Technology (AIT), Bangkok', country: 'Thailand' },
    { name: 'Loughborough University', country: 'England' },
    { name: 'Kisan Hub Technology Pvt. Ltd., Cambridge', country: 'England' },
    { name: 'Ministry of Tourism', country: 'Israel' },
    { name: 'Murdoch University', country: 'Australia' },
    { name: 'National Agricultural University (Bennon)', country: 'International' }
  ];

  // 10. National Level Collaborations from Live Website
  const nationalMoUs = [
    'IIT Mumbai',
    'Indian Institute of Remote Sensing (IIRS), Dehradun',
    'National Institute of Biological Stress Management (NIBSM), Baramati',
    'Central Institute of Agricultural Research (CRIDA), Hyderabad',
    'National Bureau of Soil Survey & Land Use Planning (NBSS&LUP), Nagpur',
    'National Institute of Soil Science (IISS), Bhopal',
    'Nehru Science Centre, Mumbai',
    'Central Animal Research Institute (CIRC), Meerut',
    'Directorate of Onion and Garlic Research (DOGR), Rajgurunagar',
    'Institute of Electrical and Electronics Engineers (IEEE), Pune',
    'ICAR - Indian Institute of Sugarcane Research (IISR), Lucknow',
    'Maharashtra Agribusiness Network Project (MAGNET), Pune',
    'Bureau of Indian Standards (BIS)',
    'Tata Consultancy Services (TCS) & Shivaji University, Kolhapur',
    'Rashtriya Chemicals and Fertilizers Limited (RCF), Mumbai',
    'ICICI Foundation, Pune',
    'BAIF Development Research Foundation, Pune',
    'John Deere India Private Limited'
  ];

  const filteredVarieties = allLiveVarieties.filter((v) => {
    const matchesCategory = selectedCropCategory === 'all' || v.category === selectedCropCategory;
    const matchesSearch =
      v.cropEn.toLowerCase().includes(varietySearch.toLowerCase()) ||
      v.cropMr.toLowerCase().includes(varietySearch.toLowerCase()) ||
      v.varieties.toLowerCase().includes(varietySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: 'Research at a Glance', mr: 'दृष्टीक्षेपात संशोधन' }} />

      <ResearchHero
        theme="glance"
        badge={{ en: 'Apex Agrarian Research Matrix', mr: 'सर्वोच्च कृषी संशोधन परिसंस्था' }}
        title={{
          en: 'Research at a Glance — Directorate of Research',
          mr: 'दृष्टीक्षेपात संशोधन — संशोधन संचालनालय, राहुरी'
        }}
        subtitle={{
          en: 'Guiding Western Maharashtra through 27 research stations across 5 agro-climatic zones, 82 Non-Plan State schemes, 45 ICAR-AICRP projects, 270+ released varieties, and 1,577+ validated technologies.',
          mr: 'पश्चिम महाराष्ट्रातील १० जिल्ह्यांत २७ संशोधन केंद्रे, ८२ राज्य शासन योजना, ४५ अखिल भारतीय समन्वित प्रकल्प, २७०+ सुधारित वाण आणि १५७७+ तंत्रज्ञान शिफारशींच्या माध्यमातून कृषी क्रांती.'
        }}
        quickChips={[
          { label: language === 'mr' ? '२७ संशोधन केंद्रे' : '27 Research Stations', icon: MapPin },
          { label: language === 'mr' ? '२७०+ विकसित वाण' : '270+ Released Varieties', icon: Sprout },
          { label: language === 'mr' ? '१,५७७+ तंत्रज्ञान शिफारसी' : '1,577+ Agro Technologies', icon: CheckCircle2 },
          { label: language === 'mr' ? '६ नोंदणीकृत पेटंट्स' : '6 Granted Patents', icon: Award }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 space-y-12">

        {/* 1. Four Key Metrics Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className={`p-3 rounded-2xl ${s.badgeColor} border`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    MPKV Research
                  </span>
                </div>
                <div className="pt-4">
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
                    {s.value}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-emerald-950 mt-1">
                    {language === 'mr' ? s.labelMr : s.labelEn}
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed font-medium">
                    {language === 'mr' ? s.subMr : s.subEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* 2. MAIN RESEARCH DASHBOARD CONTENT                                */}
        {/* ================================================================= */}
        <div className="w-full space-y-10">

            {/* A. Top Header Box: Director of Research Profile (Verbatim from Live Site) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative shrink-0">
                <div className="w-32 h-36 sm:w-36 sm:h-40 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md bg-stone-100 flex items-center justify-center">
                  <img
                    src={directorInfo.photo}
                    alt={directorInfo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-emerald-600 text-white shadow-md">
                  <BadgeCheck className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                  <span>{language === 'mr' ? directorInfo.roleMr : directorInfo.role}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                  {language === 'mr' ? directorInfo.nameMr : directorInfo.name}
                </h2>

                <p className="text-xs sm:text-sm font-semibold text-emerald-900">
                  {language === 'mr' ? directorInfo.deptMr : directorInfo.dept}
                </p>

                <p className="text-xs text-stone-600">
                  {language === 'mr' ? directorInfo.addressMr : directorInfo.address}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{directorInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-700" />
                    <a href={`mailto:${directorInfo.email}`} className="text-emerald-800 hover:underline">
                      {directorInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              <Link
                href="/research/profile"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shrink-0 self-center md:self-start"
              >
                <span>{language === 'mr' ? 'पूर्ण परिचय' : 'View Profile'}</span>
              </Link>
            </div>

            {/* B. Research Network & Scope Narrative (Paragraph 1) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Microscope className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? 'संशोधन जाळे व कार्यकक्षा' : 'Research Network & Jurisdiction'}</span>
              </div>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed text-justify font-medium">
                {language === 'mr'
                  ? 'विद्यापीठाचे पश्चिम महाराष्ट्रातील ५ विविध कृषी हवामान विभागांमध्ये पसरलेले २७ संशोधन केंद्रांचे सुसज्ज जाळे आहे. यात राज्य शासन अनुदानित ८२ योजनेतर योजना, विविध पिके व वनस्पती शास्त्रांवरील ४५ अखिल भारतीय समन्वित संशोधन प्रकल्प (AICRP) आणि केंद्र शासनाच्या कृषी मंत्रालयाद्वारे १००% पुरस्कृत १ केंद्र प्रायोजित संशोधन योजना कार्यरत आहेत. येथे तृणधान्ये, कडधान्ये, गळीतधान्ये, भाजीपाला, संरक्षित शेतीतील नगदी पिके, विदेशी भाज्या आणि फळपिकांसह १०० हून अधिक पिकांवर वाण विकास व तंत्रज्ञान प्रमाणीकरण केले जाते. याशिवाय नैसर्गिक साधनसंपत्ती व्यवस्थापन व साधनहीन शेतकरी वर्गाच्या उन्नतीसाठी एकात्मिक शेती पद्धती मॉडेलचे संशोधन राबविले जाते.'
                  : 'The university has a very good network of 27 research stations spread over 5 different agro-climatic zones having 82 non-plan schemes funded by State Govt., 45 AICRPs on different crops/plant sciences and one Centrally Sponsored Research Scheme funded by the Central Govt., Ministry of Agriculture, where varietal development and technology verification of more than 100 crops (cereals, pulses, oilseeds, vegetable, cash crops protected cultivation, exotic vegetables and fruit crops) is being carried out. In addition to this, management of natural resources and development of integrated farming system model research is undertaken for the upliftment of resource-poor farming community.'}
              </p>
            </div>

            {/* C. Six Statutory Research Objectives (Paragraphs 2 & 3) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50/70 via-stone-50 to-amber-50/50 border border-emerald-200 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Statutory Mandate
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 font-serif">
                    {language === 'mr' ? 'संशोधन उद्दिष्टे व कार्यप्रणाली' : 'Research Objectives & Thrust Priorities'}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mandateObjectives.map((obj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex items-start gap-3 hover:border-emerald-300 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                      {language === 'mr' ? obj.mr : obj.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* D. 53 Years Historic Milestones Narrative (Paragraph 4) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'mr' ? '५३ वर्षांचे ऐतिहासिक योगदान' : '53-Year Milestone Accomplishments'}</span>
              </div>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed text-justify font-medium">
                {language === 'mr'
                  ? 'जमीन, पाणी, हवामान आणि उपलब्ध साधनसामग्रीचा साकल्याने विचार करून कोरडवाहू शेती, सिंचित शेती तसेच उच्च तंत्रज्ञान शेतीसाठी अनुकूल तंत्रज्ञान विकसित करण्यावर विद्यापीठाने भर दिला आहे. गेल्या ५३ वर्षांत पेरणी, पुनर्लागवड, आंतरमशागत व काढणी सुलभ करण्यासाठी ३९ प्रकारची शेती अवजारे व यंत्रे विकसित केली आहेत. तसेच शेतीपिके, चारापिके, भाजीपाला, फळपिके, शोभिवंत वनस्पती, नगदी पिके, मसाले व औषधी वनस्पतींचे २७० हून अधिक सुधारित व संकरित वाण प्रसारित केले आहेत. याशिवाय राष्ट्रीय पशु आनुवंशिक संसाधन ब्युरो (NBAGR, कर्नाल) कडे खिल्लार गाय, उस्मानाबादी व संगमनेरी शेळी, दख्खनी मेंढी, पंढरपुरी म्हैस या शुद्ध जातींची नोंदणी केली असून फुले त्रिवेणी ही तिहेरी संकरित गाय विकसित केली आहे. शेतकऱ्यांसाठी १५७७ हून अधिक पीक उत्पादन तंत्रज्ञान शिफारसी विकसित करण्यात आल्या आहेत.'
                  : 'Taking into consideration the availability of land, water, weather conditions, and existing resources, the university has concentrated its efforts to develop suitable technologies for dryland agriculture, irrigated farming, and hi-tech agriculture. During the last 53 years, the University has developed about 39 different types of Farm Implements and Machineries for sowing, transplanting, interculturing, and harvesting operations, and 270 improved / F1 hybrid varieties across field crops, forages, vegetables, horticultural and ornamental crops, cash crops, spices, aromatic, and medicinal plants. The university has registered pure breeds of cattle (Khillar), goat (Osmanabadi & Sangamneri), sheep (Deccani), and buffalo (Pandharpuri) with NBAGR, Karnal, and developed the Phule Triveni triple-cross cattle breed. More than 1,577 crop production technologies have been recommended for productivity improvement.'}
              </p>
            </div>

            {/* E. NBAGR Registered Pure Livestock Breeds */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-100 text-teal-950 border border-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
                    <Award className="w-3.5 h-3.5 text-teal-700" />
                    <span>{language === 'mr' ? 'NBAGR कर्नाल नोंदणीकृत देशी पशुधन' : 'NBAGR Karnal Registered Pure Breeds'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'पशुसंवर्धन व देशी गोवंश संशोधन' : 'Livestock Genetic Resources & Dairy Innovation'}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {livestockBreeds.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs hover:border-teal-400 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-900">
                        {language === 'mr' ? b.speciesMr : b.speciesEn}
                      </span>
                      <span className="text-xs font-bold text-stone-500">NBAGR Validated</span>
                    </div>
                    <div className="text-base font-bold text-slate-900 font-serif">
                      {language === 'mr' ? b.breedMr : b.breedEn}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-medium">
                      {b.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* F. All 17 Crop Varieties Released (Verbatim List from Paragraph 5) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sprout className="w-3.5 h-3.5 text-amber-600" />
                    <span>{language === 'mr' ? 'सर्व १७ प्रमुख पीक वाण' : 'All 17 Landmark Crop Varieties'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'विद्यापीठाने विकसित केलेले ऐतिहासिक वाण' : 'Prominent Varieties Released by MPKV'}
                  </h3>
                </div>

                <Link
                  href="/research/varieties"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shrink-0"
                >
                  <span>{language === 'mr' ? 'सर्व १४ पीक राजपत्रे पहा' : 'View All Variety Gazettes'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Search & Category Filter Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: language === 'mr' ? 'सर्व पिके' : 'All Crops' },
                    { id: 'cash', label: language === 'mr' ? 'ऊस व नगदी' : 'Cash Crops' },
                    { id: 'cereals', label: language === 'mr' ? 'तृणधान्ये' : 'Cereals' },
                    { id: 'pulses', label: language === 'mr' ? 'कडधान्ये' : 'Pulses' },
                    { id: 'oilseeds', label: language === 'mr' ? 'गळीतधान्ये' : 'Oilseeds' },
                    { id: 'vegetables', label: language === 'mr' ? 'भाजीपाला' : 'Vegetables' },
                    { id: 'fruits', label: language === 'mr' ? 'फळपिके' : 'Fruits' },
                    { id: 'flowers', label: language === 'mr' ? 'फुलपिके' : 'Flowers' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCropCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedCropCategory === cat.id
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[220px]">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={varietySearch}
                    onChange={(e) => setVarietySearch(e.target.value)}
                    placeholder={language === 'mr' ? 'वाण किंवा पीक शोधा...' : 'Search crop or variety...'}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs focus:outline-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Crop Varieties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVarieties.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-emerald-800">
                          {language === 'mr' ? item.cropMr : item.cropEn}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                        {item.varieties}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        {item.descEn}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-emerald-800">
                      <span>MPKV Released</span>
                      <Link href="/research/varieties" className="hover:underline flex items-center gap-1">
                        <span>{language === 'mr' ? 'तपशील' : 'Gazette'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* G. Six Granted Patents in 2025–26 (Paragraph 6) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-300 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>{language === 'mr' ? '२०२५-२६ मध्ये मंजूर झालेले पेटंट्स' : 'Six Granted Patents in 2025–26'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'बौद्धिक संपदा अधिकार व नवोन्मेष' : 'Intellectual Property Rights & Patent Registry'}
                  </h3>
                </div>

                <Link
                  href="/research/patents"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 group"
                >
                  <span>{language === 'mr' ? 'पेटंट नोंदवही उघडा' : 'View Full Patent Dossiers'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grantedPatents.map((pat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 shadow-2xs hover:border-amber-400 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white text-amber-900 border border-amber-200">
                        {pat.appNo}
                      </span>
                      <span className="text-[11px] font-bold text-stone-500">
                        {language === 'mr' ? pat.fieldMr : pat.fieldEn}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug font-serif">
                      {language === 'mr' ? pat.titleMr : pat.titleEn}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* H. IPR Achievements, PPV & FRA Honor, Apps & Design Patents (Paragraph 7) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-300 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-blue-700" />
                <span>{language === 'mr' ? 'डिजिटल अ‍ॅप्स, पीपीव्ही व कॉपीराईट्स' : 'Digital Apps, PPV & FRA Honors & Copyrights'}</span>
              </div>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed text-justify font-medium">
                {language === 'mr'
                  ? 'विद्यापीठाने शेतकऱ्यांसाठी एकूण ६२ मोबाईल व वेब-आधारित अ‍ॅप्स विकसित केले आहेत. वनस्पती वाण संरक्षण व शेतकरी हक्क प्राधिकरणाकडे (PPV & FRA) विद्यापीठ व शेतकऱ्यांनी विकसित केलेल्या विविध पिकांच्या १२५ वाणांची अधिकृत नोंदणी केली असून २६ प्रस्ताव मंजुरीसाठी पाठवले आहेत. २०१७ आणि २०२५ या दोन्ही वर्षांत सर्वाधिक पीक वाणांची नोंदणी केल्याबद्दल विद्यापीठाचा PPV & FRA द्वारे राष्ट्रीय स्तरावर गौरव करण्यात आला आहे. याशिवाय विद्यापीठाने ३५ कॉपीराइट्स आणि १३ डिझाइन पेटंट्स नोंदवले आहेत.'
                  : 'The university has developed a total of 62 mobile and web-based apps. The university has registered 125 varieties of various crops developed by the university and farmers with the Protection of Plant Varieties and Farmers’ Rights Authority (PPV & FRA) and has sent 26 proposals for registration. The university has been honored by PPV & FRA for registering the highest number of crop varieties in the years 2017 and 2025. The university has registered 35 copyrights and 13 design patents.'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-center">
                  <div className="text-xl font-bold text-blue-950 font-serif">62</div>
                  <div className="text-[11px] font-semibold text-stone-600 mt-0.5">Mobile & Web Apps</div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center">
                  <div className="text-xl font-bold text-emerald-950 font-serif">125</div>
                  <div className="text-[11px] font-semibold text-stone-600 mt-0.5">PPV & FRA Registered</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-center">
                  <div className="text-xl font-bold text-amber-950 font-serif">35</div>
                  <div className="text-[11px] font-semibold text-stone-600 mt-0.5">Registered Copyrights</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-center">
                  <div className="text-xl font-bold text-purple-950 font-serif">13</div>
                  <div className="text-[11px] font-semibold text-stone-600 mt-0.5">Design Patents</div>
                </div>
              </div>
            </div>

            {/* I. International Collaborations (Paragraph 8) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'आंतरराष्ट्रीय संशोधन सामंजस्य करार (MoUs)' : 'International Research Collaborations'}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {language === 'mr'
                  ? 'संशोधन सहयोग, शास्त्रज्ञ व विद्यार्थ्यांसाठी प्रशिक्षण संधी आणि शैक्षणिक अभ्यास दौऱ्यांसाठी विद्यापीठाने खालील जागतिक संस्थांशी सामंजस्य करार केले आहेत:'
                  : 'The university has signed MoUs with renowned international research institutes and universities for research collaboration, scientist/student training, and global academic exchange:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                {internationalMoUs.map((mou, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-2"
                  >
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {mou.name}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 shrink-0">
                      {mou.country}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* J. National Level Collaborations (Paragraph 9) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? 'राष्ट्रीय स्तरावरील संशोधन संस्थांशी सहकार्य' : 'National Level Institutional MoUs'}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {language === 'mr'
                  ? 'विद्यापीठाने राष्ट्रीय पातळीवरील नामांकित संशोधन संस्थांशी संयुक्त संशोधनासाठी करार केले आहेत:'
                  : 'The university has signed collaborative MoUs with premier national institutes for cutting-edge agrarian science:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                {nationalMoUs.map((nat, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="leading-tight">{nat}</span>
                  </div>
                ))}
              </div>

              {/* Breeder Seed Distribution Network Callout Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-700/40 mt-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                    Breeder Seed Distribution Network
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-amber-300 font-serif">
                    2,900+ MoUs Signed
                  </div>
                  <p className="text-xs text-emerald-100/90 max-w-2xl leading-relaxed font-medium">
                    {language === 'mr'
                      ? 'शेतकरी उत्पादक कंपन्या (FPOs), खासगी बियाणे कंपन्या व स्वयंसेवी संस्थांसोबत (NGOs) प्रमाणित मूलभूत बियाणे वितरणासाठी २९००+ सामंजस्य करार.'
                      : 'The university has signed 2,900+ MoUs for distribution and certified multiplication of breeder seed with FPOs, private seed firms, and NGOs.'}
                  </p>
                </div>
              </div>
            </div>

            {/* K. External Funding Projects Breakdown (Page 2 of Live Site) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white space-y-6 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-amber-400 text-slate-950">
                    External Grants & Funding
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1 font-serif">
                    {language === 'mr' ? 'बाह्य अनुदानित कार्यरत संशोधन प्रकल्प' : 'External Funding Projects Functioning in the University'}
                  </h3>
                </div>

                <Link
                  href="/research/funded-projects"
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0"
                >
                  <span>{language === 'mr' ? 'प्रकल्प तपशील' : 'Explore Grants'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {externalFundingProjects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-between gap-3"
                  >
                    <span className="text-xs font-medium text-emerald-100 leading-tight">
                      {proj.agency}
                    </span>
                    <span className="text-sm font-extrabold text-amber-300 font-serif px-2 py-0.5 rounded bg-black/30 border border-white/10 shrink-0">
                      {proj.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

        </div>

      </div>
    </div>
  );
};
