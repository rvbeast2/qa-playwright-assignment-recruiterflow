import { type Locator } from '@playwright/test';

export class ProductCardComponent {
  readonly root: Locator;
  readonly nameText: Locator;
  readonly priceText: Locator;
  readonly addRemoveButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.nameText = root.locator('.inventory_item_name');
    this.priceText = root.locator('.inventory_item_price');
    this.addRemoveButton = root.locator("[data-test^='add-to-cart'], [data-test^='remove']");
  }

  async getName(): Promise<string> {
    return (await this.nameText.textContent()) ?? '';
  }

  async getPrice(): Promise<number> {
    const text = (await this.priceText.textContent()) ?? '0';
    return parseFloat(text.replace('$', ''));
  }

  async addToCart() {
    await this.addRemoveButton.click();
  }

  async removeFromCart() {
    await this.addRemoveButton.click();
  }
}