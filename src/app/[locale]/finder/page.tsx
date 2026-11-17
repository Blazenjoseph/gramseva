import React from 'react';
import { getTranslations } from 'next-intl/server';
import { SchemeFinderForm } from '@/components/finder/SchemeFinderForm';
import { Locale } from '@/types';
import { Compass } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'finder' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function FinderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'finder' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-field-50 dark:bg-stone-800 border border-field-200 dark:border-stone-700 text-xs font-semibold text-field-800 dark:text-straw-400">
          <Compass className="w-3.5 h-3.5 text-field-700 dark:text-straw-400" />
          <span>Interactive Decision Guidance</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink dark:text-paper-50">
          {t('title')}
        </h1>
        <p className="text-base text-ink-muted dark:text-stone-300 leading-relaxed font-normal">
          {t('subtitle')}
        </p>
      </div>

      {/* Form & Results Interactive Component */}
      <SchemeFinderForm locale={locale as Locale} />
    </div>
  );
}
