import { test, expect } from '@playwright/test';
import { waitForPageReady, addProductToCart } from './helpers';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start with an empty cart
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('mv-cart'));
    await page.reload();
    await waitForPageReady(page);
  });

  test('cart opens when clicking cart button in header', async ({ page }) => {
    const cartBtn = page.locator('header button', { has: page.locator('svg[viewBox="0 0 576 512"]') });
    await cartBtn.click();
    await page.waitForTimeout(500);

    // Cart panel should be visible
    await expect(page.getByText('My Cart')).toBeVisible();
    await expect(page.getByText('Your cart is empty')).toBeVisible();
  });

  test('cart shows empty state with continue shopping button', async ({ page }) => {
    const cartBtn = page.locator('header button', { has: page.locator('svg[viewBox="0 0 576 512"]') });
    await cartBtn.click();
    await page.waitForTimeout(500);

    const continueBtn = page.getByText('CONTINUE SHOPPING');
    await expect(continueBtn).toBeVisible();

    // Clicking continue shopping closes the cart
    await continueBtn.click();
    await page.waitForTimeout(500);
    await expect(page.getByText('My Cart')).not.toBeVisible();
  });

  test('add product to cart from product page', async ({ page }) => {
    await addProductToCart(page, 'achieve');

    // Cart panel should open and show the item
    await expect(page.getByText('My Cart (1)')).toBeVisible();
    // Product name should appear in cart
    await expect(page.locator('.text-\\[\\#25C760\\]', { hasText: 'Achieve' }).first()).toBeVisible();
  });

  test('cart badge shows item count in header', async ({ page }) => {
    await addProductToCart(page, 'achieve');

    // Close cart first
    const closeBtn = page.locator('button', { hasText: '\u2715' });
    await closeBtn.click();
    await page.waitForTimeout(500);

    // Check for the badge count on the cart button
    const badge = page.locator('header button span.absolute');
    await expect(badge).toHaveText('1');
  });

  test('increase quantity in cart', async ({ page }) => {
    await addProductToCart(page, 'achieve');

    // Find the quantity increment button (+)
    const plusBtn = page.locator('.fixed button', { hasText: '+' }).first();
    await plusBtn.click();
    await page.waitForTimeout(300);

    // Quantity should now be 2
    const qtyDisplay = page.locator('.fixed .px-3.text-white', { hasText: '2' });
    await expect(qtyDisplay).toBeVisible();
  });

  test('decrease quantity in cart', async ({ page }) => {
    await addProductToCart(page, 'achieve');

    // Increase first to 2
    const plusBtn = page.locator('.fixed button', { hasText: '+' }).first();
    await plusBtn.click();
    await page.waitForTimeout(300);

    // Now decrease back to 1
    const minusBtn = page.locator('.fixed button', { hasText: '-' }).first();
    await minusBtn.click();
    await page.waitForTimeout(300);

    const qtyDisplay = page.locator('.fixed .px-3.text-white', { hasText: '1' });
    await expect(qtyDisplay).toBeVisible();
  });

  test('remove item from cart', async ({ page }) => {
    await addProductToCart(page, 'achieve');

    // Click the delete/trash button
    const deleteBtn = page.locator('.fixed button svg[viewBox="0 0 448 512"]').first();
    await deleteBtn.click();
    await page.waitForTimeout(300);

    // Cart should now be empty
    await expect(page.getByText('Your cart is empty')).toBeVisible();
  });

  test('decreasing quantity to 0 removes item', async ({ page }) => {
    await addProductToCart(page, 'achieve');

    // Click minus to decrease from 1 to 0, which should remove the item
    const minusBtn = page.locator('.fixed button', { hasText: '-' }).first();
    await minusBtn.click();
    await page.waitForTimeout(300);

    await expect(page.getByText('Your cart is empty')).toBeVisible();
  });

  test('add multiple different products', async ({ page }) => {
    await addProductToCart(page, 'achieve');

    // Close cart
    const closeBtn = page.locator('button', { hasText: '\u2715' });
    await closeBtn.click();
    await page.waitForTimeout(300);

    // Add another product
    await addProductToCart(page, 'confidence');

    // Should show 2 items
    await expect(page.getByText('My Cart (2)')).toBeVisible();
  });

  test('cart subtotal updates correctly', async ({ page }) => {
    await addProductToCart(page, 'achieve');

    // Subtotal should be visible
    const subtotalText = page.locator('.fixed', { hasText: 'Subtotal:' });
    await expect(subtotalText).toBeVisible();

    // The subtotal amount should be a number > 0
    const amount = page.locator('.fixed .text-xl.font-bold.text-\\[\\#25C760\\]');
    const text = await amount.textContent();
    expect(text).toBeTruthy();
    const numericValue = parseFloat(text!.replace(/[^0-9.]/g, ''));
    expect(numericValue).toBeGreaterThan(0);
  });

  test('checkout button navigates to checkout page', async ({ page }) => {
    await addProductToCart(page, 'achieve');

    // Click CHECKOUT in the cart panel
    const checkoutBtn = page.locator('.fixed button', { hasText: 'CHECKOUT' });
    await checkoutBtn.click();

    await page.waitForURL('**/checkout');
    await expect(page.getByText('Checkout')).toBeVisible();
  });

  test('cart persists across page navigation', async ({ page }) => {
    await addProductToCart(page, 'achieve');

    // Close the cart
    const closeBtn = page.locator('button', { hasText: '\u2715' });
    await closeBtn.click();
    await page.waitForTimeout(300);

    // Navigate to a different page
    await page.goto('/');
    await waitForPageReady(page);

    // Open cart again
    const cartBtn = page.locator('header button', { has: page.locator('svg[viewBox="0 0 576 512"]') });
    await cartBtn.click();
    await page.waitForTimeout(500);

    // Item should still be there
    await expect(page.getByText('My Cart (1)')).toBeVisible();
  });
});
