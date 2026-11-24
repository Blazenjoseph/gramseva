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

    const publishedSchemes = SCHEMES_DATA.filter((s) => s.published !== false);
    for (const scheme of publishedSchemes) {
      const parsedDate = scheme.lastVerifiedOn ? new Date(scheme.lastVerifiedOn) : new Date('2026-11-23');
      const validDate = isNaN(parsedDate.getTime()) ? new Date('2026-11-23') : parsedDate;

      sitemapEntries.push({
        url: `${baseUrl}/${locale}/schemes/${scheme.slug}`,
        lastModified: validDate,
        changeFrequency: 'monthly',
        priority: 0.85,
      });
    }
  }

  return sitemapEntries;
}
