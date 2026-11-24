'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck,
  ExternalLink
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

  // Open / Close intent timers to ensure buttery-smooth mouse transitions without flickering
  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleMouseEnterItem = (id: string, hasChildren: boolean) => {
    // Immediately cancel any pending close
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (hasChildren) {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }

      // If activeDropdown is already this item, keep it active
      if (activeDropdown === id) return;

      // If another dropdown is already open, wait 100ms so gliding diagonally across items does not glitch.
      // If no dropdown is open, open snappily with 35ms delay.
      const delay = activeDropdown ? 100 : 35;
      openTimerRef.current = setTimeout(() => {
        setActiveDropdown(id);
      }, delay);
    } else {
      // Nav item without children (Home, Library, Officers, Contacts)
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }
      // If a dropdown was open, give a 160ms grace period so grazing "Library" doesn't instantly destroy it
      if (activeDropdown) {
        closeTimerRef.current = setTimeout(() => {
          setActiveDropdown(null);
        }, 160);
      }
    }
  };

  const handleMouseLeaveItem = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  const handleDropdownMouseEnter = () => {
    clearTimers();
  };

  const handleDropdownMouseLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  // Close dropdown when user clicks outside the navigation bar
  useEffect(() => {
    if (!activeDropdown) return;
    const handleDocumentClick = (e: MouseEvent) => {
      const navElement = document.getElementById('main-mega-nav');
      if (navElement && !navElement.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [activeDropdown]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

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

  // Helper to check if a top-level menu item or any of its children/submenus is currently selected/active
  const isMenuSelected = (item: any): boolean => {
    if (!pathname) return false;
    const cleanPath = pathname.replace(/\/$/, '') || '/';

    // Direct link match for items with valid href
    if (item.href && item.href !== '#') {
      const cleanHref = item.href.replace(/\/$/, '') || '/';
      if (cleanHref === '/' && cleanPath === '/') return true;
      if (cleanHref !== '/' && (cleanPath === cleanHref || cleanPath.startsWith(cleanHref + '/'))) {
        return true;
      }
    }

    // Check all nested children recursively
    const hasActiveChild = (children: any[]): boolean => {
      for (const child of children) {
        if (child.href && child.href !== '#' && !child.is_external) {
          const childHref = child.href.replace(/\/$/, '') || '/';
          if (childHref !== '/' && (cleanPath === childHref || cleanPath.startsWith(childHref + '/'))) {
            return true;
          }
        }
        if (child.children && child.children.length > 0) {
          if (hasActiveChild(child.children)) return true;
        }
      }
      return false;
    };

    if (item.children && hasActiveChild(item.children)) {
      return true;
    }

    // Route prefix matching per category
    if (item.id === 'menu_education' && (cleanPath.startsWith('/education') || cleanPath.startsWith('/dr-as-caet') || cleanPath.startsWith('/post-graduate-institute'))) {
      return true;
    }
    if (item.id === 'menu_research' && cleanPath.startsWith('/research')) {
      return true;
    }
    if (item.id === 'menu_extension' && (cleanPath.startsWith('/extension') || cleanPath.startsWith('/communication-centre') || cleanPath.startsWith('/communication-center') || cleanPath.startsWith('/atic-rahuri'))) {
      return true;
    }
    if (item.id === 'menu_library' && cleanPath.startsWith('/library')) {
      return true;
    }
    if (item.id === 'menu_students' && cleanPath.startsWith('/students')) {
      return true;
    }
    if (item.id === 'menu_farmer' && (cleanPath.startsWith('/farmer') || cleanPath.startsWith('/seeds-availability') || cleanPath.startsWith('/nursery-stock') || cleanPath.startsWith('/farm-implements') || cleanPath.startsWith('/transparency-and-grievance'))) {
      return true;
    }
    if (item.id === 'menu_officers' && cleanPath.startsWith('/officers')) {
      return true;
    }
    if (item.id === 'menu_contacts' && (cleanPath.startsWith('/contact') || cleanPath.startsWith('/contact-us'))) {
      return true;
    }

    return false;
  };

  // Auto-expand the active category in the mobile drawer when navigating
  useEffect(() => {
    if (!pathname) return;
    const activeItem = menuItems.find((it: any) => isMenuSelected(it));
    if (activeItem && activeItem.children && activeItem.children.length > 0) {
      setExpandedCategory(activeItem.id);
      const cleanPath = pathname.replace(/\/$/, '') || '/';
      const activeGroup = activeItem.children.find((grp: any) => {
        const leaves = grp.children || [grp];
        return leaves.some((lf: any) => {
          const lHref = (lf.href || '').replace(/\/$/, '') || '/';
          return lHref !== '/' && (cleanPath === lHref || cleanPath.startsWith(lHref + '/'));
        });
      });
      if (activeGroup) {
        setExpandedGroup(activeGroup.id || `${activeItem.id}_grp_0`);
      }
    }
  }, [pathname]);

  return (
    <>
      <nav
        id="main-mega-nav"
        style={{ top: `${toolbarHeight}px` }}
        onMouseLeave={handleMouseLeaveItem}
        className="w-full bg-gradient-to-r from-[#133523] via-[#1f4e34] via-35% via-[#265e3f] via-65% to-[#163c27] text-white border-b border-[#0e2619] shadow-md sticky z-40 transition-all border-t border-emerald-500/20"
      >
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] flex items-center justify-between">
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
          <ul className="hidden lg:flex items-center flex-nowrap gap-0.5 xl:gap-1 py-1">
            {menuItems.map((item: any) => {
              const IconComponent = item.icon ? iconMap[item.icon] : null;
              const hasChildren = item.children && item.children.length > 0;
              const isDropdownActive = activeDropdown === item.id;
              const isSelected = isMenuSelected(item);

              // Dynamic width and layout based on number of child groups
              const childrenCount = (item.children || []).length;
              let gridCols = 'grid-cols-1';
              let widthClass = 'w-[380px]';
              let alignClass = 'left-0';

              if (childrenCount === 1) {
                gridCols = 'grid-cols-1';
                widthClass = 'w-[420px]';
                alignClass = item.id === 'menu_alumni' ? 'right-0' : 'left-0';
              } else if (childrenCount === 2) {
                gridCols = 'grid-cols-2';
                widthClass = 'w-[720px] xl:w-[800px]';
                alignClass = item.id === 'menu_farmer' ? 'right-0 xl:-left-24' : (item.id === 'menu_students' ? '-left-32 xl:-left-12' : (item.id === 'menu_library' ? '-left-16 xl:left-0' : 'left-0'));
              } else if (childrenCount === 3) {
                gridCols = 'grid-cols-3';
                if (item.id === 'menu_farmer') {
                  widthClass = 'w-[840px] xl:w-[920px] 2xl:w-[960px]';
                  alignClass = 'right-0 xl:-left-44 2xl:-left-28';
                } else {
                  widthClass = 'w-[960px] xl:w-[1100px]';
                  alignClass = 'left-0';
                }
              } else if (childrenCount >= 4) {
                gridCols = 'grid-cols-2 lg:grid-cols-4';
                if (item.id === 'menu_research') {
                  widthClass = 'w-[980px] xl:w-[1060px] 2xl:w-[1140px]';
                  alignClass = '-left-8 xl:-left-16 2xl:-left-20';
                } else {
                  widthClass = 'w-[1140px] xl:w-[1320px] 2xl:w-[1440px]';
                  alignClass = 'left-0';
                }
              }

              return (
                <li
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnterItem(item.id, hasChildren)}
                  onMouseLeave={handleMouseLeaveItem}
                >
                  {hasChildren ? (
                    <button
                      onClick={() => {
                        clearTimers();
                        setActiveDropdown((prev) => (prev === item.id ? null : item.id));
                      }}
                      className={`flex items-center gap-1 xl:gap-1.5 px-2 xl:px-3 py-1.5 xl:py-2 text-[11.5px] xl:text-[13.5px] font-medium rounded-xl transition-all relative cursor-pointer whitespace-nowrap ${isDropdownActive || isSelected
                        ? 'bg-white/20 text-white shadow-xs border border-white/25 font-semibold'
                        : 'text-white/95 hover:bg-white/15 hover:text-white'
                        }`}
                    >
                      {IconComponent && (
                        <IconComponent
                          className={`w-3.5 h-3.5 transition-colors ${isSelected ? 'text-amber-300' : 'text-emerald-200'}`}
                        />
                      )}
                      <span className={isSelected ? 'text-white font-semibold' : ''}>{getBilingual(item.title)}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${isDropdownActive ? 'rotate-180 text-white' : isSelected ? 'text-amber-300' : 'text-emerald-200/80'
                          }`}
                      />
                      {(isDropdownActive || isSelected) && (
                        <span className="absolute bottom-0.5 left-2 right-2 h-[2.5px] bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 rounded-full shadow-2xs" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 xl:gap-1.5 px-2 xl:px-3 py-1.5 xl:py-2 text-[11.5px] xl:text-[13.5px] font-medium rounded-xl transition-all relative whitespace-nowrap ${isSelected
                        ? 'bg-white/20 text-white shadow-xs border border-white/25 font-semibold'
                        : 'text-white/95 hover:bg-white/15 hover:text-white'
                        }`}
                    >
                      {IconComponent && (
                        <IconComponent
                          className={`w-3.5 h-3.5 transition-colors ${isSelected ? 'text-amber-300' : 'text-emerald-200'}`}
                        />
                      )}
                      <span className={isSelected ? 'text-white font-semibold' : ''}>{getBilingual(item.title)}</span>
                      {isSelected && (
                        <span className="absolute bottom-0.5 left-2 right-2 h-[2.5px] bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 rounded-full shadow-2xs" />
                      )}
                    </Link>
                  )}

                  {/* 3-Level Mega Dropdown Panel - Single-Lined Visible Content */}
                  {hasChildren && isDropdownActive && (
                    <div
                      className={`absolute ${alignClass} top-full -mt-1 pt-2 z-50`}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <div className={`${widthClass} max-w-[calc(100vw-2.5rem)] bg-white text-slate-800 shadow-2xl rounded-2xl border border-stone-200/90 ${item.id === 'menu_research' ? 'p-6 xl:p-7' : 'p-6 xl:p-7'} grid ${gridCols} ${item.id === 'menu_research' ? 'gap-x-7 xl:gap-x-8' : 'gap-x-8 xl:gap-x-10'} gap-y-6 relative`}>
                        {/* Top Accent Gradient Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600 rounded-t-2xl" />

                        {item.children.map((group: any, idx: number) => (
                          <div key={idx} className="space-y-2.5 min-w-0">
                            {group.is_group && (
                              <div className="flex items-start gap-2 border-b border-stone-200 pb-2 mb-2 min-h-[36px]">
                                <span className="w-1.5 h-3.5 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full flex-shrink-0 mt-0.5" />
                                <h5 className="text-[11px] xl:text-xs font-bold uppercase tracking-wide text-slate-900 leading-snug break-words">
                                  {getBilingual(group.title)}
                                </h5>
                              </div>
                            )}
                            <ul className="space-y-1.5">
                              {(group.children || [group]).map((leaf: any, lIdx: number) => {
                                const cleanPath = (pathname || '').replace(/\/$/, '') || '/';
                                const cleanLeafHref = (leaf.href || '').replace(/\/$/, '') || '/';
                                const isLeafActive = cleanPath === cleanLeafHref;
                                return (
                                  <li key={lIdx}>
                                    {leaf.is_external ? (
                                      <a
                                        href={leaf.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/link flex items-start justify-between gap-2.5 text-xs xl:text-[13px] py-1.5 px-2.5 rounded-xl transition-all text-slate-700 hover:bg-emerald-50/70 hover:text-emerald-950"
                                      >
                                        <span className="text-left leading-snug font-medium group-hover/link:font-semibold flex-1 min-w-0 break-words">{getBilingual(leaf.title)}</span>
                                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-emerald-700 transition-all flex-shrink-0 mt-0.5" />
                                      </a>
                                    ) : (
                                      <Link
                                        href={leaf.href}
                                        onClick={() => setActiveDropdown(null)}
                                        className={`group/link flex items-start justify-between gap-2.5 text-xs xl:text-[13px] py-1.5 px-2.5 rounded-xl transition-all ${isLeafActive
                                          ? 'bg-emerald-50 text-emerald-950 font-bold border-l-2 border-emerald-600 shadow-2xs'
                                          : 'text-slate-700 hover:bg-emerald-50/70 hover:text-emerald-950'
                                          }`}
                                      >
                                        <span className="text-left leading-snug font-medium group-hover/link:font-semibold flex-1 min-w-0 break-words">{getBilingual(leaf.title)}</span>
                                        <ArrowRight className="w-3.5 h-3.5 text-emerald-700 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                                      </Link>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}

                        {/* Bottom MegaMenu Quick Footer Tag */}
                        <div className="col-span-full pt-3 mt-1 border-t border-stone-200 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1.5 font-medium text-slate-600">
                            <ShieldCheck className="w-4 h-4 text-emerald-700" />
                            <span>{language === 'mr' ? 'अधिकृत विद्यापीठ पोर्टल माहिती' : 'Official University Portal'}</span>
                          </span>
                          <span className="text-[10.5px] text-slate-400">
                            {language === 'mr' ? 'थेट माहिती पृष्ठावर जा' : 'Navigate directly to section'}
                          </span>
                        </div>
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
                const isSelected = isMenuSelected(item);
                const firstGroupId = hasChildren ? (item.children[0]?.id || `${item.id}_grp_0`) : undefined;

                return (
                  <div key={item.id} className="rounded-xl overflow-hidden bg-white/5 border border-white/10 transition-colors">
                    {hasChildren ? (
                      /* Level 1 Expandable Category Accordion */
                      <button
                        onClick={() => toggleCategory(item.id, item.children.length, firstGroupId)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs sm:text-sm font-semibold transition-colors ${isSelected
                          ? 'bg-emerald-600/35 text-white border-l-4 border-amber-400 font-bold'
                          : isCategoryExpanded
                          ? 'bg-white/15 text-white'
                          : 'text-white/95 hover:bg-white/10'
                          }`}
                        aria-expanded={isCategoryExpanded}
                      >
                        <div className="flex items-center gap-2">
                          {IconComponent && (
                            <IconComponent
                              className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-amber-300' : 'text-emerald-200'}`}
                            />
                          )}
                          <span>{getBilingual(item.title)}</span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block shadow-xs" />
                          )}
                        </div>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 flex-shrink-0 ${isCategoryExpanded ? 'rotate-180 text-white' : isSelected ? 'text-amber-300' : 'text-emerald-200'
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
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${isSelected
                          ? 'bg-emerald-600/35 text-white border-l-4 border-amber-400 font-bold'
                          : 'text-white/95 hover:bg-white/10'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          {IconComponent && (
                            <IconComponent
                              className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-amber-300' : 'text-emerald-200'}`}
                            />
                          )}
                          <span>{getBilingual(item.title)}</span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block shadow-xs" />
                          )}
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
                                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left text-[11px] sm:text-xs font-semibold tracking-wide uppercase transition-colors ${isGroupExpanded
                                  ? 'bg-emerald-900/60 text-emerald-100'
                                  : 'text-emerald-200/90 hover:bg-white/10 hover:text-white'
                                  }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                                  <span>{getBilingual(group.title)}</span>
                                </span>
                                <ChevronDown
                                  className={`w-3 h-3 text-emerald-300 transition-transform duration-200 ${isGroupExpanded ? 'rotate-180' : ''
                                    }`}
                                />
                              </button>

                              {/* Level 3 Leaf Items (Deep nesting) */}
                              {isGroupExpanded && (
                                <div className="px-1.5 py-1 space-y-0.5 bg-black/20 border-t border-white/10 animate-in fade-in duration-150">
                                  {groupLeaves.map((leaf: any, lIdx: number) => {
                                    const cleanPath = (pathname || '').replace(/\/$/, '') || '/';
                                    const cleanLeafHref = (leaf.href || '').replace(/\/$/, '') || '/';
                                    const isLeafActive = cleanPath === cleanLeafHref;
                                    return leaf.is_external ? (
                                      <a
                                        key={lIdx}
                                        href={leaf.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                          setIsMobileOpen(false);
                                          setExpandedCategory(null);
                                          setExpandedGroup(null);
                                        }}
                                        className="flex items-center justify-between px-2 py-1 rounded-md text-[11px] sm:text-xs transition-colors text-white/85 hover:bg-white/10 hover:text-white"
                                      >
                                        <span className="line-clamp-1">{getBilingual(leaf.title)}</span>
                                        <ExternalLink className="w-2.5 h-2.5 text-white/40 flex-shrink-0 ml-1" />
                                      </a>
                                    ) : (
                                      <Link
                                        key={lIdx}
                                        href={leaf.href}
                                        onClick={() => {
                                          setIsMobileOpen(false);
                                          setExpandedCategory(null);
                                          setExpandedGroup(null);
                                        }}
                                        className={`flex items-center justify-between px-2 py-1 rounded-md text-[11px] sm:text-xs transition-colors ${isLeafActive
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
                <span>{language === 'mr' ? 'महात्मा फुले कृषि विद्यापीठ' : 'Mahatma Phule Krishi Vidyapeeth'}</span>
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
