# Known Gaps & Future Roadmap

**Project:** Scheme Access Kit  
**Team:** Group 5 · Design Thinking · JAIN (Deemed-to-be University)  
**Date:** November 2026

---

## 1. Known Gaps in Current Implementation

### 1.1 Live Bhoomi & FRUITS API Integration
- **Current State:** The kit evaluates eligibility via interactive self-assessment and guided checks. Farmers manually check if their RTC is in their name or joint.
- **Limitation:** Karnataka state Bhoomi RTC and FRUITS APIs are restricted to government-authorized IP gateways (Grama One, Karnataka One). Direct public REST integration requires an official MOU with the Centre for e-Governance (CeG), Karnataka.
- **Next Step:** Partner with the Karnataka Department of Agriculture during the next academic research phase to obtain read-only sandbox API credentials for real-time survey number and hissa lookups.

### 1.2 Native Indic Voice Synthesis on Low-End Devices
- **Current State:** The read-aloud feature uses the standard browser `window.speechSynthesis` (Web Speech API) with targeted language tags (`kn-IN`, `hi-IN`, `ta-IN`, `ml-IN`).
- **Limitation:** Certain budget Android phones running non-standard OEM builds (without Google Play Services TTS) may lack the regional Kannada or Malayalam speech packs, causing the browser to fall back silently.
- **Next Step:** Implement server-side AI voice audio generation (such as open-source Indic-TTS from AI4Bharat / IIT Madras) cached on edge CDN.

### 1.3 Tenant & Sharecropper Legal Ambiguities
- **Current State:** The scheme finder accurately alerts tenant farmers that schemes like PM-KISAN require documented ownership in the revenue RTC.
- **Limitation:** Karnataka’s Land Reforms Act historically limits formal recorded tenancy agreements for crop loans in informal arrangements.
- **Next Step:** Expand legal aid templates and guidance on Joint Liability Groups (JLGs) formed via NABARD that allow tenant cultivators to access credit subsidies without land titles.

### 1.4 Native PDF Export vs Browser Print
- **Current State:** The document checklist uses the browser's native `@media print` engine, allowing users to "Print" or "Save as PDF" cleanly on desktop and mobile.
- **Limitation:** On older mobile browsers, some users may find the native browser print dialog unfamiliar.
- **Next Step:** Bundle a zero-dependency client-side PDF generator (like PDF-Lib) that downloads a pre-formatted single-page Kannada/English PDF file with a single tap.

---

## 2. Immediate Next Steps (Phase 2 Roadmap)

1. **Taluk Pilot Field Study:** Conduct usability testing sessions with 30 ragi farmers in Magadi taluk (Ramanagara district) in coordination with the local Raitha Samparka Kendra.
2. **Community Translation Review:** Have rural agricultural extension officers review and sign off on the 4 Indic language translations to remove the "pending review" tag.
3. **SMS / IVR Bridge:** Introduce a missed-call or basic IVR audio service where farmers with feature phones can listen to the top 3 schemes for their district.
