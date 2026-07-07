import { type Page } from '@playwright/test';
import { OrderSummaryComponent } from '../components/locators + actions/OrderSummaryComponent';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly summary: OrderSummaryComponent;

  constructor(page: Page) {
    this.page = page;
    this.summary = new OrderSummaryComponent(page);
  }
}