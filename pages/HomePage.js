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
    this.testCasesLink = page.getByRole("link", { name: "Test Cases" });

    // Home page sections
    this.featuresItemsHeading = page.getByRole("heading", {
      name: "Features Items",
    });
    this.subscriptionHeading = page.getByRole("heading", {
      name: "Subscription",
    });
    this.subscriptionEmailInput = page.getByPlaceholder("Your email address");
    this.subscribeButton = page.locator("#subscribe");
    this.subscriptionSuccessMessage = page.getByText(
      "You have been successfully subscribed!",
    );
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

  async expectProductsPageVisible() {
    const productText = this.page.getByRole("heading", {
      name: "All Products",
    });
    await expect(productText).toBeVisible();
  }

  async clickCart() {
    await this.cartLink.click();
  }

  async expectCartPageVisible() {
    const cartText = this.page.getByText("Shopping Cart", { exact: true });
    await expect(cartText).toBeVisible();
  }

  async clickContactUs() {
    await this.contactUsLink.click();
  }

  async expectContactUsPageVisible() {
    const contactUsText = this.page.getByRole("heading", {
      name: "Contact Us",
    });
    await expect(contactUsText).toBeVisible();
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

  async subscribe(email) {
    await this.subscriptionEmailInput.fill(email);
    await this.subscribeButton.click();
  }

  async expectSubscriptionSuccessVisible() {
    await expect(this.subscriptionSuccessMessage).toBeVisible();
  }
}
export { HomePage };
