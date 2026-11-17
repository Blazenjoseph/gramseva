import React from 'react';
import { getTranslations } from 'next-intl/server';
import { HELP_OFFICES_DATA } from '@/lib/data/offices';
import { OfficeFinder } from '@/components/offices/OfficeFinder';
import { Locale } from '@/types';
import { Building } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offices' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function OfficesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offices' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-field-50 dark:bg-stone-800 border border-field-200 dark:border-stone-700 text-xs font-semibold text-field-800 dark:text-straw-400">
          <Building className="w-3.5 h-3.5" />
          <span>Taluk & Hobli Directory</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink dark:text-paper-50">
          {t('title')}
        </h1>
        <p className="text-base text-ink-muted dark:text-stone-300 leading-relaxed font-normal">
          {t('subtitle')}
        </p>
      </div>

      {/* Office Finder Component */}
      <OfficeFinder initialOffices={HELP_OFFICES_DATA} locale={locale as Locale} />
    </div>
  );
}
