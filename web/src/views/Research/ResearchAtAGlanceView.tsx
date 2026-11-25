'use client';

import React from 'react';
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
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

interface ResearchAtAGlanceViewProps {
  pageData?: any;
}

export const ResearchAtAGlanceView: React.FC<ResearchAtAGlanceViewProps> = ({ pageData }) => {
  const { language } = useLanguage();

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
      subMr: '५३+ वर्षांचे ऐतिहासिक योगदान',
      subEn: 'Historic 53+ Years Legacy',
      icon: Sprout,
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300'
    },
    {
      value: '1,577+',
      labelMr: 'कृषी शिफारसी',
      labelEn: 'Agro Recommendations',
      subMr: 'शेतकऱ्यांसाठी संयुक्त अग्रेस्को शिफारसी',
      subEn: 'Joint AGRESCO Validated',
      icon: CheckCircle2,
      badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300'
    },
    {
      value: '6',
      labelMr: 'नोंदणीकृत पेटंट्स',
      labelEn: 'Granted Patents',
      subMr: '६२ मोबाईल व वेब अ‍ॅप्ससह डिजिटल प्रगती',
      subEn: 'Plus 62 University Agri Apps',
      icon: Award,
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300'
    }
  ];

  const landmarkVarieties = [
    {
      crop: { en: 'Sugarcane (ऊस)', mr: 'ऊस' },
      names: 'Co-86032 (Nira), CoM-265 (Phule 265)',
      descEn: 'CoM-265 transformed sugarcane productivity across Maharashtra and peninsular India with record sucrose recovery and drought endurance.',
      descMr: 'को-८६०३२ व कोएम-२६५ वाणांनी साखर उतारा आणि एकरी उत्पादनात क्रांती घडवून संपूर्ण महाराष्ट्रात नवा इतिहास घडवला.',
      badge: 'Cash Crop Giant'
    },
    {
      crop: { en: 'Pomegranate (डाळिंब)', mr: 'डाळिंब' },
      names: 'Bhagwa, Phule Super Bhagwa, Arakta',
      descEn: 'Bhagwa is the undisputed global benchmark for Indian pomegranate export, accounting for over 85% of commercial orchards in Maharashtra.',
      descMr: 'भगवा व फुले सुपर भगवा हे जागतिक पातळीवर निर्यातीसाठी मान्यताप्राप्त वाण ठरले असून राज्यातील ८५% क्षेत्र व्यापले आहे.',
      badge: 'Global Export Benchmark'
    },
    {
      crop: { en: 'Chickpea / Gram (हरभरा)', mr: 'हरभरा' },
      names: 'Digvijay, Vijay, Vikram, Phule Vikrant',
      descEn: 'Wilt-resistant and bold-seeded varieties that made Maharashtra a national leader in rabi pulse production.',
      descMr: 'मर रोगास अत्यंत प्रतिकारक्षम, अधिक उत्पादन देणारे दिग्विजय, विजय व विक्रम वाण शेतकऱ्यांमध्ये प्रचंड लोकप्रिय आहेत.',
      badge: 'Pulse Revolution'
    },
    {
      crop: { en: 'Soybean (सोयाबीन)', mr: 'सोयाबीन' },
      names: 'Phule Sangam (KDS-726), Phule Kimaya (KDS-753)',
      descEn: 'Rust-tolerant, non-shattering pods with high oil and protein content, producing superior pod yields in heavy rains.',
      descMr: 'तांबेरा रोगास सहनशील, शेंगा न तडकणारे आणि भरघोस उत्पादन देणारे फुले संगम व फुले किमया हे राज्यातील सर्वोच्च लोकप्रिय वाण आहेत.',
      badge: 'Farmer Favorite'
    },
    {
      crop: { en: 'Triple-Cross Cow (फुले त्रिवेणी गाय)', mr: 'फुले त्रिवेणी' },
      names: 'Phule Triveni (Holstein-Friesian × Jersey × Gir)',
      descEn: 'Triple-cross elite dairy cow engineered for Western Maharashtra climate, producing 3,500-4,000 liters milk per lactation with high fat.',
      descMr: 'होल्स्टिन फ्रिजियन (५०%), जर्सी (२५%) व गीर (२५%) यांचा तिहेरी संकर असलेली फुले त्रिवेणी गाय प्रति वेतात ३५००-४००० लिटर दूध देते.',
      badge: 'Dairy Innovation'
    },
    {
      crop: { en: 'Rabi Sorghum (रब्बी ज्वारी)', mr: 'रब्बी ज्वारी' },
      names: 'Phule Vasudha, Phule Revati, Phule Suchitra',
      descEn: 'Drought-hardy pearl white grain and sweet palatable stover, ideal for deep to medium black soils of scarcity zones.',
      descMr: 'अवर्षणग्रस्त कोरडवाहू भागासाठी टपोरे चमकदार दाणे आणि जनावरांसाठी पौष्टिक गोड कडबा देणारे फुले वसुधा व फुले रेवती वाण.',
      badge: 'Drought Resilient'
    }
  ];

  const agroZones = [
    {
      id: 'western-ghat-zone',
      titleEn: 'Western Ghat Zone',
      titleMr: 'पश्चिम घाट विभाग',
      rainfall: '>3000 mm',
      stations: 'Mahabaleshwar, Radhanagari, Lonavala',
      cropsEn: 'Wheat rust screening, strawberry, paddy, hill millets',
      cropsMr: 'तांबेरा संशोधन, स्ट्रॉबेरी, भात, नाचणी',
      color: 'border-emerald-300 hover:border-emerald-500 bg-emerald-50/50'
    },
    {
      id: 'sub-montane-zone',
      titleEn: 'Sub-Montane Zone',
      titleMr: 'उप-पर्वतीय विभाग',
      rainfall: '1250–3000 mm',
      stations: 'Kolhapur ZARS, Karad, Vadgaon, Kasbe Digraj',
      cropsEn: 'Jaggery, sugarcane, turmeric, soybean, groundnut',
      cropsMr: 'गूळ व ऊस, हळद, सोयाबीन, भुईमूग',
      color: 'border-teal-300 hover:border-teal-500 bg-teal-50/50'
    },
    {
      id: 'plain-zone',
      titleEn: 'Plain Zone',
      titleMr: 'मैदानी विभाग',
      rainfall: '700–1250 mm',
      stations: 'Rahuri Central Campus, Pune, Padegaon, Jalgaon, Niphad',
      cropsEn: 'Sugarcane, wheat, oilseeds, cotton, high-tech vegetables',
      cropsMr: 'ऊस, गहू, गळीतधान्ये, कापूस, भाजीपाला',
      color: 'border-blue-300 hover:border-blue-500 bg-blue-50/50'
    },
    {
      id: 'scarcity-zone',
      titleEn: 'Scarcity Zone',
      titleMr: 'अवर्षणग्रस्त विभाग',
      rainfall: '<700 mm',
      stations: 'Solapur ZARS, Mohol, Jeur, Chas, Pandharpur',
      cropsEn: 'Dryland farming, rabi sorghum, chickpea, pomegranate',
      cropsMr: 'कोरडवाहू शेती, रब्बी ज्वारी, हरभरा, डाळिंब',
      color: 'border-amber-300 hover:border-amber-500 bg-amber-50/50'
    },
    {
      id: 'central-plateau-zone',
      titleEn: 'Central Plateau Zone',
      titleMr: 'मध्य पठार विभाग',
      rainfall: '700–900 mm',
      stations: 'Igatpuri ZARS, Pimpalgaon Baswant, Lakhmapur, Jadhavwadi',
      cropsEn: 'Aromatic rice, grapes, onion, fig & custard apple',
      cropsMr: 'सुवासिक भात, द्राक्षे, कांदा, अंजीर व सीताफळ',
      color: 'border-purple-300 hover:border-purple-500 bg-purple-50/50'
    }
  ];

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
          en: 'Driving agricultural transformation across Western Maharashtra through 27 research stations, 45 ICAR-AICRP projects, 270+ released varieties, and climate-smart farmer innovations.',
          mr: 'पश्चिम महाराष्ट्रातील १० जिल्ह्यांत २७ संशोधन केंद्रे, ४५ अखिल भारतीय समन्वित प्रकल्प, २७०+ अधिक सुधारित पीक वाण आणि १५७७+ शिफारशींच्या माध्यमातून कृषी क्रांतीची धुरा.'
        }}
        quickChips={[
          { label: language === 'mr' ? '२७ संशोधन केंद्रे' : '27 Research Stations', icon: MapPin },
          { label: language === 'mr' ? '२७०+ विकसित पीक वाण' : '270+ Released Varieties', icon: Sprout },
          { label: language === 'mr' ? '१,५७७+ कृषी शिफारसी' : '1,577+ Agro Recommendations', icon: CheckCircle2 },
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

        {/* 2. Research Mandate & Institutional Framework */}
        <section className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-amber-200/90 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Microscope className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? 'संशोधन ध्येय व कार्यकक्षा' : 'Research Mandate & Jurisdiction'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'mr'
                  ? 'नैसर्गिक साधनसंपत्ती संवर्धन व शाश्वत कृषी उत्पादन'
                  : 'Natural Resource Management & Climate-Smart Sustainable Production'}
              </h2>
            </div>

            <Link
              href="/research/profile"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shrink-0 self-start md:self-auto"
            >
              <span>{language === 'mr' ? 'संस्थात्मक संरचना पहा' : 'View Directorate Structure'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-stone-700 leading-relaxed font-medium">
            <div className="space-y-4">
              <p className="text-justify">
                {language === 'mr'
                  ? 'पश्चिम महाराष्ट्रातील दहा जिल्ह्यांचा समावेश असलेले ५ हवामान विभाग (घाट, उप-पर्वतीय, मैदानी, अवर्षण प्रवण व मध्य पठारी विभाग) यात विद्यापीठाचे २७ संशोधन केंद्रे अविरत कार्यरत आहेत. या केंद्रांवर राज्य शासन अनुदानित ८२ योजनेतर योजना, भारतीय कृषी संशोधन परिषद (७५%) आणि राज्य शासन (२५%) अनुदानित ४५ अखिल भारतीय समन्वित प्रकल्प (AICRP) आणि केंद्र पुरस्कृत १००% अनुदानित प्रकल्पांमार्फत १०० हून अधिक पिकांवर सखोल संशोधन केले जाते.'
                  : 'The university commands an extensive network of 27 research stations spread across 5 distinct agro-climatic zones of Western Maharashtra. Research encompasses 82 non-plan schemes funded by the State Government, 45 All India Coordinated Research Projects (AICRPs) funded jointly by ICAR (75%) and the State Govt. (25%), and Centrally Sponsored Research Schemes spanning over 100 crop species.'}
              </p>
              <p className="text-justify">
                {language === 'mr'
                  ? 'गेल्या ५३ वर्षांत विद्यापीठाने तृणधान्ये, कडधान्ये, गळीतधान्ये, ऊस, कापूस, फळे, भाजीपाला, फुलपिके, चारापिके व पशुसंवर्धन यांमध्ये एकूण २७० हून अधिक सुधारित व संकरित वाण विकसित केले आहेत. मर्यादित सिंचन सुविधा लक्षात घेऊन कोरडवाहू शेती, मृद व जलसंधारण, पीक पद्धती, सूक्ष्म सिंचन व एकात्मिक कीड-रोग व्यवस्थापनावर भर दिला जातो.'
                  : 'Over the past 53 years, MPKV has developed and released more than 270 high-yielding varieties and hybrids across cereals, pulses, oilseeds, sugarcane, cotton, fruits, vegetables, flowers, and livestock. Priority is accorded to dryland technologies, rainwater harvesting, precision drip irrigation, and integrated pest/disease management.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf6eb] border border-amber-300 space-y-3.5">
              <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{language === 'mr' ? 'महत्त्वाचे संशोधन निष्कर्ष व यशोगाथा' : 'Core Research Breakthroughs'}</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>२७०+ सुधारित वाण:</strong> ऊस (CoM-265, Co-86032), डाळिंब (भगवा, फुले सुपर भगवा), हरभरा (दिग्विजय, विजय), सोयाबीन (फुले संगम).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>१,५७७+ संयुक्त अग्रेस्को शिफारसी:</strong> खते, पाणी व्यवस्थापन, तण व कीड नियंत्रण आणि संरक्षित शेती.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>६ अधिकृत पेटंट्स (२०२५-२६):</strong> सीताफळ गर चकत्या, आवळा साठवणूक, फुले नाचणी बिस्किटे व झाड ओळख प्रणाली.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>फुले त्रिवेणी तिहेरी संकरित गाय:</strong> प्रति वेतात ३५००-४००० लिटर दूध उत्पादन देणारी शाश्वत गोवंश क्रांती.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>६२ मोबाईल व वेब अ‍ॅप्स:</strong> स्मार्ट पीडीएम, फुले डेअरी, फुले जल व सिंचन वेळापत्रक द्वारे थेट शेतकरी संवाद.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Landmark Crop Varieties Showcase */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Sprout className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'mr' ? 'ऐतिहासिक पीक वाण व क्रांती' : 'Pioneering Varieties'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'mr' ? 'शेतकऱ्यांचे अर्थकारण बदलणारे प्रमुख वाण' : 'Landmark Varieties Transforming Farm Prosperity'}
              </h2>
            </div>

            <Link
              href="/research/varieties"
              className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-bold text-xs sm:text-sm group"
            >
              <span>{language === 'mr' ? 'सर्व १४ पीक गटांचे राजपत्र पहा' : 'Explore All 14 Crop Groups'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {landmarkVarieties.map((v, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                      {v.badge}
                    </span>
                    <span className="text-xs font-bold text-amber-700">
                      {language === 'mr' ? v.crop.mr : v.crop.en}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                    {v.names}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-medium">
                    {language === 'mr' ? v.descMr : v.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>{language === 'mr' ? 'विद्यापीठ निर्मित' : 'MPKV Developed'}</span>
                  <Link href="/research/varieties" className="hover:underline flex items-center gap-1">
                    <span>{language === 'mr' ? 'तपशील' : 'PDF Details'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Five Agro-Climatic Research Zones Interactive Bento */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-100 text-teal-950 border border-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-teal-700" />
                <span>{language === 'mr' ? '५ कृषी हवामान विभाग' : '5 Agro-Climatic Zones'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'mr' ? 'हवामाननिहाय संशोधन केंद्रे व कार्यक्षेत्र' : 'Regional Stations by Agro-Climatic Zone'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agroZones.map((z, idx) => (
              <Link
                key={idx}
                href={`/research/${z.id}`}
                className={`p-5 rounded-2xl border ${z.color} shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{language === 'mr' ? z.titleMr : z.titleEn}</span>
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-white text-slate-800 border border-stone-200">
                      {z.rainfall}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-stone-500 uppercase">
                      {language === 'mr' ? 'प्रमुख संशोधन केंद्रे' : 'Key Stations'}
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mt-0.5">
                      {z.stations}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-stone-500 uppercase">
                      {language === 'mr' ? 'संशोधन पिके व कार्य' : 'Mandate Crops'}
                    </div>
                    <div className="text-xs text-stone-700 mt-0.5 font-medium">
                      {language === 'mr' ? z.cropsMr : z.cropsEn}
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
                  <span>{language === 'mr' ? 'विभाग माहिती उघडा' : 'Explore Zone'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}

            {/* Quick Links Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white flex flex-col justify-between shadow-md">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase">
                  <Layers className="w-3 h-3 text-amber-300" />
                  <span>{language === 'mr' ? 'योजना व प्रकल्प' : 'Schemes & AICRP'}</span>
                </div>
                <h3 className="text-base font-bold text-white font-serif">
                  {language === 'mr' ? '८२ योजनेतर व ४५ AICRP संशोधन प्रकल्प' : '82 Non-Plan & 45 AICRP Research Schemes'}
                </h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                  {language === 'mr'
                    ? 'सर्व केंद्रांचे अधिकृत अहवाल, कार्ययोजना आणि शासन अनुदानित योजनांची माहिती.'
                    : 'Access verified government scheme circulars, AICRP project progress, and budget summaries.'}
                </p>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href="/research/aicrp"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                >
                  <span>{language === 'mr' ? 'ICAR-AICRP प्रकल्प (४५)' : 'ICAR-AICRP Projects (45)'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/research/state-schemes"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                >
                  <span>{language === 'mr' ? 'राज्य शासन योजना (५४)' : 'State Non-Plan Schemes (54)'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. National & International Research Collaborations (MoUs) */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {language === 'mr' ? 'राष्ट्रीय व आंतरराष्ट्रीय संशोधन सामंजस्य करार (MoUs)' : 'National & International Research Collaborations'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
            {language === 'mr'
              ? 'विद्यापीठाने आयआयटी मुंबई (IIT Bombay), आंतरराष्ट्रीय अर्ध-शुष्क उष्णकटिबंधीय पीक संशोधन संस्था (ICRISAT), आंतरराष्ट्रीय भात संशोधन संस्था (IRRI), आणि आंतरराष्ट्रीय मका व गहू सुधारणा केंद्र (CIMMYT) यांच्याशी प्रगत जैवतंत्रज्ञान, ड्रोन व हवामान बदलांवर संशोधनासाठी करार केले आहेत.'
              : 'MPKV has active MoUs with premier national and global research institutions including IIT Bombay, ICRISAT, IRRI, CIMMYT, and central ICAR institutes for high-tech sensor monitoring, genomics, molecular breeding, and climate resilience.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
              <span className="text-xs font-bold text-slate-900 block">IIT Bombay</span>
              <span className="text-[10px] text-stone-500 font-medium">{language === 'mr' ? 'एआय व आयओटी सेन्सर्स' : 'AI & Drone Sensors'}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
              <span className="text-xs font-bold text-slate-900 block">ICRISAT</span>
              <span className="text-[10px] text-stone-500 font-medium">{language === 'mr' ? 'कोरडवाहू तृणधान्ये' : 'Dryland Millets & Chickpea'}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
              <span className="text-xs font-bold text-slate-900 block">IRRI</span>
              <span className="text-[10px] text-stone-500 font-medium">{language === 'mr' ? 'भात वाण विकास' : 'Rice Germplasm Exchange'}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
              <span className="text-xs font-bold text-slate-900 block">CIMMYT</span>
              <span className="text-[10px] text-stone-500 font-medium">{language === 'mr' ? 'गहू व मका सुधारणा' : 'Wheat & Maize Breeding'}</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
