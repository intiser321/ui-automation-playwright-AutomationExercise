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
    this.brand = this.productDetails.locator("p").filter({ hasText: "Brand:" });
    this.quantityInput = page.locator("#quantity");
    this.addToCartBtn = page.getByRole("button", { name: "Add to cart" });
    this.cartModal = page.locator("#cartModal");
  }
  async expectProductDetailPageVisible(productId) {
    await expect(this.productDetails).toBeVisible();
    await expect(this.page).toHaveURL(
      new RegExp(`/product_details/${productId}$`),
    );
  }
  async expectProductInfoIsVisible(expectedProduct) {
    await expect(this.productName).toHaveText(expectedProduct.name);
    await expect(this.category).toContainText(expectedProduct.category);
    await expect(this.price).toHaveText(expectedProduct.price);
    await expect(this.availability).toContainText(expectedProduct.availability);
    await expect(this.condition).toContainText(expectedProduct.condition);
    await expect(this.brand).toContainText(expectedProduct.brand);
  }

  async setProductQuantity(quantity) {
    await this.quantityInput.fill(String(quantity));
    await expect(this.quantityInput).toHaveValue(String(quantity));
  }

  async clickAddToCartBtn() {
    await this.addToCartBtn.click();
    await expect(this.cartModal).toBeVisible();
  }
}
export { ProductDetailsPage };
