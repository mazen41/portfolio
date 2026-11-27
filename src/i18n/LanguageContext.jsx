import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STRINGS } from './strings';
import './rtl.css';

const STORAGE_KEY = 'site-lang';
const LanguageContext = createContext(null);

// Reads the saved choice after hydration, so prerendered pages always start in English.
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') setLang(saved);
    } catch (e) {
      // Storage can be blocked (private mode); stay on English.
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLang = useCallback(() => {
    const next = lang === 'en' ? 'ar' : 'en';
    setLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // Ignore: the switch still works for this visit.
    }
  }, [lang]);

  const value = useMemo(() => {
    const t = (key, vars) => {
      let text = (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;
      if (vars) {
        Object.keys(vars).forEach((k) => {
          text = text.replace('{' + k + '}', vars[k]);
        });
      }
      return text;
    };
    return { lang, t, toggleLang, isRtl: lang === 'ar' };
  }, [lang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// Falls back to English if used outside the provider.
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (ctx) return ctx;
  return { lang: 'en', t: (key) => STRINGS.en[key] || key, toggleLang: () => {}, isRtl: false };
}
