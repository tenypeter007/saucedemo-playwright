import { Page, expect } from '@playwright/test';

export class CommonActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForElement(selector: string, timeout: number = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async clearAndType(selector: string, text: string) {
    await this.page.fill(selector, '');
    await this.page.type(selector, text);
  }

  async clickAndWait(selector: string, waitForSelector?: string) {
    await this.page.click(selector);
    if (waitForSelector) {
      await this.waitForElement(waitForSelector);
    }
  }

  async verifyUrl(expectedUrl: string | RegExp) {
    if (typeof expectedUrl === 'string') {
      await expect(this.page).toHaveURL(expectedUrl);
    } else {
      await expect(this.page).toHaveURL(expectedUrl);
    }
  }

  async verifyTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async refreshPage() {
    await this.page.reload({ waitUntil: 'networkidle' });
  }

  async goBack() {
    await this.page.goBack({ waitUntil: 'networkidle' });
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async hoverElement(selector: string) {
    await this.page.hover(selector);
  }

  async doubleClick(selector: string) {
    await this.page.dblclick(selector);
  }

  async rightClick(selector: string) {
    await this.page.click(selector, { button: 'right' });
  }

  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }

  async uploadFile(selector: string, filePath: string) {
    await this.page.setInputFiles(selector, filePath);
  }

  async selectDropdownOption(selector: string, option: string) {
    await this.page.selectOption(selector, option);
  }

  async checkCheckbox(selector: string) {
    await this.page.check(selector);
  }

  async uncheckCheckbox(selector: string) {
    await this.page.uncheck(selector);
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  async isElementEnabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isEnabled();
  }

  async getElementText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || '';
  }

  async getElementAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.locator(selector).getAttribute(attribute);
  }
}