import { expect } from "@playwright/test";

class ProductPage {
  constructor(page) {
    this.page = page;

    //locators
    this.allProductsHeading = page.getByRole("heading", {
      name: "All Products",
    });
    this.productList = page.locator(".features_items");
    this.productCards = this.productList.locator(".product-image-wrapper");
    this.searchProductInput = page.getByPlaceholder("Search Product");
    this.searchButton = page.locator("#submit_search");
    this.searchedProductsHeading = page.getByRole("heading", {
      name: "Searched Products",
    });
    this.productNames = this.productCards.locator(".productinfo p");
  }
  async expectProductsPageVisible() {
    await expect(this.allProductsHeading).toBeVisible();
  }

  async expectProductListVisible() {
    await expect(this.productList).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }
  async clickFirstViewProduct() {
    const firstProduct = this.productCards.first();

    await firstProduct.getByRole("link", { name: "View Product" }).click();
  }

  async searchProduct(productName) {
    await this.searchProductInput.fill(productName);
    await this.searchButton.click();
  }

  async expectSearchedProductsVisible(expectedProductNames) {
    await expect(this.searchedProductsHeading).toBeVisible();
    await expect(this.productNames).toHaveText(expectedProductNames);

    for (let index = 0; index < expectedProductNames.length; index++) {
      await expect(this.productCards.nth(index)).toBeVisible();
    }
  }
}
export { ProductPage };
