'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { getGlossaryItems } from '@/lib/data/glossary';
import { Locale } from '@/types';
import { SpeechButton } from '@/components/ui/SpeechButton';
import { Search, BookOpen, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

interface GlossaryListProps {
  locale: Locale;
}

export function GlossaryList({ locale }: GlossaryListProps) {
  const t = useTranslations('glossary');
  const [searchQuery, setSearchQuery] = useState('');

  const items = useMemo(() => getGlossaryItems(locale), [locale]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.englishEquivalent.toLowerCase().includes(q) ||
        item.simpleExplanation.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 text-ink dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-field-800"
          />
        </div>
      </div>

      {/* Glossary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="p-6 sm:p-7 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card hover:shadow-hover transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header with Term and Speech */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-ink dark:text-paper-50 leading-snug">
                    {item.term}
                  </h2>
                  <span className="text-xs text-field-800 dark:text-straw-400 font-semibold block mt-0.5">
                    {item.englishEquivalent}
                  </span>
                </div>
                <SpeechButton
                  text={`${item.term}. Meaning: ${item.simpleExplanation}. Why it matters: ${item.whyItMatters}`}
                  locale={locale}
                  compact
                />
              </div>

              {/* Simple explanation */}
              <div className="p-3.5 rounded-xl bg-paper-100 dark:bg-stone-950/70 border border-paper-200 dark:border-stone-800 space-y-1">
                <span className="text-xs font-bold text-field-800 dark:text-straw-400 uppercase tracking-wider block">
                  {t('meaning')}:
                </span>
                <p className="text-sm text-ink dark:text-stone-200 leading-relaxed font-normal">
                  {item.simpleExplanation}
                </p>
              </div>

              {/* Why it matters */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-ink-muted dark:text-stone-400 uppercase tracking-wider block">
                  {t('whyMatters')}:
                </span>
                <p className="text-ink-muted dark:text-stone-300 leading-relaxed font-normal">
                  {item.whyItMatters}
                </p>
              </div>

              {/* Common Pitfall */}
              <div className="p-3 rounded-lg bg-straw-50 dark:bg-stone-950/90 border border-straw-300 dark:border-stone-700 flex items-start gap-2.5 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-straw-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed text-ink dark:text-stone-300">
                  <strong className="font-bold text-amber-900 dark:text-straw-400 block mb-0.5">
                    {t('pitfall')}:
                  </strong>
                  {item.commonMistake}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
