'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Target,
  Sparkles,
  Droplets,
  Sprout,
  Cpu,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight,
  TrendingUp,
  Atom,
  CheckCircle2,
  Filter,
  Calendar,
  Compass,
  Check
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

interface ResearchThrustAreasViewProps {
  pageData?: any;
}

export const ResearchThrustAreasView: React.FC<ResearchThrustAreasViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'crop' | 'resource' | 'digital' | 'livestock'>('all');

  // Official 12 Research Priorities for the Next Ten Years (Verbatim from Live Site Graphic)
  const tenYearPriorities = [
    {
      num: 1,
      en: 'Development of climate-resilient varieties and technologies',
      mr: 'हवामान-अनुकूल पीक वाण व तंत्रज्ञानाचा विकास',
      bulletColor: 'bg-[#196b43]',
      rowBg: 'bg-[#edf7f1]',
      borderColor: 'border-[#c6ebd4]',
      textColor: 'text-[#14532d]',
      category: 'crop'
    },
    {
      num: 2,
      en: 'Speed breeding technology',
      mr: 'गतिमान पैदास तंत्रज्ञान (स्पीड ब्रीडिंग)',
      bulletColor: 'bg-[#b86e1b]',
      rowBg: 'bg-[#fef8ed]',
      borderColor: 'border-[#fae3be]',
      textColor: 'text-[#92400e]',
      category: 'crop'
    },
    {
      num: 3,
      en: 'Modern agricultural mechanization, robotics and automation',
      mr: 'आधुनिक कृषी यांत्रिकीकरण, रोबोटिक्स आणि ऑटोमेशन',
      bulletColor: 'bg-[#2f6fb3]',
      rowBg: 'bg-[#edf4fb]',
      borderColor: 'border-[#cce1f7]',
      textColor: 'text-[#1e40af]',
      category: 'digital'
    },
    {
      num: 4,
      en: 'Development of varieties tolerant to biotic and abiotic stresses',
      mr: 'जैविक व अजैविक ताण सहनशील पीक वाणांची निर्मिती',
      bulletColor: 'bg-[#74529f]',
      rowBg: 'bg-[#f5eefb]',
      borderColor: 'border-[#e4d1f7]',
      textColor: 'text-[#5b21b6]',
      category: 'crop'
    },
    {
      num: 5,
      en: 'Digital, smart and precision agriculture',
      mr: 'डिजिटल, स्मार्ट आणि काटेकोर (अचूक) शेती',
      bulletColor: 'bg-[#1f8279]',
      rowBg: 'bg-[#ebf8f6]',
      borderColor: 'border-[#bdeee7]',
      textColor: 'text-[#0f766e]',
      category: 'digital'
    },
    {
      num: 6,
      en: 'Protected and controlled-environment farming',
      mr: 'संरक्षित व नियंत्रित वातावरण शेती तंत्रज्ञान',
      bulletColor: 'bg-[#b55845]',
      rowBg: 'bg-[#fdf2ef]',
      borderColor: 'border-[#fbd0c6]',
      textColor: 'text-[#9a3412]',
      category: 'resource'
    },
    {
      num: 7,
      en: 'Soil and water conservation in response to climate change',
      mr: 'हवामान बदलास अनुसरून मृद व जलसंधारण',
      bulletColor: 'bg-[#196b43]',
      rowBg: 'bg-[#edf7f1]',
      borderColor: 'border-[#c6ebd4]',
      textColor: 'text-[#14532d]',
      category: 'resource'
    },
    {
      num: 8,
      en: 'Management of saline, sodic and waterlogged soils',
      mr: 'खारवट, चोपण आणि पाणथळ जमिनींचे पुनर्वसन व व्यवस्थापन',
      bulletColor: 'bg-[#b86e1b]',
      rowBg: 'bg-[#fef8ed]',
      borderColor: 'border-[#fae3be]',
      textColor: 'text-[#92400e]',
      category: 'resource'
    },
    {
      num: 9,
      en: 'Integrated and efficient use of natural resources',
      mr: 'नैसर्गिक साधनसंपत्तीचा एकात्मिक व कार्यक्षम वापर',
      bulletColor: 'bg-[#2f6fb3]',
      rowBg: 'bg-[#edf4fb]',
      borderColor: 'border-[#cce1f7]',
      textColor: 'text-[#1e40af]',
      category: 'resource'
    },
    {
      num: 10,
      en: 'Scientific validation of natural and organic farming',
      mr: 'सेंद्रिय व नैसर्गिक शेतीचे शास्त्रीय प्रमाणीकरण',
      bulletColor: 'bg-[#74529f]',
      rowBg: 'bg-[#f5eefb]',
      borderColor: 'border-[#e4d1f7]',
      textColor: 'text-[#5b21b6]',
      category: 'resource'
    },
    {
      num: 11,
      en: 'Development of integrated farming systems',
      mr: 'एकात्मिक शेती पद्धती (IFS) मॉडेल्सचा विकास',
      bulletColor: 'bg-[#1f8279]',
      rowBg: 'bg-[#ebf8f6]',
      borderColor: 'border-[#bdeee7]',
      textColor: 'text-[#0f766e]',
      category: 'resource'
    },
    {
      num: 12,
      en: 'Conservation and enhancement of biodiversity',
      mr: 'कृषी जैवविविधतेचे संवर्धन व मूल्यवर्धन',
      bulletColor: 'bg-[#b55845]',
      rowBg: 'bg-[#fdf2ef]',
      borderColor: 'border-[#fbd0c6]',
      textColor: 'text-[#9a3412]',
      category: 'resource'
    }
  ];

  // 8 Domain Thrust Pillars
  const thrustPillars = [
    {
      id: 'climate-dryland',
      category: 'resource',
      num: '01',
      titleEn: 'Climate-Resilient Dryland Agronomy & Watershed Hydrology',
      titleMr: 'कोरडवाहू शेती, जलसंधारण व हवामान बदल अनुकूलन',
      badge: 'Core Priority',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      icon: Droplets,
      highlightsEn: [
        'Development of drought-escaping and drought-tolerant crop cultivars.',
        'Continuous contour trenching, farm ponds lining, and rainwater micro-catchments.',
        'Mid-season crop correction strategies for erratic monsoon spells.',
        'Zero-budget in-situ moisture conservation using organic mulching and sub-soilers.'
      ],
      highlightsMr: [
        'अवर्षण सहनशील व लवकर पक्व होणाऱ्या पीक वाणांची निर्मिती.',
        'पाझर तलाव, शेततळे अस्तरीकरण व सलग समपातळी चर (CCT) द्वारे भूजल पुनर्भरण.',
        'पावसाच्या खंड काळात आकस्मिक पीक व्यवस्थापन व मध्य-हंगाम दुरुस्ती तंत्र.',
        'मृदा ओलावा टिकवून ठेवण्यासाठी सेंद्रिय आच्छादन व खोल नांगरट तंत्रज्ञान.'
      ],
      impactEn: 'Targeting 35% higher water-use efficiency in scarcity zones.',
      impactMr: 'अवर्षण प्रवण भागात पाण्याचा ३५% अधिक कार्यक्षम वापर साध्य करण्याचे उद्दिष्ट.'
    },
    {
      id: 'genetic-enhancement',
      category: 'crop',
      num: '02',
      titleEn: 'Genetic Enhancement, Speed Breeding & Biofortification',
      titleMr: 'प्रमुख पिकांची आनुवंशिक सुधारणा, स्पीड ब्रीडिंग व जैव-पोषक संवर्धन',
      badge: 'Nutritional Security',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
      icon: Sprout,
      highlightsEn: [
        'Speed breeding technology cutting generation advance from 6 years down to 2 years.',
        'Marker-Assisted Selection (MAS) for disease resistance in chickpea, soybean, and pearl millet.',
        'Biofortified iron and zinc-rich varieties of sorghum, bajra, and minor millets.',
        'High-sucrose recovery sugarcane genotypes resistant to woolly aphid and red rot.'
      ],
      highlightsMr: [
        'स्पीड ब्रीडिंग तंत्रज्ञानाद्वारे वाण निर्मितीचा कालावधी ६ वर्षांवरून २ वर्षांवर आणणे.',
        'हरभरा, सोयाबीन व बाजरीमध्ये मार्कर-असिस्टेड निवडीद्वारे रोगप्रतिकारक्षम वाण निर्मिती.',
        'लोह (Iron) व जस्त (Zinc) समृद्ध ज्वारी, बाजरी व पोषक तृणधान्यांचे वाण.',
        'अधिक साखर उतारा व लोकरी मावा सहनशील ऊसाचे सुधारित क्लोन्स.'
      ],
      impactEn: 'Combating malnutrition through nutrient-dense climate-hardy cultivars.',
      impactMr: 'कुपोषण मुक्तीसाठी पोषक घटकयुक्त व उत्पादनक्षम पीक वाणांची उपलब्धता.'
    },
    {
      id: 'micro-irrigation',
      category: 'resource',
      num: '03',
      titleEn: 'Precision Micro-Irrigation & Fertigation Protocols',
      titleMr: 'अचूक सूक्ष्म सिंचन, खत-पाणी (फर्टिगेशन) व स्वयंचलित शेती',
      badge: 'Resource Efficiency',
      badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300',
      icon: Layers,
      highlightsEn: [
        'Crop-specific automated drip scheduling algorithms based on real-time evapotranspiration.',
        'Sub-surface drip irrigation (SDI) protocols for sugarcane and orchard crops.',
        'Liquid fertilizer and water-soluble nutrient delivery through computerized fertigation.',
        'Solar-powered precision micro-irrigation systems for smallholders.'
      ],
      highlightsMr: [
        'बाष्पीभवन व मृदा ओलाव्यावर आधारित स्वयंचलित ठिबक सिंचन वेळापत्रक.',
        'ऊस व फळबागांसाठी जमिनीखालील ठिबक सिंचन (Sub-surface Drip) पद्धती.',
        'विद्राव्य खतांचा ठिबकद्वारे काटेकोर वापर करून ३०% रासायनिक खतांची बचत.',
        'अल्पभूधारक शेतकऱ्यांसाठी सौरऊर्जेवर चालणाऱ्या ठिबक संचांचे प्रमाणीकरण.'
      ],
      impactEn: 'Achieving 40–50% water savings and 25–30% fertilizer efficiency.',
      impactMr: '४०-५०% पाण्याची बचत आणि २५-३०% रासायनिक खतांचा कार्यक्षम वापर.'
    },
    {
      id: 'ipm-biocontrol',
      category: 'crop',
      num: '04',
      titleEn: 'Integrated Pest & Disease Management (IPM/IDM)',
      titleMr: 'एकात्मिक कीड, रोग व्यवस्थापन व जैविक नियंत्रण तंत्रज्ञान',
      badge: 'Zero Residue',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      icon: ShieldCheck,
      highlightsEn: [
        'Mass production protocols for Trichoderma, Beauveria, and Metarhizium bio-agents.',
        'Pheromone traps, yellow sticky traps, and biological control of fall armyworm and pink bollworm.',
        'Monitoring pesticide residue limits to safeguard export agricultural consignments.',
        'Eco-friendly microbial formulations for wilt and nematode complex management.'
      ],
      highlightsMr: [
        'ट्रायकोडर्मा, बिव्हेरिया व मेटारायझियम जैविक बुरशीनाशकांचे मोठ्या प्रमाणावर उत्पादन.',
        'कामगंध सापळे, चिकट सापळे व लष्करी अळी/बोंडअळीचे प्रभावी जैविक नियंत्रण.',
        'निर्यातक्षम शेतमालासाठी कीटकनाशक अवशेषांचे (MRL) प्रमाणीकरण प्रयोगशाळा.',
        'मर रोग, मूळकूज व सूत्रकृमींच्या नियंत्रणासाठी पर्यावरणपूरक जिवाणू संवर्धक.'
      ],
      impactEn: 'Safe export compliance and reduction of chemical pesticide footprints.',
      impactMr: 'विषमुक्त शेती, निर्यात मानकांची पूर्तता व रासायनिक कीटकनाशकांवर अवलंबित्व घटवणे.'
    },
    {
      id: 'digital-ai',
      category: 'digital',
      num: '05',
      titleEn: 'Digital, Smart Agriculture, Robotics & Drone Automation',
      titleMr: 'डिजिटल, स्मार्ट शेती, रोबोटिक्स व ड्रोन ऑटोमेशन तंत्रज्ञान',
      badge: 'Next-Gen Farming',
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300',
      icon: Cpu,
      highlightsEn: [
        'CAAST-CSAWM project driving drone-based precision spraying and aerial crop health scans.',
        'Mobile applications (Smart PDM, Phule Jal, Phule Dairy) serving lakhs of farmers.',
        'IoT-enabled automated weather stations (AWS) for hyperlocal microclimate forecasting.',
        'AI machine-learning models for early disease detection from leaf imagery.'
      ],
      highlightsMr: [
        'कास्ट-सीएसएडब्लूएम प्रकल्पांतर्गत अचूक फवारणी व पीक पाहणीसाठी कृषी ड्रोनचा वापर.',
        'स्मार्ट पीडीएम, फुले जल, फुले डेअरी यांसारख्या ६२ मोबाईल व वेब अ‍ॅप्सचा विस्तार.',
        'स्थानिक पातळीवरील सूक्ष्म हवामान अंदाजासाठी आयओटी (IoT) हवामान केंद्रे.',
        'पानांच्या छायाचित्रावरून रोगांचे त्वरित निदान करणारी कृत्रिम बुद्धिमत्ता (AI) प्रणाली.'
      ],
      impactEn: 'Real-time scientific advisory delivered to farmer smartphones.',
      impactMr: 'शेतकऱ्यांच्या मोबाईलवर वेळेवर व अचूक शास्त्रीय सल्ला थेट उपलब्ध.'
    },
    {
      id: 'soil-carbon',
      category: 'resource',
      num: '06',
      titleEn: 'Management of Saline, Sodic Soils & Soil Health Restoration',
      titleMr: 'खारवट, चोपण जमिनींची सुधारणा, मृदा आरोग्य संवर्धन व सेंद्रिय कर्ब',
      badge: 'Soil Regeneration',
      badgeColor: 'bg-teal-100 text-teal-950 border-teal-300',
      icon: Sparkles,
      highlightsEn: [
        'Techniques for reclaiming saline-sodic soils through sub-surface drainage and green manuring.',
        'Soil fertility mapping across 10 districts using GIS and remote sensing.',
        'Commercial production of Phule Liquid Biofertilizers (Azotobacter, Rhizobium, PSB, KMB).',
        'Long-term fertilizer experiments (LTFE) analyzing carbon sequestration in soil horizons.'
      ],
      highlightsMr: [
        'खारवट व चोपण जमिनींची सुधारणा करण्यासाठी जमिनीखालील निचरा प्रणाली व हिरवळीच्या खतांचा वापर.',
        '१० जिल्ह्यांतील जमिनींचे जीआयएस (GIS) तंत्रज्ञानाद्वारे सुपीकता नकाशे तयार करणे.',
        'फुले लिक्विड बायोफर्टिलायझर्स (रायझोबियम, अझोटोबॅक्टर, पीएसबी, केएमबी) ची निर्मिती.',
        'दीर्घकालीन खत प्रयोगांद्वारे (LTFE) जमिनीतील सेंद्रिय कर्ब वाढीचे शास्त्रीय मूल्यमापन.'
      ],
      impactEn: 'Rejuvenating soil microbiome and restoring degraded arable land.',
      impactMr: 'जमिनीची सुपीकता पुनर्स्थापित करणे व सूक्ष्मजीव परिसंस्थेचे संवर्धन.'
    },
    {
      id: 'post-harvest',
      category: 'crop',
      num: '07',
      titleEn: 'Post-Harvest Technology, Processing & Value Addition',
      titleMr: 'काढणीपश्चात तंत्रज्ञान, मूल्यवर्धन व प्रक्रिया उद्योग',
      badge: 'Value Addition',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
      icon: Award,
      highlightsEn: [
        'Patented machinery for custard apple pulp flakes extraction and storage.',
        'Development of Phule ragi biscuits, amla shreds, and shelf-stable fruit beverages.',
        'Solar poly-tunnel dryers for hygienic drying of onions, grapes (raisins), and leafy greens.',
        'Minimal processing, modified atmosphere packaging (MAP), and cold chain logistics.'
      ],
      highlightsMr: [
        'सीताफळ गर काढणी व प्रक्रिया तंत्रज्ञानाचे नोंदणीकृत विद्यापीठ पेटंट्स.',
        'फुले नाचणी बिस्किटे, आवळा कॅन्डी, डाळिंब रस व टिकाऊ फळ प्रक्रियेची उत्पादने.',
        'कांदा, बेदाणा व भाजीपाला वाळवण्यासाठी सौर ऊर्जा पॉली-टनेल ड्रायरचे प्रमाणीकरण.',
        'शीतगृह साठवणूक, पॅकेजिंग तंत्रज्ञान आणि शेतमाल नासाडी रोखण्यासाठी उपाययोजना.'
      ],
      impactEn: 'Reducing post-harvest farm losses from 25% down to under 8%.',
      impactMr: 'काढणीपश्चात होणारे २५% नुकसान ८% पेक्षा खाली आणण्याचे उद्दिष्ट.'
    },
    {
      id: 'livestock-improvement',
      category: 'livestock',
      num: '08',
      titleEn: 'Integrated Farming Systems & Biodiversity Enhancement',
      titleMr: 'एकात्मिक शेती पद्धती (IFS) मॉडेल्स व जैवविविधता संवर्धन',
      badge: 'Agro-Ecology',
      badgeColor: 'bg-blue-100 text-blue-950 border-blue-300',
      icon: Target,
      highlightsEn: [
        'Integrated Farming System (IFS) models integrating crop, dairy, goatry, and vermicompost.',
        'Genetic refinement of Phule Triveni triple-cross cow for high milk solids and disease tolerance.',
        'Conservation of native cattle breeds (Khillar, Gir, Dangi) and fodder varieties (Phule Jaywant).',
        'Scientific validation of zero-budget natural farming and indigenous soil microbiome.'
      ],
      highlightsMr: [
        'पीक, दुग्धव्यवसाय, शेळीपालन व गांडूळखत यांचे शाश्वत एकात्मिक शेती पद्धती (IFS) मॉडेल.',
        'फुले त्रिवेणी तिहेरी संकरित गाईची दुध क्षमता व रोगप्रतिकारशक्ती वृद्धिंगत करणे.',
        'खिल्लार, गीर व डांगी या देशी गोवंशाचे संवर्धन व बहुवार्षिक चारा पिके (फुले जयवंत).',
        'सेंद्रिय व नैसर्गिक शेती पद्धतींचे शास्त्रीय प्रमाणीकरण व मातीच्या जैविक गुणधर्मांची वाढ.'
      ],
      impactEn: 'Sustainable secondary income stream for small and marginal landholders.',
      impactMr: 'अल्प व अत्यल्प भूधारक शेतकऱ्यांना शेतीतून वर्षभर शाश्वत पूरक उत्पन्नाची हमी.'
    }
  ];

  const filteredPillars = activeCategory === 'all'
    ? thrustPillars
    : thrustPillars.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: 'Thrust Areas', mr: 'संशोधन प्राधान्यक्रम' }} />

      <ResearchHero
        theme="thrust"
        badge={{ en: 'Strategic Priorities 2025–2035', mr: 'धोरणात्मक प्राधान्यक्रम २०२५-२०३५' }}
        title={{
          en: 'Research Thrust Areas — Directorate of Research',
          mr: 'संशोधनाची प्रमुख क्षेत्रे — संशोधन संचालनालय, राहुरी'
        }}
        subtitle={{
          en: 'Decadal research blueprint addressing climate-resilient cultivars, speed breeding, agricultural mechanization, digital robotics, precision soil hydrology, and sustainable agro-ecology.',
          mr: 'हवामान-अनुकूल वाण, स्पीड ब्रीडिंग, आधुनिक यांत्रिकीकरण, रोबोटिक्स, अचूक जलसंधारण आणि शाश्वत एकात्मिक शेती पद्धतींवर आधारित आगामी १० वर्षांचा संशोधन आराखडा.'
        }}
        quickChips={[
          { label: language === 'mr' ? '१२ संशोधन प्राधान्यक्रम' : '12 Research Priorities', icon: Target },
          { label: language === 'mr' ? 'आगामी १० वर्षांचा आराखडा' : 'Ten-Year Blueprint', icon: Calendar },
          { label: language === 'mr' ? 'डिजिटल व रोबोटिक्स' : 'Robotics & Automation', icon: Cpu },
          { label: language === 'mr' ? 'हवामान बदल अनुकूलन' : 'Climate Resilience', icon: Droplets }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 space-y-12">

        {/* ================================================================= */}
        {/* 1. OFFICIAL 10-YEAR RESEARCH PRIORITIES SHOWCASE (FROM LIVE SITE) */}
        {/* ================================================================= */}
        <section className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border-2 border-stone-200 shadow-sm space-y-8">
          
          {/* Header Banner matching user graphic */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#14532d] uppercase tracking-wide font-serif">
              {language === 'mr' ? 'संशोधन प्राधान्यक्रम' : 'RESEARCH PRIORITIES'}
            </h2>
            <div className="text-xs sm:text-sm md:text-base font-extrabold text-[#92400e] uppercase tracking-widest font-sans pt-0.5">
              {language === 'mr' ? 'आगामी दहा वर्षांसाठी (२०२५–२०३५)' : 'FOR THE NEXT TEN YEARS'}
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 mx-auto rounded-full mt-3" />
          </div>

          {/* 12 Priorities Vertical Stack List matching exact colors & bullet pills */}
          <div className="space-y-2.5 max-w-[1000px] mx-auto">
            {tenYearPriorities.map((item) => (
              <div
                key={item.num}
                className={`flex items-center gap-3.5 sm:gap-4 p-2 sm:p-2.5 rounded-xl border ${item.rowBg} ${item.borderColor} hover:shadow-xs transition-all duration-200 group`}
              >
                {/* Left Colored Bullet Pill matching the live website circle dot */}
                <div className={`w-14 sm:w-16 h-8 sm:h-9 rounded-lg ${item.bulletColor} shrink-0 flex items-center justify-center shadow-xs`}>
                  <div className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                </div>

                {/* Priority Text (Bilingual support) */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className={`text-xs sm:text-[14px] md:text-[15px] font-bold ${item.textColor} leading-snug`}>
                    {language === 'mr' ? item.mr : item.en}
                  </div>
                  {language === 'mr' && (
                    <div className="text-[11px] text-stone-500 font-medium hidden sm:block mt-0.5">
                      {item.en}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ================================================================= */}
        {/* 2. EIGHT COMPREHENSIVE THRUST DOMAINS MATRIX                      */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? 'सखोल संशोधन स्तंभ' : 'In-Depth Research Pillars'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                {language === 'mr' ? 'प्राधान्य क्षेत्रांचे सविस्तर कार्यक्षेत्र व लक्ष्य' : 'Detailed Domains, Action Framework & Impact'}
              </h3>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 bg-stone-200/80 p-1.5 rounded-2xl border border-stone-300 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeCategory === 'all'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                {language === 'mr' ? 'सर्व ८ क्षेत्रे' : 'All (8 Pillars)'}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('crop')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeCategory === 'crop'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                {language === 'mr' ? 'पीक सुधारणा व पैदास' : 'Crops & Breeding'}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('resource')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeCategory === 'resource'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                {language === 'mr' ? 'जल व मृदा संवर्धन' : 'Water & Soil'}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('digital')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeCategory === 'digital'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                {language === 'mr' ? 'डिजिटल व रोबोटिक्स' : 'Digital & Robotics'}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('livestock')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeCategory === 'livestock'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                {language === 'mr' ? 'शेती पद्धती व जैवविविधता' : 'IFS & Ecology'}
              </button>
            </div>
          </div>

          {/* 8 Thrust Area Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    
                    {/* Card Header: Pillar Num + Badge + Icon */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-amber-300 font-extrabold text-sm flex items-center justify-center font-serif shadow-xs">
                          {p.num}
                        </div>
                        <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-md border ${p.badgeColor}`}>
                          {p.badge}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-stone-100 text-emerald-800 border border-stone-200">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-serif leading-snug">
                      {language === 'mr' ? p.titleMr : p.titleEn}
                    </h4>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2 text-xs sm:text-[13px] text-stone-700 leading-relaxed font-medium">
                      {(language === 'mr' ? p.highlightsMr : p.highlightsEn).map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                  {/* Card Footer: Impact Banner */}
                  <div className="pt-4 mt-5 border-t border-stone-200/80">
                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs font-semibold text-emerald-950 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{language === 'mr' ? p.impactMr : p.impactEn}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
