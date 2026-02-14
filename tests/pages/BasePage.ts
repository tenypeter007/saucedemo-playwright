import { Page } from '@playwright/test';

export class BasePage {
  baseUrl: string;

  constructor(public page: Page, baseUrl: string = 'https://www.saucedemo.com/') {
    this.baseUrl = baseUrl;
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }
}
