import { test, expect } from '@playwright/test';
import { waitForPageReady, addProductToCart } from './helpers';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    // Start with clean state
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('mv-cart'));
    await page.reload();
    await waitForPageReady(page);
  });

  test('checkout page shows empty cart message when no items', async ({ page }) => {
    await page.goto('/checkout');
    await waitForPageReady(page);

    await expect(page.getByText('Your cart is empty')).toBeVisible();
    await expect(page.getByText('Browse Products')).toBeVisible();
  });

  test('checkout page renders form when cart has items', async ({ page }) => {
    await addProductToCart(page, 'achieve');

    // Close cart and navigate to checkout
    await page.goto('/checkout');
    await waitForPageReady(page);

    // The shipping form should be visible
    await expect(page.getByText('Shipping Information')).toBeVisible();
    await expect(page.getByText('Order Summary')).toBeVisible();

    // Form fields should be present
    await expect(page.getByPlaceholder('First Name')).toBeVisible();
    await expect(page.getByPlaceholder('Last Name')).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Phone')).toBeVisible();
    await expect(page.getByPlaceholder('Street Address')).toBeVisible();
    await expect(page.getByPlaceholder('City')).toBeVisible();
    await expect(page.getByPlaceholder('Country')).toBeVisible();
  });

  test('form inputs allow continuous typing without losing focus', async ({ page }) => {
    await addProductToCart(page, 'achieve');
    await page.goto('/checkout');
    await waitForPageReady(page);

    // Type a full name -- this tests that React controlled inputs
    // do not lose focus or drop characters during rapid typing
    const firstNameInput = page.getByPlaceholder('First Name');
    await firstNameInput.click();
    await firstNameInput.type('Alexander', { delay: 50 });
    await expect(firstNameInput).toHaveValue('Alexander');

    const lastNameInput = page.getByPlaceholder('Last Name');
    await lastNameInput.click();
    await lastNameInput.type('Hamilton', { delay: 50 });
    await expect(lastNameInput).toHaveValue('Hamilton');

    const emailInput = page.getByPlaceholder('Email');
    await emailInput.click();
    await emailInput.type('alex@example.com', { delay: 30 });
    await expect(emailInput).toHaveValue('alex@example.com');
  });

  test('form validation rejects empty required fields', async ({ page }) => {
    await addProductToCart(page, 'achieve');
    await page.goto('/checkout');
    await waitForPageReady(page);

    // Submit without filling anything
    const placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
    await placeOrderBtn.click();
    await page.waitForTimeout(300);

    // Should show a validation error
    const error = page.locator('.text-red-400');
    await expect(error).toBeVisible();
    const errorText = await error.textContent();
    expect(errorText).toContain('Please fill in');
  });

  test('form validation rejects invalid email', async ({ page }) => {
    await addProductToCart(page, 'achieve');
    await page.goto('/checkout');
    await waitForPageReady(page);

    // Fill required fields with valid data except email
    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Email').fill('not-an-email');
    await page.getByPlaceholder('Street Address').fill('123 Main St');
    await page.getByPlaceholder('City').fill('Tokyo');
    await page.getByPlaceholder('Country').fill('Japan');

    const placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
    await placeOrderBtn.click();
    await page.waitForTimeout(300);

    const error = page.locator('.text-red-400');
    await expect(error).toBeVisible();
    const errorText = await error.textContent();
    expect(errorText).toContain('valid email');
  });

  test('order summary shows cart items and total', async ({ page }) => {
    await addProductToCart(page, 'achieve');
    await page.goto('/checkout');
    await waitForPageReady(page);

    // Order summary section should contain the product
    const orderSummary = page.locator('.bg-gray-900');
    await expect(orderSummary.getByText('Order Summary')).toBeVisible();

    // Total should be visible and > 0
    await expect(orderSummary.getByText('Total')).toBeVisible();
    const totalEl = orderSummary.locator('.text-\\[\\#25C760\\]').last();
    const totalText = await totalEl.textContent();
    expect(totalText).toBeTruthy();
    const amount = parseFloat(totalText!.replace(/[^0-9.]/g, ''));
    expect(amount).toBeGreaterThan(0);
  });

  test('successful order submission shows confirmation', async ({ page }) => {
    await addProductToCart(page, 'achieve');
    await page.goto('/checkout');
    await waitForPageReady(page);

    // Fill all required fields
    await page.getByPlaceholder('First Name').fill('Jane');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Email').fill('jane@example.com');
    await page.getByPlaceholder('Phone').fill('+1234567890');
    await page.getByPlaceholder('Street Address').fill('456 Oak Ave');
    await page.getByPlaceholder('City').fill('San Francisco');
    await page.getByPlaceholder('State / Province').fill('CA');
    await page.getByPlaceholder('ZIP / Postal Code').fill('94102');
    await page.getByPlaceholder('Country').fill('United States');

    // Submit
    const placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
    await placeOrderBtn.click();

    // Wait for submission to complete (uses fetch + fallback to client-side)
    await page.waitForTimeout(2000);

    // Should show the thank you / confirmation screen
    await expect(page.getByText('Thank you')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Order ID:')).toBeVisible();
    await expect(page.getByText('Continue Shopping')).toBeVisible();
  });

  test('confirmation page links back to homepage', async ({ page }) => {
    await addProductToCart(page, 'achieve');
    await page.goto('/checkout');
    await waitForPageReady(page);

    // Fill and submit
    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('User');
    await page.getByPlaceholder('Email').fill('test@test.com');
    await page.getByPlaceholder('Street Address').fill('1 Test St');
    await page.getByPlaceholder('City').fill('Testville');
    await page.getByPlaceholder('Country').fill('Testland');

    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.waitForTimeout(2000);

    await expect(page.getByText('Thank you')).toBeVisible({ timeout: 10000 });

    // Click "Continue Shopping" to go back to homepage
    await page.getByText('Continue Shopping').click();
    await page.waitForURL('**/en');
  });
});
