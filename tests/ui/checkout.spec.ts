import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';

test('validate after logging in, complete the checkout process and validate the order confirmation page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOne = new CheckoutStepOnePage(page);
  const checkoutStepTwo = new CheckoutStepTwoPage(page);
  const checkoutComplete = new CheckoutCompletePage(page);

  await loginPage.goto();
  await loginPage.loginForm.login('standard_user', 'secret_sauce');
  await inventoryPage.expectLoaded();

  await inventoryPage.addFirstNProductsToCart(2);
  await inventoryPage.header.expectCartCount(2);

  await inventoryPage.header.goToCart();
  await cartPage.goToCheckout();

  await checkoutStepOne.expectLoaded();
  await checkoutStepOne.infoForm.fill('Test', 'User', '12345');
  await checkoutStepOne.infoForm.continueToOverview();

  await checkoutStepTwo.summary.expectVisible();
  await checkoutStepTwo.summary.finish();

  await checkoutComplete.expectOrderComplete();
});