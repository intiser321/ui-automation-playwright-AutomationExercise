import { expect } from "@playwright/test";

class BrandPage {
  constructor(page) {
    this.page = page;
    this.brandsSection = page.locator(".brands_products");
    this.brandsHeading = this.brandsSection.getByRole("heading", {
      name: "Brands",
    });
    this.productList = page.locator(".features_items");
    this.productCards = this.productList.locator(".product-image-wrapper");
  }

  async expectBrandsVisible() {
    await expect(this.brandsSection).toBeVisible();
    await expect(this.brandsHeading).toBeVisible();
  }

  async selectBrand(brand) {
    const brandLink = this.brandsSection.locator(`a[href="${brand.path}"]`);

    await expect(brandLink).toContainText(brand.name);
    await brandLink.click();
  }

  async expectBrandProductsVisible(brand) {
    const expectedHeading = `Brand - ${brand.name} Products`;

    await expect(this.page).toHaveURL(new RegExp(`${brand.path}$`));
    await expect(
      this.page.getByRole("heading", { name: expectedHeading }),
    ).toBeVisible();
    await expect(this.productList).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }
}

export { BrandPage };
