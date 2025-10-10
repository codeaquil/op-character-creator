import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: '🎲 Random Character Generate' }).click();
  await page.getByRole('button', { name: 'Toggle personality trait' }).click();
  await page.getByRole('button', { name: 'Toggle voice trait' }).click();
  await page.getByRole('button', { name: 'Toggle weapon trait' }).click();
  await expect(page.locator('div').filter({ hasText: 'personality trait' }).nth(5)).toContainText('[hidden]');
  await expect(page.locator('div').filter({ hasText: 'voice trait' }).nth(5)).toContainText('[hidden]');
  await expect(page.locator('div').filter({ hasText: 'weapon trait' }).nth(5)).toContainText('[hidden]');
  await page.getByRole('link', { name: '⚙️ Settings' }).click();
  await page.getByRole('button', { name: 'Weapon trait disabled' }).click();
  await page.getByRole('link', { name: '👤 Character' }).click();
  await expect(page.locator('div').filter({ hasText: 'weapon trait' }).nth(5)).not.toContainText('[hidden]');
});
