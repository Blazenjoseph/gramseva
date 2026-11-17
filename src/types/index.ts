export type Locale = 'en' | 'kn' | 'hi' | 'ta' | 'ml';

export interface Scheme {
  id: string;
  slug: string;
  title: string;
  department: string;
  state: 'karnataka' | 'central';
  badgeCategory: 'cash-benefit' | 'subsidy' | 'infrastructure' | 'identity';
  whatItGives: string;
  whoItIsFor: string;
  landSizeMinAcres?: number;
  landSizeMaxAcres?: number;
  eligibleCrops?: string[]; // e.g. ['ragi', 'millet', 'paddy', 'horticulture', 'all']
  requiresLandRecord: boolean;
  requiresFarmerId: boolean;
  requiresAadhaarBankLink: boolean;
  benefitAmount?: string;
  documentsNeeded: string[];
  whereToApply: {
    portalName: string;
    portalUrl: string;
    offlineOffice: string;
    helpline?: string;
  };
  watchFor: string;
  sourceUrl: string;
  lastVerifiedOn: string;
  verifiedBy: string;
  isHypothesis?: boolean; // When eligibility edge cases are hypothesized
  published: boolean;
  isMachineTranslated?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'payment-release' | 'deadline' | 'portal-update' | 'verification';
  schemeSlug?: string;
  publishedAt: string;
  lastVerifiedOn: string;
  sourceUrl: string;
  verifiedBy: string;
}

export interface HelpOffice {
  id: string;
  district: string;
  districtKannada?: string;
  officeName: string;
  address: string;
  pincode: string;
  workingHours: string;
  phone: string;
  email?: string;
  servicesProvided: string[];
  dataSourceNote: string;
}

export interface GlossaryItem {
  id: string;
  termKey: string;
  term: string; // in current locale
  englishEquivalent: string;
  simpleExplanation: string;
  whyItMatters: string;
  commonMistake: string;
}

export interface DocumentCheckItem {
  id: string;
  nameKey: string;
  name: string;
  purpose: string;
  status: 'ready' | 'needs-correction' | 'missing';
  notes?: string;
  issueTypes?: ('name-mismatch' | 'mobile-unlinked' | 'joint-ownership' | 'aadhaar-seeding-pending' | 'address-outdated')[];
}

export interface FinderCriteria {
  landSizeAcres: number | 'landless' | 'unknown';
  cropsGrown: string[];
  hasLandRecordInOwnName: 'yes' | 'no' | 'joint' | 'tenancy';
  hasFarmerId: 'yes' | 'no' | 'not-sure';
  hasAadhaarBankLinked: 'yes' | 'no' | 'not-sure';
  district: string;
  socialCategory?: 'general' | 'sc' | 'st' | 'obc' | 'prefer-not-to-say';
}

export interface SchemeMatchResult {
  scheme: Scheme;
  matchLevel: 'likely-eligible' | 'explore-with-conditions' | 'action-required-first';
  matchReasons: string[];
  actionRequired?: string[];
  isHypothesis: boolean;
}
