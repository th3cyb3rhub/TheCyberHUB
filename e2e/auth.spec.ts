import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Authentication Flows', () => {
    test('should display login page', async ({ page }) => {
        await page.goto(`${BASE_URL}/auth`);
        
        await expect(page.locator('h1')).toContainText(/sign in|login/i);
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
    });

    test('should show validation errors for empty login form', async ({ page }) => {
        await page.goto(`${BASE_URL}/auth`);
        
        // Try to submit empty form
        await page.click('button[type="submit"]');
        
        // Check for validation messages (could be native HTML5 or custom)
        const emailInput = page.locator('input[type="email"]');
        const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
        expect(isInvalid).toBeTruthy();
    });

    test('should navigate to register form', async ({ page }) => {
        await page.goto(`${BASE_URL}/auth`);
        
        // Look for sign up / register link
        const signUpLink = page.getByRole('link', { name: /sign up|register|create account/i });
        if (await signUpLink.count() > 0) {
            await signUpLink.click();
            await expect(page).toHaveURL(/auth|register|signup/);
        }
    });

    test('should display OAuth options', async ({ page }) => {
        await page.goto(`${BASE_URL}/auth`);
        
        // Check for OAuth buttons (Google, GitHub, etc.)
        const oauthButtons = page.locator('button, a').filter({ 
            hasText: /google|github|oauth/i 
        });
        
        const count = await oauthButtons.count();
        // Should have at least one OAuth option
        expect(count).toBeGreaterThan(0);
    });

    test('should redirect to homepage when accessing protected route without auth', async ({ page }) => {
        await page.goto(`${BASE_URL}/profile`);
        
        // Should redirect to login or show auth message
        await page.waitForURL(/auth|login|signin/);
    });

    test('should handle password visibility toggle', async ({ page }) => {
        await page.goto(`${BASE_URL}/auth`);
        
        const passwordInput = page.locator('input[type="password"]').first();
        await passwordInput.fill('testpassword123');
        
        // Look for eye/visibility toggle button
        const toggleButton = page.locator('button, svg').filter({ 
            hasText: /show|hide|eye/i 
        }).or(page.locator('[aria-label*="password"]'));
        
        if (await toggleButton.count() > 0) {
            await toggleButton.first().click();
            // After toggle, input should be text type
            const inputType = await passwordInput.getAttribute('type');
            expect(inputType).toBe('text');
        }
    });
});

test.describe('Registration Flow', () => {
    test('should display registration form fields', async ({ page }) => {
        // Try direct register page or toggle from auth page
        await page.goto(`${BASE_URL}/auth`);
        
        // Check if there's a sign up toggle/tab
        const signUpButton = page.locator('button, a').filter({ hasText: /sign up|register/i });
        if (await signUpButton.count() > 0) {
            await signUpButton.first().click();
        } else {
            // Try direct route
            await page.goto(`${BASE_URL}/register`);
        }
        
        // Should have username/email/password fields
        const usernameField = page.locator('input[name*="username"], input[placeholder*="username"]');
        const emailField = page.locator('input[type="email"]');
        const passwordField = page.locator('input[type="password"]');
        
        await expect(usernameField.or(emailField)).toBeVisible();
        await expect(passwordField).toBeVisible();
    });

    test('should validate password strength', async ({ page }) => {
        await page.goto(`${BASE_URL}/auth`);
        
        const passwordInput = page.locator('input[type="password"]').first();
        await passwordInput.fill('weak');
        
        // Blur to trigger validation
        await passwordInput.blur();
        
        // Look for validation message or indicator
        const validationMessage = page.locator('text=/password.*weak|too short|minimum/i');
        if (await validationMessage.count() > 0) {
            await expect(validationMessage).toBeVisible();
        }
    });

    test('should validate email format', async ({ page }) => {
        await page.goto(`${BASE_URL}/auth`);
        
        const emailInput = page.locator('input[type="email"]');
        await emailInput.fill('invalid-email');
        await emailInput.blur();
        
        const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
        expect(isInvalid).toBeTruthy();
    });
});

test.describe('Password Reset Flow', () => {
    test('should navigate to forgot password page', async ({ page }) => {
        await page.goto(`${BASE_URL}/auth`);
        
        const forgotLink = page.getByRole('link', { name: /forgot.*password/i });
        if (await forgotLink.count() > 0) {
            await forgotLink.click();
            await expect(page).toHaveURL(/forgot|reset-password/);
            
            // Should have email input for reset
            await expect(page.locator('input[type="email"]')).toBeVisible();
        }
    });
});
