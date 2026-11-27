'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { printElement } from '@/utils/printElement';
import {
  Home,
  ChevronRight,
  Sparkles,
  Building2,
  GraduationCap,
  Award,
  Microscope,
  Users,
  BookOpen,
  MapPin,
  Compass,
  ShieldCheck,
  Sprout,
  Trophy,
  Globe,
  Layers,
  CheckCircle2,
  ArrowRight,
  Printer,
  Search,
  Calendar,
  ExternalLink,
  Star,
  Target,
  Landmark,
  Quote,
  Trees,
  Filter,
  FileCheck
} from 'lucide-react';

interface MpkvAtAGlanceViewProps {
  pageData?: any;
}

export const MpkvAtAGlanceView: React.FC<MpkvAtAGlanceViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'history' | 'jurisdiction' | 'pillars' | 'mandate' | 'awards'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Key Executive Metrics
  const coreStats = [
    {
      value: '116.67',
      unit: language === 'mr' ? 'लाख हेक्टर' : 'Lakh Ha',
      label: { en: 'Geographical Jurisdiction (38% of State)', mr: 'भौगोलिक कार्यक्षेत्र (राज्याच्या ३८% क्षेत्र)' },
      sub: { en: 'Across 10 Western Maharashtra districts', mr: 'पश्चिम महाराष्ट्रातील १० जिल्ह्यांत विस्तार' },
      icon: Compass,
      color: 'from-emerald-700 to-teal-800',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    },
    {
      value: '10',
      unit: language === 'mr' ? 'जिल्हे' : 'Districts',
      label: { en: 'Western Maharashtra Districts', mr: 'पश्चिम महाराष्ट्रातील कार्यक्षेत्र जिल्हे' },
      sub: { en: 'Nandurbar, Dhule, Jalgaon to Kolhapur', mr: 'नंदुरबार, धुळे, जळगाव ते कोल्हापूर' },
      icon: MapPin,
      color: 'from-amber-600 to-amber-800',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      value: '5',
      unit: language === 'mr' ? 'हवामान विभाग' : 'Agro-Zones',
      label: { en: 'Distinct Agro-Climatic Zones', mr: 'वैविध्यपूर्ण कृषी हवामान विभाग' },
      sub: { en: 'Scarcity, Plain, Sub-Montane, Ghat & Plateau', mr: 'अवर्षण, मैदानी, उप-पर्वतीय, घाट व पठारी' },
      icon: Trees,
      color: 'from-teal-700 to-emerald-900',
      badgeBg: 'bg-teal-100 text-teal-900 border-teal-300'
    },
    {
      value: '27',
      unit: language === 'mr' ? 'संशोधन केंद्रे' : 'Stations',
      label: { en: 'Agro-Research Stations', mr: 'कृषी संशोधन केंद्रे' },
      sub: { en: 'Including 4 State Crop Special Stations', mr: '४ राज्यस्तरीय पीक विशेष संशोधन केंद्रांसह' },
      icon: Microscope,
      color: 'from-sky-700 to-blue-900',
      badgeBg: 'bg-sky-100 text-sky-900 border-sky-300'
    },
    {
      value: '270+',
      unit: language === 'mr' ? 'वाण' : 'Varieties',
      label: { en: 'High-Yielding Crop Varieties', mr: 'उच्चोत्पादक पीक वाण विकसित' },
      sub: { en: '1,577+ Technologies & 39 Implements', mr: '१,५७७+ तंत्रज्ञान शिफारशी व ३९ कृषी अवजारे' },
      icon: Sprout,
      color: 'from-emerald-800 to-green-950',
      badgeBg: 'bg-green-100 text-green-900 border-green-300'
    },
    {
      value: '17',
      unit: language === 'mr' ? 'केव्हीके' : 'KVKs',
      label: { en: 'Krishi Vigyan Kendras', mr: 'कृषी विज्ञान केंद्रे (केव्हीके)' },
      sub: { en: '4 University + 13 Partner Kendra Networks', mr: '४ विद्यापीठ + १३ संलग्न संस्था केंद्रे' },
      icon: Users,
      color: 'from-stone-700 to-stone-900',
      badgeBg: 'bg-stone-200 text-stone-900 border-stone-300'
    }
  ];

  // 2. Five Agro-Climatic Zones
  const agroClimaticZones = [
    {
      id: 'scarcity',
      num: '01',
      title: { en: 'Scarcity Zone of Western Maharashtra', mr: 'पश्चिम महाराष्ट्र अवर्षण प्रवण विभाग' },
      districts: { en: 'Solapur, Ahmednagar (parts), Pune (east), Satara (east), Sangli (east), Dhule', mr: 'सोलापूर, अहिल्यानगर (काही भाग), पुणे (पूर्व), सातारा (पूर्व), सांगली (पूर्व), धुळे' },
      climate: { en: 'Low & uncertain rainfall (under 500-750 mm), high summer temperatures, prone to recurrent droughts', mr: 'कमी व अनिश्चित पाऊस (५००-७५० मिमी), उन्हाळ्यात तीव्र उष्णता, वारंवार दुष्काळाची शक्यता' },
      soils: { en: 'Shallow to very deep black vertisols with high moisture retention capacity', mr: 'उथळ ते अतिशय खोल काळी कसदार जमीन (काळी माती), ओलावा टिकवून ठेवणारी' },
      crops: { en: 'Rabi Sorghum (Jowar), Pearl Millet (Bajra), Chickpea, Pigeonpea, Pomegranate, Ber, Dragon fruit', mr: 'रब्बी ज्वारी (मालदांडी), बाजरी, हरभरा, तूर, डाळिंब, बोर, कोरडवाहू फळे' },
      keyStation: { en: 'Zonal Agricultural Research Station (ZARS), Solapur', mr: 'विभागीय कृषी संशोधन केंद्र (ZARS), सोलापूर' },
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300'
    },
    {
      id: 'plain',
      num: '02',
      title: { en: 'Plain Zone of Western Maharashtra', mr: 'पश्चिम महाराष्ट्र मैदानी विभाग' },
      districts: { en: 'Pune (central), Ahmednagar (command areas), Satara, Kolhapur (valleys), Sangli (Krishna basin)', mr: 'पुणे (मध्य), अहिल्यानगर (प्रकल्प क्षेत्र), सातारा, कोल्हापूर (नदीखोरे), सांगली (कृष्णा खोरे)' },
      climate: { en: 'Moderate rainfall (750-1000 mm), assured irrigation through canals, dams and wells', mr: 'मध्यम पाऊस (७५०-१००० मिमी), कालवे, धरणे व विहिरींद्वारे खात्रीशीर सिंचन सुविधा' },
      soils: { en: 'Medium to deep fertile alluvial black soils along major river basins', mr: 'नद्यांच्या खोऱ्यातील गाळाची मध्यम ते खोल अतिशय सुपीक काळी जमीन' },
      crops: { en: 'Sugarcane, Wheat, Soybean, Vegetables, Grapes, Pomegranate, Banana, Floriculture', mr: 'ऊस, गहू, सोयाबीन, भाजीपाला पिके, द्राक्षे, डाळिंब, केळी, फूलशेती' },
      keyStation: { en: 'Central Campus Rahuri & College of Agriculture, Pune', mr: 'मध्यवर्ती परिसर राहुरी व कृषी महाविद्यालय, पुणे' },
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300'
    },
    {
      id: 'sub-montane',
      num: '03',
      title: { en: 'Sub-Montane Zone of Maharashtra', mr: 'महाराष्ट्र उप-पर्वतीय / मध्यम पर्जन्य विभाग' },
      districts: { en: 'Kolhapur, Satara (west), Pune (west), Nashik (slopes)', mr: 'कोल्हापूर, सातारा (पश्चिम), पुणे (पश्चिम), नाशिक (सह्याद्री उताराचा पट्टा)' },
      climate: { en: 'Assured rainfall (1000-2500 mm), pleasant humid subtropical climate', mr: 'खात्रीशीर पर्जन्यमान (१०००-२५०० मिमी), आल्हाददायक व दमट हवामान' },
      soils: { en: 'Reddish brown to medium black fertile loamy soils with good drainage', mr: 'तांबूस तपकिरी ते मध्यम काळी उत्तम निचऱ्याची कसदार जमीन' },
      crops: { en: 'Paddy (Rice), Groundnut, Soybean, Sugarcane, Turmeric, Ginger, Sweet corn', mr: 'भात, भुईमूग, सोयाबीन, ऊस, हळद, आले, स्वीटकॉर्न' },
      keyStation: { en: 'Regional Agricultural Research Station (RARS), Shenda Park, Kolhapur', mr: 'विभागीय कृषी संशोधन केंद्र, शेंडा पार्क, कोल्हापूर' },
      badgeColor: 'bg-teal-100 text-teal-950 border-teal-300'
    },
    {
      id: 'western-ghats',
      num: '04',
      title: { en: 'Western Ghat Zone', mr: 'पश्चिम घाट विभाग' },
      districts: { en: 'High altitude ghats of Mahabaleshwar, Igatpuri, Radhanagari, Peint, Surgana', mr: 'महाबळेश्वर, इगतपुरी, राधानगरी, पेठ, सुरगाणा सह्याद्री घाटमाथा परिसर' },
      climate: { en: 'Heavy to extremely heavy rainfall (3000-5000+ mm), cool misty weather', mr: 'मुसळधार ते अतिवृष्टी (३०००-५०००+ मिमी), थंड, धुक्याचे व आल्हाददायक हवामान' },
      soils: { en: 'Laterite and lateritic acidic soils rich in organic matter but deficient in phosphorus', mr: 'सेंद्रिय कर्बयुक्त जांभी व आम्लधर्मीय जमीन' },
      crops: { en: 'Hill Millets (Finger millet / Nachani, Proso millet), High-altitude Paddy, Strawberry, Sub-tropical fruits', mr: 'डोंगरी तृणधान्ये (नाचणी, वरी), खरीप भात, स्ट्रॉबेरी, उपोष्ण कटिबंधीय फळे' },
      keyStation: { en: 'Wheat Rust Research Station, Mahabaleshwar & ARS, Igatpuri', mr: 'गहू तांबेरा संशोधन केंद्र, महाबळेश्वर व कृषी संशोधन केंद्र, इगतपुरी' },
      badgeColor: 'bg-sky-100 text-sky-950 border-sky-300'
    },
    {
      id: 'central-plateau',
      num: '05',
      title: { en: 'Central Plateau Zone', mr: 'मध्य पठारी विभाग (खानदेश)' },
      districts: { en: 'Jalgaon, Dhule, Nandurbar (Tapi and Satpuda valley)', mr: 'जळगाव, धुळे, नंदुरबार (तापी खोरे व सातपुडा पायथा परिसर)' },
      climate: { en: 'Dry tropical climate, extreme summer heat (up to 45°C), moderate rainfall (700-900 mm)', mr: 'उष्ण व कोरडे हवामान, कडक उन्हाळा (४५°से पर्यंत), मध्यम पर्जन्य (७००-९०० मिमी)' },
      soils: { en: 'Deep alluvial black clayey soils (Tapi basin) and light soils on Satpuda foothills', mr: 'तापी खोऱ्यातील अतिशय खोल काळी गाळाची जमीन व सातपुडा पायथ्याची हलकी जमीन' },
      crops: { en: 'Cotton, Banana, Sorghum, Maize, Pigeonpea, Green gram, Black gram, Papaya', mr: 'कापूस, केळी, ज्वारी, मका, तूर, मूग, उडीद, पपई' },
      keyStation: { en: 'Cotton Research Station, Jalgaon & ARS, Dhule', mr: 'कापूस संशोधन केंद्र, जळगाव व कृषी संशोधन केंद्र, धुळे' },
      badgeColor: 'bg-indigo-100 text-indigo-950 border-indigo-300'
    }
  ];

  // 3. Tri-Fold Pillars
  const universityPillars = [
    {
      id: 'education',
      title: { en: 'Agricultural Education', mr: 'कृषी शिक्षण दालन' },
      subtitle: { en: 'Producing world-class human resources from Diploma to Doctoral studies', mr: 'पदविका ते आचार्य पदवीपर्यंत जागतिक दर्जाचे कृषी मनुष्यबळ घडवणारे दालन' },
      icon: GraduationCap,
      headerBg: 'bg-emerald-50 border-emerald-200',
      iconBg: 'bg-emerald-800 text-white',
      accentColor: 'text-emerald-800',
      highlights: [
        {
          en: '7 Constituent Colleges of Agricultural Sciences (Pune, Kolhapur, Dhule, Nandurbar, Karad, Muktainagar, Halgaon).',
          mr: '७ घटक कृषी विज्ञान महाविद्यालये (पुणे, कोल्हापूर, धुळे, नंदुरबार, कराड, मुक्ताईनगर, हळगाव).'
        },
        {
          en: 'AICTE Accredited Dr. Annasaheb Shinde College of Agricultural Engineering & Technology, Rahuri and College of Horticulture, Pune.',
          mr: 'एआयसीटीई (AICTE) मान्यताप्राप्त डॉ. अण्णासाहेब शिंदे कृषी अभियांत्रिकी व तंत्रज्ञान महाविद्यालय, राहुरी आणि उद्यानविद्या महाविद्यालय, पुणे.'
        },
        {
          en: '63 Affiliated Colleges governed academically across agriculture, engineering, food technology, biotechnology, and agri-business management.',
          mr: 'कृषी, अभियांत्रिकी, अन्नतंत्रज्ञान, जैवतंत्रज्ञान व कृषी व्यवसाय व्यवस्थापनातील ६३ संलग्न महाविद्यालये.'
        },
        {
          en: 'Combined Undergraduate Intake Capacity of 5,574 students across all faculties.',
          mr: 'पदवी स्तरावर सर्व विद्याशाखा मिळून एकूण ५,५७४ विद्यार्थ्यांची वार्षिक प्रवेश क्षमता.'
        },
        {
          en: 'Post Graduate Institute (PGI) at Central Campus Rahuri with PG & Ph.D. wings at Pune, Kolhapur, and Dhule (Combined Intake: 375).',
          mr: 'राहुरी मुख्य संकुलातील पदव्युत्तर संस्था (PGI) तसेच पुणे, कोल्हापूर व धुळे येथील पदव्युत्तर केंद्रे (एकूण प्रवेश क्षमता: ३७५).'
        },
        {
          en: 'World Bank-ICAR sponsored CAAST-CSAWM Centre of Excellence for Climate Smart Agriculture & Water Management.',
          mr: 'जागतिक बँक व आयसीएआर प्रायोजित हवामान अनुकूल शेती व जल व्यवस्थापन उत्कृष्टता केंद्र (CAAST-CSAWM).'
        },
        {
          en: '9 Constituent & 76 Affiliated Agricultural Technology Schools (ATS) offering 2-Year Diploma with 4,140 student intake.',
          mr: '९ घटक व ७६ संलग्न कृषी तंत्र विद्यालये (ATS) - ४,१४० प्रवेश क्षमतेसह २ वर्षीय कृषी पदविका.'
        }
      ]
    },
    {
      id: 'research',
      title: { en: 'Agricultural Research', mr: 'कृषी संशोधन दालन' },
      subtitle: { en: 'Transforming agricultural productivity through location-specific technologies', mr: 'स्थानिक गरजांवर आधारित संशोधनातून शेतीची उत्पादकता वाढवणारे दालन' },
      icon: Microscope,
      headerBg: 'bg-teal-50 border-teal-200',
      iconBg: 'bg-teal-800 text-white',
      accentColor: 'text-teal-800',
      highlights: [
        {
          en: '27 strategically located Research Stations operating across all 5 diverse agro-climatic zones of Western Maharashtra.',
          mr: 'पश्चिम महाराष्ट्रातील ५ कृषी हवामान विभागांत कार्यरत २७ धोरणात्मक कृषी संशोधन केंद्रे.'
        },
        {
          en: '4 State-Level Crop Special Research Stations: Padegaon (Sugarcane), Mahabaleshwar (Wheat Rust), Jalgaon (Cotton), Pimpalgaon Baswant (Onion & Grapes).',
          mr: '४ राज्यस्तरीय पीक विशेष केंद्रे: पाडेगाव (ऊस), महाबळेश्वर (गहू तांबेरा), जळगाव (कापूस), पिंपळगाव बसवंत (कांदा व द्राक्ष).'
        },
        {
          en: '270+ improved high-yielding crop varieties and hybrids released for field crops, horticulture, and commercial agriculture.',
          mr: 'अन्नधान्य, कडधान्ये, गळीत धान्ये, ऊस, फळझाडे व भाजीपाला पिकांचे २७० हून अधिक सुधारित व संकरित वाण प्रसारित.'
        },
        {
          en: '1,577+ scientific research recommendations and farm technologies endorsed by Joint AGRESCO for farming communities.',
          mr: 'संयुक्त कृषी संशोधन परिषदेने (Joint AGRESCO) शेतकऱ्यांसाठी शिफारस केलेली १,५७७ हून अधिक प्रगत तंत्रज्ञाने.'
        },
        {
          en: '39+ patented agricultural farm implements, tractor-drawn machinery, and post-harvest processing equipment.',
          mr: 'शेतकऱ्यांचे श्रम व खर्च वाचवणारी ३९ हून अधिक पेटंटप्राप्त कृषी अवजारे व प्रक्रिया यंत्रे.'
        },
        {
          en: 'RKVY Centre of Excellence in Indigenous Cattle (ICRTC Pune) pioneering Embryo Transfer (ET) & IVF in Gir and Sahiwal breeds.',
          mr: 'देशी गोवंश उत्कृष्टता केंद्र (ICRTC पुणे) - गिर व साहिवाल जातींमध्ये भ्रूण प्रत्यारोपण (ET) व आयव्हीएफ तंत्रज्ञान.'
        }
      ]
    },
    {
      id: 'extension',
      title: { en: 'Extension Education & Outreach', mr: 'विस्तार शिक्षण व शेतकरी सेवा दालन' },
      subtitle: { en: 'Lab-to-Land technology transfer empowering millions of farming households', mr: 'प्रयोगशाळा ते शेतीपर्यंत थेट ज्ञानप्रसार करून लाखो बळीराजांचे सक्षमीकरण' },
      icon: Users,
      headerBg: 'bg-amber-50 border-amber-200',
      iconBg: 'bg-amber-800 text-white',
      accentColor: 'text-amber-800',
      highlights: [
        {
          en: 'Agricultural Technology Information Centre (ATIC) at Rahuri providing single-window advisory, diagnostic clinic, and certified seeds.',
          mr: 'राहुरी येथील कृषी तंत्रज्ञान माहिती केंद्र (ATIC) - ' + (language === 'mr' ? 'एक खिडकी सल्लागार, रोगनिदान दवाखाना व बियाणे केंद्र.' : 'single-window advisory, clinic & seed counter.')
        },
        {
          en: 'Extensive grassroots network comprising 4 Regional Extension Centres and 5 District Extension Centres across 10 districts.',
          mr: '१० जिल्ह्यांत विस्तारलेले ४ विभागीय विस्तार केंद्रे व ५ जिल्हा विस्तार केंद्रांचे सक्षम नेटवर्क.'
        },
        {
          en: '17 Krishi Vigyan Kendras (KVKs): 4 University KVKs (Dhule, Mamurabad-Jalgaon, Borgaon-Satara, Mohol-Solapur) + 13 partner NGO KVKs.',
          mr: '१७ कृषी विज्ञान केंद्रे (KVKs): ४ विद्यापीठ केंद्रे (धुळे, मामुराबाद-जळगाव, बोरगाव-सातारा, मोहोळ-सोलापूर) + १३ संलग्न केंद्रे.'
        },
        {
          en: 'State Communication Centre publishing monthly Shri Sugi magazine, Krishidarshani agricultural almanac, and farm bulletins.',
          mr: 'दळणवळण केंद्रामार्फत \'श्री सुगी\' त्रैमासिक, वार्षिक \'कृषिदर्शनी\' दिनदर्शिका व शेतकरी माहिती पुस्तकांचे प्रकाशन.'
        },
        {
          en: 'Annual Phule Krishi Mahotsav, Shivar Pheri, and Farmer-Scientist Forums reaching lakhs of cultivators each season.',
          mr: 'वार्षिक फुले कृषी महोत्सव, शिवार फेरी आणि शेतकरी-शास्त्रज्ञ विचारमंचाद्वारे दरवर्षी लाखो शेतकऱ्यांशी थेट संवाद.'
        },
        {
          en: 'Certified Breeder & Foundation seed production hubs supplying thousands of quintals of pure truth-labeled seeds.',
          mr: 'शेतकऱ्यांना वाजवी दरात हजारो क्विंटल मूलभूत, पायाभूत व प्रमाणित बियाण्यांचा अखंड पुरवठा.'
        }
      ]
    }
  ];

  // 4. Mission, Mandate & Goals
  const mandatePoints = [
    {
      en: 'To provide education in agriculture and allied sciences and engineering for producing skilled, forward-looking human resources.',
      mr: 'सक्षम व भविष्यवेधी मनुष्यबळ घडविण्यासाठी कृषी, संलग्न विज्ञान आणि कृषी अभियांत्रिकीमध्ये उच्च दर्जाचे शिक्षण देणे.'
    },
    {
      en: 'To undertake basic, strategic, and applied research to cater to technology needs in agriculture, horticulture, agricultural engineering, food technology, and animal sciences for Maharashtra in general and Western Maharashtra in particular.',
      mr: 'महाराष्ट्र राज्य व विशेषतः पश्चिम महाराष्ट्रातील कृषी, उद्यानविद्या, कृषी अभियांत्रिकी, अन्नतंत्रज्ञान आणि पशुविज्ञान क्षेत्रातील तंत्रज्ञानाच्या गरजा पूर्ण करण्यासाठी मूलभूत, धोरणात्मक व उपयोजित संशोधन करणे.'
    },
    {
      en: 'To provide support to production and supply of quality seed and planting material and facilitate effective transfer of technology through education and training for the socio-economic upliftment of farmers and rural stakeholders.',
      mr: 'उच्च दर्जाचे बियाणे व रोपांचे उत्पादन आणि पुरवठा करणे तसेच शेतकरी व ग्रामीण घटकांच्या सामाजिक-आर्थिक उन्नतीसाठी शिक्षण आणि प्रशिक्षणाद्वारे प्रभावी तंत्रज्ञान प्रसार करणे.'
    }
  ];

  const goalPoints = [
    {
      num: '01',
      en: 'Provide diploma, graduate, post-graduate and doctorate level quality education in Agriculture, Horticulture, Agricultural Engineering and allied fields to produce competent human resources.',
      mr: 'कृषी, उद्यानविद्या, कृषी अभियांत्रिकी व संलग्न शाखांमध्ये पदविका, पदवी, पदव्युत्तर व आचार्य स्तरावर दर्जेदार शिक्षण देऊन सक्षम मनुष्यबळ निर्माण करणे.'
    },
    {
      num: '02',
      en: 'Encourage and provide agricultural education to girls particularly with rural backgrounds so as to increase their involvement in farming, allied agro-business activities and women empowerment.',
      mr: 'विशेषतः ग्रामीण पार्श्वभूमी असलेल्या विद्यार्थिनींना कृषी शिक्षणासाठी प्रोत्साहन देऊन शेती, कृषी उद्योग व व्यवसायात महिलांचे सक्षमीकरण करणे.'
    },
    {
      num: '03',
      en: 'Carry out basic, applied and need-based research in agriculture to provide economical solutions for emerging farm problems and improve farmers’ livelihood.',
      mr: 'उद्भवणाऱ्या शेती समस्यांवर आर्थिकदृष्ट्या परवडणारे उपाय शोधण्यासाठी व शेतकऱ्यांचे जीवनमान उंचावण्यासाठी मूलभूत व गरज-आधारित संशोधन करणे.'
    },
    {
      num: '04',
      en: 'Arrange practical trainings for effective transfer of emerging technologies to farmers and rural organizations in order to improve agricultural productivity and economic conditions.',
      mr: 'कृषी उत्पादकता आणि ग्रामीण जनतेची आर्थिक स्थिती सुधारण्यासाठी शेतकरी व संस्थांना प्रगत शेती तंत्रज्ञानाचे परिणामकारक प्रशिक्षण देणे.'
    },
    {
      num: '05',
      en: 'Develop suitable technologies for supporting the growth of subsidiary occupations, agro-based processing industries, and generate self-employment for educated rural youth.',
      mr: 'पूरक व्यवसाय व कृषी-प्रक्रिया उद्योगांच्या वाढीसाठी तंत्रज्ञान विकसित करणे आणि सुशिक्षित ग्रामीण युवक-युवतींसाठी स्वयंरोजगाराच्या संधी निर्माण करणे.'
    },
    {
      num: '06',
      en: 'Provide technical and policy advice to the State Government in planning various schemes for overall socio-economic progress of the rural population of Maharashtra.',
      mr: 'ग्रामीण जनतेच्या सर्वांगीण सामाजिक-आर्थिक प्रगतीसाठी विविध शासकीय योजनांचे नियोजन व अंमलबजावणी करताना राज्य शासनाला तांत्रिक व धोरणात्मक सल्ला देणे.'
    },
    {
      num: '07',
      en: 'Establish new colleges, schools, research stations, specialized departments and state-of-the-art laboratories to strengthen agricultural education in emerging frontier areas.',
      mr: 'नवीन उदयोन्मुख विषयांमध्ये कृषी शिक्षण व संशोधनाचा पाया विस्तारण्यासाठी नवीन महाविद्यालये, विद्यालये, संशोधन केंद्रे व अद्ययावत प्रयोगशाळा स्थापन करणे.'
    },
    {
      num: '08',
      en: 'Implement robust skill development programmes in precision agriculture, drone technology, protected cultivation, and allied agricultural engineering disciplines.',
      mr: 'अचूक शेती, कृषी ड्रोन, संरक्षित शेती आणि कृषी अभियांत्रिकीमध्ये युवकांसाठी कौशल्य विकास कार्यक्रम प्रभावीपणे राबवणे.'
    }
  ];

  // 5. Historical Milestones & Institutional Awards
  const historicalAwards = [
    {
      year: '2002',
      title: { en: 'Sardar Patel Outstanding Institute Award', mr: 'सरदार पटेल उत्कृष्ट संस्था राष्ट्रीय पुरस्कार' },
      by: { en: 'ICAR, New Delhi', mr: 'भारतीय कृषी संशोधन परिषद (ICAR), नवी दिल्ली' },
      desc: {
        en: 'Conferred by ICAR for exceptional all-round contributions in Agricultural Education, Research, and Extension Education.',
        mr: 'कृषी शिक्षण, संशोधन आणि विस्तार शिक्षणातील अद्वितीय सर्वोत्कृष्ट कामगिरीबद्दल ICAR द्वारे देशातील सर्वोच्च संस्था पुरस्कार.'
      },
      tag: 'Flagship Institutional Award'
    },
    {
      year: '2007-08',
      title: { en: 'Institute of Excellence Status (₹100 Crore Grant)', mr: 'उत्कृष्टता संस्था गौरव (₹१०० कोटी विशेष अनुदान)' },
      by: { en: 'Government of India (Union Budget)', mr: 'भारत सरकार (केंद्रीय अर्थसंकल्प)' },
      desc: {
        en: 'Recognized as an "Institute of Excellence" and allocated ₹100 Crores in the Union Budget for state-of-the-art research infrastructure.',
        mr: 'केंद्रीय अर्थसंकल्पात देशातील अग्रगण्य कृषी संस्था म्हणून गौरव आणि पायाभूत सुविधांच्या अद्ययावतीकरणासाठी १०० कोटींचा विशेष निधी.'
      },
      tag: 'National Recognition'
    },
    {
      year: '2013',
      title: { en: 'Award for Excellence in Safflower Research', mr: 'करडई संशोधन राष्ट्रीय उत्कृष्टता पुरस्कार' },
      by: { en: 'ICAR, New Delhi', mr: 'आयसीएआर, नवी दिल्ली' },
      desc: {
        en: 'Recognized for outstanding breeding achievements and development of high-oil, drought-tolerant safflower varieties.',
        mr: 'अवर्षण प्रतिकारक व अधिक तेलयुक्त करडई वाणांच्या संशोधनातील उत्कृष्ट योगदानाबद्दल गौरव.'
      },
      tag: 'Crop Breeding'
    },
    {
      year: '2013',
      title: { en: 'Late Amit Singh Memorial Award (Best AICRP Vegetable Centre)', mr: 'स्व. अमित सिंग स्मृती पुरस्कार (सर्वोत्कृष्ट भाजीपाला संशोधन केंद्र)' },
      by: { en: 'ICAR, New Delhi', mr: 'आयसीएआर, नवी दिल्ली' },
      desc: {
        en: 'Conferred upon the All India Coordinated Research Project on Vegetable Crops for leading the nation in high-yielding cultivars.',
        mr: 'भाजीपाला पिकांवरील अखिल भारतीय समन्वित संशोधन प्रकल्पास देशातील सर्वोत्तम कामगिरीबद्दल प्रदान.'
      },
      tag: 'Vegetable Research'
    },
    {
      year: '2014',
      title: { en: 'Centre of Excellence in Irrigation Water Management', mr: 'सिंचन जल व्यवस्थापन राष्ट्रीय उत्कृष्टता केंद्र' },
      by: { en: 'ICAR, New Delhi', mr: 'आयसीएआर, नवी दिल्ली' },
      desc: {
        en: 'Designated as a National Centre of Excellence for pioneering micro-irrigation, fertigation, and canal automation protocols.',
        mr: 'ठिबक, तुषार सिंचन व पाणी बचतीच्या आधुनिक तंत्रज्ञानातील आघाडीबद्दल राष्ट्रीय उत्कृष्टता केंद्र म्हणून मान्यता.'
      },
      tag: 'Water Engineering'
    },
    {
      year: '2015',
      title: { en: 'Centre of Excellence in Seed Research', mr: 'बियाणे संशोधन राष्ट्रीय उत्कृष्टता केंद्र' },
      by: { en: 'ICAR, New Delhi', mr: 'आयसीएआर, नवी दिल्ली' },
      desc: {
        en: 'Recognized for pioneering breeder seed technology, molecular genetic purity testing, and seed storage vigor protocols.',
        mr: 'मूलभूत बियाणे तंत्रज्ञान, जनुकीय शुद्धता चाचणी आणि बियाणे साठवणूक संशोधनासाठी राष्ट्रीय केंद्र दर्जा.'
      },
      tag: 'Seed Technology'
    },
    {
      year: '2016',
      title: { en: 'National Award for Maximum Extant Notified Varieties (36 Varieties)', mr: 'सर्वाधिक अधिसूचित वाण नोंदणी राष्ट्रीय पुरस्कार (३६ पीक वाण)' },
      by: { en: 'PPV & FRA, New Delhi', mr: 'वनस्पती वाण व शेतकरी हक्क संरक्षण प्राधिकरण (PPV & FRA), नवी दिल्ली' },
      desc: {
        en: 'First prize across all Indian agricultural universities for registering 36 indigenous notified crop varieties safeguarding farmers’ rights.',
        mr: 'देशात सर्वाधिक ३६ अधिसूचित पीक वाणांची यशस्वी नोंदणी करून शेतकरी हक्क संरक्षणात देशात प्रथम क्रमांक.'
      },
      tag: 'Plant Variety Protection'
    },
    {
      year: '2016',
      title: { en: 'Chaudhary Devi Lal Outstanding AICRP Award', mr: 'चौधरी देवीलाल उत्कृष्ट अखिल भारतीय समन्वित प्रकल्प पुरस्कार' },
      by: { en: 'ICAR, New Delhi', mr: 'आयसीएआर, नवी दिल्ली' },
      desc: {
        en: 'Bestowed upon the Agricultural Meteorology Project of ZARS Solapur for drought prediction and agromet advisory systems.',
        mr: 'विभागीय कृषी संशोधन केंद्र सोलापूरच्या कृषी हवामानशास्त्र प्रकल्पास दुष्काळ अंदाज व हवामान सल्ल्यासाठी सन्मान.'
      },
      tag: 'Agro-Meteorology'
    },
    {
      year: '2017',
      title: { en: 'Outstanding Partnership Award (Asia) for Pearl Millet Biofortification', mr: 'आशिया आंतरराष्ट्रीय भागीदारी पुरस्कार (बाजरी पोषण समृद्धीकरण)' },
      by: { en: 'HarvestPlus & ICRISAT (Human Nutrition)', mr: 'हार्वेस्टप्लस व इक्रीसॅट आंतरराष्ट्रीय संस्था' },
      desc: {
        en: 'International recognition for developing high-iron and high-zinc biofortified pearl millet (Dhanashakti) to tackle malnutrition in Asia.',
        mr: 'लोह व जस्तयुक्त पोषणसमृद्ध बाजरी वाण (धनाशक्ती) विकसित करून कुपोषणावर मात करण्याच्या कार्याचा आशिया स्तरावर सन्मान.'
      },
      tag: 'Biofortification'
    },
    {
      year: '2017',
      title: { en: 'National Award for Outstanding Performance in Forage Research', mr: 'गवताळ व चारा पिके संशोधन उत्कृष्ट कामगिरी राष्ट्रीय पुरस्कार' },
      by: { en: 'ICAR, New Delhi', mr: 'आयसीएआर, नवी दिल्ली' },
      desc: {
        en: 'Honored for developing high-protein multi-cut forage hybrids and pasture grasses sustaining dairy livestock across western India.',
        mr: 'दुग्धव्यवसायाला आधार देणाऱ्या बहुवार कापणीच्या पोषक चारा पिकांच्या संशोधनातील अग्रगण्य कामगिरी.'
      },
      tag: 'Forage Crops'
    },
    {
      year: '2017',
      title: { en: 'Seed Technology Research Scheme - Excellent Center Award', mr: 'बियाणे तंत्रज्ञान संशोधन योजना - उत्कृष्ट केंद्र राष्ट्रीय पुरस्कार' },
      by: { en: 'ICAR, New Delhi', mr: 'आयसीएआर, नवी दिल्ली' },
      desc: {
        en: 'Awarded for benchmark achievements in seed enhancement, seed priming, and standardized processing algorithms.',
        mr: 'बियाणे वृद्धी, सीड प्रायमिंग व प्रक्रिया प्रमाणीकरणात उत्कृष्ट केंद्र म्हणून राष्ट्रीय गौरव.'
      },
      tag: 'Seed Science'
    },
    {
      year: '2017',
      title: { en: 'ICAR Certificate of Appreciation for Krishikosh Digital Repository', mr: 'आयसीएआर डिजिटल कृषीकोश विशेष प्रशस्तीपत्र (८५०+ प्रबंध)' },
      by: { en: 'ICAR, New Delhi', mr: 'आयसीएआर, नवी दिल्ली' },
      desc: {
        en: 'Special commendation for digitally preserving and contributing more than 850 postgraduate and doctorate theses into the national repository.',
        mr: 'राष्ट्रीय कृषी डिजिटल कोषात (Krishikosh) ८५० पेक्षा अधिक पदव्युत्तर व आचार्य प्रबंधांचे डिजिटल संकलन केल्याबद्दल सन्मान.'
      },
      tag: 'Digital Repository'
    },
    {
      year: '2018-19',
      title: { en: 'Best Performance in Seed Technology Research', mr: 'बियाणे तंत्रज्ञान संशोधनात सर्वोत्तम कामगिरी पुरस्कार' },
      by: { en: 'ICAR, New Delhi', mr: 'आयसीएआर, नवी दिल्ली' },
      desc: {
        en: 'Ranked best in India for second consecutive term for seed physiological vigor mapping and hybrid seed production protocols.',
        mr: 'संकरित बियाणे उत्पादन तंत्रज्ञान व गुणवत्तेमध्ये देशात सलग दुसऱ्यांदा सर्वोत्तम कामगिरीचा गौरव.'
      },
      tag: 'Seed Science'
    },
    {
      year: '2018-19',
      title: { en: 'Central Sugarcane Research Station (CSRS Padegaon) - Excellent Performance Award', mr: 'मध्यवर्ती ऊस संशोधन केंद्र, पाडेगाव - उत्कृष्ट कामगिरी पुरस्कार' },
      by: { en: 'ICAR - Sugarcane Breeding Institute', mr: 'आयसीएआर - ऊस पैदास संस्था' },
      desc: {
        en: 'Commended for pioneering CoM 0265 (Phule 0265) and MS 10001 (Phule 10001) sugarcane varieties transforming Maharashtra’s sugar economy.',
        mr: 'महाराष्ट्राच्या साखर उद्योगाला क्रांती देणाऱ्या को.एम. ०२६५ व एम.एस. १०००१ ऊस वाणांच्या संशोधनासाठी विशेष पुरस्कार.'
      },
      tag: 'Sugarcane Research'
    },
    {
      year: '2019-20',
      title: { en: 'AICRP on Mushroom - Best Centre in India Award', mr: 'अखिल भारतीय अळंबी संशोधन प्रकल्प - देशातील सर्वोत्तम केंद्र' },
      by: { en: 'ICAR - Directorate of Mushroom Research', mr: 'आयसीएआर - अळंबी संशोधन संचालनालय' },
      desc: {
        en: 'Conferred upon the Mushroom Project at College of Agriculture, Pune for oyster and button mushroom spawn innovations.',
        mr: 'कृषी महाविद्यालय, पुणे येथील अळंबी संशोधन प्रकल्पास उत्कृष्ट स्पॉन उत्पादन व शेतकरी प्रशिक्षणासाठी देशात प्रथम क्रमांक.'
      },
      tag: 'Mushroom Technology'
    },
    {
      year: '2020',
      title: { en: 'AICRP on Arid Zone Fruits - Best AICRP Centre Award', mr: 'अखिल भारतीय कोरडवाहू फळे संशोधन प्रकल्प - सर्वोत्तम केंद्र राष्ट्रीय पुरस्कार' },
      by: { en: 'ICAR - Central Institute for Arid Horticulture', mr: 'आयसीएआर - केंद्रीय कोरडवाहू फलोत्पादन संस्था' },
      desc: {
        en: 'National recognition for developing world-renowned Bhagwa pomegranate, drought-hardy Custard Apple (Phule Purandar), and arid fruit management.',
        mr: 'जागतिक कीर्तीच्या \'भगवा\' डाळिंब व \'फुले पुरंदर\' सीताफळ वाणांच्या संशोधनासाठी देशातील सर्वोत्तम केंद्र पुरस्कार.'
      },
      tag: 'Horticulture & Fruits'
    }
  ];

  // Filtering Logic
  const query = searchQuery.trim().toLowerCase();

  const filteredZones = agroClimaticZones.filter((z) => {
    if (!query) return true;
    return (
      z.title.en.toLowerCase().includes(query) ||
      z.title.mr.toLowerCase().includes(query) ||
      z.districts.en.toLowerCase().includes(query) ||
      z.districts.mr.toLowerCase().includes(query) ||
      z.crops.en.toLowerCase().includes(query) ||
      z.crops.mr.toLowerCase().includes(query)
    );
  });

  const filteredAwards = historicalAwards.filter((a) => {
    if (!query) return true;
    return (
      a.year.includes(query) ||
      a.title.en.toLowerCase().includes(query) ||
      a.title.mr.toLowerCase().includes(query) ||
      a.by.en.toLowerCase().includes(query) ||
      a.desc.en.toLowerCase().includes(query) ||
      a.tag.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full bg-[#fdfbf7] min-h-screen text-slate-800">
      
      {/* 1. Consistent Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]"
      >
        <div className="w-full max-w-[1720px] mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
          <Link href="/" className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-stone-600 font-medium">
            {language === 'mr' ? 'विद्यापीठ परिचय' : 'About University'}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md" aria-current="page">
            {language === 'mr' ? 'दृष्टीक्षेपात म.फु.कृ.वि.' : 'MPKV At a Glance'}
          </span>
        </div>
      </nav>

      {/* 2. Hero Header Banner */}
      <header className="w-full bg-gradient-to-br from-[#123623] via-[#1a4a30] to-[#0a1e13] text-white relative overflow-hidden border-b-4 border-amber-400 shadow-md">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'mr' ? 'स्थापना : २९ मार्च १९६८ / १९६९' : 'Established 1969 · Krishi Vidyapeeth Act'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  {language === 'mr' ? 'सरदार पटेल उत्कृष्ट संस्था पुरस्कार (ICAR)' : 'ICAR Sardar Patel Outstanding Institute'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-semibold">
                  <Landmark className="w-3.5 h-3.5 text-amber-300" />
                  {language === 'mr' ? '₹१०० कोटी उत्कृष्टता केंद्र अनुदान' : '₹100 Cr Central Grant of Excellence'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {language === 'mr'
                  ? 'महात्मा फुले कृषि विद्यापीठ : एका दृष्टीक्षेपात'
                  : 'Mahatma Phule Krishi Vidyapeeth At a Glance'}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 max-w-3xl leading-relaxed font-normal">
                {language === 'mr'
                  ? 'महाराष्ट्र राज्यातील पश्चिम महाराष्ट्रातील १० जिल्ह्यांमधील ११६.६७ लाख हेक्टर भौगोलिक क्षेत्रातील शेतकऱ्यांच्या सर्वांगीण प्रगतीसाठी कृषी शिक्षण, कृषी संशोधन आणि विस्तार शिक्षणाची त्रिसूत्री राबवणारे देशातील अग्रगण्य राज्य कृषी विद्यापीठ.'
                  : 'Premier State Agricultural University in Maharashtra rendering exemplary services to farmers through the tri-fold mission of Education, Research, and Extension Education across 116.67 Lakh Hectares in Western Maharashtra since 1969.'}
              </p>

              {/* Quick Jump Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => printElement('mpkv-at-a-glance-printable-section', language === 'mr' ? 'मफुकृवि एका दृष्टीक्षेपात' : 'MPKV At a Glance Dossier')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/25 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-300" />
                  <span>{language === 'mr' ? 'संपूर्ण माहिती प्रिंट करा' : 'Print Institutional Dossier'}</span>
                </button>
                <Link
                  href="/education/constituent-colleges"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{language === 'mr' ? 'घटक महाविद्यालये' : 'Colleges Directory'}</span>
                </Link>
                <Link
                  href="/research/thrust-areas"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
                >
                  <Microscope className="w-4 h-4" />
                  <span>{language === 'mr' ? 'संशोधन प्राधान्ये' : 'Research Priorities'}</span>
                </Link>
              </div>
            </div>

            {/* Emblem & Chancellor/VC Overview Card */}
            <div className="w-full lg:w-96 rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/20 text-white space-y-3.5 shrink-0 shadow-lg">
              <div className="flex items-center gap-3 pb-3 border-b border-white/15">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">
                    {language === 'mr' ? 'विद्यापीठ प्रशासन रचना' : 'Statutory Governance'}
                  </h2>
                  <p className="text-[11px] text-emerald-200">
                    {language === 'mr' ? 'महाराष्ट्र कृषी विद्यापीठे अधिनियम' : 'Maharashtra Krishi Vidyapeeth Act'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-emerald-200 font-medium">{language === 'mr' ? 'कुलपती:' : 'Chancellor:'}</span>
                  <span className="font-bold text-white text-right">{language === 'mr' ? 'मा. राज्यपाल, महाराष्ट्र राज्य' : 'Governor of Maharashtra'}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-emerald-200 font-medium">{language === 'mr' ? 'प्र-कुलपती:' : 'Pro-Chancellor:'}</span>
                  <span className="font-bold text-white text-right">{language === 'mr' ? 'मा. कृषी मंत्री, महाराष्ट्र राज्य' : 'Minister of Agriculture, MS'}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-emerald-200 font-medium">{language === 'mr' ? 'कुलगुरू:' : 'Vice-Chancellor:'}</span>
                  <span className="font-bold text-amber-300 text-right">{language === 'mr' ? 'डॉ. विलास के. खर्चे' : 'Dr. Vilas K. Kharche'}</span>
                </div>
                <div className="flex items-start justify-between gap-2 pt-1 border-t border-white/10">
                  <span className="text-emerald-200 font-medium">{language === 'mr' ? 'सर्वोच्च धोरण मंडळ:' : 'Apex Policy Body:'}</span>
                  <span className="font-semibold text-white text-right">{language === 'mr' ? 'कार्यकारी परिषद' : 'Executive Council'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="mpkv-at-a-glance-printable-section" className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-8 sm:py-12 space-y-10">

        {/* 3. Executive Metrics Grid */}
        <section aria-label="Executive Metrics" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {coreStats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${st.badgeBg}`}>
                    {st.unit}
                  </span>
                  <Icon className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 transition-colors" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {st.value}
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 leading-tight mt-0.5">
                    {language === 'mr' ? st.label.mr : st.label.en}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium leading-normal mt-1">
                    {language === 'mr' ? st.sub.mr : st.sub.en}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* 4. Filter Tabs & Live Search Bar */}
        <section aria-label="Navigation Tabs" className="w-full bg-white rounded-2xl p-3 sm:p-4 border border-stone-200 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Thematic Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 select-none text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  activeTab === 'all'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                {language === 'mr' ? 'सर्व माहिती' : 'Complete Overview'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'history'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'इतिहास व प्रशासन' : 'History & Governance'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('jurisdiction')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'jurisdiction'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <Trees className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? '५ कृषी हवामान विभाग' : '5 Agro-Climatic Zones'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pillars')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'pillars'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? '३ प्रमुख दालने' : 'Tri-Fold Pillars'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mandate')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'mandate'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'ध्येय, अधिदेश व उद्दिष्टे' : 'Mandate & Goals'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('awards')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'awards'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'mr' ? 'राष्ट्रीय पुरस्कार (१४)' : 'National Awards (14)'}</span>
              </button>
            </div>

            {/* Real-Time Live Search */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'mr'
                    ? 'हवामान विभाग, पुरस्कार, दालन शोधा...'
                    : 'Search zones, awards, schemes, crops...'
                }
                className="w-full pl-9 pr-3.5 py-1.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-stone-400"
              />
            </div>
          </div>
        </section>

        {/* 5. SECTION: History, Genesis & Governance */}
        {(activeTab === 'all' || activeTab === 'history') && (
          <section aria-labelledby="history-heading" className="space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-900">
                <Landmark className="w-5 h-5 text-emerald-800" />
              </div>
              <div>
                <h2 id="history-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {language === 'mr' ? 'इतिहास व प्रशासकीय पार्श्वभूमी' : 'History & Institutional Genesis'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {language === 'mr'
                    ? 'राधाकृष्णन आयोग (१९४८) ते महाराष्ट्र कृषी विद्यापीठे कायदा १९६७ अंतर्गत स्थापना'
                    : 'From Radhakrishnan Commission (1948) to Establishment under Maharashtra Krishi Vidyapeeth Act 1967'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Historical Narrative (7 cols) */}
              <div className="lg:col-span-7 space-y-4 text-justify text-slate-700 text-sm sm:text-base leading-relaxed font-normal bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
                <p>
                  {language === 'mr'
                    ? 'स्वातंत्र्यपूर्व काळात आणि स्वातंत्र्योत्तर सुरुवातीच्या वर्षांमध्ये कृषी शिक्षणाची जबाबदारी पारंपरिक अशासकीय विद्यापीठांकडे होती, तर कृषी संशोधन आणि विस्तार कार्याची जबाबदारी राज्य कृषी विभागाकडे सोपविण्यात आली होती. सन १९४८ च्या डॉ. सर्वपल्ली राधाकृष्णन आयोगाच्या शिफारशीनुसार देशात १९६० च्या दशकापासून स्वतंत्र कृषी विद्यापीठांच्या स्थापनेला गती मिळाली.'
                    : 'Before the period of independence and during few years after independence, non-agricultural universities were entrusted with the responsibility of agricultural education while the State Department of Agriculture contributed to research and extension. Agricultural universities were established in India from 1960 according to the recommendations of the Radhakrishnan Commission (1948).'}
                </p>
                <p>
                  {language === 'mr'
                    ? 'महाराष्ट्र कृषी विद्यापीठ कायदा १९६७ अन्वये संपूर्ण महाराष्ट्र राज्यासाठी सुरुवातीला एकच महाराष्ट्र कृषी विद्यापीठ स्थापन करण्यात आले आणि २९ मार्च १९६८ रोजी मुंबई येथून त्याचे कामकाज सुरू झाले. सन १९६९ मध्ये हे कार्यालय कृषी महाविद्यालय, पुणे येथे हलविण्यात आले. त्यानंतर त्याच वर्षी दोन आणि १९७२ मध्ये आणखी दोन कृषी विद्यापीठे स्थापन करण्यात आली.'
                    : 'In pursuance of the Maharashtra Agricultural University (Krishi Vidyapeeth) Act 1967, initially the Maharashtra Agricultural University was established for the entire state and started functioning from 29 March 1968 with its office at Mumbai. The office was shifted to College of Agriculture, Pune in 1969. Subsequently, specialized agricultural universities were established across different regions.'}
                </p>
                <p>
                  {language === 'mr'
                    ? 'महात्मा फुले कृषी विद्यापीठ (मफुकृवि), राहुरी हे त्यापैकीच एक अग्रगण्य विद्यापीठ असून, पश्चिम महाराष्ट्रातील १० जिल्ह्यांसाठी (अहिल्यानगर, पुणे, सातारा, सांगली, सोलापूर, कोल्हापूर, नाशिक, धुळे, जळगाव आणि नंदुरबार) सन १९६९ मध्ये स्थापन करण्यात आले. थोर समाजसुधारक, क्रांतीसूर्य महात्मा जोतीराव फुले यांच्या सन्मानार्थ या विद्यापीठाचे नामकरण करण्यात आले असून ते कृषी शिक्षण, संशोधन आणि विस्तार शिक्षणाद्वारे शेतकऱ्यांची अविरत सेवा करत आहे.'
                    : 'Mahatma Phule Krishi Vidyapeeth (MPKV), Rahuri was established in 1969 for Western Maharashtra with its jurisdiction spread over ten districts: Ahmednagar, Pune, Satara, Sangli, Solapur, Kolhapur, Nashik, Dhule, Jalgaon, and Nandurbar. The University is named after the great social reformer Mahatma Jyotiba Phule, rendering peerless service through Education, Research, and Extension.'}
                </p>
              </div>

              {/* Right Column: Governance Structure & Councils (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 border border-stone-700 shadow-md space-y-4">
                  <div className="flex items-center gap-2.5 text-amber-300">
                    <ShieldCheck className="w-5 h-5" />
                    <h3 className="text-base font-bold text-white">
                      {language === 'mr' ? 'वैधानिक परिषदा व सल्लागार मंडळे' : 'Apex Statutory Councils'}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed font-normal">
                    {language === 'mr'
                      ? 'विद्यापीठाच्या धोरणात्मक निर्णयांसाठी मा. कुलगुरूंच्या अध्यक्षतेखाली विविध वैधानिक परिषदा कार्यरत आहेत:'
                      : 'The university is assisted by statutory apex councils for co-ordination and review of all flagship programs:'}
                  </p>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">१</span>
                      <div>
                        <strong className="text-white block font-semibold">{language === 'mr' ? 'कार्यकारी परिषद' : 'Executive Council'}</strong>
                        <span className="text-stone-300 text-[11px] font-normal">{language === 'mr' ? 'विद्यापीठाचे सर्वोच्च धोरण ठरवणारे मंडळ; यात लोकप्रतिनिधी, शास्त्रज्ञ, ICAR प्रतिनिधी व प्रगतशील शेतकरी समाविष्ट.' : 'Highest policy-making body comprising legislators, scientists, ICAR reps & progressive farmers.'}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">२</span>
                      <div>
                        <strong className="text-white block font-semibold">{language === 'mr' ? 'विद्वत परिषद' : 'Academic Council'}</strong>
                        <span className="text-stone-300 text-[11px] font-normal">{language === 'mr' ? 'शैक्षणिक धोरणे, अभ्यासक्रम पुनर्रचना व परीक्षांचे नियमन.' : 'Academic policy, syllabus revision, quality standards & university examinations.'}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">३</span>
                      <div>
                        <strong className="text-white block font-semibold">{language === 'mr' ? 'कृषी संशोधन परिषद' : 'Agricultural Research Council'}</strong>
                        <span className="text-stone-300 text-[11px] font-normal">{language === 'mr' ? 'स्थानिक गरजेनुसार नवीन पीक वाण, तंत्रज्ञान शिफारशी व पेटंट्सचे मूल्यमापन.' : 'Evaluation of new crop varieties, farm implements & Joint AGRESCO recommendations.'}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">४</span>
                      <div>
                        <strong className="text-white block font-semibold">{language === 'mr' ? 'विस्तार शिक्षण परिषद' : 'Extension Education Council'}</strong>
                        <span className="text-stone-300 text-[11px] font-normal">{language === 'mr' ? 'प्रयोगशाळा ते शेतीपर्यंत तंत्रज्ञान प्रसार व बियाणे वाटपाचे समन्वय.' : 'Lab-to-land outreach, certified seed supply, ATIC & KVK transfer networks.'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. SECTION: Geographical Jurisdiction & 5 Agro-Climatic Zones */}
        {(activeTab === 'all' || activeTab === 'jurisdiction') && (
          <section aria-labelledby="zones-heading" className="space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
              <div className="p-2 rounded-xl bg-teal-100 text-teal-900">
                <Trees className="w-5 h-5 text-teal-800" />
              </div>
              <div>
                <h2 id="zones-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {language === 'mr' ? 'भौगोलिक कार्यक्षेत्र व ५ कृषी हवामान विभाग' : 'Geographical Jurisdiction & 5 Agro-Climatic Zones'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {language === 'mr'
                    ? 'पश्चिम महाराष्ट्रातील १० जिल्हे · एकूण ११६.६७ लाख हेक्टर (राज्याच्या ३८% क्षेत्र)'
                    : '10 Districts of Western Maharashtra · Total 116.67 Lakh Hectares (38% of State Area)'}
                </p>
              </div>
            </div>

            {/* Jurisdiction Districts Strip */}
            <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-bold text-emerald-950">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{language === 'mr' ? 'समाविष्ट १० जिल्हे:' : '10 Jurisdiction Districts:'}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-semibold text-slate-700">
                {(language === 'mr'
                  ? ['अहिल्यानगर', 'पुणे', 'कोल्हापूर', 'सोलापूर', 'सातारा', 'सांगली', 'नाशिक', 'धुळे', 'जळगाव', 'नंदुरबार']
                  : ['Ahilyanagar', 'Pune', 'Kolhapur', 'Solapur', 'Satara', 'Sangli', 'Nashik', 'Dhule', 'Jalgaon', 'Nandurbar']
                ).map((dist, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-900 text-xs shadow-2xs">
                    {dist}
                  </span>
                ))}
              </div>
            </div>

            {/* 5 Zones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredZones.map((zone) => (
                <div
                  key={zone.id}
                  className="rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${zone.badgeColor}`}>
                        Zone #{zone.num}
                      </span>
                      <Compass className="w-4 h-4 text-stone-400" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {language === 'mr' ? zone.title.mr : zone.title.en}
                    </h3>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-slate-700 block">{language === 'mr' ? 'जिल्हे व कार्यक्षेत्र:' : 'Districts & Coverage:'}</span>
                        <p className="text-slate-600 font-normal leading-relaxed">{language === 'mr' ? zone.districts.mr : zone.districts.en}</p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 block">{language === 'mr' ? 'हवामान व पर्जन्य:' : 'Climate & Rainfall:'}</span>
                        <p className="text-slate-600 font-normal leading-relaxed">{language === 'mr' ? zone.climate.mr : zone.climate.en}</p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 block">{language === 'mr' ? 'मृदा प्रकार:' : 'Soil Characteristics:'}</span>
                        <p className="text-slate-600 font-normal leading-relaxed">{language === 'mr' ? zone.soils.mr : zone.soils.en}</p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 block">{language === 'mr' ? 'प्रमुख पिके:' : 'Major Crops:'}</span>
                        <p className="text-emerald-900 font-semibold leading-relaxed">{language === 'mr' ? zone.crops.mr : zone.crops.en}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="text-emerald-800 font-semibold">{language === 'mr' ? 'प्रमुख केंद्र:' : 'Key Station:'}</span>
                    <span className="truncate max-w-[200px]" title={language === 'mr' ? zone.keyStation.mr : zone.keyStation.en}>
                      {language === 'mr' ? zone.keyStation.mr : zone.keyStation.en}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. SECTION: Tri-Fold Pillars of Institutional Services */}
        {(activeTab === 'all' || activeTab === 'pillars') && (
          <section aria-labelledby="pillars-heading" className="space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-900">
                <Layers className="w-5 h-5 text-emerald-800" />
              </div>
              <div>
                <h2 id="pillars-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {language === 'mr' ? 'विद्यापीठाची तीन मुख्य दालने' : 'The Tri-Fold Pillars of University Service'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {language === 'mr'
                    ? 'कृषी शिक्षण, कृषी संशोधन आणि विस्तार शिक्षणाचा त्रिवेणी संगम'
                    : 'Agricultural Education, Strategic Research, and Extension Outreach Network'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {universityPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Header */}
                      <div className={`p-5 border-b ${pillar.headerBg}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${pillar.iconBg}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                              {language === 'mr' ? pillar.title.mr : pillar.title.en}
                            </h3>
                            <p className="text-[11px] text-slate-600 font-medium leading-normal mt-0.5">
                              {language === 'mr' ? pillar.subtitle.mr : pillar.subtitle.en}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Highlights List */}
                      <div className="p-5 space-y-3">
                        {pillar.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${pillar.accentColor}`} />
                            <span className="text-slate-700 font-normal">
                              {language === 'mr' ? item.mr : item.en}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs font-bold">
                      <Link
                        href={
                          pillar.id === 'education'
                            ? '/education/at-a-glance'
                            : pillar.id === 'research'
                            ? '/research/at-a-glance'
                            : '/extension/at-a-glance'
                        }
                        className={`inline-flex items-center gap-1.5 ${pillar.accentColor} hover:underline`}
                      >
                        <span>{language === 'mr' ? 'सविस्तर दालन पहा' : 'Explore Detailed Pillar'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 8. SECTION: Mission, Mandate & Strategic Goals */}
        {(activeTab === 'all' || activeTab === 'mandate') && (
          <section aria-labelledby="mandate-heading" className="space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                <Target className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <h2 id="mandate-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {language === 'mr' ? 'ध्येय, अधिदेश व उद्दिष्टे' : 'Mission, Mandate & Strategic Goals'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {language === 'mr'
                    ? 'विद्यापीठाचे ध्येयविधान, ३ मूलभूत अधिदेश आणि ८ प्रमुख संस्थात्मक उद्दिष्टे'
                    : 'Institutional Mission Statement, 3 Core Mandates and 8 Strategic Objectives'}
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/10 text-amber-300 border border-white/15 shrink-0 hidden sm:flex">
                  <Quote className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {language === 'mr' ? 'विद्यापीठाचे ध्येयविधान' : 'Institutional Mission Statement'}
                  </span>
                  <blockquote className="text-sm sm:text-base md:text-lg italic font-normal leading-relaxed text-emerald-50">
                    {language === 'mr'
                      ? '“गुणवत्तापूर्ण मानवी संसाधनांचा विकास करून, योग्य तंत्रज्ञान उपायांसाठी मूलभूत आणि उपयोजित संशोधन हाती घेऊन तसेच शेतकरी बांधव आणि कृषी-उद्योग उद्योजकांपर्यंत कार्यक्षम तंत्रज्ञान हस्तांतरणासाठी विस्तार उपक्रम राबवून कृषी व संलग्न क्षेत्रांमध्ये सतत सुधारणा घडवून आणण्यासाठी मफुकृवि कटिबद्ध आहे.”'
                      : '“The MPKV is committed to the mission of continuous improvement in agriculture and allied fields by development of quality human resource, carrying out the basic and applied research for providing appropriate technological solutions; and piloting the extension activities for efficient technology transfer to the farming community and agro-business entrepreneurs.”'}
                  </blockquote>
                </div>
              </div>
            </div>

            {/* 3 Mandates Grid */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-700" />
                <span>{language === 'mr' ? '३ मूलभूत अधिदेश' : 'Three Core Mandates'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mandatePoints.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-emerald-300 transition-all space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center shrink-0">
                        {mIdx + 1}
                      </span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        {mIdx === 0
                          ? (language === 'mr' ? 'कृषी शिक्षण' : 'Education')
                          : mIdx === 1
                          ? (language === 'mr' ? 'कृषी संशोधन' : 'Research')
                          : (language === 'mr' ? 'विस्तार शिक्षण व बियाणे' : 'Extension & Seed')}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                      {language === 'mr' ? m.mr : m.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 8 Goals Grid */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-700" />
                <span>{language === 'mr' ? '८ प्रमुख संस्थात्मक उद्दिष्टे' : 'Eight Strategic Institutional Goals'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {goalPoints.map((g, gIdx) => (
                  <div
                    key={gIdx}
                    className="p-4.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-xs transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        Goal #{g.num}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-700 font-normal leading-relaxed">
                      {language === 'mr' ? g.mr : g.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 9. SECTION: Chronological Awards & Honors (14) */}
        {(activeTab === 'all' || activeTab === 'awards') && (
          <section aria-labelledby="awards-heading" className="space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                <Trophy className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h2 id="awards-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {language === 'mr' ? 'राष्ट्रीय पुरस्कार व सन्मान' : 'Prestigious National Accolades & Institutional Awards'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {language === 'mr'
                    ? 'ICAR, भारत सरकार व PPV & FRA कडून प्राप्त १४ राष्ट्रीय गौरव व पुरस्कार'
                    : '14 Flagship National Awards conferred by ICAR, Govt of India, and PPV & FRA'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
              {filteredAwards.map((aw, awIdx) => (
                <div
                  key={awIdx}
                  className="rounded-2xl bg-white border border-stone-200 p-5 shadow-2xs hover:shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-900 text-white font-extrabold text-xs shadow-2xs">
                          {aw.year}
                        </span>
                        <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {aw.tag}
                        </span>
                      </div>
                      <Star className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {language === 'mr' ? aw.title.mr : aw.title.en}
                    </h3>

                    <p className="text-xs text-slate-600 font-normal leading-relaxed">
                      {language === 'mr' ? aw.desc.mr : aw.desc.en}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="text-emerald-800 font-semibold">{language === 'mr' ? 'प्रदानकर्ता:' : 'Conferred By:'}</span>
                    <span className="font-semibold text-slate-700">{language === 'mr' ? aw.by.mr : aw.by.en}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};
