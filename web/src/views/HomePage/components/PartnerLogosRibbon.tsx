'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ExternalLink, ShieldCheck, Globe, Building } from 'lucide-react';

export const PartnerLogosRibbon: React.FC = () => {
  const { language } = useLanguage();

  const partners = [
    {
      name: 'ICAR, New Delhi',
      marathiName: 'भारतीय कृषि अनुसंधान परिषद',
      role: 'Apex Agrarian Council',
      link: 'https://icar.org.in'
    },
    {
      name: 'MCAER, Pune',
      marathiName: 'महाराष्ट्र कृषी शिक्षण व संशोधन परिषद',
      role: 'State Higher Education Council',
      link: 'https://mcaer.org'
    },
    {
      name: 'Govt. of Maharashtra',
      marathiName: 'महाराष्ट्र शासन - कृषी विभाग',
      role: 'Department of Agriculture',
      link: 'https://krishi.maharashtra.gov.in'
    },
    {
      name: 'Ministry of Agriculture',
      marathiName: 'कृषि व शेतकरी कल्याण मंत्रालय',
      role: 'Government of India',
      link: 'https://agricoop.nic.in'
    },
    {
      name: 'India.gov.in',
      marathiName: 'राष्ट्रीय पोर्टल ऑफ इंडिया',
      role: 'National Portal of India',
      link: 'https://www.india.gov.in'
    },
    {
      name: 'National Knowledge Network',
      marathiName: 'राष्ट्रीय ज्ञान नेटवर्क (NKN)',
      role: 'High-Speed Grid',
      link: 'https://nkn.gov.in'
    },
    {
      name: 'Sakshat Portal',
      marathiName: 'साक्षात ई-शिक्षण दालन',
      role: 'National Education Portal',
      link: 'https://sakshat.ac.in'
    },
    {
      name: 'FAO - United Nations',
      marathiName: 'अन्न व कृषी संघटना (संयुक्त राष्ट्रे)',
      role: 'Global Food Security',
      link: 'https://www.fao.org'
    }
  ];

  return (
    <section className="w-full py-12 bg-white border-t border-stone-200/60">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] space-y-6">
        
        {/* Subtle Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {language === 'mr' ? 'राष्ट्रीय व आंतरराष्ट्रीय संस्थात्मक सहकार्य' : 'National & Apex Institutional Affiliations'}
          </div>
        </div>

        {/* Responsive Grid of Verified Insignia Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {partners.map((partner, idx) => (
            <a
              key={idx}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-stone-50/80 hover:bg-emerald-50/50 border border-stone-200/80 hover:border-emerald-300 text-center transition-all duration-200 flex flex-col justify-between items-center group shadow-2xs hover:shadow-xs"
            >
              <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-emerald-800 shadow-2xs group-hover:scale-105 transition-transform mb-2">
                <Building className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 transition-colors leading-tight line-clamp-2">
                  {language === 'mr' ? partner.marathiName : partner.name}
                </h4>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                  {partner.role}
                </p>
              </div>
              <div className="mt-2 text-[10px] font-semibold text-emerald-700 opacity-60 group-hover:opacity-100 flex items-center gap-0.5">
                <span>Gov.in</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
