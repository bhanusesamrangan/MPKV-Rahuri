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
  Check,
  LayoutGrid,
  ListOrdered,
  Zap,
  Activity,
  Boxes,
  Microscope,
  Leaf,
  Globe2,
  Wrench,
  Sun,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

interface ResearchThrustAreasViewProps {
  pageData?: any;
}

export const ResearchThrustAreasView: React.FC<ResearchThrustAreasViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<'bento' | 'board'>('bento');
  const [activeCluster, setActiveCluster] = useState<string>('all');

  // 1. Official 12 Research Priorities for the Next Ten Years (Verbatim from Live Site)
  const tenYearPriorities = [
    {
      num: 1,
      en: 'Development of climate-resilient varieties and technologies',
      mr: 'हवामान-अनुकूल पीक वाण व तंत्रज्ञानाचा विकास',
      bulletColor: 'bg-[#196b43]',
      rowBg: 'bg-[#edf7f1]',
      borderColor: 'border-[#c6ebd4]',
      textColor: 'text-[#14532d]',
      clusterId: 'genetics',
      clusterEn: 'Genetic Frontier',
      clusterMr: 'आनुवंशिक पैदास',
      icon: Sprout,
      descEn: 'Engineering drought-escaping, heat-tolerant crop cultivars designed to withstand climate extremes.',
      descMr: 'हवामान बदलांच्या धोक्यांना तोंड देणारे दुष्काळ-सहनशील व उष्णता-प्रतिकारक पीक वाण विकसित करणे.'
    },
    {
      num: 2,
      en: 'Speed breeding technology',
      mr: 'गतिमान पैदास तंत्रज्ञान (स्पीड ब्रीडिंग)',
      bulletColor: 'bg-[#b86e1b]',
      rowBg: 'bg-[#fef8ed]',
      borderColor: 'border-[#fae3be]',
      textColor: 'text-[#92400e]',
      clusterId: 'genetics',
      clusterEn: 'Genetic Frontier',
      clusterMr: 'आनुवंशिक पैदास',
      icon: Zap,
      descEn: 'Accelerating breeding generations from 6 years down to 2 years using controlled photoperiod chambers.',
      descMr: 'नियंत्रित प्रकाश व तापमान कक्षांमध्ये वाण विकासाचा कालावधी ६ वर्षांवरून २ वर्षांवर आणणे.'
    },
    {
      num: 3,
      en: 'Modern agricultural mechanization, robotics and automation',
      mr: 'आधुनिक कृषी यांत्रिकीकरण, रोबोटिक्स आणि ऑटोमेशन',
      bulletColor: 'bg-[#2f6fb3]',
      rowBg: 'bg-[#edf4fb]',
      borderColor: 'border-[#cce1f7]',
      textColor: 'text-[#1e40af]',
      clusterId: 'digital',
      clusterEn: 'Robotics & AI',
      clusterMr: 'रोबोटिक्स व एआय',
      icon: Wrench,
      descEn: 'Design and deployment of customized robotic harvesters, automated planters, and power weeders.',
      descMr: 'मजुरांची टंचाई दूर करण्यासाठी स्वयंचलित कापणी यंत्रे, पेरणी यंत्रे व आंतरमशागत रोबोटिक्सची निर्मिती.'
    },
    {
      num: 4,
      en: 'Development of varieties tolerant to biotic and abiotic stresses',
      mr: 'जैविक व अजैविक ताण सहनशील पीक वाणांची निर्मिती',
      bulletColor: 'bg-[#74529f]',
      rowBg: 'bg-[#f5eefb]',
      borderColor: 'border-[#e4d1f7]',
      textColor: 'text-[#5b21b6]',
      clusterId: 'genetics',
      clusterEn: 'Genetic Frontier',
      clusterMr: 'आनुवंशिक पैदास',
      icon: ShieldAlert,
      descEn: 'Genomic breeding for multi-disease and multi-pest resistance in pulses, oilseeds, and vegetables.',
      descMr: 'कडधान्ये, गळीतधान्ये व भाजीपाल्यामध्ये कीड-रोग प्रतिकारक्षमतेसाठी मार्कर-असिस्टेड ब्रीडिंग.'
    },
    {
      num: 5,
      en: 'Digital, smart and precision agriculture',
      mr: 'डिजिटल, स्मार्ट आणि काटेकोर (अचूक) शेती',
      bulletColor: 'bg-[#1f8279]',
      rowBg: 'bg-[#ebf8f6]',
      borderColor: 'border-[#bdeee7]',
      textColor: 'text-[#0f766e]',
      clusterId: 'digital',
      clusterEn: 'Robotics & AI',
      clusterMr: 'रोबोटिक्स व एआय',
      icon: Cpu,
      descEn: 'Drone-assisted hyper-spectral crop health scanning, IoT automated weather stations, and mobile AI advisories.',
      descMr: 'कृषी ड्रोन, उपग्रह नकाशे, आयओटी (IoT) हवामान केंद्रे आणि ६२ विद्यापीठ मोबाईल अ‍ॅप्सचा विस्तार.'
    },
    {
      num: 6,
      en: 'Protected and controlled-environment farming',
      mr: 'संरक्षित व नियंत्रित वातावरण शेती तंत्रज्ञान',
      bulletColor: 'bg-[#b55845]',
      rowBg: 'bg-[#fdf2ef]',
      borderColor: 'border-[#fbd0c6]',
      textColor: 'text-[#9a3412]',
      clusterId: 'digital',
      clusterEn: 'Robotics & AI',
      clusterMr: 'रोबोटिक्स व एआय',
      icon: Sun,
      descEn: 'Automated polyhouses, shade-net climate regulation, and soil-less hydroponic systems for high-value horticulture.',
      descMr: 'पॉलीहाऊस, शेडनेट आणि मातीविना (हायड्रोपोनिक्स) नियंत्रित वातावरणातील दर्जेदार भाजीपाला व फुलशेती.'
    },
    {
      num: 7,
      en: 'Soil and water conservation in response to climate change',
      mr: 'हवामान बदलास अनुसरून मृद व जलसंधारण',
      bulletColor: 'bg-[#196b43]',
      rowBg: 'bg-[#edf7f1]',
      borderColor: 'border-[#c6ebd4]',
      textColor: 'text-[#14532d]',
      clusterId: 'hydrology',
      clusterEn: 'Soil & Hydrology',
      clusterMr: 'मृद व जलसंधारण',
      icon: Droplets,
      descEn: 'Catchment watershed development, sub-surface drip irrigation, and rainwater micro-harvesting structures.',
      descMr: 'पाणलोट क्षेत्र विकास, जमिनीखालील ठिबक सिंचन आणि शेतात पडणाऱ्या प्रत्येक थेंबाचे संवर्धन.'
    },
    {
      num: 8,
      en: 'Management of saline, sodic and waterlogged soils',
      mr: 'खारवट, चोपण आणि पाणथळ जमिनींचे पुनर्वसन व व्यवस्थापन',
      bulletColor: 'bg-[#b86e1b]',
      rowBg: 'bg-[#fef8ed]',
      borderColor: 'border-[#fae3be]',
      textColor: 'text-[#92400e]',
      clusterId: 'hydrology',
      clusterEn: 'Soil & Hydrology',
      clusterMr: 'मृद व जलसंधारण',
      icon: Sparkles,
      descEn: 'Sub-surface drainage (SSD) protocols and organic amendments for reclaiming degraded canal command tracts.',
      descMr: 'कालवा लाभक्षेत्रातील क्षारपड व पाणथळ जमिनींचे भूमिगत निचरा प्रणालीद्वारे पुनर्वसन.'
    },
    {
      num: 9,
      en: 'Integrated and efficient use of natural resources',
      mr: 'नैसर्गिक साधनसंपत्तीचा एकात्मिक व कार्यक्षम वापर',
      bulletColor: 'bg-[#2f6fb3]',
      rowBg: 'bg-[#edf4fb]',
      borderColor: 'border-[#cce1f7]',
      textColor: 'text-[#1e40af]',
      clusterId: 'hydrology',
      clusterEn: 'Soil & Hydrology',
      clusterMr: 'मृद व जलसंधारण',
      icon: Compass,
      descEn: 'Precision fertigation delivering nutrients directly to the root zone, reducing chemical fertilizer waste by 30%.',
      descMr: 'खतांचा आणि पाण्याचा काटेकोर वापर करून ३०% रासायनिक खतांची बचत व जमिनीचे आरोग्य रक्षण.'
    },
    {
      num: 10,
      en: 'Scientific validation of natural and organic farming',
      mr: 'सेंद्रिय व नैसर्गिक शेतीचे शास्त्रीय प्रमाणीकरण',
      bulletColor: 'bg-[#74529f]',
      rowBg: 'bg-[#f5eefb]',
      borderColor: 'border-[#e4d1f7]',
      textColor: 'text-[#5b21b6]',
      clusterId: 'ecology',
      clusterEn: 'Agro-Ecology',
      clusterMr: 'शाश्वत शेती',
      icon: Leaf,
      descEn: 'Long-term scientific trials on desi cow formulations (Jeevamrit, Beejamrit) and soil carbon sequestration.',
      descMr: 'देशी गोमूत्र/शेण आधारित जिवामृत व बीजामृताचे मातीच्या सूक्ष्मजीवांवर होणाऱ्या परिणामांचे शास्त्रीय विश्लेषण.'
    },
    {
      num: 11,
      en: 'Development of integrated farming systems',
      mr: 'एकात्मिक शेती पद्धती (IFS) मॉडेल्सचा विकास',
      bulletColor: 'bg-[#1f8279]',
      rowBg: 'bg-[#ebf8f6]',
      borderColor: 'border-[#bdeee7]',
      textColor: 'text-[#0f766e]',
      clusterId: 'ecology',
      clusterEn: 'Agro-Ecology',
      clusterMr: 'शाश्वत शेती',
      icon: Boxes,
      descEn: 'Synergistic 1-hectare models combining field crops, dairy (Phule Triveni), goatry, poultry, and vermicompost.',
      descMr: 'अल्पभूधारक शेतकऱ्यांसाठी पीक, दुग्धव्यवसाय, शेळीपालन व गांडूळखत यांचे शाश्वत १ हेक्टर मॉडेल.'
    },
    {
      num: 12,
      en: 'Conservation and enhancement of biodiversity',
      mr: 'कृषी जैवविविधतेचे संवर्धन व मूल्यवर्धन',
      bulletColor: 'bg-[#b55845]',
      rowBg: 'bg-[#fdf2ef]',
      borderColor: 'border-[#fbd0c6]',
      textColor: 'text-[#9a3412]',
      clusterId: 'ecology',
      clusterEn: 'Agro-Ecology',
      clusterMr: 'शाश्वत शेती',
      icon: Globe2,
      descEn: 'Preserving wild landraces, traditional heirloom seeds, and pure livestock breeds (Khillar, Osmanabadi, Deccani).',
      descMr: 'स्थानिक दुर्मीळ बियाणे, रानभाज्या आणि शुद्ध देशी पशुधनाच्या जातींचे (खिल्लार, उस्मानाबादी, दख्खनी) संवर्धन.'
    }
  ];

  // 2. The 4 Strategic Thematic Clusters
  const strategicClusters = [
    {
      id: 'genetics',
      titleEn: '1. Genetic Frontier, Speed Breeding & Climate Resilience',
      titleMr: '१. आनुवंशिक पैदास, स्पीड ब्रीडिंग व हवामान अनुकूलन',
      icon: Sprout,
      color: 'from-emerald-950 via-emerald-900 to-teal-950 text-white',
      accent: 'border-emerald-400 text-emerald-300',
      prioritiesCount: '3 Priorities (P1, P2, P4)',
      summaryEn: 'Accelerating generation turnover with speed breeding chambers and engineering climate-hardy germplasm across cereals, pulses, and oilseeds.',
      summaryMr: 'स्पीड ब्रीडिंग कक्षांद्वारे वाण निर्मिती गतीमान करणे आणि तृणधान्ये व कडधान्यांमध्ये हवामान-सहनशील वाण विकसित करणे.',
      milestoneEn: 'Target: 50% reduction in breeding cycles by 2028.',
      milestoneMr: 'लक्ष्य: २०२८ पर्यंत वाण विकास चक्रात ५०% वेळेची बचत.'
    },
    {
      id: 'digital',
      titleEn: '2. Farm Mechanization, Robotics & Precision Digital Agriculture',
      titleMr: '२. कृषी यांत्रिकीकरण, रोबोटिक्स व डिजिटल शेती',
      icon: Cpu,
      color: 'from-blue-950 via-indigo-900 to-slate-950 text-white',
      accent: 'border-blue-400 text-blue-300',
      prioritiesCount: '3 Priorities (P3, P5, P6)',
      summaryEn: 'Custom robotics for smallholders, drone-based aerial sensing, automated fertigation, and high-tech controlled polyhouse cultivation.',
      summaryMr: 'अल्पभूधारकांसाठी रोबोटिक्स अवजारे, कृषी ड्रोनद्वारे फवारणी, स्वयंचलित सिंचन आणि नियंत्रित पॉलीहाऊस तंत्रज्ञान.',
      milestoneEn: 'Target: 100,000 farmers equipped with AI precision advisory.',
      milestoneMr: 'लक्ष्य: १ लाख शेतकऱ्यांना थेट एआय आधारित अचूक शेती सल्ला.'
    },
    {
      id: 'hydrology',
      titleEn: '3. Soil Hydrology, Saline Land Reclamation & Natural Resources',
      titleMr: '३. मृदा जलविज्ञान, खारवट जमीन सुधारणा व साधनसंपत्ती',
      icon: Droplets,
      color: 'from-amber-950 via-stone-900 to-amber-900 text-white',
      accent: 'border-amber-400 text-amber-300',
      prioritiesCount: '3 Priorities (P7, P8, P9)',
      summaryEn: 'Sub-surface drainage for saline-sodic command tracts, precision water governance, and in-situ rainwater conservation.',
      summaryMr: 'क्षारपड जमिनींचा भूमिगत निचरा, काटेकोर जल व्यवस्थापन आणि शेतात पाण्याचे सूक्ष्म संवर्धन.',
      milestoneEn: 'Target: Reclaiming 25,000+ hectares of saline soils.',
      milestoneMr: 'लक्ष्य: २५,०००+ हेक्टर खारवट व चोपण जमिनींची सुधारणा.'
    },
    {
      id: 'ecology',
      titleEn: '4. Sustainable Agro-Ecology, Natural Farming & Biodiversity',
      titleMr: '४. शाश्वत कृषी परिसंस्था, नैसर्गिक शेती व जैवविविधता',
      icon: Leaf,
      color: 'from-purple-950 via-slate-900 to-purple-900 text-white',
      accent: 'border-purple-400 text-purple-300',
      prioritiesCount: '3 Priorities (P10, P11, P12)',
      summaryEn: 'Scientific validation of cow-based organic practices, integrated 1-hectare circular farming systems, and native breed preservation.',
      summaryMr: 'सेंद्रिय व नैसर्गिक शेतीचे शास्त्रीय प्रमाणीकरण, चक्रीय एकात्मिक शेती पद्धती आणि देशी पशुधन संवर्धन.',
      milestoneEn: 'Target: Zero chemical residue compliance in 5Scarcity belts.',
      milestoneMr: 'लक्ष्य: अवर्षण पट्ट्यात विषमुक्त व सेंद्रिय शेती मॉडेल्सचा प्रसार.'
    }
  ];

  // Decadal Milestones Roadmap (2025–2035)
  const decadalRoadmap = [
    {
      phase: '2025 – 2027',
      phaseTitleEn: 'Foundation & Acceleration',
      phaseTitleMr: 'पायाभूत सक्षमीकरण व गतीमानता',
      badge: 'Phase I',
      pointsEn: [
        'Establishment of High-Throughput Speed Breeding facility for pulses and oilseeds.',
        'Deployment of 500+ IoT Automated Weather Stations (AWS) across Scarcity and Plateau zones.',
        'Field-testing of 10 customized robotic implements for sowing and interculture.'
      ],
      pointsMr: [
        'कडधान्य व गळीतधान्यांसाठी हाय-थ्रूपूट स्पीड ब्रीडिंग केंद्राची स्थापना.',
        'अवर्षण व पठारी विभागात ५००+ आयओटी (IoT) स्वयंचलित हवामान केंद्रांचे जाळे.',
        'पेरणी व आंतरमशागतीसाठी १० स्वयंचलित रोबोटिक अवजारांच्या क्षेत्रीय चाचण्या.'
      ]
    },
    {
      phase: '2028 – 2031',
      phaseTitleEn: 'Scale & Precision Integration',
      phaseTitleMr: 'विस्तार व अचूक एकात्मिकीकरण',
      badge: 'Phase II',
      pointsEn: [
        'Commercial release of climate-smart varieties with 20% higher drought tolerance.',
        'Reclamation of 25,000 hectares of waterlogged and saline-sodic soils in Krishna & Godavari valleys.',
        'Full digital integration of all 27 research stations via AI central hub.'
      ],
      pointsMr: [
        '२०% अधिक दुष्काळ सहनशील अशा हवामान-अनुकूल सुधारित वाणांचे लोकार्पण.',
        'कृष्णा व गोदावरी खोऱ्यातील २५,००० हेक्टर खारवट जमिनींचे भूमिगत निचरा प्रणालीद्वारे पुनर्वसन.',
        'सर्व २७ संशोधन केंद्रांचे एआय (AI) मध्यवर्ती डेटा हबद्वारे डिजिटल एकत्रीकरण.'
      ]
    },
    {
      phase: '2032 – 2035',
      phaseTitleEn: 'Ecological Maturity & Carbon Neutrality',
      phaseTitleMr: 'शाश्वत परिपक्वता व कार्बन तटस्थता',
      badge: 'Phase III',
      pointsEn: [
        'Carbon-neutral Integrated Farming System (IFS) models adopted across 10 Western Maharashtra districts.',
        '100% digital trace of breeder seed multiplications with FPOs and seed cooperatives.',
        'Comprehensive genetic registry and digital gene bank for all 270+ released varieties.'
      ],
      pointsMr: [
        'पश्चिम महाराष्ट्रातील १० जिल्ह्यांत कार्बन-तटस्थ एकात्मिक शेती पद्धती मॉडेल्सचा अवलंब.',
        'शेतकरी उत्पादक कंपन्यांसोबत (FPOs) मूलभूत बियाणे वितरणाचे १००% डिजिटल ट्रॅकिंग.',
        'विद्यापीठाच्या सर्व २७०+ अधिक वाणांचे डिजिटल जनुक बँक व बौद्धिक संपदा संरक्षण.'
      ]
    }
  ];

  const filteredPriorities = activeCluster === 'all'
    ? tenYearPriorities
    : tenYearPriorities.filter((p) => p.clusterId === activeCluster);

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: 'Thrust Areas', mr: 'संशोधन प्राधान्यक्रम' }} />

      <ResearchHero
        theme="thrust"
        badge={{ en: 'Decadal Blueprint 2025–2035', mr: 'दहा वर्षांचा संशोधन आराखडा २०२५-२०३५' }}
        title={{
          en: 'Research Thrust Areas — Directorate of Research',
          mr: 'संशोधनाची प्रमुख क्षेत्रे — संशोधन संचालनालय, राहुरी'
        }}
        subtitle={{
          en: 'Strategic 10-year research roadmap addressing climate resilience, speed breeding, agricultural mechanization, digital robotics, precision soil hydrology, and sustainable agro-ecology.',
          mr: 'हवामान-अनुकूल वाण, स्पीड ब्रीडिंग, आधुनिक यांत्रिकीकरण, रोबोटिक्स, अचूक जलसंधारण आणि शाश्वत एकात्मिक शेती पद्धतींवर आधारित आगामी १० वर्षांचा अधिकृत संशोधन आराखडा.'
        }}
        quickChips={[
          { label: language === 'mr' ? '१२ संशोधन प्राधान्यक्रम' : '12 Research Priorities', icon: Target },
          { label: language === 'mr' ? '४ धोरणात्मक स्तंभ' : '4 Strategic Clusters', icon: Boxes },
          { label: language === 'mr' ? '१० वर्षांचा कालावधी' : '10-Year Horizon', icon: Calendar },
          { label: language === 'mr' ? 'हवामान बदल अनुकूलन' : 'Climate Action', icon: Droplets }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 space-y-12">

        {/* ================================================================= */}
        {/* 1. TOP METRICS & DECADAL SCOPE STATS                              */}
        {/* ================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-emerald-800">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                Official Mandate
              </span>
              <Target className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 font-serif">
              12
            </div>
            <div className="text-xs sm:text-sm font-bold text-emerald-950 mt-1">
              {language === 'mr' ? 'संशोधन प्राधान्यक्रम' : 'Ten-Year Priorities'}
            </div>
            <p className="text-[11px] text-stone-600 mt-1">
              {language === 'mr' ? 'आगामी दशकभराची दिशा' : 'Guiding 2025–2035 Research'}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-blue-800">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                Strategic Clusters
              </span>
              <Boxes className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 font-serif">
              4
            </div>
            <div className="text-xs sm:text-sm font-bold text-blue-950 mt-1">
              {language === 'mr' ? 'धोरणात्मक संशोधन स्तंभ' : 'Scientific Domains'}
            </div>
            <p className="text-[11px] text-stone-600 mt-1">
              {language === 'mr' ? 'आनुवंशिकी, डिजिटल, जल व जैवविविधता' : 'Genetics, Digital, Soil, Ecology'}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-amber-800">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                Crop Mandate
              </span>
              <Sprout className="w-5 h-5 text-amber-700" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 font-serif">
              100+
            </div>
            <div className="text-xs sm:text-sm font-bold text-amber-950 mt-1">
              {language === 'mr' ? 'पिकांवर सखोल संशोधन' : 'Crops Under Research'}
            </div>
            <p className="text-[11px] text-stone-600 mt-1">
              {language === 'mr' ? 'अन्नधान्य, नगदी व फलोत्पादन' : 'Cereals, Pulses, Cash & Fruits'}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-purple-800">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                Network Outreach
              </span>
              <MapPin className="w-5 h-5 text-purple-700" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 font-serif">
              27
            </div>
            <div className="text-xs sm:text-sm font-bold text-purple-950 mt-1">
              {language === 'mr' ? 'संशोधन केंद्रे (५ विभाग)' : 'Stations (5 Agro Zones)'}
            </div>
            <p className="text-[11px] text-stone-600 mt-1">
              {language === 'mr' ? '१० जिल्ह्यांत विस्तृत कार्यक्षेत्र' : 'Covering 10 Districts'}
            </p>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. THE 12 PRIORITIES SHOWCASE: INTERACTIVE BENTO VS GRAPHIC BOARD */}
        {/* ================================================================= */}
        <section className="space-y-6">

          {/* Controls Bar: Section Header + View Switcher + Cluster Filter */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Target className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? 'अधिकृत संशोधन प्राधान्यक्रम' : 'Official Decadal Blueprint'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                {language === 'mr' ? 'आगामी दहा वर्षांसाठी संशोधन प्राधान्यक्रम' : 'Research Priorities for the Next Ten Years'}
              </h2>
            </div>

            {/* View Switcher Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-stone-200/80 border border-stone-300">
                <button
                  type="button"
                  onClick={() => setViewMode('bento')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'bento'
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'text-stone-700 hover:text-slate-950'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'कार्ड मॅट्रिक्स (Bento)' : 'Matrix Cards'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('board')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'board'
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'text-stone-700 hover:text-slate-950'
                  }`}
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'अधिकृत बोर्ड (Graphic)' : 'Official Graphic Board'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Cluster Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-1">
              {language === 'mr' ? 'स्तंभ निवडा:' : 'Filter Domain:'}
            </span>
            {[
              { id: 'all', labelEn: 'All 12 Priorities', labelMr: 'सर्व १२ प्राधान्यक्रम' },
              { id: 'genetics', labelEn: 'Genetics & Breeding', labelMr: 'आनुवंशिकी व पैदास' },
              { id: 'digital', labelEn: 'Robotics & Precision', labelMr: 'रोबोटिक्स व अचूक शेती' },
              { id: 'hydrology', labelEn: 'Soil & Water Hydrology', labelMr: 'मृद व जलविज्ञान' },
              { id: 'ecology', labelEn: 'Agro-Ecology & Biodiversity', labelMr: 'शाश्वत शेती व जैवविविधता' }
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveCluster(chip.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCluster === chip.id
                    ? 'bg-slate-900 text-white shadow-xs scale-105'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {language === 'mr' ? chip.labelMr : chip.labelEn}
              </button>
            ))}
          </div>

          {/* VIEW MODE 1: MATRIX BENTO CARDS */}
          {viewMode === 'bento' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {filteredPriorities.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.num}
                    className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl ${item.bulletColor} text-white flex items-center justify-center font-bold text-xs shadow-xs`}>
                            {item.num}
                          </div>
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                            {language === 'mr' ? item.clusterMr : item.clusterEn}
                          </span>
                        </div>
                        <div className="p-2 rounded-xl bg-stone-50 text-slate-800 border border-stone-200 group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4 text-emerald-800" />
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug">
                        {language === 'mr' ? item.mr : item.en}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-medium">
                        {language === 'mr' ? item.descMr : item.descEn}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                      <span>MPKV 2025–2035</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>{language === 'mr' ? 'प्राधान्यक्रम #' + item.num : 'Priority #' + item.num}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW MODE 2: OFFICIAL GRAPHIC BOARD VIEW (FAITHFUL TO USER IMAGE) */}
          {viewMode === 'board' && (
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border-2 border-stone-200 shadow-sm space-y-6">
              
              {/* Graphic Title Header */}
              <div className="text-center space-y-1 pb-2">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#14532d] uppercase tracking-wide font-serif">
                  {language === 'mr' ? 'संशोधन प्राधान्यक्रम' : 'RESEARCH PRIORITIES'}
                </h3>
                <div className="text-xs sm:text-sm md:text-base font-extrabold text-[#92400e] uppercase tracking-widest font-sans pt-0.5">
                  {language === 'mr' ? 'आगामी दहा वर्षांसाठी (२०२५–२०३५)' : 'FOR THE NEXT TEN YEARS'}
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 mx-auto rounded-full mt-3" />
              </div>

              {/* Graphic Rows Stack */}
              <div className="space-y-2.5 max-w-[1000px] mx-auto">
                {filteredPriorities.map((item) => (
                  <div
                    key={item.num}
                    className={`flex items-center gap-3.5 sm:gap-4 p-2 sm:p-2.5 rounded-xl border ${item.rowBg} ${item.borderColor} hover:shadow-xs transition-all duration-200`}
                  >
                    <div className={`w-14 sm:w-16 h-8 sm:h-9 rounded-lg ${item.bulletColor} shrink-0 flex items-center justify-center shadow-xs`}>
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                    </div>

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
            </div>
          )}

        </section>

        {/* ================================================================= */}
        {/* 3. THE 4 STRATEGIC SCIENTIFIC CLUSTERS (EXECUTIVE DOSSIERS)       */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Boxes className="w-3.5 h-3.5 text-blue-700" />
              <span>{language === 'mr' ? '४ धोरणात्मक संशोधन स्तंभ' : '4 Strategic Scientific Clusters'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
              {language === 'mr' ? 'प्राधान्य क्षेत्रांचे एकात्मिक क्लस्टर्स' : 'Integrated Thematic Research Framework'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategicClusters.map((cluster) => {
              const Icon = cluster.icon;
              return (
                <div
                  key={cluster.id}
                  className={`p-7 rounded-3xl bg-gradient-to-br ${cluster.color} shadow-md flex flex-col justify-between space-y-5`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md border ${cluster.accent} bg-white/10`}>
                        {cluster.prioritiesCount}
                      </span>
                      <div className="p-2 rounded-xl bg-white/10 text-white">
                        <Icon className="w-5 h-5 text-amber-300" />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white font-serif leading-snug">
                      {language === 'mr' ? cluster.titleMr : cluster.titleEn}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-emerald-100/90 leading-relaxed font-medium">
                      {language === 'mr' ? cluster.summaryMr : cluster.summaryEn}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between text-xs font-semibold text-amber-200">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{language === 'mr' ? cluster.milestoneMr : cluster.milestoneEn}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. DECADAL ROADMAP: 2025 TO 2035 PHASED MILESTONES                */}
        {/* ================================================================= */}
        <section className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'mr' ? 'दहा वर्षांचा टप्पानिहाय रोडमॅप' : 'Decadal Roadmap (2025–2035)'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                {language === 'mr' ? 'संशोधन उद्दिष्टांची टप्पानिहाय पूर्तता' : 'Phased Implementation & Delivery Milestones'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {decadalRoadmap.map((phase, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col justify-between space-y-4 hover:border-amber-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-300">
                      {phase.badge}
                    </span>
                    <span className="text-xs font-bold text-stone-500 font-mono">
                      {phase.phase}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 font-serif pt-1">
                    {language === 'mr' ? phase.phaseTitleMr : phase.phaseTitleEn}
                  </h4>

                  <ul className="space-y-2 pt-2 text-xs text-stone-700 leading-relaxed font-medium">
                    {(language === 'mr' ? phase.pointsMr : phase.pointsEn).map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-stone-200/60 text-[11px] font-bold text-emerald-800">
                  Target Horizon: {phase.phase}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
