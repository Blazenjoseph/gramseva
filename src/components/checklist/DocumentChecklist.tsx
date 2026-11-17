'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Locale, DocumentCheckItem } from '@/types';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Printer,
  Download,
  RotateCcw,
  ShieldCheck,
  FileText,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface DocumentChecklistProps {
  locale: Locale;
}

const DEFAULT_DOCUMENTS: DocumentCheckItem[] = [
  {
    id: 'doc-rtc',
    nameKey: 'rtc',
    name: 'Bhoomi RTC / Pahani (Land Record)',
    purpose: 'Proof of cultivable landholding, survey number, and ownership share in Karnataka Bhoomi system.',
    status: 'ready',
    notes: 'Computerized RTC downloaded from Nadakacheri or Bhoomi portal.',
    issueTypes: [],
  },
  {
    id: 'doc-aadhaar',
    nameKey: 'aadhaar',
    name: 'Aadhaar Card with Active Mobile Link',
    purpose: 'Identity verification for eKYC OTP authentication and automated database lookups.',
    status: 'ready',
    notes: 'Mobile number receives OTP without fail.',
    issueTypes: [],
  },
  {
    id: 'doc-bank-npci',
    nameKey: 'bank-npci',
    name: 'Bank Passbook & NPCI Aadhaar DBT Seeding',
    purpose: 'Direct receipt of government benefits via Direct Benefit Transfer mapper.',
    status: 'needs-correction',
    notes: 'Bank account opened with Aadhaar, but NPCI DBT seeding form not yet submitted at branch.',
    issueTypes: ['aadhaar-seeding-pending'],
  },
  {
    id: 'doc-fruits-id',
    nameKey: 'fruits-id',
    name: 'FRUITS Farmer Registration Number (FID)',
    purpose: 'Karnataka unified 8-9 digit farmer identity required for Raitha Siri, Krishi Bhagya & MSP.',
    status: 'ready',
    notes: 'FID slip safely stored with survey numbers attached.',
    issueTypes: [],
  },
  {
    id: 'doc-crop-survey',
    nameKey: 'crop-survey',
    name: 'Bele Samikshe (Farmer Mobile Crop Survey Entry)',
    purpose: 'Proof of standing ragi / millet cultivation during current kharif/rabi season.',
    status: 'needs-correction',
    notes: 'Need to verify if crop surveyor geo-tagged the ragi plot correctly.',
    issueTypes: [],
  },
  {
    id: 'doc-caste-cert',
    nameKey: 'caste-cert',
    name: 'Caste Certificate (RD Number from Nadakacheri)',
    purpose: 'Required only if claiming enhanced 90% SC/ST subsidy under Krishi Bhagya.',
    status: 'ready',
    notes: 'Valid digitally signed certificate available.',
    issueTypes: [],
  },
];

