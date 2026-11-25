'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Lock,
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  Sprout,
  Milk,
  Apple,
  Search,
  Filter,
  Calendar,
  LayoutGrid,
  ListOrdered,
  Clock,
  Check,
  ChevronRight,
  Compass,
  FileSpreadsheet
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

interface ResearchPatentsViewProps {
  pageData?: any;
}

export const ResearchPatentsView: React.FC<ResearchPatentsViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Complete 13 Granted Patents from the Live Website Registry Screenshot
  const allPatents = [
    {
      id: 1,
      nameOfPatent: 'A Method Of Production And Storage Of Tamarind Fruit Pulp',
      nameMr: 'चिंचेचा गर तयार करणे व सुरक्षित साठवणूक करण्याची प्रमाणित पद्धत',
      dateOfGrant: '24.08.2026',
      period: '20 years',
      periodMr: '२० वर्षे',
      category: 'fruit-beverage',
      categoryEn: 'Agro-Processing & Fruit Technology',
      categoryMr: 'कृषी प्रक्रिया व फळ तंत्रज्ञान',
      icon: Apple,
      color: 'bg-amber-50/70 border-amber-300 text-amber-950',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
      descEn: 'Standardized enzymatic clarification and stabilized storage of natural tamarind pulp for long-shelf-life food processing without chemical degradation.',
      descMr: 'नैसर्गिक चिंचेच्या गराची गुणवत्ता व चव टिकवून ठेवणारी शास्त्रीय साठवणूक प्रक्रिया, व्यावसायिक अन्न प्रक्रिया उद्योगासाठी उपयुक्त.'
    },
    {
      id: 2,
      nameOfPatent: 'Shrikhand Based Confectionary and Process For Preparation Thereof',
      nameMr: 'श्रीखंड आधारित मिष्टान्न (कन्फेक्शनरी) व त्याच्या निर्मितीची प्रक्रिया',
      dateOfGrant: '12.06.2026',
      period: '20 years',
      periodMr: '२० वर्षे',
      category: 'dairy',
      categoryEn: 'Dairy Processing & Confectionery',
      categoryMr: 'दुग्ध प्रक्रिया व मिष्टान्न तंत्रज्ञान',
      icon: Milk,
      color: 'bg-cyan-50/70 border-cyan-300 text-cyan-950',
      badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300',
      descEn: 'Dehydrated chakka formulation yielding stable probiotic confectionery sweets suitable for ambient-temperature retail distribution.',
      descMr: 'पारंपरिक श्रीखंडाच्या चवीसह दीर्घकाळ टिकणारी दुग्धजन्य मिठाई तयार करण्याचे शास्त्रशुद्ध तंत्रज्ञान, सामान्य तापमानावर साठवणुकीस अनुकूल.'
    },
    {
      id: 3,
      nameOfPatent: 'Ready to serve beverage of aonla (Indian Gooseberry) fruit and a method of production thereof',
      nameMr: 'आवळा फळापासून तयार केलेले पेय (RTS) आणि त्याच्या उत्पादनाची पद्धत',
      dateOfGrant: '07.05.2026',
      period: '20 years',
      periodMr: '२० वर्षे',
      category: 'fruit-beverage',
      categoryEn: 'Horticultural Beverage Formulation',
      categoryMr: 'फलोत्पादन पेय तंत्रज्ञान',
      icon: Sprout,
      color: 'bg-emerald-50/70 border-emerald-300 text-emerald-950',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      descEn: 'Thermal and enzymatic stabilization of ascorbic acid (Vitamin C) in ready-to-serve aonla beverages preventing turbidity and astringency.',
      descMr: 'आवळ्यातील क-जीवनसत्त्व (Vitamin C) व नैसर्गिक पोषक घटक सुरक्षित ठेवून चवदार व पाचक पेय (RTS) तयार करण्याची अधिकृत पद्धत.'
    },
    {
      id: 4,
      nameOfPatent: 'Tamarind Ready To Serve Beverage and Method of Production Thereof',
      nameMr: 'चिंचेचे रेडी टू सर्व्ह (RTS) पेय आणि त्याच्या निर्मितीची शास्त्रोक्त पद्धत',
      dateOfGrant: '20.04.2026',
      period: '20 years',
      periodMr: '२० वर्षे',
      category: 'fruit-beverage',
      categoryEn: 'Agro-Beverage Formulation',
      categoryMr: 'कृषी पेय निर्मिती तंत्रज्ञान',
      icon: Layers,
      color: 'bg-orange-50/70 border-orange-300 text-orange-950',
      badgeColor: 'bg-orange-100 text-orange-950 border-orange-300',
      descEn: 'Electrolyte-rich refreshing formulation balancing natural sugars, potassium, and tartaric acid for commercial RTD bottling.',
      descMr: 'चिंचेचा आंबटपणा संतुलित करून नैसर्गिक खनिजे व पोटॅशियमयुक्त आरोग्यदायी व ताजेतवाने करणारे पेय तयार करण्याचे तंत्रज्ञान.'
    },
    {
      id: 5,
      nameOfPatent: 'Plant Detection Module For Orchard Crops',
      nameMr: 'फळबागांमधील झाडे अचूक ओळखण्यासाठी कृत्रिम बुद्धिमत्ता (AI) आधारित मॉड्यूल',
      dateOfGrant: '30.01.2026',
      period: '20 years',
      periodMr: '२० वर्षे',
      category: 'machinery-ai',
      categoryEn: 'AI Sensors & Precision Robotics',
      categoryMr: 'कृत्रिम बुद्धिमत्ता व सेन्सर रोबोटिक्स',
      icon: Cpu,
      color: 'bg-purple-50/70 border-purple-300 text-purple-950',
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300',
      descEn: 'Machine vision and canopy depth scanning mounted on orchard tractors, triggering micro-nozzle spraying only when foliage is detected.',
      descMr: 'फळबागेतील झाडांचा विस्तार कॅमेऱ्याद्वारे ओळखून फक्त झाडावरच अचूक फवारणी करणारी सेन्सर प्रणाली, ज्यामुळे ४०% रासायनिक फवारणीची बचत होते.'
    },
    {
      id: 6,
      nameOfPatent: 'Phule Finger Millet Biscut and process for preparation thereof',
      nameMr: "'फुले' नाचणी (रागी) बिस्किटे व त्याच्या निर्मितीची शास्त्रशुद्ध प्रक्रिया",
      dateOfGrant: '21.03.2026',
      period: '20 years',
      periodMr: '२० वर्षे',
      category: 'bakery-nutrition',
      categoryEn: 'Nutri-Cereals / Bakery Technology',
      categoryMr: 'पोषक भरडधान्य बेकरी तंत्रज्ञान',
      icon: Award,
      color: 'bg-amber-50/70 border-amber-300 text-amber-950',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
      descEn: 'Calcium-fortified dietary fiber cookies formulated from ragi flour with standardized baking and shelf stability.',
      descMr: 'नाचणीमधील नैसर्गिक कॅल्शियम व लोह टिकवून ठेवणारी पौष्टिक बिस्किटांची उत्पादन प्रक्रिया, बालके व मधुमेही रुग्णांसाठी अतिशय गुणकारी.'
    },
    {
      id: 7,
      nameOfPatent: 'A method for production and storage of Indian Gooseberry (Aonla) fruit pulp',
      nameMr: 'आवळा फळाचा गर काढणे व दीर्घकाळ साठवणूक करण्याची पद्धती',
      dateOfGrant: '21.03.2026',
      period: '20 years',
      periodMr: '२० वर्षे',
      category: 'fruit-beverage',
      categoryEn: 'Horticultural Post-Harvest',
      categoryMr: 'फलोत्पादन काढणीपश्चात तंत्रज्ञान',
      icon: Sprout,
      color: 'bg-emerald-50/70 border-emerald-300 text-emerald-950',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      descEn: 'Enzymatic de-pulping and sterile vacuum packaging preserving high polyphenol bio-activity without refrigeration.',
      descMr: 'आवळा गराची गुणवत्ता न घसरता दीर्घकाळ सुरक्षित साठवणूक करण्याचे तंत्रज्ञान, आयुर्वेदिक व औषधी उत्पादकांसाठी वरदान.'
    },
    {
      id: 8,
      nameOfPatent: 'An apparatus and Method for extraction of custard apple pulp flakes',
      nameMr: 'सीताफळाच्या गरापासून चकत्या (फ्लेक्स) वेगळे करण्याचे उपकरण व पद्धत',
      dateOfGrant: '20.03.2026',
      period: '20 years',
      periodMr: '२० वर्षे',
      category: 'fruit-beverage',
      categoryEn: 'Food Engineering Machinery',
      categoryMr: 'अन्न प्रक्रिया यांत्रिकीकरण',
      icon: Apple,
      color: 'bg-amber-50/70 border-amber-300 text-amber-950',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
      descEn: 'Patented mechanized separation of custard apple pulp without crushing bitter seeds, generating thin-film anti-browning flakes.',
      descMr: 'बिया न फोडता सीताफळाचा गर वेगळा करणारे पेटंट यंत्र व गराच्या चकत्या (Flakes) तयार करण्याची पद्धती, आइस्क्रीम व डेअरीसाठी अत्यंत उपयुक्त.'
    },
    {
      id: 9,
      nameOfPatent: 'Method of production of ready to serve beverage from banana pseudo stem extract',
      nameMr: 'केळीच्या खोडातील (स्यूडो स्टेम) अर्कापासून रेडी टू सर्व्ह पेय बनवण्याचे तंत्रज्ञान',
      dateOfGrant: '14.03.2025',
      period: '20 years',
      periodMr: '२० वर्षे',
      category: 'fruit-beverage',
      categoryEn: 'Crop Residue Valorization / Beverage',
      categoryMr: 'कृषी अवशेष मूल्यवर्धन व पेय निर्मिती',
      icon: Layers,
      color: 'bg-teal-50/70 border-teal-300 text-teal-950',
      badgeColor: 'bg-teal-100 text-teal-950 border-teal-300',
      descEn: 'Utilization of discarded banana pseudo-stem juice for functional nutritional drink formulation rich in potassium and dietary minerals.',
      descMr: 'केळीच्या फेकून दिल्या जाणाऱ्या खोडातील अर्कापासून मूतखडा प्रतिबंधक व खनिजांनी समृद्ध पेय तयार करण्याचे शाश्वत तंत्रज्ञान.'
    },
    {
      id: 10,
      nameOfPatent: 'Phule PVC Paddy Transplanting Marker',
      nameMr: "'फुले' पीव्हीसी भात पुनर्लागवड मार्कर यंत्र",
      dateOfGrant: '05.03.2024',
      period: '20 Years w.e.f. 31.03.2019',
      periodMr: '२० वर्षे (लागू ३१.०३.२०१९ पासून)',
      category: 'machinery-ai',
      categoryEn: 'Farm Machinery & Paddy Mechanization',
      categoryMr: 'शेती अवजारे व भातशेती यांत्रिकीकरण',
      icon: Award,
      color: 'bg-blue-50/70 border-blue-300 text-blue-950',
      badgeColor: 'bg-blue-100 text-blue-950 border-blue-300',
      descEn: 'Lightweight manually operated PVC grid marker creating uniform square geometry for SRI (System of Rice Intensification) transplanting.',
      descMr: 'भात खाचरांमध्ये चारसूत्री व एसआरआय पद्धतीनुसार अचूक अंतरावर ओळी आखणारे वजनाने हलके व टिकाऊ पीव्हीसी मार्कर यंत्र.'
    },
    {
      id: 11,
      nameOfPatent: 'A Process for Preparation of Cookies',
      nameMr: 'पौष्टिक कुकीज (बिस्किटे) तयार करण्याची प्रमाणित प्रक्रिया',
      dateOfGrant: '28.02.2022',
      period: '20 Years w.e.f. 31.3.2019',
      periodMr: '२० वर्षे (लागू ३१.०३.२०१९ पासून)',
      category: 'bakery-nutrition',
      categoryEn: 'Food Science & Bakery Formulation',
      categoryMr: 'अन्न विज्ञान व बेकरी तंत्रज्ञान',
      icon: Award,
      color: 'bg-amber-50/70 border-amber-300 text-amber-950',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
      descEn: 'Standardized composite cereal-pulse flour ratio creating dietary-fiber-balanced cookies with extended ambient storage stability.',
      descMr: 'तृणधान्ये व कडधान्यांच्या मिश्रणातून संतुलित पोषण देणाऱ्या आणि दीर्घकाळ टिकणाऱ्या कुकीज तयार करण्याचे शास्त्रोक्त तंत्रज्ञान.'
    },
    {
      id: 12,
      nameOfPatent: 'Whey utilization in preparation of alcoholic beverage',
      nameMr: 'दुग्धजन्य व्हे (Whey) घटकांचा अल्कोहोलिक पेय निर्मितीमध्ये उपयोग',
      dateOfGrant: '17.11.2016',
      period: '20 years',
      periodMr: '२० वर्षे',
      category: 'dairy',
      categoryEn: 'Dairy Byproduct Valorization',
      categoryMr: 'दुग्ध उप-उत्पादने मूल्यवर्धन',
      icon: Milk,
      color: 'bg-purple-50/70 border-purple-300 text-purple-950',
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300',
      descEn: 'Biotechnological fermentation of dairy cheese whey permeate into potable fermented alcoholic beverages, preventing dairy effluent pollution.',
      descMr: 'पनीर व चीज निर्मितीनंतर उरणाऱ्या पाण्याचा (व्हे) विनियोग करून उच्च दर्जाचे पेय तयार करण्याचे पर्यावरणपूरक तंत्रज्ञान.'
    },
    {
      id: 13,
      nameOfPatent: 'A process for preparation of low fat spread in the form of water in oil type emulsion',
      nameMr: 'कमी चरबीयुक्त स्प्रेड (वॉटर इन ऑइल इमल्शन) तयार करण्याची प्रक्रिया',
      dateOfGrant: '19.02.2016',
      period: '20 years',
      periodMr: '२० वर्षे',
      category: 'dairy',
      categoryEn: 'Dairy Emulsion & Low-Fat Spread',
      categoryMr: 'दुग्ध प्रक्रिया व कमी चरबीयुक्त स्प्रेड',
      icon: Milk,
      color: 'bg-cyan-50/70 border-cyan-300 text-cyan-950',
      badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300',
      descEn: 'Thermally stable low-calorie butter-like spread formulated as a water-in-oil emulsion with reduced cholesterol and high spreadability.',
      descMr: 'लोण्यासारखी चव असणारे परंतु कमी चरबी व कॅलरीज असलेले आरोग्यदायी टेबल स्प्रेड तयार करण्याचे पेटंट तंत्रज्ञान.'
    }
  ];

  const filteredPatents = allPatents.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.nameOfPatent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.dateOfGrant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: 'Registered Patents', mr: 'नोंदणीकृत पेटंट्स' }} />

      <ResearchHero
        theme="patents"
        badge={{ en: 'Intellectual Property Rights (IPR)', mr: 'बौद्धिक संपदा अधिकार व पेटंट्स' }}
        title={{
          en: 'Registered Patents — Intellectual Property Rights & Inventions',
          mr: 'नोंदणीकृत पेटंट्स — बौद्धिक संपदा अधिकार व विद्यापीठ संशोधन'
        }}
        subtitle={{
          en: 'Official registry of all 13 patents granted to Mahatma Phule Krishi Vidyapeeth, Rahuri by the Patent Office, Government of India.',
          mr: 'भारत सरकारच्या पेटंट कार्यालयाने महात्मा फुले कृषी विद्यापीठ, राहुरीच्या शास्त्रज्ञांनी विकसित केलेल्या शेती व अन्न प्रक्रिया संशोधनास बहाल केलेले सर्व १३ अधिकृत पेटंट्स.'
        }}
        quickChips={[
          { label: language === 'mr' ? '१३ नोंदणीकृत पेटंट्स' : '13 Granted Patents', icon: Award },
          { label: language === 'mr' ? '२० वर्षे पेटंट मुदत' : '20-Year Grant Period', icon: Clock },
          { label: language === 'mr' ? 'भारत सरकार पेटंट कार्यालय' : 'CGPDTM Govt. of India', icon: ShieldCheck },
          { label: language === 'mr' ? 'अन्न, दुग्ध व यांत्रिकीकरण' : 'Food, Dairy & AI Tech', icon: Cpu }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-8">

        {/* ================================================================= */}
        {/* 1. TOP METRIC COUNTERS                                            */}
        {/* ================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-emerald-800">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                Official Registry
              </span>
              <Award className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-serif">
              13
            </div>
            <div className="text-xs sm:text-sm font-bold text-emerald-950 mt-1">
              {language === 'mr' ? 'एकूण नोंदणीकृत पेटंट्स' : 'Total Granted Patents'}
            </div>
            <p className="text-[11px] text-stone-600 mt-0.5">
              {language === 'mr' ? 'भारत सरकारद्वारे प्रमाणित' : 'Govt. of India Certified'}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-amber-800">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                Protection Term
              </span>
              <Clock className="w-5 h-5 text-amber-700" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-serif">
              20
            </div>
            <div className="text-xs sm:text-sm font-bold text-amber-950 mt-1">
              {language === 'mr' ? 'वर्षे वैधानिक संरक्षण मुदत' : 'Years Statutory Validity'}
            </div>
            <p className="text-[11px] text-stone-600 mt-0.5">
              {language === 'mr' ? 'नोंदणी दिनांकापासून लागू' : 'From Date of Application'}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-purple-800">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                Recent Grants
              </span>
              <Sparkles className="w-5 h-5 text-purple-700" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-serif">
              8
            </div>
            <div className="text-xs sm:text-sm font-bold text-purple-950 mt-1">
              {language === 'mr' ? '२०२६ मध्ये मिळालेले पेटंट्स' : 'Granted in 2026'}
            </div>
            <p className="text-[11px] text-stone-600 mt-0.5">
              {language === 'mr' ? 'अन्न व कृषी प्रक्रियेत आघाडी' : 'Pioneering Post-Harvest Tech'}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-blue-800">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                IPR Ecosystem
              </span>
              <ShieldCheck className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-serif">
              35+
            </div>
            <div className="text-xs sm:text-sm font-bold text-blue-950 mt-1">
              {language === 'mr' ? 'कॉपीराइट्स व डिझाइन पेटंट्स' : 'Copyrights & Design Patents'}
            </div>
            <p className="text-[11px] text-stone-600 mt-0.5">
              {language === 'mr' ? '६२ मोबाईल अ‍ॅप्ससह डिजिटल प्रगती' : 'Plus 62 University Mobile Apps'}
            </p>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. SEARCH, CATEGORY FILTERS & VIEW MODE CONTROLS                  */}
        {/* ================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', labelEn: 'All 13 Patents', labelMr: 'सर्व १३ पेटंट्स' },
              { id: 'fruit-beverage', labelEn: 'Fruit & Beverages', labelMr: 'फळ व पेय तंत्रज्ञान' },
              { id: 'dairy', labelEn: 'Dairy Technology', labelMr: 'दुग्ध प्रक्रिया' },
              { id: 'machinery-ai', labelEn: 'Machinery & AI Sensors', labelMr: 'अवजारे व एआय सेन्सर्स' },
              { id: 'bakery-nutrition', labelEn: 'Bakery & Nutri-Cereals', labelMr: 'बेकरी व पौष्टिक तृणधान्ये' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {language === 'mr' ? cat.labelMr : cat.labelEn}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'पेटंटचे नाव किंवा वर्ष शोधा...' : 'Search patent name or date...'}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs focus:outline-emerald-600 font-medium"
              />
            </div>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-200/80 border border-stone-300">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  viewMode === 'table'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-slate-900'
                }`}
                title="Official Live Site Table View"
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'तक्ता' : 'Table'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  viewMode === 'cards'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-slate-900'
                }`}
                title="Interactive Cards View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'कार्ड्स' : 'Cards'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. VIEW 1: OFFICIAL LIVE SITE REGISTRY (MATCHING USER SCREENSHOT) */}
        {/* ================================================================= */}
        {viewMode === 'table' && (
          <div className="rounded-3xl border border-stone-200 bg-white shadow-sm overflow-hidden">
            
            {/* The Authentic Green Banner from Screenshot */}
            <div className="w-full bg-[#1e824c] border-b-4 border-red-600 rounded-r-3xl text-white px-6 py-3.5 font-bold text-sm sm:text-base tracking-wide flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-300" />
                <span className="font-sans text-base sm:text-lg">Patents</span>
              </div>
              <span className="text-xs bg-white/20 text-white px-2.5 py-0.5 rounded-full font-sans font-semibold">
                {filteredPatents.length} / 13 Records
              </span>
            </div>

            {/* Stacked Patent Entries matching Screenshot verbatim */}
            <div className="divide-y divide-stone-200">
              {filteredPatents.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 hover:bg-stone-50/80 transition-colors space-y-1.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div className="text-xs sm:text-[14px] md:text-[15px] font-bold text-slate-900 font-serif leading-snug">
                      <span className="text-stone-500 font-sans font-semibold mr-1.5">
                        Name of Patent:
                      </span>
                      <span className="text-slate-950">
                        {item.nameOfPatent}
                      </span>
                    </div>

                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 self-start sm:self-auto shrink-0">
                      #{item.id} · {item.categoryEn.split('&')[0]}
                    </span>
                  </div>

                  {language === 'mr' && (
                    <div className="text-xs font-semibold text-emerald-900 pt-0.5">
                      {item.nameMr}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-stone-700 pt-1">
                    <div>
                      <span className="font-semibold text-stone-500">Date of Grant: </span>
                      <span className="font-bold text-slate-900">{item.dateOfGrant}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-stone-500">Period for patent: </span>
                      <span className="font-bold text-emerald-800">{item.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPatents.length === 0 && (
              <div className="p-12 text-center text-stone-500 text-sm">
                No patents match your filter or search query.
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* 4. VIEW 2: INTERACTIVE BENTO REGISTRY CARDS                        */}
        {/* ================================================================= */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatents.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                        Patent #{item.id}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md border ${item.badgeColor}`}>
                        {item.dateOfGrant.split('.')[2] || 'Granted'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-serif leading-snug">
                      {language === 'mr' ? item.nameMr : item.nameOfPatent}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed font-medium">
                      {language === 'mr' ? item.descMr : item.descEn}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500 font-medium">Date of Grant:</span>
                      <span className="font-bold text-slate-900">{item.dateOfGrant}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500 font-medium">Period:</span>
                      <span className="font-bold text-emerald-800">{item.period}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================================================================= */}
        {/* 5. PATENT FACILITATION CELL (PFC) & COMMERCIALIZATION DESK         */}
        {/* ================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'mr' ? 'पेटंट सुविधा केंद्र' : 'Patent Facilitation Cell (PFC)'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                {language === 'mr' ? 'विद्यापीठ पेटंट व तंत्रज्ञान हस्तांतरण धोरण' : 'Intellectual Property Commercialization & Licensing Desk'}
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
              {language === 'mr' ? '१३ अधिकृत पेटंट्स बहाल' : '13 Official Patents Granted'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium text-justify">
            {language === 'mr'
              ? 'म.फु.कृ.वि. राहुरीच्या संशोधन संचालनालयांतर्गत कार्यरत "पेटंट सुविधा कक्ष" (Patent Facilitation Cell) शास्त्रज्ञांच्या नवनवीन संशोधनाचे राष्ट्रीय बौद्धिक संपदा अधिकारात रूपांतर करतो. विद्यापीठाच्या या १३ अधिकृत पेटंट तंत्रज्ञानांचे व्यावसायिक उत्पादनासाठी कृषी-उद्योजक, शेतकरी उत्पादक कंपन्या (FPCs) व अन्न प्रक्रिया उद्योगांना परवान्याने (License) हस्तांतरण केले जाते.'
              : 'The Patent Facilitation Cell under the Directorate of Research safeguards inventions developed by MPKV scientists. All 13 patents granted to the university span fruit pulp preservation, functional foods, dairy processing, and AI sensors. These inventions are open for technology licensing to agri-entrepreneurs, farmer producer companies (FPOs), and agro-processing industries.'}
          </p>
        </section>

        {/* ================================================================= */}
        {/* 6. EXPLORE OTHER RESEARCH SECTIONS                                */}
        {/* ================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              {language === 'mr' ? 'शेती अवजारे व विकसित पीक वाण पहा' : 'Explore University Farm Implements & Released Varieties'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              {language === 'mr'
                ? '३५ पेटंट तंत्रज्ञानयुक्त शेती अवजारे व २७०+ अधिकृत विकसित पीक वाणांची संपूर्ण यादी.'
                : 'Browse our catalog of 35 engineered agricultural implements and 270+ released crop varieties with official brochures.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/farm-implements"
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>{language === 'mr' ? 'शेती अवजारे (३५)' : 'Farm Implements (35)'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/research/varieties"
              className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/20 inline-flex items-center gap-2"
            >
              <span>{language === 'mr' ? 'पीक वाण (२७०+)' : 'Crop Varieties (270+)'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
