import { chromium } from 'playwright';

const BASE_URL = 'https://mothervegetable.co.jp';

const pages = [
  { name: 'homepage', path: '/en' },
  { name: 'products', path: '/en/products' },
  { name: 'product-achieve', path: '/en/product/achieve' },
  { name: 'product-confidence', path: '/en/product/confidence' },
  { name: 'product-tilapia', path: '/en/product/tilapia' },
  { name: 'product-mv-salt', path: '/en/product/mv-salt' },
  { name: 'product-mv-soy-sauce', path: '/en/product/mv-soy-sauce' },
  { name: 'product-mv-toner', path: '/en/product/mv-toner' },
  { name: 'product-mv-balm', path: '/en/product/mv-balm' },
  { name: 'product-mv-soap', path: '/en/product/mv-soap' },
  { name: 'event-ath', path: '/ath' },
  { name: 'event-wn', path: '/wn' },
  { name: 'event-ti', path: '/ti' },
  { name: 'achieve-howto', path: '/en/achieve-howto' },
  { name: 'confidence-howto', path: '/en/confidence-howto' },
  { name: 'healthcare', path: '/en/healthcare' },
  { name: 'certified-instructor', path: '/en/mv/certifiedInstructor' },
  { name: 'about', path: '/en/about' },
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
