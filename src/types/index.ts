export type Locale = 'en' | 'kn' | 'hi' | 'ta' | 'ml' | 'te';

export type StateOrUT =
  | 'All India'
  | 'Andhra Pradesh'
  | 'Arunachal Pradesh'
  | 'Assam'
  | 'Bihar'
  | 'Chhattisgarh'
  | 'Goa'
  | 'Gujarat'
  | 'Haryana'
  | 'Himachal Pradesh'
  | 'Jharkhand'
  | 'Karnataka'
  | 'Kerala'
  | 'Madhya Pradesh'
  | 'Maharashtra'
  | 'Manipur'
  | 'Meghalaya'
  | 'Mizoram'
  | 'Nagaland'
  | 'Odisha'
  | 'Punjab'
  | 'Rajasthan'
  | 'Sikkim'
  | 'Tamil Nadu'
  | 'Telangana'
  | 'Tripura'
  | 'Uttar Pradesh'
  | 'Uttarakhand'
  | 'West Bengal'
  | 'Andaman and Nicobar Islands'
  | 'Chandigarh'
  | 'Dadra and Nagar Haveli and Daman and Diu'
  | 'Delhi'
  | 'Jammu and Kashmir'
  | 'Ladakh'
  | 'Lakshadweep'
  | 'Puducherry';

export type LandHoldingCategory =
  | 'marginal' // Up to 1 hectare (~2.5 acres)
  | 'small' // 1 to 2 hectares (~2.5 to 5 acres)
  | 'semi-medium' // 2 to 4 hectares (~5 to 10 acres)
  | 'medium' // 4 to 10 hectares (~10 to 25 acres)
  | 'large' // 10 hectares and above (~25+ acres)
  | 'landless'; // Agricultural laborer / Tenant cultivator

export type TenureType = 'owned' | 'leased' | 'shared';

export type CropCategory =
  | 'food-grains'
  | 'horticulture'
  | 'plantation'
  | 'livestock'
  | 'other';

export type ColorMode = 'field' | 'night' | 'monsoon' | 'harvest' | 'high-contrast';

export type VerificationStatus = 'verified' | 'review-due' | 'missing-source';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: 'SAVED_DRAFT' | 'PUBLISHED_SCHEME' | 'DELETED_SCHEME' | 'VERIFIED_SOURCE' | 'UPDATED_NEWS';
  oldValue?: string;
  newValue?: string;
  details: string;
}

export interface Scheme {
  id: string;
  slug: string;
  title: string;
  department: string;
  state: string; // 'central' | 'all-india' | state name
  badgeCategory: 'cash-benefit' | 'subsidy' | 'infrastructure' | 'identity' | 'credit' | 'input-support';
  whatItGives: string;
  whoItIsFor: string;
  holdingCategory?: LandHoldingCategory[];
  tenureTypeAllowed?: TenureType[];
  cropCategoriesAllowed?: CropCategory[];
  landSizeMinAcres?: number;
  landSizeMaxAcres?: number;
  eligibleCrops?: string[];
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
  sourceAccessDate?: string;
  lastVerifiedOn: string;
  verifiedBy: string;
  changeSummary?: string;
  isHypothesis?: boolean;
  isStateSpecificPlaceholder?: boolean;
  statePlaceholderTarget?: string;
  published: boolean;
  isMachineTranslated?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'payment-release' | 'deadline' | 'portal-update' | 'verification';
  schemeSlug?: string;
  state?: string;
  publishedAt: string;
  lastVerifiedOn: string;
  sourceUrl: string;
  verifiedBy: string;
  verificationNote?: string;
}

export interface HelpOffice {
  id: string;
  district: string;
  state: string;
  districtLocal?: string;
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
  term: string;
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
  state: StateOrUT;
  holdingCategory: LandHoldingCategory;
  tenureType: TenureType;
  cropCategory: CropCategory;
  hasFarmerId: 'yes' | 'no' | 'not-sure';
  hasLandRecordInOwnName: 'yes' | 'no' | 'joint';
  hasAadhaarBankLinked: 'yes' | 'no' | 'not-sure';
}

export interface SchemeMatchResult {
  scheme: Scheme;
  matchLevel: 'likely-eligible' | 'explore-with-conditions' | 'action-required-first';
  matchReasons: string[];
  actionRequired?: string[];
  isHypothesis: boolean;
  stateNotice?: string;
}
