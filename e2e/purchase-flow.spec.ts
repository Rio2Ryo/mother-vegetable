import { test, expect } from '@playwright/test';
import { waitForPageReady } from './helpers';

test.describe('Full Purchase Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('mv-cart');
      localStorage.removeItem('mv-orders');
    });
    await page.reload();
    await waitForPageReady(page);
  });

  test('complete purchase: browse -> add to cart -> checkout -> confirmation', async ({ page }) => {
    // Step 1: Browse to a product page
    await page.goto('product/achieve');
    await waitForPageReady(page);
    await expect(page.locator('.product-name', { hasText: 'Achieve' })).toBeVisible();

    // Step 2: Add to cart
    await page.locator('.action-btn', { hasText: 'Add to Cart' }).click();
    await page.waitForTimeout(500);

    // Verify item is in cart panel
    await expect(page.getByText('My Cart (1)')).toBeVisible();

    // Step 3: Navigate to checkout
    const checkoutBtn = page.locator('.fixed button', { hasText: 'CHECKOUT' });
    await checkoutBtn.click();
    await page.waitForURL('**/checkout');
    await waitForPageReady(page);

    // Step 4: Fill shipping form
    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('Buyer');
    await page.getByPlaceholder('Email').fill('buyer@example.com');
    await page.getByPlaceholder('Phone').fill('+1234567890');
    await page.getByPlaceholder('Street Address').fill('123 Test Street');
    await page.getByPlaceholder('City').fill('Tokyo');
    await page.getByPlaceholder('State / Province').fill('Tokyo');
    await page.getByPlaceholder('ZIP / Postal Code').fill('100-0001');
    await page.getByPlaceholder('Country').fill('Japan');

    // Step 5: Verify order summary shows product
    await expect(page.getByText('Order Summary')).toBeVisible();
    const orderSummary = page.locator('.bg-gray-900');
    await expect(orderSummary.getByText('Achieve')).toBeVisible();

    // Step 6: Place order
    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.waitForTimeout(2000);

    // Step 7: Verify confirmation
    await expect(page.getByText('Thank you')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Order ID:')).toBeVisible();

    // Step 8: Verify order stored in localStorage
    const orders = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('mv-orders') || '[]');
    });
    expect(orders.length).toBeGreaterThan(0);
    expect(orders[0].shipping.firstName).toBe('Test');

    // Step 9: Continue shopping goes back to homepage
    await page.getByText('Continue Shopping').click();
    await page.waitForURL('**/en');
  });

  test('purchase multiple products', async ({ page }) => {
    // Add first product
    await page.goto('product/achieve');
    await waitForPageReady(page);
    await page.locator('.action-btn', { hasText: 'Add to Cart' }).click();
    await page.waitForTimeout(500);

    // Close cart (force click since header z-index overlaps the cart panel close button)
    const closeBtn = page.locator('button', { hasText: '\u2715' });
    await closeBtn.click({ force: true });
    await page.waitForTimeout(300);

    // Add second product
    await page.goto('product/confidence');
    await waitForPageReady(page);
    await page.locator('.action-btn', { hasText: 'Add to Cart' }).click();
    await page.waitForTimeout(500);

    // Should show 2 items
    await expect(page.getByText('My Cart (2)')).toBeVisible();

    // Go to checkout
    const checkoutBtn = page.locator('.fixed button', { hasText: 'CHECKOUT' });
    await checkoutBtn.click();
    await page.waitForURL('**/checkout');
    await waitForPageReady(page);

    // Both products should be in order summary
    const orderSummary = page.locator('.bg-gray-900');
    await expect(orderSummary.getByText('Achieve')).toBeVisible();
    await expect(orderSummary.getByText('Confidence')).toBeVisible();

    // Fill form and submit
    await page.getByPlaceholder('First Name').fill('Multi');
    await page.getByPlaceholder('Last Name').fill('Buyer');
    await page.getByPlaceholder('Email').fill('multi@example.com');
    await page.getByPlaceholder('Phone').fill('+1234567890');
    await page.getByPlaceholder('Street Address').fill('456 Multi St');
    await page.getByPlaceholder('City').fill('Osaka');
    await page.getByPlaceholder('Country').fill('Japan');

    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Thank you')).toBeVisible({ timeout: 10000 });
  });

  test('buy now button goes directly to checkout', async ({ page }) => {
    await page.goto('product/forever');
    await waitForPageReady(page);

    // Click "Buy Now / Proceed to Checkout" button
    await page.locator('.action-btn', { hasText: /buy now/i }).click();
    await page.waitForURL('**/checkout', { timeout: 10000 });
    await waitForPageReady(page);

    // Should be on checkout with the heading visible
    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
  });

  test('checkout form validation prevents empty submission', async ({ page }) => {
    // Add item to cart first
    await page.goto('product/achieve');
    await waitForPageReady(page);
    await page.locator('.action-btn', { hasText: 'Add to Cart' }).click();
    await page.waitForTimeout(500);

    // Navigate to checkout
    await page.goto('checkout');
    await waitForPageReady(page);

    // Try to submit empty
    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.waitForTimeout(300);

    // Should show validation error
    const error = page.locator('.text-red-400');
    await expect(error).toBeVisible();
  });

  test('checkout continuous typing works in all fields', async ({ page }) => {
    // Add item
    await page.goto('product/achieve');
    await waitForPageReady(page);
    await page.locator('.action-btn', { hasText: 'Add to Cart' }).click();
    await page.waitForTimeout(500);

    await page.goto('checkout');
    await waitForPageReady(page);

    // Type character by character to verify no focus loss
    const firstName = page.getByPlaceholder('First Name');
    await firstName.click();
    await firstName.type('Alexander', { delay: 50 });
    await expect(firstName).toHaveValue('Alexander');

    const email = page.getByPlaceholder('Email');
    await email.click();
    await email.type('alex@test.com', { delay: 30 });
    await expect(email).toHaveValue('alex@test.com');

    const address = page.getByPlaceholder('Street Address');
    await address.click();
    await address.type('123 Main Street Apt 4B', { delay: 30 });
    await expect(address).toHaveValue('123 Main Street Apt 4B');
  });
});
