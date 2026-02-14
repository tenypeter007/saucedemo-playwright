import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('User Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC001 - Verify user can login with valid credentials', async ({ page }) => {
    await expect(loginPage.usernameField).toBeVisible();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('TC002 - Verify error with invalid username', async ({ page }) => {
    await loginPage.login('invalid_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('TC003 - Verify error with invalid password', async ({ page }) => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('TC004 - Verify error with empty username', async ({ page }) => {
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('TC005 - Verify error with empty password', async ({ page }) => {
    await loginPage.login('standard_user', '');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });
}
