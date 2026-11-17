# Scheme Access Kit (ಸ್ಕೀಮ್ ಆಕ್ಸೆಸ್ ಕಿಟ್)

> **A Student Design Thinking Initiative from Group 5, JAIN (Deemed-to-be University)**  
> *Helping small and marginal farmers in Karnataka — such as a ragi farmer cultivating half an acre — find, understand, and prepare for government agricultural welfare schemes.*

[![Next.js 15](https://img.shields.io/badge/Next.js-15_App_Router-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-Custom_Tokens-38B2AC)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres_%2B_RLS-3ECF8E)](https://supabase.com)
[![next-intl](https://img.shields.io/badge/next--intl-5_Languages-purple)](https://next-intl-docs.vercel.app)
[![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-FCC72B)](https://vitest.dev)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Tests-2EAD33)](https://playwright.dev)

---

## 🌾 The Problem & The Farmer Persona

In rural Karnataka, small and marginal farmers cultivating rainfed plots (e.g. 0.5 acre of finger millet / ragi in Ramanagara, Mandya, or Tumakuru) face structural barriers when seeking government welfare:
1. **Information opacity:** Announcements are dispersed across uncoordinated portals in difficult bureaucratic prose.
2. **Paperwork anxiety:** Discrepancies between Aadhaar spellings, Bhoomi RTC records, and NPCI DBT bank seeding cause silent rejections without feedback.
3. **Exploitative intermediaries:** Unscrupulous brokers charge fees for basic registrations like FRUITS Farmer ID.

**Scheme Access Kit** addresses this through an offline-capable, multilingual, zero-data-collection platform that acts as a pre-submission readiness guide.

---

## 🛠️ Stack & Architecture

- **Framework:** Next.js 15 (App Router) with TypeScript (Strict mode enabled)
- **Design Tokens & Styling:** Tailwind CSS with custom editorial palette:
  - Warm Paper background (`#F4EEE1`)
  - Deep Field Green (`#1E3B2A`)
  - Straw Gold accent (`#D8B25C`)
  - Ink Brown text (`#2B2523`)
- **Typography:** Fraunces (Variable serif for display headings) + Atkinson Hyperlegible (Latin body) + Google Noto Sans Indic fonts (`Noto Sans Kannada`, `Noto Sans Devanagari`, `Noto Sans Tamil`, `Noto Sans Malayalam`) to prevent broken glyphs.
- **Internationalization:** `next-intl` with locale URL prefixes (`/en`, `/kn`, `/hi`, `/ta`, `/ml`) and English fallback.
- **Accessibility:** 
  - Web Speech API read-aloud buttons on all scheme and news cards
  - High-contrast mode and large-text mode toggles saved in `localStorage`
  - Visible focus outlines and screen-reader skip link (`#main-content`)
  - Mobile-first responsive layout tested at 360px width
- **Data & Security:** 
  - Supabase Postgres with strict Row Level Security (RLS) on all exposed tables
  - Built-in fallback static repository in `src/lib/data/` for zero-configuration offline execution
  - **Zero Personal Data Guarantee:** No Aadhaar, bank account, or land survey numbers are ever collected or stored.
- **Testing:** Vitest for unit tests, Playwright for cross-device end-to-end tests.
- **Offline Support:** PWA service worker caching scheme directory and document checklist for low-connectivity rural zones.

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

Visit [http://localhost:3000](http://localhost:3000) in your browser. The application will immediately redirect to `/en` or `/kn`.

> **Note:** The application comes with a pre-bundled, fully audited static dataset (`src/lib/data/`). You do NOT need live Supabase credentials to run, browse, or test all features locally.

---

## 🧪 Running Tests

### Unit Tests (Vitest)
```bash
npm run test
```
Tests data integrity, official verification fields, Kannada localization, speech service detection, and privacy validation filters (rejection of Aadhaar & bank numbers).

### End-to-End Tests (Playwright)
```bash
npm run test:e2e
```
Executes cross-browser and mobile (360px viewport) validation of the home page, language switcher, scheme finder, and document checklist.

---

## 🗄️ Database Setup & Seed (Supabase)

If deploying with an active Supabase project:

1. **Apply Migrations:**
   Copy and run `supabase/migrations/20250101000000_init.sql` in your Supabase SQL Editor. It sets up tables, constraints, indexes, and Row Level Security policies.

2. **Configure `.env.local`:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. **Run Seed Script:**
   ```bash
   npm run db:seed
   ```

---

## 📦 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Import the project into your [Vercel Dashboard](https://vercel.com).
3. Set the Environment Variables (`NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Click **Deploy**. Vercel will build the Next.js App Router application with static generation for all 5 locales.

---

## 📋 Public Pages & Core Features

| Page | URL Route | Key Functionality |
| :--- | :--- | :--- |
| **Home** | `/[locale]` | Hero promise, hand-crafted SVG stalks visual, 4-step explainer, audited benefit calendar |
| **Scheme Finder** | `/[locale]/finder` | 6-question guided questionnaire, rule engine for ragi/millet smallholders, mandatory disclaimer |
| **Schemes Directory** | `/[locale]/schemes` | Searchable directory of PM-KISAN, Raitha Siri, Krishi Bhagya, FRUITS FID, and PMFBY |
| **Scheme Detail** | `/[locale]/schemes/[slug]` | Deep-dive with "Watch Out" alerts, document requirements, and official source links |
| **Checklist** | `/[locale]/checklist` | Traffic-light readiness evaluation (Ready, Needs Correction, Missing) with printable PDF summary |
| **Help Offices** | `/[locale]/offices` | Hobli RSK and ADA office finder with Karnataka 2025-26 directory phone numbers |
| **Glossary** | `/[locale]/glossary` | Multilingual plain-language breakdown of Aadhaar, eKYC, Pahani, FID, and DBT |
| **About & Method** | `/[locale]/about` | Research methodology, Group 5 JAIN University attribution, error reporting link |
| **Feedback** | `/[locale]/feedback` | Rate-limited discrepancy reporting form with Aadhaar/bank number blocking |
| **Admin Desk** | `/[locale]/admin` | Supabase Auth magic link protected portal with mandatory source URL publishing checks |

---

## 🛡️ Safety & Content Verification Rules

1. **Official Sources Only:** Every scheme rule is traced back to a Government Order (G.O.) or published ministry guideline recorded in `SOURCES.md`.
2. **Mandatory Disclaimer:** Every questionnaire outcome carries: *"This is an informational guidance tool, not an administrative or eligibility decision. Confirm with the official scheme office."*
3. **Hypothesis Tagging:** Ambiguous edge-case rules (such as joint Khatas or deceased ancestor mutations) are explicitly marked as hypotheses in the UI.
4. **Translation Status:** Indic script translations carry a visible *"Translation pending field review"* badge until approved by local agriculture officers.
5. **Publishing Enforcement:** The admin desk blocks publishing of any scheme record if the official primary source URL is missing or invalid.

---

## 🎓 Academic Attribution

- **Institution:** JAIN (Deemed-to-be University), Bengaluru, Karnataka
- **Course:** Design Thinking (Group 5)
- **Year:** 2026
- **License:** MIT License (Open Public Good)
