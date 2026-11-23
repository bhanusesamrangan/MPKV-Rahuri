'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  GraduationCap,
  Building2,
  Users,
  BookOpen,
  UserCheck,
  ShieldAlert,
  Scale,
  DollarSign,
  HardHat,
  Briefcase,
  FileText,
  UserCircle,
  Home,
  Sparkles,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';

export const StakeholderQuickDesk: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'students' | 'governance' | 'staff'>('all');

  const categories = [
    {
      id: 'students',
      groupTitle: language === 'mr' ? 'विद्यार्थी व शिक्षण' : 'Students & Academics',
      subtitle: language === 'mr' ? 'महाविद्यालये, प्रवेश व परीक्षा' : 'Admissions, Colleges & Alumni',
      icon: GraduationCap,
      styles: {
        cardBorder: 'border-emerald-200/90 hover:border-emerald-400',
        headerBg: 'bg-emerald-50/90 border-b border-emerald-200/80',
        iconBg: 'bg-emerald-700 text-white',
        badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300/80',
        linkHover: 'hover:bg-emerald-800 hover:text-white hover:border-emerald-800',
        iconColor: 'text-emerald-700 group-hover:text-amber-300'
      },
      items: [
        {
          title: language === 'mr' ? 'विद्यार्थी कक्ष' : 'Students Corner',
          icon: GraduationCap,
          link: '/education'
        },
        {
          title: language === 'mr' ? 'महाविद्यालये सूची' : 'Constituent Colleges',
          icon: Building2,
          link: '/colleges'
        },
        {
          title: language === 'mr' ? 'प्राध्यापक वृंद' : 'Faculty Directory',
          icon: Users,
          link: 'https://mpkv.irins.org/',
          isExternal: true
        },
        {
          title: language === 'mr' ? 'कृषी प्रवेश प्रक्रिया' : 'Agri Admissions',
          icon: BookOpen,
          link: 'https://maha-agriadmission.in',
          isExternal: true
        },
        {
          title: language === 'mr' ? 'माजी विद्यार्थी दालन' : 'Alumni Portal',
          icon: UserCheck,
          link: '/alumni'
        }
      ]
    },
    {
      id: 'governance',
      groupTitle: language === 'mr' ? 'प्रशासन व कायदे' : 'Governance & Administration',
      subtitle: language === 'mr' ? 'पारदर्शकता, वित्त व नियम' : 'Transparency, Acts & Accounts',
      icon: Building2,
      styles: {
        cardBorder: 'border-amber-200/90 hover:border-amber-400',
        headerBg: 'bg-amber-50/90 border-b border-amber-200/80',
        iconBg: 'bg-amber-700 text-slate-950',
        badgeBg: 'bg-amber-100 text-amber-950 border-amber-300/80',
        linkHover: 'hover:bg-amber-800 hover:text-white hover:border-amber-800',
        iconColor: 'text-amber-700 group-hover:text-amber-200'
      },
      items: [
        {
          title: language === 'mr' ? 'मध्यवर्ती प्रशासन' : 'Central Administration',
          icon: Building2,
          link: '/administration'
        },
        {
          title: language === 'mr' ? 'पारदर्शकता कक्ष' : 'Transparency & RTI',
          icon: ShieldAlert,
          link: '/transparency'
        },
        {
          title: language === 'mr' ? 'अधिनियम व परिनियम' : 'University Act & Statute',
          icon: Scale,
          link: '/act-statute'
        },
        {
          title: language === 'mr' ? 'वित्त व लेखा विभाग' : 'Finance & Accounts',
          icon: DollarSign,
          link: '/finance'
        },
        {
          title: language === 'mr' ? 'विद्यापीठ अभियंता' : 'University Engineer Desk',
          icon: HardHat,
          link: '/university-engineer'
        }
      ]
    },
    {
      id: 'staff',
      groupTitle: language === 'mr' ? 'कर्मचारी व अतिथी' : 'Employee & Campus Services',
      subtitle: language === 'mr' ? 'परिपत्रके, प्रशिक्षण व अतिथीगृह' : 'Orders, Trainings & Guest House',
      icon: Users,
      styles: {
        cardBorder: 'border-sky-200/90 hover:border-sky-400',
        headerBg: 'bg-sky-50/90 border-b border-sky-200/80',
        iconBg: 'bg-sky-700 text-white',
        badgeBg: 'bg-sky-100 text-sky-900 border-sky-300/80',
        linkHover: 'hover:bg-sky-800 hover:text-white hover:border-sky-800',
        iconColor: 'text-sky-700 group-hover:text-sky-200'
      },
      items: [
        {
          title: language === 'mr' ? 'प्रशिक्षण व कार्यशाळा' : 'Trainings & Workshops',
          icon: Briefcase,
          link: '/trainings'
        },
        {
          title: language === 'mr' ? 'अधिकृत परिपत्रके' : 'Circulars & Orders',
          icon: FileText,
          link: '/circulars'
        },
        {
          title: language === 'mr' ? 'कर्मचारी कक्ष' : 'Employee Corner',
          icon: UserCircle,
          link: '/employee-corner'
        },
        {
          title: language === 'mr' ? 'अतिथी गृह आरक्षण' : 'Guest House Booking',
          icon: Home,
          link: '/guest-house'
        }
      ]
    }
  ];

  const visibleCategories = categories.filter((cat) => {
    if (activeTab === 'all') return true;
    return cat.id === activeTab;
  });

  return (
    <section className="w-full py-8 sm:py-10 bg-white border-t border-stone-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] space-y-5">
        
        {/* Compact Section Header with Stakeholder Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-300">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-[11px] font-bold uppercase tracking-wider mb-1 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'mr' ? 'हितधारक जलद सेवा दालन' : 'Stakeholder Fast-Track Desk'}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {language === 'mr' ? 'विद्यार्थी, प्रशासन व कर्मचारी थेट दुवे' : 'Fast-Track Portals for Students, Staff & Governance'}
            </h2>
          </div>

          {/* Quick Category Switcher Tabs */}
          <div className="flex flex-wrap gap-1 bg-stone-200/90 p-1 rounded-xl border border-stone-300 select-none text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              {language === 'mr' ? 'सर्व (१४)' : 'All (14)'}
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                activeTab === 'students'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'विद्यार्थी' : 'Students'}</span>
            </button>
            <button
              onClick={() => setActiveTab('governance')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                activeTab === 'governance'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'प्रशासन' : 'Governance'}</span>
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                activeTab === 'staff'
                  ? 'bg-sky-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'कर्मचारी' : 'Staff'}</span>
            </button>
          </div>
        </div>

        {/* 3 Compact Side-by-Side Category Cards */}
        <div className={`grid gap-4 ${activeTab === 'all' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
          {visibleCategories.map((cat) => {
            const HeaderIcon = cat.icon;

            return (
              <div
                key={cat.id}
                className={`rounded-2xl bg-white border ${cat.styles.cardBorder} shadow-2xs hover:shadow-sm transition-all overflow-hidden flex flex-col justify-between`}
              >
                {/* Compact Card Header */}
                <div className={`px-4 py-2.5 flex items-center justify-between ${cat.styles.headerBg}`}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${cat.styles.iconBg}`}>
                      <HeaderIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                        {cat.groupTitle}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-medium truncate">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cat.styles.badgeBg} flex-shrink-0`}>
                    {cat.items.length}
                  </span>
                </div>

                {/* Compact Links List */}
                <div className="p-2 sm:p-2.5 space-y-1.5 flex-1">
                  {cat.items.map((item, i) => {
                    const Icon = item.icon;
                    const ItemContent = (
                      <div className={`w-full px-3 py-1.5 sm:py-2 rounded-xl bg-stone-50/80 ${cat.styles.linkHover} text-slate-800 border border-stone-200/90 transition-all flex items-center justify-between group shadow-2xs text-xs sm:text-[12.5px] font-bold cursor-pointer`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className={`w-3.5 h-3.5 transition-colors flex-shrink-0 ${cat.styles.iconColor}`} />
                          <span className="truncate">{item.title}</span>
                        </div>
                        {item.isExternal ? (
                          <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                        ) : (
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                        )}
                      </div>
                    );

                    return item.isExternal ? (
                      <a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {ItemContent}
                      </a>
                    ) : (
                      <Link key={i} href={item.link} className="block">
                        {ItemContent}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
