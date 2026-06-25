import { expect } from "@playwright/test";
import { dismissBlockingAds } from "../utils/adHandler";

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
    await dismissBlockingAds(this.page);
    await expect(this.allProductsHeading).toBeVisible();
  }

  async expectProductListVisible() {
    await dismissBlockingAds(this.page);
    await expect(this.productList).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }
  async clickViewOnAnyproduct(productId) {
    const viewProductLink = this.productCards.locator(
      `a[href="/product_details/${productId}"]`,
    );

    await dismissBlockingAds(this.page);
    await viewProductLink.scrollIntoViewIfNeeded();
    await viewProductLink.evaluate((anchor) => anchor.click());
    await expect(this.page).toHaveURL(
      new RegExp(`/product_details/${productId}$`),
    );
    await dismissBlockingAds(this.page);
  }

  async searchProduct(productName) {
    await dismissBlockingAds(this.page);
    await this.searchProductInput.fill(productName);
    await this.searchButton.evaluate((button) => button.click());
    await dismissBlockingAds(this.page);
  }

  async expectSearchedProductsVisible(expectedProductNames) {
    await expect(this.searchedProductsHeading).toBeVisible();
    await expect(this.productNames).toHaveText(expectedProductNames);

    for (let index = 0; index < expectedProductNames.length; index++) {
      await expect(this.productCards.nth(index)).toBeVisible();
    }
  }

  async expectMultipleProductsVisible() {
    const productCount = await this.productCards.count();

    expect(productCount).toBeGreaterThan(1);
  }

  async addProductToCartByHovering(productIndex) {
    await this.addProductToCart(productIndex);
  }

  async addProductToCart(productIndex) {
    const product = this.productCards.nth(productIndex);
    const addToCartButton = product.locator(".productinfo .add-to-cart");

    await dismissBlockingAds(this.page);
    await product.scrollIntoViewIfNeeded();
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.evaluate((button) => button.click());

    await expect(this.cartModal).toBeVisible();
  }

  async addAllProductsToCart() {
    const productCount = await this.productCards.count();

    expect(productCount).toBeGreaterThan(0);

    for (let index = 0; index < productCount; index++) {
      await this.addProductToCart(index);
      await this.continueShopping();
    }
  }

  async continueShopping() {
    await dismissBlockingAds(this.page);
    await this.continueShoppingButton.evaluate((button) => button.click());
    await expect(this.cartModal).toBeHidden();
  }

  async viewCart() {
    await dismissBlockingAds(this.page);
    await this.viewCartLink.evaluate((anchor) => anchor.click());
    await expect(this.page).toHaveURL(/\/view_cart$/);
  }
}
export { ProductPage };
