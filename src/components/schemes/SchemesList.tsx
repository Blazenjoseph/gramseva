'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Scheme, Locale } from '@/types';
import { Link } from '@/i18n/routing';
import { SpeechButton } from '@/components/ui/SpeechButton';
import { VerifiedBadge } from '@/components/ui/VerifiedBadge';
import {
  Search,
  AlertTriangle,
  ArrowRight,
  Globe2,
  Landmark,
  AlertCircle,
} from 'lucide-react';

interface SchemesListProps {
  initialSchemes: Scheme[];
  locale: Locale;
}

export function SchemesList({ initialSchemes, locale }: SchemesListProps) {
  const t = useTranslations('schemes');
  const tCommon = useTranslations('common');
  const [filterType, setFilterType] = useState<'all' | 'nationwide' | 'state'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = useMemo(() => {
    return initialSchemes.filter((scheme) => {
      const isNationwide = scheme.state === 'all-india' || scheme.state === 'Central';
      // Filter by nationwide vs state
      if (filterType === 'nationwide' && !isNationwide) {
        return false;
      }
      if (filterType === 'state' && isNationwide) {
        return false;
      }
      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = scheme.title.toLowerCase().includes(q);
        const matchGives = scheme.whatItGives.toLowerCase().includes(q);
        const matchWho = scheme.whoItIsFor.toLowerCase().includes(q);
        const matchCrops = scheme.eligibleCrops?.some((c) => c.toLowerCase().includes(q));
        const matchState = scheme.state?.toLowerCase().includes(q);
        return matchTitle || matchGives || matchWho || matchCrops || matchState;
      }
      return true;
    });
  }, [initialSchemes, filterType, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="p-4 sm:p-6 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-ink-muted dark:text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-field-800 dark:focus:ring-straw-400"
            aria-label="Search schemes"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0" role="group" aria-label="Scheme categories">
          {[
            { id: 'all', label: t('filterAll') },
            { id: 'nationwide', label: t('filterNationwide') },
            { id: 'state', label: t('filterState') },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilterType(f.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === f.id
                  ? 'bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
                  : 'bg-paper-100 hover:bg-paper-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-ink-muted dark:text-stone-300 border border-paper-300 dark:border-stone-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <article
            key={scheme.id}
            className="rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 p-6 sm:p-7 shadow-card hover:shadow-hover transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              {/* Category tag & Speech button */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider bg-field-50 dark:bg-stone-800 text-field-900 dark:text-straw-400 border border-field-200 dark:border-stone-700">
                  {scheme.state === 'all-india' || scheme.state === 'Central' ? (
                    <>
                      <Globe2 className="w-3.5 h-3.5 text-field-800 dark:text-straw-400" />
                      <span>Nationwide Scheme</span>
                    </>
                  ) : (
                    <>
                      <Landmark className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                      <span>State Scheme: {scheme.state}</span>
                    </>
                  )}
                </span>

                <SpeechButton
                  text={`${scheme.title}. ${scheme.whatItGives}`}
                  locale={locale}
                  compact
                />
              </div>

              {/* State Scheme Warning Notice if applicable */}
              {scheme.state !== 'all-india' && scheme.state !== 'Central' && (
                <div className="p-2.5 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>
                    {tCommon('stateSchemeNotice', { state: scheme.state })}
                  </span>
                </div>
              )}

              {/* Title */}
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-ink dark:text-paper-50 group-hover:text-field-800 dark:group-hover:text-straw-400 transition-colors leading-snug">
                <Link href={`/schemes/${scheme.slug}`}>{scheme.title}</Link>
              </h2>

              <p className="text-xs text-ink-muted dark:text-stone-400 font-medium">
                {scheme.department}
              </p>

              {/* What it gives */}
              <div className="p-3.5 rounded-xl bg-paper-100/70 dark:bg-stone-950/60 border border-paper-200 dark:border-stone-800 space-y-1">
                <h3 className="text-xs font-bold text-field-800 dark:text-straw-400 uppercase tracking-wider">
                  {t('whatItGives')}
                </h3>
                <p className="text-sm text-ink dark:text-stone-200 leading-relaxed font-medium">
                  {scheme.whatItGives}
                </p>
              </div>

              {/* Who it is for */}
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-ink-muted dark:text-stone-400 uppercase tracking-wider">
                  {t('whoItIsFor')}
                </h3>
                <p className="text-xs text-ink-muted dark:text-stone-300 leading-relaxed">
                  {scheme.whoItIsFor}
                </p>
              </div>

              {/* Crucial Watch Out Note Preview */}
              <div className="p-3 rounded-lg bg-straw-50 dark:bg-stone-950/80 border border-straw-300 dark:border-stone-700 flex items-start gap-2.5 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-straw-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed text-ink dark:text-stone-300">
                  <strong className="font-bold text-amber-900 dark:text-straw-400 block mb-0.5">
                    {t('watchFor')}
                  </strong>
                  {scheme.watchFor}
                </div>
              </div>
            </div>

            {/* Footer with verification metadata & link */}
            <div className="pt-6 mt-6 border-t border-paper-200 dark:border-stone-800 space-y-3">
              <VerifiedBadge
                verifiedBy={scheme.verifiedBy}
                verifiedOn={scheme.lastVerifiedOn}
                sourceUrl={scheme.sourceUrl}
                isMachineTranslated={scheme.isMachineTranslated}
                isHypothesis={scheme.isHypothesis}
                compact
              />

              <Link
                href={`/schemes/${scheme.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-field-800 hover:bg-field-900 text-paper-50 dark:bg-field-700 dark:hover:bg-field-600 font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                <span>{t('readDetails')}</span>
                <ArrowRight className="w-4 h-4 text-straw-400" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
