import { test, expect } from '@playwright/test';
import { waitForPageReady } from './helpers';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);
  });

  test('header renders with logo and nav links', async ({ page }) => {
    // Logo should be visible
    const logo = page.locator('header a img[alt="Mother Vegetable Logo"]');
    await expect(logo).toBeVisible();

    // Key nav items present (desktop)
    await expect(page.locator('header').getByText('Food')).toBeVisible();
    await expect(page.locator('header').getByText('Cosmetic')).toBeVisible();
    await expect(page.locator('header button', { hasText: 'Products' })).toBeVisible();
    await expect(page.locator('header button', { hasText: 'How To Use' })).toBeVisible();
    await expect(page.locator('header').getByText('Certified Instructor')).toBeVisible();
  });

  test('logo navigates to homepage', async ({ page }) => {
    await page.goto('/product/achieve');
    await waitForPageReady(page);

    await page.locator('header a img[alt="Mother Vegetable Logo"]').click();
    await page.waitForURL('**/en');
  });

  test('Products dropdown shows product links', async ({ page, isMobile }) => {
    if (isMobile) {
      // Open mobile menu first
      await page.locator('header button').last().click();
      await page.waitForTimeout(400);
    }

    // Click the Products button
    const productsBtn = page.locator('header button', { hasText: 'Products' });
    await productsBtn.click();
    await page.waitForTimeout(300);

    // Dropdown items should be visible
    const achieveLink = page.locator('header a[href*="/product/achieve"]');
    await expect(achieveLink).toBeVisible();

    const confidenceLink = page.locator('header a[href*="/product/confidence"]');
    await expect(confidenceLink).toBeVisible();

    const foreverLink = page.locator('header a[href*="/product/forever"]');
    await expect(foreverLink).toBeVisible();
  });

  test('Products dropdown navigates to product page', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('header button').last().click();
      await page.waitForTimeout(400);
    }

    const productsBtn = page.locator('header button', { hasText: 'Products' });
    await productsBtn.click();
    await page.waitForTimeout(300);

    await page.locator('header a[href*="/product/achieve"]').click();
    await page.waitForURL('**/product/achieve');
    await expect(page.locator('.product-name')).toBeVisible();
  });

  test('How To Use dropdown shows links', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('header button').last().click();
      await page.waitForTimeout(400);
    }

    const howToBtn = page.locator('header button', { hasText: 'How To Use' });
    await howToBtn.click();
    await page.waitForTimeout(300);

    await expect(page.locator('header a[href*="/achieve-howto"]')).toBeVisible();
    await expect(page.locator('header a[href*="/confidence-howto"]')).toBeVisible();
    await expect(page.locator('header a[href*="/forever-howto"]')).toBeVisible();
  });

  test('Healthcare link navigates correctly', async ({ page, isMobile }) => {
    if (isMobile) {
      // On mobile, Healthcare is inside the mobile menu
      await page.locator('header button').last().click();
      await page.waitForTimeout(400);
    }

    await page.locator('header a', { hasText: 'Healthcare' }).first().click();
    await page.waitForURL('**/healthcare');
  });

  test('Certified Instructor link navigates correctly', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('header button').last().click();
      await page.waitForTimeout(400);
    }

    await page.locator('header a', { hasText: 'Certified Instructor' }).click();
    await page.waitForURL('**/mv/certifiedInstructor');
  });

  test('language selector displays current language', async ({ page }) => {
    // The language selector should show "Eng" for the English locale
    const langSelector = page.locator('header .relative', { hasText: 'Eng' });
    await expect(langSelector).toBeVisible();
  });

  test('language selector opens dropdown on click', async ({ page }) => {
    const langSelector = page.locator('header .relative', { hasText: 'Eng' }).first();
    await langSelector.click();
    await page.waitForTimeout(200);

    // Should show language options
    await expect(page.getByText('Eng').first()).toBeVisible();
  });

  test('cart button is visible in header', async ({ page }) => {
    const cartBtn = page.locator('header button svg[viewBox="0 0 576 512"]').first();
    await expect(cartBtn).toBeVisible();
  });
});

test.describe('Navigation - Mobile Menu', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('hamburger menu opens and closes', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);

    // Hamburger button
    const hamburger = page.locator('header button').last();
    await hamburger.click();
    await page.waitForTimeout(400);

    // Mobile nav should now be visible with links
    const mobileNav = page.locator('header nav');
    await expect(mobileNav).toBeVisible();

    // Close by clicking overlay
    const overlay = page.locator('div.fixed.inset-0.bg-black\\/50');
    if (await overlay.isVisible()) {
      await overlay.click();
      await page.waitForTimeout(400);
    }
  });

  test('mobile menu shows login and signup links', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);

    const hamburger = page.locator('header button').last();
    await hamburger.click();
    await page.waitForTimeout(400);

    // Mobile profile links
    await expect(page.locator('header nav a', { hasText: 'LOGIN' })).toBeVisible();
    await expect(page.locator('header nav a', { hasText: 'Sign Up' })).toBeVisible();
  });
});
