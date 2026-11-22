'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import navMenuData from '@/data/scraped/navigation_menu.json';
import {
  Home,
  GraduationCap,
  Microscope,
  Users,
  BookOpen,
  UserCheck,
  Sprout,
  Building2,
  PhoneCall,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Home,
  GraduationCap,
  Microscope,
  Users,
  BookOpen,
  UserCheck,
  Sprout,
  Building2,
  PhoneCall
};

export const MegaMenu: React.FC = () => {
  const { language, getBilingual } = useLanguage();
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = (navMenuData as any).menu_items || [];

  return (
    <nav className="w-full bg-[#1e293b] text-white border-b border-amber-400/40 sticky top-0 z-40 shadow-xs transition-colors">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 xl:px-12 flex items-center justify-between">
        {/* Mobile Navigation Header Trigger */}
        <div className="flex lg:hidden items-center justify-between w-full py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-xs tracking-wide text-slate-200">
              {language === 'mr' ? 'मफुकृवि राहुरी मेनू' : 'MPKV Rahuri Menu'}
            </span>
          </div>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
            aria-label="Toggle Navigation"
          >
            {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Desktop Navigation Items */}
        <ul className="hidden lg:flex items-center flex-wrap gap-1">
          {menuItems.map((item: any) => {
            const IconComponent = item.icon ? iconMap[item.icon] : null;
            const hasChildren = item.children && item.children.length > 0;
            const isDropdownActive = activeDropdown === item.id;
            const isActive = pathname === item.href;

            return (
              <li
                key={item.id}
                className="relative group"
                onMouseEnter={() => hasChildren && setActiveDropdown(item.id)}
                onMouseLeave={() => hasChildren && setActiveDropdown(null)}
              >
                {hasChildren ? (
                  <button
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-xs xl:text-xs font-medium transition-all relative ${
                      isDropdownActive
                        ? 'bg-slate-800/90 text-amber-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{getBilingual(item.title)}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-150 ${
                        isDropdownActive ? 'rotate-180 text-amber-300' : 'text-slate-400'
                      }`}
                    />
                    {isDropdownActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 shadow-2xs" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-xs xl:text-xs font-medium transition-all relative ${
                      isActive
                        ? 'bg-slate-800/90 text-amber-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{getBilingual(item.title)}</span>
                  </Link>
                )}

                {/* 3-Level Mega Dropdown Panel */}
                {hasChildren && isDropdownActive && (
                  <div className="absolute left-0 top-full min-w-[580px] max-w-[800px] bg-white text-slate-800 shadow-xl rounded-b-2xl border-t-2 border-amber-400 p-5 grid grid-cols-2 md:grid-cols-3 gap-5 animate-in fade-in slide-in-from-top-1 duration-150 z-50 border-x border-b border-stone-200/80">
                    {item.children.map((group: any, idx: number) => (
                      <div key={idx} className="space-y-2">
                        {group.is_group && (
                          <div className="flex items-center gap-1.5 border-b border-stone-100 pb-1.5">
                            <span className="w-1 h-3 bg-amber-400 rounded-full" />
                            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-slate-800">
                              {getBilingual(group.title)}
                            </h5>
                          </div>
                        )}
                        <ul className="space-y-0.5">
                          {(group.children || [group]).map((leaf: any, lIdx: number) => {
                            const isLeafActive = pathname === leaf.href;
                            return (
                              <li key={lIdx}>
                                <Link
                                  href={leaf.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className={`group/link flex items-center justify-between text-xs font-normal py-1 px-2 rounded-lg transition-all ${
                                    isLeafActive
                                      ? 'bg-amber-50 text-amber-900 font-medium border-l-2 border-amber-500'
                                      : 'text-slate-600 hover:bg-stone-50 hover:text-slate-900'
                                  }`}
                                >
                                  <span className="line-clamp-2">{getBilingual(leaf.title)}</span>
                                  <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all flex-shrink-0 ml-1" />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}

                    {/* Bottom MegaMenu Quick Footer Tag */}
                    <div className="col-span-full pt-2.5 mt-1 border-t border-stone-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1.5 font-normal text-slate-600">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === 'mr' ? 'केवळ राहुरी मुख्यालय अधिकृत माहिती' : 'Official Rahuri HQ Scope'}</span>
                      </span>
                      <Link
                        href="/seeds-availability"
                        onClick={() => setActiveDropdown(null)}
                        className="text-amber-800 font-medium hover:underline inline-flex items-center gap-1"
                      >
                        <span>{language === 'mr' ? 'राहुरी बियाणे साठा तपासा →' : 'Check Rahuri Seeds Stock →'}</span>
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden bg-slate-900 px-4 py-3 border-t border-slate-800 space-y-3 max-h-[80vh] overflow-y-auto">
          {menuItems.map((item: any) => (
            <div key={item.id} className="border-b border-slate-800/80 pb-2">
              <div className="font-semibold text-xs text-amber-300 py-1 flex items-center justify-between">
                <span>{getBilingual(item.title)}</span>
              </div>
              {item.children && (
                <div className="pl-3 mt-1.5 space-y-2">
                  {item.children.map((group: any, gIdx: number) => (
                    <div key={gIdx} className="space-y-1">
                      {group.is_group && (
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          {getBilingual(group.title)}
                        </div>
                      )}
                      <div className="space-y-0.5">
                        {(group.children || [group]).map((leaf: any, lIdx: number) => (
                          <Link
                            key={lIdx}
                            href={leaf.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="block text-xs text-slate-300 py-1 px-2 rounded hover:bg-slate-800 hover:text-white transition-colors"
                          >
                            {getBilingual(leaf.title)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default MegaMenu;
