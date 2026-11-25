'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Layers,
  Sparkles,
  Building2,
  HelpCircle,
  Radio,
  BookOpen,
  Sprout,
  MapPin,
  Compass
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export type ExtensionPageKey =
  | 'at-a-glance'
  | 'profile'
  | 'thrust-areas'
  | 'krishi-vigyan-kendras'
  | 'atic'
  | 'communication-center'
  | 'publications'
  | 'adhoc-projects'
  | 'regional-centers'
  | 'district-centers';

interface ExtensionSubmenuNavProps {
  activeKey: ExtensionPageKey;
}

export const ExtensionSubmenuNav: React.FC<ExtensionSubmenuNavProps> = ({ activeKey }) => {
  const { language } = useLanguage();

  const navItems = [
    {
      key: 'at-a-glance' as ExtensionPageKey,
      href: '/extension/at-a-glance',
      icon: Users,
      labelEn: 'At a Glance',
      labelMr: 'दृष्टीक्षेपात'
    },
    {
      key: 'profile' as ExtensionPageKey,
      href: '/extension/profile',
      icon: Layers,
      labelEn: 'Org. Profile',
      labelMr: 'संरचना'
    },
    {
      key: 'thrust-areas' as ExtensionPageKey,
      href: '/extension/thrust-areas',
      icon: Sparkles,
      labelEn: 'Thrust Areas',
      labelMr: 'प्राधान्यक्रम'
    },
    {
      key: 'krishi-vigyan-kendras' as ExtensionPageKey,
      href: '/extension/krishi-vigyan-kendras',
      icon: Building2,
      labelEn: 'KVKs (17)',
      labelMr: 'कृषि विज्ञान केंद्रे (१७)'
    },
    {
      key: 'atic' as ExtensionPageKey,
      href: '/atic-rahuri',
      icon: HelpCircle,
      labelEn: 'ATIC (Single Window)',
      labelMr: 'अ‍ॅटिक (एक खिडकी)'
    },
    {
      key: 'communication-center' as ExtensionPageKey,
      href: '/communication-centre',
      icon: Radio,
      labelEn: 'Radio 90.8 FM & Media',
      labelMr: '९०.८ एफएम व संप्रेषण'
    },
    {
      key: 'publications' as ExtensionPageKey,
      href: '/extension/publications',
      icon: BookOpen,
      labelEn: 'Shree Sugi & Publications',
      labelMr: 'श्री सुगी व प्रकाशने'
    },
    {
      key: 'adhoc-projects' as ExtensionPageKey,
      href: '/extension/adhoc-projects',
      icon: Sprout,
      labelEn: 'Farmer FIRST Projects',
      labelMr: 'फार्मर फर्स्ट प्रकल्प'
    },
    {
      key: 'regional-centers' as ExtensionPageKey,
      href: '/extension/regional-centers',
      icon: MapPin,
      labelEn: 'Regional Centers (4)',
      labelMr: 'विभागीय केंद्रे (४)'
    },
    {
      key: 'district-centers' as ExtensionPageKey,
      href: '/extension/district-centers',
      icon: Compass,
      labelEn: 'District Centers (5)',
      labelMr: 'जिल्हा केंद्रे (५)'
    }
  ];

  return (
    <div className="w-full bg-white border-b border-stone-200/90 shadow-2xs sticky top-0 z-20">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeKey === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-800 to-green-700 text-white shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-stone-50 text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                <span>{language === 'mr' ? item.labelMr : item.labelEn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
