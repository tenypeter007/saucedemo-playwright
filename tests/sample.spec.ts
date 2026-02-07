import { test, expect } from '@playwright/test';
import { SamplePage } from '../pages/sample-page';

test('Sample test - verify login page loads', async ({ page }) => {
    const samplePage = new SamplePage(page);
    
    await samplePage.navigateToHome();
    
    // Verify login button is visible
    const loginButton = page.locator('#login-button');
    await expect(loginButton).toBeVisible();
});
