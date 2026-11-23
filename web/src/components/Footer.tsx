'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="w-full bg-[#f4f7f5] text-slate-600 text-sm border-t border-stone-200/80 mt-12 transition-colors">
      {/* Upper Footer: Full-Width 4-Column Directory */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 xl:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12">
        {/* Col 1: About Rahuri HQ */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <img src="/media/logos/Logo.png" alt="MPKV Logo" className="w-11 h-11 object-contain rounded-full drop-shadow-2xs" />
            <div>
              <h4 className="text-slate-900 font-semibold text-base leading-tight">
                {language === 'mr' ? 'महात्मा फुले कृषि विद्यापीठ' : 'Mahatma Phule Krishi Vidyapeeth'}
              </h4>
              <p className="text-amber-800 font-medium text-sm">
                {language === 'mr' ? 'मध्यवर्ती परिसर, राहुरी' : 'Central Campus, Rahuri'}
              </p>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed text-justify text-sm font-normal">
            {language === 'mr'
              ? 'महाराष्ट्र शासनाचे अग्रणी राज्य कृषि विद्यापीठ. हे अधिकृत पोर्टल केवळ मध्यवर्ती विद्यापीठ मुख्यालय, पदव्युत्तर महाविद्यालय, डॉ. अ.शि. कृषि अभियांत्रिकी व राहुरी मध्यवर्ती संशोधन केंद्रांसाठी समर्पित आहे.'
              : 'The premier State Agricultural University of Maharashtra. This portal is exclusively dedicated to the Central University Headquarters, PGI, Dr. A.S. CAET & Central Research Stations at Rahuri.'}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-md bg-white border border-stone-200/80 text-amber-900 font-medium text-xs shadow-2xs">
              ICAR Accredited 'A' Grade
            </span>
            <span className="px-3 py-1 rounded-md bg-amber-50 border border-amber-200/60 text-amber-900 font-medium text-xs">
              Est. 1968
            </span>
          </div>
        </div>

        {/* Col 2: Essential Links */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-stone-200/80 pb-2">
            <span className="w-1 h-3.5 bg-amber-500 rounded-full" />
            <h4 className="text-slate-800 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              {language === 'mr' ? 'महत्त्वाचे दुवे' : 'Essential Links'}
            </h4>
          </div>
          <ul className="space-y-2 text-slate-600 font-normal text-sm">
            <li>
              <Link href="/mpkv-at-a-glance" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                <span className="text-slate-400">›</span>
                <span>{language === 'mr' ? 'दृष्टीक्षेपात मफुकृवि' : 'MPKV at a Glance'}</span>
              </Link>
            </li>
            <li>
              <Link href="/about-mahatma-phule" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                <span className="text-slate-400">›</span>
                <span>{language === 'mr' ? 'महात्मा फुले यांच्या विषयी' : 'About Mahatma Jyotiba Phule'}</span>
              </Link>
            </li>
            <li>
              <Link href="/vc-desk" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                <span className="text-slate-400">›</span>
                <span>{language === 'mr' ? 'मा. कुलगुरू संदेश' : "Vice-Chancellor's Desk"}</span>
              </Link>
            </li>
            <li>
              <Link href="/post-graduate-institute-rahuri" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                <span className="text-slate-400">›</span>
                <span>{language === 'mr' ? 'पदव्युत्तर महाविद्यालय (PGI Rahuri)' : 'Post Graduate Institute, Rahuri'}</span>
              </Link>
            </li>
            <li>
              <Link href="/dr-as-caet-rahuri" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                <span className="text-slate-400">›</span>
                <span>{language === 'mr' ? 'डॉ. अ.शि. कृषि अभियांत्रिकी (CAET)' : 'Dr. A.S. CAET, Rahuri'}</span>
              </Link>
            </li>
            <li>
              <Link href="/central-library-rahuri" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                <span className="text-slate-400">›</span>
                <span>{language === 'mr' ? 'मध्यवर्ती ग्रंथालय (Central Library)' : 'Central University Library'}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Farmer & Citizen Services */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-stone-200/80 pb-2">
            <span className="w-1 h-3.5 bg-amber-500 rounded-full" />
            <h4 className="text-slate-800 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              {language === 'mr' ? 'शेतकरी व नागरिक सेवा' : 'Farmer & Citizen Desk'}
            </h4>
          </div>
          <ul className="space-y-2 text-slate-600 font-normal text-sm">
            <li>
              <Link href="/seeds-availability" className="hover:text-amber-800 transition-colors flex items-center gap-1.5 font-medium text-slate-800">
                <span className="text-amber-600">›</span>
                <span>{language === 'mr' ? 'बियाणे उपलब्धता साठा' : 'Rahuri Certified Seeds Availability'}</span>
              </Link>
            </li>
            <li>
              <Link href="/nursery-stock" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                <span className="text-slate-400">›</span>
                <span>{language === 'mr' ? 'मध्यवर्ती रोपवाटिका साठा' : 'Central Nursery Plant Stock'}</span>
              </Link>
            </li>
            <li>
              <Link href="/farm-implements" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                <span className="text-slate-400">›</span>
                <span>{language === 'mr' ? 'विकसित शेती अवजारे' : 'Rahuri Developed Farm Implements'}</span>
              </Link>
            </li>
            <li>
              <Link href="/atic-rahuri" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                <span className="text-slate-400">›</span>
                <span>{language === 'mr' ? 'कृषि तंत्रज्ञान माहिती केंद्र (ATIC)' : 'ATIC Rahuri Single Window'}</span>
              </Link>
            </li>
            <li>
              <a href="https://icar.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-800 transition-colors inline-flex items-center gap-1">
                <span className="text-slate-400">›</span>
                <span>ICAR New Delhi</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Rahuri Central Contact Directory */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-stone-200/80 pb-2">
            <span className="w-1 h-3.5 bg-amber-500 rounded-full" />
            <h4 className="text-slate-800 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              {language === 'mr' ? 'मध्यवर्ती संपर्क (राहुरी)' : 'Headquarters Contact'}
            </h4>
          </div>
          <div className="space-y-2.5 text-slate-600 font-normal text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed text-sm">
                {language === 'mr'
                  ? 'महात्मा फुले कृषि विद्यापीठ, मध्यवर्ती परिसर, राहुरी, जि. अहिल्यानगर (अहमदनगर) - ४१३७२२, महाराष्ट्र'
                  : 'Mahatma Phule Krishi Vidyapeeth, Central Campus, Rahuri, Dist. Ahilyanagar (Ahmednagar) - 413722, Maharashtra'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{language === 'mr' ? 'दूरध्वनी:' : 'Phone:'} 02426-243215, 243366</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>registrar.mpkv@gov.in</span>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-900 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>GIGW 3.0 & WCAG 2.1 AA Compliant</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Full-Width Copyright & Stats */}
      <div className="w-full bg-[#e9eee9] py-4 border-t border-stone-200 text-slate-600 text-xs sm:text-sm">
        <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 xl:px-8 flex flex-col md:flex-row items-center justify-between gap-2.5 text-center md:text-left">
          <div>
            © {new Date().getFullYear()}{' '}
            <span className="text-slate-800 font-semibold">
              {language === 'mr'
                ? 'महात्मा फुले कृषि विद्यापीठ, राहुरी.'
                : 'Mahatma Phule Krishi Vidyapeeth, Rahuri.'}
            </span>{' '}
            {language === 'mr' ? 'सर्व हक्क राखीव.' : 'All Rights Reserved.'}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span>{language === 'mr' ? 'शेवटचे अद्यतन: २१ नोव्हेंबर २०२६' : 'Last Updated: 21 Nov 2026'}</span>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span>{language === 'mr' ? 'एकूण दर्शक: १,४२,८५०' : 'Total Visitors: 1,42,850'}</span>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span className="text-amber-800 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{language === 'mr' ? 'राहुरी कॅम्पस विशेष' : 'Rahuri Campus Exclusive'}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
