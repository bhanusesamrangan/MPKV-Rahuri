'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Search,
  Settings2,
  Check,
  Type,
  ExternalLink,
  Music,
  Radio,
  Eye,
  Sun,
  Moon,
  Trophy,
  PhoneCall
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility, ContrastMode } from '@/context/AccessibilityContext';
import { AudioCenterModal } from './AudioCenterModal';

export const Topbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const {
    fontSize,
    fontSizePercent,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    contrast,
    setContrast,
    bhashiniVoiceActive,
    toggleBhashiniVoice
  } = useAccessibility();

  const [panelOpen, setPanelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [activeAudioTab, setActiveAudioTab] = useState<'rajya' | 'uni' | 'icar' | 'radio'>('rajya');

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close accessibility popover when clicking outside (MahaPrisons pattern)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPanelOpen(false);
      }
    };

    if (panelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [panelOpen]);

  const openAudioModal = (tab: 'rajya' | 'uni' | 'icar' | 'radio') => {
    setActiveAudioTab(tab);
    setIsAudioModalOpen(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const getContrastLabel = (mode: ContrastMode) => {
    switch (mode) {
      case 'standard':
        return language === 'mr' ? 'प्रमाणित' : 'Standard';
      case 'high':
        return language === 'mr' ? 'उच्च विरोधाभास' : 'High Contrast';
      case 'dark':
        return language === 'mr' ? 'गडद थीम' : 'Dark Theme';
      case 'inverted':
        return language === 'mr' ? 'कलर इनव्हर्जन' : 'Color Inversion';
      default:
        return '';
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'mr' ? 'en' : 'mr');
  };

  return (
    <>
      <div
        id="accessibility-toolbar"
        className="w-full bg-[#f8faf8] text-slate-600 text-[11px] py-1 px-3 sm:px-6 xl:px-8 border-b border-stone-200/80 select-none transition-colors sticky top-0 z-50 backdrop-blur-md"
      >
        <div className="w-full max-w-[1720px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-2">
          {/* Primary Top Row (Left Links + Right Utilities / Desktop Badges) */}
          <div className="w-full flex items-center justify-between gap-2">
            {/* 1. LEFT SIDE: Quick Academic & Media Links */}
            <div className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
              <a
                href="https://mpkv.irins.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 text-slate-600 transition-colors inline-flex items-center gap-1 font-medium text-[11px]"
              >
                <ExternalLink className="w-3 h-3 text-amber-600" />
                <span>{language === 'mr' ? 'प्राध्यापक (IRINS)' : 'Faculty (IRINS)'}</span>
              </a>
              <span className="text-slate-300">|</span>

              <button
                onClick={() => openAudioModal('rajya')}
                className="hover:text-slate-900 text-slate-600 transition-colors inline-flex items-center gap-1 font-medium text-[11px]"
                title="Rajya Geet"
              >
                <Music className="w-3 h-3 text-[#2d6445]" />
                <span>{language === 'mr' ? 'राज्यगीत' : 'Rajya Geet'}</span>
              </button>
              <span className="text-slate-300">|</span>

              <button
                onClick={() => openAudioModal('uni')}
                className="hover:text-slate-900 text-slate-600 transition-colors inline-flex items-center gap-1 font-medium text-[11px]"
                title="MPKV University Song"
              >
                <Music className="w-3 h-3 text-amber-600" />
                <span>{language === 'mr' ? 'विद्यापीठ गीत' : 'University Song'}</span>
              </button>
              <span className="text-slate-300">|</span>

              <button
                onClick={() => openAudioModal('radio')}
                className="hover:text-slate-900 text-rose-700 transition-colors inline-flex items-center gap-1 font-semibold text-[11px]"
                title="Phule Krishi Vahini 90.8 FM"
              >
                <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                <span>{language === 'mr' ? 'फुले FM ९०.८' : 'Phule FM 90.8'}</span>
              </button>
            </div>

            {/* 2. RIGHT SIDE: Utilities & Desktop Badges */}
            <div className="flex items-center gap-1.5 sm:gap-2 relative flex-shrink-0">
              {/* Desktop Academic Accreditation & Hotline Badges (Hidden on mobile < md, shown on desktop md+) */}
              <div className="hidden md:flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                {/* 1. ICAR 'A' Grade Trust Badge */}
                <div className="inline-flex items-center gap-1 bg-white hover:bg-emerald-50/50 border border-slate-200/90 rounded-md px-1.5 sm:px-2 py-0.5 transition-colors shadow-2xs">
                  <span className="px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[9.5px] leading-tight border border-emerald-300/60">
                    ICAR 'A'
                  </span>
                  <span className="text-[10px] sm:text-[10.5px] font-medium text-slate-700 leading-tight whitespace-nowrap">
                    <span>Accredited</span>
                    <span className="hidden xl:inline text-slate-400 mx-0.5">·</span>
                    <span className="hidden xl:inline text-slate-500 text-[9.5px]">Grade Univ</span>
                  </span>
                </div>

                {/* 2. NIRF 15th Rank Badge */}
                <div className="inline-flex items-center gap-1 bg-white hover:bg-amber-50/50 border border-slate-200/90 rounded-md px-1.5 sm:px-2 py-0.5 transition-colors shadow-2xs">
                  <span className="p-0.5 rounded bg-amber-100 text-amber-800">
                    <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-700" />
                  </span>
                  <span className="text-[10px] sm:text-[10.5px] font-medium text-slate-700 leading-tight whitespace-nowrap">
                    <span className="font-semibold text-slate-800">NIRF 15<sup>th</sup></span>
                    <span className="hidden xl:inline text-slate-400 mx-0.5">·</span>
                    <span className="hidden xl:inline text-slate-500 text-[9.5px]">Agri Rank</span>
                  </span>
                </div>

                {/* 3. Central Seed Desk Hotline */}
                <a
                  href="tel:02426243345"
                  className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-emerald-300 rounded-md px-1.5 sm:px-2 py-0.5 transition-colors shadow-2xs group/phone"
                  title={language === 'mr' ? 'राहुरी बियाणे विक्री कक्षास कॉल करा' : 'Call Rahuri Central Seed Desk'}
                >
                  <span className="p-0.5 rounded bg-slate-100 group-hover/phone:bg-emerald-100 text-slate-600 group-hover/phone:text-[#2d6445] transition-colors">
                    <PhoneCall className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </span>
                  <span className="text-[10px] sm:text-[10.5px] font-medium text-slate-700 leading-tight whitespace-nowrap">
                    <span className="text-slate-600">{language === 'mr' ? 'बियाणे' : 'Seed Desk'}: </span>
                    <span className="font-bold text-slate-800 font-mono group-hover/phone:text-[#2d6445] transition-colors">
                      02426-243345
                    </span>
                  </span>
                </a>
              </div>

              {/* Toggleable Search Box */}
              {searchOpen && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center relative animate-in slide-in-from-right-3 duration-200"
                >
                  <input
                    type="text"
                    placeholder={language === 'mr' ? 'पोर्टलवर शोधा...' : 'Search portal...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-2.5 pr-7 py-0.5 w-24 sm:w-44 bg-white border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:border-emerald-600 text-slate-800 placeholder-slate-400 shadow-2xs"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-1.5 rounded-lg transition-colors flex items-center justify-center border ${
                searchOpen
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 shadow-2xs'
              }`}
              title={language === 'mr' ? 'शोधा' : 'Search'}
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Accessibility Popover Wrapper (MahaPrisons Core Component) */}
            <div ref={dropdownRef} className="relative flex items-center">
              {/* Accessibility Settings Trigger */}
              <button
                onClick={() => setPanelOpen(!panelOpen)}
                className={`p-1.5 rounded-lg transition-colors flex items-center justify-center border ${
                  panelOpen
                    ? 'bg-[#2d6445] text-white border-[#214f35] shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 shadow-2xs'
                }`}
                title={language === 'mr' ? 'सुगम्यता पर्याय' : 'Accessibility Options'}
                aria-expanded={panelOpen ? 'true' : 'false'}
              >
                <Settings2 className="w-3.5 h-3.5" />
              </button>

              {/* Floating Accessibility Settings Card Popover */}
              {panelOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-1.5rem)] bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200 shadow-2xl rounded-2xl p-3.5 z-50 text-[11px] select-none animate-in fade-in slide-in-from-top-2 duration-200">
                  <h4 className="font-semibold text-slate-900 mb-2 text-[11.5px] border-b border-slate-150 pb-1.5 flex items-center gap-1.5">
                    <Settings2 className="w-3.5 h-3.5 text-[#2d6445]" />
                    <span>{language === 'mr' ? 'सुगम्यता पर्याय' : 'Accessibility Options'}</span>
                  </h4>

                  {/* Font Resize Tools (MahaPrisons Style) */}
                  <div className="mb-3">
                    <span className="block font-medium text-slate-500 mb-1 uppercase tracking-wider text-[9.5px]">
                      {language === 'mr' ? 'अक्षर आकार' : 'Font Size Control'}
                    </span>
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl p-1 border border-slate-200">
                      <button
                        onClick={decreaseFontSize}
                        className="px-2.5 py-0.5 bg-white hover:bg-slate-50 rounded-lg text-[11px] font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer border border-slate-100"
                        title={language === 'mr' ? 'अक्षर आकार कमी करा (A-)' : 'Decrease text size'}
                      >
                        A-
                      </button>
                      <button
                        onClick={resetFontSize}
                        className="px-2.5 py-0.5 bg-white hover:bg-slate-50 rounded-lg text-[11px] font-semibold text-[#2d6445] shadow-2xs transition-all cursor-pointer flex items-center gap-1 border border-slate-100"
                        title={language === 'mr' ? 'मूळ आकार पूर्ववत करा' : 'Reset text size'}
                      >
                        <Type className="w-3 h-3 text-[#2d6445]" />
                        <span>{fontSizePercent}</span>
                      </button>
                      <button
                        onClick={increaseFontSize}
                        className="px-2.5 py-0.5 bg-white hover:bg-slate-50 rounded-lg text-[11px] font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer border border-slate-100"
                        title={language === 'mr' ? 'अक्षर आकार वाढवा (A+)' : 'Increase text size'}
                      >
                        A+
                      </button>
                    </div>
                  </div>

                  {/* Contrast Theme Selectors (MahaPrisons Style 4 Modes) */}
                  <div className="mb-3">
                    <span className="block font-medium text-slate-500 mb-1 uppercase tracking-wider text-[9.5px]">
                      {language === 'mr' ? 'रंगसंगती (विरोधाभास)' : 'Contrast & Color Schemes'}
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['standard', 'high', 'dark', 'inverted'] as ContrastMode[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setContrast(mode)}
                          className={`px-2 py-1 rounded-xl border text-left font-medium text-[11px] flex items-center justify-between cursor-pointer transition-all ${
                            contrast === mode
                              ? 'border-[#2d6445] bg-emerald-50/70 text-[#2d6445] shadow-2xs ring-1 ring-[#2d6445]/20 font-semibold'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>{getContrastLabel(mode)}</span>
                          {contrast === mode && <Check className="w-3.5 h-3.5 text-[#2d6445]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bhashini Screen Reader Narrator Voice (MahaPrisons Feature) */}
                  <div className="border-t border-slate-150 pt-2 mt-1.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block font-semibold text-slate-800 text-[11px] leading-tight">
                          {language === 'mr' ? 'भाषिणी आवाज वाचक' : 'Bhashini Voice Narrator'}
                        </span>
                        <span className="text-[9.5px] text-slate-500 block mt-0.5">
                          {bhashiniVoiceActive
                            ? language === 'mr'
                              ? 'माऊस फिरवून ऐका (सुरू आहे)'
                              : 'Hover text to speak (active)'
                            : language === 'mr'
                              ? 'आवाज वाचक सुरू करण्यासाठी क्लिक करा'
                              : 'Click to enable screen reader'}
                        </span>
                      </div>
                      <button
                        onClick={toggleBhashiniVoice}
                        className={`p-1.5 rounded-full cursor-pointer transition-all ${
                          bhashiniVoiceActive
                            ? 'bg-[#2d6445] text-white shadow-md shadow-[#2d6445]/30 ring-2 ring-emerald-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                        title={bhashiniVoiceActive ? 'Disable Narrator' : 'Enable Narrator'}
                      >
                        {bhashiniVoiceActive ? (
                          <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                        ) : (
                          <VolumeX className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Speech Waveform Equalizer Visualization */}
                    {bhashiniVoiceActive && (
                      <div className="flex items-center gap-1 mt-2 justify-center bg-emerald-50/70 py-1 rounded-xl border border-emerald-200">
                        <span className="w-1 h-2.5 bg-[#2d6445] rounded-full animate-pulse" />
                        <span className="w-1 h-4 bg-[#2d6445] rounded-full animate-pulse delay-75" />
                        <span className="w-1 h-2 bg-[#2d6445] rounded-full animate-pulse delay-150" />
                        <span className="w-1 h-5 bg-[#2d6445] rounded-full animate-pulse" />
                        <span className="w-1 h-3 bg-[#2d6445] rounded-full animate-pulse delay-75" />
                        <span className="w-1 h-1.5 bg-[#2d6445] rounded-full animate-pulse delay-150" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher Button (अ | A - Equal Size Bilingual Button) */}
            <button
              onClick={toggleLanguage}
              className="px-2 py-0.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
              title={language === 'mr' ? 'Switch to English' : 'मराठीत बदला'}
            >
              <span className="text-[#2d6445] font-semibold">अ</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-700">A</span>
            </button>
          </div>
        </div>

        {/* Mobile Secondary Badges Strip (Shown ONLY on mobile < md) */}
        <div className="flex md:hidden items-center justify-between sm:justify-center gap-1 pt-1 mt-0.5 border-t border-stone-200/60 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
          {/* 1. ICAR 'A' Grade Trust Badge */}
          <div className="inline-flex items-center gap-1 bg-white border border-slate-200/90 rounded-md px-1.5 py-0.5 shadow-2xs flex-shrink-0">
            <span className="px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] leading-tight border border-emerald-300/60">
              ICAR 'A'
            </span>
            <span className="text-[10px] font-medium text-slate-700 leading-tight">
              Accredited
            </span>
          </div>

          {/* 2. NIRF 15th Rank Badge */}
          <div className="inline-flex items-center gap-1 bg-white border border-slate-200/90 rounded-md px-1.5 py-0.5 shadow-2xs flex-shrink-0">
            <span className="p-0.5 rounded bg-amber-100 text-amber-800">
              <Trophy className="w-2.5 h-2.5 text-amber-700" />
            </span>
            <span className="text-[10px] font-medium text-slate-700 leading-tight">
              <span className="font-semibold text-slate-800">NIRF 15<sup>th</sup></span>
              <span className="text-slate-500 text-[9px] ml-0.5">Rank</span>
            </span>
          </div>

          {/* 3. Central Seed Desk Hotline */}
          <a
            href="tel:02426243345"
            className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-emerald-300 rounded-md px-1.5 sm:px-2 py-0.5 shadow-2xs flex-shrink-0 group/phone"
            title={language === 'mr' ? 'राहुरी बियाणे विक्री कक्षास कॉल करा' : 'Call Rahuri Central Seed Desk'}
          >
            <span className="p-0.5 rounded bg-slate-100 group-hover/phone:bg-emerald-100 text-slate-600 group-hover/phone:text-[#2d6445] transition-colors">
              <PhoneCall className="w-2.5 h-2.5" />
            </span>
            <span className="text-[10px] font-medium text-slate-700 leading-tight">
              <span className="text-slate-600">{language === 'mr' ? 'बियाणे' : 'Seed'}: </span>
              <span className="font-bold text-slate-800 font-mono group-hover/phone:text-[#2d6445]">
                02426-243345
              </span>
            </span>
          </a>
        </div>
      </div>
      </div>

      {/* Audio Modal */}
      <AudioCenterModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        initialTab={activeAudioTab}
      />
    </>
  );
};
