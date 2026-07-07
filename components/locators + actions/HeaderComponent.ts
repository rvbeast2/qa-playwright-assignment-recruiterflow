import { type Page, type Locator, expect } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly burgerMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator("[data-test='shopping-cart-link']");
    this.cartBadge = page.locator("[data-test='shopping-cart-badge']");
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}