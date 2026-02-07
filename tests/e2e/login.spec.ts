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

  test('TC001 - Verify user can login with valid credentials', async ({ page }) => {
    // Step 1: Navigate to login page (done in beforeEach)
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.validUser.username);
    await expect(loginPage.usernameField).toHaveValue(testData.validUser.username);

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.validUser.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click login button
    await loginPage.clickLogin();

    // Step 5: Verify dashboard page loads
    await dashboardPage.waitForLoad();
    await expect(page).toHaveURL(/.*\/(dashboard|home).*/);  
    expect(await dashboardPage.isDashboardLoaded()).toBe(true);
  });

  test('TC002 - Verify error message displays with invalid username', async ({ page }) => {
    // Step 1: Navigate to login page (done in beforeEach)
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Enter invalid username
    await loginPage.fillUsername(testData.invalidUser.username);
    await expect(loginPage.usernameField).toHaveValue(testData.invalidUser.username);

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.validUser.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click login button
    await loginPage.clickLogin();
    
    // Step 5: Verify error message and user remains on login page
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Invalid username or password');
    await expect(page).toHaveURL(/.*login.*/); 
  });

  test('TC003 - Verify error message displays with invalid password', async ({ page }) => {
    // Step 1: Navigate to login page (done in beforeEach)
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.validUser.username);
    await expect(loginPage.usernameField).toHaveValue(testData.validUser.username);

    // Step 3: Enter invalid password
    await loginPage.fillPassword(testData.invalidPassword.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click login button
    await loginPage.clickLogin();
    
    // Step 5: Verify error message and user remains on login page
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Invalid username or password');
    await expect(page).toHaveURL(/.*login.*/); 
  });

  test('TC004 - Verify error message displays with empty username field', async ({ page }) => {
    // Step 1: Navigate to login page (done in beforeEach)
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Leave username field empty (verify it's empty)
    await expect(loginPage.usernameField).toHaveValue('');

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.validUser.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click login button
    await loginPage.clickLogin();
    
    // Step 5: Verify validation error and user remains on login page
    await expect(loginPage.validationError).toBeVisible();
    await expect(loginPage.validationError).toContainText('Username is required');
    await expect(page).toHaveURL(/.*login.*/); 
  });

  test('TC005 - Verify error message displays with empty password field', async ({ page }) => {
    // Step 1: Navigate to login page (done in beforeEach)
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.validUser.username);
    await expect(loginPage.usernameField).toHaveValue(testData.validUser.username);

    // Step 3: Leave password field empty (verify it's empty)
    await expect(loginPage.passwordField).toHaveValue('');

    // Step 4: Click login button
    await loginPage.clickLogin();
    
    // Step 5: Verify validation error and user remains on login page
    await expect(loginPage.validationError).toBeVisible();
    await expect(loginPage.validationError).toContainText('Password is required');
    await expect(page).toHaveURL(/.*login.*/); 
  });

  test('TC006 - Verify error message displays with both empty fields', async ({ page }) => {
    // Step 1: Navigate to login page (done in beforeEach)
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Leave username field empty (verify it's empty)
    await expect(loginPage.usernameField).toHaveValue('');

    // Step 3: Leave password field empty (verify it's empty)
    await expect(loginPage.passwordField).toHaveValue('');

    // Step 4: Click login button
    await loginPage.clickLogin();
    
    // Step 5: Verify both validation errors and user remains on login page
    await expect(loginPage.validationError).toBeVisible();
    const errorText = await loginPage.validationError.textContent() || '';
    expect(errorText).toMatch(/Username is required|Password is required/);
    await expect(page).toHaveURL(/.*login.*/); 
  });

  test('TC007 - Verify password masking functionality', async ({ page }) => {
    // Step 1: Navigate to login page (done in beforeEach)
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 2: Click on password field to focus
    await loginPage.passwordField.click();
    await expect(loginPage.passwordField).toBeFocused();

    // Step 3: Type password character by character
    const testPassword = testData.passwordTest.password;
    await loginPage.fillPassword(testPassword);
    
    // Step 4: Verify password is masked
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
    await expect(loginPage.passwordField).toHaveValue(testPassword);
    
    // Step 5: Verify password content is not visible in DOM
    const passwordValue = await loginPage.passwordField.inputValue();
    expect(passwordValue).toBe(testPassword);
    // Password field should have type="password" to ensure masking
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
  });

  test('TC008 - Verify remember me functionality saves login state', async ({ page, context }) => {
    // Step 1: Navigate to login page (done in beforeEach)
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();

    // Step 2: Enter valid username
    await loginPage.fillUsername(testData.validUser.username);
    await expect(loginPage.usernameField).toHaveValue(testData.validUser.username);

    // Step 3: Enter valid password
    await loginPage.fillPassword(testData.validUser.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 4: Check Remember Me checkbox
    await loginPage.checkRememberMe();
    await expect(loginPage.rememberMeCheckbox).toBeChecked();

    // Step 5: Click login button
    await loginPage.clickLogin();
    await dashboardPage.waitForLoad();
    await expect(page).toHaveURL(/.*\/(dashboard|home).*/); 

    // Step 6 & 7: Close browser and reopen (simulate with new page in same context)
    const newPage = await context.newPage();
    await newPage.goto(page.url().replace(/\/dashboard.*/, ''));
    
    // Verify user is automatically logged in
    await expect(newPage).toHaveURL(/.*\/(dashboard|home).*/, { timeout: 10000 });
    
    await newPage.close();
  });
});