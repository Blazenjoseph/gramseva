import { Locale } from '@/types';

export interface LocalizedGlossaryItem {
  id: string;
  termKey: string;
  englishTerm: string;
  term: Record<Locale, string>;
  simpleExplanation: Record<Locale, string>;
  whyItMatters: Record<Locale, string>;
  commonMistake: Record<Locale, string>;
}

export const GLOSSARY_DATA: LocalizedGlossaryItem[] = [
  {
    id: 'glossary-aadhaar',
    termKey: 'aadhaar',
    englishTerm: 'Aadhaar',
    term: {
      en: 'Aadhaar (Unique 12-Digit Identity)',
      kn: 'ಆಧಾರ್ (೧೨ ಅಂಕಿಯ ವಿಶಿಷ್ಟ ಗುರುತು)',
      hi: 'आधार (12 अंकों की विशिष्ट पहचान)',
      ta: 'ஆதார் (12 இலக்க தனித்துவ அடையாளம்)',
      ml: 'ആധാർ (12 അക്ക തിരിച്ചറിയൽ നമ്പർ)'
    },
    simpleExplanation: {
      en: 'A 12-digit biometric identity number issued by UIDAI used by government portals to verify that the farmer receiving benefits is a living, genuine person.',
      kn: 'ಸರ್ಕಾರ ನೀಡುವ ೧೨ ಅಂಕಿಯ ವಿಶಿಷ್ಟ ಗುರುತಿನ ಸಂಖ್ಯೆ. ಯೋಜನೆಯ ಫಲಾನುಭವಿ ನಿಜವಾದ ವ್ಯಕ್ತಿ ಎಂದು ದೃಢೀಕರಿಸಲು ಇದು ಬಳಕೆಯಾಗುತ್ತದೆ.',
      hi: 'यूआईडीएआई द्वारा जारी 12 अंकों का बायोमेट्रिक नंबर, जिसका उपयोग यह जांचने के लिए किया जाता है कि लाभार्थी वास्तविक किसान है।',
      ta: 'அரசு நலத்திட்டங்களை பெறும் விவசாயி உண்மையான நபர் என்பதை உறுதிப்படுத்த பயன்படும் 12 இலக்க எண்.',
      ml: 'സർക്കാർ ആനുകൂല്യങ്ങൾ ലഭിക്കുന്ന കർഷകൻ ജീവിച്ചിരിക്കുന്ന യഥാർത്ഥ വ്യക്തിയാണെന്ന് തെളിയിക്കുന്ന 12 അക്ക നമ്പർ.'
    },
    whyItMatters: {
      en: 'Required to prevent ghost beneficiaries and ensure scheme money goes directly into your registered bank account.',
      kn: 'ಮಧ್ಯವರ್ತಿಗಳ ಹಾವಳಿ ತಡೆಯಲು ಮತ್ತು ಸರ್ಕಾರದ ಹಣ ನೇರವಾಗಿ ನಿಮ್ಮ ಖಾತೆಗೆ ಬರಲು ಇದು ಕಡ್ಡಾಯ.',
      hi: 'बिचौलियों को रोकने और योजना की राशि सीधे आपके बैंक खाते में पहुंचाने के लिए अनिवार्य है।',
      ta: 'இடைத்தரகர்களை தடுக்கவும் அரசு பணம் நேரடியாக வங்கிக்கு வரவும் கட்டாயம்.',
      ml: 'ഇടനിലക്കാരെ ഒഴിവാക്കാനും ആനുകൂല്യം നേരിട്ട് അക്കൗണ്ടിൽ എത്താനും ഇത് അത്യാവശ്യമാണ്.'
    },
    commonMistake: {
      en: 'Assuming that giving your Aadhaar card photocopy to the bank automatically links it for DBT. You must explicitly request "NPCI DBT Seeding".',
      kn: 'ಬ್ಯಾಂಕಿಗೆ ಕೇವಲ ಆಧಾರ್ ಜೆರಾಕ್ಸ್ ಕೊಟ್ಟರೆ ಸಾಕು ಎಂದುಕೊಳ್ಳುವುದು. ನೀವು ಪ್ರತ್ಯೇಕವಾಗಿ "ಎನ್‌ಪಿಸಿಐ ಡಿಬಿಟಿ ಸೀಡಿಂಗ್" ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಬೇಕು.',
      hi: 'यह मान लेना कि बैंक में आधार फोटोकॉपी देना ही डीबीटी के लिए काफी है। आपको अलग से एनपीसीआई सीडिंग करानी होती है।',
      ta: 'ஆதார் நகல் கொடுத்தாலே பணம் வந்துவிடும் என்று நினைப்பது. தனியாக NPCI DBT இணைப்பு படிவம் தர வேண்டும்.',
      ml: 'ബാങ്കിൽ ആധാർ കോപ്പി നൽകിയാൽ മാത്രം പോരാ, പ്രത്യേകം NPCI DBT മാപ്പിംഗ് ഫോം പൂരിപ്പിച്ചു നൽകണം.'
    }
  },
  {
    id: 'glossary-ekyc',
    termKey: 'ekyc',
    englishTerm: 'eKYC (Electronic Know Your Customer)',
    term: {
      en: 'eKYC (Electronic Know Your Customer)',
      kn: 'ಇ-ಕೆವೈಸಿ (ವಿದ್ಯುನ್ಮಾನ ಗ್ರಾಹಕ ಪರಿಶೀಲನೆ)',
      hi: 'ई-केवाईसी (इलेक्ट्रॉनिक ग्राहक सत्यापन)',
      ta: 'இ-கேஒய்சி (மின்னணு வாடிக்கையாளர் சரிபார்ப்பு)',
      ml: 'ഇ-കെവൈസി (ഇലക്ട്രോണിക് കെവൈസി)'
    },
    simpleExplanation: {
      en: 'A digital check where you confirm your identity using an OTP sent to your Aadhaar-linked mobile phone or by placing your thumb on a biometric scanner.',
      kn: 'ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರುವ ಮೊಬೈಲ್ ನಂಬರ್‌ಗೆ ಬರುವ ಒಟಿಪಿ (OTP) ಅಥವಾ ಹೆಬ್ಬೆರಳಿನ ಗುರುತು (ಬಯೋಮೆಟ್ರಿಕ್) ಮೂಲಕ ಮಾಡುವ ಡಿಜಿಟಲ್ ಪರಿಶೀಲನೆ.',
      hi: 'आधार से जुड़े मोबाइल नंबर पर आने वाले ओटीपी (OTP) या बायोमेट्रिक फिंगरप्रिंट द्वारा की जाने वाली डिजिटल पहचान पुष्टि।',
      ta: 'ஆதார் இணைக்கப்பட்ட கைபேசி எண்ணிற்கு வரும் OTP அல்லது கைரேகை மூலம் செய்யப்படும் டிஜிட்டல் சரிபார்ப்பு.',
      ml: 'ആധാറുമായി ബന്ധിപ്പിച്ച മൊബൈൽ നമ്പറിലെ ഒടിപി വഴിയോ വിരലടയാളം വഴിയോ നടത്തുന്ന ഡിജിറ്റൽ പരിശോധന.'
    },
    whyItMatters: {
      en: 'Without periodic eKYC, schemes like PM-KISAN immediately pause upcoming instalments.',
      kn: 'ಇ-ಕೆವೈಸಿ ಮಾಡಿಸದಿದ್ದರೆ ಪಿಎಂ-ಕಿಸಾನ್ ಮುಂದಿನ ಕಂತಿನ ಹಣ ಜಮೆಯಾಗುವುದು ತಕ್ಷಣವೇ ನಿಂತುಹೋಗುತ್ತದೆ.',
      hi: 'ई-केवाईसी पूरा न होने पर पीएम-किसान की अगली किस्तें तुरंत रोक दी जाती हैं।',
      ta: 'இ-கேஒய்சி செய்யாவிட்டால் திட்ட உதவித்தொகை உடனடியாக நிறுத்தப்படும்.',
      ml: 'ഇ-കെവൈസി പൂർത്തിയാക്കിയില്ലെങ്കിൽ പിഎം-കിസാൻ ഉൾപ്പെടെയുള്ള പദ്ധതികളുടെ പണം നിലയ്ക്കും.'
    },
    commonMistake: {
      en: 'Changing your mobile SIM card without updating your Aadhaar record, causing OTPs to fail.',
      kn: 'ಮೊಬೈಲ್ ನಂಬರ್ ಬದಲಾಯಿಸಿ ಆಧಾರ್‌ನಲ್ಲಿ ಹಳೆಯ ನಂಬರ್ ಹಾಗೆಯೇ ಬಿಡುವುದು. ಇದರಿಂದ ಒಟಿಪಿ ಬಾರದೆ ತೊಂದರೆಯಾಗುತ್ತದೆ.',
      hi: 'मोबाइल नंबर बदल लेना लेकिन आधार केंद्र जाकर नया नंबर अपडेट न कराना, जिससे ओटीपी नहीं आता।',
      ta: 'கைபேசி எண் மாறிய பிறகும் ஆதாரில் பழைய எண்ணையே வைத்திருப்பது.',
      ml: 'മൊബൈൽ നമ്പർ മാറിയാലും ആധാറിൽ പുതിയ നമ്പർ അപ്ഡേറ്റ് ചെയ്യാതിരിക്കുക.'
    }
  },
  {
    id: 'glossary-land-record',
    termKey: 'land-record',
    englishTerm: 'Land Record (RTC / Pahani / Bhoomi)',
    term: {
      en: 'Land Record (Bhoomi RTC / Pahani)',
      kn: 'ಪಹಣಿ / ಆರ್‌ಟಿಸಿ (ಭೂಮಿ ದಾಖಲೆ)',
      hi: 'भूमि रिकॉर्ड (खतौनी / पाहणी / आरटीसी)',
      ta: 'பட்டா / சிட்டா / RTC (நில ஆவணம்)',
      ml: 'ഭൂരേഖ (പട്ടയം / ആർ.ടി.സി / പഹണി)'
    },
    simpleExplanation: {
      en: 'The official government paper (Form 16) issued by the Revenue Department showing who legally owns the land, survey number, acreage, soil type, and current crops.',
      kn: 'ಕಂದಾಯ ಇಲಾಖೆ ನೀಡುವ ಅಧಿಕೃತ ಭೂ ದಾಖಲೆ (ನಮೂನೆ ೧೬). ಜಮೀನಿನ ಮಾಲೀಕರು ಯಾರು, ಸರ್ವೆ ನಂಬರ್, ವಿಸ್ತೀರ್ಣ ಮತ್ತು ಬೆಳೆ ವಿವರಗಳನ್ನು ಇದು ತೋರಿಸುತ್ತದೆ.',
      hi: 'राजस्व विभाग द्वारा जारी आधिकारिक दस्तावेज जिसमें जमीन का मालिकाना हक, खसरा नंबर, रकबा और फसल का विवरण दर्ज होता है।',
      ta: 'நிலத்தின் உரிமையாளர், சர்வே எண், பரப்பளவு மற்றும் சாகுபடி பயிர் விவரங்களை காட்டும் அதிகாரப்பூர்வ வருவாய்த்துறை ஆவணம்.',
      ml: 'റവന്യൂ വകുപ്പ് നൽകുന്ന ഔദ്യോഗിക രേഖ; ഭൂമിയുടെ ഉടമസ്ഥൻ, സർവേ നമ്പർ, വിസ്തീർണ്ണം, വിളകൾ എന്നിവ ഇതിൽ കാണാം.'
    },
    whyItMatters: {
      en: 'Schemes cross-check your land size directly against the computerized Bhoomi database before sanctioning money.',
      kn: 'ಯೋಜನೆಗಳ ಹಣ ಬಿಡುಗಡೆ ಮಾಡುವ ಮುನ್ನ ಕೃಷಿ ಇಲಾಖೆಯು ನಿಮ್ಮ ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣವನ್ನು ಕಂಪ್ಯೂಟರೀಕೃತ ಭೂಮಿ ತಂತ್ರಾಂಶದೊಂದಿಗೆ ತಾಳೆ ನೋಡುತ್ತದೆ.',
      hi: 'कृषि विभाग योजना का लाभ देने से पहले कम्प्यूटरीकृत भूमि पोर्टल से आपके रकबे का मिलान करता है।',
      ta: 'அரசு மானியம் வழங்குவதற்கு முன் உங்கள் நில அளவை கணினி மூலம் நேரடியாக சரிபார்க்கிறது.',
      ml: 'ധനസഹായം അനുവദിക്കുന്നതിന് മുൻപ് റവന്യൂ ഡാറ്റാബേസിൽ നിന്ന് ഭൂമിയുടെ അളവ് പരിശോധിക്കുന്നു.'
    },
    commonMistake: {
      en: 'Relying on an ancestor’s name on the RTC after inheritance without completing the formal "Pouthi Khata" (Mutation) in your own name.',
      kn: 'ಹಿರಿಯರು ತೀರಿಕೊಂಡ ನಂತರ ಅವರ ಹೆಸರಿನಲ್ಲೇ ಪಹಣಿ ಬಿಡುವುದು. ವಾರಸುದಾರರ ಹೆಸರಿಗೆ "ಪೌತಿ ಖಾತೆ" (ಮ್ಯುಟೇಷನ್) ಮಾಡಿಸದೇ ಇದ್ದರೆ ಯೋಜನೆಗಳು ಸಿಗುವುದಿಲ್ಲ.',
      hi: 'पूर्वज के निधन के बाद अपने नाम पर फौती नामांतरण (वारिसान दर्ज) न कराना।',
      ta: 'முன்னோர்கள் மறைந்த பின் வாரிசுரிமை பட்டா மாற்றம் செய்யாமல் விட்டுவிடுவது.',
      ml: 'പൂർവ്വികരുടെ മരണശേഷം സ്വന്തം പേരിലേക്ക് പോക്കുവരവ് (മ്യൂട്ടേഷൻ) ചെയ്യാതിരിക്കുക.'
    }
  },
  {
    id: 'glossary-fruits-id',
    termKey: 'fruits-id',
    englishTerm: 'FRUITS Farmer ID (FID)',
    term: {
      en: 'FRUITS Farmer ID (FID)',
      kn: 'ಫ್ರೂಟ್ಸ್ ಫಾರ್ಮರ್ ಐಡಿ (FID)',
      hi: 'फ्रूट्स किसान पहचान संख्या (FID)',
      ta: 'FRUITS உழவர் அடையாள எண் (FID)',
      ml: 'ഫ്രൂട്ട്സ് ഫാർമർ ഐഡി (FID)'
    },
    simpleExplanation: {
      en: 'Karnataka’s unified single-window digital farmer card. An 8 or 9-digit registration number linking your Bhoomi land, bank, and crop data.',
      kn: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಏಕಗವಾಕ್ಷಿ ಡಿಜಿಟಲ್ ರೈತ ಗುರುತಿನ ಚೀಟಿ. ಇದು ನಿಮ್ಮ ಜಮೀನಿನ ಪಹಣಿ, ಬ್ಯಾಂಕ್ ಖಾತೆ ಮತ್ತು ಬೆಳೆ ವಿವರಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸುವ ೮-೯ ಅಂಕಿಯ ಸಂಖ್ಯೆ.',
      hi: 'कर्नाटक सरकार का एकल-खिड़की डिजिटल किसान कार्ड, जो भूमि, बैंक और फसलों को एक 8-9 अंकों के नंबर से जोड़ता है।',
      ta: 'கர்நாடக அரசின் ஒற்றைச் சாளர டிஜிட்டல் உழவர் அடையாள அட்டை (8-9 இலக்க எண்).',
      ml: 'ഭൂരേഖയും ബാങ്കും വിളകളും ബന്ധിപ്പിക്കുന്ന കർണാടക സർക്കാരിന്റെ 8-9 അക്ക തിരിച്ചറിയൽ നമ്പർ.'
    },
    whyItMatters: {
      en: 'Without an active FID, Karnataka state schemes like Raitha Siri, Krishi Bhagya, and MSP procurement centers cannot accept applications.',
      kn: 'ಎಫ್‌ಐಡಿ (FID) ಇಲ್ಲದೆ ರೈತ ಸಿರಿ, ಕೃಷಿ ಭಾಗ್ಯ ಅಥವಾ ರಾಗಿ ಬೆಂಬಲ ಬೆಲೆ (MSP) ಖರೀದಿ ಕೇಂದ್ರಗಳಲ್ಲಿ ನೋಂದಣಿ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ.',
      hi: 'एफआईडी के बिना रैता सिरी, कृषि भाग्य या एमएसपी खरीद केंद्रों पर आवेदन स्वीकार नहीं किया जाता।',
      ta: 'FID எண் இல்லாமல் கர்நாடக மாநில விவசாய திட்டங்களையோ குறைந்தபட்ச ஆதரவு விலையையோ பெற முடியாது.',
      ml: 'റൈത സിരി, കൃഷി ഭാഗ്യ, താങ്ങുവില സംഭരണം എന്നിവയ്ക്ക് FID നമ്പർ നിർബന്ധമാണ്.'
    },
    commonMistake: {
      en: 'Thinking having an FID once means you never need to update it. When you purchase new survey parcels or drill a borewell, you must update your FID at the RSK.',
      kn: 'ಒಮ್ಮೆ ಎಫ್‌ಐಡಿ ಮಾಡಿಸಿದರೆ ಮುಗಿಯಿತು ಅಂದುಕೊಳ್ಳುವುದು. ಹೊಸ ಜಮೀನು ಸೇರ್ಪಡೆ ಮಾಡಿದಾಗ ಅಥವಾ ಬೋರ್‌ವೆಲ್ ಕೊರೆಸಿದಾಗ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದಲ್ಲಿ ನವೀಕರಿಸಬೇಕು.',
      hi: 'यह सोचना कि एक बार FID बन गया तो कभी अपडेट नहीं करना। नई जमीन लेने या बोरवेल कराने पर इसे अपडेट कराना जरूरी है।',
      ta: 'புதிய நிலம் வாங்கும் போது FID-யில் சேர்க்காமல் விட்டுவிடுவது.',
      ml: 'പുതിയ ഭൂമി വാങ്ങുകയോ കുഴൽക്കിണർ സ്ഥാപിക്കുകയോ ചെയ്യുമ്പോൾ FID അപ്ഡേറ്റ് ചെയ്യാതിരിക്കുക.'
    }
  },
  {
    id: 'glossary-npci-seeding',
    termKey: 'npci-seeding',
    englishTerm: 'NPCI Aadhaar DBT Seeding',
    term: {
      en: 'NPCI Aadhaar DBT Seeding',
      kn: 'ಎನ್‌ಪಿಸಿಐ ಆಧಾರ್ ಡಿಬಿಟಿ ಸೀಡಿಂಗ್ (NPCI DBT Seeding)',
      hi: 'एनपीसीआई आधार डीबीटी सीडिंग',
      ta: 'NPCI ஆதார் DBT இணைப்பு',
      ml: 'NPCI ആധാർ DBT സീഡിംഗ്'
    },
    simpleExplanation: {
      en: 'Mapping your Aadhaar number to one specific bank account on the national central payment server (NPCI) so direct government welfare money arrives automatically.',
      kn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಹಣ ನೇರವಾಗಿ ಬಂದು ಜಮೆಯಾಗಲು ನಿಮ್ಮ ಯಾವುದಾದರೂ ಒಂದು ಪ್ರಮುಖ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ರಾಷ್ಟ್ರೀಯ ಪಾವತಿ ನಿಗಮದಲ್ಲಿ (NPCI) ಆಧಾರ್ ನಂಬರ್ ಜೋಡಿಸುವುದು.',
      hi: 'राष्ट्रीय भुगतान निगम (NPCI) के सर्वर पर अपने एक विशिष्ट बैंक खाते को आधार से जोड़ना ताकि सरकारी पैसा सीधे उसी में पहुंचे।',
      ta: 'அரசு நலத்திட்ட நிதி நேரடியாக வந்து சேர, தேசிய கட்டண சர்வரில் குறிப்பிட்ட ஒரு வங்கிக் கணக்கை ஆதாருடன் இணைப்பது.',
      ml: 'സർക്കാർ ആനുകൂല്യങ്ങൾ തടസ്സമില്ലാതെ ലഭിക്കാൻ ദേശീയ പേയ്‌മെന്റ് സർവറിൽ ആധാർ ബാങ്ക് അക്കൗണ്ടുമായി ബന്ധിപ്പിക്കുന്നത്.'
    },
    whyItMatters: {
      en: 'You can have three bank accounts, but DBT can only flow into the one single account mapped on NPCI.',
      kn: 'ನಿಮಗೆ ಮೂರು ಬ್ಯಾಂಕ್ ಖಾತೆಗಳಿರಬಹುದು, ಆದರೆ ಸರ್ಕಾರದ ಹಣ ಜಮೆಯಾಗುವುದು ಎನ್‌ಪಿಸಿಐನಲ್ಲಿ ಮ್ಯಾಪ್ ಆಗಿರುವ ಒಂದೇ ಖಾತೆಗೆ.',
      hi: 'आपके पास तीन खाते हो सकते हैं, लेकिन सरकारी डीबीटी केवल उसी एक खाते में आएगी जो एनपीसीआई पर मैप होगा।',
      ta: 'உங்களிடம் பல வங்கிக் கணக்குகள் இருந்தாலும், NPCI-ல் இணைக்கப்பட்ட ஒரே ஒரு கணக்கிற்கு மட்டுமே அரசு பணம் வரும்.',
      ml: 'നിങ്ങൾക്ക് പല ബാങ്കുകളിൽ അക്കൗണ്ട് ഉണ്ടാകാമെങ്കിലും NPCI-ൽ ലിങ്ക് ചെയ്തിട്ടുള്ള ഒരു അക്കൗണ്ടിലേക്ക് മാത്രമേ DBT തുക വരൂ.'
    },
    commonMistake: {
      en: 'When a bank account goes dormant due to no transactions, DBT transactions bounce silently without notifying the farmer.',
      kn: 'ಬಹಳ ದಿನಗಳಿಂದ ಬ್ಯಾಂಕ್ ವಹಿವಾಟು ನಡೆಸದೆ ಖಾತೆ ನಿಷ್ಕ್ರಿಯವಾದರೆ (Dormant), ಸರ್ಕಾರದ ಹಣ ಜಮೆಯಾಗದೆ ವಾಪಸ್ ಹೋಗುತ್ತದೆ.',
      hi: 'खाते में लेनदेन न होने से उसका इनएक्टिव हो जाना, जिससे डीबीटी का पैसा बिना सूचना के अटक जाता है।',
      ta: 'நீண்ட நாட்கள் பணப் பரிவர்த்தனை செய்யாமல் கணக்கு முடங்கிப் போனால் அரசு பணம் திரும்புதல்.',
      ml: 'ഇടപാടുകൾ നടത്താതെ ബാങ്ക് അക്കൗണ്ട് മരവിച്ചുപോയാൽ DBT പണം കിട്ടാതെ വരുന്നു.'
    }
  },
  {
    id: 'glossary-instalment',
    termKey: 'instalment',
    englishTerm: 'Instalment (Kanthu / Kist)',
    term: {
      en: 'Instalment (Cycle Disbursal)',
      kn: 'ಕಂತು (ಸರ್ಕಾರಿ ಸಹಾಯಧನದ ಕಂತುಗಳು)',
      hi: 'किस्त (आवधिक भुगतान)',
      ta: 'தவணை (சுழற்சி உதவித்தொகை)',
      ml: 'ഗഡുക്കൾ (ആനുകൂല്യ വിതരണം)'
    },
    simpleExplanation: {
      en: 'Portion of total scheme benefit released in scheduled phases (e.g. ₹2,000 every 4 months under PM-KISAN, or phased construction payouts under Krishi Bhagya).',
      kn: 'ಯೋಜನೆಯ ಒಟ್ಟು ಮೊತ್ತವನ್ನು ನಿಗದಿತ ಕಾಲಾವಧಿಯಲ್ಲಿ ಹಂತ ಹಂತವಾಗಿ ಬಿಡುಗಡೆ ಮಾಡುವ ವಿಧಾನ (ಉದಾ: ಪಿಎಂ-ಕಿಸಾನ್‌ನ ಪ್ರತಿ ೪ ತಿಂಗಳಿಗೊಮ್ಮೆ ₹೨,೦೦೦ ಕಂತು).',
      hi: 'पूरी योजना राशि को एक साथ देने के बजाय निर्धारित समय पर टुकड़ों में देना (जैसे पीएम-किसान में हर 4 महीने में ₹2,000)।',
      ta: 'திட்டத்தின் மொத்த தொகையை குறிப்பிட்ட கால இடைவெளியில் பிரித்து வழங்குதல் (எ.கா: 4 மாதத்திற்கு ஒருமுறை ₹2,000).',
      ml: 'പദ്ധതിയുടെ ആകെ തുക നിശ്ചിത ഇടവേളകളിൽ നൽകുന്ന രീതി (ഉദാ: 4 മാസം കൂടുമ്പോൾ ₹2,000).'
    },
    whyItMatters: {
      en: 'Helps farmers match input costs (seeds, ploughing, fertilizers) directly with their seasonal cropping schedule.',
      kn: 'ಖಾರಿಫ್, ರಬಿ ಹಂಗಾಮಿನಲ್ಲಿ ಬೀಜ, ಗೊಬ್ಬರ ಮತ್ತು ಉಳುಮೆಯ ವೆಚ್ಚಗಳನ್ನು ಸರಿದೂಗಿಸಲು ರೈತರಿಗೆ ಸಕಾಲದಲ್ಲಿ ನೆರವಾಗುತ್ತದೆ.',
      hi: 'बुवाई के समय खाद, बीज और जुताई के खर्च को समय पर पूरा करने में मदद करती है।',
      ta: 'விதைப்பு பருவத்தில் உரம் மற்றும் விதை வாங்குவதற்கான செலவுகளுக்கு சரியான நேரத்தில் உதவுகிறது.',
      ml: 'വിത്ത്, വളം, നിലമൊരുക്കൽ എന്നിവയുടെ ചെലവുകൾ അതത് കൃഷി സീസണിൽ നേരിടാൻ സഹായിക്കുന്നു.'
    },
    commonMistake: {
      en: 'Assuming missing one instalment cancels future ones. If a KYC or land seeding block is resolved, pending back-instalments are released retroactively.',
      kn: 'ಒಂದು ಕಂತು ಬರದಿದ್ದರೆ ಇನ್ನು ಮುಂದೆ ಹಣ ಬರಲ್ಲ ಎಂದು ಸುಮ್ಮನಾಗುವುದು. ಸಮಸ್ಯೆಯನ್ನು ಸರಿಪಡಿಸಿಕೊಂಡರೆ ಹಿಂದಿನ ಬಾಕಿ ಕಂತುಗಳು ಒಟ್ಟಿಗೆ ಜಮೆಯಾಗುತ್ತವೆ.',
      hi: 'यह मान लेना कि एक किस्त रुक गई तो आगे कभी नहीं मिलेगी। गलती सुधारने पर रुकी हुई किस्तें भी वापस मिल जाती हैं।',
      ta: 'ஒரு தவணை வரவில்லை என்றால் இனி வராது என்று நினைப்பது. தடையை நீக்கினால் நிலுவைத் தொகையும் வந்துவிடும்.',
      ml: 'ഒരു ഗഡു മുടങ്ങിയാൽ ഇനി പണം കിട്ടില്ലെന്ന് കരുതുന്നത്. തടസ്സം മാറ്റിയാൽ കുടിശ്ശിക തുക ഒന്നിച്ചു ലഭിക്കും.'
    }
  }
];

export function getGlossaryItems(locale: Locale = 'en') {
  return GLOSSARY_DATA.map((item) => ({
    id: item.id,
    termKey: item.termKey,
    englishEquivalent: item.englishTerm,
    term: item.term[locale] || item.term.en,
    simpleExplanation: item.simpleExplanation[locale] || item.simpleExplanation.en,
    whyItMatters: item.whyItMatters[locale] || item.whyItMatters.en,
    commonMistake: item.commonMistake[locale] || item.commonMistake.en,
  }));
}
