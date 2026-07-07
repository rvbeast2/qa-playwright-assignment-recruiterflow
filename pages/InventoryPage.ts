import { type Page, type Locator, expect } from '@playwright/test';
import { HeaderComponent } from '../components/locators + actions/HeaderComponent';
import { SortDropdownComponent } from '../components/locators + actions/SortDropdownComponent';
import { ProductCardComponent } from '../components/locators + actions/ProductCardComponent';

export class InventoryPage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly sortDropdown: SortDropdownComponent;
  readonly title: Locator;
  readonly productCardsRoot: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.sortDropdown = new SortDropdownComponent(page);
    this.title = page.locator("[data-test='title']");
    this.productCardsRoot = page.locator('.inventory_item');
  }

  async expectLoaded() {
    await expect(this.title).toBeVisible();
  }

  /** Returns every product card currently on the page. */
  async getProductCards(): Promise<ProductCardComponent[]> {
    const count = await this.productCardsRoot.count();
    const cards: ProductCardComponent[] = [];
    for (let i = 0; i < count; i++) {
      cards.push(new ProductCardComponent(this.productCardsRoot.nth(i)));
    }
    return cards;
  }

  /** Returns a single product card matched by its visible name. */
  getProductCardByName(name: string): ProductCardComponent {
    const root = this.productCardsRoot.filter({ hasText: name });
    return new ProductCardComponent(root);
  }

  /** Adds the first `count` product cards to the cart, top to bottom. */
  async addFirstNProductsToCart(count: number) {
    const addButtons = this.page.locator("[data-test^='add-to-cart']");
    for (let i = 0; i < count; i++) {
      await addButtons.nth(i).click();
    }
  }
}