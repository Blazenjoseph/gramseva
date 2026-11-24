import { NewsItem, Locale } from '@/types';

export const NEWS_ITEMS_DATA: NewsItem[] = [
  {
    id: 'news-1',
    title: 'PM-KISAN 24th instalment released on 30 October 2026, about 9.34 crore farmers, over ₹18,690 crore transferred',
    summary: 'The central government has released the 24th instalment on 30 October 2026, crediting ₹2,000 directly via DBT to about 9.34 crore eligible farmers, with over ₹18,690 crore transferred. (to be checked against PIB release)',
    category: 'payment-release',
    schemeSlug: 'pm-kisan',
    state: 'All India',
    publishedAt: '2026-10-30',
    lastVerifiedOn: '2026-11-23',
    sourceUrl: 'https://pmkisan.gov.in',
    verifiedBy: 'National Agriculture Welfare Desk',
    verificationNote: 'to be checked against PIB release',
  },
  {
    id: 'news-2',
    title: 'PMFBY Kharif 2026 enrolment progress reported by PIB on 29 August 2026',
    summary: 'PIB reported national enrolment progress for Kharif 2026 seasonal coverage. Detailed financial figures to be entered only after checking the official PIB release.',
    category: 'verification',
    schemeSlug: 'pm-fasal-bima-yojana',
    state: 'All India',
    publishedAt: '2026-08-29',
    lastVerifiedOn: '2026-11-23',
    sourceUrl: 'https://pib.gov.in',
    verifiedBy: 'PIB Agriculture Desk',
    verificationNote: 'Enter figures only after checking the PIB page.',
  },
  {
    id: 'news-3',
    title: 'Krishi Bhagya Farm Pond Applications Open for Rainfed Taluks',
    summary: 'Applications are now being received across 100+ dryland taluks for farm pond construction and polythene lining subsidies up to 90% [amounts to be verified]. Priority given to marginal farmers.',
    category: 'deadline',
    schemeSlug: 'krishi-bhagya',
    state: 'Karnataka',
    publishedAt: '2026-10-28',
    lastVerifiedOn: '2026-11-23',
    sourceUrl: 'https://raitamitra.karnataka.gov.in',
    verifiedBy: 'Group 5 Field Studies Unit',
    verificationNote: 'Amounts to be verified against department budget notification.',
  },
  {
    id: 'news-4',
    title: 'Special Drive at Grama One Kiosks for FRUITS FID Name Corrections',
    summary: 'Revenue and Agriculture Departments announce zero-fee verification camps across hoblis to resolve spelling discrepancies between Bhoomi Pahani and Aadhaar cards.',
    category: 'portal-update',
    schemeSlug: 'fruits-farmer-id',
    state: 'Karnataka',
    publishedAt: '2026-10-15',
    lastVerifiedOn: '2026-11-23',
    sourceUrl: 'https://fruits.karnataka.gov.in',
    verifiedBy: 'Group 5 Data Team',
  },
];

