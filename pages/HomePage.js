import { expect } from "@playwright/test";
import { dismissBlockingAds } from "../utils/adHandler";

class HomePage {
  constructor(page) {
    this.page = page;

    // Navigation links
    this.signupLoginLink = page.getByRole("link", { name: "Signup / Login" });
    this.productsLink = page.getByRole("link", { name: "Products" });
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.cartLink = page.getByRole("link", { name: "Cart" });
    this.contactUsLink = page.getByRole("link", { name: "Contact us" });
    this.testCasesLink = page
      .locator("#header")
      .getByRole("link", { name: "Test Cases" });

    // Home page sections
    this.featuresItemsHeading = page.getByRole("heading", {
      name: "Features Items",
    });
    this.heroHeading = page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    });
    this.subscriptionHeading = page.getByRole("heading", {
      name: "Subscription",
    });
    this.subscriptionEmailInput = page.getByPlaceholder("Your email address");
    this.subscribeButton = page.locator("#subscribe");
    this.subscriptionSuccessMessage = page.getByText(
      "You have been successfully subscribed!",
    );
    this.recommendedItemsHeading = page.getByRole("heading", {
      name: "recommended items",
    });
    this.recommendedItemsCarousel = page.locator("#recommended-item-carousel");
    this.recommendedItemsNextButton = this.recommendedItemsCarousel.locator(
      ".right.recommended-item-control",
    );
    this.cartModal = page.locator("#cartModal");
    this.viewCartLink = this.cartModal.getByRole("link", {
      name: "View Cart",
    });
    this.scrollUpButton = page.locator("#scrollUp");
  }

  async goTo() {
    for (let attempt = 0; attempt < 3; attempt++) {
      await this.page
        .goto("/", { waitUntil: "domcontentloaded" })
        .catch(() => null);
      await dismissBlockingAds(this.page);

      if (await this.isHomePageReady()) {
        return;
      }

      await this.page.waitForTimeout(1_000);
    }
  }

  async expectHomePageVisible() {
    for (let attempt = 0; attempt < 3; attempt++) {
      await dismissBlockingAds(this.page);

      if (await this.isHomePageReady()) {
        await expect(this.homeLink).toBeVisible();
        await expect(this.featuresItemsHeading).toBeVisible();
        return;
      }

      await this.page
        .goto("/", { waitUntil: "domcontentloaded" })
        .catch(() => null);
      await this.page.waitForTimeout(1_000);
    }

    await expect(this.homeLink).toBeVisible();
    await expect(this.featuresItemsHeading).toBeVisible();
  }

  async isHomePageReady() {
    return (
      (await this.homeLink.isVisible({ timeout: 2_000 }).catch(() => false)) &&
      (await this.featuresItemsHeading
        .isVisible({ timeout: 2_000 })
        .catch(() => false))
    );
  }

  async clickSignupLogin() {
    await this.clickNavigationLink(this.signupLoginLink, /\/login$/);
  }

  async clickProducts() {
    await this.clickNavigationLink(this.productsLink, /\/products$/);
  }

  async clickCart() {
    await this.clickNavigationLink(this.cartLink, /\/view_cart$/);
  }


  async clickContactUs() {
    await this.clickNavigationLink(this.contactUsLink, /\/contact_us$/);
  }

  async clickTestCases() {
    await this.clickNavigationLink(this.testCasesLink, /\/test_cases$/);
  }

  async clickNavigationLink(link, expectedUrl) {
    await dismissBlockingAds(this.page);
    const href = await link.getAttribute("href");

    await link.evaluate((anchor) => anchor.click());

    try {
      await expect(this.page).toHaveURL(expectedUrl, { timeout: 10_000 });
    } catch (error) {
      if (!href) {
        throw error;
      }

      await this.page.goto(href, { waitUntil: "domcontentloaded" });
      await expect(this.page).toHaveURL(expectedUrl);
    }

    await dismissBlockingAds(this.page);
  }

  async expectTestCasesPageVisible() {
    const testCasesText = this.page.getByRole("heading", {
      name: "Test Cases",
    });
    await expect(testCasesText).toBeVisible();
  }

  async scrollToSubscription() {
    await dismissBlockingAds(this.page);
    await this.subscriptionHeading.scrollIntoViewIfNeeded();
  }

  async expectSubscriptionVisible() {
    await expect(this.subscriptionHeading).toBeVisible();
    await expect(this.subscriptionEmailInput).toBeVisible();
  }

  async expectSubscriptionInViewport() {
    await expect(this.subscriptionHeading).toBeInViewport();
  }

  async subscribe(email) {
    await dismissBlockingAds(this.page);
    await this.subscriptionEmailInput.fill(email);
    await this.subscribeButton.evaluate((button) => button.click());
  }

  async expectSubscriptionSuccessVisible() {
    await expect(this.subscriptionSuccessMessage).toBeVisible();
  }

  async scrollToRecommendedItems() {
    await dismissBlockingAds(this.page);
    await this.recommendedItemsHeading.scrollIntoViewIfNeeded();
  }

  async expectRecommendedItemsVisible() {
    await expect(this.recommendedItemsHeading).toBeVisible();
    await expect(this.recommendedItemsCarousel).toBeVisible();
  }

  async addRecommendedProductToCart(productId) {
    const addToCartButton = this.recommendedItemsCarousel.locator(
      `.add-to-cart[data-product-id="${productId}"]`,
    );

    await dismissBlockingAds(this.page);
    await this.recommendedItemsCarousel.hover();

    if (!(await addToCartButton.isVisible())) {
      await this.recommendedItemsNextButton.evaluate((button) =>
        button.click(),
      );
    }

    await expect(addToCartButton).toBeVisible();
    await addToCartButton.evaluate((button) => button.click());
    await expect(this.cartModal).toBeVisible();
  }

  async clickViewCartFromModal() {
    await dismissBlockingAds(this.page);
    await this.viewCartLink.evaluate((anchor) => anchor.click());
    await expect(this.page).toHaveURL(/\/view_cart$/);
  }

  async clickScrollUpButton() {
    await dismissBlockingAds(this.page);
    await expect(this.scrollUpButton).toBeVisible();
    await this.scrollUpButton.evaluate((button) => button.click());
  }

  async expectHeroSectionInViewport() {
    await expect(this.heroHeading).toBeInViewport();
  }

  async scrollToTopWithoutArrow() {
    await dismissBlockingAds(this.page);
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }
}
export { HomePage };
