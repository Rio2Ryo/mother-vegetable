import { chromium } from 'playwright';

const BASE_URL = 'https://mother-vegetable.vercel.app';

const pages = [
  { name: 'homepage', path: '/en' },
  { name: 'product-achieve', path: '/en/product/achieve' },
  { name: 'product-confidence', path: '/en/product/confidence' },
  { name: 'product-forever', path: '/en/product/forever' },
  { name: 'achieve-howto', path: '/en/achieve-howto' },
  { name: 'confidence-howto', path: '/en/confidence-howto' },
  { name: 'forever-howto', path: '/en/forever-howto' },
  { name: 'healthcare', path: '/en/healthcare' },
  { name: 'login', path: '/en/login' },
  { name: 'signup', path: '/en/signup' },
  { name: 'privacy', path: '/en/privacy' },
  { name: 'terms', path: '/en/terms' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  for (const { name, path } of pages) {
    const page = await context.newPage();
    console.log(`Capturing ${name}...`);
    try {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      await page.screenshot({
        path: `screenshots/review/${name}.png`,
        fullPage: true,
      });
      console.log(`  -> saved screenshots/review/${name}.png`);
    } catch (e) {
      console.error(`  -> FAILED: ${e.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log('Done!');
})();
