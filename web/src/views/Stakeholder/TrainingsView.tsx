'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Calendar,
  Clock,
  Users,
  Award,
  BookOpen,
  Sprout,
  Cpu,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Home,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Target,
  Download,
  Search,
  X,
  Layers,
  Plane,
  BrainCircuit,
  Radio,
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TrainingsViewProps {
  pageData?: any;
}

export const TrainingsView: React.FC<TrainingsViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getBilingual = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr || field.en : field.en;
  };

  const akmuOverview = pageData?.akmuOverview || {
    center: { en: 'Agricultural Knowledge Management Unit (AKMU)', mr: 'कृषी ज्ञान व्यवस्थापन कक्ष (AKMU)' },
    mandate: {
      en: 'AKMU functions as the digital technology backbone of MPKV Rahuri, conducting specialized national certificate courses, high-performance computational training, hyperspectral analytics, and automated drone certifications.',
      mr: 'एकेएमयू कक्ष मफुकृवि राहुरीचा डिजिटल व संगणकीय कणा असून कृषी ड्रोन, हायपरस्पेक्ट्रल इमेजिंग, डेटा सायन्स व डिजिटल कृषी विस्ताराचे राष्ट्रीय अभ्यासक्रम आयोजित करतो.'
    },
    contact: {
      officer: { en: 'Officer In-Charge, AKMU', mr: 'प्रभारी अधिकारी, कृषी ज्ञान व्यवस्थापन कक्ष' },
      phone: '02426-243265',
      email: 'akmumpkv@gmail.com',
      location: { en: 'Central Administration Building, MPKV Rahuri', mr: 'मध्यवर्ती प्रशासकीय इमारत, मफुकृवि राहुरी' }
    }
  };

  // 4 Landmark official AKMU training programs from live portal https://mpkv.ac.in/Akmu/Traning
  const officialAkmuPrograms = pageData?.officialAkmuPrograms || [
    {
      id: 'drone_precision_agri',
      track: 'akmu',
      category: 'Drones & Precision Agriculture',
      srNo: '4',
      title: {
        en: 'Three Weeks Certificate Course on Drones for Precision Agriculture: Spraying and Hyperspectral Imaging',
        mr: 'अचूक शेतीसाठी कृषी ड्रोन प्रमाणपत्र अभ्यासक्रम: फवारणी व हायपरस्पेक्ट्रल इमेजिंग (३ आठवडे)'
      },
      duration: '3 Weeks (Aug 24 - Sep 13, 2022)',
      type: 'Offline / Residential Hands-on Certificate Course',
      project: 'World Bank NAHEP-CAAST-CSAWM Project & AKMU',
      target: {
        en: 'Post-Graduate Students, University Faculty, Technical Officers & Agri-Entrepreneurs',
        mr: 'पदव्युत्तर विद्यार्थी, विद्यापीठ शास्त्रज्ञ, तांत्रिक अधिकारी व कृषी उद्योजक'
      },
      organizer: {
        en: 'Agricultural Knowledge Management Unit (AKMU) & CAAST-CSAWM, MPKV Rahuri',
        mr: 'कृषी ज्ञान व्यवस्थापन कक्ष (AKMU) व कास्ट-सीएसएडब्लूएम, मफुकृवि राहुरी'
      },
      fileUrl: '/media/docs/trainings/4_Drone_Precision_Agriculture.pdf',
      externalUrl: 'https://mpkv.ac.in/Uploads/AKMU/Drone%20for%20Precision%20Agri_Brochure_updated_20220720114425_20220720122448.pdf',
      fileSize: '4.3 MB',
      topics: [
        { en: 'DGCA Guidelines & Drone Flight Operations', mr: 'डीजीसीए मार्गदर्शक तत्त्वे व ड्रोन उड्डाण संचलन' },
        { en: 'Hyperspectral & Multispectral Sensor Calibration', mr: 'हायपरस्पेक्ट्रल व मल्टीस्पेक्ट्रल सेन्सर कॅलिब्रेशन' },
        { en: 'Automated Variable Rate Spraying for Crops', mr: 'पिकांवर स्वयंचलित व्हेरिएबल रेट फवारणी तंत्रज्ञान' },
        { en: 'UAV Flight Mission Planning & Aerial Photogrammetry', mr: 'युएव्ही मिशन प्लॅनिंग व एरियल फोटोग्रामेट्री मॅपिंग' }
      ],
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      icon: Plane
    },
    {
      id: 'ml_climate_smart_agri',
      track: 'akmu',
      category: 'Machine Learning & AI',
      srNo: '3',
      title: {
        en: 'National Online Training Programme on "Machine Learning and its Applications in Climate Smart Agriculture"',
        mr: 'हवामान अनुकूल शेतीमध्ये मशीन लर्निंग व कृत्रिम बुद्धिमत्ता (AI) ॲप्लिकेशन्स राष्ट्रीय प्रशिक्षण'
      },
      duration: '10 Days (Comprehensive Online Masterclass)',
      type: 'National Online Training with Hands-on Coding Labs',
      project: 'CAAST-CSAWM & AKMU',
      target: {
        en: 'Faculty, Research Scholars, Data Scientists & Ag-Tech Professionals',
        mr: 'प्राध्यापक, संशोधक विद्यार्थी, डेटा शास्त्रज्ञ व तंत्रज्ञान तज्ज्ञ'
      },
      organizer: {
        en: 'Centre for Advanced Agricultural Science and Technology (CAAST-CSAWM) & AKMU',
        mr: 'प्रगत कृषी विज्ञान व तंत्रज्ञान केंद्र (CAAST-CSAWM) व एकेएमयू'
      },
      fileUrl: '/media/docs/trainings/3_Machine_Learning_Agriculture.pdf',
      externalUrl: 'https://mpkv.ac.in/Uploads/AKMU/Brochure%20&%20Schedule%20-Machine%20%20Learning_20200511010014.pdf',
      fileSize: '2.0 MB',
      topics: [
        { en: 'Supervised & Unsupervised Machine Learning Algorithms', mr: 'पर्यवेक्षित व अपर्यवेक्षित मशीन लर्निंग अल्गोरिदम्स' },
        { en: 'Crop Yield Prediction Models & Weather Forecasting', mr: 'पीक उत्पादन अंदाज मॉडेल्स व हवामान अंदाज' },
        { en: 'Satellite Multi-Band Image Classification using Python', mr: 'पायथॉन (Python) द्वारे उपग्रह प्रतिमा वर्गीकरण' },
        { en: 'Pest and Disease Forecasting Systems using Deep Learning', mr: 'डीप लर्निंगद्वारे कीड-रोग प्रादुर्भाव पूर्वअंदाज' }
      ],
      badgeColor: 'bg-blue-100 text-blue-950 border-blue-300',
      icon: BrainCircuit
    },
    {
      id: 'ict_extension_csa',
      track: 'akmu',
      category: 'ICT & Digital Extension',
      srNo: '2',
      title: {
        en: 'ICT for Effective Knowledge and Extension Delivery for Climate Smart Agriculture & Water Management Technologies',
        mr: 'हवामान अनुकूल शेती व जलव्यवस्थापनासाठी माहिती व संप्रेषण तंत्रज्ञान (ICT) आणि विस्तार वितरण'
      },
      duration: 'National Level Training Program',
      type: 'Specialized Extension & IT Workshop',
      project: 'AKMU & Directorate of Extension Education',
      target: {
        en: 'Extension Functionaries, KVK Scientists, SMS & Agricultural Officers',
        mr: 'विस्तार कार्यकर्ते, केव्हीके शास्त्रज्ञ, विषय विशेषज्ञ व कृषी अधिकारी'
      },
      organizer: {
        en: 'Agricultural Knowledge Management Unit (AKMU), MPKV Rahuri',
        mr: 'कृषी ज्ञान व्यवस्थापन कक्ष (AKMU), मफुकृवि राहुरी'
      },
      fileUrl: '/media/docs/trainings/2_ICT_Knowledge_Extension.pdf',
      externalUrl: 'https://mpkv.ac.in/Uploads/AKMU/4.ICT%20for%20Effective%20Knowledge%20and%20Extension%20delivery%20for%20Climate%20Smart%20Agriculture%20and%20Water%20Management%20Technologies_20191207010948.pdf',
      fileSize: '1.3 MB',
      topics: [
        { en: 'Mobile Agri-Apps, SMS Portals & Kisan Advisory Services', mr: 'कृषी ॲप्स, एसएमएस पोर्टल्स व शेतकरी सल्लागार सेवा' },
        { en: 'Decision Support Systems (DSS) for Water Management', mr: 'जलव्यवस्थापनासाठी डिसिजन सपोर्ट सिस्टीम्स (DSS)' },
        { en: 'Interactive Digital Media & Video Production for Farmers', mr: 'शेतकऱ्यांसाठी डिजिटल ऑडिओ-व्हिडिओ तंत्रज्ञान निर्मिती' },
        { en: 'IoT-enabled Soil Moisture & Weather Telemetry Networks', mr: 'आयओटी (IoT) आधारित माती ओलावा व हवामान सेन्सर' }
      ],
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300',
      icon: Radio
    },
    {
      id: 'hyperspectral_remote_sensing',
      track: 'akmu',
      category: 'Remote Sensing & GIS',
      srNo: '1',
      title: {
        en: 'Hyperspectral Remote Sensing and Spectroradiometry Instruments Roles in Climate Smart Agriculture Development',
        mr: 'हवामान अनुकूल शेती विकासात हायपरस्पेक्ट्रल रिमोट सेन्सिंग व स्पेक्ट्रोरॅडिओमेट्री उपकरणांची भूमिका'
      },
      duration: 'Advanced Scientific Workshop',
      type: 'Instrument Hands-on Masterclass',
      project: 'CAAST-CSAWM & AKMU',
      target: {
        en: 'Agronomists, Soil Scientists, Remote Sensing Specialists & Researchers',
        mr: 'कृषिविज्ञ, मृद शास्त्रज्ञ, रिमोट सेन्सिंग तज्ज्ञ व संशोधक'
      },
      organizer: {
        en: 'Centre for Advanced Agricultural Science and Technology (CAAST) & AKMU',
        mr: 'कास्ट-सीएसएडब्लूएम व कृषी ज्ञान व्यवस्थापन कक्ष'
      },
      fileUrl: '/media/docs/trainings/1_Hyperspectral_Remote_Sensing.pdf',
      externalUrl: 'https://mpkv.ac.in/Uploads/AKMU/3.Hyperspectral%20Remote%20Sensing%20and%20Spectroradiometry%20Instruments%20Roles%20in%20Climate%20Smart%20Agriculture%20Development_20191207010917.pdf',
      fileSize: '1.3 MB',
      topics: [
        { en: 'Field Spectroradiometer Operation & Spectral Signatures', mr: 'फील्ड स्पेक्ट्रोरॅडिओमीटर हाताळणी व पिकांच्या स्पेक्ट्रल सिग्नेचर्स' },
        { en: 'Narrow-band Vegetation Indices for Chlorophyll & Nitrogen', mr: 'पिकांमधील क्लोरोफिल व नायट्रोजनसाठी नॅरो-बँड निर्देशांक' },
        { en: 'Plant Water Stress Diagnostics & Canopy Reflectance', mr: 'कॅनॉपी परावर्तनाद्वारे वनस्पती ताण व पाण्याचे प्रमाण निदान' },
        { en: 'Hyperspectral Satellite Data Integration with Ground Truth', mr: 'उपग्रह डेटा व प्रत्यक्ष जमिनीवरील नोंदींचा मेळ' }
      ],
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
      icon: Cpu
    }
  ];

  // Institutional tracks
  const institutionalTracks = pageData?.institutionalTracks || [
    {
      id: 'caft',
      track: 'faculty',
      title: {
        en: 'ICAR Centre of Advanced Faculty Training (CAFT)',
        mr: 'आयसीएआर प्रगत प्राध्यापक प्रशिक्षण केंद्र (CAFT)'
      },
      duration: '21 Days (National Level Residential)',
      target: {
        en: 'Assistant / Associate Professors & Scientists across ICAR Institutes & SAUs',
        mr: 'देशभरातील कृषी विद्यापीठ प्राध्यापक व आयसीएआर शास्त्रज्ञ'
      },
      organizer: {
        en: 'Post Graduate Institute (PGI), MPKV Rahuri',
        mr: 'पदव्युत्तर संस्था (PGI), मफुकृवि राहुरी'
      },
      topics: [
        { en: 'Advanced Genomics, Gene Editing & Molecular Breeding', mr: 'प्रगत जीनोमिक्स, जनुक संपादन व आण्विक पैदास' },
        { en: 'Bio-Analytical Tools & Chemical Residue Analysis', mr: 'बायो-ॲनालिटिकल तंत्रज्ञान व कीटकनाशक अंश तपासणी' },
        { en: 'Sensor-based Automated Micro-Irrigation & Fertigation', mr: 'सेन्सर आधारित स्वयंचलित सूक्ष्म सिंचन व खत व्यवस्थापन' }
      ],
      badgeColor: 'bg-rose-100 text-rose-950 border-rose-300',
      icon: Award
    },
    {
      id: 'mtc',
      track: 'officers',
      title: {
        en: 'ICAR Model Training Courses (MTC)',
        mr: 'आयसीएआर मॉडेल प्रशिक्षण अभ्यासक्रम (MTC)'
      },
      duration: '8 Days (Residential Workshop)',
      target: {
        en: 'State Agriculture Department Officers, Sub-Divisional Officers & SMS',
        mr: 'राज्य कृषी विभाग अधिकारी, उपविभागीय अधिकारी व विषय विशेषज्ञ'
      },
      organizer: {
        en: 'Directorate of Extension Education, MPKV Rahuri',
        mr: 'विस्तार शिक्षण संचालनालय, मफुकृवि राहुरी'
      },
      topics: [
        { en: 'Climate-Resilient Agriculture & Contingency Planning', mr: 'हवामान अनुकूल शेती तंत्रज्ञान व आपत्कालीन पीक नियोजन' },
        { en: 'Integrated Pest Management (IPM) & Biocontrol Production', mr: 'एकात्मिक कीड व्यवस्थापन व जैविक कीटकनाशक निर्मिती' },
        { en: 'Strengthening Farmer Producer Organizations (FPOs)', mr: 'शेतकरी उत्पादक कंपन्यांचे (FPC/FPO) व्यावसायिक बळकटीकरण' }
      ],
      badgeColor: 'bg-teal-100 text-teal-950 border-teal-300',
      icon: Target
    },
    {
      id: 'vocational_kvk',
      track: 'farmers',
      title: {
        en: 'Vocational Agri-Skills & Entrepreneurship Development',
        mr: 'व्यावसायिक कृषी कौशल्य व ग्रामीण उद्योजकता प्रशिक्षण'
      },
      duration: '1 to 7 Days (Practical Field Hands-on)',
      target: {
        en: 'Rural Youth, Women Self-Help Groups (SHGs) & Progressive Farmers',
        mr: 'ग्रामीण युवक, महिला बचत गट व प्रगतशील शेतकरी'
      },
      organizer: {
        en: '4 Krishi Vigyan Kendras (Dhule, Nandurbar, Borgaon, Mohol) & ATIC',
        mr: '४ कृषी विज्ञान केंद्रे (धुळे, नंदुरबार, बोरगाव, मोहोळ) व ॲटिक राहुरी'
      },
      topics: [
        { en: 'Commercial Nursery Management & Fruit Tree Grafting', mr: 'व्यावसायिक रोपवाटिका व्यवस्थापन व फळझाडे कलमे बांधणी' },
        { en: 'Jaggery Powder, Spices & Agro-Food Processing Units', mr: 'गुळ पावडर, मसाला प्रक्रिया व अन्नप्रक्रिया लघुउद्योग' },
        { en: 'Silage Making, Hydroponic Fodder & Goat/Dairy Management', mr: 'मुरघास निर्मिती, हायड्रोपोनिक्स चारा व दुग्ध-शेळीपालन' }
      ],
      badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300',
      icon: Sprout
    }
  ];

  // Combined programs list
  const allPrograms = useMemo(() => {
    return [...officialAkmuPrograms, ...institutionalTracks];
  }, [officialAkmuPrograms, institutionalTracks]);

  // Filtered programs based on track & search query
  const filteredPrograms = useMemo(() => {
    return allPrograms.filter((p: any) => {
      const matchesTrack = selectedTrack === 'all' || p.track === selectedTrack;
      if (!matchesTrack) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const tEn = p.title?.en?.toLowerCase() || '';
      const tMr = p.title?.mr?.toLowerCase() || '';
      const orgEn = p.organizer?.en?.toLowerCase() || '';
      const orgMr = p.organizer?.mr?.toLowerCase() || '';
      return tEn.includes(q) || tMr.includes(q) || orgEn.includes(q) || orgMr.includes(q);
    });
  }, [allPrograms, selectedTrack, searchQuery]);

  const trackTabs = [
    { id: 'all', labelEn: `All Programs (${allPrograms.length})`, labelMr: `सर्व अभ्यासक्रम (${allPrograms.length})`, icon: Layers },
    { id: 'akmu', labelEn: `AKMU National Courses (${officialAkmuPrograms.length})`, labelMr: `एकेएमयू राष्ट्रीय प्रशिक्षण (${officialAkmuPrograms.length})`, icon: Cpu },
    { id: 'faculty', labelEn: 'Faculty CAFT (21-Day)', labelMr: 'प्राध्यापक CAFT (२१ दिवस)', icon: Award },
    { id: 'officers', labelEn: 'Officers MTC (8-Day)', labelMr: 'अधिकारी MTC (८ दिवस)', icon: Target },
    { id: 'farmers', labelEn: 'Farmers & Youth (KVKs)', labelMr: 'शेतकरी व युवक (केव्हीके)', icon: Sprout }
  ];

  return (
    <div className="w-full bg-[#f8faf8] min-h-screen text-slate-800">
      
      {/* 1. Breadcrumb Strip */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <div className="w-full max-w-[1720px] mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
          <Link href="/" className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <Link href="/administration" className="hover:text-emerald-800 transition-colors">
            {language === 'mr' ? 'सुविधा व प्रशासन' : 'Facilities & Administration'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md">
            {language === 'mr' ? 'प्रशिक्षण व प्रगत कार्यशाळा' : 'Trainings & Advanced Workshops'}
          </span>
          {selectedTrack !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-stone-500 font-medium truncate">
                {language === 'mr'
                  ? trackTabs.find((t) => t.id === selectedTrack)?.labelMr
                  : trackTabs.find((t) => t.id === selectedTrack)?.labelEn}
              </span>
            </>
          )}
        </div>
      </div>

      {/* 2. Hero Header: Tech Emerald & Smart Agriculture Theme */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2a1c] via-[#0f3826] to-[#071a10] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-700/50">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-amber-300 text-xs font-bold tracking-wide uppercase shadow-inner">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'mr' ? 'एकेएमयू व क्षमता संवर्धन कक्ष' : 'AKMU & Capacity Building Directorate'}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-serif leading-tight">
                {language === 'mr' ? 'प्रशिक्षण, कार्यशाळा व क्षमता संवर्धन' : 'Trainings, Workshops & Capacity Building'}
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed max-w-3xl">
                {language === 'mr'
                  ? 'कृषी ज्ञान व्यवस्थापन कक्ष (AKMU), जागतिक बँक CAAST-CSAWM प्रकल्प व विस्तार संचालनालयाद्वारे आयोजित कृषी ड्रोन, मशीन लर्निंग, रिमोट सेन्सिंग व शाश्वत कृषी तंत्रज्ञान प्रगत राष्ट्रीय अभ्यासक्रम.'
                  : 'Advanced national training programs, certificate courses in precision drones, AI/ML in climate-smart agriculture, hyperspectral imaging, CAFT faculty development, and vocational farm entrepreneurship.'}
              </p>
            </div>

            {/* Quick Mandate Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? 'कृषी ड्रोन प्रमाणपत्र अभ्यासक्रम' : 'Drones in Precision Agri (3 Weeks)'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? 'मशीन लर्निंग व एआय (AI) लॅब' : 'AI/ML in Climate Smart Agri'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? 'हायपरस्पेक्ट्रल रिमोट सेन्सिंग' : 'Hyperspectral Remote Sensing'}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-emerald-200 border border-white/10 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? '२१ दिवसीय राष्ट्रीय CAFT शाळा' : '21-Day ICAR CAFT Programs'}</span>
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Main Navigation & Content Section */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16 space-y-8">

        {/* AKMU Digital Unit Spotlight Card */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>{language === 'mr' ? 'डिजिटल तंत्रज्ञान केंद्र' : 'Digital Knowledge Backbone'}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                {getBilingual(akmuOverview.center)}
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <a
                href={`tel:${akmuOverview.contact?.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>{akmuOverview.contact?.phone}</span>
              </a>
              <a
                href={`mailto:${akmuOverview.contact?.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 font-bold transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-700" />
                <span>{akmuOverview.contact?.email}</span>
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            {getBilingual(akmuOverview.mandate)}
          </p>
        </div>

        {/* Track Filter Strip with Guaranteed Wrapping */}
        <div className="w-full p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs overflow-visible">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div
              className="flex flex-wrap items-center gap-2 w-full md:w-auto"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
            >
              {trackTabs.map((tab) => {
                const isActive = selectedTrack === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedTrack(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                      isActive
                        ? 'bg-emerald-900 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                    <span className="whitespace-nowrap">{language === 'mr' ? tab.labelMr : tab.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Real-time Search Box */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'प्रशिक्षण किंवा विषय शोधा...' : 'Search training or topic...'}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-medium focus:bg-white focus:outline-emerald-700 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
              {language === 'mr' ? 'सक्रिय प्रशिक्षण अभ्यासक्रम व कार्यशाळा' : 'Active Training Calendar & Course Modules'}
            </h3>
          </div>
          <span className="text-xs font-bold text-stone-500">
            {language === 'mr' ? `एकूण ${filteredPrograms.length} उपक्रम` : `${filteredPrograms.length} Programs Found`}
          </span>
        </div>

        {/* Training Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((p: any) => {
            const Icon = p.icon || Briefcase;
            const isAkmu = p.track === 'akmu';
            return (
              <div
                key={p.id}
                className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group space-y-5"
              >
                <div className="space-y-4">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${p.badgeColor}`}>
                      {p.duration}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                      {p.category || p.track.toUpperCase()}
                    </span>
                  </div>

                  {/* Program Title */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors font-serif leading-snug">
                      {getBilingual(p.title)}
                    </h4>
                    <div className="mt-2 text-xs text-stone-600 flex items-start gap-1.5 font-medium">
                      <strong className="text-slate-800 shrink-0">{language === 'mr' ? 'पात्र लाभार्थी: ' : 'Target Audience: '}</strong>
                      <span>{getBilingual(p.target)}</span>
                    </div>
                  </div>

                  {/* Core Curriculum Points */}
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block">
                      {language === 'mr' ? 'अभ्यासक्रमातील प्रमुख विषय व कौशल्ये' : 'Core Training Curriculum & Hands-on Modules'}
                    </span>
                    <div className="space-y-1.5">
                      {p.topics.map((t: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{getBilingual(t)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Organizing Wing & Project */}
                  <div className="pt-2 text-xs text-stone-500 font-medium">
                    <div>
                      <strong className="text-slate-700">{language === 'mr' ? 'आयोजक: ' : 'Organizer: '}</strong>
                      <span>{getBilingual(p.organizer)}</span>
                    </div>
                    {p.project && (
                      <div className="pt-0.5 text-emerald-800 font-semibold">
                        <span>{p.project}</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Footer Actions (Download Brochure for AKMU courses) */}
                <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  {p.fileUrl ? (
                    <div className="flex items-center gap-2">
                      <a
                        href={p.fileUrl}
                        download
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{language === 'mr' ? 'माहितीपत्रक (PDF)' : 'Brochure & Schedule'}</span>
                      </a>
                      {p.externalUrl && (
                        <a
                          href={p.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-bold transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                        </a>
                      )}
                    </div>
                  ) : (
                    <span className="text-[11px] font-mono text-stone-500 font-medium">
                      {language === 'mr' ? 'विस्तार शिक्षण संचालनालय वेळापत्रक' : 'Extension Directorate Calendar'}
                    </span>
                  )}

                  <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{language === 'mr' ? 'प्रवेश / नोंदणी सुरू' : 'Admission / Enrolment Open'}</span>
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Application & Enrolment Procedure Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white space-y-4">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'mr' ? 'नोंदणी व प्रवेश मार्गदर्शक तत्त्वे' : 'How to Apply & Enrolment Procedure'}</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold font-serif">
            {language === 'mr'
              ? 'प्रशिक्षणात सहभागी होण्यासाठी अधिकृत कार्यपद्धती'
              : 'Enrolment Workflow for University Advanced Training Programs'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-stone-300">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[11px]">1</span>
              <h5 className="font-bold text-white text-sm">{language === 'mr' ? 'माहितीपत्रक पहा' : 'Review Brochure'}</h5>
              <p className="leading-relaxed text-stone-400">
                {language === 'mr'
                  ? 'अभ्यासक्रमाचे वेळापत्रक, पात्रता निकष व आवश्यक तांत्रिक अर्हता संबंधित माहितीपत्रकातून तपासा.'
                  : 'Check eligibility, prerequisites, and program schedule in the downloaded PDF brochure.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[11px]">2</span>
              <h5 className="font-bold text-white text-sm">{language === 'mr' ? 'विहित नमुन्यात अर्ज' : 'Submit Application'}</h5>
              <p className="leading-relaxed text-stone-400">
                {language === 'mr'
                  ? 'आपल्या संस्थेमार्फत किंवा ऑनलाइन पोर्टलवरून विहित नमुन्यातील अर्ज अधिकृत शिफारसीसह सादर करा.'
                  : 'Submit nomination through your sponsoring institute or register online through the AKMU/CAAST portal.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[11px]">3</span>
              <h5 className="font-bold text-white text-sm">{language === 'mr' ? 'प्रवेश निश्चिती व प्रमाणपत्र' : 'Selection & Certificate'}</h5>
              <p className="leading-relaxed text-stone-400">
                {language === 'mr'
                  ? 'निवड यादी जाहीर झाल्यानंतर प्रशिक्षण पूर्ण करून प्रात्यक्षिक मूल्यमापनाअंती अधिकृत प्रमाणपत्र प्राप्त करा.'
                  : 'Selected candidates receive admission confirmation and official ICAR/CAAST completion certificates upon assessment.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
