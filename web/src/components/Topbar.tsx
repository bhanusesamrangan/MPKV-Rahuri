'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, Eye, ExternalLink, Music, Radio } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility } from '@/context/AccessibilityContext';
import { AudioCenterModal } from './AudioCenterModal';

export const Topbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const {
    fontScale,
    cycleFontScale,
    theme,
    toggleHighContrast,
    toggleDarkMode,
    isSpeaking,
    speakContent,
    stopSpeech
  } = useAccessibility();

  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [activeAudioTab, setActiveAudioTab] = useState<'rajya' | 'uni' | 'icar' | 'radio'>('rajya');

  const openAudioModal = (tab: 'rajya' | 'uni' | 'icar' | 'radio') => {
    setActiveAudioTab(tab);
    setIsAudioModalOpen(true);
  };

  return (
    <>
      <div className="w-full bg-[#090d16] text-slate-300 text-xs py-1.5 px-4 sm:px-8 xl:px-12 border-b border-slate-800 select-none transition-colors">
        <div className="w-full max-w-[1536px] mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Quick Academic & Media Portals */}
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            <a
              href="https://mpkv.irins.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 font-medium"
            >
              <ExternalLink className="w-3 h-3 text-amber-400" />
              <span>{language === 'mr' ? 'प्राध्यापक माहिती (IRINS)' : 'Faculty Profiles (IRINS)'}</span>
            </a>
            <span className="text-slate-700">|</span>

            {/* Songs Quick Access */}
            <button
              onClick={() => openAudioModal('rajya')}
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 font-medium"
              title="Rajya Geet"
            >
              <Music className="w-3 h-3 text-emerald-400" />
              <span>{language === 'mr' ? 'राज्यगीत' : 'Rajya Geet'}</span>
            </button>
            <span className="text-slate-700">|</span>

            <button
              onClick={() => openAudioModal('uni')}
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 font-medium"
              title="MPKV University Song"
            >
              <Music className="w-3 h-3 text-amber-400" />
              <span>{language === 'mr' ? 'विद्यापीठ गीत' : 'University Song'}</span>
            </button>
            <span className="text-slate-700">|</span>

            <button
              onClick={() => openAudioModal('radio')}
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 text-amber-300 font-bold"
              title="Phule Krishi Vahini 90.8 FM"
            >
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>{language === 'mr' ? 'फुले कृषी वाहिनी ९०.८ FM' : 'Phule FM 90.8'}</span>
            </button>
          </div>

          {/* Right: Citizen Accessibility Toolbar & Language Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Screen Reader / Text-To-Speech */}
            <button
              onClick={() => (isSpeaking ? stopSpeech() : speakContent())}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all shadow-xs ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 font-bold ring-2 ring-amber-300 animate-pulse'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'
              }`}
              title={language === 'mr' ? 'मजकूर ऐका (Screen Reader)' : 'Listen to Content'}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-500" />
                  <span>{language === 'mr' ? 'थांबवा' : 'Stop'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'mr' ? 'मजकूर ऐका' : 'Listen'}</span>
                </>
              )}
            </button>

            {/* Font Scaling (A- | A | A+) */}
            <div className="inline-flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 gap-0.5">
              <button
                onClick={() => cycleFontScale('down')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold hover:text-white transition-colors ${
                  fontScale === 'sm' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'
                }`}
                title="Decrease Font Size (A-)"
              >
                A-
              </button>
              <button
                onClick={() => cycleFontScale('reset')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold hover:text-white transition-colors ${
                  fontScale === 'md' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'
                }`}
                title="Normal Font Size (A)"
              >
                A
              </button>
              <button
                onClick={() => cycleFontScale('up')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold hover:text-white transition-colors ${
                  fontScale === 'lg' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'
                }`}
                title="Increase Font Size (A+)"
              >
                A+
              </button>
            </div>

            {/* High Contrast Mode Toggle */}
            <button
              onClick={toggleHighContrast}
              className={`p-1.5 rounded-lg transition-colors ${
                theme === 'high-contrast'
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title={language === 'mr' ? 'उच्च विरोधाभास (High Contrast)' : 'High Contrast Mode'}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            {/* Dark Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-1.5 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title={language === 'mr' ? 'रात्रीचा मोड (Dark Mode)' : 'Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Marathi / English Switcher */}
            <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  language === 'mr'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  language === 'en'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
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
