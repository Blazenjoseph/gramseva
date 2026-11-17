import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const feedbackSchema = z.object({
  nameOrRole: z.string().max(100).optional(),
  district: z.string().max(50).optional(),
  category: z.enum(['scheme-rule', 'office-contact', 'translation', 'general']),
  message: z
    .string()
    .min(5, 'Message must be at least 5 characters')
    .max(2000, 'Message cannot exceed 2000 characters')
    .refine(
      (val) => !/\b\d{4}\s?\d{4}\s?\d{4}\b/.test(val),
      'For privacy and safety, do not include 12-digit Aadhaar numbers.'
    )
    .refine(
      (val) => !/\b\d{9,18}\b/.test(val),
      'For privacy and safety, do not include bank account numbers.'
    ),
});

describe('Feedback Validation & Privacy Filter', () => {
  it('accepts legitimate feedback without personal identifiers', () => {
    const valid = {
      nameOrRole: 'Farmer from Magadi',
      district: 'Ramanagara',
      category: 'scheme-rule',
      message: 'The Raitha Siri millet verification date has been extended until next month.',
    };
    const res = feedbackSchema.safeParse(valid);
    expect(res.success).toBe(true);
  });

  it('rejects submissions containing a 12-digit Aadhaar number', () => {
    const invalid = {
      category: 'general',
      message: 'My Aadhaar is 1234 5678 9012 please check status.',
    };
    const res = feedbackSchema.safeParse(invalid);
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.errors[0].message).toContain('Aadhaar');
    }
  });

  it('rejects submissions containing a bank account number', () => {
    const invalid = {
      category: 'scheme-rule',
      message: 'Deposit money into my bank account 501002345678912.',
    };
    const res = feedbackSchema.safeParse(invalid);
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.errors[0].message).toContain('bank account');
    }
  });
});
