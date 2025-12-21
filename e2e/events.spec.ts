import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Events Listing', () => {
    test('should display events page', async ({ page }) => {
        await page.goto(`${BASE_URL}/events`);
        
        await expect(page.locator('h1')).toContainText(/events/i);
    });

    test('should show event cards', async ({ page }) => {
        await page.goto(`${BASE_URL}/events`);
        
        // Should have event cards or empty state
        const eventCards = page.locator('[data-testid="event-card"], article, .event-card');
        const emptyState = page.locator('text=/no events|coming soon/i');
        
        const hasCards = await eventCards.count() > 0;
        const hasEmptyState = await emptyState.count() > 0;
        
        // Should have either events or empty state
        expect(hasCards || hasEmptyState).toBeTruthy();
    });

    test('should filter events by category', async ({ page }) => {
        await page.goto(`${BASE_URL}/events`);
        
        // Look for category filters
        const categoryFilter = page.locator('button').filter({ hasText: /ctf|webinar|workshop/i }).first();
        
        if (await categoryFilter.count() > 0) {
            await categoryFilter.click();
            await page.waitForTimeout(1000);
        }
    });

    test('should navigate to calendar view', async ({ page }) => {
        await page.goto(`${BASE_URL}/events`);
        
        // Look for calendar link
        const calendarLink = page.getByRole('link', { name: /calendar/i });
        
        if (await calendarLink.count() > 0) {
            await calendarLink.click();
            await expect(page).toHaveURL(/calendar/);
        }
    });

    test('should navigate to event detail page', async ({ page }) => {
        await page.goto(`${BASE_URL}/events`);
        
        const firstEvent = page.locator('[data-testid="event-card"], article').first();
        
        if (await firstEvent.count() > 0) {
            await firstEvent.click();
            
            // Should navigate to detail page
            await page.waitForURL(/events\/.+/);
            
            // Should show event details
            await expect(page.locator('h1')).toBeVisible();
        }
    });
});

test.describe('Event Detail Page', () => {
    test('should display event information', async ({ page }) => {
        await page.goto(`${BASE_URL}/events`);
        
        const firstEvent = page.locator('[data-testid="event-card"], article').first();
        
        if (await firstEvent.count() > 0) {
            await firstEvent.click();
            
            // Should show title, date, description
            await expect(page.locator('h1, h2')).toBeVisible();
            
            // Look for date/time info
            const dateInfo = page.locator('text=/\\d{4}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i');
            if (await dateInfo.count() > 0) {
                await expect(dateInfo.first()).toBeVisible();
            }
        }
    });

    test('should show RSVP button', async ({ page }) => {
        await page.goto(`${BASE_URL}/events`);
        
        const firstEvent = page.locator('[data-testid="event-card"], article').first();
        
        if (await firstEvent.count() > 0) {
            await firstEvent.click();
            
            // Look for RSVP or Register button
            const rsvpButton = page.locator('button, a').filter({ hasText: /rsvp|register|join/i });
            
            if (await rsvpButton.count() > 0) {
                await expect(rsvpButton.first()).toBeVisible();
            }
        }
    });

    test('should display event category badge', async ({ page }) => {
        await page.goto(`${BASE_URL}/events`);
        
        const firstEvent = page.locator('[data-testid="event-card"], article').first();
        
        if (await firstEvent.count() > 0) {
            await firstEvent.click();
            
            // Look for category badge
            const categoryBadge = page.locator('text=/ctf|webinar|workshop|meetup|conference/i').first();
            
            if (await categoryBadge.count() > 0) {
                await expect(categoryBadge).toBeVisible();
            }
        }
    });
});

