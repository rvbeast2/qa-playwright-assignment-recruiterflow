import { type Page, expect } from '@playwright/test';
import { LoginFormComponent } from '../components/locators + actions/LoginFormComponent';

export class LoginPage {
  readonly page: Page;
  readonly loginForm: LoginFormComponent;

  constructor(page: Page) {
    this.page = page;
    this.loginForm = new LoginFormComponent(page);
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }
}