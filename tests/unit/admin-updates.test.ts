import { describe, it, expect } from 'vitest';
import {
  isOfficialDomain,
  calculateSchemeStatus,
  validateSchemeForPublish,
} from '@/lib/admin/verification';
import { SCHEMES_DATA } from '@/lib/data/schemes';

describe('Admin Update Centre & Source Verification Rules', () => {
  describe('Official Government Domain Validator (isOfficialDomain)', () => {
    it('accepts valid official Indian government domains (.gov.in and .nic.in)', () => {
      expect(isOfficialDomain('https://pmkisan.gov.in')).toBe(true);
      expect(isOfficialDomain('https://pmfby.gov.in')).toBe(true);
      expect(isOfficialDomain('https://agricoop.nic.in')).toBe(true);
      expect(isOfficialDomain('https://soilhealth.dac.gov.in')).toBe(true);
      expect(isOfficialDomain('https://raitamitra.karnataka.gov.in')).toBe(true);
      expect(isOfficialDomain('https://fruits.karnataka.gov.in')).toBe(true);
      expect(isOfficialDomain('https://pib.gov.in/PressReleasePage.aspx?PRID=2049921')).toBe(true);
      expect(isOfficialDomain('https://finance.karnataka.gov.in')).toBe(true);
    });

    it('rejects non-official or commercial domains', () => {
      expect(isOfficialDomain('https://pmkisan-fake.com')).toBe(false);
      expect(isOfficialDomain('https://kisanportal.org')).toBe(false);
      expect(isOfficialDomain('https://agri-updates.in')).toBe(false);
      expect(isOfficialDomain('https://news.google.com')).toBe(false);
      expect(isOfficialDomain('https://gov.in.scam.net')).toBe(false);
      expect(isOfficialDomain('ftp://pmkisan.gov.in')).toBe(false);
      expect(isOfficialDomain('')).toBe(false);
    });
  });

  describe('Automated Scheme Status Calculation (calculateSchemeStatus)', () => {
    const referenceDate = '2026-11-23';

    it('calculates "verified" when verified within the last 90 days with an official source', () => {
      const verifiedScheme = {
        sourceUrl: 'https://pmkisan.gov.in',
        lastVerifiedOn: '2026-11-23',
      };
      expect(calculateSchemeStatus(verifiedScheme, referenceDate)).toBe('verified');

      const verifiedRecentScheme = {
        sourceUrl: 'https://pmfby.gov.in',
        lastVerifiedOn: '2026-10-15', // ~39 days ago
      };
      expect(calculateSchemeStatus(verifiedRecentScheme, referenceDate)).toBe('verified');
    });

    it('calculates "review-due" when verified more than 90 days ago', () => {
      const reviewDueScheme = {
        sourceUrl: 'https://soilhealth.dac.gov.in',
        lastVerifiedOn: '2026-06-15', // > 150 days ago
      };
      expect(calculateSchemeStatus(reviewDueScheme, referenceDate)).toBe('review-due');
    });

    it('calculates "missing-source" when official source URL is empty or whitespace', () => {
      expect(calculateSchemeStatus({ sourceUrl: '', lastVerifiedOn: '2026-11-23' }, referenceDate)).toBe('missing-source');
      expect(calculateSchemeStatus({ sourceUrl: '   ', lastVerifiedOn: '2026-11-23' }, referenceDate)).toBe('missing-source');
      expect(calculateSchemeStatus({ sourceUrl: undefined, lastVerifiedOn: '2026-11-23' }, referenceDate)).toBe('missing-source');
    });
  });

  describe('Strict Publishing Policy Enforcement (validateSchemeForPublish)', () => {
    it('blocks publishing when source URL is missing', () => {
      const result = validateSchemeForPublish({
        sourceUrl: '',
        sourceAccessDate: '2026-11-23',
        changeSummary: 'Updated subsidy guidelines from government order.',
      });
      expect(result.canPublish).toBe(false);
      expect(result.errors).toContain('Official source URL is required.');
    });

    it('blocks publishing when source URL is on a non-official domain', () => {
      const result = validateSchemeForPublish({
        sourceUrl: 'https://farmernews.com/pmkisan',
        sourceAccessDate: '2026-11-23',
        changeSummary: 'Checked rules on non-gov blog.',
      });
      expect(result.canPublish).toBe(false);
      expect(result.errors.some((e) => e.includes('.gov.in or .nic.in'))).toBe(true);
    });

    it('blocks publishing when source access date is missing', () => {
      const result = validateSchemeForPublish({
        sourceUrl: 'https://pmkisan.gov.in',
        sourceAccessDate: '',
        changeSummary: 'Verified 24th instalment figures directly on portal.',
      });
      expect(result.canPublish).toBe(false);
      expect(result.errors).toContain('Source access date is required.');
    });

    it('blocks publishing when change summary is omitted or too brief', () => {
      const result = validateSchemeForPublish({
        sourceUrl: 'https://pmkisan.gov.in',
        sourceAccessDate: '2026-11-23',
        changeSummary: '',
      });
      expect(result.canPublish).toBe(false);
      expect(result.errors.some((e) => e.includes('change summary'))).toBe(true);
    });

    it('permits publishing when all official verification conditions are satisfied', () => {
      const result = validateSchemeForPublish({
        sourceUrl: 'https://pmkisan.gov.in',
        sourceAccessDate: '2026-11-23',
        changeSummary: 'Verified 24th instalment release numbers and NPCI bank seeding criteria.',
      });
      expect(result.canPublish).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('Dataset Verification State Inspection', () => {
    it('confirms PM-KISAN, PMFBY, Raitha Siri, and Krishi Bhagya have official gov domains and access dates', () => {
      const pmKisan = SCHEMES_DATA.find((s) => s.slug === 'pm-kisan');
      const pmfby = SCHEMES_DATA.find((s) => s.slug === 'pm-fasal-bima-yojana');
      const raithaSiri = SCHEMES_DATA.find((s) => s.slug === 'raitha-siri');
      const krishiBhagya = SCHEMES_DATA.find((s) => s.slug === 'krishi-bhagya');

      expect(pmKisan).toBeDefined();
      expect(isOfficialDomain(pmKisan!.sourceUrl)).toBe(true);
      expect(pmKisan!.sourceAccessDate).toBe('2026-11-23');

      expect(pmfby).toBeDefined();
      expect(isOfficialDomain(pmfby!.sourceUrl)).toBe(true);
      expect(pmfby!.watchFor).toContain('Check the cut-off date in your state\'s notification or on pmfby.gov.in');

      expect(raithaSiri).toBeDefined();
      expect(isOfficialDomain(raithaSiri!.sourceUrl)).toBe(true);
      expect(raithaSiri!.whatItGives).toContain('to be verified');

      expect(krishiBhagya).toBeDefined();
      expect(krishiBhagya!.watchFor).toContain('A pond needs space and a catchment');
      expect(krishiBhagya!.benefitAmount).toContain('to be verified');
    });

    it('demonstrates "review-due" status on Soil Health Card (>90 days old)', () => {
      const soil = SCHEMES_DATA.find((s) => s.slug === 'soil-health-card');
      expect(soil).toBeDefined();
      expect(calculateSchemeStatus(soil!, '2026-11-23')).toBe('review-due');
    });

    it('demonstrates "missing-source" status on draft scheme and blocks its publication', () => {
      const draft = SCHEMES_DATA.find((s) => s.slug === 'state-horticulture-development-draft');
      expect(draft).toBeDefined();
      expect(calculateSchemeStatus(draft!, '2026-11-23')).toBe('missing-source');

      const validation = validateSchemeForPublish({
        sourceUrl: draft!.sourceUrl,
        sourceAccessDate: draft!.sourceAccessDate,
        changeSummary: draft!.changeSummary,
      });
      expect(validation.canPublish).toBe(false);
    });
  });
});
