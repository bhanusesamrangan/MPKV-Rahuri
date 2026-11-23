'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';

export type FontScale = 'sm' | 'md' | 'lg';
export type ContrastMode = 'standard' | 'high' | 'dark' | 'inverted';
export type ThemeMode = 'default' | 'high-contrast' | 'dark';

export interface AccessibilityContextType {
  // MahaPrisons Font Size APIs
  fontSize: number;
  fontSizePercent: string;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;

  // MahaPrisons Contrast & Color Scheme APIs
  contrast: ContrastMode;
  setContrast: (mode: ContrastMode) => void;

  // MahaPrisons Bhashini Voice Narrator APIs
  bhashiniVoiceActive: boolean;
  setBhashiniVoiceActive: (active: boolean) => void;
  toggleBhashiniVoice: () => void;
  isSpeaking: boolean;
  speak: (text: string) => void;
  stopSpeaking: () => void;

  // Backward-compatible APIs for existing code
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  cycleFontScale: (direction: 'up' | 'down' | 'reset') => void;
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleHighContrast: () => void;
  toggleDarkMode: () => void;
  speakContent: (specificText?: string) => void;
  stopSpeech: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();

  // 1. Font Size State (-2 to +4 steps; 0 is 100%)
  const [fontSize, setFontSizeState] = useState<number>(0);

  // 2. Contrast & Theme State
  const [contrast, setContrastState] = useState<ContrastMode>('standard');

  // 3. Bhashini Screen Reader / Speech Synthesis State
  const [bhashiniVoiceActive, setBhashiniVoiceActiveState] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Sync saved preferences from localStorage after mount
  useEffect(() => {
    try {
      const savedFontSize = localStorage.getItem('mpkv_font_size');
      if (savedFontSize !== null) {
        const parsed = parseInt(savedFontSize, 10);
        if (!isNaN(parsed) && parsed >= -2 && parsed <= 4) {
          setFontSizeState(parsed);
        }
      }
      const savedContrast = localStorage.getItem('mpkv_contrast') as ContrastMode;
      if (['standard', 'high', 'dark', 'inverted'].includes(savedContrast)) {
        setContrastState(savedContrast);
      }
    } catch {
      // ignore
    }
  }, []);

  // Compute font size percentage string relative to standard 100%
  const fontSizePercent = `${Math.round((1.0 + fontSize * 0.1) * 100)}%`;

