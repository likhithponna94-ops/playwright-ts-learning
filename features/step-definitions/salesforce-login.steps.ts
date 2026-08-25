import { chromium, expect, type Browser, type Page } from '@playwright/test';
import {
  After,
  Before,
  Given,
  setDefaultTimeout,
  Then,
  When
} from '@cucumber/cucumber';

setDefaultTimeout(30_000);

let browser: Browser;
let page: Page;

Before(async () => {
  browser = await chromium.launch({
    channel: 'msedge',
    headless: process.env.HEADED !== 'true'
  });
  page = await browser.newPage();
});

After(async () => {
  await browser.close();
});

Given('I open the Trailhead login page', async () => {
  await page.goto('https://trailhead.salesforce.com/login/');
});

When('I click the {string} button', async (buttonText: string) => {
  await page.getByText(buttonText, { exact: true }).click();
});

When('I enter my business email', async () => {
  const email = process.env.SALESFORCE_EMAIL ?? 'likhith.ponna94@gmail.com';
  await page.getByRole('textbox', { name: 'Business email' }).fill(email);
});

Then('I should land on the Salesforce verification-code page and wait up to 20 seconds for the code to be entered manually', async () => {
  await expect(page.getByRole('textbox', { name: 'Business email' })).not.toBeVisible();

  const verificationCode = page.locator(
    'input[autocomplete="one-time-code"], input[inputmode="numeric"], input[name*="code" i]'
  ).first();

  await expect(verificationCode).toBeVisible({ timeout: 60_000 });
  await expect.poll(async () => verificationCode.inputValue(), {
    timeout: 20_000,
    message: 'The verification code was not entered within 20 seconds'
  }).not.toBe('');
});

Then('I automatically click the Submit code button identified by type "submit" after the code is entered', async () => {
  await page.locator('button[type="submit"], input[type="submit"]').first().click();
});
