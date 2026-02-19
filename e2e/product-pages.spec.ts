import { test, expect } from '@playwright/test';
import { waitForPageReady, scrollFullPage } from './helpers';

const products = ['achieve', 'confidence', 'forever'] as const;

test.describe('Product Pages', () => {
  for (const product of products) {
    test.describe(product, () => {
      test.beforeEach(async ({ page }) => {
        // Clean cart state
        await page.goto('/');
        await page.evaluate(() => localStorage.removeItem('mv-cart'));
        await page.goto(`/product/${product}`);
        await waitForPageReady(page);
      });

      test('renders product name and price', async ({ page }) => {
        const productName = page.locator('.product-name');
        await expect(productName).toBeVisible();
        const nameText = await productName.textContent();
        expect(nameText!.toLowerCase()).toContain(product);

        const productPrice = page.locator('.product-price');
        await expect(productPrice).toBeVisible();
        const priceText = await productPrice.textContent();
        // Price should contain a currency symbol or amount
        expect(priceText).toMatch(/\$|USD|¥|EUR|\d+/);
      });

      test('renders product gallery with videos', async ({ page }) => {
        const mainVideo = page.locator('.main-product-video');
        await expect(mainVideo).toBeVisible();

        const thumbnails = page.locator('.thumbnail-item');
        const count = await thumbnails.count();
        expect(count).toBeGreaterThan(0);
      });

      test('thumbnail click changes main video', async ({ page }) => {
        const thumbnails = page.locator('.thumbnail-item');
        const count = await thumbnails.count();

        if (count > 1) {
          // Click second thumbnail
          await thumbnails.nth(1).click();
          await page.waitForTimeout(300);

          // Second thumbnail should now be active
          await expect(thumbnails.nth(1)).toHaveClass(/active/);
        }
      });

      test('quantity selector works', async ({ page }) => {
        const quantityInput = page.locator('.quantity-input');
        await expect(quantityInput).toHaveValue('1');

        // Increase quantity
        const plusBtn = page.locator('.quantity-btn').last();
        await plusBtn.click();
        await page.waitForTimeout(200);
        await expect(quantityInput).toHaveValue('2');

        // Decrease quantity
        const minusBtn = page.locator('.quantity-btn').first();
        await minusBtn.click();
        await page.waitForTimeout(200);
        await expect(quantityInput).toHaveValue('1');
      });

      test('quantity does not go below 1', async ({ page }) => {
        const minusBtn = page.locator('.quantity-btn').first();
        await minusBtn.click();
        await page.waitForTimeout(200);

        const quantityInput = page.locator('.quantity-input');
        await expect(quantityInput).toHaveValue('1');
      });

      test('Add to Cart button works', async ({ page }) => {
        const addToCartBtn = page.locator('.action-btn', { hasText: 'Add to Cart' });
        await expect(addToCartBtn).toBeVisible();
        await addToCartBtn.click();

        // Cart panel should open
        await page.waitForTimeout(500);
        await expect(page.getByText('My Cart (1)')).toBeVisible();
      });

      test('Buy Now button navigates to checkout', async ({ page }) => {
        const buyNowBtn = page.locator('.action-btn', { hasText: 'Buy Now' });
        await expect(buyNowBtn).toBeVisible();
        await buyNowBtn.click();

        await page.waitForURL('**/checkout');
      });

      test('Add to Cart respects selected quantity', async ({ page }) => {
        // Set quantity to 3
        const plusBtn = page.locator('.quantity-btn').last();
        await plusBtn.click();
        await plusBtn.click();
        await page.waitForTimeout(200);

        const addToCartBtn = page.locator('.action-btn', { hasText: 'Add to Cart' });
        await addToCartBtn.click();
        await page.waitForTimeout(500);

        // Cart should show the product with quantity reflected in total items
        const badge = page.locator('header button span.absolute');
        await expect(badge).toHaveText('3');
      });

      test('free shipping badge is visible', async ({ page }) => {
        await expect(page.getByText('Free Shipping Worldwide')).toBeVisible();
      });

      test('product detail card renders', async ({ page }) => {
        await scrollFullPage(page);

        const productCard = page.locator('.product-card');
        await expect(productCard).toBeVisible();

        // Benefits should be listed
        const benefits = page.locator('.benefit-item');
        const benefitsCount = await benefits.count();
        expect(benefitsCount).toBeGreaterThan(0);

        // How to use section
        await expect(page.locator('.card-how-to-use h4', { hasText: 'How to use' })).toBeVisible();
      });

      test('trust section renders with partner logos', async ({ page }) => {
        await scrollFullPage(page);

        await expect(page.locator('.trust-title')).toBeVisible();
        const logos = page.locator('.partner-logo');
        const logosCount = await logos.count();
        expect(logosCount).toBeGreaterThan(0);
      });

      test('function section renders', async ({ page }) => {
        await scrollFullPage(page);

        const functionTitle = page.locator('.function-title');
        await expect(functionTitle).toBeVisible();
        const titleText = await functionTitle.textContent();
        expect(titleText).toMatch(/Food Function|Cosmetic Function/);
      });
    });
  }
});
