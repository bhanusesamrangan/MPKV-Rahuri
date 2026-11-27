'use client';

import React, { useMemo, useState } from 'react';
import {
  Phone,
  Mail,
  Users,
  Building,
  Search,
  UserCheck,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LibrarySubnav } from './components/LibrarySubnav';

interface StaffMember {
  srNo: number;
  name: string;
  designation: string;
  phone: string;
  emails: string[];
  isVacant: boolean;
  roleGroup: string;
}

export const LibraryContactView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [copiedTxt, setCopiedTxt] = useState<string | null>(null);

  const primary = pageData?.primaryContact || {};
  const roster: StaffMember[] = pageData?.staffRoster || [];
  const contractualCount: number = pageData?.contractualStaffCount ?? 9;

  const roles = useMemo(
    () => ['all', ...Array.from(new Set(roster.map((s) => s.roleGroup)))],
    [roster]
  );

  const filteredStaff = useMemo(() => {
    const q = query.trim().toLowerCase();
    return roster.filter((s) => {
      const okRole = roleFilter === 'all' || s.roleGroup === roleFilter;
      const okQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.designation.toLowerCase().includes(q) ||
        s.emails.some((e) => e.toLowerCase().includes(q));
      return okRole && okQ;
    });
  }, [roster, roleFilter, query]);

  const copyVal = (txt: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(txt);
      setCopiedTxt(txt);
      setTimeout(() => setCopiedTxt(null), 1600);
    }
  };

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f7f6f3] text-slate-800">
      <LibrarySubnav
        activeSlug="library-contact"
        currentTitle={{ en: 'Library Contacts & Human Resource', mr: 'ग्रंथालय संपर्क व कर्मचारी वर्ग' }}
        accentActiveClass="bg-[#292524] text-amber-300 border-[#292524] shadow-xs"
      />

      {/* CHARCOAL & BRASS EXECUTIVE LEADERSHIP HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#181615] via-[#292524] to-[#44403c] text-white border-b-4 border-amber-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>{getTxt(pageData?.hero?.badge)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-4xl">
            {getTxt(pageData?.hero?.title)}
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
            {getTxt(pageData?.hero?.subtitle)}
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-8">
        {/* UNIVERSITY LIBRARIAN OFFICE + STAFFING SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-amber-300/70 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  {language === 'mr' ? 'अधिकृत संपर्क प्रमुख' : 'Head of Central Library'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{primary.name}</h2>
                <p className="text-sm font-semibold text-stone-600">{getTxt(primary.designation)}</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs font-medium text-stone-700 flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{getTxt(primary.office)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-700 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">
                      {language === 'mr' ? 'कार्यालय व सेल क्र.' : 'Phone & Cell No.'}
                    </p>
                    <p className="text-sm font-bold text-slate-900">{primary.phone || '02426-243356'}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyVal(primary.phone || '02426-243356')}
                  className="p-2 rounded-lg hover:bg-stone-200 text-stone-500"
                  title="Copy Phone"
                >
                  {copiedTxt === (primary.phone || '02426-243356') ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-stone-500 font-bold">
                  <Mail className="w-4 h-4 text-amber-700" />
                  <span>{language === 'mr' ? 'अधिकृत ईमेल पत्ते' : 'Official Email Addresses'}</span>
                </div>
                {(primary.emails || []).map((em: string) => (
                  <div key={em} className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-900">
                    <a href={`mailto:${em}`} className="hover:text-amber-700 truncate">
                      {em}
                    </a>
                    <button onClick={() => copyVal(em)} className="text-stone-400 hover:text-stone-700">
                      {copiedTxt === em ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Workforce Breakdown Plaque */}
          <div className="lg:col-span-5 bg-[#292524] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-md">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              {language === 'mr' ? 'ग्रंथालय मनुष्यबळ रचना' : 'Human Resource Strength Overview'}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl font-extrabold text-white">{roster.length}</p>
                <p className="text-[11px] text-stone-300 mt-1">
                  {language === 'mr' ? 'नियमित पदे' : 'Sanctioned Posts'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/30">
                <p className="text-2xl font-extrabold text-emerald-300">
                  {roster.filter((s) => !s.isVacant).length}
                </p>
                <p className="text-[11px] text-emerald-100 mt-1">
                  {language === 'mr' ? 'कार्यरत पदे' : 'Filled Regular'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-400 text-stone-950">
                <p className="text-2xl font-extrabold">{contractualCount}</p>
                <p className="text-[11px] font-bold mt-1">
                  {language === 'mr' ? 'कंत्राटी कर्मचारी' : 'Contractual Staff'}
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed border-t border-white/10 pt-4">
              {language === 'mr'
                ? 'वरील १० नियमित पदांव्यतिरिक्त ग्रंथालयात ९ कंत्राटी कर्मचारी कार्यरत आहेत (एकूण १८ कार्यरत कर्मचारी).'
                : `In addition to the ${roster.length} sanctioned posts (1 Peon post vacant), ${contractualCount} Contractual Staff support daily circulation, stack maintenance & reading halls.`}
            </p>
          </div>
        </div>

        {/* FILTERABLE HUMAN RESOURCE DIRECTORY */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-stone-200/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div
              className="flex flex-wrap items-center gap-2"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
            >
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    roleFilter === r
                      ? 'bg-[#292524] text-amber-300 border-[#292524]'
                      : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {r === 'all' ? (language === 'mr' ? `सर्व (${roster.length})` : `All Staff (${roster.length})`) : r}
                </button>
              ))}
            </div>

            <div className="relative shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'mr' ? 'नाव किंवा पद शोधा...' : 'Search staff or designation...'}
                className="pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 text-xs w-56 focus:outline-stone-700"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500 border-b border-stone-200">
                  <th className="py-3.5 px-5">{language === 'mr' ? 'अ.क्र.' : 'Sr. No.'}</th>
                  <th className="py-3.5 px-5">{language === 'mr' ? 'कर्मचाऱ्याचे नाव' : 'Name of the Staff'}</th>
                  <th className="py-3.5 px-5">{language === 'mr' ? 'पदनाम' : 'Designation'}</th>
                  <th className="py-3.5 px-5">{language === 'mr' ? 'विभाग / गट' : 'Unit'}</th>
                  <th className="py-3.5 px-5">{language === 'mr' ? 'संपर्क क्र. व ईमेल' : 'Contact No. & E-mail'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredStaff.map((st) => (
                  <tr key={st.srNo} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-xs text-stone-500">{st.srNo}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900">
                      <span className="inline-flex items-center gap-2">
                        {st.isVacant ? (
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        ) : (
                          <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                        )}
                        <span className={st.isVacant ? 'text-amber-700 italic' : ''}>{st.name}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-700 font-medium">{st.designation}</td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-bold">
                        {st.roleGroup}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-xs text-slate-700 space-y-1">
                      <div className="font-mono font-semibold">{st.phone}</div>
                      {st.emails.map((em) => (
                        <a
                          key={em}
                          href={`mailto:${em}`}
                          className="block text-amber-800 hover:underline font-medium"
                        >
                          {em}
                        </a>
                      ))}
                    </td>
                  </tr>
                ))}
                <tr className="bg-stone-100 font-bold text-slate-900">
                  <td className="py-3.5 px-5" />
                  <td className="py-3.5 px-5" colSpan={3}>
                    {language === 'mr' ? 'कंत्राटी कर्मचारी' : 'Additional Contractual Support Staff'}
                  </td>
                  <td className="py-3.5 px-5 text-amber-800">{language === 'mr' ? 'एकूण कंत्राटी कर्मचारी' : 'Contractual Staff'} : {contractualCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
