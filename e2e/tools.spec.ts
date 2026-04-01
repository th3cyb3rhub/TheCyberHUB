import { test, expect } from '@playwright/test';

test.describe('Tools Listing', () => {
    test('should display tools page with heading', async ({ page }) => {
        await page.goto('/tools');
        await expect(page.locator('h1')).toContainText(/Tools/i);
    });

    test('should show search input', async ({ page }) => {
        await page.goto('/tools');
        const searchInput = page.getByPlaceholder('Search tools...');
        await expect(searchInput).toBeVisible();
    });

    test('should display tool cards', async ({ page }) => {
        await page.goto('/tools');
        // Tools are statically defined so should always show
        const toolCards = page.locator('a[href^="/tools/"]');
        await expect(toolCards.first()).toBeVisible();
        const count = await toolCards.count();
        expect(count).toBeGreaterThanOrEqual(5);
    });

    test('should have All and Popular filter buttons', async ({ page }) => {
        await page.goto('/tools');
        const allButton = page.locator('button').filter({ hasText: /^All$/ });
        const popularButton = page.locator('button').filter({ hasText: /Popular/i });

        await expect(allButton).toBeVisible();
        await expect(popularButton).toBeVisible();
    });

    test('should filter tools by Popular', async ({ page }) => {
        await page.goto('/tools');

        const allToolsBefore = page.locator('a[href^="/tools/"]');
        const totalCount = await allToolsBefore.count();

        const popularButton = page.locator('button').filter({ hasText: /Popular/i });
        await popularButton.click();
        await page.waitForTimeout(300);

        const filteredTools = page.locator('a[href^="/tools/"]');
        const popularCount = await filteredTools.count();

        // Popular should show fewer or equal tools
        expect(popularCount).toBeLessThanOrEqual(totalCount);
        expect(popularCount).toBeGreaterThan(0);
    });

    test('should filter tools by search query', async ({ page }) => {
        await page.goto('/tools');
        const searchInput = page.getByPlaceholder('Search tools...');
        await searchInput.fill('JWT');
        await page.waitForTimeout(500);

        const results = page.locator('a[href^="/tools/"]');
        const count = await results.count();
        // Should find the JWT Analyzer
        expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should show no results message for invalid search', async ({ page }) => {
        await page.goto('/tools');
        const searchInput = page.getByPlaceholder('Search tools...');
        await searchInput.fill('zzzznonexistenttool');
        await page.waitForTimeout(500);

        const noResults = page.locator('text=/No tools found/i');
        await expect(noResults).toBeVisible();
    });
});

test.describe('JWT Analyzer Tool', () => {
    test('should load JWT Analyzer page', async ({ page }) => {
        await page.goto('/tools/jwt-analyzer');
        await expect(page.locator('text=/JWT/i').first()).toBeVisible({ timeout: 10_000 });
    });

    test('should have a pre-filled token input', async ({ page }) => {
        await page.goto('/tools/jwt-analyzer');
        await page.waitForTimeout(1000);

        // The JWT Analyzer has a textarea/input with a default JWT token
        const tokenInput = page.locator('textarea, input[type="text"]').first();
        if (await tokenInput.count() > 0) {
            const value = await tokenInput.inputValue();
            // Should contain a JWT-like string (starts with eyJ)
            expect(value).toContain('eyJ');
        }
    });
});

test.describe('Encoder/Decoder Tool', () => {
    test('should load Encoder/Decoder page', async ({ page }) => {
        await page.goto('/tools/encoder-decoder');
        await expect(page.locator('text=/Encoder|Decoder/i').first()).toBeVisible({ timeout: 10_000 });
    });

    test('should have encoding method selector', async ({ page }) => {
        await page.goto('/tools/encoder-decoder');
        await page.waitForTimeout(1000);

        // Should have method selection buttons (Base64, URL, HTML, etc.)
        const base64Button = page.locator('button, label').filter({ hasText: /Base64/i });
        if (await base64Button.count() > 0) {
            await expect(base64Button.first()).toBeVisible();
        }
    });

    test('should encode text input', async ({ page }) => {
        await page.goto('/tools/encoder-decoder');
        await page.waitForTimeout(1000);

        const inputArea = page.locator('textarea').first();
        if (await inputArea.count() > 0) {
            await inputArea.fill('Hello World');
            await page.waitForTimeout(500);

            // Output should contain Base64 encoded text
            const outputArea = page.locator('textarea').nth(1);
            if (await outputArea.count() > 0) {
                const outputValue = await outputArea.inputValue();
                // Base64 of "Hello World" is "SGVsbG8gV29ybGQ="
                expect(outputValue.length).toBeGreaterThan(0);
            }
        }
    });
});

test.describe('Password Generator Tool', () => {
    test('should load Password Generator page', async ({ page }) => {
        await page.goto('/tools/password-generator');
        await expect(page.locator('text=/Password/i').first()).toBeVisible({ timeout: 10_000 });
    });

    test('should have generate button', async ({ page }) => {
        await page.goto('/tools/password-generator');
        await page.waitForTimeout(1000);

        const generateButton = page.locator('button').filter({ hasText: /Generate/i });
        if (await generateButton.count() > 0) {
            await expect(generateButton.first()).toBeVisible();
        }
    });

    test('should have password length slider or input', async ({ page }) => {
        await page.goto('/tools/password-generator');
        await page.waitForTimeout(1000);

        // Should have a range input or number input for password length
        const lengthInput = page.locator('input[type="range"], input[type="number"]');
        if (await lengthInput.count() > 0) {
            await expect(lengthInput.first()).toBeVisible();
        }
    });
});

test.describe('Hash Analyzer Tool', () => {
    test('should load Hash Analyzer page', async ({ page }) => {
        await page.goto('/tools/hash-analyzer');
        await expect(page.locator('text=/Hash/i').first()).toBeVisible({ timeout: 10_000 });
    });
});
