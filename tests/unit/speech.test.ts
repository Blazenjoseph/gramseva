import { describe, it, expect, vi } from 'vitest';
import { SpeechService } from '@/lib/speech';

describe('SpeechService (Web Speech API Wrapper)', () => {
  it('detects Web Speech API support in browser environment', () => {
    expect(SpeechService.isSupported()).toBe(true);
  });

  it('triggers speak with correct language tag', () => {
    const onStart = vi.fn();
    const result = SpeechService.speak('ರೈತ ಸಿರಿ ಯೋಜನೆ', 'kn', onStart);
    expect(result).toBe(true);
  });

  it('stops ongoing speech properly', () => {
    SpeechService.stop();
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });
});
