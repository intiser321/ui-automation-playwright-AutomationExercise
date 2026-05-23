# ui-automation-playwright-AutomationExercise
Automation framework using playwright and Javascript

## Project commands

Use npm scripts instead of `npx` in PowerShell. This avoids the local Windows
execution-policy block on `npx.ps1`.

```bash
npm run test
npm run test:chromium
npm run test:headed
npm run test:list
npm run browsers:install
npm run report
npm run allure:generate
npm run allure:open
```

The Playwright HTML report is written to `playwright-report/`.
The Allure raw results are written to `allure-results/`, and the generated
Allure HTML report is written to `allure-report/`.

## Project structure

```text
pages/       Page Object Model classes for application pages.
fixtures/    Shared Playwright fixtures and test setup.
test-data/   Reusable test data such as users, addresses, and products.
tests/       Playwright spec files.
utils/       Small reusable helpers.
```
