'use client';

import React from 'react';
import {
  Microscope,
  Sparkles,
  Building,
  Target,
  FileText,
  Compass,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Award,
  Layers,
  MapPin,
  Calendar
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export type ResearchHeroTheme =
  | 'glance'          // Deep Emerald & Gold
  | 'profile'         // Executive Midnight Navy & Cobalt
  | 'thrust'          // Teal & High-Tech Amber
  | 'review'          // Purple & Statutory Slate
  | 'aicrp'           // Forest Green & Mint
  | 'state-schemes'   // Sapphire & Azure
  | 'funded-projects' // Royal Purple & Gold
  | 'zones'           // Earth & Terracotta
  | 'varieties'       // Amber & Crop Green
  | 'recommendations' // Cyan & Emerald Advisory
  | 'implements'      // Blueprint Slate & Cobalt
  | 'patents';        // Regal Bronze & Gold

interface QuickChip {
  label: string;
  icon?: React.ElementType;
}

interface ResearchHeroProps {
  title: { en: string; mr: string } | string;
  subtitle?: { en: string; mr: string } | string;
  badge?: { en: string; mr: string } | string;
  theme?: ResearchHeroTheme;
  quickChips?: QuickChip[];
  children?: React.ReactNode;
}

interface ThemeConfig {
  bgGradient: string;
  borderBottom: string;
  pattern: string;
  glow1: string;
  glow2: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  badgeIcon: React.ElementType;
  subtitleText: string;
}

const THEME_CONFIGS: Record<ResearchHeroTheme, ThemeConfig> = {
  glance: {
    bgGradient: 'from-[#04361e] via-[#054227] to-[#0a5834]',
    borderBottom: 'border-amber-500',
    pattern: 'bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]',
    glow1: 'bg-amber-400/10',
    glow2: 'bg-emerald-400/10',
    badgeBg: 'bg-amber-500/15',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-400/40',
    badgeIcon: Microscope,
    subtitleText: 'text-emerald-100/90'
  },
  profile: {
    bgGradient: 'from-[#0b172a] via-[#0f2337] to-[#1e3a5f]',
    borderBottom: 'border-blue-400',
    pattern: 'bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:20px_20px]',
    glow1: 'bg-blue-500/15',
    glow2: 'bg-indigo-400/10',
    badgeBg: 'bg-blue-500/20',
    badgeText: 'text-blue-200',
    badgeBorder: 'border-blue-400/40',
    badgeIcon: Building,
    subtitleText: 'text-slate-200/90'
  },
  thrust: {
    bgGradient: 'from-[#042f2e] via-[#0f4f46] to-[#134e4a]',
    borderBottom: 'border-teal-400',
    pattern: 'bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:18px_18px]',
    glow1: 'bg-teal-400/15',
    glow2: 'bg-amber-400/10',
    badgeBg: 'bg-teal-500/20',
    badgeText: 'text-teal-200',
    badgeBorder: 'border-teal-400/40',
    badgeIcon: Target,
    subtitleText: 'text-teal-100/90'
  },
  review: {
    bgGradient: 'from-[#2e1065] via-[#3b0764] to-[#1e1b4b]',
    borderBottom: 'border-purple-400',
    pattern: 'bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:20px_20px]',
    glow1: 'bg-purple-500/15',
    glow2: 'bg-indigo-400/10',
    badgeBg: 'bg-purple-500/20',
    badgeText: 'text-purple-200',
    badgeBorder: 'border-purple-400/40',
    badgeIcon: Calendar,
    subtitleText: 'text-purple-100/90'
  },
  aicrp: {
    bgGradient: 'from-[#064e3b] via-[#047857] to-[#065f46]',
    borderBottom: 'border-emerald-400',
    pattern: 'bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]',
    glow1: 'bg-emerald-400/15',
    glow2: 'bg-teal-400/10',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-200',
    badgeBorder: 'border-emerald-400/40',
    badgeIcon: Layers,
    subtitleText: 'text-emerald-100/90'
  },
  'state-schemes': {
    bgGradient: 'from-[#1e3a8a] via-[#1d4ed8] to-[#172554]',
    borderBottom: 'border-sky-400',
    pattern: 'bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:18px_18px]',
    glow1: 'bg-blue-400/15',
    glow2: 'bg-sky-400/10',
    badgeBg: 'bg-sky-500/20',
    badgeText: 'text-sky-200',
    badgeBorder: 'border-sky-400/40',
    badgeIcon: ShieldCheck,
    subtitleText: 'text-sky-100/90'
  },
  'funded-projects': {
    bgGradient: 'from-[#312e81] via-[#3730a3] to-[#1e1b4b]',
    borderBottom: 'border-amber-400',
    pattern: 'bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:18px_18px]',
    glow1: 'bg-amber-400/15',
    glow2: 'bg-indigo-400/10',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-200',
    badgeBorder: 'border-amber-400/40',
    badgeIcon: Sparkles,
    subtitleText: 'text-indigo-100/90'
  },
  zones: {
    bgGradient: 'from-[#451a03] via-[#78350f] to-[#361907]',
    borderBottom: 'border-amber-500',
    pattern: 'bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:18px_18px]',
    glow1: 'bg-amber-500/15',
    glow2: 'bg-orange-500/10',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-200',
    badgeBorder: 'border-amber-400/40',
    badgeIcon: MapPin,
    subtitleText: 'text-amber-100/90'
  },
  varieties: {
    bgGradient: 'from-[#14532d] via-[#166534] to-[#15803d]',
    borderBottom: 'border-amber-400',
    pattern: 'bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:16px_16px]',
    glow1: 'bg-amber-400/15',
    glow2: 'bg-emerald-400/10',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-200',
    badgeBorder: 'border-amber-400/40',
    badgeIcon: Sprout,
    subtitleText: 'text-emerald-100/90'
  },
  recommendations: {
    bgGradient: 'from-[#083344] via-[#0e7490] to-[#155e75]',
    borderBottom: 'border-cyan-400',
    pattern: 'bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:18px_18px]',
    glow1: 'bg-cyan-400/15',
    glow2: 'bg-teal-400/10',
    badgeBg: 'bg-cyan-500/20',
    badgeText: 'text-cyan-200',
    badgeBorder: 'border-cyan-400/40',
    badgeIcon: CheckCircle2,
    subtitleText: 'text-cyan-100/90'
  },
  implements: {
    bgGradient: 'from-[#1e293b] via-[#334155] to-[#0f172a]',
    borderBottom: 'border-sky-400',
    pattern: 'bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:20px_20px]',
    glow1: 'bg-sky-400/15',
    glow2: 'bg-slate-400/10',
    badgeBg: 'bg-sky-500/20',
    badgeText: 'text-sky-200',
    badgeBorder: 'border-sky-400/40',
    badgeIcon: Wrench,
    subtitleText: 'text-slate-200/90'
  },
  patents: {
    bgGradient: 'from-[#292524] via-[#44403c] to-[#1c1917]',
    borderBottom: 'border-amber-400',
    pattern: 'bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:18px_18px]',
    glow1: 'bg-amber-400/15',
    glow2: 'bg-stone-400/10',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-200',
    badgeBorder: 'border-amber-400/40',
    badgeIcon: Award,
    subtitleText: 'text-stone-200/90'
  }
};

export const ResearchHero: React.FC<ResearchHeroProps> = ({
  title,
  subtitle,
  badge,
  theme = 'glance',
  quickChips = [],
  children
}) => {
  const { language, getBilingual } = useLanguage();

  const cfg = THEME_CONFIGS[theme] || THEME_CONFIGS.glance;
  const BadgeIcon = cfg.badgeIcon;

  const displayTitle = getBilingual(title);
  const displaySubtitle = subtitle ? getBilingual(subtitle) : '';
  const displayBadge = badge ? getBilingual(badge) : '';

  return (
    <section
      aria-labelledby="hero-title"
      className={`relative w-full bg-gradient-to-br ${cfg.bgGradient} text-white border-b-4 ${cfg.borderBottom} overflow-hidden shadow-xs`}
    >
      {/* Decorative SVG Pattern */}
      <div className={`absolute inset-0 opacity-15 pointer-events-none ${cfg.pattern}`} />

      {/* Ambient Lighting Orbs */}
      <div className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none ${cfg.glow1}`} />
      <div className={`absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none ${cfg.glow2}`} />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-5 sm:py-7 space-y-3">
        {/* Category Badge */}
        {displayBadge ? (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}
          >
            <BadgeIcon className="w-3.5 h-3.5" />
            <span>{displayBadge}</span>
          </div>
        ) : (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'संशोधन संचालनालय' : 'Directorate of Research'}</span>
          </div>
        )}

        {/* Hero Title & Subtitle */}
        <div className="space-y-1.5 max-w-4xl">
          <h1
            id="hero-title"
            className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight"
          >
            {displayTitle}
          </h1>

          {displaySubtitle && (
            <p className={`text-xs sm:text-sm md:text-[15px] leading-relaxed font-normal max-w-3xl ${cfg.subtitleText}`}>
              {displaySubtitle}
            </p>
          )}
        </div>

        {/* Quick Chips Matrix */}
        {quickChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {quickChips.map((chip, idx) => {
              const ChipIcon = chip.icon || CheckCircle2;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-[11px] sm:text-xs font-medium"
                >
                  <ChipIcon className="w-3 h-3 text-amber-300" />
                  <span>{chip.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {children && <div className="pt-1">{children}</div>}
      </div>
    </section>
  );
};
