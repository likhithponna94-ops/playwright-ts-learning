# Playwright TypeScript Learning Project

A small, repeatable place to learn browser automation with Playwright and TypeScript.

## First run

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run test:headed
npm.cmd run report
```

The first command runs the tests headlessly. The headed command opens Chromium so you can watch the test. The report command opens the last HTML report.

## Project map

- `tests/`: test files. Start with `tests/playwright-home.spec.ts`.
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
