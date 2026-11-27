'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import seedStockDataRaw from '@/data/scraped/rahuri_seed_stock.json';
import {
  Sprout,
  Phone,
  Search,
  ShieldCheck,
  Package,
  Printer,
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Home
} from 'lucide-react';

interface SeedsAvailabilityViewProps {
  initialTab?: 'cereal' | 'central' | 'horticulture' | 'implements';
}

export const SeedsAvailabilityView: React.FC<SeedsAvailabilityViewProps> = ({
  initialTab = 'cereal'
}) => {
  const { language, getBilingual } = useLanguage();
  const seedStock = seedStockDataRaw as any;

  const [activeTab, setActiveTab] = useState<'cereal' | 'central' | 'horticulture' | 'implements'>(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const cerealItems = seedStock.cereal_seeds?.items || [];
  const hortItems = seedStock.horticulture_nursery_rahuri?.items || [];
  const centralItems = seedStock.central_nursery_rahuri?.items || [];
  const implementItems = seedStock.farm_implements?.items || [];

  const filterItems = (list: any[], fields: string[]) => {
    let result = list;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((item) =>
        fields.some((f) => {
          const val = item[f];
          if (typeof val === 'string') return val.toLowerCase().includes(term);
          if (val && typeof val === 'object') {
            return (val.mr && val.mr.toLowerCase().includes(term)) || (val.en && val.en.toLowerCase().includes(term));
          }
          return false;
        })
      );
    }
    if (inStockOnly) {
      result = result.filter((item) => {
        const qty = item.available_bags || item.available_qty;
        if (!qty) return true;
        const qtyStr = typeof qty === 'object' ? (qty.en || qty.mr || '') : String(qty);
        return !qtyStr.includes('0') && !qtyStr.toLowerCase().includes('nil') && !qtyStr.includes('नाही');
      });
    }
    return result;
  };

  const filteredCereal = filterItems(cerealItems, ['crop', 'variety', 'seed_type']);
  const filteredCentral = filterItems(centralItems, ['plant_name']);
  const filteredHort = filterItems(hortItems, ['plant_name']);
  const filteredImplements = filterItems(implementItems, ['implement_name', 'category']);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="w-full bg-[#fdfbf7] min-h-screen">
      {/* 1. Breadcrumb Strip */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <div className="w-full max-w-[1720px] mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
          <Link href="/" className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-stone-600 font-medium">{language === 'mr' ? 'शेतकरी सेवा' : 'Farmer Services'}</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md">
            {language === 'mr' ? 'बियाणे व रोपवाटिका साठा' : 'Certified Seeds & Nursery Stock'}
          </span>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-6 space-y-6 transition-colors">
        {/* Hero Header - Soft Pastel Leisurely Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#f0f7f3] via-[#f7fbf8] to-[#faf9f5] text-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs border border-emerald-100/80">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
              {language === 'mr' ? 'प्रमाणित बियाणे व रोपवाटिका साठा' : 'Certified Seeds & Nursery Plant Stock'}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify sm:text-left font-normal">
              {language === 'mr'
                ? 'महात्मा फुले कृषि विद्यापीठ, राहुरी बियाणे विभाग व रोपवाटिका येथील विक्रीसाठी उपलब्ध अस्सल प्रमाणित साठा. शेतकऱ्यांसाठी थेट विद्यापीठ दर सूचीनुसार उपलब्ध.'
                : 'Current verified live stock available for farmers at MPKV Rahuri Seed Department, Nursery & Farm Implements Workshop. Direct university farm procurement.'}
            </p>
          </div>

          {/* Seed Helpline Card */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 bg-white border border-stone-200/80 rounded-2xl p-4.5 shadow-2xs flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-50 text-amber-800 flex-shrink-0 border border-amber-200/60">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-slate-500 text-xs sm:text-sm font-normal">
                  {language === 'mr' ? 'बियाणे विक्री कक्ष थेट संपर्क' : 'Rahuri Seed Desk Direct'}
                </div>
                <a
                  href="tel:02426243338"
                  className="text-slate-800 hover:text-amber-700 font-semibold text-base sm:text-lg tracking-tight transition-colors block"
                >
                  02426-243338
                </a>
              </div>
            </div>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-normal">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{language === 'mr' ? 'सकाळी ९:०० ते सायं ५:३०' : '9:00 AM - 5:30 PM'}</span>
              </span>
              <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold text-[11px] border border-emerald-200">
                {language === 'mr' ? 'कामकाज: सोम - शुक्र' : 'Operational: Mon - Fri'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Statistics Ribbon: 4 Core Rahuri Inventories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Cereal Seeds */}
        <div
          onClick={() => setActiveTab('cereal')}
          className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 ${activeTab === 'cereal'
            ? 'bg-emerald-50/70 border-emerald-400 shadow-sm ring-2 ring-emerald-400/20'
            : 'bg-white border-slate-200/80 hover:border-emerald-300 shadow-2xs'
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              {language === 'mr' ? 'तृणधान्य बियाणे' : 'Cereal Seeds'}
            </span>
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="mt-2 text-3xl font-semibold text-slate-800">
            {cerealItems.length}
          </div>
          <div className="text-xs sm:text-sm text-emerald-700 font-medium mt-1">
            {language === 'mr' ? 'हरभरा, गहू, बरसीम' : 'Chickpea, Wheat, Berseem'}
          </div>
        </div>

        {/* Card 2: Central Nursery */}
        <div
          onClick={() => setActiveTab('central')}
          className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 ${activeTab === 'central'
            ? 'bg-emerald-50/70 border-emerald-400 shadow-sm ring-2 ring-emerald-400/20'
            : 'bg-white border-slate-200/80 hover:border-emerald-300 shadow-2xs'
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              {language === 'mr' ? 'मध्यवर्ती रोपवाटिका' : 'Central Nursery'}
            </span>
            <Sprout className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="mt-2 text-3xl font-semibold text-slate-800">
            {centralItems.length}
          </div>
          <div className="text-xs sm:text-sm text-emerald-700 font-medium mt-1">
            {language === 'mr' ? 'डाळिंब, आंबा, नारळ, पेरू' : 'Pomegranate, Mango, Guava'}
          </div>
        </div>

        {/* Card 3: Horticulture Nursery */}
        <div
          onClick={() => setActiveTab('horticulture')}
          className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 ${activeTab === 'horticulture'
            ? 'bg-emerald-50/70 border-emerald-400 shadow-sm ring-2 ring-emerald-400/20'
            : 'bg-white border-slate-200/80 hover:border-emerald-300 shadow-2xs'
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              {language === 'mr' ? 'उद्यानविद्या रोपवाटिका' : 'Horticulture Nursery'}
            </span>
            <Layers className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="mt-2 text-3xl font-semibold text-slate-800">
            {hortItems.length}
          </div>
          <div className="text-xs sm:text-sm text-emerald-700 font-medium mt-1">
            {language === 'mr' ? 'लिंबू, शेवगा कलमे' : 'Lemon, Drumstick Grafts'}
          </div>
        </div>

        {/* Card 4: Farm Implements */}
        <div
          onClick={() => setActiveTab('implements')}
          className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 ${activeTab === 'implements'
            ? 'bg-emerald-50/70 border-emerald-400 shadow-sm ring-2 ring-emerald-400/20'
            : 'bg-white border-slate-200/80 hover:border-emerald-300 shadow-2xs'
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              {language === 'mr' ? 'विकसित शेती अवजारे' : 'Farm Implements'}
            </span>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-2 text-3xl font-semibold text-slate-800">
            {implementItems.length}
          </div>
          <div className="text-xs sm:text-sm text-amber-700 font-medium mt-1">
            {language === 'mr' ? '३५ पेटंट व विकसित अवजारे' : '35 Rahuri Innovations'}
          </div>
        </div>
      </div>

      {/* Controls Bar: Category Selector + Search + Print */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs">
        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('cereal')}
            className={`px-4.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'cereal'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            {language === 'mr' ? 'तृणधान्य बियाणे' : 'Cereal Seeds'} ({cerealItems.length})
          </button>
          <button
            onClick={() => setActiveTab('central')}
            className={`px-4.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'central'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            {language === 'mr' ? 'मध्यवर्ती रोपवाटिका (राहुरी)' : 'Central Nursery'} ({centralItems.length})
          </button>
          <button
            onClick={() => setActiveTab('horticulture')}
            className={`px-4.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'horticulture'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            {language === 'mr' ? 'उद्यानविद्या रोपवाटिका' : 'Horticulture Nursery'} ({hortItems.length})
          </button>
          <button
            onClick={() => setActiveTab('implements')}
            className={`px-4.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'implements'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            {language === 'mr' ? 'शेती अवजारे' : 'Farm Implements'} ({implementItems.length})
          </button>
        </div>

        {/* Live Filter & Print */}
        <div className="flex flex-wrap items-center gap-3">
          {/* In-Stock Filter Toggle */}
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer select-none bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl hover:bg-slate-100">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>{language === 'mr' ? 'केवळ उपलब्ध साठा' : 'In Stock Only'}</span>
          </label>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'mr' ? 'शोध (पिक / वाण / अवजार)...' : 'Filter crop, variety...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
            />
          </div>

          {/* Print Sheet */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all shadow-2xs"
            title="Print Stock Sheet"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* TABLE 1: CEREAL SEEDS */}
      {activeTab === 'cereal' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50/70 to-amber-50/30 border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="font-semibold text-slate-800 text-base sm:text-lg flex items-center gap-2.5">
              <Package className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span>{getBilingual(seedStock.cereal_seeds?.title)}</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/60">
                {language === 'mr' ? 'फोन:' : 'Contact:'} {seedStock.cereal_seeds?.contact}
              </span>
              <span className="text-slate-500 font-normal">
                {filteredCereal.length} {language === 'mr' ? 'नोंदी' : 'Records'}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base text-left border-collapse">
              <thead>
                <tr className="bg-[#f3f6f4] text-slate-800 uppercase text-xs sm:text-sm font-semibold tracking-wider border-b border-stone-200">
                  <th className="py-3.5 px-4">{language === 'mr' ? 'अ.क्र' : 'Sr.'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'पिक' : 'Crop'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'वाण' : 'Variety'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'बियाणाचे प्रकार' : 'Seed Class'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'दर प्रती बॅग' : 'Rate / Bag'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'उपलब्ध बॅगा' : 'Available Bags'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'क्विंटल' : 'Quintal'}</th>
                  <th className="py-3.5 px-4 text-center">{language === 'mr' ? 'स्थिती' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCereal.length > 0 ? (
                  filteredCereal.map((row: any, idx: number) => {
                    const bags = typeof row.available_bags === 'object' ? row.available_bags.en : String(row.available_bags);
                    const isAvailable = bags && !bags.includes('0') && !bags.toLowerCase().includes('nil');

                    return (
                      <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-slate-500">{row.sr_no}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {getBilingual(row.crop)}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-amber-800 bg-amber-50/50">
                          {getBilingual(row.variety)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-normal">
                          {getBilingual(row.seed_type)}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">
                          ₹{getBilingual(row.rate_per_bag)}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-emerald-700">
                          {getBilingual(row.available_bags)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {getBilingual(row.quintal)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {isAvailable ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{language === 'mr' ? 'उपलब्ध' : 'In Stock'}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
                              {language === 'mr' ? 'चौकशी करा' : 'Inquire'}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500 font-medium">
                      {language === 'mr' ? 'कोणताही साठा आढळला नाही.' : 'No matching seed stock records found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TABLE 2: CENTRAL NURSERY (RAHURI) */}
      {activeTab === 'central' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50/70 to-amber-50/30 border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="font-semibold text-slate-800 text-base sm:text-lg flex items-center gap-2.5">
              <Sprout className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span>{getBilingual(seedStock.central_nursery_rahuri?.title)}</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/60">
                {language === 'mr' ? 'फोन:' : 'Contact:'} {seedStock.central_nursery_rahuri?.contact}
              </span>
              <span className="text-slate-500 font-normal">
                {filteredCentral.length} {language === 'mr' ? 'नोंदी' : 'Records'}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base text-left border-collapse">
              <thead>
                <tr className="bg-[#f3f6f4] text-slate-800 uppercase text-xs sm:text-sm font-semibold tracking-wider border-b border-stone-200">
                  <th className="py-3.5 px-4">{language === 'mr' ? 'अ.क्र' : 'Sr.'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'रोपांचे नाव व वाण' : 'Plant / Graft Variety'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'रोपांचे दर (₹)' : 'Rate (₹ / Plant)'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'उपलब्धता साठा' : 'Stock Available'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'अद्यतन दिनांक' : 'Update Date'}</th>
                  <th className="py-3.5 px-4 text-center">{language === 'mr' ? 'साठा स्थिती' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCentral.length > 0 ? (
                  filteredCentral.map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-500">{row.sr_no}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {getBilingual(row.plant_name)}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        ₹{getBilingual(row.rate_per_plant)}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 font-medium border border-emerald-200/60">
                          {getBilingual(row.available_qty)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-normal">{row.update_date}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{language === 'mr' ? 'उपलब्ध' : 'Available'}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">
                      {language === 'mr' ? 'कोणताही साठा आढळला नाही.' : 'No matching nursery plants found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TABLE 3: HORTICULTURE NURSERY */}
      {activeTab === 'horticulture' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50/70 to-amber-50/30 border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="font-semibold text-slate-800 text-base sm:text-lg flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span>{getBilingual(seedStock.horticulture_nursery_rahuri?.title)}</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/60">
                {language === 'mr' ? 'फोन:' : 'Contact:'} {seedStock.horticulture_nursery_rahuri?.contact}
              </span>
              <span className="text-slate-500 font-normal">
                {filteredHort.length} {language === 'mr' ? 'नोंदी' : 'Records'}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base text-left border-collapse">
              <thead>
                <tr className="bg-[#f3f6f4] text-slate-800 uppercase text-xs sm:text-sm font-semibold tracking-wider border-b border-stone-200">
                  <th className="py-3.5 px-4">{language === 'mr' ? 'अ.क्र' : 'Sr.'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'रोपांचे नाव व वाण' : 'Plant / Graft Variety'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'रोपांचे दर (₹)' : 'Rate (₹ / Plant)'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'उपलब्धता साठा' : 'Stock Available'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'अद्यतन दिनांक' : 'Update Date'}</th>
                  <th className="py-3.5 px-4 text-center">{language === 'mr' ? 'स्थिती' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredHort.length > 0 ? (
                  filteredHort.map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-500">{row.sr_no}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {getBilingual(row.plant_name)}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        ₹{getBilingual(row.rate_per_plant)}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 font-medium border border-emerald-200/60">
                          {getBilingual(row.available_qty)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-normal">{row.update_date}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{language === 'mr' ? 'उपलब्ध' : 'Available'}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">
                      {language === 'mr' ? 'कोणताही साठा आढळला नाही.' : 'No matching horticulture plants found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TABLE 4: RAHURI FARM IMPLEMENTS */}
      {activeTab === 'implements' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50/70 to-amber-50/30 border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="font-semibold text-slate-800 text-base sm:text-lg flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span>{getBilingual(seedStock.farm_implements?.title)}</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/60">
                {language === 'mr' ? 'फोन:' : 'Contact:'} {seedStock.farm_implements?.contact}
              </span>
              <span className="text-slate-500 font-normal">
                {filteredImplements.length} {language === 'mr' ? 'अवजारे' : 'Implements'}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base text-left border-collapse">
              <thead>
                <tr className="bg-[#f3f6f4] text-slate-800 uppercase text-xs sm:text-sm font-semibold tracking-wider border-b border-stone-200">
                  <th className="py-3.5 px-4">{language === 'mr' ? 'अ.क्र' : 'Sr.'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'वर्गवारी' : 'Category'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'अवजाराचे नाव' : 'Implement Name'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'तपशील' : 'Details'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'दर' : 'Tariff'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredImplements.length > 0 ? (
                  filteredImplements.map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-500">{row.sr_no}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs uppercase">
                          {row.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {getBilingual(row.implement_name)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 leading-relaxed max-w-md font-normal">
                        {getBilingual(row.details)}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-amber-800 whitespace-nowrap">
                        {getBilingual(row.price)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">
                      {language === 'mr' ? 'कोणतीही अवजारे आढळली नाहीत.' : 'No matching farm implements found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bottom Farmer Advisory Card - Soft Pastel Sage / Oyster */}
      <div className="bg-gradient-to-r from-[#f0f7f3] via-[#f7fbf8] to-[#faf9f5] text-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-100/80 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{language === 'mr' ? 'थेट खरेदी केंद्र (राहुरी)' : 'Direct Purchase Location'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {language === 'mr'
              ? 'बियाणे व रोपे खरेदीसाठी राहुरी विक्री केंद्रास भेट द्या'
              : 'Visit Sales Counter at MPKV Rahuri'}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
            {language === 'mr'
              ? 'बियाणे विभाग, प्रक्षेत्र, महात्मा फुले कृषि विद्यापीठ, राहुरी, जि. अहिल्यानगर (अहमदनगर). विक्री केंद्र कामकाजाचे दिवस: सोमवार ते शुक्रवार (सकाळी ९:०० ते सायं ५:३०). शेतकऱ्यांनी खरेदीपूर्वी उपलब्धतेची दूरध्वनीद्वारे खात्री करावी.'
              : 'Seed Processing Plant, Farm, Mahatma Phule Krishi Vidyapeeth, Rahuri, Dist. Ahilyanagar. Seed Desk Operational Days: Mon - Fri (9:00 AM - 5:30 PM). Farmers are advised to confirm availability before arrival.'}
          </p>
        </div>

        <a
          href="tel:02426243338"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-2xl text-xs sm:text-sm shadow-xs transition-colors flex-shrink-0"
        >
          <Phone className="w-4 h-4" />
          <span>{language === 'mr' ? 'आता संपर्क करा' : 'Contact Seed Desk'}</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
  );
};
