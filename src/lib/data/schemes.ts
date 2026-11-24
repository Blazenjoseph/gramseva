import { Scheme, Locale } from '@/types';

export const SCHEMES_DATA: Scheme[] = [
  // 1. Nationwide Scheme: PM-KISAN
  {
    id: 'scheme-pm-kisan',
    slug: 'pm-kisan',
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    department: 'Department of Agriculture & Farmers Welfare, Ministry of Agriculture & Farmers Welfare, Government of India',
    state: 'all-india',
    badgeCategory: 'cash-benefit',
    whatItGives: '₹6,000 a year, paid as ₹2,000 in three instalments directly into the landholder farmer’s Aadhaar-linked bank account via Direct Benefit Transfer (DBT).',
    whoItIsFor: 'All cultivable landholding farmer families across India who possess cultivable land recorded in the farmer’s name in official state revenue records. Requires an Aadhaar-linked bank account and eKYC.',
    holdingCategory: ['marginal', 'small', 'semi-medium', 'medium', 'large'],
    tenureTypeAllowed: ['owned', 'shared'],
    cropCategoriesAllowed: ['food-grains', 'horticulture', 'plantation', 'other'],
    eligibleCrops: ['all'],
    requiresLandRecord: true,
    requiresFarmerId: false,
    requiresAadhaarBankLink: true,
    benefitAmount: '₹6,000 / year (3 instalments of ₹2,000)',
    documentsNeeded: [
      'Official Land Record / Record of Rights (RoR / Pahani / Khatauni) establishing ownership in farmer’s name',
      'Aadhaar card with active mobile number linked for mandatory eKYC',
      'Bank passbook or statement with active NPCI Aadhaar DBT mapping'
    ],
    whereToApply: {
      portalName: 'PM-KISAN Central Public Portal',
      portalUrl: 'https://pmkisan.gov.in',
      offlineOffice: 'Common Service Centre (CSC), state service kiosk (Grama One / MeeSeva / e-Mitra), or block / taluk agriculture office',
      helpline: '155261 / 011-24300606'
    },
    watchFor: 'Mismatched or outdated land records can cause exclusion. Check after any land change. Aadhaar seeding is different from opening a bank account with Aadhaar. The bank account must be actively linked on the NPCI mapper for Direct Benefit Transfer (DBT). If an instalment is held up, request the "NPCI Aadhaar DBT Seeding Form" at your bank branch.',
    sourceUrl: 'https://pmkisan.gov.in',
    sourceAccessDate: '2026-11-23',
    lastVerifiedOn: '2026-11-23',
    verifiedBy: 'National Agriculture Welfare Desk',
    changeSummary: 'Updated verified disbarment details and 24th instalment eligibility criteria.',
    isHypothesis: false,
    published: true,
  },

  // 2. Nationwide Scheme: PMFBY
  {
    id: 'scheme-pmfby',
    slug: 'pm-fasal-bima-yojana',
    title: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    department: 'Department of Agriculture & Farmers Welfare, Government of India / State Agriculture Departments',
    state: 'all-india',
    badgeCategory: 'subsidy',
    whatItGives: 'Comprehensive crop insurance against notified natural risks (drought, dry spells, flood, pest attack, localized post-harvest losses). Enrolment deadlines are set by each state, so do not show a fixed date.',
    whoItIsFor: 'All farmers, including owner cultivators, sharecroppers, and documented tenant cultivators growing notified crops in notified insurance units across participating states and union territories.',
    holdingCategory: ['marginal', 'small', 'semi-medium', 'medium', 'large', 'landless'],
    tenureTypeAllowed: ['owned', 'leased', 'shared'],
    cropCategoriesAllowed: ['food-grains', 'horticulture', 'plantation', 'other'],
    eligibleCrops: ['food-grains', 'oilseeds', 'commercial', 'horticulture'],
    requiresLandRecord: true,
    requiresFarmerId: false,
    requiresAadhaarBankLink: true,
    benefitAmount: 'Sum insured based on district scale of finance for notified natural risks',
    documentsNeeded: [
      'Record of Rights / Land Possession Certificate / Sowing Certificate issued by revenue authority',
      'Aadhaar card copy',
      'Active bank passbook copy showing IFSC and account number',
      'Crop sowing self-declaration or village accountant certification'
    ],
    whereToApply: {
      portalName: 'National Crop Insurance Portal (NCIP)',
      portalUrl: 'https://pmfby.gov.in',
      offlineOffice: 'Commercial bank branch, Regional Rural Bank (RRB), Primary Agricultural Credit Society (PACS), or nearest Common Service Centre (CSC)',
      helpline: '14447 / 1800-180-1551'
    },
    watchFor: 'Check the cut-off date in your state\'s notification or on pmfby.gov.in. Enrolment deadlines are set individually by each state. In the event of localized calamities, loss must be reported within 72 hours via the Crop Insurance App or designated helpline.',
    sourceUrl: 'https://pib.gov.in',
    sourceAccessDate: '2026-11-23',
    lastVerifiedOn: '2026-11-23',
    verifiedBy: 'National Crop Insurance Review Desk',
    changeSummary: 'Updated source to PIB 29 August 2026 release; clarified state-specific cut-off dates.',
    isHypothesis: false,
    published: true,
  },

  // 3. Nationwide Scheme: Kisan Credit Card (KCC)
  {
    id: 'scheme-kisan-credit-card',
    slug: 'kisan-credit-card',
    title: 'Kisan Credit Card (KCC) Scheme',
    department: 'Department of Financial Services, Ministry of Finance & Ministry of Agriculture & Farmers Welfare, Government of India',
    state: 'all-india',
    badgeCategory: 'credit',
    whatItGives: 'Institutional working capital credit for agricultural cultivation, post-harvest expenses, maintenance of farm assets, and allied activities (dairy, animal husbandry, fisheries). Carries an effective interest rate of 4% per annum (after 2% interest subvention and 3% prompt repayment incentive) for short-term crop loans up to ₹3,00,000.',
    whoItIsFor: 'All individual farmers, joint borrowers, tenant farmers, oral lessees, sharecroppers, and Self-Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers across all states and union territories in India.',
    holdingCategory: ['marginal', 'small', 'semi-medium', 'medium', 'large', 'landless'],
    tenureTypeAllowed: ['owned', 'leased', 'shared'],
    cropCategoriesAllowed: ['food-grains', 'horticulture', 'plantation', 'livestock', 'other'],
    eligibleCrops: ['all'],
    requiresLandRecord: false,
    requiresFarmerId: false,
    requiresAadhaarBankLink: true,
    benefitAmount: 'Concessional credit limit up to ₹3,00,000 at 4% effective interest per annum',
    documentsNeeded: [
      'Duly completed KCC application form',
      'Identity and address proof (Aadhaar card / Voter ID)',
      'Land revenue document (RoR / Passbook) or copy of tenancy agreement / JLG undertaking',
      'Passport size photograph'
    ],
    whereToApply: {
      portalName: 'JanSamarth National Credit Portal',
      portalUrl: 'https://www.jansamarth.in',
      offlineOffice: 'Any Public Sector Commercial Bank, Regional Rural Bank (RRB), or Cooperative Bank branch',
      helpline: '1800-11-5526'
    },
    watchFor: 'Timely repayment is mandatory to qualify for the 3% Prompt Repayment Incentive (PRI). Delayed repayment converts the loan to standard non-subsidized commercial bank interest rates.',
    sourceUrl: 'https://agricoop.nic.in',
    sourceAccessDate: '2026-11-23',
    lastVerifiedOn: '2026-11-23',
    verifiedBy: 'Agricultural Credit Review Cell',
    changeSummary: 'Verified operational parameters against RBI and DFS guidelines.',
    isHypothesis: false,
    published: true,
  },

  // 4. Nationwide Scheme: Soil Health Card Scheme (Review due: >90 days)
  {
    id: 'scheme-soil-health-card',
    slug: 'soil-health-card',
    title: 'Soil Health Card Scheme',
    department: 'Department of Agriculture & Farmers Welfare, Ministry of Agriculture & Farmers Welfare, Government of India',
    state: 'all-india',
    badgeCategory: 'input-support',
    whatItGives: 'Free comprehensive scientific assessment of soil nutrient status (12 parameters: N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) issued every two years, with customized dosage advisories for fertilizers and organic soil amendments based on planned crops.',
    whoItIsFor: 'All agricultural landholders across all states and union territories in India.',
    holdingCategory: ['marginal', 'small', 'semi-medium', 'medium', 'large'],
    tenureTypeAllowed: ['owned', 'leased', 'shared'],
    cropCategoriesAllowed: ['food-grains', 'horticulture', 'plantation', 'other'],
    eligibleCrops: ['all'],
    requiresLandRecord: true,
    requiresFarmerId: false,
    requiresAadhaarBankLink: false,
    benefitAmount: 'Free soil testing diagnostic report and customized fertilizer guidance',
    documentsNeeded: [
      'Land revenue survey record copy showing survey number and plot boundaries',
      'Farmer contact number and identification document'
    ],
    whereToApply: {
      portalName: 'National Soil Health Card Portal',
      portalUrl: 'https://soilhealth.dac.gov.in',
      offlineOffice: 'Nearest Soil Testing Laboratory (STL), Krishi Vigyan Kendra (KVK), or Block Agriculture Office',
      helpline: '1800-180-1551'
    },
    watchFor: 'Soil sampling should ideally be conducted post-harvest and prior to field preparation for the next cropping season. Do not collect samples from field bunds or compost heaps.',
    sourceUrl: 'https://soilhealth.dac.gov.in',
    sourceAccessDate: '2026-06-15',
    lastVerifiedOn: '2026-06-15', // More than 90 days ago from 2026-11-23 -> Status: review-due
    verifiedBy: 'Soil Resource & Diagnostics Unit',
    changeSummary: 'Cycle 3 guidelines verification record.',
    isHypothesis: false,
    published: true,
  },

  // 5. State Scheme (Karnataka): Raitha Siri
  {
    id: 'scheme-raitha-siri',
    slug: 'raitha-siri',
    title: 'Raitha Siri Scheme (ರೈತ ಸಿರಿ ಯೋಜನೆ)',
    department: 'Department of Agriculture, Government of Karnataka',
    state: 'Karnataka',
    badgeCategory: 'subsidy',
    whatItGives: '₹10,000 per hectare for minor-millet growers, Agriculture Department, per the Karnataka Budget 2026-27. Minimum-land rule and the portal link are marked as to be verified.',
    whoItIsFor: 'Farmers cultivating minor millets (Ragi, Navane, Same, Haraka, Oodalu, Baragu) in Karnataka. Minimum land holding rule is to be verified from final notification.',
    holdingCategory: ['marginal', 'small', 'semi-medium', 'medium'],
    tenureTypeAllowed: ['owned', 'shared'],
    cropCategoriesAllowed: ['food-grains'],
    eligibleCrops: ['ragi', 'millet', 'millets', 'navane', 'same', 'haraka'],
    requiresLandRecord: true,
    requiresFarmerId: true, // FRUITS FID mandatory
    requiresAadhaarBankLink: true,
    benefitAmount: '₹10,000 per hectare (minimum-land rule: to be verified)',
    documentsNeeded: [
      'Karnataka FRUITS Farmer ID (FID) registration slip',
      'Current season RTC (Pahani) reflecting verified millet cultivation in Bele Samikshe (Crop Survey)',
      'Aadhaar card linked to NPCI bank account mapper'
    ],
    whereToApply: {
      portalName: 'Karnataka Agriculture Portal (portal link: to be verified)',
      portalUrl: 'https://finance.karnataka.gov.in',
      offlineOffice: 'Raitha Samparka Kendra (RSK) at Hobli level',
      helpline: '1800-425-3553'
    },
    watchFor: 'Karnataka Budget 2026-27 provides ₹10,000/ha assistance. Minimum-land rule and direct application portal link are marked as to be verified against the detailed departmental order. Crop details must be recorded in Bele Samikshe.',
    sourceUrl: 'https://finance.karnataka.gov.in',
    sourceAccessDate: '2026-11-23',
    lastVerifiedOn: '2026-11-23',
    verifiedBy: 'Karnataka State Agriculture Audit Desk',
    changeSummary: 'Updated allocation and entitlement per Karnataka Budget 2026-27; marked minimum-land rule and portal link as to be verified.',
    isHypothesis: false,
    published: true,
  },

  // 6. State Scheme (Karnataka): Krishi Bhagya
  {
    id: 'scheme-krishi-bhagya',
    slug: 'krishi-bhagya',
    title: 'Krishi Bhagya Scheme (ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ)',
    department: 'Watershed Development & Agriculture Department, Government of Karnataka',
    state: 'Karnataka',
    badgeCategory: 'infrastructure',
    whatItGives: 'Subsidised farm ponds and support for rainfed farmers, relaunched in the 2023-24 state budget. Assistance packages include farm pond (Krishi Honda) construction and polythene lining. Specific subsidy amounts and slab percentages are marked as to be verified.',
    whoItIsFor: 'Farmers with cultivable rainfed agricultural land in notified dryland and drought-prone taluks across Karnataka.',
    holdingCategory: ['marginal', 'small', 'semi-medium', 'medium'],
    tenureTypeAllowed: ['owned', 'shared'],
    cropCategoriesAllowed: ['food-grains', 'horticulture', 'other'],
    eligibleCrops: ['all'],
    requiresLandRecord: true,
    requiresFarmerId: true,
    requiresAadhaarBankLink: true,
    benefitAmount: 'Subsidised farm pond and lining package (amounts: to be verified)',
    documentsNeeded: [
      'Latest computerised RTC (Pahani) showing dryland classification',
      'FRUITS Farmer Registration Number (FID)',
      'Bank passbook copy showing IFSC and account number',
      'Caste Certificate (RD number from Nadakacheri) if applying under affirmative action slab'
    ],
    whereToApply: {
      portalName: 'Raita Mitra Karnataka Scheme Desk',
      portalUrl: 'https://raitamitra.karnataka.gov.in',
      offlineOffice: 'Office of the Assistant Director of Agriculture (ADA) or Hobli RSK',
      helpline: '080-22212804'
    },
    watchFor: 'A pond needs space and a catchment on the farmer\'s own land. Do not commence excavation before receiving the official Work Order. Specific subsidy amounts are marked as to be verified.',
    sourceUrl: 'https://raitamitra.karnataka.gov.in',
    sourceAccessDate: '2026-11-23',
    lastVerifiedOn: '2026-11-23',
    verifiedBy: 'Karnataka State Agriculture Audit Desk',
    changeSummary: 'Updated requirements emphasizing pond space and catchment; marked subsidy amounts as to be verified.',
    isHypothesis: false,
    published: true,
  },

  // 7. State Scheme (Karnataka): FRUITS Farmer ID
  {
    id: 'scheme-fruits-id',
    slug: 'fruits-farmer-id',
    title: 'FRUITS Farmer ID (Karnataka Farmer Registry)',
    department: 'Department of e-Governance & Department of Agriculture, Government of Karnataka',
    state: 'Karnataka',
    badgeCategory: 'identity',
    whatItGives: 'One-time registration giving a unique Farmer ID (FID) linked to land data, mandatory for departmental benefits. Links Bhoomi land records, bank accounts, and Aadhaar into a unified registry profile. Verification operational details: to be verified.',
    whoItIsFor: 'Every farmer cultivating land within the state of Karnataka seeking state subsidies, minimum support price (MSP) procurement, or disaster compensation. Operational verification: to be verified.',
    holdingCategory: ['marginal', 'small', 'semi-medium', 'medium', 'large'],
    tenureTypeAllowed: ['owned', 'leased', 'shared'],
    cropCategoriesAllowed: ['food-grains', 'horticulture', 'plantation', 'livestock', 'other'],
    eligibleCrops: ['all'],
    requiresLandRecord: true,
    requiresFarmerId: false,
    requiresAadhaarBankLink: true,
    benefitAmount: 'Mandatory single-window digital identity for all Karnataka agricultural benefits',
    documentsNeeded: [
      'Aadhaar card of the landholder',
      'Bhoomi RTC (Pahani) copy showing survey number and hissa',
      'Bank passbook copy showing IFSC and account details',
      'Active mobile number for OTP confirmation'
    ],
    whereToApply: {
      portalName: 'FRUITS Citizen Portal',
      portalUrl: 'https://fruits.karnataka.gov.in',
      offlineOffice: 'Grama One Centre, Bangalore One, Karnataka One, or nearest Hobli RSK',
      helpline: '080-22370281'
    },
    watchFor: 'One-time registration mandatory for departmental benefits. If the name on your Aadhaar card differs slightly from Bhoomi RTC, automated linking fails. Details marked as to be verified against latest circular.',
    sourceUrl: 'https://fruits.karnataka.gov.in',
    sourceAccessDate: '2026-11-23',
    lastVerifiedOn: '2026-11-23',
    verifiedBy: 'Government of Karnataka e-Governance',
    changeSummary: 'Documented as mandatory departmental ID from Government of Karnataka e-Governance; marked to be verified.',
    isHypothesis: false,
    published: true,
  },

  // 8. Draft / Unverified Scheme (Missing source: sourceUrl is empty -> Blocks publishing)
  {
    id: 'scheme-draft-state-horticulture',
    slug: 'state-horticulture-development-draft',
    title: 'State Integrated Horticulture Development Support (Draft)',
    department: 'State Horticulture Mission',
    state: 'Karnataka',
    badgeCategory: 'subsidy',
    whatItGives: 'Proposed drip irrigation and polyhouse assistance for small-scale fruit and vegetable growers. Awaiting official circular citation.',
    whoItIsFor: 'Farmers cultivating horticultural crops in designated clusters.',
    holdingCategory: ['marginal', 'small'],
    tenureTypeAllowed: ['owned'],
    cropCategoriesAllowed: ['horticulture'],
    eligibleCrops: ['horticulture', 'vegetables', 'fruits'],
    requiresLandRecord: true,
    requiresFarmerId: true,
    requiresAadhaarBankLink: true,
    benefitAmount: 'Draft proposal under review',
    documentsNeeded: [
      'RTC (Pahani) with horticulture crop record',
      'Aadhaar identification card'
    ],
    whereToApply: {
      portalName: 'State Horticulture Department',
      portalUrl: 'https://karnataka.gov.in',
      offlineOffice: 'District Senior Assistant Director of Horticulture',
      helpline: '080-22212804'
    },
    watchFor: 'Draft scheme record. Source URL has not been officially confirmed. Publishing is blocked until an official government source is validated.',
    sourceUrl: '', // Missing source URL -> triggers 'missing-source' status
    sourceAccessDate: '',
    lastVerifiedOn: '',
    verifiedBy: 'Pending Editorial Assignment',
    changeSummary: '',
    isHypothesis: true,
    published: false,
  },

  // 9. State Scheme Placeholder: Andhra Pradesh
  {
    id: 'scheme-ap-state-placeholder',
    slug: 'ap-state-agriculture-scheme',
    title: 'State Scheme: details to be verified for Andhra Pradesh',
    department: 'Department of Agriculture, Government of Andhra Pradesh',
    state: 'Andhra Pradesh',
    badgeCategory: 'cash-benefit',
    whatItGives: 'State agricultural investment and input assistance scheme administered by the Government of Andhra Pradesh through Rythu Bharosa Kendrams (RBKs). Details, criteria, and operational guidelines are undergoing audit against the current state gazette.',
    whoItIsFor: 'Farmers, landholders, and documented tenant cultivators holding eligible agricultural land in Andhra Pradesh.',
    holdingCategory: ['marginal', 'small', 'semi-medium', 'medium'],
    tenureTypeAllowed: ['owned', 'leased', 'shared'],
    cropCategoriesAllowed: ['food-grains', 'horticulture', 'plantation', 'other'],
    eligibleCrops: ['all'],
    requiresLandRecord: true,
    requiresFarmerId: true,
    requiresAadhaarBankLink: true,
    benefitAmount: 'State agricultural support (Exact entitlement to be verified from official government order)',
    documentsNeeded: [
      'Pattadar Passbook / 1B Revenue Record copy',
      'Aadhaar card with linked mobile number',
      'e-Crop booking registration receipt',
      'Bank passbook with active NPCI DBT mapping'
    ],
    whereToApply: {
      portalName: 'Andhra Pradesh Agriculture Portal (AP AGRISNET)',
      portalUrl: 'https://apagrisnet.gov.in',
      offlineOffice: 'Nearest Village Rythu Bharosa Kendram (RBK) or Mandal Agricultural Officer (MAO) office',
      helpline: '1902'
    },
    watchFor: 'State scheme details are currently documented as placeholders pending official notification audit. Confirm current season guidelines at your village RBK.',
    sourceUrl: 'https://apagrisnet.gov.in',
    sourceAccessDate: '2026-11-23',
    lastVerifiedOn: '2026-11-23',
    verifiedBy: 'State Scheme Verification Desk',
    changeSummary: 'Maintained placeholder pending state gazette publication.',
    isHypothesis: true,
    isStateSpecificPlaceholder: true,
    statePlaceholderTarget: 'Andhra Pradesh',
    published: true,
  },

  // 10. State Scheme Placeholder: Telangana
  {
    id: 'scheme-tg-state-placeholder',
    slug: 'telangana-state-agriculture-scheme',
    title: 'State Scheme: details to be verified for Telangana',
    department: 'Department of Agriculture, Government of Telangana',
    state: 'Telangana',
    badgeCategory: 'cash-benefit',
    whatItGives: 'State agricultural investment support and farmer welfare programs administered by the Department of Agriculture, Government of Telangana. Operational guidelines and seasonal disbursal criteria are undergoing verification against published state circulars.',
    whoItIsFor: 'Landholding farmers cultivating notified crops in eligible revenue villages of Telangana.',
    holdingCategory: ['marginal', 'small', 'semi-medium', 'medium', 'large'],
    tenureTypeAllowed: ['owned', 'shared'],
    cropCategoriesAllowed: ['food-grains', 'horticulture', 'plantation', 'other'],
    eligibleCrops: ['all'],
    requiresLandRecord: true,
    requiresFarmerId: false,
    requiresAadhaarBankLink: true,
    benefitAmount: 'State investment assistance (Exact amount to be verified from official government order)',
    documentsNeeded: [
      'Dharani Integrated Land Records Management Pattadar Passbook',
      'Aadhaar card of pattadar',
      'Bank passbook copy with NPCI DBT seeding'
    ],
    whereToApply: {
      portalName: 'Telangana Agriculture Department Portal',
      portalUrl: 'https://agri.telangana.gov.in',
      offlineOffice: 'Nearest Rythu Vedika or Mandal Agriculture Office',
      helpline: '1800-425-3553'
    },
    watchFor: 'State scheme details are recorded as placeholders pending formal gazette audit. Verify seasonal terms with your local Agriculture Extension Officer (AEO).',
    sourceUrl: 'https://agri.telangana.gov.in',
    sourceAccessDate: '2026-11-23',
    lastVerifiedOn: '2026-11-23',
    verifiedBy: 'State Scheme Verification Desk',
    changeSummary: 'Maintained placeholder pending state gazette publication.',
    isHypothesis: true,
    isStateSpecificPlaceholder: true,
    statePlaceholderTarget: 'Telangana',
    published: true,
  },

  // 11. Generic State Scheme Placeholder for other states
  {
    id: 'scheme-other-state-placeholder',
    slug: 'state-scheme-placeholder',
    title: 'State Scheme: details to be verified for selected state',
    department: 'State Department of Agriculture',
    state: 'Other States',
    badgeCategory: 'subsidy',
    whatItGives: 'State-specific agricultural welfare programs (input subsidies, farm machinery hiring, local irrigation incentives) administered by the respective State Department of Agriculture. Details remain as placeholders until confirmed from official state government orders.',
    whoItIsFor: 'Agricultural households and landholders registered with their state department of agriculture.',
    holdingCategory: ['marginal', 'small', 'semi-medium', 'medium', 'large', 'landless'],
    tenureTypeAllowed: ['owned', 'leased', 'shared'],
    cropCategoriesAllowed: ['food-grains', 'horticulture', 'plantation', 'livestock', 'other'],
    eligibleCrops: ['all'],
    requiresLandRecord: true,
    requiresFarmerId: false,
    requiresAadhaarBankLink: true,
    benefitAmount: 'Subject to annual state budgetary allocations',
    documentsNeeded: [
      'State revenue land record / Record of Rights (RoR)',
      'Aadhaar card',
      'Bank passbook copy'
    ],
    whereToApply: {
      portalName: 'National State Portal Directory',
      portalUrl: 'https://www.india.gov.in',
      offlineOffice: 'Block / Taluk Agriculture Office or District Agriculture Officer (DAO)',
      helpline: '1800-180-1551'
    },
    watchFor: 'Do not rely on unverified intermediary claims. State scheme parameters must be confirmed directly at the block agriculture office.',
    sourceUrl: 'https://agricoop.nic.in',
    sourceAccessDate: '2026-11-23',
    lastVerifiedOn: '2026-11-23',
    verifiedBy: 'State Scheme Verification Desk',
    changeSummary: 'Maintained placeholder pending state-by-state gazette verification.',
    isHypothesis: true,
    isStateSpecificPlaceholder: true,
    statePlaceholderTarget: 'State placeholder',
    published: true,
  }
];

