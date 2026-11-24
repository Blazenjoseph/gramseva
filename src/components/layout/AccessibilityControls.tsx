'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Type, Eye, Palette, Check, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ColorMode } from '@/types';

interface ColorModeOption {
  id: ColorMode;
  name: string;
  description: string;
  bgHex: string;
  primaryHex: string;
  accentHex: string;
  fontName: string;
}

const COLOR_MODES: ColorModeOption[] = [
  {
    id: 'field',
    name: 'Field (default)',
    description: 'Paper, field green, straw gold · Fraunces',
    bgHex: '#F4EEE1',
    primaryHex: '#1E3B2A',
    accentHex: '#D8B25C',
    fontName: 'Fraunces',
  },
  {
    id: 'night',
    name: 'Night',
    description: 'Dark slate background, muted emerald · Fraunces',
    bgHex: '#181917',
    primaryHex: '#3D6B4F',
    accentHex: '#D8B25C',
    fontName: 'Fraunces',
  },
  {
    id: 'monsoon',
    name: 'Monsoon',
    description: 'Mist, deep teal, muted sky · Literata',
    bgHex: '#EEF3F1',
    primaryHex: '#1F4E56',
    accentHex: '#387D8A',
    fontName: 'Literata',
  },
  {
    id: 'harvest',
    name: 'Harvest',
    description: 'Sand, terracotta, ochre · Newsreader',
    bgHex: '#F7E9CF',
    primaryHex: '#9C4A2F',
    accentHex: '#C98A2B',
    fontName: 'Newsreader',
  },
  {
    id: 'high-contrast',
    name: 'High contrast',
    description: 'Pure white, black text, 3px borders · Atkinson',
    bgHex: '#FFFFFF',
    primaryHex: '#000000',
    accentHex: '#000000',
    fontName: 'Atkinson',
  },
];

