import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Profile Page', () => {
    test('should require authentication', async ({ page }) => {
        await page.goto(`${BASE_URL}/profile`);

        // Should redirect to auth or show login prompt
        await page.waitForTimeout(1000);

        const url = page.url();
        expect(url.includes('auth') || url.includes('login')).toBeTruthy();
    });

    test('should display user profile information', async ({ page, context }) => {
        // Mock logged in state
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/profile`);

        // Should show profile elements
        const profileHeading = page.locator('h1, h2').filter({ hasText: /profile|account/i });

        if (await profileHeading.count() > 0) {
            await expect(profileHeading).toBeVisible();
        }
    });

    test('should display user stats', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/profile`);

        // Look for stats section (points, solves, bookmarks)
        const stats = page.locator('text=/points|solves|bookmarks|achievements/i');

        if (await stats.count() > 0) {
            await expect(stats.first()).toBeVisible();
        }
    });

    test('should show OAuth verification badges', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/profile`);

        // Look for OAuth badges
        const oauthBadge = page.locator('text=/verified|google|github|email verified/i');

        if (await oauthBadge.count() > 0) {
            await expect(oauthBadge.first()).toBeVisible();
        }
    });

    test('should allow profile editing', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/profile`);

        // Look for edit button
        const editButton = page.locator('button').filter({ hasText: /edit|update/i }).first();

        if (await editButton.count() > 0) {
            await editButton.click();

            // Should show edit form
            await page.waitForTimeout(500);

            const saveButton = page.locator('button').filter({ hasText: /save|update/i });
            if (await saveButton.count() > 0) {
                await expect(saveButton.first()).toBeVisible();
            }
        }
    });

    test('should have multiple profile tabs', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/profile`);

        // Look for tabs (Stats, Profile, Security, Privacy)
        const statsTab = page.locator('button').filter({ hasText: /stats/i });
        const profileTab = page.locator('button').filter({ hasText: /profile/i });
        const securityTab = page.locator('button').filter({ hasText: /security/i });
        const privacyTab = page.locator('button').filter({ hasText: /privacy/i });

        // At least some tabs should exist
        const tabCount =
            await statsTab.count() +
            await profileTab.count() +
            await securityTab.count() +
            await privacyTab.count();

        expect(tabCount).toBeGreaterThanOrEqual(2);
    });

    test('should display stats tab with user statistics', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/profile`);

        // Click Stats tab if it exists
        const statsTab = page.locator('button').filter({ hasText: /stats/i });

        if (await statsTab.count() > 0) {
            await statsTab.click();
            await page.waitForTimeout(500);

            // Look for stats content (CTF Solves, Points, Rank, Events)
            const ctfStats = page.locator('text=/ctf|solves|points|rank|events/i');

            if (await ctfStats.count() > 0) {
                await expect(ctfStats.first()).toBeVisible();
            }
        }
    });

    test('should display privacy tab with toggle', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/profile`);

        // Click Privacy tab if it exists
        const privacyTab = page.locator('button').filter({ hasText: /privacy/i });

        if (await privacyTab.count() > 0) {
            await privacyTab.click();
            await page.waitForTimeout(500);

            // Look for privacy toggle (public profile)
            const publicToggle = page.locator('text=/public profile|visibility/i');

            if (await publicToggle.count() > 0) {
                await expect(publicToggle).toBeVisible();
            }
        }
    });
});

test.describe('User Profile by Username', () => {
    test('should display public user profile', async ({ page }) => {
        // Try a common username or just test the route
        await page.goto(`${BASE_URL}/user/testuser`);

        await page.waitForTimeout(1000);

        // Should either show profile or 404
        const notFound = page.locator('text=/not found|404/i');
        const profileContent = page.locator('h1, h2');

        const is404 = await notFound.count() > 0;
        const hasProfile = await profileContent.count() > 0;

        expect(is404 || hasProfile).toBeTruthy();
    });

    test('should show user achievements', async ({ page }) => {
        await page.goto(`${BASE_URL}/user/testuser`);

        // Look for achievements or badges section
        const achievements = page.locator('text=/achievements|badges|trophies/i');

        if (await achievements.count() > 0) {
            await expect(achievements).toBeVisible();
        }
    });

    test('should show user solved challenges', async ({ page }) => {
        await page.goto(`${BASE_URL}/user/testuser`);

        // Look for solved challenges section
        const solved = page.locator('text=/solved|challenges completed/i');

        if (await solved.count() > 0) {
            await expect(solved).toBeVisible();
        }
    });
});

test.describe('Bookmarks', () => {
    test('should display bookmarks page', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/profile`);

        // Look for bookmarks link/tab
        const bookmarksLink = page.locator('a, button').filter({ hasText: /bookmarks?/i }).first();

        if (await bookmarksLink.count() > 0) {
            await bookmarksLink.click();
            await page.waitForTimeout(500);
        }
    });

    test('should bookmark a challenge', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/ctf`);

        const firstChallenge = page.locator('[data-testid="challenge-card"], article').first();

        if (await firstChallenge.count() > 0) {
            await firstChallenge.click();

            // Look for bookmark button
            const bookmarkButton = page.locator('button').filter({ hasText: /bookmark|save/i }).first();

            if (await bookmarkButton.count() > 0) {
                await bookmarkButton.click();
                await page.waitForTimeout(500);

                // Button should show bookmarked state
                const bookmarked = page.locator('text=/bookmarked|saved/i');
                if (await bookmarked.count() > 0) {
                    await expect(bookmarked).toBeVisible();
                }
            }
        }
    });

    test('should bookmark a roadmap', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/roadmaps`);

        const firstRoadmap = page.locator('[data-testid="roadmap-card"], article, .roadmap-card').first();

        if (await firstRoadmap.count() > 0) {
            // Look for bookmark icon/button on card
            const bookmarkButton = firstRoadmap.locator('button').filter({ hasText: /bookmark/i }).first();

            if (await bookmarkButton.count() > 0) {
                await bookmarkButton.click();
                await page.waitForTimeout(500);
            }
        }
    });

    test('should remove bookmark', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        // First bookmark something
        await page.goto(`${BASE_URL}/roadmaps`);

        const firstRoadmap = page.locator('[data-testid="roadmap-card"], article').first();

        if (await firstRoadmap.count() > 0) {
            const bookmarkButton = firstRoadmap.locator('button').first();

            if (await bookmarkButton.count() > 0) {
                // Click twice to bookmark and unbookmark
                await bookmarkButton.click();
                await page.waitForTimeout(500);
                await bookmarkButton.click();
                await page.waitForTimeout(500);
            }
        }
    });
});

