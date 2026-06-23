import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductsPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { testData } from "../test-data/testData";

test.describe("Products Suite", () => {
  test("Test Case 8: Verify All Products and product detail page", async function ({
    page,
  }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();

    await homePage.clickProducts();
    await productPage.expectProductsPageVisible();
    await productPage.expectProductListVisible();
    await productPage.clickViewOnAnyproduct(testData.firstProduct.id);
    await productDetailsPage.expectProductDetailPageVisible(
      testData.firstProduct.id,
    );
    await productDetailsPage.expectProductInfoIsVisible(testData.firstProduct);
  });

  test("Test Case 9: Search Product", async function ({ page }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();

    await homePage.clickProducts();
    await productPage.expectProductsPageVisible();
    await productPage.searchProduct(testData.productSearch.term);
    await productPage.expectSearchedProductsVisible(
      testData.productSearch.expectedProducts,
    );
  });
});
