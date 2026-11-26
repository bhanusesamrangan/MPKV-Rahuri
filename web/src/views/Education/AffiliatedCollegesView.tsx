'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Users,
  Search,
  Filter,
  GraduationCap,
  Sparkles,
  ExternalLink,
  BookOpen,
  LayoutGrid,
  Table as TableIcon,
  Printer
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { printElement } from '@/utils/printElement';
import { EducationBreadcrumb } from './components/EducationBreadcrumb';
import { EducationHero } from './components/EducationHero';

interface AffiliatedCollegesViewProps {
  pageData: any;
}

interface ParsedAffiliatedCollege {
  id: string;
  srNo: string;
  name: string;
  address: string;
  degree: string;
  degreeCategory: string;
  intake: string;
  phone: string;
  email: string;
}

export const AffiliatedCollegesView: React.FC<AffiliatedCollegesViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const breadcrumbItems = pageData?.breadcrumb || [
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Colleges', mr: 'महाविद्यालये' }, href: '/education/constituent-colleges' },
    { title: { en: 'Affiliated Colleges', mr: 'संलग्न महाविद्यालये' } }
  ];

  const heroTitle = pageData?.hero?.title || {
    en: 'Affiliated Colleges Directory',
    mr: 'संलग्न महाविद्यालयांची सर्वसमावेशक माहिती'
  };
  const heroSubtitle = pageData?.hero?.subtitle || {
    en: '64 non-grant affiliated agricultural colleges across Western Maharashtra offering Bachelor’s degree programmes under MPKV academic regulation.',
    mr: 'मफुकृवि च्या शैक्षणिक नियमावलीनुसार पदवी अभ्यासक्रम चालविणारी पश्चिम महाराष्ट्रातील ६४ विनाअनुदानित संलग्न महाविद्यालये.'
  };
  const heroBadge = pageData?.hero?.badge || {
    en: '64 Non-Grant Affiliated Colleges | 6 Degree Streams',
    mr: '६४ विनाअनुदानित संलग्न महाविद्यालये | ६ पदवी शाखा'
  };

  // Parse raw tables into clean objects
  const parsedColleges: ParsedAffiliatedCollege[] = useMemo(() => {
    const list: ParsedAffiliatedCollege[] = [];
    const tables: any[] = pageData?.tables || [];

    const categoryMap: Record<number, string> = {
      0: 'Agriculture',
      1: 'Horticulture',
      2: 'Biotechnology',
      3: 'Food Technology',
      4: 'Agricultural Engineering',
      5: 'Agri Business Management'
    };

    tables.forEach((tbl, tIdx) => {
      const cat = categoryMap[tIdx] || 'Other';
      const rows: any[] = tbl.rows || [];

      rows.forEach((row, rIdx) => {
        const srNo = row[0]?.text?.en || String(rIdx + 1);
        const nameAndAddr = row[1]?.text?.en || '';
        const degree = row[2]?.text?.en || '';
        const intake = row[3]?.text?.en || '60';
        const phone = row[4]?.text?.en || '';
        const email = row[5]?.text?.en || '';

        if (!nameAndAddr || nameAndAddr === '--') return;

        // Split name & address
        const parts = nameAndAddr.split('\n');
        const name = parts[0]?.trim() || nameAndAddr;
        const address = parts.slice(1).join(', ').trim() || name;

        list.push({
          id: `aff-${tIdx}-${rIdx}`,
          srNo,
          name,
          address,
          degree: degree || cat,
          degreeCategory: cat,
          intake,
          phone: phone !== '--' ? phone : '',
          email: email !== '--' ? email : ''
        });
      });
    });

    return list;
  }, [pageData]);

  // Degree category tabs
  const categories = [
    { id: 'All', label: { en: 'All Colleges (64)', mr: 'सर्व महाविद्यालये (६४)' } },
    { id: 'Agriculture', label: { en: 'B.Sc. Agriculture (38)', mr: 'कृषि (३८)' } },
    { id: 'Horticulture', label: { en: 'B.Sc. Horticulture (5)', mr: 'उद्यानविद्या (५)' } },
    { id: 'Biotechnology', label: { en: 'B.Tech. Biotech (3)', mr: 'जैवतंत्रज्ञान (३)' } },
    { id: 'Food Technology', label: { en: 'B.Tech. Food Tech (6)', mr: 'अन्नतंत्रज्ञान (६)' } },
    { id: 'Agricultural Engineering', label: { en: 'B.Tech. Agril. Engg (5)', mr: 'कृषि अभियांत्रिकी (५)' } },
    { id: 'Agri Business Management', label: { en: 'B.Sc. ABM (7)', mr: 'कृषि व्यवसाय (७)' } }
  ];

  // Filtering
  const filteredList = useMemo(() => {
    return parsedColleges.filter((c) => {
      const matchCat = selectedCategory === 'All' || c.degreeCategory === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !searchQuery ||
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.degree.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q);

      return matchCat && matchQuery;
    });
  }, [parsedColleges, selectedCategory, searchQuery]);

  return (
    <article className="min-h-screen bg-[#faf9f6] text-stone-800">
      <EducationBreadcrumb items={breadcrumbItems} />
      <EducationHero
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={heroBadge}
        theme="affiliated"
        quickChips={[
          { label: language === 'mr' ? '६४ विनाअनुदानित महाविद्यालये' : '64 Non-Grant Affiliated Colleges' },
          { label: language === 'mr' ? '६ पदवी विद्याशाखा' : '6 Degree Streams' },
          { label: language === 'mr' ? 'पश्चिम महाराष्ट्र कार्यक्षेत्र' : 'Western Maharashtra Network' }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-10">
        
        {/* Search, Filter & View Controls */}
        <section aria-label="Directory Filters" className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'महाविद्यालयाचे नाव, गाव, फोन किंवा ईमेल शोधा...' : 'Search college name, address, email, phone...'}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 bg-stone-50"
              />
            </div>

            {/* View Mode Toggle & Print */}
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'mr' ? 'ग्रिड' : 'Grid'}</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    viewMode === 'table'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Table View"
                >
                  <TableIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'mr' ? 'तक्ता' : 'Table'}</span>
                </button>
              </div>

              <button
                onClick={() => printElement('affiliated-colleges-printable-section', language === 'mr' ? 'मफुकृवि संलग्न महाविद्यालये यादी व तक्ता' : 'MPKV Affiliated Colleges Directory')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer no-print"
                title={language === 'mr' ? 'यादी किंवा तक्ता प्रिंट करा' : 'Print Colleges List / Table'}
              >
                <Printer className="w-3.5 h-3.5 text-stone-600" />
                <span className="hidden sm:inline">{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
              </button>
            </div>
          </div>

          {/* Discipline Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {getBilingual(cat.label)}
                </button>
              );
            })}
          </div>
        </section>

        {/* Directory Content */}
        <section aria-labelledby="directory-heading" className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 id="directory-heading" className="text-xl sm:text-2xl font-bold text-stone-900">
              {language === 'mr'
                ? `संलग्न महाविद्यालये (${filteredList.length})`
                : `Affiliated Colleges (${filteredList.length})`}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-emerald-800 hidden sm:inline">
                {language === 'mr' ? 'विनाअनुदानित मान्यताप्राप्त' : 'Non-Grant Approved Colleges'}
              </span>
              <button
                onClick={() => printElement('affiliated-colleges-printable-section', language === 'mr' ? 'मफुकृवि संलग्न महाविद्यालये यादी व तक्ता' : 'MPKV Affiliated Colleges Directory')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer no-print"
                title={language === 'mr' ? 'प्रिंट करा' : 'Print'}
              >
                <Printer className="w-3.5 h-3.5 text-stone-600" />
                <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
              </button>
            </div>
          </div>

          <div id="affiliated-colleges-printable-section">
          {filteredList.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500">
              <Building2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-base font-semibold">
                {language === 'mr' ? 'कोणतेही संलग्न महाविद्यालय सापडले नाही.' : 'No affiliated colleges found matching your criteria.'}
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            /* Card Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredList.map((college, idx) => (
                <div
                  key={college.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {college.degreeCategory}
                      </span>
                      <span className="text-xs font-black text-stone-400">
                        #{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                      {college.name}
                    </h3>

                    <div className="flex items-start gap-2 text-xs text-stone-600">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{college.address}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-stone-100 mt-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">{language === 'mr' ? 'प्रवेश क्षमता:' : 'Intake:'}</span>
                      <span className="font-extrabold text-emerald-900 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                        {college.intake} {language === 'mr' ? 'जागा' : 'Seats'}
                      </span>
                    </div>

                    {college.phone && (
                      <div className="flex items-center gap-2 text-stone-600">
                        <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <a href={`tel:${college.phone.split(',')[0].trim()}`} className="hover:underline hover:text-emerald-800 truncate">
                          {college.phone}
                        </a>
                      </div>
                    )}

                    {college.email && (
                      <div className="flex items-center gap-2 text-stone-600">
                        <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <a href={`mailto:${college.email}`} className="hover:underline hover:text-emerald-800 truncate text-[11px]">
                          {college.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="py-3 px-4">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'महाविद्यालयाचे नाव व पत्ता' : 'College Name & Address'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'विद्याशाखा' : 'Stream'}</th>
                      <th className="py-3 px-4 text-center">{language === 'mr' ? 'प्रवेश क्षमता' : 'Intake'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'संपर्क' : 'Contact'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredList.map((col, idx) => (
                      <tr key={col.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3 px-4 font-semibold text-stone-500">{idx + 1}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-stone-900 block">{col.name}</span>
                          <span className="text-xs text-stone-500 block mt-0.5">{col.address}</span>
                        </td>
                        <td className="py-3 px-4 text-stone-700 font-medium">{col.degreeCategory}</td>
                        <td className="py-3 px-4 text-center font-bold text-emerald-900">{col.intake}</td>
                        <td className="py-3 px-4 text-xs text-stone-600 space-y-0.5">
                          {col.phone && <div className="truncate">{col.phone}</div>}
                          {col.email && <div className="text-emerald-800 font-medium truncate">{col.email}</div>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          </div>
        </section>

      </div>
    </article>
  );
};
