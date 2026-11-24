import React from 'react';
import { getTranslations } from 'next-intl/server';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Locale } from '@/types';
import Link from 'next/link';
import { Shield, Sparkles, ArrowRight } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admin' });

  return {
    title: t('title'),
    description: t('subtitle'),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="p-4 rounded-xl bg-field-100 dark:bg-field-950/60 border border-field-300 dark:border-field-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-field-800 text-straw-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-serif font-bold text-field-900 dark:text-straw-400">
              Admin Update Centre Available
            </h2>
            <p className="text-xs text-paper-700 dark:text-paper-300">
              Audit government schemes, review official PIB releases, and verify source links with automated policy checks.
            </p>
          </div>
        </div>

        <Link
          href={`/${locale}/admin/updates`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-field-800 hover:bg-field-900 text-paper-50 text-xs font-semibold shrink-0 transition-colors"
        >
          <span>Open Update Centre</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <AdminDashboard locale={locale as Locale} />
    </div>
  );
}
