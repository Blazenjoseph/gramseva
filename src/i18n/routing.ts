import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'kn', 'hi', 'ta', 'ml', 'te'] as const;
export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export const localeNames: Record<AppLocale, { native: string; english: string; fontClass: string }> = {
  en: { native: 'English', english: 'English', fontClass: 'font-sans' },
  kn: { native: 'ಕನ್ನಡ', english: 'Kannada', fontClass: 'font-kannada' },
  hi: { native: 'हिन्दी', english: 'Hindi', fontClass: 'font-hindi' },
  ta: { native: 'தமிழ்', english: 'Tamil', fontClass: 'font-tamil' },
  ml: { native: 'മലയാളം', english: 'Malayalam', fontClass: 'font-malayalam' },
  te: { native: 'తెలుగు', english: 'Telugu', fontClass: 'font-telugu' },
};
