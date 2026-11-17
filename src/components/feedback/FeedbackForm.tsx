'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { KARNATAKA_DISTRICTS } from '@/lib/data/offices';
import { ShieldCheck, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const formSchema = z.object({
  nameOrRole: z.string().max(100).optional(),
  district: z.string().optional(),
  category: z.enum(['scheme-rule', 'office-contact', 'translation', 'general']),
  message: z
    .string()
    .min(5, 'Message must be at least 5 characters')
    .max(2000, 'Message cannot exceed 2000 characters')
    .refine(
      (val) => !/\b\d{4}\s?\d{4}\s?\d{4}\b/.test(val),
      'For privacy and safety, do not include 12-digit Aadhaar numbers.'
    )
    .refine(
      (val) => !/\b\d{9,18}\b/.test(val),
      'For privacy and safety, do not include bank account numbers.'
    ),
});

type FormData = z.infer<typeof formSchema>;

export function FeedbackForm() {
  const t = useTranslations('feedback');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: 'scheme-rule',
      district: 'Ramanagara',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error || t('errorMessage'));
        setSubmitStatus('error');
        return;
      }

      setSubmitStatus('success');
      reset();
    } catch {
      setErrorMessage(t('errorMessage'));
      setSubmitStatus('error');
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card space-y-6">
      {/* Privacy guarantee reminder */}
      <div className="p-4 rounded-xl border border-field-200 dark:border-stone-800 bg-field-50 dark:bg-stone-950 flex items-start gap-3 text-xs sm:text-sm text-field-950 dark:text-stone-300">
        <ShieldCheck className="w-5 h-5 text-field-800 dark:text-straw-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block font-bold mb-0.5">Zero Personal Data Policy:</strong>
          Please DO NOT write Aadhaar numbers, 16-digit bank accounts, or land survey numbers. Any submission containing such numbers is rejected automatically by validation filters.
        </div>
      </div>

      {submitStatus === 'success' ? (
        <div className="p-6 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-emerald-100">
            {t('successMessage')}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
            Your observation has been queued for the student research desk audit.
          </p>
          <button
            type="button"
            onClick={() => setSubmitStatus('idle')}
            className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
          >
            Submit Another Report
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {submitStatus === 'error' && (
            <div className="p-4 rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/50 flex items-center gap-3 text-xs sm:text-sm text-red-900 dark:text-red-200">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-ink dark:text-paper-100 uppercase tracking-wider">
              {t('categoryLabel')}
            </label>
            <select
              {...register('category')}
              className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-100 text-sm focus:ring-2 focus:ring-field-800"
            >
              <option value="scheme-rule">{t('catScheme')}</option>
              <option value="office-contact">{t('catOffice')}</option>
              <option value="translation">{t('catTranslation')}</option>
              <option value="general">{t('catGeneral')}</option>
            </select>
          </div>

          {/* District & Name (Optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink dark:text-paper-100 uppercase tracking-wider">
                {t('districtLabel')}
              </label>
              <select
                {...register('district')}
                className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-100 text-sm focus:ring-2 focus:ring-field-800"
              >
                {KARNATAKA_DISTRICTS.filter((d) => d !== 'All Districts').map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink dark:text-paper-100 uppercase tracking-wider">
                {t('nameLabel')}
              </label>
              <input
                type="text"
                {...register('nameOrRole')}
                placeholder="E.g. Magadi ragi farmer or RSK field visitor"
                className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-100 text-sm focus:ring-2 focus:ring-field-800"
              />
            </div>
          </div>

          {/* Observations / Message */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-ink dark:text-paper-100 uppercase tracking-wider">
              {t('messageLabel')}
            </label>
            <textarea
              rows={4}
              {...register('message')}
              placeholder="Describe the discrepancy, new office phone number, or updated guideline..."
              className="w-full p-3 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-100 text-sm focus:ring-2 focus:ring-field-800"
            />
            {errors.message && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-ink-muted dark:text-stone-400">
              {t('rateLimitNotice')}
            </span>

            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-field-800 hover:bg-field-900 disabled:opacity-50 text-paper-50 font-semibold text-xs sm:text-sm shadow-sm transition-colors focus:ring-2 focus:ring-field-800"
            >
              {submitStatus === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-straw-400" />
                  <span>{t('submitting')}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-straw-400" />
                  <span>{t('submitBtn')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
