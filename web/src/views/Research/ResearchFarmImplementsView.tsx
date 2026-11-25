'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Search,
  Download,
  Filter,
  CheckCircle2,
  DollarSign,
  Package,
  Layers,
  ArrowRight,
  Info,
  Building2,
  Phone
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

interface ResearchFarmImplementsViewProps {
  pageData?: any;
}

export const ResearchFarmImplementsView: React.FC<ResearchFarmImplementsViewProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // All 35 official farm implements from scraped farm-implements.json
  const implementsList = [
    // Tractor Operated (14)
    { id: 't1', category: 'tractor', sr: '1', name: 'Sugarcane Leaf Detrasher cum Shredder', nameMr: 'ऊस पाचट काढणी व कुट्टी यंत्र (ट्रॅक्टरचलित)', specs: '00', price: '1,50,000' },
    { id: 't2', category: 'tractor', sr: '2', name: 'Orchard Grass Cutter', nameMr: 'फळबाग गवत कापणी यंत्र', specs: '00', price: '1,30,000' },
    { id: 't3', category: 'tractor', sr: '3', name: 'Hydro Mechanically Controlled Offset Orchard Manager', nameMr: 'हायड्रो मेकॅनिकली नियंत्रित ऑफसेट बाग व्यवस्थापक यंत्र', specs: '00', price: '2,25,000' },
    { id: 't4', category: 'tractor', sr: '4', name: 'Horizontal Two Side Discharge Shredder for Orchards', nameMr: 'फळबागांसाठी दोन्ही बाजूने पाचट बारीक करणारे श्रेडर यंत्र', specs: '00', price: '3,40,000' },
    { id: 't5', category: 'tractor', sr: '5', name: 'Manure Spreader for Orchards', nameMr: 'फळबागांसाठी खत पसरवणारे यंत्र (मॅन्युअर स्प्रेडर)', specs: '00', price: '4,00,000' },
    { id: 't6', category: 'tractor', sr: '6', name: 'Spade Plough with Disc Harrow', nameMr: 'स्पेड नांगर व डिस्क हॅरो', specs: '00', price: '2,30,000' },
    { id: 't7', category: 'tractor', sr: '7', name: 'Banana Stem Shredder', nameMr: 'केळी खोड कुट्टी यंत्र', specs: '01 In Stock', price: '1,70,000' },
    { id: 't8', category: 'tractor', sr: '8', name: 'Automatic Reversible Two Bottom MB Plough', nameMr: 'स्वयंचलित पलटी दोन फाळांचा नांगर', specs: '00', price: '1,10,000' },
    { id: 't9', category: 'tractor', sr: '9', name: 'Phule Two Row Forward-Reverse Rotavator for Sugarcane Crop', nameMr: 'फुले दोन ओळींचे उसामधील रोटाव्हेटर यंत्र', specs: '00', price: '2,10,000' },
    { id: 't10', category: 'tractor', sr: '10', name: 'Phule Hydro Mechanically Controlled Inter Row cum Intra Row Weeder for Orchards', nameMr: 'फुले आंतर-ओळ व ओळीतील तण काढणी यंत्र (फळबागा)', specs: '00', price: '2,70,000' },
    { id: 't11', category: 'tractor', sr: '11', name: 'Phule Sugarcane Seedling Transplanter', nameMr: 'फुले ऊस रोपे पुनर्लागवड यंत्र', specs: '01 In Stock', price: '2,50,000' },
    { id: 't12', category: 'tractor', sr: '12', name: 'Tractor Drawn Nine Tyne Multicrop Planter', nameMr: 'ट्रॅक्टरचलित ९ दातेरी बहुपीक टोकणयंत्र', specs: '00', price: '95,000' },
    { id: 't13', category: 'tractor', sr: '13', name: 'Phule Check Basin Former', nameMr: 'फुले वाफे (आळे) तयार करणारे यंत्र', specs: '00', price: '90,000' },
    { id: 't14', category: 'tractor', sr: '14', name: 'Tractor Operated Phule Mole Plough', nameMr: 'ट्रॅक्टरचलित फुले मोल नांगर (पाण्याचा निचरा करणारा)', specs: '02 In Stock', price: '70,000' },

    // Power Operated (6)
    { id: 'p1', category: 'power', sr: '1', name: 'Groundnut Stripper', nameMr: 'भुईमूग शेंगा तोडणी यंत्र (पॉवरचलित)', specs: '00', price: '65,000' },
    { id: 'p2', category: 'power', sr: '2', name: 'Maize Dehusker cum Sheller (2 HP Motor)', nameMr: 'मका सोलणी व दाणे काढणी यंत्र (२ अश्वशक्ती मोटर)', specs: '01 In Stock', price: '72,000' },
    { id: 'p3', category: 'power', sr: '3', name: 'Sugarcane Sett Cutter (4 Station, 1 HP Motor)', nameMr: 'ऊस बेणे तोडणी यंत्र (४ स्टेशन, १ अश्वशक्ती)', specs: '01 In Stock', price: '85,000' },
    { id: 'p4', category: 'power', sr: '4', name: 'Phule Groundnut Decorticator cum Sorter (1 HP)', nameMr: 'फुले भुईमूग फोडणी व प्रतवारी यंत्र', specs: '00', price: '75,000' },
    { id: 'p5', category: 'power', sr: '5', name: 'Phule Mechanical Nut Sheller for Medicinal Nuts (1 HP)', nameMr: 'फुले औषधी बिया फोडणी यंत्र', specs: '02 In Stock', price: '70,000' },
    { id: 'p6', category: 'power', sr: '6', name: 'Phule Chaff Cutter (1 HP Single Phase Motor)', nameMr: 'फुले कडबा कुट्टी यंत्र (१ अश्वशक्ती सिंगल फेज)', specs: '00', price: '40,000' },

    // Bullock Drawn (1)
    { id: 'b1', category: 'bullock', sr: '1', name: 'Bullocks Drawn Jyoti Multicrop Planter', nameMr: 'बैलचलित ज्योती बहुपीक पेरणीयंत्र', specs: '00', price: '40,000' },

    // Manually Operated (14)
    { id: 'm1', category: 'manual', sr: '1', name: 'Phule Lemon Harvester', nameMr: 'फुले लिंबू काढणी यंत्र (झोळी)', specs: '00', price: '2,500' },
    { id: 'm2', category: 'manual', sr: '2', name: 'Fig Plucker', nameMr: 'अंजीर काढणी यंत्र (प्लकर)', specs: '01 In Stock', price: '1,100' },
    { id: 'm3', category: 'manual', sr: '3', name: 'Coconut Dehusker', nameMr: 'नारळ सोलणी यंत्र', specs: '139 In Stock', price: '400' },
    { id: 'm4', category: 'manual', sr: '4', name: 'Drumstick Harvester', nameMr: 'शेवगा शेंगा काढणी यंत्र', specs: '19 In Stock', price: '3,500' },
    { id: 'm5', category: 'manual', sr: '5', name: 'Vaibhav Sickle', nameMr: 'वैभव विळा', specs: '301 In Stock', price: '150' },
    { id: 'm6', category: 'manual', sr: '6', name: 'Laxmi Sickle', nameMr: 'लक्ष्मी विळा', specs: '66 In Stock', price: '150' },
    { id: 'm7', category: 'manual', sr: '7', name: 'Khurpee', nameMr: 'खुरपे (तण काढणी)', specs: '169 In Stock', price: '130' },
    { id: 'm8', category: 'manual', sr: '8', name: 'Maize Sheller', nameMr: 'हात मका दाणे काढणी यंत्र', specs: '232 In Stock', price: '240' },
    { id: 'm9', category: 'manual', sr: '9', name: 'Groundnut Decorticator', nameMr: 'हात भुईमूग फोडणी यंत्र', specs: '136 In Stock', price: '3,900' },
    { id: 'm10', category: 'manual', sr: '10', name: 'Cycle Hoe', nameMr: 'सायकल कोळपे (आंतरमशागत)', specs: '07 In Stock', price: '2,000' },
    { id: 'm11', category: 'manual', sr: '11', name: 'Mango Harvester', nameMr: 'आंबा काढणी झेल्या (नूतन डिझाइन)', specs: '23 In Stock', price: '350' },
    { id: 'm12', category: 'manual', sr: '12', name: 'Bhendi Plucker', nameMr: 'भेंडी तोडणी कटर', specs: '46 In Stock', price: '260' },
    { id: 'm13', category: 'manual', sr: '13', name: 'Sapota Harvester', nameMr: 'चिकू काढणी यंत्र', specs: '12 In Stock', price: '350' },
    { id: 'm14', category: 'manual', sr: '14', name: 'Sorghum Uprooter', nameMr: 'ज्वारी खोड काढणी यंत्र', specs: '21 In Stock', price: '2,000' }
  ];

  const filteredImplements = useMemo(() => {
    return implementsList.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.price.includes(searchQuery);

      if (selectedCategory === 'all') return matchSearch;
      return matchSearch && item.category === selectedCategory;
    });
  }, [implementsList, searchQuery, selectedCategory]);

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: 'Farm Implements & Machinery', mr: 'शेती अवजारे व यंत्रे' }} />

      <ResearchHero
        theme="implements"
        badge={{ en: '35 University Implements Catalog', mr: '३५ विद्यापीठ विकसित शेती अवजारे' }}
        title={{
          en: 'Farm Implements & Machinery — Agricultural Engineering',
          mr: 'शेती अवजारे व यंत्रे — कृषी अभियांत्रिकी व तंत्रज्ञान विभाग'
        }}
        subtitle={{
          en: 'Tractor-drawn, power-operated, bullock-drawn, and manual agricultural implements designed and fabricated at Dr. A.S. CAET Rahuri for drudgery reduction and precision mechanization.',
          mr: 'डॉ. अण्णासाहेब शिंदे कृषी अभियांत्रिकी महाविद्यालय राहुरीद्वारे विकसित ट्रॅक्टरचलित, विद्युतचलित, बैलचलित व हस्तचलित ३५ आधुनिक शेती अवजारे.'
        }}
        quickChips={[
          { label: language === 'mr' ? '१४ ट्रॅक्टरचलित यंत्रे' : '14 Tractor Operated', icon: Wrench },
          { label: language === 'mr' ? '६ विद्युतचलित अवजारे' : '6 Power Operated', icon: Package },
          { label: language === 'mr' ? '१४ हस्तचलित अवजारे' : '14 Manual Tools', icon: CheckCircle2 }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-8">

        {/* Procurement & Contact Notice Card */}
        <section className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-slate-900 text-sky-400 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {language === 'mr' ? 'अवजारे खरेदी व कार्यशाळा माहिती केंद्र' : 'Farm Implements Workshop & Procurement Desk'}
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 font-medium leading-relaxed">
                {language === 'mr'
                  ? 'सर्व अवजारे मध्यवर्ती कार्यशाळा, डॉ. अण्णासाहेब शिंदे कृषी अभियांत्रिकी महाविद्यालय, म.फु.कृ.वि. राहुरी येथे अधिकृत विक्रीसाठी उपलब्ध आहेत.'
                  : 'All farm machineries and manual implements are fabricated and available for direct farmer purchase at Dr. A.S. CAET Workshop, MPKV Rahuri.'}
              </p>
            </div>
          </div>

          <a
            href="/media/docs/20261103_124128_626906256126c9bc9503f65b14f7efd1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-800 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'mr' ? 'अधिकृत अवजारे माहिती पुस्तिका PDF' : 'Download Implements Brochure'}</span>
          </a>
        </section>

        {/* Search & Category Filter Controls */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'अवजाराचे नाव किंवा किंमत शोधा (उदा. मोल नांगर, विळा)...' : 'Search implement name or price (e.g. Mole Plough, Sickle)...'}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-700 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-1 text-[11px] font-bold w-full sm:w-auto">
              {[
                { id: 'all', label: language === 'mr' ? 'सर्व अवजारे (३५)' : 'All (35)' },
                { id: 'tractor', label: language === 'mr' ? 'ट्रॅक्टरचलित (१४)' : 'Tractor Operated (14)' },
                { id: 'power', label: language === 'mr' ? 'विद्युतचलित (६)' : 'Power Operated (6)' },
                { id: 'bullock', label: language === 'mr' ? 'बैलचलित (१)' : 'Bullock Drawn (1)' },
                { id: 'manual', label: language === 'mr' ? 'हस्तचलित (१४)' : 'Manually Operated (14)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Implements Table / Catalog */}
        <div className="rounded-3xl bg-white border border-stone-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300 bg-stone-100/90 text-stone-900">
                  <th className="py-3.5 px-4 font-bold uppercase w-16 text-center">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                  <th className="py-3.5 px-4 font-bold uppercase">{language === 'mr' ? 'अवजाराचे नाव' : 'Implement / Machinery Name'}</th>
                  <th className="py-3.5 px-4 font-bold uppercase w-48">{language === 'mr' ? 'प्रवर्ग' : 'Category'}</th>
                  <th className="py-3.5 px-4 font-bold uppercase w-44">{language === 'mr' ? 'उपलब्धता / स्टॉक' : 'Stock Availability'}</th>
                  <th className="py-3.5 px-4 font-bold uppercase text-right w-44">{language === 'mr' ? 'किंमत (रुपये)' : 'Price (INR)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium text-stone-800">
                {filteredImplements.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-sky-50/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-stone-600 text-center whitespace-nowrap">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4 leading-relaxed font-semibold text-slate-900">
                      <div>{item.name}</div>
                      <div className="text-xs text-stone-500 font-normal">{item.nameMr}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                        {item.category === 'tractor' ? 'Tractor Operated' : (item.category === 'power' ? 'Power Operated' : (item.category === 'bullock' ? 'Bullock Drawn' : 'Manual Tool'))}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                        item.specs.includes('In Stock')
                          ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                          : 'bg-stone-50 text-stone-600 border-stone-200'
                      }`}>
                        {item.specs}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="text-sm font-extrabold text-slate-900 font-mono">
                        ₹ {item.price}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