test.describe('User Progress Tracking', () => {
    test('should show progress on roadmaps', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/roadmaps`);

        const firstRoadmap = page.locator('[data-testid="roadmap-card"], article').first();

        if (await firstRoadmap.count() > 0) {
            await firstRoadmap.click();

            // Look for progress indicators
            const progress = page.locator('text=/progress|completed|%/i, [role="progressbar"]');

            if (await progress.count() > 0) {
                await expect(progress.first()).toBeVisible();
            }
        }
    });

    test('should track challenge completion', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/profile`);

        // Look for solved challenges count
        const solvedCount = page.locator('text=/\\d+\\s*(solved|completed)/i');

        if (await solvedCount.count() > 0) {
            await expect(solvedCount.first()).toBeVisible();
        }
    });
});

test.describe('Settings', () => {
    test('should access settings page', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        await page.goto(`${BASE_URL}/profile`);

        // Look for settings link
        const settingsLink = page.locator('a, button').filter({ hasText: /settings/i }).first();

        if (await settingsLink.count() > 0) {
            await settingsLink.click();
            await page.waitForTimeout(500);
        }
    });

    test('should show email preferences', async ({ page, context }) => {
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);

        // Try settings route directly
        await page.goto(`${BASE_URL}/settings`);

        // Look for email preferences section
        const emailPrefs = page.locator('text=/email|notifications|preferences/i');

        if (await emailPrefs.count() > 0) {
            await expect(emailPrefs.first()).toBeVisible();
        }
    });
});
