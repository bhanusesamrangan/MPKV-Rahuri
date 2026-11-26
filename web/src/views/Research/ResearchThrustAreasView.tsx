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
  ChevronRight,
  MapPin,
  Search,
  X,
  SlidersHorizontal
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<any | null>(null);

  // 1. Official 12 Research Priorities for the Next Ten Years (2025–2035)
  const tenYearPriorities = [
    {
      num: 1,
      en: 'Development of climate-resilient varieties and technologies',
      mr: 'हवामान-अनुकूल पीक वाण व तंत्रज्ञानाचा विकास',
      clusterId: 'genetics',
      clusterEn: 'Genetic Frontier',
      clusterMr: 'आनुवंशिक पैदास',
      icon: Sprout,
      descEn: 'Engineering drought-escaping, heat-tolerant, and sub-zero resilient crop cultivars designed to withstand climate extremes.',
      descMr: 'हवामान बदलांच्या धोक्यांना तोंड देणारे दुष्काळ-सहनशील, उष्णता-प्रतिकारक व थंडी-सहनशील पीक वाण विकसित करणे.',
      tagsEn: ['Drought & Heat Tolerance', 'Climate-Smart Germplasm', 'Multi-Stress Resilience'],
      tagsMr: ['दुष्काळ व उष्णता प्रतिकार', 'हवामान-लवचिक जनुक', 'बहुविध ताण सहनशीलता'],
      targetMetricEn: 'Target: 15+ Climate-Resilient Cultivars by 2030',
      targetMetricMr: 'ध्येय: २०३० पर्यंत १५+ हवामान-अनुकूल वाण',
      leadUnitsEn: 'Pulses & Oilseeds Improvement Project, Rahuri',
      leadUnitsMr: 'कडधान्य व गळीतधान्य सुधार प्रकल्प, राहुरी',
      badgeGradient: 'from-emerald-700 to-teal-800',
      bgLight: 'bg-emerald-50/70',
      borderAccent: 'border-emerald-200 hover:border-emerald-400',
      iconBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      bulletColor: 'bg-[#196b43]',
      rowBg: 'bg-[#edf7f1]',
      textColor: 'text-[#14532d]'
    },
    {
      num: 2,
      en: 'Speed breeding technology',
      mr: 'गतिमान पैदास तंत्रज्ञान (स्पीड ब्रीडिंग)',
      clusterId: 'genetics',
      clusterEn: 'Genetic Frontier',
      clusterMr: 'आनुवंशिक पैदास',
      icon: Zap,
      descEn: 'Accelerating breeding generations from 6 years down to 2 years using controlled photoperiod and temperature chambers.',
      descMr: 'नियंत्रित प्रकाश व तापमान कक्षांमध्ये वाण विकासाचा कालावधी ६ वर्षांवरून २ वर्षांवर आणणे.',
      tagsEn: ['6 Yrs → 2 Yrs Cycle', 'Photoperiod Growth Chambers', 'Rapid Generation Advance'],
      tagsMr: ['६ वर्षे → २ वर्षे कालावधी', 'नियंत्रित प्रकाश-तापमान कक्ष', 'जलद पिढी संक्रमण'],
      targetMetricEn: 'Gen. Turnover: 4–6 Generations / Year',
      targetMetricMr: 'पिढी आवर्तन: वर्षाला ४ ते ६ पिढ्या',
      leadUnitsEn: 'National Agricultural Research Project (NARP), Rahuri',
      leadUnitsMr: 'राष्ट्रीय कृषी संशोधन प्रकल्प (NARP), राहुरी',
      badgeGradient: 'from-amber-600 to-orange-700',
      bgLight: 'bg-amber-50/70',
      borderAccent: 'border-amber-200 hover:border-amber-400',
      iconBg: 'bg-amber-100 text-amber-800 border-amber-200',
      bulletColor: 'bg-[#b86e1b]',
      rowBg: 'bg-[#fef8ed]',
      textColor: 'text-[#92400e]'
    },
    {
      num: 3,
      en: 'Modern agricultural mechanization, robotics and automation',
      mr: 'आधुनिक कृषी यांत्रिकीकरण, रोबोटिक्स आणि ऑटोमेशन',
      clusterId: 'digital',
      clusterEn: 'Robotics & AI',
      clusterMr: 'रोबोटिक्स व एआय',
      icon: Wrench,
      descEn: 'Design and deployment of customized robotic harvesters, automated planters, and power weeders suited for smallholder farms.',
      descMr: 'मजुरांची टंचाई दूर करण्यासाठी स्वयंचलित कापणी यंत्रे, पेरणी यंत्रे व आंतरमशागत रोबोटिक्सची निर्मिती.',
      tagsEn: ['Autonomous Harvesters', 'Robotic Weeders & Planters', 'Custom Smallholder Tools'],
      tagsMr: ['स्वयंचलित कापणी यंत्रे', 'रोबोटिक खुरपणी व पेरणी', 'शेतकरी-स्नेही अवजारे'],
      targetMetricEn: 'Target: 40% Reduction in Labor Dependency',
      targetMetricMr: 'ध्येय: मजुरी अवलंबित्वात ४०% घट',
      leadUnitsEn: 'College of Agricultural Engineering & Technology (CAET), Rahuri',
      leadUnitsMr: 'कृषी अभियांत्रिकी व तंत्रज्ञान महाविद्यालय (CAET), राहुरी',
      badgeGradient: 'from-blue-600 to-indigo-700',
      bgLight: 'bg-blue-50/70',
      borderAccent: 'border-blue-200 hover:border-blue-400',
      iconBg: 'bg-blue-100 text-blue-800 border-blue-200',
      bulletColor: 'bg-[#2f6fb3]',
      rowBg: 'bg-[#edf4fb]',
      textColor: 'text-[#1e40af]'
    },
    {
      num: 4,
      en: 'Development of varieties tolerant to biotic and abiotic stresses',
      mr: 'जैविक व अजैविक ताण सहनशील पीक वाणांची निर्मिती',
      clusterId: 'genetics',
      clusterEn: 'Genetic Frontier',
      clusterMr: 'आनुवंशिक पैदास',
      icon: ShieldAlert,
      descEn: 'Genomic breeding and marker-assisted selection for multi-disease and multi-pest resistance in pulses, oilseeds, and vegetables.',
      descMr: 'कडधान्ये, गळीतधान्ये व भाजीपाल्यामध्ये कीड-रोग प्रतिकारक्षमतेसाठी मार्कर-असिस्टेड ब्रीडिंग.',
      tagsEn: ['Marker-Assisted Selection (MAS)', 'Pod Borer & Wilt Immunity', 'Genomic Stacking'],
      tagsMr: ['मार्कर-असिस्टेड पैदास', 'घाटे अळी व मर रोग प्रतिकार', 'जनुकीय ताण प्रतिकार'],
      targetMetricEn: 'Breeding Focus: Chickpea, Sorghum, Soybean, Onion',
      targetMetricMr: 'प्राधान्य पिके: हरभरा, ज्वारी, सोयाबीन, कांदा',
      leadUnitsEn: 'Sorghum Improvement Project & Biotechnology Centre',
      leadUnitsMr: 'ज्वारी सुधार प्रकल्प व जैवतंत्रज्ञान केंद्र',
      badgeGradient: 'from-purple-600 to-violet-800',
      bgLight: 'bg-purple-50/70',
      borderAccent: 'border-purple-200 hover:border-purple-400',
      iconBg: 'bg-purple-100 text-purple-800 border-purple-200',
      bulletColor: 'bg-[#74529f]',
      rowBg: 'bg-[#f5eefb]',
      textColor: 'text-[#5b21b6]'
    },
    {
      num: 5,
      en: 'Digital, smart and precision agriculture',
      mr: 'डिजिटल, स्मार्ट आणि काटेकोर (अचूक) शेती',
      clusterId: 'digital',
      clusterEn: 'Robotics & AI',
      clusterMr: 'रोबोटिक्स व एआय',
      icon: Cpu,
      descEn: 'Drone-assisted hyper-spectral crop health scanning, IoT automated weather stations, and mobile AI advisories for precision inputs.',
      descMr: 'कृषी ड्रोन, उपग्रह नकाशे, आयओटी (IoT) हवामान केंद्रे आणि ६२ विद्यापीठ मोबाईल अ‍ॅप्सचा विस्तार.',
      tagsEn: ['DGCA Drone Pilot Academy (RPTO)', 'Hyper-Spectral Remote Sensing', '62 University Mobile Apps'],
      tagsMr: ['DGCA मान्यताप्राप्त ड्रोन अकॅडमी', 'हायपर-स्पेक्ट्रल रिमोट सेन्सिंग', '६२ विद्यापीठ मोबाईल अ‍ॅप्स'],
      targetMetricEn: 'Coverage: 10 Lakh Farmers via AI Advisory',
      targetMetricMr: 'व्याप्ती: १० लाख शेतकऱ्यांना एआय अचूक सल्ला',
      leadUnitsEn: 'CAAST-CSAWM Center of Excellence',
      leadUnitsMr: 'कास्ट-सीसॉम (CAAST-CSAWM) उत्कृष्टता केंद्र',
      badgeGradient: 'from-teal-600 to-emerald-700',
      bgLight: 'bg-teal-50/70',
      borderAccent: 'border-teal-200 hover:border-teal-400',
      iconBg: 'bg-teal-100 text-teal-800 border-teal-200',
      bulletColor: 'bg-[#1f8279]',
      rowBg: 'bg-[#ebf8f6]',
      textColor: 'text-[#0f766e]'
    },
    {
      num: 6,
      en: 'Protected and controlled-environment farming',
      mr: 'संरक्षित व नियंत्रित वातावरण शेती तंत्रज्ञान',
      clusterId: 'digital',
      clusterEn: 'Robotics & AI',
      clusterMr: 'रोबोटिक्स व एआय',
      icon: Sun,
      descEn: 'Automated polyhouses, shade-net climate regulation, and soil-less hydroponic systems for high-value horticulture.',
      descMr: 'पॉलीहाऊस, शेडनेट आणि मातीविना (हायड्रोपोनिक्स) नियंत्रित वातावरणातील दर्जेदार भाजीपाला व फुलशेती.',
      tagsEn: ['Automated Climate Polyhouses', 'Soilless Hydroponics & Aeroponics', 'High-Value Floriculture'],
      tagsMr: ['स्वयंचलित हवामान पॉलीहाऊस', 'मातीविना हायड्रोपोनिक्स', 'निर्यातक्षम फलोत्पादन व फुलशेती'],
      targetMetricEn: 'Yield Boost: Up to 300% per unit land area',
      targetMetricMr: 'उत्पादकता: प्रति क्षेत्र ३००% पर्यंत वाढ',
      leadUnitsEn: 'Precision Farming Development Centre (PFDC), Rahuri',
      leadUnitsMr: 'काटेकोर शेती विकास केंद्र (PFDC), राहुरी',
      badgeGradient: 'from-rose-600 to-orange-700',
      bgLight: 'bg-rose-50/70',
      borderAccent: 'border-rose-200 hover:border-rose-400',
      iconBg: 'bg-rose-100 text-rose-800 border-rose-200',
      bulletColor: 'bg-[#b55845]',
      rowBg: 'bg-[#fdf2ef]',
      textColor: 'text-[#9a3412]'
    },
    {
      num: 7,
      en: 'Soil and water conservation in response to climate change',
      mr: 'हवामान बदलास अनुसरून मृद व जलसंधारण',
      clusterId: 'hydrology',
      clusterEn: 'Soil & Hydrology',
      clusterMr: 'मृद व जलसंधारण',
      icon: Droplets,
      descEn: 'Catchment watershed development, sub-surface drip irrigation, and rainwater micro-harvesting structures.',
      descMr: 'पाणलोट क्षेत्र विकास, जमिनीखालील ठिबक सिंचन आणि शेतात पडणाऱ्या प्रत्येक थेंबाचे संवर्धन.',
      tagsEn: ['Micro-Catchment Watersheds', 'Sub-Surface Drip (SSD)', 'Rainwater Micro-Harvesting'],
      tagsMr: ['पाणलोट क्षेत्र विकास', 'भूमिगत ठिबक सिंचन', 'पावसाच्या पाण्याचे सूक्ष्म-संवर्धन'],
      targetMetricEn: 'Water Use Efficiency: +35% Conservation',
      targetMetricMr: 'पाण्याची कार्यक्षमता: +३५% जलबचत',
      leadUnitsEn: 'Department of Soil & Water Conservation Engineering',
      leadUnitsMr: 'मृद व जलसंधारण अभियांत्रिकी विभाग',
      badgeGradient: 'from-emerald-700 to-cyan-800',
      bgLight: 'bg-emerald-50/70',
      borderAccent: 'border-emerald-200 hover:border-emerald-400',
      iconBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      bulletColor: 'bg-[#196b43]',
      rowBg: 'bg-[#edf7f1]',
      textColor: 'text-[#14532d]'
    },
    {
      num: 8,
      en: 'Management of saline, sodic and waterlogged soils',
      mr: 'खारवट, चोपण आणि पाणथळ जमिनींचे पुनर्वसन व व्यवस्थापन',
      clusterId: 'hydrology',
      clusterEn: 'Soil & Hydrology',
      clusterMr: 'मृद व जलसंधारण',
      icon: Sparkles,
      descEn: 'Sub-surface drainage (SSD) protocols and organic amendments for reclaiming degraded canal command tracts.',
      descMr: 'कालवा लाभक्षेत्रातील क्षारपड व पाणथळ जमिनींचे भूमिगत निचरा प्रणालीद्वारे पुनर्वसन.',
      tagsEn: ['Sub-Surface Drainage (SSD)', 'Canal Command Reclamation', 'Halophytic Soil Amendments'],
      tagsMr: ['भूमिगत निचरा प्रणाली (SSD)', 'कालवा लाभक्षेत्र पुनरुज्जीवन', 'सेंद्रिय भूसुधारके'],
      targetMetricEn: 'Reclamation Target: 25,000 Hectares Degraded Soils',
      targetMetricMr: 'ध्येय: २५,००० हेक्टर क्षारपड जमिनींचे पुनर्वसन',
      leadUnitsEn: 'Saline Water Use Scheme & Soil Chemistry Div.',
      leadUnitsMr: 'क्षारयुक्त पाणी वापर योजना व मृद रसायनशास्त्र विभाग',
      badgeGradient: 'from-amber-700 to-yellow-800',
      bgLight: 'bg-amber-50/70',
      borderAccent: 'border-amber-200 hover:border-amber-400',
      iconBg: 'bg-amber-100 text-amber-800 border-amber-200',
      bulletColor: 'bg-[#b86e1b]',
      rowBg: 'bg-[#fef8ed]',
      textColor: 'text-[#92400e]'
    },
    {
      num: 9,
      en: 'Integrated and efficient use of natural resources',
      mr: 'नैसर्गिक साधनसंपत्तीचा एकात्मिक व कार्यक्षम वापर',
      clusterId: 'hydrology',
      clusterEn: 'Soil & Hydrology',
      clusterMr: 'मृद व जलसंधारण',
      icon: Compass,
      descEn: 'Precision fertigation delivering nutrients directly to the root zone, reducing chemical fertilizer waste by 30%.',
      descMr: 'खतांचा आणि पाण्याचा काटेकोर वापर करून ३०% रासायनिक खतांची बचत व जमिनीचे आरोग्य रक्षण.',
      tagsEn: ['Precision Root Fertigation', '30% Chemical Waste Reduction', 'Soil Organic Carbon Augmentation'],
      tagsMr: ['काटेकोर मूळ-क्षेत्र फर्टिगेशन', '३०% रासायनिक खतांची बचत', 'सेंद्रिय कर्ब वृद्धी'],
      targetMetricEn: 'Nutrient Use Efficiency: +40% Optimal Delivery',
      targetMetricMr: 'खत कार्यक्षमता: +४०% अचूक पोषण',
      leadUnitsEn: 'Agronomy Research Farm, Central Campus Rahuri',
      leadUnitsMr: 'कृषिविज्ञान संशोधन प्रक्षेत्र, मध्यवर्ती आवार राहुरी',
      badgeGradient: 'from-blue-700 to-sky-800',
      bgLight: 'bg-blue-50/70',
      borderAccent: 'border-blue-200 hover:border-blue-400',
      iconBg: 'bg-blue-100 text-blue-800 border-blue-200',
      bulletColor: 'bg-[#2f6fb3]',
      rowBg: 'bg-[#edf4fb]',
      textColor: 'text-[#1e40af]'
    },
    {
      num: 10,
      en: 'Scientific validation of natural and organic farming',
      mr: 'सेंद्रिय व नैसर्गिक शेतीचे शास्त्रीय प्रमाणीकरण',
      clusterId: 'ecology',
      clusterEn: 'Agro-Ecology',
      clusterMr: 'शाश्वत शेती',
      icon: Leaf,
      descEn: 'Long-term scientific trials on desi cow formulations (Jeevamrit, Beejamrit) and soil carbon sequestration.',
      descMr: 'देशी गोमूत्र/शेण आधारित जिवामृत व बीजामृताचे मातीच्या सूक्ष्मजीवांवर होणाऱ्या परिणामांचे शास्त्रीय विश्लेषण.',
      tagsEn: ['Desi Cow Jeevamrit Trials', 'Microbiome & Soil Carbon Profiling', 'Pesticide-Free Standards'],
      tagsMr: ['देशी गोमूत्र/जिवामृत चाचण्या', 'सूक्ष्मजीव व माती कर्ब प्रमाणीकरण', 'विषमुक्त उत्पादन मानके'],
      targetMetricEn: 'Validation Network: 5-Year Multi-Crop Field Trials',
      targetMetricMr: 'प्रमाणीकरण: ५ वर्षांच्या सलग क्षेत्रीय बहुपीक चाचण्या',
      leadUnitsEn: 'Center of Excellence on Natural Farming, Rahuri',
      leadUnitsMr: 'नैसर्गिक शेती उत्कृष्टता केंद्र, राहुरी',
      badgeGradient: 'from-purple-700 to-indigo-800',
      bgLight: 'bg-purple-50/70',
      borderAccent: 'border-purple-200 hover:border-purple-400',
      iconBg: 'bg-purple-100 text-purple-800 border-purple-200',
      bulletColor: 'bg-[#74529f]',
      rowBg: 'bg-[#f5eefb]',
      textColor: 'text-[#5b21b6]'
    },
    {
      num: 11,
      en: 'Development of integrated farming systems',
      mr: 'एकात्मिक शेती पद्धती (IFS) मॉडेल्सचा विकास',
      clusterId: 'ecology',
      clusterEn: 'Agro-Ecology',
      clusterMr: 'शाश्वत शेती',
      icon: Boxes,
      descEn: 'Synergistic 1-hectare models combining field crops, dairy (Phule Triveni), goatry, poultry, and vermicompost.',
      descMr: 'अल्पभूधारक शेतकऱ्यांसाठी पीक, दुग्धव्यवसाय, शेळीपालन व गांडूळखत यांचे शाश्वत १ हेक्टर मॉडेल.',
      tagsEn: ['Phule Triveni Dairy Integration', '1-Hectare Circular Economy Model', 'Smallholder Sustainable Net Income'],
      tagsMr: ['फुले त्रिवेणी दुग्ध व्यवसाय एकत्रीकरण', '१ हेक्टर चक्रीय शेती मॉडेल', 'अल्पभूधारकांसाठी शाश्वत उत्पन्न'],
      targetMetricEn: 'Income Security: ₹3.5 Lakh Net Profit / Ha / Year',
      targetMetricMr: 'उत्पन्न सुरक्षा: ₹३.५ लाख निव्वळ नफा / हेक्टर / वर्ष',
      leadUnitsEn: 'All India Coordinated Research Project on IFS, Rahuri',
      leadUnitsMr: 'अखिल भारतीय समन्वित एकात्मिक शेती पद्धती प्रकल्प (IFS)',
      badgeGradient: 'from-teal-700 to-emerald-800',
      bgLight: 'bg-teal-50/70',
      borderAccent: 'border-teal-200 hover:border-teal-400',
      iconBg: 'bg-teal-100 text-teal-800 border-teal-200',
      bulletColor: 'bg-[#1f8279]',
      rowBg: 'bg-[#ebf8f6]',
      textColor: 'text-[#0f766e]'
    },
    {
      num: 12,
      en: 'Conservation and enhancement of biodiversity',
      mr: 'कृषी जैवविविधतेचे संवर्धन व मूल्यवर्धन',
      clusterId: 'ecology',
      clusterEn: 'Agro-Ecology',
      clusterMr: 'शाश्वत शेती',
      icon: Globe2,
      descEn: 'Preserving wild landraces, traditional heirloom seeds, and pure livestock breeds (Khillar, Osmanabadi, Deccani).',
      descMr: 'स्थानिक दुर्मीळ बियाणे, रानभाज्या आणि शुद्ध देशी पशुधनाच्या जातींचे (खिल्लार, उस्मानाबादी, दख्खनी) संवर्धन.',
      tagsEn: ['270+ Varieties Genetic Vault', 'Indigenous Breeds (Khillar, Osmanabadi)', 'Wild Landraces & Traditional Seeds'],
      tagsMr: ['२७०+ वाणांचे जनुक बँक संरक्षण', 'देशी पशुधन (खिल्लार, उस्मानाबादी)', 'रानभाज्या व पारंपरिक बियाणे संवर्धन'],
      targetMetricEn: 'Registry: 1,500+ Landrace Accessions Conserved',
      targetMetricMr: 'नोंदणी: १,५००+ स्थानिक वाण व जनुकीय नमुने',
      leadUnitsEn: 'Botany Section & Livestock Research Station',
      leadUnitsMr: 'वनस्पतीशास्त्र विभाग व पशुधन संशोधन केंद्र',
      badgeGradient: 'from-rose-700 to-red-800',
      bgLight: 'bg-rose-50/70',
      borderAccent: 'border-rose-200 hover:border-rose-400',
      iconBg: 'bg-rose-100 text-rose-800 border-rose-200',
      bulletColor: 'bg-[#b55845]',
      rowBg: 'bg-[#fdf2ef]',
      textColor: 'text-[#9a3412]'
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
      milestoneEn: 'Target: Zero chemical residue compliance in Scarcity belts.',
      milestoneMr: 'लक्ष्य: अवर्षण पट्ट्यात विषमुक्त व सेंद्रिय शेती मॉडेल्सचा प्रसार.'
    }
  ];

  // 3. Decadal Milestones Roadmap (2025–2035)
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

  // Filtering Logic
  const filteredPriorities = tenYearPriorities.filter((item) => {
    const matchesCluster = activeCluster === 'all' || item.clusterId === activeCluster;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCluster;
    const matchesQuery =
      item.en.toLowerCase().includes(query) ||
      item.mr.toLowerCase().includes(query) ||
      item.descEn.toLowerCase().includes(query) ||
      item.descMr.toLowerCase().includes(query) ||
      item.tagsEn.some((t: string) => t.toLowerCase().includes(query)) ||
      item.tagsMr.some((t: string) => t.toLowerCase().includes(query)) ||
      item.targetMetricEn.toLowerCase().includes(query) ||
      item.leadUnitsEn.toLowerCase().includes(query) ||
      String(item.num) === query;
    return matchesCluster && matchesQuery;
  });

  const clusterCounts = {
    all: tenYearPriorities.length,
    genetics: tenYearPriorities.filter((p) => p.clusterId === 'genetics').length,
    digital: tenYearPriorities.filter((p) => p.clusterId === 'digital').length,
    hydrology: tenYearPriorities.filter((p) => p.clusterId === 'hydrology').length,
    ecology: tenYearPriorities.filter((p) => p.clusterId === 'ecology').length
  };

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: 'Thrust Areas', mr: 'संशोधन प्राधान्यक्रम' }} />

      <ResearchHero
        theme="thrust"
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

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-8 sm:space-y-10">

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
        {/* 2. THE 12 PRIORITIES SHOWCASE: REDESIGNED EXECUTIVE DASHBOARD     */}
        {/* ================================================================= */}
        <section className="space-y-6">

          {/* Section Header Banner with Decadal Plaque Styling */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c3823] via-[#14532d] to-[#062c19] text-white border border-emerald-700/50 shadow-md relative overflow-hidden">
            {/* Ambient Background Decorative Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'mr' ? 'संशोधन संचालनालय • १० वर्षांचा प्राधान्यक्रम' : 'Directorate of Research • Decadal Mandate 2025–2035'}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif tracking-tight leading-tight">
                  {language === 'mr' ? 'आगामी दहा वर्षांसाठी संशोधन प्राधान्यक्रम' : 'Research Priorities for the Next Ten Years'}
                </h2>

                <p className="text-xs sm:text-sm md:text-[14px] text-emerald-100/90 leading-relaxed font-normal">
                  {language === 'mr'
                    ? 'महाराष्ट्र शासनाच्या कृषी धोरण व आयसीएआर (ICAR) मार्गदर्शक तत्त्वांनुसार पश्चिम महाराष्ट्रातील १० जिल्ह्यांतील शेतीसाठी १२ प्रमुख मिशन-मोड संशोधन उद्दिष्टे.'
                    : 'Twelve transformative decadal research priorities guiding MPKV across climate adaptation, genomic speed breeding, automated robotics, precision hydrology, and farmer income.'}
                </p>
              </div>

              {/* View Switcher Controls */}
              <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center shrink-0">
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/30 border border-white/15 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setViewMode('bento')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      viewMode === 'bento'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-emerald-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>{language === 'mr' ? 'कार्ड मॅट्रिक्स' : 'Strategic Cards'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('board')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      viewMode === 'board'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-emerald-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <ListOrdered className="w-4 h-4" />
                    <span>{language === 'mr' ? 'रोडमॅप रो (Blueprint)' : 'Blueprint Horizon'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Filter Bar: Domain Chips & Fast Search */}
            <div className="relative z-10 pt-6 mt-6 border-t border-emerald-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Domain Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-emerald-200/70 uppercase tracking-wider mr-1 hidden sm:inline-block">
                  {language === 'mr' ? 'स्तंभ निवडा:' : 'Filter Domain:'}
                </span>

                {[
                  { id: 'all', labelEn: 'All 12 Priorities', labelMr: 'सर्व १२ प्राधान्यक्रम', count: clusterCounts.all },
                  { id: 'genetics', labelEn: 'Genetics & Breeding', labelMr: 'आनुवंशिकी व पैदास', count: clusterCounts.genetics },
                  { id: 'digital', labelEn: 'Robotics & Precision', labelMr: 'रोबोटिक्स व अचूक शेती', count: clusterCounts.digital },
                  { id: 'hydrology', labelEn: 'Soil & Water Hydrology', labelMr: 'मृद व जलविज्ञान', count: clusterCounts.hydrology },
                  { id: 'ecology', labelEn: 'Agro-Ecology & Systems', labelMr: 'शाश्वत शेती व परिसंस्था', count: clusterCounts.ecology }
                ].map((chip) => {
                  const isActive = activeCluster === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => setActiveCluster(chip.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-white text-emerald-950 shadow-xs font-bold scale-[1.02]'
                          : 'bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/10'
                      }`}
                    >
                      <span>{language === 'mr' ? chip.labelMr : chip.labelEn}</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-emerald-900 text-white' : 'bg-black/30 text-emerald-200'
                      }`}>
                        {chip.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Fast Search Input */}
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-emerald-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'mr' ? 'शोध (उदा. ड्रोन, ब्रीडिंग, जल)...' : 'Search priorities (e.g. drone, water)...'}
                  className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-black/30 border border-emerald-500/40 text-xs text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Fallback when no search results */}
          {filteredPriorities.length === 0 && (
            <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 space-y-3">
              <SlidersHorizontal className="w-10 h-10 text-stone-400 mx-auto" />
              <div className="text-base font-bold text-slate-800">
                {language === 'mr' ? 'कोणताही प्राधान्यक्रम सापडला नाही' : 'No priorities match your search'}
              </div>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {language === 'mr' ? 'कृपया शोध शब्द तपासा किंवा सर्व प्राधान्यक्रम फिल्टर निवडा.' : 'Please clear your search query or switch back to "All 12 Priorities".'}
              </p>
              <button
                type="button"
                onClick={() => { setActiveCluster('all'); setSearchQuery(''); }}
                className="px-4 py-1.5 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                {language === 'mr' ? 'सर्व प्राधान्यक्रम पहा' : 'View All 12 Priorities'}
              </button>
            </div>
          )}

          {/* =============================================================== */}
          {/* VIEW MODE 1: MATRIX STRATEGIC CARDS                             */}
          {/* =============================================================== */}
          {viewMode === 'bento' && filteredPriorities.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-1">
              {filteredPriorities.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.num}
                    onClick={() => setSelectedPriority(item)}
                    className={`relative p-6 rounded-3xl bg-white border ${item.borderAccent} shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer overflow-hidden`}
                  >
                    {/* Watermark Pillar Number */}
                    <span className="absolute -bottom-4 -right-2 text-7xl sm:text-8xl font-black text-stone-100 select-none pointer-events-none transition-transform group-hover:scale-105 group-hover:text-stone-200/70 font-mono">
                      {String(item.num).padStart(2, '0')}
                    </span>

                    <div className="space-y-4 relative z-10">
                      {/* Top Row: Number Capsule, Domain Tag, Icon */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`px-2.5 py-1 rounded-xl bg-gradient-to-r ${item.badgeGradient} text-white font-extrabold text-xs shadow-xs font-mono`}>
                            #{String(item.num).padStart(2, '0')}
                          </div>
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 border border-stone-200 tracking-wider">
                            {language === 'mr' ? item.clusterMr : item.clusterEn}
                          </span>
                        </div>

                        <div className={`p-2.5 rounded-2xl ${item.iconBg} border group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xs`}>
                          <Icon className="w-4 h-4 shrink-0" />
                        </div>
                      </div>

                      {/* Main Title & Bilingual Counterpart */}
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug group-hover:text-emerald-950 transition-colors">
                          {language === 'mr' ? item.mr : item.en}
                        </h3>
                        <p className="text-xs font-medium text-stone-500 leading-tight">
                          {language === 'mr' ? item.en : item.mr}
                        </p>
                      </div>

                      {/* Scientific Directive Narrative */}
                      <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                        {language === 'mr' ? item.descMr : item.descEn}
                      </p>

                      {/* Technical Deliverables Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(language === 'mr' ? item.tagsMr : item.tagsEn).map((tag: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-50 text-stone-700 border border-stone-200/80"
                          >
                            • {tag}
                          </span>
                        ))}
                      </div>

                      {/* Target Impact Metric Callout */}
                      <div className="p-2.5 rounded-xl bg-[#f4f7f2] border-l-3 border-emerald-600 flex items-center justify-between text-xs font-semibold text-emerald-950">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>{language === 'mr' ? item.targetMetricMr : item.targetMetricEn}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Footer: Lead Research Division */}
                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs relative z-10">
                      <span className="text-[11px] font-semibold text-stone-500 truncate max-w-[190px]">
                        {language === 'mr' ? item.leadUnitsMr : item.leadUnitsEn}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-emerald-800 group-hover:translate-x-1 transition-transform shrink-0">
                        <span>{language === 'mr' ? 'सविस्तर पहा' : 'View Scope'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* =============================================================== */}
          {/* VIEW MODE 2: REDESIGNED DECADAL BLUEPRINT (REPLACES OLD IMAGE)  */}
          {/* =============================================================== */}
          {viewMode === 'board' && filteredPriorities.length > 0 && (
            <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-8">
              
              {/* Graphic Title Header matching Presentation Slide */}
              <div className="text-center space-y-2 pb-2">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#196b43] uppercase tracking-wide font-sans">
                  {language === 'mr' ? 'संशोधन प्राधान्यक्रम' : 'RESEARCH PRIORITIES'}
                </h3>
                <div className="text-xs sm:text-sm md:text-base font-bold text-[#b86e1b] uppercase tracking-widest font-sans">
                  {language === 'mr' ? 'आगामी दहा वर्षांसाठी (२०२५–२०३५)' : 'FOR THE NEXT TEN YEARS'}
                </div>
              </div>

              {/* Redesigned Presentation Rows Stack */}
              <div className="space-y-3 max-w-[1240px] mx-auto">
                {filteredPriorities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.num}
                      onClick={() => setSelectedPriority(item)}
                      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-3.5 md:p-4 rounded-xl ${item.rowBg} hover:shadow-md hover:scale-[1.008] transition-all duration-200 cursor-pointer border border-transparent hover:border-stone-300/80`}
                    >
                      {/* Left Block: Iconic Bullet Capsule with Center Circle */}
                      <div className="flex items-center gap-3.5 sm:gap-4 shrink-0 flex-1 min-w-0">
                        <div
                          className={`w-14 sm:w-16 h-8 sm:h-9 rounded-lg ${item.bulletColor} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                          title={`Priority #${item.num}`}
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-2xs" />
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="text-sm sm:text-base md:text-[16px] font-bold text-stone-900 group-hover:text-emerald-950 transition-colors leading-snug">
                            {language === 'mr' ? item.mr : item.en}
                          </h4>
                          <div className="text-xs text-stone-500 font-medium">
                            {language === 'mr' ? item.en : item.mr}
                          </div>
                        </div>
                      </div>

                      {/* Right Block: Domain Badge & Explore Trigger */}
                      <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/5">
                        <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/90 text-stone-700 border border-stone-200/80 shadow-2xs">
                          {language === 'mr' ? item.clusterMr : item.clusterEn}
                        </span>
                        <div className="px-3 py-1 rounded-lg bg-white/80 text-emerald-900 border border-emerald-200/80 text-xs font-semibold shadow-2xs hidden md:flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{language === 'mr' ? item.targetMetricMr : item.targetMetricEn}</span>
                        </div>
                        <span className="p-1 rounded-lg bg-white/90 group-hover:bg-emerald-900 group-hover:text-white text-stone-600 transition-colors shrink-0">
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Informative Footer Bar */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
                <span>
                  {language === 'mr'
                    ? 'प्रत्येक प्राधान्यक्रमाच्या वैज्ञानिक उद्दिष्टे व अंमलबजावणीसाठी ओळीवर क्लिक करा.'
                    : 'Click any priority row to open the complete scientific dossier, targets, and lead divisions.'}
                </span>
                <span className="font-semibold text-emerald-800">
                  {language === 'mr' ? 'महात्मा फुले कृषी विद्यापीठ, राहुरी' : 'Mahatma Phule Krishi Vidyapeeth, Rahuri'}
                </span>
              </div>
            </div>
          )}

        </section>

        {/* ================================================================= */}
        {/* INTERACTIVE DOSSIER MODAL FOR SELECTED PRIORITY                   */}
        {/* ================================================================= */}
        {selectedPriority && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedPriority(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1.5 rounded-xl bg-gradient-to-r ${selectedPriority.badgeGradient} text-white font-black text-sm font-mono shadow-xs`}>
                    Pillar #{String(selectedPriority.num).padStart(2, '0')}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                      {language === 'mr' ? selectedPriority.clusterMr : selectedPriority.clusterEn}
                    </span>
                    <div className="text-xs text-stone-500 font-semibold mt-0.5">
                      MPKV Directorate of Research • 2025–2035 Horizon
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPriority(null)}
                  className="p-2 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-snug">
                    {language === 'mr' ? selectedPriority.mr : selectedPriority.en}
                  </h3>
                  <div className="text-sm font-medium text-emerald-800 mt-1">
                    {language === 'mr' ? selectedPriority.en : selectedPriority.mr}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    {language === 'mr' ? 'संशोधन उद्दिष्ट व वैज्ञानिक दिशा' : 'Scientific Scope & Mission Statement'}
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {language === 'mr' ? selectedPriority.descMr : selectedPriority.descEn}
                  </p>
                </div>

                {/* Key Technical Deliverables */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    {language === 'mr' ? 'प्रमुख तंत्रज्ञान निष्पत्ती (Deliverables)' : 'Key Technical Deliverables'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(language === 'mr' ? selectedPriority.tagsMr : selectedPriority.tagsEn).map((tag: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200 text-xs font-semibold flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Impact Metric */}
                <div className="p-3.5 rounded-2xl bg-[#edf7f1] border border-emerald-200 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-900">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'mr' ? selectedPriority.targetMetricMr : selectedPriority.targetMetricEn}</span>
                  </div>
                  <span className="text-[11px] font-mono uppercase text-emerald-700">Decadal Target</span>
                </div>

                {/* Lead Research Divisions */}
                <div className="flex items-center justify-between text-xs font-semibold text-stone-600 pt-2 border-t border-stone-100">
                  <span>{language === 'mr' ? 'अंमलबजावणी शाखा:' : 'Lead Research Center:'}</span>
                  <span className="text-slate-900 font-bold">
                    {language === 'mr' ? selectedPriority.leadUnitsMr : selectedPriority.leadUnitsEn}
                  </span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPriority(null)}
                  className="px-5 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  {language === 'mr' ? 'बंद करा' : 'Close Dossier'}
                </button>
              </div>
            </div>
          </div>
        )}

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
