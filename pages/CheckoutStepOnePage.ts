import { type Page, type Locator, expect } from '@playwright/test';
import { CheckoutInfoFormComponent } from '../components/locators + actions/CheckoutInfoFormComponent';

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly infoForm: CheckoutInfoFormComponent;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.infoForm = new CheckoutInfoFormComponent(page);
    this.title = page.locator("[data-test='title']");
  }

  async expectLoaded() {
    await expect(this.title).toBeVisible();
  }
}