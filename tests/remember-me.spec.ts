import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { testData } from './testdata';

test.describe('Remember Me Functionality Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('TC008: Verify remember me functionality when checked', async ({ page, context }) => {
    // Step 1: Verify login page displays with remember me checkbox
    await loginPage.verifyLoginPageDisplayed();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.validUser.username);
    await loginPage.verifyUsernameValue(testData.validUser.username);

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.validUser.password);
    await loginPage.verifyPasswordMasked();

    // Step 4: Check the 'Remember Me' checkbox
    await loginPage.checkRememberMe();
    await loginPage.verifyRememberMeChecked();

    // Step 5: Click login button
    await loginPage.clickLoginButton();
    await dashboardPage.verifyDashboardDisplayed();

    // Step 6: Close browser context and create new one to simulate browser restart
    await context.close();
    const newContext = await page.context().browser()?.newContext();
    if (newContext) {
      const newPage = await newContext.newPage();
      const newLoginPage = new LoginPage(newPage);
      await newLoginPage.navigate();
      
      // Check if username is pre-populated or user is still logged in
      try {
        // Try to check if redirected to dashboard (still logged in)
        await expect(newPage).toHaveURL(/.*dashboard.*/, { timeout: 5000 });
      } catch {
        // If not redirected, check if username is pre-populated
        await expect(newLoginPage.usernameInput).toHaveValue(testData.validUser.username);
      }
      
      await newContext.close();
    }
  });

  test('TC009: Verify remember me functionality when unchecked', async ({ page, context }) => {
    // Step 1: Verify login page displays with remember me checkbox
    await loginPage.verifyLoginPageDisplayed();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.validUser.username);
    await loginPage.verifyUsernameValue(testData.validUser.username);

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.validUser.password);
    await loginPage.verifyPasswordMasked();

    // Step 4: Ensure 'Remember Me' checkbox is unchecked
    await loginPage.uncheckRememberMe();
    await loginPage.verifyRememberMeUnchecked();

    // Step 5: Click login button
    await loginPage.clickLoginButton();
    await dashboardPage.verifyDashboardDisplayed();

    // Step 6: Close browser context and create new one to simulate browser restart
    await context.close();
    const newContext = await page.context().browser()?.newContext();
    if (newContext) {
      const newPage = await newContext.newPage();
      const newLoginPage = new LoginPage(newPage);
      await newLoginPage.navigate();
      
      // Verify login page displays with empty fields
      await newLoginPage.verifyLoginPageDisplayed();
      await newLoginPage.verifyEmptyFields();
      
      // Verify user is not automatically logged in
      const currentUrl = await newLoginPage.getCurrentUrl();
      expect(currentUrl).toContain('login');
      
      await newContext.close();
    }
  });
});