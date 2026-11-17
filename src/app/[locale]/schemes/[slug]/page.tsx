import React from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getSchemeBySlug, getAllSchemes } from '@/lib/data/schemes';
import { Locale } from '@/types';
import { Link } from '@/i18n/routing';
import { SpeechButton } from '@/components/ui/SpeechButton';
import { VerifiedBadge } from '@/components/ui/VerifiedBadge';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building,
  Phone,
  Globe,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  ChevronRight,
} from 'lucide-react';

export async function generateStaticParams() {
  const schemes = getAllSchemes('en');
  return schemes.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const scheme = getSchemeBySlug(slug, locale as Locale);

  if (!scheme) return { title: 'Scheme Not Found' };

  return {
    title: `${scheme.title}`,
    description: scheme.whatItGives,
  };
}

export default async function SchemeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const currentLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'schemes' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const scheme = getSchemeBySlug(slug, currentLocale);
  if (!scheme) notFound();

  const fullTextToRead = `${scheme.title}. ${scheme.whatItGives}. Who it is for: ${scheme.whoItIsFor}. Crucial watch out: ${scheme.watchFor}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Back Navigation Link */}
      <Link
        href="/schemes"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-field-800 dark:text-straw-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Schemes</span>
      </Link>

      {/* Main Header Card */}
      <div className="p-6 sm:p-10 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-straw-100 text-straw-700 dark:bg-stone-800 dark:text-straw-400 border border-straw-300 dark:border-stone-700">
            {scheme.state === 'karnataka' ? 'Karnataka State Scheme' : 'Central Government Scheme'}
          </span>

          <SpeechButton text={fullTextToRead} locale={currentLocale} />
        </div>

        <div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper-50 leading-[1.2]">
            {scheme.title}
          </h1>
          <p className="text-sm sm:text-base text-ink-muted dark:text-stone-400 font-medium mt-2">
            {scheme.department}
          </p>
        </div>

        <VerifiedBadge
          verifiedBy={scheme.verifiedBy}
          verifiedOn={scheme.lastVerifiedOn}
          sourceUrl={scheme.sourceUrl}
          isMachineTranslated={scheme.isMachineTranslated}
          isHypothesis={scheme.isHypothesis}
        />
      </div>

      {/* Core Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: What It Gives, Who It Is For, Crucial Watch Out */}
        <div className="md:col-span-8 space-y-6">
          {/* What it gives */}
          <section className="p-6 sm:p-8 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm space-y-3">
            <h2 className="font-serif font-bold text-xl text-field-900 dark:text-straw-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-field-700 dark:text-straw-400" />
              <span>{t('whatItGives')}</span>
            </h2>
            <p className="text-base text-ink dark:text-stone-200 leading-relaxed font-normal">
              {scheme.whatItGives}
            </p>
          </section>

          {/* Crucial Watch Out Warning */}
          <section className="p-6 sm:p-8 rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-50/90 dark:bg-amber-950/50 shadow-sm space-y-3">
            <h2 className="font-serif font-bold text-xl text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              <span>{t('watchFor')}</span>
            </h2>
            <p className="text-sm sm:text-base text-ink dark:text-amber-100 leading-relaxed font-medium">
              {scheme.watchFor}
            </p>
          </section>

          {/* Who it is for */}
          <section className="p-6 sm:p-8 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-xl text-ink dark:text-paper-100">
              {t('whoItIsFor')}
            </h2>
            <p className="text-sm sm:text-base text-ink-muted dark:text-stone-300 leading-relaxed">
              {scheme.whoItIsFor}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-paper-200 dark:border-stone-800 text-xs text-ink-muted dark:text-stone-300">
              <div className="p-3 rounded-lg bg-paper-100 dark:bg-stone-950">
                <span className="font-bold text-field-800 dark:text-straw-400 block mb-1">
                  Land Size Parameter
                </span>
                <span>
                  {scheme.landSizeMinAcres !== undefined
                    ? `Min: ${scheme.landSizeMinAcres} acre`
                    : 'No minimum'}
                  {scheme.landSizeMaxAcres ? ` · Max: ${scheme.landSizeMaxAcres} acres` : ''}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-paper-100 dark:bg-stone-950">
                <span className="font-bold text-field-800 dark:text-straw-400 block mb-1">
                  Eligible Cropping Patterns
                </span>
                <span className="capitalize">
                  {scheme.eligibleCrops?.join(', ') || 'All crops'}
                </span>
              </div>
            </div>
          </section>

          {/* Documents Needed */}
          <section className="p-6 sm:p-8 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-ink dark:text-paper-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-field-800 dark:text-straw-400" />
                <span>{t('documentsNeeded')}</span>
              </h2>
              <Link
                href="/checklist"
                className="text-xs font-semibold text-field-800 dark:text-straw-400 hover:underline flex items-center gap-1"
              >
                <span>Check readiness</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <ul className="space-y-2.5">
              {scheme.documentsNeeded.map((doc, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-xl bg-paper-100/80 dark:bg-stone-950/60 border border-paper-200 dark:border-stone-800 flex items-start gap-3 text-sm text-ink dark:text-stone-200"
                >
                  <span className="w-5 h-5 rounded-full bg-field-100 dark:bg-field-900 text-field-800 dark:text-straw-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{doc}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Where to Apply, Official Source & Checklist CTA */}
        <div className="md:col-span-4 space-y-6">
          {/* Where to apply card */}
          <div className="p-6 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-ink dark:text-paper-100 flex items-center gap-2">
              <Building className="w-5 h-5 text-field-800 dark:text-straw-400" />
              <span>{t('whereToApply')}</span>
            </h3>

            {/* Offline Office */}
            <div className="space-y-1 text-xs">
              <span className="font-bold text-ink-muted dark:text-stone-400 uppercase tracking-wider block">
                {t('offlineLabel')}
              </span>
              <p className="text-ink dark:text-stone-200 font-medium leading-relaxed">
                {scheme.whereToApply.offlineOffice}
              </p>
            </div>

            {/* Online Portal */}
            <div className="space-y-1 text-xs pt-3 border-t border-paper-200 dark:border-stone-800">
              <span className="font-bold text-ink-muted dark:text-stone-400 uppercase tracking-wider block">
                {t('portalLabel')}
              </span>
              <a
                href={scheme.whereToApply.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-field-800 dark:text-straw-400 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>{scheme.whereToApply.portalName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Helpline */}
            {scheme.whereToApply.helpline && (
              <div className="space-y-1 text-xs pt-3 border-t border-paper-200 dark:border-stone-800">
                <span className="font-bold text-ink-muted dark:text-stone-400 uppercase tracking-wider block">
                  {t('helplineLabel')}
                </span>
                <div className="flex items-center gap-1.5 text-ink dark:text-stone-200 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-field-800 dark:text-straw-400" />
                  <span>{scheme.whereToApply.helpline}</span>
                </div>
              </div>
            )}
          </div>

          {/* Document Checklist CTA Card */}
          <div className="p-6 rounded-2xl border border-field-700 bg-field-800 dark:bg-field-950 text-paper-50 shadow-md space-y-3">
            <FileCheck className="w-8 h-8 text-straw-400" />
            <h3 className="font-serif font-bold text-lg text-paper-50">
              Check Your Paperwork
            </h3>
            <p className="text-xs text-paper-200 leading-relaxed">
              Use our private, browser-only traffic light tool to verify your Aadhaar name spelling, RTC hissa, and bank seeding before visiting the office.
            </p>
            <div className="pt-2">
              <Link
                href="/checklist"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-straw-400 hover:bg-straw-300 text-field-950 font-bold text-xs shadow-sm transition-colors"
              >
                <span>Open Document Checklist</span>
                <ChevronRight className="w-3.5 h-3.5 text-field-950" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