  // Font size actions
  const setFontSize = (size: number) => {
    const clamped = Math.max(-2, Math.min(4, size));
    setFontSizeState(clamped);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mpkv_font_size', String(clamped));
      } catch {
        // ignore
      }
    }
  };

  const increaseFontSize = () => setFontSize(fontSize + 1);
  const decreaseFontSize = () => setFontSize(fontSize - 1);
  const resetFontSize = () => setFontSize(0);

  // Apply responsive root font-size scaling dynamically:
  // Mobile (<640px): 87.5% (14px base) - keeps geometric Poppins sleek, crisp and never oversized
  // Tablet (640px - 1023px): 93.75% (15px base)
  // Standard Desktop (1024px - 1279px): 106.25% (17px base)
  // Wide Desktop (>=1280px): 112.5% (18px base)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;

    const updateRootFontSize = () => {
      const width = window.innerWidth;
      let basePercent = 93.75;
      if (width < 640) {
        basePercent = 81.25; // 13px base for sleek, proportional mobile views
      } else if (width < 1024) {
        basePercent = 87.5; // 14px base for tablets
      } else if (width < 1280) {
        basePercent = 93.75; // 15px base for standard desktop
      } else {
        basePercent = 100; // 16px base for wide desktop
      }

      const sizeMultiplier = 1.0 + fontSize * 0.1;
      root.style.fontSize = `${basePercent * sizeMultiplier}%`;
    };

    updateRootFontSize();
    window.addEventListener('resize', updateRootFontSize);
    return () => window.removeEventListener('resize', updateRootFontSize);
  }, [fontSize]);

  // Contrast actions
  const setContrast = (mode: ContrastMode) => {
    setContrastState(mode);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mpkv_contrast', mode);
      } catch {
        // ignore
      }
    }
  };

  // Apply contrast settings to html and body elements
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;

    root.classList.remove('high-contrast', 'dark-mode');
    body.classList.remove('theme-high-contrast', 'theme-dark');
    root.style.filter = 'none';

    if (contrast === 'high') {
      root.classList.add('high-contrast');
      body.classList.add('theme-high-contrast');
    } else if (contrast === 'dark') {
      root.classList.add('dark-mode');
      body.classList.add('theme-dark');
    } else if (contrast === 'inverted') {
      root.style.filter = 'invert(1) hue-rotate(180deg)';
    }
  }, [contrast]);

  // Text-to-Speech logic
  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!text || !text.trim()) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text.slice(0, 3000));
    utteranceRef.current = utterance;

    // Detect Devanagari characters
    const hasDevanagari = /[\u0900-\u097F]/.test(text);
    utterance.lang = hasDevanagari || language === 'mr' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleBhashiniVoice = () => {
    const next = !bhashiniVoiceActive;
    setBhashiniVoiceActiveState(next);
    if (!next) {
      stopSpeaking();
    }
  };

  const setBhashiniVoiceActive = (active: boolean) => {
    setBhashiniVoiceActiveState(active);
    if (!active) {
      stopSpeaking();
    }
  };

  // Global hover-to-speak logic when Bhashini Voice Narrator is active
  useEffect(() => {
    if (!bhashiniVoiceActive || typeof window === 'undefined') {
      stopSpeaking();
      return;
    }

    let hoverTimeout: NodeJS.Timeout;
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const validTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'A', 'BUTTON', 'SPAN', 'LI', 'LABEL', 'TD', 'TH'];
      if (validTags.includes(target.tagName)) {
        const text = target.innerText || target.textContent;
        if (text && text.trim().length > 0 && text.trim().length < 300) {
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            speak(text.trim());
          }, 350);
        }
      }
    };

    const handleMouseOut = () => {
      clearTimeout(hoverTimeout);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      clearTimeout(hoverTimeout);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [bhashiniVoiceActive, language]);

  // Backward-compatible mappings
  const fontScale: FontScale = fontSize <= -1 ? 'sm' : fontSize >= 1 ? 'lg' : 'md';
  const setFontScale = (scale: FontScale) => {
    if (scale === 'sm') setFontSize(-1);
    else if (scale === 'lg') setFontSize(2);
    else setFontSize(0);
  };
  const cycleFontScale = (direction: 'up' | 'down' | 'reset') => {
    if (direction === 'reset') resetFontSize();
    else if (direction === 'up') increaseFontSize();
    else if (direction === 'down') decreaseFontSize();
  };

  const theme: ThemeMode = contrast === 'high' ? 'high-contrast' : contrast === 'dark' ? 'dark' : 'default';
  const setTheme = (mode: ThemeMode) => {
    if (mode === 'high-contrast') setContrast('high');
    else if (mode === 'dark') setContrast('dark');
    else setContrast('standard');
  };
  const toggleHighContrast = () => {
    setContrast(contrast === 'high' ? 'standard' : 'high');
  };
  const toggleDarkMode = () => {
    setContrast(contrast === 'dark' ? 'standard' : 'dark');
  };

  const speakContent = (specificText?: string) => {
    if (specificText) {
      speak(specificText);
    } else {
      const mainContent = document.querySelector('main') || document.body;
      speak(mainContent.innerText || '');
    }
  };

  const stopSpeech = stopSpeaking;

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        fontSizePercent,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        contrast,
        setContrast,
        bhashiniVoiceActive,
        setBhashiniVoiceActive,
        toggleBhashiniVoice,
        isSpeaking,
        speak,
        stopSpeaking,
        fontScale,
        setFontScale,
        cycleFontScale,
        theme,
        setTheme,
        toggleHighContrast,
        toggleDarkMode,
        speakContent,
        stopSpeech,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
