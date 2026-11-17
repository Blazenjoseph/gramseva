import { Locale } from '@/types';

const LOCALE_SPEECH_MAP: Record<Locale, string> = {
  en: 'en-IN',
  kn: 'kn-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  ml: 'ml-IN',
};

export class SpeechService {
  private static synth: SpeechSynthesis | null = null;
  private static isSpeaking = false;
  private static activeUtterance: SpeechSynthesisUtterance | null = null;

  private static getSynth(): SpeechSynthesis | null {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis;
    }
    return null;
  }

  public static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public static speak(
    text: string,
    locale: Locale,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: string) => void
  ): boolean {
    const synth = this.getSynth();
    if (!synth) {
      if (onError) onError('Web Speech API is not supported in this browser.');
      return false;
    }

    // Cancel any ongoing speech
    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      const targetLang = LOCALE_SPEECH_MAP[locale] || 'en-IN';
      utterance.lang = targetLang;
      utterance.rate = 0.95; // Slightly slower, clearer for rural/elderly farmers
      utterance.pitch = 1.0;

      // Try finding a matching native voice
      const voices = synth.getVoices();
      const matchVoice = voices.find(
        (v) => v.lang.toLowerCase() === targetLang.toLowerCase() || v.lang.startsWith(targetLang.split('-')[0])
      );
      if (matchVoice) {
        utterance.voice = matchVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.activeUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        this.isSpeaking = false;
        this.activeUtterance = null;
        if (onError) onError(e.error || 'Speech playback error');
      };

      this.activeUtterance = utterance;
      synth.speak(utterance);
      return true;
    } catch (err) {
      if (onError) onError((err as Error).message);
      return false;
    }
  }

  public static stop(): void {
    const synth = this.getSynth();
    if (synth) {
      synth.cancel();
      this.isSpeaking = false;
      this.activeUtterance = null;
    }
  }

  public static speaking(): boolean {
    const synth = this.getSynth();
    return synth ? synth.speaking : false;
  }
}
