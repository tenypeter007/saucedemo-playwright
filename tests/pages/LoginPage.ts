import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";
import { LoginFormComponent } from "../components/LoginFormComponent";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{

  readonly formComponent: LoginFormComponent;
  readonly locatorUserNameList: Locator;
  readonly locatorPasswordList: Locator;
  readonly rememberMeCheckbox: Locator;

  readonly acceptedUsernames = 'Accepted usernames are:standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user';
  readonly passwordForAll = 'Password for all users:secret_sauce';

  constructor(page: Page) {
    super(page, "/");    

    this.formComponent = new LoginFormComponent(this.page);
    this.locatorUserNameList = this.page.locator('#login_credentials');
    this.locatorPasswordList = this.page.locator('div.login_password');
    this.rememberMeCheckbox = this.page.locator('input[type="checkbox"]');
  }

  // Expose form component properties for easier access in tests
  get usernameField(): Locator {
    return this.formComponent.locatorUsernameInput;
  }

  get passwordField(): Locator {
    return this.formComponent.locatorPasswordInput;
  }

  get loginButton(): Locator {
    return this.formComponent.locatorSubmitButton;
  }

  get errorMessage(): Locator {
    return this.formComponent.errorComponent.locatorMessage;
  }

  get validationError(): Locator {
    return this.formComponent.errorComponent.locatorMessage;
  }

  // Navigation method
  navigate = async () => {
    await this.visit();
  }

  // Fill methods for individual fields
  fillUsername = async (username: string) => {
    await this.usernameField.fill(username);
  }

  fillPassword = async (password: string) => {
    await this.passwordField.fill(password);
  }

  // Click login button
  clickLogin = async () => {
    await this.loginButton.click();
  }

  // Check remember me checkbox
  checkRememberMe = async () => {
    await this.rememberMeCheckbox.check();
  }

  validateDefaultLayout = async () => {
    await expect(this.page.getByText('Swag Labs')).toBeVisible();

    await expect(this.locatorUserNameList).toBeVisible();
    await expect(this.locatorUserNameList).toContainText(this.acceptedUsernames);
    await expect(this.locatorPasswordList).toBeVisible();
    await expect(this.locatorPasswordList).toContainText(this.passwordForAll);

    await this.formComponent.validateDefaultLayout();
  }

  validateErrorLayout = async () => {
    await expect(this.page.getByText('Swag Labs')).toBeVisible();
    
    await expect(this.locatorUserNameList).toBeVisible();
    await expect(this.locatorUserNameList).toContainText(this.acceptedUsernames);
    await expect(this.locatorPasswordList).toBeVisible();
    await expect(this.locatorPasswordList).toContainText(this.passwordForAll);
    
    await this.formComponent.validateErrorLayout();
  }
}