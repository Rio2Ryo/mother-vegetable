import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Mother Vegetable regression testing.
 * Run `npm run test:e2e` for functional tests.
 * Run `npm run test:visual` for visual regression (screenshot comparison) tests.
 */
const PW_PORT = Number(process.env.PLAYWRIGHT_PORT || 3100);
const PW_HOST = process.env.PLAYWRIGHT_HOST || '127.0.0.1';
const PW_ORIGIN = `http://${PW_HOST}:${PW_PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['github']]
    : [['html', { open: 'on-failure' }]],

  /* Shared settings for all projects */
  use: {
    baseURL: `${PW_ORIGIN}/en/`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 15000,
  },

  /* Configure projects for major viewports */
  projects: [
    {
      name: 'desktop-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'tablet',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 812 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],

  /* Start the dev server before running tests */
  webServer: {
    command: `sh -c 'set -a; [ -f ./.env.production ] && . ./.env.production; set +a; HOST=${PW_HOST} PORT=${PW_PORT} NEXT_PUBLIC_APP_URL=${PW_ORIGIN} npm run dev'`,
    url: PW_ORIGIN,
    reuseExistingServer: false,
    timeout: 120000,
  },
});
