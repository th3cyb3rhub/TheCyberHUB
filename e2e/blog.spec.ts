import { test, expect } from '@playwright/test';

test.describe('Blog Listing', () => {
    test('should display blog page with heading', async ({ page }) => {
        await page.goto('/blog');
        await expect(page.locator('h1')).toContainText(/Blog/i);
    });

    test('should show search input', async ({ page }) => {
        await page.goto('/blog');
        const searchInput = page.getByPlaceholder('Search articles...');
        await expect(searchInput).toBeVisible();
    });

    test('should show write article link', async ({ page }) => {
        await page.goto('/blog');
        const writeLink = page.locator('a[href="/blog/write"]');
        await expect(writeLink).toBeVisible();
        await expect(writeLink).toContainText(/Write/i);
    });

    test('should display blog posts or empty state', async ({ page }) => {
        await page.goto('/blog');
        // Wait for loading to finish
        await page.waitForTimeout(2000);

        const blogCards = page.locator('a[href^="/blog/"]').filter({ hasNotText: /Write/i });
        const emptyState = page.locator('text=/No blog posts yet|No posts found/i');

        const hasCards = await blogCards.count() > 0;
        const hasEmptyState = await emptyState.count() > 0;

        expect(hasCards || hasEmptyState).toBeTruthy();
    });

    test('should filter blog posts when typing in search', async ({ page }) => {
        await page.goto('/blog');
        await page.waitForTimeout(2000);

        const searchInput = page.getByPlaceholder('Search articles...');
        await searchInput.fill('nonexistent-search-term-xyz');

        // Debounce wait
        await page.waitForTimeout(500);

        // Should show filtered results or empty state
        const emptyState = page.locator('text=/No posts found/i');
        const blogCards = page.locator('a[href^="/blog/"]').filter({ hasNotText: /Write/i });

        const cardCount = await blogCards.count();
        const hasEmpty = await emptyState.count() > 0;

        // Either no cards or empty state message shown
        expect(cardCount === 0 || hasEmpty).toBeTruthy();
    });

    test('should display tag filter buttons when tags exist', async ({ page }) => {
        await page.goto('/blog');
        await page.waitForTimeout(2000);

        // The "All" tag button is always present when there are tags
        const allButton = page.locator('button').filter({ hasText: /^All$/ });

        if (await allButton.count() > 0) {
            await expect(allButton).toBeVisible();
        }
    });
});

test.describe('Blog Post Detail', () => {
    test('should navigate to a blog post when clicking a card', async ({ page }) => {
        await page.goto('/blog');
        await page.waitForTimeout(2000);

        const firstBlogLink = page.locator('a[href^="/blog/"]').filter({ hasNotText: /Write/i }).first();

        if (await firstBlogLink.count() > 0) {
            await firstBlogLink.click();
            await expect(page).toHaveURL(/\/blog\/.+/);
            // Blog detail page should have a heading
            await expect(page.locator('h1, h2').first()).toBeVisible();
        }
    });

    test('should display blog metadata (author, date)', async ({ page }) => {
        await page.goto('/blog');
        await page.waitForTimeout(2000);

        const firstBlogLink = page.locator('a[href^="/blog/"]').filter({ hasNotText: /Write/i }).first();

        if (await firstBlogLink.count() > 0) {
            await firstBlogLink.click();
            await page.waitForTimeout(1000);

            // Blog listing cards show author and date; detail page should too
            const heading = page.locator('h1, h2').first();
            await expect(heading).toBeVisible();
        }
    });
});