export const NEWS_TRANSLATIONS: Record<string, Record<Locale, { title: string; summary: string }>> = {
  'news-1': {
    en: {
      title: 'PM-KISAN 24th instalment released on 30 October 2026, about 9.34 crore farmers, over ₹18,690 crore transferred',
      summary: 'Central government released the 24th instalment on 30 October 2026 to ~9.34 crore farmers (over ₹18,690 crore). (to be checked against PIB release)',
    },
    kn: {
      title: 'ಪಿಎಂ-ಕಿಸಾನ್ ೨೪ ನೇ ಕಂತು ಬಿಡುಗಡೆ (೩೦ ಅಕ್ಟೋಬರ್ ೨೦೨೬): ೯.೩೪ ಕೋಟಿ ರೈತರಿಗೆ ₹೧೮,೬೯೦ ಕೋಟಿಗೂ ಹೆಚ್ಚು ಜಮೆ',
      summary: 'ಕೇಂದ್ರ ಸರ್ಕಾರದಿಂದ ೨೪ ನೇ ಕಂತು ಜಮೆ. (ಪಿಐಬಿ ಪ್ರಕಟಣೆಯೊಂದಿಗೆ ಪರಿಶೀಲಿಸಬೇಕಾಗಿದೆ).',
    },
    hi: {
      title: 'पीएम-किसान 24वीं किस्त जारी (30 अक्टूबर 2026): 9.34 करोड़ किसानों को ₹18,690 करोड़ से अधिक हस्तांतरित',
      summary: 'केंद्रीय सरकार द्वारा 24वीं किस्त जारी। (पीआईबी विज्ञप्ति से मिलान किया जाना शेष है)।',
    },
    ta: {
      title: 'பிஎம்-கிசான் 24வது தவணை வெளியீடு: 9.34 கோடி விவசாயிகளுக்கு ரூ.18,690 கோடி வரவு',
      summary: '24வது தவணை அக்டோபர் 30, 2026 அன்று விடுவிக்கப்பட்டது. (PIB செய்திக் குறிப்புடன் சரிபார்க்கப்பட வேண்டும்).',
    },
    ml: {
      title: 'പിഎം-കിസാൻ 24-ാം ഗഡു വിതരണം ആരംഭിച്ചു: 9.34 കോടി കർഷകർക്ക് ₹18,690 കോടി',
      summary: '2026 ഒക്ടോബർ 30-ന് 24-ാം ഗഡു വിതരണം ചെയ്തു. (പിഐബി റിപ്പോർട്ട് അനുസരിച്ച് സ്ഥിരീകരിക്കേണ്ടതുണ്ട്).',
    },
    te: {
      title: 'పీఎం-కిసాన్ 24వ విడత నిధుల జమ (30 అక్టోబర్ 2026): 9.34 కోట్ల మంది రైతులకు ₹18,690 కోట్లకు పైగా బదిలీ',
      summary: 'రైతుల ఖాతాల్లో 24వ విడత నిధులు జమ చేయబడ్డాయి. (పీఐబీ ప్రకటనతో సరిపోల్చి ధృవీకరించుకోవాలి).',
    },
  },
  'news-2': {
    en: {
      title: 'PMFBY Kharif 2026 enrolment progress reported by PIB on 29 August 2026',
      summary: 'PIB reported Kharif 2026 crop insurance progress on 29 August 2026. Enter figures only after checking the PIB page.',
    },
    kn: {
      title: 'ಪಿಎಂಎಫ್‌ಬಿವೈ ಮುಂಗಾರು ೨೦೨೬ ನೋಂದಣಿ ಪ್ರಗತಿ (ಪಿಐಬಿ ವರದಿ - ೨೯ ಆಗಸ್ಟ್ ೨೦೨೬)',
      summary: 'ಪಿಐಬಿ ಪುಟವನ್ನು ಪರಿಶೀಲಿಸಿದ ನಂತರವೇ ನಿಖರ ಅಂಕಿಅಂಶಗಳನ್ನು ನಮೂದಿಸಬೇಕು.',
    },
    hi: {
      title: 'पीएमएफबीवाई खरीफ 2026 नामांकन प्रगति (पीआईबी रिपोर्ट - 29 अगस्त 2026)',
      summary: 'पीआईबी पृष्ठ की पुष्टि के बाद ही आधिकारिक आंकड़े दर्ज किए जाने हैं।',
    },
    ta: {
      title: 'PMFBY காரீஃப் 2026 பதிவு முன்னேற்றம் (PIB அறிக்கை - 29 ஆகஸ்ட் 2026)',
      summary: 'PIB பக்கத்தை சரிபார்த்த பின்னரே விவரங்களை உள்ளிடவும்.',
    },
    ml: {
      title: 'പിഎംഎഫ്ബിവൈ ഖാരിഫ് 2026 എൻറോൾമെന്റ് പുരോഗതി (പിഐബി റിപ്പോർട്ട്)',
      summary: 'പിഐബി പേജ് പരിശോധിച്ച ശേഷം മാത്രം വിവരങ്ങൾ രേഖപ്പെടുത്തുക.',
    },
    te: {
      title: 'పీఎంఎఫ్‌బీవై ఖరీఫ్ 2026 నమోదు పురోగతి (పీఐబీ నివేదిక - 29 ఆగస్టు 2026)',
      summary: 'పీఐబీ పేజీని పరిశీలించిన తర్వాతే అధికారిక గణాంకాలను నమోదు చేయాలి.',
    },
  },
  'news-3': {
    en: {
      title: 'Krishi Bhagya Farm Pond Applications Open for Rainfed Taluks',
      summary: 'Applications open for farm ponds and lining subsidies for small dryland farmers [amounts to be verified].',
    },
    kn: {
      title: 'ಮಳೆಯಾಶ್ರಿತ ತಾಲೂಕುಗಳಲ್ಲಿ ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಾಣಕ್ಕೆ ಅರ್ಜಿ ಆಹ್ವಾನ',
      summary: 'ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆಯಡಿ ಕೃಷಿ ಹೊಂಡ ಹಾಗೂ ಪಾಲಿಥಿನ್ ಹೊದಿಕೆಗೆ ಅರ್ಜಿ ಆರಂಭವಾಗಿದೆ [ಸಹಾಯಧನ ಪರಿಶೀಲನೆ ಬಾಕಿ].',
    },
    hi: {
      title: 'वर्षा आधारित क्षेत्रों में कृषि भाग्य खेत तालाब हेतु आवेदन शुरू',
      summary: 'छोटे किसानों के लिए खेत तालाब और लाइनिंग हेतु आवेदन आमंत्रित [राशि सत्यापन लंबित]।',
    },
    ta: {
      title: 'மானாவாரி பகுதிகளில் கிருஷி பாக்யா பண்ணைக் குட்டை விண்ணப்பங்கள் தொடக்கம்',
      summary: 'மானாவாரி விவசாயிகளுக்கு பண்ணைக் குட்டை அமைக்க விண்ணப்பங்கள் வரவேற்கப்படுகின்றன [தொகை சரிபார்ப்பு].',
    },
    ml: {
      title: 'കൃഷി ഭാഗ്യ ഫാം കുളങ്ങൾ: അപേക്ഷകൾ ക്ഷണിക്കുന്നു',
      summary: 'വരൾച്ചാ ബാധിത പ്രദേശങ്ങളിൽ ഫാം കുളങ്ങൾ നിർമ്മിക്കാൻ അപേക്ഷിക്കാം [തുക സ്ഥിരീകരിക്കേണ്ടതുണ്ട്].',
    },
    te: {
      title: 'వర్షాధార ప్రాంతాల్లో కృషి భాగ్య వ్యవసాయ కుంటలకు దరఖాస్తులు ప్రారంభం',
      summary: 'చిన్న రైతులకు వ్యవసాయ కుంటలు మరియు పాలిథిన్ లైనింగ్ కొరకు దరఖాస్తులు [మొత్తాలు ధృవీకరించాలి].',
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
    te: {
      title: 'రైతు గుర్తింపు కార్డు (FRUITS) పేరు సవరణల కొరకు ప్రత్యేక శిబిరాలు',
      summary: 'భూమి రికార్డు మరియు ఆధార్ కార్డులో పేర్ల తేడాలు ఉన్న రైతులకు ఉచిత సవరణ కేంద్రాలు ఏర్పాటు.',
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
