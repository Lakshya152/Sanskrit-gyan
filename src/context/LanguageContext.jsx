import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

// The 6 strictly required languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' }
];

export const LanguageProvider = ({ children }) => {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. Language State
  // Default to English if no preference is found
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      const savedLang = localStorage.getItem('sanskrit_app_language');
      // Validate that the saved language is one of our supported languages
      if (savedLang && SUPPORTED_LANGUAGES.some(lang => lang.code === savedLang)) {
        return savedLang;
      }
      return 'en';
    } catch (error) {
      console.error("Failed to read language from localStorage:", error);
      return 'en';
    }
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Persistence Effect
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    localStorage.setItem('sanskrit_app_language', currentLanguage);
  }, [currentLanguage]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Translation Helper (t function)
  // Evaluates nested object keys like "onboarding.welcome"
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const t = useCallback((key) => {
    if (!key) return '';
    
    const keys = key.split('.');
    let value = translations[currentLanguage];
    let fallbackValue = translations['en'];

    try {
      // Traverse the translation object
      for (const k of keys) {
        if (value) value = value[k];
        if (fallbackValue) fallbackValue = fallbackValue[k];
      }
      
      // Return localized string, fallback to English, or return the key itself
      return value || fallbackValue || key;
    } catch (error) {
      console.warn(`Translation key missing: ${key}`);
      return key;
    }
  }, [currentLanguage]);

  // Context Payload
  const value = {
    currentLanguage,
    setCurrentLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook for consuming context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
