'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Bell, Briefcase, FileText, Download, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

interface AnnouncementsTabsProps {
  news: any[];
  recruitment: any[];
  tenders: any[];
}

export const AnnouncementsTabs: React.FC<AnnouncementsTabsProps> = ({
  news,
  recruitment,
  tenders
}) => {
  const { language, getBilingual } = useLanguage();
  const [activeTab, setActiveTab] = useState<'news' | 'recruitment' | 'tenders' | 'circulars'>('news');

  const circulars = [
    {
      id: 'circ_1',
      date: '23 Oct 2026',
      title: {
        en: 'Public Notice - 40th Annual Convocation Ceremony of MPKV Rahuri',
        mr: 'जाहीर निवेदन - ४० वा वार्षिक पदवी प्रदान समारंभ, मफुकृवि राहुरी'
      },
      file_path: '/media/docs/20261023_130053_1fbfc1813c46b15f8b89ce15a8d04ca0.pdf'
    },
    {
      id: 'circ_2',
      date: '29 Oct 2026',
      title: {
        en: 'Life Certificate - Specimen form for Pensioners of MPKV Rahuri as of 1 November 2026',
        mr: 'हयातीचे प्रमाणपत्र - मफुकृवि निवृत्ती वेतनधारकांकडून १ नोव्हेंबर २०२६ रोजी हयात असलेले प्रमाणपत्राचा नमुना'
      },
      file_path: '/media/docs/20261029_170823_076f9e632d377675d7eac8cfb5f5e60e.pdf'
    },
    {
      id: 'circ_3',
      date: '17 Nov 2026',
      title: {
        en: 'Admission Notification for Ph.D. (Doctoral) Degree Programmes Academic Year 2026-27 at Central Campus, Rahuri',
        mr: 'सन २०२६-२७ आचार्य पदवी (Ph.D.) अभ्यासक्रमाची प्रवेश सूचना - मध्यवर्ती परिसर, राहुरी'
      },
      file_path: '/media/docs/20261117_160948_9ce404dba955b1b1cd65dbc6e3cecd3a.pdf'
    }
  ];

  return (
    <section className="w-full py-16 bg-[#fafaf7] border-t border-stone-200/60">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 pb-5 border-b border-stone-200/70">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-900 text-[11px] sm:text-xs font-semibold tracking-wide mb-2.5">
              <Bell className="w-4 h-4 text-emerald-600" />
              <span>{language === 'mr' ? 'अधिकृत घोषणा व प्रसिद्धीपत्रके' : 'Official Notices & Gazettes'}</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-semibold text-slate-800 tracking-tight">
              {language === 'mr' ? 'सूचना, भरती व निविदा केंद्र' : 'Notices, Recruitment & Tender Desk'}
            </h2>
          </div>

          {/* Tab Selector Pills - Soft Pastel Tone */}
          <div className="flex flex-wrap gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200/70">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all flex items-center gap-2 ${activeTab === 'news'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'mr' ? 'बातम्या व सल्ला' : 'News'}</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-stone-100 text-slate-600 font-semibold">
                {news.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('recruitment')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all flex items-center gap-2 ${activeTab === 'recruitment'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-sky-600" />
              <span>{language === 'mr' ? 'भरती प्रक्रिया' : 'Recruitment'}</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-stone-100 text-slate-600 font-semibold">
                {recruitment.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('tenders')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all flex items-center gap-2 ${activeTab === 'tenders'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'mr' ? 'ई-निविदा' : 'E-Tenders'}</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-stone-100 text-slate-600 font-semibold">
                {tenders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('circulars')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all flex items-center gap-2 ${activeTab === 'circulars'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <Download className="w-3.5 h-3.5 text-indigo-500" />
              <span>{language === 'mr' ? 'परिपत्रके' : 'Circulars'}</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-stone-100 text-slate-600 font-semibold">
                {circulars.length}
              </span>
            </button>
          </div>
        </div>

        {/* Content Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* NEWS & ADVISORIES */}
          {activeTab === 'news' &&
            news.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/70 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-xs group"
              >
                <div className="space-y-3">
                  <div className="flex items-center text-[11px] sm:text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.date || 'नोव्हेंबर २०२६'}</span>
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-emerald-800 leading-snug transition-colors line-clamp-3">
                    {getBilingual(item.title)}
                  </h3>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-normal">
                    {language === 'mr' ? 'अधिकृत बातमी' : 'Official Press'}
                  </span>
                  <a
                    href={item.link || '#'}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                  >
                    <span>{language === 'mr' ? 'वाचा' : 'Read'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}

          {/* RECRUITMENT */}
          {activeTab === 'recruitment' &&
            recruitment.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/70 hover:border-sky-300 transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-xs group"
              >
                <div className="space-y-3">
                  <div className="flex items-center text-[11px] sm:text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.date || 'नोव्हेंबर २०२६'}</span>
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-sky-800 leading-snug transition-colors line-clamp-3">
                    {getBilingual(item.title)}
                  </h3>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-normal">PDF जाहिरात</span>
                  <a
                    href={item.file_path || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-sky-700 hover:text-sky-900 transition-colors"
                  >
                    <span>{language === 'mr' ? 'जाहिरात डाउनलोड' : 'View PDF'}</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}

          {/* TENDERS */}
          {activeTab === 'tenders' &&
            tenders.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/70 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-xs group"
              >
                <div className="space-y-3">
                  <div className="flex items-center text-[11px] sm:text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.date || 'नोव्हेंबर २०२६'}</span>
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-emerald-800 leading-snug transition-colors line-clamp-3">
                    {getBilingual(item.title)}
                  </h3>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-normal">दस्तऐवज</span>
                  <a
                    href={item.file_path || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                  >
                    <span>{language === 'mr' ? 'निविदा प्रत' : 'Download'}</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}

          {/* CIRCULARS */}
          {activeTab === 'circulars' &&
            circulars.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/70 hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-xs group"
              >
                <div className="space-y-3">
                  <div className="flex items-center text-[11px] sm:text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.date}</span>
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-indigo-800 leading-snug transition-colors line-clamp-3">
                    {getBilingual(item.title)}
                  </h3>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-normal">PDF प्रत</span>
                  <a
                    href={item.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
                  >
                    <span>{language === 'mr' ? 'परिपत्रक पहा' : 'View PDF'}</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
