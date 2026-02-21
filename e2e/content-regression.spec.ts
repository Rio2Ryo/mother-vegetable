import { test, expect } from '@playwright/test';
import { waitForPageReady, scrollFullPage } from './helpers';

/**
 * Content Regression Tests
 *
 * These tests verify that page content (video URLs, text, section structure)
 * matches the original mothervegetable.com site. They are designed to be
 * reusable as regression tests to catch unintended content changes.
 */

/* ================================================================== */
/*  HOMEPAGE                                                           */
/* ================================================================== */

test.describe('Homepage Content Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);
  });

  test('Food Function section uses correct video (food_video.mov)', async ({ page }) => {
    await scrollFullPage(page);
    const foodSection = page.locator('#food-function');
    await expect(foodSection).toBeVisible();

    const video = foodSection.locator('video source');
    const src = await video.getAttribute('src');
    expect(src).toBe('/Images/Assets/homepage/product/food_video.mov');
    // Must NOT use achieve_video.mp4 here
    expect(src).not.toContain('achieve_video');
  });

  test('Cosmetic Function section uses correct video (cosmetic_video.mov)', async ({ page }) => {
    await scrollFullPage(page);
    const cosmeticSection = page.locator('#cosmetic-function');
    await expect(cosmeticSection).toBeVisible();

    const videos = cosmeticSection.locator('video source');
    const firstVideoSrc = await videos.first().getAttribute('src');
    expect(firstVideoSrc).toBe('/Images/Assets/homepage/product/cosmetic_video.mov');
  });

  test('Cosmetic Function skin healing video is correct', async ({ page }) => {
    await scrollFullPage(page);
    const cosmeticSection = page.locator('#cosmetic-function');
    const videos = cosmeticSection.locator('video source');
    const count = await videos.count();

    // Find the skin.mp4 video
    let foundSkinVideo = false;
    for (let i = 0; i < count; i++) {
      const src = await videos.nth(i).getAttribute('src');
      if (src?.includes('skin.mp4')) {
        foundSkinVideo = true;
        expect(src).toBe('/Images/Assets/homepage/product/skin.mp4');
      }
    }
    expect(foundSkinVideo).toBe(true);
  });

  test('Products section has correct video URLs for achieve, confidence, forever', async ({ page }) => {
    await scrollFullPage(page);

    const expectedVideos = [
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/achieve_video.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/confidence_v2.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/forever_video.mp4',
    ];

    for (const expectedUrl of expectedVideos) {
      const source = page.locator(`video source[src="${expectedUrl}"]`);
      await expect(source).toHaveCount(1);
    }
  });

  test('Two Only Ones section has mazavege and sef videos', async ({ page }) => {
    await scrollFullPage(page);

    const mazavegeVideo = page.locator('video source[src*="mazavege_top.mp4"]');
    await expect(mazavegeVideo).toHaveCount(1);

    const sefVideo = page.locator('video source[src*="sef_top.mp4"]');
    await expect(sefVideo).toHaveCount(1);
  });

  test('Food Function section has correct nutrient circles', async ({ page }) => {
    await scrollFullPage(page);
    const foodSection = page.locator('#food-function');

    const expectedNutrients = [
      'Essential Fatty Acids',
      'Amino Acids',
      'Vital Vitamins',
      'Key Minerals For Balance',
      'Other Functional Ingredients',
    ];

    for (const nutrient of expectedNutrients) {
      await expect(foodSection.getByText(nutrient)).toBeVisible();
    }
  });

  test('Food Function benefit categories are correct', async ({ page }) => {
    await scrollFullPage(page);
    const foodSection = page.locator('#food-function');

    const categories = ['Children', 'Adults', 'Seniors', 'Athletes', 'Dog', 'Cat'];
    for (const cat of categories) {
      await expect(foodSection.getByText(cat, { exact: true })).toBeVisible();
    }
  });

  test('Cosmetic Function concern circles are correct', async ({ page }) => {
    await scrollFullPage(page);
    const cosmeticSection = page.locator('#cosmetic-function');

    const concerns = ['Dark Spots', 'Acne', 'Wounds', 'Odor', 'Shine'];
    for (const concern of concerns) {
      await expect(cosmeticSection.getByText(concern, { exact: true })).toBeVisible();
    }
  });

  test('Before & After button exists in Cosmetic Function', async ({ page }) => {
    await scrollFullPage(page);
    const cosmeticSection = page.locator('#cosmetic-function');
    const baButton = cosmeticSection.getByText('Before & After');
    await expect(baButton).toBeVisible();
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
      functionType: 'Food Function',
      functionVideoUrl: '/Images/Assets/homepage/product/food_video.mov',
      mainVideoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/achieve_video.mp4',
      videoCount: 5,
      videoPrefix: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve/video_',
      method: 'TORIKOMU / MAZEKOMU',
      howToLink: '/achieve-howto',
      leftSectionTitle: 'Drink',
      rightSectionTitle: 'Food',
      benefitCategories: ['Children', 'Adults', 'Seniors', 'Athletes'],
    },
    {
      slug: 'confidence',
      name: 'Confidence',
      subtitle: 'For All Skin',
      functionType: 'Cosmetic Function',
      functionVideoUrl: '/Images/Assets/homepage/product/cosmetic_video.mov',
      mainVideoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/confidence_v2.mp4',
      videoCount: 5,
      videoPrefix: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/confidence/video_',
      method: 'SURIKOMU / MAZEKOMU',
      howToLink: '/confidence-howto',
      leftSectionTitle: 'SURIKOMU',
      rightSectionTitle: 'MAZEKOMU',
      skinVideoUrl: '/Images/Assets/homepage/product/skin.mp4',
      benefitCategories: ['Dark Spots & Freckles', 'Acne & Scars', 'Wounds & Burns', 'Odor & Shine Control'],
    },
    {
      slug: 'forever',
      name: 'Forever',
      subtitle: 'for Pet',
      functionType: 'Food Function',
      functionVideoUrl: '/Images/Assets/homepage/product/food_video.mov',
      mainVideoUrl: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/forever_video.mp4',
      videoCount: 5,
      videoPrefix: 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/forever/video_',
      method: 'TORIKOMU / MAZEKOMU',
      howToLink: '/forever-howto',
      leftSectionTitle: 'Dog',
      rightSectionTitle: 'Cat',
      benefitCategories: ['Dog', 'Cat'],
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

      test(`has ${product.videoCount} thumbnail videos`, async ({ page }) => {
        const thumbnails = page.locator('.thumbnail-item');
        await expect(thumbnails).toHaveCount(product.videoCount);
      });

      test(`function section uses correct video`, async ({ page }) => {
        await scrollFullPage(page);
        const functionVideo = page.locator('.function-diagram video source').first();
        const src = await functionVideo.getAttribute('src');
        expect(src).toBe(product.functionVideoUrl);
      });

      test(`function section title matches`, async ({ page }) => {
        await scrollFullPage(page);
        await expect(page.getByText(product.functionType, { exact: true }).first()).toBeVisible();
      });

      test(`method text is correct`, async ({ page }) => {
        await scrollFullPage(page);
        await expect(page.getByText(product.method)).toBeVisible();
      });

      test(`benefit categories are present`, async ({ page }) => {
        await scrollFullPage(page);
        for (const cat of product.benefitCategories) {
          await expect(page.getByText(cat, { exact: true }).first()).toBeVisible();
        }
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

  // Confidence-specific: skin healing video
  test('Confidence page has skin healing video', async ({ page }) => {
    await page.goto('product/confidence');
    await waitForPageReady(page);
    await scrollFullPage(page);

    const skinVideo = page.locator('video source[src="/Images/Assets/homepage/product/skin.mp4"]');
    await expect(skinVideo).toHaveCount(1);
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

  test('Forever HowTo page loads with recipe content', async ({ page }) => {
    await page.goto('forever-howto');
    await waitForPageReady(page);

    await expect(page.getByText('How to Use Forever')).toBeVisible();
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
    { path: 'product/forever', name: 'Forever' },
    { path: 'achieve-howto', name: 'Achieve HowTo' },
    { path: 'confidence-howto', name: 'Confidence HowTo' },
    { path: 'forever-howto', name: 'Forever HowTo' },
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
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/achieve_video.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/confidence_v2.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/forever_video.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/mazavege_top.mp4',
      'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/sef_top.mp4',
    ];

    for (const url of cdnVideos) {
      const response = await page.request.head(url);
      expect(response.status()).toBe(200);
    }
  });

  test('local video files are accessible', async ({ page }) => {
    const localVideos = [
      '/Images/Assets/homepage/product/food_video.mov',
      '/Images/Assets/homepage/product/cosmetic_video.mov',
      '/Images/Assets/homepage/product/skin.mp4',
    ];

    for (const url of localVideos) {
      const response = await page.request.head(url);
      expect(response.status()).toBe(200);
    }
  });
});
