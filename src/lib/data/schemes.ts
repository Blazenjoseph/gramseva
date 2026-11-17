import { Scheme, Locale } from '@/types';

export const SCHEMES_DATA: Scheme[] = [
  {
    id: 'scheme-pm-kisan',
    slug: 'pm-kisan',
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    department: 'Department of Agriculture & Farmers Welfare, Government of India',
    state: 'central',
    badgeCategory: 'cash-benefit',
    whatItGives: '₹6,000 per year provided as direct income support, disbursed in 3 equal four-monthly instalments of ₹2,000 directly into the farmer’s Aadhaar-seeded bank account via DBT.',
    whoItIsFor: 'All landholding farmer families who possess cultivable land parcels in their names in the official revenue record. Excludes institutional owners, income tax payees, and serving or retired government employees.',
    landSizeMinAcres: 0,
    landSizeMaxAcres: 100, // No ceiling for small/marginal, but open to all genuine landholders
    eligibleCrops: ['all', 'ragi', 'millet', 'paddy', 'pulses', 'horticulture'],
    requiresLandRecord: true,
    requiresFarmerId: false, // In Karnataka, linked through Bhoomi/FRUITS
    requiresAadhaarBankLink: true,
    benefitAmount: '₹6,000 / year (3 instalments of ₹2,000)',
    documentsNeeded: [
      'Record of Rights (RTC / Pahani) proving land ownership',
      'Aadhaar card copy with mobile number linked for eKYC OTP',
      'Bank passbook copy with active NPCI Aadhaar DBT mapping'
    ],
    whereToApply: {
      portalName: 'PM-KISAN Central Portal',
      portalUrl: 'https://pmkisan.gov.in',
      offlineOffice: 'Nearest Grama One, Karnataka One kiosk, or Hobli Raitha Samparka Kendra (RSK)',
      helpline: '155261 / 011-24300606'
    },
    watchFor: 'Aadhaar seeding is different from bank account opening. The bank account must be actively linked on the NPCI mapper for Direct Benefit Transfer (DBT). If money stops, visit your bank branch and ask for "NPCI Aadhaar DBT Seeding Form".',
    sourceUrl: 'https://pmkisan.gov.in',
    lastVerifiedOn: '2026-11-15',
    verifiedBy: 'Group 5 Research Desk, JAIN University',
    isHypothesis: false,
    published: true,
  },
  {
    id: 'scheme-raitha-siri',
    slug: 'raitha-siri',
    title: 'Raitha Siri Scheme (ರೈತ ಸಿರಿ ಯೋಜನೆ)',
    department: 'Department of Agriculture, Government of Karnataka',
    state: 'karnataka',
    badgeCategory: 'subsidy',
    whatItGives: 'Direct financial assistance of ₹10,000 per hectare (up to a maximum of 2 hectares, i.e., ₹20,000) for farmers growing minor millets (Ragi, Foxtail millet/Navane, Little millet/Same, Kodo millet/Haraka, Barnyard millet/Oodalu, Proso millet/Baragu).',
    whoItIsFor: 'Small and marginal farmers in Karnataka cultivating minor millets or finger millet (ragi) on drylands, including rainfed plots as small as 0.5 acre.',
    landSizeMinAcres: 0.2,
    landSizeMaxAcres: 5.0,
    eligibleCrops: ['ragi', 'millet', 'millets', 'navane', 'same', 'haraka'],
    requiresLandRecord: true,
    requiresFarmerId: true, // FRUITS FID is mandatory
    requiresAadhaarBankLink: true,
    benefitAmount: '₹10,000 / hectare (pro-rated for small/half-acre holdings)',
    documentsNeeded: [
      'FRUITS Farmer ID (FID) 8 or 9-digit registration slip',
      'Current year RTC (Pahani) with crop entry recorded in Bele Samikshe (Farmer Crop Survey)',
      'Aadhaar card linked to NPCI bank account',
      'Caste certificate (only if seeking priority DBT categorization)'
    ],
    whereToApply: {
      portalName: 'Raita Mitra Karnataka / FRUITS Portal',
      portalUrl: 'https://fruits.karnataka.gov.in',
      offlineOffice: 'Raitha Samparka Kendra (RSK) at your Hobli level',
      helpline: '1800-425-3553 (Kisan Call Centre Karnataka)'
    },
    watchFor: 'Crucial: Crop details MUST be captured in the Karnataka Farmer Mobile Crop Survey (Bele Samikshe) during the sowing season. If the survey enumerator misses your ragi crop or lists it as fallow, the DBT incentive cannot be generated automatically.',
    sourceUrl: 'https://raitamitra.karnataka.gov.in',
    lastVerifiedOn: '2026-11-15',
    verifiedBy: 'Group 5 Agriculture Policy Desk, JAIN University',
    isHypothesis: false,
    published: true,
  },
  {
    id: 'scheme-krishi-bhagya',
    slug: 'krishi-bhagya',
    title: 'Krishi Bhagya Scheme (ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ)',
    department: 'Watershed Development & Agriculture Dept, Government of Karnataka',
    state: 'karnataka',
    badgeCategory: 'infrastructure',
    whatItGives: 'Substantial subsidy package for dryland farming infrastructure: up to 90% subsidy for SC/ST farmers and up to 80% for general/OBC farmers for constructing a Farm Pond (Krishi Honda), polythene lining to retain rainwater, diesel/solar pump sets, micro-irrigation (drip/sprinkler), and protective poly-house.',
    whoItIsFor: 'Farmers with cultivable dryland/rainfed agricultural land in notified dryland and drought-prone taluks across Karnataka. Small farmers with 0.5 to 1 acre can join hands for a shared farm pond.',
    landSizeMinAcres: 0.5,
    landSizeMaxAcres: 12.5,
    eligibleCrops: ['all', 'ragi', 'millet', 'pulses', 'groundnut', 'horticulture'],
    requiresLandRecord: true,
    requiresFarmerId: true,
    requiresAadhaarBankLink: true,
    benefitAmount: 'Up to 80% - 90% subsidy on farm pond excavation & lining',
    documentsNeeded: [
      'Latest computerised RTC (Pahani) showing dryland status',
      'FRUITS Farmer Registration Number (FID)',
      'Bank passbook copy showing bank IFSC and account number',
      'Recent photo of dryland farm parcel',
      'Caste Certificate (RD number from Nadakacheri) if applying for SC/ST subsidy slab'
    ],
    whereToApply: {
      portalName: 'Raita Mitra Karnataka Schemes Desk',
      portalUrl: 'https://raitamitra.karnataka.gov.in',
      offlineOffice: 'Office of the Assistant Director of Agriculture (ADA) or Hobli RSK',
      helpline: '080-22212804'
    },
    watchFor: 'Budget and physical targets are allotted annually per taluk. Applications are cleared on a first-come, first-served queue prior to the monsoon season. Do not commence excavation before receiving the official Work Order from the Agriculture Officer.',
    sourceUrl: 'https://raitamitra.karnataka.gov.in',
    lastVerifiedOn: '2026-11-16',
    verifiedBy: 'Group 5 Field Studies Unit, JAIN University',
    isHypothesis: false,
    published: true,
  },
  {
    id: 'scheme-fruits-id',
    slug: 'fruits-farmer-id',
    title: 'FRUITS Farmer ID (Farmer Registration & Unified Beneficiary System)',
    department: 'e-Governance & Agriculture Department, Government of Karnataka',
    state: 'karnataka',
    badgeCategory: 'identity',
    whatItGives: 'A permanent 8 or 9-digit Farmer Identification Number (FID) that links your Bhoomi land record, bank account, Aadhaar, and crop pattern into a single verified government profile.',
    whoItIsFor: 'Every single farmer cultivating land in Karnataka. Mandatory foundation required to claim any state subsidy, MSP procurement for ragi/paddy, drought compensation, or solar pump subsidy.',
    landSizeMinAcres: 0,
    landSizeMaxAcres: 500,
    eligibleCrops: ['all'],
    requiresLandRecord: true,
    requiresFarmerId: false, // This creates the Farmer ID!
    requiresAadhaarBankLink: true,
    benefitAmount: 'Unified Single-Window Access to 14+ State Subsidies',
    documentsNeeded: [
      'Aadhaar card of the landholder',
      'Bhoomi RTC (Pahani) copy showing survey number and hissa',
      'Bank passbook showing account number and IFSC',
      'Registered mobile number for OTP confirmation'
    ],
    whereToApply: {
      portalName: 'FRUITS Online Farmer Portal',
      portalUrl: 'https://fruits.karnataka.gov.in',
      offlineOffice: 'Grama One Centre, Bangalore One, Karnataka One, or nearest RSK',
      helpline: '080-22370281'
    },
    watchFor: 'If the name on your Aadhaar card differs slightly from the name printed on your RTC/Pahani (e.g. initials expanded or spelling variation), the automated Bhoomi verification may fail. Visit your village administrative officer (VAO) to obtain a Name Variation Certificate or update Aadhaar spelling.',
    sourceUrl: 'https://fruits.karnataka.gov.in',
    lastVerifiedOn: '2026-11-15',
    verifiedBy: 'Group 5 Data & Technology Team, JAIN University',
    isHypothesis: false,
    published: true,
  },
  {
    id: 'scheme-pmfby',
    slug: 'pm-fasal-bima-yojana',
    title: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    department: 'Ministry of Agriculture & Farmers Welfare, GoI / Govt of Karnataka',
    state: 'central',
    badgeCategory: 'subsidy',
    whatItGives: 'Comprehensive crop insurance coverage against non-preventable natural risks (drought, dry spells, flood, pest attack). Farmers pay a nominal premium of just 2% for Kharif crops (including ragi and paddy) and 1.5% for Rabi crops, with the remaining 85%+ premium borne jointly by Central and State Governments.',
    whoItIsFor: 'All farmers including sharecroppers and tenant farmers growing notified crops in notified insurance units/hoblis.',
    landSizeMinAcres: 0.1,
    landSizeMaxAcres: 50,
    eligibleCrops: ['ragi', 'millet', 'paddy', 'pulses', 'groundnut'],
    requiresLandRecord: true,
    requiresFarmerId: true,
    requiresAadhaarBankLink: true,
    benefitAmount: 'Sum insured up to ₹25,000 - ₹40,000 / hectare depending on notified crop yield value',
    documentsNeeded: [
      'RTC / Sowing certificate issued by Village Accountant / RSK',
      'Aadhaar card copy',
      'Bank passbook copy',
      'FRUITS ID (for Karnataka farmers)'
    ],
    whereToApply: {
      portalName: 'Samrakshane Karnataka Crop Insurance Portal',
      portalUrl: 'https://samrakshane.karnataka.gov.in',
      offlineOffice: 'Nearest Commercial Bank Branch, Primary Agricultural Credit Society (PACS), or Grama One',
      helpline: '1800-180-1551'
    },
    watchFor: 'Strict cut-off deadlines apply! Enrollment closes typically by July 31st for Kharif and November 30th for Rabi. If seasonal rainfall fails, localized claims must be reported within 72 hours of damage via the Crop Insurance Mobile App or toll-free number.',
    sourceUrl: 'https://pmfby.gov.in',
    lastVerifiedOn: '2026-11-14',
    verifiedBy: 'Group 5 Research Desk, JAIN University',
    isHypothesis: false,
    published: true,
  }
];

