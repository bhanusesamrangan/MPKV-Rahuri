'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Home,
  ChevronRight,
  Phone,
  MapPin,
  Search,
  Copy,
  Check,
  Download,
  ExternalLink,
  ArrowRight,
  Building2,
  BookOpen,
  Users,
  Shield,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DeskItem {
  srNo: number;
  category: string;
  particulars: { en: string; mr: string };
  rawContact: string;
  numbers: string[];
  internalHref?: string;
  note: { en: string; mr: string };
}

export const ContactsView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [catFilter, setCatFilter] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [copiedTxt, setCopiedTxt] = useState<string | null>(null);

  const desks: DeskItem[] = pageData?.desks || [];
  const pdfDoc = pageData?.krishidarshaniContactsPdf || {};
  const address = pageData?.address || {};
  const mapUrl = pageData?.mapEmbedUrl || '';

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(desks.map((d) => d.category)))],
    [desks]
  );

  const filteredDesks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return desks.filter((d) => {
      const okCat = catFilter === 'all' || d.category === catFilter;
      const okQ =
        !q ||
        d.particulars.en.toLowerCase().includes(q) ||
        d.particulars.mr.includes(q) ||
        d.rawContact.toLowerCase().includes(q) ||
        d.note.en.toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [desks, catFilter, query]);

  const copyNum = (num: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(num);
      setCopiedTxt(num);
      setTimeout(() => setCopiedTxt(null), 1600);
    }
  };

  const getTxt = (v: any) =>
    typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '';

  return (
    <div className="w-full min-h-screen bg-[#f5f6f3] text-slate-800">
      {/* Standard Breadcrumb */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <nav className="w-full max-w-[1720px] mx-auto flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-emerald-800 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">
            {language === 'mr' ? 'संपर्क' : 'Contacts'}
          </span>
        </nav>
      </div>

      {/* SLATE-PINE CAMPUS HELPLINE HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071f17] via-[#0f3326] to-[#1a4a38] text-white border-b-4 border-amber-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          {/* Campus Postal Headquarters Card */}
          <div className="lg:col-span-5 bg-white/10 border border-white/20 backdrop-blur-xs rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <MapPin className="w-4 h-4" />
              <span>{language === 'mr' ? 'विद्यापीठ मुख्यालय पत्ता' : 'University Headquarters Address'}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {getTxt(address?.line1)}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {getTxt(address?.line2)}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={pdfDoc?.href || '/media/docs/contacts/krishidarshani_contacts.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'कृषिदर्शनी संपर्क PDF' : 'Krishidarshani Contacts PDF'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-10">
        {/* SEARCH + CATEGORY FILTER PILLS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div
            className="flex flex-wrap items-center gap-2"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
          >
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  catFilter === c
                    ? 'bg-[#0f3326] text-amber-200 border-[#0f3326]'
                    : 'bg-white text-slate-700 border-stone-200 hover:bg-emerald-50'
                }`}
              >
                {c === 'all' ? (language === 'mr' ? `सर्व संपर्क (${desks.length})` : `All Desks (${desks.length})`) : c}
              </button>
            ))}
          </div>

          <div className="relative shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={language === 'mr' ? 'विभाग किंवा नंबर शोधा...' : 'Search desk or phone...'}
              className="pl-10 pr-4 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm w-full md:w-64 focus:outline-emerald-700"
            />
          </div>
        </div>

        {/* 9 DIRECT CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDesks.map((d) => (
            <div
              key={d.srNo}
              className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-bold">
                    {d.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-400">#{d.srNo}</span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-snug">
                    {getTxt(d.particulars)}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{getTxt(d.note)}</p>
                </div>

                {/* Click-to-Dial & Copy Phone Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {d.numbers.map((num) => (
                    <div
                      key={num}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f4f7f2] border border-emerald-200/80"
                    >
                      <a
                        href={`tel:${num.replace(/[^+\d]/g, '')}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-extrabold text-emerald-950 hover:text-emerald-700"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{num}</span>
                      </a>
                      <button
                        onClick={() => copyNum(num)}
                        title="Copy number"
                        className="text-stone-400 hover:text-emerald-800 ml-1"
                      >
                        {copiedTxt === num ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {d.internalHref && (
                <div className="pt-3 border-t border-stone-100">
                  <Link
                    href={d.internalHref}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-emerald-800 hover:text-emerald-950"
                  >
                    <span>{language === 'mr' ? 'संबंधित विभागास भेट द्या' : 'Open Section Portal'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BOTTOM SPLIT: KRISHIDARSHANI CONTACTS PDF + RELATED DIRECTORIES vs INTERACTIVE CAMPUS MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="bg-[#0f3326] text-white rounded-3xl p-7 space-y-4 shadow-md">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <BookOpen className="w-4 h-4" />
                <span>{language === 'mr' ? 'सविस्तर निर्देशिका' : 'Extended University Contacts'}</span>
              </div>
              <h3 className="text-xl font-bold">{getTxt(pdfDoc?.title)}</h3>
              <p className="text-xs sm:text-sm text-emerald-100/85 leading-relaxed">
                {language === 'mr'
                  ? 'सर्व विभागीय संशोधन केंद्रे, कृषी महाविद्यालये, KVK आणि अधिकारी संपर्क क्रमांकासाठी मूळ कृषिदर्शनी संपर्क PDF पहा.'
                  : 'Access complete university-wide extension numbers across all research stations, constituent colleges, and KVKs.'}
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                <a
                  href={pdfDoc?.href || '/media/docs/contacts/krishidarshani_contacts.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{language === 'mr' ? 'PDF उघडा' : 'Open Krishidarshani PDF'}</span>
                </a>
                <a
                  href={pdfDoc?.href || '/media/docs/contacts/krishidarshani_contacts.pdf'}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'mr' ? 'डाउनलोड' : 'Download'}</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {language === 'mr' ? 'इतर महत्त्वाची संपर्क दालने' : 'Specialized University Directories'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { href: '/officers', icon: Building2, en: 'Statutory Officers (7)', mr: 'वैधानिक अधिकारी (७)' },
                  { href: '/executive-council', icon: Users, en: 'Executive Council', mr: 'कार्यकारी परिषद' },
                  { href: '/library/contact', icon: BookOpen, en: 'Central Library Desk', mr: 'ग्रंथालय संपर्क' },
                  { href: '/transparency-and-grievance', icon: Shield, en: 'RTI & Grievance Cell', mr: 'RTI व तक्रार कक्ष' },
                ].map((lnk) => {
                  const Icon = lnk.icon;
                  return (
                    <Link
                      key={lnk.href}
                      href={lnk.href}
                      className="p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200/80 flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-emerald-900 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{language === 'mr' ? lnk.mr : lnk.en}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/90 p-4 shadow-xs flex flex-col">
            <div className="px-2 pb-3 flex items-center justify-between gap-2 text-xs text-slate-600">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                {language === 'mr' ? 'विद्यापीठ स्थान नकाशा (राहुरी)' : 'MPKV Central Campus Map — Rahuri'}
              </span>
              <span className="font-mono text-[11px] text-stone-400">19.3477° N, 74.6454° E</span>
            </div>
            {mapUrl && (
              <div className="w-full flex-1 min-h-[340px] rounded-2xl overflow-hidden border border-stone-200">
                <iframe
                  src={mapUrl}
                  title="MPKV Rahuri Campus Location"
                  className="w-full h-full min-h-[340px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
