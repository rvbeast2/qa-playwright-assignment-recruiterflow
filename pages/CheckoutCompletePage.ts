import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.completeHeader = page.locator("[data-test='complete-header']");
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}