export function AccessibilityControls() {
  const t = useTranslations('common');
  const [largeText, setLargeText] = useState(false);
  const [colorMode, setColorMode] = useState<ColorMode>('field');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize from localStorage or prefers-color-scheme
  useEffect(() => {
    setMounted(true);
    try {
      const savedLargeText = localStorage.getItem('sak_large_text') === 'true';
      if (savedLargeText) {
        document.documentElement.classList.add('large-text');
        setLargeText(true);
      }

      // Read persisted color mode
      let activeMode: ColorMode = 'field';
      const savedColorMode = localStorage.getItem('sak_color_mode') as ColorMode | null;

      if (savedColorMode && COLOR_MODES.some((m) => m.id === savedColorMode)) {
        activeMode = savedColorMode;
      } else {
        // Fallback check: legacy sak_high_contrast or sak_theme
        const legacyHC = localStorage.getItem('sak_high_contrast') === 'true';
        const legacyTheme = localStorage.getItem('sak_theme');
        if (legacyHC) {
          activeMode = 'high-contrast';
        } else if (legacyTheme === 'dark') {
          activeMode = 'night';
        } else {
          // Respect prefers-color-scheme on first visit between Field and Night
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          activeMode = systemPrefersDark ? 'night' : 'field';
        }
      }

      applyColorMode(activeMode, false);
    } catch {
      // Graceful fallback for non-browser/restricted storage environments
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Keyboard navigation for dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
      buttonRef.current?.focus();
    }
  };

  const applyColorMode = (mode: ColorMode, persist: boolean = true) => {
    setColorMode(mode);

    if (persist) {
      try {
        localStorage.setItem('sak_color_mode', mode);
        localStorage.setItem('sak_theme', mode === 'night' ? 'dark' : 'light');
        localStorage.setItem('sak_high_contrast', mode === 'high-contrast' ? 'true' : 'false');
      } catch {}
    }

    // Set data attribute on html
    document.documentElement.setAttribute('data-color-mode', mode);

    // Maintain backwards compatibility classes
    if (mode === 'night') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('high-contrast');
      document.body?.classList.remove('high-contrast');
    } else if (mode === 'high-contrast') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('high-contrast');
      document.body?.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('high-contrast');
      document.body?.classList.remove('high-contrast');
    }
  };

  const selectMode = (mode: ColorMode) => {
    applyColorMode(mode, true);
    setIsMenuOpen(false);
    buttonRef.current?.focus();
  };

  const toggleLargeText = () => {
    const next = !largeText;
    setLargeText(next);
    try {
      localStorage.setItem('sak_large_text', String(next));
    } catch {}

    if (next) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  };

  // Standalone High Contrast toggle for accessibility compliance
  const toggleHighContrastDirect = () => {
    if (colorMode === 'high-contrast') {
      selectMode('field');
    } else {
      selectMode('high-contrast');
    }
  };

  if (!mounted) {
    return <div className="h-8 w-32" aria-hidden="true" />;
  }

  const activeOption = COLOR_MODES.find((m) => m.id === colorMode) || COLOR_MODES[0];

  return (
    <div className="flex items-center gap-1.5" role="toolbar" aria-label="Accessibility & Display Options">
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

      {/* Standalone Quick High Contrast Button */}
      <button
        type="button"
        onClick={toggleHighContrastDirect}
        className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
          colorMode === 'high-contrast'
            ? 'bg-black text-yellow-300 border-yellow-400 ring-2 ring-yellow-400 font-bold shadow-sm'
            : 'bg-paper-100 hover:bg-paper-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-ink dark:text-paper-100 border-paper-300 dark:border-stone-700'
        }`}
        aria-pressed={colorMode === 'high-contrast'}
        title="High contrast mode"
        aria-label="High contrast mode"
      >
        <Eye className="w-4 h-4 shrink-0" />
        {colorMode === 'high-contrast' && (
          <span className="text-[10px] font-bold tracking-wider leading-none">
            HC
          </span>
        )}
      </button>

      {/* Color Mode Picker Menu */}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="px-2.5 py-1.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-100 hover:bg-paper-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-ink dark:text-paper-100 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          aria-label={`Color mode: currently ${activeOption.name}. Click to choose between 5 visual modes.`}
          title="Color mode"
        >
          <Palette className="w-3.5 h-3.5 text-field-800 dark:text-straw-400 shrink-0" />
          <span>Color mode</span>
          <ChevronDown className="w-3 h-3 text-paper-500 shrink-0" />
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            onKeyDown={handleKeyDown}
            role="menu"
            aria-label="Color modes"
            className="absolute right-0 mt-2 w-72 rounded-xl border-2 border-field-700 dark:border-straw-500 bg-paper-50 dark:bg-stone-900 shadow-2xl p-2 z-50 space-y-1 text-xs"
          >
            <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-paper-500 border-b border-paper-200 dark:border-stone-800 mb-1">
              Select Color Mode (5 modes)
            </div>

            {COLOR_MODES.map((option) => {
              const isSelected = colorMode === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  onClick={() => selectMode(option.id)}
                  className={`w-full text-left p-2 rounded-lg flex items-start gap-2.5 transition-colors ${
                    isSelected
                      ? 'bg-field-100 dark:bg-field-950/70 border border-field-300 dark:border-field-800 font-semibold'
                      : 'hover:bg-paper-100 dark:hover:bg-stone-800 text-paper-800 dark:text-paper-200'
                  }`}
                >
                  {/* Swatch indicator */}
                  <div
                    className="w-5 h-5 rounded-md border border-paper-400 dark:border-stone-600 shrink-0 mt-0.5 shadow-xs flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: option.bgHex }}
                    aria-hidden="true"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: option.primaryHex }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-field-900 dark:text-paper-100 text-xs">
                        {option.name}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-field-800 dark:text-straw-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-paper-600 dark:text-paper-400 leading-tight mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
