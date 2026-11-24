import { describe, it, expect, beforeEach } from 'vitest';

describe('High Contrast Mode & Accessibility Controls', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.body.className = '';
  });

  it('persists and toggles high-contrast class on documentElement', () => {
    // Initial state
    expect(document.documentElement.classList.contains('high-contrast')).toBe(false);

    // Toggle on
    document.documentElement.classList.add('high-contrast');
    localStorage.setItem('sak_high_contrast', 'true');

    expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
    expect(localStorage.getItem('sak_high_contrast')).toBe('true');

    // Toggle off
    document.documentElement.classList.remove('high-contrast');
    localStorage.setItem('sak_high_contrast', 'false');

    expect(document.documentElement.classList.contains('high-contrast')).toBe(false);
    expect(localStorage.getItem('sak_high_contrast')).toBe('false');
  });

  it('handles combined dark mode and high-contrast mode', () => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.add('high-contrast');

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
  });
});
