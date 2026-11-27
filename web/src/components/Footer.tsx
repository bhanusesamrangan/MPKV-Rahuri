'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="w-full bg-[#f4f7f5] text-slate-600 text-sm border-t border-stone-200/80 mt-12 transition-colors">
      {/* Upper Footer: Full-Width 4-Column Directory */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12">
        {/* Col 1: About Rahuri HQ */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <img src="/media/logos/Logo.png" alt="MPKV Logo" className="w-11 h-11 object-contain rounded-full drop-shadow-2xs" />
            <div>
              <h4 className="text-slate-900 font-semibold text-base leading-tight">
                {language === 'mr' ? 'महात्मा फुले कृषि विद्यापीठ' : 'Mahatma Phule Krishi Vidyapeeth'}
              </h4>
              <p className="text-amber-800 font-medium text-sm">
                {language === 'mr' ? 'राहुरी, अहिल्यानगर' : 'Rahuri, Ahilyanagar'}
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
              {language === 'mr' ? "आयसीएआर 'अ' श्रेणी मान्यताप्राप्त" : "ICAR Accredited 'A' Grade"}
            </span>
            <span className="px-3 py-1 rounded-md bg-amber-50 border border-amber-200/60 text-amber-900 font-medium text-xs">
              {language === 'mr' ? 'स्थापना १९६८' : 'Est. 1968'}
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
                <span>{language === 'mr' ? 'पदव्युत्तर महाविद्यालय, राहुरी' : 'Post Graduate Institute, Rahuri'}</span>
              </Link>
            </li>
            <li>
              <Link href="/dr-as-caet-rahuri" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                <span className="text-slate-400">›</span>
                <span>{language === 'mr' ? 'डॉ. अ.शि. कृषि अभियांत्रिकी महाविद्यालय' : 'Dr. A.S. CAET, Rahuri'}</span>
              </Link>
            </li>
            <li>
              <Link href="/central-library-rahuri" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                <span className="text-slate-400">›</span>
                <span>{language === 'mr' ? 'मध्यवर्ती ग्रंथालय' : 'Central University Library'}</span>
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
                  ? 'महात्मा फुले कृषि विद्यापीठ, राहुरी, जि. अहिल्यानगर (अहमदनगर) - ४१३७२२, महाराष्ट्र'
                  : 'Mahatma Phule Krishi Vidyapeeth, Rahuri, Dist. Ahilyanagar (Ahmednagar) - 413722, Maharashtra'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{language === 'mr' ? 'दूरध्वनी:' : 'Phone:'} 02426-243215, 243366</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <a href="mailto:registrar.mpkv@nic.in" className="hover:text-amber-800 transition-colors">
                registrar.mpkv@nic.in
              </a>
            </div>
            <div className="pt-2.5">
              <div
                className="inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-gradient-to-br from-white via-emerald-50/70 to-teal-50/50 border border-emerald-300/80 shadow-2xs"
                role="img"
                aria-label="GIGW 3.0 & WCAG 2.1 AA Compliant"
              >
                {/* Iconic Vector Compliance Seal Emblem */}
                <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 44 44" className="w-10 h-10" fill="none" aria-hidden="true">
                    {/* Outer dotted verification ring */}
                    <circle
                      cx="22"
                      cy="22"
                      r="20"
                      stroke="#059669"
                      strokeWidth="1.2"
                      strokeDasharray="2.2 2.2"
                      strokeOpacity="0.65"
                    />
                    {/* Inner solid emerald medallion ring */}
                    <circle cx="22" cy="22" r="16" fill="#ecfdf5" stroke="#047857" strokeWidth="1.25" />
                    {/* Compliance shield silhouette */}
                    <path
                      d="M22 10.5L30.5 13.8V21.2C30.5 26.8 26.9 31.1 22 33C17.1 31.1 13.5 26.8 13.5 21.2V13.8L22 10.5Z"
                      fill="#065f46"
                    />
                    {/* Gold accent top bar inside shield */}
                    <path d="M16.5 15.2H27.5" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" />
                    {/* Verification check mark */}
                    <path
                      d="M17.8 22.3L20.7 25.1L26.5 18.8"
                      stroke="#ffffff"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="absolute -bottom-0.5 -right-0.5 px-1 py-px rounded bg-amber-500 text-white text-[8px] font-extrabold leading-none tracking-tight shadow-2xs">
                    AA
                  </span>
                </div>

                <div className="h-8 w-px bg-emerald-200/90 shrink-0" />

                {/* Structured Compliance Tags */}
                <div className="flex flex-col gap-1 leading-none">
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-emerald-800/80">
                    {language === 'mr' ? 'अधिकृत सुगम्यता प्रमाणित' : 'Gov Web Standard'}
                  </span>
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-800 text-white text-[10.5px] font-bold tracking-tight">
                      GIGW 3.0
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-white border border-emerald-300 text-emerald-900 text-[10.5px] font-bold tracking-tight">
                      WCAG 2.1 AA
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-950 ml-0.5">
                      {language === 'mr' ? 'अनुरूप' : 'Compliant'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Full-Width Copyright, Developer Attribution & Stats */}
      <div className="w-full bg-[#e3eae3] py-5 border-t border-stone-300/80 text-slate-600 text-xs sm:text-sm">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          {/* Left: Copyright & Developer Attribution */}
          <div className="space-y-1.5 flex flex-col items-center md:items-start">
            <div>
              © {new Date().getFullYear()}{' '}
              <span className="text-slate-900 font-semibold">
                {language === 'mr'
                  ? 'महात्मा फुले कृषि विद्यापीठ, राहुरी.'
                  : 'Mahatma Phule Krishi Vidyapeeth, Rahuri.'}
              </span>{' '}
              {language === 'mr' ? 'सर्व हक्क राखीव.' : 'All Rights Reserved.'}
            </div>

            {/* Developer attribution with Analytica Business Solutions Logo */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-0.5 text-xs text-slate-600">
              <span className="font-medium">
                {language === 'mr'
                  ? 'Analytica Business Solutions द्वारे विकसित आणि होस्ट केलेले'
                  : 'Developed and hosted by Analytica Business Solutions'}
              </span>
              <a
                href="https://analyticabs.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white px-2 py-0.5 rounded-md border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all hover:scale-105"
                title="Analytica Business Solutions"
              >
                <img
                  src="/analytica-business-solutions-logo.png"
                  alt="Analytica Business Solutions"
                  className="h-5 sm:h-5.5 w-auto object-contain"
                />
              </a>
            </div>
          </div>

          {/* Right: Portal Update & Visitor Stats (with 'राहुरी कॅम्पस विशेष' removed) */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 sm:gap-3 text-xs text-slate-600">
            <span>{language === 'mr' ? 'शेवटचे अद्यतन: २३ नोव्हेंबर २०२६' : 'Last Updated: 23 Nov 2026'}</span>
            <span className="text-stone-300">•</span>
            <span>{language === 'mr' ? 'एकूण दर्शक: १,४२,८५०' : 'Total Visitors: 1,42,850'}</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
