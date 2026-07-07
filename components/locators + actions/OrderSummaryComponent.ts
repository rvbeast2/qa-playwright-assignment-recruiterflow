import { type Page, type Locator, expect } from '@playwright/test';

export class OrderSummaryComponent {
  readonly paymentInfoLabel: Locator;
  readonly shippingInfoLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.paymentInfoLabel = page.locator("[data-test='payment-info-label']");
    this.shippingInfoLabel = page.locator("[data-test='shipping-info-label']");
    this.totalLabel = page.locator("[data-test='total-label']");
    this.finishButton = page.locator("[data-test='finish']");
    this.cancelButton = page.locator("[data-test='cancel']");
  }

  async expectVisible() {
    await expect(this.paymentInfoLabel).toBeVisible();
  }

  async finish() {
    await this.finishButton.click();
  }
}