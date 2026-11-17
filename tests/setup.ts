import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Web Speech API in test environment
Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn().mockReturnValue([]),
    speaking: false,
    paused: false,
    pending: false,
  },
  writable: true,
});

class MockSpeechSynthesisUtterance {
  text: string;
  lang = '';
  rate = 1;
  pitch = 1;
  voice = null;
  onstart: (() => void) | null = null;
  onend: (() => void) | null = null;
  onerror: ((e: any) => void) | null = null;

  constructor(text: string) {
    this.text = text;
  }
}

(window as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
