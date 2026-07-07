import { type Page, type Locator } from '@playwright/test';

export class CheckoutInfoFormComponent {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.firstNameInput = page.locator("[data-test='firstName']");
    this.lastNameInput = page.locator("[data-test='lastName']");
    this.postalCodeInput = page.locator("[data-test='postalCode']");
    this.continueButton = page.locator("[data-test='continue']");
    this.cancelButton = page.locator("[data-test='cancel']");
  }

  async fill(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }
}