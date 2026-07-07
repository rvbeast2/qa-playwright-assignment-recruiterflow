import { type Page, type Locator, expect } from '@playwright/test';

export class LoginFormComponent {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("[data-test='username']");
    this.passwordInput = page.locator("[data-test='password']");
    this.loginButton = page.locator("[data-test='login-button']");
    this.errorBanner = page.getByText(/Epic sadface:/);
  }

  async expectVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectErrorMessage(text: string | RegExp) {
    await expect(this.page.getByText(text)).toBeVisible();
  }
}