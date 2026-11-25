'use client';

import React from 'react';
import {
  Users,
  Radio,
  Sparkles,
  PhoneCall,
  Compass,
  Sprout,
  HelpCircle,
  BookOpen,
  Calendar,
  Building2,
  Award,
  Layers,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export type ExtensionHeroTheme =
  | 'glance'        // Warm Terracotta & Deep Harvest Green
  | 'profile'       // Corporate Earth & Emerald
  | 'thrust'        // Sunrise Amber & Forest Green
  | 'kvk'           // Vibrant Grassland Green & Goldenrod
  | 'atic'          // Single Window Sapphire & Mint
  | 'radio'         // Broadcast Ruby & Copper
  | 'publications'  // Classic Library Burgundy & Gold
  | 'projects'      // Farmer FIRST Sunset Coral & Bronze
  | 'regional'      // Agro-Ecological Leaf & Sand
  | 'district';     // Field Scout Olive & Earth

interface QuickChip {
  label: string;
  icon?: React.ElementType;
}

interface ExtensionHeroProps {
  title: { en: string; mr: string } | string;
  subtitle?: { en: string; mr: string } | string;
  badge?: { en: string; mr: string } | string;
  theme?: ExtensionHeroTheme;
  quickChips?: QuickChip[];
  helplinePhone?: string;
  children?: React.ReactNode;
}

interface ThemeConfig {
  bgGradient: string;
  borderBottom: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  badgeIcon: React.ElementType;
}

const THEME_CONFIGS: Record<ExtensionHeroTheme, ThemeConfig> = {
  glance: {
    bgGradient: 'from-[#143d22] via-[#1a4a2b] to-[#245833]',
    borderBottom: 'border-amber-500',
    badgeBg: 'bg-amber-400/20',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-400/40',
    badgeIcon: Users
  },
  profile: {
    bgGradient: 'from-[#1b382b] via-[#214736] to-[#164e63]',
    borderBottom: 'border-emerald-500',
    badgeBg: 'bg-emerald-400/20',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-400/40',
    badgeIcon: Layers
  },
  thrust: {
    bgGradient: 'from-[#2e2b14] via-[#423912] to-[#25462a]',
    borderBottom: 'border-yellow-500',
    badgeBg: 'bg-yellow-400/20',
    badgeText: 'text-yellow-300',
    badgeBorder: 'border-yellow-400/40',
    badgeIcon: Sparkles
  },
  kvk: {
    bgGradient: 'from-[#0e3b26] via-[#14532d] to-[#166534]',
    borderBottom: 'border-lime-400',
    badgeBg: 'bg-lime-400/20',
    badgeText: 'text-lime-300',
    badgeBorder: 'border-lime-400/40',
    badgeIcon: Building2
  },
  atic: {
    bgGradient: 'from-[#0f3b46] via-[#155e75] to-[#1e4e46]',
    borderBottom: 'border-cyan-400',
    badgeBg: 'bg-cyan-400/20',
    badgeText: 'text-cyan-300',
    badgeBorder: 'border-cyan-400/40',
    badgeIcon: HelpCircle
  },
  radio: {
    bgGradient: 'from-[#4a1c1d] via-[#652326] to-[#3a2022]',
    borderBottom: 'border-rose-400',
    badgeBg: 'bg-rose-400/20',
    badgeText: 'text-rose-300',
    badgeBorder: 'border-rose-400/40',
    badgeIcon: Radio
  },
  publications: {
    bgGradient: 'from-[#3b2319] via-[#4d2c1d] to-[#2e3b26]',
    borderBottom: 'border-amber-400',
    badgeBg: 'bg-amber-400/20',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-400/40',
    badgeIcon: BookOpen
  },
  projects: {
    bgGradient: 'from-[#362615] via-[#4d3215] to-[#1b4332]',
    borderBottom: 'border-orange-500',
    badgeBg: 'bg-orange-400/20',
    badgeText: 'text-orange-300',
    badgeBorder: 'border-orange-400/40',
    badgeIcon: Sprout
  },
  regional: {
    bgGradient: 'from-[#173e2f] via-[#1d4d3a] to-[#255c47]',
    borderBottom: 'border-emerald-400',
    badgeBg: 'bg-emerald-400/20',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-400/40',
    badgeIcon: MapPin
  },
  district: {
    bgGradient: 'from-[#283618] via-[#38491f] to-[#405423]',
    borderBottom: 'border-lime-500',
    badgeBg: 'bg-lime-400/20',
    badgeText: 'text-lime-300',
    badgeBorder: 'border-lime-400/40',
    badgeIcon: Compass
  }
};

export const ExtensionHero: React.FC<ExtensionHeroProps> = ({
  title,
  subtitle,
  badge,
  theme = 'glance',
  quickChips = [],
  helplinePhone = '1800 233 3235',
  children
}) => {
  const { language } = useLanguage();

  const cfg = THEME_CONFIGS[theme] || THEME_CONFIGS.glance;
  const BadgeIcon = cfg.badgeIcon;

  const getLocalized = (field?: { en: string; mr: string } | string): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return language === 'mr' ? field.mr : field.en;
  };

  const titleText = getLocalized(title);
  const subtitleText = getLocalized(subtitle);
  const badgeText = getLocalized(badge);

  return (
    <section
      className={`relative w-full bg-gradient-to-br ${cfg.bgGradient} text-white border-b-4 ${cfg.borderBottom} overflow-hidden shadow-xs`}
    >
      {/* Decorative Rural Field / Radial Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-400 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-amber-400 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-5 sm:py-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          {/* Left Column: Headings & Badges */}
          <div className="space-y-2.5 max-w-4xl">
            {/* Live Farmer Outreach Pill */}
            <div className="flex flex-wrap items-center gap-2">
              {badgeText && (
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${cfg.badgeBg} ${cfg.badgeText} border ${cfg.badgeBorder}`}
                >
                  <BadgeIcon className="w-3.5 h-3.5" />
                  <span>{badgeText}</span>
                </div>
              )}

              {/* Direct Toll-Free Kisan Helpline Hotline Indicator */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-200 border border-amber-400/40">
                <PhoneCall className="w-3 h-3 text-amber-300 animate-pulse" />
                <span>
                  {language === 'mr' ? 'किसान हेल्पलाईन:' : 'Kisan Helpline:'} {helplinePhone}
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif tracking-tight leading-tight text-white drop-shadow-xs">
              {titleText}
            </h1>

            {/* Subtitle / Mandate */}
            {subtitleText && (
              <p className="text-xs sm:text-sm lg:text-[15px] text-emerald-100/90 leading-relaxed font-normal max-w-3xl">
                {subtitleText}
              </p>
            )}

            {/* Quick Chips Bento */}
            {quickChips.length > 0 && (
              <div className="pt-1 flex flex-wrap gap-1.5">
                {quickChips.map((chip, idx) => {
                  const ChipIcon = chip.icon || CheckCircle2;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/25 text-white/95 border border-white/15 text-[11px] sm:text-xs font-semibold backdrop-blur-xs"
                    >
                      <ChipIcon className="w-3 h-3 text-amber-300 shrink-0" />
                      <span>{chip.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Optional Children */}
          {children && (
            <div className="shrink-0">
              {children}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
