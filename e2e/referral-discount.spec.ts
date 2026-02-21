import { test, expect } from '@playwright/test';
import { waitForPageReady, addProductToCart } from './helpers';

/**
 * Referral Discount Tests
 *
 * When a user arrives via a referral link (e.g. ?ref=INS-XXXXXXXX),
 * the product price should be discounted to $33 USD.
 * The referral code should persist through navigation.
 */

test.describe('Referral Discount System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('mv-cart');
      localStorage.removeItem('mv-referral');
      // Clear referral cookie
      document.cookie = 'mv-referral=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    });
    await page.reload();
    await waitForPageReady(page);
  });

  test('referral code is stored when arriving via referral link', async ({ page }) => {
    // Navigate with referral code
    await page.goto('http://localhost:3000/en/?ref=INS-TESTCODE');
    await waitForPageReady(page);

    // Wait for useEffect in ReferralTracker to fire
    await page.waitForTimeout(2000);

    // Verify referral code is stored in localStorage (key is 'mv-referral')
    const storedCode = await page.evaluate(() => {
      return localStorage.getItem('mv-referral');
    });
    expect(storedCode).toBe('INS-TESTCODE');
  });

  test('referral code persists through page navigation', async ({ page }) => {
    // Arrive via referral link
    await page.goto('http://localhost:3000/en/?ref=INS-PERSIST');
    await waitForPageReady(page);
    await page.waitForTimeout(2000);

    // Navigate to another page
    await page.goto('product/achieve');
    await waitForPageReady(page);

    // Code should still be there (key is 'mv-referral')
    const storedCode = await page.evaluate(() => {
      return localStorage.getItem('mv-referral');
    });
    expect(storedCode).toBe('INS-PERSIST');
  });

  test('product page shows discounted price ($33) when referral code exists', async ({ page }) => {
    // Set referral code first
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('mv-referral-code', 'INS-DISCOUNT');
      document.cookie = 'mv-referral=INS-DISCOUNT;path=/;max-age=2592000';
    });

    // Go to product page
    await page.goto('product/achieve');
    await waitForPageReady(page);

    // Should see the discounted price
    const priceText = await page.locator('.product-price').textContent();
    expect(priceText).toContain('33');
  });

  test('product page shows original price without referral code', async ({ page }) => {
    // Ensure no referral code
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('mv-referral');
      document.cookie = 'mv-referral=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    });

    await page.goto('product/achieve');
    await waitForPageReady(page);

    // Price should be the original (36.70)
    const priceText = await page.locator('.product-price').textContent();
    expect(priceText).toContain('36');
  });

  test('discounted price carries through to cart', async ({ page }) => {
    // Set referral code
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('mv-referral-code', 'INS-CART');
      document.cookie = 'mv-referral=INS-CART;path=/;max-age=2592000';
    });

    // Add product to cart
    await page.goto('product/achieve');
    await waitForPageReady(page);
    await page.locator('.action-btn', { hasText: 'Add to Cart' }).click();
    await page.waitForTimeout(500);

    // Check cart subtotal reflects discounted price
    const subtotalText = await page.locator('.fixed .text-xl.font-bold.text-\\[\\#25C760\\]').textContent();
    expect(subtotalText).toBeTruthy();
    const amount = parseFloat(subtotalText!.replace(/[^0-9.]/g, ''));
    // Should be $33 (discounted), not $36.70 (original)
    expect(amount).toBe(33);
  });
});
