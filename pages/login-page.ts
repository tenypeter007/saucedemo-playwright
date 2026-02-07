import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly errorMessage: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username, [name="username"], [data-testid="username"]');
    this.passwordInput = page.locator('#password, [name="password"], [data-testid="password"]');
    this.loginButton = page.locator('button[type="submit"], #login-button, [data-testid="login-button"]');
    this.rememberMeCheckbox = page.locator('#remember-me, [name="remember"], [data-testid="remember-me"]');
    this.errorMessage = page.locator('.error-message, .alert-danger, [data-testid="error-message"]');
    this.pageTitle = page.locator('h1, .page-title, [data-testid="page-title"]');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async checkRememberMe() {
    await this.rememberMeCheckbox.check();
  }

  async uncheckRememberMe() {
    await this.rememberMeCheckbox.uncheck();
  }

  async login(username: string, password: string, rememberMe: boolean = false) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    if (rememberMe) {
      await this.checkRememberMe();
    }
    await this.clickLoginButton();
  }

  async verifyLoginPageDisplayed() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async verifyErrorMessage(expectedMessage?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.errorMessage).toContainText(expectedMessage);
    }
  }

  async verifyPasswordMasked() {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }

  async verifyRememberMeChecked() {
    await expect(this.rememberMeCheckbox).toBeChecked();
  }

  async verifyRememberMeUnchecked() {
    await expect(this.rememberMeCheckbox).not.toBeChecked();
  }

  async verifyUsernameValue(expectedValue: string) {
    await expect(this.usernameInput).toHaveValue(expectedValue);
  }

  async verifyPasswordValue(expectedValue: string) {
    await expect(this.passwordInput).toHaveValue(expectedValue);
  }

  async verifyEmptyFields() {
    await expect(this.usernameInput).toHaveValue('');
    await expect(this.passwordInput).toHaveValue('');
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async typePasswordCharacters(password: string) {
    await this.passwordInput.click();
    for (const char of password) {
      await this.passwordInput.type(char, { delay: 100 });
    }
  }
}