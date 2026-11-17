import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing, locales, type AppLocale } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister';
import {
  fraunces,
  atkinson,
  notoSansKannada,
  notoSansDevanagari,
  notoSansTamil,
  notoSansMalayalam,
} from '@/app/fonts';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://schemeaccesskit.org';

  return {
    title: {
      default: `${t('appName')} — ${t('appTagline')}`,
      template: `%s | ${t('appName')}`,
    },
    description: t('appTagline'),
    metadataBase: new URL(appUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        kn: '/kn',
        hi: '/hi',
        ta: '/ta',
        ml: '/ml',
      },
    },
    openGraph: {
      title: `${t('appName')} — ${t('appTagline')}`,
      description: 'A student design thinking project from Group 5, JAIN University, empowering small and marginal farmers in Karnataka.',
      url: `/${locale}`,
      siteName: t('appName'),
      locale: locale === 'kn' ? 'kn_IN' : locale === 'hi' ? 'hi_IN' : locale === 'ta' ? 'ta_IN' : locale === 'ml' ? 'ml_IN' : 'en_IN',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as AppLocale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`
        ${fraunces.variable}
        ${atkinson.variable}
        ${notoSansKannada.variable}
        ${notoSansDevanagari.variable}
        ${notoSansTamil.variable}
        ${notoSansMalayalam.variable}
      `}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-paper-100 text-ink dark:bg-stone-950 dark:text-paper-100 flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <ServiceWorkerRegister />
          <Header />
          <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
