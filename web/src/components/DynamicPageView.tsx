'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility } from '@/context/AccessibilityContext';
import {
  ChevronRight,
  Home,
  Building2,
  BookOpen,
  Award,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  FileText,
  Download,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Search,
  Printer,
  Calendar,
  Volume2,
  VolumeX,
  List,
  Eye
} from 'lucide-react';

interface DynamicPageViewProps {
  slug: string;
  path?: string;
  initialPageData?: any;
}

export const DynamicPageView: React.FC<DynamicPageViewProps> = ({
  slug,
  path,
  initialPageData
}) => {
  const { language, getBilingual } = useLanguage();
  const { isSpeaking, speakContent, stopSpeech } = useAccessibility();

  const [pageSearch, setPageSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const page = initialPageData;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (!page) {
    return (
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-16 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center font-bold text-2xl border border-amber-200">
          404
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          {language === 'mr' ? 'पृष्ठ सापडले नाही' : 'Page Not Found'}
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-normal">
          {language === 'mr'
            ? 'आपण शोधत असलेले पृष्ठ उपलब्ध नाही किंवा त्याचा पत्ता बदललेला असू शकतो.'
            : 'The requested page was not found or may have been relocated.'}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-2xl text-xs sm:text-sm transition-colors shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>{language === 'mr' ? 'मुख्यपृष्ठावर परत जा' : 'Return to Home'}</span>
        </Link>
      </div>
    );
  }

  // Filtered tables based on search
  const tables = page.tables || [];
  const notices = page.notices || [];
  const tenders = page.tenders || [];
  const circulars = page.circulars || [];
  const paragraphs = page.paragraphs || [];
  const mediaAssets = page.mediaAssets || [];
  const images = mediaAssets.filter((m: string) => /\.(png|jpe?g|webp|gif)$/i.test(m));

  // Determine page title
  const pageTitle = page.title ? getBilingual(page.title) : 'MPKV Rahuri';
  const heroTitle = page.hero?.title ? getBilingual(page.hero.title) : pageTitle;
  const heroSubtitle = page.hero?.subtitle
    ? getBilingual(page.hero.subtitle)
    : page.hero?.subheadline
    ? getBilingual(page.hero.subheadline)
    : null;
  const heroBadge = page.hero?.badge ? getBilingual(page.hero.badge) : null;

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-6 sm:space-y-8 transition-colors">
      {/* 1. Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-emerald-700 flex items-center gap-1 font-medium">
          <Home className="w-4 h-4" />
          <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        {page.breadcrumb && page.breadcrumb.length > 1 ? (
          page.breadcrumb.map((bc: any, idx: number) => {
            if (idx === 0) return null;
            return (
              <React.Fragment key={idx}>
                <span className="text-slate-600 font-medium">{getBilingual(bc.title)}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              </React.Fragment>
            );
          })
        ) : (
          <>
            <span className="text-slate-600 font-medium">
              {language === 'mr' ? 'राहुरी परिसर' : 'Rahuri Central'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          </>
        )}
        <span className="font-semibold text-emerald-800 truncate">{pageTitle}</span>
      </nav>

      {/* 2. Hero Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#f0f7f3] via-[#f7fbf8] to-[#faf9f5] text-slate-800 rounded-3xl p-6 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-emerald-100/80">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              {heroBadge && (
                <span className="inline-flex items-center gap-1 px-3.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 font-semibold text-xs sm:text-sm rounded-full uppercase">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>{heroBadge}</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full text-xs sm:text-sm font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{language === 'mr' ? 'राहुरी मध्यवर्ती मुख्यालय' : 'Rahuri Central Campus'}</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-800 leading-tight">
              {heroTitle}
            </h1>

            {heroSubtitle && (
              <p className="text-slate-600 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-3xl">
                {heroSubtitle}
              </p>
            )}
          </div>

          {/* Action buttons (Print & Listen) */}
          <div className="flex items-center gap-2.5 flex-shrink-0 self-start md:self-auto">
            <button
              onClick={() => (isSpeaking ? stopSpeech() : speakContent())}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 font-bold ring-2 ring-amber-300 animate-pulse'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80'
              }`}
              title={language === 'mr' ? 'मजकूर ऐका' : 'Listen to Content'}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-600" />
                  <span>{language === 'mr' ? 'थांबवा' : 'Stop'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'mr' ? 'मजकूर ऐका' : 'Listen'}</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              title={language === 'mr' ? 'पृष्ठ प्रिंट करा' : 'Print Page'}
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Search Filter Bar if page contains multiple tables or records */}
      {(tables.length > 0 || tenders.length > 0 || circulars.length > 0 || notices.length > 0) && (
        <div className="w-full bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3.5">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={pageSearch}
              onChange={(e) => setPageSearch(e.target.value)}
              placeholder={
                language === 'mr'
                  ? 'या पृष्ठावरील माहिती, नियम किंवा निविदा शोधा...'
                  : 'Search records, acts, tenders or circulars...'
              }
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="text-sm text-slate-600 font-medium">
            {language === 'mr' ? 'एकूण सारण्या:' : 'Total Tables:'}{' '}
            <span className="font-semibold text-emerald-700">{tables.length}</span>
            {(tenders.length > 0 || circulars.length > 0) && (
              <>
                <span className="mx-2 text-slate-300">|</span>
                <span>
                  {language === 'mr' ? 'अधिसूचना व परिपत्रके:' : 'Notices & Circulars:'}{' '}
                  <span className="font-semibold text-amber-700">{tenders.length + circulars.length + notices.length}</span>
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* 4. 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Area (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Paragraphs if present */}
          {paragraphs.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/80 space-y-4">
              {paragraphs.map((p: any, idx: number) => {
                const text = typeof p === 'object' ? getBilingual(p) : p;
                if (!text || !text.trim()) return null;
                return (
                  <p
                    key={idx}
                    className="text-slate-700 text-base md:text-lg leading-relaxed text-justify font-normal"
                  >
                    {text}
                  </p>
                );
              })}
            </div>
          )}

          {/* Curated legacy content blocks if present */}
          {(page.content?.p1 || page.content?.p2 || page.content?.bio || page.content?.address) && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/80 space-y-6">
              {page.content?.p1 && (
                <p className="text-slate-700 text-base md:text-lg leading-relaxed text-justify font-normal">
                  {getBilingual(page.content.p1)}
                </p>
              )}
              {page.content?.p2 && (
                <p className="text-slate-700 text-base md:text-lg leading-relaxed text-justify font-normal">
                  {getBilingual(page.content.p2)}
                </p>
              )}
              {page.content?.bio && (
                <div className="p-4.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-slate-700 text-sm sm:text-base leading-relaxed text-justify font-normal">
                  {getBilingual(page.content.bio)}
                </div>
              )}
              {page.content?.address && (
                <div className="p-6 bg-gradient-to-br from-emerald-50/60 to-amber-50/40 border-l-4 border-emerald-500 rounded-r-2xl space-y-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-emerald-700" />
                    <h3 className="font-semibold text-emerald-950 text-base sm:text-lg">
                      {language === 'mr' ? 'मा. कुलगुरूंचे मनोगत' : "Vice-Chancellor's Message"}
                    </h3>
                  </div>
                  <p className="text-slate-700 text-base md:text-lg leading-relaxed italic font-normal">
                    "{getBilingual(page.content.address)}"
                  </p>
                  <div className="pt-2 text-right">
                    <div className="font-semibold text-slate-800 text-sm sm:text-base">
                      {language === 'mr' ? 'डॉ. विलास के. खर्चे' : 'Dr. Vilas K. Kharche'}
                    </div>
                    <div className="text-xs sm:text-sm text-emerald-700 font-medium">
                      {language === 'mr' ? 'कुलगुरू, मफुकृवि राहुरी' : 'Vice-Chancellor, MPKV Rahuri'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mandate Items if any */}
          {page.content?.mandate && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-4 bg-emerald-500 rounded-full" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                  {getBilingual(page.content.mandate.title)}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {page.content.mandate.items?.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#f0f7f3]/60 hover:bg-[#f0f7f3] border border-emerald-100/80 flex items-start gap-3 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {getBilingual(item)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scraped Tables with Interactive Search & Download Buttons */}
          {tables.map((table: any, tIdx: number) => {
            const tableCaption = table.caption ? getBilingual(table.caption) : null;
            const headers = table.headers || [];
            let rows = table.rows || [];

            // Apply filter if search term is active
            if (pageSearch.trim()) {
              const term = pageSearch.toLowerCase();
              rows = rows.filter((r: any[]) =>
                r.some((cell: any) => {
                  const text = cell?.text ? getBilingual(cell.text) : '';
                  return text.toLowerCase().includes(term);
                })
              );
            }

            return (
              <div
                key={table.id || tIdx}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/80 space-y-4"
              >
                {tableCaption && (
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <List className="w-4 h-4 text-emerald-700" />
                      <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                        {tableCaption}
                      </h3>
                    </div>
                    <span className="text-xs sm:text-sm text-slate-500 font-medium">
                      {rows.length} {language === 'mr' ? 'नोंदी' : 'records'}
                    </span>
                  </div>
                )}

                <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
                  <table className="w-full text-left border-collapse text-sm sm:text-base">
                    <thead>
                      <tr className="bg-slate-50 text-slate-800 font-semibold border-b border-slate-200 text-xs sm:text-sm uppercase tracking-wider">
                        {headers.map((h: any, hIdx: number) => (
                          <th key={hIdx} className="px-4 py-3.5 whitespace-nowrap">
                            {typeof h === 'object' ? getBilingual(h) : h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rows.length === 0 ? (
                        <tr>
                          <td
                            colSpan={headers.length || 1}
                            className="px-4 py-8 text-center text-slate-400 italic text-sm"
                          >
                            {language === 'mr'
                              ? 'कोणतीही माहिती सापडली नाही.'
                              : 'No matching records found.'}
                          </td>
                        </tr>
                      ) : (
                        rows.map((row: any[], rIdx: number) => (
                          <tr
                            key={rIdx}
                            className="hover:bg-slate-50/70 transition-colors even:bg-slate-50/30"
                          >
                            {row.map((cell: any, cIdx: number) => {
                              const cellText = cell?.text ? getBilingual(cell.text) : '';
                              const fileLink = cell?.fileLink;

                              return (
                                <td key={cIdx} className="px-4 py-3.5 align-middle text-slate-700">
                                  {fileLink ? (
                                    <a
                                      href={fileLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-2xs group"
                                      title={cellText || 'Download Document'}
                                    >
                                      <FileText className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
                                      <span>
                                        {cellText || (language === 'mr' ? 'दस्तऐवज पहा' : 'View PDF')}
                                      </span>
                                      <Download className="w-3.5 h-3.5 text-rose-400 ml-0.5" />
                                    </a>
                                  ) : (
                                    <span>{cellText || '-'}</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          {/* Tenders, Circulars or Notices Cards */}
          {(tenders.length > 0 || circulars.length > 0 || notices.length > 0) && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText className="w-5 h-5 text-amber-600" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                  {language === 'mr' ? 'निविदा व परिपत्रके सूची' : 'Tenders & Circulars Repository'}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3.5 max-h-[600px] overflow-y-auto pr-1">
                {[...tenders, ...circulars, ...notices].map((item: any, idx: number) => {
                  const title = item.title ? getBilingual(item.title) : item.name;
                  const date = item.date || item.published_at || 'Recent';
                  const filePath = item.file_path || item.pdfUrl || item.link;

                  return (
                    <div
                      key={idx}
                      className="p-4.5 rounded-2xl bg-stone-50/70 hover:bg-emerald-50/40 border border-stone-200/70 hover:border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 transition-colors"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200/60">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{date}</span>
                          </span>
                          {item.sr_no && (
                            <span className="text-xs text-slate-500">
                              #{item.sr_no}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                          {title}
                        </h4>
                      </div>

                      {filePath && (
                        <a
                          href={filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-300 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-2xs"
                        >
                          <Download className="w-4 h-4" />
                          <span>{language === 'mr' ? 'डाउनलोड (PDF)' : 'Download'}</span>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Media Images Gallery if any */}
          {images.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Eye className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                  {language === 'mr' ? 'छायाचित्र दालन' : 'Photo & Campus Gallery'}
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((imgSrc: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(imgSrc)}
                    className="relative rounded-2xl overflow-hidden border border-slate-200 cursor-pointer group aspect-video bg-slate-100"
                  >
                    <img
                      src={imgSrc}
                      alt="MPKV Rahuri Campus Asset"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Desk & Quick Actions (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Authority & Office Contact Card */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="font-semibold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">
                {language === 'mr' ? 'राहुरी मध्यवर्ती केंद्र' : 'Rahuri Central Desk'}
              </h4>
            </div>

            <div className="space-y-3.5 text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed font-normal">
                  {language === 'mr'
                    ? 'महात्मा फुले कृषि विद्यापीठ, मध्यवर्ती परिसर, राहुरी, जि. अहिल्यानगर - ४१३७२२'
                    : 'MPKV Rahuri Central Campus, Dist. Ahilyanagar - 413722'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-slate-800">02426-243215, 243366</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-normal">registrar.mpkv@gov.in</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <Link
                href="/seeds-availability"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-900 text-sm font-semibold transition-colors"
              >
                <span>{language === 'mr' ? 'राहुरी बियाणे साठा तपासा' : 'Check Seeds Stock'}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/nursery-stock"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 text-amber-900 text-sm font-semibold transition-colors"
              >
                <span>{language === 'mr' ? 'रोपवाटिका कलमे साठा' : 'Nursery Plants Stock'}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Downloads & Circulars */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-4 h-4 text-emerald-700" />
              <h4 className="font-semibold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">
                {language === 'mr' ? 'महत्वाचे दस्तऐवज' : 'Key Documents'}
              </h4>
            </div>

            <div className="space-y-3">
              <a
                href="/media/docs/MAU_Act_1983_upto_2012.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-stone-50/80 hover:bg-emerald-50/70 border border-stone-200/70 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-slate-800 group-hover:text-emerald-900">
                      {language === 'mr' ? 'महाराष्ट्र कृषी विद्यापीठ कायदा' : 'MAU Act 1983 (upto 2012)'}
                    </div>
                    <div className="text-xs text-slate-500 font-normal">PDF</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
              </a>

              <a
                href="/media/docs/20261117_160948_9ce404dba955b1b1cd65dbc6e3cecd3a.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-stone-50/80 hover:bg-emerald-50/70 border border-stone-200/70 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-slate-800 group-hover:text-emerald-900">
                      {language === 'mr' ? '४० वा दीक्षांत समारंभ परिपत्रक' : '40th Convocation Circular'}
                    </div>
                    <div className="text-xs text-slate-500 font-normal">PDF</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center font-bold text-sm shadow-lg hover:bg-slate-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPageView;
