import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Scroll Suite", () => {
  test("Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality", async function ({
    page,
  }) {
    const homePage = new HomePage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();

    await homePage.scrollToSubscription();
    await homePage.expectSubscriptionVisible();
    await homePage.expectSubscriptionInViewport();

    await homePage.clickScrollUpButton();
    await homePage.expectHeroSectionInViewport();
  });

  test("Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality", async function ({
    page,
  }) {
    const homePage = new HomePage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();

    await homePage.scrollToSubscription();
    await homePage.expectSubscriptionVisible();
    await homePage.expectSubscriptionInViewport();

    await homePage.scrollToTopWithoutArrow();
    await homePage.expectHeroSectionInViewport();
  });
});
