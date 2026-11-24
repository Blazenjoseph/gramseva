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
  notoSansTelugu,
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
        te: '/te',
      },
    },
    openGraph: {
      title: `${t('appName')} — ${t('appTagline')}`,
      description: 'Official informational guide for agricultural schemes across Indian states and union territories.',
      url: `/${locale}`,
      siteName: t('appName'),
      locale:
        locale === 'kn'
          ? 'kn_IN'
          : locale === 'hi'
          ? 'hi_IN'
          : locale === 'ta'
          ? 'ta_IN'
          : locale === 'ml'
          ? 'ml_IN'
          : locale === 'te'
          ? 'te_IN'
          : 'en_IN',
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
        ${notoSansTelugu.variable}
      `}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-paper-100 text-ink dark:bg-stone-950 dark:text-paper-100 flex flex-col min-h-screen">
        <script
          id="accessibility-init"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('sak_large_text') === 'true') {
                  document.documentElement.classList.add('large-text');
                }
                var m = localStorage.getItem('sak_color_mode');
                if (!m) {
                  var hc = localStorage.getItem('sak_high_contrast') === 'true';
                  var t = localStorage.getItem('sak_theme');
                  if (hc) {
                    m = 'high-contrast';
                  } else if (t === 'dark') {
                    m = 'night';
                  } else {
                    var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    m = d ? 'night' : 'field';
                  }
                }
                document.documentElement.setAttribute('data-color-mode', m);
                if (m === 'night') {
                  document.documentElement.classList.add('dark');
                } else if (m === 'high-contrast') {
                  document.documentElement.classList.add('high-contrast');
                  document.body && document.body.classList.add('high-contrast');
                }
              } catch (e) {}
            `,
          }}
        />
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
