'use client';

import React from 'react';
import {
  Award,
  Sparkles,
  Building,
  Target,
  FileText,
  Building2,
  GraduationCap,
  BookOpen,
  Atom,
  Clock,
  Compass,
  Cpu,
  Sprout,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export type HeroTheme =
  | 'glance'         // Emerald & Gold (Education at a Glance)
  | 'profile'        // Executive Midnight Navy & Imperial Gold (Organizational Profile)
  | 'thrust'         // High-Tech Teal & Sunrise Amber (Thrust Areas)
  | 'regulations'    // Statutory Burgundy, Wine & Bronze (Academic Regulations)
  | 'constituent'    // Pine & Verdigris Architectural (Constituent Colleges)
  | 'affiliated'     // Deep Forest & Ochre Directory (Affiliated Colleges)
  | 'diploma'        // Olive & Harvest Fieldwork (Diploma Programmes)
  | 'bachelors'      // Royal Indigo & Emerald (Undergraduate Degrees)
  | 'masters'        // Cosmic Plum & Violet (Master's & Doctoral)
  | 'schools'        // Heritage Sienna, Bronze & Wheat (Agril. Tech Schools)
  | 'certificate'    // Artisanal Copper & Burnt Orange (Certificate Courses)
  | 'science'        // Botanical Jade & Evergreen (Faculty of Agricultural Science)
  | 'engineering';   // Industrial Blueprint Slate & Cobalt (Faculty of Agril Engineering)

interface QuickChip {
  label: string;
  icon?: React.ElementType;
}

interface EducationHeroProps {
  title: { en: string; mr: string } | string;
  subtitle?: { en: string; mr: string } | string;
  badge?: { en: string; mr: string } | string;
  theme?: HeroTheme;
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

const THEME_CONFIGS: Record<HeroTheme, ThemeConfig> = {
  glance: {
    bgGradient: 'from-[#04361e] via-[#054227] to-[#0a5834]',
    borderBottom: 'border-amber-500',
    pattern: 'bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]',
    glow1: 'bg-amber-400/10',
    glow2: 'bg-emerald-400/10',
    badgeBg: 'bg-amber-500/15',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-400/40',
    badgeIcon: Award,
    subtitleText: 'text-emerald-100/90'
  },
  profile: {
    bgGradient: 'from-[#0b172a] via-[#0f2337] to-[#1e3a5f]',
    borderBottom: 'border-amber-400',
    pattern: 'bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:20px_20px]',
    glow1: 'bg-blue-500/15',
    glow2: 'bg-amber-400/10',
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
  regulations: {
    bgGradient: 'from-[#3b0813] via-[#4c0d1b] to-[#25040b]',
    borderBottom: 'border-amber-400',
    pattern: 'bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]',
    glow1: 'bg-rose-500/10',
    glow2: 'bg-amber-500/10',
    badgeBg: 'bg-rose-500/20',
    badgeText: 'text-amber-200',
    badgeBorder: 'border-amber-400/40',
    badgeIcon: ShieldCheck,
    subtitleText: 'text-rose-100/90'
  },
  constituent: {
    bgGradient: 'from-[#064e3b] via-[#065f46] to-[#043d2c]',
    borderBottom: 'border-emerald-400',
    pattern: 'bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px]',
    glow1: 'bg-emerald-400/15',
    glow2: 'bg-amber-400/10',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-200',
    badgeBorder: 'border-emerald-400/40',
    badgeIcon: Building2,
    subtitleText: 'text-emerald-100/90'
  },
  affiliated: {
    bgGradient: 'from-[#1b4332] via-[#2d6a4f] to-[#081c15]',
    borderBottom: 'border-amber-500',
    pattern: 'bg-[radial-gradient(#a7f3d0_1px,transparent_1px)] [background-size:18px_18px]',
    glow1: 'bg-emerald-500/15',
    glow2: 'bg-amber-500/10',
    badgeBg: 'bg-amber-500/15',
    badgeText: 'text-amber-200',
    badgeBorder: 'border-amber-400/40',
    badgeIcon: Compass,
    subtitleText: 'text-emerald-100/90'
  },
  diploma: {
    bgGradient: 'from-[#283618] via-[#3a4f22] to-[#1e2812]',
    borderBottom: 'border-lime-500',
    pattern: 'bg-[radial-gradient(#a3e635_1px,transparent_1px)] [background-size:16px_16px]',
    glow1: 'bg-lime-400/10',
    glow2: 'bg-amber-400/10',
    badgeBg: 'bg-lime-500/20',
    badgeText: 'text-lime-200',
    badgeBorder: 'border-lime-400/40',
    badgeIcon: BookOpen,
    subtitleText: 'text-lime-100/90'
  },
  bachelors: {
    bgGradient: 'from-[#0f2942] via-[#154360] to-[#0a3142]',
    borderBottom: 'border-blue-400',
    pattern: 'bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]',
    glow1: 'bg-blue-400/15',
    glow2: 'bg-cyan-400/10',
    badgeBg: 'bg-blue-500/20',
    badgeText: 'text-sky-200',
    badgeBorder: 'border-sky-400/40',
    badgeIcon: GraduationCap,
    subtitleText: 'text-sky-100/90'
  },
  masters: {
    bgGradient: 'from-[#240046] via-[#3c096c] to-[#10002b]',
    borderBottom: 'border-purple-400',
    pattern: 'bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:18px_18px]',
    glow1: 'bg-purple-500/15',
    glow2: 'bg-fuchsia-400/10',
    badgeBg: 'bg-purple-500/20',
    badgeText: 'text-purple-200',
    badgeBorder: 'border-purple-400/40',
    badgeIcon: Atom,
    subtitleText: 'text-purple-100/90'
  },
  schools: {
    bgGradient: 'from-[#542306] via-[#78350f] to-[#3a1804]',
    borderBottom: 'border-amber-400',
    pattern: 'bg-[radial-gradient(#fde68a_1px,transparent_1px)] [background-size:16px_16px]',
    glow1: 'bg-amber-500/15',
    glow2: 'bg-orange-400/10',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-200',
    badgeBorder: 'border-amber-400/40',
    badgeIcon: Clock,
    subtitleText: 'text-amber-100/90'
  },
  certificate: {
    bgGradient: 'from-[#7c2d12] via-[#9a3412] to-[#431407]',
    borderBottom: 'border-orange-400',
    pattern: 'bg-[radial-gradient(#fdba74_1px,transparent_1px)] [background-size:16px_16px]',
    glow1: 'bg-orange-500/15',
    glow2: 'bg-amber-400/10',
    badgeBg: 'bg-orange-500/20',
    badgeText: 'text-orange-200',
    badgeBorder: 'border-orange-400/40',
    badgeIcon: Sparkles,
    subtitleText: 'text-orange-100/90'
  },
  science: {
    bgGradient: 'from-[#064e3b] via-[#065f46] to-[#022c22]',
    borderBottom: 'border-emerald-400',
    pattern: 'bg-[radial-gradient(#6ee7b7_1px,transparent_1px)] [background-size:18px_18px]',
    glow1: 'bg-emerald-400/15',
    glow2: 'bg-teal-400/10',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-200',
    badgeBorder: 'border-emerald-400/40',
    badgeIcon: Sprout,
    subtitleText: 'text-emerald-100/90'
  },
  engineering: {
    bgGradient: 'from-[#0f172a] via-[#1e293b] to-[#11324d]',
    borderBottom: 'border-cyan-400',
    pattern: 'bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]',
    glow1: 'bg-cyan-500/15',
    glow2: 'bg-blue-400/10',
    badgeBg: 'bg-cyan-500/20',
    badgeText: 'text-cyan-200',
    badgeBorder: 'border-cyan-400/40',
    badgeIcon: Cpu,
    subtitleText: 'text-cyan-100/90'
  }
};

export const EducationHero: React.FC<EducationHeroProps> = ({
  title,
  subtitle,
  badge,
  theme = 'glance',
  quickChips = [],
  children
}) => {
  const { getBilingual } = useLanguage();

  const titleText = getBilingual(title);
  const subtitleText = subtitle ? getBilingual(subtitle) : '';
  const badgeText = badge ? getBilingual(badge) : '';

  const cfg = THEME_CONFIGS[theme] || THEME_CONFIGS.glance;
  const BadgeIcon = cfg.badgeIcon;

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br ${cfg.bgGradient} text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-4 ${cfg.borderBottom} shadow-md`}
    >
      {/* Decorative background glow & mesh pattern */}
      <div className={`absolute inset-0 opacity-10 ${cfg.pattern} pointer-events-none`} />
      <div className={`absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 ${cfg.glow1} rounded-full blur-3xl pointer-events-none`} />
      <div className={`absolute bottom-0 left-1/4 -mb-12 w-80 h-80 ${cfg.glow2} rounded-full blur-2xl pointer-events-none`} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Category Badge */}
        {badgeText && (
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${cfg.badgeBg} border ${cfg.badgeBorder} ${cfg.badgeText} text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm mb-4`}
          >
            <BadgeIcon className="w-4 h-4 shrink-0" />
            <span>{badgeText}</span>
          </div>
        )}

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
          {titleText}
        </h1>

        {/* Subtitle */}
        {subtitleText && (
          <p className={`mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg ${cfg.subtitleText} max-w-3xl leading-relaxed`}>
            {subtitleText}
          </p>
        )}

        {/* Quick Chips (if provided) */}
        {quickChips.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {quickChips.map((chip, idx) => {
              const ChipIcon = chip.icon || CheckCircle2;
              return (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-medium text-white/90 border border-white/15"
                >
                  <ChipIcon className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{chip.label}</span>
                </span>
              );
            })}
          </div>
        )}

        {/* Extra Children if needed */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
};
