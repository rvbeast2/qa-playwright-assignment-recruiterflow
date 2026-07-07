import { type Page, type Locator, expect } from '@playwright/test';
import { HeaderComponent } from '../components/locators + actions/HeaderComponent';
import { ProductCardComponent } from '../components/locators + actions/ProductCardComponent';

export class CartPage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly cartItemsRoot: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.cartItemsRoot = page.locator('.cart_item');
    this.checkoutButton = page.locator("[data-test='checkout']");
  }

  async getCartItems(): Promise<ProductCardComponent[]> {
    const count = await this.cartItemsRoot.count();
    const items: ProductCardComponent[] = [];
    for (let i = 0; i < count; i++) {
      items.push(new ProductCardComponent(this.cartItemsRoot.nth(i)));
    }
    return items;
  }

  async expectItemCount(count: number) {
    await expect(this.cartItemsRoot).toHaveCount(count);
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}