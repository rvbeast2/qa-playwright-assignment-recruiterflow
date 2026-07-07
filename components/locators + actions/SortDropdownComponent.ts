import { type Page, type Locator } from '@playwright/test';

type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class SortDropdownComponent {
  readonly dropdown: Locator;

  constructor(page: Page) {
    this.dropdown = page.locator("[data-test='product-sort-container']");
  }

  async sortBy(option: SortOption) {
    await this.dropdown.click();
    await this.dropdown.selectOption(option);
  }
}