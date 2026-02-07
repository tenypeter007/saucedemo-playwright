import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { testData, errorMessages } from './testdata';

test.describe('User Login Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('TC001: Verify user can login with valid credentials', async ({ page }) => {
    // Step 1: Verify login page displays
    await loginPage.verifyLoginPageDisplayed();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.validUser.username);
    await loginPage.verifyUsernameValue(testData.validUser.username);

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.validUser.password);
    await loginPage.verifyPasswordMasked();

    // Step 4: Click login button
    await loginPage.clickLoginButton();

    // Step 5: Verify dashboard page is displayed
    await dashboardPage.verifyDashboardDisplayed();
    await dashboardPage.verifyUserDataLoaded();
  });

  test('TC002: Verify login fails with invalid username', async ({ page }) => {
    // Step 1: Verify login page displays
    await loginPage.verifyLoginPageDisplayed();

    // Step 2: Enter invalid username
    await loginPage.fillUsername(testData.invalidUser.username);
    await loginPage.verifyUsernameValue(testData.invalidUser.username);

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.invalidUser.password);
    await loginPage.verifyPasswordMasked();

    // Step 4: Click login button
    await loginPage.clickLoginButton();

    // Step 5: Verify error message is displayed
    await loginPage.verifyErrorMessage();

    // Step 6: Verify user remains on login page
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('login');
  });

  test('TC003: Verify login fails with invalid password', async ({ page }) => {
    // Step 1: Verify login page displays
    await loginPage.verifyLoginPageDisplayed();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.invalidPassword.username);
    await loginPage.verifyUsernameValue(testData.invalidPassword.username);

    // Step 3: Enter invalid password
    await loginPage.fillPassword(testData.invalidPassword.password);
    await loginPage.verifyPasswordMasked();

    // Step 4: Click login button
    await loginPage.clickLoginButton();

    // Step 5: Verify error message is displayed
    await loginPage.verifyErrorMessage();

    // Step 6: Verify user remains on login page
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('login');
  });

  test('TC004: Verify login fails with empty username field', async ({ page }) => {
    // Step 1: Verify login page displays
    await loginPage.verifyLoginPageDisplayed();

    // Step 2: Leave username field empty (verify it's empty)
    await loginPage.verifyUsernameValue('');

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.emptyUsername.password);
    await loginPage.verifyPasswordMasked();

    // Step 4: Click login button
    await loginPage.clickLoginButton();

    // Step 5: Verify error message is displayed
    await loginPage.verifyErrorMessage();

    // Step 6: Verify user remains on login page
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('login');
  });

  test('TC005: Verify login fails with empty password field', async ({ page }) => {
    // Step 1: Verify login page displays
    await loginPage.verifyLoginPageDisplayed();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.emptyPassword.username);
    await loginPage.verifyUsernameValue(testData.emptyPassword.username);

    // Step 3: Leave password field empty (verify it's empty)
    await loginPage.verifyPasswordValue('');

    // Step 4: Click login button
    await loginPage.clickLoginButton();

    // Step 5: Verify error message is displayed
    await loginPage.verifyErrorMessage();

    // Step 6: Verify user remains on login page
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('login');
  });

  test('TC006: Verify login fails with both empty fields', async ({ page }) => {
    // Step 1: Verify login page displays
    await loginPage.verifyLoginPageDisplayed();

    // Step 2 & 3: Verify both fields are empty
    await loginPage.verifyEmptyFields();

    // Step 4: Click login button
    await loginPage.clickLoginButton();

    // Step 5: Verify error message is displayed
    await loginPage.verifyErrorMessage();

    // Step 6: Verify user remains on login page
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('login');
  });

  test('TC007: Verify password masking functionality', async ({ page }) => {
    // Step 1: Verify login page displays
    await loginPage.verifyLoginPageDisplayed();

    // Step 2: Click in password field
    await loginPage.passwordInput.click();
    await expect(loginPage.passwordInput).toBeFocused();

    // Step 3 & 4: Type characters and verify masking
    await loginPage.typePasswordCharacters(testData.passwordMaskingTest.password);

    // Step 5: Verify password field content is masked
    await loginPage.verifyPasswordMasked();
    await loginPage.verifyPasswordValue(testData.passwordMaskingTest.password);
  });
});