export const SCHEME_TRANSLATIONS: Record<string, Record<Locale, Partial<Scheme>>> = {
  'pm-kisan': {
    en: {
      title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      whatItGives: '₹6,000 per year direct income support in 3 equal instalments of ₹2,000 via DBT into Aadhaar-seeded bank accounts.',
      whoItIsFor: 'All cultivable landholding farmer families across India with land records in their names.',
      watchFor: 'Bank account must be seeded with Aadhaar on the NPCI DBT mapper, not just standard KYC.',
    },
    kn: {
      title: 'ಪಿಎಂ-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-KISAN)',
      whatItGives: 'ವರ್ಷಕ್ಕೆ ₹೬,೦೦೦ ನೇರ ನಗದು ನೆರವು. ತಲಾ ₹೨,೦೦೦ ದಂತೆ ೩ ಕಂತುಗಳಲ್ಲಿ ರೈತರ ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರ ಜಮೆ.',
      whoItIsFor: 'ತಮ್ಮ ಸ್ವಂತ ಹೆಸರಿನಲ್ಲಿ ಕೃಷಿ ಭೂಮಿಯ ಪಹಣಿ ಹೊಂದಿರುವ ಭಾರತದ ಎಲ್ಲಾ ರೈತ ಕುಟುಂಬಗಳು.',
      watchFor: 'ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಕೇವಲ ಆಧಾರ್ ನೀಡಿದರೆ ಸಾಲದು, ಎನ್‌ಪಿಸಿಐ (NPCI) ಡಿಬಿಟಿ ಸೀಡಿಂಗ್ ಕಡ್ಡಾಯವಾಗಿ ಆಗಿರಬೇಕು.',
    },
    hi: {
      title: 'पीएम-किसान सम्मान निधि (PM-KISAN)',
      whatItGives: '₹6,000 प्रति वर्ष की सीधी आय सहायता, 3 समान किस्तों में ₹2,000 सीधे आधार-सीडेड बैंक खाते में।',
      whoItIsFor: 'भारत भर के वे सभी किसान परिवार जिनके नाम पर आधिकारिक राजस्व रिकॉर्ड में कृषि योग्य भूमि है।',
      watchFor: 'बैंक खाते में एनपीसीआई डीबीटी मैपर पर आधार सीडिंग होना अनिवार्य है, केवल साधारण ई-केवाईसी पर्याप्त नहीं।',
    },
    ta: {
      title: 'பிஎம்-கிசான் சம்மான் நிதி (PM-KISAN)',
      whatItGives: 'ஆண்டுக்கு ₹6,000 நேரடி வருமான ஆதரவு, 3 தவணைகளில் தலா ₹2,000 நேரடியாக வங்கி கணக்கில் செலுத்தப்படும்.',
      whoItIsFor: 'சொந்த பெயரில் சாகுபடி நிலம் வைத்துள்ள இந்தியா முழுவதிலுமுள்ள அனைத்து விவசாய குடும்பங்கள்.',
      watchFor: 'வங்கி கணக்கில் NPCI ஆதார் DBT இணைப்பு உறுதி செய்யப்பட வேண்டும்.',
    },
    ml: {
      title: 'പിഎം-കിസാൻ സമ്മാൻ നിധി (PM-KISAN)',
      whatItGives: 'പ്രതിവർഷം ₹6,000 നേരിട്ടുള്ള വരുമാന സഹായം, മൂന്ന് തുല്യ ഗഡുക്കളായി കർഷകരുടെ ബാങ്ക് അക്കൗണ്ടിലേക്ക്.',
      whoItIsFor: 'സ്വന്തം പേരിൽ കൃഷിഭൂമിയുള്ള ഇന്ത്യയിലെ എല്ലാ കർഷക കുടുംബങ്ങളും.',
      watchFor: 'ബാങ്ക് അക്കൗണ്ടിൽ NPCI ആധാർ DBT സീഡിംഗ് പൂർത്തിയായിരിക്കണം.',
    },
    te: {
      title: 'పీఎం-కిసాన్ సమ్మాన్ నిధి (PM-KISAN)',
      whatItGives: 'సంవత్సరానికి ₹6,000 ప్రత్యక్ష ఆదాయ సహాయం, 3 సమాన వాయిదాలలో ₹2,000 చొప్పున నేరుగా ఆధార్ అనుసంధాన బ్యాంక్ ఖాతాలో జమ.',
      whoItIsFor: 'భారతదేశం అంతటా తమ పేరిట అధికారిక వ్యవసాయ భూమి రికార్డులు కలిగిన అన్ని రైతు కుటుంబాలు.',
      watchFor: 'బ్యాంక్ ఖాతాలో NPCI డీబీటీ మ్యాపర్‌లో ఆధార్ సీడింగ్ పూర్తి కావడం తప్పనిసరి.',
    },
  },

  'pm-fasal-bima-yojana': {
    en: {
      title: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
      whatItGives: 'Comprehensive crop insurance against drought, dry spells, pests, with farmer paying only 2% premium for Kharif and 1.5% for Rabi.',
      whoItIsFor: 'All farmers cultivating notified crops in notified insurance units across India.',
      watchFor: 'Strict seasonal cut-off dates apply; localized crop damage must be reported within 72 hours.',
    },
    kn: {
      title: 'ಪ್ರಧಾನಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (PMFBY)',
      whatItGives: 'ಬರ, ಅನಾವೃಷ್ಟಿ, ಕೀಟಬಾಧೆಯಿಂದ ಬೆಳೆ ಹಾನಿಯಾದರೆ ಸಮಗ್ರ ವಿಮಾ ಪರಿಹಾರ. ರೈತರು ಖಾರಿಫ್‌ಗೆ ೨% ಮತ್ತು ರಬಿಗೆ ೧.೫% ಮಾತ್ರ ಪ್ರೀಮಿಯಂ ಪಾವತಿಸಬೇಕು.',
      whoItIsFor: 'ಅಧಿಸೂಚಿತ ಪ್ರದೇಶದಲ್ಲಿ ಬೆಳೆ ಬೆಳೆಯುವ ಭಾರತದ ಎಲ್ಲಾ ರೈತರು.',
      watchFor: 'ಕಟ್ಟುನಿಟ್ಟಿನ ಕೊನೆಯ ದಿನಾಂಕಗಳು ಅನ್ವಯಿಸುತ್ತವೆ; ಬೆಳೆ ಹಾನಿಯಾದರೆ ೭೨ ಗಂಟೆಗಳ ಒಳಗೆ ದೂರು ದಾಖಲಿಸಬೇಕು.',
    },
    hi: {
      title: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
      whatItGives: 'सूखे, बाढ़ व कीट प्रकोप से फसल क्षति पर व्यापक बीमा सुरक्षा। किसान को खरीफ में केवल 2% व रबी में 1.5% प्रीमियम देना होता है।',
      whoItIsFor: 'अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले भारत भर के सभी किसान।',
      watchFor: 'मौસਮੀ समय सीमाएं अनिवार्य हैं; फसल क्षति की सूचना 72 घंटे में देना अनिवार्य है।',
    },
    ta: {
      title: 'பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)',
      whatItGives: 'வறட்சி மற்றும் பூச்சித் தாக்குதலால் ஏற்படும் சேதத்திற்கு காப்பீடு. காரீஃப் பயிருக்கு 2% மற்றும் ரபிக்கு 1.5% மட்டுமே பிரீமியம்.',
      whoItIsFor: 'அறிவிக்கப்பட்ட பகுதிகளில் பயிரிடும் அனைத்து இந்திய விவசாயிகளும்.',
      watchFor: 'பருவகால இறுதி தேதிகள் பொருந்தும்; சேதம் ஏற்பட்டால் 72 மணி நேரத்திற்குள் தெரிவிக்க வேண்டும்.',
    },
    ml: {
      title: 'പ്രധാനമന്ത്രി ഫസൽ ബീമാ യോജന (PMFBY)',
      whatItGives: 'വരൾച്ച, കീടബാധ എന്നിവയിൽ നിന്നുള്ള സമഗ്ര വിള ഇൻഷുറൻസ് സംരക്ഷണം. കർഷകർ ഖാരിഫ് വിളകൾക്ക് 2% പ്രീമിയം നൽകിയാൽ മതി.',
      whoItIsFor: 'വിജ്ഞാപനം ചെയ്ത പ്രദേശങ്ങളിൽ കൃഷി ചെയ്യുന്ന ഇന്ത്യയിലെ എല്ലാ കർഷകർക്കും.',
      watchFor: 'നിശ്ചിത സമയപരിധി കർശനമാണ്; വിളനാശമുണ്ടായാൽ 72 മണിക്കൂറിനകം റിപ്പോർട്ട് ചെയ്യണം.',
    },
    te: {
      title: 'ప్రధానమంత్రి ఫసల్ బీమా యోజన (PMFBY)',
      whatItGives: 'కరువు, తెగుళ్లు, వర్షాభావం వల్ల పంట నష్టం జరిగితే సమగ్ర బీమా రక్షణ. ఖరీఫ్ పంటలకు 2%, రబీకి 1.5% నామమాత్రపు ప్రీమియం.',
      whoItIsFor: 'నోటిఫై చేసిన ప్రాంతాల్లో పంటలు సాగు చేసే దేశవ్యాప్త రైతులందరికీ వర్తిస్తుంది.',
      watchFor: 'గడువు తేదీలు ఖచ్చితంగా పాటించాలి; పంట నష్టం జరిగిన 72 గంటల్లోగా ఫిర్యాదు నమోదు చేయాలి.',
    },
  },

  'kisan-credit-card': {
    en: {
      title: 'Kisan Credit Card (KCC) Scheme',
      whatItGives: 'Institutional working capital credit up to ₹3,00,000 at 4% effective interest per annum for cultivation and animal husbandry.',
      whoItIsFor: 'All farmers, joint borrowers, tenant cultivators, and sharecroppers across India.',
      watchFor: 'Prompt repayment within due date is required to secure the 3% interest incentive.',
    },
    kn: {
      title: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (KCC) ಯೋಜನೆ',
      whatItGives: 'ಶೇಕಡಾ ೪ ರ ರಿಯಾಯಿತಿ ಬಡ್ಡಿದರದಲ್ಲಿ ₹೩,೦೦,೦೦೦ ವರೆಗೆ ಕೃಷಿ ಹಾಗೂ ಪಶುಸಂಗೋಪನಾ ಸಾಲ ಸೌಲಭ್ಯ.',
      whoItIsFor: 'ಭಾರತದ ಎಲ್ಲಾ ರೈತರು, ಜಂಟಿ ಸಾಲಗಾರರು ಮತ್ತು ಗೇಣಿದಾರರು.',
      watchFor: 'ಸಕಾಲದಲ್ಲಿ ಮರುಪಾವತಿ ಮಾಡಿದರೆ ಮಾತ್ರ ಶೇಕಡಾ ೩ ರ ಬಡ್ಡಿ ರಿಯಾಯಿತಿ ದೊರೆಯುತ್ತದೆ.',
    },
    hi: {
      title: 'किसान क्रेडिट कार्ड (KCC) योजना',
      whatItGives: 'कृषि और पशुपालन हेतु 4% की प्रभावी ब्याज दर पर ₹3,00,000 तक का रियायती संस्थागत ऋण।',
      whoItIsFor: 'भारत भर के सभी किसान, संयुक्त ऋणी, बटाईदार और काश्तकार।',
      watchFor: '3% ब्याज छूट का लाभ लेने के लिए निर्धारित समय पर ऋण चुकाना अनिवार्य है।',
    },
    ta: {
      title: 'கிசான் கிரெடிட் கார்டு (KCC) திட்டம்',
      whatItGives: 'பயிர் சாகுபடி மற்றும் கால்நடை பராமரிப்பிற்கு 4% வட்டி விகிதத்தில் ரூ.3,00,000 வரை கடன் உதவி.',
      whoItIsFor: 'இந்தியா முழுவதிலும் உள்ள அனைத்து விவசாயிகள் மற்றும் குத்தகைதாரர்கள்.',
      watchFor: '3% வட்டி சலுகை பெற உரிய தேதிக்குள் கடனை திருப்பிச் செலுத்துவது அவசியம்.',
    },
    ml: {
      title: 'കിസാൻ ക്രെഡിറ്റ് കാർഡ് (KCC) പദ്ധതി',
      whatItGives: '4% പലിശ നിരക്കിൽ ₹3,00,000 വരെ കാർഷിക, മൃഗസംരക്ഷണ വായ്പാ സഹായം.',
      whoItIsFor: 'ഇന്ത്യയിലെ എല്ലാ കർഷകരും പങ്കാളിത്ത കൃഷിക്കാരും പാട്ടക്കർഷകരും.',
      watchFor: '3% പലിശ ഇളവ് ലഭിക്കാൻ കൃത്യസമയത്ത് വായ്പ തിരിച്ചടയ്ക്കണം.',
    },
    te: {
      title: 'కిసాన్ క్రెడిట్ కార్డు (KCC) పథకం',
      whatItGives: 'సాగు మరియు పశుపోషణ ఖర్చుల కోసం 4% రాయితీ వడ్డీ రేటుతో ₹3,00,000 వరకు సంస్థాగత రుణ సదుపాయం.',
      whoItIsFor: 'భారతదేశం అంతటా స్వంత రైతులు, ఉమ్మడి రైతులు, కౌలుదారులు మరియు భాగస్వామ్య సాగుదారులు.',
      watchFor: '3% వడ్డీ ప్రోత్సాహకం పొందడానికి గడువు తేదీలోగా రుణం తిరిగి చెల్లించాలి.',
    },
  },

  'soil-health-card': {
    en: {
      title: 'Soil Health Card Scheme',
      whatItGives: 'Free scientific assessment of 12 soil nutrient parameters issued every two years with crop-specific fertilizer recommendations.',
      whoItIsFor: 'All agricultural landholders in all states and union territories.',
      watchFor: 'Soil sampling should be conducted post-harvest and before land tilling for the next season.',
    },
    kn: {
      title: 'ಸಾಯಿಲ್ ಹೆಲ್ತ್ ಕಾರ್ಡ್ (ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್) ಯೋಜನೆ',
      whatItGives: 'ಪ್ರತಿ ಎರಡು ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಮಣ್ಣಿನ ೧೨ ಪೋಷಕಾಂಶಗಳ ಉಚಿತ ವೈಜ್ಞಾನಿಕ ಪರೀಕ್ಷಾ ವರದಿ ಮತ್ತು ಗೊಬ್ಬರ ಶಿಫಾರಸು.',
      whoItIsFor: 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳ ಕೃಷಿ ಭೂಮಾಲೀಕರು.',
      watchFor: 'ಬೆಳೆ ಕಟಾವಿನ ನಂತರ ಮತ್ತು ಮುಂದಿನ ಬಿತ್ತನೆಗೆ ಭೂಮಿ ಸಿದ್ಧಪಡಿಸುವ ಮೊದಲು ಮಾದರಿ ಸಂಗ್ರಹಿಸಬೇಕು.',
    },
    hi: {
      title: 'मृदा स्वास्थ्य कार्ड (Soil Health Card) योजना',
      whatItGives: 'हर दो साल में 12 पोषक तत्वों की मुफ्त वैज्ञानिक जांच रिपोर्ट और फसलवार उर्वरक अनुशंसा।',
      whoItIsFor: 'सभी राज्यों के सभी कृषि भूमिधारक किसान।',
      watchFor: 'मिट्टी के नमूने फसल कटाई के बाद और नई बुवाई से पहले ही लिए जाने चाहिए।',
    },
    ta: {
      title: 'மண் வள அட்டை திட்டம் (Soil Health Card)',
      whatItGives: 'இரண்டு ஆண்டுகளுக்கு ஒருமுறை 12 மண் ஊட்டச்சத்து அளவுருக்கள் குறித்த இலவச அறிவியல் அறிக்கை.',
      whoItIsFor: 'அனைத்து மாநிலங்களிலும் உள்ள நில உரிமையாளர்கள்.',
      watchFor: 'அறுவடை முடிந்த பிறகும் புதிய உழவுக்கு முன்பும் மண் மாதிரி எடுக்கப்பட வேண்டும்.',
    },
    ml: {
      title: 'സോയിൽ ഹെൽത്ത് കാർഡ് (മണ്ണ് ആരോഗ്യ കാർഡ്) പദ്ധതി',
      whatItGives: 'രണ്ട് വർഷത്തിലൊരിക്കൽ 12 പോഷക ഘടകങ്ങൾ പരിശോധിച്ച സൗജന്യ ശാസ്ത്രീയ റിപ്പോർട്ട്.',
      whoItIsFor: 'എല്ലാ സംസ്ഥാനങ്ങളിലെയും കൃഷിഭൂമിയുള്ള കർഷകർ.',
      watchFor: 'വിളവെടുപ്പിന് ശേഷവും പുതിയ നിലമൊരുക്കലിന് മുൻപും സാമ്പിളുകൾ ശേഖരിക്കണം.',
    },
    te: {
      title: 'సాయిల్ హెల్త్ కార్డు (భూసార ఆరోగ్య పత్రం) పథకం',
      whatItGives: 'ప్రతి రెండేళ్లకు 12 పోషక విలువలపై ఉచిత శాస్త్రీయ భూసార పరీక్ష నివేదిక మరియు సమగ్ర ఎరువుల సిఫార్సులు.',
      whoItIsFor: 'అన్ని రాష్ట్రాలు మరియు కేంద్రపాలిత ప్రాంతాల భూ యజమానులు.',
      watchFor: 'పంట కోత తర్వాత, తదుపరి విత్తనానికి దుక్కి దున్నే ముందే మట్టి నమూనాలు సేకరించాలి.',
    },
  },

  'raitha-siri': {
    en: {
      title: 'Raitha Siri Scheme (రైత ಸಿರಿ ಯೋಜನೆ)',
      whatItGives: 'Financial assistance of ₹10,000 per hectare for farmers growing minor millets in Karnataka.',
      whoItIsFor: 'Farmers cultivating minor millets or ragi in Karnataka.',
      watchFor: 'Crop details MUST be recorded in Karnataka Bele Samikshe (Farmer Mobile Crop Survey).',
    },
    kn: {
      title: 'ರೈತ ಸಿರಿ ಯೋಜನೆ (Raitha Siri)',
      whatItGives: 'ಸಿರಿಧಾನ್ಯ (ರಾಗಿ, ನವಣೆ, ಸಾಮೆ, ಹಾರಕ, ಕೊರಲೆ) ಬೆಳೆಯುವ ಕರ್ನಾಟಕದ ರೈತರಿಗೆ ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ ₹೧೦,೦೦೦ ನೇರ ಪ್ರೋತ್ಸಾಹಧನ.',
      whoItIsFor: 'ಕರ್ನಾಟಕದಲ್ಲಿ ರಾಗಿ ಮತ್ತು ಸಿರಿಧಾನ್ಯ ಬೆಳೆಯುವ ರೈತರು.',
      watchFor: 'ಬೆಳೆ ಸಮೀಕ್ಷೆ (ಬೆಳೆ ಸರ್ವೆ) ಆ್ಯಪ್‌ನಲ್ಲಿ ಬೆಳೆ ವಿವರ ಕಡ್ಡಾಯವಾಗಿ ನಮೂದಾಗಿರಬೇಕು.',
    },
    hi: {
      title: 'रैता सिरी योजना (Raitha Siri - कर्नाटक)',
      whatItGives: 'कर्नाटक में मोटे अनाज और रागी उगाने वाले किसानों को ₹10,000 प्रति हेक्टेयर की सीधी वित्तीय सहायता।',
      whoItIsFor: 'कर्नाटक के वर्षा आधारित भूमि पर रागी या मोटे अनाज उगाने वाले किसान।',
      watchFor: 'फसल का विवरण कर्नाटक बेले समीक्षे (फसल सर्वेक्षण) में दर्ज होना अनिवार्य है।',
    },
    ta: {
      title: 'ரைதா சிரி திட்டம் (கர்நாடகா)',
      whatItGives: 'கர்நாடகாவில் கேழ்வரகு மற்றும் சிறுதானியங்கள் பயிரிடும் விவசாயிகளுக்கு ஹெக்டேருக்கு ₹10,000 நேரடி உதவித்தொகை.',
      whoItIsFor: 'கர்நாடக மானாவாரி நில விவசாயிகளுக்கு மட்டுமே பொருந்தும்.',
      watchFor: 'கர்நாடக பயிர் கணக்கெடுப்பில் (Bele Samikshe) பதிவு செய்திருக்க வேண்டும்.',
    },
    ml: {
      title: 'റൈത സിരി പദ്ധതി (കർണാടക)',
      whatItGives: 'കർണാടകയിൽ റാഗി, ചെറുധാന്യങ്ങൾ കൃഷി ചെയ്യുന്ന കർഷകർക്ക് ഹെക്ടറിന് ₹10,000 ധനസഹായം.',
      whoItIsFor: 'കർണാടകയിലെ കർഷകർക്ക് മാത്രം ബാധകം.',
      watchFor: 'കർണാടക ഫാർമർ ക്രോപ്പ് സർവേയിൽ വിളവിവരങ്ങൾ രേഖപ്പെടുത്തിയിരിക്കണം.',
    },
    te: {
      title: 'రైత సిరి పథకం (కర్ణాటక రాష్ట్ర పథకం)',
      whatItGives: 'కర్ణాటకలో చిరుధాన్యాలు (రాగి, కొర్రలు, సామలు) సాగు చేసే రైతులకు హెక్టారుకు ₹10,000 ప్రోత్సాహక సాయం.',
      whoItIsFor: 'కర్ణాటక రాష్ట్రంలో చిరుధాన్యాలు సాగు చేసే రైతులకు మాత్రమే వర్తిస్తుంది.',
      watchFor: 'కర్ణాటక ప్రభుత్వ బెళె సమీక్షే (పంట సర్వే) యాప్‌లో పంట నమోదు తప్పనిసరి.',
    },
  },

  'krishi-bhagya': {
    en: {
      title: 'Krishi Bhagya Scheme (ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ)',
      whatItGives: 'Up to 80%–90% subsidy for constructing farm ponds (Krishi Honda) and micro-irrigation in Karnataka drylands.',
      whoItIsFor: 'Dryland and rainfed farmers with land located in Karnataka.',
      watchFor: 'Wait for the official Work Order before starting pond digging.',
    },
    kn: {
      title: 'ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ (Krishi Bhagya)',
      whatItGives: 'ಒಣಭೂಮಿ ರೈತರಿಗೆ ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಾಣ, ಪಾಲಿಥಿನ್ ಹೊದಿಕೆ ಮತ್ತು ಹನಿ ನೀರಾವರಿಗೆ ಶೇಕಡಾ ೮೦ ರಿಂದ ೯೦ ರಷ್ಟು ಸಬ್ಸಿಡಿ.',
      whoItIsFor: 'ಕರ್ನಾಟಕದ ಒಣಭೂಮಿ ಮತ್ತು ಮಳೆಯಾಶ್ರಿತ ಪ್ರದೇಶದ ರೈತರು.',
      watchFor: 'ಕೃಷಿ ಅಧಿಕಾರಿಯಿಂದ ಅಧಿಕೃತ ಕೆಲಸದ ಆದೇಶ (Work Order) ಬರುವ ಮುನ್ನ ಕಾಮಗಾರಿ ಆರಂಭಿಸಬಾರದು.',
    },
    hi: {
      title: 'कृषि भाग्य योजना (Krishi Bhagya - कर्नाटक)',
      whatItGives: 'कर्नाटक के वर्षा आधारित क्षेत्रों में खेत तालाब और ड्रिप सिंचाई हेतु 80% से 90% सब्सिडी।',
      whoItIsFor: 'कर्नाटक राज्य के शुष्क व वर्षा आधारित भूमिधारक किसान।',
      watchFor: 'आधिकारिक कार्य आदेश प्राप्त होने से पहले तालाब की खुदाई न करें।',
    },
    ta: {
      title: 'கிருஷி பாக்யா திட்டம் (கர்நாடகா)',
      whatItGives: 'கர்நாடக மானாவாரி பகுதிகளில் பண்ணைக் குட்டை அமைக்க 80% முதல் 90% வரை மானியம்.',
      whoItIsFor: 'கர்நாடக மாநில விவசாயிகள் மட்டும்.',
      watchFor: 'அதிகாரபூர்வ பணி ஆணை பெற்ற பிறகே பணிகளைத் தொடங்க வேண்டும்.',
    },
    ml: {
      title: 'കൃഷി ഭാഗ്യ പദ്ധതി (കർണാടക)',
      whatItGives: 'കർണാടകയിലെ വരണ്ട പ്രദേശങ്ങളിൽ ഫാം കുളങ്ങൾ നിർമ്മിക്കാൻ 80% മുതൽ 90% വരെ സബ്‌സിഡി.',
      whoItIsFor: 'കർണാടകയിലെ കർഷകർക്ക് മാത്രം ബാധകം.',
      watchFor: 'ഔദ്യോഗിക വർക്ക് ഓർഡർ ലഭിച്ചതിന് ശേഷം മാത്രമേ നിർമ്മാണം തുടങ്ങാവൂ.',
    },
    te: {
      title: 'కృషి భాగ్య పథకం (కర్ణాటక రాష్ట్ర పథకం)',
      whatItGives: 'కర్ణాటక మెట్ట ప్రాంతాలలో వ్యవసాయ నీటి కుంటలు (కృషి హొండ), పాలిథిన్ లైనింగ్, బిందు సేద్యానికి 80% నుండి 90% సబ్సిడీ.',
      whoItIsFor: 'కర్ణాటక రాష్ట్రంలోని మెట్ట భూమి రైతులకు మాత్రమే వర్తిస్తుంది.',
      watchFor: 'వ్యవసాయ శాఖ అధికారిక వర్క్ ఆర్డర్ జారీ చేసిన తర్వాతే తవ్వకం ప్రారంభించాలి.',
    },
  },

  'fruits-farmer-id': {
    en: {
      title: 'FRUITS Farmer ID (Karnataka Single Window)',
      whatItGives: 'Permanent 8-9 digit Farmer Identification Number (FID) linking Bhoomi land records, bank, and Aadhaar.',
      whoItIsFor: 'Every cultivator in Karnataka seeking any state benefit or minimum support price (MSP).',
      watchFor: 'Spelling mismatch between Aadhaar and Pahani name can fail registration; obtain Name Variation certificate.',
    },
    kn: {
      title: 'ಫ್ರೂಟ್ಸ್ ಫಾರ್ಮರ್ ಐಡಿ (FRUITS Farmer ID)',
      whatItGives: '೮ ಅಥವಾ ೯ ಅಂಕಿಯ ಶಾಶ್ವತ ರೈತ ಗುರುತಿನ ಸಂಖ್ಯೆ (FID). ಇದು ಭೂಮಿ ಪಹಣಿ, ಬ್ಯಾಂಕ್ ಮತ್ತು ಆಧಾರ್ ಜೋಡಿಸುತ್ತದೆ.',
      whoItIsFor: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಸರ್ಕಾರಿ ಸೌಲಭ್ಯ, ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ (MSP) ಅಥವಾ ಪರಿಹಾರ ಪಡೆಯುವ ಪ್ರತಿಯೊಬ್ಬ ರೈತರು.',
      watchFor: 'ಪಹಣಿಯಲ್ಲಿರುವ ಹೆಸರು ಮತ್ತು ಆಧಾರ್ ಹೆಸರಿನ ಅಕ್ಷರ ವ್ಯತ್ಯಾಸವಿದ್ದರೆ ವಿಎಒ ಅವರಿಂದ ದೃಢೀಕರಣ ಪತ್ರ ಪಡೆಯಿರಿ.',
    },
    hi: {
      title: 'फ्रूट्स किसान पहचान संख्या (FRUITS - कर्नाटक)',
      whatItGives: 'स्थायी 8-9 अंकों का किसान पहचान नंबर जो भूमि रिकॉर्ड, बैंक और आधार को एकीकृत करता है।',
      whoItIsFor: 'कर्नाटक के किसानों हेतु राज्य योजनाओं का लाभ लेने के लिए अनिवार्य।',
      watchFor: 'आधार और खतौनी के नाम में अंतर होने पर राजस्व सत्यापन पत्र लें।',
    },
    ta: {
      title: 'FRUITS உழவர் அடையாள அட்டை (கர்நாடகா)',
      whatItGives: 'கர்நாடக நில ஆவணம், வங்கி மற்றும் ஆதாரை இணைக்கும் நிரந்தர 8-9 இலக்க எண்.',
      whoItIsFor: 'கர்நாடகாவில் மாநில நலத்திட்டங்களை பெற விரும்பும் விவசாயிகள்.',
      watchFor: 'பட்டா மற்றும் ஆதார் பெயரில் எழுத்துப் பிழை இருந்தால் திருத்தம் செய்யவும்.',
    },
    ml: {
      title: 'ഫ്രൂട്ട്സ് ഫാർമർ ഐഡി (കർണാടക)',
      whatItGives: 'ഭൂരേഖ, ബാങ്ക്, ആധാർ എന്നിവ ബന്ധിപ്പിക്കുന്ന കർണാടക സർക്കാരിന്റെ തിരിച്ചറിയൽ നമ്പർ.',
      whoItIsFor: 'കർണാടകയിലെ കർഷകർക്ക് മാത്രം നിർബന്ധം.',
      watchFor: 'ആധാറിലെയും പട്ടയത്തിലെയും പേരിലെ വ്യത്യാസങ്ങൾ വില്ലേജ് ഓഫീസർ വഴി തിരുത്തുക.',
    },
    te: {
      title: 'ఫ్రూట్స్ ఫార్మర్ ఐడీ (కర్ణాటక రైతు రిజిస్ట్రీ)',
      whatItGives: 'కర్ణాటక భూమి రికార్డు, బ్యాంక్ మరియు ఆధార్‌ను అనుసంధానించే శాశ్వత 8-9 అంకెల గుర్తింపు సంఖ్య (FID).',
      whoItIsFor: 'కర్ణాటకలో ప్రభుత్వ రాయితీలు లేదా మద్దతు ధర (MSP) పొందగోరే ప్రతి రైతుకు తప్పనిసరి.',
      watchFor: 'ఆధార్ మరియు భూమి రికార్డు పేర్లలో అక్షర తేడాలుంటే గ్రామ రెవెన్యూ అధికారి ధృవీకరణ పత్రం పొందాలి.',
    },
  },

  'ap-state-agriculture-scheme': {
    en: {
      title: 'State Scheme: details to be verified for Andhra Pradesh',
      whatItGives: 'State agricultural investment and input support administered through Rythu Bharosa Kendrams (RBKs).',
      whoItIsFor: 'Eligible agricultural landholders and cultivators in Andhra Pradesh.',
      watchFor: 'Details are placeholders pending formal state gazette audit. Verify at your local RBK.',
    },
    kn: {
      title: 'ರಾಜ್ಯ ಯೋಜನೆ: ಆಂಧ್ರಪ್ರದೇಶ ರಾಜ್ಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಬೇಕಿದೆ',
      whatItGives: 'ಆಂಧ್ರಪ್ರದೇಶ ಸರ್ಕಾರದ ಕೃಷಿ ಬೆಂಬಲ ಮತ್ತು ಇನ್‌ಪುಟ್ ಸಹಾಯಧನ ಯೋಜನೆ.',
      whoItIsFor: 'ಆಂಧ್ರಪ್ರದೇಶದ ನೋಂದಾಯಿತ ರೈತರು ಮತ್ತು ಕೃಷಿ ಭೂಮಾಲೀಕರು.',
      watchFor: 'ವಿವರಗಳನ್ನು ಅಧಿಕೃತ ಗೆಜೆಟ್‌ನೊಂದಿಗೆ ಪರಿಶೀಲಿಸಬೇಕಿದೆ.',
    },
    hi: {
      title: 'राज्य योजना: आंध्र प्रदेश के लिए विवरण सत्यापित किया जाना है',
      whatItGives: 'आंध्र प्रदेश सरकार द्वारा रायथु भरोसा केंद्रों के माध्यम से कृषि निवेश सहायता।',
      whoItIsFor: 'आंध्र प्रदेश के पात्र किसान एवं भूमिधारक।',
      watchFor: 'आधिकारिक राजपत्र आदेशों से विवरण का सत्यापन शेष है।',
    },
    ta: {
      title: 'மாநில திட்டம்: ஆந்திரப் பிரதேசத்திற்கான விவரங்கள் சரிபார்க்கப்பட வேண்டியுள்ளது',
      whatItGives: 'ஆந்திரப் பிரதேச வேளாண்மைத் துறை வழங்கும் முதலீட்டு உதவி திட்டம்.',
      whoItIsFor: 'ஆந்திரப் பிரதேச விவசாயிகள்.',
      watchFor: 'விவரங்கள் சரிபார்க்கப்படும் வரை மாதிரித் தகவலாக வைக்கப்பட்டுள்ளது.',
    },
    ml: {
      title: 'സംസ്ഥാന പദ്ധതി: ആന്ധ്രാപ്രദേശിനായുള്ള വിവരങ്ങൾ പരിശോധിക്കേണ്ടതുണ്ട്',
      whatItGives: 'ആന്ധ്രാപ്രദേശ് സർക്കാർ നൽകുന്ന കാർഷിക നിക്ഷേപ സഹായ പദ്ധതി.',
      whoItIsFor: 'ആന്ധ്രാപ്രദേശിലെ കർഷകർ.',
      watchFor: 'ഔദ്യോഗിക വിജ്ഞാപനം അനുസരിച്ച് വിവരങ്ങൾ പരിശോധിക്കേണ്ടതുണ്ട്.',
    },
    te: {
      title: 'రాష్ట్ర పథకం: ఆంధ్రప్రదేశ్ కోసం వివరాలు ధృవీకరించాల్సి ఉంది',
      whatItGives: 'రైతు భరోసా కేంద్రాల (RBK) ద్వారా ఆంధ్రప్రదేశ్ ప్రభుత్వం అందించే వ్యవసాయ పెట్టుబడి మరియు ఉత్పాదక సహాయ పథకం.',
      whoItIsFor: 'ఆంధ్రప్రదేశ్ రాష్ట్రంలోని అర్హులైన రైతులు, భూ యజమానులు మరియు కౌలుదారులు.',
      watchFor: 'రాష్ట్ర అధికారిక గెజిట్ ఆదేశాల ఆధారంగా వివరాలు ధృవీకరించబడే వరకు ఇది తాత్కాలిక సూచికగా ఉంటుంది. స్థానిక RBK వద్ద నిర్ధారించుకోండి.',
    },
  },

  'telangana-state-agriculture-scheme': {
    en: {
      title: 'State Scheme: details to be verified for Telangana',
      whatItGives: 'State agricultural investment and farmer assistance programs administered by the Department of Agriculture, Telangana.',
      whoItIsFor: 'Eligible agricultural landholders cultivating notified crops in Telangana.',
      watchFor: 'Details are placeholders pending formal circular audit. Verify at Rythu Vedika.',
    },
    kn: {
      title: 'ರಾಜ್ಯ ಯೋಜನೆ: ತೆಲಂಗಾಣ ರಾಜ್ಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಬೇಕಿದೆ',
      whatItGives: 'ತೆಲಂಗಾಣ ಸರ್ಕಾರದ ಕೃಷಿ ಹೂಡಿಕೆ ಮತ್ತು ಕಿಸಾನ್ ಕಲ್ಯಾಣ ಯೋಜನೆ.',
      whoItIsFor: 'ತೆಲಂಗಾಣದ ನೋಂದಾಯಿತ ಭೂಮಾಲೀಕ ರೈತರು.',
      watchFor: 'ವಿವರಗಳನ್ನು ಅಧಿಕೃತ ಸುತ್ತೋಲೆಯೊಂದಿಗೆ ಪರಿಶೀಲಿಸಬೇಕಿದೆ.',
    },
    hi: {
      title: 'राज्य योजना: तेलंगाना के लिए विवरण सत्यापित किया जाना है',
      whatItGives: 'तेलंगाना कृषि विभाग द्वारा संचालित कृषि निवेश सहायता कार्यक्रम।',
      whoItIsFor: 'तेलंगाना के पात्र पट्टादार और किसान।',
      watchFor: 'आधिकारिक आदेश से विवरण का सत्यापन शेष है।',
    },
    ta: {
      title: 'மாநில திட்டம்: தெலுங்கானாவிற்கான விவரங்கள் சரிபார்க்கப்பட வேண்டியுள்ளது',
      whatItGives: 'தெலுங்கானா அரசு வழங்கும் விவசாய முதலீட்டு ஆதரவு திட்டம்.',
      whoItIsFor: 'தெலுங்கானா மாநில விவசாயிகள்.',
      watchFor: 'விவரங்கள் அதிகாரபூர்வமாக உறுதிப்படுத்தப்பட வேண்டும்.',
    },
    ml: {
      title: 'സംസ്ഥാന പദ്ധതി: തെലങ്കാനയ്ക്കുള്ള വിവരങ്ങൾ പരിശോധിക്കേണ്ടതുണ്ട്',
      whatItGives: 'തെലങ്കാന കാർഷിക വകുപ്പിന്റെ നിക്ഷേപ സഹായ പദ്ധതി.',
      whoItIsFor: 'തെലങ്കാനയിലെ കർഷകർ.',
      watchFor: 'ഔദ്യോഗിക സർക്കുലർ പ്രകാരം വിവരങ്ങൾ പരിശോധിക്കേണ്ടതുണ്ട്.',
    },
    te: {
      title: 'రాష్ట్ర పథకం: తెలంగాణ కోసం వివరాలు ధృవీకరించాల్సి ఉంది',
      whatItGives: 'తెలంగాణ వ్యవసాయ శాఖ ద్వారా అమలు చేయబడే వ్యవసాయ పెట్టుబడి సహాయం మరియు రైతు సంక్షేమ పథకాలు.',
      whoItIsFor: 'తెలంగాణ రాష్ట్రంలో ధరణి పట్టాదారు పాస్ పుస్తకం కలిగిన అర్హులైన రైతులు.',
      watchFor: 'ప్రభుత్వ ఉత్తర్వుల ఆధారంగా వివరాలు ధృవీకరించబడే వరకు ఇది తాత్కాలిక సమాచారంగా ఉంటుంది. రైతు వేదిక వద్ద విచారించండి.',
    },
  },

  'state-scheme-placeholder': {
    en: {
      title: 'State Scheme: details to be verified for selected state',
      whatItGives: 'State-specific agricultural welfare programs administered by the respective State Department of Agriculture.',
      whoItIsFor: 'Agricultural households and landholders registered with their state department of agriculture.',
      watchFor: 'State scheme parameters must be confirmed directly at the block or district agriculture office.',
    },
    kn: {
      title: 'ರಾಜ್ಯ ಯೋಜನೆ: ಆಯ್ದ ರಾಜ್ಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಬೇಕಿದೆ',
      whatItGives: 'ಸಂಬಂಧಿತ ರಾಜ್ಯ ಕೃಷಿ ಇಲಾಖೆಯ ರಾಜ್ಯಮಟ್ಟದ ಕೃಷಿ ಯೋಜನೆಗಳು.',
      whoItIsFor: 'ಆಯಾ ರಾಜ್ಯದ ನೋಂದಾಯಿತ ಕೃಷಿಕರು.',
      watchFor: 'ಸ್ಥಳೀಯ ಕೃಷಿ ಕಚೇರಿಯಲ್ಲಿ ವಿವರಗಳನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
    },
    hi: {
      title: 'राज्य योजना: चयनित राज्य के लिए विवरण सत्यापित किया जाना है',
      whatItGives: 'संबंधित राज्य कृषि विभाग द्वारा संचालित राज्य-विशिष्ट कल्याणकारी योजनाएं।',
      whoItIsFor: 'संबंधित राज्य के पंजीकृत किसान।',
      watchFor: 'ब्लॉक या जिला कृषि कार्यालय से नियमों की पुष्टि करें।',
    },
    ta: {
      title: 'மாநில திட்டம்: தேர்ந்தெடுக்கப்பட்ட மாநிலத்திற்கான விவரங்கள் சரிபார்க்கப்பட வேண்டியுள்ளது',
      whatItGives: 'அந்தந்த மாநில வேளாண்மைத் துறை வழங்கும் திட்டங்கள்.',
      whoItIsFor: 'அந்த மாநில விவசாயிகள்.',
      watchFor: 'வட்டார வேளாண்மை அலுவலகத்தில் விவரங்களை உறுதிப்படுத்தவும்.',
    },
    ml: {
      title: 'സംസ്ഥാന പദ്ധതി: തിരഞ്ഞെടുത്ത സംസ്ഥാനത്തിനായുള്ള വിവരങ്ങൾ പരിശോധിക്കേണ്ടതുണ്ട്',
      whatItGives: 'അതത് സംസ്ഥാന കാർഷിക വകുപ്പുകൾ നടപ്പിലാക്കുന്ന പദ്ധതികൾ.',
      whoItIsFor: 'ആ സംസ്ഥാനത്തെ കർഷകർ.',
      watchFor: 'പ്രാദേശിക കൃഷി ഓഫീസിൽ വിവരങ്ങൾ ഉറപ്പുവരുത്തുക.',
    },
    te: {
      title: 'రాష్ట్ర పథకం: ఎంచుకున్న రాష్ట్రం కోసం వివరాలు ధృవీకరించాల్సి ఉంది',
      whatItGives: 'సంబంధిత రాష్ట్ర వ్యవసాయ శాఖ ద్వారా అమలు చేయబడే రాష్ట్ర స్థాయి సంక్షేమ పథకాలు.',
      whoItIsFor: 'ఆయా రాష్ట్రాల్లో నమోదైన వ్యవసాయ కుటుంబాలు మరియు రైతులు.',
      watchFor: 'బ్లాక్ లేదా మండల వ్యవసాయ కార్యాలయంలో నిబంధనలను నేరుగా నిర్ధారించుకోండి.',
    },
  },
};

export function getSchemeBySlug(slug: string, locale: Locale = 'en'): Scheme | undefined {
  const scheme = SCHEMES_DATA.find((s) => s.slug === slug);
  if (!scheme) return undefined;

  const translation = SCHEME_TRANSLATIONS[slug]?.[locale];
  if (!translation) return scheme;

  return {
    ...scheme,
    ...translation,
    isMachineTranslated: locale !== 'en',
  };
}

export function getAllSchemes(locale: Locale = 'en', includeDrafts: boolean = false): Scheme[] {
  const dataset = includeDrafts ? SCHEMES_DATA : SCHEMES_DATA.filter((s) => s.published !== false);
  return dataset.map((scheme) => {
    const translation = SCHEME_TRANSLATIONS[scheme.slug]?.[locale];
    if (!translation) return scheme;
    return {
      ...scheme,
      ...translation,
      isMachineTranslated: locale !== 'en',
    };
  });
}
