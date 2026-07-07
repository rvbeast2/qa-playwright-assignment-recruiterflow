import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test('Validate a User can login and land on the products page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.loginForm.expectVisible();
  await loginPage.loginForm.login('standard_user', 'secret_sauce');

  await inventoryPage.expectLoaded();
});

test("Validate a Locked-out user can't login and sees the correct error message", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginForm.expectVisible();
  await loginPage.loginForm.login('locked_out_user', 'secret_sauce');

  await loginPage.loginForm.expectErrorMessage('Epic sadface: Sorry, this user has been locked out.');
});