import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { testData } from '../testdata';

test.describe('User Login Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('TC001: Verify user can login with valid credentials', async ({ page }) => {
    // Step 1: Navigate to login page (done in beforeEach)
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.users.validUser.username);
    await expect(loginPage.usernameField).toHaveValue(testData.users.validUser.username);

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.users.validUser.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click login button
    await loginPage.clickLogin();

    // Step 5: Verify dashboard page loads
    await dashboardPage.verifyDashboardLoaded();
    await dashboardPage.verifyUserContentVisible();
    await dashboardPage.verifyNavigationVisible();
  });

  test('TC002: Verify login fails with invalid username', async ({ page }) => {
    // Step 1: Login page is visible
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Enter invalid username
    await loginPage.fillUsername(testData.users.invalidUser.username);
    await expect(loginPage.usernameField).toHaveValue(testData.users.invalidUser.username);

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.users.invalidUser.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click login button
    await loginPage.clickLogin();

    // Step 5: Verify error message and remain on login page
    await loginPage.verifyErrorMessage();
    await expect(loginPage.usernameField).toBeVisible();
  });

  test('TC003: Verify login fails with invalid password', async ({ page }) => {
    // Step 1: Login page is visible
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.users.validUserInvalidPassword.username);
    await expect(loginPage.usernameField).toHaveValue(testData.users.validUserInvalidPassword.username);

    // Step 3: Enter invalid password
    await loginPage.fillPassword(testData.users.validUserInvalidPassword.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click login button
    await loginPage.clickLogin();

    // Step 5: Verify error message and remain on login page
    await loginPage.verifyErrorMessage();
    await expect(loginPage.usernameField).toBeVisible();
  });

  test('TC004: Verify login validation with empty username field', async ({ page }) => {
    // Step 1: Login page is visible
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Leave username field empty
    await expect(loginPage.usernameField).toHaveValue('');

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.users.emptyUsername.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click login button
    await loginPage.clickLogin();

    // Step 5: Verify validation error and remain on login page
    await loginPage.verifyValidationError();
    await expect(loginPage.usernameField).toBeVisible();
  });

  test('TC005: Verify login validation with empty password field', async ({ page }) => {
    // Step 1: Login page is visible
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.users.emptyPassword.username);
    await expect(loginPage.usernameField).toHaveValue(testData.users.emptyPassword.username);

    // Step 3: Leave password field empty
    await expect(loginPage.passwordField).toHaveValue('');

    // Step 4: Click login button
    await loginPage.clickLogin();

    // Step 5: Verify validation error and remain on login page
    await loginPage.verifyValidationError();
    await expect(loginPage.usernameField).toBeVisible();
  });

  test('TC006: Verify login validation with both empty fields', async ({ page }) => {
    // Step 1: Login page is visible
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Leave username field empty
    await expect(loginPage.usernameField).toHaveValue('');

    // Step 3: Leave password field empty
    await expect(loginPage.passwordField).toHaveValue('');

    // Step 4: Click login button
    await loginPage.clickLogin();

    // Step 5: Verify validation errors and remain on login page
    await loginPage.verifyValidationError();
    await expect(loginPage.usernameField).toBeVisible();
  });
});