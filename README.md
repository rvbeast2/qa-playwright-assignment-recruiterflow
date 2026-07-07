# QA Take-Home Assignment — Playwright + TypeScript

UI + API test suite covering [saucedemo.com](https://www.saucedemo.com) and
[reqres.in](https://reqres.in), built with a **Page Component Object Model (PCOM)**.

## Install & Run

reqres.in now requires an API key on its `/api/*` endpoints. Get a free one at
https://reqres.in/signup, then set it as an environment variable (don't commit
it to the repo):

```bash
# PowerShell
$env:REQRES_API_KEY="your-key-here"

# bash / zsh
export REQRES_API_KEY="your-key-here"
```

```bash
npm install
npx playwright install --with-deps chromium
npx playwright test
```

```bash
npm run test:ui      # UI tests only
npm run test:api     # API tests only
npm run test:headed  # UI tests with a visible browser
npm run report       # open the last HTML report
```

## Architecture: Page Component Object Model

Instead of one class per page holding every locator, this suite splits reusable
UI widgets into **components**, and lets **pages** compose them:

```
components/          <- reusable widgets, no navigation, no page-level assertions
  LoginFormComponent.ts
  HeaderComponent.ts
  ProductCardComponent.ts
  SortDropdownComponent.ts
  CheckoutInfoFormComponent.ts
  OrderSummaryComponent.ts

pages/                <- own navigation + compose components as properties
  LoginPage.ts
  InventoryPage.ts
  CartPage.ts
  CheckoutStepOnePage.ts
  CheckoutStepTwoPage.ts
  CheckoutCompletePage.ts

tests/
  ui/    login.spec.ts, cart.spec.ts, checkout.spec.ts, sort.spec.ts
  api/   users.spec.ts
```

Why this pays off here specifically:

- **`HeaderComponent`** (cart icon + badge) appears on both `InventoryPage` and
  `CartPage`. It's defined once and reused, so a badge markup change is a
  one-file fix.
- **`ProductCardComponent`** takes a root `Locator` scoped to one `.inventory_item`
  in its constructor. `InventoryPage.getProductCards()` returns an array of these
  by wrapping each card; `CartPage.getCartItems()` reuses the exact same
  component for cart rows, since the name/price markup is shared.
- Things that appear exactly once on exactly one page — like the
  `complete-header` "Thank you for your order!" message — stay as plain
  locators directly on the page object. No component is created just for the
  sake of it.

## Test-to-architecture mapping

| Your original test | Now uses |
|---|---|
| Standard login lands on products page | `LoginPage` -> `LoginFormComponent` -> `InventoryPage` |
| Locked-out user sees error | `LoginPage` -> `LoginFormComponent.expectErrorMessage()` |
| Add 2 products, cart badge = 2 | `InventoryPage.addFirstNProductsToCart()` -> `HeaderComponent.expectCartCount()` |
| Full checkout -> thank-you message | `InventoryPage` -> `CartPage` -> `CheckoutStepOnePage` -> `CheckoutStepTwoPage` -> `CheckoutCompletePage` |
| Sort low->high, first <= second | `InventoryPage.sortDropdown` (`SortDropdownComponent`) -> `getProductCards()` (`ProductCardComponent.getPrice()`) |

All selectors match what was already verified passing (`data-test` attributes
for username/password/login-button, `shopping-cart-badge`, `firstName`/
`lastName`/`postalCode`, `payment-info-label`, `complete-header`, etc.) — the
refactor changes structure, not behavior.

## What I would have done with more time

- Negative/edge-case tests: invalid credentials, checkout with missing fields.
- A `problem_user` regression test (known UI quirks on saucedemo).
- The bonus chained "create-then-verify" API flow (POST -> GET), noted as
  optional in the brief and skipped here to stay within the 2-hour box.
- API schema validation (e.g. `zod`) instead of manual `toHaveProperty` checks.
- A CI workflow (GitHub Actions) to run the suite on push.

## Trade-offs made in the time box

- `ProductCardComponent`'s add/remove button locator matches both
  `add-to-cart-*` and `remove-*` prefixes rather than having two separate
  locators, since only one is ever visible at a time for a given card.
- Kept sorting to the single "low to high" case per the brief.
- Cart page reuses `ProductCardComponent` rather than a separate
  `CartItemComponent`, since the markup for name/price is identical; if cart
  rows grow their own distinct behavior later, splitting it out is a small
  change contained to that one file.