'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { SpeechService } from '@/lib/speech';
import { Locale } from '@/types';
import { useTranslations } from 'next-intl';

interface SpeechButtonProps {
  text: string;
  locale: Locale;
  className?: string;
  compact?: boolean;
}

export function SpeechButton({ text, locale, className = '', compact = false }: SpeechButtonProps) {
  const t = useTranslations('common');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setIsSupported(SpeechService.isSupported());
    return () => {
      SpeechService.stop();
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSpeaking) {
      SpeechService.stop();
      setIsSpeaking(false);
    } else {
      const started = SpeechService.speak(
        text,
        locale,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        (err) => {
          console.warn('Speech playback message:', err);
          setIsSpeaking(false);
        }
      );
      if (!started) {
        setIsSpeaking(false);
      }
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-field-800 dark:focus:ring-straw-400 rounded-md ${
        isSpeaking
          ? 'bg-straw-400 text-ink dark:bg-straw-500 font-semibold shadow-sm'
          : 'bg-paper-200/80 hover:bg-paper-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-ink dark:text-paper-100'
      } ${compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'} ${className}`}
      aria-label={isSpeaking ? t('stopReadAloud') : t('readAloud')}
      title={isSpeaking ? t('stopReadAloud') : t('readAloud')}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4 animate-pulse text-red-700 dark:text-red-300" />
          <span>{t('stopReadAloud')}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-field-800 dark:text-straw-400" />
          <span>{t('readAloud')}</span>
        </>
      )}
    </button>
  );
}
