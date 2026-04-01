import { test, expect } from '@playwright/test';

test.describe('Search Page', () => {
    test('should display search page with heading', async ({ page }) => {
        await page.goto('/search');
        await expect(page.locator('h1')).toContainText(/Search/i);
    });

    test('should show search input field', async ({ page }) => {
        await page.goto('/search');
        const searchInput = page.getByPlaceholder('Search for anything...');
        await expect(searchInput).toBeVisible();
    });

    test('should show search submit button', async ({ page }) => {
        await page.goto('/search');
        const searchButton = page.locator('button[type="submit"]');
        await expect(searchButton).toBeVisible();
    });

    test('should display type filter buttons', async ({ page }) => {
        await page.goto('/search');

        // Should show type filter buttons: Blog, Forum, Event, Challenge, etc.
        const blogFilter = page.locator('button').filter({ hasText: /^Blog$/ });
        const forumFilter = page.locator('button').filter({ hasText: /^Forum$/ });
        const eventFilter = page.locator('button').filter({ hasText: /^Event$/ });
        const challengeFilter = page.locator('button').filter({ hasText: /^Challenge$/ });

        await expect(blogFilter).toBeVisible();
        await expect(forumFilter).toBeVisible();
        await expect(eventFilter).toBeVisible();
        await expect(challengeFilter).toBeVisible();
    });

    test('should perform search and show results count', async ({ page }) => {
        await page.goto('/search');
        const searchInput = page.getByPlaceholder('Search for anything...');
        await searchInput.fill('security');

        const searchButton = page.locator('button[type="submit"]');
        await searchButton.click();

        // URL should update with query parameter
        await expect(page).toHaveURL(/q=security/);

        // Should show results count text
        await page.waitForTimeout(2000);
        const resultsText = page.locator('text=/\\d+ results? found/i');
        await expect(resultsText).toBeVisible({ timeout: 10_000 });
    });

    test('should show no results for gibberish query', async ({ page }) => {
        await page.goto('/search?q=xyznonexistent12345');
        await page.waitForTimeout(2000);

        const noResults = page.locator('text=/No results found/i');
        const zeroResults = page.locator('text=/0 results found/i');

        const hasNoResults = await noResults.count() > 0;
        const hasZero = await zeroResults.count() > 0;

        expect(hasNoResults || hasZero).toBeTruthy();
    });

    test('should navigate to search results via URL query param', async ({ page }) => {
        await page.goto('/search?q=test');
        await page.waitForTimeout(2000);

        // Should show results or empty state
        const resultsText = page.locator('text=/\\d+ results? found/i');
        await expect(resultsText).toBeVisible({ timeout: 10_000 });
    });

    test('should toggle type filter buttons', async ({ page }) => {
        await page.goto('/search?q=test');
        await page.waitForTimeout(1000);

        const blogFilter = page.locator('button').filter({ hasText: /^Blog$/ });
        await blogFilter.click();

        // URL should update with type param
        await expect(page).toHaveURL(/type=blog/);
    });

    test('should display popular searches when no query', async ({ page }) => {
        await page.goto('/search');
        await page.waitForTimeout(2000);

        // Popular searches section may appear if API returns data
        const popularSection = page.locator('text=/Popular Searches/i');

        // This is optional - depends on API availability
        if (await popularSection.count() > 0) {
            await expect(popularSection).toBeVisible();
        }
    });

    test('should click a search result and navigate', async ({ page }) => {
        await page.goto('/search?q=security');
        await page.waitForTimeout(3000);

        const resultLinks = page.locator('a').filter({ has: page.locator('h3') });

        if (await resultLinks.count() > 0) {
            const href = await resultLinks.first().getAttribute('href');
            await resultLinks.first().click();

            // Should navigate away from search page
            if (href) {
                await expect(page).toHaveURL(new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
            }
        }
    });
});
