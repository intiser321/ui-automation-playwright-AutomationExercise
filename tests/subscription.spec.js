import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { testData } from "../test-data/testData";

test.describe("Subscription Suite", () => {
  test("Test Case 10: Verify Subscription in home page", async function ({
    page,
  }) {
    const homePage = new HomePage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.scrollToSubscription();
    await homePage.expectSubscriptionVisible();
    await homePage.subscribe(testData.subscription.email);
    await homePage.expectSubscriptionSuccessVisible();
  });

  test("Test Case 11: Verify Subscription in Cart page", async function ({
    page,
  }) {
    const homePage = new HomePage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.clickCart();
    await homePage.expectCartPageVisible();
    await homePage.scrollToSubscription();
    await homePage.expectSubscriptionVisible();
    await homePage.subscribe(testData.subscription.email);
    await homePage.expectSubscriptionSuccessVisible();
  });
});
