'use client';

import React, { useState, useEffect } from 'react';
import { Type, Eye, Sun, Moon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AccessibilityControls() {
  const t = useTranslations('common');
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read persisted accessibility settings
    const savedLargeText = localStorage.getItem('sak_large_text') === 'true';
    const savedHighContrast = localStorage.getItem('sak_high_contrast') === 'true';
    const savedTheme = localStorage.getItem('sak_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;

    if (savedLargeText) {
      document.documentElement.classList.add('large-text');
      setLargeText(true);
    }
    if (savedHighContrast) {
      document.documentElement.classList.add('high-contrast');
      setHighContrast(true);
    }
    if (isDark) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleLargeText = () => {
    const next = !largeText;
    setLargeText(next);
    localStorage.setItem('sak_large_text', String(next));
    if (next) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    localStorage.setItem('sak_high_contrast', String(next));
    if (next) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('sak_theme', next ? 'dark' : 'light');
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return <div className="h-8 w-24" aria-hidden="true" />;
  }

  return (
    <div className="flex items-center gap-1.5" role="toolbar" aria-label="Accessibility options">
      {/* Large Text Button */}
      <button
        type="button"
        onClick={toggleLargeText}
        className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
          largeText
            ? 'bg-field-800 text-paper-50 border-field-900 dark:bg-straw-400 dark:text-ink dark:border-straw-500'
            : 'bg-paper-100 hover:bg-paper-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-ink dark:text-paper-100 border-paper-300 dark:border-stone-700'
        }`}
        aria-pressed={largeText}
        title={t('largeText')}
        aria-label={t('largeText')}
      >
        <Type className="w-4 h-4" />
        <span className="text-[11px] uppercase tracking-wide">A+</span>
      </button>

      {/* High Contrast Button */}
      <button
        type="button"
        onClick={toggleHighContrast}
        className={`p-1.5 rounded-lg border text-xs flex items-center transition-colors ${
          highContrast
            ? 'bg-black text-white border-black ring-2 ring-yellow-400'
            : 'bg-paper-100 hover:bg-paper-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-ink dark:text-paper-100 border-paper-300 dark:border-stone-700'
        }`}
        aria-pressed={highContrast}
        title={t('highContrast')}
        aria-label={t('highContrast')}
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* Theme Toggle Button */}
      <button
        type="button"
        onClick={toggleTheme}
        className="p-1.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-100 hover:bg-paper-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-ink dark:text-paper-100 text-xs flex items-center transition-colors"
        title={t('themeToggle')}
        aria-label={t('themeToggle')}
      >
        {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-field-800" />}
      </button>
    </div>
  );
}
