import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FieldIllustration } from '@/components/ui/FieldIllustration';
import { getNewsItems } from '@/lib/data/news';
import { getAllSchemes } from '@/lib/data/schemes';
import { Locale } from '@/types';
import { SpeechButton } from '@/components/ui/SpeechButton';
import { VerifiedBadge } from '@/components/ui/VerifiedBadge';
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Compass,
  FileCheck,
  ShieldCheck,
  Building,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const newsItems = getNewsItems(currentLocale);
  const coreSchemes = getAllSchemes(currentLocale).slice(0, 3);

  const heroReadText = `${t('heroTitle')} ${t('heroSubtitle')}`;

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 bg-gradient-to-b from-paper-100 via-paper-50 to-paper-100 dark:from-stone-900 dark:via-stone-950 dark:to-stone-900 border-b border-paper-300 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Editorial Hero Headline & Promise */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-field-50 dark:bg-stone-800 border border-field-200 dark:border-stone-700 text-xs font-semibold text-field-800 dark:text-straw-400">
                <span className="w-2 h-2 rounded-full bg-field-700 dark:bg-straw-400" />
                <span>Small & Marginal Farmers First · Zero Data Stored</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper-50 leading-[1.18]">
                {t('heroTitle')}
              </h1>

              <p className="text-base sm:text-lg text-ink-muted dark:text-stone-300 leading-relaxed max-w-2xl font-normal">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/finder"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-field-800 hover:bg-field-900 text-paper-50 font-semibold text-base shadow-editorial hover:shadow-hover transition-all focus:outline-none focus:ring-2 focus:ring-field-800 focus:ring-offset-2 dark:bg-field-700 dark:hover:bg-field-600"
                >
                  <span>{t('heroCta')}</span>
                  <ArrowRight className="w-4 h-4 text-straw-400" />
                </Link>

                <Link
                  href="/checklist"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-paper-200 hover:bg-paper-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-ink dark:text-paper-100 font-semibold text-base transition-colors border border-paper-300 dark:border-stone-700"
                >
                  <FileCheck className="w-4 h-4 text-field-800 dark:text-straw-400" />
                  <span>{t('heroSecondary')}</span>
                </Link>

                <SpeechButton text={heroReadText} locale={currentLocale} />
              </div>

              {/* Verified Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-paper-300/80 dark:border-stone-800">
                <div>
                  <div className="font-serif font-bold text-xl sm:text-2xl text-field-900 dark:text-straw-400">
                    {t('stats.schemesCount')}
                  </div>
                  <div className="text-xs text-ink-muted dark:text-stone-400">
                    {t('stats.schemesNote')}
                  </div>
                </div>
                <div>
                  <div className="font-serif font-bold text-xl sm:text-2xl text-field-900 dark:text-straw-400">
                    {t('stats.languageCount')}
                  </div>
                  <div className="text-xs text-ink-muted dark:text-stone-400">
                    {t('stats.languageNote')}
                  </div>
                </div>
                <div>
                  <div className="font-serif font-bold text-xl sm:text-2xl text-field-900 dark:text-straw-400">
                    {t('stats.privacy')}
                  </div>
                  <div className="text-xs text-ink-muted dark:text-stone-400">
                    {t('stats.privacyNote')}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hand-drawn SVG Field-of-Stalks Illustration + Focus Card */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-card relative backdrop-blur-sm">
                <FieldIllustration className="mb-4" />
                
                <div className="border-t border-paper-200 dark:border-stone-800 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-field-800 dark:text-straw-400 uppercase tracking-wider">
                    <span>Target Cultivator Persona</span>
                    <span>Karnataka Focus</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-ink dark:text-paper-100">
                    Marginal Rainfed Cultivator (0.5 Acre Ragi)
                  </h3>
                  <p className="text-xs text-ink-muted dark:text-stone-400 leading-relaxed">
                    Under Karnataka rules, growing minor millets qualifies for ₹10,000/ha under Raitha Siri, ₹6,000 via PM-KISAN, and subsidized rainwater ponds via Krishi Bhagya — provided your Bhoomi Pahani and FRUITS FID are properly prepared.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/schemes/raitha-siri"
                      className="text-xs font-semibold text-field-800 dark:text-straw-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Explore Raitha Siri millet rules</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Four-Step Access Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink dark:text-paper-50">
            {t('fourSteps.title')}
          </h2>
          <p className="text-sm sm:text-base text-ink-muted dark:text-stone-400">
            {t('fourSteps.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1: Explain */}
          <div className="p-6 rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm hover:shadow-card transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-field-100 dark:bg-field-900/60 text-field-800 dark:text-straw-400 flex items-center justify-center font-bold mb-4 font-serif">
              1
            </div>
            <h3 className="font-serif font-bold text-lg text-ink dark:text-paper-100 mb-2">
              {t('fourSteps.step1Title')}
            </h3>
            <p className="text-sm text-ink-muted dark:text-stone-400 leading-relaxed">
              {t('fourSteps.step1Desc')}
            </p>
          </div>

          {/* Step 2: Check */}
          <div className="p-6 rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm hover:shadow-card transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-straw-100 dark:bg-stone-800 text-straw-600 dark:text-straw-400 flex items-center justify-center font-bold mb-4 font-serif">
              2
            </div>
            <h3 className="font-serif font-bold text-lg text-ink dark:text-paper-100 mb-2">
              {t('fourSteps.step2Title')}
            </h3>
            <p className="text-sm text-ink-muted dark:text-stone-400 leading-relaxed">
              {t('fourSteps.step2Desc')}
            </p>
          </div>

          {/* Step 3: Apply */}
          <div className="p-6 rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm hover:shadow-card transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-field-100 dark:bg-field-900/60 text-field-800 dark:text-straw-400 flex items-center justify-center font-bold mb-4 font-serif">
              3
            </div>
            <h3 className="font-serif font-bold text-lg text-ink dark:text-paper-100 mb-2">
              {t('fourSteps.step3Title')}
            </h3>
            <p className="text-sm text-ink-muted dark:text-stone-400 leading-relaxed">
              {t('fourSteps.step3Desc')}
            </p>
          </div>

          {/* Step 4: Follow Up */}
          <div className="p-6 rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm hover:shadow-card transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-straw-100 dark:bg-stone-800 text-straw-600 dark:text-straw-400 flex items-center justify-center font-bold mb-4 font-serif">
              4
            </div>
            <h3 className="font-serif font-bold text-lg text-ink dark:text-paper-100 mb-2">
              {t('fourSteps.step4Title')}
            </h3>
            <p className="text-sm text-ink-muted dark:text-stone-400 leading-relaxed">
              {t('fourSteps.step4Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Verified News & Gazette Updates Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border border-paper-300 dark:border-stone-800 rounded-2xl bg-paper-50 dark:bg-stone-900 p-6 sm:p-10 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-paper-200 dark:border-stone-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-field-800 dark:text-straw-400 uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Audited Benefit Calendar</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink dark:text-paper-50">
                {t('news.title')}
              </h2>
              <p className="text-sm text-ink-muted dark:text-stone-400 mt-1">
                {t('news.subtitle')}
              </p>
            </div>
            <Link
              href="/schemes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-field-800 dark:text-straw-400 hover:underline shrink-0"
            >
              <span>View All Verified Schemes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsItems.map((news) => (
              <article
                key={news.id}
                className="p-5 rounded-xl border border-paper-200 dark:border-stone-800/80 bg-paper-100/60 dark:bg-stone-950/50 flex flex-col justify-between hover:border-paper-400 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-field-100 dark:bg-field-900 text-field-900 dark:text-emerald-300 font-medium">
                      {news.category.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="text-ink-muted dark:text-stone-400">{news.publishedAt}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-ink dark:text-paper-100 leading-snug">
                    {news.title}
                  </h3>

                  <p className="text-sm text-ink-muted dark:text-stone-400 leading-relaxed">
                    {news.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-paper-200 dark:border-stone-800 flex items-center justify-between">
                  <VerifiedBadge
                    verifiedBy={news.verifiedBy}
                    verifiedOn={news.lastVerifiedOn}
                    sourceUrl={news.sourceUrl}
                    compact
                  />
                  <SpeechButton text={`${news.title}. ${news.summary}`} locale={currentLocale} compact />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Core Schemes Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-field-800 dark:text-straw-400 uppercase tracking-wider">
              Primary Programs
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink dark:text-paper-50">
              Core Agricultural Schemes
            </h2>
          </div>
          <Link
            href="/finder"
            className="inline-flex items-center gap-2 text-sm font-semibold text-field-800 dark:text-straw-400 hover:underline"
          >
            <span>Run Scheme Finder Questionnaire</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 p-6 flex flex-col justify-between shadow-card hover:shadow-hover transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider bg-straw-100 dark:bg-stone-800 text-straw-600 dark:text-straw-400 border border-straw-300 dark:border-stone-700">
                    {scheme.state === 'karnataka' ? 'Karnataka State' : 'Central Govt'}
                  </span>
                  <SpeechButton
                    text={`${scheme.title}. ${scheme.whatItGives}`}
                    locale={currentLocale}
                    compact
                  />
                </div>

                <h3 className="font-serif font-bold text-xl text-ink dark:text-paper-100 group-hover:text-field-800 dark:group-hover:text-straw-400 transition-colors">
                  <Link href={`/schemes/${scheme.slug}`}>{scheme.title}</Link>
                </h3>

                <div>
                  <h4 className="text-xs font-bold text-ink-muted dark:text-stone-400 uppercase tracking-wider mb-1">
                    Benefit
                  </h4>
                  <p className="text-sm text-ink dark:text-stone-300 leading-relaxed font-medium">
                    {scheme.whatItGives}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-ink-muted dark:text-stone-400 uppercase tracking-wider mb-1">
                    Who It Is For
                  </h4>
                  <p className="text-xs text-ink-muted dark:text-stone-400 leading-relaxed">
                    {scheme.whoItIsFor}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-paper-200 dark:border-stone-800 space-y-3">
                <VerifiedBadge
                  verifiedBy={scheme.verifiedBy}
                  verifiedOn={scheme.lastVerifiedOn}
                  sourceUrl={scheme.sourceUrl}
                  isMachineTranslated={scheme.isMachineTranslated}
                  compact
                />
                <Link
                  href={`/schemes/${scheme.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-paper-200 hover:bg-paper-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-xs font-semibold text-ink dark:text-paper-100 transition-colors"
                >
                  <span>View Documents & Application Steps</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-field-800 dark:bg-field-950 text-paper-50 p-8 sm:p-12 shadow-xl relative overflow-hidden border border-field-700 dark:border-stone-800">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-straw-400">
              Interactive Guided Tool
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-paper-50 leading-tight">
              Wondering which schemes apply to your 0.5 acre ragi holding?
            </h2>
            <p className="text-paper-200 text-sm sm:text-base leading-relaxed">
              Take 2 minutes to answer 6 cultivation questions. Scheme Access Kit filters schemes, highlights missing documents, and pinpoints where to submit your papers.
            </p>
            <div className="pt-2">
              <Link
                href="/finder"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-straw-400 hover:bg-straw-300 text-field-950 font-bold text-base shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-straw-300"
              >
                <span>Launch Guided Scheme Finder</span>
                <ArrowRight className="w-4 h-4 text-field-950" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
