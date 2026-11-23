'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Building,
  Wrench,
  BookOpen,
  FileCheck2,
  Cpu,
  Layers,
  Calendar,
  Globe2,
  ChevronRight,
  Search,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const InstitutionalDirectories: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'governance' | 'services' | 'knowledge'>('all');

  const directories = [
    {
      id: 'statutory',
      group: 'governance',
      title: language === 'mr' ? 'वैधानिक संस्था व परिषदा' : 'Statutory Bodies & Councils',
      icon: Building,
      badge: '७ समित्या',
      badgeEn: '7 Councils',
      items: [
        { labelMr: 'कार्यकारी परिषद', labelEn: 'Executive Council', href: '/governance/executive-council' },
        { labelMr: 'विद्या परिषद', labelEn: 'Academic Council', href: '/governance/academic-council' },
        { labelMr: 'कृषि संशोधन परिषद', labelEn: 'Agricultural Research Council', href: '/research/council' },
        { labelMr: 'बियाणे परिषद', labelEn: 'Seed Council', href: '/seeds/council' },
        { labelMr: 'विस्तार शिक्षण परिषद', labelEn: 'Extension Education Council', href: '/extension/council' },
        { labelMr: 'विद्वत सभा व विद्याशाखा', labelEn: 'Faculty & Boards', href: '/education/faculty' },
        { labelMr: 'अभ्यास मंडळ', labelEn: 'Board of Studies', href: '/education/board-of-studies' }
      ]
    },
    {
      id: 'services',
      group: 'services',
      title: language === 'mr' ? 'मफुकृवि सुविधा व सेवा' : 'MPKV Testing & Services',
      icon: Wrench,
      badge: '६ सेवा',
      badgeEn: '6 Services',
      items: [
        { labelMr: 'उत्पादन चाचणी केंद्र', labelEn: 'Product Testing Laboratory', href: '/services/product-testing' },
        { labelMr: 'बेकरी उत्पादने व प्रशिक्षण', labelEn: 'Bakery Products & Training', href: '/services/bakery' },
        { labelMr: 'ड्रोन तंत्रज्ञान प्रशिक्षण केंद्र', labelEn: 'Drone Technology Centre', href: '/services/drone-training' },
        { labelMr: 'माती परीक्षण प्रयोगशाळा', labelEn: 'Soil Testing Facilities', href: '/services/soil-testing' },
        { labelMr: 'पाणी गुणवत्ता चाचणी', labelEn: 'Water Quality Analysis', href: '/services/water-testing' },
        { labelMr: 'फुले शुद्ध पिण्याचे पाणी', labelEn: 'Phule Drinking Water Plant', href: '/services/drinking-water' }
      ]
    },
    {
      id: 'knowledge',
      group: 'knowledge',
      title: language === 'mr' ? 'ज्ञान उपक्रम व डिजिटल पोर्टल' : 'Knowledge Initiatives',
      icon: BookOpen,
      badge: '६ उपक्रम',
      badgeEn: '6 Portals',
      items: [
        { labelMr: 'फुले कृषिदर्शनी वार्षिक अंक', labelEn: 'Krishidarshani Annual Diary', href: '/krishidarshani' },
        { labelMr: 'आयडब्ल्यूआरए जलसिंचन सेवा', labelEn: 'IWRA Irrigation Service', href: '/iwra' },
        { labelMr: 'CAAST-CSAWM हवामान अनुकूल शेती', labelEn: 'CAAST-CSAWM NAHEP', href: 'https://mpkv-caast.ac.in', isExternal: true },
        { labelMr: 'कृषि विज्ञान केंद्र (KVK) पोर्टल', labelEn: 'KVK Network Portal', href: '/kvk' },
        { labelMr: 'शेतकरी डिजिटल सेवा पोर्टल', labelEn: 'National Farmers Portal', href: 'https://farmer.gov.in', isExternal: true },
        { labelMr: 'कृषि शिक्षण पोर्टल', labelEn: 'Agricultural Education Portal', href: 'https://ecourses.icar.gov.in', isExternal: true }
      ]
    },
    {
      id: 'mou',
      group: 'knowledge',
      title: language === 'mr' ? 'सामंजस्य करार व सहकार्य' : 'MoUs & Collaborations',
      icon: FileCheck2,
      badge: '३ क्षेत्रे',
      badgeEn: '3 Sectors',
      items: [
        { labelMr: 'शैक्षणिक सामंजस्य करार', labelEn: 'Academic & Higher Education MoUs', href: '/mous/education' },
        { labelMr: 'राष्ट्रीय व आंतरराष्ट्रीय संशोधन सहकार्य', labelEn: 'Research Collaborations', href: '/mous/research' },
        { labelMr: 'कृषी विस्तार व शेतकरी प्रशिक्षण करार', labelEn: 'Extension & Industry MoUs', href: '/mous/extension' }
      ]
    },
    {
      id: 'tech',
      group: 'services',
      title: language === 'mr' ? 'विकसित तंत्रज्ञान व शिफारसी' : 'Technologies & Recommendations',
      icon: Cpu,
      badge: '४ दालने',
      badgeEn: '4 Pillars',
      items: [
        { labelMr: 'विकसित पीक वाण व संकरित बियाणे', labelEn: 'Released Crop Varieties', href: '/research/varieties' },
        { labelMr: 'शेती अवजारे व स्वयंचलित यंत्रे', labelEn: 'Farm Implements & Machinery', href: '/farm-implements' },
        { labelMr: 'संयुक्त अग्रेस्को कृषी शिफारसी', labelEn: 'Joint AGRESCO Recommendations', href: '/research/recommendations' },
        { labelMr: 'नोंदणीकृत पेटंट्स व बौद्धिक संपदा', labelEn: 'Patents & IPR Technologies', href: '/research/patents' }
      ]
    },
    {
      id: 'cells',
      group: 'governance',
      title: language === 'mr' ? 'विद्यापीठ कक्ष व मध्यवर्ती विभाग' : 'University Cells & Units',
      icon: Layers,
      badge: '५ कक्ष',
      badgeEn: '5 Cells',
      items: [
        { labelMr: 'कृषि तंत्रज्ञान माहिती केंद्र (ATIC)', labelEn: 'ATIC Headquarters', href: '/atic' },
        { labelMr: 'कृषि ज्ञान व्यवस्थापन केंद्र (AKMU)', labelEn: 'AKMU Cyber & IT Centre', href: '/akmu' },
        { labelMr: 'नोडल कक्ष (महा डीबीटी व योजना)', labelEn: 'Nodal Cell (State Schemes)', href: '/nodal-cell' },
        { labelMr: 'प्रकल्प संनियंत्रण कक्ष (PME Cell)', labelEn: 'PME Project Monitoring', href: '/pme-cell' },
        { labelMr: 'अंतर्गत गुणवत्ता हमी कक्ष (IQAC)', labelEn: 'IQAC Accreditation Cell', href: '/iqac' }
      ]
    },
    {
      id: 'events',
      group: 'knowledge',
      title: language === 'mr' ? 'नियतकालिक कार्यक्रम व सोहळे' : 'Periodical Events',
      icon: Calendar,
      badge: 'वार्षिक',
      badgeEn: 'Annual',
      items: [
        { labelMr: 'वार्षिक पदवी प्रदान दीक्षांत समारंभ', labelEn: 'Annual Convocation Ceremony', href: '/events/convocation' },
        { labelMr: 'संयुक्त अग्रेस्को संशोधन परिषद', labelEn: 'Joint AGRESCO State Meeting', href: '/events/agresco' },
        { labelMr: 'विद्यापीठ परिसर वनमहोत्सव मोहीम', labelEn: 'Vanmohotsav Green Initiative', href: '/events/vanmohotsav' }
      ]
    },
    {
      id: 'quicklinks',
      group: 'governance',
      title: language === 'mr' ? 'शासकीय व संस्थात्मक दुवे' : 'Government & Apex Links',
      icon: Globe2,
      badge: '७ दुवे',
      badgeEn: '7 Links',
      items: [
        { labelMr: 'महाराष्ट्र शासन अधिकृत दालन', labelEn: 'Govt. of Maharashtra', href: 'https://www.maharashtra.gov.in', isExternal: true },
        { labelMr: 'महाराष्ट्रातील कृषी विद्यापीठे', labelEn: 'State Agricultural Universities', href: '/links/state-universities' },
        { labelMr: 'अ‍ॅकॅडेमिक बँक ऑफ क्रेडिट (ABC)', labelEn: 'Academic Bank of Credit', href: 'https://www.abc.gov.in', isExternal: true },
        { labelMr: 'भारतीय कृषि अनुसंधान परिषद (ICAR)', labelEn: 'ICAR, New Delhi', href: 'https://icar.org.in', isExternal: true },
        { labelMr: 'महाराष्ट्र कृषी शिक्षण व संशोधन परिषद (MCAER)', labelEn: 'MCAER, Pune', href: 'https://mcaer.org', isExternal: true },
        { labelMr: 'विद्यापीठ अनुदान आयोग (UGC)', labelEn: 'University Grants Commission', href: 'https://www.ugc.gov.in', isExternal: true },
        { labelMr: 'भारतीय छात्र संसद', labelEn: 'Bhartiya Chhatra Sansad', href: 'https://bharatiyachhatrasansad.org', isExternal: true }
      ]
    }
  ];

  const filteredDirectories = directories.filter((dir) => {
    const matchesFilter = filterCategory === 'all' || dir.group === filterCategory;
    if (!searchTerm.trim()) return matchesFilter;
    const term = searchTerm.toLowerCase();
    const matchesTitle = dir.title.toLowerCase().includes(term);
    const matchesItem = dir.items.some(
      (item) => item.labelEn.toLowerCase().includes(term) || item.labelMr.includes(term)
    );
    return matchesFilter && (matchesTitle || matchesItem);
  });

  return (
    <section className="w-full py-16 bg-[#faf9f6] border-t border-stone-200/60">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-5 border-b border-stone-200/70">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'mr' ? 'संस्थात्मक निर्देशिका व दालने' : 'Institutional Directories & Services'}</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-semibold text-slate-800 tracking-tight">
              {language === 'mr' ? 'वैधानिक संस्था, तंत्रज्ञान व ज्ञान उपक्रम' : 'Governance, Technologies & Knowledge Initiatives'}
            </h2>
          </div>

          {/* Search Input & Quick Filter Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'mr' ? 'निर्देशिकेत शोधा...' : 'Search directory...'}
                className="w-full sm:w-56 pl-9 pr-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs text-slate-800 focus:outline-emerald-600 shadow-2xs"
              />
            </div>

            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterCategory === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
                }`}
              >
                {language === 'mr' ? 'सर्व (८)' : 'All'}
              </button>
              <button
                onClick={() => setFilterCategory('governance')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterCategory === 'governance' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
                }`}
              >
                {language === 'mr' ? 'प्रशासन' : 'Governance'}
              </button>
              <button
                onClick={() => setFilterCategory('services')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterCategory === 'services' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
                }`}
              >
                {language === 'mr' ? 'तंत्रज्ञान' : 'Services'}
              </button>
            </div>
          </div>
        </div>

        {/* 8 Modern Directory Cards (4-Col Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredDirectories.map((dir) => {
            const Icon = dir.icon;
            return (
              <div
                key={dir.id}
                className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-stone-100">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                        {dir.title}
                      </h3>
                    </div>
                  </div>

                  {/* Directory Links List */}
                  <div className="space-y-1.5">
                    {dir.items.map((item, idx) => (
                      <div key={idx}>
                        {item.isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between text-xs text-slate-600 hover:text-emerald-900 hover:bg-emerald-50/50 py-1 px-1.5 rounded-lg transition-colors group/item"
                          >
                            <span className="line-clamp-1">{language === 'mr' ? item.labelMr : item.labelEn}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400 group-hover/item:text-emerald-700 flex-shrink-0" />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="flex items-center justify-between text-xs text-slate-600 hover:text-emerald-900 hover:bg-emerald-50/50 py-1 px-1.5 rounded-lg transition-colors group/item"
                          >
                            <span className="line-clamp-1">{language === 'mr' ? item.labelMr : item.labelEn}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 group-hover/item:text-emerald-700 group-hover/item:translate-x-0.5 transition-transform flex-shrink-0" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-stone-100 text-[11px] font-semibold text-emerald-800 flex items-center justify-between">
                  <span>{language === 'mr' ? dir.badge : dir.badgeEn}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">तपासा &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
