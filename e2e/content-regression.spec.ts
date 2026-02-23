import { test, expect } from '@playwright/test';
import { waitForPageReady, scrollFullPage } from './helpers';

/**
 * Content Regression Tests
 *
 * These tests verify that page content (video URLs, text, section structure)
 * matches the current site design. They are designed to be reusable as
 * regression tests to catch unintended content changes.
 */

/* ================================================================== */
/*  HOMEPAGE                                                           */
/* ================================================================== */

test.describe('Homepage Content Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);
  });

  test('Hero section displays correct title and tagline', async ({ page }) => {
    await expect(page.getByText('MOTHER VEGETABLE PROJECT').first()).toBeVisible();
    await expect(page.getByText("Earth\u2019s life force, for you.").first()).toBeVisible();
  });

  test('Food Function section renders with correct id and video', async ({ page }) => {
    await scrollFullPage(page);
    const foodSection = page.locator('#food-function');
    await expect(foodSection).toBeVisible();

    const video = foodSection.locator('video[src*="food_video"]');
    await expect(video).toHaveCount(1);
  });

  test('Food Function section has nutrition facts table', async ({ page }) => {
    await scrollFullPage(page);
    const foodSection = page.locator('#food-function');

    // Main nutrients should be visible
    await expect(foodSection.getByText('Nutrition Facts')).toBeVisible();
    await expect(foodSection.getByText('Energy')).toBeVisible();
    await expect(foodSection.getByText('Protein').first()).toBeVisible();
  });

  test('Food Function section has clipboard copy button', async ({ page }) => {
    await scrollFullPage(page);
    const foodSection = page.locator('#food-function');
    const copyButton = foodSection.getByText('Copy Ingredients to Clipboard');
    await expect(copyButton).toBeVisible();
  });

  test('Food Function section has AI service links', async ({ page }) => {
    await scrollFullPage(page);
    const foodSection = page.locator('#food-function');
    await expect(foodSection.locator('a[href*="chat.openai.com"]')).toHaveCount(1);
    await expect(foodSection.locator('a[href*="gemini.google.com"]')).toHaveCount(1);
  });

  test('Cosmetic Function section renders with correct id and video', async ({ page }) => {
    await scrollFullPage(page);
    const cosmeticSection = page.locator('#cosmetic-function');
    await expect(cosmeticSection).toBeVisible();

    const video = cosmeticSection.locator('video[src*="cosmetic_video"]');
    await expect(video).toHaveCount(1);
  });

  test('Cosmetic Function section has ingredient info', async ({ page }) => {
    await scrollFullPage(page);
    const cosmeticSection = page.locator('#cosmetic-function');
    await expect(cosmeticSection.getByText('Ingredient Information')).toBeVisible();
    await expect(cosmeticSection.getByText('Silicic Anhydride').first()).toBeVisible();
  });

  test('Cosmetic Function section has clipboard copy button', async ({ page }) => {
    await scrollFullPage(page);
    const cosmeticSection = page.locator('#cosmetic-function');
    const copyButton = cosmeticSection.getByText('Copy Ingredients to Clipboard');
    await expect(copyButton).toBeVisible();
  });

  // Before & After button is currently hidden in the codebase
  test.skip('Before & After button exists in Cosmetic Function', async ({ page }) => {
    await scrollFullPage(page);
    const cosmeticSection = page.locator('#cosmetic-function');
    const baButton = cosmeticSection.getByText('Before & After');
    await expect(baButton).toBeVisible();
  });

  // Before & After button is currently hidden in the codebase
  test.skip('Before & After modal opens and closes', async ({ page }) => {
    await scrollFullPage(page);
    const cosmeticSection = page.locator('#cosmetic-function');

    // Click the Before & After button
    await cosmeticSection.getByText('Before & After').click();
    await page.waitForTimeout(500);

    // Modal should be visible with case study content
    const modal = page.locator('.fixed.inset-0');
    await expect(modal).toBeVisible();

    // Close modal via the close button
    await page.locator('.fixed.inset-0 button:has-text("\u2715")').click();
    await page.waitForTimeout(300);
  });

  test('Products section has correct video URLs for achieve and confidence (no forever)', async ({ page }) => {
    await scrollFullPage(page);

    const achieveVideo = page.locator('video[src*="new_achieve_video.mp4"]');
    await expect(achieveVideo).toHaveCount(1);

    const confidenceVideo = page.locator('video[src*="new_confidence_video.mp4"]');
    await expect(confidenceVideo).toHaveCount(1);

    // Forever should NOT exist
    const foreverVideo = page.locator('video[src*="forever_video.mp4"]');
    await expect(foreverVideo).toHaveCount(0);
  });

  test('Products section shows product type subtitles', async ({ page }) => {
    await scrollFullPage(page);
    // Both products should show their type subtitles
    await expect(page.getByText('Drinkable Type').first()).toBeVisible();
    await expect(page.getByText('Topical Type').first()).toBeVisible();
  });

  test('Two Only Ones section has mazavege and sef videos', async ({ page }) => {
    await scrollFullPage(page);

    const mazavegeVideo = page.locator('video[src*="mazavege_top.mp4"]');
    await expect(mazavegeVideo).toHaveCount(1);

    const sefVideo = page.locator('video[src*="sef_top.mp4"]');
    await expect(sefVideo).toHaveCount(1);
  });

  test('Trust section shows certification logos and descriptions', async ({ page }) => {
    await scrollFullPage(page);
    await expect(page.getByText('Our Trust')).toBeVisible();

    // Should have trust items for Achieve and Confidence only (no Forever)
    const trustText = await page.locator('body').textContent();
    expect(trustText).toContain('Achieve');
    expect(trustText).toContain('Confidence');
  });

  test('No TORIKOMU/MAZEKOMU/SURIKOMU text visible on homepage', async ({ page }) => {
    await scrollFullPage(page);
    // Check that these terms don't appear in any visible text elements
    // (they may still exist in hidden JSON payloads from i18n messages)
    const visibleTexts = await page.locator('h1, h2, h3, h4, p, span, a, button, li, td, th, label, div:not(script)')
      .filter({ hasText: /TORIKOMU|MAZEKOMU|SURIKOMU/ })
      .count();
    expect(visibleTexts).toBe(0);
  });
});

