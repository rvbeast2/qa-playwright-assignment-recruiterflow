import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test('Validate after logging in, add any two products to the cart and validate the cart count', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.loginForm.login('standard_user', 'secret_sauce');
  await inventoryPage.expectLoaded();

  await inventoryPage.addFirstNProductsToCart(2);

  await inventoryPage.header.expectCartCount(2);
});