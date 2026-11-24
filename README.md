# Scheme Access Kit (స్కీమ్ యాక్సెస్ కిట్ · ಸ್ಕೀಮ್ ಆಕ್ಸೆಸ್ ಕಿಟ್)

> **A Public Service Initiative from Group 5, Design Thinking, JAIN (Deemed-to-be University)**  
> *Helping farmers and agricultural households across India find, understand, and prepare for government agricultural welfare schemes.*

[![Next.js 15](https://img.shields.io/badge/Next.js-15_App_Router-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-Custom_Tokens-38B2AC)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres_%2B_RLS-3ECF8E)](https://supabase.com)
[![next-intl](https://img.shields.io/badge/next--intl-6_Languages-purple)](https://next-intl-docs.vercel.app)
[![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-FCC72B)](https://vitest.dev)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Tests-2EAD33)](https://playwright.dev)

---

## 🌾 The Purpose & Scope

Agricultural households across India face significant informational and procedural barriers when trying to navigate government welfare support:
1. **Scattered rules:** Guidelines are spread across central ministries and state departments in complex bureaucratic language.
2. **Paperwork discrepancies:** Discrepancies between land records (RoR / Pahani / Patta / 1B), Aadhaar spelling, and NPCI DBT bank seeding cause silent disqualification.
3. **Exploitative intermediaries:** Unscrupulous brokers charge high fees for simple government registrations like Farmer IDs.

**Scheme Access Kit** is a production-grade, public-service web application designed as a neutral, trusted informational guide for all agricultural landholders and cultivators across India. It collects **zero personal identification numbers** and works completely offline via service workers.

---

## 🛠️ Stack & Architecture

- **Framework:** Next.js 15 (App Router) with TypeScript in strict mode
- **Design Tokens & Theme:** Tailwind CSS following an official editorial system:
  - Warm Paper background (`#F4EEE1`)
  - Deep Field Green (`#1E3B2A`)
  - Straw Gold accent (`#D8B25C`)
  - Ink Brown text (`#2B2523`)
- **Typography:** Fraunces (Variable serif for display headings) + Atkinson Hyperlegible (Latin body) + Google Noto Sans Indic fonts (`Noto Sans Telugu`, `Noto Sans Kannada`, `Noto Sans Devanagari`, `Noto Sans Tamil`, `Noto Sans Malayalam`) to guarantee zero broken glyphs.
- **Internationalization (6 Languages):** `next-intl` with locale URL prefixes:
  - English (`/en/...`)
  - Telugu (`/te/...`)
  - Kannada (`/kn/...`)
  - Hindi (`/hi/...`)
  - Tamil (`/ta/...`)
  - Malayalam (`/ml/...`)
  - Visual *"Translation pending field review"* badge across all Indic languages.
- **Accessibility:** 
  - Web Speech API read-aloud buttons on all scheme and news cards (`te-IN`, `kn-IN`, `hi-IN`, `ta-IN`, `ml-IN`, `en-IN`)
  - High-contrast mode and large-text mode toggles persisted in `localStorage`
  - Keyboard navigation, visible focus rings, and skip link (`#main-content`)
  - Mobile-first responsive layout tested at 360px viewport
- **Data Layer & Privacy:** 
  - Supabase Postgres with Row Level Security (RLS) on all exposed tables
  - Built-in verified repository in `src/lib/data/` for zero-configuration execution
  - **Zero Personal Data Guarantee:** No Aadhaar numbers, bank account numbers, or survey numbers are ever collected or stored.
- **Testing:** Vitest for unit tests, Playwright for end-to-end tests across viewports.
- **Offline Support:** PWA service worker caching scheme directory, checklist, and glossary.

---

## 🚀 One-Command Local Setup

### 1. Prerequisites
- Node.js 18.18+ or 20+ (tested on Node v24)
- npm or pnpm

### 2. Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Copy environment configuration
cp .env.example .env.local

# 3. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. The app redirects to the default locale.

> **Note:** The application comes with a pre-bundled, fully audited static dataset (`src/lib/data/`). You do NOT need live Supabase credentials to run, browse, or test all features locally.

---

## 🧪 Running Tests

### Unit Tests (Vitest)
```bash
npm run test
```
Tests repository data integrity, nationwide schemes, state-specific placeholder rules, Telugu localization retrieval, speech synthesis, and privacy validation.

### End-to-End Tests (Playwright)
```bash
npm run test:e2e
```
Executes cross-browser and mobile (360px viewport) validation of home page, 6-language switcher, scheme finder, and document checklist.

---

## 🗄️ Database Setup & Migrations (Supabase)

If deploying with an active Supabase project:

1. **Apply Initial Migration:**
   Run `supabase/migrations/20250101000000_init.sql` in your Supabase SQL Editor.
2. **Apply All-India Scope & State Migration:**
   Run `supabase/migrations/20250102000000_widen_scope_and_state.sql` to widen check constraints, add state classification, operational holding categories, and placeholder flags.
3. **Run Seed Script:**
   ```bash
   npm run db:seed
   ```

---

## 📋 Public Pages & Core Features

| Page | URL Route | Key Functionality |
| :--- | :--- | :--- |
| **Home** | `/[locale]` | Hero promise, understated field visual, 4-step explainer, verified benefit calendar |
| **Scheme Finder** | `/[locale]/finder` | 5-question questionnaire (State/UT, holding size, tenure, crop type, credentials check) with mandatory disclaimer |
| **Schemes Directory** | `/[locale]/schemes` | Searchable directory with Nationwide and State-specific filter pills |
| **Scheme Detail** | `/[locale]/schemes/[slug]` | Visible breadcrumbs, standard headings (Eligibility, Documents required, How to apply, Important notes, Source, Last verified) |
| **Checklist** | `/[locale]/checklist` | Traffic-light readiness evaluation (Ready, Needs Correction, Missing) with printable PDF summary |
| **Help Offices** | `/[locale]/offices` | District agricultural office finder with official directory phone numbers |
| **Glossary** | `/[locale]/glossary` | Multilingual plain-language breakdown of Aadhaar, eKYC, RoR, Farmer ID, and DBT across all 6 languages |
| **About & Method** | `/[locale]/about` | Research methodology, Group 5 JAIN University attribution, error reporting link |
| **Feedback** | `/[locale]/feedback` | Rate-limited discrepancy reporting form with Aadhaar/bank number blocking |
| **Admin Desk** | `/[locale]/admin` | Supabase Auth magic link protected portal with link to Update Centre |
| **Admin Update Centre** | `/[locale]/admin/updates` | Automated verification status (verified, review due, missing source), drafts, publish policy checks, and immutable audit log |

---

## 🎨 Color Mode System

Scheme Access Kit features an accessible 5-mode color system accessible from the top navigation utility bar. It replaces binary light/dark toggles with a semantic color mode picker:

| Mode | Background | Primary Button | Text | Display Font | Card Treatment | WCAG AA Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Field** (Default) | Paper `#F4EEE1` | Field Green `#1E3B2A` | Ink `#2B2523` | Fraunces | Standard radius (`1rem`) | **12.19:1** (Text) · **11.54:1** (Buttons) |
| **Night** | Dark Slate `#181917` | Muted Emerald `#3D6B4F` | Soft White `#F0EDE6` | Fraunces | Standard radius (`1rem`) | **14.40:1** (Text) · **5.71:1** (Buttons) |
| **Monsoon** | Mist `#EEF3F1` | Deep Teal `#1F4E56` | Dark Ink `#17302F` | Literata | Larger corner radius (`1.5rem`) | **12.01:1** (Text) · **9.13:1** (Buttons) |
| **Harvest** | Sand `#F7E9CF` | Terracotta `#9C4A2F` | Dark Brown `#3A2418` | Newsreader | 4px top accent border (`#C98A2B`) | **11.55:1** (Text) · **6.56:1** (Buttons) |
| **High contrast** | Pure White `#FFFFFF` | Black `#000000` | Black `#000000` | Atkinson | 3px solid black border, underlined links | **21.0:1** (Text & Buttons) |

### Key Features
1. **WCAG AA & AAA Compliance:** Every single mode exceeds WCAG AA standards (minimum 4.5:1 for body text and 3:1 for large/interactive elements; all Scheme Access Kit body text reaches 11:1–21:1).
2. **Multilingual Script Support:** Works seamlessly across all 6 locales (`en`, `kn`, `hi`, `ta`, `ml`, `te`), preserving Google Noto Sans Indic fonts for zero broken glyphs.
3. **No-Flash Persistence:** Persisted in `localStorage` under `sak_color_mode`. A pre-hydration blocking script in `<head>` ensures zero theme flash during page transitions.
4. **First-Visit System Preference:** On initial visit with no saved setting, `prefers-color-scheme: dark` activates Night mode; otherwise Field mode is active.
5. **Keyboard & Screen-Reader Accessible:** The Color Mode menu implements WAI-ARIA `role="menu"` with `aria-haspopup="true"`, `aria-checked`, and keyboard arrow navigation.

### How to Add a New Color Mode
To add a new custom color mode (e.g. `drought` or `spring`):
1. **Define the Type:** Add the new mode identifier to `ColorMode` in `src/types/index.ts`:
   ```typescript
   export type ColorMode = 'field' | 'night' | 'monsoon' | 'harvest' | 'high-contrast' | 'spring';
   ```
2. **Declare CSS Tokens:** In `src/app/globals.css`, declare the theme variables under `[data-color-mode="<new-mode>"]`:
   ```css
   [data-color-mode="spring"] {
     --font-display: var(--font-fraunces);
     --bg-paper: #F3F8F2;
     --color-field-green: #235937;
     --color-straw-gold: #B89C35;
     --color-ink-brown: #1E2A20;
     --color-border: #CFDEC9;
     --focus-ring: #235937;
   }
   ```
3. **Register in Picker Options:** In `src/components/layout/AccessibilityControls.tsx`, append your mode to `COLOR_MODES`:
   ```typescript
   {
     id: 'spring',
     name: 'Spring',
     description: 'Fresh meadow, deep clover · Fraunces',
     bgHex: '#F3F8F2',
     primaryHex: '#235937',
     accentHex: '#B89C35',
     fontName: 'Fraunces',
   }
   ```
4. **Card Overrides (Optional):** Add any unique card styling rules in `src/app/globals.css` using `[data-color-mode="spring"] .card`.

---

## 🛡️ Safety & Content Verification Rules

1. **Official Sources Only:** Every scheme rule is verified against an official gazette, government order (G.O.), or ministry portal in `SOURCES.md`.
2. **Mandatory Disclaimer:** Displayed on every result: *"This is an informational guide. It is not an eligibility decision. Confirm with the official scheme office."*
3. **State Scheme Verification Notice:** State-specific schemes outside verified baselines carry *"State scheme: details to be verified for [state]"*. No unverified state schemes or amounts are invented.
4. **Translation Status:** Indic script translations carry a visible *"Translation pending field review"* badge until approved by local agriculture officers.
5. **No Emblems or Seals:** The application uses a clean, neutral text-based public service design without official government logos or national emblems.

---

## 🎓 Academic Attribution

- **Institution:** JAIN (Deemed-to-be University), Bengaluru, Karnataka
- **Course:** Design Thinking (Group 5)
- **Year:** 2026
- **License:** MIT License (Open Public Good)
