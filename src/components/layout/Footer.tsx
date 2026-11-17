import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Shield, ExternalLink, Heart, Sprout } from 'lucide-react';

export function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="w-full border-t border-paper-300 dark:border-stone-800 bg-paper-200/50 dark:bg-stone-950 mt-20 transition-colors">
      {/* Prominent Eligibility & Safety Notice Banner */}
      <div className="bg-straw-100 dark:bg-stone-900 border-b border-straw-300 dark:border-stone-800 px-4 py-3.5">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <Shield className="w-5 h-5 text-field-800 dark:text-straw-400 shrink-0 mt-0.5" />
          <p className="text-sm text-ink-muted dark:text-stone-300 leading-relaxed">
            <strong className="text-ink dark:text-paper-50 font-semibold">Important Notice: </strong>
            {t('eligibilityDisclaimer')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Project Identity */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded bg-field-800 text-straw-400 flex items-center justify-center font-bold">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl text-field-900 dark:text-paper-50">
                Scheme Access Kit
              </span>
            </div>
            <p className="text-sm text-ink-muted dark:text-stone-400 max-w-md leading-relaxed mb-4">
              A student design thinking initiative created to remove information opacity and paperwork anxiety for small and marginal farmers across Karnataka — from Ramanagara ragi fields to rainfed dryland clusters.
            </p>
            <div className="inline-block p-2.5 rounded-lg bg-paper-100 dark:bg-stone-900 border border-paper-300 dark:border-stone-800 text-xs text-ink-muted dark:text-stone-400">
              <strong className="text-field-800 dark:text-emerald-400 font-semibold block mb-0.5">
                Zero Personal Data Architecture
              </strong>
              No Aadhaar numbers, bank account numbers, or land survey numbers are ever requested or stored.
            </div>
          </div>

          {/* Col 2: Navigation Shortcuts */}
          <div>
            <h3 className="font-serif font-bold text-base text-ink dark:text-paper-100 mb-3">
              Application Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/finder" className="text-ink-muted dark:text-stone-400 hover:text-field-800 dark:hover:text-straw-400 transition-colors">
                  {t('nav.finder')}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="text-ink-muted dark:text-stone-400 hover:text-field-800 dark:hover:text-straw-400 transition-colors">
                  {t('nav.schemes')}
                </Link>
              </li>
              <li>
                <Link href="/checklist" className="text-ink-muted dark:text-stone-400 hover:text-field-800 dark:hover:text-straw-400 transition-colors">
                  {t('nav.checklist')}
                </Link>
              </li>
              <li>
                <Link href="/offices" className="text-ink-muted dark:text-stone-400 hover:text-field-800 dark:hover:text-straw-400 transition-colors">
                  {t('nav.offices')}
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-ink-muted dark:text-stone-400 hover:text-field-800 dark:hover:text-straw-400 transition-colors">
                  {t('nav.glossary')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ink-muted dark:text-stone-400 hover:text-field-800 dark:hover:text-straw-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Primary Government Portals */}
          <div>
            <h3 className="font-serif font-bold text-base text-ink dark:text-paper-100 mb-3">
              Official Government Portals
            </h3>
            <ul className="space-y-2 text-sm text-ink-muted dark:text-stone-400">
              <li>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-field-800 dark:hover:text-straw-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>PM-KISAN Portal</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://fruits.karnataka.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-field-800 dark:hover:text-straw-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Karnataka FRUITS Portal</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://raitamitra.karnataka.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-field-800 dark:hover:text-straw-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Raita Mitra Karnataka</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://landrecords.karnataka.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-field-800 dark:hover:text-straw-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Bhoomi RTC Karnataka</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmfby.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-field-800 dark:hover:text-straw-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>PM Fasal Bima Yojana</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: University Attribution */}
        <div className="border-t border-paper-300 dark:border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted dark:text-stone-400">
          <p>
            Scheme Access Kit · Group 5, Design Thinking · JAIN (Deemed-to-be University).
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:underline">
              Methodology & Team
            </Link>
            <Link href="/feedback" className="hover:underline">
              Report Discrepancy
            </Link>
            <span className="text-stone-400">|</span>
            <span>All Indic Scripts Handled with Noto Sans</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
