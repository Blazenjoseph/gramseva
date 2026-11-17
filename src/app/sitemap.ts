import { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { SCHEMES_DATA } from '@/lib/data/schemes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://schemeaccesskit.org';
  const routes = ['', '/finder', '/schemes', '/checklist', '/offices', '/glossary', '/about', '/feedback'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date('2026-11-15'),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : route === '/finder' || route === '/checklist' ? 0.9 : 0.8,
      });
    }

    for (const scheme of SCHEMES_DATA) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/schemes/${scheme.slug}`,
        lastModified: new Date(scheme.lastVerifiedOn),
        changeFrequency: 'monthly',
        priority: 0.85,
      });
    }
  }

  return sitemapEntries;
}
