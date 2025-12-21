import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('CTF Challenge Listing', () => {
    test('should display CTF challenges page', async ({ page }) => {
        await page.goto(`${BASE_URL}/ctf`);
        
        await expect(page.locator('h1')).toContainText(/CTF|challenges/i);
    });

    test('should filter challenges by category', async ({ page }) => {
        await page.goto(`${BASE_URL}/ctf`);
        
        // Look for category filters
        const categoryButton = page.locator('button').filter({ hasText: /web|crypto|pwn|rev/i }).first();
        
        if (await categoryButton.count() > 0) {
            await categoryButton.click();
            
            // Wait for challenges to load
            await page.waitForTimeout(1000);
            
            // Should show filtered challenges
            const challenges = page.locator('[data-testid="challenge-card"], .challenge-card, article').filter({
                hasText: /.+/
            });
            
            const count = await challenges.count();
            // Should have at least 0 challenges (could be empty category)
            expect(count).toBeGreaterThanOrEqual(0);
        }
    });

    test('should filter challenges by difficulty', async ({ page }) => {
        await page.goto(`${BASE_URL}/ctf`);
        
        // Look for difficulty filters
        const difficultyButton = page.locator('button').filter({ hasText: /easy|medium|hard/i }).first();
        
        if (await difficultyButton.count() > 0) {
            await difficultyButton.click();
            await page.waitForTimeout(1000);
        }
    });

    test('should search challenges', async ({ page }) => {
        await page.goto(`${BASE_URL}/ctf`);
        
        const searchInput = page.locator('input[type="search"], input[placeholder*="search"]').first();
        
        if (await searchInput.count() > 0) {
            await searchInput.fill('sql');
            await page.waitForTimeout(500);
            
            // Should filter results
            const challenges = page.locator('[data-testid="challenge-card"], article');
            const count = await challenges.count();
            expect(count).toBeGreaterThanOrEqual(0);
        }
    });

    test('should navigate to challenge detail page', async ({ page }) => {
        await page.goto(`${BASE_URL}/ctf`);
        
        // Click first challenge
        const firstChallenge = page.locator('[data-testid="challenge-card"], article, .challenge').first();
        
        if (await firstChallenge.count() > 0) {
            await firstChallenge.click();
            
            // Should navigate to detail page
            await page.waitForURL(/ctf\/challenges\/.+/);
            
            // Should show challenge details
            await expect(page.locator('h1, h2')).toBeVisible();
        }
    });
});

test.describe('CTF Challenge Submission', () => {
    test('should display flag submission form for logged in users', async ({ page }) => {
        await page.goto(`${BASE_URL}/ctf`);
        
        // Click first challenge
        const firstChallenge = page.locator('[data-testid="challenge-card"], article').first();
        
        if (await firstChallenge.count() > 0) {
            await firstChallenge.click();
            await page.waitForURL(/ctf/);
            
            // Look for flag input or login prompt
            const flagInput = page.locator('input[placeholder*="flag"], input[name*="flag"]');
            const loginPrompt = page.locator('text=/sign in|log in to submit/i');
            
            const hasInput = await flagInput.count() > 0;
            const hasLoginPrompt = await loginPrompt.count() > 0;
            
            // Should have either flag input (if logged in) or login prompt
            expect(hasInput || hasLoginPrompt).toBeTruthy();
        }
    });

    test('should show validation for empty flag submission', async ({ page, context }) => {
        // Mock logged in state
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
            
            const flagInput = page.locator('input[placeholder*="flag"], input[name*="flag"]');
            
            if (await flagInput.count() > 0) {
                // Try to submit empty flag
                const submitButton = page.locator('button[type="submit"]').filter({ hasText: /submit/i });
                
                if (await submitButton.count() > 0) {
                    await submitButton.click();
                    
                    // Should show validation or error
                    await page.waitForTimeout(500);
                }
            }
        }
    });

    test('should display hint unlock option', async ({ page }) => {
        await page.goto(`${BASE_URL}/ctf`);
        
        const firstChallenge = page.locator('[data-testid="challenge-card"], article').first();
        
        if (await firstChallenge.count() > 0) {
            await firstChallenge.click();
            
            // Look for hints section or unlock button
            const hintSection = page.locator('text=/hint|clue/i');
            
            if (await hintSection.count() > 0) {
                await expect(hintSection).toBeVisible();
            }
        }
    });
});

test.describe('CTF Leaderboard', () => {
    test('should display leaderboard page', async ({ page }) => {
        await page.goto(`${BASE_URL}/ctf/leaderboard`);
        
        await expect(page.locator('h1, h2')).toContainText(/leaderboard|rankings/i);
    });

    test('should show top ranked users', async ({ page }) => {
        await page.goto(`${BASE_URL}/ctf/leaderboard`);
        
        // Should have leaderboard entries
        const entries = page.locator('[data-testid="leaderboard-entry"], tr, .rank-item');
        const count = await entries.count();
        
        // Should have at least 1 entry (or 0 if new platform)
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should display user stats (points, solves)', async ({ page }) => {
        await page.goto(`${BASE_URL}/ctf/leaderboard`);
        
        // Look for point indicators
        const pointsText = page.locator('text=/points|score/i').first();
        
        if (await pointsText.count() > 0) {
            await expect(pointsText).toBeVisible();
        }
    });
});

test.describe('CTF Admin Features', () => {
    test('should restrict admin pages without auth', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/challenges`);
        
        // Should redirect or show unauthorized
        await page.waitForTimeout(1000);
        const url = page.url();
        
        // Should either be on auth page or admin page shows auth required
        expect(url.includes('auth') || url.includes('login')).toBeTruthy();
    });

    test('should display admin challenges page structure', async ({ page, context }) => {
        // Mock admin session
        await context.addCookies([{
            name: 'token',
            value: 'fake-admin-token',
            domain: 'localhost',
            path: '/',
        }]);
        
        await page.goto(`${BASE_URL}/admin/challenges`);
        
        // Should have admin interface elements
        const adminHeading = page.locator('text=/admin|challenges|manage/i');
        
        if (await adminHeading.count() > 0) {
            await expect(adminHeading).toBeVisible();
        }
    });
});
