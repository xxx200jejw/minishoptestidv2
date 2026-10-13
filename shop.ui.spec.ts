
import { test, expect } from './fixtures';

// UI-01 · REQ-UI-01 · all products are displayed
test('UI-01 products page shows all six products', async ({ shop }) => {
  await expect(shop.productsHeading()).toBeVisible();
  await expect(shop.products()).toHaveCount(6);
  await expect(shop.resultCount()).toHaveText('6 products');
});

// UI-02 · REQ-UI-02 · search filters product names
test('UI-02 searching Mouse shows Wireless Mouse', async ({ shop }) => {
  await shop.search('Mouse');
  await expect(shop.products()).toHaveCount(1);
  await expect(shop.products()).toContainText('Wireless Mouse');
  await expect(shop.resultCount()).toHaveText('1 products');
});

// UI-03 · REQ-UI-02 · search ignores letter case
test('UI-03 lowercase search finds Wireless Mouse', async ({ shop }) => {
  await shop.search('mouse');
  await expect(shop.products()).toHaveCount(1);
  await expect(shop.products()).toContainText('Wireless Mouse');
});

// UI-04 · REQ-UI-03 · adding a product updates the cart badge
test('UI-04 adding a product updates cart count', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await expect(shop.cartCount()).toHaveText('1');
});

// UI-05 · REQ-UI-04 · one item has the correct total
test('UI-05 cart shows one row and the correct total', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.openCart();
  await expect(shop.cartHeading()).toBeVisible();
  await expect(shop.cartRows()).toHaveCount(1);
  await expect(shop.cartTotal()).toHaveText('39.00 €');
});

// UI-06 · REQ-UI-04 · quantity two doubles the total
test('UI-06 quantity two doubles the cart total', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.add('USB-C Hub');
  await shop.openCart();
  await expect(shop.quantity('USB-C Hub')).toHaveValue('2');
  await expect(shop.lineTotal('USB-C Hub')).toHaveText('78.00 €');
  await expect(shop.cartTotal()).toHaveText('78.00 €');
});

// UI-07 · REQ-UI-05 · removing the only item empties the cart
test('UI-07 removing an item empties the cart', async ({ shop }) => {
  await shop.add('Webcam HD');
  await shop.openCart();
  await shop.remove('Webcam HD');
  await expect(shop.cartEmpty()).toHaveText('Your basket is empty');
  await expect(shop.cartCount()).toHaveText('0');
});

// UI-08 · REQ-UI-06 · empty checkout shows all validation errors
test('UI-08 empty checkout shows three validation errors', async ({ shop }) => {
  await shop.openCart();
  await shop.placeOrder();
  await expect(shop.nameError()).toHaveText('Enter your full name');
  await expect(shop.emailError()).toHaveText('Enter a valid email address');
  await expect(shop.addressError()).toHaveText('Enter a delivery address');
});

// UI-09 · REQ-UI-06 · malformed email is rejected
test('UI-09 invalid email address is rejected', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.openCart();
  await shop.fillCheckout(
    'Mari Maasikas',
    'mari@',
    'Pikk 1, Tallinn'
  );
  await shop.placeOrder();
  await expect(shop.emailError()).toHaveText(
    'Enter a valid email address'
  );
});

// UI-10 · REQ-UI-07 · valid order is confirmed and cart is emptied
test('UI-10 valid order shows confirmation and empties cart', async ({ shop }) => {
  await shop.add('Wireless Mouse');
  await shop.openCart();
  await shop.checkout(
    'Mari Maasikas',
    'mari@example.com',
    'Pikk 1, Tallinn'
  );
  await expect(shop.confirmation()).toContainText(
    'Thank you, Mari Maasikas!'
  );
  await expect(shop.cartCount()).toHaveText('0');
});

