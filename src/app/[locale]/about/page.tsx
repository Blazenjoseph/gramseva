import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  ShieldCheck,
  Users,
  FileCheck2,
  AlertCircle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Editorial Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-field-50 dark:bg-stone-800 border border-field-200 dark:border-stone-700 text-xs font-semibold text-field-800 dark:text-straw-400">
          <GraduationCap className="w-4 h-4" />
          <span>Academic & Field Design Thinking Initiative</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper-50 leading-tight">
          {t('title')}
        </h1>
        <p className="text-lg text-ink-muted dark:text-stone-300 leading-relaxed font-normal">
          {t('subtitle')}
        </p>
      </div>

      {/* Scope and Persona */}
      <section className="p-6 sm:p-8 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card space-y-4">
        <h2 className="font-serif font-bold text-2xl text-ink dark:text-paper-50">
          Target Problem & Design Persona
        </h2>
        <p className="text-sm sm:text-base text-ink-muted dark:text-stone-300 leading-relaxed font-normal">
          {t('projectScope')}
        </p>
        <div className="p-4 rounded-xl bg-paper-100 dark:bg-stone-950/80 border border-paper-200 dark:border-stone-800 text-xs sm:text-sm text-ink dark:text-stone-200 space-y-2">
          <strong className="font-bold text-field-800 dark:text-straw-400 block">
            The Half-Acre Ragi Cultivator Persona:
          </strong>
          <p className="leading-relaxed">
            In Karnataka’s dry zones (such as Magadi, Koratagere, Maddur, Srinivasapura), small farmers working 0.5 acre plots face specific administrative barriers: joint family landholdings, spelling variances between Aadhaar and Pahani, and unseeded bank accounts that quietly bounce DBT payments. Scheme Access Kit is engineered to resolve these exact bottlenecks.
          </p>
        </div>
      </section>

      {/* Verification Methodology */}
      <section className="space-y-6">
        <h2 className="font-serif font-bold text-2xl text-ink dark:text-paper-50">
          {t('methodologyTitle')}
        </h2>

        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm space-y-2">
            <h3 className="font-serif font-bold text-lg text-field-800 dark:text-straw-400 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-field-700 dark:text-straw-400" />
              <span>1. Gazette-Level Grounding</span>
            </h3>
            <p className="text-sm text-ink-muted dark:text-stone-300 leading-relaxed">
              {t('methodStep1')}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm space-y-2">
            <h3 className="font-serif font-bold text-lg text-field-800 dark:text-straw-400 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-field-700 dark:text-straw-400" />
              <span>2. Explicit Edge-Case Flagging</span>
            </h3>
            <p className="text-sm text-ink-muted dark:text-stone-300 leading-relaxed">
              {t('methodStep2')}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm space-y-2">
            <h3 className="font-serif font-bold text-lg text-field-800 dark:text-straw-400 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-field-700 dark:text-straw-400" />
              <span>3. Zero Personal Data Architecture</span>
            </h3>
            <p className="text-sm text-ink-muted dark:text-stone-300 leading-relaxed">
              {t('methodStep3')}
            </p>
          </div>
        </div>
      </section>

      {/* Sources Register Link */}
      <div className="p-6 rounded-xl bg-paper-200/60 dark:bg-stone-900 border border-paper-300 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-ink dark:text-paper-100">
            Official Sources Register (SOURCES.md)
          </h3>
          <p className="text-xs text-ink-muted dark:text-stone-400 mt-0.5">
            Full audit log of primary government portals, G.O. numbers, and verification dates.
          </p>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-field-800 hover:bg-field-900 text-paper-50 font-semibold text-xs shrink-0"
        >
          <span>View SOURCES.md</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Student Research Team Attribution */}
      <section className="p-6 sm:p-8 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-field-800 dark:text-straw-400" />
          <h2 className="font-serif font-bold text-2xl text-ink dark:text-paper-50">
            {t('teamTitle')}
          </h2>
        </div>
        <p className="text-sm text-ink-muted dark:text-stone-300 leading-relaxed">
          Developed by student engineers and researchers at <strong>JAIN (Deemed-to-be University)</strong> as part of the Design Thinking curriculum. Supervised under agricultural public-interest policy and accessibility design criteria.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs text-ink-muted dark:text-stone-300">
          <div className="p-3 rounded-lg bg-paper-100 dark:bg-stone-950">
            <span className="font-bold text-field-800 dark:text-straw-400 block mb-0.5">
              Institution
            </span>
            <span>JAIN (Deemed-to-be University), Bengaluru, Karnataka</span>
          </div>
          <div className="p-3 rounded-lg bg-paper-100 dark:bg-stone-950">
            <span className="font-bold text-field-800 dark:text-straw-400 block mb-0.5">
              Project Group
            </span>
            <span>Group 5 · Design Thinking · Batch 2026</span>
          </div>
        </div>
      </section>

      {/* Report Discrepancy Call to Action */}
      <section className="p-6 sm:p-8 rounded-2xl border border-straw-400 dark:border-stone-800 bg-straw-50 dark:bg-stone-900/90 shadow-sm space-y-3">
        <h3 className="font-serif font-bold text-xl text-ink dark:text-paper-100">
          {t('reportErrorTitle')}
        </h3>
        <p className="text-sm text-ink-muted dark:text-stone-300 leading-relaxed">
          {t('reportErrorDesc')}
        </p>
        <div className="pt-2">
          <Link
            href="/feedback"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-field-800 hover:bg-field-900 text-paper-50 font-semibold text-xs sm:text-sm shadow-sm transition-colors"
          >
            <span>Submit Discrepancy Notice</span>
            <ArrowRight className="w-4 h-4 text-straw-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
