import { test, expect } from '@playwright/test';

test('Playwright documentation has the expected title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Playwright/);
});

test('user can open the getting started guide', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page).toHaveURL(/.*intro/);
  await expect(page.getByRole('heading', { name: /Installation/ })).toBeVisible();
});
