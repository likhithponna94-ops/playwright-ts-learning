import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private readonly usernameInput = this.page.getByPlaceholder('Username');
  private readonly passwordInput = this.page.getByPlaceholder('Password');
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.page.locator('[data-test="error"]')).toContainText(message);
  }
}
