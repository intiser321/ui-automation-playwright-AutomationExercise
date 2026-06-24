import { expect } from "@playwright/test";

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
    await this.page.goto("/");
  }

  async expectHomePageVisible() {
    await expect(this.homeLink).toBeVisible();
    await expect(this.featuresItemsHeading).toBeVisible();
  }

  async clickSignupLogin() {
    await this.signupLoginLink.click();
  }

  async clickProducts() {
    await this.productsLink.click();
  }

  async clickCart() {
    await this.cartLink.click();
  }


  async clickContactUs() {
    await this.contactUsLink.click();
  }

  async clickTestCases() {
    await this.testCasesLink.click();
  }

  async expectTestCasesPageVisible() {
    const testCasesText = this.page.getByRole("heading", {
      name: "Test Cases",
    });
    await expect(testCasesText).toBeVisible();
  }

  async scrollToSubscription() {
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
    await this.subscriptionEmailInput.fill(email);
    await this.subscribeButton.click();
  }

  async expectSubscriptionSuccessVisible() {
    await expect(this.subscriptionSuccessMessage).toBeVisible();
  }

  async scrollToRecommendedItems() {
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

    await this.recommendedItemsCarousel.hover();

    if (!(await addToCartButton.isVisible())) {
      await this.recommendedItemsNextButton.click();
    }

    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
    await expect(this.cartModal).toBeVisible();
  }

  async clickViewCartFromModal() {
    await this.viewCartLink.click();
  }

  async clickScrollUpButton() {
    await expect(this.scrollUpButton).toBeVisible();
    await this.scrollUpButton.click();
  }

  async expectHeroSectionInViewport() {
    await expect(this.heroHeading).toBeInViewport();
  }

  async scrollToTopWithoutArrow() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }
}
export { HomePage };
