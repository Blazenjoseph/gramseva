'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname, locales, localeNames, type AppLocale } from '@/i18n/routing';
import { Globe, Check, ChevronDown } from 'lucide-react';

export function LanguageSwitcher() {
  const currentLocale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (locale: AppLocale) => {
    setIsOpen(false);
    router.replace(pathname, { locale });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-100 hover:bg-paper-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-ink dark:text-paper-100 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-field-800 dark:focus:ring-straw-400"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-field-800 dark:text-straw-400" />
        <span className="font-semibold">{localeNames[currentLocale]?.native || 'English'}</span>
        <ChevronDown className="w-3.5 h-3.5 text-ink-muted dark:text-stone-400" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-lg bg-paper-50 dark:bg-stone-900 border border-paper-300 dark:border-stone-700 shadow-xl ring-1 ring-black/5 focus:outline-none overflow-hidden"
          role="listbox"
          tabIndex={-1}
        >
          <div className="py-1">
            {locales.map((loc) => {
              const active = loc === currentLocale;
              return (
                <button
                  key={loc}
                  onClick={() => handleSelect(loc)}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-field-800 text-paper-50 font-bold dark:bg-field-700'
                      : 'text-ink dark:text-paper-100 hover:bg-paper-200 dark:hover:bg-stone-800'
                  }`}
                  role="option"
                  aria-selected={active}
                >
                  <div className="flex flex-col">
                    <span className="text-base leading-tight font-medium">{localeNames[loc].native}</span>
                    <span className={`text-xs ${active ? 'text-paper-200' : 'text-ink-muted dark:text-stone-400'}`}>
                      {localeNames[loc].english}
                    </span>
                  </div>
                  {active && <Check className="w-4 h-4 text-straw-400 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
