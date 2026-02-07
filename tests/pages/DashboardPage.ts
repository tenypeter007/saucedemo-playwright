import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private readonly userContent: Locator;
  private readonly dashboardTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.userContent = page.locator('[data-testid="user-content"]');
    this.dashboardTitle = page.locator('h1, [data-testid="dashboard-title"]');
  }

  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.dashboardTitle.waitFor({ state: 'visible' });
  }

  async isUserContentVisible(): Promise<boolean> {
    return await this.userContent.isVisible();
  }

  async getDashboardTitle(): Promise<string> {
    return await this.dashboardTitle.textContent() || '';
  }

  async isDashboardLoaded(): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl.includes('/dashboard') || currentUrl.includes('/home');
  }
}