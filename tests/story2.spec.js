import { test, expect } from '@playwright/test';

/* User Story 2 e2d test:
 *   A user goes to the index page, clicks manually create, goes to
 *   the form page, and then selects an option for each of the five traits.
 *   The user then clicks save character and visually see the character
 *   description and each of the five traits.
 */
test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: '✏️ Create Manually Choose' }).click();
  await page.getByRole('combobox').first().selectOption('1');
  await page.getByRole('combobox').nth(1).selectOption('2');
  await page.getByRole('combobox').nth(2).selectOption('3');
  await page.getByRole('combobox').nth(3).selectOption('4');
  await page.getByRole('combobox').nth(4).selectOption('14');
  await page.getByRole('button', { name: '💾 Save Character' }).click();
  await expect(page.getByRole('heading', { name: 'Character Description' })).toBeVisible();
  await expect(page.getByText('facial trait:')).toBeVisible();
  await expect(page.getByText('body trait:')).toBeVisible();
  await expect(page.getByText('personality trait:')).toBeVisible();
  await expect(page.getByText('voice trait:')).toBeVisible();
  await expect(page.getByText('weapon trait:')).toBeVisible();
});
