import React from 'react';
import { ShieldCheck, ExternalLink, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface VerifiedBadgeProps {
  verifiedBy: string;
  verifiedOn: string;
  sourceUrl: string;
  isMachineTranslated?: boolean;
  isHypothesis?: boolean;
  compact?: boolean;
  className?: string;
}

export function VerifiedBadge({
  verifiedBy,
  verifiedOn,
  sourceUrl,
  isMachineTranslated = false,
  isHypothesis = false,
  compact = false,
  className = '',
}: VerifiedBadgeProps) {
  const t = useTranslations('common');

  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs ${className}`}>
      {/* Official Verification Tag */}
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-field-50 border border-field-200 text-field-900 dark:bg-field-950 dark:border-field-700 dark:text-emerald-200 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-field-700 dark:text-emerald-400" />
        <span>
          {t('verifiedByLabel')}: <strong className="font-semibold">{verifiedBy}</strong>
        </span>
        <span className="text-stone-400 dark:text-stone-500">·</span>
        <span>{verifiedOn}</span>
      </span>

      {/* Official Primary Source External Link */}
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-paper-100 hover:bg-paper-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-ink-muted dark:text-stone-300 transition-colors border border-paper-300 dark:border-stone-700"
          title={t('sourceUrlLabel')}
        >
          <ExternalLink className="w-3 h-3 text-field-800 dark:text-straw-400" />
          <span>{t('sourceUrlLabel')}</span>
        </a>
      )}

      {/* Machine translation badge */}
      {isMachineTranslated && (
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200"
          title="Content was translated and is undergoing review by field agricultural experts."
        >
          <AlertCircle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          <span>{t('machineTranslatedBadge')}</span>
        </span>
      )}

      {/* Edge-case hypothesis badge */}
      {isHypothesis && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-orange-50 dark:bg-orange-950 border border-orange-300 dark:border-orange-700 text-orange-900 dark:text-orange-200 font-medium">
          <span>Hypothesis (Confirm with RSK)</span>
        </span>
      )}
    </div>
  );
}
