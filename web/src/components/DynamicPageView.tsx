'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import pagesDataRaw from '@/data/scraped/rahuri_pages.json';
import menuDataRaw from '@/data/scraped/navigation_menu.json';
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
  UserCheck
} from 'lucide-react';

interface DynamicPageViewProps {
  slug: string;
  path?: string;
}

export const DynamicPageView: React.FC<DynamicPageViewProps> = ({ slug, path }) => {
  const { language, getBilingual } = useLanguage();

  const pages = pagesDataRaw as Record<string, any>;
  let page = slug ? pages[slug] : null;

  // If not found by direct slug, try to find by full path in navigation menu
  let navItemTitle: { en: string; mr: string } | null = null;
  if (!page && path) {
    const formattedPath = '/' + path;
    const findInMenu = (items: any[]): any => {
      for (const item of items) {
        if (item.href === formattedPath || item.href === path) {
          return item.title;
        }
        if (item.children) {
          const res = findInMenu(item.children);
          if (res) return res;
        }
      }
      return null;
    };
    navItemTitle = findInMenu(menuDataRaw as any[]);
  }

  // If found in nav menu, build a synthesized Rahuri Campus section page
  if (!page && navItemTitle) {
    page = {
      slug: slug,
      title: navItemTitle,
      hero: {
        headline: navItemTitle,
        subheadline: {
          en: 'Central Campus, Mahatma Phule Krishi Vidyapeeth, Rahuri, Dist. Ahilyanagar',
          mr: 'मध्यवर्ती परिसर, महात्मा फुले कृषि विद्यापीठ, राहुरी, जि. अहिल्यानगर'
        },
        badge: {
          en: 'Rahuri Central Campus',
          mr: 'राहुरी मध्यवर्ती परिसर'
        }
      },
      content: {
        p1: {
          en: 'This section pertains to the central university headquarters at Rahuri, Post Graduate Institute (PGI) Rahuri, Dr. A.S. College of Agricultural Engineering and Technology Rahuri, and central university schemes. All academic, research, and extension activities are administered from the central Rahuri campus under ICAR guidelines.',
          mr: 'हा विभाग महात्मा फुले कृषि विद्यापीठाचे मध्यवर्ती मुख्यालय राहुरी, पदव्युत्तर महाविद्यालय (PGI) राहुरी, डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी व तंत्रज्ञान महाविद्यालय राहुरी आणि विद्यापीठ प्रक्षेत्राशी संबंधित आहे. येथील सर्व शैक्षणिक, संशोधन व विस्तार उपक्रम भा.कृ.अनु.प. (ICAR) च्या मानकांनुसार राहुरी मध्यवर्ती संकुलातून संचलित केले जातात.'
        },
        mandate: {
          title: {
            en: 'Rahuri Headquarters Services',
            mr: 'राहुरी मुख्यालय सेवा व सुविधा'
          },
          items: [
            {
              en: 'Pioneering agricultural education and accredited degree programmes at Central Campus Rahuri.',
              mr: 'राहुरी मध्यवर्ती संकुलात अग्रगण्य कृषि शिक्षण व मान्यताप्राप्त पदवी अभ्यासक्रम.'
            },
            {
              en: 'Advanced research laboratories, seed testing, and climate-resilient crop innovations.',
              mr: 'अत्याधुनिक संशोधन प्रयोगशाळा, बियाणे प्रमाणीकरण आणि हवामान-अनुकूल पिकांचे संशोधन.'
            },
            {
              en: 'Agricultural technology dissemination and certified seed/nursery material distribution to farmers.',
              mr: 'शेतकऱ्यांना आधुनिक शेती तंत्रज्ञान मार्गदर्शन व प्रमाणित बियाणे/रोपवाटिका साठ्याचे वितरण.'
            }
          ]
        }
      }
    };
  }

  if (!page) {
    return (
      <div className="w-full px-4 sm:px-8 xl:px-12 py-16 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center font-bold text-2xl border border-amber-100">
          404
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          {language === 'mr' ? 'पृष्ठ सापडले नाही' : 'Page Not Found'}
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-normal">
          {language === 'mr'
            ? 'आपण शोधत असलेले पृष्ठ उपलब्ध नाही किंवा हे पोर्टल केवळ राहुरी मध्यवर्ती विद्यापीठ परिसरापुरते मर्यादित आहे.'
            : 'The requested page is not found or is filtered outside the MPKV Rahuri central headquarters scope.'}
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

  return (
    <div className="w-full px-4 sm:px-8 xl:px-12 py-6 sm:py-8 space-y-6 sm:space-y-8 transition-colors">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-emerald-700 flex items-center gap-1 font-medium">
          <Home className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
        <span className="text-slate-600 font-medium">{language === 'mr' ? 'राहुरी परिसर' : 'Rahuri Campus'}</span>
        <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
        <span className="font-semibold text-emerald-800 truncate">
          {getBilingual(page.title)}
        </span>
      </nav>

      {/* Hero Header - Soft Pastel Sage / Oyster */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#f0f7f3] via-[#f7fbf8] to-[#faf9f5] text-slate-800 rounded-3xl p-6 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-emerald-100/80">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3.5 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            {page.hero?.badge && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 font-medium text-xs rounded-full uppercase">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>{getBilingual(page.hero.badge)}</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'mr' ? 'राहुरी मध्यवर्ती मुख्यालय' : 'Rahuri Central Campus'}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-800 leading-tight">
            {getBilingual(page.hero?.headline || page.title)}
          </h1>

          {page.hero?.subheadline && (
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-3xl">
              {getBilingual(page.hero.subheadline)}
            </p>
          )}
        </div>
      </div>

      {/* 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Primary Content (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/80 space-y-6">
            {page.content?.p1 && (
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed text-justify font-normal">
                {getBilingual(page.content.p1)}
              </p>
            )}
            {page.content?.p2 && (
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed text-justify font-normal">
                {getBilingual(page.content.p2)}
              </p>
            )}
            {page.content?.bio && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-slate-600 text-xs sm:text-sm leading-relaxed text-justify font-normal">
                {getBilingual(page.content.bio)}
              </div>
            )}

            {/* Address / Quote Highlight if present */}
            {page.content?.address && (
              <div className="p-6 bg-gradient-to-br from-emerald-50/60 to-amber-50/40 border-l-4 border-emerald-500 rounded-r-2xl space-y-2.5 shadow-xs">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-semibold text-emerald-950 text-sm sm:text-base">
                    {language === 'mr' ? 'मा. कुलगुरूंचे मनोगत' : "Vice-Chancellor's Message"}
                  </h3>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed italic font-normal">
                  "{getBilingual(page.content.address)}"
                </p>
                <div className="pt-2 text-right">
                  <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                    {language === 'mr' ? 'डॉ. विलास के. खर्चे' : 'Dr. Vilas K. Kharche'}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">
                    {language === 'mr' ? 'कुलगुरू, मफुकृवि राहुरी' : 'Vice-Chancellor, MPKV Rahuri'}
                  </div>
                </div>
              </div>
            )}

            {/* Mandate Items if any */}
            {page.content?.mandate && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
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
                      <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {getBilingual(item)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Academic Departments Grid if any (e.g. PGI, Dr. AS CAET) */}
            {page.departments && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                    {language === 'mr' ? 'महाविद्यालयातील विभाग (राहुरी)' : 'Academic Departments (Rahuri)'}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {page.departments.map((dept: any, i: number) => (
                    <div
                      key={i}
                      className="p-4 bg-stone-50/70 hover:bg-emerald-50/70 rounded-2xl border border-stone-200/70 hover:border-emerald-200 transition-all group"
                    >
                      <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-900 transition-colors">
                        {getBilingual(dept.name)}
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal mt-1 flex items-center gap-1">
                        <span>{language === 'mr' ? 'राहुरी परिसर' : 'Rahuri Campus'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Knowledge Services if any (e.g. Central Library) */}
            {page.services && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                    {language === 'mr' ? 'ग्रंथालय सुविधा व डिजिटल सेवा' : 'Library & Digital Knowledge Services'}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {page.services.map((srv: any, i: number) => (
                    <div
                      key={i}
                      className="p-4 bg-gradient-to-r from-emerald-50/50 to-white rounded-2xl border border-emerald-100/70 flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800">
                        {getBilingual(srv.title)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar Desk & Rahuri Quick Info (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Authority Card */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">
                {language === 'mr' ? 'राहुरी मध्यवर्ती केंद्र' : 'Rahuri Central Desk'}
              </h4>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
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
                <span className="font-medium text-slate-800">02426-243215, 243366</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-normal">registrar.mpkv@gov.in</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/seeds-availability"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-900 text-xs font-semibold transition-colors"
              >
                <span>{language === 'mr' ? 'राहुरी बियाणे साठा तपासा' : 'Check Seeds Stock'}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Downloadable Rahuri Circulars & Syllabi */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-4 h-4 text-emerald-700" />
              <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">
                {language === 'mr' ? 'डाउनलोड व परिपत्रके' : 'Downloads & Circulars'}
              </h4>
            </div>

            <div className="space-y-2.5">
              <a
                href="/media/docs/20261117_160948_9ce404dba955b1b1cd65dbc6e3cecd3a.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-stone-50/80 hover:bg-emerald-50/70 border border-stone-200/70 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-slate-800 group-hover:text-emerald-900">
                      {language === 'mr' ? '४० वा दीक्षांत समारंभ परिपत्रक' : '40th Convocation Circular'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal">PDF (1.2 MB)</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
              </a>

              <a
                href="/media/docs/SRF_DUS_Chickpea_Pulses_Project_Rahuri.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-stone-50/80 hover:bg-emerald-50/70 border border-stone-200/70 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-slate-800 group-hover:text-emerald-900">
                      {language === 'mr' ? 'राहुरी कडधान्य प्रकल्प जाहिरात' : 'Chickpea Project Rahuri SRF'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal">PDF (680 KB)</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPageView;
