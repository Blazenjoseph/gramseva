'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Locale, Scheme, SchemeMatchResult } from '@/types';
import { SCHEMES_DATA, SCHEME_TRANSLATIONS } from '@/lib/data/schemes';
import { KARNATAKA_DISTRICTS } from '@/lib/data/offices';
import { SpeechButton } from '@/components/ui/SpeechButton';
import { VerifiedBadge } from '@/components/ui/VerifiedBadge';
import { Link } from '@/i18n/routing';
import {
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SchemeFinderFormProps {
  locale: Locale;
}

export function SchemeFinderForm({ locale }: SchemeFinderFormProps) {
  const t = useTranslations('finder');
  const tCommon = useTranslations('common');

  // Form State
  const [landSize, setLandSize] = useState<'marginal' | 'small' | 'medium' | 'landless'>('marginal');
  const [selectedCrops, setSelectedCrops] = useState<string[]>(['ragi']);
  const [landRecord, setLandRecord] = useState<'own' | 'joint' | 'ancestor' | 'none'>('own');
  const [farmerId, setFarmerId] = useState<'yes' | 'no' | 'unsure'>('yes');
  const [bankAadhaar, setBankAadhaar] = useState<'yes' | 'no' | 'unsure'>('yes');
  const [district, setDistrict] = useState<string>('Ramanagara');

  const toggleCrop = (cropId: string) => {
    if (selectedCrops.includes(cropId)) {
      if (selectedCrops.length > 1) {
        setSelectedCrops(selectedCrops.filter((c) => c !== cropId));
      }
    } else {
      setSelectedCrops([...selectedCrops, cropId]);
    }
  };

  const handleReset = () => {
    setLandSize('marginal');
    setSelectedCrops(['ragi']);
    setLandRecord('own');
    setFarmerId('yes');
    setBankAadhaar('yes');
    setDistrict('Ramanagara');
  };

  // Rule Evaluation Engine
  const matchResults: SchemeMatchResult[] = useMemo(() => {
    const results: SchemeMatchResult[] = [];

    // Evaluate each scheme against user profile
    for (const rawScheme of SCHEMES_DATA) {
      const translation = SCHEME_TRANSLATIONS[rawScheme.slug]?.[locale];
      const scheme: Scheme = {
        ...rawScheme,
        ...(translation || {}),
        isMachineTranslated: locale !== 'en',
      };

      const reasons: string[] = [];
      const actionRequired: string[] = [];
      let isHypothesis = false;

      // Rule 1: FRUITS FID Scheme
      if (scheme.slug === 'fruits-farmer-id') {
        if (farmerId === 'yes') {
          // Already has it
          results.push({
            scheme,
            matchLevel: 'explore-with-conditions',
            matchReasons: ['You already hold a FRUITS FID. Verify your current RTC survey hissa is attached.'],
            isHypothesis: false,
          });
        } else {
          // Mandatory prerequisite!
          results.push({
            scheme,
            matchLevel: 'action-required-first',
            matchReasons: [
              'Mandatory foundation for Karnataka state benefits.',
              'Required before Raitha Siri, Krishi Bhagya, or MSP procurement can be claimed.'
            ],
            actionRequired: [
              'Visit nearest Grama One or Hobli RSK with Aadhaar and Bhoomi Pahani to register your FID.'
            ],
            isHypothesis: false,
          });
        }
        continue;
      }

      // Rule 2: PM-KISAN
      if (scheme.slug === 'pm-kisan') {
        if (landRecord === 'none' || landSize === 'landless') {
          // Landless/Tenant ineligible for PM-KISAN under current central guidelines
          continue;
        }

        if (landRecord === 'ancestor') {
          results.push({
            scheme,
            matchLevel: 'action-required-first',
            matchReasons: [
              'PM-KISAN requires the cultivable landholding to be in your own name.',
              'Pahani currently in ancestor’s name blocks automated database matching.'
            ],
            actionRequired: [
              'Initiate "Pouthi Khata" (Mutation) at Nadakacheri/Bhoomi portal to transfer title.'
            ],
            isHypothesis: false,
          });
          continue;
        }

        if (landRecord === 'joint') {
          isHypothesis = true;
          reasons.push('Joint family landholding: Beneficiaries qualify proportionate to ownership share.');
        } else {
          reasons.push('Cultivable land record is held in own name in Bhoomi.');
        }

        if (bankAadhaar !== 'yes') {
          actionRequired.push('Visit your bank branch and ask for the "NPCI Aadhaar DBT Seeding Form".');
        }

        results.push({
          scheme,
          matchLevel: bankAadhaar === 'yes' ? 'likely-eligible' : 'explore-with-conditions',
          matchReasons: reasons,
          actionRequired: actionRequired.length > 0 ? actionRequired : undefined,
          isHypothesis,
        });
        continue;
      }

      // Rule 3: Raitha Siri (Millet / Ragi incentive)
      if (scheme.slug === 'raitha-siri') {
        const growsMillet = selectedCrops.includes('ragi') || selectedCrops.includes('millets');

        if (!growsMillet) {
          // Not growing millets
          continue;
        }

        if (landRecord === 'none' || landSize === 'landless') {
          continue;
        }

        reasons.push('Cultivates Finger Millet (Ragi) or minor millets in Karnataka.');

        if (farmerId !== 'yes') {
          actionRequired.push('Generate your Karnataka FRUITS FID at nearest Grama One or RSK.');
        }

        actionRequired.push('Ensure crop is surveyed in Karnataka Bele Samikshe (Mobile Crop Survey) app.');

        if (bankAadhaar !== 'yes') {
          actionRequired.push('Ensure Aadhaar is seeded on NPCI DBT mapper at your bank.');
        }

        results.push({
          scheme,
          matchLevel: farmerId === 'yes' && bankAadhaar === 'yes' ? 'likely-eligible' : 'action-required-first',
          matchReasons: reasons,
          actionRequired,
          isHypothesis: landRecord === 'joint',
        });
        continue;
      }

      // Rule 4: Krishi Bhagya (Farm Ponds)
      if (scheme.slug === 'krishi-bhagya') {
        if (landRecord === 'none' || landSize === 'landless') {
          continue;
        }

        if (landSize === 'marginal') {
          isHypothesis = true;
          reasons.push('Under 1 acre holding: Individual farm ponds normally require 1+ acre; 0.5 acre cultivators can apply through community/joint cluster pond provisions.');
        } else {
          reasons.push('Dryland agricultural holding qualifies for farm pond and polythene lining subsidy.');
        }

        if (farmerId !== 'yes') {
          actionRequired.push('FRUITS FID is mandatory to submit Krishi Bhagya requisition.');
        }

        actionRequired.push('Apply at taluk Assistant Director of Agriculture (ADA) office prior to monsoon.');

        results.push({
          scheme,
          matchLevel: 'explore-with-conditions',
          matchReasons: reasons,
          actionRequired,
          isHypothesis,
        });
        continue;
      }

      // Rule 5: PMFBY Crop Insurance
      if (scheme.slug === 'pm-fasal-bima-yojana') {
        reasons.push(`Cultivating ${selectedCrops.join(', ')} in ${district} district.`);
        results.push({
          scheme,
          matchLevel: 'likely-eligible',
          matchReasons: reasons,
          actionRequired: ['Enroll before seasonal cut-off date (July 31st for Kharif) at bank or Grama One.'],
          isHypothesis: false,
        });
        continue;
      }
    }

    return results;
  }, [landSize, selectedCrops, landRecord, farmerId, bankAadhaar, district, locale]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Interactive Questionnaire Card */}
      <div className="lg:col-span-5 bg-paper-50 dark:bg-stone-900 border border-paper-300 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-paper-200 dark:border-stone-800 pb-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-ink dark:text-paper-50">
              Cultivation Profile
            </h2>
            <p className="text-xs text-ink-muted dark:text-stone-400">
              Tailored for Karnataka smallholders
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

        {/* Question 1: Land Size */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-ink dark:text-paper-100">
            1. {t('qLandSize')}
          </label>
          <p className="text-xs text-ink-muted dark:text-stone-400">{t('qLandSizeHelp')}</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'marginal', label: t('optHalfAcre') },
              { id: 'small', label: t('optOneToTwo') },
              { id: 'medium', label: t('optAboveTwo') },
              { id: 'landless', label: t('optLandless') },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setLandSize(opt.id as any)}
                className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                  landSize === opt.id
                    ? 'border-field-800 bg-field-800 text-paper-50 dark:bg-field-700 dark:border-field-600 shadow-sm'
                    : 'border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-200 hover:bg-paper-200 dark:hover:bg-stone-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question 2: Crops Grown */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-ink dark:text-paper-100">
            2. {t('qCrops')}
          </label>
          <p className="text-xs text-ink-muted dark:text-stone-400">{t('qCropsHelp')}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: 'ragi', label: t('cropRagi') },
              { id: 'millets', label: t('cropMillets') },
              { id: 'paddy', label: t('cropPaddy') },
              { id: 'pulses', label: t('cropPulses') },
              { id: 'horticulture', label: t('cropHorticulture') },
            ].map((crop) => {
              const active = selectedCrops.includes(crop.id);
              return (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() => toggleCrop(crop.id)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                    active
                      ? 'border-field-800 bg-field-800 text-paper-50 dark:bg-straw-400 dark:text-ink dark:border-straw-500 font-bold'
                      : 'border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-200 hover:bg-paper-200'
                  }`}
                >
                  {crop.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 3: Land Record in own name */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-ink dark:text-paper-100">
            3. {t('qLandRecord')}
          </label>
          <div className="space-y-1.5 text-xs">
            {[
              { id: 'own', label: t('optRecordOwn') },
              { id: 'joint', label: t('optRecordJoint') },
              { id: 'ancestor', label: t('optRecordAncestor') },
              { id: 'none', label: t('optRecordNone') },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setLandRecord(opt.id as any)}
                className={`w-full p-2.5 rounded-lg border text-left font-medium transition-all ${
                  landRecord === opt.id
                    ? 'border-field-800 bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
                    : 'border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-200 hover:bg-paper-200 dark:hover:bg-stone-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question 4: Farmer ID (FRUITS FID) */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-ink dark:text-paper-100">
            4. {t('qFarmerId')}
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

        {/* Question 5: Bank Aadhaar DBT */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-ink dark:text-paper-100">
            5. {t('qBankAadhaar')}
          </label>
          <div className="space-y-1.5 text-xs">
            {[
              { id: 'yes', label: t('optBankYes') },
              { id: 'no', label: t('optBankNo') },
              { id: 'unsure', label: t('optBankUnsure') },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setBankAadhaar(opt.id as any)}
                className={`w-full p-2.5 rounded-lg border text-left font-medium transition-all ${
                  bankAadhaar === opt.id
                    ? 'border-field-800 bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
                    : 'border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-200 hover:bg-paper-200 dark:hover:bg-stone-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question 6: District */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-ink dark:text-paper-100" htmlFor="district-select">
            6. {t('qDistrict')}
          </label>
          <select
            id="district-select"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-100 text-sm font-medium focus:ring-2 focus:ring-field-800"
          >
            {KARNATAKA_DISTRICTS.filter((d) => d !== 'All Districts').map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Column: Matched Schemes & Action Items */}
      <div className="lg:col-span-7 space-y-6">
        {/* Prominent Disclaimer Notice Required on Every Result */}
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60 flex items-start gap-3 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
            <strong className="block font-bold mb-0.5">Mandatory Disclaimer:</strong>
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
              {matchResults.length} {t('resultsFound')} for your profile
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
                {/* Header row: Match Level Badge & Speech Button */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
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

                {/* Why it matches this farmer's profile */}
                <div className="p-3.5 rounded-lg bg-paper-100 dark:bg-stone-950/70 border border-paper-200 dark:border-stone-800 space-y-1.5 text-xs">
                  <span className="font-bold text-field-800 dark:text-straw-400 uppercase tracking-wider block">
                    Profile Assessment:
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
                    <span>View Scheme Steps</span>
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
