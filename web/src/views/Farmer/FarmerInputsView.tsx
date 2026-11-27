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
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FarmerBreadcrumb } from './components/FarmerBreadcrumb';

interface ProductItem {
  id: string;
  title: { en: string; mr: string };
  desc: { en: string; mr: string };
  pdfs: Array<{ label: { en: string; mr: string }; href: string }>;
}

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

        {/* PRODUCT BROCHURE DECK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleProducts.map((pr) => (
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
          ))}
        </div>
      </section>
    </div>
  );
};
