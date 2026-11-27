'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FlaskConical,
  Download,
  ExternalLink,
  ArrowRight,
  PackageCheck,
  Sparkles,
  Droplets,
  Sprout,
  ShieldAlert,
  Phone,
  ZoomIn,
  X,
  CheckCircle2,
  Beaker,
  IndianRupee,
  Clock,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FarmerBreadcrumb } from './components/FarmerBreadcrumb';

interface ProductItem {
  id: string;
  title: { en: string; mr: string };
  desc: { en: string; mr: string };
  posterImage?: string;
  pdfs: Array<{ label: { en: string; mr: string }; href: string }>;
}

const MICROGRADE_COMPOSITION = [
  { symbol: 'Fe', name: { en: 'Iron', mr: 'लोह' }, pct: '2.5%' },
  { symbol: 'Zn', name: { en: 'Zinc', mr: 'जस्त' }, pct: '3.0%' },
  { symbol: 'B', name: { en: 'Boron', mr: 'बोरॉन' }, pct: '0.5%' },
  { symbol: 'Mn', name: { en: 'Manganese', mr: 'मंगल' }, pct: '1.0%' },
  { symbol: 'Cu', name: { en: 'Copper', mr: 'तांबे' }, pct: '1.0%' },
  { symbol: 'Mo', name: { en: 'Molybdenum', mr: 'मॉलिब्डेनम' }, pct: '0.1%' },
];

const MICROGRADE_SCHEDULES = [
  {
    crop: { en: 'Cereals, Pulses & Oilseeds', mr: 'तृणधान्य, कडधान्य व गळीतधान्य' },
    timing: {
      en: 'Spray twice at 30 and 45 days after sowing.',
      mr: 'पेरणीपासून ३० व ४५ दिवसांनी दोन फवारण्या कराव्यात.',
    },
  },
  {
    crop: { en: 'Vegetable Crops', mr: 'भाजीपाला पिके' },
    timing: {
      en: '1st spray at vegetative stage and 2nd spray at flowering stage.',
      mr: 'पहिली फवारणी शाकीय अवस्थेत व दुसरी फुलोऱ्यात करावी.',
    },
  },
  {
    crop: { en: 'Fruit Crops (Orchards)', mr: 'फळझाडे' },
    timing: {
      en: 'Spray after stress release, prior to flowering & during fruit setting.',
      mr: 'ताण संपल्यानंतर, फुले येण्यापूर्वी व फळधारणेच्या वेळी फवारणी करावी.',
    },
  },
];

const MICROGRADE_PRECAUTIONS = [
  {
    en: 'Store the Phule Liquid Micrograde II bottle away from direct sunlight and heat.',
    mr: 'सूक्ष्म अन्नद्रव्येयुक्त फुले मायक्रो ग्रेड II ची बाटली सूर्यप्रकाश व उष्णतेपासून दूर ठेवावी.',
  },
  {
    en: 'Do not mix with phosphorus- or calcium-based chemical fertilizers, insecticides, or fungicides.',
    mr: 'स्फुरद व कॅल्शियमयुक्त रासायनिक खते, कीटकनाशके अथवा बुरशीनाशकात मिसळू नये.',
  },
  {
    en: 'Spray only in cooler hours: before 11:00 AM or after 4:00 PM.',
    mr: 'फवारणीसाठी वेळ सकाळी ११ च्या अगोदर किंवा दुपारी ४ नंतर निवडावी.',
  },
];

interface PortalCard {
  id: string;
  title: { en: string; mr: string };
  href: string;
  tag: string;
}

