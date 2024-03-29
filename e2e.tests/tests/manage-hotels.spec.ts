import { test, expect } from 'playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole('link', { name: 'Sign In' }).click();

  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  await page.locator('[name=email]').fill('microdon@mail.ru');
  await page.locator('[name=password]').fill('111111');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('You have been signed in')).toBeVisible();
});

test('should allow user to add a hotel', async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill('Test hotel');
  await page.locator('[name="city"]').fill('Test city');
  await page.locator('[name="country"]').fill('Test country');
  await page
    .locator('[name="description"]')
    .fill('Test description for test hotel');
  await page.locator('[name="pricePerNight"]').fill('100');
  await page.selectOption('select[name="starRating"]', '4');
  await page.getByText('Budget').click();
  await page.getByLabel('Free Wifi').check();
  await page.getByLabel('Parking').check();

  await page.locator('[name="adultCount"]').fill('1');
  await page.locator('[name="childCount"]').fill('2');

  await page.setInputFiles('[name="imgFiles"]', [
    path.join(__dirname, 'files', '1.jpeg')
  ]);

  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Hotel saved')).toBeVisible();
});

test('should display hotels', async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText('Test hotel').first()).toBeVisible();
  await expect(page.getByText('Test description').first()).toBeVisible();
  await expect(page.getByText('Test city, Test country').first()).toBeVisible();
  await expect(page.getByText('Budget').first()).toBeVisible();
  await expect(page.getByText('$100 per night').first()).toBeVisible();
  await expect(page.getByText('1 adults, 2 children').first()).toBeVisible();
  await expect(page.getByText('4 Star Rating').first()).toBeVisible();

  await expect(
    page.getByRole('link', { name: 'View Details' }).first()
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add Hotel' })).toBeVisible();
});

test('should edit hotel', async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole('link', { name: 'View Details' }).first().click();
  await page.waitForSelector('[name="name"]', { state: 'attached' });
  await expect(page.locator('[name="name"]')).toHaveValue('Test hotel');
  await page.locator('[name="name"]').fill('Test hotel updated');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Hotel Saved!')).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue('Test hotel updated');
  await page.locator('[name="name"]').fill('Test hotel');
  await page.getByRole('button', { name: 'Save' }).click();
});
