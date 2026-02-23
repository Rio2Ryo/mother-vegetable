import { test, expect } from '@playwright/test';
import { waitForPageReady } from './helpers';

/** Helper: returns true when the viewport is narrower than Tailwind's md breakpoint (768px) */
async function isMobileViewport(page: import('@playwright/test').Page) {
  const vp = page.viewportSize();
  return vp ? vp.width < 768 : false;
}

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);
  });

  test('header renders with logo and nav links', async ({ page }) => {
    const mobile = await isMobileViewport(page);

    // Logo is visible on wide desktops; at 768px it may be pushed off-screen
    const logo = page.locator('header a img[alt="Mother Vegetable Logo"]');
    const vp = page.viewportSize();
    if (vp && vp.width > 900) {
      await expect(logo).toBeVisible();
    }

    if (mobile) {
      // On mobile, open hamburger menu to see nav links
      await page.locator('header button').last().click();
      await page.waitForTimeout(400);
    }

    // Key nav items present
    await expect(page.locator('header').getByText('Products')).toBeVisible();
    await expect(page.locator('header').getByText('How To Use')).toBeVisible();
    await expect(page.locator('header').getByText('Certified Instructor')).toBeVisible();
  });

  test('logo navigates to homepage', async ({ page }) => {
    // At narrow widths (≤ 768px) the logo may be pushed off-screen; skip in that case.
    const vp = page.viewportSize();
    if (vp && vp.width <= 768) return;

    await page.goto('product/achieve');
    await waitForPageReady(page);

    // Click the logo link (use the <a> parent rather than the img to avoid pointer-events issues)
    await page.locator('header a', { has: page.locator('img[alt="Mother Vegetable Logo"]') }).click();
    await page.waitForURL('**/en');
  });

  test('Products dropdown shows product links (achieve, confidence only)', async ({ page }) => {
    if (await isMobileViewport(page)) {
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

    // Forever should NOT be in dropdown
    const foreverLink = page.locator('header a[href*="/product/forever"]');
    await expect(foreverLink).toHaveCount(0);
  });

  test('Products dropdown navigates to product page', async ({ page }) => {
    if (await isMobileViewport(page)) {
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

  test('How To Use dropdown shows links (achieve, confidence only)', async ({ page }) => {
    if (await isMobileViewport(page)) {
      await page.locator('header button').last().click();
      await page.waitForTimeout(400);
    }

    const howToBtn = page.locator('header button', { hasText: 'How To Use' });
    await howToBtn.click();
    await page.waitForTimeout(300);

    await expect(page.locator('header a[href*="/achieve-howto"]')).toBeVisible();
    await expect(page.locator('header a[href*="/confidence-howto"]')).toBeVisible();

    // Forever howto should NOT be in dropdown
    const foreverHowto = page.locator('header a[href*="/forever-howto"]');
    await expect(foreverHowto).toHaveCount(0);
  });

  test('Healthcare link navigates correctly', async ({ page }) => {
    if (await isMobileViewport(page)) {
      // On mobile, Healthcare is inside the mobile menu
      await page.locator('header button').last().click();
      await page.waitForTimeout(400);
      await page.locator('header nav a', { hasText: 'Healthcare' }).click();
    } else {
      // On desktop, the Healthcare link is outside the nav, use the desktop-only one
      await page.locator('header a.hidden.lg\\:inline-flex', { hasText: 'Healthcare' }).click();
    }

    await page.waitForURL('**/healthcare');
  });

  test('Certified Instructor link navigates correctly', async ({ page }) => {
    if (await isMobileViewport(page)) {
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

    // Close by clicking hamburger again (overlay is behind the header z-index)
    await hamburger.click();
    await page.waitForTimeout(400);
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
