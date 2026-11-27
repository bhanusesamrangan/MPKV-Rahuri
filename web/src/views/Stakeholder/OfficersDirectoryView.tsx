'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Home,
  ChevronRight,
  Crown,
  Phone,
  Mail,
  Printer,
  Copy,
  Check,
  Search,
  LayoutGrid,
  Table as TableIcon,
  ArrowRight,
  ZoomIn,
  X,
  Building2,
  Users,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface OfficerItem {
  id: number;
  name: { en: string; mr: string };
  designation: { en: string; mr: string };
  emails: string[];
  phone: string;
  fax: string;
  photo: string;
  tier: 'apex' | 'directorate' | 'administration';
  portalHref: string;
  portalLabel: { en: string; mr: string };
}

export const OfficersDirectoryView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [tierFilter, setTierFilter] = useState<'all' | 'apex' | 'directorate' | 'administration'>('all');
  const [viewMode, setViewMode] = useState<'hierarchy' | 'table'>('hierarchy');
  const [query, setQuery] = useState('');
  const [copiedTxt, setCopiedTxt] = useState<string | null>(null);
  const [zoomPhoto, setZoomPhoto] = useState<{ src: string; name: string; role: string } | null>(null);

  const officers: OfficerItem[] = pageData?.officers || [];
  const getTxt = (v: any) =>
    typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '';

  const filteredOfficers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return officers.filter((o) => {
      const okTier = tierFilter === 'all' || o.tier === tierFilter;
      const okQ =
        !q ||
        o.name.en.toLowerCase().includes(q) ||
        o.name.mr.includes(q) ||
        o.designation.en.toLowerCase().includes(q) ||
        o.designation.mr.includes(q) ||
        o.emails.some((e) => e.toLowerCase().includes(q));
      return okTier && okQ;
    });
  }, [officers, tierFilter, query]);

  const apexOfficer = filteredOfficers.find((o) => o.tier === 'apex');
  const directorOfficers = filteredOfficers.filter((o) => o.tier === 'directorate');
  const adminOfficers = filteredOfficers.filter((o) => o.tier === 'administration');

  const copyValue = (txt: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(txt);
      setCopiedTxt(txt);
      setTimeout(() => setCopiedTxt(null), 1600);
    }
  };

  const renderOfficerCard = (off: OfficerItem) => (
    <div
      key={off.id}
      className="bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-md hover:border-amber-400/80 transition-all overflow-hidden flex flex-col justify-between group"
    >
      <div>
        {/* Portrait Header Strip */}
        <div
          onClick={() =>
            setZoomPhoto({ src: off.photo, name: getTxt(off.name), role: getTxt(off.designation) })
          }
          className="relative h-64 bg-gradient-to-b from-[#edf3ee] via-[#f7f8f5] to-white flex items-end justify-center pt-5 px-4 cursor-pointer overflow-hidden border-b border-stone-100"
        >
          <img
            src={off.photo}
            alt={getTxt(off.name)}
            className="h-56 w-auto object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-[#112e20] text-amber-300 text-[10px] font-bold uppercase tracking-wider">
            #{off.id}
          </span>
          <span className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/90 text-slate-700 border border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-2xs">
            <ZoomIn className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Name & Designation */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
              {getTxt(off.designation)}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {getTxt(off.name)}
            </h3>
          </div>

          {/* Contact Chips */}
          <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
            {off.phone && off.phone !== '-' && (
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                <a
                  href={`tel:${off.phone.replace(/[^+\d]/g, '')}`}
                  className="inline-flex items-center gap-2 font-mono font-bold text-slate-800 hover:text-emerald-800"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{off.phone}</span>
                </a>
                <button
                  onClick={() => copyValue(off.phone)}
                  className="p-1 rounded-md text-stone-400 hover:text-emerald-800"
                  title="Copy phone"
                >
                  {copiedTxt === off.phone ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            )}

            {off.fax && off.fax !== '-' && (
              <div className="flex items-center gap-2 px-2.5 py-1.5 text-[11px] text-slate-500 font-mono">
                <Printer className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>Fax: {off.fax}</span>
              </div>
            )}

            {off.emails.map((em) => (
              <div
                key={em}
                className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60"
              >
                <a
                  href={`mailto:${em}`}
                  className="inline-flex items-center gap-2 font-semibold text-emerald-950 hover:underline truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="truncate">{em}</span>
                </a>
                <button
                  onClick={() => copyValue(em)}
                  className="p-1 rounded-md text-emerald-700/60 hover:text-emerald-900 shrink-0"
                  title="Copy email"
                >
                  {copiedTxt === em ? (
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#f8f7f3] text-slate-800">
      {/* Standard Breadcrumb */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <nav className="w-full max-w-[1720px] mx-auto flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-emerald-800 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">
            {language === 'mr' ? 'अधिकारी' : 'Officers'}
          </span>
        </nav>
      </div>

      {/* ROYAL EMERALD & CHAMPAGNE BRASS EXECUTIVE HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#081c13] via-[#113121] to-[#1a4931] text-white border-b-4 border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-amber-300" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          {/* Controls: Search & View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-emerald-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'mr' ? 'अधिकारी किंवा पद शोधा...' : 'Search officer, role or email...'}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/25 text-white placeholder:text-emerald-100/60 text-xs sm:text-sm focus:outline-amber-300"
              />
            </div>

            <div className="inline-flex bg-black/25 p-1 rounded-xl border border-white/15">
              <button
                onClick={() => setViewMode('hierarchy')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === 'hierarchy' ? 'bg-amber-400 text-slate-950' : 'text-emerald-100 hover:bg-white/10'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'पदक्रम' : 'Cards'}</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === 'table' ? 'bg-amber-400 text-slate-950' : 'text-emerald-100 hover:bg-white/10'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'तक्ता' : 'Table'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 space-y-10">
        {/* Tier Filter Bar */}
        <div
          className="flex flex-wrap items-center gap-2"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
        >
          {(
            [
              { id: 'all', en: `All Statutory Officers (${officers.length})`, mr: `सर्व अधिकारी (${officers.length})` },
              { id: 'apex', en: 'Hon. Vice-Chancellor (1)', mr: 'मा. कुलगुरू (१)' },
              { id: 'directorate', en: 'Directors — Extension, Research & Education (3)', mr: 'संचालक त्रयी (३)' },
              { id: 'administration', en: 'Registrar, Comptroller & Engineer (3)', mr: 'प्रशासन, वित्त व अभियंता (३)' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTierFilter(t.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                tierFilter === t.id
                  ? 'bg-[#113121] text-amber-200 border-[#113121] shadow-xs'
                  : 'bg-white text-slate-700 border-stone-200 hover:bg-emerald-50'
              }`}
            >
              {language === 'mr' ? t.mr : t.en}
            </button>
          ))}
        </div>

        {viewMode === 'hierarchy' ? (
          <div className="space-y-10">
            {/* TIER 1: HON. VICE-CHANCELLOR APEX SPOTLIGHT */}
            {apexOfficer && (
              <div className="bg-white rounded-3xl border-2 border-amber-400/70 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div
                  onClick={() =>
                    setZoomPhoto({
                      src: apexOfficer.photo,
                      name: getTxt(apexOfficer.name),
                      role: getTxt(apexOfficer.designation),
                    })
                  }
                  className="lg:col-span-4 bg-gradient-to-br from-[#eaf2ec] via-[#f7f7f2] to-amber-50/60 flex items-end justify-center pt-6 px-6 cursor-pointer relative group"
                >
                  <img
                    src={apexOfficer.photo}
                    alt={getTxt(apexOfficer.name)}
                    className="h-72 w-auto object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#113121] text-amber-300 text-xs font-bold">
                    <Crown className="w-3.5 h-3.5" />
                    #1 Apex Authority
                  </span>
                </div>

                <div className="lg:col-span-8 p-7 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-extrabold uppercase tracking-wider">
                      {getTxt(apexOfficer.designation)}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900">
                      {getTxt(apexOfficer.name)}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-2">
                      <a
                        href={`tel:${apexOfficer.phone.replace(/[^+\d]/g, '')}`}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-900 hover:text-emerald-800"
                      >
                        <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{apexOfficer.phone}</span>
                      </a>
                      <button onClick={() => copyValue(apexOfficer.phone)} className="text-stone-400 hover:text-emerald-800">
                        {copiedTxt === apexOfficer.phone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-2 text-xs font-mono text-slate-700">
                      <Printer className="w-4 h-4 text-stone-500 shrink-0" />
                      <span>Fax: {apexOfficer.fax}</span>
                    </div>

                    <Link
                      href={apexOfficer.portalHref}
                      className="p-3.5 rounded-2xl bg-[#113121] hover:bg-emerald-900 text-amber-200 font-bold text-xs flex items-center justify-between gap-2 transition-colors"
                    >
                      <span>{getTxt(apexOfficer.portalLabel)}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-2 border-t border-stone-100">
                    {apexOfficer.emails.map((em) => (
                      <div
                        key={em}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-950"
                      >
                        <Mail className="w-3.5 h-3.5 text-emerald-700" />
                        <a href={`mailto:${em}`} className="hover:underline">
                          {em}
                        </a>
                        <button onClick={() => copyValue(em)} className="text-emerald-700/60 hover:text-emerald-950 ml-1">
                          {copiedTxt === em ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TIER 2: STATUTORY DIRECTORS TRIAD */}
            {directorOfficers.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2.5">
                  <span className="w-2 h-5 rounded-full bg-emerald-700" />
                  <span>
                    {language === 'mr'
                      ? 'संचालक मंडळ (विस्तार शिक्षण, संशोधन व शिक्षण)'
                      : 'Directorates — Extension Education, Research & Education'}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {directorOfficers.map(renderOfficerCard)}
                </div>
              </div>
            )}

            {/* TIER 3: STATUTORY ADMINISTRATION, FINANCE & WORKS */}
            {adminOfficers.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-stone-200 pb-2.5">
                  <span className="w-2 h-5 rounded-full bg-amber-500" />
                  <span>
                    {language === 'mr'
                      ? 'प्रशासन, वित्त व अभियांत्रिकी (कुलसचिव, नियंत्रक, विद्यापीठ अभियंता)'
                      : 'Administration, Finance & Engineering (Registrar, Comptroller & Engineer)'}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {adminOfficers.map(renderOfficerCard)}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* COMPACT OFFICIAL TABLE VIEW */
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#113121] text-amber-200 text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-5">#</th>
                    <th className="py-3.5 px-5">{language === 'mr' ? 'अधिकारी' : 'Officer Name'}</th>
                    <th className="py-3.5 px-5">{language === 'mr' ? 'पदनाम' : 'Designation'}</th>
                    <th className="py-3.5 px-5">{language === 'mr' ? 'ईमेल' : 'Official Email'}</th>
                    <th className="py-3.5 px-5">{language === 'mr' ? 'दूरध्वनी' : 'Phone'}</th>
                    <th className="py-3.5 px-5">{language === 'mr' ? 'फॅक्स' : 'Fax'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOfficers.map((off) => (
                    <tr key={off.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-5 font-mono text-xs text-slate-500">{off.id}</td>
                      <td className="py-3.5 px-5 font-bold text-slate-900">
                        <div className="flex items-center gap-3">
                          <img
                            src={off.photo}
                            alt={getTxt(off.name)}
                            className="w-10 h-10 rounded-full object-cover object-top border border-stone-200 bg-stone-100 shrink-0"
                          />
                          <span>{getTxt(off.name)}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 font-medium text-emerald-900">{getTxt(off.designation)}</td>
                      <td className="py-3.5 px-5 text-xs space-y-1">
                        {off.emails.map((em) => (
                          <a key={em} href={`mailto:${em}`} className="block text-emerald-800 hover:underline font-medium">
                            {em}
                          </a>
                        ))}
                      </td>
                      <td className="py-3.5 px-5 font-mono text-xs font-semibold text-slate-800">{off.phone}</td>
                      <td className="py-3.5 px-5 font-mono text-xs text-slate-500">{off.fax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CROSS LINKS: EXECUTIVE COUNCIL & CAMPUS CONTACTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/executive-council"
            className="p-5 rounded-2xl bg-[#113121] hover:bg-emerald-900 text-white flex items-center justify-between gap-4 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-amber-300 shrink-0" />
              <div>
                <h3 className="text-base font-bold">
                  {language === 'mr' ? 'कार्यकारी परिषद' : 'Executive Council (26 Statutory Seats)'}
                </h3>
                <p className="text-xs text-emerald-100/80">
                  {language === 'mr' ? 'कलम ३० अंतर्गत सर्व सदस्य पहा' : 'View Section 30 Statutory Council Members'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-300 shrink-0" />
          </Link>

          <Link
            href="/contact-us"
            className="p-5 rounded-2xl bg-white hover:bg-amber-50/50 border border-stone-200/90 text-slate-900 flex items-center justify-between gap-4 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-emerald-700 shrink-0" />
              <div>
                <h3 className="text-base font-bold">
                  {language === 'mr' ? 'विभागनिहाय संपर्क निर्देशिका' : 'University Contacts Directory'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'mr' ? 'ATIC, बियाणे, वसतिगृहे व कॅम्पस फोन नंबर' : 'ATIC, Seed Cell, Hostels, Security & Department Phones'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-700 shrink-0" />
          </Link>
        </div>
      </section>

      {zoomPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomPhoto(null)}
        >
          <div className="relative max-w-xl w-full bg-white rounded-3xl p-6 text-center space-y-3" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-slate-700 hover:bg-stone-200"
              aria-label="Close portrait"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={zoomPhoto.src} alt={zoomPhoto.name} className="max-h-[65vh] w-auto object-contain mx-auto rounded-2xl" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">{zoomPhoto.name}</h3>
              <p className="text-xs font-semibold text-emerald-800">{zoomPhoto.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
