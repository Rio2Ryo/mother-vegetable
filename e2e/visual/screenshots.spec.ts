import { test, expect } from '@playwright/test';
import { scrollFullPage, waitForPageReady, ALL_PAGES } from '../helpers';

/**
 * Visual regression tests -- take full-page screenshots of every page and
 * compare them against baseline images stored in the snapshots directory.
 *
 * Run:  npm run test:visual
 * Update baselines:  npx playwright test --update-snapshots -g "visual"
 */

test.describe('Visual Regression - All Pages', () => {
  for (const pagePath of ALL_PAGES) {
    const label = pagePath === '/' ? 'homepage' : pagePath.replace(/\//g, '-');

    test(`screenshot: ${label}`, async ({ page }) => {
      await page.goto(pagePath, { waitUntil: 'load' });
      await waitForPageReady(page);

      // Scroll through the page to trigger whileInView animations
      await scrollFullPage(page);

      // Take the full-page screenshot and compare against baseline
      await expect(page).toHaveScreenshot(`${label}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
        animations: 'disabled',
      });
    });
  }
});
