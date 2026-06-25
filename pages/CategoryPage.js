import { expect } from "@playwright/test";
import { dismissBlockingAds } from "../utils/adHandler";

class CategoryPage {
  constructor(page) {
    this.page = page;
    this.categoryHeading = page.getByRole("heading", { name: "Category" });
    this.productList = page.locator(".features_items");
    this.productCards = this.productList.locator(".product-image-wrapper");
  }

  getCategoryPanel(categoryName) {
    return this.page.locator(`#${categoryName}`);
  }

  async expectCategoriesVisible() {
    await expect(this.categoryHeading).toBeVisible();
  }

  async expandCategory(categoryName) {
    const categoryToggle = this.page.locator(`a[href="#${categoryName}"]`);
    const categoryPanel = this.getCategoryPanel(categoryName);

    await dismissBlockingAds(this.page);
    await categoryToggle.evaluate((link) => link.click());
    await expect(categoryPanel).toBeVisible();
  }

  async selectSubcategory(category) {
    const categoryPanel = this.getCategoryPanel(category.parent);
    const subcategoryLink = categoryPanel.locator(
      `a[href="/category_products/${category.id}"]`,
    );

    await expect(subcategoryLink).toContainText(category.subcategory);
    await dismissBlockingAds(this.page);
    await subcategoryLink.evaluate((link) => link.click());
    await expect(this.page).toHaveURL(
      new RegExp(`/category_products/${category.id}$`),
    );
    await dismissBlockingAds(this.page);
  }

  async expectCategoryProductsVisible(category) {
    const expectedHeading = `${category.parent} - ${category.subcategory} Products`;

    await expect(this.page).toHaveURL(
      new RegExp(`/category_products/${category.id}$`),
    );
    await expect(
      this.page.getByRole("heading", { name: expectedHeading }),
    ).toBeVisible();
    await expect(this.productList).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }
}

export { CategoryPage };
