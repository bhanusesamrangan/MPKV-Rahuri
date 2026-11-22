'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import translationsData from '../data/scraped/translations.json';

type Language = 'mr' | 'en';

interface TranslationEntry {
  en: string;
  mr: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  getBilingual: (item?: { en?: string; mr?: string } | string) => string;
}

const translations: Record<string, TranslationEntry> = translationsData as Record<string, TranslationEntry>;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always default to 'mr' deterministically for SSR hydration consistency
  const [language, setLanguageState] = useState<Language>('mr');

  // Sync saved language from localStorage after initial client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mpkv_language') as Language;
      if (saved === 'en' || saved === 'mr') {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // localStorage may be unavailable or blocked in certain contexts
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mpkv_language', lang);
      } catch {
        // ignore
      }
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'mr' ? 'en' : 'mr';
    setLanguage(nextLang);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const entry = translations[key];
    if (entry && entry[language]) {
      return entry[language];
    }
    if (fallback) return fallback;
    return entry?.en || entry?.mr || key;
  };

  const getBilingual = (item?: { en?: string; mr?: string } | string): string => {
    if (!item) return '';
    if (typeof item === 'string') return item;
    return item[language] || item.mr || item.en || '';
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        getBilingual
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
