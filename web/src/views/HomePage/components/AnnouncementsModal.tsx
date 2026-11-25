'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  X,
  Search,
  Bell,
  Briefcase,
  FileText,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Printer,
  FileDown,
  Clock,
  Sparkles,
  Calendar
} from 'lucide-react';
import { printElement } from '@/utils/printElement';
import recruitmentDataRaw from '@/data/scraped/pages/recruitment.json';
import tendersDataRaw from '@/data/scraped/pages/tenders.json';
import circularsDataRaw from '@/data/scraped/pages/circulars.json';

export type ModalType = 'news' | 'recruitment' | 'tenders';

interface AnnouncementsModalProps {
  type: ModalType | null;
  onClose: () => void;
  newsItems: any[];
  activeRecruitment: any[];
  activeTenders: any[];
  activeCirculars: any[];
}

export interface ModalRecord {
  id: string;
  sr: number | string;
  title: string;
  date?: string;
  category: string;
  fileLink: string;
  originalLink?: string;
}

const resolveLink = (fileLink?: string, origLink?: string): string => {
  if (fileLink && !fileLink.startsWith('~/') && fileLink !== '#') {
    return fileLink;
  }
  if (origLink && typeof origLink === 'string') {
    if (origLink.startsWith('http')) return origLink;
    const cleaned = origLink.replace(/^~?(\/\.\.)*\/?/, '');
    return `https://mpkv.ac.in/${cleaned}`;
  }
  return '#';
};

