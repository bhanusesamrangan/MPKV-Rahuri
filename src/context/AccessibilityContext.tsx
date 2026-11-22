'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';

type FontScale = 'sm' | 'md' | 'lg';
type ThemeMode = 'default' | 'high-contrast' | 'dark';

interface AccessibilityContextType {
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  cycleFontScale: (direction: 'up' | 'down' | 'reset') => void;
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleHighContrast: () => void;
  toggleDarkMode: () => void;
  isSpeaking: boolean;
  speakContent: (text?: string) => void;
  stopSpeech: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();

  // Always default to 'md' and 'default' deterministically for SSR hydration consistency
  const [fontScale, setFontScaleState] = useState<FontScale>('md');
  const [theme, setThemeState] = useState<ThemeMode>('default');

  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Sync saved preferences from localStorage after initial client mount
  useEffect(() => {
    try {
      const savedScale = localStorage.getItem('mpkv_font_scale') as FontScale;
      if (['sm', 'md', 'lg'].includes(savedScale)) {
        setFontScaleState(savedScale);
      }
      const savedTheme = localStorage.getItem('mpkv_theme') as ThemeMode;
      if (['default', 'high-contrast', 'dark'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    } catch {
      // ignore
    }
  }, []);

  // Apply Font Scale
  const setFontScale = (scale: FontScale) => {
    setFontScaleState(scale);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mpkv_font_scale', scale);
      } catch {
        // ignore
      }
    }
  };

  const cycleFontScale = (direction: 'up' | 'down' | 'reset') => {
    if (direction === 'reset') setFontScale('md');
    else if (direction === 'up') {
      if (fontScale === 'sm') setFontScale('md');
      else if (fontScale === 'md') setFontScale('lg');
    } else if (direction === 'down') {
      if (fontScale === 'lg') setFontScale('md');
      else if (fontScale === 'md') setFontScale('sm');
    }
  };

  // Apply Theme
  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mpkv_theme', mode);
      } catch {
        // ignore
      }
    }
  };

  const toggleHighContrast = () => {
    setTheme(theme === 'high-contrast' ? 'default' : 'high-contrast');
  };

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'default' : 'dark');
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    root.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg');
    root.classList.add(`font-scale-${fontScale}`);
  }, [fontScale]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const body = document.body;
    body.classList.remove('theme-high-contrast', 'theme-dark');
    if (theme === 'high-contrast') {
      body.classList.add('theme-high-contrast');
    } else if (theme === 'dark') {
      body.classList.add('theme-dark');
    }
  }, [theme]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speakContent = (specificText?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    let textToRead = specificText;
    if (!textToRead) {
      const mainContent = document.querySelector('main') || document.body;
      textToRead = mainContent.innerText || '';
    }

    if (!textToRead.trim()) return;

    const utterance = new SpeechSynthesisUtterance(textToRead.slice(0, 3000));
    utteranceRef.current = utterance;
    utterance.lang = language === 'mr' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontScale,
        setFontScale,
        cycleFontScale,
        theme,
        setTheme,
        toggleHighContrast,
        toggleDarkMode,
        isSpeaking,
        speakContent,
        stopSpeech
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
