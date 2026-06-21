import { expect } from "@playwright/test";

class ProductDetailsPage {
  constructor(page) {
    this.page = page;

    //locators
    this.productDetails = page.locator(".product-information");
    this.productName = this.productDetails.locator("h2");
    this.category = this.productDetails
      .locator("p")
      .filter({ hasText: "Category:" });
    this.price = this.productDetails.getByText(/^Rs\.\s*\d+$/);
    this.availability = this.productDetails
      .locator("p")
      .filter({ hasText: "Availability:" });
    this.condition = this.productDetails
      .locator("p")
      .filter({ hasText: "Condition:" });
    this.brand = this.productDetails
      .locator("p")
      .filter({ hasText: "Brand:" });
  }
  async expectProductDetailPageVisible() {
    await expect(this.productDetails).toBeVisible();
    await expect(this.page).toHaveURL("/product_details/1");
  }
  async expectProductInfoIsVisible(expectedProduct) {
    await expect(this.productName).toHaveText(expectedProduct.name);
    await expect(this.category).toContainText(expectedProduct.category);
    await expect(this.price).toHaveText(expectedProduct.price);
    await expect(this.availability).toContainText(
      expectedProduct.availability,
    );
    await expect(this.condition).toContainText(expectedProduct.condition);
    await expect(this.brand).toContainText(expectedProduct.brand);
  }
}
export { ProductDetailsPage };
