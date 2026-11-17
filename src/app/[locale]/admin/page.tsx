import React from 'react';
import { getTranslations } from 'next-intl/server';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Locale } from '@/types';
import { Shield } from 'lucide-react';

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
      <AdminDashboard locale={locale as Locale} />
    </div>
  );
}