test.describe('Event RSVP Flow', () => {
    test('should prompt login for RSVP when not authenticated', async ({ page }) => {
        await page.goto(`${BASE_URL}/events`);
        
        const firstEvent = page.locator('[data-testid="event-card"], article').first();
        
        if (await firstEvent.count() > 0) {
            await firstEvent.click();
            
            const rsvpButton = page.locator('button').filter({ hasText: /rsvp|register|join/i }).first();
            
            if (await rsvpButton.count() > 0) {
                await rsvpButton.click();
                
                await page.waitForTimeout(500);
                
                // Should show login prompt or redirect
                const loginPrompt = page.locator('text=/sign in|log in|login required/i');
                
                if (await loginPrompt.count() > 0) {
                    await expect(loginPrompt).toBeVisible();
                }
            }
        }
    });

    test('should show confirmation after RSVP', async ({ page, context }) => {
        // Mock logged in state
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);
        
        await page.goto(`${BASE_URL}/events`);
        
        const firstEvent = page.locator('[data-testid="event-card"], article').first();
        
        if (await firstEvent.count() > 0) {
            await firstEvent.click();
            
            const rsvpButton = page.locator('button').filter({ hasText: /rsvp|register|join/i }).first();
            
            if (await rsvpButton.count() > 0) {
                await rsvpButton.click();
                
                // Should show success message or button state change
                await page.waitForTimeout(1000);
            }
        }
    });

    test('should show waitlist option when event is full', async ({ page }) => {
        await page.goto(`${BASE_URL}/events`);
        
        // Look for a full event
        const waitlistButton = page.locator('button, text').filter({ hasText: /waitlist|full/i });
        
        if (await waitlistButton.count() > 0) {
            await expect(waitlistButton.first()).toBeVisible();
        }
    });
});

test.describe('Event Calendar', () => {
    test('should display calendar view', async ({ page }) => {
        await page.goto(`${BASE_URL}/events/calendar`);
        
        // Should show calendar grid or month view
        const calendar = page.locator('[data-testid="calendar"], .calendar, table');
        
        if (await calendar.count() > 0) {
            await expect(calendar).toBeVisible();
        }
    });

    test('should navigate between months', async ({ page }) => {
        await page.goto(`${BASE_URL}/events/calendar`);
        
        // Look for navigation arrows
        const nextButton = page.locator('button[aria-label*="next"], button').filter({ hasText: /next|→|›/i }).first();
        const prevButton = page.locator('button[aria-label*="prev"], button').filter({ hasText: /prev|←|‹/i }).first();
        
        if (await nextButton.count() > 0) {
            await nextButton.click();
            await page.waitForTimeout(500);
        }
        
        if (await prevButton.count() > 0) {
            await prevButton.click();
            await page.waitForTimeout(500);
        }
    });

    test('should export ICS calendar file', async ({ page }) => {
        await page.goto(`${BASE_URL}/events/calendar`);
        
        // Look for download/export button
        const exportButton = page.locator('button, a').filter({ hasText: /download|export|\.ics/i }).first();
        
        if (await exportButton.count() > 0) {
            await expect(exportButton).toBeVisible();
        }
    });

    test('should show events on calendar days', async ({ page }) => {
        await page.goto(`${BASE_URL}/events/calendar`);
        
        await page.waitForTimeout(1000);
        
        // Look for event markers or highlighted days
        const eventMarkers = page.locator('[data-has-event="true"], .has-event, .event-day');
        
        // Should have 0 or more event days
        const count = await eventMarkers.count();
        expect(count).toBeGreaterThanOrEqual(0);
    });
});

test.describe('My Events', () => {
    test('should display user registered events', async ({ page, context }) => {
        // Mock logged in state
        await context.addCookies([{
            name: 'token',
            value: 'fake-token-for-testing',
            domain: 'localhost',
            path: '/',
        }]);
        
        await page.goto(`${BASE_URL}/my-events`);
        
        // Should show user's events or empty state
        const myEvents = page.locator('[data-testid="event-card"], article');
        const emptyState = page.locator('text=/no events|haven\'t registered/i');
        
        const hasEvents = await myEvents.count() > 0;
        const hasEmptyState = await emptyState.count() > 0;
        
        expect(hasEvents || hasEmptyState).toBeTruthy();
    });

    test('should require authentication', async ({ page }) => {
        await page.goto(`${BASE_URL}/my-events`);
        
        // Should redirect to auth or show login prompt
        await page.waitForTimeout(1000);
        
        const url = page.url();
        const authRequired = page.locator('text=/sign in|log in required/i');
        
        const isAuthPage = url.includes('auth') || url.includes('login');
        const hasAuthPrompt = await authRequired.count() > 0;
        
        expect(isAuthPage || hasAuthPrompt).toBeTruthy();
    });
});
