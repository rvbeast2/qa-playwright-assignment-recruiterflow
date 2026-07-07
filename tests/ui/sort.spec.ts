import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test('Validate sorting the products by price (from low to high) and the first product is the cheapest', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.loginForm.login('standard_user', 'secret_sauce');
  await inventoryPage.expectLoaded();

  await inventoryPage.sortDropdown.sortBy('lohi');

  const cards = await inventoryPage.getProductCards();
  const firstPrice = await cards[0].getPrice();
  const secondPrice = await cards[1].getPrice();

  expect(firstPrice).toBeLessThanOrEqual(secondPrice);
});