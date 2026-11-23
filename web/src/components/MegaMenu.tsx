'use client';

import React, { useState, useEffect } from 'react';
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
  const [toolbarHeight, setToolbarHeight] = useState(38);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const toggleCategory = (id: string, childrenCount: number, firstGroupId?: string) => {
    if (expandedCategory === id) {
      setExpandedCategory(null);
      setExpandedGroup(null);
    } else {
      setExpandedCategory(id);
      if (childrenCount === 1 && firstGroupId) {
        setExpandedGroup(firstGroupId);
      } else {
        setExpandedGroup(null);
      }
    }
  };

  const toggleGroup = (id: string) => {
    setExpandedGroup(expandedGroup === id ? null : id);
  };

  // Dynamically measure the accessibility toolbar height so navbar sticks perfectly beneath it
  useEffect(() => {
    const tb = document.getElementById('accessibility-toolbar');
    if (!tb) return;

    const updateHeight = () => {
      setToolbarHeight(Math.max(0, Math.ceil(tb.getBoundingClientRect().height)));
    };

    updateHeight();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        updateHeight();
      });
      observer.observe(tb);
    }

    window.addEventListener('resize', updateHeight);

    if (document.fonts) {
      document.fonts.ready.then(updateHeight);
    }

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [language]);

  // Prevent background scroll when mobile side drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Close side drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const menuItems = Array.isArray(navMenuData) ? navMenuData : ((navMenuData as any).menu_items || []);

  return (
    <>
      <nav
        style={{ top: `${toolbarHeight}px` }}
        className="w-full bg-[#2d6445] text-white border-b border-[#214f35] sticky z-40 shadow-sm transition-colors"
      >
        <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 xl:px-8 flex items-center justify-between">
          {/* Mobile Navigation Header Trigger - Menu Icon Only */}
          <div className="flex lg:hidden items-center justify-start w-full py-1.5">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all border border-white/20 flex items-center justify-center cursor-pointer shadow-xs"
              aria-label={language === 'mr' ? 'मेनू उघडा' : 'Open Navigation Menu'}
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Desktop Navigation Items */}
          <ul className="hidden lg:flex items-center flex-wrap gap-1 py-1">
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
                      className={`flex items-center gap-1.5 px-3.5 py-2.5 text-sm xl:text-[15px] font-medium rounded-xl transition-all relative ${
                        isDropdownActive
                          ? 'bg-white/20 text-white shadow-2xs border border-white/25'
                          : 'text-white hover:bg-white/15'
                      }`}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4 text-white/80" />}
                      <span>{getBilingual(item.title)}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          isDropdownActive ? 'rotate-180 text-white' : 'text-white/75'
                        }`}
                      />
                      {isDropdownActive && (
                        <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-white rounded-full" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1.5 px-3.5 py-2.5 text-sm xl:text-[15px] font-medium rounded-xl transition-all relative ${
                        isActive
                          ? 'bg-white/20 text-white shadow-2xs border border-white/25'
                          : 'text-white hover:bg-white/15'
                      }`}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4 text-white/80" />}
                      <span>{getBilingual(item.title)}</span>
                      {isActive && (
                        <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-white rounded-full" />
                      )}
                    </Link>
                  )}

                  {/* 3-Level Mega Dropdown Panel */}
                  {hasChildren && isDropdownActive && (
                    <div className="absolute left-0 top-full mt-1 min-w-[620px] max-w-[850px] bg-white text-slate-800 shadow-xl rounded-2xl border border-slate-200/90 p-5 grid grid-cols-2 md:grid-cols-3 gap-5 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                      {item.children.map((group: any, idx: number) => (
                        <div key={idx} className="space-y-2">
                          {group.is_group && (
                            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                              <span className="w-1.5 h-3.5 bg-[#2d6445] rounded-full" />
                              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-800">
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
                                    className={`group/link flex items-center justify-between text-sm py-2 px-2.5 rounded-xl transition-all ${
                                      isLeafActive
                                        ? 'bg-slate-100 text-slate-950 font-semibold border-l-2 border-[#2d6445]'
                                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                                    }`}
                                  >
                                    <span className="line-clamp-2">{getBilingual(leaf.title)}</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all flex-shrink-0 ml-1" />
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}

                      {/* Bottom MegaMenu Quick Footer Tag */}
                      <div className="col-span-full pt-3 mt-1 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 font-medium text-slate-600">
                          <ShieldCheck className="w-4 h-4 text-slate-700" />
                          <span>{language === 'mr' ? 'राहुरी मध्यवर्ती परिसर अधिकृत माहिती' : 'Official Rahuri HQ Scope'}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Side Drawer Modal (Full Height, Partial Width Side Drawer, Rendered Outside Nav at Root z-[9999]) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden flex">
          {/* Dark Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Side Drawer Panel (Full Screen Height, Partial Width) */}
          <div className="relative w-[82%] sm:w-80 max-w-sm h-full bg-[#1b432d] border-r border-white/15 shadow-2xl flex flex-col z-10 text-white animate-in slide-in-from-left duration-200">
            {/* Drawer Header with Logo & Close Button */}
            <div className="flex items-center justify-between px-3.5 py-3 border-b border-white/15 bg-[#163825]/90 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <img
                  src="/media/logos/Logo.png"
                  alt="MPKV Emblem"
                  className="w-7 h-7 rounded-full object-contain bg-white/10 p-0.5"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-xs sm:text-sm text-white leading-tight">
                    {language === 'mr' ? 'म.फु.कृ.वि. राहुरी' : 'MPKV Rahuri'}
                  </span>
                  <span className="text-[10px] text-emerald-200/80">
                    {language === 'mr' ? 'मुख्य मेनू' : 'Main Navigation'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-colors border border-white/15 cursor-pointer"
                aria-label={language === 'mr' ? 'मेनू बंद करा' : 'Close Navigation Menu'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body - Scrollable Nested Accordion Hierarchy */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5 custom-scrollbar overscroll-contain">
              {menuItems.map((item: any) => {
                const hasChildren = item.children && item.children.length > 0;
                const isCategoryExpanded = expandedCategory === item.id;
                const IconComponent = item.icon ? iconMap[item.icon] : null;
                const isDirectActive = pathname === item.href;
                const firstGroupId = hasChildren ? (item.children[0]?.id || `${item.id}_grp_0`) : undefined;

                return (
                  <div key={item.id} className="rounded-xl overflow-hidden bg-white/5 border border-white/10 transition-colors">
                    {hasChildren ? (
                      /* Level 1 Expandable Category Accordion */
                      <button
                        onClick={() => toggleCategory(item.id, item.children.length, firstGroupId)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs sm:text-sm font-semibold transition-colors ${
                          isCategoryExpanded
                            ? 'bg-white/15 text-white'
                            : 'text-white/95 hover:bg-white/10'
                        }`}
                        aria-expanded={isCategoryExpanded}
                      >
                        <div className="flex items-center gap-2">
                          {IconComponent && <IconComponent className="w-3.5 h-3.5 text-emerald-200 flex-shrink-0" />}
                          <span>{getBilingual(item.title)}</span>
                        </div>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-emerald-200 transition-transform duration-200 flex-shrink-0 ${
                            isCategoryExpanded ? 'rotate-180 text-white' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      /* Direct Top-Level Link (Home, Library, Officers, Contact Us) */
                      <Link
                        href={item.href}
                        onClick={() => {
                          setIsMobileOpen(false);
                          setExpandedCategory(null);
                          setExpandedGroup(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                          isDirectActive
                            ? 'bg-white/20 text-white'
                            : 'text-white/95 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {IconComponent && <IconComponent className="w-3.5 h-3.5 text-emerald-200 flex-shrink-0" />}
                          <span>{getBilingual(item.title)}</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-white/50 flex-shrink-0" />
                      </Link>
                    )}

                    {/* Level 2 Nested Groups Accordion (Progressive Disclosure) */}
                    {hasChildren && isCategoryExpanded && (
                      <div className="px-2 pb-2 pt-1 space-y-1 bg-black/15 border-t border-white/10 animate-in fade-in slide-in-from-top-1 duration-150">
                        {item.children.map((group: any, gIdx: number) => {
                          const groupId = group.id || `${item.id}_grp_${gIdx}`;
                          const isGroupExpanded = expandedGroup === groupId;
                          const groupLeaves = group.children || [group];

                          return (
                            <div
                              key={groupId}
                              className="rounded-lg overflow-hidden bg-white/5 border border-white/10"
                            >
                              {/* Level 2 Sub-Group Accordion Header */}
                              <button
                                onClick={() => toggleGroup(groupId)}
                                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left text-[11px] sm:text-xs font-semibold tracking-wide uppercase transition-colors ${
                                  isGroupExpanded
                                    ? 'bg-emerald-900/60 text-emerald-100'
                                    : 'text-emerald-200/90 hover:bg-white/10 hover:text-white'
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                                  <span>{getBilingual(group.title)}</span>
                                </span>
                                <ChevronDown
                                  className={`w-3 h-3 text-emerald-300 transition-transform duration-200 ${
                                    isGroupExpanded ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>

                              {/* Level 3 Leaf Items (Deep nesting) */}
                              {isGroupExpanded && (
                                <div className="px-1.5 py-1 space-y-0.5 bg-black/20 border-t border-white/10 animate-in fade-in duration-150">
                                  {groupLeaves.map((leaf: any, lIdx: number) => {
                                    const isLeafActive = pathname === leaf.href;
                                    return (
                                      <Link
                                        key={lIdx}
                                        href={leaf.href}
                                        onClick={() => {
                                          setIsMobileOpen(false);
                                          setExpandedCategory(null);
                                          setExpandedGroup(null);
                                        }}
                                        className={`flex items-center justify-between px-2 py-1 rounded-md text-[11px] sm:text-xs transition-colors ${
                                          isLeafActive
                                            ? 'bg-emerald-500/30 text-white font-semibold'
                                            : 'text-white/85 hover:bg-white/10 hover:text-white'
                                        }`}
                                      >
                                        <span className="line-clamp-1">{getBilingual(leaf.title)}</span>
                                        <ArrowRight className="w-2.5 h-2.5 text-white/40 flex-shrink-0 ml-1" />
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t border-white/15 bg-[#143221]/90 flex items-center justify-between text-[11px] text-emerald-200/90 flex-shrink-0">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'mr' ? 'राहुरी मध्यवर्ती परिसर' : 'Rahuri Central Campus'}</span>
              </span>
              <span className="text-[10px] text-emerald-300/70">MPKV</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MegaMenu;
