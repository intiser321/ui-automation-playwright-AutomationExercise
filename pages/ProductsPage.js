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
    this.cartModal = page.locator("#cartModal");
    this.continueShoppingButton = this.cartModal.getByRole("button", {
      name: "Continue Shopping",
    });
    this.viewCartLink = this.cartModal.getByRole("link", {
      name: "View Cart",
    });
  }
  async expectProductsPageVisible() {
    await expect(this.allProductsHeading).toBeVisible();
  }

  async expectProductListVisible() {
    await expect(this.productList).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }
  async clickViewOnAnyproduct(productId) {
    const viewProductLink = this.productCards.locator(
      `a[href="/product_details/${productId}"]`,
    );

    await viewProductLink.click();
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

  async addProductToCartByHovering(productIndex) {
    const product = this.productCards.nth(productIndex);
    const productArea = product.locator(".single-products");
    const overlay = product.locator(".product-overlay");

    await productArea.hover();
    await expect(overlay).toBeVisible();
    await overlay.locator(".add-to-cart").click();
    await expect(this.cartModal).toBeVisible();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    await expect(this.cartModal).toBeHidden();
  }

  async viewCart() {
    await this.viewCartLink.click();
  }
}
export { ProductPage };
