import { NewsItem, Locale } from '@/types';

export const NEWS_ITEMS_DATA: NewsItem[] = [
  {
    id: 'news-1',
    title: '19th Instalment of PM-KISAN Credited via DBT: Land Seeding Checks Underway',
    summary: 'The central government has released the latest ₹2,000 instalment. Beneficiaries whose status shows "FTO Pending" or "Land Seeding: No" must complete mobile eKYC or submit RTC copy at their taluk RSK immediately.',
    category: 'payment-release',
    schemeSlug: 'pm-kisan',
    publishedAt: '2026-11-10',
    lastVerifiedOn: '2026-11-15',
    sourceUrl: 'https://pmkisan.gov.in',
    verifiedBy: 'Group 5 Research Desk'
  },
  {
    id: 'news-2',
    title: 'Karnataka Raitha Siri 2026-27 Millet Incentive: Bele Samikshe Mandatory',
    summary: 'Department of Agriculture issues circular re-affirming that ragi and minor millet incentives of ₹10,000/ha will be processed strictly from geo-tagged records in the Karnataka Bele Samikshe app. Farmers are advised to check crop entries.',
    category: 'verification',
    schemeSlug: 'raitha-siri',
    publishedAt: '2026-11-05',
    lastVerifiedOn: '2026-11-15',
    sourceUrl: 'https://raitamitra.karnataka.gov.in',
    verifiedBy: 'Group 5 Agriculture Policy Desk'
  },
  {
    id: 'news-3',
    title: 'Krishi Bhagya Farm Pond Applications Open for Rainfed Taluks',
    summary: 'Applications are now being received across 100+ dryland taluks for farm pond construction and polythene lining subsidies up to 90%. Priority given to marginal farmers with 0.5 to 2.5 acres.',
    category: 'deadline',
    schemeSlug: 'krishi-bhagya',
    publishedAt: '2026-10-28',
    lastVerifiedOn: '2026-11-14',
    sourceUrl: 'https://raitamitra.karnataka.gov.in',
    verifiedBy: 'Group 5 Field Studies Unit'
  },
  {
    id: 'news-4',
    title: 'Special Drive at Grama One Kiosks for FRUITS FID Name Corrections',
    summary: 'Revenue and Agriculture Departments announce zero-fee verification camps across hoblis to resolve spelling discrepancies between Bhoomi Pahani and Aadhaar cards.',
    category: 'portal-update',
    schemeSlug: 'fruits-farmer-id',
    publishedAt: '2026-10-15',
    lastVerifiedOn: '2026-11-12',
    sourceUrl: 'https://fruits.karnataka.gov.in',
    verifiedBy: 'Group 5 Data Team'
  }
];

