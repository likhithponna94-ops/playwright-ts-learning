# Playwright TypeScript Learning Project

A small, repeatable place to learn browser automation with Playwright and TypeScript.

## First run

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run test:headed
npm.cmd run report
npm.cmd run bdd
npm.cmd run bdd:headed
```

The first command runs the tests headlessly. The headed command opens Chromium so you can watch the test. The report command opens the last HTML report.

## Salesforce Trailhead BDD test

The Salesforce login starter is written in Gherkin and TypeScript:

- `features/salesforce-login.feature`: business-readable scenario.
- `features/step-definitions/salesforce-login.steps.ts`: Playwright step definitions and browser setup.
- `cucumber.js`: Cucumber TypeScript loader configuration.

Run only this feature with `npm.cmd run bdd`. To watch it in Chromium, run `npm.cmd run bdd:headed`. The default email is `likhith.ponna94@gmail.com`; override it without editing code:

To run the tagged debug scenario only in a new Microsoft Edge window, use:

```powershell
yarn debug
```

The Edge window is closed automatically after the scenario completes, including after a failed step. The equivalent npm command is `npm.cmd run debug`.

```powershell
$env:SALESFORCE_EMAIL = "your-test-email@example.com"
npm.cmd run bdd
```

This starter stops after clicking `Next`. Add password and MFA steps only for an approved test account and test environment; do not commit credentials. For CI, store them as GitHub Actions secrets and expose them as environment variables.

## Start login automation

The runnable example uses [Sauce Demo](https://www.saucedemo.com). It includes a successful login and an invalid-credentials check:

```powershell
npm.cmd test -- tests/login.spec.ts
npm.cmd run test:headed -- tests/login.spec.ts
```

Login selectors live in `pages/login.page.ts`, while test behavior lives in `tests/login.spec.ts`. For your own application, copy `.env.example` to `.env`, change `APP_BASE_URL`, `LOGIN_USERNAME`, and `LOGIN_PASSWORD`, and update the selectors in the page object. Do not commit `.env` or real credentials.

## Project map

- `tests/`: test files. Start with `tests/playwright-home.spec.ts`.
- `pages/`: reusable page objects, including `login.page.ts`.
- `playwright.config.ts`: browser, base URL, retries, and reporting settings.
- `.github/workflows/playwright.yml`: GitHub Actions automation for pushes and pull requests.
- `.vscode/tasks.json`: runnable VS Code tasks.

## Git workflow

`main` is the stable branch. Create a branch for each lesson or change:

```powershell
git switch main
git pull origin main
git switch -c lesson/locators
# edit and test
git add .
git commit -m "Add locator lesson"
git push -u origin lesson/locators
```

Open a pull request on GitHub, wait for the Playwright check, merge it into `main`, then clean up locally:

```powershell
git switch main
git pull origin main
git branch -d lesson/locators
```

## Suggested learning path

1. Locators: roles, text, labels, and test IDs.
2. Assertions: visibility, text, URL, and attributes.
3. Test hooks: `beforeEach`, fixtures, and reusable helpers.
4. Debugging: headed mode, `--debug`, traces, screenshots, and reports.
5. CI: pull requests, artifacts, retries, and parallel tests.

Never commit passwords, tokens, or production credentials. Use GitHub repository secrets for CI-only values.