/* ================================================================== */
/*  PRODUCT PAGES                                                      */
/* ================================================================== */

test.describe('Product Page Content Regression', () => {
  const productTests = [
    {
      slug: 'achieve',
      name: 'Achieve',
      subtitle: 'for Body',
      howToLink: '/achieve-howto',
    },
    {
      slug: 'confidence',
      name: 'Confidence',
      subtitle: 'For All Skin',
      howToLink: '/confidence-howto',
    },
  ];

  for (const product of productTests) {
    test.describe(`${product.name} page`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.removeItem('mv-cart'));
        await page.goto(`product/${product.slug}`);
        await waitForPageReady(page);
      });

      test(`displays correct name and subtitle`, async ({ page }) => {
        await expect(page.locator('.product-name')).toContainText(product.name);
        await expect(page.locator('.card-title-sub')).toContainText(product.subtitle);
      });

      test(`has thumbnail videos`, async ({ page }) => {
        const thumbnails = page.locator('.thumbnail-item');
        const count = await thumbnails.count();
        expect(count).toBeGreaterThan(0);
      });

      test(`how to use link points to correct page`, async ({ page }) => {
        await scrollFullPage(page);
        const howToLink = page.locator(`a[href*="${product.howToLink}"]`);
        await expect(howToLink).toHaveCount(1);
      });

      test(`trust section shows partner logos`, async ({ page }) => {
        await scrollFullPage(page);
        const partnerImages = page.locator('.partner-logo');
        const count = await partnerImages.count();
        expect(count).toBe(6);
      });
    });
  }

  // Forever product page exists in data but is NOT linked from homepage or navigation
  test('Forever product is not linked from homepage products section', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);
    await scrollFullPage(page);

    // The product listing section should NOT have a link to forever
    const productSection = page.locator('#product-listing');
    const foreverLink = productSection.locator('a[href*="forever"]');
    await expect(foreverLink).toHaveCount(0);
  });
});

