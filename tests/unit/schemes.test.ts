import { describe, it, expect } from 'vitest';
import { getAllSchemes, getSchemeBySlug, SCHEMES_DATA } from '@/lib/data/schemes';

describe('Schemes Data Repository', () => {
  it('loads all core schemes including PM-KISAN, Raitha Siri, and Krishi Bhagya', () => {
    const schemes = getAllSchemes('en');
    expect(schemes.length).toBeGreaterThanOrEqual(4);

    const slugs = schemes.map((s) => s.slug);
    expect(slugs).toContain('pm-kisan');
    expect(slugs).toContain('raitha-siri');
    expect(slugs).toContain('krishi-bhagya');
    expect(slugs).toContain('fruits-farmer-id');
  });

  it('ensures every scheme has mandatory official verification fields', () => {
    const schemes = getAllSchemes('en');
    for (const scheme of schemes) {
      expect(scheme.sourceUrl).toBeDefined();
      expect(scheme.sourceUrl.startsWith('https://')).toBe(true);
      expect(scheme.lastVerifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(scheme.verifiedBy).toBeDefined();
      expect(scheme.watchFor.length).toBeGreaterThan(15);
      expect(scheme.documentsNeeded.length).toBeGreaterThan(0);
    }
  });

  it('retrieves Kannada localized content for Raitha Siri', () => {
    const schemeKn = getSchemeBySlug('raitha-siri', 'kn');
    expect(schemeKn).toBeDefined();
    expect(schemeKn?.title).toContain('ರೈತ ಸಿರಿ');
    expect(schemeKn?.whatItGives).toContain('೧೦,೦೦೦');
    expect(schemeKn?.isMachineTranslated).toBe(true);
  });
});
