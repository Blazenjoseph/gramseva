import { describe, it, expect } from 'vitest';
import { getAllSchemes, getSchemeBySlug, SCHEMES_DATA } from '@/lib/data/schemes';

describe('Schemes Data Repository', () => {
  it('loads core schemes including nationwide and state-specific programs', () => {
    const schemes = getAllSchemes('en');
    expect(schemes.length).toBeGreaterThanOrEqual(7);

    const slugs = schemes.map((s) => s.slug);
    expect(slugs).toContain('pm-kisan');
    expect(slugs).toContain('pm-fasal-bima-yojana');
    expect(slugs).toContain('kisan-credit-card');
    expect(slugs).toContain('soil-health-card');
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

  it('retrieves Telugu localized content with translation pending badge status', () => {
    const schemeTe = getSchemeBySlug('pm-kisan', 'te');
    expect(schemeTe).toBeDefined();
    expect(schemeTe?.title).toContain('పీఎం-కిసాన్');
    expect(schemeTe?.whatItGives).toContain('₹6,000');
    expect(schemeTe?.isMachineTranslated).toBe(true);
  });

  it('verifies nationwide schemes have all-india state classification', () => {
    const pmKisan = getSchemeBySlug('pm-kisan', 'en');
    const kcc = getSchemeBySlug('kisan-credit-card', 'en');
    const soil = getSchemeBySlug('soil-health-card', 'en');

    expect(pmKisan?.state).toBe('all-india');
    expect(kcc?.state).toBe('all-india');
    expect(soil?.state).toBe('all-india');
  });

  it('verifies state-specific schemes outside Karnataka have placeholder markers', () => {
    const apScheme = getSchemeBySlug('ap-state-agriculture-scheme', 'en');
    const tgScheme = getSchemeBySlug('telangana-state-agriculture-scheme', 'en');
    const generic = getSchemeBySlug('state-scheme-placeholder', 'en');

    expect(apScheme?.isStateSpecificPlaceholder).toBe(true);
    expect(tgScheme?.isStateSpecificPlaceholder).toBe(true);
    expect(generic?.isStateSpecificPlaceholder).toBe(true);
  });
});
