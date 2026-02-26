import { test, expect, type Page } from '@playwright/test';
import { waitForPageReady, addProductToCart } from './helpers';

/**
 * Stripe Checkout E2E Test
 *
 * Tests the full purchase flow:
 *   Cart → Checkout form → Stripe hosted checkout → Payment → Success page
 *
 * Uses Stripe test card 4242 4242 4242 4242.
 * Requires STRIPE_SECRET_KEY (sk_test_*) to be set in .env.
 */

// Stripe hosted checkout is slow — generous timeouts
test.describe('Stripe Checkout Flow', () => {
  test.setTimeout(120_000);

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('mv-cart');
      localStorage.removeItem('mv-orders');
      localStorage.removeItem('mv-referral');
    });
    await page.reload();
    await waitForPageReady(page);
  });

  test('full purchase: add to cart → checkout → Stripe payment → success page', async ({ page }) => {
    // ---- Step 1: Add product to cart ----
    await addProductToCart(page, 'achieve');
    await expect(page.getByText('My Cart (1)')).toBeVisible();

    // ---- Step 2: Navigate to checkout ----
    const checkoutBtn = page.locator('.fixed button', { hasText: 'CHECKOUT' });
    await checkoutBtn.click();
    await page.waitForURL('**/checkout');
    await waitForPageReady(page);

    await expect(page.getByText('Shipping Information')).toBeVisible();
    await expect(page.getByText('Order Summary')).toBeVisible();

    // ---- Step 3: Fill shipping form ----
    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('Buyer');
    await page.getByPlaceholder('Email').fill('test-e2e@example.com');
    await page.getByPlaceholder('Phone').fill('+81901234567');
    await page.getByPlaceholder('Street Address').fill('1-2-3 Shibuya');
    await page.getByPlaceholder('City').fill('Tokyo');
    await page.getByPlaceholder('State / Province').fill('Tokyo');
    await page.getByPlaceholder('ZIP / Postal Code').fill('150-0002');
    await page.getByPlaceholder('Country').fill('Japan');

    // ---- Step 4: Submit → redirect to Stripe ----
    await page.getByRole('button', { name: 'Place Order' }).click();

    // Wait for redirect to Stripe checkout (checkout.stripe.com)
    await page.waitForURL('**/checkout.stripe.com/**', { timeout: 30_000 });
    const stripeUrl = page.url();
    expect(stripeUrl).toContain('checkout.stripe.com');

    // ---- Step 5: Fill Stripe payment form ----
    await fillStripeCheckoutForm(page);

    // ---- Step 6: Submit payment on Stripe ----
    await submitStripePayment(page);

    // ---- Step 7: Wait for redirect back to success page ----
    await page.waitForURL('**/checkout/success**', { timeout: 60_000 });

    // ---- Step 8: Verify success page ----
    await expect(page.getByText('Thank you')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('Continue Shopping')).toBeVisible();
  });
});

/**
 * Fill the card details on the Stripe hosted checkout page.
 * Stripe Checkout uses different element structures depending on version,
 * so we try multiple selector strategies.
 */
async function fillStripeCheckoutForm(page: Page) {
  // Wait for the Stripe page to fully load
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  // Email may already be pre-filled via customer_email.
  // If there's an email field and it's empty, fill it.
  const emailField = page.locator('#email');
  if (await emailField.isVisible({ timeout: 3000 }).catch(() => false)) {
    const emailValue = await emailField.inputValue();
    if (!emailValue) {
      await emailField.fill('test-e2e@example.com');
    }
  }

  // ---- Card number ----
  // Stripe Checkout renders card fields — try multiple selectors
  await fillStripeField(page, '#cardNumber', '4242424242424242');

  // ---- Expiry ----
  await fillStripeField(page, '#cardExpiry', '1234');

  // ---- CVC ----
  await fillStripeField(page, '#cardCvc', '123');

  // ---- Billing name (if visible) ----
  const billingName = page.locator('#billingName');
  if (await billingName.isVisible({ timeout: 2000 }).catch(() => false)) {
    await billingName.fill('Test Buyer');
  }

  // ---- Country/region selector (if visible) ----
  const countrySelect = page.locator('#billingCountry');
  if (await countrySelect.isVisible({ timeout: 2000 }).catch(() => false)) {
    await countrySelect.selectOption('JP');
  }

  // ---- Postal code on Stripe (if visible) ----
  const billingZip = page.locator('#billingPostalCode');
  if (await billingZip.isVisible({ timeout: 2000 }).catch(() => false)) {
    await billingZip.fill('1500002');
  }
}

/**
 * Try to fill a Stripe field using direct selector first,
 * then fall back to iframe-based approach if needed.
 */
async function fillStripeField(page: Page, selector: string, value: string) {
  // Strategy 1: Direct element on page
  const direct = page.locator(selector);
  if (await direct.isVisible({ timeout: 3000 }).catch(() => false)) {
    await direct.fill(value);
    return;
  }

  // Strategy 2: Inside an iframe (Stripe Elements style)
  const frames = page.frames();
  for (const frame of frames) {
    const el = frame.locator(selector);
    if (await el.isVisible({ timeout: 1000 }).catch(() => false)) {
      await el.fill(value);
      return;
    }
  }

  // Strategy 3: Try input[name=...] variant
  const name = selector.replace('#', '');
  const byName = page.locator(`input[name="${name}"]`);
  if (await byName.isVisible({ timeout: 2000 }).catch(() => false)) {
    await byName.fill(value);
    return;
  }

  // Strategy 4: frameLocator with __privateStripeFrame
  const stripeFrame = page.frameLocator('iframe[name*="__privateStripeFrame"]').first();
  const frameEl = stripeFrame.locator(selector);
  if (await frameEl.isVisible({ timeout: 2000 }).catch(() => false)) {
    await frameEl.fill(value);
    return;
  }

  throw new Error(`Could not find Stripe field: ${selector}`);
}

/**
 * Click the pay/submit button on the Stripe checkout page.
 */
async function submitStripePayment(page: Page) {
  // Try multiple selectors for the pay button
  const selectors = [
    '[data-testid="hosted-payment-submit-button"]',
    'button.SubmitButton',
    'button[type="submit"]',
    '.SubmitButton-IconContainer',
  ];

  for (const sel of selectors) {
    const btn = page.locator(sel).first();
    if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn.click();
      return;
    }
  }

  // Fallback: find button containing "Pay" text
  const payBtn = page.getByRole('button', { name: /pay/i }).first();
  if (await payBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await payBtn.click();
    return;
  }

  throw new Error('Could not find Stripe submit/pay button');
}