export function DocumentChecklist({ locale }: DocumentChecklistProps) {
  const t = useTranslations('checklist');
  const tCommon = useTranslations('common');

  const [items, setItems] = useState<DocumentCheckItem[]>(DEFAULT_DOCUMENTS);
  const [mounted, setMounted] = useState(false);

  // Load from local storage on mount (browser only)
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('sak_doc_checklist');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        // use default
      }
    }
  }, []);

  const updateStatus = (id: string, status: 'ready' | 'needs-correction' | 'missing') => {
    const updated = items.map((item) => (item.id === id ? { ...item, status } : item));
    setItems(updated);
    localStorage.setItem('sak_doc_checklist', JSON.stringify(updated));
  };

  const updateNotes = (id: string, notes: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, notes } : item));
    setItems(updated);
    localStorage.setItem('sak_doc_checklist', JSON.stringify(updated));
  };

  const handleReset = () => {
    setItems(DEFAULT_DOCUMENTS);
    localStorage.removeItem('sak_doc_checklist');
  };

  const handlePrint = () => {
    window.print();
  };

  // Stats calculation
  const readyCount = items.filter((i) => i.status === 'ready').length;
  const correctionCount = items.filter((i) => i.status === 'needs-correction').length;
  const missingCount = items.filter((i) => i.status === 'missing').length;

  return (
    <div className="space-y-8">
      {/* Privacy Guarantee Banner */}
      <div className="p-4 rounded-xl border border-field-200 dark:border-stone-800 bg-field-50/70 dark:bg-stone-900 flex items-start gap-3 shadow-sm no-print">
        <ShieldCheck className="w-5 h-5 text-field-800 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-field-950 dark:text-stone-300 leading-relaxed">
          <strong className="font-bold block mb-0.5">Privacy Assurance:</strong>
          {t('privacyNotice')}
        </div>
      </div>

      {/* Traffic Light Summary Cards & Print Action */}
      <div className="p-6 sm:p-8 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-paper-200 dark:border-stone-800">
          <div>
            <h2 className="font-serif font-bold text-2xl text-ink dark:text-paper-50">
              {t('summaryHeading')}
            </h2>
            <p className="text-xs text-ink-muted dark:text-stone-400 mt-1">
              Traffic-light breakdown for your next office visit
            </p>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-field-800 hover:bg-field-900 text-paper-50 font-semibold text-xs sm:text-sm shadow-sm transition-colors focus:ring-2 focus:ring-field-800"
              title="Print document readiness summary"
            >
              <Printer className="w-4 h-4 text-straw-400" />
              <span>{t('printHeader') ? 'Print / Save PDF' : tCommon('print')}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-100 hover:bg-paper-200 dark:bg-stone-800 text-ink-muted hover:text-ink text-xs transition-colors"
              title="Reset checklist to initial state"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Ready (Green) */}
          <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 block">
                  {t('readyCount')}
                </span>
                <span className="text-2xl font-serif font-bold text-emerald-950 dark:text-emerald-100">
                  {readyCount} of {items.length}
                </span>
              </div>
            </div>
          </div>

          {/* Needs Correction (Amber) */}
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-amber-600 dark:text-amber-400" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 block">
                  {t('correctionCount')}
                </span>
                <span className="text-2xl font-serif font-bold text-amber-950 dark:text-amber-100">
                  {correctionCount} of {items.length}
                </span>
              </div>
            </div>
          </div>

          {/* Missing (Red) */}
          <div className="p-4 rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <XCircle className="w-7 h-7 text-red-600 dark:text-red-400" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-900 dark:text-red-300 block">
                  {t('missingCount')}
                </span>
                <span className="text-2xl font-serif font-bold text-red-950 dark:text-red-100">
                  {missingCount} of {items.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Report Header (Visible Only in Print Mode) */}
      <div className="hidden print:block p-4 border-b-2 border-black mb-6">
        <h1 className="text-2xl font-bold">{t('printHeader')}</h1>
        <p className="text-sm">
          Scheme Access Kit · Group 5, Design Thinking, JAIN (Deemed-to-be University)
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Printed on: {new Date().toLocaleDateString()} · Private client-side checklist evaluation
        </p>
      </div>

      {/* Document Items List */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const isReady = item.status === 'ready';
          const isCorrection = item.status === 'needs-correction';
          const isMissing = item.status === 'missing';

          return (
            <div
              key={item.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all card-print ${
                isReady
                  ? 'border-emerald-300/80 bg-paper-50 dark:bg-stone-900 dark:border-emerald-900/60'
                  : isCorrection
                  ? 'border-amber-300/90 bg-amber-50/40 dark:bg-stone-900 dark:border-amber-900/60'
                  : 'border-red-300/90 bg-red-50/40 dark:bg-stone-900 dark:border-red-900/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Document Information */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-paper-200 dark:bg-stone-800 text-xs font-bold flex items-center justify-center font-serif text-ink dark:text-paper-100">
                      {index + 1}
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-ink dark:text-paper-100 leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-muted dark:text-stone-300 leading-relaxed font-normal">
                    {item.purpose}
                  </p>

                  {/* Personal note input */}
                  <div className="pt-2">
                    <input
                      type="text"
                      value={item.notes || ''}
                      onChange={(e) => updateNotes(item.id, e.target.value)}
                      placeholder={t('notesPlaceholder')}
                      className="w-full text-xs px-3 py-1.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-100 focus:outline-none focus:ring-1 focus:ring-field-800"
                    />
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex sm:flex-col gap-1.5 shrink-0 no-print" role="group" aria-label={`Status for ${item.name}`}>
                  <button
                    type="button"
                    onClick={() => updateStatus(item.id, 'ready')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isReady
                        ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm'
                        : 'bg-paper-100 dark:bg-stone-800 text-ink-muted hover:bg-emerald-100 dark:hover:bg-emerald-950'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t('markReady')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateStatus(item.id, 'needs-correction')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isCorrection
                        ? 'bg-amber-600 text-white dark:bg-amber-500 shadow-sm'
                        : 'bg-paper-100 dark:bg-stone-800 text-ink-muted hover:bg-amber-100 dark:hover:bg-amber-950'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{t('markCorrection')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateStatus(item.id, 'missing')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isMissing
                        ? 'bg-red-700 text-white dark:bg-red-600 shadow-sm'
                        : 'bg-paper-100 dark:bg-stone-800 text-ink-muted hover:bg-red-100 dark:hover:bg-red-950'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{t('markMissing')}</span>
                  </button>
                </div>

                {/* Print Only Status Indicator */}
                <div className="hidden print:block text-xs font-bold uppercase tracking-wider">
                  Status: {item.status.toUpperCase()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
