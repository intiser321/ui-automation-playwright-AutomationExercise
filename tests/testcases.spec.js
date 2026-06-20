import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("Test Case 7: Verify Test Cases Page", async function ({ page }) {
  const homePage = new HomePage(page);

  await homePage.goTo();
  await homePage.expectHomePageVisible();
  await homePage.clickTestCases();

  await expect(page).toHaveURL("/test_cases");
  await expect(
    page.getByRole("heading", { name: "Test Cases", exact: true }),
  ).toBeVisible();
});
