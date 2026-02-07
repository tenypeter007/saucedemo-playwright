import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { testData } from '../testdata';

test.describe('Login UI Functionality Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('TC007: Verify password masking functionality', async ({ page }) => {
    // Step 1: Login page is visible
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Click in password field to focus
    await loginPage.passwordField.click();
    await expect(loginPage.passwordField).toBeFocused();

    // Step 3: Type characters in password field
    await loginPage.fillPassword(testData.passwords.testPassword);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Verify password is fully masked
    await expect(loginPage.passwordField).toHaveValue(testData.passwords.testPassword);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 5: Check context menu restrictions (password field should not reveal content)
    await loginPage.passwordField.click({ button: 'right' });
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
  });

  test('TC008: Verify remember me functionality when checked', async ({ page, context }) => {
    // Step 1: Login page displays with remember me checkbox
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.users.validUser.username);
    await expect(loginPage.usernameField).toHaveValue(testData.users.validUser.username);

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.users.validUser.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Check remember me checkbox
    await loginPage.checkRememberMe();
    await expect(loginPage.rememberMeCheckbox).toBeChecked();

    // Step 5: Click login button
    await loginPage.clickLogin();
    await dashboardPage.verifyDashboardLoaded();

    // Step 6: Close and reopen browser, check if remembered
    await page.close();
    const newPage = await context.newPage();
    const newLoginPage = new LoginPage(newPage);
    await newLoginPage.navigate();
    
    // Check if username is pre-filled or user is redirected to dashboard
    const isOnDashboard = await newLoginPage.page.url().includes('dashboard');
    if (!isOnDashboard) {
      const usernameValue = await newLoginPage.usernameField.inputValue();
      expect(usernameValue).toBeTruthy();
    }
  });

  test('TC009: Verify remember me functionality when unchecked', async ({ page, context }) => {
    // Step 1: Login page displays with remember me checkbox
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.users.validUser.username);
    await expect(loginPage.usernameField).toHaveValue(testData.users.validUser.username);

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.users.validUser.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Ensure remember me checkbox is unchecked
    await loginPage.uncheckRememberMe();
    await expect(loginPage.rememberMeCheckbox).not.toBeChecked();

    // Step 5: Click login button
    await loginPage.clickLogin();
    await dashboardPage.verifyDashboardLoaded();

    // Step 6: Close and reopen browser, verify fields are empty
    await page.close();
    const newPage = await context.newPage();
    const newLoginPage = new LoginPage(newPage);
    await newLoginPage.navigate();
    
    // Verify login page displays with empty fields
    await expect(newLoginPage.usernameField).toBeVisible();
    await expect(newLoginPage.usernameField).toHaveValue('');
    await expect(newLoginPage.passwordField).toHaveValue('');
  });
});