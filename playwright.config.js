// @ts-check
import { defineConfig, devices } from '@playwright/test';

const DEFAULT_CI_WORKERS = 3;
const configuredCiWorkers = Number.parseInt(
  process.env.PLAYWRIGHT_WORKERS ?? `${DEFAULT_CI_WORKERS}`,
  10
);
const ciWorkers = Number.isNaN(configuredCiWorkers)
  ? DEFAULT_CI_WORKERS
  : Math.max(1, configuredCiWorkers);
const isListingTests = process.argv.includes('--list');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Allow the CI runner time to pass the site's automatic request verification. */
  expect: {
    timeout: process.env.CI ? 30_000 : 5_000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Run CI in controlled parallel mode. Override with PLAYWRIGHT_WORKERS if needed. */
  workers: process.env.CI ? ciWorkers : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ...(
      isListingTests
        ? []
        : [['allure-playwright', { outputFolder: 'allure-results', detail: true }]]
    ),
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://automationexercise.com',

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        video: 'off',
        viewport: {
          width: 1904,
          height: 944,
        },
        launchOptions: {
          args: ['--width=1920', '--height=1040'],
        },
      },
    },

    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        viewport: {
          width: 1904,
          height: 944,
        },
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
