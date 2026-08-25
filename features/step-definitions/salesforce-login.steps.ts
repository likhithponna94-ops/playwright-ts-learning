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
  browser = await chromium.launch({ headless: process.env.HEADED !== 'true' });
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

Then('the Salesforce login flow should continue', async () => {
  await expect(page.getByRole('textbox', { name: 'Business email' })).not.toBeVisible();
});