export const AnnouncementsModal: React.FC<AnnouncementsModalProps> = ({
  type,
  onClose,
  newsItems,
  activeRecruitment,
  activeTenders,
  activeCirculars
}) => {
  const { language, getBilingual } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [subFilter, setSubFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Close on Escape key & manage scroll lock
  useEffect(() => {
    if (!type) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  // Reset page & filters when modal type changes
  useEffect(() => {
    setSearchTerm('');
    setSubFilter('all');
    setCurrentPage(1);
  }, [type]);

  // Parse and build datasets
  const allRecords = useMemo<ModalRecord[]>(() => {
    if (!type) return [];

    if (type === 'news') {
      return (newsItems || []).map((n, idx) => ({
        id: n.id || `news_${idx}`,
        sr: idx + 1,
        title: getBilingual(n.title),
        date: n.date ? `${n.date} 2026` : '18 Nov 2026',
        category: n.title?.mr?.includes('सल्ला') || (typeof n.title?.en === 'string' && n.title.en.toLowerCase().includes('advisory'))
          ? (language === 'mr' ? 'शेतकरी सल्ला' : 'Farmer Advisory')
          : (language === 'mr' ? 'प्रसिद्धीपत्रक' : 'Press Release'),
        fileLink: resolveLink(n.file_path, n.original_link),
        originalLink: n.original_link ? resolveLink('', n.original_link) : undefined
      }));
    }

    if (type === 'recruitment') {
      const records: ModalRecord[] = [];

      // 1. Prepend active recruitment notices
      (activeRecruitment || []).forEach((rec, idx) => {
        records.push({
          id: rec.id || `rec_active_${idx}`,
          sr: idx + 1,
          title: getBilingual(rec.title),
          date: rec.date || 'Nov 2026',
          category: rec.department || (language === 'mr' ? 'भरती जाहिरात' : 'Recruitment'),
          fileLink: resolveLink(rec.file_path, rec.original_link),
          originalLink: rec.original_link ? resolveLink('', rec.original_link) : undefined
        });
      });

      // 2. Parse all scraped recruitment rows from official portal
      try {
        const rawRows = recruitmentDataRaw?.tables?.[0]?.rows || [];
        rawRows.forEach((r: any, idx: number) => {
          const cells = r.value || [];
          const srText = cells[0]?.text?.en || String(records.length + 1);
          const titleText = cells[1]?.text?.en || cells[1]?.text?.mr || '';
          if (!titleText) return;

          const fLink = cells[2]?.fileLink || '';
          const origLink = cells[2]?.originalLink || '';

          const isContract = /contract|कंत्राटी|contractual|walk-in|temporary/i.test(titleText);

          records.push({
            id: `rec_scraped_${idx}`,
            sr: srText,
            title: titleText,
            date: 'Archive Notice',
            category: isContract
              ? (language === 'mr' ? 'कंत्राटी पदभरती' : 'Contractual Post')
              : (language === 'mr' ? 'प्रकल्प / प्राध्यापक' : 'Project / Faculty'),
            fileLink: resolveLink(fLink, origLink),
            originalLink: origLink ? resolveLink('', origLink) : undefined
          });
        });
      } catch (err) {
        console.error('Error parsing recruitment json', err);
      }

      return records;
    }

    if (type === 'tenders') {
      const records: ModalRecord[] = [];

      // 1. Prepend active tenders
      (activeTenders || []).forEach((tnd, idx) => {
        records.push({
          id: tnd.id || `tnd_active_${idx}`,
          sr: idx + 1,
          title: getBilingual(tnd.title),
          date: tnd.date || 'Nov 2026',
          category: tnd.tender_no || (language === 'mr' ? 'ई-निविदा' : 'E-Tender'),
          fileLink: resolveLink(tnd.file_path, tnd.original_link),
          originalLink: tnd.original_link ? resolveLink('', tnd.original_link) : undefined
        });
      });

      // 2. Prepend active circulars
      (activeCirculars || []).forEach((circ, idx) => {
        records.push({
          id: circ.id || `circ_active_${idx}`,
          sr: records.length + 1,
          title: getBilingual(circ.title),
          date: circ.date || 'Oct 2026',
          category: language === 'mr' ? 'परिपत्रक' : 'University Circular',
          fileLink: resolveLink(circ.file_path, circ.original_link),
          originalLink: circ.original_link ? resolveLink('', circ.original_link) : undefined
        });
      });

      // 3. Parse all official scraped tenders
      try {
        const rawTenderRows = tendersDataRaw?.tables?.[0]?.rows || [];
        rawTenderRows.forEach((r: any, idx: number) => {
          const cells = r.value || [];
          const srText = cells[0]?.text?.en || String(records.length + 1);
          const titleText = cells[1]?.text?.en || cells[1]?.text?.mr || '';
          if (!titleText) return;

          const fLink = cells[2]?.fileLink || '';
          const origLink = cells[2]?.originalLink || '';

          records.push({
            id: `tnd_scraped_${idx}`,
            sr: srText,
            title: titleText,
            date: 'Portal Tender',
            category: language === 'mr' ? 'ई-निविदा' : 'E-Tender Notice',
            fileLink: resolveLink(fLink, origLink),
            originalLink: origLink ? resolveLink('', origLink) : undefined
          });
        });

        // 4. Parse scraped circulars tables
        const circularTables = circularsDataRaw?.tables || [];
        circularTables.forEach((table: any) => {
          (table.rows || []).forEach((r: any, idx: number) => {
            const cells = r.value || [];
            const srText = cells[0]?.text?.en || String(records.length + 1);
            const titleText = cells[1]?.text?.en || cells[1]?.text?.mr || '';
            if (!titleText) return;

            const fLink = cells[2]?.fileLink || '';
            const origLink = cells[2]?.originalLink || '';

            records.push({
              id: `circ_scraped_${idx}_${records.length}`,
              sr: srText,
              title: titleText,
              date: 'Circular Notice',
              category: language === 'mr' ? 'प्रशासकीय परिपत्रक' : 'Administrative Circular',
              fileLink: resolveLink(fLink, origLink),
              originalLink: origLink ? resolveLink('', origLink) : undefined
            });
          });
        });
      } catch (err) {
        console.error('Error parsing tenders & circulars json', err);
      }

      return records;
    }

    return [];
  }, [type, newsItems, activeRecruitment, activeTenders, activeCirculars, language, getBilingual]);

  // Filter records based on search and subFilter
  const filteredRecords = useMemo(() => {
    return allRecords.filter((rec) => {
      // Sub-category filter
      if (subFilter !== 'all') {
        if (subFilter === 'tenders' && !rec.category.includes('निविदा') && !rec.category.includes('Tender')) {
          return false;
        }
        if (subFilter === 'circulars' && !rec.category.includes('परिपत्रक') && !rec.category.includes('Circular')) {
          return false;
        }
        if (subFilter === 'contract' && !/कंत्राटी|contract/i.test(rec.title + rec.category)) {
          return false;
        }
        if (subFilter === 'advisory' && !/सल्ला|advisory/i.test(rec.title + rec.category)) {
          return false;
        }
      }

      // Search query
      if (!searchTerm.trim()) return true;
      const query = searchTerm.toLowerCase();
      return (
        rec.title.toLowerCase().includes(query) ||
        rec.category.toLowerCase().includes(query) ||
        (rec.date && rec.date.toLowerCase().includes(query)) ||
        String(rec.sr).includes(query)
      );
    });
  }, [allRecords, searchTerm, subFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const currentRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRecords, currentPage]);

  if (!type) return null;

  // Modal Header Themes & Config
  const modalConfig = {
    news: {
      titleMr: 'सर्व बातम्या व शेतकरी सल्ला निर्देशिका',
      titleEn: 'All University News & Farmer Crop Advisories',
      subtitleMr: 'महात्मा फुले कृषी विद्यापीठाची अधिकृत प्रसिद्धीपत्रके व दैनिक पीक मार्गदर्शन.',
      subtitleEn: 'Official daily advisories, crop protection releases and university news.',
      icon: Bell,
      color: 'emerald',
      bgBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    recruitment: {
      titleMr: 'सर्व भरती प्रक्रिया व जाहिराती निर्देशिका',
      titleEn: 'All Recruitment Notices & Career Openings',
      subtitleMr: 'संशोधन, प्राध्यापक, कंत्राटी व तांत्रिक पदांच्या अधिकृत जाहिराती व निकाल.',
      subtitleEn: 'Official employment notices, research fellowships, and recruitment results.',
      icon: Briefcase,
      color: 'sky',
      bgBadge: 'bg-sky-50 text-sky-800 border-sky-200'
    },
    tenders: {
      titleMr: 'सर्व ई-निविदा व परिपत्रके निर्देशिका',
      titleEn: 'All E-Tenders, Quotations & Circulars Directory',
      subtitleMr: 'खरेदी प्रक्रिया, कंत्राटे, दरपत्रके व प्रशासकीय आदेशांची अधिकृत यादी.',
      subtitleEn: 'Official procurement tenders, RFP quotations, and university circulars.',
      icon: FileText,
      color: 'teal',
      bgBadge: 'bg-teal-50 text-teal-800 border-teal-200'
    }
  }[type];

  const Icon = modalConfig.icon;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="flex-shrink-0 px-6 py-5 border-b border-stone-200 flex items-start justify-between gap-4 bg-stone-50/60">
          <div className="flex items-center gap-3.5">
            <div className={`p-2.5 rounded-2xl ${modalConfig.bgBadge} border shadow-2xs`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${modalConfig.bgBadge}`}>
                  {type === 'news' ? 'News Desk' : type === 'recruitment' ? 'Recruitment Desk' : 'Procurement Desk'}
                </span>
                <span className="text-xs font-extrabold text-stone-500">
                  {filteredRecords.length} {language === 'mr' ? 'नोंदी' : 'Records'}
                </span>
              </div>
              <h3 id="modal-title" className="text-base sm:text-xl font-bold text-slate-900 mt-1 leading-snug">
                {language === 'mr' ? modalConfig.titleMr : modalConfig.titleEn}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5 hidden sm:block">
                {language === 'mr' ? modalConfig.subtitleMr : modalConfig.subtitleEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => printElement('announcements-modal-table', language === 'mr' ? modalConfig.titleMr : modalConfig.titleEn)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 font-semibold text-xs border border-stone-200 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer no-print"
              title={language === 'mr' ? 'तक्ता प्रिंट करा' : 'Print Table'}
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-500 hover:text-stone-900 border border-stone-200 transition-colors shadow-2xs cursor-pointer"
              title="Close modal"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex-shrink-0 px-6 py-3.5 border-b border-stone-200 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={language === 'mr' ? 'शीर्षक, विषय किंवा संदर्भ क्रमांकाने शोधा...' : 'Search by title, department, or keyword...'}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Sub-filter pills if applicable */}
          {type === 'tenders' && (
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs shrink-0">
              <button
                onClick={() => { setSubFilter('all'); setCurrentPage(1); }}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  subFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'mr' ? 'सर्व' : 'All'}
              </button>
              <button
                onClick={() => { setSubFilter('tenders'); setCurrentPage(1); }}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  subFilter === 'tenders' ? 'bg-white text-teal-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'mr' ? 'ई-निविदा' : 'E-Tenders'}
              </button>
              <button
                onClick={() => { setSubFilter('circulars'); setCurrentPage(1); }}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  subFilter === 'circulars' ? 'bg-white text-teal-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'mr' ? 'परिपत्रके' : 'Circulars'}
              </button>
            </div>
          )}

          {type === 'recruitment' && (
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs shrink-0">
              <button
                onClick={() => { setSubFilter('all'); setCurrentPage(1); }}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  subFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'mr' ? 'सर्व जाहिराती' : 'All Posts'}
              </button>
              <button
                onClick={() => { setSubFilter('contract'); setCurrentPage(1); }}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  subFilter === 'contract' ? 'bg-white text-sky-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'mr' ? 'कंत्राटी पदे' : 'Contractual'}
              </button>
            </div>
          )}
        </div>

        {/* Modal Scrollable Table Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6" id="announcements-modal-table">
          {filteredRecords.length === 0 ? (
            <div className="py-16 text-center text-stone-500 space-y-3">
              <Search className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-base font-bold text-stone-700">
                {language === 'mr' ? 'कोणतीही नोंद सापडली नाही.' : 'No records found matching your search.'}
              </p>
              <p className="text-xs text-stone-400">
                {language === 'mr' ? 'कृपया वेगळे शब्द वापरून पुन्हा शोधा.' : 'Please try different keywords or reset the filter.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-100/90 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
                    <th className="py-3 px-3.5 w-16 text-center">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                    <th className="py-3 px-4">{language === 'mr' ? 'शीर्षक व तपशील' : 'Subject & Description'}</th>
                    <th className="py-3 px-4 w-44">{language === 'mr' ? 'विभाग / प्रवर्ग' : 'Category / Dept'}</th>
                    <th className="py-3 px-4 w-36 text-right">{language === 'mr' ? 'दस्तऐवज' : 'Download'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {currentRecords.map((item, idx) => {
                    const rowNum = (currentPage - 1) * itemsPerPage + idx + 1;
                    const isValidLink = item.fileLink && item.fileLink !== '#';

                    return (
                      <tr key={item.id} className="hover:bg-stone-50/90 transition-colors">
                        <td className="py-3.5 px-3.5 text-center font-bold text-stone-500 whitespace-nowrap">
                          {rowNum}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-stone-900 block leading-snug">
                            {item.title}
                          </span>
                          {item.date && item.date !== 'Archive Notice' && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-medium mt-1">
                              <Calendar className="w-3 h-3 text-amber-600" />
                              <span>{item.date}</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200 inline-block">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          {isValidLink ? (
                            <a
                              href={item.fileLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/90 font-bold text-xs transition-colors shadow-2xs group"
                            >
                              <FileDown className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition-transform" />
                              <span>{type === 'news' ? (language === 'mr' ? 'सल्ला PDF' : 'Read PDF') : (language === 'mr' ? 'डाउनलोड' : 'Download')}</span>
                            </a>
                          ) : (
                            <span className="text-stone-400 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer with Pagination */}
        <div className="flex-shrink-0 px-6 py-3.5 border-t border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-stone-500 font-medium">
            {language === 'mr' ? 'दर्शवित आहे ' : 'Showing '}
            <span className="font-bold text-stone-800">
              {filteredRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
            </span>
            {' - '}
            <span className="font-bold text-stone-800">
              {Math.min(currentPage * itemsPerPage, filteredRecords.length)}
            </span>
            {language === 'mr' ? ' (एकूण ' : ' of '}
            <span className="font-bold text-stone-800">{filteredRecords.length}</span>
            {language === 'mr' ? ' नोंदींपैकी)' : ' records)'}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1 rounded-lg bg-white border border-stone-200 font-bold text-stone-800 shadow-2xs">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
