import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Selectors
  private readonly dashboardContainer = '[data-test="dashboard"], .dashboard, #dashboard, main';
  private readonly userContent = '[data-test="user-content"], .user-content, .welcome';
  private readonly navigationMenu = '[data-test="navigation"], .nav, nav, .sidebar';

  // Methods
  async verifyDashboardLoaded(): Promise<void> {
    await expect(this.page.locator(this.dashboardContainer)).toBeVisible();
  }

  async verifyUserContentVisible(): Promise<void> {
    await expect(this.page.locator(this.userContent)).toBeVisible();
  }

  async verifyNavigationVisible(): Promise<void> {
    await expect(this.page.locator(this.navigationMenu)).toBeVisible();
  }

  async isDashboardPage(): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.dashboardContainer, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}