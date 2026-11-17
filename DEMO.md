# DEMO.md: 5-Minute Walkthrough Script

**Project:** Scheme Access Kit  
**Initiative:** Group 5 · Design Thinking Project · JAIN (Deemed-to-be University)  
**Audience:** Non-technical evaluators, agricultural extension officers, and academic jury  
**Duration:** 5 minutes (300 seconds)

---

## 0:00 – 0:45 | Introduction & The Target Persona

> **Speaker Action:** Open the home page at `/en` (or `/kn` for Kannada). Point to the hero headline and the SVG field illustration.

**Spoken Script:**
> "Good morning, respected professors and jury members. We are Group 5, presenting **Scheme Access Kit**.
>
> In Karnataka, millions of agricultural schemes are announced each year, yet small and marginal farmers often fail to receive them. Why? Not because they are unwilling, but because of information opacity, confusing technical jargon, and sudden DBT payment rejections.
>
> We designed this kit around one specific person: **a small cultivator in Karnataka growing half an acre of ragi (finger millet) on rainfed land**. They don't have a desktop computer or an agent; they have an entry-level smartphone, varying degrees of literacy, and cannot afford to spend days traveling back and forth to the taluk office only to be turned away for a missing seal.
>
> Here is how Scheme Access Kit gives them direct agency in four transparent steps."

---

## 0:45 – 1:45 | Linguistic Accessibility & The Read-Aloud Feature

> **Speaker Action:** Click the **Language Switcher** in the top right header. Select **ಕನ್ನಡ (Kannada)**. Show how the entire UI seamlessly switches to authentic regional vocabulary. Then click the **"ಓದಿ ಕೇಳಿಸಿ" (Read Aloud)** speaker button on the hero or news item.

**Spoken Script:**
> "First, language accessibility. Government portals often feature poorly translated machine text with broken glyphs. We built our token system with dedicated Google Noto Sans Indic fonts for **Kannada, Hindi, Tamil, Malayalam, and English**, ensuring that every single character renders crisply on any mobile screen.
>
> Notice this visible badge: *'Translation pending field review'*. We intentionally chose honest transparency: until local field officers approve a translation, it is flagged as pending review.
>
> Furthermore, for farmers with low literacy or visual impairments, every scheme card and news alert includes a **one-touch Read-Aloud button** powered by the Web Speech API in their regional language voice. We also included a high-contrast mode and a large-text toggle right in the header that saves their preference across visits."

---

## 1:45 – 2:45 | The Guided Scheme Finder (Live Simulation)

> **Speaker Action:** Click **"Start Scheme Finder"** (or navigate to `/kn/finder`). Show the 6-question questionnaire. Select:
> 1. Land size: *Under 1 acre (Marginal)*
> 2. Crops: *Finger Millet (Ragi)*
> 3. Land record: *RTC in own name*
> 4. FRUITS Farmer ID: *Yes*
> 5. Bank Aadhaar Link: *Yes*
> 6. District: *Ramanagara*

**Spoken Script:**
> "Now let us run the **Scheme Finder**. Notice the prominent yellow banner at the top:
> *'This is an informational guidance tool, not an administrative eligibility decision. Confirm with the official scheme office.'*
> As a team, we established this safety rule from day one: never make false promises to a vulnerable farmer.
>
> For our half-acre ragi cultivator, the finder immediately identifies:
> 1. **Raitha Siri**: Providing ₹10,000 per hectare for minor millets like ragi.
> 2. **PM-KISAN**: Providing ₹6,000 in three instalments.
> 3. **Krishi Bhagya**: Subsidies up to 80-90% for farm ponds.
>
> But watch what happens if our farmer selects *'Joint family land record'* or *'Pahani in ancestor's name'*. The system immediately marks the recommendation with a **'Hypothesis'** badge and provides a concrete pre-requisite action: *'Initiate Pouthi Khata mutation at Nadakacheri to transfer title into your name first.'*"

---

## 2:45 – 3:45 | Document Readiness Traffic-Light Checklist

> **Speaker Action:** Click **"Document Readiness"** in the navigation bar (`/checklist`). Show the green, amber, and red indicators. Change a document status (e.g. Bank NPCI Seeding from 'Needs Correction' to 'Ready'). Click **"Print Summary / Save PDF"**.

**Spoken Script:**
> "Once a farmer knows which scheme fits, their next hurdle is paperwork. 
>
> Our **Document Readiness Checklist** operates on an intuitive traffic-light system:
> - **Green (Ready):** Document is verified and name matches.
> - **Amber (Needs Correction):** Minor typo or pending bank seeding.
> - **Red (Missing):** Requires a fresh application.
>
> Most importantly: **Zero personal data is ever collected or transmitted**. We never ask for, log, or transmit an Aadhaar number, bank account number, or survey number. Everything runs entirely within the farmer's browser.
>
> With one click on **Print Summary**, the kit generates a clean, printable physical worksheet that the farmer can fold into their pocket when visiting the Raitha Samparka Kendra or Grama One kiosk."

---

## 3:45 – 4:30 | Help Office Directory & The Admin Desk

> **Speaker Action:** Quickly show `/offices` with the Ramanagara & Mandya RSK records. Then open `/admin` to show the verification desk.

**Spoken Script:**
> "In our **Help Office Directory**, farmers can search by their district to find exact office addresses, working hours, and verified landline contact numbers from the Karnataka State Agriculture Directory 2025–26.
>
> In the **Admin Desk**, our student team enforces another strict rule: **No scheme or news alert can ever be published without a direct link to an official government gazette or primary portal**. If a researcher tries to publish a scheme without a verified source URL, the system blocks publication immediately. Every editorial edit is permanently audited in the audit log."

---

## 4:30 – 5:00 | Conclusion & Impact

**Spoken Script:**
> "To conclude: Scheme Access Kit is not just a coding exercise. It is a human-centered design thinking response to a real social challenge in Karnataka. By pairing strict source verification, linguistic dignity, and offline-first privacy, we empower our small farmers to claim what is rightfully theirs without paying intermediaries.
>
> Thank you, and we welcome your questions!"

---

## Quick Q&A Cheat-Sheet for Presenters

1. **Q: Why don't you directly submit the application on the government portal?**  
   *A:* Government portals like Bhoomi and FRUITS require direct biometric authentication at Grama One kiosks or via state SSO. Our design purpose is pre-submission readiness — ensuring the farmer doesn't waste days traveling with mismatched papers.

2. **Q: How do you handle low internet connectivity in villages?**  
   *A:* We built an offline-first service worker that pre-caches the scheme database and document checklist. Once loaded, the checklist works completely offline.

3. **Q: How do you prevent hallucinated scheme rules?**  
   *A:* Every rule is documented in `SOURCES.md` with government order numbers, and publishing is code-enforced to require an official primary source URL.
