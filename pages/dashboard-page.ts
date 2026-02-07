import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly userProfile: Locator;
  readonly welcomeMessage: Locator;
  readonly navigationMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h1, .page-title, [data-testid="dashboard-title"]');
    this.userProfile = page.locator('.user-profile, [data-testid="user-profile"]');
    this.welcomeMessage = page.locator('.welcome-message, [data-testid="welcome-message"]');
    this.navigationMenu = page.locator('.nav-menu, [data-testid="navigation-menu"]');
  }

  async verifyDashboardDisplayed() {
    await expect(this.page).toHaveURL(/.*dashboard.*/);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserDataLoaded() {
    await expect(this.userProfile).toBeVisible();
    await expect(this.welcomeMessage).toBeVisible();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}