'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Locale, Scheme, SchemeMatchResult, StateOrUT, LandHoldingCategory, TenureType, CropCategory } from '@/types';
import { SCHEMES_DATA, SCHEME_TRANSLATIONS } from '@/lib/data/schemes';
import { INDIAN_STATES_AND_UTS } from '@/lib/data/offices';
import { SpeechButton } from '@/components/ui/SpeechButton';
import { VerifiedBadge } from '@/components/ui/VerifiedBadge';
import { Link } from '@/i18n/routing';
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ShieldAlert,
  ChevronRight,
  Landmark,
  Globe2,
} from 'lucide-react';

interface SchemeFinderFormProps {
  locale: Locale;
}

export function SchemeFinderForm({ locale }: SchemeFinderFormProps) {
  const t = useTranslations('finder');
  const tCommon = useTranslations('common');

  // Form State: 5 Questions per official public service specification
  const [state, setState] = useState<StateOrUT>('Karnataka');
  const [holdingCategory, setHoldingCategory] = useState<LandHoldingCategory>('marginal');
  const [tenure, setTenure] = useState<TenureType>('owned');
  const [cropCategory, setCropCategory] = useState<CropCategory>('food-grains');
  const [landRecord, setLandRecord] = useState<'own' | 'joint' | 'none'>('own');
  const [farmerId, setFarmerId] = useState<'yes' | 'no' | 'unsure'>('yes');
  const [bankAadhaar, setBankAadhaar] = useState<'yes' | 'no' | 'unsure'>('yes');

  const handleReset = () => {
    setState('Karnataka');
    setHoldingCategory('marginal');
    setTenure('owned');
    setCropCategory('food-grains');
    setLandRecord('own');
    setFarmerId('yes');
    setBankAadhaar('yes');
  };

  // Rule Evaluation Engine: Central & State-specific Schemes
  const matchResults: SchemeMatchResult[] = useMemo(() => {
    const results: SchemeMatchResult[] = [];

    // Helper to get localized scheme
    const getLocalizedScheme = (baseScheme: typeof SCHEMES_DATA[0]): Scheme => {
      const translation = SCHEME_TRANSLATIONS[baseScheme.slug]?.[locale];
      return {
        ...baseScheme,
        ...(translation || {}),
        isMachineTranslated: locale !== 'en',
      };
    };

    // 1. Evaluate Nationwide Schemes
    // PM-KISAN
    const pmKisanBase = SCHEMES_DATA.find((s) => s.slug === 'pm-kisan');
    if (pmKisanBase) {
      const pmKisan = getLocalizedScheme(pmKisanBase);
      if (tenure === 'leased' || landRecord === 'none' || holdingCategory === 'landless') {
        // Tenant / landless farmers are excluded under current central operational guidelines
      } else {
        const reasons: string[] = [];
        const actions: string[] = [];
        let isHypothesis = false;

        reasons.push(`Cultivable agricultural landholding in ${state}.`);
        if (landRecord === 'joint' || tenure === 'shared') {
          isHypothesis = true;
          reasons.push('Joint title: benefit is disbursed to individual co-owners proportionate to land share.');
        } else {
          reasons.push('Land record verified in applicant name.');
        }

        if (bankAadhaar !== 'yes') {
          actions.push('Visit bank branch to submit NPCI Aadhaar DBT Seeding Form.');
        }

        results.push({
          scheme: pmKisan,
          matchLevel: bankAadhaar === 'yes' ? 'likely-eligible' : 'action-required-first',
          matchReasons: reasons,
          actionRequired: actions.length > 0 ? actions : undefined,
          isHypothesis,
        });
      }
    }

    // PM Fasal Bima Yojana (PMFBY)
    const pmfbyBase = SCHEMES_DATA.find((s) => s.slug === 'pm-fasal-bima-yojana');
    if (pmfbyBase) {
      const pmfby = getLocalizedScheme(pmfbyBase);
      const reasons = [
        `Applicable for notified crops in ${state}.`,
        tenure === 'leased'
          ? 'Tenant cultivators qualify by submitting a verified tenancy agreement or village declaration.'
          : 'Owner cultivators qualify directly via land record.',
      ];
      results.push({
        scheme: pmfby,
        matchLevel: 'likely-eligible',
        matchReasons: reasons,
        actionRequired: ['Enroll before the notified seasonal cut-off date at local CSC, bank, or portal.'],
        isHypothesis: false,
      });
    }

    // Kisan Credit Card (KCC)
    const kccBase = SCHEMES_DATA.find((s) => s.slug === 'kisan-credit-card');
    if (kccBase) {
      const kcc = getLocalizedScheme(kccBase);
      const reasons = [
        'Nationwide institutional credit accessible to all operational farmers and agricultural households.',
        cropCategory === 'livestock'
          ? 'Animal husbandry & dairy farmers qualify for working capital credit up to ₹2 lakh at 4%.'
          : 'Crop loan credit limit determined by scale of finance up to ₹3 lakh at 4% interest.',
      ];
      const actions: string[] = [];
      if (bankAadhaar !== 'yes') {
        actions.push('Ensure active bank account with Aadhaar seeding for interest subvention processing.');
      }
      actions.push('Submit one-page simplified KCC application form at your local bank branch.');
      results.push({
        scheme: kcc,
        matchLevel: 'likely-eligible',
        matchReasons: reasons,
        actionRequired: actions,
        isHypothesis: false,
      });
    }

    // Soil Health Card
    const soilBase = SCHEMES_DATA.find((s) => s.slug === 'soil-health-card');
    if (soilBase) {
      const soil = getLocalizedScheme(soilBase);
      results.push({
        scheme: soil,
        matchLevel: 'likely-eligible',
        matchReasons: [
          'Nationwide program: every farm holding is entitled to free soil testing every 2-3 years.',
          `Valid across all districts in ${state}.`,
        ],
        actionRequired: ['Contact your local agricultural extension worker to arrange soil sample collection.'],
        isHypothesis: false,
      });
    }

    // 2. Evaluate State-Specific Schemes
    if (state === 'Karnataka') {
      // Karnataka FRUITS FID
      const fruitsBase = SCHEMES_DATA.find((s) => s.slug === 'fruits-farmer-id');
      if (fruitsBase) {
        const fruits = getLocalizedScheme(fruitsBase);
        if (farmerId === 'yes') {
          results.push({
            scheme: fruits,
            matchLevel: 'explore-with-conditions',
            matchReasons: ['Existing FRUITS FID on record. Confirm your Bhoomi RTC survey numbers are mapped.'],
            isHypothesis: false,
          });
        } else {
          results.push({
            scheme: fruits,
            matchLevel: 'action-required-first',
            matchReasons: [
              'Mandatory foundational registration for Karnataka state agricultural benefits.',
              'Required for state MSP procurement, Raitha Siri, and Krishi Bhagya disbursements.',
            ],
            actionRequired: [
              'Register at nearest Grama One center or Hobli Raitha Samparka Kendra with Aadhaar and RTC.',
            ],
            isHypothesis: false,
          });
        }
      }

      // Karnataka Raitha Siri
      const raithaSiriBase = SCHEMES_DATA.find((s) => s.slug === 'raitha-siri');
      if (raithaSiriBase && cropCategory === 'food-grains') {
        const raithaSiri = getLocalizedScheme(raithaSiriBase);
        const reasons = ['Cultivating millets or food grains in Karnataka.'];
        const actions: string[] = [];

        if (farmerId !== 'yes') {
          actions.push('Register for FRUITS FID at nearest Grama One or RSK.');
        }
        actions.push('Ensure crop survey is logged in Karnataka Bele Samikshe app during Kharif/Rabi season.');
        if (bankAadhaar !== 'yes') {
          actions.push('Complete NPCI Aadhaar DBT mapping at bank branch.');
        }

        results.push({
          scheme: raithaSiri,
          matchLevel: farmerId === 'yes' && bankAadhaar === 'yes' ? 'likely-eligible' : 'action-required-first',
          matchReasons: reasons,
          actionRequired: actions,
          isHypothesis: landRecord === 'joint',
        });
      }

      // Karnataka Krishi Bhagya
      const krishiBhagyaBase = SCHEMES_DATA.find((s) => s.slug === 'krishi-bhagya');
      if (krishiBhagyaBase && holdingCategory !== 'landless' && landRecord !== 'none') {
        const krishiBhagya = getLocalizedScheme(krishiBhagyaBase);
        const reasons = [
          'Dryland agricultural landholding in Karnataka qualifies for farm pond and micro-irrigation subsidy.',
        ];
        const actions = [
          'Submit application to taluk Assistant Director of Agriculture (ADA) office prior to monsoon season.',
        ];
        if (farmerId !== 'yes') {
          actions.unshift('FRUITS FID is required for Krishi Bhagya application.');
        }
        results.push({
          scheme: krishiBhagya,
          matchLevel: 'explore-with-conditions',
          matchReasons: reasons,
          actionRequired: actions,
          isHypothesis: holdingCategory === 'marginal',
        });
      }
    } else if (state === 'Andhra Pradesh') {
      const apBase = SCHEMES_DATA.find((s) => s.slug === 'ap-state-agriculture-scheme');
      if (apBase) {
        const apScheme = getLocalizedScheme(apBase);
        results.push({
          scheme: apScheme,
          matchLevel: 'explore-with-conditions',
          matchReasons: [`Resident cultivator in Andhra Pradesh. Details to be confirmed with official department.`],
          actionRequired: ['Verify notification at Rythu Bharosa Kendra (RBK) or agriculture portal.'],
          isHypothesis: true,
        });
      }
    } else if (state === 'Telangana') {
      const tgBase = SCHEMES_DATA.find((s) => s.slug === 'telangana-state-agriculture-scheme');
      if (tgBase) {
        const tgScheme = getLocalizedScheme(tgBase);
        results.push({
          scheme: tgScheme,
          matchLevel: 'explore-with-conditions',
          matchReasons: [`Resident cultivator in Telangana. Details to be confirmed with official department.`],
          actionRequired: ['Verify notification with Mandal Agriculture Officer (MAO) or Rythu Vedika.'],
          isHypothesis: true,
        });
      }
    } else {
      // Any other state or union territory: dynamic verified placeholder
      const placeholderBase = SCHEMES_DATA.find((s) => s.slug === 'state-scheme-placeholder');
      if (placeholderBase) {
        const localized = getLocalizedScheme(placeholderBase);
        const statePlaceholderScheme: Scheme = {
          ...localized,
          title: `${state} State Agricultural Assistance Scheme (Pending Verification)`,
          whatItGives: `State-level agricultural or input support subject to state budget notification. Specific rules and amounts are pending official department verification for ${state}.`,
          whoItIsFor: `Agricultural landholders and cultivators residing within ${state}.`,
          documentsNeeded: ['Aadhaar card', 'State land record / Tenancy certificate', 'Aadhaar-linked bank account'],
          whereToApply: {
            portalName: `${state} State Agricultural Portal`,
            portalUrl: 'https://agricoop.nic.in',
            offlineOffice: `District Agricultural Officer or official state public service kiosk in ${state}`,
            helpline: '1800-180-1551',
          },
          state: state,
          isStateSpecificPlaceholder: true,
        };

        results.push({
          scheme: statePlaceholderScheme,
          matchLevel: 'explore-with-conditions',
          matchReasons: [
            `Cultivator in ${state}.`,
            `State scheme: details to be verified for ${state}. Do not rely on unverified estimates.`,
          ],
          actionRequired: [`Confirm active state-specific agricultural schemes at the nearest district office in ${state}.`],
          isHypothesis: true,
        });
      }
    }

    return results;
  }, [state, holdingCategory, tenure, cropCategory, landRecord, farmerId, bankAadhaar, locale]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Interactive Questionnaire Card */}
      <div className="lg:col-span-5 bg-paper-50 dark:bg-stone-900 border border-paper-300 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-paper-200 dark:border-stone-800 pb-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-ink dark:text-paper-50">
              {t('title')}
            </h2>
            <p className="text-xs text-ink-muted dark:text-stone-400">
              {t('subtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-field-800 dark:hover:text-straw-400 px-2 py-1 rounded bg-paper-100 dark:bg-stone-800 transition-colors"
            title="Reset answers to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{tCommon('reset')}</span>
          </button>
        </div>

        {/* Question 1: State or Union Territory */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-ink dark:text-paper-100" htmlFor="state-select">
            1. {t('qState')}
          </label>
          <p className="text-xs text-ink-muted dark:text-stone-400">{t('qStateHelp')}</p>
          <select
            id="state-select"
            value={state}
            onChange={(e) => setState(e.target.value as StateOrUT)}
            className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-100 text-sm font-medium focus:ring-2 focus:ring-field-800"
          >
            {INDIAN_STATES_AND_UTS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Question 2: Land Holding Category */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-ink dark:text-paper-100">
            2. {t('qHoldingCategory')}
          </label>
          <p className="text-xs text-ink-muted dark:text-stone-400">{t('qHoldingCategoryHelp')}</p>
          <div className="space-y-1.5 text-xs">
            {[
              { id: 'marginal', label: t('optMarginal') },
              { id: 'small', label: t('optSmall') },
              { id: 'semi-medium', label: t('optSemiMedium') },
              { id: 'medium', label: t('optMedium') },
              { id: 'large', label: t('optLarge') },
              { id: 'landless', label: t('optLandless') },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setHoldingCategory(opt.id as LandHoldingCategory)}
                className={`w-full p-2.5 rounded-lg border text-left font-medium transition-all ${
                  holdingCategory === opt.id
                    ? 'border-field-800 bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
                    : 'border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-200 hover:bg-paper-200 dark:hover:bg-stone-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question 3: Land Tenure Status */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-ink dark:text-paper-100">
            3. {t('qTenure')}
          </label>
          <div className="grid grid-cols-1 gap-2 text-xs">
            {[
              { id: 'owned', label: t('optTenureOwned') },
              { id: 'leased', label: t('optTenureLeased') },
              { id: 'shared', label: t('optTenureShared') },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTenure(opt.id as TenureType)}
                className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                  tenure === opt.id
                    ? 'border-field-800 bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
                    : 'border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-200 hover:bg-paper-200 dark:hover:bg-stone-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question 4: Main Agricultural Activity */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-ink dark:text-paper-100">
            4. {t('qCropCategory')}
          </label>
          <p className="text-xs text-ink-muted dark:text-stone-400">{t('qCropCategoryHelp')}</p>
          <div className="space-y-1.5 text-xs">
            {[
              { id: 'food-grains', label: t('optFoodGrains') },
              { id: 'horticulture', label: t('optHorticulture') },
              { id: 'plantation', label: t('optPlantation') },
              { id: 'livestock', label: t('optLivestock') },
              { id: 'other', label: t('optOtherCrops') },
            ].map((crop) => (
              <button
                key={crop.id}
                type="button"
                onClick={() => setCropCategory(crop.id as CropCategory)}
                className={`w-full p-2.5 rounded-lg border text-left font-medium transition-all ${
                  cropCategory === crop.id
                    ? 'border-field-800 bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
                    : 'border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-200 hover:bg-paper-200 dark:hover:bg-stone-800'
                }`}
              >
                {crop.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question 5: Credential Status Check */}
        <div className="space-y-4 pt-2 border-t border-paper-200 dark:border-stone-800">
          {/* 5a: Land Record */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ink dark:text-paper-100">
              5a. {t('qLandRecord')}
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'own', label: t('optRecordOwn') },
                { id: 'joint', label: t('optRecordJoint') },
                { id: 'none', label: t('optRecordNone') },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLandRecord(opt.id as any)}
                  className={`w-full p-2 rounded-lg border text-left font-medium transition-all ${
                    landRecord === opt.id
                      ? 'border-field-800 bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
                      : 'border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-200 hover:bg-paper-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5b: Farmer ID */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ink dark:text-paper-100">
              5b. {t('qFarmerId')}
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'yes', label: t('optIdYes') },
                { id: 'no', label: t('optIdNo') },
                { id: 'unsure', label: t('optIdUnsure') },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFarmerId(opt.id as any)}
                  className={`p-2 rounded-lg border text-center font-medium transition-all ${
                    farmerId === opt.id
                      ? 'border-field-800 bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
                      : 'border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-200 hover:bg-paper-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5c: Bank Aadhaar DBT */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ink dark:text-paper-100">
              5c. {t('qBankAadhaar')}
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'yes', label: t('optBankYes') },
                { id: 'no', label: t('optBankNo') },
                { id: 'unsure', label: t('optBankUnsure') },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setBankAadhaar(opt.id as any)}
                  className={`w-full p-2 rounded-lg border text-left font-medium transition-all ${
                    bankAadhaar === opt.id
                      ? 'border-field-800 bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
                      : 'border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-200 hover:bg-paper-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Matched Schemes & Action Items */}
      <div className="lg:col-span-7 space-y-6">
        {/* Prominent Mandatory Disclaimer Notice on Every Result */}
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60 flex items-start gap-3 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
            <strong className="block font-bold mb-0.5">Official Notice:</strong>
            {t('disclaimer')}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between pb-2 border-b border-paper-300 dark:border-stone-800">
          <div>
            <h2 className="font-serif font-bold text-2xl text-ink dark:text-paper-50">
              {t('resultsTitle')}
            </h2>
            <p className="text-xs text-ink-muted dark:text-stone-400">
              {matchResults.length} {t('resultsFound')} for {state}
            </p>
          </div>
        </div>

        {/* Scheme Result Cards */}
        {matchResults.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 text-ink-muted dark:text-stone-400 text-sm">
            {t('emptyNotice')}
          </div>
        ) : (
          <div className="space-y-4">
            {matchResults.map(({ scheme, matchLevel, matchReasons, actionRequired, isHypothesis }) => (
              <div
                key={scheme.id}
                className="rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 p-6 shadow-card hover:shadow-hover transition-all space-y-4"
              >
                {/* Header row: Scope Tag & Match Level Badge & Speech Button */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Nationwide vs State Badge */}
                    {scheme.state === 'all-india' || scheme.state === 'Central' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <Globe2 className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
                        <span>Nationwide Scheme</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        <Landmark className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                        <span>State Scheme: {scheme.state}</span>
                      </span>
                    )}

                    {matchLevel === 'likely-eligible' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{t('matchHigh')}</span>
                      </span>
                    )}
                    {matchLevel === 'explore-with-conditions' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 border border-blue-300 dark:border-blue-800">
                        <AlertCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{t('matchMedium')}</span>
                      </span>
                    )}
                    {matchLevel === 'action-required-first' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                        <span>{t('matchAction')}</span>
                      </span>
                    )}

                    {isHypothesis && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border border-orange-300">
                        {t('hypothesisLabel')}
                      </span>
                    )}
                  </div>

                  <SpeechButton
                    text={`${scheme.title}. Benefit: ${scheme.whatItGives}`}
                    locale={locale}
                    compact
                  />
                </div>

                {/* State Scheme Warning Notice if applicable */}
                {scheme.state !== 'all-india' && scheme.state !== 'Central' && (
                  <div className="p-2.5 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>
                      {tCommon('stateSchemeNotice', { state: scheme.state === 'Other' ? state : scheme.state })}
                    </span>
                  </div>
                )}

                {/* Scheme Title & Benefit */}
                <div>
                  <h3 className="font-serif font-bold text-xl text-ink dark:text-paper-100 leading-snug">
                    <Link href={`/schemes/${scheme.slug}`} className="hover:underline">
                      {scheme.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-ink dark:text-stone-300 mt-1 leading-relaxed">
                    {scheme.whatItGives}
                  </p>
                </div>

                {/* Profile Assessment */}
                <div className="p-3.5 rounded-lg bg-paper-100 dark:bg-stone-950/70 border border-paper-200 dark:border-stone-800 space-y-1.5 text-xs">
                  <span className="font-bold text-field-800 dark:text-straw-400 uppercase tracking-wider block">
                    Eligibility Assessment:
                  </span>
                  <ul className="space-y-1 text-ink-muted dark:text-stone-300 list-disc list-inside">
                    {matchReasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* Action Required Before Applying */}
                {actionRequired && actionRequired.length > 0 && (
                  <div className="p-3.5 rounded-lg bg-straw-50 dark:bg-stone-950/90 border border-straw-300 dark:border-stone-700 space-y-1.5 text-xs">
                    <span className="font-bold text-ink dark:text-paper-100 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-straw-400" />
                      <span>{t('actionNeededTitle')}</span>
                    </span>
                    <ul className="space-y-1 text-ink-muted dark:text-stone-300 list-disc list-inside pl-1">
                      {actionRequired.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons & Verification */}
                <div className="pt-3 border-t border-paper-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
                  <VerifiedBadge
                    verifiedBy={scheme.verifiedBy}
                    verifiedOn={scheme.lastVerifiedOn}
                    sourceUrl={scheme.sourceUrl}
                    isMachineTranslated={scheme.isMachineTranslated}
                    isHypothesis={isHypothesis}
                    compact
                  />

                  <Link
                    href={`/schemes/${scheme.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-field-800 hover:bg-field-900 text-paper-50 dark:bg-field-700 dark:hover:bg-field-600 transition-colors"
                  >
                    <span>View Scheme Details</span>
                    <ChevronRight className="w-3.5 h-3.5 text-straw-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
