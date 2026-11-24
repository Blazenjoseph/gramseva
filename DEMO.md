# DEMO.md: 5-Minute Walkthrough Script

**Project:** Scheme Access Kit (స్కీమ్ యాక్సెస్ కిట్ · ಸ್ಕೀಮ್ ಆಕ್ಸೆಸ್ ಕಿಟ್)  
**Initiative:** Group 5 · Design Thinking Project · JAIN (Deemed-to-be University)  
**Audience:** Non-technical evaluators, agricultural extension officers, and academic jury  
**Scope:** All agricultural households across India (28 states & 8 UTs)  
**Duration:** 5 minutes (300 seconds)

---

## 0:00 – 0:45 | Introduction & All-India Agricultural Scope

> **Speaker Action:** Open the home page at `/en` (or `/te` for Telugu, `/kn` for Kannada). Point to the official public service header, clear breadcrumbs, and understated field visual.

**Spoken Script:**
> "Good morning, respected professors, jury members, and guests. We are Group 5, presenting **Scheme Access Kit**.
>
> Across India, hundreds of central and state agricultural support schemes are announced each fiscal cycle, yet millions of agricultural households fail to access them. The problem is not lack of intent — it is fragmented information, complex bureaucratic language, paperwork mismatches, and sudden Direct Benefit Transfer rejections.
>
> We built Scheme Access Kit as a production-grade, neutral public service portal for **all farmers and agricultural households across India** — from marginal cultivators and tenant farmers to large landholders. The platform collects **zero personal identification numbers**, supports 6 languages, and operates offline to provide transparent scheme guidance in four straightforward steps."

---

## 0:45 – 1:45 | Six-Language Support & Telugu Integration

> **Speaker Action:** Click the **Language Switcher** in the top utility bar. Select **తెలుగు (Telugu)**. Show the entire interface render seamlessly in Telugu without a single box or missing glyph (`/te/...`). Then click the **Read Aloud** button on the hero or news item.

**Spoken Script:**
> "First, linguistic accessibility across Indian agrarian states. Government portals often feature broken glyphs on regional fonts. We configured dedicated Google Noto Sans Indic font stacks for **Telugu, Kannada, Hindi, Tamil, Malayalam, and English**, ensuring every regional character renders crisply on any device, down to a 360-pixel mobile viewport.
>
> Notice this prominent badge: *'Translation pending field review'* (ఫీల్డ్ రివ్యూ పెండింగ్‌లో ఉన్న అనువాదం). We maintain strict academic honesty: while our Telugu translation covers every interface string, scheme names and eligibility terms remain tagged as pending review until verified by native agricultural readers.
>
> Furthermore, for farmers with varying literacy levels, every scheme card and news update features a **one-touch Read-Aloud button** using the Web Speech API configured with regional speech synthesis tags like `te-IN` and `kn-IN`. We also have built-in accessibility controls for high-contrast and large-text modes that persist across visits."

---

## 1:45 – 2:45 | The Scheme Finder (Live Simulation)

> **Speaker Action:** Click **"Check eligible schemes"** (navigate to `/finder`). Show the 5 official public service questions:
> 1. State/UT: Select *Andhra Pradesh* (or *Karnataka*)
> 2. Land holding category: *Marginal (Up to 1 hectare / ~2.5 acres)*
> 3. Land tenure: *Owned (Title deed in own name)*
> 4. Main agricultural activity: *Food grains*
> 5. Credentials: *Land record in own name: Yes | Farmer ID: Yes | Bank Aadhaar DBT: Yes*

