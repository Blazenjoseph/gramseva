# Known Gaps & Future Roadmap

**Project:** Scheme Access Kit  
**Team:** Group 5 · Design Thinking · JAIN (Deemed-to-be University)  
**Date:** November 2026 (All-India Scope & Telugu Integration)

---

## 1. Known Gaps in Current Implementation

### 1.1 State-Specific Scheme Verification Outside Karnataka Baseline
- **Current State:** Nationwide central schemes (PM-KISAN, PMFBY, Kisan Credit Card, Soil Health Card) and Karnataka state schemes (Raitha Siri, Krishi Bhagya, FRUITS FID) are verified against primary government gazettes and official portals. For other states (e.g., Andhra Pradesh, Telangana, Maharashtra, Uttar Pradesh), state-specific entries are retained as transparent placeholders marked: *"State scheme: details to be verified for [state]"*.
- **Limitation:** In accordance with content safety rules, no state scheme amounts, rules, or budget allocations have been fabricated.
- **Next Step:** Engage agricultural extension departments across neighboring states (Andhra Pradesh, Telangana, Tamil Nadu, Kerala, Maharashtra) to catalog verified state-level welfare programs with confirmed government order numbers.

### 1.2 Telugu and Indic Translation Field Review
- **Current State:** Full Telugu (`te`) translation has been integrated alongside Kannada (`kn`), Hindi (`hi`), Tamil (`ta`), and Malayalam (`ml`). All Indic translations carry a visible badge: *"Translation pending field review"*.
- **Limitation:** Initial translations were verified against published agricultural glossaries but require validation by native agricultural extension officers and local farmers to refine dialect-specific terminology (e.g., revenue terms like *Pahani*, *Khatauni*, *1B Adangal*, *Patta*, *Rythu Bharosa*).
- **Next Step:** Coordinate field review sessions with Telugu-speaking agricultural officers in Andhra Pradesh and Telangana to certify scheme nomenclature.

### 1.3 Live Revenue & Farmer Registry API Integrations
- **Current State:** The kit evaluates eligibility via interactive guided questionnaire and client-side logic.
- **Limitation:** Direct REST API access to state farmer registries (e.g., Karnataka FRUITS, Andhra Pradesh Karshak, Central PM-KISAN database) requires authorized state IP gateways and formal Memorandums of Understanding (MoU).
- **Next Step:** Partner with state e-Governance centers during Phase 2 to explore read-only sandbox API access for automated, zero-storage survey number validation.

### 1.4 Native Indic Voice Synthesis on Low-End Devices
- **Current State:** The read-aloud feature uses standard browser `window.speechSynthesis` (Web Speech API) with targeted locale tags (`te-IN`, `kn-IN`, `hi-IN`, `ta-IN`, `ml-IN`, `en-IN`).
- **Limitation:** Budget Android smartphones without Google Play Services TTS may lack regional Indic language voice packs, resulting in silent fallbacks.
- **Next Step:** Integrate edge-cached neural voice synthesis (e.g., AI4Bharat Indic-TTS / Bhashini) for universal playback on all mobile devices.

---

## 2. Immediate Next Steps (Phase 2 Roadmap)

1. **State Extension Outreach:** Conduct validation sprints with agricultural universities and Krishi Vigyan Kendras (KVKs) to verify state-level schemes across southern and northern agricultural zones.
2. **Community Review Sign-Off:** Complete field validation for Telugu, Kannada, Hindi, Tamil, and Malayalam translation files to transition badge status from "pending review" to "field-verified".
3. **Offline Field Kit Deployment:** Distribute the service worker-cached PWA to village Common Service Centres (CSCs) and Grama One / Rythu Bharosa Kendras for low-bandwidth village access.
