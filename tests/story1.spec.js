import { test, expect } from '@playwright/test';

/* User Story 1 e2e test:
 *   A user goes to the landing page, clicks Random Character,
 *   and goes to the character page which shows description and
 *   all five traits.
 */
test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: '🎲 Random Character Generate' }).click();
  await expect(page.getByRole('heading', { name: 'Character Description' })).toBeVisible();
  await expect(page.getByText('facial trait:')).toBeVisible();
  await expect(page.getByText('body trait:')).toBeVisible();
  await expect(page.getByText('personality trait:')).toBeVisible();
  await expect(page.getByText('voice trait:')).toBeVisible();
  await expect(page.getByText('weapon trait:')).toBeVisible();
});