**Spoken Script:**
> "Now let us run the **Scheme Finder**. Notice the mandatory disclaimer at the top of every result:
> *'This is an informational guide. It is not an eligibility decision. Confirm with the official scheme office.'*
> As a core safety rule, we never mislead a farmer or make false administrative promises.
>
> The finder filters results into **Nationwide Central Programs** and **State-Specific Schemes**:
> 1. **PM-KISAN:** Central income support of ₹6,000 per year.
> 2. **PM Fasal Bima Yojana (PMFBY):** Comprehensive crop insurance covering natural hazards.
> 3. **Kisan Credit Card (KCC):** Subsidized institutional credit at 4% interest up to ₹3 lakh.
> 4. **Soil Health Card:** Free diagnostic soil testing every 2-3 years.
>
> When the user selects a state outside Karnataka, such as Andhra Pradesh or Telangana, notice how our safety rule triggers: state-specific schemes are clearly tagged with:
> *'State scheme: details to be verified for [state]'.*
> We never fabricate state schemes or arbitrary rupee amounts. Where state details are still being verified, transparent placeholder links to the official state commissionerates are provided."

---

## 2:45 – 3:45 | Document Readiness Traffic-Light Checklist

> **Speaker Action:** Click **"Checklist"** in the navigation bar (`/checklist`). Demonstrate the green (Ready), amber (Needs Correction), and red (Missing) toggles. Click **"Print Summary / Save as PDF"**.

**Spoken Script:**
> "Once a farmer identifies relevant schemes, paperwork becomes the primary point of failure.
>
> Our **Document Readiness Checklist** operates as a traffic-light inspection tool:
> - **Green (Ready):** Document is verified and matches official records.
> - **Amber (Needs Correction):** Spelling discrepancy or unlinked NPCI DBT mapper.
> - **Red (Missing):** Requires a fresh application before portal submission.
>
> Most importantly: **Zero personal data is collected or stored**. We never collect, store, or transmit an Aadhaar number, 16-digit bank account number, or land survey number. Everything runs locally in the farmer's browser.
>
> With one click on **Save as Printable PDF**, the system generates a clean, single-page physical summary that the farmer can take to their local agricultural officer or service kiosk."

---

## 3:45 – 4:30 | Help Office Directory & The Admin Desk

> **Speaker Action:** Quickly show `/offices` with the district directory and verified sources. Then open `/admin` to show the verification desk.

**Spoken Script:**
> "In our **Help Office Directory**, farmers can search by district to locate local agricultural offices, working hours, and verified government telephone numbers.
>
> In the **Admin Desk**, protected by Supabase authentication, our team enforces another non-negotiable rule: **No scheme or announcement can ever be published without a verified official primary source URL**. If a team member omits the source link, the publishing pipeline blocks the submission. An audit log maintains an immutable record of every edit."

---

## 4:30 – 5:00 | Summary & Conclusion

**Spoken Script:**
> "To conclude: Scheme Access Kit is an ethical, design-thinking solution developed by students of JAIN University. By combining rigorous official source verification, 6-language regional representation including Telugu, and zero-data-collection privacy, we help agricultural households across India navigate welfare access with dignity and confidence.
>
> Thank you, and we welcome your questions!"

---

## Quick Q&A Cheat-Sheet for Presenters

1. **Q: Why are state schemes outside Karnataka shown as placeholders?**  
   *A:* In public welfare, showing unverified amounts or rules can cause severe financial distress to a farmer. While central programs like PM-KISAN, PMFBY, KCC, and Soil Health Card are uniform nationwide, state-specific policies require verified Government Orders (G.O.s). We label them transparently with *"State scheme: details to be verified for [state]"* rather than improvising unverified rules.

2. **Q: How is Telugu language quality assured?**  
   *A:* Full translation dictionaries were authored matching central agricultural nomenclature (e.g., *పీఎం-కిసాన్*, *రైతు క్రెడిట్ కార్డు*, *ఈ-కేవైసీ*). To ensure total transparency, all Telugu pages carry the *"Translation pending field review"* badge until signed off by native agricultural extension officers.

3. **Q: Does the app work without internet in remote villages?**  
   *A:* Yes. A service worker caches the scheme database, checklist, and glossary so farmers can review documents and guidelines completely offline.
