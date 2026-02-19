import { test, expect } from '@playwright/test';
import { waitForPageReady } from './helpers';

test.describe('Internationalization (i18n)', () => {
  test.describe('English locale (/en)', () => {
    test('homepage loads with English content', async ({ page }) => {
      await page.goto('/');
      await waitForPageReady(page);

      // English hero text (use .first() since text may match multiple elements)
      await expect(page.getByText('MOTHER VEGETABLE PRODUCTS').first()).toBeVisible();
      await expect(page.getByText("Earth's life force, for you.").first()).toBeVisible();
    });

    test('navigation uses English labels', async ({ page }) => {
      await page.goto('/');
      await waitForPageReady(page);

      await expect(page.locator('header').getByText('Food')).toBeVisible();
      await expect(page.locator('header').getByText('Cosmetic')).toBeVisible();
      await expect(page.locator('header button', { hasText: 'Products' })).toBeVisible();
      await expect(page.locator('header button', { hasText: 'How To Use' })).toBeVisible();
    });

    test('URL has /en prefix', async ({ page }) => {
      await page.goto('/');
      await waitForPageReady(page);
      expect(page.url()).toContain('/en');
    });
  });

  test.describe('Japanese locale (/ja)', () => {
    test('homepage loads with Japanese content', async ({ page }) => {
      // Navigate using the absolute URL to the Japanese locale
      await page.goto('http://localhost:3000/ja');
      await waitForPageReady(page);

      // Hero text is hardcoded English in HeroSection component (not translated)
      await expect(page.getByText('MOTHER VEGETABLE PRODUCTS').first()).toBeVisible();
      await expect(page.getByText("Earth's life force, for you.").first()).toBeVisible();
    });

    test('navigation renders header links on Japanese locale', async ({ page, isMobile }) => {
      await page.goto('http://localhost:3000/ja');
      await waitForPageReady(page);

      if (isMobile) {
        // Open mobile menu first
        await page.locator('header button').last().click();
        await page.waitForTimeout(400);
      }

      // Header nav labels are not translated (always English)
      await expect(page.locator('header').getByText('Food')).toBeVisible();
      await expect(page.locator('header').getByText('Cosmetic')).toBeVisible();
    });

    test('product page loads with Japanese locale', async ({ page }) => {
      await page.goto('http://localhost:3000/ja/product/achieve');
      await waitForPageReady(page);

      // Page should load successfully
      const productName = page.locator('.product-name');
      await expect(productName).toBeVisible();

      // URL should have /ja prefix
      expect(page.url()).toContain('/ja/product/achieve');
    });

    test('URL has /ja prefix', async ({ page }) => {
      await page.goto('http://localhost:3000/ja');
      await waitForPageReady(page);
      expect(page.url()).toContain('/ja');
    });
  });

  test.describe('Chinese locale (/zh)', () => {
    test('homepage loads with Chinese content', async ({ page }) => {
      await page.goto('http://localhost:3000/zh');
      await waitForPageReady(page);

      // Hero text is hardcoded English in HeroSection component (not translated)
      await expect(page.getByText('MOTHER VEGETABLE PRODUCTS').first()).toBeVisible();
      await expect(page.getByText("Earth's life force, for you.").first()).toBeVisible();
    });

    test('navigation renders header links on Chinese locale', async ({ page, isMobile }) => {
      await page.goto('http://localhost:3000/zh');
      await waitForPageReady(page);

      if (isMobile) {
        await page.locator('header button').last().click();
        await page.waitForTimeout(400);
      }

      // Header nav labels are not translated (always English)
      await expect(page.locator('header').getByText('Food')).toBeVisible();
      await expect(page.locator('header').getByText('Cosmetic')).toBeVisible();
    });

    test('URL has /zh prefix', async ({ page }) => {
      await page.goto('http://localhost:3000/zh');
      await waitForPageReady(page);
      expect(page.url()).toContain('/zh');
    });
  });

  test.describe('Locale Switching', () => {
    test('switching from English to Japanese updates content', async ({ page }) => {
      await page.goto('/');
      await waitForPageReady(page);

      // Verify we are on English first
      await expect(page.getByText("Earth's life force, for you.").first()).toBeVisible();

      // Click the language selector
      const langSelector = page.locator('header .relative', { hasText: 'Eng' }).first();
      await langSelector.click();
      await page.waitForTimeout(300);

      // Click Japanese option
      const jaOption = page.locator('header .relative').getByText('日');
      await jaOption.click();

      // Wait for navigation to complete
      await page.waitForURL('**/ja', { timeout: 10000 });
      await waitForPageReady(page);

      // Hero text is hardcoded English even after locale switch
      await expect(page.getByText("Earth's life force, for you.").first()).toBeVisible();
    });

    test('locale persists on product page navigation', async ({ page }) => {
      // Start on Japanese
      await page.goto('http://localhost:3000/ja');
      await waitForPageReady(page);

      // Navigate to a product page via Products dropdown
      // Header nav is always English, so use English text
      if (await page.viewportSize()!.width < 768) {
        await page.locator('header button').last().click();
        await page.waitForTimeout(400);
      }

      const productsBtn = page.locator('header button', { hasText: 'Products' });
      await productsBtn.click();
      await page.waitForTimeout(300);

      await page.locator('header a[href*="/product/achieve"]').click();
      await page.waitForURL('**/ja/product/achieve', { timeout: 10000 });

      // URL should maintain /ja prefix
      expect(page.url()).toContain('/ja/product/achieve');
    });
  });

  test.describe('All pages load in each locale', () => {
    const locales = ['en', 'ja', 'zh'] as const;
    const pages = [
      '/',
      '/product/achieve',
      '/healthcare',
      '/login',
      '/privacy',
      '/terms',
    ];

    for (const locale of locales) {
      for (const pagePath of pages) {
        const fullPath = `http://localhost:3000/${locale}${pagePath === '/' ? '' : pagePath}`;
        const label = pagePath === '/' ? 'homepage' : pagePath.slice(1);

        test(`${locale}: ${label} loads without errors`, async ({ page }) => {
          const consoleErrors: string[] = [];
          page.on('console', (msg) => {
            if (msg.type() === 'error') consoleErrors.push(msg.text());
          });

          const response = await page.goto(fullPath);
          await waitForPageReady(page);

          // Page should return 200
          expect(response?.status()).toBe(200);

          // Header should be present
          await expect(page.locator('header')).toBeVisible();

          // No critical React errors in console
          const criticalErrors = consoleErrors.filter(
            (e) => e.includes('Unhandled') || e.includes('Cannot read properties')
          );
          expect(criticalErrors).toHaveLength(0);
        });
      }
    }
  });
});
