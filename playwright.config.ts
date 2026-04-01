import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    timeout: 60 * 1000,
    expect: {
        timeout: 10 * 1000,
    },
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }]
    ],
    use: {
        baseURL,
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'mobile-chrome',
            use: { ...devices['Pixel 5'] },
        },
    ],
    webServer: process.env.CI ? undefined : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
    },
});
