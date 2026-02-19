import { Page } from '@playwright/test';

/**
 * Scroll slowly through the entire page so that framer-motion
 * `whileInView` animations are triggered before taking a screenshot.
 */
export async function scrollFullPage(page: Page, stepPx = 400, delayMs = 200) {
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  let scrolled = 0;
  while (scrolled < bodyHeight) {
    scrolled += stepPx;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrolled);
    await page.waitForTimeout(delayMs);
  }
  // Scroll back to top for a clean full-page screenshot
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(300);
}

/**
 * Wait for the page to be fully loaded: network idle + no pending animations.
 */
export async function waitForPageReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
  // Give framer-motion animations a moment to settle
  await page.waitForTimeout(500);
}

/**
 * Add a product to the cart by navigating to a product page and clicking
 * "Add to Cart". Returns to the original page URL afterwards if desired.
 */
export async function addProductToCart(
  page: Page,
  productSlug: 'achieve' | 'confidence' | 'forever' = 'achieve',
  quantity = 1,
) {
  await page.goto(`/product/${productSlug}`);
  await waitForPageReady(page);

  // Set quantity if more than 1
  if (quantity > 1) {
    const plusButton = page.locator('.quantity-btn').last();
    for (let i = 1; i < quantity; i++) {
      await plusButton.click();
    }
  }

  await page.locator('.action-btn', { hasText: 'Add to Cart' }).click();
  // Wait for the cart panel to open
  await page.waitForTimeout(500);
}

/** All pages to test, relative to the locale prefix */
export const ALL_PAGES = [
  '/',
  '/product/achieve',
  '/product/confidence',
  '/product/forever',
  '/achieve-howto',
  '/confidence-howto',
  '/forever-howto',
  '/healthcare',
  '/mv/certifiedInstructor',
  '/login',
  '/signup',
  '/privacy',
  '/terms',
] as const;
