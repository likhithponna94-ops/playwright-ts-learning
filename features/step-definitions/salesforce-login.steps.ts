import { chromium, type Browser, type Page } from '@playwright/test';
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

Given('I open the Amazon login page', async () => {
  await page.goto('https://www.amazon.com/your-account');
});

When('I click on "Hello, sign in" button', async () => {
  await page.locator('#nav-link-accountList-nav-line-1').click();
});

When('I enter the phone number', async () => {
  const phoneNumber = process.env.AMAZON_PHONE_NUMBER ?? '9441844543';
  await page.getByRole('textbox', { name: 'Enter mobile number or email' }).fill(phoneNumber);
});

When('I select the email {string} in the text box under "Enter mobile number or email" section', async (email: string) => {
  const emailToUse = process.env.AMAZON_EMAIL ?? email;
  await page.getByRole('textbox', { name: 'Enter mobile number or email' }).fill(emailToUse);
});

When('I click on "continue"', async () => {
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
});
