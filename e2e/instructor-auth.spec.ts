import { test, expect } from '@playwright/test';
import { waitForPageReady } from './helpers';

test.describe('Instructor Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('mv-affiliate');
      localStorage.removeItem('mv-instructors');
      localStorage.removeItem('mv-commissions');
    });
    await page.reload();
    await waitForPageReady(page);
  });

  // INSTRUCTOR REGISTRATION
  test('instructor register page renders all fields', async ({ page }) => {
    await page.goto('instructor/register');
    await waitForPageReady(page);

    await expect(page.getByText('INSTRUCTOR REGISTRATION')).toBeVisible();
    // Use locator for inputs by label text or placeholder
    await expect(page.getByPlaceholder('Your full name')).toBeVisible();
    await expect(page.getByPlaceholder('sample@email.com')).toBeVisible();
  });

  test('instructor register validates required fields', async ({ page }) => {
    await page.goto('instructor/register');
    await waitForPageReady(page);

    await page.getByRole('button', { name: /register now/i }).click();
    await page.waitForTimeout(300);

    const error = page.locator('.text-red-400');
    await expect(error).toBeVisible();
  });

  test('instructor register validates password match', async ({ page }) => {
    await page.goto('instructor/register');
    await waitForPageReady(page);

    await page.getByPlaceholder('Your full name').fill('Test Instructor');
    await page.getByPlaceholder('sample@email.com').fill('inst@example.com');
    // Find the phone input by placeholder
    const phoneInput = page.getByPlaceholder('+1 234 567 8900');
    await phoneInput.fill('+1234567890');
    // Fill password fields
    await page.getByPlaceholder('Minimum 6 characters').fill('pass123456');
    await page.getByPlaceholder('Re-enter your password').fill('different');

    await page.getByRole('button', { name: /register now/i }).click();
    await page.waitForTimeout(300);

    const error = page.locator('.text-red-400');
    await expect(error).toBeVisible();
  });

  test('successful instructor registration redirects to dashboard', async ({ page }) => {
    await page.goto('instructor/register');
    await waitForPageReady(page);

    await page.getByPlaceholder('Your full name').fill('Test Instructor');
    await page.getByPlaceholder('sample@email.com').fill('newinst@example.com');
    const phoneInput = page.getByPlaceholder('+1 234 567 8900');
    await phoneInput.fill('+1234567890');
    await page.getByPlaceholder('Minimum 6 characters').fill('instpass123');
    await page.getByPlaceholder('Re-enter your password').fill('instpass123');

    await page.getByRole('button', { name: /register now/i }).click();

    // Should redirect to instructor dashboard
    await page.waitForURL('**/instructor/dashboard', { timeout: 10000 });
    await expect(page.getByText('Test Instructor')).toBeVisible();
  });

  // INSTRUCTOR LOGIN
  test('instructor login page renders', async ({ page }) => {
    await page.goto('instructor/login');
    await waitForPageReady(page);

    await expect(page.getByText('INSTRUCTOR LOGIN')).toBeVisible();
  });

  test('instructor login rejects invalid credentials', async ({ page }) => {
    await page.goto('instructor/login');
    await waitForPageReady(page);

    await page.getByPlaceholder('sample@email.com').fill('wrong@example.com');
    await page.getByPlaceholder('Minimum 6 characters').fill('wrongpass');

    await page.getByRole('button', { name: /login now/i }).click();
    await page.waitForTimeout(300);

    const error = page.locator('.text-red-400');
    await expect(error).toBeVisible();
  });

  test('full instructor register then login flow', async ({ page }) => {
    // Register
    await page.goto('instructor/register');
    await waitForPageReady(page);
    await page.getByPlaceholder('Your full name').fill('Flow Instructor');
    await page.getByPlaceholder('sample@email.com').fill('flow.inst@example.com');
    await page.getByPlaceholder('+1 234 567 8900').fill('+1234567890');
    await page.getByPlaceholder('Minimum 6 characters').fill('flowpass123');
    await page.getByPlaceholder('Re-enter your password').fill('flowpass123');
    await page.getByRole('button', { name: /register now/i }).click();
    await page.waitForURL('**/instructor/dashboard', { timeout: 10000 });

    // Logout (if there's a logout button)
    const logoutBtn = page.getByRole('button', { name: /logout/i });
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      await page.waitForTimeout(500);
    }

    // Login
    await page.goto('instructor/login');
    await waitForPageReady(page);
    await page.getByPlaceholder('sample@email.com').fill('flow.inst@example.com');
    await page.getByPlaceholder('Minimum 6 characters').fill('flowpass123');
    await page.getByRole('button', { name: /login now/i }).click();
    await page.waitForURL('**/instructor/dashboard', { timeout: 10000 });
    await expect(page.getByText('Flow Instructor')).toBeVisible();
  });

  // INSTRUCTOR DASHBOARD
  test('instructor dashboard shows referral code after registration', async ({ page }) => {
    // Register first
    await page.goto('instructor/register');
    await waitForPageReady(page);
    await page.getByPlaceholder('Your full name').fill('Dashboard Test');
    await page.getByPlaceholder('sample@email.com').fill('dash@example.com');
    await page.getByPlaceholder('+1 234 567 8900').fill('+1234567890');
    await page.getByPlaceholder('Minimum 6 characters').fill('dashpass123');
    await page.getByPlaceholder('Re-enter your password').fill('dashpass123');
    await page.getByRole('button', { name: /register now/i }).click();
    await page.waitForURL('**/instructor/dashboard', { timeout: 10000 });

    // Should show referral code (INS-XXXXXXXX format)
    await expect(page.getByText(/INS-[A-Z0-9]{8}/)).toBeVisible();
    // Should show copy button
    await expect(page.getByText(/copy/i)).toBeVisible();
  });
});
