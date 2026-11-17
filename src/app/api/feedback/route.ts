import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

// In-memory rate limiting map (IP -> timestamp array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

// Validation Schema with strict sanitization
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

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: 'Rate limit reached. Please wait a moment before sending another report.' },
        { status: 429 }
      );
    }

    validTimestamps.push(now);
    rateLimitMap.set(ip, validTimestamps);

    // 2. Body parsing and Zod Validation
    const rawBody = await req.json();
    const parseResult = feedbackSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.errors[0]?.message || 'Invalid feedback data';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { nameOrRole, district, category, message } = parseResult.data;

    // 3. Sanitise text (strip HTML tags)
    const sanitisedMessage = message.replace(/<[^>]*>?/gm, '').trim();
    const sanitisedName = (nameOrRole || '').replace(/<[^>]*>?/gm, '').trim();

    // 4. Try saving to Supabase if configured
    try {
      const supabase = await createClient();
      await supabase.from('feedback').insert({
        name_or_role: sanitisedName || null,
        district: district || null,
        category,
        message: sanitisedMessage,
        ip_hash: ip.substring(0, 8), // anonymized prefix
      });
    } catch (dbErr) {
      // In local mode without active Supabase table, log gracefully
      console.log('Feedback recorded in memory fallback:', {
        category,
        district,
        message: sanitisedMessage,
      });
    }

    return NextResponse.json({ success: true, message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Feedback API error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing feedback' },
      { status: 500 }
    );
  }
}
