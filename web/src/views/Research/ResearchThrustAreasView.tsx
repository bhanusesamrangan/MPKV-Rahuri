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
  Filter
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
      titleEn: 'Genetic Enhancement & Biofortification of Staple Crops',
      titleMr: 'प्रमुख पिकांची आनुवंशिक सुधारणा व जैव-पोषक संवर्धन',
      badge: 'Nutritional Security',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
      icon: Sprout,
      highlightsEn: [
        'Marker-Assisted Selection (MAS) for disease resistance in chickpea, soybean, and pearl millet.',
        'Biofortified iron and zinc-rich varieties of sorghum, bajra, and minor millets.',
        'High-sucrose recovery sugarcane genotypes resistant to woolly aphid and red rot.',
        'Development of export-grade pomegranate, guava, and custard apple clones.'
      ],
      highlightsMr: [
        'हरभरा, सोयाबीन व बाजरीमध्ये मार्कर-असिस्टेड निवडीद्वारे रोगप्रतिकारक्षम वाण निर्मिती.',
        'लोह (Iron) व जस्त (Zinc) समृद्ध ज्वारी, बाजरी व पोषक तृणधान्यांचे वाण.',
        'अधिक साखर उतारा व लोकरी मावा सहनशील ऊसाचे सुधारित क्लोन्स.',
        'निर्यातक्षम डाळिंब, पेरू व सीताफळ पिकांच्या उच्च दर्जाच्या कलमांची निर्मिती.'
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
      titleEn: 'Digital Agriculture, Drone Robotics & Sensor Networks',
      titleMr: 'डिजिटल कृषी, ड्रोन तंत्रज्ञान व एआय आधारित सेन्सर्स',
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
      titleEn: 'Soil Health Restoration, Carbon Sequestration & Bio-Inputs',
      titleMr: 'मृदा आरोग्य संवर्धन, सेंद्रिय कर्ब वाढ व जैविक खते',
      badge: 'Soil Regeneration',
      badgeColor: 'bg-teal-100 text-teal-950 border-teal-300',
      icon: Sparkles,
      highlightsEn: [
        'Soil fertility mapping across 10 districts using GIS and remote sensing.',
        'Commercial production of Phule Liquid Biofertilizers (Azotobacter, Rhizobium, PSB, KMB).',
        'Techniques for reclaiming saline-sodic soils through sub-surface drainage and green manuring.',
        'Long-term fertilizer experiments (LTFE) analyzing carbon sequestration in soil horizons.'
      ],
      highlightsMr: [
        '१० जिल्ह्यांतील जमिनींचे जीआयएस (GIS) तंत्रज्ञानाद्वारे सुपीकता नकाशे तयार करणे.',
        'फुले लिक्विड बायोफर्टिलायझर्स (रायझोबियम, अझोटोबॅक्टर, पीएसबी, केएमबी) ची निर्मिती.',
        'खारवट व चोपण जमिनींची सुधारणा करण्यासाठी निचरा प्रणाली व हिरवळीच्या खतांचा वापर.',
        'दीर्घकालीन खत प्रयोगांद्वारे (LTFE) जमिनीतील सेंद्रिय कर्ब वाढीचे शास्त्रीय मूल्यमापन.'
      ],
      impactEn: 'Rejuvenating soil microbiome and restoring degraded arable land.',
      impactMr: 'जमिनीची सुपीकता पुनर्स्थापित करणे व सूक्ष्मजीव परिसंस्थेचे संवर्धन.'
    },
    {
      id: 'post-harvest',
      category: 'crop',
      num: '07',
      titleEn: 'Post-Harvest Technology, Value Addition & Cold Chain',
      titleMr: 'काढणीपश्चात तंत्रज्ञान, मूल्यवर्धन व शीतसाखळी व्यवस्थापन',
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
      titleEn: 'Indigenous & Crossbred Livestock Improvement',
      titleMr: 'देशी गोवंश संवर्धन, फुले त्रिवेणी सुधारणा व चारा तंत्रज्ञान',
      badge: 'Livestock Prosperity',
      badgeColor: 'bg-blue-100 text-blue-950 border-blue-300',
      icon: Target,
      highlightsEn: [
        'Genetic refinement of Phule Triveni triple-cross cow for high milk solids and disease tolerance.',
        'Conservation and selective breeding of native cattle breeds (Gir, Khillari, Dangi).',
        'Year-round nutritious fodder production models (Phule Jaywant, Phule Gunwant, Napier hybrids).',
        'Silage making techniques and balanced total mixed ration (TMR) feed blocks.'
      ],
      highlightsMr: [
        'फुले त्रिवेणी तिहेरी संकरित गाईची दुध क्षमता व रोगप्रतिकारशक्ती वृद्धिंगत करणे.',
        'गीर, खिल्लार व डांगी या देशी गोवंशाचे संवर्धन व शास्त्रीय पैदास कार्यक्रम.',
        'वर्षभर हिरव्या चाऱ्यासाठी फुले जयवंत, फुले गुणवंत हायब्रिड नेपिअर गवत वाण.',
        'मुरघास (Silage) तंत्रज्ञान आणि संतुलित पशुखाद्य (TMR) ब्लॉक्सचे उत्पादन.'
      ],
      impactEn: 'Sustainable secondary income stream for small and marginal landholders.',
      impactMr: 'अल्प व अत्यल्प भूधारक शेतकऱ्यांना दुग्ध व्यवसायातून शाश्वत पूरक उत्पन्नाची हमी.'
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
        badge={{ en: 'Strategic Priorities 2025–2030', mr: 'धोरणात्मक प्राधान्यक्रम २०२५-२०३०' }}
        title={{
          en: 'Research Thrust Areas — Directorate of Research',
          mr: 'संशोधन प्राधान्यक्रम — संशोधन संचालनालय, राहुरी'
        }}
        subtitle={{
          en: 'Targeted scientific focus across climate-smart agronomy, biofortified crops, automated micro-irrigation, drone sensors, biocontrol, and post-harvest value addition.',
          mr: 'हवामान-अनुकूल शेती, पोषक पीक वाण, अचूक सूक्ष्म सिंचन, ड्रोन तंत्रज्ञान, जैविक कीड नियंत्रण व काढणीपश्चात मूल्यवर्धनावर केंद्रित संशोधन ध्येये.'
        }}
        quickChips={[
          { label: language === 'mr' ? '८ मुख्य प्राधान्य क्षेत्रे' : '8 Core Thrust Areas', icon: Target },
          { label: language === 'mr' ? 'हवामान बदल अनुकूलन' : 'Climate Resilience', icon: Droplets },
          { label: language === 'mr' ? 'डिजिटल व अचूक शेती' : 'Precision & AI Agriculture', icon: Cpu },
          { label: language === 'mr' ? 'विषमुक्त अन्न सुरक्षा' : 'Zero Residue Food', icon: ShieldCheck }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 space-y-10">

        {/* Category Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-teal-700" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              {language === 'mr' ? 'विषयानुसार वर्गवारी:' : 'Filter by Domain:'}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-stone-200/80 p-1.5 rounded-2xl border border-stone-300 text-xs font-bold">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeCategory === 'all'
                  ? 'bg-teal-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              {language === 'mr' ? 'सर्व ८ क्षेत्रे' : 'All (8 Pillars)'}
            </button>
            <button
              onClick={() => setActiveCategory('crop')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeCategory === 'crop'
                  ? 'bg-teal-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              {language === 'mr' ? 'पीक सुधारणा व संरक्षण' : 'Crops & Protection'}
            </button>
            <button
              onClick={() => setActiveCategory('resource')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeCategory === 'resource'
                  ? 'bg-teal-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              {language === 'mr' ? 'जल व मृदा संवर्धन' : 'Water & Soil'}
            </button>
            <button
              onClick={() => setActiveCategory('digital')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeCategory === 'digital'
                  ? 'bg-teal-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              {language === 'mr' ? 'डिजिटल व ड्रोन' : 'Digital & AI'}
            </button>
            <button
              onClick={() => setActiveCategory('livestock')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeCategory === 'livestock'
                  ? 'bg-teal-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              {language === 'mr' ? 'पशुसंवर्धन व चारा' : 'Livestock'}
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
                      <div className="w-10 h-10 rounded-2xl bg-teal-950 text-amber-300 font-extrabold text-sm flex items-center justify-center font-serif shadow-xs">
                        {p.num}
                      </div>
                      <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-md border ${p.badgeColor}`}>
                        {p.badge}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-stone-100 text-teal-800 border border-stone-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif leading-snug">
                    {language === 'mr' ? p.titleMr : p.titleEn}
                  </h3>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 text-xs sm:text-[13px] text-stone-700 leading-relaxed font-medium">
                    {(language === 'mr' ? p.highlightsMr : p.highlightsEn).map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Card Footer: Impact Banner */}
                <div className="pt-4 mt-5 border-t border-stone-200/80">
                  <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs font-semibold text-teal-950 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>{language === 'mr' ? p.impactMr : p.impactEn}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
