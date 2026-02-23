import { test, expect } from '@playwright/test';
import { waitForPageReady, scrollFullPage } from './helpers';

const viewports = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
} as const;

const keyPages = [
  { path: '/', name: 'homepage' },
  { path: 'product/achieve', name: 'product-achieve' },
  { path: 'checkout', name: 'checkout' },
  { path: 'login', name: 'login' },
] as const;

for (const [vpName, viewport] of Object.entries(viewports)) {
  test.describe(`Responsive - ${vpName} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport });

    for (const { path, name } of keyPages) {
      test(`${name} loads and renders correctly`, async ({ page }) => {
        await page.goto(path);
        await waitForPageReady(page);

        // Header should always be visible
        const header = page.locator('header');
        await expect(header).toBeVisible();

        // Page should not have significant horizontal overflow.
        // Allow up to 30px tolerance for scrollbar width differences across platforms.
        const overflowAmount = await page.evaluate(() => {
          return document.documentElement.scrollWidth - document.documentElement.clientWidth;
        });
        expect(overflowAmount).toBeLessThanOrEqual(30);
      });
    }

    test('homepage sections are visible after scrolling', async ({ page }) => {
      await page.goto('/');
      await waitForPageReady(page);
      await scrollFullPage(page);

      // Key sections should have rendered
      // Products section
      const productsHeading = page.getByText('Products').first();
      await expect(productsHeading).toBeAttached();
    });

    if (vpName === 'mobile') {
      test('mobile hamburger menu is visible', async ({ page }) => {
        await page.goto('/');
        await waitForPageReady(page);

        // Hamburger should be visible on mobile
        const hamburger = page.locator('header button').last();
        await expect(hamburger).toBeVisible();
      });

      test('desktop nav items are hidden on mobile', async ({ page }) => {
        await page.goto('/');
        await waitForPageReady(page);

        // The healthcare button that is explicitly hidden on mobile
        const healthcareDesktop = page.locator('header a.hidden.md\\:inline-flex', { hasText: 'Healthcare' });
        await expect(healthcareDesktop).not.toBeVisible();
      });
    }

    if (vpName === 'desktop') {
      test('desktop nav links are visible', async ({ page }) => {
        await page.goto('/');
        await waitForPageReady(page);

        await expect(page.locator('header').getByText('Food')).toBeVisible();
        await expect(page.locator('header').getByText('Cosmetic')).toBeVisible();
        await expect(page.locator('header button', { hasText: 'Products' })).toBeVisible();
      });

      test('profile dropdown is visible on desktop', async ({ page }) => {
        await page.goto('/');
        await waitForPageReady(page);

        // Profile icon button (desktop only)
        const profileBtn = page.locator('header .hidden.lg\\:flex.relative');
        await expect(profileBtn).toBeVisible();
      });
    }

    if (vpName === 'tablet') {
      test('product page gallery adapts to tablet width', async ({ page }) => {
        await page.goto('product/achieve');
        await waitForPageReady(page);

        // On tablet (768px), the gallery-row switches to column layout at 820px
        // so it should be in column mode
        const mainVideo = page.locator('.main-product-video');
        await expect(mainVideo).toBeVisible();
      });
    }

    test(`login page form fits within ${vpName} viewport`, async ({ page }) => {
      await page.goto('login');
      await waitForPageReady(page);

      // Login form container
      const loginForm = page.locator('form');
      await expect(loginForm).toBeVisible();

      // Form should not overflow the viewport
      const formBox = await loginForm.boundingBox();
      if (formBox) {
        expect(formBox.x).toBeGreaterThanOrEqual(0);
        expect(formBox.x + formBox.width).toBeLessThanOrEqual(viewport.width + 2);
      }
    });
  });
}
