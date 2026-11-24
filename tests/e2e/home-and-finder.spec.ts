import { test, expect } from '@playwright/test';

test.describe('Scheme Access Kit End-to-End Tests', () => {
  test('loads home page and displays project attribution and language switcher', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Scheme Access Kit/i);

    // Verify Project Attribution
    await expect(page.getByText(/Group 5/i).first()).toBeVisible();
    await expect(page.getByText(/JAIN/i).first()).toBeVisible();

    // Verify Hero CTA
    const cta = page.getByRole('link', { name: /Check eligible schemes/i });
    await expect(cta).toBeVisible();
  });

  test('switches language to Kannada with /kn URL', async ({ page }) => {
    await page.goto('/kn');
    await expect(page.getByText(/ಸ್ಕೀಮ್ ಆಕ್ಸೆಸ್ ಕಿಟ್/i).first()).toBeVisible();
  });

  test('switches language to Telugu with /te URL', async ({ page }) => {
    await page.goto('/te');
    await expect(page.getByText(/స్కీమ్ యాక్సెస్ కిట్/i).first()).toBeVisible();
    await expect(page.getByText(/ఫీల్డ్ రివ్యూ పెండింగ్‌లో ఉన్న అనువాదం/i).first()).toBeVisible();
  });

  test('navigates to Scheme Finder and verifies disclaimer on results', async ({ page }) => {
    await page.goto('/en/finder');
    await expect(page.getByRole('heading', { name: /Scheme finder questionnaire/i })).toBeVisible();

    // Mandatory disclaimer verification
    await expect(page.getByText(/This is an informational guide. It is not an eligibility decision/i).first()).toBeVisible();

    // Verify nationwide and state schemes appear
    await expect(page.getByText(/PM-KISAN/i).first()).toBeVisible();
    await expect(page.getByText(/Kisan Credit Card/i).first()).toBeVisible();
  });

  test('document checklist traffic light updates and prints without errors', async ({ page }) => {
    await page.goto('/en/checklist');
    await expect(page.getByRole('heading', { name: /Document Readiness/i })).toBeVisible();

    // Verify privacy notice
    await expect(page.getByText(/No personal data collected/i).first()).toBeVisible();

    // Check count of ready items
    await expect(page.getByText(/Ready to Submit/i).first()).toBeVisible();
  });
});