export const NEWS_TRANSLATIONS: Record<string, Record<Locale, { title: string; summary: string }>> = {
  'news-1': {
    en: {
      title: '19th Instalment of PM-KISAN Credited via DBT: Land Seeding Checks Underway',
      summary: 'Central government releases latest instalment. Beneficiaries with Land Seeding: No must update RTC copy at RSK.',
    },
    kn: {
      title: 'ಪಿಎಂ-ಕಿಸಾನ್ ೧೯ ನೇ ಕಂತಿನ ಹಣ ಜಮೆ: ಪಹಣಿ ಸೀಡಿಂಗ್ ಕಡ್ಡಾಯ',
      summary: 'ಕೇಂದ್ರ ಸರ್ಕಾರದಿಂದ ರೈತರ ಖಾತೆಗೆ ₹೨,೦೦೦ ಜಮೆ. ಖಾತೆಗೆ ಹಣ ಬರದವರು ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದಲ್ಲಿ ಪಹಣಿ ಹಾಗೂ ಇ-ಕೆವೈಸಿ ಪರಿಶೀಲಿಸಿ.',
    },
    hi: {
      title: 'पीएम-किसान की 19वीं किस्त जारी: भूमि सीडिंग जांच जारी',
      summary: '₹2,000 की नई किस्त जारी। यदि पैसा नहीं आया तो तुरंत आरटीसी और ई-केवाईसी की स्थिति जांचें।',
    },
    ta: {
      title: 'பிஎம்-கிசான் 19வது தவணை வரவு: நில ஆவண சரிபார்ப்பு',
      summary: 'விவசாயிகளுக்கு ரூ.2,000 வரவு வைக்கப்பட்டுள்ளது. வராதவர்கள் உடனடியாக நில ஆவண நிலையை சரிபார்க்கவும்.',
    },
    ml: {
      title: 'പിഎം-കിസാൻ 19-ാം ഗഡു വിതരണം ആരംഭിച്ചു',
      summary: '₹2,000 കർഷകരുടെ അക്കൗണ്ടിൽ എത്തിത്തുടങ്ങി. തുക ലഭിക്കാത്തവർ ഇ-കെവൈസി പരിശോധിക്കുക.',
    },
  },
  'news-2': {
    en: {
      title: 'Karnataka Raitha Siri Millet Incentive: Bele Samikshe Verification Mandatory',
      summary: 'Department of Agriculture confirms ₹10,000/ha millet assistance requires verified entries in Bele Samikshe app.',
    },
    kn: {
      title: 'ರೈತ ಸಿರಿ ರಾಗಿ ಪ್ರೋತ್ಸಾಹಧನ: ಬೆಳೆ ಸಮೀಕ್ಷೆ ದಾಖಲು ಕಡ್ಡಾಯ',
      summary: 'ಹೆಕ್ಟೇರ್‌ಗೆ ₹೧೦,೦೦೦ ರಾಗಿ ಸಹಾಯಧನ ಪಡೆಯಲು ಬೆಳೆ ಸಮೀಕ್ಷೆ (ಸರ್ವೆ) ಆ್ಯಪ್‌ನಲ್ಲಿ ನಿಮ್ಮ ರಾಗಿ ಬೆಳೆ ವಿವರ ದಾಖಲಾಗಿರಬೇಕು.',
    },
    hi: {
      title: 'कर्नाटक रैता सिरी मोटा अनाज प्रोत्साहन: बेले समीक्षे अनिवार्य',
      summary: 'रागी और मोटे अनाज पर ₹10,000/हेक्टेयर की सहायता के लिए सरकारी फसल सर्वेक्षण में प्रविष्टि आवश्यक है।',
    },
    ta: {
      title: 'ரைதா சிரி கேழ்வரகு ஊக்கத்தொகை: பயிர் கணக்கெடுப்பு கட்டாயம்',
      summary: 'கேழ்வரகு விவசாயிகளுக்கான உதவித்தொகை பெற பயிர் சர்வேயில் பதிவு செய்திருப்பது அவசியம்.',
    },
    ml: {
      title: 'റൈത സിരി റാഗി ആനുകൂല്യം: ക്രോപ്പ് സർവേ നിർബന്ധം',
      summary: 'റാഗി കർഷകർക്കുള്ള ധനസഹായം ലഭിക്കാൻ ക്രോപ്പ് സർവേയിൽ വിളവിവരങ്ങൾ രേഖപ്പെടുത്തണം.',
    },
  },
  'news-3': {
    en: {
      title: 'Krishi Bhagya Farm Pond Applications Open for Rainfed Taluks',
      summary: 'Applications open for farm ponds and lining subsidies up to 90% for small dryland farmers.',
    },
    kn: {
      title: 'ಮಳೆಯಾಶ್ರಿತ ತಾಲೂಕುಗಳಲ್ಲಿ ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಾಣಕ್ಕೆ ಅರ್ಜಿ ಆಹ್ವಾನ',
      summary: 'ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆಯಡಿ ಶೇಕಡಾ ೮೦-೯೦ ಸಬ್ಸಿಡಿಯೊಂದಿಗೆ ಕೃಷಿ ಹೊಂಡ ಹಾಗೂ ಪಾಲಿಥಿನ್ ಹೊದಿಕೆಗೆ ಅರ್ಜಿ ಆರಂಭವಾಗಿದೆ.',
    },
    hi: {
      title: 'वर्षा आधारित क्षेत्रों में कृषि भाग्य खेत तालाब हेतु आवेदन शुरू',
      summary: 'छोटे किसानों के लिए 90% तक की सब्सिडी पर खेत तालाब और लाइनिंग हेतु आवेदन आमंत्रित।',
    },
    ta: {
      title: 'மானாவாரி பகுதிகளில் கிருஷி பாக்யா பண்ணைக் குட்டை விண்ணப்பங்கள் தொடக்கம்',
      summary: '90% வரை மானியத்துடன் பண்ணைக் குட்டை அமைக்க விவசாயிகளிடமிருந்து விண்ணப்பங்கள் வரவேற்கப்படுகின்றன.',
    },
    ml: {
      title: 'കൃഷി ഭാഗ്യ ഫാം കുളങ്ങൾ: അപേക്ഷകൾ ക്ഷണിക്കുന്നു',
      summary: 'വരൾച്ചാ ബാധിത പ്രദേശങ്ങളിൽ 90% വരെ സബ്‌സിഡിയോടെ ഫാം കുളങ്ങൾ നിർമ്മിക്കാൻ അപേക്ഷിക്കാം.',
    },
  },
  'news-4': {
    en: {
      title: 'Special Drive at Grama One Kiosks for FRUITS FID Name Corrections',
      summary: 'Hobli level camps resolving spelling mismatches between Bhoomi Pahani and Aadhaar cards.',
    },
    kn: {
      title: 'ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರಗಳಲ್ಲಿ ಫ್ರೂಟ್ಸ್ ಐಡಿ ಹೆಸರು ತಿದ್ದುಪಡಿ ವಿಶೇಷ ಅಭಿಯಾನ',
      summary: 'ಪಹಣಿ ಮತ್ತು ಆಧಾರ್ ಕಾರ್ಡ್‌ನಲ್ಲಿ ಹೆಸರಿನ ಅಕ್ಷರ ವ್ಯತ್ಯಾಸವಿರುವ ರೈತರಿಗೆ ಉಚಿತ ತಿದ್ದುಪಡಿ ಕೌಂಟರ್.',
    },
    hi: {
      title: 'ग्राम वन केंद्रों पर फ्रूट्स आईडी नाम सुधार विशेष शिविर',
      summary: 'खतौनी और आधार के नाम में वर्तनी की गलतियां ठीक करने के लिए विशेष अभियान।',
    },
    ta: {
      title: 'கிராம ஒன் மையங்களில் FRUITS பெயர் திருத்த சிறப்பு முகாம்',
      summary: 'பட்டா மற்றும் ஆதார் பெயரில் உள்ள முரண்பாடுகளை சரிசெய்ய சிறப்பு ஏற்பாடு.',
    },
    ml: {
      title: 'ഫ്രൂട്ട്സ് ഐഡി പേര് തിരുത്തൽ പ്രത്യേക ക്യാമ്പ്',
      summary: 'ഭൂരേഖയിലെയും ആധാറിലെയും അക്ഷരത്തെറ്റുകൾ സൗജന്യമായി തിരുത്താൻ സൗകര്യം.',
    },
  },
};

export function getNewsItems(locale: Locale = 'en'): NewsItem[] {
  return NEWS_ITEMS_DATA.map((item) => {
    const tr = NEWS_TRANSLATIONS[item.id]?.[locale];
    if (!tr) return item;
    return {
      ...item,
      title: tr.title,
      summary: tr.summary,
    };
  });
}