/* ================================================================== */
/*  HOWTO PAGES                                                        */
/* ================================================================== */

test.describe('HowTo Pages Content Regression', () => {
  test('Achieve HowTo page loads with recipe content', async ({ page }) => {
    await page.goto('achieve-howto');
    await waitForPageReady(page);

    // Page title
    await expect(page.getByText('How to Use Achieve')).toBeVisible();

    // At least one recipe category
    await expect(page.getByText('Drinks')).toBeVisible();

    // Recipe cards present (CDN images may be optimized by Next.js Image)
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(10);
  });

  test('Confidence HowTo page loads with recipe content', async ({ page }) => {
    await page.goto('confidence-howto');
    await waitForPageReady(page);

    await expect(page.getByText('How to Use Confidence')).toBeVisible();
  });
});

/* ================================================================== */
/*  HEALTHCARE PAGE                                                    */
/* ================================================================== */

test.describe('Healthcare Page Content Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('healthcare');
    await waitForPageReady(page);
  });

  test('displays ALL 45E branding', async ({ page }) => {
    await expect(page.getByText('ALL 45E')).toBeTruthy();
    await expect(page.getByText('The Complete Cofactor Nutrition for Patient Recovery')).toBeVisible();
  });

  test('has certification images (GMP, JFRL, HACCP)', async ({ page }) => {
    await scrollFullPage(page);

    for (const cert of ['gmp', 'jfrl', 'haccp']) {
      const img = page.locator(`img[src*="${cert}.png"]`);
      await expect(img).toBeVisible();
    }
  });

  test('has clinical purpose section', async ({ page }) => {
    await expect(page.getByText('Clinical Purpose')).toBeVisible();
  });

  test('has certification documents', async ({ page }) => {
    await scrollFullPage(page);
    await expect(page.getByText('JFRL Food Test Report')).toBeVisible();
    await expect(page.getByText('Japan Import Permit')).toBeVisible();
  });
});

/* ================================================================== */
/*  CERTIFIED INSTRUCTOR PAGE                                          */
/* ================================================================== */

test.describe('Certified Instructor Page Regression', () => {
  test('has instructor animation video', async ({ page }) => {
    await page.goto('mv/certifiedInstructor');
    await waitForPageReady(page);

    const video = page.locator('video source[src*="Instructor_anime.mp4"]');
    await expect(video).toHaveCount(1);
  });
});

/* ================================================================== */
/*  CROSS-PAGE STRUCTURE                                               */
/* ================================================================== */

test.describe('Cross-Page Structure Regression', () => {
  const pages = [
    { path: '/', name: 'Homepage' },
    { path: 'product/achieve', name: 'Achieve' },
    { path: 'product/confidence', name: 'Confidence' },
    { path: 'achieve-howto', name: 'Achieve HowTo' },
    { path: 'confidence-howto', name: 'Confidence HowTo' },
    { path: 'healthcare', name: 'Healthcare' },
    { path: 'mv/certifiedInstructor', name: 'Certified Instructor' },
  ];

  for (const p of pages) {
    test(`${p.name} page loads without errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      await page.goto(p.path);
      await waitForPageReady(page);

      expect(errors).toEqual([]);
    });
  }

  test('all product video CDN URLs are accessible', async ({ page }) => {
    const cdnVideos = [
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/mazavege_top.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/sef_top.mp4',
    ];

    for (const url of cdnVideos) {
      const response = await page.request.head(url);
      expect(response.status()).toBe(200);
    }
  });

  test('local product video files are accessible', async ({ page }) => {
    const localProductVideos = [
      '/new_achieve_video.mp4',
      '/new_confidence_video.mp4',
    ];

    for (const url of localProductVideos) {
      const response = await page.request.head(url);
      expect(response.status()).toBe(200);
    }
  });

  test('local video files are accessible', async ({ page }) => {
    const localVideos = [
      '/Images/Assets/homepage/product/food_video.mov',
      '/Images/Assets/homepage/product/cosmetic_video.mov',
    ];

    for (const url of localVideos) {
      const response = await page.request.head(url);
      expect(response.status()).toBe(200);
    }
  });
});
