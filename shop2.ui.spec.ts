import { test, expect } from './fixtures';

// UI-11 ja UI-12 – sortimine
test.describe('Sorteerimine', () => {
test('UI-11 odavaim toode on esimene', async ({ shop }) => {
await shop.sortBy('Price: low to high');
await expect(shop.products().first()).toContainText('Wireless Mouse');
await expect(shop.prices().first()).toHaveText('24.50 €');
});

test('UI-12 kalleim toode on esimene', async ({ shop }) => {
await shop.sortBy('Price: high to low');
await expect(shop.products().first()).toContainText('Monitor 27"');
await expect(shop.prices().first()).toHaveText('249.00 €');
});
});

// UI-13 ja UI-14 – kogus
test.describe('Kogus', () => {
test('UI-13 kogus 3 arvutab rea summa õigesti', async ({ shop }) => {
await shop.add('USB-C Hub');
await shop.openCart();
await shop.setQuantity('USB-C Hub', 3);


await expect(shop.quantity('USB-C Hub')).toHaveValue('3');
await expect(shop.lineTotal('USB-C Hub')).toHaveText('117.00 €');
await expect(shop.cartTotal()).toHaveText('117.00 €');


});

test('UI-14 kogus 0 ei ole lubatud', async ({ shop }) => {
await shop.add('USB-C Hub');
await shop.openCart();
await shop.setQuantity('USB-C Hub', 0);


await expect(shop.quantity('USB-C Hub')).toHaveValue('1');


});
});

// UI-15, UI-16 ja UI-17 – sooduskood
test.describe('Sooduskood', () => {
test('UI-15 SAVE10 annab ühele tootele 10% allahindlust', async ({ shop }) => {
await shop.add('USB-C Hub');
await shop.openCart();
await shop.applyDiscount('SAVE10');


await expect(shop.cartSubtotal()).toHaveText('39.00 €');
await expect(shop.cartDiscount()).toHaveText('−3.90 €');
await expect(shop.cartTotal()).toHaveText('35.10 €');


});

test('UI-16 SAVE10 rakendub kogu ostukorvile', async ({ shop }) => {
await test.step('add two different products', async () => {
await shop.add('Wireless Mouse');
await shop.add('USB-C Hub');
await shop.openCart();


  await expect(shop.cartSubtotal()).toHaveText('63.50 €');
});

await test.step('apply SAVE10', async () => {
  await shop.applyDiscount('SAVE10');

  await expect(shop.cartDiscount()).toHaveText('−6.35 €');
  await expect(shop.cartTotal()).toHaveText('57.15 €');
});


});

test('UI-17 tundmatu sooduskood ei muuda summat', async ({ shop }) => {
await shop.add('USB-C Hub');
await shop.openCart();
await shop.applyDiscount('UNKNOWN');


await expect(shop.cartTotal()).toHaveText('39.00 €');
await expect(shop.discountMessage()).toBeVisible();

});
});

// UI-18 – andmepõhine e-posti valideerimine
test.describe('E-posti valideerimine', () => {
const invalidEmails = [
{ email: 'mari@', why: 'domeen puudub' },
{ email: '@example.com', why: 'kasutajanimi puudub' },
{ email: 'mari.example.com', why: 'ätt-märk puudub' },
{ email: 'mari@.com', why: 'domeen on vigane' },
];

for (const { email, why } of invalidEmails) {
test(`UI-18 email "${email}" is rejected (${why})`, async ({ shop }) => {
await shop.add('USB-C Hub');
await shop.openCart();
await shop.checkout(
'Mari Maasikas',
email,
'Pikk 1, Tallinn'
);

  await expect(shop.error('email')).toHaveText(
    'Enter a valid email address'
  );
});

}
});
