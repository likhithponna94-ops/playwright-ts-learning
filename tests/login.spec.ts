import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

const username = process.env.LOGIN_USERNAME ?? 'standard_user';
const password = process.env.LOGIN_PASSWORD ?? 'secret_sauce';

test.describe('web application login', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(username, password);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('user sees an error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_password');

    await loginPage.expectLoginError('Username and password do not match any user in this service');
  });
});
