import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private readonly userContent: Locator;
  private readonly dashboardTitle: Locator;

  constructor(page: Page) {
    super(page, '/inventory');
    this.userContent = page.locator('[data-testid="inventory"], .inventory');
    this.dashboardTitle = page.locator('.inventory_list, h1');
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
    return currentUrl.includes('/inventory');
  }

  async validateDefaultLayout(): Promise<void> {
    await this.waitForLoad();
    const isLoaded = await this.isDashboardLoaded();
    if (!isLoaded) {
      throw new Error('Dashboard is not loaded');
    }
  }
}