import { expect } from "@playwright/test";

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

    await categoryToggle.click();
    await expect(categoryPanel).toBeVisible();
  }

  async selectSubcategory(category) {
    const categoryPanel = this.getCategoryPanel(category.parent);
    const subcategoryLink = categoryPanel.locator(
      `a[href="/category_products/${category.id}"]`,
    );

    await expect(subcategoryLink).toContainText(category.subcategory);
    await subcategoryLink.click();
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