export const FarmerInputsView: React.FC<{ pageData: any; focusProduct?: string }> = ({
  pageData,
  focusProduct = 'all',
}) => {
  const { language } = useLanguage();
  const [selectedProd, setSelectedProd] = useState<string>(focusProduct || 'all');
  const [zoomPoster, setZoomPoster] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    setSelectedProd(focusProduct || 'all');
  }, [focusProduct]);

  const products: ProductItem[] = pageData?.products || [];
  const modalPortals: PortalCard[] = pageData?.modalPortals || [];

  const visibleProducts =
    selectedProd === 'all' ? products : products.filter((p) => p.id === selectedProd);

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f2f7fb] text-slate-800">
      <FarmerBreadcrumb currentTitle={{ en: 'Agro Inputs & MPKV Products', mr: 'कृषि निविष्ठा व विद्यापीठ उत्पादने' }} />

      {/* SAPPHIRE-BLUE AGRO-INPUTS SHOWROOM HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#072138] via-[#0c4a6e] to-[#0284c7] text-white border-b-4 border-amber-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <FlaskConical className="w-4 h-4 text-amber-300" />
            <span>{getTxt(pageData?.hero?.badge)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-4xl">
            {getTxt(pageData?.hero?.title)}
          </h1>
          <p className="text-sm sm:text-base text-sky-100/90 max-w-3xl leading-relaxed">
            {getTxt(pageData?.hero?.subtitle)}
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-10">
        {/* TOP 3 DEDICATED LIVE INPUT DASHBOARD CARDS (Seeds, 11 Nurseries, Farm Implements) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {modalPortals.map((mp) => (
            <Link
              key={mp.id}
              href={mp.href}
              className="group p-6 rounded-3xl bg-[#072138] hover:bg-[#0c4a6e] text-white shadow-sm transition-all flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  Live Inventory Portal
                </span>
                <h2 className="text-base sm:text-lg font-bold">{getTxt(mp.title)}</h2>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-300 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          ))}
        </div>

        {/* PRODUCT FILTER PILLS */}
        <div
          className="flex flex-wrap items-center gap-2"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
        >
          <button
            onClick={() => setSelectedProd('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              selectedProd === 'all'
                ? 'bg-[#0c4a6e] text-amber-200 border-[#0c4a6e]'
                : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50'
            }`}
          >
            {language === 'mr' ? `सर्व उत्पादने (${products.length})` : `All Products (${products.length})`}
          </button>
          {products.map((pr) => (
            <button
              key={pr.id}
              onClick={() => setSelectedProd(pr.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                selectedProd === pr.id
                  ? 'bg-[#0c4a6e] text-amber-200 border-[#0c4a6e]'
                  : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50'
              }`}
            >
              {getTxt(pr.title)}
            </button>
          ))}
        </div>

        {/* PRODUCT BROCHURE & POSTER DECK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleProducts.map((pr) => {
            if (pr.id === 'phule-micrograde') {
              const posterSrc =
                pr.posterImage || '/media/images/farmer/phule_liquid_micrograde_2_poster.jpg';
              return (
                <div
                  key={pr.id}
                  className="md:col-span-2 bg-white rounded-3xl border border-emerald-200 shadow-sm overflow-hidden"
                >
                  {/* Top Featured Ribbon */}
                  <div className="bg-gradient-to-r from-[#0f472c] via-[#155d3a] to-[#0c4a6e] text-white px-6 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-emerald-800/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-amber-400 text-slate-950 shrink-0 shadow-xs">
                        <Droplets className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-300">
                          {language === 'mr'
                            ? 'मफुकृवि राहुरी • शासकीय मान्यताप्राप्त ग्रेड II'
                            : 'MPKV Rahuri • Govt. Approved Micronutrient Grade II'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                          {getTxt(pr.title)}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-amber-200">
                        <Sprout className="w-3.5 h-3.5" />
                        {language === 'mr' ? '१०–१५% उत्पादन वाढ' : '10–15% Yield Boost'}
                      </span>
                      <a
                        href="tel:02426243345"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>02426-243345</span>
                      </a>
                    </div>
                  </div>

                  {/* Main Poster + Infographic Grid */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                    {/* Left Column: Official Poster / Product Photo (5 Cols) */}
                    <div className="lg:col-span-5 space-y-3">
                      <button
                        type="button"
                        onClick={() =>
                          setZoomPoster({ src: posterSrc, title: getTxt(pr.title) })
                        }
                        className="group relative w-full rounded-2xl overflow-hidden border-2 border-emerald-200/80 bg-[#f6faf6] shadow-sm hover:border-emerald-500 transition-all cursor-zoom-in text-left block"
                      >
                        <img
                          src={posterSrc}
                          alt={
                            language === 'mr'
                              ? 'फुले द्रवरूप मायक्रो ग्रेड II अधिकृत माहिती पोस्टर व उत्पादन छायाचित्र'
                              : 'Phule Liquid Micrograde II Official Product Poster and Packs'
                          }
                          className="w-full h-auto object-contain group-hover:scale-[1.015] transition-transform duration-300"
                        />
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/85 text-white text-xs font-bold shadow-md backdrop-blur-xs">
                          <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                          <span>{language === 'mr' ? 'मोठे पोस्टर पहा' : 'Zoom Poster'}</span>
                        </span>
                      </button>

                      <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 text-xs text-emerald-950 space-y-1">
                        <p className="font-bold">
                          {language === 'mr' ? 'उत्पादक विभाग:' : 'Produced By:'}
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                          {language === 'mr'
                            ? 'सूक्ष्म अन्नद्रव्ये संशोधन योजना, मृदविज्ञान व कृषि रसायनशास्त्र विभाग, महात्मा फुले कृषि विद्यापीठ, राहुरी - ४१३ ७२२'
                            : 'Micronutrient Research Scheme, Dept. of Soil Science & Agricultural Chemistry, MPKV, Rahuri - 413 722'}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Structured PDF Content Highlights (7 Cols) */}
                    <div className="lg:col-span-7 space-y-5">
                      {/* Role & Benefits */}
                      <p className="text-sm text-slate-700 leading-relaxed bg-[#f4f8fb] border border-sky-200/70 rounded-2xl p-4">
                        {language === 'mr'
                          ? 'लोह, जस्त, बोरॉन, मंगल, तांबे व मॉलिब्डेनम ही आवश्यक सूक्ष्म अन्नद्रव्ये वनस्पतींमध्ये संप्रेरक निर्मिती, हरितद्रव्य निर्मिती, प्रथिने संश्लेषण तसेच फुल व फळधारणेस मदत करतात. दोन फवारण्यांद्वारे सर्व पिकांमध्ये १० ते १५ टक्के उत्पादन वाढ होते.'
                          : 'Essential micronutrients (Fe, Zn, B, Mn, Cu, Mo) vital for crop lifecycle completion — promoting plant hormone activity, chlorophyll formation, protein synthesis, flowering, and fruit setting. Two foliar sprays increase crop yields by 10–15%.'}
                      </p>

                      {/* MRP & Pack Availability */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900">
                            <IndianRupee className="w-3.5 h-3.5" />
                            <span>{language === 'mr' ? 'अधिकृत किंमत (MRP) व पॅकिंग' : 'Official MRP & Pack Sizes'}</span>
                          </div>
                          <div className="flex flex-wrap items-baseline gap-4 pt-0.5">
                            <div>
                              <span className="text-xs text-slate-600 block">
                                {language === 'mr' ? '१ लिटर पॅक' : '1 Litre Pack'}
                              </span>
                              <span className="text-lg font-extrabold text-slate-900">₹380/-</span>
                            </div>
                            <div className="h-7 w-px bg-amber-300/70" />
                            <div>
                              <span className="text-xs text-slate-600 block">
                                {language === 'mr' ? '५ लिटर कॅन' : '5 Litre Can'}
                              </span>
                              <span className="text-lg font-extrabold text-slate-900">₹1,410/-</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/90 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-900">
                            <Beaker className="w-3.5 h-3.5" />
                            <span>{language === 'mr' ? 'फवारणीचे प्रमाण' : 'Recommended Foliar Dosage'}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-snug pt-0.5">
                            {language === 'mr'
                              ? 'शाकीय वाढीच्या अवस्थेत ५० मिली व फुलोऱ्यात १०० मिली प्रति १० लिटर पाण्यातून दोन फवारण्या.'
                              : '1st Spray (Vegetative): 50 ml / 10 L water • 2nd Spray (Flowering): 100 ml / 10 L water.'}
                          </p>
                        </div>
                      </div>

                      {/* 6 Micronutrients Composition */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                          <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
                          <span>
                            {language === 'mr'
                              ? 'शासकीय मान्यताप्राप्त ग्रेड II घटक प्रमाण'
                              : 'Govt.-Approved Grade II Composition'}
                          </span>
                        </h4>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                          {MICROGRADE_COMPOSITION.map((item) => (
                            <div
                              key={item.symbol}
                              className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-center"
                            >
                              <div className="text-[11px] font-bold text-emerald-800">{item.symbol}</div>
                              <div className="text-sm sm:text-base font-extrabold text-slate-900">{item.pct}</div>
                              <div className="text-[11px] text-slate-600">{getTxt(item.name)}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Crop-Wise Spray Schedule */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-sky-700" />
                          <span>
                            {language === 'mr'
                              ? 'पिकांनुसार फवारणीचे वेळापत्रक'
                              : 'Crop-Wise Application Schedule'}
                          </span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {MICROGRADE_SCHEDULES.map((sch, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1"
                            >
                              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                <span>{getTxt(sch.crop)}</span>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed pl-5">
                                {getTxt(sch.timing)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Precautions */}
                      <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-900">
                          <ShieldAlert className="w-4 h-4 text-rose-700" />
                          <span>{language === 'mr' ? 'घ्यावयाची काळजी' : 'Precautions & Handling'}</span>
                        </div>
                        <ul className="space-y-1 text-xs text-slate-700 list-disc pl-5">
                          {MICROGRADE_PRECAUTIONS.map((pre, pIdx) => (
                            <li key={pIdx}>{getTxt(pre)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={pr.id}
                className="bg-white rounded-3xl border border-sky-200/80 p-7 shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-100">
                      <PackageCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{getTxt(pr.title)}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{getTxt(pr.desc)}</p>
                </div>

                {pr.pdfs.length > 0 ? (
                  <div className="pt-4 border-t border-stone-100 space-y-2.5">
                    {pr.pdfs.map((pdf, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-[#f2f7fb] border border-sky-200/70"
                      >
                        <span className="text-xs font-bold text-slate-800">{getTxt(pdf.label)}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={pdf.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0c4a6e] hover:bg-sky-800 text-white text-xs font-bold"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>{language === 'mr' ? 'पहा' : 'View'}</span>
                          </a>
                          <a
                            href={pdf.href}
                            download
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold"
                          >
                            <Download className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pt-4 border-t border-stone-100 text-xs text-slate-500 italic">
                    {language === 'mr' ? 'अधिकृत संकेतस्थळावर स्वतंत्र PDF उपलब्ध नाही.' : 'Listed item without PDF brochure on source portal.'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Poster Zoom Lightbox */}
      {zoomPoster && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomPoster(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl p-4 sm:p-6 space-y-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">{zoomPoster.title}</h3>
              <button
                type="button"
                onClick={() => setZoomPoster(null)}
                className="p-2 rounded-full bg-stone-100 text-slate-700 hover:bg-stone-200 transition-colors"
                aria-label="Close poster"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={zoomPoster.src}
              alt={zoomPoster.title}
              className="w-full max-h-[78vh] object-contain rounded-2xl bg-[#f6faf6]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
