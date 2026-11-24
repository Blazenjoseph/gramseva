import { VerificationStatus } from '@/types';

/**
 * Validates if a URL is hosted on an official Indian government domain
 * Allowed domains: *.gov.in, gov.in, *.nic.in, nic.in, pib.gov.in, and official state department subdomains.
 */
export function isOfficialDomain(urlString: string): boolean {
  if (!urlString || typeof urlString !== 'string') return false;

  const trimmed = urlString.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();

    // Check for standard Indian government domains
    if (
      hostname === 'gov.in' ||
      hostname.endsWith('.gov.in') ||
      hostname === 'nic.in' ||
      hostname.endsWith('.nic.in')
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Calculates the automated verification status of a scheme record:
 * - 'missing-source': No official source URL provided.
 * - 'verified': Verified within the last 90 days with an official source URL.
 * - 'review-due': More than 90 days since last verification.
 */
export function calculateSchemeStatus(
  scheme: { lastVerifiedOn?: string; sourceUrl?: string },
  referenceDateStr: string = '2026-11-23'
): VerificationStatus {
  if (!scheme.sourceUrl || scheme.sourceUrl.trim() === '') {
    return 'missing-source';
  }

  if (!scheme.lastVerifiedOn) {
    return 'review-due';
  }

  const verifiedDate = new Date(scheme.lastVerifiedOn);
  const refDate = new Date(referenceDateStr);

  if (isNaN(verifiedDate.getTime()) || isNaN(refDate.getTime())) {
    return 'review-due';
  }

  const diffTime = refDate.getTime() - verifiedDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    // Verified on or after reference date
    return 'verified';
  }

  if (diffDays <= 90) {
    return 'verified';
  }

  return 'review-due';
}

/**
 * Publishing rules validator:
 * Publish is blocked unless:
 * 1. The source URL is on an official domain (gov.in, nic.in, state department).
 * 2. The source access date is filled in.
 * 3. The change summary is written.
 */
export function validateSchemeForPublish(draft: {
  sourceUrl?: string;
  sourceAccessDate?: string;
  changeSummary?: string;
}): { canPublish: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!draft.sourceUrl || draft.sourceUrl.trim() === '') {
    errors.push('Official source URL is required.');
  } else if (!isOfficialDomain(draft.sourceUrl)) {
    errors.push('Source URL must be on an official government domain (.gov.in or .nic.in).');
  }

  if (!draft.sourceAccessDate || draft.sourceAccessDate.trim() === '') {
    errors.push('Source access date is required.');
  }

  if (!draft.changeSummary || draft.changeSummary.trim().length < 5) {
    errors.push('A descriptive change summary (at least 5 characters) is required.');
  }

  return {
    canPublish: errors.length === 0,
    errors,
  };
}
