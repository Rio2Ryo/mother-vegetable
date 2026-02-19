import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const pages = [
  { name: 'homepage', path: '/' },
  { name: 'product-achieve', path: '/product/achieve' },
  { name: 'product-confidence', path: '/product/confidence' },
  { name: 'product-forever', path: '/product/forever' },
  { name: 'achieve-howto', path: '/achieve-howto' },
  { name: 'confidence-howto', path: '/confidence-howto' },
  { name: 'forever-howto', path: '/forever-howto' },
  { name: 'healthcare', path: '/healthcare' },
  { name: 'certified-instructor', path: '/mv/certifiedInstructor' },
  { name: 'privacy', path: '/privacy' },
  { name: 'terms', path: '/terms' },
  { name: 'login', path: '/login' },
  { name: 'signup', path: '/signup' },
];

const LIVE_BASE = 'https://mothervegetable.com';
const LOCAL_BASE = 'http://localhost:3000/en';

mkdirSync('screenshots/live', { recursive: true });
mkdirSync('screenshots/local', { recursive: true });

async function run() {
  const browser = await chromium.launch({ headless: true });

  for (const pg of pages) {
    console.log(`Capturing: ${pg.name}`);

    // Live site
    const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await livePage.goto(`${LIVE_BASE}${pg.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      await livePage.waitForTimeout(2000);
      await livePage.screenshot({ path: `screenshots/live/${pg.name}.png`, fullPage: true });
    } catch (e) {
      console.log(`  Live error for ${pg.name}: ${e.message}`);
    }
    await livePage.close();

    // Local site
    const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await localPage.goto(`${LOCAL_BASE}${pg.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      await localPage.waitForTimeout(2000);
      await localPage.screenshot({ path: `screenshots/local/${pg.name}.png`, fullPage: true });
    } catch (e) {
      console.log(`  Local error for ${pg.name}: ${e.message}`);
    }
    await localPage.close();
  }

  await browser.close();
  console.log('All screenshots captured!');
}

run().catch(console.error);
