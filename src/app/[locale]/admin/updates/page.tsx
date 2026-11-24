import React from 'react';
import { getTranslations } from 'next-intl/server';
import { UpdateCentre } from '@/components/admin/UpdateCentre';
import { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admin' });

  return {
    title: `Update Centre — ${t('title')}`,
    description: 'Administrative Update Centre for auditing, verifying and publishing agricultural scheme updates.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminUpdatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <UpdateCentre locale={locale as Locale} />
    </div>
  );
}
