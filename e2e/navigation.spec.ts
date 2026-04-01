import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test('homepage loads correctly', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/TheCyberHub/);
    });

    test('homepage displays key sections', async ({ page }) => {
        await page.goto('/');
        // Hero section should be visible
        await expect(page.locator('text=/cybersecurity/i').first()).toBeVisible({ timeout: 15_000 });
    });

    test('can navigate to challenges', async ({ page }) => {
        await page.goto('/challenges');
        await expect(page).toHaveURL(/challenges/);
        await expect(page.locator('h1')).toContainText(/Challenges/i);
    });

    test('can navigate to blog', async ({ page }) => {
        await page.goto('/blog');
        await expect(page).toHaveURL(/blog/);
        await expect(page.locator('h1')).toContainText(/Blog/i);
    });

    test('can navigate to tools', async ({ page }) => {
        await page.goto('/tools');
        await expect(page).toHaveURL(/tools/);
        await expect(page.locator('h1')).toContainText(/Tools/i);
    });

    test('can navigate to forums', async ({ page }) => {
        await page.goto('/forums');
        await expect(page).toHaveURL(/forums/);
        await expect(page.locator('h1')).toBeVisible();
    });

    test('can navigate to events', async ({ page }) => {
        await page.goto('/events');
        await expect(page).toHaveURL(/events/);
        await expect(page.locator('h1')).toBeVisible();
    });

    test('can navigate to search page', async ({ page }) => {
        await page.goto('/search');
        await expect(page).toHaveURL(/search/);
        await expect(page.locator('h1')).toContainText(/Search/i);
    });

    test('navbar is visible and contains logo', async ({ page }) => {
        await page.goto('/');
        const logo = page.locator('nav img[alt="TheCyberHub"]');
        await expect(logo).toBeVisible({ timeout: 15_000 });
    });

    test('footer is present on homepage', async ({ page }) => {
        await page.goto('/');
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();
    });

    test('404 page renders for unknown routes', async ({ page }) => {
        await page.goto('/this-page-does-not-exist');
        // Next.js shows a not-found page
        const notFound = page.locator('text=/not found|404/i');
        await expect(notFound.first()).toBeVisible({ timeout: 10_000 });
    });
});
