'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export function SkipLink() {
  const t = useTranslations('common');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-field-800 focus:text-paper-50 focus:font-semibold focus:shadow-lg focus:rounded focus:outline-none"
    >
      {t('skipToContent')}
    </a>
  );
}
