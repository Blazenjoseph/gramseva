import React from 'react';
import { getTranslations } from 'next-intl/server';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';
import { Locale } from '@/types';
import { MessageSquare } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'feedback' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'feedback' });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-field-50 dark:bg-stone-800 border border-field-200 dark:border-stone-700 text-xs font-semibold text-field-800 dark:text-straw-400">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Community Field Watch</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink dark:text-paper-50">
          {t('title')}
        </h1>
        <p className="text-base text-ink-muted dark:text-stone-300 leading-relaxed font-normal">
          {t('subtitle')}
        </p>
      </div>

      {/* Form Component */}
      <FeedbackForm />
    </div>
  );
}