export const SCHEME_TRANSLATIONS: Record<string, Record<Locale, Partial<Scheme>>> = {
  'raitha-siri': {
    en: {
      title: 'Raitha Siri Scheme (ರೈತ ಸಿರಿ ಯೋಜನೆ)',
      whatItGives: 'Financial assistance of ₹10,000 per hectare for farmers growing minor millets (Ragi, Foxtail millet/Navane, Little millet/Same, Kodo millet/Haraka, Barnyard millet/Oodalu).',
      whoItIsFor: 'Small and marginal dryland farmers cultivating millets and ragi in Karnataka.',
      watchFor: 'Crop details MUST be recorded in Karnataka Bele Samikshe (Farmer Mobile Crop Survey).',
    },
    kn: {
      title: 'ರೈತ ಸಿರಿ ಯೋಜನೆ (Raitha Siri)',
      whatItGives: 'ಸಿರಿಧಾನ್ಯ (ರಾಗಿ, ನವಣೆ, ಸಾಮೆ, ಹಾರಕ, ಕೊರಲೆ) ಬೆಳೆಯುವ ರೈತರಿಗೆ ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ ₹೧೦,೦೦೦ ನೇರ ಪ್ರೋತ್ಸಾಹಧನ (ಗರಿಷ್ಠ ೨ ಹೆಕ್ಟೇರ್‌ವರೆಗೆ).',
      whoItIsFor: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಒಣಭೂಮಿಯಲ್ಲಿ ರಾಗಿ ಮತ್ತು ಸಿರಿಧಾನ್ಯ ಬೆಳೆಯುವ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರು.',
      watchFor: 'ಬೆಳೆ ಸಮೀಕ್ಷೆ (ಬೆಳೆ ಸರ್ವೆ) ಆ್ಯಪ್‌ನಲ್ಲಿ ನಿಮ್ಮ ರಾಗಿ ಬೆಳೆಯ ವಿವರ ಕಡ್ಡಾಯವಾಗಿ ನಮೂದಾಗಿರಬೇಕು. ಬೆಳೆ ನಮೂದಾಗದಿದ್ದರೆ ಹಣ ಜಮೆಯಾಗುವುದಿಲ್ಲ.',
    },
    hi: {
      title: 'रैता सिरी योजना (Raitha Siri)',
      whatItGives: 'मोटे अनाज और रागी उगाने वाले किसानों को ₹10,000 प्रति हेक्टेयर की सीधी वित्तीय सहायता (अधिकतम 2 हेक्टेयर तक)।',
      whoItIsFor: 'कर्नाटक के छोटे और सीमांत किसान जो वर्षा आधारित भूमि पर रागी या अन्य मोटे अनाज उगाते हैं।',
      watchFor: 'फसल का विवरण कर्नाटक बेले समीक्षे (फसल सर्वेक्षण) में दर्ज होना अनिवार्य है।',
    },
    ta: {
      title: 'ரைதா சிரி திட்டம் (Raitha Siri)',
      whatItGives: 'கேழ்வரகு (ராகி) மற்றும் சிறுதானியங்கள் பயிரிடும் விவசாயிகளுக்கு ஹெக்டேருக்கு ₹10,000 நேரடி உதவித்தொகை.',
      whoItIsFor: 'கர்நாடகாவில் மானாவாரி நிலத்தில் ராகி மற்றும் சிறுதானியங்கள் சாகுபடி செய்யும் சிறு விவசாயிகள்.',
      watchFor: 'கர்நாடக பயிர் கணக்கெடுப்பில் (Bele Samikshe) பயிர் விவரம் கட்டாயம் பதிவாகியிருக்க வேண்டும்.',
    },
    ml: {
      title: 'റൈത സിരി പദ്ധതി (Raitha Siri)',
      whatItGives: 'റാഗി, ചെറുധാന്യങ്ങൾ കൃഷി ചെയ്യുന്ന കർഷകർക്ക് ഹെക്ടറിന് ₹10,000 നേരിട്ടുള്ള ധനസഹായം.',
      whoItIsFor: 'കർണാടകയിൽ റാഗിയും ചെറുധാന്യങ്ങളും കൃഷി ചെയ്യുന്ന ചെറുകിട കർഷകർ.',
      watchFor: 'കർണാടക ഫാർമർ ക്രോപ്പ് സർവേയിൽ വിളവിവരങ്ങൾ രേഖപ്പെടുത്തിയിരിക്കണം.',
    },
  },
  'pm-kisan': {
    en: {
      title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      whatItGives: '₹6,000 per year direct income support in 3 equal instalments of ₹2,000 via DBT into Aadhaar-seeded bank accounts.',
      whoItIsFor: 'All cultivable landholding farmer families with land in their name.',
      watchFor: 'Bank account must be seeded with Aadhaar on the NPCI DBT mapper, not just standard KYC.',
    },
    kn: {
      title: 'ಪಿಎಂ-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-KISAN)',
      whatItGives: 'ವರ್ಷಕ್ಕೆ ₹೬,೦೦೦ ನೇರ ನಗದು ಸಹಾಯಧನ. ತಲಾ ₹೨,೦೦೦ ದಂತೆ ೩ ಕಂತುಗಳಲ್ಲಿ ರೈತರ ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರ ಜಮೆ.',
      whoItIsFor: 'ತಮ್ಮ ಸ್ವಂತ ಹೆಸರಿನಲ್ಲಿ ಕೃಷಿ ಭೂಮಿಯ ಪಹಣಿ ಹೊಂದಿರುವ ಎಲ್ಲಾ ರೈತ ಕುಟುಂಬಗಳು.',
      watchFor: 'ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಕೇವಲ ಆಧಾರ್ ನೀಡಿದರೆ ಸಾಲದು, ಎನ್‌ಪಿಸಿಐ (NPCI) ಡಿಬಿಟಿ ಸೀಡಿಂಗ್ ಕಡ್ಡಾಯವಾಗಿ ಆಗಿರಬೇಕು.',
    },
    hi: {
      title: 'पीएम-किसान सम्मान निधि (PM-KISAN)',
      whatItGives: '₹6,000 प्रति वर्ष की सीधी आय सहायता, 3 समान किस्तों में ₹2,000 सीधे आधार-सीडेड बैंक खाते में।',
      whoItIsFor: 'वे सभी किसान परिवार जिनके नाम पर आधिकारिक राजस्व रिकॉर्ड में कृषि योग्य भूमि है।',
      watchFor: 'बैंक खाते में एनपीसीआई डीबीटी मैपर पर आधार सीडिंग होना अनिवार्य है, केवल साधारण ई-केवाईसी पर्याप्त नहीं।',
    },
    ta: {
      title: 'பிஎம்-கிசான் சம்மான் நிதி (PM-KISAN)',
      whatItGives: 'ஆண்டுக்கு ₹6,000 நேரடி வருமான ஆதரவு, 3 தவணைகளில் தலா ₹2,000 நேரடியாக வங்கி கணக்கில் செலுத்தப்படும்.',
      whoItIsFor: 'சொந்த பெயரில் சாகுபடி நிலம் வைத்துள்ள அனைத்து விவசாய குடும்பங்கள்.',
      watchFor: 'வங்கி கணக்கில் NPCI ஆதார் DBT இணைப்பு உறுதி செய்யப்பட வேண்டும்.',
    },
    ml: {
      title: 'പിഎം-കിസാൻ സമ്മാൻ നിധി (PM-KISAN)',
      whatItGives: 'പ്രതിവർഷം ₹6,000 നേരിട്ടുള്ള വരുമാന സഹായം, മൂന്ന് തുല്യ ഗഡുക്കളായി കർഷകരുടെ ബാങ്ക് അക്കൗണ്ടിലേക്ക്.',
      whoItIsFor: 'സ്വന്തം പേരിൽ കൃഷിഭൂമിയുള്ള എല്ലാ കർഷക കുടുംബങ്ങളും.',
      watchFor: 'ബാങ്ക് അക്കൗണ്ടിൽ NPCI ആധാർ DBT സീഡിംഗ് പൂർത്തിയായിരിക്കണം.',
    },
  },
  'krishi-bhagya': {
    en: {
      title: 'Krishi Bhagya Scheme (ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ)',
      whatItGives: 'Up to 80%–90% subsidy for constructing farm ponds (Krishi Honda), polythene lining, pump sets, and drip irrigation in rainfed areas.',
      whoItIsFor: 'Dryland and rainfed farmers in Karnataka with minimum 0.5 acre cultivable parcel.',
      watchFor: 'Wait for the official Work Order before starting pond digging. Clear physical targets open seasonally.',
    },
    kn: {
      title: 'ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ (Krishi Bhagya)',
      whatItGives: 'ಒಣಭೂಮಿ ರೈತರಿಗೆ ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಾಣ, ಪಾಲಿಥಿನ್ ಹೊದಿಕೆ, ಡೀಸೆಲ್/ಸೌರ ಪಂಪ್‌ಸೆಟ್ ಮತ್ತು ಹನಿ ನೀರಾವರಿಗೆ ಶೇಕಡಾ ೮೦ ರಿಂದ ೯೦ ರಷ್ಟು ಸಬ್ಸಿಡಿ.',
      whoItIsFor: 'ಕರ್ನಾಟಕದ ಒಣಭೂಮಿ ಮತ್ತು ಮಳೆಯಾಶ್ರಿತ ಪ್ರದೇಶದ ಸಣ್ಣ ರೈತರು (ಕನಿಷ್ಠ ೦.೫ ಎಕರೆ ಜಮೀನು ಇರುವವರು).',
      watchFor: 'ಕೃಷಿ ಅಧಿಕಾರಿಯಿಂದ ಅಧಿಕೃತ ಕೆಲಸದ ಆದೇಶ (Work Order) ಬರುವ ಮುನ್ನ ಕೃಷಿ ಹೊಂಡ ತೆಗೆಯಬಾರದು. ಅನುಮೋದನೆ ನಂತರವೇ ಕಾಮಗಾರಿ ಆರಂಭಿಸಬೇಕು.',
    },
    hi: {
      title: 'कृषि भाग्य योजना (Krishi Bhagya)',
      whatItGives: 'खेत तालाब (कृषि होंडा), पॉलीथीन लाइनिंग और ड्रिप सिंचाई के लिए 80% से 90% तक की भारी सब्सिडी।',
      whoItIsFor: 'कर्नाटक के वर्षा आधारित और सूखे क्षेत्रों के किसान जिनके पास कम से कम 0.5 एकड़ भूमि है।',
      watchFor: 'आधिकारिक कार्य आदेश (वर्क ऑर्डर) प्राप्त होने से पहले तालाब की खुदाई न करें।',
    },
    ta: {
      title: 'கிருஷி பாக்யா திட்டம் (Krishi Bhagya)',
      whatItGives: 'பண்ணைக் குட்டை அமைத்தல், பாலித்தீன் லைனிங் மற்றும் சொட்டு நீர் பாசனத்திற்கு 80% முதல் 90% வரை மானியம்.',
      whoItIsFor: 'குறைந்தபட்சம் 0.5 ஏக்கர் நிலமுள்ள கர்நாடக மானாவாரி பகுதி விவசாயிகள்.',
      watchFor: 'வேளாண் அதிகாரியின் பணி ஆணை (Work Order) பெற்ற பிறகே குட்டை வெட்ட வேண்டும்.',
    },
    ml: {
      title: 'കൃഷി ഭാഗ്യ പദ്ധതി (Krishi Bhagya)',
      whatItGives: 'ഫാം കുളങ്ങൾ (കൃഷി ഹോണ്ട), പോളിത്തീൻ ലൈനിംഗ്, തുള്ളിനന എന്നിവയ്ക്കായി 80% മുതൽ 90% വരെ സബ്‌സിഡി.',
      whoItIsFor: 'കുറഞ്ഞത് 0.5 ഏക്കർ വരണ്ട ഭൂമിയുള്ള കർണാടകയിലെ കർഷകർ.',
      watchFor: 'ഔദ്യോഗിക വർക്ക് ഓർഡർ ലഭിച്ചതിന് ശേഷം മാത്രമേ ഫാം കുളത്തിന്റെ നിർമ്മാണം തുടങ്ങാവൂ.',
    },
  },
  'fruits-farmer-id': {
    en: {
      title: 'FRUITS Farmer ID (Karnataka Single Window)',
      whatItGives: 'Permanent 8-9 digit Farmer Identification Number (FID) linking Bhoomi land record, bank, and Aadhaar.',
      whoItIsFor: 'Every cultivator in Karnataka seeking any state benefit or minimum support price (MSP).',
      watchFor: 'Spelling mismatch between Aadhaar and Pahani name can fail registration; obtain Name Variation certificate.',
    },
    kn: {
      title: 'ಫ್ರೂಟ್ಸ್ ಫಾರ್ಮರ್ ಐಡಿ (FRUITS Farmer ID)',
      whatItGives: '೮ ಅಥವಾ ೯ ಅಂಕಿಯ ಶಾಶ್ವತ ರೈತ ಗುರುತಿನ ಸಂಖ್ಯೆ (FID). ಇದು ಭೂಮಿ ಪಹಣಿ, ಬ್ಯಾಂಕ್ ಖಾತೆ ಮತ್ತು ಆಧಾರ್ ಅನ್ನು ಜೋಡಿಸುತ್ತದೆ.',
      whoItIsFor: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಯಾವುದೇ ಸರ್ಕಾರಿ ಸೌಲಭ್ಯ, ರಾಗಿ/ಭತ್ತದ ಬೆಂಬಲ ಬೆಲೆ (MSP) ಅಥವಾ ಪರಿಹಾರ ಪಡೆಯುವ ಪ್ರತಿಯೊಬ್ಬ ರೈತರು.',
      watchFor: 'ಪಹಣಿ (RTC) ಯಲ್ಲಿರುವ ಹೆಸರು ಮತ್ತು ಆಧಾರ್‌ನಲ್ಲಿರುವ ಹೆಸರಿನ ಅಕ್ಷರ ವ್ಯತ್ಯಾಸವಿದ್ದರೆ ನೋಂದಣಿ ತಿರಸ್ಕೃತವಾಗಬಹುದು. ಗ್ರಾಮ ಲೆಕ್ಕಿಗರಿಂದ ವ್ಯತ್ಯಾಸ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ.',
    },
    hi: {
      title: 'फ्रूट्स किसान आईडी (FRUITS Farmer ID)',
      whatItGives: 'स्थायी 8-9 अंकों का किसान पहचान नंबर (FID) जो भूमि रिकॉर्ड, बैंक और आधार को एकीकृत करता है।',
      whoItIsFor: 'कर्नाटक के प्रत्येक किसान के लिए सरकारी योजनाओं और एमएसपी खरीद का लाभ लेने हेतु अनिवार्य।',
      watchFor: 'आधार और खतौनी के नाम में अक्षरों की भिन्नता होने पर ग्राम लेखापाल से नाम सत्यापन पत्र लें।',
    },
    ta: {
      title: 'FRUITS உழவர் அடையாள அட்டை (FRUITS FID)',
      whatItGives: 'நில ஆவணம், வங்கி மற்றும் ஆதாரை இணைக்கும் நிரந்தர 8-9 இலக்க உழவர் அடையாள எண் (FID).',
      whoItIsFor: 'கர்நாடகாவில் அரசு நலத்திட்டங்களை பெற விரும்பும் அனைத்து விவசாயிகளும்.',
      watchFor: 'பட்டா மற்றும் ஆதார் பெயரில் எழுத்துப் பிழை இருந்தால் கிராம நிர்வாக அலுவலரை அணுகவும்.',
    },
    ml: {
      title: 'ഫ്രൂട്ട്സ് ഫാർമർ ഐഡി (FRUITS Farmer ID)',
      whatItGives: 'ഭൂരേഖ, ബാങ്ക്, ആധാർ എന്നിവ ബന്ധിപ്പിക്കുന്ന സ്ഥിരമായ 8-9 അക്ക കർഷക തിരിച്ചറിയൽ നമ്പർ (FID).',
      whoItIsFor: 'കർണാടകയിലെ ആനുകൂല്യങ്ങളും താങ്ങുവിലയും (MSP) ലഭിക്കാൻ ആഗ്രഹിക്കുന്ന എല്ലാ കർഷകർക്കും നിർബന്ധം.',
      watchFor: 'ആധാറിലെയും പട്ടയത്തിലെയും പേരിലെ വ്യത്യാസങ്ങൾ തിരുത്താൻ വില്ലേജ് ഓഫീസറെ സമീപിക്കുക.',
    },
  },
  'pm-fasal-bima-yojana': {
    en: {
      title: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
      whatItGives: 'Comprehensive crop insurance against drought, dry spells, pests, with farmer paying only 2% premium for Kharif.',
      whoItIsFor: 'All farmers cultivating notified crops (Ragi, Paddy, Pulses) in notified insurance units.',
      watchFor: 'Strict seasonal cut-off dates (July 31st for Kharif); damage must be reported within 72 hours.',
    },
    kn: {
      title: 'ಪ್ರಧಾನಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (PMFBY)',
      whatItGives: 'ಬರ, ಅನಾವೃಷ್ಟಿ, ಕೀಟಬಾಧೆಯಿಂದ ಬೆಳೆ ಹಾನಿಯಾದರೆ ವಿಮಾ ಪರಿಹಾರ. ರೈತರು ಕೇವಲ ಶೇಕಡಾ ೨ ರಷ್ಟು ಮಾತ್ರ ಪ್ರೀಮಿಯಂ ಪಾವತಿಸಬೇಕು.',
      whoItIsFor: 'ಅಧಿಸೂಚಿತ ಪ್ರದೇಶದಲ್ಲಿ ರಾಗಿ, ಭತ್ತ, ದ್ವಿದಳ ಧಾನ್ಯ ಬೆಳೆಯುವ ಎಲ್ಲಾ ರೈತರು.',
      watchFor: 'ಖಾರಿಫ್ ಹಂಗಾಮಿಗೆ ಜುಲೈ ೩೧ ರ ಕಟ್ಟುನಿಟ್ಟಿನ ಕೊನೆಯ ದಿನಾಂಕ. ಬೆಳೆ ಹಾನಿಯಾದರೆ ೭೨ ಗಂಟೆಗಳ ಒಳಗೆ ದೂರು ದಾಖಲಿಸಬೇಕು.',
    },
    hi: {
      title: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
      whatItGives: 'सूखे, बाढ़ व कीट प्रकोप से फसल क्षति पर बीमा सुरक्षा, किसान को खरीफ में केवल 2% प्रीमियम देना होता है।',
      whoItIsFor: 'अधिसूचित क्षेत्रों में रागी, धान और दलहन उगाने वाले सभी किसान।',
      watchFor: 'खरीफ के लिए 31 जुलाई की अंतिम तिथि; नुकसान होने पर 72 घंटे में सूचना देना अनिवार्य।',
    },
    ta: {
      title: 'பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)',
      whatItGives: 'வறட்சி மற்றும் பூச்சித் தாக்குதலால் ஏற்படும் சேதத்திற்கு காப்பீடு. காரீஃப் பயிருக்கு 2% மட்டுமே பிரீமியம்.',
      whoItIsFor: 'அறிவிக்கப்பட்ட பகுதிகளில் கேழ்வரகு, நெல் பயிரிடும் அனைத்து விவசாயிகளும்.',
      watchFor: 'ஜூலை 31 இறுதி தேதி; பயிர் சேதமடைந்தால் 72 மணி நேரத்திற்குள் புகார் அளிக்க வேண்டும்.',
    },
    ml: {
      title: 'പ്രധാനമന്ത്രി ഫസൽ ബീമാ യോജന (PMFBY)',
      whatItGives: 'വരൾച്ച, കീടബാധ എന്നിവയിൽ നിന്നുള്ള വിള ഇൻഷുറൻസ് സംരക്ഷണം. കർഷകർ 2% മാത്രം പ്രീമിയം നൽകിയാൽ മതി.',
      whoItIsFor: 'അറിയിക്കപ്പെട്ട പ്രദേശങ്ങളിൽ റാഗി, നെല്ല് കൃഷി ചെയ്യുന്ന കർഷകർ.',
      watchFor: 'സീസണൽ സമയപരിധി കർശനമാണ്; നാശനഷ്ടമുണ്ടായാൽ 72 മണിക്കൂറിനകം അറിയിക്കണം.',
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

export function getAllSchemes(locale: Locale = 'en'): Scheme[] {
  return SCHEMES_DATA.map((scheme) => {
    const translation = SCHEME_TRANSLATIONS[scheme.slug]?.[locale];
    if (!translation) return scheme;
    return {
      ...scheme,
      ...translation,
      isMachineTranslated: locale !== 'en',
    };
  });
}
